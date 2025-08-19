import React, { useEffect, useState } from 'react';
import { sanityClient } from '../Sanity/sanityClient';
import { urlFor } from '../Sanity/imageBuilder';
import { REGISTRATION_SECTION_QUERY } from '../Sanity/queries';

export default function RegistrationSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    sanityClient.fetch(REGISTRATION_SECTION_QUERY).then(fetchedData => {
      setData(fetchedData);
    }).catch(console.error);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <section id="registration-section" className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Elegant background patterns with subtle animations */}
      <div className="absolute inset-0 pointer-events-none">
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
        {/* Header with subtle hover accent - Mobile optimized */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 group">
            <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600 animate-fade-in"></div>
            <div className="w-8 sm:w-12 h-8 sm:h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              {/* Enhanced logo with subtle shadows and rounding */}
              <div className="rounded-full overflow-hidden ring-1 sm:ring-2 ring-amber-500 shadow-xl group-hover:ring-amber-600 transition-all duration-400 bg-gradient-to-br from-amber-50/60 to-slate-100/40 hover:scale-105 hover:shadow-amber-400/50">
                <img
                  src={urlFor(data.header.logo.asset).url()}
                  alt={data.header.logo.alt}
                  className="w-6 sm:w-10 h-6 sm:h-10 object-contain rounded-full transition-all duration-700 hover:scale-110"
                  style={{ borderRadius: '9999px', boxShadow: '0 2px 24px 0px rgba(255,200,80,0.13)' }}
                  onError={e => {
                    e.target.style.display = "none";
                    if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = "block";
                  }}
                />
                {/* Minimal SVG fallback */}
                <div
                  className="w-6 sm:w-10 h-6 sm:h-10 flex items-center justify-center hidden"
                  style={{ display: "none" }}
                >
                  <svg
                    className="w-4 sm:w-8 h-4 sm:h-8 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <ellipse cx="12" cy="12" rx="8" ry="9" className="fill-amber-100" />
                    <path d="M12 2L13.09 8.26L19 7L17.91 13.26L22 15L16.91 17.74L17 24L12 19L7 24L7.09 17.74L2 15L6.09 13.26L5 7L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-8 sm:w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600 animate-fade-in"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight px-4">
            {data.header.mainHeading.prefix} {' '}
            <span className="font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">
              {data.header.mainHeading.highlight}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
            {data.header.subtitle}
          </p>
        </div>

        {/* Main content card - Mobile optimized layout */}
        <div className="relative">
          <div className="bg-white/90 backdrop-blur-2xl rounded-xl sm:rounded-2xl shadow-xl border border-slate-200/70 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Content: Key features with hover - Mobile optimized */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-16">
                <div className="space-y-8 sm:space-y-10">
                  {/* Platform Showcase with enhanced logo - Mobile responsive */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8">
                    {/* Polished logo with animated border glow */}
                    <div
                      className="flex-shrink-0 relative group mx-auto sm:mx-0"
                      style={{ filter: 'drop-shadow(0 2px 18px rgba(255,196,60,0.11))' }}
                    >
                      <div className="rounded-full overflow-hidden ring-2 sm:ring-4 ring-amber-200 shadow-2xl transition-all duration-500 group-hover:ring-amber-400 group-hover:scale-105">
                        <img
                          src={urlFor(data.platformShowcase.logo.asset).url()}
                          alt={data.platformShowcase.logo.alt}
                          className="w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 object-contain rounded-full transition-all duration-700 hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2 sm:mb-3">
                        {data.platformShowcase.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                        {data.platformShowcase.description}
                      </p>
                    </div>
                  </div>

                  {/* Features Grid with hover - Mobile optimized */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {data.features.map((feature, index) => (
                      <div
                        key={index}
                        className="group p-4 sm:p-5 rounded-lg sm:rounded-xl border border-slate-200/50 bg-slate-50/60 shadow-sm hover:shadow-lg flex space-x-3 sm:space-x-4 items-center cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{ borderColor: `rgba(16,185,129,0.14)` }}
                      >
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-900 text-sm sm:text-base">{feature.title}</div>
                          <div className="text-xs sm:text-sm text-slate-600">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats - Mobile optimized */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-slate-100">
                    {data.statistics.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl sm:text-3xl font-light text-slate-900 mb-1 group-hover:text-amber-600 transition-colors duration-300">
                          {stat.number}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 font-light tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content: Access Portal - Mobile optimized */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 lg:p-16 text-white flex flex-col items-center justify-center">
                <div className="text-center mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 tracking-wide">{data.accessPortal.title}</h4>
                  <p className="text-slate-300 text-xs sm:text-sm font-light">{data.accessPortal.subtitle}</p>
                </div>

                {/* QR Code with hover effect - Mobile responsive */}
                <div className="relative mb-6 sm:mb-10 group">
                  <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-slate-200 group-hover:border-amber-400 transition duration-300">
                    <img
                      src={urlFor(data.accessPortal.qrCode.asset).url()}
                      alt={data.accessPortal.qrCode.alt}
                      className="w-24 sm:w-28 lg:w-32 h-24 sm:h-28 lg:h-32 object-contain mx-auto group-hover:scale-105 transition-all duration-400"
                    />
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-lg sm:rounded-xl group-hover:ring-4 group-hover:ring-amber-400/40 transition"></div>
                </div>

                {/* Portal Button with animation - Mobile optimized */}
                <a
                  href={data.accessPortal.ctaButton.url}
                  target={data.accessPortal.ctaButton.openInNewTab ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-amber-500/25 flex items-center justify-center text-sm sm:text-base"
                >
                  <span className="flex items-center">
                    {data.accessPortal.ctaButton.text}
                    <svg className="ml-2 sm:ml-3 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>

                <p className="text-center text-xs text-slate-400 mt-3 leading-relaxed px-2">{data.accessPortal.disclaimer}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote - Mobile optimized */}
        <div className="text-center mt-12 sm:mt-20 px-4">
          <blockquote className="text-slate-600 italic text-base sm:text-lg max-w-2xl mx-auto mb-4 transition-colors duration-300 hover:text-amber-600">
            "{data.bottomQuote.quote}"
          </blockquote>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3">
            <div className="w-8 sm:w-12 h-px bg-amber-500"></div>
            <span className="text-xs sm:text-sm text-slate-500 font-light tracking-wider">{data.bottomQuote.attribution}</span>
            <div className="w-8 sm:w-12 h-px bg-amber-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
