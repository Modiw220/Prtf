export type ProjectStatus = 'draft' | 'published';
export type MediaType = 'image' | 'video';

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  client: string | null;
  year: number | null;
  role: string | null;
  duration: string | null;
  featured: boolean;
  status: ProjectStatus;
  sort_order: number;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectMediaRecord {
  id: string;
  project_id: string;
  media_url: string;
  media_type: MediaType;
  alt: string | null;
  caption: string | null;
  position: number;
}

export interface ProjectTagRecord {
  id: string;
  slug: string;
  name: string;
}

export interface ProjectTagMapRecord {
  project_id: string;
  tag_id: string;
}

export interface ProjectViewModel {
  id: string;
  slug: string;
  title: string;
  desc: string;
  fullDesc: string;
  tags: string[];
  image: string;
  gallery: string[];
  details: {
    client: string;
    year: string;
    role: string;
    duration: string;
  };
  featured: boolean;
  status: ProjectStatus;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectEditorPayload {
  id?: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  client: string;
  year: number | null;
  role: string;
  duration: string;
  featured: boolean;
  status: ProjectStatus;
  sortOrder: number;
  coverImageUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  tags: string[];
  gallery: Array<{
    mediaUrl: string;
    mediaType: MediaType;
    alt: string;
    caption: string;
    position: number;
  }>;
}
