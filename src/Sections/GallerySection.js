import { useEffect, useState, useRef } from 'react';
import { sanityClient } from '../Sanity/sanityClient';
import { urlFor } from '../Sanity/imageBuilder';
import { LANDING_PAGE_GALLERY_SECTION_QUERY } from '../Sanity/queries';

export default function GallerySection() {
  const [data, setData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    sanityClient.fetch(LANDING_PAGE_GALLERY_SECTION_QUERY)
      .then(fetchedData => setData(fetchedData))
      .catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  // Map WebP and JPG URLs for gallery images
  const galleryImages = data.galleryImages.map(img => ({
    webp: urlFor(img.src.asset).format('webp').url(),
    jpg: urlFor(img.src.asset).format('jpg').url(),
    alt: img.alt
  }));

  // Navigation functions
  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1);
  };

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  // Touch handlers for swipe functionality[23][33]
  const handleTouchStart = (e) => {
    setTouchEnd(null); // prevent swipe if touch hasn't ended
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    // Swipe threshold of 50px to prevent accidental swipes[33]
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <section className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
      {/* Unified Background elements */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 animate-fade-in group">
            <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
            <div className="relative">
              <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-[0.2em] sm:tracking-[0.3em] relative z-10">{data.header.label}</span>
              <div className="absolute inset-0 bg-amber-50 rounded-full scale-150 opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
            </div>
            <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 animate-slide-up tracking-tight">
            {data.header.headingPrefix} 
            <span className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300">
              {data.header.headingHighlight}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in px-4">
            {data.header.subtitle}
          </p>
        </div>

        {/* Carousel with Swipe Support */}
        <div className="relative max-w-6xl mx-auto mb-12 sm:mb-20">
          <div className="relative group">
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-amber-100/50 via-transparent to-slate-100/50 rounded-2xl sm:rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div 
              ref={carouselRef}
              className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden shadow-elegant bg-gradient-to-br from-slate-100 to-amber-50 cursor-grab active:cursor-grabbing select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-x' }} // Allow horizontal panning only[28]
            >
              <picture>
                <source srcSet={galleryImages[currentImageIndex].webp} type="image/webp" />
                <img
                  src={galleryImages[currentImageIndex].jpg}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 select-none"
                  draggable={false} // Prevent default drag behavior[33]
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-2 sm:bottom-4 lg:bottom-8 left-2 sm:left-4 lg:left-8 right-2 sm:right-4 lg:right-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20">
                    <p className="text-white text-sm sm:text-base lg:text-lg font-light mb-1 sm:mb-2 line-clamp-2">
                      {galleryImages[currentImageIndex].alt}
                    </p>
                    <div className="flex items-center space-x-2 text-amber-300">
                      <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-xs sm:text-sm font-medium">TEXAS FENCING ACADEMY</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-70 sm:opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Swipe Indicator for Mobile */}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 sm:mt-10 space-x-2 sm:space-x-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative transition-all duration-500 ${
                  currentImageIndex === index
                    ? "w-8 sm:w-12 h-2 sm:h-3"
                    : "w-2 sm:w-3 h-2 sm:h-3 hover:w-4 sm:hover:w-6"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-500 ${
                    currentImageIndex === index
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            >
              <div className="relative aspect-square rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50 p-0.5 sm:p-1 transition-all duration-500 group-hover:p-0">
                <div className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden shadow-md group-hover:shadow-elegant transition-all duration-500">
                  <picture>
                    <source srcSet={image.webp} type="image/webp" />
                    <img
                      src={image.jpg}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 select-none"
                      draggable={false}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 lg:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-2 sm:p-3 lg:p-4 border border-white/20">
                        <p className="text-white text-xs sm:text-sm font-light mb-1 sm:mb-2 line-clamp-2">
                          {image.alt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 sm:space-x-2 text-amber-300">
                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium hidden sm:inline">VIEW FULL SIZE</span>
                            <span className="text-xs font-medium sm:hidden">VIEW</span>
                          </div>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {currentImageIndex === index && (
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 bg-amber-400 rounded-full animate-pulse shadow-glow"></div>
                  )}
                </div>
              </div>
              <div
                className={`absolute -inset-0.5 sm:-inset-1 rounded-lg sm:rounded-xl lg:rounded-2xl transition-all duration-500 ${
                  currentImageIndex === index
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