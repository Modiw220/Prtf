create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  whatsapp text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_submissions_status_created
  on public.contact_submissions(status, created_at desc);

drop trigger if exists trg_contact_submissions_updated_at on public.contact_submissions;
create trigger trg_contact_submissions_updated_at
before update on public.contact_submissions
for each row execute procedure public.set_updated_at();

alter table public.contact_submissions enable row level security;

drop policy if exists "anon_can_create_contact_submission" on public.contact_submissions;
create policy "anon_can_create_contact_submission"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "admin_can_read_contact_submissions" on public.contact_submissions;
create policy "admin_can_read_contact_submissions"
on public.contact_submissions
for select
to authenticated
using (public.is_admin());

drop policy if exists "admin_can_update_contact_submissions" on public.contact_submissions;
create policy "admin_can_update_contact_submissions"
on public.contact_submissions
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin_can_delete_contact_submissions" on public.contact_submissions;
create policy "admin_can_delete_contact_submissions"
on public.contact_submissions
for delete
to authenticated
using (public.is_admin());
