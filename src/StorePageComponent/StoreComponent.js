// import { useEffect, useState } from "react";

// const products = [
//   { id: 28047906, title: "Youth Fencing", href: "#!/Youth-Fencing/c/28047906", description: "Empower young fencers with expert coaching and fun lessons.", image: null },
//   { id: 28047907, title: "Adult Fencing", href: "#!/Adult-Fencing/c/28047907", description: "Join our adult classes to sharpen your technique and agility.", image: null },
//   { id: 30828612, title: "Lessons - Calendar", href: "#!/Lessons-Calendar/c/30828612", description: "Stay updated on upcoming lessons and events.", image: null },
//   { id: 28047909, title: "Equipment", href: "#!/Equipment/c/28047909", description: "Top-quality fencing gear and apparel for all levels.", image: null },
//   { id: 28160371, title: "Repairs", href: "#!/Repairs/c/28160371", description: "Professional equipment repair services to keep you in top form.", image: null },
//   { id: 31213402, title: "Tournament Fees", href: "#!/Tournament-Fees/c/31213402", description: "Details on upcoming tournament fees and signups.", image: null },
//   { id: 33452699, title: "Special Events", href: "#!/Special-Events/c/33452699", description: "Exclusive fencing events, exhibitions, and competitions.", image: null },
//   { id: 61240029, title: "Donations", href: "#!/Donations/c/61240029", description: "Support Texas Fencing Academy and foster the sport’s growth.", image: null },
//   { id: 239971493, title: "Donation", href: "#!/Donation/p/239971493", description: "Help fund fencing programs across all ages.", image: null },
//   { id: 350509338, title: "Subscription Setup", href: "#!/Subscription-Setup/p/350509338", description: "Set up your subscription for lessons and events.", image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/2241953945.jpg" },
//   { id: 515139517, title: "Gift Card - 1st Month Fencing", href: "#!/Gift-Card-1st-Month-Fencing/p/515139517", description: "Give the gift of fencing with our gift cards.", image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/3362855787.jpg" },
// ];

// export default function FencingStorePage() {
//   // Animate on mount
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => { setLoaded(true); }, []);

//   return (
//     <section className="relative min-h-screen bg-primary-900 text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
//       {/* THEME BACKGROUND: subtle fencing pattern overlays */}
//       <div 
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: `radial-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px), linear-gradient(45deg, rgba(251, 191, 36, 0.05) 25%, transparent 25%), linear-gradient(-45deg, rgba(251, 191, 36, 0.05) 25%, transparent 25%)`,
//           backgroundSize: '40px 40px',
//           backgroundPosition: '0 0, 0 20px, 20px -20px',
//           zIndex: 0
//         }}
//       />

//       {/* HEADER */}
//       <header className="relative max-w-6xl mx-auto mb-16 z-10 text-center">
//         <h1 className="text-5xl md:text-6xl font-extralight tracking-tight leading-tight drop-shadow-lg">
//           Texas Fencing Academy <br />
//           <span className="text-accent-400 font-semibold tracking-widest uppercase">Store</span>
//         </h1>
//         <p className="mt-3 text-lg md:text-xl max-w-3xl mx-auto text-primary-200 font-light">
//           Explore our curated selection of fencing programs, equipment, and exclusive events. Elevate your fencing journey with quality and style.
//         </p>
//       </header>

//       {/* PRODUCTS GRID */}
//       <main className="relative max-w-7xl mx-auto z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//         {products.map((product, i) => (
//           <a
//             key={product.id}
//             href={product.href}
//             className={`group bg-gradient-to-br from-primary-800 via-primary-900 to-primary-900 rounded-3xl border border-transparent 
//               shadow-2xl transform transition-all duration-500 ease-out 
//               hover:border-accent-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:scale-[1.05] 
//               flex flex-col overflow-hidden
//               opacity-0 translate-y-10
//               ${loaded ? `opacity-100 translate-y-0 transition-opacity delay-${i * 100}ms` : ''}
//             `}
//             style={{ animationFillMode: 'forwards' }}
//           >
//             {/* Image Container */}
//             <div className="relative h-56 md:h-60 w-full bg-gradient-to-t from-primary-700 via-primary-800 to-primary-900 overflow-hidden rounded-t-3xl shadow-inner">
//               {product.image ? (
//                 <img 
//                   src={product.image} 
//                   alt={product.title} 
//                   loading="lazy"
//                   className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
//                   draggable={false}
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full bg-primary-800 text-primary-400 font-semibold text-2xl uppercase tracking-widest opacity-60 select-none">
//                   {product.title}
//                 </div>
//               )}
//               {/* Subtle golden fencing sword motif as overlay */}
//               <svg
//                 className="absolute bottom-4 right-4 w-16 h-16 opacity-10 pointer-events-none"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path d="M12 2l7 7-7 7-7-7 7-7z" strokeLinecap="round" strokeLinejoin="round" />
//                 <line x1="12" y1="9" x2="12" y2="15" strokeLinecap="round" />
//                 <line x1="9" y1="12" x2="15" y2="12" strokeLinecap="round" />
//               </svg>
//             </div>

//             {/* Content */}
//             <div className="flex flex-col flex-grow px-6 py-5">
//               <h3 className="font-semibold text-2xl leading-tight mb-2 text-accent-400 tracking-wide font-serif group-hover:text-amber-500 transition-colors duration-500">
//                 {product.title}
//               </h3>
//               <p className="flex-grow text-primary-300 text-base font-light leading-relaxed mb-5 tracking-wide">
//                 {product.description}
//               </p>

//               <button
//                 type="button"
//                 className="self-start bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-semibold rounded-full py-2 px-8 shadow-lg hover:brightness-110 active:scale-95 transition transform"
//               >
//                 View Details
//               </button>
//             </div>
//           </a>
//         ))}
//       </main>

//       {/* FOOTER DECORATIVE ORBS */}
//       <div className="pointer-events-none absolute -bottom-28 -left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-primary-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//     </section>
//   );
// }

// import { useState } from "react";

// // Your store options/products
// const storeSections = [
//   {
//     id: "youth",
//     label: "Youth Fencing",
//     description: "Empower young fencers with expert coaching and fun lessons.",
//     image: null,
//     link: "#!/Youth-Fencing/c/28047906",
//   },
//   {
//     id: "adult",
//     label: "Adult Fencing",
//     description: "Sharpen your skills in our adult classes, open to all levels.",
//     image: null,
//     link: "#!/Adult-Fencing/c/28047907",
//   },
//   {
//     id: "calendar",
//     label: "Lessons - Calendar",
//     description: "Stay up to date on lessons and events at the academy.",
//     image: null,
//     link: "#!/Lessons-Calendar/c/30828612",
//   },
//   {
//     id: "equipment",
//     label: "Equipment",
//     description: "Shop for high-quality fencing gear and supplies.",
//     image: null,
//     link: "#!/Equipment/c/28047909",
//   },
//   {
//     id: "repairs",
//     label: "Repairs",
//     description: "Professional repairs for all your fencing equipment.",
//     image: null,
//     link: "#!/Repairs/c/28160371",
//   },
//   {
//     id: "tournament",
//     label: "Tournament Fees",
//     description: "Register for upcoming tournaments and view fee info.",
//     image: null,
//     link: "#!/Tournament-Fees/c/31213402",
//   },
//   {
//     id: "events",
//     label: "Special Events",
//     description: "Join unique fencing events and exhibitions at TFA.",
//     image: null,
//     link: "#!/Special-Events/c/33452699",
//   },
//   {
//     id: "donations",
//     label: "Donations",
//     description: "Support TFA and the sport’s growth for all ages.",
//     image: null,
//     link: "#!/Donations/c/61240029",
//   },
//   {
//     id: "subscription",
//     label: "Subscription Setup",
//     description: "Easily setup lesson and event subscriptions.",
//     image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/2241953945.jpg",
//     link: "#!/Subscription-Setup/p/350509338",
//   },
//   {
//     id: "giftcard",
//     label: "Gift Card - 1st Month Fencing",
//     description: "Gift the joy of fencing with a special starter card.",
//     image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/3362855787.jpg",
//     link: "#!/Gift-Card-1st-Month-Fencing/p/515139517",
//   },
// ];

// export default function StorePageWithSidebar() {
//   // default to first section
//   const [selected, setSelected] = useState(storeSections[0].id);

//   const selectedSection = storeSections.find((sec) => sec.id === selected);

//   return (
//     <section className="relative min-h-screen bg-primary-900 py-0 md:py-16 px-0 md:px-8 text-white flex">
//       {/* Left Vertical Navbar */}
//       <aside className="hidden md:flex flex-col w-64 py-16 px-6 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 shadow-xl rounded-tr-3xl rounded-br-3xl z-20 animate-slide-up">
//         <h2 className="mb-10 text-3xl font-bold tracking-wide text-accent-400 select-none">Store</h2>
//         <nav className="flex flex-col gap-2">
//           {storeSections.map((sec) => (
//             <button
//               key={sec.id}
//               onClick={() => setSelected(sec.id)}
//               className={`text-left group py-3 px-5 rounded-l-lg transition-all duration-300
//                           font-semibold tracking-wide
//                           ${selected === sec.id
//                   ? "bg-accent-400/20 text-accent-400 shadow-lg scale-105"
//                   : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
//                 }`}
//             >
//               <span className="block">{sec.label}</span>
//               {selected === sec.id && (
//                 <span className="block w-10 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full mt-2 animate-fade-in" />
//               )}
//             </button>
//           ))}
//         </nav>
//       </aside>
//       {/* Mobile navbar */}
//       <nav className="md:hidden w-full sticky top-0 z-30 bg-primary-900 py-4 px-3 flex overflow-x-auto gap-2 border-b border-primary-700 animate-slide-up">
//         {storeSections.map((sec) => (
//           <button
//             key={sec.id}
//             onClick={() => setSelected(sec.id)}
//             className={`px-4 py-2 rounded-full transition-all font-semibold text-sm 
//                         ${selected === sec.id
//                 ? "bg-accent-400/20 text-accent-400 scale-105"
//                 : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
//               }`
//             }
//           >
//             {sec.label}
//           </button>
//         ))}
//       </nav>
//       {/* Main Content Area */}
//       <main className="flex-1 flex items-center justify-center">
//         <div className="relative max-w-2xl w-full mx-auto p-5 md:p-12 rounded-3xl bg-primary-900/90 shadow-2xl animate-fade-in">
//           {/* Decorative background motifs */}
//           <div className="absolute -top-20 -left-24 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse"></div>
//           <div className="absolute -bottom-14 -right-20 w-56 h-56 bg-primary-800/20 rounded-full blur-3xl pointer-events-none z-0 animate-pulse delay-500"></div>
//           <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
//             <svg width="100%" height="100%" className="absolute inset-0 opacity-10" viewBox="0 0 600 400">
//               <line x1="0" y1="40" x2="600" y2="40" stroke="#fbbf24" strokeWidth="1" />
//               <line x1="0" y1="200" x2="600" y2="200" stroke="#fff" strokeWidth="1" />
//               <line x1="0" y1="360" x2="600" y2="360" stroke="#d97706" strokeWidth="1" />
//             </svg>
//           </div>

//           <div className="relative z-10 flex flex-col gap-6">
//             <h2 className="text-4xl font-semibold text-accent-400 font-serif drop-shadow-md animate-slide-up">
//               {selectedSection.label}
//             </h2>
//             <p className="text-lg text-primary-100 animate-fade-in delay-200 font-light">
//               {selectedSection.description}
//             </p>
//             {selectedSection.image && (
//               <img
//                 src={selectedSection.image}
//                 alt={selectedSection.label}
//                 className="rounded-xl shadow-lg mx-auto object-cover w-full h-64 max-h-72 border-4 border-accent-400/20 animate-fade-in delay-300"
//                 loading="lazy"
//               />
//             )}
//             <a
//               href={selectedSection.link}
//               className="inline-block px-8 py-3 rounded-full mt-2 bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-bold shadow-glow hover:scale-105 hover:bg-accent-500/90 hover:brightness-110 transition-all animate-slide-up delay-400"
//               target="_blank" rel="noopener noreferrer"
//             >
//               Explore {selectedSection.label}
//             </a>
//           </div>
//         </div>
//       </main>
//     </section>
//   );
// }



import { useState } from "react";
import YouthFencingPage from "./YouthFencing.js";

// Your store sections data
const storeSections = [
  {
    id: "youth",
    label: "Youth Fencing",
    description: "Empower young fencers with expert coaching and fun lessons.",
    image: null,
    link: "#!/Youth-Fencing/c/28047906",
  },
  {
    id: "adult",
    label: "Adult Fencing",
    description: "Sharpen your skills in our adult classes, open to all levels.",
    image: null,
    link: "#!/Adult-Fencing/c/28047907",
  },
  {
    id: "calendar",
    label: "Lessons - Calendar",
    description: "Stay up to date on lessons and events at the academy.",
    image: null,
    link: "#!/Lessons-Calendar/c/30828612",
  },
  {
    id: "equipment",
    label: "Equipment",
    description: "Shop for high-quality fencing gear and supplies.",
    image: null,
    link: "#!/Equipment/c/28047909",
  },
  {
    id: "repairs",
    label: "Repairs",
    description: "Professional repairs for all your fencing equipment.",
    image: null,
    link: "#!/Repairs/c/28160371",
  },
  {
    id: "tournament",
    label: "Tournament Fees",
    description: "Register for upcoming tournaments and view fee info.",
    image: null,
    link: "#!/Tournament-Fees/c/31213402",
  },
  {
    id: "events",
    label: "Special Events",
    description: "Join unique fencing events and exhibitions at TFA.",
    image: null,
    link: "#!/Special-Events/c/33452699",
  },
  {
    id: "donations",
    label: "Donations",
    description: "Support TFA and the sport's growth for all ages.",
    image: null,
    link: "#!/Donations/c/61240029",
  },
  {
    id: "subscription",
    label: "Subscription Setup",
    description: "Easily setup lesson and event subscriptions.",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/2241953945.jpg",
    link: "#!/Subscription-Setup/p/350509338",
  },
  {
    id: "giftcard",
    label: "Gift Card - 1st Month Fencing",
    description: "Gift the joy of fencing with a special starter card.",
    image: "https://d2j6dbq0eux0bg.cloudfront.net/images/13359428/3362855787.jpg",
    link: "#!/Gift-Card-1st-Month-Fencing/p/515139517",
  },
];

export default function StoreContainer() {
  const [selectedSection, setSelectedSection] = useState("youth");
  const currentSection = storeSections.find((sec) => sec.id === selectedSection);

  // Render default content for non-youth sections
  const renderDefaultContent = () => (
    <div className="relative max-w-2xl w-full mx-auto p-5 md:p-12 rounded-3xl bg-primary-900/90 shadow-2xl animate-fade-in">
      {/* Decorative background motifs */}
      <div className="absolute -top-20 -left-24 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute -bottom-14 -right-20 w-56 h-56 bg-primary-800/20 rounded-full blur-3xl pointer-events-none z-0 animate-pulse delay-500"></div>
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-10" viewBox="0 0 600 400">
          <line x1="0" y1="40" x2="600" y2="40" stroke="#fbbf24" strokeWidth="1" />
          <line x1="0" y1="200" x2="600" y2="200" stroke="#fff" strokeWidth="1" />
          <line x1="0" y1="360" x2="600" y2="360" stroke="#d97706" strokeWidth="1" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="text-4xl font-semibold text-accent-400 font-serif drop-shadow-md animate-slide-up">
          {currentSection?.label}
        </h2>
        <p className="text-lg text-primary-100 animate-fade-in delay-200 font-light">
          {currentSection?.description}
        </p>
        {currentSection?.image && (
          <img
            src={currentSection.image}
            alt={currentSection.label}
            className="rounded-xl shadow-lg mx-auto object-cover w-full h-64 max-h-72 border-4 border-accent-400/20 animate-fade-in delay-300"
            loading="lazy"
          />
        )}
        <a
          href={currentSection?.link}
          className="inline-block px-8 py-3 rounded-full mt-2 bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-bold shadow-glow hover:scale-105 hover:bg-accent-500/90 hover:brightness-110 transition-all animate-slide-up delay-400"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Explore {currentSection?.label}
        </a>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-primary-900 text-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Left Vertical Navbar */}
        <aside className="w-64 py-16 px-6 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 shadow-xl rounded-tr-3xl rounded-br-3xl z-20 animate-slide-up">
          <h2 className="mb-10 text-3xl font-bold tracking-wide text-accent-400 select-none">Store</h2>
          <nav className="flex flex-col gap-2">
            {storeSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSection(sec.id)}
                className={`text-left group py-3 px-5 rounded-l-lg transition-all duration-300
                            font-semibold tracking-wide
                            ${selectedSection === sec.id
                    ? "bg-accent-400/20 text-accent-400 shadow-lg scale-105"
                    : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
                  }`}
              >
                <span className="block">{sec.label}</span>
                {selectedSection === sec.id && (
                  <span className="block w-10 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full mt-2 animate-fade-in" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area - Full Width */}
        <main className="flex-1">
          {selectedSection === "youth" ? (
            <YouthFencingPage />
          ) : (
            <div className="flex items-center justify-center min-h-screen py-16 px-8">
              {renderDefaultContent()}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile navbar */}
        <nav className="w-full sticky top-0 z-30 bg-primary-900 py-4 px-3 flex overflow-x-auto gap-2 border-b border-primary-700 animate-slide-up">
          {storeSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`px-4 py-2 rounded-full transition-all font-semibold text-sm whitespace-nowrap
                          ${selectedSection === sec.id
                  ? "bg-accent-400/20 text-accent-400 scale-105"
                  : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
                }`}
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* Mobile Content */}
        <main>
          {selectedSection === "youth" ? (
            <YouthFencingPage />
          ) : (
            <div className="flex items-center justify-center min-h-screen py-16 px-4">
              {renderDefaultContent()}
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

