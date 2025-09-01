import { useState, useEffect} from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";

function HomeschoolPEHeroSection() {
  // --vh fallback for browsers without dvh
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("orientationchange", setVh, { passive: true });
    window.addEventListener("resize", setVh, { passive: true });
    return () => {
      window.removeEventListener("orientationchange", setVh);
      window.removeEventListener("resize", setVh);
    };
  }, []);

  const desktopImg = "/homeschoolPe/homeschoolbg.png";
  const mobileImg = "/homeschoolPe/homeschoolbg.png";

  return (
    <section
      className="
        relative
        min-h-[100dvh]
        sm:min-h-[calc(var(--vh,1vh)*100)]
        flex items-center justify-center overflow-hidden
        px-4 sm:px-6
      "
    >
      {/* BG Image & Overlay */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width:639px)" srcSet={mobileImg} />
          <img
            src={desktopImg}
            alt="Homeschool fencing training Texas Fencing Academy"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/85 via-primary-800/70 to-amber-50/10" />
      </div>

      {/* Fencing Motifs (reduced motion on phones) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-28 sm:top-32 left-1/5 sm:left-1/4 w-px h-32 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12 motion-safe:animate-pulse"></div>
        <div className="absolute bottom-28 sm:bottom-32 right-1/5 sm:right-1/4 w-px h-32 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12 motion-safe:animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-28 sm:h-32 bg-gradient-to-b from-amber-400 to-transparent rotate-45 motion-safe:animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 py-16 sm:py-20">
        {/* Heading */}
        <div className="space-y-5 sm:space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg">
              <span className="block opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_0.4s_forwards]">
                HOMESCHOOL PE IN
              </span>
              <span className="block text-amber-400 font-normal drop-shadow-lg opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_0.7s_forwards]">
                AUSTIN
              </span>
              <span className="block font-normal opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_1s_forwards] text-base sm:text-lg tracking-[0.08em] sm:tracking-[0.13em]">
                EARN CREDIT THROUGH FENCING
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 opacity-0 motion-safe:animate-[fadeIn_0.7s_ease-out_1.3s_forwards]">
            <div className="w-14 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400 rounded-full motion-safe:animate-pulse" />
            </div>
            <div className="w-14 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        <div className="overflow-hidden">
          <h2 className="text-lg sm:text-2xl lg:text-3xl font-light text-white tracking-[0.06em] sm:tracking-[0.13em] drop-shadow-md opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_1.6s_forwards]">
            Accredited Off-Campus PE & Flexible Schedules – Ages 6–18
          </h2>
        </div>

        <div className="overflow-hidden">
          <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-light max-w-2xl sm:max-w-2xl mx-auto opacity-0 motion-safe:animate-[fadeIn_0.7s_ease-out_2s_forwards]">
            Accredited for homeschool families. Safe, structured fencing instruction. All equipment provided.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_2.3s_forwards]">
          <a
            href="tel:512-555-0123"
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10">Book a Free Trial Class</span>
          </a>
          <a
            href="#info"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#info");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-[1.03] hover:shadow-lg backdrop-blur-sm transition-all duration-300 text-base sm:text-lg min-w-[200px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Learn More</span>
          </a>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-20px) } 100% { opacity: 1; transform: translateY(0) } }
        @keyframes fadeIn { 0% { opacity: 0 } 100% { opacity: 1 } }
        @keyframes slideUp { 0% { opacity: 0; transform: translateY(24px) } 100% { opacity: 1; transform: translateY(0) } }
      `}</style>
    </section>
  );
}

function HomeschoolPEInfoSection() {
  // Responsive viewport height fallback for older browsers
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("orientationchange", setVh, { passive: true });
    window.addEventListener("resize", setVh, { passive: true });
    return () => {
      window.removeEventListener("orientationchange", setVh);
      window.removeEventListener("resize", setVh);
    };
  }, []);

  // Simple array; no useMemo needed
  const slides = [
    { src: "/homeschoolPe/homeschoolpractice1.jpg", alt: "Homeschool students training in fencing 1" },
    { src: "/homeschoolPe/homeschoolpractice2.jpg", alt: "Homeschool students training in fencing 2" },
    // { src: "/homeschoolPe/homeschoolpractice3.jpg", alt: "..." },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <section
      id="info"
      className="
        relative
        py-16 sm:py-20 lg:py-24
        bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300
        overflow-hidden
      "
    >
      {/* Background effects (reduced motion on mobile) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-6 sm:left-20 w-56 sm:w-72 h-56 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full motion-safe:animate-pulse" />
        <div className="absolute bottom-20 right-6 sm:right-20 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full motion-safe:animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute inset-0 opacity-10 hidden sm:block">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent motion-safe:animate-[shimmer_3s_ease-in-out_infinite]" />
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent motion-safe:animate-[shimmer_3s_ease-in-out_infinite_1.5s]" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 group">
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-500 rounded-full motion-safe:animate-pulse"></div>
              <div className="absolute inset-0 w-full h-full border-2 border-amber-300/30 rounded-full motion-safe:animate-[spin_20s_linear_infinite]" />
            </div>
            <div className="w-12 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 mb-3 sm:mb-4 tracking-tight">
            Why Choose <span className="font-semibold text-amber-600">Homeschool PE</span> at TFA?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Earn official PE credit while developing discipline, fitness, and character through the elegant art of fencing.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Left: Benefits */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl sm:text-2xl font-semibold text-amber-700 mb-4 sm:mb-6 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2.5 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Officially Accredited Program
              </h3>
              <ul className="space-y-2.5 sm:space-y-3 text-gray-700">
                {[
                  "Accepted by Austin-area ISDs and homeschool networks",
                  "Official documentation provided for transcript records",
                  "Meets Texas homeschool PE requirements",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mr-2.5 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Flexible Scheduling Options
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="bg-amber-50 rounded-lg p-3.5 sm:p-4 text-center border border-amber-100">
                  <div className="font-semibold text-amber-700 text-sm">Morning Sessions</div>
                  <div className="text-gray-600 text-xs">9:00 AM - 12:00 PM</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3.5 sm:p-4 text-center border border-amber-100">
                  <div className="font-semibold text-amber-700 text-sm">Afternoon Sessions</div>
                  <div className="text-gray-600 text-xs">1:00 PM - 4:00 PM</div>
                </div>
              </div>
              <p className="text-gray-600 text-center text-sm">Weekly or semester enrollment available</p>
            </div>
          </div>

          {/* Right: Slideshow */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl group"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="relative w-full h-72 sm:h-80 lg:h-96">
                {slides.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 will-change-transform
                      ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 to-transparent pointer-events-none group-hover:from-amber-400/20 transition-all duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <div className="text-base sm:text-lg font-bold text-gray-800">Ages 6-18</div>
                  <div className="text-[11px] sm:text-xs text-gray-600 font-medium">All Skill Levels</div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-sm rounded-lg p-3 shadow-lg text-white">
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-bold">Equipment Provided</div>
                  <div className="text-[11px] sm:text-xs font-medium">No Additional Costs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16 lg:mb-20">
          <h3 className="text-2xl sm:text-3xl font-light text-gray-800 text-center mb-8 sm:mb-12">
            Why <span className="font-semibold text-amber-600">Fencing</span> for Homeschool PE?
          </h3>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                title: "Physical & Mental Development",
                description: "Cardio fitness meets strategic thinking and fast decision-making.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                ),
                title: "Character & Discipline",
                description: "Respect, sportsmanship, and confidence from Olympic sport training.",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                ),
                title: "Expert Instruction",
                description: "Certified coaches with national/Olympic experience in small groups.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-7 text-center hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Areas & Program Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-14 lg:mb-16">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6 text-center">
              Serving Families Across
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Austin", "Round Rock", "Pflugerville", "Cedar Park", "Leander", "Georgetown"].map((city) => (
                <div
                  key={city}
                  className="bg-amber-50 rounded-lg p-3 text-center border border-amber-200/50"
                >
                  <span className="font-medium text-amber-700 text-sm">{city}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-amber-700 mb-5 sm:mb-6 text-center">
              Program Essentials
            </h3>
            <div className="space-y-3.5 sm:space-y-4">
              {[
                { label: "Age Range", value: "6-18 years" },
                { label: "Class Size", value: "Small Groups" },
                { label: "Equipment", value: "All Provided" },
                { label: "Enrollment", value: "Flexible Options" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-amber-200/50">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="text-amber-600 font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light text-gray-800 mb-5 sm:mb-6">
            Ready to <span className="font-semibold text-amber-600">Begin</span> Your PE Journey?
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Provide your homeschooler with accredited PE credit, expert instruction, and character development in one comprehensive program.
          </p>
          <a
            href="tel:512-555-0123"
            className="group relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-base sm:text-lg overflow-hidden inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">Schedule Your Free Trial Class</span>
          </a>
        </div>
      </div>

      {/* Keyframes (scoped) */}
      <style>{`
        @keyframes shimmer { 0%, 100% { opacity: 0.1 } 50% { opacity: 0.3 } }
        @keyframes float { 0%, 100% { transform: translateY(0px) } 50% { transform: translateY(-8px) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </section>
  );
}

export default function HomeschoolPELandingPage() {
  return (
    <main className="bg-gradient-to-br from-amber-50 via-white to-primary-100">
        <InfoBanner />
        <Navbar />
      <HomeschoolPEHeroSection />
      <HomeschoolPEInfoSection />
    </main>
  );
}
