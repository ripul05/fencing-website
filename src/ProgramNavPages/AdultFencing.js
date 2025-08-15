import { useState, useEffect } from 'react'
import Navbar from '../HomePageComponent/Navbar'
import InfoBanner from '../HomePageComponent/InfoBanner'
import FooterSection from '../Sections/FooterSection'

function AdultFencingHeroSection() {
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
      isResizing ? 'no-animations' : ''
    }`}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/adultFencing/AdultFencingBg.jpg"
          alt="Adult Fencing at Texas Fencing Academy"
          className="w-full h-full object-cover object-center animate-fade-in will-change-transform-opacity"
          fetchPriority="high"
          decoding="async"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
      </div>

      {/* Refined fencing motifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        {/* Main heading - ALL ORIGINAL FONT SIZES PRESERVED */}
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity text-white drop-shadow-lg">
              <span className="block animate-slide-up delay-[1000ms] will-change-transform-opacity">
                ADULT
              </span>
              <span className="block text-amber-400 font-normal animate-slide-up delay-[1400ms] will-change-transform-opacity drop-shadow-lg">
                FENCING
              </span>
              <span className="block animate-slide-up delay-[1800ms] will-change-transform-opacity">
                TEXAS FENCING ACADEMY
              </span>
            </h1>
          </div>

          {/* Elegant centered divider */}
          <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
            <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
          </div>
        </div>

        {/* Excellence tagline - ALL ORIGINAL FONT SIZES PRESERVED */}
        <div className="overflow-hidden">
          <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
            PRECISION, STRATEGY & EXCELLENCE
          </h2>
        </div>

        {/* Description - ALL ORIGINAL FONT SIZES PRESERVED */}
        <div className="overflow-hidden">
          <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
            Master the art of modern fencing with our comprehensive adult programs. 
            From beginners discovering the sport to experienced fencers honing competitive 
            skills, we provide expert instruction in a supportive community environment.
          </p>
        </div>

        {/* Action Buttons - ALL ORIGINAL SIZES PRESERVED */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
          {/* Join Program Button */}
          <a
            href="https://texasfencingacademy.glide.page"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10">Join Adult Program</span>
          </a>

          {/* View Programs Button */}
          <button
            onClick={() => document.getElementById('adult-programs')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10">View Adult Programs</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function AdultFencingInfoSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-gray-200/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Precision, <span className="font-semibold text-amber-600">Strategy</span> & Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our adult fencing programs welcome everyone from curious beginners to competitive athletes. 
            Experience the mental chess match and physical precision that makes fencing the ultimate 
            thinking person's sport.
          </p>
        </div>

        {/* Info and image grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Info content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Whether you're looking to try something new, get fit in an engaging way, or pursue 
                competitive fencing, our programs are designed to meet you where you are and take 
                you where you want to go.
              </p>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">What Sets Us Apart:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Expert instruction in both Epee and Saber disciplines</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Flexible scheduling for busy adult lifestyles</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Supportive community of like-minded adults</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Equipment provided for beginners</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tournament preparation and competitive opportunities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://texasfencingacademy.glide.page"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">Start Your Journey</span>
              </a>
              
              <button
                onClick={() => document.getElementById('adult-programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 hover:scale-105 transition-all duration-500 text-center"
              >
                Explore Membership Options
              </button>
            </div>
          </div>

          {/* Action image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/adultFencing/AdultFencing1.jpg"
                alt="Adult fencers in training"
                className="w-full h-80 lg:h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent pointer-events-none" />
              
              {/* Floating stats badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">18+</div>
                  <div className="text-xs text-gray-600 font-medium">Adult Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
function AdultProgramsSection() {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => { 
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 200) // Matching youth section timing
    return () => clearTimeout(timer)
  }, [])

  // Corrected adult products with accurate schedule data from ProgramsAndScheduleSection
  const adultFencingProducts = [
    {
      id: 1,
      title: "Fencing Introduction 1st Month",
      description: "Includes access to all our Epee and Saber classes for you to discover the joy of fencing.",
      price: "$85.00", // Assuming this is the adult equivalent
      image: "/adultFencing/AdultFencing1.jpg",
      href: "https://texasfencingacademy.glide.page",
      badge: "Beginner Friendly",
      schedule: [
        { day: "Access to all classes", time: "Various times", weapon: "Both" }
      ]
    },
    {
      id: 2,
      title: "Adult Open Fencing",
      description: "For adults and competitive TFA fencers to fence at our salle. Contact the coach or staff to determine which nights you'd like to attend.",
      price: "$95.00",
      image: "/adultFencing/AdultFencing2.jpg",
      href: "https://texasfencingacademy.glide.page",
      recurring: true,
      schedule: [
        { day: "Monday, Tuesday, Wednesday, Thursday", time: "7:00 pm to 9:00 pm", weapon: "Both" },
        { day: "Saturday", time: "10:30 am to 12:30 pm", weapon: "Both" }
      ]
    },
    {
      id: 3,
      title: "Full Adult Subscription",
      description: "Complete access to all adult classes, open fencing, and coaching. Our most comprehensive adult program including Team Fencer schedules.",
      price: "$195.00",
      image: "/adultFencing/AdultFencing3.jpg",
      href: "https://texasfencingacademy.glide.page",
      recurring: true,
      badge: "Most Popular",
      schedule: [
        { day: "Tuesday, Thursday", time: "6:00 pm to 7:00 pm", weapon: "Epee" },
        { day: "Monday, Wednesday", time: "6:00 pm to 7:00 pm", weapon: "Saber" },
        { day: "Saturday", time: "10:30 am to 11:30 am", weapon: "Both" },
        { day: "Open Fencing", time: "7:00 pm to 9:00 pm", weapon: "Both" }
      ]
    },
    {
      id: 4,
      title: "Competitive Adult Program",
      description: "For adults who make more of a time commitment and have narrowed their focus to a specific weapon and plan on competing in tournaments.",
      price: "Contact for Pricing",
      image: "/adultFencing/AdultFencing4.jpg",
      href: "https://texasfencingacademy.glide.page",
      schedule: [
        { day: "Monday, Tuesday, Wednesday, Thursday", time: "5:00 pm to 6:00 pm", weapon: "All" },
        { day: "Open Fencing Access", time: "7:00 pm to 9:00 pm", weapon: "Both" },
        { day: "Saturday Training", time: "10:30 am to 12:30 pm", weapon: "Competition" }
      ]
    },
    {
      id: 5,
      title: "Adult Team Fencers",
      description: "Recreational adult fencers that may have already narrowed their focus to a specific weapon and have not yet decided if they'd like to pursue tournaments.",
      price: "$150.00", // Estimated based on schedule complexity
      image: "/adultFencing/AdultFencing5.jpg",
      href: "https://texasfencingacademy.glide.page",
      recurring: true,
      schedule: [
        { day: "Tuesday, Thursday", time: "6:00 pm to 7:00 pm", weapon: "Epee" },
        { day: "Monday, Wednesday", time: "6:00 pm to 7:00 pm", weapon: "Saber" },
        { day: "Saturday", time: "10:30 am to 11:30 am", weapon: "Both" }
      ]
    },
    {
      id: 6,
      title: "Private Lessons Package",
      description: "One-on-one coaching sessions tailored to your specific goals and skill level. Available for all adult programs and skill levels.",
      price: "Contact for Pricing",
      image: "/adultFencing/AdultFencing6.jpg",
      href: "https://texasfencingacademy.glide.page",
      schedule: [
        { day: "Flexible Scheduling", time: "By Appointment", weapon: "Personalized" },
        { day: "Weekend Sessions", time: "Available", weapon: "All" },
        { day: "Goal-Oriented Training", time: "Custom Duration", weapon: "Specialized" }
      ]
    }
  ]

  // Function to handle card click
  const handleCardClick = () => {
    window.open("https://texasfencingacademy.glide.page", "_blank");
  };

  return (
    <section id="adult-programs" className="relative py-24 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-100 to-amber-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-20 rounded-full"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-8 group">
            <div className="w-16 h-px bg-amber-500 transition-colors duration-1000 group-hover:bg-amber-600"></div>
            <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-1000">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
            </div>
            <div className="w-16 h-px bg-amber-500 transition-colors duration-1000 group-hover:bg-amber-600"></div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Adult Program <span className="font-semibold text-amber-600">Options</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            Flexible membership and training options designed for adult schedules and goals
          </p>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-base mb-2">
              <strong>Prior to coming to the club</strong> you must register through the TFA Pro V2 and attend a scheduled complementary orientation class on Saturday.
            </p>
            <p className="text-gray-600 text-sm">
              Hover over each program to see detailed schedules and pricing information.
            </p>
          </div>
        </div>

        {/* Programs with hover schedule - matching YouthProgramsSection style */}
        <div className="mb-16">
          <h3 className="text-3xl font-light text-gray-800 mb-4 text-center">
            Choose Your{" "}
            <span className="font-semibold text-amber-600">Adult Path</span>
          </h3>
          <p className="text-center text-gray-600 mb-2 text-lg">
            Hover over a program you're interested in to see the schedule
          </p>
          <p className="text-center text-amber-600 mb-12 text-base font-medium">
            Click any card to register through our portal
          </p>

          {/* Programs grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adultFencingProducts.map((program, index) => (
              <div
                key={program.id}
                onClick={handleCardClick}
                className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-1000 ease-out min-h-[400px] cursor-pointer overflow-hidden ${
                  loaded 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: loaded ? `${index * 150}ms` : '0ms',
                  animation: loaded ? `fadeInUp 1.5s ease-out forwards ${index * 150}ms` : 'none'
                }}
              >
                {/* Subtle top accent with animation */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-pulse"></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-100/0 to-amber-50/0 group-hover:from-amber-50/20 group-hover:via-amber-100/30 group-hover:to-amber-50/20 transition-all duration-1000 rounded-xl"></div>

                {/* Badge */}
                {program.badge && (
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {program.badge}
                  </div>
                )}

                {/* Recurring badge */}
                {program.recurring && !program.badge && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Monthly
                  </div>
                )}

                {/* Click indicator with bounce animation */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:animate-bounce">
                  <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-500">
                    <svg
                      className="w-3 h-3 text-amber-600 group-hover:text-amber-700 transition-colors duration-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>

                {/* Program info with fade and scale animations */}
                <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-1000 ease-out">
                  {/* Image section */}
                  <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1200" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="text-center mb-4">
                    <h4 className="text-amber-700 font-semibold text-lg mb-3 tracking-wide group-hover:text-amber-800 transition-colors duration-500">
                      {program.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-500 mb-4">
                    {program.description}
                  </p>
                  
                  {/* Price display */}
                  <div className="text-center">
                    <span className="text-2xl font-bold text-amber-600">
                      {program.price}
                    </span>
                    {program.recurring && program.price !== "Contact for Pricing" && (
                      <span className="text-sm text-gray-500 block">per month</span>
                    )}
                  </div>
                </div>

                {/* Schedule overlay - matching YouthProgramsSection */}
                <div className="absolute inset-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                  <h5 className="text-amber-700 font-semibold text-center mb-2 text-base group-hover:animate-pulse">
                    SCHEDULE & PRICING
                  </h5>
                  
                  {/* Price display in overlay */}
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-amber-600">
                      {program.price}
                    </span>
                    {program.recurring && program.price !== "Contact for Pricing" && (
                      <span className="text-sm text-gray-500 block">monthly recurring</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {program.schedule.map((schedule, scheduleIndex) => (
                      <div
                        key={scheduleIndex}
                        className="bg-amber-50 rounded-lg p-2 border border-amber-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-800 ease-out hover:bg-amber-100 hover:scale-102"
                        style={{ transitionDelay: `${scheduleIndex * 150}ms` }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-gray-800 text-xs">
                            {schedule.day}
                          </span>
                          <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded group-hover:bg-amber-300 transition-colors duration-500">
                            {schedule.weapon}
                          </span>
                        </div>
                        <p className="text-gray-600 text-xs font-medium">
                          {schedule.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-800 delay-500">
                    <span className="text-sm text-amber-600 font-medium group-hover:text-amber-700 group-hover:animate-pulse">
                      Click to Register →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-8 h-px bg-amber-300"></div>
            <div className="mx-3 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
            <div className="w-8 h-px bg-amber-300"></div>
          </div>
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
            <p className="text-gray-700 font-medium text-base mb-4">
              <span className="text-amber-700 font-semibold">Our Philosophy:</span>{" "}
              We foster a sense of team and family, so all of our fencers must list TFA as your primary club.
            </p>
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <span>Get Started Today</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}



export default function AdultFencingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <InfoBanner/>
    <Navbar/>
      <AdultFencingHeroSection />
      <AdultFencingInfoSection />
      <AdultProgramsSection />
    <FooterSection/>
    </div>
  )
}
