import { supabase } from './client';
import type {
  MediaType,
  ProjectEditorPayload,
  ProjectMediaRecord,
  ProjectRecord,
  ProjectTagRecord,
  ProjectViewModel,
} from '../../types/project';

type DbProjectWithRelations = ProjectRecord & {
  project_media: ProjectMediaRecord[] | null;
  project_tag_map: Array<{
    project_tags: ProjectTagRecord | null;
  }> | null;
};

const PROJECT_SELECT = `
  *,
  project_media(*),
  project_tag_map(project_tags(*))
`;

function toViewModel(project: DbProjectWithRelations): ProjectViewModel {
  const media = [...(project.project_media ?? [])].sort((a, b) => a.position - b.position);
  const cover = project.cover_image_url ?? media[0]?.media_url ?? '/placeholder-project.jpg';

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    desc: project.short_description,
    fullDesc: project.full_description,
    tags: (project.project_tag_map ?? [])
      .map((tagMap) => tagMap.project_tags?.name)
      .filter((name): name is string => Boolean(name)),
    image: cover,
    gallery: media.map((item) => item.media_url),
    details: {
      client: project.client ?? 'Undisclosed',
      year: project.year ? String(project.year) : 'N/A',
      role: project.role ?? 'N/A',
      duration: project.duration ?? 'N/A',
    },
    featured: project.featured,
    status: project.status,
    sortOrder: project.sort_order,
    metaTitle: project.meta_title,
    metaDescription: project.meta_description,
    ogImage: project.og_image_url,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  };
}

async function ensureTagIds(tagNames: string[]): Promise<string[]> {
  if (!tagNames.length) return [];
  const normalized = Array.from(new Set(tagNames.map((tag) => tag.trim()).filter(Boolean)));
  if (!normalized.length) return [];

  const inserts = normalized.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));

  const { error: upsertError } = await supabase
    .from('project_tags')
    .upsert(inserts, { onConflict: 'slug', ignoreDuplicates: false });

  if (upsertError) throw upsertError;

  const { data, error } = await supabase
    .from('project_tags')
    .select('id,name')
    .in('name', normalized);

  if (error) throw error;
  return data.map((item) => item.id as string);
}

async function replaceProjectTags(projectId: string, tagIds: string[]) {
  const { error: deleteError } = await supabase
    .from('project_tag_map')
    .delete()
    .eq('project_id', projectId);

  if (deleteError) throw deleteError;

  if (!tagIds.length) return;
  const records = tagIds.map((tagId) => ({ project_id: projectId, tag_id: tagId }));
  const { error: insertError } = await supabase.from('project_tag_map').insert(records);
  if (insertError) throw insertError;
}

async function replaceProjectMedia(projectId: string, media: ProjectEditorPayload['gallery']) {
  const { error: deleteError } = await supabase
    .from('project_media')
    .delete()
    .eq('project_id', projectId);

  if (deleteError) throw deleteError;

  if (!media.length) return;
  const payload = media.map((item, index) => ({
    project_id: projectId,
    media_url: item.mediaUrl,
    media_type: item.mediaType,
    alt: item.alt || null,
    caption: item.caption || null,
    position: Number.isFinite(item.position) ? item.position : index,
  }));
  const { error: insertError } = await supabase.from('project_media').insert(payload);
  if (insertError) throw insertError;
}

export async function getPublishedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data as DbProjectWithRelations[]).map(toViewModel);
}

export async function getFeaturedProjects(limit = 4) {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('status', 'published')
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data as DbProjectWithRelations[]).map(toViewModel);
}

export async function getPublishedProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  if (error) throw error;
  return data ? toViewModel(data as DbProjectWithRelations) : null;
}

export async function getAdminProjectById(id: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? (data as DbProjectWithRelations) : null;
}

export async function getAdminProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_SELECT)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data as DbProjectWithRelations[]).map(toViewModel);
}

export async function updateProjectFlags(
  projectId: string,
  updates: Partial<Pick<ProjectRecord, 'status' | 'featured' | 'sort_order'>>,
) {
  const { error } = await supabase.from('projects').update(updates).eq('id', projectId);
  if (error) throw error;
}

export async function upsertProject(payload: ProjectEditorPayload): Promise<string> {
  const projectInsert = {
    id: payload.id,
    slug: payload.slug,
    title: payload.title,
    short_description: payload.shortDescription,
    full_description: payload.fullDescription,
    client: payload.client || null,
    year: payload.year,
    role: payload.role || null,
    duration: payload.duration || null,
    featured: payload.featured,
    status: payload.status,
    sort_order: payload.sortOrder,
    cover_image_url: payload.coverImageUrl || null,
    meta_title: payload.metaTitle || null,
    meta_description: payload.metaDescription || null,
    og_image_url: payload.ogImageUrl || null,
  };

  const { data, error } = await supabase
    .from('projects')
    .upsert(projectInsert)
    .select('id')
    .single();

  if (error) throw error;
  const projectId = data.id as string;

  const tagIds = await ensureTagIds(payload.tags);
  await replaceProjectTags(projectId, tagIds);
  await replaceProjectMedia(projectId, payload.gallery);
  return projectId;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from('projects').delete().eq('id', projectId);
  if (error) throw error;
}

export async function uploadProjectAsset(file: File, folder = 'general') {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${fileExt}`;
  const { data, error } = await supabase.storage.from('project-assets').upload(path, file, {
    upsert: false,
  });
  if (error) throw error;
  const { data: publicUrlData } = supabase.storage.from('project-assets').getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}

export function inferMediaType(url: string): MediaType {
  return url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mp4') ? 'video' : 'image';
}
