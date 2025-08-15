import { useEffect, useState } from "react";
import {sanityClient} from "../Sanity/sanityClient";

function InfoBanner() {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "infoBanner" && showBanner == true][0]`)
      .then((data) => {
        setBannerData(data);
      })
      .catch((error) => {
        console.error("Error fetching InfoBanner data:", error);
      });
  }, []);

  // Optional: Loading state
  if (!bannerData) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle sword blade pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transform skew-x-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between sm:justify-center">
          
          {/* Mobile Layout - Compact Horizontal */}
          <div className="flex sm:hidden items-center justify-between w-full">
            {/* Left side - Pulse + Info */}
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                <div className="absolute inset-0 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-light text-slate-300 tracking-wide truncate">
                  {bannerData.orientationTitle}
                </div>
                <div className="text-xs font-semibold text-white tracking-wider truncate">
                  {bannerData.orientationDate}
                </div>
              </div>
            </div>
            
            {/* Right side - CTA Button */}
            <a
              href={bannerData.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-xs font-semibold rounded hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg flex-shrink-0"
            >
              {bannerData.ctaText}
            </a>
          </div>

          {/* Desktop Layout - Horizontal */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
            {/* Elegant pulse indicator */}
            <div className="relative">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute inset-0 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>
            </div>

            <div className="flex items-center space-x-4 lg:space-x-6">
              <span className="text-sm font-light text-slate-300 tracking-wide">
                {bannerData.orientationTitle}
              </span>
              <div className="h-4 w-px bg-amber-400/50"></div>
              <span className="text-sm font-semibold text-white tracking-wider">
                {bannerData.orientationDate}
              </span>
            </div>

            <a
              href={bannerData.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 lg:ml-6 px-4 lg:px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-sm font-semibold rounded-md hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {bannerData.ctaText}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoBanner;
