import { useState, useEffect, useRef, useMemo } from 'react'
import Navbar from '../HomePageComponent/Navbar'
import InfoBanner from '../HomePageComponent/InfoBanner'
import FooterSection from '../Sections/FooterSection';
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { YOUTH_FENCING_HERO_QUERY, PROGRAM_QUERIES } from '../Sanity/queries';

function YouthFencingHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef(null);

  // Fetch data
  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(YOUTH_FENCING_HERO_QUERY)
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setData(null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []); // keep hooks before returns [6][7]

  // Stable viewport height for iOS dynamic address bar
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh, { passive: true });
    window.addEventListener("orientationchange", setVh, { passive: true });
    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
    };
  }, []); // avoids 100vh jumps on mobile Safari [3][4]

  // Debounced resize: avoid repeated setState during address bar scroll
  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setIsResizing(false), 250);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer.current);
    };
  }, []); // reduce state churn [8][9]

  // Compute asset URLs unconditionally (safe hooks order)
  const desktopImg = useMemo(() => {
    if (!data?.background?.asset) return null;
    return urlFor(data.background.asset).width(1920).format("webp").quality(80).url();
  }, [data]); // [5]

  const mobileImg = useMemo(() => {
    if (!data?.backgroundMobile?.asset) return null;
    return urlFor(data.backgroundMobile.asset).width(768).format("webp").quality(75).url();
  }, [data]); // [5]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const runSecondary = () => {
    const a = data?.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith("scroll:")) {
      document.getElementById(a.replace("scroll:", ""))?.scrollIntoView({ behavior: "smooth" });
    } else if (a.startsWith("/")) {
      window.location.href = a;
    } else {
      window.open(a, "_self");
    }
  };

  if (loading) {
    return (
      <section className="min-h-[100dvh] sm:min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section
        className={`relative min-h-[100dvh] sm:min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center overflow-hidden px-4 sm:px-6 ${isResizing ? "no-animations" : ""}`}
        style={{ overscrollBehavior: "none" }}
      >
        {/* Fallback background */}
        <div className="absolute inset-0">
          <img
            src="/youthFencing/YouthFencingBg2.jpg"
            alt="Youth Fencing at Texas Fencing Academy"
            className="w-full h-full object-cover object-bottom"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70" />
        </div>

        {/* Decorative fencing motifs (no pulse to cut GPU churn) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12" />
          <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12" />
          <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent rotate-45" />
        </div>

        {/* Text & CTAs */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-[clamp(1.9rem,5vw,3.25rem)] lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg">
                <span className="block">YOUTH</span>
                <span className="block text-amber-400 font-normal drop-shadow-lg">FENCING</span>
                <span className="block">TEXAS FENCING ACADEMY</span>
              </h1>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
              <div className="w-9 sm:w-12 h-9 sm:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400 rounded-full" />
              </div>
              <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-[clamp(1.05rem,2.8vw,1.75rem)] lg:text-3xl font-light text-white tracking-[0.06em] sm:tracking-[0.15em] drop-shadow-md">
              WHERE FUTURE CHAMPIONS BEGIN
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="text-[clamp(1rem,2.6vw,1.125rem)] lg:text-xl text-white leading-relaxed font-light max-w-[60ch] sm:max-w-[65ch] mx-auto drop-shadow-sm">
              Excellence on the piste, character for life. Experience world-class
              fencing instruction for youth ages 6-17, nurturing discipline, focus,
              and sportsmanship in a safe and empowering environment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Join Our Youth Program</span>
            </a>

            <button
              onClick={() => scrollToSection("youth-programs")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">View Youth Programs</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative min-h-[100dvh] sm:min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center overflow-hidden px-4 sm:px-6 ${isResizing ? "no-animations" : ""}`}
      style={{ overscrollBehavior: "none" }} /* reduce scroll chaining/bounce */
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={mobileImg} />
            <img
              src={desktopImg || mobileImg}
              alt={data.background.alt || "Youth Fencing at Texas Fencing Academy"}
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        ) : (
          <img
            src={desktopImg}
            alt={data.background.alt || "Youth Fencing at Texas Fencing Academy"}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="sync"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70" />
      </div>

      {/* Refined fencing motifs (no pulse to cut GPU churn) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12" />
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12" />
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent rotate-45" />
      </div>

      {/* Text & CTAs */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
        <div className="space-y-5 sm:space-y-6">
          <h1 className="text-[clamp(1.9rem,5vw,3.25rem)] lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg">
            <span className="block">{data.title.first}</span>
            <span className="block text-amber-400 font-normal drop-shadow-lg">{data.title.second}</span>
            <span className="block">{data.title.third}</span>
          </h1>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-9 sm:w-12 h-9 sm:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400 rounded-full" />
            </div>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {data.tagline && (
          <div className="overflow-hidden">
            <h2 className="text-[clamp(1.05rem,2.8vw,1.75rem)] lg:text-3xl font-light text-white tracking-[0.06em] sm:tracking-[0.15em] drop-shadow-md">
              {data.tagline}
            </h2>
          </div>
        )}

        {data.description && (
          <div className="overflow-hidden">
            <p className="text-[clamp(1rem,2.6vw,1.125rem)] lg:text-xl text-white leading-relaxed font-light max-w-[60ch] sm:max-w-[65ch] mx-auto drop-shadow-sm">
              {data.description}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          {data.primaryCta ? (
            data.primaryCta.url && data.primaryCta.url.startsWith("http") ? (
              <a
                href={data.primaryCta.url}
                target={data.primaryCta.newTab ? "_blank" : "_self"}
                rel={data.primaryCta.newTab ? "noopener noreferrer" : ""}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  if (data.primaryCta.url && data.primaryCta.url.startsWith("#")) {
                    scrollToSection(data.primaryCta.url.replace("#", ""));
                  } else if (data.primaryCta.url && data.primaryCta.url.startsWith("scroll:")) {
                    scrollToSection(data.primaryCta.url.replace("scroll:", ""));
                  } else {
                    window.open("https://texasfencingacademy.glide.page", "_blank");
                  }
                }}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </button>
            )
          ) : (
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Join Our Youth Program</span>
            </a>
          )}

          {data.secondaryCta ? (
            <button
              onClick={runSecondary}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">{data.secondaryCta.text}</span>
            </button>
          ) : (
            <button
              onClick={() => scrollToSection("youth-programs")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">View Youth Programs</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

function YouthFencingInfoSection() {
  const [sectionData, setSectionData] = useState(null);

  // Fallback default data
  const getDefaultData = () => ({
    sectionTitle: "Excellence on the Piste, Character for Life",
    sectionTitleHighlight: "Piste",
    headerDescription:
      "Experience world-class fencing instruction for youth ages 6-17. Our Youth Fencing programs nurture discipline, focus, and sportsmanship—whether your child dreams of glory or seeks a healthy, fun community.",
    mainDescription:
      "From beginners to tournament hopefuls, every student finds their place and pace, with expert coaches guiding the journey. We foster a supportive environment where young fencers develop not just technical skills, but life-long values.",
    featureTitle: "What We Offer:",
    features: [
      "Safe equipment and empowering atmosphere",
      "Progressive curriculum—from footwork basics to advanced tactics",
      "Teamwork, fair play, and lifelong friendships",
      "Individual attention for every skill level",
    ],
    mainCtaText: "Join Our Youth Program",
    mainCtaUrl: "https://texasfencingacademy.glide.page",
    secondaryCtaText: "View Program Options",
    secondaryCtaTargetId: "youth-programs",
    actionImage: {
      src: "/youthFencing/YouthFencers.jpg",
      alt: "Youth fencers in action",
    },
    statsBadge: {
      stat: "6-17",
      label: "Age Range",
    },
  });

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_YOUTH_FENCING_INFO_SECTION;
        const data = await sanityClient.fetch(query);
        setSectionData(data || getDefaultData());
      } catch (error) {
        console.error("Error fetching section data:", error);
        setSectionData(getDefaultData());
      }
    };
    fetchSectionData();
  }, []);

  // Process action image for WebP format
  const processedActionImage = useMemo(() => {
    if (sectionData?.actionImage?.asset) {
      return {
        src: urlFor(sectionData.actionImage.asset).format("webp").quality(85).url(),
        alt: sectionData.actionImage.alt,
      };
    }
    return {
      src: sectionData?.actionImage?.src || "/youthFencing/YouthFencers.jpg",
      alt: sectionData?.actionImage?.alt || "Youth fencers in action",
    };
  }, [sectionData]); // compute once per data change [6]

  // Render title with highlight
  const renderTitle = () => {
    if (!sectionData?.sectionTitle || !sectionData?.sectionTitleHighlight) {
      return sectionData?.sectionTitle || "Excellence on the Piste, Character for Life";
    }
    const parts = sectionData.sectionTitle.split(sectionData.sectionTitleHighlight);
    return (
      <>
        {parts}
        <span className="font-semibold text-amber-600">{sectionData.sectionTitleHighlight}</span>
        {parts[11]}
      </>
    );
  };

  if (!sectionData) {
    return (
      <div className="py-16 text-center text-gray-600">
        Loading…
      </div>
    );
  }

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
      {/* Subtle background patterns (reduced size on mobile) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full motion-safe:animate-none"></div>
        <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full motion-safe:animate-none"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 group">
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-300 group-hover:bg-amber-600"></div>
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-300">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-500 rounded-full motion-safe:animate-pulse"></div>
            </div>
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-300 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-[clamp(1.6rem,5.5vw,2.75rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 tracking-tight">
            {renderTitle()}
          </h2>
          <p className="text-[clamp(1rem,3.2vw,1.125rem)] text-gray-700 max-w-[60ch] sm:max-w-[65ch] mx-auto leading-relaxed">
            {sectionData.headerDescription}
          </p>
        </div>

        {/* Info and image grid */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center mb-12 md:mb-16">
          {/* Info content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <p className="text-[clamp(1rem,3.2vw,1.125rem)] text-gray-700 leading-relaxed max-w-[65ch]">
                {sectionData.mainDescription}
              </p>

              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/60 rounded-lg p-5 sm:p-6">
                <h3 className="text-[clamp(1.1rem,3.4vw,1.25rem)] font-semibold text-amber-700 mb-3 sm:mb-4">
                  {sectionData.featureTitle}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {sectionData.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-[clamp(0.98rem,3vw,1.05rem)] leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={sectionData.mainCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">{sectionData.mainCtaText}</span>
              </a>

              <button
                onClick={() =>
                  document
                    .getElementById(sectionData.secondaryCtaTargetId)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 hover:scale-[1.03] transition-all duration-300 text-center"
              >
                {sectionData.secondaryCtaText}
              </button>
            </div>
          </div>

          {/* Action image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={processedActionImage.src}
                alt={processedActionImage.alt}
                className="w-full h-72 sm:h-80 lg:h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                fetchpriority="low"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent pointer-events-none" />

              {/* Floating stats badge */}
              {sectionData.statsBadge && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-bold text-gray-800">
                      {sectionData.statsBadge.stat}
                    </div>
                    <div className="text-[11px] sm:text-xs text-gray-600 font-medium">
                      {sectionData.statsBadge.label}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YouthProgramsSection() {
  const [loaded, setLoaded] = useState(false);
  const [sectionData, setSectionData] = useState(null);
  const [pricingSchedule, setPricingSchedule] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_YOUTH_FENCING_PROGRAM_SECTION;
        const data = await sanityClient.fetch(query);
        setSectionData(data || getDefaultData());
      } catch (error) {
        console.error("Error fetching section data:", error);
        setSectionData(getDefaultData());
      }
    };
    fetchSectionData();
  }, []);

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const query = `*[_type == "programsectionAllPrograms" && title in [
          "OPEN FENCING",
          "COMPETITIVE FENCERS",
          "FENCING INTRODUCTION 1ST MONTH",
          "MINNOW FENCERS"
        ]]{
          title,
          schedule,
          pricing
        }`;
        const data = await sanityClient.fetch(query);
        setPricingSchedule(data);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        setPricingSchedule([]);
      }
    };
    fetchPricingData();
  }, []);

  // Helper function to get pricing from Sanity data
  const getPricingFromSanity = (programTitle) => {
    if (!pricingSchedule) return null;
    
    // Map program titles to Sanity titles based on your requirements
    const programToSanityMap = {
      "Fencing Introduction 1st month": "FENCING INTRODUCTION 1ST MONTH",
      "Minnow Fencing Program": "MINNOW FENCERS",
      "Full Subscription (Monthly Recurring)": "MINNOW FENCERS", // Use MINNOW FENCERS data
      "Competition Youth Program": "COMPETITIVE FENCERS",
      "Youth Open Fencing": "OPEN FENCING"
    };
    
    const sanityTitle = programToSanityMap[programTitle];
    if (!sanityTitle) return null;
    
    const sanityProgram = pricingSchedule.find(p => p.title === sanityTitle);
    if (!sanityProgram || !sanityProgram.pricing) return null;
    
    // Get the primary pricing based on program type
    let primaryPrice;
    
    if (sanityTitle === "MINNOW FENCERS") {
      // For MINNOW FENCERS, use "Subsequent Months" price if available, otherwise "First Month"
      primaryPrice = sanityProgram.pricing.find(p => 
        p.label.includes("Subsequent") || p.label.includes("Monthly")
      ) || sanityProgram.pricing.find(p => p.label.includes("First Month"));
    } else if (sanityTitle === "OPEN FENCING") {
      // For OPEN FENCING, use "Members" price if available, otherwise "Non Members"
      primaryPrice = sanityProgram.pricing.find(p => p.label.includes("Members") && !p.label.includes("Non")) || 
                   sanityProgram.pricing.find(p => p.label.includes("Non Members"));
    } else {
      // For others, use the first pricing item
      primaryPrice = sanityProgram.pricing[0];
    }
    
    if (!primaryPrice) return null;
    
    // Format the price - if it doesn't start with $, add it
    const price = primaryPrice.price;
    return price.startsWith('$') ? price : `$${price}`;
  };

  // Helper function to get schedule from Sanity data
  const getScheduleFromSanity = (programTitle) => {
    if (!pricingSchedule) return null;
    
    const programToSanityMap = {
      "Fencing Introduction 1st month": "FENCING INTRODUCTION 1ST MONTH",
      "Minnow Fencing Program": "MINNOW FENCERS",
      "Full Subscription (Monthly Recurring)": "MINNOW FENCERS", 
      "Competition Youth Program": "COMPETITIVE FENCERS",
      "Youth Open Fencing": "OPEN FENCING"
    };
    
    const sanityTitle = programToSanityMap[programTitle];
    if (!sanityTitle) return null;
    
    const sanityProgram = pricingSchedule.find(p => p.title === sanityTitle);
    if (!sanityProgram || !sanityProgram.schedule) return null;
    
    return sanityProgram.schedule.map(item => ({
      day: item.day,
      time: item.time,
      weapon: item.weapon
    }));
  };

  const getDefaultData = () => ({
    sectionTitle: "Youth Program Options",
    sectionSubtitle:
      "Comprehensive youth fencing programs designed for every skill level and age group",
    infoPanel: {
      main: "Ready to begin? Register through our portal and attend a complimentary orientation class to get started.",
      sub: "Hover over each program to see detailed schedules and pricing information.",
    },
    chooseTitle: "Choose Your Youth Path",
    chooseSubtitle: "Hover over a program you're interested in to see the schedule",
    chooseInstructions: "Click any card to register through our portal",
    programs: [
      {
        title: "Fencing Introduction 1st month",
        description:
          "Includes access to all our Epee and Saber classes for you to discover the joy of fencing.",
        price: "$85.00",
        image: { src: "/youthFencing/MonthlySubscription.jpg", alt: "Fencing Introduction Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: "Beginner Friendly",
        schedule: [
          { day: "Access to all classes", time: "Various times", weapon: "Both" },
        ],
      },
      {
        title: "Minnow Fencing Program",
        description:
          "Perfect for youth fencers who want consistent training with flexible scheduling. Includes access to age-appropriate classes and equipment.",
        price: "$95.00",
        image: { src: "/youthFencing/YearlySubscription.jpg", alt: "Minnow Fencing Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: null,
        schedule: [
          { day: "Monday, Wednesday", time: "4:00 pm to 5:00 pm", weapon: "Epee" },
          { day: "Tuesday, Thursday", time: "4:00 pm to 5:00 pm", weapon: "Saber" },
          { day: "Saturday", time: "9:00 am to 10:00 am", weapon: "Both" },
        ],
      },
      {
        title: "Full Subscription (Monthly Recurring)",
        description:
          "Comprehensive program for serious youth fencers. Includes all classes, private lessons, and competition preparation.",
        price: "$195.00",
        image: { src: "/youthFencing/FullSubscription.jpg", alt: "Full Subscription Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: "Most Popular",
        schedule: [
          { day: "Monday - Thursday", time: "4:00 pm to 6:00 pm", weapon: "All" },
          { day: "Saturday", time: "9:00 am to 12:00 pm", weapon: "Both" },
          { day: "Private Lessons", time: "By Appointment", weapon: "Specialized" },
        ],
      },
      {
        title: "Competition Youth Program",
        description:
          "Elite training program for youth competitors. Team membership, tournament preparation, and advanced coaching included.",
        price: "$160.00",
        image: { src: "/youthFencing/YouthTeam.jpg", alt: "Competition Team Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: "Team Member",
        schedule: [
          { day: "Monday - Friday", time: "5:00 pm to 7:00 pm", weapon: "All" },
          { day: "Saturday", time: "8:00 am to 12:00 pm", weapon: "Competition" },
          { day: "Tournament Days", time: "As Scheduled", weapon: "Specialized" },
        ],
      },
      {
        title: "Youth Open Fencing",
        description:
          "For youth and competitive TFA fencers to fence at our salle. Contact the coach or staff to determine which nights you'd like to attend.",
        price: "$135.00",
        image: { src: "/youthFencing/OpenFencing.jpg", alt: "Youth Open Fencing Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: null,
        schedule: [
          { day: "Monday, Tuesday, Wednesday, Thursday", time: "7:00 pm to 9:00 pm", weapon: "Both" },
          { day: "Saturday", time: "10:30 am to 12:30 pm", weapon: "Both" },
        ],
      },
    ],
    bottomCtaPanel: {
      leadText:
        "Ready to start your journey? Join our youth fencing community and discover the perfect balance of competition, character building, and lifelong friendships.",
      registerText: "Register Now",
      registerHref: "https://texasfencingacademy.glide.page",
    },
  });

  const processedPrograms = useMemo(() => {
    return (
      sectionData?.programs?.map((program, index) => {
        // Get updated pricing and schedule from Sanity data
        const sanityPrice = getPricingFromSanity(program.title);
        const sanitySchedule = getScheduleFromSanity(program.title);
        
        return {
          ...program,
          id: index + 1,
          // Use Sanity price if available, otherwise use default
          price: sanityPrice || "Contact for Pricing",
          // Use Sanity schedule if available, otherwise use default
          schedule: sanitySchedule || program.schedule,
          image: program.image?.asset
            ? urlFor(program.image.asset).format("webp").quality(85).url()
            : program.image?.src || `/youthFencing/program${index + 1}.jpg`,
          alt: program.image?.alt || program.title,
        };
      }) || []
    );
  }, [sectionData, pricingSchedule]);

  const handleCardClick = (href) => {
    window.open(href, "_blank");
  };

  const renderTitle = (title) => {
    if (title.includes("Options")) {
      const parts = title.split("Options");
      return (
        <>
          {parts[0]}
          <span className="font-semibold text-amber-600">Options</span>
        </>
      );
    }
    return title;
  };

  const renderChooseTitle = (title) => {
    if (title.includes("Youth Path")) {
      const parts = title.split("Youth Path");
      return (
        <>
          {parts[0]}
          <span className="font-semibold text-amber-600">Youth Path</span>
        </>
      );
    }
    return title;
  };

  if (!sectionData) {
    return <div className="py-16 text-center text-gray-600">Loading…</div>;
  }

  // Split programs into rows of 3 for proper centering
  const programRows = [];
  for (let i = 0; i < processedPrograms.length; i += 3) {
    programRows.push(processedPrograms.slice(i, i + 3));
  }

  return (
    <section
      id="youth-programs"
      className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-40 h-40 sm:w-72 sm:h-72 bg-gradient-to-br from-amber-100 to-amber-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 group">
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-300 group-hover:bg-amber-600"></div>
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-300">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-500 rounded-full motion-safe:animate-pulse"></div>
            </div>
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-300 group-hover:bg-amber-600"></div>
          </div>
          <h2 className="text-[clamp(1.6rem,5.5vw,2.75rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 tracking-tight">
            {renderTitle(sectionData.sectionTitle)}
          </h2>
          <p className="text-[clamp(1rem,3.2vw,1.125rem)] text-gray-700 max-w-[60ch] sm:max-w-[65ch] mx-auto leading-relaxed">
            {sectionData.sectionSubtitle}
          </p>
          <div className="mt-6 sm:mt-8 max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/60 rounded-lg p-4 sm:p-5">
            <p className="text-gray-700 text-[clamp(0.98rem,3vw,1.05rem)] mb-2">
              <strong>Ready to begin?</strong>{" "}
              {sectionData.infoPanel.main.replace("Ready to begin? ", "")}
            </p>
            <p className="text-gray-600 text-sm">{sectionData.infoPanel.sub}</p>
          </div>
        </div>

        {/* Programs grid */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-[clamp(1.3rem,4.5vw,1.75rem)] font-light text-gray-800 mb-2 text-center">
            {renderChooseTitle(sectionData.chooseTitle)}
          </h3>
          <p className="text-center text-gray-700 mb-1 text-[clamp(0.98rem,3.2vw,1.05rem)]">
            {sectionData.chooseSubtitle}
          </p>
          <p className="text-center text-amber-700 mb-8 md:mb-10 text-sm sm:text-base font-medium">
            {sectionData.chooseInstructions}
          </p>

          {/* Row-based layout for proper centering */}
          <div className="space-y-6 sm:space-y-8">
            {programRows.map((row, rowIndex) => (
              <div 
                key={rowIndex}
                className={`flex flex-wrap gap-6 sm:gap-8 ${
                  row.length === 3 ? 'justify-start' : 'justify-center'
                }`}
              >
                {row.map((program, cardIndex) => (
<div
  key={program.id}
  onClick={() => handleCardClick(program.href)}
  className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out cursor-pointer overflow-hidden min-h-[480px] sm:min-h-[500px] opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] flex-1 min-w-[300px] max-w-[350px]"
  style={{
    animationDelay: loaded ? `${(rowIndex * 3 + cardIndex) * 90}ms` : "0ms",
  }}
>
  {/* Subtle top accent */}
  <div className="absolute top-0 left-5 right-5 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
  
  {/* Hover glow effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-700 rounded-xl"></div>
  
  {/* Click indicator */}
  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
      <svg
        className="w-3 h-3 text-amber-600 group-hover:text-amber-700 transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </div>
  </div>

  {/* Badge */}
  {program.badge && (
    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
      {program.badge}
    </div>
  )}

  {/* Program info - fades out on hover */}
  <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
    {/* Image */}
    <div className="relative h-44 sm:h-48 overflow-hidden rounded-lg mb-4">
      <img
        src={program.image}
        alt={program.alt}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"></div>
    </div>
    <div className="text-center mb-4">
      <h4 className="text-amber-700 font-semibold text-[clamp(1.05rem,3.4vw,1.2rem)] mb-2 tracking-wide group-hover:text-amber-800 transition-colors duration-200">
        {program.title}
      </h4>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-200 mb-4">
      {program.description}
    </p>
    <div className="text-center mb-2">
      <span className="text-xl sm:text-2xl font-bold text-amber-600">{program.price}</span>
      {program.price !== "$0.00" && program.price !== "Free" && (
        <span className="text-xs sm:text-sm text-gray-500 block">per month</span>
      )}
    </div>
  </div>

  {/* Schedule overlay - slides in on hover */}
  <div className="absolute inset-5 sm:inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
    <h5 className="text-amber-700 font-semibold text-center mb-2 text-base group-hover:animate-pulse">
      SCHEDULE & PRICING
    </h5>
    
    <div className="text-center mb-3">
      <span className="text-xl font-bold text-amber-600">{program.price}</span>
      {program.price !== "$0.00" && program.price !== "Free" && (
        <span className="text-xs text-gray-500 block">monthly recurring</span>
      )}
    </div>

    <div className="space-y-1">
      {program.schedule?.map((schedule, scheduleIndex) => (
        <div
          key={scheduleIndex}
          className="bg-amber-50 rounded-lg p-2 border border-amber-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-amber-100 hover:scale-102"
          style={{ transitionDelay: `${scheduleIndex * 100}ms` }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-800 text-xs">
              {schedule.day}
            </span>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded group-hover:bg-amber-300 transition-colors duration-300">
              {schedule.weapon}
            </span>
          </div>
          <p className="text-gray-600 text-xs font-medium">
            {schedule.time}
          </p>
        </div>
      ))}
    </div>
    
    <div className="mt-2 text-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
      <span className="text-sm text-amber-600 font-medium group-hover:text-amber-700 group-hover:animate-pulse">
        Click to Register &rarr;
      </span>
    </div>
  </div>
</div>



                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center justify-center mb-5 sm:mb-6">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/60 rounded-lg p-5 sm:p-6">
            <p className="text-gray-700 font-medium text-[clamp(0.98rem,3.2vw,1.05rem)] mb-4">
              <span className="text-amber-700 font-semibold">Ready to start your journey?</span>{" "}
              {sectionData.bottomCtaPanel.leadText.replace("Ready to start your journey? ", "")}
            </p>
            <a
              href={sectionData.bottomCtaPanel.registerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 hover:scale-[1.03] transition-all duration-300 shadow-lg"
            >
              <span>{sectionData.bottomCtaPanel.registerText}</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function YouthFencingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <InfoBanner />
      <Navbar />
      <YouthFencingHeroSection />
      <YouthFencingInfoSection />
      <YouthProgramsSection />
      <FooterSection />
    </div>
  )
}
