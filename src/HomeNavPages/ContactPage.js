import InfoBanner from "../HomePageComponent/InfoBanner";
import Navbar from "../HomePageComponent/Navbar";
import FooterSection from "../Sections/FooterSection";
// ContactInfo Component - Elegant & Modern with Hover Animations
const ContactInfo = () => {
  // Function to handle email click - Universal approach
  const handleEmailClick = () => {
    const email = 'ray@texasfencingacademy.com';
    const subject = 'Contact from Texas Fencing Academy Website';
    const body = 'Hello, I would like to get in touch regarding fencing programs.';
    
    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     window.innerWidth <= 768;
    
    if (isMobile) {
      // Mobile: Use mailto (opens default email app)
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      // Desktop: Open Gmail in new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
    }
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+15124969022"; // Updated to correct number
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Email */}
      <div
        onClick={handleEmailClick}
        className="group relative p-4 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden bg-white/5 hover:bg-white/15"
      >
        <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/10 group-hover:via-amber-100/15 group-hover:to-amber-50/10 transition-all duration-500 rounded-lg"></div>

        <div className="relative flex items-center">
          <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500/30 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
            <svg
              className="w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-semibold text-gray-800 text-sm group-hover:text-amber-800 transition-colors duration-300">
              Email Us
            </h4>
            <p className="text-amber-700 font-medium group-hover:text-amber-800 transition-colors duration-300">
              ray@texasfencingacademy.com
            </p>
            <p className="text-gray-500 text-xs mt-1 opacity-80 group-hover:opacity-100 group-hover:text-amber-600 transition-all duration-300">
              Click to send email
            </p>
          </div>

          <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="w-5 h-5 text-amber-600 group-hover:text-amber-700">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div
        onClick={handlePhoneClick}
        className="group relative p-4 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden bg-white/5 hover:bg-white/15"
      >
        <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/10 group-hover:via-amber-100/15 group-hover:to-amber-50/10 transition-all duration-500 rounded-lg"></div>

        <div className="relative flex items-center">
          <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 group-hover:bg-amber-500/30 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
            <svg
              className="w-5 h-5 text-amber-600 group-hover:text-amber-700 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div className="group-hover:translate-x-1 transition-transform duration-300">
            <h4 className="font-semibold text-gray-800 text-sm group-hover:text-amber-800 transition-colors duration-300">
              Call Us
            </h4>
            <p className="text-amber-700 font-medium group-hover:text-amber-800 transition-colors duration-300">
              (512) 496-9022
            </p>
            <p className="text-gray-500 text-xs mt-1 opacity-80 group-hover:opacity-100 group-hover:text-amber-600 transition-all duration-300">
              Click to call
            </p>
          </div>

          <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <div className="w-5 h-5 text-amber-600 group-hover:text-amber-700">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Hours */}
      <div className="p-4 rounded-lg bg-white/5 flex-grow">
        <div className="flex items-start h-full">
          <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center mr-3">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="flex-grow">
            <h4 className="font-semibold text-gray-800 text-sm mb-3">
              Academy Hours
            </h4>
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                <span className="font-medium">Monday - Thursday:</span> 6:00 PM - 9:00 PM
              </p>
              <p>
                <span className="font-medium">Saturday:</span> 9:00 AM - 1:00 PM
              </p>
              <p>
                <span className="font-medium">Friday & Sunday:</span> Closed
              </p>
            </div>
            <p className="text-amber-700 text-xs mt-3 font-medium">
              Saturday features our beginner classes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReachUs = () => {
  // Function to handle directions - Updated with correct address including suite B
  const handleDirectionsClick = () => {
    window.open(
      "https://maps.google.com/maps/dir//Texas+Fencing+Academy+8227+N+Lamar+Blvd+B+Austin,+TX+78753/@30.3511321,-97.7072096,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x8644cbd24ccaf5c7:0xe2c9b829c2e80ca6",
      "_blank"
    );
  };
  
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center space-x-4 mb-8 group">
          <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
        </div>
        <h3 className="text-3xl font-light text-gray-800 mb-4 tracking-tight">
          Reach <span className="font-semibold text-amber-600">Us</span>
        </h3>
      </div>

      {/* Changed items-stretch to items-center for better alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Enhanced Text content with hover effects */}
        <div className="group flex flex-col justify-center">
          <h4 className="text-2xl font-semibold text-gray-800 mb-8 group-hover:text-amber-700 transition-colors duration-300">
            Visit Our Academy
          </h4>

          <div className="space-y-8">
            <div className="flex items-start group/item hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-6 h-6 text-amber-600 mr-4 mt-1 group-hover/item:scale-110 group-hover/item:text-amber-700 transition-all duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 616 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg mb-2 group-hover/item:text-amber-800 transition-colors duration-300">
                  Address
                </p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">8227 N Lamar Blvd B</p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">Austin, Texas 78753</p>
              </div>
            </div>

            <div className="flex items-start group/item hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-6 h-6 text-amber-600 mr-4 mt-1 group-hover/item:scale-110 group-hover/item:text-amber-700 transition-all duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-6 0H3m2 0h6M9 7h6m-6 4h6m-6 4h6"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg mb-2 group-hover/item:text-amber-800 transition-colors duration-300">
                  Facility Features
                </p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">9,000 square foot academy</p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">
                  Fifteen regulation fencing strips
                </p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">Modern training equipment</p>
              </div>
            </div>

            <div className="flex items-start group/item hover:transform hover:translate-x-2 transition-all duration-300">
              <div className="w-6 h-6 text-amber-600 mr-4 mt-1 group-hover/item:scale-110 group-hover/item:text-amber-700 transition-all duration-300">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4M8 7h8M8 7l-3 9h14l-3-9"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg mb-2 group-hover/item:text-amber-800 transition-colors duration-300">
                  Parking & Access
                </p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">Free parking available</p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">
                  Convenient North Austin location
                </p>
                <p className="text-gray-700 group-hover/item:text-gray-800 transition-colors duration-300">
                  Public transportation nearby
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDirectionsClick}
            className="mt-10 bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-amber-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group/button"
          >
            <span className="flex items-center">
              Get Directions
              <svg className="w-4 h-4 ml-2 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Right side - Centered Map Container */}
        <div className="group/map relative flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl border border-white/40 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:bg-white/30 transition-all duration-500 relative w-full max-w-lg">
            
            {/* Modern Map Container */}
            <div className="relative h-96 overflow-hidden">
              {/* Cool gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-amber-500/10 opacity-0 group-hover/map:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
              
              {/* Floating corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/20 rounded-full backdrop-blur-md border border-amber-300/30 opacity-0 group-hover/map:opacity-100 transition-all duration-500 z-20 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 616 0z" />
                </svg>
              </div>

              {/* Enhanced iframe with modern filters */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.8461!2d-97.7072096!3d30.3511321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cbd24ccaf5c7%3A0xe2c9b829c2e80ca6!2sTexas%20Fencing%20Academy!5e0!3m2!1sen!2sus!4v1699123456789!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Texas Fencing Academy Location"
                className="group-hover/map:contrast-110 group-hover/map:saturate-120 group-hover/map:brightness-105 transition-all duration-700 transform group-hover/map:scale-105"
              ></iframe>

              {/* Repositioned floating action button - moved to left side */}
              <div className="absolute bottom-6 left-6 opacity-0 group-hover/map:opacity-100 transition-all duration-500 delay-200 z-30">
                <button
                  onClick={handleDirectionsClick}
                  className="bg-amber-600/90 hover:bg-amber-700 text-white p-3 rounded-full shadow-xl backdrop-blur-sm border border-amber-400/30 hover:scale-110 transition-all duration-300 group/mapbtn"
                >
                  <svg className="w-5 h-5 group-hover/mapbtn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Repositioned minimalist info - now on right side only */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover/map:opacity-100 transition-all duration-500 z-30">
              <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm">
                <div className="flex items-center mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-medium">Mon-Thu: 6-9 PM</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-xs">Free Parking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle decorative elements */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full opacity-40 group-hover/map:opacity-70 group-hover/map:scale-150 transition-all duration-700"></div>
          <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-amber-300 rounded-full opacity-20 group-hover/map:opacity-50 group-hover/map:scale-125 transition-all duration-700"></div>
        </div>
      </div>
    </section>
  );
};


const ContactPage = () => {
  // Function to handle email click
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
      <InfoBanner/>
      <Navbar/>
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* Main Centered Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Contact <span className="font-semibold text-amber-600">Us</span>
          </h2>
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-gray-700">
            Texas Fencing Academy
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Where tradition meets excellence in the art of fencing
          </p>
        </div>

        {/* REDESIGNED: Unified Contact & Academy Section with Equal Heights */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 p-8 lg:p-12 mb-20 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {/* Left Column - Academy Information */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  About Our Academy
                </h3>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed flex-grow">
                <p>
                  Founded in <strong className="text-amber-600 italic">1989</strong> by Coach Ray, along with founding board members John Baird and Vincent (Vinnie) Bradford, Texas Fencing
                  Academy has proudly served the Austin community for over{" "}
                  <strong className="text-amber-600 italic">36 years</strong>. We are a specialized two-weapon
                  academy focusing on <strong className="text-amber-600 italic">épée and saber</strong>, offering
                  comprehensive fencing programs for all ages and skill levels.
                </p>

                <p>
                  Our <strong className="text-amber-600 italic">9,000-square-foot</strong> state-of-the-art
                  facility features <strong className="text-amber-600 italic">15 grounded electric strips</strong>
                  , providing ample space for both training and competition. We
                  have successfully trained fencers who have gone on to compete
                  at NCAA programs in institutions like Stanford, Columbia, UNC,
                  Duke, Temple, Penn State, Wesleyan, and the Air Force
                  Academy—many achieving All-American status.
                </p>

                <p>
                  At TFA, we believe that{" "}
                  <strong className="text-amber-600 italic">
                    fencing develops and encourages the spirit of healthy
                    rivalry and competition, teaching emotional control,
                    courage, and self-discipline
                  </strong>
                  . Our philosophy centers on helping students excel not only in
                  sport but also in life through the values and ethics instilled
                  through fencing.
                </p>

                <p>
                  We foster a strong sense of <strong className="text-amber-600 italic">team and family</strong>,
                  so all of our fencers represent TFA as their primary club.
                  When the club attends tournaments, coaches and students
                  support each other as part of the TFA team.
                </p>

                <p>
                  Our experienced coaching staff, led by Coach Ray, brings
                  decades of competitive experience and pedagogical expertise.
                  We provide individualized attention to help each fencer reach
                  their personal goals, whether that's recreational enjoyment,
                  collegiate competition, or international-level excellence.
                </p>

                <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-200/30 mt-6">
                  <p className="text-amber-800 font-medium text-sm">
                    <strong className="text-amber-600 italic">Our Mission:</strong> We make champions through
                    world-class training systems that develop physical
                    conditioning, fencing skills, sportsmanship, self-control,
                    confidence, and strategic thinking.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Information with Equal Height */}
            <div className="lg:border-l lg:border-white/30 lg:pl-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center mr-2">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  </div>
                  Get in Touch
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  Ready to begin your fencing journey? We welcome inquiries from
                  prospective students and parents.
                </p>
              </div>

              <div className="flex-grow">
                <ContactInfo />
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() =>
                    window.open(
                      "https://texasfencingacademy.glide.page",
                      "_blank"
                    )
                  }
                  className="w-full bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-amber-700 transition-all duration-300 text-sm"
                >
                  Schedule Trial Lesson
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Original Reach Us Section */}
        <ReachUs />
        {/* Footer */}
        <footer className="text-center mt-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <p className="text-lg text-gray-600 italic">
            We look forward to welcoming you to the Texas Fencing Academy
            family.
          </p>
        </footer>
      </div>
      <FooterSection />
    </div>
  );
};



export default ContactPage;
