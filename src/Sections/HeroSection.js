// sections/HeroSection.js
// sections/HeroSection.js - Modern minimalist hero
// import { useEffect, useState } from 'react';

// export default function HeroSection() {
//   const [isResizing, setIsResizing] = useState(false);

//   useEffect(() => {
//     let resizeTimer;
//     function handleResize() {
//       setIsResizing(true);
//       clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(() => {
//         setIsResizing(false);
//       }, 300);
//     }
    
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <section 
//       className={`relative min-h-screen flex items-center bg-primary-900 overflow-hidden contain-layout-paint ${
//         isResizing ? 'no-animations' : ''
//       }`}
//     >
//       <div className="absolute inset-0">
//         <img
//           src="/images/TFAcademyEnhanced.jpeg"
//           alt="Texas Fencing Academy"
//           className="w-full h-full object-cover animate-fade-in will-change-transform-opacity"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/50 to-primary-900/70"></div>

//         {/* Enhanced geometric patterns */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full animate-pulse-slow delay-1000 will-change-transform-opacity"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-accent-400/20 rounded-full animate-pulse-slow delay-1500 will-change-transform-opacity"></div>
//         </div>

//         {/* Subtle blade motifs */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-20 left-20 w-px h-32 bg-gradient-to-b from-accent-300 to-transparent transform rotate-12 animate-fade-in delay-[4000ms] will-change-transform-opacity"></div>
//           <div className="absolute bottom-20 right-20 w-px h-32 bg-gradient-to-b from-accent-300 to-transparent transform -rotate-12 animate-fade-in delay-[4500ms] will-change-transform-opacity"></div>
//         </div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
//         <div className="text-white space-y-12">
//           {/* Animated main heading */}
//           <div className="space-y-8">
//             <div className="overflow-hidden">
//               <h1 className="text-hero font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity">
//                 <span className="inline-block animate-slide-up delay-[1200ms] will-change-transform-opacity">
//                   TEXAS
//                 </span>
//                 <span className="block text-accent-400 font-normal animate-slide-up delay-[1800ms] will-change-transform-opacity">
//                   FENCING
//                 </span>
//                 <span className="inline-block animate-slide-up delay-[2400ms] will-change-transform-opacity">
//                   ACADEMY
//                 </span>
//               </h1>
//             </div>

//             {/* Elegant animated divider */}
//             <div className="flex items-center justify-center space-x-4 animate-fade-in delay-[2800ms] will-change-transform-opacity">
//               <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent-400 animate-slide-right delay-[3000ms] will-change-transform-opacity"></div>
//               <div className="w-8 h-8 border border-accent-400/50 rotate-45 flex items-center justify-center animate-fade-in delay-[3200ms] hover:scale-110 transition-transform duration-500 will-change-transform-opacity">
//                 <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse delay-[3400ms] will-change-transform-opacity"></div>
//               </div>
//               <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent-400 animate-slide-left delay-[3000ms] will-change-transform-opacity"></div>
//             </div>
//           </div>

//           {/* Animated tagline and description */}
//           <div className="space-y-8">
//             <div className="overflow-hidden">
//               <h2 className="text-2xl lg:text-3xl font-light text-primary-200 tracking-[0.2em] animate-slide-up delay-[3600ms] will-change-transform-opacity">
//                 WHERE PRECISION MEETS PASSION
//               </h2>
//             </div>

//             <div className="overflow-hidden">
//               <p className="text-lg lg:text-xl text-primary-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in delay-[4000ms] will-change-transform-opacity">
//                 Master the art of fencing through disciplined training, expert
//                 instruction, and unwavering dedication to excellence in our
//                 state-of-the-art facility.
//               </p>
//             </div>
//           </div>

//           {/* Animated call-to-action buttons */}
//           <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
//             <div className="animate-slide-up delay-[4400ms] will-change-transform-opacity">
//               <a
//                 href="https://texasfencingacademy.org/?page_id=881"
//                 className="
//                   group relative inline-block px-12 py-4 
//                   bg-gradient-to-r from-accent-500 to-accent-600 
//                   text-primary-900 font-semibold text-lg 
//                   rounded-lg shadow-md
//                   overflow-hidden 
//                   transition 
//                   duration-500 ease-in-out
//                   hover:shadow-glow hover:scale-105 hover:brightness-110
//                   focus:outline-none focus:ring-4 focus:ring-accent-400/70
//                   will-change-transform
//                 "
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 <span className="relative z-10 flex items-center justify-center">
//                   EXPLORE PROGRAMS
//                   <svg
//                     className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </a>
//             </div>

//             <div className="animate-slide-up delay-[4600ms] will-change-transform-opacity">
//               <button
//                 className="
//                   group px-12 py-4 border-2 border-white/30 
//                   text-white font-semibold text-lg 
//                   rounded-lg backdrop-blur-sm 
//                   shadow-sm 
//                   transition 
//                   duration-500 ease-in-out
//                   hover:bg-white/20 hover:border-white hover:scale-105 hover:brightness-110
//                   focus:outline-none focus:ring-4 focus:ring-white/40
//                   will-change-transform
//                 "
//               >
//                 <span className="flex items-center justify-center">
//                   BEGIN YOUR JOURNEY
//                   <svg
//                     className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform duration-500"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { useEffect, useState } from 'react';

export default function HeroSection() {
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
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll to registration section
  const scrollToRegistration = () => {
    const registrationSection = document.querySelector('#registration-section');
    if (registrationSection) {
      registrationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className={`relative min-h-screen flex items-center bg-primary-900 overflow-hidden contain-layout-paint ${
        isResizing ? 'no-animations' : ''
      }`}
    >
      <div className="absolute inset-0">
        <img
          src="/images/TFAcademyEnhanced.jpeg"
          alt="Texas Fencing Academy"
          className="w-full h-full object-cover animate-fade-in will-change-transform-opacity"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/70 via-primary-900/50 to-primary-900/70"></div>

        {/* Enhanced geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/20 rounded-full animate-pulse-slow delay-1000 will-change-transform-opacity"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-accent-400/20 rounded-full animate-pulse-slow delay-1500 will-change-transform-opacity"></div>
        </div>

        {/* Subtle blade motifs */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-px h-32 bg-gradient-to-b from-accent-300 to-transparent transform rotate-12 animate-fade-in delay-[4000ms] will-change-transform-opacity"></div>
          <div className="absolute bottom-20 right-20 w-px h-32 bg-gradient-to-b from-accent-300 to-transparent transform -rotate-12 animate-fade-in delay-[4500ms] will-change-transform-opacity"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="text-white space-y-12">
          {/* Animated main heading */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h1 className="text-hero font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity">
                <span className="inline-block animate-slide-up delay-[1200ms] will-change-transform-opacity">
                  TEXAS
                </span>
                <span className="block text-accent-400 font-normal animate-slide-up delay-[1800ms] will-change-transform-opacity">
                  FENCING
                </span>
                <span className="inline-block animate-slide-up delay-[2400ms] will-change-transform-opacity">
                  ACADEMY
                </span>
              </h1>
            </div>

            {/* Elegant animated divider */}
            <div className="flex items-center justify-center space-x-4 animate-fade-in delay-[2800ms] will-change-transform-opacity">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent-400 animate-slide-right delay-[3000ms] will-change-transform-opacity"></div>
              <div className="w-8 h-8 border border-accent-400/50 rotate-45 flex items-center justify-center animate-fade-in delay-[3200ms] hover:scale-110 transition-transform duration-500 will-change-transform-opacity">
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse delay-[3400ms] will-change-transform-opacity"></div>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent-400 animate-slide-left delay-[3000ms] will-change-transform-opacity"></div>
            </div>
          </div>

          {/* Animated tagline and description */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h2 className="text-2xl lg:text-3xl font-light text-primary-200 tracking-[0.2em] animate-slide-up delay-[3600ms] will-change-transform-opacity">
                WHERE PRECISION MEETS PASSION
              </h2>
            </div>

            <div className="overflow-hidden">
              <p className="text-lg lg:text-xl text-primary-300 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in delay-[4000ms] will-change-transform-opacity">
                Master the art of fencing through disciplined training, expert
                instruction, and unwavering dedication to excellence in our
                state-of-the-art facility.
              </p>
            </div>
          </div>

          {/* Animated call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <div className="animate-slide-up delay-[4400ms] will-change-transform-opacity">
              <a
                href="https://texasfencingacademy.org/?page_id=881"
                className="
                  group relative inline-block px-12 py-4 
                  bg-gradient-to-r from-accent-500 to-accent-600 
                  text-primary-900 font-semibold text-lg 
                  rounded-lg shadow-md
                  overflow-hidden 
                  transition 
                  duration-500 ease-in-out
                  hover:shadow-glow hover:scale-105 hover:brightness-110
                  focus:outline-none focus:ring-4 focus:ring-accent-400/70
                  will-change-transform
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-400 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center justify-center">
                  EXPLORE PROGRAMS
                  <svg
                    className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </div>

            <div className="animate-slide-up delay-[4600ms] will-change-transform-opacity">
              <button
                onClick={scrollToRegistration}
                className="
                  group px-12 py-4 border-2 border-white/30 
                  text-white font-semibold text-lg 
                  rounded-lg backdrop-blur-sm 
                  shadow-sm 
                  transition 
                  duration-500 ease-in-out
                  hover:bg-white/20 hover:border-white hover:scale-105 hover:brightness-110
                  focus:outline-none focus:ring-4 focus:ring-white/40
                  will-change-transform
                "
              >
                <span className="flex items-center justify-center">
                  BEGIN YOUR JOURNEY
                  {/* Fencing PNG image */}
                  <img
                    src="/sword.png"
                    alt="Fencing icon"
                    className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform duration-500 filter brightness-0 invert"
                    fetchPriority="low"
                    decoding="async"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
