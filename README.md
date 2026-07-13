# Portfolio + Supabase Admin

This project is a dynamic portfolio powered by Supabase. Public project pages are data-driven, and the owner can manage content from `/admin`.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (`@supabase/supabase-js`)

## Environment

For local development, create a `.env.local` file (see `.env.example`).

Production builds use `.env.production` (committed public client keys). Vite inlines these at build time for Vercel.

## Deploy on Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com/new).
2. Framework preset: **Vite** (auto-detected). Build: `npm run build`. Output: `dist`.
3. Deploy. SPA routes are handled by `vercel.json` rewrites.
4. Point the custom domain (`mohamedashrafkhadra.com`) to Vercel in Project → Settings → Domains.
5. In Supabase → Authentication → URL configuration, add the Vercel URL and custom domain to **Site URL** / **Redirect URLs**.

Optional: override env vars in Vercel → Settings → Environment Variables (`VITE_*`). Project values override `.env.production` when set.

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
