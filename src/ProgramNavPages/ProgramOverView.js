import { useEffect, useState, useMemo, useRef } from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";
import FooterSection from "../Sections/FooterSection";
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { PROGRAM_QUERIES } from "../Sanity/queries";

function reorderPrograms(data) {
  const openFencingProgram = data.find(program => program.title === "OPEN FENCING");
  const otherPrograms = data.filter(program => program.title !== "OPEN FENCING");
  return [...otherPrograms, openFencingProgram].filter(Boolean);
}
async function getStaticProps() {
  const data = await sanityClient.fetch(PROGRAM_QUERIES.PROGRAM_SCEHDULES_QUERY);
  const programs = reorderPrograms(data);

  return {
    props: { programs }
  };
}

function HeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimer = useRef(null);

  // Fetch data (keep hooks before any return)
  useEffect(() => {
    let cancelled = false;
    sanityClient
      .fetch(PROGRAM_QUERIES.PROGRAM_OVERVIEW_HERO_QUERY)
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
  }, []); // [8][9]

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
  }, []); // [11][4]

  // Debounced resize: avoid jank from frequent setState during scroll/address bar changes
  useEffect(() => {
    const onResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => setIsResizing(false), 250);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer.current);
    };
  }, []); // [12][13]

  // Compute image URLs unconditionally to satisfy Rules of Hooks
  const desktopImg = useMemo(() => {
    if (!data?.background?.asset) return null;
    return urlFor(data.background.asset).width(1920).format("webp").quality(80).url();
  }, [data]); // [7]

  const mobileImg = useMemo(() => {
    if (!data?.backgroundMobile?.asset) return null;
    return urlFor(data.backgroundMobile.asset).width(768).format("webp").quality(75).url();
  }, [data]); // [7]

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
        className="relative min-h-[100dvh] sm:min-h-[calc(var(--vh,1vh)*100)] flex items-center justify-center overflow-hidden px-4 sm:px-6"
        style={{ overscrollBehavior: "none" }}
      >
        {/* Fallback background */}
        <div className="absolute inset-0">
          <img
            src="/program/BgImage.jpg"
            alt="Texas Fencing Academy"
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60" />
        </div>

        {/* Decorative motifs (no pulse to avoid GPU churn) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12" />
          <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12" />
          <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent rotate-45" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-[clamp(1.9rem,5vw,3.25rem)] lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg">
                <span className="block">PROGRAMS &</span>
                <span className="block text-amber-400 font-normal drop-shadow-lg">TRAINING</span>
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
              EPEE & SABER EXCELLENCE
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="text-[clamp(1rem,2.6vw,1.125rem)] lg:text-xl text-white leading-relaxed font-light max-w-[60ch] sm:max-w-[65ch] mx-auto drop-shadow-sm">
              Structured fencing classes for kids, youth and adults. From introduction and beginners to competitive fencers, we develop excellence in every aspect of the sport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
            <button
              onClick={() => scrollToSection("programs-schedules")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View Programs & Schedules</span>
            </button>

            <button
              onClick={() => scrollToSection("club-programs")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore Our Programs</span>
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
              alt={data.background.alt || "Texas Fencing Academy"}
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
        ) : (
          <img
            src={desktopImg}
            alt={data.background.alt || "Texas Fencing Academy"}
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="sync"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60" />
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
          <h2 className="text-[clamp(1.05rem,2.8vw,1.75rem)] lg:text-3xl font-light text-white tracking-[0.06em] sm:tracking-[0.15em] drop-shadow-md">
            {data.tagline}
          </h2>
        )}

        {data.description && (
          <p className="text-[clamp(1rem,2.6vw,1.125rem)] lg:text-xl text-white leading-relaxed font-light max-w-[60ch] sm:max-w-[65ch] mx-auto drop-shadow-sm">
            {data.description}
          </p>
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
                    scrollToSection("programs-schedules");
                  }
                }}
                className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </button>
            )
          ) : (
            <button
              onClick={() => scrollToSection("programs-schedules")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">View Programs & Schedules</span>
            </button>
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
              onClick={() => scrollToSection("club-programs")}
              className="group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore Our Programs</span>
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
function ProgramsAndScheduleSection({programs}) {
  const handleCardClick = () => {
    window.open("https://texasfencingacademy.glide.page", "_blank");
  };

  if (programs.length === 0) {
    return <div>Loading...</div>;
  }
 return (
    <section
      id="programs-schedules"
      className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Our <span className="font-semibold text-amber-600">Programs</span> & Schedule
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Comprehensive fencing programs designed for every skill level and age group
          </p>
          {/* Registration info */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-base mb-2">
              <strong>Prior to coming to the club</strong> you must register through the TFA Pro V2 and attend a scheduled complementary orientation class on Saturday.
            </p>
            <p className="text-gray-600 text-sm">
              See App for more details once you submit your profile in the app.
            </p>
          </div>
        </div>

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {programs.slice(0, 3).map((program, index) => (
            <div
              key={index}
              onClick={handleCardClick}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] min-h-[320px] cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-700 rounded-xl"></div>
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
              
              {/* Program info section */}
              <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                <div className="text-center mb-4">
                  {/* Updated image handling */}
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-xl mb-3 border border-amber-200/50 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                    {program.icon?.asset?.url ? (
                      <img
                        src={program.icon.asset.url}
                        alt={program.icon.alt || program.title || 'Program Icon'}
                        className="w-10 h-10 group-hover:animate-pulse object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-sm">
                          {program.title?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </div>

                  <h4 className="text-amber-700 font-semibold text-base mb-3 tracking-wide group-hover:text-amber-800 transition-colors duration-300">
                    {program.title}
                  </h4>
                </div>
                <p className="text-gray-600 text-base leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                  {program.description}
                </p>
              </div>
              
              {/* Schedule overlay */}
              <div className="absolute inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                <h5 className="text-amber-700 font-semibold text-center mb-2 text-base group-hover:animate-pulse">
                  SCHEDULE
                </h5>
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
        
        {/* Second row - remaining cards */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {programs.slice(3).map((program, index) => (
              <div
                key={index + 3}
                onClick={handleCardClick}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] min-h-[320px] cursor-pointer overflow-hidden"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-700 rounded-xl"></div>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                  <div className="text-center mb-4">
                    {/* Updated image handling for second row */}
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-xl mb-3 border border-amber-200/50 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                      {program.icon?.asset?.url ? (
                        <img
                          src={program.icon.asset.url}
                          alt={program.icon.alt || program.title || 'Program Icon'}
                          className="w-10 h-10 group-hover:animate-pulse object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-bold text-sm">
                            {program.title?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-amber-700 font-semibold text-base mb-3 tracking-wide group-hover:text-amber-800 transition-colors duration-300">
                      {program.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                    {program.description}
                  </p>
                </div>
                
                {/* Schedule overlay */}
                <div className="absolute inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                  <h5 className="text-amber-700 font-semibold text-center mb-2 text-base group-hover:animate-pulse">
                    SCHEDULE
                  </h5>
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
        </div>
        
        {/* Team philosophy section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
            <p className="text-gray-700 font-medium text-base">
              <span className="text-amber-700 font-semibold">Our Philosophy:</span>{" "}
              We fence with skill, but we flourish with unity. The strip tests our reflexes, but the team tests our character. Beyond the touch, beyond the medals, we forge athletes, leaders, and lifelong bonds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function RecreationalFencersSection({ sectionData }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fallback default data (only used if sectionData is null)
  const getDefaultData = () => ({
    sectionTitle: "Competitive Fencing Program: Recreational Fencers",
    headerDescription: "Competitive fencing program for serious athletes",
    slideShowImages: [
      {
        src: "https://texasfencingacademy.org/wp-content/uploads/2024/03/TFA_asst_coaches_w_teen_boys-1280x960.jpg",
        alt: "Recreational Fencers - Competitive Training",
        caption: "Competitive fencers training for national tournaments",
      },
      {
        src: "https://texasfencingacademy.org/wp-content/uploads/2024/03/TFA_teen_fencers-1280x960.jpg",
        alt: "Teen Fencers in Action",
        caption: "Teen fencers competing at national level",
      },
    ],
    programHighlights: [
      "Recreational fencers over 10 years old commit to fence at least once a week",
      "Full access to fencing classes 5 days a week",
      "Expected participation in Summer Nationals and Junior Olympics",
      "Creates national-level competitors in epee and saber",
    ],
    practiceSchedule: [
      { day: "Monday", time: "6:00 pm – 8:00 pm", weapon: "Saber" },
      { day: "Tuesday", time: "6:00 pm – 8:00 pm", weapon: "Epee" },
      { day: "Wednesday", time: "6:00 pm – 8:00 pm", weapon: "Saber" },
      { day: "Thursday", time: "6:00 pm – 8:00 pm", weapon: "Epee" },
      { day: "Saturday", time: "10:30 am – 12:00 pm", weapon: "Epee/Saber" },
    ],
    pricing: [
      { label: "Monthly Fee", price: "$185", note: "(recurring)" }
    ],
    terms: "Monthly recurring fee. Cancel anytime with written notice.",
    equipmentRequirements: [
      "Complete personal fencing gear required",
      "Must wear whites during practice",
      "TFA jacket required for national competitions",
      "Weapon-specific equipment (epee or saber)",
    ],
    registrationSectionTitle: "Join Our Team",
    registrationSectionDescription: "Become part of our competitive fencing family today",
    registrationPromoText: "Commit to Excellence",
    registrationPromoSubtext: "Train for national-level competition",
    ctaText: "Register for Recreational Program",
    registrationUrl: "https://texasfencingacademy.glide.page",
    aboutSectionTitle: "About Recreational Program",
    aboutSectionDescription: "Recreational fencers over 10 years old commit to training at least once a week with full access to classes 5 days a week.",
    trainingExpectationsTitle: "Training Expectations",
    trainingExpectations: [
      "Competitive fencers: Expected to participate in Summer Nationals and Junior Olympics.",
      "National-level fencers: Train at least 3 times per week, balancing school and tournaments."
    ]
  });

  // Use provided sectionData or fallback to default
  const currentSectionData = sectionData || getDefaultData();

  // Extract pricing information for display
  const pricingAmount = currentSectionData.pricing?.[0]?.price || currentSectionData.pricingAmount || "$185/month";
  const pricingNote = currentSectionData.pricing?.[0]?.note || currentSectionData.pricingNote || "Monthly recurring";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Slideshow auto-advance effect
  useEffect(() => {
    if (!currentSectionData?.slideShowImages?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % currentSectionData.slideShowImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSectionData?.slideShowImages?.length]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => (prev + 1) % currentSectionData.slideShowImages.length);
    } else if (isRightSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => prev === 0 ? currentSectionData.slideShowImages.length - 1 : prev - 1);
    }
  };

  // Process slideshow images - Updated to handle both URL structures
  const processedSlideShowImages = currentSectionData?.slideShowImages?.map(image => ({
    src: image.asset && typeof urlFor === 'function' 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src, // Use direct URL if urlFor is not available or asset is not in expected format
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!currentSectionData) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  return (
    <>
      <section className="relative py-8 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
        {/* Background patterns - scaled for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header - mobile optimized */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group">
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-4 tracking-tight px-2">
              {currentSectionData.sectionTitle?.includes(':') ? (
                <>
                  {currentSectionData.sectionTitle.split(':')[0]}:{" "}
                  <span className="font-semibold text-amber-600">
                    {currentSectionData.sectionTitle.split(':')[1]?.trim()}
                  </span>
                </>
              ) : (
                currentSectionData.sectionTitle
              )}
            </h1>
          </div>

          {/* Main content: Responsive layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Registration & Equipment - now first on mobile */}
            <div className="flex flex-col items-center justify-start w-full order-1 lg:order-none">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-md ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                {/* Slideshow Image with swipe support */}
                {processedSlideShowImages.length > 0 && (
                  <div 
                    className="relative overflow-hidden rounded-lg sm:rounded-xl mb-6 sm:mb-8 cursor-grab active:cursor-grabbing select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-x' }}
                  >
                    <div className="relative w-full h-48 sm:h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-xl transition-opacity duration-1000 ease-in-out select-none ${
                            index === currentImageIndex ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg sm:rounded-xl"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <p className="text-xs sm:text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-3 sm:right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Swipe indicator for mobile */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 sm:hidden">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span className="text-white/70 text-xs font-medium">SWIPE</span>
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing & Registration Section */}
                <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {currentSectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 px-2">
                      {currentSectionData.registrationSectionDescription || currentSectionData.headerDescription}
                    </p>
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <p className="text-amber-800 font-semibold text-lg sm:text-xl">
                        {currentSectionData.registrationPromoText || pricingAmount}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {currentSectionData.registrationPromoSubtext || pricingNote}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button - mobile optimized */}
                  <button
                    onClick={() => window.open(currentSectionData.registrationUrl, "_blank")}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg"
                  >
                    {currentSectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Requirements */}
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4 pb-2 border-b border-gray-100">
                    Equipment Requirements
                  </h4>
                  <div className="space-y-2 sm:space-y-3">
                    {currentSectionData.equipmentRequirements?.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information - responsive design */}
            <div
              className={`w-full order-2 lg:order-none ${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              {/* Program Introduction */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    {currentSectionData.aboutSectionTitle || "About Recreational Program"}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-11 sm:pl-16">
                  {currentSectionData.aboutSectionDescription || currentSectionData.headerDescription}
                </p>
              </div>

              {/* Program Features */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="space-y-2 sm:space-y-3">
                    {currentSectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Schedule - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Practice Schedule
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-amber-200">
                    <div className="space-y-2 sm:space-y-3">
                      {currentSectionData.practiceSchedule?.map((session, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-2 sm:px-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                        >
                          <span className="text-sm font-medium text-gray-800 mb-1 sm:mb-0">
                            {session.day}
                          </span>
                          <div className="flex items-center justify-between sm:justify-end space-x-2">
                            <span className="text-xs text-gray-600">
                              {session.time}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
                              {session.weapon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Training Expectations */}
              {currentSectionData.trainingExpectations && (
                <div className="mb-4">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                      {currentSectionData.trainingExpectationsTitle || "Training Expectations"}
                    </h2>
                  </div>
                  <div className="pl-11 sm:pl-16">
                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="space-y-2 sm:space-y-3 text-sm text-gray-700 leading-relaxed">
                        {currentSectionData.trainingExpectations?.map((expectation, index) => (
                          <p key={index}>
                            {expectation}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Information */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Pricing
                  </h2>
                </div>
                <dl className="pl-11 sm:pl-16 space-y-3 sm:space-y-6">
                  {currentSectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-2 sm:p-3 -m-2 sm:-m-3 cursor-pointer"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300 mb-1 sm:mb-0">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300 block sm:inline">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {currentSectionData.terms && (
                  <div className="pl-11 sm:pl-16 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-xs group hover:text-amber-700 transition-colors duration-300 cursor-default">
                      <strong className="group-hover:text-gray-800 transition-colors duration-300">
                        Terms:
                      </strong>{" "}
                      {currentSectionData.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

function MinnowFencersSection({ sectionData }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fallback default data (only used if sectionData is null)
  const getDefaultData = () => ({
    sectionTitle: "Youth Fencing Program: Minnow Fencers",
    headerDescription: "Our Youth Fencing Program for ages 6-9 sparks a love for fencing through engaging Saturday sessions focusing on fundamental skills and positive environment.",
    slideShowImages: [
      {
        src: "/program/MinnowImage1.jpg",
        alt: "Minnow Fencers - Youth Training",
        caption: "Young fencers learning in a safe, fun environment",
      },
      {
        src: "/program/MinnowImage2.jpg",
        alt: "Minnow Fencers - Basic Skills",
        caption: "Proud coach and student celebrating a fencing achievement",
      },
      {
        src: "/program/MinnowImage3.jpg",
        alt: "Minnow Fencers - Saturday Sessions",
        caption: "Engaging Saturday sessions for ages 6-9",
      },
      {
        src: "/program/MinnowImage4.jpg",
        alt: "Minnow Fencers - Fun Learning",
        caption: "Sparking a love for fencing through play",
      },
    ],
    programHighlights: [
      "Tailored for children ages 6-9",
      "Consistent, structured introduction to fencing",
      "Emphasizing fun, safety, and foundational techniques",
      "Gentle introduction to potential tournament participation",
    ],
    practiceSchedule: [
      { day: "Saturday", time: "9:00 am to 9:45 am", weapon: "Epee" },
      { day: "Saturday", time: "9:45 am to 10:30 am", weapon: "Saber" }
    ],
    pricing: [
      { label: "First Class", price: "Free", note: null },
      { label: "First Month", price: "$85", note: "(after free class)" },
      { label: "Subsequent Months", price: "$105", note: "(recurring)" }
    ],
    terms: "Automatic monthly payments. Cancel anytime with written notice.",
    equipmentInfo: "All fencing equipment provided",
    equipmentRequirements: ["Long sport pants", "Tennis shoes", "T-shirt"],
    sessionStructure: [
      { activity: "Fencing Instruction", duration: "45 min" },
      { activity: "Physical Conditioning", duration: "15 min" }
    ],
    totalDuration: "60 min",
    ctaText: "Register for Minnow Fencers",
    registrationUrl: "https://texasfencingacademy.glide.page",
    registrationSectionTitle: "Ready to Begin?",
    registrationSectionDescription: "Join our youth fencing program today",
    registrationPromoText: "First Class FREE",
    registrationPromoSubtext: "Try before you commit"
  });

  // Use provided sectionData or fallback to default
  const currentSectionData = sectionData || getDefaultData();

  // Transform practiceSchedule to classSchedule format for display
  const classSchedule = currentSectionData.practiceSchedule?.map(schedule => {
    const timeParts = schedule.time?.split(' to ') || schedule.time?.split(' - ') || [schedule.time, ''];
    return {
      day: schedule.day,
      startTime: timeParts[0]?.trim() || schedule.time,
      endTime: timeParts[1]?.trim() || '',
      weapon: schedule.weapon
    };
  }) || [];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Slideshow auto-advance effect
  useEffect(() => {
    if (!currentSectionData?.slideShowImages?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % currentSectionData.slideShowImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSectionData?.slideShowImages?.length]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => (prev + 1) % currentSectionData.slideShowImages.length);
    } else if (isRightSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => prev === 0 ? currentSectionData.slideShowImages.length - 1 : prev - 1);
    }
  };

  // Process slideshow images - Updated to handle both URL structures
  const processedSlideShowImages = currentSectionData?.slideShowImages?.map(image => ({
    src: image.asset && typeof urlFor === 'function' 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src, // Use direct URL if urlFor is not available or asset is not in expected format
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!currentSectionData) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  return (
    <>
      <section
        id="club-programs"
        className="relative py-8 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Background patterns - scaled for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header - mobile optimized */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group">
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-4 tracking-tight px-2">
              {currentSectionData.sectionTitle?.includes(':') ? (
                <>
                  {currentSectionData.sectionTitle.split(':')[0]}:{" "}
                  <span className="font-semibold text-amber-600">
                    {currentSectionData.sectionTitle.split(':')[1]?.trim()}
                  </span>
                </>
              ) : (
                currentSectionData.sectionTitle
              )}
            </h1>
          </div>

          {/* Main content: Responsive layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Registration & Equipment - now first on mobile */}
            <div className="flex flex-col items-center justify-start w-full order-2 lg:order-2">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-md ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                {/* Slideshow Image with swipe support */}
                {processedSlideShowImages.length > 0 && (
                  <div 
                    className="relative overflow-hidden rounded-lg sm:rounded-xl mb-6 sm:mb-8 cursor-grab active:cursor-grabbing select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-x' }}
                  >
                    <div className="relative w-full h-48 sm:h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-xl transition-opacity duration-1000 ease-in-out select-none ${
                            index === currentImageIndex ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg sm:rounded-xl"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <p className="text-xs sm:text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-3 sm:right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Swipe indicator for mobile */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 sm:hidden">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span className="text-white/70 text-xs font-medium">SWIPE</span>
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {currentSectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 px-2">
                      {currentSectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <p className="text-amber-800 font-semibold text-lg sm:text-xl">
                        {currentSectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {currentSectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button - mobile optimized */}
                  <button
                    onClick={() => window.open(currentSectionData.registrationUrl, "_blank")}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg"
                  >
                    {currentSectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Information - UPDATED */}
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4 pb-2 border-b border-gray-100">
                    Equipment Requirements
                  </h4>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">
                      {currentSectionData.equipmentInfo}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Required Equipment
                      </p>
                      {currentSectionData.equipmentRequirements?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information - responsive design */}
            <div
              className={`w-full order-1 lg:order-1 ${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
            >
              {/* Program Introduction */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    About Youth Program
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-11 sm:pl-16">
                  {currentSectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="space-y-2 sm:space-y-3">
                    {currentSectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Class Schedule - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Class Schedule
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-amber-200">
                    <div className="space-y-2 sm:space-y-3">
                      {classSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-2 sm:px-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                        >
                          <span className="text-sm font-medium text-gray-800 mb-1 sm:mb-0">
                            {schedule.day}
                          </span>
                          <div className="flex items-center justify-between sm:justify-end space-x-2">
                            <span className="text-xs text-gray-600">
                              {schedule.startTime}{schedule.endTime && ` - ${schedule.endTime}`}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
                              {schedule.weapon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Pricing
                  </h2>
                </div>

                <dl className="pl-11 sm:pl-16 space-y-3 sm:space-y-6">
                  {currentSectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-2 sm:p-3 -m-2 sm:-m-3 cursor-pointer"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300 mb-1 sm:mb-0">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300 block sm:inline">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {currentSectionData.terms && (
                  <div className="pl-11 sm:pl-16 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-xs group hover:text-amber-700 transition-colors duration-300 cursor-default">
                      <strong className="group-hover:text-gray-800 transition-colors duration-300">
                        Terms:
                      </strong>{" "}
                      {currentSectionData.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}



function CompetitiveFencersSection({ programsData }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sectionData, setSectionData] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Process the programs data to find competitive fencers program
  useEffect(() => {
    if (programsData && programsData.length > 0) {
      const competitiveProgram = programsData.find(
        program => program.title === "COMPETITIVE FENCERS"
      );
      
      if (competitiveProgram) {
        // Map the incoming data structure to match component expectations
        const mappedData = {
          sectionTitle: competitiveProgram.sectionTitle,
          headerDescription: competitiveProgram.headerDescription,
          slideShowImages: competitiveProgram.slideShowImages?.map(slide => ({
            src: slide.image?.asset?.url,
            alt: slide.alt,
            caption: slide.caption,
            asset: slide.image?.asset // Keep for urlFor processing if needed
          })) || [],
          programHighlights: competitiveProgram.programHighlights || [],
          practiceSchedule: competitiveProgram.schedule?.map(schedule => ({
            day: schedule.day,
            time: schedule.time,
            weapon: schedule.weapon
          })) || [],
          pricing: competitiveProgram.pricing || [],
          terms: competitiveProgram.terms,
          equipmentInfo: competitiveProgram.equipmentInfo,
          equipmentRequirements: competitiveProgram.equipmentRequirements || [],
          ctaText: competitiveProgram.ctaText,
          registrationUrl: competitiveProgram.registrationUrl,
          registrationSectionTitle: competitiveProgram.registrationSectionTitle,
          registrationSectionDescription: competitiveProgram.registrationSectionDescription,
          registrationPromoText: competitiveProgram.registrationPromoText,
          registrationPromoSubtext: competitiveProgram.registrationPromoSubtext
        };
        
        setSectionData(mappedData);
      } else {
        // Fallback if competitive program not found
        setSectionData(getDefaultData());
      }
    } else {
      // Fallback if no data provided
      setSectionData(getDefaultData());
    }
  }, [programsData]);

  // Fallback default data (kept as backup)
  const getDefaultData = () => ({
    sectionTitle: "Competitive Fencing Program: Competitive Edge",
    headerDescription: "Intensive training for dedicated competitive fencers who make more of a time commitment and usually have already narrowed their focus to a specific weapon while planning on competing in tournaments.",
    slideShowImages: [
      {
        src: "/program/cmp1.jpg",
        alt: "Competitive Fencers - Tournament Training",
        caption: "Competitive fencers preparing for tournaments",
      },
      {
        src: "/program/cmp3.jpg",
        alt: "Advanced Fencing Training",
        caption: "Focused weapon-specific training sessions",
      },
    ],
    programHighlights: [
      "Make more of a time commitment to competitive fencing",
      "Usually have already narrowed focus to a specific weapon",
      "Plan on competing in local and regional tournaments",
      "Intensive training 4 days a week with weapon specialization",
      "Advanced tactical and strategic instruction"
    ],
    practiceSchedule: [
      { day: "Monday", time: "5:00 pm – 6:00 pm", weapon: "All Weapons" },
      { day: "Tuesday", time: "5:00 pm – 6:00 pm", weapon: "All Weapons" },
      { day: "Wednesday", time: "5:00 pm – 6:00 pm", weapon: "All Weapons" },
      { day: "Thursday", time: "5:00 pm – 6:00 pm", weapon: "All Weapons" },
    ],
    pricing: [
      { label: "Monthly Fee", price: "$160", note: "(recurring)" },
    ],
    terms: "Automatic monthly payments. Cancel anytime with written notice.",
    equipmentInfo: "Complete personal fencing gear required",
    equipmentRequirements: [
      "Weapon-specific equipment for chosen discipline",
      "Competition whites mandatory",
      "Personal mask and glove recommended",
    ],
    ctaText: "Register for Competitive Program",
    registrationUrl: "https://texasfencingacademy.glide.page",
    registrationSectionTitle: "Join Competitive Program",
    registrationSectionDescription: "Ready to take your fencing to the next level?",
    registrationPromoText: "Advanced Training",
    registrationPromoSubtext: "4 days per week intensive program"
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Slideshow auto-advance effect
  useEffect(() => {
    if (!sectionData?.slideShowImages?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sectionData.slideShowImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [sectionData?.slideShowImages?.length]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && sectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => (prev + 1) % sectionData.slideShowImages.length);
    } else if (isRightSwipe && sectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => prev === 0 ? sectionData.slideShowImages.length - 1 : prev - 1);
    }
  };

  // Process slideshow images - Updated to handle both URL structures
  const processedSlideShowImages = sectionData?.slideShowImages?.map(image => ({
    src: image.asset && typeof urlFor === 'function' 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src, // Use direct URL if urlFor is not available or asset is not in expected format
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!sectionData) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  return (
    <>
      <section
        id="competitive-fencers"
        className="relative py-8 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Background patterns - scaled for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header - mobile optimized */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group">
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-4 tracking-tight px-2">
              {sectionData.sectionTitle?.includes(':') ? (
                <>
                  {sectionData.sectionTitle.split(':')[0]}:{" "}
                  <span className="font-semibold text-amber-600">
                    {sectionData.sectionTitle.split(':')[1]?.trim()}
                  </span>
                </>
              ) : (
                sectionData.sectionTitle
              )}
            </h1>
          </div>

          {/* Main content: Responsive layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Registration & Equipment - now first on mobile */}
            <div className="flex flex-col items-center justify-start w-full order-2 lg:order-2">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-md ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                {/* Slideshow Image with swipe support */}
                {processedSlideShowImages.length > 0 && (
                  <div
                    className="relative overflow-hidden rounded-lg sm:rounded-xl mb-6 sm:mb-8 cursor-grab active:cursor-grabbing select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-x' }}
                  >
                    <div className="relative w-full h-48 sm:h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-xl transition-opacity duration-1000 ease-in-out select-none ${
                            index === currentImageIndex ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg sm:rounded-xl"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <p className="text-xs sm:text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-3 sm:right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Swipe indicator for mobile */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 sm:hidden">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span className="text-white/70 text-xs font-medium">SWIPE</span>
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {sectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 px-2">
                      {sectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <p className="text-amber-800 font-semibold text-lg sm:text-xl">
                        {sectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {sectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button - mobile optimized */}
                  <button
                    onClick={() => window.open(sectionData.registrationUrl, "_blank")}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg"
                  >
                    {sectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Information */}
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4 pb-2 border-b border-gray-100">
                    Equipment Requirements
                  </h4>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">
                      {sectionData.equipmentInfo}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Required Equipment
                      </p>
                      {sectionData.equipmentRequirements?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information - responsive design */}
            <div
              className={`w-full order-1 lg:order-1 ${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              {/* Program Introduction */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    About Competitive Program
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-11 sm:pl-16">
                  {sectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="space-y-2 sm:space-y-3">
                    {sectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Schedule - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Practice Schedule
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-amber-200">
                    <div className="space-y-2 sm:space-y-3">
                      {sectionData.practiceSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-2 sm:px-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-300"
                        >
                          <span className="text-sm font-medium text-gray-800 mb-1 sm:mb-0">
                            {schedule.day}
                          </span>
                          <div className="flex items-center justify-between sm:justify-end space-x-2">
                            <span className="text-xs text-gray-600">
                              {schedule.time}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-medium">
                              {schedule.weapon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Pricing
                  </h2>
                </div>

                <dl className="pl-11 sm:pl-16 space-y-3 sm:space-y-6">
                  {sectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-2 sm:p-3 -m-2 sm:-m-3 cursor-pointer"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300 mb-1 sm:mb-0">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300 block sm:inline">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {sectionData.terms && (
                  <div className="pl-11 sm:pl-16 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-xs group hover:text-amber-700 transition-colors duration-300 cursor-default">
                      <strong className="group-hover:text-gray-800 transition-colors duration-300">
                        Terms:
                      </strong>{" "}
                      {sectionData.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
function OpenFencingSection({ sectionData }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Fallback default data (only used if sectionData is null)
  const getDefaultData = () => ({
    sectionTitle: "Open Fencing Program: Open Fencing",
    headerDescription: "For adults and competitive TFA fencers to fence at our salle. Contact the coach or staff to determine which nights you'd like to attend.",
    slideShowImages: [
      {
        src: "/program/cmp2.jpg",
        alt: "Open Fencing - Adult Training",
        caption: "Adults and competitive fencers training together",
      },
      {
        src: "/program/cmp4.jpg",
        alt: "Open Fencing Sessions",
        caption: "Open fencing sessions for experienced fencers",
      },
    ],
    programHighlights: [
      "Designed for adults and competitive TFA fencers",
      "Flexible scheduling - attend nights that work for you",
      "Open training format with coaching supervision",
      "Both epee and saber weapons available",
      "Perfect for maintaining competitive edge"
    ],
    practiceSchedule: [
      { 
        days: "Monday, Tuesday, Wednesday, Thursday", 
        time: "7:00 pm to 9:00 pm", 
        weapon: "Both",
        duration: "2 hours"
      },
      { 
        days: "Saturday", 
        time: "10:30 am to 12:30 pm", 
        weapon: "Both",
        duration: "2 hours"
      },
    ],
    pricing: [
      { label: "Drop-in Rate", price: "$25", note: "(per session)" },
      { label: "Monthly Unlimited", price: "$120", note: "(recurring)" },
    ],
    terms: "Contact coach or staff to determine attendance schedule. Flexible payment options available.",
    equipmentInfo: "Personal fencing equipment required",
    equipmentRequirements: [
      "Complete personal fencing gear",
      "Weapon of choice (epee or saber)",
      "Competition whites preferred",
      "Personal mask and glove required",
    ],
    ctaText: "Contact for Open Fencing",
    registrationUrl: "https://texasfencingacademy.glide.page",
    registrationSectionTitle: "Join Open Fencing",
    registrationSectionDescription: "Contact us to arrange your attendance",
    registrationPromoText: "Flexible Schedule",
    registrationPromoSubtext: "Choose nights that work for you"
  });

  // Use provided sectionData or fallback to default
  const currentSectionData = sectionData || getDefaultData();

  // Process practice schedule to handle both data formats
  const processedSchedule = currentSectionData.practiceSchedule?.map(schedule => ({
    days: schedule.days || schedule.day || 'N/A',
    time: schedule.time || 'N/A',
    weapon: schedule.weapon || 'N/A',
    duration: schedule.duration || ''
  })) || [];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Slideshow auto-advance effect
  useEffect(() => {
    if (!currentSectionData?.slideShowImages?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % currentSectionData.slideShowImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSectionData?.slideShowImages?.length]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => (prev + 1) % currentSectionData.slideShowImages.length);
    } else if (isRightSwipe && currentSectionData?.slideShowImages) {
      setCurrentImageIndex((prev) => prev === 0 ? currentSectionData.slideShowImages.length - 1 : prev - 1);
    }
  };

  // Process slideshow images - Updated to handle both URL structures
  const processedSlideShowImages = currentSectionData?.slideShowImages?.map(image => ({
    src: image.asset && typeof urlFor === 'function' 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src, // Use direct URL if urlFor is not available or asset is not in expected format
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!currentSectionData) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading...</div>;
  }

  return (
    <>
      <section
        id="open-fencing"
        className="relative py-8 sm:py-16 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Background patterns - scaled for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-6 sm:top-20 sm:left-20 w-32 h-32 sm:w-72 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-10 right-6 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section header - mobile optimized */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group">
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-4 tracking-tight px-2">
              {currentSectionData.sectionTitle?.includes(':') ? (
                <>
                  {currentSectionData.sectionTitle.split(':')[0]}:{" "}
                  <span className="font-semibold text-amber-600">
                    {currentSectionData.sectionTitle.split(':')[1]?.trim()}
                  </span>
                </>
              ) : (
                currentSectionData.sectionTitle
              )}
            </h1>
          </div>

          {/* Main content: Responsive layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Registration & Equipment - now first on mobile */}
            <div className="flex flex-col items-center justify-start w-full order-2 lg:order-2">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-md ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                {/* Slideshow Image with swipe support */}
                {processedSlideShowImages.length > 0 && (
                  <div
                    className="relative overflow-hidden rounded-lg sm:rounded-xl mb-6 sm:mb-8 cursor-grab active:cursor-grabbing select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{ touchAction: 'pan-x' }}
                  >
                    <div className="relative w-full h-48 sm:h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-lg sm:rounded-xl transition-opacity duration-1000 ease-in-out select-none ${
                            index === currentImageIndex ? "opacity-100" : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-lg sm:rounded-xl"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <p className="text-xs sm:text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-3 sm:right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Swipe indicator for mobile */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 sm:hidden">
                      <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span className="text-white/70 text-xs font-medium">SWIPE</span>
                        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                      {currentSectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 px-2">
                      {currentSectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <p className="text-amber-800 font-semibold text-lg sm:text-xl">
                        {currentSectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {currentSectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button - mobile optimized */}
                  <button
                    onClick={() => window.open(currentSectionData.registrationUrl, "_blank")}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl active:scale-95 hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg"
                  >
                    {currentSectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Information */}
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 sm:mb-4 pb-2 border-b border-gray-100">
                    Equipment Requirements
                  </h4>
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-3">
                      {currentSectionData.equipmentInfo}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Required Equipment
                      </p>
                      {currentSectionData.equipmentRequirements?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Program Information - responsive design */}
            <div
              className={`w-full order-1 lg:order-1 ${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
            >
              {/* Program Introduction */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    About Open Fencing
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-11 sm:pl-16">
                  {currentSectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="space-y-2 sm:space-y-3">
                    {currentSectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule - mobile optimized - UPDATED */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Schedule
                  </h2>
                </div>
                <div className="pl-11 sm:pl-16">
                  <div className="bg-amber-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-amber-200">
                    <div className="space-y-2 sm:space-y-3">
                      {processedSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-3 sm:p-4 border border-amber-100 hover:bg-amber-50/50 hover:scale-[1.01] transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-1">
                            <span className="font-medium text-gray-800 text-sm mb-1 sm:mb-0">
                              {schedule.days}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-medium self-start sm:self-center">
                              {schedule.weapon}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <p className="text-gray-600 text-sm font-medium mb-1 sm:mb-0">
                              {schedule.time}
                            </p>
                            {schedule.duration && (
                              <p className="text-gray-500 text-xs">
                                {schedule.duration}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Options - mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 sm:w-12 h-0.5 sm:h-1 bg-amber-500 rounded mr-3 sm:mr-4"></div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                    Pricing Options
                  </h2>
                </div>

                <dl className="pl-11 sm:pl-16 space-y-3 sm:space-y-6">
                  {currentSectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-2 sm:p-3 -m-2 sm:-m-3 cursor-pointer"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300 mb-1 sm:mb-0">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300 block sm:inline">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {currentSectionData.terms && (
                  <div className="pl-11 sm:pl-16 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-xs group hover:text-amber-700 transition-colors duration-300 cursor-default">
                      <strong className="group-hover:text-gray-800 transition-colors duration-300">
                        Terms:
                      </strong>{" "}
                      {currentSectionData.terms}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}


export default function ProgramOverviewPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [processedProgramsData, setProcessedProgramsData] = useState({});

  useEffect(() => {
    setIsLoaded(true);

    // Fetch programs
    sanityClient
      .fetch(PROGRAM_QUERIES.PROGRAM_SCEHDULES_QUERY)
      .then((data) => {
        const reorderedPrograms = reorderPrograms(data);
        setPrograms(reorderedPrograms);
        
        // Process all program data at once
        const processedData = processMultipleProgramsData(reorderedPrograms, [
          PROGRAM_TITLES.COMPETITIVE_FENCERS,
          PROGRAM_TITLES.MINNOW_FENCERS,
          PROGRAM_TITLES.RECREATIONAL_FENCERS,
          PROGRAM_TITLES.OPEN_FENCING
        ]);
        
        setProcessedProgramsData(processedData);
      })
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);
  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        className={`bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <InfoBanner />
        <Navbar />
        <HeroSection />
        <ProgramsAndScheduleSection programs={programs} />
        <CompetitiveFencersSection programsData={processedProgramsData[PROGRAM_TITLES.COMPETITIVE_FENCERS]} />
        <MinnowFencersSection sectionData={processedProgramsData[PROGRAM_TITLES.MINNOW_FENCERS]} />
        <RecreationalFencersSection sectionData={processedProgramsData[PROGRAM_TITLES.RECREATIONAL_FENCERS]} />
        <OpenFencingSection sectionData={processedProgramsData[PROGRAM_TITLES.OPEN_FENCING]} />
        <FooterSection />
      </div>
    </>
  );
}


/**
 * Generic function to process program data by title
 * @param {Array} programs - Array of program objects
 * @param {string} titleToFind - Title of the program to find and process
 * @returns {Object|null} - Processed program data or null if not found
 */
const processProgramData = (programs, titleToFind) => {
  if (!programs || !Array.isArray(programs) || !titleToFind) {
    return null;
  }

  const targetProgram = programs.find(program => program.title === titleToFind);
  
  if (!targetProgram) {
    return null;
  }

  return {
    sectionTitle: targetProgram.sectionTitle,
    headerDescription: targetProgram.headerDescription,
    description: targetProgram.description,
    slideShowImages: targetProgram.slideShowImages?.map(slide => ({
      src: slide.image?.asset?.url,
      alt: slide.alt,
      caption: slide.caption,
      asset: slide.image?.asset // Keep for urlFor processing if needed
    })) || [],
    programHighlights: targetProgram.programHighlights || [],
    practiceSchedule: targetProgram.schedule?.map(schedule => ({
      day: schedule.day,
      time: schedule.time,
      weapon: schedule.weapon
    })) || [],
    pricing: targetProgram.pricing || [],
    terms: targetProgram.terms,
    equipmentInfo: targetProgram.equipmentInfo,
    equipmentRequirements: targetProgram.equipmentRequirements || [],
    ctaText: targetProgram.ctaText,
    registrationUrl: targetProgram.registrationUrl,
    registrationSectionTitle: targetProgram.registrationSectionTitle,
    registrationSectionDescription: targetProgram.registrationSectionDescription,
    registrationPromoText: targetProgram.registrationPromoText,
    registrationPromoSubtext: targetProgram.registrationPromoSubtext,
    icon: targetProgram.icon,
    title: targetProgram.title
  };
};

/**
 * Process multiple programs at once
 * @param {Array} programs - Array of program objects
 * @param {Array} titlesToFind - Array of program titles to process
 * @returns {Object} - Object with processed data keyed by program title
 */
const processMultipleProgramsData = (programs, titlesToFind) => {
  const processedData = {};
  
  titlesToFind.forEach(title => {
    const processed = processProgramData(programs, title);
    if (processed) {
      processedData[title] = processed;
    }
  });
  
  return processedData;
};

/**
 * Constants for program titles
 */
const PROGRAM_TITLES = {
  COMPETITIVE_FENCERS: 'COMPETITIVE FENCERS',
  MINNOW_FENCERS: 'MINNOW FENCERS',
  RECREATIONAL_FENCERS: 'RECREATIONAL FENCERS',
  OPEN_FENCING: 'OPEN FENCING',
  FENCING_INTRODUCTION: 'FENCING INTRODUCTION 1ST MONTH'
};
