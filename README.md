# Portfolio + Supabase Admin

This project is a dynamic portfolio powered by Supabase. Public project pages are data-driven, and the owner can manage content from `/admin`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)

## Environment

Create a `.env.local` file:

```bash
VITE_SUPABASE_URL=https://mfsesrkpjjcjbrueemeu.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Supabase Setup

1. Apply migration from `supabase/migrations/20260401173000_portfolio_backend.sql`.
2. Seed initial content from `supabase/seed.sql`.
3. Ensure `.cursor/mcp.json` is configured for your project MCP.

## Admin Dashboard

- Login route: `/admin/login`
- Dashboard route: `/admin`
- Inbox route: `/admin/inbox`
- Create project: `/admin/projects/new`
- Edit project: `/admin/projects/:id/edit`

The app uses RLS + `public.admin_users` to restrict admin actions.

## Included Features

- Dynamic project pages by slug (`/project/:slug`)
- Public portfolio search/filter/pagination
- Admin project search/filter/pagination + publish/feature quick actions
- Asset uploads to Supabase Storage (`project-assets`) from admin project form
- Public contact form submissions stored in Supabase
- EmailJS notification trigger after contact submission
- Admin inbox with status labels (`new`, `in_progress`, `resolved`, `spam`)
- SEO metadata via `react-helmet-async` for home, projects, and project detail pages

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```
