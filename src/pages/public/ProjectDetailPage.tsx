import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getPublishedProjectBySlug, inferMediaType } from '../../lib/supabase/projects';
import type { ProjectViewModel } from '../../types/project';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const [project, setProject] = useState<ProjectViewModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    getPublishedProjectBySlug(slug)
      .then((row) => {
        if (!mounted) return;
        setProject(row);
        setError(null);
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
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    document.title = project.metaTitle || `${project.title} | Portfolio Project`;
  }, [project]);

  const gallery = useMemo(() => {
    if (!project) return [];
    return project.gallery.length ? project.gallery : [project.image];
  }, [project]);

  const activeMedia = gallery[currentImageIndex];
  const mediaType = inferMediaType(activeMedia || '');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-serif">Could not load project</h1>
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-serif">Project Not Found</h1>
        <Link to="/projects" className="text-gold underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 md:px-12">
      <Helmet>
        <title>{project.metaTitle || `${project.title} | Portfolio Project`}</title>
        {project.metaDescription && <meta name="description" content={project.metaDescription} />}
        <meta property="og:title" content={project.metaTitle || project.title} />
        {project.metaDescription && <meta property="og:description" content={project.metaDescription} />}
        {project.ogImage && <meta property="og:image" content={project.ogImage} />}
      </Helmet>
      <div className="max-w-7xl mx-auto space-y-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-sm">
              {project.tags[0] || 'Project'}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight">{project.title}</h1>
            <p className="text-muted-foreground text-lg">{project.desc}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="border border-white/10 rounded-lg p-4">
                <p className="text-white/50 uppercase tracking-widest text-[10px]">Client</p>
                <p>{project.details.client}</p>
              </div>
              <div className="border border-white/10 rounded-lg p-4">
                <p className="text-white/50 uppercase tracking-widest text-[10px]">Year</p>
                <p>{project.details.year}</p>
              </div>
              <div className="border border-white/10 rounded-lg p-4">
                <p className="text-white/50 uppercase tracking-widest text-[10px]">Role</p>
                <p>{project.details.role}</p>
              </div>
              <div className="border border-white/10 rounded-lg p-4">
                <p className="text-white/50 uppercase tracking-widest text-[10px]">Duration</p>
                <p>{project.details.duration}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-card aspect-video">
              {mediaType === 'video' ? (
                <video src={activeMedia} controls className="w-full h-full object-cover" />
              ) : (
                <img src={activeMedia} alt={project.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs uppercase tracking-widest text-white/60">
                {currentImageIndex + 1} / {gallery.length}
              </span>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % gallery.length)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold"
                aria-label="Next media"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <section className="space-y-6 max-w-4xl">
          <h2 className="text-2xl font-serif">Project Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{project.fullDesc}</p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 text-sm rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
