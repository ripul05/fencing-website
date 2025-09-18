
import { useState, useEffect } from "react";
import { useCart } from "./Cart/CartContex";

const equipmentData = [
  {
    id: 102126284,
    title: "Epee Starter Kit (9 pieces)",
    price: "$396.00",
    category: "Starter Kits",
    description:
      "Complete epee starter kit with all essential equipment for beginners. Includes jacket, mask, glove, weapon, and protective gear.",
    image: "equipment/EpeeStarterKit.jpg",
    badge: "Complete Kit",
    // Stripe
    priceId: "price_123_epee_starter", // from your Stripe Dashboard
    paymentLink: "https://buy.stripe.com/4gwcOF1Zp1ZLgkU5kR", 
  },
  {
    id: 102126285,
    title: "Saber Starter Kit (10 pieces)",
    price: "$449.00",
    category: "Starter Kits",
    description:
      "Comprehensive saber starter kit with lamé and all necessary equipment for competitive saber fencing.",
    image: "equipment/SaberStarterKit.jpg",
    badge: "Complete Kit",
    priceId: "price_123_saber_starter",
    paymentLink: "https://buy.stripe.com/aEU8yp5bB7k57Oo00w",
  },
  {
    id: 102126286,
    title: "Jacket",
    price: "$88.00",
    category: "Protective Gear",
    description:
      "High-quality fencing jacket with reinforced padding and proper ventilation for maximum protection and comfort.",
    image: "equipment/FencingJacket.jpg",
  },
  {
    id: 102126287,
    title: "Knickers",
    price: "$55.00",
    category: "Protective Gear",
    description:
      "Professional fencing knickers with reinforced knee area and comfortable fit for optimal mobility.",
    image: "equipment/FencingKnickers.jpg",
  },
  {
    id: 102126288,
    title: "Glove",
    price: "$12.00",
    category: "Protective Gear",
    description:
      "Comfortable fencing glove with excellent grip and dexterity for precise weapon handling.",
    image: "equipment/FencingGlove.jpg",
  },
  {
    id: 102126290,
    title: "Epee Mask",
    price: "$58.00",
    category: "Masks",
    description:
      "Professional epee mask with excellent visibility and ventilation. Meets all safety standards.",
    image: "equipment/EpeeMask.jpg",
  },
  {
    id: 102126291,
    title: "Saber Mask",
    price: "$98.00",
    category: "Masks",
    description:
      "Specialized saber mask with conductive bib for electric scoring. Tournament approved.",
    image: "equipment/SaberMask.jpg",
  },
  {
    id: 102126292,
    title: "Nylon Underarm Protector",
    price: "$22.00",
    category: "Protective Gear",
    description:
      "Essential underarm protection for safe fencing practice and competition.",
    image: "equipment/UnderarmProtector.jpg",
  },
  {
    id: 102126293,
    title: "Chestplate",
    price: "$30.00",
    category: "Protective Gear",
    description:
      "Additional chest protection for enhanced safety during training and competition.",
    image: "equipment/Chestplate.jpg",
  },
  {
    id: 102126295,
    title: "Epee",
    price: "$50.00",
    category: "Weapons",
    description:
      "Professional epee weapon with balanced weight distribution and comfortable grip.",
    image: "equipment/Epee.jpg",
  },
  {
    id: 102126296,
    title: "Saber",
    price: "$50.00",
    category: "Weapons",
    description:
      "High-quality saber weapon designed for precision and durability in competition.",
    image: "equipment/Saber.jpg",
  },
  {
    id: 102126297,
    title: "TFA Team T-Shirt",
    price: "$15.00",
    category: "Apparel",
    description:
      "Official Texas Fencing Academy team t-shirt. Comfortable cotton blend.",
    image: "equipment/TFAShirt.jpg",
  },
  {
    id: 102126298,
    title: "TFA Team Jacket",
    price: "$135.00",
    category: "Apparel",
    description:
      "Premium TFA team jacket with embroidered logo. Perfect for tournaments and events.",
    image: "equipment/TFAJacket.jpg",
  },
  {
    id: 111689421,
    title: "Copper Saber Lame",
    price: "$94.00",
    category: "Electric Equipment",
    description:
      "Professional copper saber lamé for electric scoring. Durable and conductive.",
    image: "equipment/CopperLame.jpg",
  },
  {
    id: 102315415,
    title: "Epee Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Reliable epee body cord for electric scoring systems. Tournament quality.",
    image: "equipment/EpeeBodyCord.jpg",
  },
  {
    id: 103890147,
    title: "Epee - Wired Blade",
    price: "$35.00",
    category: "Weapons",
    description:
      "Pre-wired epee blade ready for electric scoring. Professional grade.",
    image: "equipment/WiredEpeeBlade.jpg",
  },
  {
    id: 111670567,
    title: "Saber Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Professional saber body cord for electric scoring. Reliable connection.",
    image: "equipment/SaberBodyCord.jpg",
  },
  {
    id: 104037303,
    title: "Stainless Steel Saber Lamé",
    price: "$206.00",
    category: "Electric Equipment",
    description:
      "Premium stainless steel saber lamé. Superior durability and conductivity.",
    image: "equipment/SteelLame.jpg",
    badge: "Premium",
  },
  {
    id: 109361582,
    title: "Electric FIE Saber Glove",
    price: "$69.00",
    category: "Electric Equipment",
    description:
      "FIE approved electric saber glove with conductive cuff. Tournament standard.",
    image: "equipment/ElectricGlove.jpg",
    badge: "FIE Approved",
  },
  {
    id: 116484287,
    title: "Mask Cord",
    price: "$10.00",
    category: "Electric Equipment",
    description:
      "Essential mask cord for electric scoring connection. Reliable and durable.",
    image: "equipment/MaskCord.jpg",
  },
  {
    id: 116484295,
    title: "Equipment Rental Fee (per item)",
    price: "$10.00",
    category: "Services",
    description:
      "Rental fee for individual equipment items. Perfect for trying before buying.",
    image: "equipment/EquipmentRental.jpg",
  },
  {
    id: 118034037,
    title: "Saber Blade",
    price: "$20.00",
    category: "Weapons",
    description:
      "Replacement saber blade. High-quality steel with proper flexibility.",
    image: "equipment/SaberBlade.jpg",
  },
  {
    id: 173741927,
    title: "TFA Saber Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Custom TFA saber body cord. Reliable performance for training and competition.",
    image: "equipment/TFASaberCord.jpg",
  },
];

const categories = [
  "All Equipment",
  "Starter Kits",
  "Weapons",
  "Protective Gear",
  "Masks",
  "Electric Equipment",
  "Apparel",
  "Services",
];

const sortOptions = [
  { value: "recommended", label: "Featured Items" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "popularity", label: "Most Popular" },
];

function StoreHeroSection() {
  const [isResizing, setIsResizing] = useState(false);

  // --vh fallback for mobile viewport (same as your working solution)
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

  // Handle resize events for performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section 
      className={`
        relative
        min-h-[100dvh]
        sm:min-h-[calc(var(--vh,1vh)*100)]
        flex items-center justify-center overflow-hidden
        px-4 sm:px-6
        ${isResizing ? 'no-animations' : ''}
      `}
      style={{
        // Only prevent overscroll at the top to stop pull-to-refresh
        overscrollBehaviorY: 'none'
      }}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src="/store/FencingEquipmentBg1.jpg"
          alt="Fencing Equipment Store"
          className="w-full h-full object-cover object-center motion-safe:animate-fade-in"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/70" />
      </div>

      {/* Refined decorative elements (softer on mobile) */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-28 sm:top-40 left-1/5 sm:left-1/4 w-px h-32 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent rotate-12 motion-safe:animate-pulse"></div>
        <div className="absolute bottom-28 sm:bottom-40 right-1/5 sm:right-1/4 w-px h-32 sm:h-40 bg-gradient-to-b from-amber-500 to-transparent -rotate-12 motion-safe:animate-pulse"></div>
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
        <div className="space-y-5 sm:space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-tight sm:leading-none text-white drop-shadow-lg">
              <span className="block opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_0.4s_forwards]">
                PROFESSIONAL
              </span>
              <span className="block text-amber-400 font-normal drop-shadow-lg opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_0.7s_forwards]">
                EQUIPMENT
              </span>
              <span className="block opacity-0 motion-safe:animate-[slideUp_0.7s_ease-out_1s_forwards]">
                COLLECTION
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4 opacity-0 motion-safe:animate-[fadeIn_0.7s_ease-out_1.3s_forwards]">
            <div className="w-14 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-10 sm:w-12 h-10 sm:h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-105 hover:border-amber-400 transition-all duration-300 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-amber-400 rounded-full motion-safe:animate-pulse" />
            </div>
            <div className="w-14 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        <div className="overflow-hidden">
          <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed font-light max-w-2xl sm:max-w-3xl mx-auto drop-shadow-sm opacity-0 motion-safe:animate-[fadeIn_0.7s_ease-out_1.6s_forwards]">
            Premium fencing equipment crafted for champions. From beginner
            essentials to tournament-grade gear, discover excellence in every
            piece.
          </p>
        </div>
      </div>

      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
        
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(24px) } 
          to { opacity: 1; transform: translateY(0) } 
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function StoreFilters({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange,
}) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-slate-50/95">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Search and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Enhanced Search */}
            <div className="flex-1 max-w-full sm:max-w-md">
              <div
                className={`relative transition-all duration-300 ${
                  searchFocused ? "scale-105" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-slate-300 rounded-lg md:rounded-xl bg-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md text-slate-700 placeholder:text-slate-400 text-sm md:text-base"
                />
                <svg
                  className={`absolute left-3 md:left-4 top-2.5 md:top-3.5 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                    searchFocused ? "text-amber-500" : "text-slate-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-2.5 md:top-3.5 w-4 h-4 md:w-5 md:h-5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white rounded-lg shadow-lg border border-slate-200 text-sm text-slate-600 z-50">
                  Searching for:{" "}
                  <span className="font-semibold text-amber-600">
                    "{searchTerm}"
                  </span>
                </div>
              )}
            </div>

            {/* Enhanced Sort */}
            <div className="relative min-w-0 sm:min-w-[200px]">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-white border border-slate-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 pr-8 md:pr-10 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md text-slate-700 cursor-pointer w-full text-sm md:text-base"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-2.5 md:right-3 top-3 md:top-3.5 w-4 h-4 md:w-5 md:h-5 text-slate-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter - Mobile Scrollable */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                      : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EquipmentCard({ item, index, loaded }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      ...item,
      priceNumeric: Number(item.price.replace("$", "")),
      quantity: 1,
    });
  };

  const getItemQuantity = () => {
    const cartItem = cartItems.find((ci) => ci.id === item.id);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    // Quick view logic
  };

  // Use link exactly as provided
  const paymentLink = item.paymentLink || null;

  // Optional: only append tracking if the item explicitly provides it
  const href = paymentLink
    ? `${paymentLink}${item.trackingQuery ? (paymentLink.includes("?") ? "&" : "?") + item.trackingQuery : ""}`
    : null;

  return (
    <div
      className={`
        group relative bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden 
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-700 ease-out
        flex flex-col min-h-[350px] md:min-h-[400px] cursor-pointer
        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        animationFillMode: "forwards",
        animationDuration: "1000ms",
        animationDelay: `${index * 120}ms`,
      }}
      onClick={handleQuickView}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Minimal hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-slate-50/0 group-hover:from-amber-50/20 group-hover:to-slate-50/10 transition-all duration-700 rounded-lg md:rounded-xl"></div>

      {/* Image */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-slate-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse"></div>
        )}
        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            {item.badge}
          </div>
        )}

        {/* Category tag */}
        <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-3 md:p-5">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <h3 className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-amber-700 transition-colors duration-300 line-clamp-2 leading-snug flex-1 pr-2">
            {item.title}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="text-base md:text-lg font-bold text-amber-600 block">
              {item.price}
            </span>
          </div>
        </div>

        <p className="text-slate-600 text-xs md:text-sm leading-relaxed flex-grow mb-3 md:mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Actions */}
        {/* Actions */}
{/* Actions */}
<div className="mt-auto pt-2 md:pt-3 border-t border-slate-100">
  <div className="flex items-center gap-2">
    {/* Add to cart (left) */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart(e);
      }}
      className={`
        group/btn relative overflow-hidden px-2.5 md:px-3 py-1.5 rounded-lg font-medium text-xs md:text-sm transition-all duration-300
        ${
          getItemQuantity() > 0
            ? "bg-green-500 text-white"
            : "bg-slate-100 text-slate-700 hover:bg-amber-500 hover:text-white"
        }
      `}
    >
      <span className="flex items-center space-x-1 md:space-x-1.5">
        {getItemQuantity() > 0 ? (
          <>
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="hidden sm:inline">Added ({getItemQuantity()})</span>
            <span className="sm:hidden">({getItemQuantity()})</span>
          </>
        ) : (
          <>
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16h0a1 1 0 001 1v0a1 1 0 001-1v0V7" />
            </svg>
            <span>Add</span>
          </>
        )}
      </span>
    </button>

    {/* Spacer pushes Buy now to the far right */}
    <div className="flex-1" />

    {/* Buy now (right) */}
    {href && (
      <a
        href={href}
        rel="noopener noreferrer"
        // Important: don't prevent default, only stop propagation
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all duration-300 hover:scale-[1.02] z-10 pointer-events-auto"
      >
        Buy now
      </a>
    )}
  </div>
</div>


      </div>

      {/* Bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-amber-400/50 to-amber-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
}




export default function EquipmentStore() {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Equipment");
  const [sortBy, setSortBy] = useState("recommended");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced filter and sort logic
  const filteredAndSortedItems = equipmentData
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "All Equipment" ||
        item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
          );
        case "price-high":
          return (
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
          );
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "newest":
          return b.id - a.id;
        case "popularity":
          if (a.badge && !b.badge) return -1;
          if (!a.badge && b.badge) return 1;
          return (
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
          );
        case "recommended":
        default:
          const getRecommendScore = (item) => {
            if (item.badge) return 3;
            if (item.category === "Starter Kits") return 2;
            if (item.category === "Weapons") return 1;
            return 0;
          };
          return getRecommendScore(b) - getRecommendScore(a);
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <StoreHeroSection />

      <StoreFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Products Section - mobile responsive */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Enhanced results header - mobile responsive */}
          <div className="mb-6 md:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4 gap-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-1 md:mb-2">
                  {selectedCategory === "All Equipment"
                    ? "All Equipment"
                    : selectedCategory}
                </h2>
                <p className="text-slate-600 flex items-center flex-wrap gap-2 text-sm md:text-base">
                  <span>
                    {filteredAndSortedItems.length}{" "}
                    {filteredAndSortedItems.length === 1 ? "item" : "items"}
                    {searchTerm && ` matching "${searchTerm}"`}
                  </span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      Active Search
                    </span>
                  )}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs md:text-sm text-slate-500">
                  Sorted by:{" "}
                  <span className="font-medium text-amber-600">
                    {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </span>
                </p>
              </div>
            </div>
            {(selectedCategory !== "All Equipment" || searchTerm) && (
              <div className="flex items-center space-x-2">
                {selectedCategory !== "All Equipment" && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All Equipment")}
                      className="ml-2 hover:text-slate-900"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Products grid - mobile responsive */}
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {filteredAndSortedItems.map((item, index) => (
                <EquipmentCard
                  key={item.id}
                  item={item}
                  index={index}
                  loaded={loaded}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20 px-4">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-slate-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 md:w-12 md:h-12 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2 md:mb-3">
                No equipment found
              </h3>
              <p className="text-slate-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                We couldn't find any items matching your search criteria. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Equipment");
                  setSearchTerm("");
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Bottom CTA - mobile responsive */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 md:mb-6">
            Need Expert{" "}
            <span className="text-amber-400 font-semibold">Guidance?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-6 md:mb-10 leading-relaxed">
            Our fencing specialists are here to help you choose the perfect
            equipment for your skill level and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a
              href="mailto:info@texasfencingacademy.org"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>Email Our Experts</span>
            </a>
            <a
              href="tel:+1234567890"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Call for Consultation</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

