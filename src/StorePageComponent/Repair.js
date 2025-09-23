import { useState, useEffect, useRef } from 'react'
import { useCart } from './Cart/CartContex'
import { sanityFetch } from '../Sanity/sanityClient'

const categories = [
  "All Repairs",
  "Basic Repairs",
  "Standard Repairs", 
  "Premium Repairs",
  "Specialized Repairs"
]

const sortOptions = [
  { value: "recommended", label: "Featured Services" },
  { value: "newest", label: "Newest arrivals" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "turnaround", label: "Fastest Turnaround" }
]

function RepairsHeroSection() {
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

  return (
    <section 
      ref={sectionRef}
      data-repairs-hero
      className="
        relative 
        min-h-[50vh] md:min-h-[60vh] 
        flex items-center justify-center overflow-hidden 
        px-4 sm:px-6
      "
      style={{ 
        overscrollBehavior: "none",
        WebkitOverflowScrolling: "touch",
        touchAction: "manipulation",
        WebkitTextSizeAdjust: "100%"
      }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/store/FencingRepairBg.jpg"
          alt="Fencing Equipment Repairs"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/80 md:from-slate-900/75 md:via-slate-800/65 md:to-slate-900/75 pointer-events-none" />
      </div>

      {/* Decorative lines (hidden on mobile, lighter on desktop) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
        <div className="absolute top-20 left-1/4 w-px h-32 bg-gradient-to-b from-amber-500 to-transparent rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-px h-32 bg-gradient-to-b from-amber-500 to-transparent -rotate-12" />
      </div>

      {/* Content: mobile-optimized typography and spacing */}
      <div 
        className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8"
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)"
        }}
      >
        <div className="space-y-3 md:space-y-4">
          <h1
            className="
              font-extralight tracking-tight text-white drop-shadow-lg
              leading-none
              text-[clamp(1.5rem,4.5vw,2.5rem)] md:text-5xl lg:text-6xl
            "
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}
          >
            <span className="block">PROFESSIONAL</span>
            <span className="block text-amber-400 font-normal drop-shadow-lg">REPAIRS</span>
            <span className="block">& RESTORATION</span>
          </h1>

          {/* Decorative divider - mobile responsive */}
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white/70 rotate-45 flex items-center justify-center bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full" />
            </div>
            <div className="w-12 md:w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        <p
          className="
            text-white font-light drop-shadow-sm mx-auto leading-relaxed
            text-[clamp(0.95rem,2.4vw,1.125rem)] lg:text-xl
            max-w-3xl px-4 md:px-0
          "
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale"
          }}
        >
          Expert repair services with guaranteed quality. From basic maintenance 
          to complete restoration, we restore your equipment to championship performance.
        </p>
      </div>
    </section>
  );
}


function RepairsFilters({ selectedCategory, onCategoryChange, sortBy, onSortChange, searchTerm, onSearchChange }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-40 backdrop-blur-sm bg-slate-50/95">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Search and Sort Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Enhanced Search */}
            <div className="flex-1 max-w-full sm:max-w-md">
              <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                <input
                  type="text"
                  placeholder="Search repair services..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border border-slate-300 rounded-lg md:rounded-xl bg-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md text-slate-700 placeholder:text-slate-400 text-sm md:text-base"
                />
                <svg 
                  className={`absolute left-3 md:left-4 top-2.5 md:top-3.5 w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${
                    searchFocused ? 'text-amber-500' : 'text-slate-400'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 md:top-3.5 w-4 h-4 md:w-5 md:h-5 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-200'
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
  )
}

function RepairCard({ item, index, loaded, onRequestService }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handlePurchase = (e) => {
    e.stopPropagation();
    onRequestService && onRequestService(item);
  };

  return (
    <div
      className={`
        group relative bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden 
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-700 ease-out
        flex flex-col min-h-[350px] md:min-h-[400px]
        ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{
        animationFillMode: "forwards",
        animationDuration: "1000ms",
        animationDelay: `${index * 120}ms`
      }}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Minimal hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-slate-50/0 group-hover:from-amber-50/20 group-hover:to-slate-50/10 transition-all duration-700 rounded-lg md:rounded-xl"></div>

      {/* Image section - mobile responsive */}
      <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden bg-slate-50">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse"></div>
        )}
        <img 
          src={item.image} 
          alt={item.imageAlt || item.title}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Badge */}
        {item.badge && (
          <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-md">
            {item.badge}
          </div>
        )}

        {/* Turnaround time on hover */}
        <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-white/80 backdrop-blur-sm text-slate-500 text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          {item.turnaround}
        </div>

        {/* Service indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
          <div className="w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Clean content section - mobile responsive */}
      <div className="flex-1 flex flex-col p-3 md:p-5">
        {/* Title and price header */}
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <h3 className="text-sm md:text-base font-semibold text-slate-800 group-hover:text-amber-700 transition-colors duration-300 line-clamp-2 leading-snug flex-1 pr-2">
            {item.title}
          </h3>
          <div className="text-right flex-shrink-0">
            <span className="text-base md:text-lg font-bold text-amber-600 block">
              {item.price}
            </span>
            <span className="text-xs text-slate-400 block">
              {item.turnaround}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed flex-grow mb-3 md:mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Service category */}
        <div className="mb-3 md:mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-slate-100 text-slate-600">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {item.category}
          </span>
        </div>

        {/* Action section - mobile responsive */}
        <div className="mt-auto pt-2 md:pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quality guaranteed
            </span>
            
            {/* Purchase button */}
            <div className="flex items-center">
              <button 
                onClick={handlePurchase}
                className="group/btn relative overflow-hidden px-4 md:px-6 py-2 md:py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs md:text-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <span className="flex items-center space-x-1.5 md:space-x-2">
                  {item.paymentLink ? (
                    <>
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="hidden sm:inline">Get Quote</span>
                      <span className="sm:hidden">Quote</span>
                    </>
                  )}
                </span>
                
                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom accent for purchase focus */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  )
}

export default function RepairsPage() {
  const [loaded, setLoaded] = useState(false)
  const [repairData, setRepairData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All Repairs")
  const [sortBy, setSortBy] = useState("recommended")
  const [searchTerm, setSearchTerm] = useState("")

  // Fetch repair data from Sanity
  useEffect(() => {
    const fetchRepairs = async () => {
      try {
        setLoading(true)
        const query = `
          *[_type == "repair" && isActive == true] | order(sortOrder asc) {
            _id,
            repairId,
            title,
            price,
            category,
            description,
            "image": image.asset->url,
            "imageAlt": image.alt,
            turnaround,
            badge,
            priceId,
            paymentLink,
            isActive,
            sortOrder
          }
        `
        
        const repairs = await sanityFetch(query)
        
        // Transform Sanity data to match existing component structure
        const transformedRepairs = repairs.map(repair => ({
          id: repair.repairId,
          title: repair.title,
          price: repair.price,
          category: repair.category,
          description: repair.description,
          image: repair.image,
          imageAlt: repair.imageAlt,
          turnaround: repair.turnaround,
          badge: repair.badge,
          priceId: repair.priceId,
          paymentLink: repair.paymentLink
        }))
        
        setRepairData(transformedRepairs)
        setError(null)
      } catch (err) {
        console.error('Error fetching repairs:', err)
        setError('Failed to load repair services. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepairs()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  const handleRequestService = (item) => {
    if (item.paymentLink) {
      // Redirect to Stripe payment link
      window.open(item.paymentLink, '_blank')
    } else {
      console.log('Service requested for:', item)
      // Handle custom booking/request logic
    }
  }

  const handleViewDetails = (item) => {
    console.log('View details for:', item)
  }

  // Get unique categories from fetched data
  const categories = ["All Repairs", ...new Set(repairData.map(item => item.category))]

  // Enhanced filter and sort logic
  const filteredAndSortedItems = repairData
    .filter(item => {
      const matchesCategory = selectedCategory === "All Repairs" || item.category === selectedCategory
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
        case "price-high":
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''))
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        case "newest":
          return b.id - a.id
        case "turnaround":
          const getDays = (turnaround) => {
            if (turnaround.toLowerCase().includes('same day')) return 0
            const match = turnaround.match(/(\d+)-?(\d+)?\s*days?/i)
            return match ? parseInt(match[1]) : 999
          }
          return getDays(a.turnaround) - getDays(b.turnaround)
        case "recommended":
        default:
          const getRecommendScore = (item) => {
            if (item.badge) return 4
            if (item.category === "Premium Repairs") return 3
            if (item.category === "Specialized Repairs") return 2
            if (item.category === "Standard Repairs") return 1
            return 0
          }
          return getRecommendScore(b) - getRecommendScore(a)
      }
    })

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <RepairsHeroSection />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading repair services...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <RepairsHeroSection />
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Unable to Load Services</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <RepairsHeroSection />
      
      <RepairsFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categories={categories} // Pass dynamic categories
      />

      {/* Enhanced Info Banner - mobile responsive */}
      <section className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold text-amber-800 mb-1 md:mb-2">Professional Equipment Repair Services</h2>
            <p className="text-amber-700 text-sm md:text-base">
              Expert repairs with quality guarantee. Drop off your equipment or contact us to schedule pickup.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section - mobile responsive */}
      <section className="relative py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Enhanced results header - mobile responsive */}
          <div className="mb-6 md:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-4 gap-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-light text-slate-800 mb-1 md:mb-2">
                  {selectedCategory === "All Repairs" ? "All Repair Services" : selectedCategory}
                </h2>
                <p className="text-slate-600 flex items-center flex-wrap gap-2 text-sm md:text-base">
                  <span>
                    {filteredAndSortedItems.length} {filteredAndSortedItems.length === 1 ? 'service' : 'services'} 
                    {searchTerm && ` matching "${searchTerm}"`}
                  </span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Active Search
                    </span>
                  )}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs md:text-sm text-slate-500">
                  Sorted by: <span className="font-medium text-amber-600">
                    {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Services grid - mobile responsive */}
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredAndSortedItems.map((item, index) => (
                <RepairCard
                  key={item.id}
                  item={item}
                  index={index}
                  loaded={loaded}
                  onRequestService={handleRequestService}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20 px-4">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 md:w-12 md:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mb-2 md:mb-3">No repair services found</h3>
              <p className="text-slate-600 mb-4 md:mb-6 max-w-md mx-auto text-sm md:text-base">
                We couldn't find any services matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Repairs")
                  setSearchTerm("")
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Process Info Section - mobile responsive */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-light text-slate-800 text-center mb-8 md:mb-12">
            Our <span className="font-semibold text-amber-600">Repair Process</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">1. Assessment</h3>
              <p className="text-slate-600 text-sm md:text-base">We thoroughly inspect your equipment and provide a detailed repair estimate.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">2. Expert Repair</h3>
              <p className="text-slate-600 text-sm md:text-base">Our certified technicians perform professional repairs using quality parts.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">3. Quality Check</h3>
              <p className="text-slate-600 text-sm md:text-base">Every repair is tested and guaranteed to meet professional standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Bottom CTA - mobile responsive */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 md:mb-6">
            Need Expert <span className="text-amber-400 font-semibold">Repair Service?</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-6 md:mb-10 leading-relaxed">
            Our repair specialists are ready to restore your equipment to championship performance. 
            Contact us today for a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <a
              href="mailto:rparker241@gmail.com"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-amber-500/25 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email for Quote</span>
            </a>
            <a
              href="tel:+15124969022"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call for Service</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}