// sections/SocialMediaSection.js
export default function SocialMediaSection() {
  const instagramImages = [
    "images/TFACoachStudent.jpg",
    "images/MedalsVictories.jpg",
    "images/ParisOlympicsChampionship.jpg",
    "images/FencingStudents.jpg",
  ];

  // Function to handle Instagram redirect
  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/texasfencingacademy/', '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-primary-50 relative overflow-hidden">
      {/* Enhanced Background patterns with fencing aesthetics */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-400/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-900/5 rounded-full animate-pulse-slow delay-1000"></div>
        
        {/* Subtle sword blade patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent"></div>
          <div className="absolute top-1/4 left-1/3 w-px h-64 bg-gradient-to-b from-transparent via-accent-300 to-transparent transform rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/3 w-px h-64 bg-gradient-to-b from-transparent via-primary-300 to-transparent transform -rotate-12"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Enhanced Section Header */}
        <div className="mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8 animate-fade-in">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-accent-500 animate-slide-up"></div>
            <div className="relative">
              <span className="text-sm font-semibold text-accent-600 tracking-[0.3em] relative z-10">CONNECT</span>
              <div className="absolute inset-0 bg-accent-50 rounded-full scale-150 opacity-50 animate-pulse-slow"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-accent-500 animate-slide-up"></div>
          </div>
          
          <h2 className="text-display font-light text-primary-900 mb-6 animate-slide-up">
            Follow Our 
            <span className="font-semibold text-accent-600 inline-block hover:scale-105 transition-transform duration-300">Journey</span>
          </h2>
          
          <p className="text-xl text-primary-600 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in">
            Stay connected with our community's latest achievements, 
            training highlights, and championship moments
          </p>
        </div>

        {/* Enhanced Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {instagramImages.map((src, index) => (
            <div
              key={index}
              className="group relative cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={handleInstagramClick}
            >
              {/* Enhanced card container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50 p-1.5 transition-all duration-500 group-hover:p-0 group-hover:shadow-elegant">
                <div className="w-full h-full rounded-xl overflow-hidden shadow-md transition-all duration-500">
                  <img
                    src={src}
                    alt={`Championship moment ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    loading="lazy"
                  />
                  
                  {/* Enhanced overlay with Instagram branding */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="text-white text-sm font-medium mb-1">View on Instagram</p>
                          <div className="flex items-center justify-center space-x-1 text-accent-300">
                            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-light">TFA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection border effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-200 to-accent-200 opacity-0 group-hover:opacity-50 transition-all duration-500" style={{ zIndex: -1 }}></div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        {/* Call to action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-slate-50 to-amber-50 rounded-full border border-slate-200/50">
            <div className="flex items-center space-x-2 text-slate-600">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">EXPLORE MORE</span>
            </div>
            <a
              href="https://www.instagram.com/texasfencingacademy/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-6 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-all duration-300 hover:shadow-lg"
            >
              <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="group-hover:text-amber-400 transition-colors duration-300">
                FOLLOW US
              </span>
            </a>
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex items-center justify-center space-x-3 opacity-60">
          <div className="w-12 h-px bg-accent-500"></div>
          <div className="w-3 h-3 border-2 border-accent-500 rounded-full rotate-45">
            <div className="w-1 h-1 bg-accent-500 rounded-full m-auto mt-0.5"></div>
          </div>
          <span className="text-sm text-primary-500 font-light tracking-wider">TEXAS FENCING ACADEMY</span>
          <div className="w-3 h-3 border-2 border-accent-500 rounded-full rotate-45">
            <div className="w-1 h-1 bg-accent-500 rounded-full m-auto mt-0.5"></div>
          </div>
          <div className="w-12 h-px bg-accent-500"></div>
        </div>
      </div>
    </section>
  );
}

