import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getPublishedProjects } from '../../lib/supabase/projects';
import type { ProjectViewModel } from '../../types/project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    document.title = 'Full Portfolio';
    let mounted = true;
    getPublishedProjects()
      .then((rows) => {
        if (!mounted) return;
        setProjects(rows);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Could not load projects.');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const availableTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();
  const filteredProjects = projects.filter((project) => {
    const q = search.trim().toLowerCase();
    const matchesText =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.desc.toLowerCase().includes(q) ||
      project.tags.some((tag) => tag.toLowerCase().includes(q));
    const matchesTag = tagFilter === 'all' || project.tags.includes(tagFilter);
    return matchesText && matchesTag;
  });
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const startIndex = (safePage - 1) * pageSize;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <Helmet>
        <title>Full Portfolio | Mohamed Ashraf</title>
        <meta
          name="description"
          content="Browse all published portfolio projects with filters and search. Updated dynamically from Supabase."
        />
        <meta property="og:title" content="Full Portfolio | Mohamed Ashraf" />
      </Helmet>
      <div className="max-w-7xl mx-auto space-y-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Home</span>
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-serif">
            Full <span className="text-gold italic">Portfolio</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A dynamic archive connected to Supabase and controlled from the admin dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search projects..."
            className="md:col-span-2 bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          />
          <select
            value={tagFilter}
            onChange={(event) => {
              setTagFilter(event.target.value);
              setPage(1);
            }}
            className="bg-card border border-white/10 rounded-lg p-3 focus:outline-none focus:border-gold"
          >
            <option value="all">All tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-muted-foreground">Loading projects...</p>}
        {error && <p className="text-destructive">{error}</p>}
        {!loading && !error && filteredProjects.length === 0 && (
          <p className="text-muted-foreground">No published projects yet. Publish from admin dashboard.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-500"
            >
              <Link to={`/project/${project.slug}`}>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{project.desc}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-gold transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 text-white/60 text-[10px] uppercase tracking-widest rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {!loading && !error && filteredProjects.length > pageSize && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredProjects.length)} of {filteredProjects.length}
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
