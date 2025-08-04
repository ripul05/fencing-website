export default function AboutSection() {
  return (
    <section id="about-section" className="py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
      {/* Unified Background elements - matching GallerySection */}
      <div className="absolute inset-0">
        {/* Gradient orbs - same positioning and styling as gallery */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-900/5 rounded-full"></div>
        
        {/* Subtle geometric patterns inspired by fencing - unified with gallery */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-px h-96 bg-gradient-to-b from-transparent via-amber-400 to-transparent transform rotate-12 animate-fade-in"></div>
          <div className="absolute bottom-1/4 right-1/4 w-px h-96 bg-gradient-to-b from-transparent via-slate-400 to-transparent transform -rotate-12 animate-fade-in delay-500"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-fade-in delay-300"></div>
        </div>
        
        {/* Floating decorative elements - matching gallery positions */}
        <div className="absolute top-32 right-32 w-4 h-4 border border-amber-200 rounded-full animate-pulse-slow delay-700"></div>
        <div className="absolute bottom-40 left-40 w-6 h-6 border border-slate-200 rounded-full animate-pulse-slow delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Side - Enhanced with animations */}
          <div className="space-y-10">
            {/* Animated section header */}
            <div className="space-y-8 animate-slide-up">
              <div className="flex items-center space-x-4 group">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
                <div className="relative">
                  <span className="text-sm font-semibold text-amber-600 tracking-[0.3em] relative z-10">OUR PHILOSOPHY</span>
                  <div className="absolute inset-0 bg-amber-50 rounded-full scale-150 opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                </div>
              </div>
              
              <h2 className="text-display font-light text-slate-900 leading-tight animate-slide-up delay-200">
                We Forge 
                <span className="block font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">Champions</span>
              </h2>
            </div>

            {/* Enhanced content with staggered animations */}
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <p className="text-lg font-light animate-fade-in delay-400 hover:text-slate-700 transition-colors duration-300">
                Fencing transcends mere <em className="text-amber-600 font-medium">sword fighting</em>. It's a discipline that demands 
                precision, strategy, and unwavering mental focus—qualities that forge character 
                both on and off the strip.
              </p>

              <p className="animate-fade-in delay-600 hover:text-slate-700 transition-colors duration-300">
                Our approach cultivates controlled aggression and tactical thinking. While fencing 
                isn't for everyone, those who embrace it discover an unparalleled passion. 
                There are no indifferent fencers—only dedicated athletes pursuing excellence.
              </p>

              <p className="animate-fade-in delay-700 hover:text-slate-700 transition-colors duration-300">
                Though individual in competition, fencing thrives on community. At TFA, 
                we build champions through collective support, shared knowledge, and 
                mutual encouragement during training and tournaments.
              </p>

              {/* Enhanced blockquote with sophisticated styling */}
              <blockquote className="relative group animate-fade-in delay-800">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-50 to-slate-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative border-l-4 border-amber-500 pl-8 py-6 bg-gradient-to-r from-slate-50/50 to-transparent rounded-r-xl group-hover:shadow-md transition-all duration-500">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="italic text-slate-700 font-light leading-relaxed mb-2">
                        "Fencing rewards speed and agility over size and strength, making it 
                        particularly empowering for athletes who value technique over brute force."
                      </p>
                      <div className="flex items-center space-x-2 text-amber-600">
                        <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                        <span className="text-xs font-medium tracking-wider">COACHING PHILOSOPHY</span>
                      </div>
                    </div>
                  </div>
                </div>
              </blockquote>
            </div>

            {/* Enhanced CTA with sophisticated styling */}
            <div className="pt-10 animate-slide-up delay-1000">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-slate-600 rounded-lg opacity-20 blur group-hover:opacity-40 transition-opacity duration-500"></div>
                <a
                  href="https://texasfencingacademy.org/?page_id=881"
                  className="relative group inline-flex items-center px-10 py-4 bg-slate-900 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elegant hover:shadow-slate-900/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="relative z-10 group-hover:text-slate-900 transition-colors duration-500 tracking-wide">
                    DISCOVER OUR PROGRAMS
                  </span>
                  
                  <svg className="relative z-10 ml-4 w-5 h-5 group-hover:translate-x-2 group-hover:text-slate-900 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <p className="mt-4 text-sm text-slate-500 font-light animate-fade-in delay-1200">
                Explore our comprehensive training programs designed for all skill levels
              </p>
            </div>
          </div>

          {/* Enhanced Video Side with sophisticated frame and animations */}
          <div className="relative animate-fade-in delay-500">
            {/* Multi-layered decorative frame */}
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-100/30 via-transparent to-slate-100/30 rounded-3xl animate-pulse-slow"></div>
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-100/50 via-transparent to-slate-100/50 rounded-2xl"></div>
            
            {/* Main video container */}
            <div className="relative group">
              <div className="relative bg-white rounded-2xl shadow-elegant overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/10">
                <video
                  autoPlay
                  muted
                  loop
                  controls
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                  poster="https://texasfencingacademy.org/wp-content/uploads/2024/03/IMG_4246-scaled.jpeg"
                >
                  <source
                    src="https://texasfencingacademy.org/wp-content/uploads/2020/04/tfaIntro.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                
                {/* Enhanced overlay with better positioning */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-8">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-light leading-relaxed mb-2">
                          Experience the artistry and athleticism of competitive fencing
                        </p>
                        <div className="flex items-center space-x-2 text-amber-300">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium tracking-wider">INTRO VIDEO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play button overlay for better UX */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating stats or badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">35+</div>
                  <div className="text-xs text-slate-600 font-medium">Years Excellence</div>
                </div>
              </div>
            </div>

            {/* Additional decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-2 border-amber-200 rounded-full opacity-30 animate-pulse-slow delay-2000"></div>
            <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-slate-200 rounded-full opacity-30 animate-pulse-slow delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
