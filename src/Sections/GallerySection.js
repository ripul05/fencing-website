// sections/GallerySection.js
export default function GallerySection({ galleryImages, currentImageIndex, setCurrentImageIndex }) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
      {/* Unified Background elements - matching AboutSection and RegistrationSection */}
      <div className="absolute inset-0">
        {/* Gradient orbs - same positioning and styling */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-900/5 rounded-full"></div>
        
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
        </div>
        
        {/* Floating decorative elements - matching positions */}
        <div className="absolute top-32 right-32 w-4 h-4 border border-amber-200 rounded-full animate-pulse-slow delay-700"></div>
        <div className="absolute bottom-40 left-40 w-6 h-6 border border-slate-200 rounded-full animate-pulse-slow delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Enhanced Section Header - unified styling */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8 animate-fade-in group">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
            <div className="relative">
              <span className="text-sm font-semibold text-amber-600 tracking-[0.3em] relative z-10">GALLERY</span>
              <div className="absolute inset-0 bg-amber-50 rounded-full scale-150 opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
          </div>
          
          <h2 className="text-5xl font-light text-slate-900 mb-6 animate-slide-up tracking-tight">
            Excellence in 
            <span className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300"> Motion</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in">
            Witness the precision, dedication, and artistry that defines 
            our championship-caliber training environment
          </p>
        </div>

        {/* Enhanced Featured Carousel */}
        <div className="relative max-w-6xl mx-auto mb-20">
          <div className="relative group">
            {/* Decorative frame */}
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/50 via-transparent to-slate-100/50 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-elegant bg-gradient-to-br from-slate-100 to-amber-50">
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              
              {/* Enhanced overlay with better gradient */}
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
                onClick={() => setCurrentImageIndex(currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentImageIndex(currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Navigation dots */}
          <div className="flex justify-center mt-10 space-x-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative transition-all duration-500 ${
                  currentImageIndex === index
                    ? "w-12 h-3"
                    : "w-3 h-3 hover:w-6"
                }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  currentImageIndex === index
                    ? "bg-amber-500 shadow-glow"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}></div>
                {currentImageIndex === index && (
                  <div className="absolute inset-0 bg-amber-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Thumbnail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            >
              {/* Card container with enhanced styling */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50 p-1 transition-all duration-500 group-hover:p-0">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-md group-hover:shadow-elegant transition-all duration-500">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  
                  {/* Enhanced hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                        <p className="text-white text-sm font-light mb-2 line-clamp-2">
                          {image.alt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-amber-300">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">VIEW FULL SIZE</span>
                          </div>
                          <svg className="w-4 h-4 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active indicator */}
                  {currentImageIndex === index && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-glow"></div>
                  )}
                </div>
              </div>

              {/* Enhanced selection indicator */}
              <div className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${
                currentImageIndex === index
                  ? "bg-gradient-to-r from-amber-400 to-amber-600 opacity-100"
                  : "bg-gradient-to-r from-slate-200 to-amber-200 opacity-0 group-hover:opacity-50"
              }`} style={{ zIndex: -1 }}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
