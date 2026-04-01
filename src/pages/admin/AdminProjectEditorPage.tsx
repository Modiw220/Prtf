import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProjectForm from '../../components/admin/ProjectForm';
import { getAdminProjectById, upsertProject } from '../../lib/supabase/projects';
import type { ProjectEditorPayload } from '../../types/project';

function toEditorPayload(row: Awaited<ReturnType<typeof getAdminProjectById>>): ProjectEditorPayload | undefined {
  if (!row) return undefined;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    client: row.client ?? '',
    year: row.year ?? null,
    role: row.role ?? '',
    duration: row.duration ?? '',
    featured: row.featured,
    status: row.status,
    sortOrder: row.sort_order,
    coverImageUrl: row.cover_image_url ?? '',
    metaTitle: row.meta_title ?? '',
    metaDescription: row.meta_description ?? '',
    ogImageUrl: row.og_image_url ?? '',
    tags: (row.project_tag_map ?? [])
      .map((item) => item.project_tags?.name)
      .filter((name): name is string => Boolean(name)),
    gallery: [...(row.project_media ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((media) => ({
        mediaUrl: media.media_url,
        mediaType: media.media_type,
        alt: media.alt ?? '',
        caption: media.caption ?? '',
        position: media.position,
      })),
  };
}

export default function AdminProjectEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState<ProjectEditorPayload | undefined>(undefined);
  const [loading, setLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);
  const isEditMode = useMemo(() => Boolean(id), [id]);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getAdminProjectById(id)
      .then((row) => {
        if (!mounted) return;
        const payload = toEditorPayload(row);
        if (!payload) {
          setError('Project not found.');
          return;
        }
        setInitialValue(payload);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load project.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  async function handleSubmit(payload: ProjectEditorPayload) {
    await upsertProject(payload);
    navigate('/admin');
  }

  return (
    <div className="min-h-screen bg-black px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link to="/admin" className="text-xs uppercase tracking-widest text-gold hover:text-gold-hover">
          Back to dashboard
        </Link>

        <div>
          <h1 className="text-3xl md:text-5xl font-serif">{isEditMode ? 'Edit Project' : 'Create Project'}</h1>
          <p className="text-muted-foreground mt-2">
            {isEditMode ? 'Update project content and publishing state.' : 'Add a new dynamic project page.'}
          </p>
        </div>

        {loading && <p className="text-muted-foreground">Loading project...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && !error && (
          <ProjectForm
            initialValue={initialValue}
            submitLabel={isEditMode ? 'Save Changes' : 'Create Project'}
            onCancel={() => navigate('/admin')}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
