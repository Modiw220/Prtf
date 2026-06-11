import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useState, type Dispatch, type SetStateAction } from 'react';

export default function GraphicDesignPage() {
  const deliveGoSlides = [
    '/Graphic%20Design/2.png',
    '/Graphic%20Design/3.jpg',
    '/Graphic%20Design/4.jpg',
    '/Graphic%20Design/5.jpg',
    '/Graphic%20Design/6.jpg',
    '/Graphic%20Design/7.jpg',
    '/Graphic%20Design/8.jpg',
    '/Graphic%20Design/9.jpg',
    '/Graphic%20Design/10.jpg',
  ];

  const sawwahSlides = [
    '/Graphic%20Design/12.png',
    '/Graphic%20Design/13.jpg',
    '/Graphic%20Design/14.jpg',
    '/Graphic%20Design/15.jpg',
    '/Graphic%20Design/16.jpg',
    '/Graphic%20Design/17.jpg',
    '/Graphic%20Design/18.jpg',
    '/Graphic%20Design/19.jpg',
    '/Graphic%20Design/20.jpg',
  ];

  const pearlSlides = [
    '/Graphic%20Design/22.png',
    '/Graphic%20Design/23.jpg',
    '/Graphic%20Design/24.jpg',
    '/Graphic%20Design/25.jpg',
    '/Graphic%20Design/26.jpg',
    '/Graphic%20Design/27.jpg',
    '/Graphic%20Design/28.jpg',
    '/Graphic%20Design/29.jpg',
    '/Graphic%20Design/30.jpg',
  ];

  const translationSlides = [
    '/Graphic%20Design/32.png',
    '/Graphic%20Design/33.jpg',
    '/Graphic%20Design/34.jpg',
    '/Graphic%20Design/35.jpg',
    '/Graphic%20Design/36.jpg',
    '/Graphic%20Design/37.jpg',
    '/Graphic%20Design/38.jpg',
    '/Graphic%20Design/39.jpg',
    '/Graphic%20Design/40.jpg',
  ];

  const pioneersSlides = [
    '/Graphic%20Design/41.png',
    '/Graphic%20Design/42.jpg',
    '/Graphic%20Design/43.jpg',
    '/Graphic%20Design/44.jpg',
    '/Graphic%20Design/45.jpg',
    '/Graphic%20Design/46.jpg',
    '/Graphic%20Design/47.jpg',
    '/Graphic%20Design/48.jpg',
    '/Graphic%20Design/49.jpg',
  ];

  const [deliveCurrent, setDeliveCurrent] = useState(0);
  const [sawwahCurrent, setSawwahCurrent] = useState(0);
  const [pearlCurrent, setPearlCurrent] = useState(0);
  const [translationCurrent, setTranslationCurrent] = useState(0);
  const [pioneersCurrent, setPioneersCurrent] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  function handlePrev(slides: string[], setCurrent: Dispatch<SetStateAction<number>>) {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }

  function handleNext(slides: string[], setCurrent: Dispatch<SetStateAction<number>>) {
    setCurrent((c) => (c + 1) % slides.length);
  }

  const CarouselItem = ({
    title,
    slides,
    current,
    setCurrent,
    openLightbox,
  }: {
    title: string;
    slides: string[];
    current: number;
    setCurrent: Dispatch<SetStateAction<number>>;
    openLightbox: (src: string) => void;
  }) => (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="space-y-4">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
        <div
          className="relative bg-black/10 rounded-md overflow-hidden aspect-square cursor-pointer"
          onClick={() => openLightbox(slides[current])}
        >
          <img src={slides[current]} alt={`Slide ${current + 1}`} className="w-full h-full object-cover" />
          <button
            onClick={(event) => {
              event.stopPropagation();
              handlePrev(slides, setCurrent);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 active:scale-90 active:bg-gold/70"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleNext(slides, setCurrent);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 active:scale-90 active:bg-gold/70"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {slides.map((s, i) => (
            <button
              key={s}
              onClick={() => {
                setCurrent(i);
                openLightbox(s);
              }}
              className={`h-12 w-12 md:h-16 md:w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                i === current ? 'border-gold' : 'border-white/10'
              }`}
            >
              <img src={s} alt={`thumb-${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </article>
  );

  return (
    <main className="pt-28 min-h-screen px-6 md:px-12 py-20">
      <Helmet>
        <title>Graphic Design | Mohamed Ashraf</title>
        <meta
          name="description"
          content="Explore graphic design projects and branding work by Mohamed Ashraf."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto space-y-10">
        <section className="space-y-6">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gold font-bold">
            <span>New</span>
            <span className="h-px w-16 bg-gold/40" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">Graphic Design</h1>
          <p className="max-w-3xl text-muted-foreground text-lg leading-relaxed">
            Discover refined visual identities, social campaigns, and video work created to elevate each
            project with thoughtful typography, color, and composition.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-6 py-3 border border-white/10 text-white text-xs uppercase tracking-[0.2em] font-bold hover:border-gold hover:text-gold transition-all rounded-sm"
            >
              Back to Home
            </Link>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Social Media Campaigns</h2>
          <p className="text-muted-foreground leading-relaxed">
            Campaigns and posts created for social platforms — case studies, hero visuals, and recurring
            content series.
          </p>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <CarouselItem
              title="DeliveGo Driver Recruitment"
              slides={deliveGoSlides}
              current={deliveCurrent}
              setCurrent={setDeliveCurrent}
              openLightbox={setLightboxSrc}
            />

            <CarouselItem
              title="Sawwah Travel Agency Turkey"
              slides={sawwahSlides}
              current={sawwahCurrent}
              setCurrent={setSawwahCurrent}
              openLightbox={setLightboxSrc}
            />

            <CarouselItem
              title="The Pearl Fresh Fish Qatar"
              slides={pearlSlides}
              current={pearlCurrent}
              setCurrent={setPearlCurrent}
              openLightbox={setLightboxSrc}
            />

            <CarouselItem
              title="Services & Translation Pioneers"
              slides={translationSlides}
              current={translationCurrent}
              setCurrent={setTranslationCurrent}
              openLightbox={setLightboxSrc}
            />

            <CarouselItem
              title="Sawwah Travel Agency Turkey"
              slides={pioneersSlides}
              current={pioneersCurrent}
              setCurrent={setPioneersCurrent}
              openLightbox={setLightboxSrc}
            />
          </div>
        </section>

        {lightboxSrc ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightboxSrc(null)}
          >
            <img
              src={lightboxSrc}
              alt="Fullscreen preview"
              className="max-h-full max-w-full rounded-3xl shadow-2xl border border-white/10"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        ) : null}

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Videos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Short-form and campaign videos produced for social channels.
          </p>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-none">
            {Array.from({ length: 14 }, (_, index) => (
              <video key={index + 1} controls className="w-full rounded-lg bg-black">
                <source src={`/Graphic%20Design/Videos/${index + 1}.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
