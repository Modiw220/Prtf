import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProjects, deleteProject, updateProjectFlags } from '../../lib/supabase/projects';
import { signOut } from '../../lib/supabase/auth';
import type { ProjectViewModel } from '../../types/project';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'not_featured'>('all');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  async function loadProjects() {
    try {
      setLoading(true);
      const rows = await getAdminProjects();
      setProjects(rows);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  async function handleDelete(id: string) {
    const ok = window.confirm('Delete this project? This action cannot be undone.');
    if (!ok) return;
    await deleteProject(id);
    await loadProjects();
  }

  async function handleToggleStatus(project: ProjectViewModel) {
    await updateProjectFlags(project.id, { status: project.status === 'published' ? 'draft' : 'published' });
    await loadProjects();
  }

  async function handleToggleFeatured(project: ProjectViewModel) {
    await updateProjectFlags(project.id, { featured: !project.featured });
    await loadProjects();
  }

  const filtered = projects.filter((project) => {
    const q = search.trim().toLowerCase();
    const qMatch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.slug.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q));
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    const featuredMatch =
      featuredFilter === 'all' ||
      (featuredFilter === 'featured' && project.featured) ||
      (featuredFilter === 'not_featured' && !project.featured);
    return qMatch && statusMatch && featuredMatch;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * pageSize;
  const pagedProjects = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap gap-3 justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif">Portfolio Admin</h1>
            <p className="text-muted-foreground mt-2">Manage projects, publish status, and featured visibility.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/inbox"
              className="px-5 py-3 border border-gold/40 text-gold text-xs uppercase tracking-widest font-bold rounded-sm"
            >
              Inbox
            </Link>
            <Link
              to="/admin/projects/new"
              className="px-5 py-3 bg-gold text-black text-xs uppercase tracking-widest font-bold rounded-sm"
            >
              New Project
            </Link>
            <button
              onClick={handleSignOut}
              className="px-5 py-3 border border-white/20 text-xs uppercase tracking-widest font-bold rounded-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="md:col-span-1 bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <select
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value as 'all' | 'draft' | 'published');
              setPage(1);
            }}
            className="bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={featuredFilter}
            onChange={(event) => {
              setFeaturedFilter(event.target.value as 'all' | 'featured' | 'not_featured');
              setPage(1);
            }}
            className="bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          >
            <option value="all">All featured states</option>
            <option value="featured">Featured</option>
            <option value="not_featured">Not featured</option>
          </select>
        </div>

        {loading && <p className="text-muted-foreground">Loading projects...</p>}
        {error && <p className="text-destructive text-sm">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto border border-white/10 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="p-4">Title</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Updated</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedProjects.map((project) => (
                  <tr key={project.id} className="border-t border-white/10">
                    <td className="p-4">{project.title}</td>
                    <td className="p-4 text-white/60">{project.slug}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest ${
                          project.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4">{project.featured ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-white/60">{new Date(project.updatedAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            void handleToggleStatus(project);
                          }}
                          className="px-3 py-1 border border-white/20 rounded text-xs uppercase tracking-widest"
                        >
                          {project.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => {
                            void handleToggleFeatured(project);
                          }}
                          className="px-3 py-1 border border-gold/30 text-gold rounded text-xs uppercase tracking-widest"
                        >
                          {project.featured ? 'Unfeature' : 'Feature'}
                        </button>
                        <Link
                          to={`/admin/projects/${project.id}/edit`}
                          className="px-3 py-1 border border-white/20 rounded text-xs uppercase tracking-widest"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            void handleDelete(project.id);
                          }}
                          className="px-3 py-1 border border-destructive/40 text-destructive rounded text-xs uppercase tracking-widest"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-muted-foreground">
                      No projects match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filtered.length > pageSize && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={safePage === 1}
                className="px-3 py-2 border border-white/20 rounded text-xs uppercase tracking-widest disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-2 text-xs uppercase tracking-widest">
                {safePage}/{pageCount}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
                disabled={safePage === pageCount}
                className="px-3 py-2 border border-white/20 rounded text-xs uppercase tracking-widest disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
