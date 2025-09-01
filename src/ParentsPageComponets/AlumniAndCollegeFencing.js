import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../HomePageComponent/Navbar';
import InfoBanner from '../HomePageComponent/InfoBanner';

function TexasFencingAcademySection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Unobserve once triggered to prevent repeated state changes on mobile
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="academy-section"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Enhanced background patterns (softened on mobile) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-14 sm:top-20 left-6 sm:left-20 w-56 sm:w-72 h-56 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-14 sm:bottom-20 right-6 sm:right-20 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/30 to-transparent"></div>
          <div className="hidden sm:block absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        {/* Subtle decorative elements */}
        <div className="absolute top-1/2 left-6 sm:left-10 w-0.5 h-16 sm:h-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent -rotate-12"></div>
        <div className="absolute top-1/4 right-6 sm:right-10 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 group transition-all duration-700 motion-safe:duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-14 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-16 sm:group-hover:w-24"></div>
            <div className="w-12 sm:w-14 h-12 sm:h-14 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-xl bg-gray-200/80 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full motion-safe:animate-pulse group-hover:bg-amber-600"></div>
              <div className="absolute inset-0 rounded-full border border-slate-900/10 group-hover:border-slate-900/20 transition-all duration-500"></div>
            </div>
            <div className="w-14 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-16 sm:group-hover:w-24"></div>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight transition-all duration-700 motion-safe:duration-1000 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Texas{" "}
            <span className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300">
              Fencing Academy
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-900/70 max-w-3xl mx-auto leading-relaxed transition-all duration-700 motion-safe:duration-1000 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Excellence in fencing education, training champions for over three decades with a commitment to developing both athletic prowess and character.
          </p>
        </div>

        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-14 lg:mb-20">
          {/* Content */}
          <div
            className={`space-y-5 sm:space-y-8 transition-all duration-700 motion-safe:duration-1000 delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-light text-slate-900">
                Building Champions Since{" "}
                <span className="font-semibold text-amber-600">1990</span>
              </h3>
              <p className="text-base sm:text-lg text-slate-900/80 leading-relaxed">
                Texas Fencing Academy has been shaping the landscape of competitive fencing for over 30 years. What began as a small club has evolved into one of the premier fencing institutions in the region, consistently producing athletes who compete at the highest collegiate levels.
              </p>

              <div className="bg-gradient-to-r from-amber-50/80 to-amber-100/60 border-2 border-amber-200/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-amber-300/60 transition-all duration-500 group">
                <h4 className="text-lg sm:text-xl font-semibold text-amber-700 mb-4 sm:mb-6 flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-900/10 rounded-full flex items-center justify-center mr-2.5 sm:mr-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  </div>
                  Our Legacy of Excellence:
                </h4>
                <ul className="space-y-3.5 sm:space-y-4 text-slate-900/80">
                  {[
                    "Over three decades of championship-level training",
                    "Multiple All-American athletes developed",
                    "NCAA competitors across premier universities",
                    "Comprehensive programs for all skill levels",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3.5 sm:gap-4">
                      <div className="w-2.5 h-2.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative transition-all duration-700 motion-safe:duration-1000 delay-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="/parentsComponent/Gallery/tfacademy.jpg"
                alt="Texas Fencing Academy training"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/30 via-transparent to-slate-900/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/5 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Badge */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-xl opacity-90 transition-all duration-500 border border-slate-900/10">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-0.5 sm:mb-1">30+</div>
                  <div className="text-[11px] sm:text-xs text-slate-900/70 font-medium tracking-wide">
                    Years of Excellence
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-tr from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Philosophy & Approach */}
        <div
          className={`text-center bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 rounded-3xl p-10 sm:p-16 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-700 motion-safe:duration-1000 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
              <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-amber-500 rounded-full shadow-sm"></div>
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-light text-slate-900 mb-6 sm:mb-8">
              Where Tradition Meets{" "}
              <span className="font-semibold text-amber-600">Innovation</span>
            </h3>
            <p className="text-base sm:text-xl text-slate-900/80 leading-relaxed">
              We've watched countless faces come and go over the years, each leaving their mark on our legacy. Our pride lies not just in the prestigious universities our members attend, but in the character, discipline, and excellence they carry with them long after they leave our academy.
            </p>

            <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-900/5 border border-slate-900/15 rounded-full">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-900/70">
                FORGING CHAMPIONS SINCE 1990
              </span>
              <div className="w-6 h-px bg-slate-900/40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function CollegeFencingExcellenceSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Unobserve once to avoid repeated state churn on mobile
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const allAmericans = [
    { name: "Melissa Parker", school: "Temple University", achievement: "3x All American" },
    { name: "Jonathon Parker", school: "Duke", achievement: "All American" },
    { name: "Allegra Parker", school: "University of North Carolina", achievement: "All American" }
  ];

  const collegiateAthletes = [
    { name: "Tim French", school: "Air Force Academy" },
    { name: "Peter French", school: "Air Force Academy" },
    { name: "Noah Zucker", school: "Columbia" },
    { name: "Sasha Zucker", school: "Stanford" },
    { name: "Riley Parker", school: "Stevens Institute of Technology" },
    { name: "Olymp", school: "Tufts" },
    { name: "Alumni", school: "Wesleyan College" },
    { name: "Ethan Dubois", school: "Austin College" },
    { name: "Kevin Nadeau", school: "University of North Carolina" },
    { name: "Katie Williamson", school: "University of North Carolina" },
    { name: "Marcus Chen", school: "MIT" },
    { name: "Sarah Johnson", school: "Harvard" }
  ];

const initials = (full) => {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase(); 
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

  return (
    <section
      id="college-excellence"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Background elements (softened on mobile) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-14 sm:top-20 left-6 sm:left-20 w-56 sm:w-72 h-56 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-14 sm:bottom-20 right-6 sm:right-20 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/30 to-transparent"></div>
          <div className="hidden sm:block absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-6 sm:left-10 w-0.5 h-16 sm:h-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent -rotate-12"></div>
        <div className="absolute top-1/4 right-6 sm:right-10 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <div
            className={`flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 group transition-all duration-700 motion-safe:duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-14 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-16 sm:group-hover:w-24"></div>
            <div className="w-12 sm:w-14 h-12 sm:h-14 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-xl bg-gray-200/80 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full motion-safe:animate-pulse group-hover:bg-amber-600"></div>
              <div className="absolute inset-0 rounded-full border border-slate-900/10 group-hover:border-slate-900/20 transition-all duration-500"></div>
            </div>
            <div className="w-14 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-16 sm:group-hover:w-24"></div>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight transition-all duration-700 motion-safe:duration-1000 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Fencing &{" "}
            <span className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300">
              College Excellence
            </span>
          </h2>
          <p
            className={`text-base sm:text-lg text-slate-900/70 max-w-3xl mx-auto leading-relaxed transition-all duration-700 motion-safe:duration-1000 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            Our legacy extends across America's most prestigious universities, where our athletes continue to excel at the highest levels of collegiate competition.
          </p>
        </div>

        {/* All-Americans showcase */}
        <div className="mb-14 sm:mb-20">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-700 motion-safe:duration-1000 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
              <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-amber-500 rounded-full shadow-sm"></div>
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 mb-3 sm:mb-4 hover:text-amber-600 transition-colors duration-300">
              All-American <span className="font-semibold text-amber-600">Champions</span>
            </h3>
            <p className="text-base sm:text-lg text-slate-900/70 max-w-2xl mx-auto">
              The pinnacle of collegiate fencing achievement
            </p>
          </div>

          {/* Mobile: avatar list */}
          <div className="md:hidden space-y-4 max-w-2xl mx-auto">
  {allAmericans.map((athlete, index) => (
    <div
      key={`aa-m-${index}`}
      className={`flex items-center gap-4 bg-white/90 border border-slate-900/10 rounded-xl p-4 shadow-sm transition-all ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ transitionDuration: "400ms", transitionDelay: `${150 + index * 50}ms` }}
    >
      <div className="relative w-12 h-12 shrink-0">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 flex items-center justify-center text-sm font-bold text-amber-700">
          {initials(athlete.name)}
        </div>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">★</span>
      </div>

      {/* Centered, constrained text block */}
      <div className="min-w-0 flex-1 flex flex-col items-center text-center">
        <div className="font-semibold text-slate-900 truncate w-full max-w-[220px]">{athlete.name}</div>
        <div className="text-amber-600 text-sm truncate w-full max-w-[220px]">{athlete.school}</div>
        <div className="text-slate-700 text-xs mt-0.5 truncate w-full max-w-[220px]">{athlete.achievement}</div>
      </div>
    </div>
  ))}
</div>


          {/* md+: original card grid */}
          <div className="hidden md:grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {allAmericans.map((athlete, index) => (
              <div
                key={`aa-${index}`}
                className={`group relative bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                onMouseEnter={() => setHoveredCard(`aa-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
                  <div className="w-8 h-px bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
                  <div className="w-8 h-px bg-amber-400"></div>
                </div>

                <div className="text-center relative">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold text-amber-700 border-2 border-amber-400/60 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg">
                      {initials(athlete.name)}
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-bold">★</span>
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-light text-slate-900 mb-2.5 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {athlete.name}
                  </h4>
                  <p className="text-amber-600 font-semibold mb-3 sm:mb-4 text-base sm:text-lg group-hover:text-amber-500 transition-colors duration-300">
                    {athlete.school}
                  </p>

                  <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-900/5 border border-slate-900/15 rounded-full">
                    <span className="text-xs sm:text-sm font-bold text-slate-900/80">
                      {athlete.achievement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collegiate Athletes */}
        <div className="mb-16 sm:mb-20">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-700 motion-safe:duration-1000 delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-14 sm:w-16 h-px bg-slate-900/30"></div>
              <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-slate-900/40 rounded-full shadow-sm"></div>
              <div className="w-14 sm:w-16 h-px bg-slate-900/30"></div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 mb-3 sm:mb-4 hover:text-amber-600 transition-colors duration-300">
              Collegiate <span className="font-semibold text-amber-600">Excellence</span>
            </h3>
            <p className="text-base sm:text-lg text-slate-900/70 max-w-2xl mx-auto">
              Competing across America's premier academic institutions
            </p>
          </div>

          {/* Mobile: avatar list */}
          <div className="md:hidden space-y-3.5 max-w-3xl mx-auto">
  {collegiateAthletes.map((athlete, index) => (
    <div
      key={`col-m-${index}`}
      className={`flex items-center gap-4 bg-white/90 border border-slate-900/10 rounded-xl p-4 shadow-sm transition-all ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{ transitionDuration: "350ms", transitionDelay: `${150 + index * 35}ms` }}
    >
      <div className="relative w-11 h-11 shrink-0">
        <div className="w-full h-full rounded-full bg-slate-900/8 border border-slate-900/15 flex items-center justify-center text-xs font-bold text-slate-900/80">
          {initials(athlete.name)}
        </div>
      </div>

      {/* Centered, constrained text block */}
      <div className="min-w-0 flex-1 flex flex-col items-center text-center">
        <div className="font-medium text-slate-900 truncate w-full max-w-[220px]">{athlete.name}</div>
        <div className="text-amber-600 text-sm truncate w-full max-w-[220px]">{athlete.school}</div>
      </div>
    </div>
  ))}
</div>


          {/* md+: original card grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
            {collegiateAthletes.map((athlete, index) => (
              <div
                key={`col-${index}`}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border-2 border-slate-900/10 hover:border-amber-400/40 hover:bg-white/95 transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer overflow-hidden ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${0.8 + index * 0.05}s` }}
                onMouseEnter={() => setHoveredCard(`athlete-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="text-center relative z-10">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3.5 sm:mb-4">
                    <div className="w-full h-full bg-slate-900/8 border-2 border-slate-900/15 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-slate-900/80 group-hover:bg-amber-50 group-hover:border-amber-400/40 group-hover:text-amber-700 transition-all duration-300 group-hover:scale-110 shadow-sm">
                      {initials(athlete.name)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"></div>
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-amber-600 transition-colors duration-300">
                    {athlete.name}
                  </h4>
                  <p className="text-amber-600 font-medium text-sm leading-relaxed group-hover:text-amber-500 transition-colors duration-300">
                    {athlete.school}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 mx-auto">
                  <div className="w-8 h-px bg-slate-900/20 mx-auto group-hover:w-12 group-hover:bg-amber-400/70 transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legacy Statement */}
        <div
          className={`text-center bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 rounded-3xl p-10 sm:p-16 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-700 motion-safe:duration-1000 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
              <div className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-amber-500 rounded-full shadow-sm"></div>
              <div className="w-14 sm:w-16 h-px bg-amber-400"></div>
            </div>
            <h3 className="text-3xl sm:text-4xl font-light text-slate-900 mb-6 sm:mb-8">
              Where Champions Are <span className="font-semibold text-amber-600">Forged</span>
            </h3>
            <p className="text-base sm:text-xl text-slate-900/80 leading-relaxed mb-8 sm:mb-10">
              Each achievement represents years of dedication, expert coaching, and the pursuit of excellence. Our athletes don't just compete—they excel, carrying forward a legacy of championship-level performance across the nation's most demanding academic and athletic environments.
            </p>

            <div className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-900/5 border border-slate-900/15 rounded-full">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-900/70">
                EXCELLENCE SINCE 1990
              </span>
              <div className="w-6 h-px bg-slate-900/40"></div>
              <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-900/70">
                CHAMPIONS CONTINUE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AcademyAndAlumniPage() {
  return (
    <>  
    <InfoBanner/>
        <Navbar />
      <TexasFencingAcademySection />
      <CollegeFencingExcellenceSection />
    </>
  );
}

export default AcademyAndAlumniPage;
