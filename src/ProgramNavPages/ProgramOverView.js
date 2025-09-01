import { useEffect, useState } from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";
import FooterSection from "../Sections/FooterSection";
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { PROGRAM_QUERIES } from "../Sanity/queries";

function HeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    sanityClient.fetch(PROGRAM_QUERIES.PROGRAM_OVERVIEW_HERO_QUERY).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const runSecondary = () => {
    const a = data?.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith('scroll:')) {
      document.getElementById(a.replace('scroll:', ''))?.scrollIntoView({ behavior: 'smooth' });
    } else if (a.startsWith('/')) {
      window.location.href = a;
    } else {
      window.open(a, '_self');
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Fallback background */}
        <div className="absolute inset-0">
          <img
            src="/program/BgImage.jpg"
            alt="Texas Fencing Academy"
            className="w-full h-full object-cover animate-fade-in will-change-transform-opacity"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60"></div>
        </div>

        {/* Refined fencing motifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity text-white drop-shadow-lg">
                <span className="block animate-slide-up delay-[1000ms] will-change-transform-opacity">
                  PROGRAMS &
                </span>
                <span className="block text-amber-400 font-normal animate-slide-up delay-[1400ms] will-change-transform-opacity drop-shadow-lg">
                  TRAINING
                </span>
                <span className="block animate-slide-up delay-[1800ms] will-change-transform-opacity">
                  TEXAS FENCING ACADEMY
                </span>
              </h1>
            </div>

            <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
              EPEE & SABER EXCELLENCE
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
              Structured fencing classes for kids, youth and adults. From
              introduction and beginners to competitive fencers, we develop
              excellence in every aspect of the sport.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
            <button
              onClick={() => scrollToSection("programs-schedules")}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">View Programs & Schedules</span>
            </button>

            <button
              onClick={() => scrollToSection("club-programs")}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Explore Our Programs</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const desktopImg = urlFor(data.background.asset).width(1920).format('webp').quality(80).url();
  const mobileImg = data.backgroundMobile?.asset
    ? urlFor(data.backgroundMobile.asset).width(768).format('webp').quality(75).url()
    : null;

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={mobileImg} />
            <img
              src={desktopImg}
              alt={data.background.alt || "Texas Fencing Academy"}
              className="w-full h-full object-cover object-center animate-fade-in"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        ) : (
          <img
            src={desktopImg}
            alt={data.background.alt || "Texas Fencing Academy"}
            className="w-full h-full object-cover object-center animate-fade-in"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60" />
      </div>

      {/* Refined fencing motifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse"></div>
      </div>

      {/* Text & CTAs */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none text-white drop-shadow-lg">
            <span className="block animate-slide-up delay-[800ms]">{data.title.first}</span>
            <span className="block text-amber-400 font-normal animate-slide-up delay-[1200ms] drop-shadow-lg">
              {data.title.second}
            </span>
            <span className="block animate-slide-up delay-[1600ms]">{data.title.third}</span>
          </h1>

          <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {data.tagline && (
          <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
            {data.tagline}
          </h2>
        )}

        {data.description && (
          <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
            {data.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
          {data.primaryCta ? (
            data.primaryCta.url && data.primaryCta.url.startsWith('http') ? (
              // External link - use anchor tag
              <a
                href={data.primaryCta.url}
                target={data.primaryCta.newTab ? '_blank' : '_self'}
                rel={data.primaryCta.newTab ? 'noopener noreferrer' : ''}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </a>
            ) : (
              // Internal scroll - use button with scroll functionality
              <button
                onClick={() => {
                  if (data.primaryCta.url && data.primaryCta.url.startsWith('#')) {
                    scrollToSection(data.primaryCta.url.replace('#', ''));
                  } else if (data.primaryCta.url && data.primaryCta.url.startsWith('scroll:')) {
                    scrollToSection(data.primaryCta.url.replace('scroll:', ''));
                  } else {
                    scrollToSection("programs-schedules");
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </button>
            )
          ) : (
            // Fallback button with scroll functionality
            <button
              onClick={() => scrollToSection("programs-schedules")}
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">View Programs & Schedules</span>
            </button>
          )}

          {data.secondaryCta ? (
            <button
              onClick={runSecondary}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">{data.secondaryCta.text}</span>
            </button>
          ) : (
            <button
              onClick={() => scrollToSection("club-programs")}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
function ProgramsAndScheduleSection() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(PROGRAM_QUERIES.PROGRAM_SCEHDULES_QUERY)
      .then((data) => {
        // Separate Open Fencing from other programs
        const openFencingProgram = data.find(program => program.title === "OPEN FENCING");
        const otherPrograms = data.filter(program => program.title !== "OPEN FENCING");
        
        // Reorder: other programs first, then Open Fencing last
        const reorderedPrograms = [...otherPrograms, openFencingProgram].filter(Boolean);
        
        setPrograms(reorderedPrograms);
      })
      .catch(console.error);
  }, []);

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
      {/* Subtle background patterns in silver tones */}
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
              {/* Subtle top accent */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
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
              {/* Program info */}
              <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-xl mb-3 border border-amber-200/50 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                    <img
                      src={urlFor(program.icon).width(40).height(40).url()}
                      alt={program.title}
                      className="w-10 h-10 group-hover:animate-pulse object-contain"
                    />
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
                  {program.schedule.map((schedule, scheduleIndex) => (
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
        
        {/* Second row - remaining cards (including Open Fencing last) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {programs.slice(3).map((program, index) => (
              <div
                key={index + 3}
                onClick={handleCardClick}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] min-h-[320px] cursor-pointer overflow-hidden"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                {/* Subtle top accent */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
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
                {/* Program info */}
                <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-xl mb-3 border border-amber-200/50 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                      <img
                        src={urlFor(program.icon).width(40).height(40).url()}
                        alt={program.title}
                        className="w-10 h-10 group-hover:animate-pulse object-contain"
                      />
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
                    {program.schedule.map((schedule, scheduleIndex) => (
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
        
        {/* Team philosophy */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
            <p className="text-gray-700 font-medium text-base">
              <span className="text-amber-700 font-semibold">Our Philosophy:</span>{" "}
              We foster a sense of team and family, so all of our fencers must list TFA as your primary club.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamFencersSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_OVERVIEW_TEAMFENCERS_QUERY;
        
        const data = await sanityClient.fetch(query);
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Fallback to default data if Sanity fetch fails
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
  const getDefaultData = () => ({
    sectionTitle: "Competitive Fencing Program: Team Fencers",
    headerDescription: "Competitive fencing program for serious athletes",
    slideShowImages: [
      {
        src: "https://texasfencingacademy.org/wp-content/uploads/2024/03/TFA_asst_coaches_w_teen_boys-1280x960.jpg",
        alt: "Team Fencers - Competitive Training",
        caption: "Competitive fencers training for national tournaments",
      },
      {
        src: "https://texasfencingacademy.org/wp-content/uploads/2024/03/TFA_teen_fencers-1280x960.jpg",
        alt: "Teen Fencers in Action",
        caption: "Teen fencers competing at national level",
      },
    ],
    programHighlights: [
      "Team fencers over 10 years old commit to fence at least once a week",
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
    pricingAmount: "$185/month",
    pricingNote: "Monthly recurring",
    registrationSectionTitle: "Join Our Team",
    ctaText: "Register for Team Program",
    registrationUrl: "https://texasfencingacademy.glide.page",
    equipmentRequirements: [
      "Complete personal fencing gear required",
      "Must wear whites during practice",
      "TFA jacket required for national competitions",
      "Weapon-specific equipment (epee or saber)",
    ],
    aboutSectionTitle: "About Team Program",
    aboutSectionDescription: "Team fencers over 10 years old commit to training at least once a week with full access to classes 5 days a week.",
    trainingExpectationsTitle: "Training Expectations",
    trainingExpectations: [
      "Competitive fencers: Expected to participate in Summer Nationals and Junior Olympics.",
      "National-level fencers: Train at least 3 times per week, balancing school and tournaments."
    ]
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

  // Process slideshow images for consistent format with WebP optimization
  const processedSlideShowImages = sectionData?.slideShowImages?.map(image => ({
    src: image.asset 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src,
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!sectionData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <section className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
              {sectionData.sectionTitle.includes(':') ? (
                <>
                  {sectionData.sectionTitle.split(':')[0]}:{" "}
                  <span className="font-semibold text-amber-600">
                    {sectionData.sectionTitle.split(':')[1].trim()}
                  </span>
                </>
              ) : (
                sectionData.sectionTitle
              )}
            </h1>
          </div>

          {/* Main content: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN - Registration & Equipment */}
            <div className="flex flex-col items-center justify-start">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                {/* Slideshow Image */}
                {processedSlideShowImages.length > 0 && (
                  <div className="relative overflow-hidden rounded-xl mb-8">
                    <div className="relative w-full h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing & Registration Section */}
                <div className="text-center space-y-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {sectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {sectionData.headerDescription}
                    </p>
                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <p className="text-amber-800 font-semibold text-lg">
                        {sectionData.pricingAmount}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {sectionData.pricingNote}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button */}
                  <button
                    onClick={() =>
                      window.open(sectionData.registrationUrl, "_blank")
                    }
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg"
                  >
                    {sectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Requirements */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                    Equipment Requirements
                  </h4>
                  <div className="space-y-2">
                    {sectionData.equipmentRequirements?.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Compact Program Information */}
            <div
              className={`${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              {/* Program Introduction */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {sectionData.aboutSectionTitle}
                  </h2>
                </div>
                <p className="text-base text-gray-700 leading-relaxed pl-16">
                  {sectionData.aboutSectionDescription}
                </p>
              </div>

              {/* Compact Program Features */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="space-y-2">
                    {sectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compact Practice Schedule */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Practice Schedule
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="space-y-2">
                      {sectionData.practiceSchedule?.map((session, index) => (
                        <div
                          key={index}
                          className={`
                            flex justify-between items-center py-2 px-2 rounded-lg relative
                            hover:bg-amber-100/70 hover:scale-[1.02] hover:shadow-sm
                            transition-all duration-300 ease-out cursor-pointer
                            ${
                              index !== sectionData.practiceSchedule.length - 1
                                ? "after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                                : ""
                            }
                          `}
                        >
                          <span className="text-sm font-medium text-gray-800 hover:text-amber-700 hover:scale-110 transition-all duration-300 ease-out transform-gpu">
                            {session.day}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 hover:text-gray-700 transition-colors duration-300">
                              {session.time}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded hover:bg-amber-300 hover:scale-105 transition-all duration-300">
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
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {sectionData.trainingExpectationsTitle}
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                      {sectionData.trainingExpectations?.map((expectation, index) => (
                        <p key={index}>
                          {expectation}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
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
function MinnowFencersSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_OVERVIEW_MINNOWFENCERS_QUERY;
        
        const data = await sanityClient.fetch(query);
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
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
    classSchedule: [
      { day: "Saturday", startTime: "9:00 am", endTime: "9:45 am", weapon: "Epee" },
      { day: "Saturday", startTime: "9:45 am", endTime: "10:30 am", weapon: "Saber" }
    ],
    pricing: [
      { label: "First Class", price: "Free", note: "" },
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

  // Process slideshow images for consistent format with WebP optimization
  const processedSlideShowImages = sectionData?.slideShowImages?.map(image => ({
    src: image.asset 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src,
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!sectionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        id="club-programs"
        className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Silver theme background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
              {sectionData.sectionTitle.includes(':') ? (
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

          {/* Main content: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN - Core Information */}
            <div
              className={`${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
            >
              {/* Program Introduction */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    About Youth Program
                  </h2>
                </div>
                <p className="text-base text-gray-700 leading-relaxed pl-16">
                  {sectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="space-y-2">
                    {sectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Class Schedule */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Class Schedule
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="space-y-2">
                      {sectionData.classSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-amber-100/70 hover:scale-[1.02] hover:shadow-sm transition-all duration-300 ease-out cursor-pointer relative after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                        >
                          <span className="text-sm font-medium text-gray-800 hover:text-amber-700 hover:scale-110 transition-all duration-300 ease-out transform-gpu">
                            {schedule.day}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 hover:text-gray-700 transition-colors duration-300">
                              {schedule.startTime} - {schedule.endTime}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded hover:bg-amber-300 hover:scale-105 transition-all duration-300">
                              {schedule.weapon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Pricing
                  </h2>
                </div>

                <dl className="pl-16 space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                  {sectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-3 -m-3 cursor-pointer relative after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {sectionData.terms && (
                  <div className="pl-16 mt-8 pt-6 border-t border-gray-200 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
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

            {/* RIGHT COLUMN - Image, Registration & Class Details */}
            <div className="flex flex-col items-center justify-start">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                {/* Slideshow Image */}
                {processedSlideShowImages.length > 0 && (
                  <div className="relative overflow-hidden rounded-xl mb-8">
                    <div className="relative w-full h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {sectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {sectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <p className="text-amber-800 font-semibold text-lg">
                        {sectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {sectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button */}
                  <button
                    onClick={() =>
                      window.open(sectionData.registrationUrl, "_blank")
                    }
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg"
                  >
                    {sectionData.ctaText}
                  </button>
                </div>

                {/* Equipment & Duration Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Equipment Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                        Equipment
                      </h4>
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm mb-3">
                          {sectionData.equipmentInfo}
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            Student Requirements
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

                    {/* Duration Section */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
                        Session Structure
                      </h4>
                      <div className="space-y-3">
                        {sectionData.sessionStructure?.map((session, index) => (
                          <div key={index} className="flex justify-between items-center py-2">
                            <span className="text-sm text-gray-600">
                              {session.activity}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {session.duration}
                            </span>
                          </div>
                        ))}
                        <div className="pt-3 mt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-900">
                              Total Duration
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              {sectionData.totalDuration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
function CompetitiveFencersSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        // const query = PROGRAM_QUERIES.PROGRAM_OVERVIEW_COMPETITIVEFENCERS_QUERY;
        
        // const data = await sanityClient.fetch(query);
         setSectionData(getDefaultData());
        // setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Fallback to default data if Sanity fetch fails
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
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

  // Process slideshow images for consistent format with WebP optimization
  const processedSlideShowImages = sectionData?.slideShowImages?.map(image => ({
    src: image.asset 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src,
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!sectionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        id="competitive-fencers"
        className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Silver theme background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
              {sectionData.sectionTitle.includes(':') ? (
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

          {/* Main content: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN - Image, Registration & Equipment Details */}
            <div className="flex flex-col items-center justify-start">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                {/* Slideshow Image */}
                {processedSlideShowImages.length > 0 && (
                  <div className="relative overflow-hidden rounded-xl mb-8">
                    <div className="relative w-full h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {sectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {sectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <p className="text-amber-800 font-semibold text-lg">
                        {sectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {sectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button */}
                  <button
                    onClick={() =>
                      window.open(sectionData.registrationUrl, "_blank")
                    }
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg"
                  >
                    {sectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
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

            {/* RIGHT COLUMN - Core Information */}
            <div
              className={`${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
              style={{ animationDelay: "0.4s" }}
            >
              {/* Program Introduction */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    About Competitive Program
                  </h2>
                </div>
                <p className="text-base text-gray-700 leading-relaxed pl-16">
                  {sectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="space-y-2">
                    {sectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Schedule */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Practice Schedule
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="space-y-2">
                      {sectionData.practiceSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-amber-100/70 hover:scale-[1.02] hover:shadow-sm transition-all duration-300 ease-out cursor-pointer relative after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                        >
                          <span className="text-sm font-medium text-gray-800 hover:text-amber-700 hover:scale-110 transition-all duration-300 ease-out transform-gpu">
                            {schedule.day}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 hover:text-gray-700 transition-colors duration-300">
                              {schedule.time}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded hover:bg-amber-300 hover:scale-105 transition-all duration-300">
                              {schedule.weapon}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Pricing
                  </h2>
                </div>

                <dl className="pl-16 space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                  {sectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-3 -m-3 cursor-pointer relative after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {sectionData.terms && (
                  <div className="pl-16 mt-8 pt-6 border-t border-gray-200 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
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

function OpenFencingSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sectionData, setSectionData] = useState(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        // const query = PROGRAM_QUERIES.PROGRAM_OVERVIEW_OPENFENCING_QUERY;
        
        // const data = await sanityClient.fetch(query);
         setSectionData(getDefaultData());
        // setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Fallback to default data if Sanity fetch fails
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
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

  // Process slideshow images for consistent format with WebP optimization
  const processedSlideShowImages = sectionData?.slideShowImages?.map(image => ({
    src: image.asset 
      ? urlFor(image.asset).format('webp').quality(85).url()
      : image.src,
    alt: image.alt,
    caption: image.caption
  })) || [];

  if (!sectionData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section
        id="open-fencing"
        className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
      >
        {/* Silver theme background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
            <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
              <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
              {sectionData.sectionTitle.includes(':') ? (
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

          {/* Main content: Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* LEFT COLUMN - Core Information */}
            <div
              className={`${
                isLoaded
                  ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  : "opacity-0"
              }`}
            >
              {/* Program Introduction */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    About Open Fencing
                  </h2>
                </div>
                <p className="text-base text-gray-700 leading-relaxed pl-16">
                  {sectionData.headerDescription}
                </p>
              </div>

              {/* Program Highlights */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Program Features
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="space-y-2">
                    {sectionData.programHighlights?.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practice Schedule */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Schedule
                  </h2>
                </div>
                <div className="pl-16">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="space-y-3">
                      {sectionData.practiceSchedule?.map((schedule, index) => (
                        <div
                          key={index}
                          className="bg-amber-50 rounded-lg p-3 border border-amber-100 hover:bg-amber-100/70 hover:scale-[1.02] hover:shadow-sm transition-all duration-300 ease-out cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800 text-sm">
                              {schedule.days}
                            </span>
                            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded hover:bg-amber-300 transition-colors duration-300">
                              {schedule.weapon}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-gray-600 text-sm font-medium">
                              {schedule.time}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {schedule.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-amber-500 rounded mr-4"></div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Pricing Options
                  </h2>
                </div>

                <dl className="pl-16 space-y-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
                  {sectionData.pricing?.map((priceItem, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center group transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-amber-50/50 hover:shadow-sm rounded-lg p-3 -m-3 cursor-pointer relative after:absolute after:bottom-0 after:left-[20%] after:right-[20%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-amber-400/60 after:to-transparent"
                    >
                      <dt className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {priceItem.label}
                      </dt>
                      <dd className="text-amber-600 text-base font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        {priceItem.price}
                        {priceItem.note && (
                          <span className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-300">
                            {" "}{priceItem.note}
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>

                {sectionData.terms && (
                  <div className="pl-16 mt-8 pt-6 border-t border-gray-200 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
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

            {/* RIGHT COLUMN - Image, Registration & Equipment Details */}
            <div className="flex flex-col items-center justify-start">
              <div
                className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md w-full ${
                  isLoaded
                    ? "opacity-100 animate-[fadeInUp_0.8s_ease-out_forwards]"
                    : "opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                {/* Slideshow Image */}
                {processedSlideShowImages.length > 0 && (
                  <div className="relative overflow-hidden rounded-xl mb-8">
                    <div className="relative w-full h-56">
                      {processedSlideShowImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.src}
                          alt={image.alt}
                          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-1000 ease-in-out ${
                            index === currentImageIndex
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      ))}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium drop-shadow-lg transition-opacity duration-1000">
                        {processedSlideShowImages[currentImageIndex]?.caption}
                      </p>
                    </div>

                    {/* Slideshow indicators */}
                    <div className="absolute bottom-2 right-4 flex space-x-1">
                      {processedSlideShowImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration Section */}
                <div className="text-center space-y-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {sectionData.registrationSectionTitle}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {sectionData.registrationSectionDescription}
                    </p>
                    <div className="bg-amber-50 rounded-xl p-4 mb-6">
                      <p className="text-amber-800 font-semibold text-lg">
                        {sectionData.registrationPromoText}
                      </p>
                      <p className="text-amber-600 text-sm">
                        {sectionData.registrationPromoSubtext}
                      </p>
                    </div>
                  </div>

                  {/* Main CTA Button */}
                  <button
                    onClick={() =>
                      window.open(sectionData.registrationUrl, "_blank")
                    }
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg"
                  >
                    {sectionData.ctaText}
                  </button>
                </div>

                {/* Equipment Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
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

  useEffect(() => {
    setIsLoaded(true);
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
        <ProgramsAndScheduleSection />
        <CompetitiveFencersSection />
        <MinnowFencersSection />
        <TeamFencersSection />
        <OpenFencingSection />
        <FooterSection />
      </div>
    </>
  );
}
