-- Supabase backend for dynamic portfolio + admin dashboard.
create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text not null,
  full_description text not null,
  client text,
  year int,
  role text,
  duration text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order int not null default 100,
  cover_image_url text,
  meta_title text,
  meta_description text,
  og_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  media_url text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  alt text,
  caption text,
  position int not null default 0
);

create table if not exists public.project_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique
);

create table if not exists public.project_tag_map (
  project_id uuid not null references public.projects(id) on delete cascade,
  tag_id uuid not null references public.project_tags(id) on delete cascade,
  primary key (project_id, tag_id)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_status_sort on public.projects(status, sort_order);
create index if not exists idx_projects_featured on public.projects(featured);
create index if not exists idx_media_project_position on public.project_media(project_id, position);
create index if not exists idx_project_tag_map_project on public.project_tag_map(project_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.project_tags enable row level security;
alter table public.project_tag_map enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "public_read_published_projects" on public.projects;
create policy "public_read_published_projects"
on public.projects
for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "admin_manage_projects" on public.projects;
create policy "admin_manage_projects"
on public.projects
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public_read_published_media" on public.project_media;
create policy "public_read_published_media"
on public.project_media
for select
to anon, authenticated
using (
  exists (
    select 1 from public.projects p
    where p.id = project_id
      and (p.status = 'published' or public.is_admin())
  )
);

drop policy if exists "admin_manage_media" on public.project_media;
create policy "admin_manage_media"
on public.project_media
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public_read_tags" on public.project_tags;
create policy "public_read_tags"
on public.project_tags
for select
to anon, authenticated
using (true);

drop policy if exists "admin_manage_tags" on public.project_tags;
create policy "admin_manage_tags"
on public.project_tags
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "public_read_project_tag_map" on public.project_tag_map;
create policy "public_read_project_tag_map"
on public.project_tag_map
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and (p.status = 'published' or public.is_admin())
  )
);

drop policy if exists "admin_manage_project_tag_map" on public.project_tag_map;
create policy "admin_manage_project_tag_map"
on public.project_tag_map
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin_read_admin_users" on public.admin_users;
create policy "admin_read_admin_users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-assets', 'project-assets', true)
on conflict (id) do nothing;

drop policy if exists "public_can_read_project_assets" on storage.objects;
create policy "public_can_read_project_assets"
on storage.objects
for select
to public
using (bucket_id = 'project-assets');

drop policy if exists "admin_can_upload_project_assets" on storage.objects;
create policy "admin_can_upload_project_assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-assets' and public.is_admin());

drop policy if exists "admin_can_update_project_assets" on storage.objects;
create policy "admin_can_update_project_assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-assets' and public.is_admin())
with check (bucket_id = 'project-assets' and public.is_admin());

drop policy if exists "admin_can_delete_project_assets" on storage.objects;
create policy "admin_can_delete_project_assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-assets' and public.is_admin());
