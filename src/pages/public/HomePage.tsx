import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import WhyWorkWithMe from '../../components/WhyWorkWithMe';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { getFeaturedProjects } from '../../lib/supabase/projects';
import { submitContactForm } from '../../lib/supabase/contacts';
import { sendContactNotification } from '../../lib/emailjs';
import type { ProjectViewModel } from '../../types/project';

const MIN_MESSAGE_LENGTH = 20;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WHATSAPP_REGEX = /^\+?[0-9\s\-()]{8,20}$/;

type ContactValues = {
  fullName: string;
  email: string;
  whatsapp: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactValues, string>>;

function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const messageText = values.message.trim();
  const whatsappValue = values.whatsapp.trim();
  const whatsappDigits = whatsappValue.replace(/\D/g, '');

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (whatsappValue) {
    if (!WHATSAPP_REGEX.test(whatsappValue) || whatsappDigits.length < 8 || whatsappDigits.length > 15) {
      errors.whatsapp = 'Enter a valid WhatsApp number, e.g. +201001234567.';
    }
  }

  if (messageText.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message should be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactValues>({ fullName: '', email: '', whatsapp: '', message: '' });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<keyof ContactValues, boolean>>({
    fullName: false,
    email: false,
    whatsapp: false,
    message: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [submitStatusTone, setSubmitStatusTone] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    document.title = 'Portfolio | Mohamed Ashraf';
    let mounted = true;
    getFeaturedProjects(4)
      .then((rows) => {
        if (mounted) {
          setProjects(rows);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load projects.');
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleContactSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validateContact(contact);
    if (Object.keys(nextErrors).length > 0) {
      setContactErrors(nextErrors);
      setTouched({ fullName: true, email: true, whatsapp: true, message: true });
      setSubmitStatus('Please fix the highlighted fields before sending.');
      setSubmitStatusTone('error');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitStatus(null);
      setSubmitStatusTone(null);
      await submitContactForm(contact);
      try {
        await sendContactNotification(contact);
      } catch (emailErr) {
        console.warn('Contact saved, but EmailJS notification failed.', emailErr);
      }
      setContact({ fullName: '', email: '', whatsapp: '', message: '' });
      setContactErrors({});
      setTouched({ fullName: false, email: false, whatsapp: false, message: false });
      setSubmitStatus('Message sent successfully. I will get back to you soon.');
      setSubmitStatusTone('success');
    } catch (err: unknown) {
      setSubmitStatus(err instanceof Error ? err.message : 'Could not send message. Please try again.');
      setSubmitStatusTone('error');
    } finally {
      setSubmitting(false);
    }
  }

  function handleContactChange(field: keyof ContactValues, value: string) {
    const nextContact = { ...contact, [field]: value };
    setContact(nextContact);
    if (touched[field]) {
      setContactErrors(validateContact(nextContact));
    }
  }

  function handleContactBlur(field: keyof ContactValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setContactErrors(validateContact(contact));
  }

  return (
    <main className="pt-28">
      <Helmet>
        <title>Portfolio | Mohamed Ashraf</title>
        <meta
          name="description"
          content="UI/UX portfolio of Mohamed Ashraf featuring product design, brand systems, and conversion-focused digital experiences."
        />
        <meta property="og:title" content="Portfolio | Mohamed Ashraf" />
        <meta
          property="og:description"
          content="Explore featured case studies and product design work, dynamically powered by Supabase."
        />
      </Helmet>
      <section id="home" className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-gold uppercase tracking-[0.25em] text-xs">Hey, I am Mohamed Ashraf</h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight">
              UI/UX, Product, and <span className="text-gold italic">Brand Design</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Transforming complex ideas into clear digital experiences that improve user journeys and business outcomes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/#contact"
                className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-gold-hover transition-all rounded-sm"
              >
                Contact Me
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 border border-white/20 font-bold uppercase tracking-widest text-xs hover:border-gold hover:text-gold transition-all rounded-sm"
              >
                Full Portfolio
              </Link>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0, 10, 0], rotate: [0, 1.2, 0, -1.2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-gold/45"
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-3 rounded-full border border-gold/20 border-dashed"
            />
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.15, 0.45] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gold/10 blur-xl"
            />
            <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.25)]">
              <img
                src="/mohamed_profile_transparent_v2.png"
                alt="Mohamed Ashraf profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-t border-white/10 mx-6 md:mx-12" />

      <section id="about" className="py-20 px-6 md:px-12 bg-deep-black">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">About me</p>
          <h2 className="text-4xl md:text-6xl font-serif">
            Built on <span className="text-gold italic">clarity</span> and measurable impact
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I work with founders and teams to shape better product journeys, from strategy and UX architecture to scalable
            interfaces. Every decision is validated through usability, business goals, and long-term maintainability.
          </p>
        </div>
      </section>

      <WhyWorkWithMe />

      <section id="portfolio" className="py-24 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif">
                Featured <span className="text-gold italic">Work</span>
              </h2>
              <p className="text-muted-foreground mt-3">Designed to spark curiosity, these are the projects that bring ideas to life.</p>
            </div>
            <Link to="/projects" className="text-xs uppercase tracking-widest text-gold hover:text-gold-hover">
              View all
            </Link>
          </div>

          {loading && <p className="text-muted-foreground">Loading featured projects...</p>}
          {error && <p className="text-destructive">{error}</p>}
          {!loading && !error && projects.length === 0 && (
            <p className="text-muted-foreground">No featured projects published yet.</p>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="group border border-white/10 rounded-2xl overflow-hidden bg-card/40"
              >
                <Link to={`/project/${project.slug}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-serif group-hover:text-gold transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground">{project.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 border border-gold/30 text-gold text-[10px] uppercase tracking-widest"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gold">
                      View details <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 md:scroll-mt-32 py-24 px-6 md:px-12 bg-deep-black">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-6xl font-serif">
            Ready to build something <span className="text-gold italic">high impact</span>?
          </h2>
          <p className="text-muted-foreground">
            Available for freelance projects, product partnerships, and long-term engagements.
          </p>
          <form onSubmit={handleContactSubmit} noValidate className="text-left space-y-4 bg-card/30 border border-white/10 rounded-2xl p-4 sm:p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contact-full-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Full name
                </label>
                <Input
                  id="contact-full-name"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  value={contact.fullName}
                  onChange={(event) => handleContactChange('fullName', event.target.value)}
                  onBlur={() => handleContactBlur('fullName')}
                  aria-invalid={Boolean(touched.fullName && contactErrors.fullName)}
                  aria-describedby={touched.fullName && contactErrors.fullName ? 'contact-full-name-error' : undefined}
                  className="bg-black/60 border-white/15 focus-visible:ring-gold/60"
                />
                {touched.fullName && contactErrors.fullName && (
                  <p id="contact-full-name-error" className="text-xs text-destructive">
                    {contactErrors.fullName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <Input
                  id="contact-email"
                  required
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={contact.email}
                  onChange={(event) => handleContactChange('email', event.target.value)}
                  onBlur={() => handleContactBlur('email')}
                  aria-invalid={Boolean(touched.email && contactErrors.email)}
                  aria-describedby={touched.email && contactErrors.email ? 'contact-email-error' : undefined}
                  className="bg-black/60 border-white/15 focus-visible:ring-gold/60"
                />
                {touched.email && contactErrors.email && (
                  <p id="contact-email-error" className="text-xs text-destructive">
                    {contactErrors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-whatsapp" className="text-xs uppercase tracking-wider text-muted-foreground">
                WhatsApp (optional)
              </label>
              <Input
                id="contact-whatsapp"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+201001234567"
                value={contact.whatsapp}
                onChange={(event) => handleContactChange('whatsapp', event.target.value)}
                onBlur={() => handleContactBlur('whatsapp')}
                aria-invalid={Boolean(touched.whatsapp && contactErrors.whatsapp)}
                aria-describedby={touched.whatsapp && contactErrors.whatsapp ? 'contact-whatsapp-error' : undefined}
                className="bg-black/60 border-white/15 focus-visible:ring-gold/60"
              />
              {touched.whatsapp && contactErrors.whatsapp && (
                <p id="contact-whatsapp-error" className="text-xs text-destructive">
                  {contactErrors.whatsapp}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <span className="text-[11px] text-muted-foreground">
                  Min {MIN_MESSAGE_LENGTH} chars ({contact.message.trim().length}/{MIN_MESSAGE_LENGTH})
                </span>
              </div>
              <Textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                value={contact.message}
                onChange={(event) => handleContactChange('message', event.target.value)}
                onBlur={() => handleContactBlur('message')}
                aria-invalid={Boolean(touched.message && contactErrors.message)}
                aria-describedby={touched.message && contactErrors.message ? 'contact-message-error' : undefined}
                className="bg-black/60 border-white/15 focus-visible:ring-gold/60"
              />
              {touched.message && contactErrors.message && (
                <p id="contact-message-error" className="text-xs text-destructive">
                  {contactErrors.message}
                </p>
              )}
            </div>
            {submitStatus && (
              <p className={`text-sm ${submitStatusTone === 'error' ? 'text-destructive' : 'text-muted-foreground'}`}>
                {submitStatus}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 min-h-11 px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-gold-hover disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Start a project'} <ArrowUpRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
