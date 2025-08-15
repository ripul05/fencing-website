import React from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";

/* ==================== HERO SECTION ==================== */
import { useState, useEffect } from 'react';

function ParentsSafetyHero() {
  const [isResizing, setIsResizing] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
      className={`relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-6 contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/parentsComponent/ParentSafetyBg2.png"
          alt="Parents Role & Safety"
          className="w-full h-full object-cover animate-fade-in will-change-transform-opacity"
          fetchPriority="high"
          decoding="async"
        />
        {/* Enhanced overlay for better mobile text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70 md:from-gray-900/60 md:via-gray-800/50 md:to-gray-900/60"></div>
      </div>

      {/* Refined fencing motifs - hidden on mobile and during resize */}
      <div className={`absolute inset-0 opacity-10 hidden md:block transition-opacity duration-300 ${
        isResizing ? 'opacity-0' : 'opacity-10'
      }`}>
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse will-change-transform-opacity"></div>
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse will-change-transform-opacity"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse will-change-transform-opacity"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 md:space-y-12">
        {/* Main heading - mobile responsive with performance optimization */}
        <div className="space-y-4 md:space-y-6">
          <div className="overflow-hidden">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none text-white drop-shadow-lg will-change-transform-opacity ${
              isResizing 
                ? 'transition-none' 
                : 'animate-slide-up delay-[800ms]'
            }`}>
              <span className={`block will-change-transform-opacity ${
                isResizing ? 'transition-none' : 'animate-slide-up delay-[1000ms]'
              }`}>
                PARENTS ROLE &
              </span>
              <span className={`block text-amber-400 font-normal drop-shadow-lg will-change-transform-opacity ${
                isResizing ? 'transition-none' : 'animate-slide-up delay-[1400ms]'
              }`}>
                SAFETY
              </span>
              <span className={`block will-change-transform-opacity ${
                isResizing ? 'transition-none' : 'animate-slide-up delay-[1800ms]'
              }`}>
                IN FENCING
              </span>
            </h1>
          </div>

          {/* Elegant centered divider - mobile responsive */}
          <div className={`flex items-center justify-center space-x-3 md:space-x-4 ${
            isResizing 
              ? 'opacity-100 transition-none' 
              : 'opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]'
          }`}>
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm will-change-transform">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        {/* Excellence tagline - mobile responsive */}
        <div className="overflow-hidden">
          <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white tracking-[0.1em] md:tracking-[0.15em] drop-shadow-md px-4 md:px-0 will-change-transform-opacity ${
            isResizing 
              ? 'opacity-100 transition-none' 
              : 'opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]'
          }`}>
            ENSURING SAFETY, RESPECT & EXCELLENCE
          </h2>
        </div>

        {/* Description - mobile responsive */}
        <div className="overflow-hidden">
          <p className={`text-base sm:text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm px-4 md:px-0 will-change-transform-opacity ${
            isResizing 
              ? 'opacity-100 transition-none' 
              : 'opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]'
          }`}>
            Learn how modern technology, strict safety gear standards, and a strong code of etiquette keep fencing one of the world's safest sports.
          </p>
        </div>

        {/* Action Buttons - mobile responsive with performance optimization */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4 md:px-0 will-change-transform-opacity ${
          isResizing 
            ? 'opacity-100 transition-none' 
            : 'animate-[fadeInUp_0.8s_ease-out_1s_forwards]'
        }`}>
          {/* Parents & Safety Button */}
          <button
            onClick={() => scrollToSection("parents-role-safety")}
            className={`group relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-base md:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden will-change-transform ${
              isResizing 
                ? 'opacity-100 transition-none' 
                : 'opacity-0 animate-[fadeInUp_0.8s_ease-out_1.2s_forwards]'
            }`}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Parents & Safety</span>
          </button>

          {/* View Safety Rules Button */}
          <button
            onClick={() => scrollToSection("safety-info")}
            className={`group relative px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-base md:text-lg w-full sm:w-auto sm:min-w-[200px] overflow-hidden will-change-transform ${
              isResizing 
                ? 'opacity-100 transition-none' 
                : 'opacity-0 animate-[fadeInUp_0.8s_ease-out_1.4s_forwards]'
            }`}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10">View Safety Rules</span>
          </button>
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



/* ==================== INFORMATION SECTION ==================== */
function ParentsSafetyInfo() {
  const safetyData = [
    {
      title: "EQUIPMENT & GEAR SAFETY",
      description: "Professional-grade protection meeting international standards for complete safety assurance.",
      icon: "/safety/icons/EquipmentSafety.png",
      details: [
        { item: "FIE-Approved Safety Masks", description: "Tested steel mesh construction" },
        { item: "Kevlar Protective Jackets", description: "Puncture-resistant armor" },
        { item: "Blunted Training Weapons", description: "Flexible blades with rounded tips" },
        { item: "Daily Equipment Inspections", description: "Regular safety checks" },
      ],
    },
    {
      title: "FACILITY DESIGN",
      description: "Purpose-built environment engineered for injury prevention and optimal safety conditions.",
      icon: "/safety/icons/FacilitySafety.png",
      details: [
        { item: "Specialized Wooden Flooring", description: "Shock-absorbing surface" },
        { item: "Designated Safe Zones", description: "Clear boundary separations" },
        { item: "Parent Observation Area", description: "Comfortable viewing space" },
        { item: "Emergency Protocols", description: "First aid stations ready" },
      ],
    },
    {
      title: "TRAINING PROTOCOLS",
      description: "Progressive skill development with mandatory safety procedures and age-appropriate techniques.",
      icon: "/safety/icons/TrainingProtocols.png",
      details: [
        { item: "Mandatory Warm-up Sessions", description: "Injury prevention routines" },
        { item: "Weapon Handling Rules", description: "Point-down carry protocols" },
        { item: "Progressive Skill Building", description: "Age-appropriate techniques" },
        { item: "Small Class Ratios", description: "Maximum supervision" },
      ],
    },
    {
      title: "CODE OF CONDUCT",
      description: "Respect, sportsmanship, and traditional fencing etiquette creating a positive learning environment.",
      icon: "/safety/icons/CodeOfConduct.png",
      details: [
        { item: "Traditional Fencing Etiquette", description: "Salutes and respectful behavior" },
        { item: "Zero Tolerance Policy", description: "No rough play or disrespect" },
        { item: "Positive Reinforcement", description: "Confidence building approach" },
        { item: "Clear Communication", description: "Open parent dialogue" },
      ],
    },
  ];

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
            Creating a <span className="font-semibold text-amber-600">Safe</span> Environment
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3 md:mb-4 px-4">
            While fencing is statistically one of the safest sports, we go beyond industry standards to ensure complete protection
          </p>

          {/* Safety commitment info - mobile responsive */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-4 mb-6 md:mb-8 mx-4 md:mx-auto">
            <p className="text-gray-700 text-sm md:text-base mb-1 md:mb-2">
              <strong>Zero tolerance for unsafe practices</strong> - We anticipate potential hazards and eliminate them before they become issues.
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              Every decision prioritizes your child's wellbeing while fostering their love for fencing.
            </p>
          </div>
        </div>

        {/* Safety Categories - responsive grid */}
        <div className="mb-10 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-3 md:mb-4 text-center px-2">
            Our <span className="font-semibold text-amber-600">Safety</span> Standards
          </h3>
          <p className="text-center text-gray-600 mb-2 text-base md:text-lg px-4">
            Hover over each category to see detailed safety measures
          </p>
          <p className="text-center text-amber-600 mb-8 md:mb-12 text-sm md:text-base font-medium px-4">
            Comprehensive protection at every level
          </p>

          {/* Safety cards grid - mobile responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0">
            {safetyData.map((safety, index) => (
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
                      <svg className="w-6 h-6 md:w-10 md:h-10 text-amber-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
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
                    {safety.details.map((detail, detailIndex) => (
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
        <div className="text-center px-4 md:px-0">
          <div className="inline-flex items-center justify-center mb-3 md:mb-4">
            <div className="w-6 md:w-8 h-px bg-amber-300"></div>
            <div className="mx-2 md:mx-3 w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-6 md:w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-4 md:p-6">
            <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
              <span className="text-amber-700 font-semibold">
                Our Safety Commitment:
              </span>{" "}
              We believe that when safety concerns are eliminated, children can focus entirely on the joy, artistry, and personal growth that fencing provides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


function ParentsRoleInSafety() {
  const parentsRoleData = [
    {
      title: "SUPPORT & ENCOURAGEMENT",
      description: "The foundation of athletic success begins with unwavering parental support and positive reinforcement.",
      icon: "/safety/icons/ParentSupport.png",
      details: [
        { item: "Celebrate Small Victories", description: "Acknowledge progress and effort" },
        { item: "Active Listening", description: "Hear their concerns and dreams" },
        { item: "Positive Communication", description: "Encourage through challenges" },
        { item: "Trust the Process", description: "Support long-term development" },
      ],
    },
    {
      title: "COACH-PARENT PARTNERSHIP",
      description: "The extraordinary tandem of coach and parent creates the optimal environment for athletic and personal growth.",
      icon: "/safety/icons/Partnership.png",
      details: [
        { item: "Open Communication", description: "Regular dialogue with coaches" },
        { item: "Aligned Goals", description: "Shared vision for development" },
        { item: "Respect Expertise", description: "Trust coaching decisions" },
        { item: "Team Philosophy", description: "Support TFA's approach" },
      ],
    },
    {
      title: "EMOTIONAL GUIDANCE",
      description: "Help children navigate victories and defeats while building resilience and character through sport.",
      icon: "/safety/icons/EmotionalGuidance.png",
      details: [
        { item: "Graceful Winning", description: "Celebrate with humility" },
        { item: "Dignified Losing", description: "Learn from setbacks" },
        { item: "Emotional Support", description: "Be present in ups and downs" },
        { item: "Character Building", description: "Develop life values" },
      ],
    },
    {
      title: "COMPETITIVE FENCER RESOURCES",
      description: "Essential information and guidance for parents new to competitive fencing environments.",
      icon: "/safety/icons/CompetitiveResources.png",
      details: [
        { item: "Tournament Preparation", description: "What to expect at competitions" },
        { item: "Equipment Requirements", description: "Competitive gear standards" },
        { item: "Travel Guidelines", description: "Competition logistics" },
        { item: "Parent Resources", description: "Downloadable information packet" },
      ],
    },
  ];

  // Function to handle resource download
  const handleResourceClick = () => {
    window.open("/parentsComponent/Documents/TFA-New-Competitive-Fencer-Info_Oct.pdf", "_blank");
  };

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
            The Parent's <span className="font-semibold text-amber-600">Role</span> in Safety
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3 md:mb-4">
            Creating champions through the invaluable partnership of coach, parent, and athlete
          </p>

          {/* Ray Parker Quote */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-6 mb-4 md:mb-8">
            <blockquote className="text-gray-700 text-xs md:text-base mb-2 md:mb-3 italic leading-relaxed">
              "Not all athletes will become Olympic champions, but everyone who has a desire, a great coach and parental support can learn to overcome self doubts, respect others' achievements, and feel sparks of happiness and accomplishment."
            </blockquote>
            <p className="text-amber-700 font-semibold text-xs md:text-sm">
              - Ray Parker, TFA Coach
            </p>
          </div>
        </div>

        {/* Parents Role - Fixed desktop layout */}
        <div className="mb-8 md:mb-16">
          <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-2 md:mb-4 text-center">
            Building <span className="font-semibold text-amber-600">Champions</span> Together
          </h3>
          <p className="text-center text-gray-600 mb-1 md:mb-2 text-sm md:text-lg">
            The extraordinary importance of the coach-parent tandem
          </p>
          <p className="text-center text-amber-600 mb-6 md:mb-12 text-xs md:text-base font-medium">
            Four pillars of parental involvement in athletic development
          </p>

          {/* Layout Container */}
          <div className="relative">
            {/* Desktop timeline - restored */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-amber-400 to-amber-300 transform -translate-x-px hidden lg:block"></div>

            {parentsRoleData.map((role, index) => (
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
                } ${index === 3 ? 'cursor-pointer' : ''}`}
                onClick={index === 3 ? handleResourceClick : undefined}
                >
                  {/* Desktop: Proper hover accent line */}
                  <div className={`absolute top-0 h-0.5 md:h-1 bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500 rounded-t-lg md:rounded-t-2xl opacity-0 group-hover:opacity-100 ${
                    index % 2 === 0 ? 'left-0 w-0 group-hover:w-full' : 'lg:right-0 lg:left-auto left-0 lg:w-0 lg:group-hover:w-full w-0 group-hover:w-full'
                  }`}></div>

                  {/* Click indicator for resource */}
                  {index === 3 && (
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
                        <svg className="w-5 h-5 md:w-8 md:h-8 text-amber-600 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
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
                    {role.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="group/detail flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-md md:rounded-lg bg-amber-50/70 border border-amber-100/50 hover:bg-amber-50 hover:border-amber-200/50 transition-all duration-300 transform hover:scale-102 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                        style={{ animationDelay: `${(index * 0.2) + (detailIndex * 0.1) + 0.3}s` }}
                      >
                        <div className="flex-shrink-0 w-4 h-4 md:w-6 md:h-6 bg-amber-200 rounded-full flex items-center justify-center text-xs font-medium text-amber-800 group-hover/detail:bg-amber-300 transition-colors duration-300">
                          {index === 3 ? "📄" : "💡"}
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
                      {index === 3 ? (
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
<div className="mb-8 md:mb-16">
  <h3 className="text-xl md:text-3xl font-light text-gray-800 mb-4 md:mb-8 text-center">
    Parents & <span className="font-semibold text-amber-600">Athletes</span> Together
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
    {[
      "/parentsComponent/Gallery/GalleryImg1.jpeg",
      "/parentsComponent/Gallery/GalleryImg2.jpeg",
      "/parentsComponent/Gallery/GalleryImg3.jpg",
      "/parentsComponent/Gallery/GalleryImg4.jpg",
      "/parentsComponent/Gallery/GalleryImg5.jpeg",
      "/parentsComponent/Gallery/GalleryImg6.jpeg",
      "/parentsComponent/Gallery/GalleryImg7.jpeg",
      "/parentsComponent/Gallery/GalleryImg8.jpg"
    ].map((image, index) => (
      <div
        key={index}
        className="relative group overflow-hidden rounded-md md:rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <img
          src={image}
          alt={`TFA Community ${index + 1}`}
          className="w-full h-24 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
</div>


        {/* Philosophy statement */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-3 md:mb-4">
            <div className="w-4 md:w-8 h-px bg-amber-300"></div>
            <div className="mx-2 md:mx-3 w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-4 md:w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-3 md:p-6">
            <p className="text-gray-700 font-medium text-xs md:text-base leading-relaxed">
              <span className="text-amber-700 font-semibold">
                TFA Philosophy:
              </span>{" "}
              We are convinced that the alliance between coach and parent will lead our athletes to the highest levels of success – emotionally, physically and psychologically – creating maximum enjoyment of the sport and life. Through sports, we help children overcome self-doubts, respect others' achievements, and develop the foundation for lifelong success and self-realization.
            </p>
          </div>
        </div>
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
