import { useState } from 'react';
import type { ProjectEditorPayload } from '../../types/project';
import { inferMediaType, uploadProjectAsset } from '../../lib/supabase/projects';

interface ProjectFormProps {
  initialValue?: ProjectEditorPayload;
  onSubmit: (payload: ProjectEditorPayload) => Promise<void>;
  onCancel: () => void;
  submitLabel: string;
}

const EMPTY_PROJECT: ProjectEditorPayload = {
  slug: '',
  title: '',
  shortDescription: '',
  fullDescription: '',
  client: '',
  year: new Date().getFullYear(),
  role: '',
  duration: '',
  featured: false,
  status: 'draft',
  sortOrder: 100,
  coverImageUrl: '',
  metaTitle: '',
  metaDescription: '',
  ogImageUrl: '',
  tags: [],
  gallery: [],
};

export default function ProjectForm({ initialValue, onSubmit, onCancel, submitLabel }: ProjectFormProps) {
  type GalleryItem = { id: string; mediaUrl: string; mediaType: 'image' | 'video' };

  const [value, setValue] = useState<ProjectEditorPayload>(initialValue ?? EMPTY_PROJECT);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState((initialValue?.tags ?? []).join(', '));
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    (initialValue?.gallery ?? []).map((item) => ({
      id: crypto.randomUUID(),
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType,
    })),
  );
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const tags = tagInput
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

      await onSubmit({
        ...value,
        tags,
        gallery: galleryItems.map((item, index) => ({
          mediaUrl: item.mediaUrl,
          mediaType: item.mediaType,
          alt: value.title ? `${value.title} visual ${index + 1}` : `Project visual ${index + 1}`,
          caption: '',
          position: index,
        })),
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  }

  async function handleCoverUpload(file: File | undefined) {
    if (!file) return;
    try {
      setUploadingCover(true);
      const url = await uploadProjectAsset(file, `projects/${value.slug || 'draft'}/cover`);
      setValue((prev) => ({ ...prev, coverImageUrl: url, ogImageUrl: prev.ogImageUrl || url }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Cover upload failed.');
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleGalleryUpload(files: FileList | null) {
    if (!files?.length) return;
    try {
      setUploadingGallery(true);
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadProjectAsset(file, `projects/${value.slug || 'draft'}/gallery`);
        urls.push(url);
      }
      setGalleryItems((prev) => [
        ...prev,
        ...urls.map((url) => ({
          id: crypto.randomUUID(),
          mediaUrl: url,
          mediaType: inferMediaType(url),
        })),
      ]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Gallery upload failed.');
    } finally {
      setUploadingGallery(false);
    }
  }

  function addGalleryUrl() {
    const trimmed = galleryUrlInput.trim();
    if (!trimmed) return;
    setGalleryItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        mediaUrl: trimmed,
        mediaType: inferMediaType(trimmed),
      },
    ]);
    setGalleryUrlInput('');
  }

  function removeGalleryItem(id: string) {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  }

  function moveGalleryItem(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= galleryItems.length) return;
    setGalleryItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Title</span>
          <input
            required
            value={value.title}
            onChange={(event) => setValue((prev) => ({ ...prev, title: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Slug</span>
          <input
            required
            value={value.slug}
            onChange={(event) =>
              setValue((prev) => ({
                ...prev,
                slug: event.target.value.toLowerCase().replace(/\s+/g, '-'),
              }))
            }
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="text-xs uppercase tracking-widest text-white/60">Short Description</span>
        <input
          required
          value={value.shortDescription}
          onChange={(event) => setValue((prev) => ({ ...prev, shortDescription: event.target.value }))}
          className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
        />
      </label>

      <label className="space-y-2 block">
        <span className="text-xs uppercase tracking-widest text-white/60">Full Description</span>
        <textarea
          required
          rows={6}
          value={value.fullDescription}
          onChange={(event) => setValue((prev) => ({ ...prev, fullDescription: event.target.value }))}
          className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
        />
      </label>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Client</span>
          <input
            value={value.client}
            onChange={(event) => setValue((prev) => ({ ...prev, client: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Year</span>
          <input
            type="number"
            value={value.year ?? ''}
            onChange={(event) =>
              setValue((prev) => ({ ...prev, year: event.target.value ? Number(event.target.value) : null }))
            }
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Role</span>
          <input
            value={value.role}
            onChange={(event) => setValue((prev) => ({ ...prev, role: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Duration</span>
          <input
            value={value.duration}
            onChange={(event) => setValue((prev) => ({ ...prev, duration: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Cover Image URL</span>
          <input
            required
            value={value.coverImageUrl}
            onChange={(event) => setValue((prev) => ({ ...prev, coverImageUrl: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(event) => {
              void handleCoverUpload(event.target.files?.[0]);
            }}
            className="w-full text-xs text-white/70"
          />
          {uploadingCover && <p className="text-xs text-muted-foreground">Uploading cover...</p>}
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Tags (comma separated)</span>
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="text-xs uppercase tracking-widest text-white/60">Gallery (drag to reorder)</span>
        <div className="flex gap-2">
          <input
            value={galleryUrlInput}
            onChange={(event) => setGalleryUrlInput(event.target.value)}
            placeholder="Paste image/video URL then add"
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <button
            type="button"
            onClick={addGalleryUrl}
            className="px-4 py-2 border border-gold/40 text-gold rounded-lg text-xs uppercase tracking-widest font-bold"
          >
            Add URL
          </button>
        </div>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(event) => {
            void handleGalleryUpload(event.target.files);
          }}
          className="w-full text-xs text-white/70"
        />
        {uploadingGallery && <p className="text-xs text-muted-foreground">Uploading gallery files...</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => setDraggingItemId(item.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (!draggingItemId) return;
                const from = galleryItems.findIndex((entry) => entry.id === draggingItemId);
                moveGalleryItem(from, index);
                setDraggingItemId(null);
              }}
              className="border border-white/10 rounded-lg p-2 bg-card/30 space-y-2"
            >
              <div className="aspect-video rounded overflow-hidden bg-black/40">
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.mediaUrl} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-[10px] text-white/60 break-all">#{index + 1} {item.mediaUrl}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => moveGalleryItem(index, index - 1)}
                  className="px-2 py-1 border border-white/20 rounded text-[10px] uppercase tracking-widest"
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => moveGalleryItem(index, index + 1)}
                  className="px-2 py-1 border border-white/20 rounded text-[10px] uppercase tracking-widest"
                >
                  Down
                </button>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(item.id)}
                  className="px-2 py-1 border border-destructive/40 text-destructive rounded text-[10px] uppercase tracking-widest"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </label>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Status</span>
          <select
            value={value.status}
            onChange={(event) =>
              setValue((prev) => ({ ...prev, status: event.target.value as ProjectEditorPayload['status'] }))
            }
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Sort Order</span>
          <input
            type="number"
            value={value.sortOrder}
            onChange={(event) => setValue((prev) => ({ ...prev, sortOrder: Number(event.target.value) || 0 }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">Meta Title</span>
          <input
            value={value.metaTitle}
            onChange={(event) => setValue((prev) => ({ ...prev, metaTitle: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-white/60">OG Image URL</span>
          <input
            value={value.ogImageUrl}
            onChange={(event) => setValue((prev) => ({ ...prev, ogImageUrl: event.target.value }))}
            className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="space-y-2 block">
        <span className="text-xs uppercase tracking-widest text-white/60">Meta Description</span>
        <textarea
          rows={3}
          value={value.metaDescription}
          onChange={(event) => setValue((prev) => ({ ...prev, metaDescription: event.target.value }))}
          className="w-full bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
        />
      </label>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={value.featured}
          onChange={(event) => setValue((prev) => ({ ...prev, featured: event.target.checked }))}
          className="accent-gold"
        />
        <span className="text-sm">Featured project</span>
      </label>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-sm disabled:opacity-60"
        >
          {saving ? 'Saving...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-white/20 font-bold uppercase tracking-widest text-xs rounded-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
