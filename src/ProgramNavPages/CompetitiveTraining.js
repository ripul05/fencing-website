import { useState, useEffect } from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";
import FooterSection from "../Sections/FooterSection";
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { COMPETITIVE_FENCING_HERO_QUERY } from "../Sanity/queries";
const competitiveEdgeFeatures = [
  {
    id: 1,
    title: "BlazePod + HAT Technology",
    description:
      "Exclusive patent-pending High Accuracy Trigger system for unparalleled precision in reaction time measurement. Only available at TFA.",
    icon: "/competitiveEdge/icons/Technology.png",
    details: [
      "Real-time dynamic training drills",
      "Ultra-precise reaction time tracking",
      "Advanced light-up pod system",
      "Patent-pending HAT technology",
    ],
  },
  {
    id: 2,
    title: "Pro Training Hub App",
    description:
      "Comprehensive mobile platform tracking your progress across 10+ fencing skills with detailed analytics and personalized insights.",
    icon: "/competitiveEdge/icons/MobileApplication.png",
    details: [
      "Individual skill rankings",
      "Daily activity tracking",
      "Performance trend analysis",
      "Cyborg Drills gamification",
    ],
  },
  {
    id: 3,
    title: "Personalized Training Plans",
    description:
      "Custom conditioning programs targeting your weakest skills and tournament-specific preparation aligned with your competition schedule.",
    icon: "/competitiveEdge/icons/Training.png",
    details: [
      "Weekly performance reviews",
      "Targeted weakness conditioning",
      "Tournament preparation plans",
      "Situational challenge training",
    ],
  },
];

const skillMetrics = [
  {
    skill: "Boulder",
    percentage: "59.7%",
    trend: "up",
    score: "1391",
    category: "strength",
  },
  {
    skill: "Bladework",
    percentage: "26.9%",
    trend: "up",
    score: "1447",
    category: "technique",
  },
  {
    skill: "Direction Change",
    percentage: "18.3%",
    trend: "up",
    score: "1093",
    category: "agility",
  },
  {
    skill: "2 Choice Reaction",
    percentage: "-31.9%",
    trend: "down",
    score: "686",
    category: "reaction",
  },
  {
    skill: "Foot Work",
    percentage: "24.9%",
    trend: "up",
    score: "1288",
    category: "footwork",
  },
  {
    skill: "Hand",
    percentage: "-6.0%",
    trend: "down",
    score: "759",
    category: "technique",
  },
];



function CompetitiveEdgeHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    sanityClient.fetch(COMPETITIVE_FENCING_HERO_QUERY).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
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
      <section
        className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
          isResizing ? "no-animations" : ""
        }`}
      >
        {/* Fallback background */}
        <div className="absolute inset-0">
          <img
            src="/competitiveEdge/CompetitiveFencingBg.png"
            alt="Competitive Fencing Training at Texas Fencing Academy"
            className="w-full h-full object-cover object-bottom animate-fade-in will-change-transform-opacity"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
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
                  COMPETITIVE
                </span>
                <span className="block text-amber-400 font-normal animate-slide-up delay-[1400ms] will-change-transform-opacity drop-shadow-lg">
                  EDGE
                </span>
                <span className="block animate-slide-up delay-[1800ms] will-change-transform-opacity text-lg font-light tracking-[0.3em] text-amber-300">
                  POWERED BY BLAZEPOD + HAT
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
              TRAIN SMARTER • FENCE FASTER • WIN MORE
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
              Elevate your performance with BlazePod's advanced reaction training
              technology, enhanced by our exclusive patent-pending High Accuracy
              Trigger (HAT) system. Real-time data, personalized insights, and
              tournament-specific preparation—only at Texas Fencing Academy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Join Competitive Edge</span>
            </a>

            <button
              onClick={() => scrollToSection("blazepod-technology")}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Explore Technology</span>
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
        isResizing ? "no-animations" : ""
      }`}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={mobileImg} />
            <img
              src={desktopImg}
              alt={data.background.alt || "Competitive Fencing Training at Texas Fencing Academy"}
              className="w-full h-full object-cover object-center animate-fade-in will-change-transform-opacity"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        ) : (
          <img
            src={desktopImg}
            alt={data.background.alt || "Competitive Fencing Training at Texas Fencing Academy"}
            className="w-full h-full object-cover object-center animate-fade-in will-change-transform-opacity"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70" />
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
          <div className="overflow-hidden">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity text-white drop-shadow-lg">
              <span className="block animate-slide-up delay-[1000ms] will-change-transform-opacity">
                {data.title.first}
              </span>
              <span className="block text-amber-400 font-normal animate-slide-up delay-[1400ms] will-change-transform-opacity drop-shadow-lg">
                {data.title.second}
              </span>
              <span className="block animate-slide-up delay-[1800ms] will-change-transform-opacity text-lg font-light tracking-[0.3em] text-amber-300">
                {data.title.third || "POWERED BY BLAZEPOD + HAT"}
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {data.tagline && (
          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
              {data.tagline}
            </h2>
          </div>
        )}

        {data.description && (
          <div className="overflow-hidden">
            <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
              {data.description}
            </p>
          </div>
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
                    // Fallback to external link
                    window.open("https://texasfencingacademy.glide.page", "_blank");
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </button>
            )
          ) : (
            // Fallback button
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Join Competitive Edge</span>
            </a>
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
              onClick={() => scrollToSection("blazepod-technology")}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Explore Technology</span>
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

function BlazePodTechnologySection() {
  return (
    <section
      id="blazepod-technology"
      className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Subtle background patterns */}
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
            BlazePod +{" "}
            <span className="font-semibold text-amber-600">HAT Technology</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionary training technology that combines BlazePod's dynamic
            light system with our exclusive patent-pending High Accuracy Trigger
            for unprecedented precision in performance tracking.
          </p>
        </div>

        {/* Technology Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Features content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Texas Fencing Academy, we're taking performance training to
                the next level. Our BlazePod system enhanced with HAT technology
                offers unparalleled precision in tracking reaction time,
                agility, and focus—ensuring every training session is as
                effective as possible.
              </p>

              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">
                  Exclusive HAT System Benefits:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Ultra-precise reaction time measurement (patent-pending)
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Real-time dynamic drills that adapt to your skill level
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Personalized data-driven insights for targeted improvement
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Only available at Texas Fencing Academy</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology image/visualization */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/competitiveEdge/BlazePodTraining.png"
                alt="BlazePod training with HAT technology"
                className="w-full h-80 lg:h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent pointer-events-none" />

              {/* Floating tech badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-600">HAT</div>
                  <div className="text-xs text-gray-600 font-medium">
                    Patent Pending
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProTrainingHubSection() {
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % skillMetrics.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-100 to-amber-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Pro Training Hub{" "}
            <span className="font-semibold text-amber-600">Mobile App</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive performance tracking with Cyborg Drills gamification.
            Monitor your progress across 10+ fencing skills with detailed
            analytics and personalized insights.
          </p>
        </div>

        {/* App Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* App mockup/screenshot area */}
          <div className="relative">
            <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="bg-amber-500 rounded-2xl p-4 text-black">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">Cyborg Drills - Stats</h3>
                  <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                    <span className="text-sm">⚡</span>
                  </div>
                </div>

                {/* Animated skill metrics */}
                <div className="space-y-3">
                  {skillMetrics.map((metric, index) => (
                    <div
                      key={metric.skill}
                      className={`bg-black/10 rounded-lg p-3 transition-all duration-500 ${
                        activeMetric === index ? "bg-black/20 scale-105" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {metric.skill}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${
                              metric.trend === "up"
                                ? "text-green-700"
                                : "text-red-700"
                            }`}
                          >
                            {metric.percentage}
                          </span>
                          <span className="text-xs">
                            {metric.trend === "up" ? "▲" : "▼"}
                          </span>
                          <span className="text-xs opacity-70">
                            {metric.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* App features content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Track Every Detail of Your Performance
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Pro Training Hub app provides comprehensive analytics across
                all aspects of your fencing performance. From daily drill
                tracking to long-term progress analysis, everything is at your
                fingertips.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    feature: "Daily Activity Tracking",
                    desc: "Monitor completed drills with success/failure indicators",
                  },
                  {
                    feature: "Skill Rankings",
                    desc: "See where you rank in 10+ specific fencing skills",
                  },
                  {
                    feature: "Performance Trends",
                    desc: "Track improvement over time with detailed analytics",
                  },
                  {
                    feature: "Personalized Insights",
                    desc: "Get targeted recommendations for skill development",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50"
                  >
                    <h4 className="font-semibold text-amber-700 mb-2">
                      {item.feature}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalizedTrainingSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-100 to-amber-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
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
            Personalized{" "}
            <span className="font-semibold text-amber-600">Training Plans</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Custom conditioning programs targeting your weakest skills and
            tournament-specific preparation aligned with your competition
            schedule. Every focused rep gets you closer to the top.
          </p>
        </div>

        {/* Training Plan Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {competitiveEdgeFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-700 ease-out min-h-[320px] cursor-pointer overflow-hidden"
            >
              {/* Subtle top accent with animation */}
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-700 rounded-xl"></div>

              {/* Feature content with fade and scale animations */}
              <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                {/* Feature icon */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-10 h-10 group-hover:animate-pulse object-contain"
                      />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Details overlay - appears on hover like a flipped card */}
              <div className="absolute inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                <h5 className="text-amber-700 font-semibold text-center mb-4 text-base group-hover:animate-pulse">
                  DETAILS
                </h5>
                <div className="space-y-2">
                  {feature.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="bg-amber-50 rounded-lg p-3 border border-amber-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-amber-100 hover:scale-102"
                      style={{ transitionDelay: `${detailIndex * 100}ms` }}
                    >
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0"></div>
                        <span>{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                  <span className="text-sm text-amber-600 font-medium group-hover:text-amber-700 group-hover:animate-pulse">
                    Learn More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sample Training Plan */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-16 hover:shadow-2xl transition-all duration-700 group relative overflow-hidden">
          {/* Animated background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/10 group-hover:to-amber-50/20 transition-all duration-1000 rounded-2xl"></div>

          {/* Subtle animated border glow */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-200/50 transition-all duration-700"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              {/* Animated header with glow effect */}
              <div className="relative inline-block group/header">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors duration-500 group/header-hover:animate-pulse">
                  Sample Weekly Training Plan
                </h3>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>

              {/* Animated subtitle with slide effect */}
              <div className="relative overflow-hidden">
                <p className="text-gray-600 transform group-hover:translate-y-0 group-hover:text-amber-600 transition-all duration-500">
                  Saturday - Footwork & Conditioning
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 opacity-30"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Situational Challenges */}
              <div className="space-y-6 group/challenges">
                <div className="relative">
                  <h4 className="text-lg font-semibold text-amber-600 mb-4 group-hover:text-amber-700 transition-colors duration-300 relative">
                    Situational Challenges
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group/challenges-hover:w-full transition-all duration-500 ease-out"></div>
                  </h4>
                </div>

                <div className="space-y-3">
                  {[
                    "First to 3 points wins, loser does quick penalty",
                    "Start 2-4 down and try to come back",
                    "Score only on counter-attacks",
                  ].map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg hover:bg-amber-100 hover:shadow-md hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-amber-200 group/item relative overflow-hidden"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-700"></div>

                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-amber-600 group-hover/item:scale-125 group-hover/item:animate-pulse transition-all duration-300"></div>
                      <span className="text-gray-700 group-hover/item:text-gray-800 group-hover/item:font-medium transition-all duration-300 relative z-10">
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Conditioning */}
              <div className="space-y-6 group/conditioning">
                <div className="relative">
                  <h4 className="text-lg font-semibold text-amber-600 mb-4 group-hover:text-amber-700 transition-colors duration-300 relative">
                    Custom Conditioning
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group/conditioning-hover:w-full transition-all duration-500 ease-out delay-200"></div>
                  </h4>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      exercise: "Blazepod Tripod Footwork",
                      details: "4 tripods + phone setup • 10 min • 3 times",
                    },
                    {
                      exercise: "Broadjumps",
                      details:
                        "3 explosive jumps • controlled execution • 5 min • 3 sets",
                    },
                    {
                      exercise: "Wrist Twists",
                      details:
                        "Tool work with extended arms • variable duration",
                    },
                  ].map((workout, index) => (
                    <div
                      key={index}
                      className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 hover:bg-amber-100 hover:border-l-amber-600 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer group/workout relative overflow-hidden"
                      style={{ animationDelay: `${index * 150 + 300}ms` }}
                    >
                      {/* Animated glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-200/20 to-amber-100/0 transform scale-x-0 group-hover/workout:scale-x-100 transition-transform duration-500 origin-left rounded-lg"></div>

                      {/* Animated left border expansion */}
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600 transform scale-y-0 group-hover/workout:scale-y-100 transition-transform duration-400 origin-top"></div>

                      <div className="relative z-10">
                        <h5 className="font-medium text-gray-800 mb-1 group-hover/workout:text-amber-800 group-hover/workout:font-semibold transition-all duration-300">
                          {workout.exercise}
                        </h5>
                        <p className="text-sm text-gray-600 group-hover/workout:text-gray-700 transition-colors duration-300">
                          {workout.details}
                        </p>
                      </div>

                      {/* Floating accent dot */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full opacity-0 group-hover/workout:opacity-100 group-hover/workout:animate-pulse transition-all duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <div
                  className="w-1 h-1 bg-amber-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
            <p className="text-gray-700 font-medium text-base mb-4">
              <span className="text-amber-700 font-semibold">
                Ready to unlock your competitive edge?
              </span>{" "}
              Join our elite training program and experience the future of
              fencing performance enhancement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="https://texasfencingacademy.glide.page"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 hover:scale-105 transition-all duration-500 shadow-lg"
              >
                <span>Join Competitive Edge</span>
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
              <a
                href="tel:+1-512-496-9022"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-amber-500 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 hover:scale-105 transition-all duration-500"
              >
                <span>Schedule Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CompetitiveEdgePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <InfoBanner />
      <Navbar />
      <CompetitiveEdgeHeroSection />
      <BlazePodTechnologySection />
      <ProTrainingHubSection />
      <PersonalizedTrainingSection />
      <FooterSection />
    </div>
  );
}
