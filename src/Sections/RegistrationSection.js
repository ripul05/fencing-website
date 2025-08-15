export default function RegistrationSection() {
  return (
    <section id = "registration-section" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header with subtle hover accent */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600 animate-fade-in"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              {/* Enhanced logo with subtle shadows and rounding */}
              <div className="rounded-full overflow-hidden ring-2 ring-amber-500 shadow-xl group-hover:ring-amber-600 transition-all duration-400 bg-gradient-to-br from-amber-50/60 to-slate-100/40 hover:scale-105 hover:shadow-amber-400/50">
                <img
                  src="/images/TFALogo.jpeg"
                  alt="TFA Pro Platform"
                  className="w-10 h-10 object-contain rounded-full transition-all duration-700 hover:scale-110"
                  style={{ borderRadius: '9999px', boxShadow: '0 2px 24px 0px rgba(255,200,80,0.13)' }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "block";
                  }}
                />
                {/* Minimal SVG fallback */}
                <div
                  className="w-10 h-10 flex items-center justify-center hidden"
                  style={{ display: "none" }}
                >
                  <svg
                    className="w-8 h-8 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <ellipse cx="12" cy="12" rx="8" ry="9" className="fill-amber-100"/>
                    <path d="M12 2L13.09 8.26L19 7L17.91 13.26L22 15L16.91 17.74L17 24L12 19L7 24L7.09 17.74L2 15L6.09 13.26L5 7L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600 animate-fade-in"></div>
          </div>

          <h2 className="text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Begin Your{" "}
            <span className="font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Join an elite community where precision meets passion, and every lesson shapes the champion within you.
          </p>
        </div>

        {/* Main content card */}
        <div className="relative">
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-200/70 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Content: Key features with hover */}
              <div className="lg:col-span-3 p-12 lg:p-16">
                <div className="space-y-10">
                  {/* Platform Showcase with enhanced logo */}
                  <div className="flex items-start space-x-8">
                    {/* Polished logo with animated border glow */}
                    <div
                      className="flex-shrink-0 relative group"
                      style={{ filter: 'drop-shadow(0 2px 18px rgba(255,196,60,0.11))' }}
                    >
                      <div className="rounded-full overflow-hidden ring-4 ring-amber-200 shadow-2xl transition-all duration-500 group-hover:ring-amber-400 group-hover:scale-105">
                        <img
                          src="/images/TFALogo.jpeg"
                          alt="TFA Pro Platform"
                          className="w-28 h-28 object-contain rounded-full transition-all duration-700 hover:scale-110"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                        TFA Pro Experience
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        Revolutionary platform combining seamless registration, personalized training insights, and direct access to world-class instruction.
                      </p>
                    </div>
                  </div>

                  {/* Features Grid with hover */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { color: "emerald", title: "Instant Enrollment", desc: "Begin within minutes" },
                      { color: "blue", title: "Progress Tracking", desc: "Monitor development" },
                      { color: "purple", title: "Expert Coaching", desc: "Championship instruction" },
                      { color: "amber", title: "Flexible Scheduling", desc: "Train your way" },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className={`
                          group p-5 rounded-xl border border-slate-200/50 bg-slate-50/60 shadow-sm hover:shadow-lg
                          flex space-x-4 items-center cursor-pointer transition-all duration-300
                          hover:scale-105 hover:border-${feature.color}-400/70
                        `}
                        style={{
                          borderColor: `rgba(16,185,129,0.14)`, // Minor color accent
                        }}
                      >
                        <div className={`w-4 h-4 rounded-full bg-${feature.color}-400/90 shadow-md group-hover:scale-125 transition-transform duration-300`}></div>
                        <div>
                          <div className="font-semibold text-slate-900">{feature.title}</div>
                          <div className="text-sm text-slate-600">{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                    {[
                      { number: "500+", label: "Active Members" },
                      { number: "15+", label: "Expert Coaches" },
                      { number: "35+", label: "Years Legacy" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-light text-slate-900 mb-1 group-hover:text-amber-600 transition-colors duration-300">
                          {stat.number}
                        </div>
                        <div className="text-sm text-slate-600 font-light tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Content: Access Portal */}
              <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-12 lg:p-16 text-white flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-semibold mb-2 tracking-wide">Quick Access Portal</h4>
                  <p className="text-slate-300 text-sm font-light">Scan or tap to enter the TFA universe</p>
                </div>
                {/* QR Code with hover effect */}
                <div className="relative mb-10 group">
                  <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-slate-200 group-hover:border-amber-400 transition duration-300">
                    <img
                      src="https://texasfencingacademy.org/wp-content/uploads/2025/05/TFA-Pro-v2-qrcode_v3.jpg"
                      alt="TFA Pro QR Code"
                      className="w-32 h-32 object-contain mx-auto group-hover:scale-105 transition-all duration-400"
                    />
                  </div>
                  <div className="absolute inset-0 pointer-events-none rounded-xl group-hover:ring-4 group-hover:ring-amber-400/40 transition"></div>
                </div>
                {/* Portal Button with animation */}
                <a
                  href="https://texasfencingacademy.glide.page/dl/17171d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-amber-500/25 flex items-center justify-center"
                >
                  <span className="flex items-center">
                    START YOUR JOURNEY
                    <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
                <p className="text-center text-xs text-slate-400 mt-3 leading-relaxed">No app download required • Instant access to our community</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="text-center mt-20">
          <blockquote className="text-slate-600 italic text-lg max-w-2xl mx-auto mb-4 transition-colors duration-300 hover:text-amber-600">
            "Excellence isn't a destination, it's a way of traveling. Begin your journey with purpose and precision."
          </blockquote>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-px bg-amber-500"></div>
            <span className="text-sm text-slate-500 font-light tracking-wider">TEXAS FENCING ACADEMY</span>
            <div className="w-12 h-px bg-amber-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
