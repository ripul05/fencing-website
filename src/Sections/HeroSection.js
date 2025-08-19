import { useEffect, useState } from 'react';
import { sanityClient } from '../Sanity/sanityClient';
import { urlFor } from '../Sanity/imageBuilder';

/* GROQ – param-driven */
const HERO_BY_SLUG = `*[_type=="heroSection" && slug.current==$slug][0]{
  title {first, second, third},
  tagline,
  description,
  background {asset, alt},
  backgroundMobile {asset, alt},
  primaryCta {text, url, newTab},
  secondaryCta {text, action}
}`;

export default function HeroSection({ slug = 'landing-page' }) {
  const [data, setData] = useState(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    sanityClient.fetch(HERO_BY_SLUG, { slug }).then(setData);
  }, [slug]);

  useEffect(() => {
    let t;
    const onResize = () => {
      setIsResizing(true);
      clearTimeout(t);
      t = setTimeout(() => setIsResizing(false), 300);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!data)
    return (
      <section className="min-h-screen flex items-center justify-center bg-primary-900">
        <p className="text-white text-xl animate-pulse">Loading…</p>
      </section>
    );

  const runSecondary = () => {
    const a = data.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith('scroll:')) {
      document.getElementById(a.replace('scroll:', ''))?.scrollIntoView({ behavior: 'smooth' });
    } else if (a.startsWith('/')) {
      window.location.href = a;
    } else {
      window.open(a, '_self');
    }
  };

  const desktopImg = urlFor(data.background.asset).width(1920).format('webp').quality(80).url();
  const mobileImg = data.backgroundMobile?.asset
    ? urlFor(data.backgroundMobile.asset).width(768).format('webp').quality(75).url()
    : null;

  return (
    <section
      className={`relative min-h-screen flex items-center bg-primary-900 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* ─── background image ─── */}
      <div className="absolute inset-0">
        {mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={mobileImg} />
            <img src={desktopImg} alt={data.background.alt} className="w-full h-full object-cover animate-fade-in" />
          </picture>
        ) : (
          <img src={desktopImg} alt={data.background.alt} className="w-full h-full object-cover animate-fade-in" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 via-primary-900/70 to-primary-900/90" />
      </div>

      {/* ─── content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white space-y-12">
        {/* heading */}
        <div className="space-y-8">
          <h1 className="text-hero font-extralight leading-none tracking-tight">
            <span>{data.title.first}</span>
            <span className="block text-accent-400 font-normal">{data.title.second}</span>
            <span>{data.title.third}</span>
          </h1>
        </div>

        {/* tagline & description */}
        {data.tagline && <h2 className="text-xl lg:text-2xl tracking-widest">{data.tagline}</h2>}
        {data.description && <p className="text-lg lg:text-xl max-w-3xl mx-auto font-light">{data.description}</p>}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
          {data.primaryCta && (
            <a
              href={data.primaryCta.url}
              target={data.primaryCta.newTab ? '_blank' : '_self'}
              rel={data.primaryCta.newTab ? 'noopener noreferrer' : ''}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition"
            >
              {data.primaryCta.text}
            </a>
          )}
          {data.secondaryCta && (
            <button
              onClick={runSecondary}
              className="px-10 py-4 border-2 border-white/40 text-white font-semibold rounded-xl hover:bg-white/20 transition"
            >
              {data.secondaryCta.text}
            </button>
          )}
        </div>
      </div>

      {/* turn off animations while resizing */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

