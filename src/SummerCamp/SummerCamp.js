
import { useEffect, useState } from "react";
import InfoBanner from "../HomePageComponent/InfoBanner";
import Navbar from "../HomePageComponent/Navbar";
import { sanityClient } from "../Sanity/sanityClient";
import {getVideoAttributes } from '../Sanity/imageBuilder';
import { SUMMER_CAMP_HERO_QUERY } from "../Sanity/queries";


// Helper to fetch hero data
async function fetchSummerCampHero(heroSlug = "summerCamp") {
  try {
    const heroData = await sanityClient.fetch(SUMMER_CAMP_HERO_QUERY, { heroSlug });
    return heroData;
  } catch (error) {
    console.error("Error fetching summer camp hero data:", error);
    return null;
  }
}

// Helper to convert campDates object to array for dynamic rendering
function getCampSessions(campDates) {
  if (!campDates) return [];
  const sessions = [];
  
  Object.keys(campDates).forEach(key => {
    const session = campDates[key];
    if (session && session.title && session.dates) {
      sessions.push({
        title: session.title,
        dates: session.dates
      });
    }
  });
  
  return sessions;
}

function HeroSummerCamp({ scrollToRegistration, heroSlug = "summerCamp" }) {
  const [heroData, setHeroData] = useState(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hero data
  useEffect(() => {
    const loadHeroData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSummerCampHero(heroSlug);
        setHeroData(data);
      } catch (err) {
        setError(err);
        console.error("Failed to load hero data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadHeroData();
  }, [heroSlug]);

  // Handle resize events to optimize performance
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

  // Handle button click based on actionType
  const handleButtonClick = () => {
    if (!heroData?.primaryCta) {
      scrollToRegistration();
      return;
    }
    const { actionType, url, newTab } = heroData.primaryCta;
    if (actionType === "scroll") {
      scrollToRegistration();
    } else if (url) {
      if (newTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    } else {
      scrollToRegistration();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  // Error state
  if (error || !heroData) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Unable to load hero section</h2>
          <p className="text-gray-400">Please try refreshing the page</p>
        </div>
      </section>
    );
  }

  // Destructure data with fallbacks
  const {
    title,
    tagline,
    description,
    campDates,
    backgroundVideoUrl,
    backgroundVideoMimeType,
    backgroundVideoSize,
    primaryCta
  } = heroData;

  const campSessions = getCampSessions(campDates);
  const videoAttributes = getVideoAttributes({
    url: backgroundVideoUrl,
    mimeType: backgroundVideoMimeType,
    size: backgroundVideoSize
  });

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6 contain-layout-paint ${
        isResizing ? "no-animations" : ""
      }`}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          preload={videoAttributes.preload}
        >
          <source 
            src={videoAttributes.src || "/summerCamp/FencingVideo.mp4"} 
            type={videoAttributes.type || "video/mp4"} 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-gray-800/65 to-gray-900/75 md:from-gray-900/60 md:via-gray-800/50 md:to-gray-900/60"></div>
      </div>

      {/* Refined fencing motifs */}
      <div className={`absolute inset-0 opacity-10 hidden md:block transition-opacity duration-300 ${
        isResizing ? "opacity-0" : "opacity-10"
      }`}>
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-fade-in delay-[3000ms] will-change-transform-opacity"></div>
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-fade-in delay-[3500ms] will-change-transform-opacity"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-fade-in delay-[4000ms] will-change-transform-opacity"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
        {/* Main heading */}
        <div className="space-y-4 md:space-y-6">
          <div className="overflow-hidden">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-none text-white drop-shadow-lg will-change-transform-opacity ${
              isResizing ? "transition-none" : "animate-slide-up delay-[800ms]"
            }`}>
              <span className={`block will-change-transform-opacity ${
                isResizing ? "transition-none" : "animate-slide-up delay-[1000ms]"
              }`}>
                {title?.first || "SUMMER"}
              </span>
              <span className={`block text-amber-400 font-normal drop-shadow-lg will-change-transform-opacity ${
                isResizing ? "transition-none" : "animate-slide-up delay-[1400ms]"
              }`}>
                {title?.second || "FENCING"}
              </span>
              <span className={`block will-change-transform-opacity ${
                isResizing ? "transition-none" : "animate-slide-up delay-[1800ms]"
              }`}>
                {title?.third || "CAMP"}
              </span>
            </h1>
          </div>

          {/* Elegant centered divider */}
          <div className={`flex items-center justify-center space-x-3 md:space-x-4 will-change-transform-opacity ${
            isResizing ? "opacity-100 transition-none" : "animate-fade-in delay-[2200ms]"
          }`}>
            <div className={`w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-amber-400 will-change-transform-opacity ${
              isResizing ? "transition-none" : "animate-slide-right delay-[2800ms]"
            }`}></div>
            <div className={`w-10 h-10 md:w-12 md:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 will-change-transform-opacity bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm ${
              isResizing ? "transition-none" : "animate-fade-in delay-[2400ms]"
            }`}>
              <div className={`w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-400 rounded-full will-change-transform-opacity ${
                isResizing ? "transition-none" : "animate-pulse delay-[2600ms]"
              }`}></div>
            </div>
            <div className={`w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-amber-400 will-change-transform-opacity ${
              isResizing ? "transition-none" : "animate-slide-left delay-[2800ms]"
            }`}></div>
          </div>
        </div>

        {/* Excellence tagline */}
        <div className="overflow-hidden">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-[0.1em] md:tracking-[0.15em] drop-shadow-md px-4 md:px-0 will-change-transform-opacity ${
            isResizing ? "opacity-100 transition-none" : "animate-slide-up delay-[3000ms]"
          }`}>
            {tagline || "TWO WEEKS OF EXCELLENCE"}
          </h2>
        </div>

        {/* Dynamic Camp dates */}
        {campSessions.length > 0 && (
          <div className={`space-y-4 md:space-y-6 will-change-transform-opacity px-4 md:px-0 ${
            isResizing ? "opacity-100 transition-none" : "animate-fade-in delay-[3400ms]"
          }`}>
            <div className={`flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-16 justify-center ${
              campSessions.length > 2 ? "flex-wrap" : ""
            }`}>
              {campSessions.map((session, index) => (
                <div 
                  key={index}
                  className={`will-change-transform-opacity ${
                    isResizing ? "transition-none" : `animate-slide-up delay-[${3600 + (index * 200)}ms]`
                  }`}
                >
                  <h3 className="text-amber-400 font-semibold text-base md:text-lg tracking-wider mb-1 md:mb-2 drop-shadow-md">
                    {session.title}
                  </h3>
                  <p className="text-white font-light text-lg md:text-xl drop-shadow-sm">
                    {session.dates}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="overflow-hidden">
          <p className={`text-base sm:text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm px-4 md:px-0 will-change-transform-opacity ${
            isResizing ? "opacity-100 transition-none" : "animate-fade-in delay-[4000ms]"
          }`}>
            {description || "Master the fundamentals of fencing through expert instruction, teamwork, and engaging activities designed for young athletes ages 6-15."}
          </p>
        </div>

        {/* Call-to-action button */}
        <div className="pt-2 md:pt-4 px-4 md:px-0">
          <div className={`will-change-transform-opacity ${
            isResizing ? "transition-none" : "animate-slide-up delay-[4400ms]"
          }`}>
            <button
              onClick={handleButtonClick}
              className="
                group relative inline-block px-8 md:px-12 py-3 md:py-4 
                bg-gradient-to-r from-amber-500 to-amber-600 
                text-gray-900 font-semibold text-base md:text-lg 
                rounded-lg shadow-xl
                overflow-hidden 
                transition 
                duration-500 ease-in-out
                hover:shadow-amber-500/50 hover:scale-105 hover:brightness-110
                focus:outline-none focus:ring-4 focus:ring-amber-400/70
                will-change-transform
                border border-amber-400/50
                w-full sm:w-auto
              "
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center justify-center">
                {primaryCta?.text || "REGISTER NOW"}
                <img
                  src="/sword.png"
                  alt="Fencing icon"
                  className="ml-3 w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-500 filter brightness-0"
                  fetchPriority="low"
                  decoding="async"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for no-animations class */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}


function CampDetailSection() {
  const [isResizing, setIsResizing] = useState(false);

  // Handle resize events to optimize performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section 
      className={`relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background patterns - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-3 sm:top-8 sm:left-4 md:top-10 md:left-6 lg:top-20 lg:left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-72 lg:h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-10 sm:opacity-12 md:opacity-15 lg:opacity-20 rounded-full"></div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-4 md:bottom-10 md:right-6 lg:bottom-20 lg:right-20 w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-96 lg:h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-8 sm:opacity-10 md:opacity-12 lg:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section header - mobile responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 group">
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>
          
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2">
            Camp <span className={`font-semibold text-amber-600 inline-block transition-transform duration-300 ${
              isResizing ? 'transition-none' : 'hover:scale-105'
            }`}>Details</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-3 sm:px-4 md:px-6 lg:px-0">
            Everything you need to know about our premium summer program
          </p>
        </div>

        {/* Details grid - mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          
          {/* Schedule Card */}
          <div className={`bg-white/95 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 text-center transition-all duration-500 group ${
            isResizing ? 'transition-none' : 'transform hover:scale-105'
          }`}>
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-amber-600 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 tracking-wider border-b border-amber-200 pb-2">
              SCHEDULE
            </h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              {[
                { time: "8:30 AM", desc: "Drop Off" },
                { time: "2:00-2:30 PM", desc: "Pick Up" },
                { time: "2:30-5:30 PM", desc: "Extended Stay" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm">
                  <span className="text-gray-700 font-medium mb-1 sm:mb-0">{item.time}</span>
                  <span className="text-gray-600 font-light">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ages Card */}
          <div className={`bg-white/95 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 text-center transition-all duration-500 group ${
            isResizing ? 'transition-none' : 'transform hover:scale-105'
          }`}>
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <h3 className="text-amber-600 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 tracking-wider border-b border-amber-200 pb-2">
              AGES
            </h3>
            <div className="space-y-1 sm:space-y-2">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">6-15</p>
              <p className="text-gray-600 font-light text-sm sm:text-base">Years Old</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 md:mt-4">All skill levels welcome</p>
            </div>
          </div>

          {/* Pricing Card */}
          <div className={`bg-gradient-to-br from-amber-50 to-amber-100 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl border border-amber-200 p-4 sm:p-5 md:p-6 lg:p-8 text-center transition-all duration-500 ${
            isResizing ? 'transition-none' : 'transform hover:scale-105'
          }`}>
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center shadow-inner">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-amber-600 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 tracking-wider border-b border-amber-300 pb-2">
              PRICING
            </h3>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-700 font-medium text-sm sm:text-base mb-1 sm:mb-0">Camp Fee</span>
                <span className="text-amber-600 font-bold text-lg sm:text-xl md:text-2xl">$375</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <span className="text-gray-700 font-medium text-sm sm:text-base mb-1 sm:mb-0">Extended Stay</span>
                <span className="text-amber-600 font-bold text-lg sm:text-xl md:text-2xl">$125</span>
              </div>
              <div className="pt-2 sm:pt-3 md:pt-4 border-t border-amber-300">
                <p className="text-xs text-gray-600">2nd family member: $50 discount</p>
              </div>
            </div>
          </div>

          {/* Equipment Card */}
          <div className={`bg-white/95 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 text-center transition-all duration-500 group ${
            isResizing ? 'transition-none' : 'transform hover:scale-105'
          }`}>
            <div className="mb-3 sm:mb-4 md:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-amber-600 font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-6 tracking-wider border-b border-amber-200 pb-2">
              EQUIPMENT
            </h3>
            <div className="space-y-2 sm:space-y-3 text-left">
              {[
                "All fencing gear provided",
                "Wear athletic clothing",
                "Closed-toe shoes required",
                "Bring water bottle & lunch"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700 text-xs sm:text-sm font-light leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Section - mobile responsive */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center px-2 sm:px-4 md:px-6 lg:px-0">
          <div className="bg-white/90 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 lg:p-8 max-w-4xl mx-auto">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 md:mb-4">
              What Makes Our Camp Special?
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
              Our experienced instructors provide personalized attention in a fun, themed environment. 
              Campers will explore both epee and saber techniques while building confidence, 
              discipline, and lasting friendships in our state-of-the-art facility.
            </p>
          </div>
        </div>
      </div>

      {/* Add custom CSS for no-animations class */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

function GroupSection() {
  const [isResizing, setIsResizing] = useState(false);

  // Handle resize events to optimize performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section 
      className={`relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background patterns - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-3 sm:top-8 sm:left-4 md:top-10 md:left-6 lg:top-20 lg:left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-72 lg:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-10 sm:opacity-12 md:opacity-15 lg:opacity-20 rounded-full"></div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-4 md:bottom-10 md:right-6 lg:bottom-20 lg:right-20 w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-96 lg:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-8 sm:opacity-10 md:opacity-12 lg:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section header - mobile responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 group">
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>
          
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2">
            Join Your{" "}
            <span className={`font-semibold text-amber-600 inline-block transition-transform duration-300 ${
              isResizing ? 'transition-none' : 'hover:scale-105'
            }`}>
              Star Trek
            </span>{" "}
            House
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-3 sm:px-4 md:px-6 lg:px-0">
            Campers are organized into themed groups with similar ages and experience levels. 
            Each house rotates through different activities with dedicated counselors.
          </p>
        </div>

        {/* Houses Grid - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {[
            { name: "KLINGONS", description: "Warriors of Honor" },
            { name: "BORG", description: "Collective Excellence" },
            { name: "ROMULANS", description: "Strategic Minds" },
            { name: "FERENGI", description: "Cunning Traders" }
          ].map((group, index) => (
            <div key={group.name} className="group relative overflow-hidden">
              {/* Uniform Silver Card */}
              <div className={`relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-2xl border-2 border-gray-300 transition-all duration-500 hover:shadow-xl hover:border-amber-300 ${
                isResizing ? 'transition-none' : 'transform hover:scale-105'
              }`}>
                {/* House Icon - Silver with Amber Accent */}
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg border-2 border-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                {/* House Details */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 tracking-wider">
                    {group.name}
                  </h3>
                  <p className="text-amber-600 font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 md:mb-3 tracking-wide">
                    HOUSE {index + 1}
                  </p>
                  <p className="text-gray-600 font-light text-xs sm:text-sm md:text-base leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Silver Decorative Elements */}
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 opacity-20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 opacity-20">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-500"></div>
                </div>

                {/* Subtle Silver Hover Overlay */}
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-gray-300 to-gray-400"></div>
              </div>

              {/* Floating accent element */}
              <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 md:-top-2 md:-right-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border-2 border-amber-300 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-500 bg-gradient-to-br from-gray-200/50 to-gray-300/50"></div>
            </div>
          ))}
        </div>

        {/* Additional Info - Silver Theme */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 backdrop-blur-2xl rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg border border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8 max-w-4xl mx-auto">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4 md:mb-6">House Activities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-left">
              <div>
                <h5 className="font-semibold text-amber-600 mb-1 sm:mb-2 text-sm sm:text-base">Team Building</h5>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">Collaborative exercises that strengthen bonds within each house.</p>
              </div>
              <div>
                <h5 className="font-semibold text-amber-600 mb-1 sm:mb-2 text-sm sm:text-base">Skill Rotations</h5>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">Houses rotate through different fencing stations throughout the day.</p>
              </div>
              <div>
                <h5 className="font-semibold text-amber-600 mb-1 sm:mb-2 text-sm sm:text-base">Friendly Competition</h5>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">Inter-house competitions foster healthy rivalry and motivation.</p>
              </div>
              <div>
                <h5 className="font-semibold text-amber-600 mb-1 sm:mb-2 text-sm sm:text-base">Mentorship</h5>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">Experienced campers help guide newcomers within their house.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for no-animations class */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}


function RegistrationSection() {
  const [isResizing, setIsResizing] = useState(false);

  // Handle resize events to optimize performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section 
      id="registration-section" 
      className={`relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background patterns - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-3 sm:top-8 sm:left-4 md:top-10 md:left-6 lg:top-20 lg:left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-72 lg:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-10 sm:opacity-12 md:opacity-15 lg:opacity-20 rounded-full"></div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-4 md:bottom-10 md:right-6 lg:bottom-20 lg:right-20 w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-96 lg:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-8 sm:opacity-10 md:opacity-12 lg:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center">
        {/* Section header - mobile responsive */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 group">
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
        </div>

        <div className="overflow-hidden">
          <h2 className={`text-[clamp(1.75rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 will-change-transform-opacity ${
            isResizing ? 'transition-none' : 'animate-slide-up delay-[1000ms]'
          }`}>
            READY TO <span className={`font-semibold text-amber-600 inline-block transition-transform duration-300 ${
              isResizing ? 'transition-none' : 'hover:scale-105'
            }`}>BEGIN</span>?
          </h2>
        </div>
        
        <div className="overflow-hidden">
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-6 sm:mb-8 md:mb-10 lg:mb-16 px-3 sm:px-4 md:px-6 lg:px-0 will-change-transform-opacity ${
            isResizing ? 'transition-none' : 'animate-fade-in delay-[1400ms]'
          }`}>
            Register now through the TFA Team App or use our secure payment options below
          </p>
        </div>

        {/* Clear instruction for clicking - mobile responsive */}
        <div className={`mb-4 sm:mb-5 md:mb-6 lg:mb-8 px-3 sm:px-4 md:px-6 lg:px-0 will-change-transform-opacity ${
          isResizing ? 'transition-none' : 'animate-fade-in delay-[1700ms]'
        }`}>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-amber-500 flex items-center justify-center animate-pulse">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <p className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg">
              Click a camp button below to register instantly
            </p>
          </div>
        </div>

        {/* Enhanced Registration Buttons - mobile responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 justify-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-2 sm:px-4 md:px-6 lg:px-0">
          
          {/* Camp I Button */}
          <div className={`will-change-transform-opacity ${
            isResizing ? 'transition-none' : 'animate-slide-up delay-[1800ms]'
          }`}>
            <button
              onClick={() =>
                window.open(
                  "https://texasfencingacademy.glide.page",
                  "_blank"
                )
              }
              className={`
                group relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-3.5 md:py-4 
                bg-gradient-to-r from-amber-500 to-amber-600 
                text-gray-900 font-semibold text-sm sm:text-base md:text-lg 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg
                overflow-hidden 
                transition 
                duration-500 ease-in-out
                hover:shadow-xl active:scale-95 hover:scale-105 hover:brightness-110
                focus:outline-none focus:ring-4 focus:ring-amber-400/70
                will-change-transform
                cursor-pointer
                w-full sm:w-auto
                ${isResizing ? 'animate-none' : 'animate-pulse hover:animate-none'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 mr-2 sm:mr-3 text-center">CAMP I - JUNE 2-6</span>
              <svg className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Camp II Button */}
          <div className={`will-change-transform-opacity ${
            isResizing ? 'transition-none' : 'animate-slide-up delay-[2000ms]'
          }`}>
            <button
              onClick={() =>
                window.open(
                  "https://texasfencingacademy.glide.page",
                  "_blank"
                )
              }
              className={`
                group relative inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-3.5 md:py-4 
                bg-gradient-to-r from-amber-500 to-amber-600 
                text-gray-900 font-semibold text-sm sm:text-base md:text-lg 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg
                overflow-hidden 
                transition 
                duration-500 ease-in-out
                hover:shadow-xl active:scale-95 hover:scale-105 hover:brightness-110
                focus:outline-none focus:ring-4 focus:ring-amber-400/70
                will-change-transform
                cursor-pointer
                w-full sm:w-auto
                ${isResizing ? 'animate-none' : 'animate-pulse hover:animate-none'}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 mr-2 sm:mr-3 text-center">CAMP II - JUNE 9-13</span>
              <svg className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Extended Stay Button */}
          <div className={`will-change-transform-opacity ${
            isResizing ? 'transition-none' : 'animate-slide-up delay-[2200ms]'
          }`}>
            <button
              onClick={() =>
                window.open(
                  "https://texasfencingacademy.glide.page",
                  "_blank"
                )
              }
              className="
                group inline-flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-3.5 md:py-4 
                bg-gradient-to-br from-gray-100 to-gray-200 
                border-2 border-gray-300 
                text-gray-700 font-semibold text-sm sm:text-base md:text-lg 
                rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg backdrop-blur-2xl
                transition 
                duration-500 ease-in-out
                hover:bg-gradient-to-br hover:from-gray-200 hover:to-gray-300 
                hover:border-amber-400 active:scale-95 hover:scale-105 hover:shadow-xl
                focus:outline-none focus:ring-4 focus:ring-gray-300/40
                will-change-transform
                cursor-pointer
                w-full sm:w-auto
              "
            >
              <span className="mr-2 sm:mr-3 text-center">EXTENDED STAY ADD-ON</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add custom CSS for no-animations class */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

const campImages = [
  '/summerCamp/CampImage1.jpg',
  '/summerCamp/CampImage2.jpg',
  '/summerCamp/CampImage3.jpg',
  '/summerCamp/CampImage4.jpg',
  '/summerCamp/CampImage5.jpg',
  '/summerCamp/CampImage6.jpg',
  '/summerCamp/CampImage7.jpg',
];

function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle resize events to optimize performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Auto shuffle images every 4 seconds (pause on hover/touch)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % campImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

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

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? campImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % campImages.length);
  };

  return (
    <section 
      className={`relative py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background patterns - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-3 sm:top-8 sm:left-4 md:top-10 md:left-6 lg:top-20 lg:left-20 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-72 lg:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-10 sm:opacity-12 md:opacity-15 lg:opacity-20 rounded-full"></div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-4 md:bottom-10 md:right-6 lg:bottom-20 lg:right-20 w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-96 lg:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-8 sm:opacity-10 md:opacity-12 lg:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Section header - mobile responsive */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8 group">
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <div className="overflow-hidden">
            <h2 className={`text-[clamp(1.75rem,5vw,3rem)] lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 md:mb-6 tracking-tight px-2 will-change-transform-opacity ${
              isResizing ? 'transition-none' : 'animate-slide-up delay-[1000ms]'
            }`}>
              CAMP <span className={`font-semibold text-amber-600 inline-block transition-transform duration-300 ${
                isResizing ? 'transition-none' : 'hover:scale-105'
              }`}>MEMORIES</span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light px-3 sm:px-4 md:px-6 lg:px-0 will-change-transform-opacity ${
              isResizing ? 'transition-none' : 'animate-fade-in delay-[1400ms]'
            }`}>
              Experience the excitement and camaraderie from our previous camps
            </p>
          </div>
        </div>

        {/* Enhanced Carousel Container - mobile responsive with swipe */}
        <div className="relative max-w-5xl mx-auto px-2 sm:px-4 md:px-0">
          <div 
            className={`relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl bg-gradient-to-br from-white to-gray-100 border border-amber-200/50 sm:border-2 will-change-transform-opacity ${
              isResizing ? 'transition-none' : 'animate-fade-in delay-[1800ms]'
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-x' }}
          >
            {/* Main Image Display - mobile responsive */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing select-none">
              <img
                src={campImages[currentIndex]}
                alt={`Camp Memory ${currentIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-1000 ease-in-out select-none ${
                  isResizing ? 'transition-none' : 'transform hover:scale-105'
                }`}
                decoding="async"
                loading="lazy"
                draggable={false}
              />
              
              {/* Beautiful gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-amber-500/10 pointer-events-none"></div>
              
              {/* Image counter - mobile responsive */}
              <div className="absolute top-2 sm:top-3 md:top-4 lg:top-6 right-2 sm:right-3 md:right-4 lg:right-6 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-white text-xs sm:text-sm font-semibold">
                {currentIndex + 1} / {campImages.length}
              </div>

              {/* Swipe indicator for mobile */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 sm:hidden">
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

              {/* Navigation Arrows ON IMAGE - responsive */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-md sm:shadow-lg transition-all duration-300 active:scale-95 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-400/50 z-10"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 md:p-3 rounded-full shadow-md sm:shadow-lg transition-all duration-300 active:scale-95 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-400/50 z-10"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Dot Indicators - mobile responsive */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6 lg:mt-8">
            {campImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50
                  ${index === currentIndex 
                    ? 'bg-amber-500 shadow-md sm:shadow-lg scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400 active:scale-95 hover:scale-110'
                  }
                `}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Preview Strip - hidden on mobile, visible on md+ */}
          <div className="hidden md:flex justify-center gap-2 lg:gap-3 xl:gap-4 mt-5 lg:mt-6 xl:mt-8 overflow-x-auto pb-2 sm:pb-4">
            {campImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-md sm:rounded-lg lg:rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-400/50
                  ${index === currentIndex 
                    ? 'ring-2 sm:ring-3 lg:ring-4 ring-amber-500 scale-110 shadow-lg sm:shadow-xl' 
                    : 'opacity-60 hover:opacity-100 active:scale-95 hover:scale-105'
                  }
                `}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-amber-400/20"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add custom CSS for no-animations class */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

export default function SummerCampPage() {
  const [isResizing, setIsResizing] = useState(false);

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    // Fetch summer camp hero data
    const fetchHeroData = async () => {
      const query = `*[_type == "heroSection" && heroType == "summerCamp"][0]{
        title,
        tagline,
        description,
        campDates,
        backgroundVideo,
        primaryCta
      }`;
      
      const data = await sanityClient.fetch(query);
      setHeroData(data);
    };

    fetchHeroData();
  }, []);

  // Scroll to registration handler
  const scrollToRegistration = () => {
    const registrationSection = document.querySelector("#registration-section");
    if (registrationSection) {
      registrationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={`bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden contain-layout-paint ${
        isResizing ? "no-animations" : ""
      }`}
    >
      {/* Hero Section */}
      <InfoBanner/>
      <Navbar/>
      <HeroSummerCamp scrollToRegistration={scrollToRegistration} />


      {/* Camp Details Section */}
      <CampDetailSection/>

      {/* Star Trek Groups Section */}
      <GroupSection/>

      {/* Registration Section */}
      <RegistrationSection/>

      {/* Gallery Section */}
      <GallerySection/>
    </div>
  );
}
