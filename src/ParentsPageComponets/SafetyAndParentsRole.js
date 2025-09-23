import React, {  useRef, useCallback, useMemo } from "react";

import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";

/* ==================== HERO SECTION ==================== */
import { useState, useEffect } from 'react';

import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";

const HERO_QUERY = `*[_type=="heroSection" && slug.current=="parentsRole-section"][0]{
  title { first, second, third },
  tagline,
  description,
  background { asset, alt },
  backgroundMobile { asset, alt },
  primaryCta { text, url, newTab },
  secondaryCta { text, action }
}`;

function ParentsSafetyHero() {
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

  // Memoize scroll function to prevent recreating on each render
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Memoize secondary CTA handler to prevent recreation
  const runSecondary = useCallback(() => {
    const a = data?.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith('scroll:')) {
      document.getElementById(a.replace('scroll:', ''))?.scrollIntoView({ behavior: 'smooth' });
    } else if (a.startsWith('/')) {
      window.location.href = a;
    } else {
      window.open(a, '_self');
    }
  }, [data?.secondaryCta?.action]);

  // Memoize primary CTA handler
  const handlePrimaryCTA = useCallback(() => {
    if (data?.primaryCta?.url) {
      if (data.primaryCta.url.startsWith('#')) {
        scrollToSection(data.primaryCta.url.replace('#', ''));
      } else if (data.primaryCta.url.startsWith('scroll:')) {
        scrollToSection(data.primaryCta.url.replace('scroll:', ''));
      } else {
        scrollToSection("parents-role-safety");
      }
    } else {
      scrollToSection("parents-role-safety");
    }
  }, [data?.primaryCta?.url, scrollToSection]);

  // Fetch data once on mount
  useEffect(() => {
    sanityClient.fetch(HERO_QUERY).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  // Memoize image URLs to prevent recalculation
  const imageUrls = useMemo(() => {
    if (!data?.background?.asset) return null;
    
    const desktopImg = urlFor(data.background.asset).width(1920).format('webp').quality(80).url();
    const mobileImg = data.backgroundMobile?.asset
      ? urlFor(data.backgroundMobile.asset).width(768).format('webp').quality(75).url()
      : null;
    
    return { desktopImg, mobileImg };
  }, [data?.background?.asset, data?.backgroundMobile?.asset]);

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
      data-parents-safety-hero
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
        height: "100vh", // Use regular vh for better compatibility
        minHeight: "100vh"
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {!data || !imageUrls ? (
          <img
            src="/parentsComponent/ParentSafetyBg2.png"
            alt="Parents Role & Safety"
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
              alt={data.background.alt || "Parents Role & Safety"}
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
            alt={data.background.alt || "Parents Role & Safety"}
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
                {data?.title?.first || "PARENTS ROLE &"}
              </span>
              <span className="block text-amber-400 font-normal drop-shadow-lg">
                {data?.title?.second || "SAFETY"}
              </span>
              {(data?.title?.third) && (
                <span className="block">
                  {data.title.third}
                </span>
              )}
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
          {data?.primaryCta?.url?.startsWith('http') ? (
            <a
              href={data.primaryCta.url}
              target={data.primaryCta.newTab ? '_blank' : '_self'}
              rel={data.primaryCta.newTab ? 'noopener noreferrer' : ''}
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
                {data?.primaryCta?.text || "Parents & Safety"}
              </span>
            </button>
          )}

          {/* Secondary CTA */}
          <button
            onClick={data?.secondaryCta ? runSecondary : () => scrollToSection("safety-info")}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-base sm:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10">
              {data?.secondaryCta?.text || "View Safety Rules"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ==================== INFORMATION SECTION ==================== */
function ParentsSafetyInfo() {
  const [safetyData, setSafetyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSafetyData = async () => {
      try {
        const query = `*[_type == "parentsSafetyInfo"][0]{
          title,
          subtitle,
          safetyCommitment{
            mainText,
            subText
          },
          safetyStandards{
            title,
            description,
            tagline
          },
          safetyCategories[]{
            title,
            description,
            icon{
              asset->{
                _id,
                url
              }
            },
            details[]{
              item,
              description
            }
          },
          finalCommitment{
            label,
            text
          }
        }`;

        const data = await sanityClient.fetch(query);
        setSafetyData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching safety data:', error);
        setLoading(false);
      }
    };

    fetchSafetyData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!safetyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Failed to load safety information. Please try again later.</p>
      </div>
    );
  }

  return (
    <section
      id="safety-info"
      className="relative py-12 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background patterns - mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-4 md:top-20 md:left-20 w-32 h-32 md:w-72 md:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-15 md:opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-20 w-40 h-40 md:w-96 md:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-10 md:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header - mobile responsive */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-6 md:mb-8 group">
            <div className="w-8 md:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-8 md:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-3 md:mb-4 tracking-tight px-2">
            {safetyData.title?.split(' ').map((word, index) => {
              if (word.toLowerCase().includes('safe')) {
                return (
                  <span key={index} className="font-semibold text-amber-600">
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3 md:mb-4 px-4">
            {safetyData.subtitle}
          </p>

          {/* Safety commitment info - mobile responsive */}
          {safetyData.safetyCommitment && (
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-4 mb-6 md:mb-8 mx-4 md:mx-auto">
              <p className="text-gray-700 text-sm md:text-base mb-1 md:mb-2">
                <strong>{safetyData.safetyCommitment.mainText}</strong>
              </p>
              <p className="text-gray-600 text-xs md:text-sm">
                {safetyData.safetyCommitment.subText}
              </p>
            </div>
          )}
        </div>

        {/* Safety Categories - responsive grid */}
        <div className="mb-10 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-3 md:mb-4 text-center px-2">
            {safetyData.safetyStandards?.title?.split(' ').map((word, index) => {
              if (word.toLowerCase().includes('safety')) {
                return (
                  <span key={index} className="font-semibold text-amber-600">
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h3>
          <p className="text-center text-gray-600 mb-2 text-base md:text-lg px-4">
            {safetyData.safetyStandards?.description}
          </p>
          <p className="text-center text-amber-600 mb-8 md:mb-12 text-sm md:text-base font-medium px-4">
            {safetyData.safetyStandards?.tagline}
          </p>

          {/* Safety cards grid - mobile responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0">
            {safetyData.safetyCategories?.map((safety, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-2xl hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-102 md:hover:scale-105 transition-all duration-700 ease-out opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] min-h-[280px] md:min-h-[320px] cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Subtle top accent with animation */}
                <div className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-700 rounded-xl"></div>

                {/* Click indicator with bounce animation */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-bounce">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                    <svg
                      className="w-2.5 h-2.5 md:w-3 md:h-3 text-amber-600 group-hover:text-amber-700 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Safety info with fade and scale animations */}
                <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-500 ease-out">
                  <div className="text-center mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-xl mb-2 md:mb-3 border border-amber-200/50 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500 ease-out">
                      {safety.icon?.asset?.url ? (
                        <img 
                          src={safety.icon.asset.url} 
                          alt={`${safety.title} icon`}
                          className="w-6 h-6 md:w-10 md:h-10 object-contain group-hover:animate-pulse"
                        />
                      ) : (
                        <svg className="w-6 h-6 md:w-10 md:h-10 text-amber-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-amber-700 font-semibold text-sm md:text-base mb-2 md:mb-3 tracking-wide group-hover:text-amber-800 transition-colors duration-300 leading-tight">
                      {safety.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-xs md:text-base leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300 px-1 md:px-0">
                    {safety.description}
                  </p>
                </div>

                {/* Safety details overlay - mobile responsive */}
                <div className="absolute inset-4 md:inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                  <h5 className="text-amber-700 font-semibold text-center mb-2 text-sm md:text-base group-hover:animate-pulse">
                    SAFETY MEASURES
                  </h5>
                  <div className="space-y-1">
                    {safety.details?.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="bg-amber-50 rounded-lg p-1.5 md:p-2 border border-amber-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out hover:bg-amber-100 hover:scale-102"
                        style={{ transitionDelay: `${detailIndex * 100}ms` }}
                      >
                        <div className="flex justify-between items-start md:items-center mb-0.5 md:mb-1">
                          <span className="font-medium text-gray-800 text-xs leading-tight flex-1 mr-2">
                            {detail.item}
                          </span>
                          <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded group-hover:bg-amber-300 transition-colors duration-300 flex-shrink-0">
                            ✓
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs font-medium leading-tight">
                          {detail.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety commitment philosophy - mobile responsive */}
        {safetyData.finalCommitment && (
          <div className="text-center px-4 md:px-0">
            <div className="inline-flex items-center justify-center mb-3 md:mb-4">
              <div className="w-6 md:w-8 h-px bg-amber-300"></div>
              <div className="mx-2 md:mx-3 w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full"></div>
              <div className="w-6 md:w-8 h-px bg-amber-300"></div>
            </div>
            <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-4 md:p-6">
              <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                <span className="text-amber-700 font-semibold">
                  {safetyData.finalCommitment.label}
                </span>{" "}
                {safetyData.finalCommitment.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


function ParentsRoleInSafety() {
  const [parentsData, setParentsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParentsRoleData = async () => {
      try {
        const query = `*[_type == "parentsRole"][0]{
          title,
          subtitle,
          featuredQuote{
            quote,
            author,
            authorTitle
          },
          buildingChampions{
            title,
            description,
            tagline
          },
          parentRoles[]{
            title,
            description,
            icon{
              asset->{
                _id,
                url
              }
            },
            isDownloadable,
            downloadFile{
              asset->{
                _id,
                url
              }
            },
            details[]{
              item,
              description
            }
          },
          gallerySection{
            title,
            images[]{
              image{
                asset->{
                  _id,
                  url
                }
              },
              alt,
              caption
            }
          },
          philosophy{
            label,
            text
          }
        }`;

        const data = await sanityClient.fetch(query);
        setParentsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching parents role data:', error);
        setLoading(false);
      }
    };

    fetchParentsRoleData();
  }, []);

  // Function to handle resource download
  const handleResourceClick = (downloadFile) => {
    if (downloadFile?.asset?.url) {
      window.open(downloadFile.asset.url, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!parentsData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Failed to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <section
      id="parents-role-safety"
      className="relative py-8 md:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background patterns - restored for desktop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="hidden md:block absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-5 md:opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Section header - proper desktop sizing */}
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4 md:mb-8 group">
            <div className="w-6 md:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-6 md:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-3 md:mb-4 tracking-tight">
            {parentsData.title?.split(' ').map((word, index) => {
              if (word.toLowerCase().includes('role')) {
                return (
                  <span key={index} className="font-semibold text-amber-600">
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3 md:mb-4">
            {parentsData.subtitle}
          </p>

          {/* Featured Quote */}
          {parentsData.featuredQuote && (
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-6 mb-4 md:mb-8">
              <blockquote className="text-gray-700 text-xs md:text-base mb-2 md:mb-3 italic leading-relaxed">
                "{parentsData.featuredQuote.quote}"
              </blockquote>
              <p className="text-amber-700 font-semibold text-xs md:text-sm">
                - {parentsData.featuredQuote.author}
                {parentsData.featuredQuote.authorTitle && `, ${parentsData.featuredQuote.authorTitle}`}
              </p>
            </div>
          )}
        </div>

        {/* Parents Role - Fixed desktop layout */}
        <div className="mb-8 md:mb-16">
          <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-2 md:mb-4 text-center">
            {parentsData.buildingChampions?.title?.split(' ').map((word, index) => {
              if (word.toLowerCase().includes('champions')) {
                return (
                  <span key={index} className="font-semibold text-amber-600">
                    {word}{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h3>
          <p className="text-center text-gray-600 mb-1 md:mb-2 text-sm md:text-lg">
            {parentsData.buildingChampions?.description}
          </p>
          <p className="text-center text-amber-600 mb-6 md:mb-12 text-xs md:text-base font-medium">
            {parentsData.buildingChampions?.tagline}
          </p>

          {/* Layout Container */}
          <div className="relative">
            {/* Desktop timeline - restored */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 transform -translate-x-px hidden lg:block"></div>

            {parentsData.parentRoles?.map((role, index) => (
              <div
                key={index}
                className={`relative mb-4 md:mb-16 last:mb-0 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards] ${
                  // Desktop: Proper alternating layout
                  index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Desktop Timeline dot - restored positioning */}
                <div className={`absolute md:top-8 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg border-4 border-white z-10 hidden lg:block ${
                  index % 2 === 0 ? 'right-0 transform translate-x-3' : 'left-0 transform -translate-x-3'
                }`}>
                  <div className="w-full h-full bg-amber-500 rounded-full animate-pulse"></div>
                </div>

                {/* Content container - proper desktop margins */}
                <div className={`group relative bg-white/90 backdrop-blur-sm rounded-lg md:rounded-2xl p-4 md:p-8 shadow-sm border border-white/50 hover:shadow-xl hover:bg-white/95 transition-all duration-500 ${
                  // Desktop: Proper margins for alternating layout
                  index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
                } ${role.isDownloadable ? 'cursor-pointer' : ''}`}
                onClick={role.isDownloadable ? () => handleResourceClick(role.downloadFile) : undefined}
                >
                  {/* Desktop: Proper hover accent line */}
                  <div className={`absolute top-0 h-0.5 md:h-1 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 rounded-t-lg md:rounded-t-2xl opacity-0 group-hover:opacity-100 ${
                    index % 2 === 0 ? 'left-0 w-0 group-hover:w-full' : 'lg:right-0 lg:left-auto left-0 lg:w-0 lg:group-hover:w-full w-0 group-hover:w-full'
                  }`}></div>

                  {/* Click indicator for resource */}
                  {role.isDownloadable && (
                    <div className="absolute top-3 md:top-4 right-3 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300 group-hover:animate-bounce">
                        <svg className="w-3 h-3 md:w-4 md:h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Header section - proper desktop layout */}
                  <div className={`flex items-start gap-3 md:gap-6 mb-3 md:mb-6 ${
                    // Desktop: Proper alternating text alignment
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse lg:text-right'
                  }`}>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg md:rounded-2xl flex items-center justify-center border border-amber-200/50 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-200 transition-all duration-500">
                        {role.icon?.asset?.url ? (
                          <img 
                            src={role.icon.asset.url} 
                            alt={`${role.title} icon`}
                            className="w-5 h-5 md:w-8 md:h-8 object-contain group-hover:animate-pulse"
                          />
                        ) : (
                          <svg className="w-5 h-5 md:w-8 md:h-8 text-amber-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base md:text-xl font-semibold text-amber-700 mb-1 md:mb-2 tracking-wide group-hover:text-amber-800 transition-colors duration-300">
                        {role.title}
                      </h4>
                      <p className="text-gray-600 text-xs md:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {role.description}
                      </p>
                    </div>
                  </div>

                  {/* Details grid - responsive layout */}
                  <div className="space-y-2 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                    {role.details?.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="group/detail flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-md md:rounded-lg bg-amber-50/70 border border-amber-100/50 hover:bg-amber-50 hover:border-amber-200/50 transition-all duration-300 transform hover:scale-102 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                        style={{ animationDelay: `${(index * 0.2) + (detailIndex * 0.1) + 0.3}s` }}
                      >
                        <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 group-hover/detail:bg-amber-300 transition-colors duration-300">
                          {role.isDownloadable ? "📄" : "💡"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-800 text-xs md:text-sm mb-0.5 md:mb-1 group-hover/detail:text-gray-900 transition-colors duration-300">
                            {detail.item}
                          </h5>
                          <p className="text-gray-600 text-xs group-hover/detail:text-gray-700 transition-colors duration-300">
                            {detail.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action indicator - proper desktop alignment */}
                  <div className={`mt-3 md:mt-6 ${index % 2 === 0 ? 'text-center md:text-left' : 'text-center lg:text-right'}`}>
                    <span className="inline-flex items-center gap-1 md:gap-2 text-xs md:text-sm text-amber-600 font-medium group-hover:text-amber-700 transition-colors duration-300">
                      {role.isDownloadable ? (
                        <>
                          <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
                          </svg>
                          Click to Download Resource
                        </>
                      ) : (
                        <>
                          Essential for Success
                          <svg className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        {parentsData.gallerySection && (
          <div className="mb-8 md:mb-16">
            <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-4 md:mb-8 text-center">
              {parentsData.gallerySection.title?.split(' ').map((word, index) => {
                if (word.toLowerCase().includes('athletes')) {
                  return (
                    <span key={index} className="font-semibold text-amber-600">
                      {word}{' '}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {parentsData.gallerySection.images?.map((imageObj, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-md md:rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={imageObj.image.asset.url}
                    alt={imageObj.alt}
                    className="w-full h-24 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {imageObj.caption && (
                    <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {imageObj.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Philosophy statement */}
        {parentsData.philosophy && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3 md:mb-4">
              <div className="w-4 md:w-8 h-px bg-amber-300"></div>
              <div className="mx-2 md:mx-3 w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full"></div>
              <div className="w-4 md:w-8 h-px bg-amber-300"></div>
            </div>
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-6">
              <p className="text-gray-700 font-medium text-xs md:text-base leading-relaxed">
                <span className="text-amber-700 font-semibold">
                  {parentsData.philosophy.label}
                </span>{" "}
                {parentsData.philosophy.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ==================== MAIN PAGE ==================== */
export default function ParentsRoleSafetyPage() {
  return (
    <>
    <InfoBanner/>
    <Navbar />
    <ParentsSafetyHero />
    <ParentsSafetyInfo />
    <ParentsRoleInSafety />
    </>
  );
}
