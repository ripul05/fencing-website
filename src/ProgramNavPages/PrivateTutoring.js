import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import InfoBanner from "../HomePageComponent/InfoBanner";
import Navbar from "../HomePageComponent/Navbar";
import FooterSection from "../Sections/FooterSection";
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { PRIVATE_TUTORING_HERO_QUERY } from '../Sanity/queries';

function PrivateLessonsHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  // Stable viewport height fallback for iOS toolbar changes
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
  }, []);

  // Prevent pinch-to-zoom during scrolling
  useEffect(() => {
    const preventZoomOnScroll = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventZoomOnScroll, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventZoomOnScroll);
    };
  }, []);

  // Fetch data once on mount with cancellation
  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(PRIVATE_TUTORING_HERO_QUERY)
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
  }, []);

  // Memoize image URLs to prevent recalculation
  const imageUrls = useMemo(() => {
    if (!data?.background?.asset) return null;
    
    const desktopImg = urlFor(data.background.asset).width(1920).format("webp").quality(80).url();
    const mobileImg = data.backgroundMobile?.asset
      ? urlFor(data.backgroundMobile.asset).width(768).format("webp").quality(75).url()
      : null;
    
    return { desktopImg, mobileImg };
  }, [data?.background?.asset, data?.backgroundMobile?.asset]);

  // Memoize scroll function to prevent recreating on each render
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Memoize secondary CTA handler to prevent recreation
  const runSecondary = useCallback(() => {
    const a = data?.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith("scroll:")) {
      document.getElementById(a.replace("scroll:", ""))?.scrollIntoView({ behavior: "smooth" });
    } else if (a.startsWith("/")) {
      window.location.href = a;
    } else {
      window.open(a, "_self");
    }
  }, [data?.secondaryCta?.action]);

  // Memoize primary CTA handler
  const handlePrimaryCTA = useCallback(() => {
    if (data?.primaryCta?.url) {
      if (data.primaryCta.url.startsWith("#")) {
        scrollToSection(data.primaryCta.url.replace("#", ""));
      } else if (data.primaryCta.url.startsWith("scroll:")) {
        scrollToSection(data.primaryCta.url.replace("scroll:", ""));
      } else {
        window.open("https://texasfencingacademy.glide.page", "_blank");
      }
    } else {
      window.open("https://texasfencingacademy.glide.page", "_blank");
    }
  }, [data?.primaryCta?.url, scrollToSection]);

  // Memoize registration handler
  const handleRegistration = useCallback(() => {
    window.open("https://texasfencingacademy.glide.page", "_blank");
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-private-lessons-hero
      className="
        relative
        min-h-screen
        sm:min-h-[calc(var(--vh,1vh)*100)]
        flex items-center justify-center overflow-hidden
        px-4 sm:px-6
      "
      style={{ 
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
        touchAction: "manipulation",
        WebkitTextSizeAdjust: "100%",
        height: "100vh",
        minHeight: "100vh"
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {!data || !imageUrls ? (
          <img
            src="/program/BgImage.jpg"
            alt="Private Fencing Lessons"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)"
            }}
          />
        ) : imageUrls.mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={imageUrls.mobileImg} />
            <img
              src={imageUrls.desktopImg}
              alt={data.background?.alt || "Private Fencing Lessons"}
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
              style={{
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)"
              }}
            />
          </picture>
        ) : (
          <img
            src={imageUrls.desktopImg}
            alt={data.background?.alt || "Private Fencing Lessons"}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)"
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70 pointer-events-none" />
      </div>

      {/* Decorative lines (lighter on mobile) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-24 sm:top-40 left-[18%] sm:left-1/4 w-px h-28 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12" />
        <div className="absolute bottom-24 sm:bottom-40 right-[18%] sm:right-1/4 w-px h-28 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12" />
        <div className="absolute top-1/2 left-1/2 w-px h-24 sm:h-32 bg-gradient-to-b from-amber-400 to-transparent rotate-45" />
      </div>

      {/* Content: mobile-optimized typography and spacing; scales on desktop */}
      <div 
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12"
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)"
        }}
      >
        <div className="space-y-5 sm:space-y-6">
          <div className="overflow-hidden">
            <h1
              className="
                font-extralight tracking-tight text-white drop-shadow-lg
                leading-tight sm:leading-none
                text-[clamp(1.75rem,5.2vw,3rem)] sm:text-5xl lg:text-6xl
              "
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale"
              }}
            >
              <span className="block">
                {data?.title?.first || "PRIVATE"}
              </span>
              <span className="block text-amber-400 font-normal drop-shadow-lg">
                {data?.title?.second || "FENCING LESSONS"}
              </span>
              <span className="block">
                {data?.title?.third || "TEXAS FENCING ACADEMY"}
              </span>
            </h1>
          </div>

          {/* Center divider motif */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-9 sm:w-12 h-9 sm:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400 rounded-full" />
            </div>
            <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {data?.tagline && (
          <div className="overflow-hidden">
            <h2
              className="
                font-light text-white drop-shadow-md
                tracking-[0.06em] sm:tracking-[0.15em]
                text-[clamp(1.05rem,2.8vw,1.75rem)] sm:text-2xl lg:text-3xl
              "
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale"
              }}
            >
              {data.tagline}
            </h2>
          </div>
        )}

        {data?.description && (
          <div className="overflow-hidden">
            <p
              className="
                text-white font-light drop-shadow-sm mx-auto leading-relaxed
                text-[clamp(0.98rem,2.6vw,1.125rem)] sm:text-lg lg:text-xl
                max-w-[60ch] sm:max-w-[65ch]
              "
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale"
              }}
            >
              {data.description}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Primary CTA */}
          {data?.primaryCta?.url?.startsWith("http") ? (
            <a
              href={data.primaryCta.url}
              target={data.primaryCta.newTab ? "_blank" : "_self"}
              rel={data.primaryCta.newTab ? "noopener noreferrer" : ""}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">{data.primaryCta.text}</span>
            </a>
          ) : (
            <button
              onClick={handlePrimaryCTA}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">
                {data?.primaryCta?.text || "Schedule Private Lesson"}
              </span>
            </button>
          )}

          {/* Secondary CTA */}
          <button
            onClick={data?.secondaryCta ? runSecondary : () => scrollToSection("private-lessons-info")}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">
              {data?.secondaryCta?.text || "Learn More"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}


function PrivateLessonInformationSection() {
  const handleBookingClick = () => {
    window.open("https://texasfencingacademy.glide.page", "_blank");
  };

  const benefits = [
    {
      iconSrc: "/program/icons/OpenFencing.png",
      alt: "Open Fencing Icon",
      title: "Personalized Training",
      description:
        "Each lesson is customized to your specific needs, skill level, and competitive goals for maximum improvement.",
    },
    {
      iconSrc: "/program/icons/Progress.png",
      alt: "Accelerated Progress Icon",
      title: "Accelerated Progress",
      description:
        "Master techniques faster with immediate feedback and correction, avoiding common mistakes and bad habits.",
    },
    {
      iconSrc: "/program/icons/Competition.png",
      alt: "Competition Icon",
      title: "Competition Preparation",
      description:
        "Fine-tune your performance and build confidence with specialized tournament preparation sessions.",
    },
  ];

  const whatToExpected = [
    {
      title: "Customized Training Plans",
      description:
        "Each lesson addresses your specific needs, whether improving attack timing, strengthening defense, or mastering new techniques.",
    },
    {
      title: "Direct Coaching Feedback",
      description:
        "Receive instant corrections and guidance from experienced coaches for efficient skill development.",
    },
    {
      title: "Skill Integration",
      description:
        "Apply what you learn in private lessons during group classes and open fencing sessions.",
    },
  ];

  const logistics = [
    { label: "Lesson Duration", value: "20 minutes" },
    { label: "Booking Method", value: "TFA Pro V2 App" },
    { label: "Arrival Time", value: "15 min early" },
    { label: "Eligibility", value: "Club Members" },
  ];

  const programIntegration = [
    {
      title: "Beginner Level",
      description: "Foundation building with basic techniques and footwork",
    },
    {
      title: "Intermediate Level",
      description: "Advanced techniques and tactical development",
    },
    {
      title: "Advanced/Competitive",
      description: "Tournament preparation and performance optimization",
    },
  ];

  return (
    <section
      id="private-lessons-info"
      className="relative py-8 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background decorations - scaled for mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 opacity-20"></div>
        <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header - mobile optimized */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fadeInDown">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group">
            <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-[clamp(1.8rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-4 tracking-tight px-2">
            Why Choose{" "}
            <span className="font-semibold text-amber-600">Private</span>{" "}
            Lessons
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Personalized instruction designed to accelerate your fencing development
          </p>
        </div>

        {/* Benefits Grid - mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {benefits.map(({ iconSrc, alt, title, description }, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8 text-center transform transition-transform duration-500 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer animate-slideUp"
              style={{
                animationDelay: `${idx * 150}ms`,
                willChange: "transform",
              }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={iconSrc}
                  alt={alt}
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* What to Expect / Logistics - mobile stacked layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 mb-16 sm:mb-24">
          {/* What to Expect */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg cursor-default">
            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                What to Expect
              </h3>
              <div className="space-y-6 sm:space-y-8">
                {whatToExpected.map(({ title, description }, idx) => (
                  <div key={idx} className="flex items-start gap-4 sm:gap-6">
                    <span className="mt-2 block w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full shrink-0"></span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-base sm:text-lg mb-1">
                        {title}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scheduling & Logistics */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg cursor-default">
            <div className="p-6 sm:p-8 md:p-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 sm:mb-8 flex items-center gap-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Scheduling &amp; Logistics
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {logistics.map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-gray-100 rounded hover:bg-amber-50 transition-colors cursor-default ${
                      idx === logistics.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <span className="font-medium text-gray-700 mb-1 sm:mb-0">{label}</span>
                    <span className="text-amber-600 font-semibold text-sm sm:text-base">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-amber-50 rounded-lg border border-amber-200 transition-colors hover:bg-amber-100 cursor-default">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  <strong>Priority Scheduling:</strong> Competitive fencers preparing for tournaments receive priority for lesson scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Integration - mobile optimized */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6 sm:p-8 mb-12 sm:mb-16 animate-fadeIn delay-900">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Program Integration
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2">
              Our training programs include recommended minimum private lesson requirements based on your skill level. As you advance, we encourage more frequent private instruction to support your development.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center">
              {programIntegration.map(({ title, description }, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-4 sm:p-6 border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-default transform hover:-translate-y-1 hover:scale-[1.02]"
                  style={{ willChange: "transform" }}
                >
                  <h4 className="font-semibold text-amber-700 mb-2 text-sm sm:text-base">{title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action - mobile optimized */}
        <div className="text-center animate-fadeIn delay-1000">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-6 sm:w-8 h-px bg-amber-300"></div>
            <div className="mx-2 sm:mx-3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-6 sm:w-8 h-px bg-amber-300"></div>
          </div>
          <h3 className="text-[clamp(1.5rem,4vw,2rem)] lg:text-3xl font-light text-gray-800 mb-4 sm:mb-6 px-2">
            Ready to{" "}
            <span className="font-semibold text-amber-600">Accelerate</span>{" "}
            Your Progress?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
            Take your fencing to the next level with personalized one-on-one instruction from our experienced coaches.
          </p>
          <button
            onClick={handleBookingClick}
            className="group relative px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg overflow-hidden w-full sm:w-auto"
            style={{ willChange: "transform" }}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Schedule Your Private Lesson</span>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }

        /* Delay helpers */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </section>
  );
}
function PrivateFencingLessonsPage() {
  return (
    <>
      <InfoBanner />
      <Navbar />
      {/* Hero Section */}
      <PrivateLessonsHeroSection />
      {/* Private Lessons Information Section */}
      <PrivateLessonInformationSection />
      <FooterSection />
    </>
  );
}

export default PrivateFencingLessonsPage;
