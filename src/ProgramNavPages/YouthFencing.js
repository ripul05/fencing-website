import { useState, useEffect } from 'react'
import Navbar from '../HomePageComponent/Navbar'
import InfoBanner from '../HomePageComponent/InfoBanner'
import FooterSection from '../Sections/FooterSection';
import { sanityClient } from "../Sanity/sanityClient";
import { urlFor } from "../Sanity/imageBuilder";
import { YOUTH_FENCING_HERO_QUERY, PROGRAM_QUERIES } from '../Sanity/queries';

function YouthFencingHeroSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    sanityClient.fetch(YOUTH_FENCING_HERO_QUERY).then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const runSecondary = () => {
    const a = data?.secondaryCta?.action;
    if (!a) return;
    if (a.startsWith('scroll:')) {
      document.getElementById(a.replace('scroll:', ''))?.scrollIntoView({ behavior: 'smooth' });
    } else if (a.startsWith('/')) {
      window.location.href = a;
    } else {
      window.open(a, '_self');
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl animate-pulse">Loading...</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
        isResizing ? 'no-animations' : ''
      }`}>
        {/* Fallback background */}
        <div className="absolute inset-0">
          <img
            src="/youthFencing/YouthFencingBg2.jpg"
            alt="Youth Fencing at Texas Fencing Academy"
            className="w-full h-full object-cover object-bottom animate-fade-in will-change-transform-opacity"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70"></div>
        </div>

        {/* Refined fencing motifs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none animate-slide-up delay-[800ms] will-change-transform-opacity text-white drop-shadow-lg">
                <span className="block animate-slide-up delay-[1000ms] will-change-transform-opacity">
                  YOUTH
                </span>
                <span className="block text-amber-400 font-normal animate-slide-up delay-[1400ms] will-change-transform-opacity drop-shadow-lg">
                  FENCING
                </span>
                <span className="block animate-slide-up delay-[1800ms] will-change-transform-opacity">
                  TEXAS FENCING ACADEMY
                </span>
              </h1>
            </div>

            <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
              WHERE FUTURE CHAMPIONS BEGIN
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
              Excellence on the piste, character for life. Experience world-class 
              fencing instruction for youth ages 6-17, nurturing discipline, focus, 
              and sportsmanship in a safe and empowering environment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Join Our Youth Program</span>
            </a>

            <button
              onClick={() => scrollToSection('youth-programs')}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">View Youth Programs</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  const desktopImg = urlFor(data.background.asset).width(1920).format('webp').quality(80).url();
  const mobileImg = data.backgroundMobile?.asset
    ? urlFor(data.backgroundMobile.asset).width(768).format('webp').quality(75).url()
    : null;

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6 ${
      isResizing ? 'no-animations' : ''
    }`}>
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        {mobileImg ? (
          <picture>
            <source media="(max-width:639px)" srcSet={mobileImg} />
            <img
              src={desktopImg}
              alt={data.background.alt || "Youth Fencing at Texas Fencing Academy"}
              className="w-full h-full object-cover object-center animate-fade-in"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        ) : (
          <img
            src={desktopImg}
            alt={data.background.alt || "Youth Fencing at Texas Fencing Academy"}
            className="w-full h-full object-cover object-center animate-fade-in"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/70" />
      </div>

      {/* Refined fencing motifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/4 w-px h-40 bg-gradient-to-b from-amber-500 to-transparent transform -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent transform rotate-45 animate-pulse"></div>
      </div>

      {/* Text & CTAs */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="overflow-hidden">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight leading-none text-white drop-shadow-lg">
              <span className="block animate-slide-up delay-[800ms]">{data.title.first}</span>
              <span className="block text-amber-400 font-normal animate-slide-up delay-[1200ms] drop-shadow-lg">
                {data.title.second}
              </span>
              <span className="block animate-slide-up delay-[1600ms]">{data.title.third}</span>
            </h1>
          </div>

          <div className="flex items-center justify-center space-x-4 opacity-0 animate-[fadeIn_0.8s_ease-out_1.5s_forwards]">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400" />
            <div className="w-12 h-12 border-2 border-white/70 rotate-45 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all duration-500 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400" />
          </div>
        </div>

        {data.tagline && (
          <div className="overflow-hidden">
            <h2 className="text-2xl lg:text-3xl font-light text-white tracking-[0.15em] drop-shadow-md opacity-0 animate-[fadeInUp_0.8s_ease-out_2s_forwards]">
              {data.tagline}
            </h2>
          </div>
        )}

        {data.description && (
          <div className="overflow-hidden">
            <p className="text-lg lg:text-xl text-white leading-relaxed font-light max-w-3xl mx-auto drop-shadow-sm opacity-0 animate-[fadeIn_0.8s_ease-out_2.5s_forwards]">
              {data.description}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_3s_forwards]">
          {data.primaryCta ? (
            data.primaryCta.url && data.primaryCta.url.startsWith('http') ? (
              // External link - use anchor tag
              <a
                href={data.primaryCta.url}
                target={data.primaryCta.newTab ? '_blank' : '_self'}
                rel={data.primaryCta.newTab ? 'noopener noreferrer' : ''}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </a>
            ) : (
              // Internal scroll - use button with scroll functionality
              <button
                onClick={() => {
                  if (data.primaryCta.url && data.primaryCta.url.startsWith('#')) {
                    scrollToSection(data.primaryCta.url.replace('#', ''));
                  } else if (data.primaryCta.url && data.primaryCta.url.startsWith('scroll:')) {
                    scrollToSection(data.primaryCta.url.replace('scroll:', ''));
                  } else {
                    // Fallback to external link
                    window.open("https://texasfencingacademy.glide.page", "_blank");
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10">{data.primaryCta.text}</span>
              </button>
            )
          ) : (
            // Fallback button
            <a
              href="https://texasfencingacademy.glide.page"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-amber-600 hover:to-amber-700 transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">Join Our Youth Program</span>
            </a>
          )}

          {data.secondaryCta ? (
            <button
              onClick={runSecondary}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">{data.secondaryCta.text}</span>
            </button>
          ) : (
            <button
              onClick={() => scrollToSection('youth-programs')}
              className="group relative px-8 py-4 bg-transparent border-2 border-white/70 text-white font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-400/10 hover:scale-105 hover:shadow-lg backdrop-blur-sm transition-all duration-500 text-lg min-w-[200px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">View Youth Programs</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </section>
  );
}

function YouthFencingInfoSection() {
  const [sectionData, setSectionData] = useState(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_YOUTH_FENCING_INFO_SECTION ;
        
        const data = await sanityClient.fetch(query);
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Fallback to default data if Sanity fetch fails
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
  const getDefaultData = () => ({
    sectionTitle: "Excellence on the Piste, Character for Life",
    sectionTitleHighlight: "Piste",
    headerDescription: "Experience world-class fencing instruction for youth ages 6-17. Our Youth Fencing programs nurture discipline, focus, and sportsmanship—whether your child dreams of glory or seeks a healthy, fun community.",
    mainDescription: "From beginners to tournament hopefuls, every student finds their place and pace, with expert coaches guiding the journey. We foster a supportive environment where young fencers develop not just technical skills, but life-long values.",
    featureTitle: "What We Offer:",
    features: [
      "Safe equipment and empowering atmosphere",
      "Progressive curriculum—from footwork basics to advanced tactics",
      "Teamwork, fair play, and lifelong friendships",
      "Individual attention for every skill level"
    ],
    mainCtaText: "Join Our Youth Program",
    mainCtaUrl: "https://texasfencingacademy.glide.page",
    secondaryCtaText: "View Program Options",
    secondaryCtaTargetId: "youth-programs",
    actionImage: {
      src: "/youthFencing/YouthFencers.jpg",
      alt: "Youth fencers in action"
    },
    statsBadge: {
      stat: "6-17",
      label: "Age Range"
    }
  });

  // Process action image for WebP format
  const processedActionImage = sectionData?.actionImage?.asset 
    ? {
        src: urlFor(sectionData.actionImage.asset).format('webp').quality(85).url(),
        alt: sectionData.actionImage.alt
      }
    : {
        src: sectionData?.actionImage?.src || "/youthFencing/YouthFencers.jpg",
        alt: sectionData?.actionImage?.alt || "Youth fencers in action"
      };

  // Render title with highlight
  const renderTitle = () => {
    if (!sectionData?.sectionTitle || !sectionData?.sectionTitleHighlight) {
      return sectionData?.sectionTitle || "Excellence on the Piste, Character for Life";
    }

    const parts = sectionData.sectionTitle.split(sectionData.sectionTitleHighlight);
    return (
      <>
        {parts[0]}
        <span className="font-semibold text-amber-600">{sectionData.sectionTitleHighlight}</span>
        {parts[1]}
      </>
    );
  };

  if (!sectionData) {
    return <div>Loading...</div>; // Loading state
  }

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
            {renderTitle()}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {sectionData.headerDescription}
          </p>
        </div>

        {/* Info and image grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Info content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {sectionData.mainDescription}
              </p>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">
                  {sectionData.featureTitle}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {sectionData.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={sectionData.mainCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{sectionData.mainCtaText}</span>
              </a>
              
              <button
                onClick={() => document.getElementById(sectionData.secondaryCtaTargetId)?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 bg-transparent border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 hover:scale-105 transition-all duration-500 text-center"
              >
                {sectionData.secondaryCtaText}
              </button>
            </div>
          </div>

          {/* Action image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={processedActionImage.src}
                alt={processedActionImage.alt}
                className="w-full h-80 lg:h-96 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent pointer-events-none" />
              
              {/* Floating stats badge */}
              {sectionData.statsBadge && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {sectionData.statsBadge.stat}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {sectionData.statsBadge.label}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function YouthProgramsSection() {
  const [loaded, setLoaded] = useState(false);
  const [sectionData, setSectionData] = useState(null);
  
  useEffect(() => { 
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 200);
    return () => clearTimeout(timer)
  }, []);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const query = PROGRAM_QUERIES.PROGRAM_YOUTH_FENCING_PROGRAM_SECTION ;
        
        const data = await sanityClient.fetch(query);
        setSectionData(data);
      } catch (error) {
        console.error('Error fetching section data:', error);
        // Fallback to default data if Sanity fetch fails
        setSectionData(getDefaultData());
      }
    };

    fetchSectionData();
  }, []);

  // Fallback default data
  const getDefaultData = () => ({
    sectionTitle: "Youth Program Options",
    sectionSubtitle: "Comprehensive youth fencing programs designed for every skill level and age group",
    infoPanel: {
      main: "Ready to begin? Register through our portal and attend a complimentary orientation class to get started.",
      sub: "Hover over each program to see detailed schedules and pricing information."
    },
    chooseTitle: "Choose Your Youth Path",
    chooseSubtitle: "Hover over a program you're interested in to see the schedule",
    chooseInstructions: "Click any card to register through our portal",
    programs: [
      {
        title: "Monthly Subscription",
        description: "Perfect for youth fencers who want consistent training with flexible scheduling. Includes access to age-appropriate classes and equipment.",
        price: "$95.00",
        image: { src: "/youthFencing/MonthlySubscription.jpg", alt: "Monthly Subscription Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: null,
        schedule: [
          { day: "Monday, Wednesday", time: "4:00 pm to 5:00 pm", weapon: "Epee" },
          { day: "Tuesday, Thursday", time: "4:00 pm to 5:00 pm", weapon: "Saber" },
          { day: "Saturday", time: "9:00 am to 10:00 am", weapon: "Both" }
        ]
      },
      {
        title: "Full Subscription (Monthly Recurring)",
        description: "Comprehensive program for serious youth fencers. Includes all classes, private lessons, and competition preparation.",
        price: "$195.00",
        image: { src: "/youthFencing/YearlySubscription.jpg", alt: "Full Subscription Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: "Most Popular",
        schedule: [
          { day: "Monday - Thursday", time: "4:00 pm to 6:00 pm", weapon: "All" },
          { day: "Saturday", time: "9:00 am to 12:00 pm", weapon: "Both" },
          { day: "Private Lessons", time: "By Appointment", weapon: "Specialized" }
        ]
      },
      {
        title: "Competition Team",
        description: "Elite training program for youth competitors. Team membership, tournament preparation, and advanced coaching included.",
        price: "$0.00",
        image: { src: "/youthFencing/YouthTeam.jpg", alt: "Competition Team Program" },
        href: "https://texasfencingacademy.org/?page_id=881",
        badge: "Team Member",
        schedule: [
          { day: "Monday - Friday", time: "5:00 pm to 7:00 pm", weapon: "All" },
          { day: "Saturday", time: "8:00 am to 12:00 pm", weapon: "Competition" },
          { day: "Tournament Days", time: "As Scheduled", weapon: "Specialized" }
        ]
      }
    ],
    bottomCtaPanel: {
      leadText: "Ready to start your journey? Join our youth fencing community and discover the perfect balance of competition, character building, and lifelong friendships.",
      registerText: "Register Now",
      registerHref: "https://texasfencingacademy.glide.page"
    }
  });

  // Process program images for WebP format
  const processedPrograms = sectionData?.programs?.map((program, index) => ({
    ...program,
    id: index + 1, // Add ID for key prop
    image: program.image?.asset 
      ? urlFor(program.image.asset).format('webp').quality(85).url()
      : program.image?.src || `/youthFencing/program${index + 1}.jpg`,
    alt: program.image?.alt || program.title
  })) || [];

  // Function to handle card click
  const handleCardClick = (href) => {
    window.open(href, "_blank");
  };

  // Render title with highlight
  const renderTitle = (title) => {
    if (title.includes('Options')) {
      const parts = title.split('Options');
      return (
        <>
          {parts[0]}<span className="font-semibold text-amber-600">Options</span>
        </>
      );
    }
    return title;
  };

  const renderChooseTitle = (title) => {
    if (title.includes('Youth Path')) {
      const parts = title.split('Youth Path');
      return (
        <>
          {parts[0]}<span className="font-semibold text-amber-600">Youth Path</span>
        </>
      );
    }
    return title;
  };

  if (!sectionData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <section id="youth-programs" className="relative py-24 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 overflow-hidden">
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
            {renderTitle(sectionData.sectionTitle)}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
            {sectionData.sectionSubtitle}
          </p>
          
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-50 to-amber-50 border border-amber-200/50 rounded-lg p-4 mb-8">
            <p className="text-gray-700 text-base mb-2">
              <strong>Ready to begin?</strong> {sectionData.infoPanel.main.replace('Ready to begin? ', '')}
            </p>
            <p className="text-gray-600 text-sm">
              {sectionData.infoPanel.sub}
            </p>
          </div>
        </div>

        {/* Programs with hover schedule */}
        <div className="mb-16">
          <h3 className="text-3xl font-light text-gray-800 mb-4 text-center">
            {renderChooseTitle(sectionData.chooseTitle)}
          </h3>
          <p className="text-center text-gray-600 mb-2 text-lg">
            {sectionData.chooseSubtitle}
          </p>
          <p className="text-center text-amber-600 mb-12 text-base font-medium">
            {sectionData.chooseInstructions}
          </p>

          {/* Programs grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processedPrograms.map((program, index) => (
              <div
                key={program.id}
                onClick={() => handleCardClick(program.href)}
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
                      alt={program.alt} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1200"
                      loading="lazy"
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
                    {program.price !== "$0.00" && (
                      <span className="text-sm text-gray-500 block">per month</span>
                    )}
                  </div>
                </div>

                {/* Schedule overlay */}
                <div className="absolute inset-6 opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-center transform translate-y-4 group-hover:translate-y-0 ease-out">
                  <h5 className="text-amber-700 font-semibold text-center mb-2 text-base group-hover:animate-pulse">
                    SCHEDULE & PRICING
                  </h5>
                  
                  {/* Price display in overlay */}
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-amber-600">
                      {program.price}
                    </span>
                    {program.price !== "$0.00" && (
                      <span className="text-sm text-gray-500 block">monthly recurring</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {program.schedule?.map((schedule, scheduleIndex) => (
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
              <span className="text-amber-700 font-semibold">Ready to start your journey?</span>{" "}
              {sectionData.bottomCtaPanel.leadText.replace('Ready to start your journey? ', '')}
            </p>
            <a
              href={sectionData.bottomCtaPanel.registerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 hover:scale-105 transition-all duration-500 shadow-lg"
            >
              <span>{sectionData.bottomCtaPanel.registerText}</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function YouthFencingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <InfoBanner />
      <Navbar />
      <YouthFencingHeroSection />
      <YouthFencingInfoSection />
      <YouthProgramsSection />
      <FooterSection />
    </div>
  )
}
