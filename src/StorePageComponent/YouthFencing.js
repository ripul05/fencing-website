import { useEffect, useState } from "react";

const youthFencingProducts = [
  {
    id: 102126264,
    title: "Youth Minnow (monthly recur)",
    price: "$95.00",
    href: "#!/Youth-Minnow-monthly-recur/p/102126264",
    image: "youthFencing/MonthlySubscription.jpg",
    description: "Introductory fencing class for ages 6-9; foundational footwork, agility, and fun.",
  },
  {
    id: 102126268,
    title: "Full Subscription (monthly recur)",
    price: "$195.00",
    href: "#!/Full-Subscription-monthly-recur/p/102126268",
    image: "youthFencing/YearlySubscription.jpg",
    description: "Comprehensive access to all group classes, open floor, and special youth sessions.",
  },
  {
    id: 237211030,
    title: "Youth Team Annual Fees (via TFA Team App)",
    price: "$0.00",
    href: "#!/Youth-Team-Annual-Fees-Individual-pay-via-TFA-Team-App/p/237211030",
    image: "youthFencing/YouthTeam.jpg",
    description: "Annual registration for youth team members (payment through TFA Team App).",
  },
];

export default function YouthFencingPage() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => { 
    setLoaded(true); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 relative overflow-x-hidden">
      {/* Decorative background orbs and fencing patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 right-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-4 left-8 w-96 h-96 bg-primary-800/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
          <div className="absolute bottom-[22%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Hero Image + Overlay */}
      <div className="relative h-80 md:h-96 flex justify-center items-end overflow-hidden">
        <img
          src="youthFencing/YouthFencingBg1.jpg"
          alt="Youth Fencing at Texas Fencing Academy"
          className="w-full h-full object-cover object-bottom opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/50 to-primary-900/80" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center z-10 mb-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extralight text-white drop-shadow-lg">Youth Fencing</h1>
          <span className="mt-2 block text-accent-400 text-lg font-bold tracking-wider drop-shadow-md">
            Where Future Champions Begin
          </span>
        </div>
      </div>

      {/* Youth Fencing Info + Call to Action */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Info */}
        <div className="space-y-7">
          <h2 className="text-3xl font-semibold text-accent-400 leading-tight drop-shadow-sm animate-slide-up">
            Excellence on the Piste, Character for Life
          </h2>
          <p className="text-primary-100 text-lg font-light leading-relaxed animate-fade-in delay-200">
            Experience <span className="text-accent-400 font-semibold">world-class fencing instruction</span> for youth ages 6-17. Our Youth Fencing programs nurture discipline, focus, and sportsmanship—whether your child dreams of glory or seeks a healthy, fun community. From beginners to tournament hopefuls, every student finds their place and pace, with expert coaches guiding the journey.
          </p>
          <ul className="list-disc pl-5 text-primary-200 space-y-1 animate-fade-in delay-400">
            <li>Safe equipment and empowering atmosphere</li>
            <li>Progressive curriculum—from footwork basics to advanced tactics</li>
            <li>Teamwork, fair play, and lifelong friendships</li>
          </ul>
          <a
            href="https://texasfencingacademy.org/?page_id=881"
            className="inline-block mt-5 bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-bold rounded-full px-8 py-3 shadow-glow hover:scale-105 hover:brightness-110 transition-all animate-slide-up delay-500"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Join Our Youth Program
          </a>
        </div>
        {/* Action fencing image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in delay-300">
          <img
            src="youthFencing/YouthFencers.jpg"
            alt="Youth fencers in action"
            className="w-full h-72 md:h-80 object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-accent-400/10 to-primary-900/10 pointer-events-none" />
        </div>
      </div>

      {/* Product Grid (Animated) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12">
        <h3 className="text-xl font-semibold text-white mb-6 tracking-wider">Youth Program Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
          {youthFencingProducts.map((p, i) => (
            <a
              key={p.id}
              href={p.href}
              className={`
                group bg-gradient-to-br from-primary-800 to-primary-900 border border-accent-400/10 
                shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500
                hover:border-accent-400 hover:shadow-2xl hover:scale-[1.04]
                flex flex-col opacity-0 translate-y-7
                ${loaded ? "opacity-100 translate-y-0" : ""}
              `}
              style={{
                animationFillMode: "forwards",
                animationDuration: "700ms",
                animationDelay: `${i * 160}ms`
              }}
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                />
                <svg 
                  className="absolute top-2 right-2 w-8 h-8 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  fill="none" 
                  stroke="#fbbf24" 
                  strokeWidth="2"
                >
                  <line x1="5" y1="6" x2="22" y2="22" />
                  <circle cx="5" cy="6" r="3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-accent-400/5 to-transparent pointer-events-none" />
              </div>
              <div className="flex-1 flex flex-col px-5 py-4">
                <h4 className="font-bold text-lg mb-1 text-white">{p.title}</h4>
                <p className="text-primary-200 text-sm font-light flex-grow">{p.description}</p>
                <span className="inline-block mt-4 text-accent-400 font-bold text-lg">{p.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";

// const youthFencingProducts = [
//   {
//     id: 102126264,
//     title: "Youth Minnow (monthly recur)",
//     price: "$95.00",
//     href: "#!/Youth-Minnow-monthly-recur/p/102126264",
//     image: "youthFencing/MonthlySubscription.jpg",
//     description: "Introductory fencing class for ages 6-9; foundational footwork, agility, and fun.",
//   },
//   {
//     id: 102126268,
//     title: "Full Subscription (monthly recur)",
//     price: "$195.00",
//     href: "#!/Full-Subscription-monthly-recur/p/102126268",
//     image: "youthFencing/YearlySubscription.jpg",
//     description: "Comprehensive access to all group classes, open floor, and special youth sessions.",
//   },
//   {
//     id: 237211030,
//     title: "Youth Team Annual Fees (via TFA Team App)",
//     price: "$0.00",
//     href: "#!/Youth-Team-Annual-Fees-Individual-pay-via-TFA-Team-App/p/237211030",
//     image: "youthFencing/YouthTeam.jpg",
//     description: "Annual registration for youth team members (payment through TFA Team App).",
//   },
// ];

// export default function YouthFencingPage() {
//   const [loaded, setLoaded] = useState(false);
  
//   useEffect(() => { 
//     setLoaded(true); 
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 relative overflow-x-hidden">
//       {/* Decorative background orbs and fencing patterns */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-16 right-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-4 left-8 w-96 h-96 bg-primary-800/15 rounded-full blur-3xl animate-pulse delay-500"></div>
//         <div className="absolute inset-0 opacity-15">
//           <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse"></div>
//           <div className="absolute bottom-[22%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse delay-500"></div>
//         </div>
//       </div>

//       {/* Hero Image + Overlay */}
//       <div className="relative h-80 md:h-96 flex justify-center items-end overflow-hidden">
//         <img
//           src="youthFencing/YouthFencingBg1.jpg"
//           alt="Youth Fencing at Texas Fencing Academy"
//           className="w-full h-full object-cover object-bottom opacity-80"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/50 to-primary-900/80" />
//         <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center z-10 mb-6 animate-fade-in">
//           <h1 className="text-4xl sm:text-5xl font-extralight text-white drop-shadow-lg text-center">Youth Fencing</h1>
//           <span className="mt-2 block text-accent-400 text-lg font-bold tracking-wider drop-shadow-md text-center">
//             Where Future Champions Begin
//           </span>
//         </div>
//       </div>

//       {/* Youth Fencing Info + Call to Action - IMPROVED LAYOUT */}
//       <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16">
//         {/* Creative Flex Layout with Vertical Centering */}
//         <div className="flex flex-wrap items-center gap-12 min-h-[500px]">
          
//           {/* Left Column - Content */}
//           <div className="flex-1 min-w-[300px] max-w-xl space-y-6">
//             <div className="space-y-4">
//               <h2 className="text-3xl md:text-4xl font-semibold text-accent-400 leading-tight drop-shadow-sm animate-slide-up">
//                 Excellence on the Piste, Character for Life
//               </h2>
//               <div className="w-16 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full"></div>
//             </div>
            
//             <p className="text-primary-100 text-lg font-light leading-relaxed animate-fade-in delay-200">
//               Experience <span className="text-accent-400 font-semibold">world-class fencing instruction</span> for youth ages 6-17. Our Youth Fencing programs nurture discipline, focus, and sportsmanship—whether your child dreams of glory or seeks a healthy, fun community.
//             </p>

//             {/* Feature Cards - More Visual Alternative to Bullet Points */}
//             <div className="grid grid-cols-1 gap-4 animate-fade-in delay-400">
//               <div className="flex items-start gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300">
//                 <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
//                   <svg className="w-4 h-4 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h4 className="text-white font-medium text-base">Safe Equipment & Empowering Atmosphere</h4>
//                   <p className="text-primary-200 text-sm mt-1">Professional-grade equipment in a supportive environment</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300">
//                 <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
//                   <svg className="w-4 h-4 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h4 className="text-white font-medium text-base">Progressive Curriculum</h4>
//                   <p className="text-primary-200 text-sm mt-1">From footwork basics to advanced competitive tactics</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300">
//                 <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
//                   <svg className="w-4 h-4 text-primary-900" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h4 className="text-white font-medium text-base">Community & Character Building</h4>
//                   <p className="text-primary-200 text-sm mt-1">Teamwork, fair play, and lifelong friendships</p>
//                 </div>
//               </div>
//             </div>

//             {/* Call to Action */}
//             <div className="pt-4 animate-slide-up delay-500">
//               <a
//                 href="https://texasfencingacademy.org/?page_id=881"
//                 className="inline-flex items-center gap-3 bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-bold rounded-full px-8 py-4 shadow-glow hover:scale-105 hover:brightness-110 transition-all duration-300 group"
//                 target="_blank" 
//                 rel="noopener noreferrer"
//               >
//                 <span>Join Our Youth Program</span>
//                 <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           {/* Right Column - Enhanced Image with Stats Overlay */}
//           <div className="flex-1 min-w-[300px] max-w-xl animate-fade-in delay-300">
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
//               <img
//                 src="youthFencing/YouthFencers.jpg"
//                 alt="Youth fencers in action"
//                 className="w-full h-[420px] object-cover object-center group-hover:scale-110 transition-transform duration-700"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary-900/60 via-transparent to-primary-900/20 pointer-events-none" />
              
//               {/* Floating Stats Cards */}
//               <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
//                   <span className="text-white text-sm font-semibold">Ages 6-17</span>
//                 </div>
//               </div>

//               <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
//                 <div className="text-center">
//                   <div className="text-white text-lg font-bold">35+</div>
//                   <div className="text-white/80 text-xs">Years Experience</div>
//                 </div>
//               </div>

//               <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30">
//                 <div className="text-center">
//                   <div className="text-white text-lg font-bold">500+</div>
//                   <div className="text-white/80 text-xs">Students Trained</div>
//                 </div>
//               </div>

//               {/* Center Play Icon for Video Effect */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                 <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
//                   <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Grid (Animated) */}
//       <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12">
//         <div className="text-center mb-12">
//           <h3 className="text-3xl font-semibold text-white mb-4 tracking-wider">Youth Program Options</h3>
//           <div className="w-20 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full mx-auto"></div>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {youthFencingProducts.map((p, i) => (
//             <a
//               key={p.id}
//               href={p.href}
//               className={`
//                 group bg-gradient-to-br from-primary-800 to-primary-900 border border-accent-400/10 
//                 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-500
//                 hover:border-accent-400 hover:shadow-2xl hover:scale-[1.04]
//                 flex flex-col opacity-0 translate-y-7
//                 ${loaded ? "opacity-100 translate-y-0" : ""}
//               `}
//               style={{
//                 animationFillMode: "forwards",
//                 animationDuration: "700ms",
//                 animationDelay: `${i * 160}ms`
//               }}
//             >
//               <div className="relative h-48 w-full overflow-hidden">
//                 <img 
//                   src={p.image} 
//                   alt={p.title} 
//                   className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
//                 />
//                 <div className="absolute top-3 right-3 bg-accent-400/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//                   </svg>
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent pointer-events-none" />
//               </div>
              
//               <div className="flex-1 flex flex-col px-6 py-5">
//                 <h4 className="font-bold text-xl mb-3 text-white group-hover:text-accent-400 transition-colors duration-300">{p.title}</h4>
//                 <p className="text-primary-200 text-sm font-light flex-grow leading-relaxed mb-4">{p.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-accent-400 font-bold text-xl">{p.price}</span>
//                   <div className="text-accent-400 group-hover:translate-x-1 transition-transform duration-300">
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
