import { useEffect, useState, useRef } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import founderpageimg2 from "../../assets/founderpageimg2.jpg";
import founderpagebg from "../../assets/founderpagebg.mp4";
import Navbar from "../../HomePageComponent/Navbar";
import InfoBanner from "../../HomePageComponent/InfoBanner";
import FooterSection from "../../Sections/FooterSection";


function HeroFounderSection({ posterSrc, videoSrc }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [enableVideo, setEnableVideo] = useState(false);

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

  // Enable background video only on md+ screens (>=768px)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnableVideo(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Pause when page is hidden (reduce CPU/memory)
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.visibilityState !== "visible") v.pause();
      else if (enableVideo) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [enableVideo]);

  // Unload video when disabled (mobile) to free Safari decoder/buffers
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!enableVideo) {
      v.removeAttribute("src");
      while (v.firstChild) v.removeChild(v.firstChild);
      v.load();
    } else {
      // Ensure muted and try to play for desktop reliability
      v.muted = true;
      v.play?.().catch(() => {});
    }
  }, [enableVideo]);

  return (
    <section
      ref={sectionRef}
      data-hero-founder
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
        {!enableVideo ? (
          <img
            src={posterSrc}
            alt="Founders of Texas Fencing Academy"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)"
            }}
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            disablePictureInPicture
            className="w-full h-full object-cover"
            poster={posterSrc}
            style={{
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)"
            }}
          >
            <source src={`${videoSrc}#t=0.001`} type="video/mp4" />
          </video>
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
              <span className="block">FROM OUR</span>
              <span className="block text-amber-400 font-normal drop-shadow-lg">
                FOUNDERS
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
            VINCENT BRADFORD & RAY PARKER
          </h2>
        </div>

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
            Meet the visionaries behind Texas Fencing Academy and discover their passion
            for developing the next generation of fencers through excellence and dedication.
          </p>
        </div>
      </div>
    </section>
  );
}

function FoundersProfileSection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200 overflow-hidden">
            {/* Subtle background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-15 rounded-full"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center space-x-4 mb-8 group">
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    </div>

                    <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight">
                        Meet Our <span className="font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">Founders</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        The vision and expertise behind Texas Fencing Academy's success
                    </p>
                </div>

                {/* Details grid matching summer camp card layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vincent Bradford Card */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="flex justify-center items-center mb-12">
                            <div className="w-48 h-48 overflow-hidden">
                                <img
                                    src="https://i.ytimg.com/vi/jtGpEoTHXgE/maxresdefault.jpg"
                                    alt="Founder Portrait"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>

                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            VINCENT BRADFORD
                        </h3>
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-gray-800">Co-Founder</p>
                            <p className="text-gray-600 leading-relaxed">
                                Master fencer and instructor with decades of experience in competitive fencing and coaching excellence.
                            </p>
                        </div>
                    </div>

                    {/* Ray Parker Card */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="mb-6">
                            <div className="w-48 h-48 mx-auto overflow-hidden">
                                <img
                                    src={founderpageimg2}
                                    alt="Ray Parker"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            RAY PARKER
                        </h3>
                        <div className="space-y-2">
                            <p className="text-lg font-semibold text-gray-800">Co-Founder</p>
                            <p className="text-gray-600 leading-relaxed">
                                Renowned fencing expert dedicated to fostering athletic excellence and personal growth through the art of fencing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section matching summer camp style */}

            </div>
        </section>
    );
}

function FounderVideoSection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
            {/* Background patterns matching summer camp groups section */}
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
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center space-x-4 mb-8 group">
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    </div>
                    <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight">
                        Our <span className="font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">Story</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        Watch Vincent Bradford and Ray Parker share their journey and vision for Texas Fencing Academy
                    </p>
                </div>

                {/* Video container with yellow shadow and corners */}
                <div className="relative max-w-4xl mx-auto mb-16">
                    {/* Small concentric circles at top-left and bottom-right */}
                    <div className="pointer-events-none absolute inset-0 z-0">
                        {/* Top-left concentric rings */}
                        <div className="absolute -top-8 -left-8">
                            <div className="w-10 h-10 border-2 border-amber-300/50 rounded-full animate-pulse-slow"></div>
                            <div className="w-16 h-16 border-2 border-amber-200/30 rounded-full absolute left-[-12px] top-[-12px] animate-pulse-slower"></div>
                        </div>
                        {/* Bottom-right concentric rings */}
                        <div className="absolute -bottom-8 -right-8">
                            <div className="w-12 h-12 border-2 border-amber-400/40 rounded-full animate-pulse-slow"></div>
                            <div className="w-20 h-20 border-2 border-amber-300/20 rounded-full absolute left-[-16px] top-[-16px] animate-pulse-slower"></div>
                        </div>
                    </div>
                    <div
                        className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 z-10"
                        style={{
                            boxShadow: '0 0 36px 0 rgba(251,191,36,0.20)',
                        }}
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/jtGpEoTHXgE?start=7"
                            title="From our founders Vincent Bradford and Ray Parker"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0"
                        ></iframe>
                        {/* Decorative corner borders */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/70 rounded-tl-lg pointer-events-none"></div>
                        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/70 rounded-tr-lg pointer-events-none"></div>
                        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/70 rounded-bl-lg pointer-events-none"></div>
                        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/70 rounded-br-lg pointer-events-none"></div>
                    </div>
                </div>



            </div>
        </section>
    );
}

function CoachesSection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200 overflow-hidden">
            {/* Subtle background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-15 rounded-full"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center space-x-4 mb-8 group">
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    </div>

                    <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight">
                        Meet Our <span className="font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">Coaches</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        Experienced professionals dedicated to fostering athletic excellence and personal growth
                    </p>
                </div>

                {/* Coaches grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Coach Ray Parker */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="mb-6">
                            <div className="w-48 h-48 mx-auto">
                                <img
                                    src="http://texasfence.wpengine.com/wp-content/uploads/2019/03/RayPortrait.jpg"
                                    alt="Ray Parker"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            RAY PARKER
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Coach Ray started fencing in 1983 at the University of Texas in Austin. In 1985 Vincent Bradford (two-time Olympian) came to UT and they founded Texas Fencing Academy in 1989 after graduation. Ray trained at USFCA and the United States Fencing Coaches College at the Olympic Training Center. He has trained many NCAA fencers and All-Americans.
                        </p>
                    </div>

                    {/* Coach Wes */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="mb-6">
                            <div className="w-48 h-48 mx-auto">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/03/WesPortrait.jpg"
                                    alt="Wes"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            WES
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Coach Wes started fencing at Texas State University in 2000, initially as a hobby and then competitively. He coached club and chaired the Texas inter-collegiate league (SWIFA). After an 8-year hiatus, Wes returned to competition and coaching, currently coaching regional and national level fencers in épée and saber.
                        </p>
                    </div>

                    {/* Coach Michael Maguire */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="mb-6">
                            <div className="w-48 h-48 mx-auto">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/03/MikePortrait-e1582331454879.jpg"
                                    alt="Michael Maguire"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            MICHAEL MAGUIRE
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Coach Michael Maguire began coaching in 1976, coaching national foil and épée in England before coming to the USA in 2000. He is a Master fencer having mastered all three fencing weapons.
                        </p>
                    </div>

                    {/* Coach Santiago Calderon */}
                    <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group">
                        <div className="mb-6">
                            <div className="w-48 h-48 mx-auto">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/09/Santiago.jpg"
                                    alt="Santiago Calderon"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            SANTIAGO CALDERON
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Santiago Calderon is the mental strength and fitness coach. He's a lifelong athlete professionally obsessed with sports. He holds a Master's in sport and exercise psychology and is a certified personal trainer. Santiago provides a holistic approach to training through his company Camuwave Performance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
function OurPhilosophySection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-15 rounded-full"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Section header matching other sections */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-4 mb-8 group">
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight animate-slide-up delay-[1000ms]">
                            Our <span className="font-semibold text-amber-600">Philosophy</span>
                        </h2>
                    </div>

                    <div className="overflow-hidden">
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in delay-[1400ms]">
                            The principles and values that guide our approach to fencing excellence
                        </p>
                    </div>
                </div>

                {/* Philosophy Content styled like the image */}
                <div className="space-y-6 text-lg leading-relaxed text-center max-w-3xl mx-auto text-gray-700">
                    <p>
                        Based on world class training system, we believe that the values and ethics instilled through fencing will lead students <strong className="text-amber-600 italic">not only excel in the sport but also in life.</strong>
                    </p>
                    <p>
                        Fencing <em>develops and encourages</em> the spirit of healthy rivalry and competition, teaching <strong className="text-amber-600 italic">emotional control, courage and self-discipline.</strong>
                    </p>
                    <p>
                        It inculcates team spirit, a sense of camaraderie and discipline, qualities that determine <strong className="text-amber-600 italic">winners in life</strong>, not just sports. The spirit of healthy competition, justice and fair play helps students achieve balance and harmony in life. Strong fencers spread the message of <em>hope, honour and good will</em> to all.
                    </p>
                    <p>
                        For many fencers, the ultimate goal is to become a <strong className="text-amber-600 italic">champion, Olympic or otherwise</strong>, and together with the coaches, the child's determination and the parents' help, we will do our best to achieve these goals.
                    </p>
                    <p>
                        <em>Most importantly, though,</em>
                    </p>
                    <p>
                        our fencers will learn to <strong className="text-amber-600 italic">overcome and win not only against an opponent, but also themselves</strong>, their weaknesses and fears, and ultimately <strong className="text-amber-600 italic">realize their potential!</strong>
                    </p>
                </div>

                {/* Blockquote section matching the image design */}
                <div className="max-w-2xl mx-auto my-12">
                    <blockquote className="border-l-4 border-amber-400 pl-6 italic text-slate-700 text-lg">
                        "Fencing rewards speed and agility over size and strength, making it particularly empowering for athletes who value technique over brute force."
                    </blockquote>
                    <div className="mt-4 flex items-center justify-center text-amber-600 font-medium text-sm">
                        <span className="mr-2">•</span>
                        <span>COACHING PHILOSOPHY</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FacilitiesSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const galleryImages = [
        {
            src: "https://texasfencingacademy.org/wp-content/uploads/2019/11/TFAstrips-scaled.jpg",
            alt: "Academy Strips",
        },
        {
            src: "https://texasfencingacademy.org/wp-content/uploads/2019/11/Entrance-scaled.jpg",
            alt: "Academy Entrance",
        },
        {
            src: "https://texasfencingacademy.org/wp-content/uploads/2019/11/TFALounge-scaled.jpg",
            alt: "Academy Lounge",
        },
        {
            src: "https://texasfencingacademy.org/wp-content/uploads/2019/11/TFAArmory2-scaled.jpg",
            alt: "Academy Armory",
        },
        {
            src: "https://texasfencingacademy.org/wp-content/uploads/2019/11/TFAstrips2-scaled.jpg",
            alt: "Academy Strips",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/5 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-900/5 rounded-full"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
                </div>
                <div className="absolute top-32 right-32 w-4 h-4 border border-amber-200 rounded-full animate-pulse-slow delay-700"></div>
                <div className="absolute bottom-40 left-40 w-6 h-6 border border-slate-200 rounded-full animate-pulse-slow delay-1500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header with circle image */}
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center space-x-4 mb-8 group">
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    </div>
                    <h2 className="text-5xl font-light text-slate-900 mb-6 animate-slide-up tracking-tight">
                        Our <span className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300">Facilities</span>
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in">
                        A premier fencing club with 6,000 sq. ft. of state-of-the-art training facilities
                    </p>
                </div>


                {/* Featured image carousel */}
                <div className="relative max-w-6xl mx-auto mb-20">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/50 via-transparent to-slate-100/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-elegant bg-gradient-to-br from-slate-100 to-amber-50">
                            <img
                                src={galleryImages[currentImageIndex].src}
                                alt={galleryImages[currentImageIndex].alt}
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                        <p className="text-white text-lg font-light mb-2">
                                            {galleryImages[currentImageIndex].alt}
                                        </p>
                                        <div className="flex items-center space-x-2 text-amber-300">
                                            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium">TEXAS FENCING ACADEMY</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Navigation arrows */}
                            <button
                                onClick={() =>
                                    setCurrentImageIndex(
                                        currentImageIndex === 0
                                            ? galleryImages.length - 1
                                            : currentImageIndex - 1
                                    )
                                }
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                                aria-label="Previous Image"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() =>
                                    setCurrentImageIndex(
                                        currentImageIndex === galleryImages.length - 1
                                            ? 0
                                            : currentImageIndex + 1
                                    )
                                }
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                                aria-label="Next Image"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* Navigation dots */}
                    <div className="flex justify-center mt-10 space-x-4">
                        {galleryImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative transition-all duration-500 ${currentImageIndex === index ? "w-12 h-3" : "w-3 h-3 hover:w-6"
                                    }`}
                                aria-label={`Select image ${index + 1}`}
                            >
                                <div
                                    className={`absolute inset-0 rounded-full transition-all duration-500 ${currentImageIndex === index
                                            ? "bg-amber-500 shadow-glow"
                                            : "bg-slate-300 hover:bg-slate-400"
                                        }`}
                                ></div>
                                {currentImageIndex === index && (
                                    <div className="absolute inset-0 bg-amber-400 rounded-full animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
                    {galleryImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative cursor-pointer"
                            onClick={() => setCurrentImageIndex(index)}
                        >
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50 p-1 transition-all duration-500 group-hover:p-0">
                                <div className="w-full h-full rounded-xl overflow-hidden shadow-md group-hover:shadow-elegant transition-all duration-500">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                                                <p className="text-white text-sm font-light mb-2 line-clamp-2">
                                                    {image.alt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {currentImageIndex === index && (
                                        <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-glow"></div>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${currentImageIndex === index
                                        ? "bg-gradient-to-r from-amber-400 to-amber-600 opacity-100"
                                        : "bg-gradient-to-r from-slate-200 to-amber-200 opacity-0 group-hover:opacity-50"
                                    }`}
                                style={{ zIndex: -1 }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function InformationLinksSection() {
    return (
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

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                {/* Section header */}
                <div className="flex items-center justify-center space-x-4 mb-8 group">
                    <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                </div>

                <div className="overflow-hidden">
                    <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight animate-slide-up delay-[1000ms]">
                        For More <span className="font-semibold text-amber-600">Information</span>
                    </h2>
                </div>

                <div className="overflow-hidden">
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-16 animate-fade-in delay-[1400ms]">
                        Access important resources and academy information
                    </p>
                </div>

                {/* Links grid matching summer camp button style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Policies Card - Now redirects to React page */}
                    <Link
                        to="/policies"
                        className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group"
                    >
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            POLICIES
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Academy guidelines & procedures
                        </p>
                    </Link>

                    {/* Fencing Links Card */}
                    <Link
                        to="/fencinglinks"
                        className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group"
                    >
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            FENCING LINKS
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Useful fencing resources
                        </p>
                    </Link>

                    {/* Opt-out Preferences Card */}
                    <Link
                        to="/optout"
                        className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 text-center transform hover:scale-105 transition-all duration-500 group"
                    >
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-amber-600 font-semibold text-xl mb-6 tracking-wider border-b border-amber-200 pb-2">
                            OPT-OUT
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Communication preferences
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}



export default function FounderPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
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
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden contain-layout-paint ${isResizing ? "no-animations" : ""
            } ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            <InfoBanner />
            <Navbar />
            <HeroFounderSection
  posterSrc={founderpageimg2}          // path or import for poster image
  videoSrc={founderpagebg}            // mp4 H.264 background loop
/>
            <FoundersProfileSection />
            <FounderVideoSection />
            <CoachesSection />
            <FacilitiesSection />
            <OurPhilosophySection />
            <InformationLinksSection />
            <FooterSection />
        </div>
    );
}
