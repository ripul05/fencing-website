import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from './Navbar';
import InfoBanner from './InfoBanner'; // Import the separated InfoBanner
import RegistrationSection from '../Sections/RegistrationSection';
import HeroSection from '../Sections/HeroSection';
import AboutSection from '../Sections/AboutSection';
import GallerySection from '../Sections/GallerySection';
import SocialMediaSection from '../Sections/SocialMediaSection';
import FooterSection from '../Sections/FooterSection';
import { motion } from 'framer-motion';
import { useRef } from 'react';


import {sanityClient} from "../Sanity/sanityClient"; // Adjust path as needed

function FreeIntroClassModal() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  // Fetch modal data from Sanity
  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "freeIntroClass" && showModal == true][0]`)
      .then((data) => {
        console.log("Free intro class modal data:", data); // Debug log
        setModalData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching free intro class modal data:", error);
        setLoading(false);
      });
  }, []);

  // Format the date: "2025-08-09" → "Saturday August 9"
  const getFormattedDate = (dateString) => {
    if (!dateString) return "";
    
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formatted = parsedDate.toLocaleDateString('en-US', options);
      return formatted.replace(",", ""); // Remove comma between day and date
    }
    return dateString; // fallback
  };

  // Show modal with delay
  useEffect(() => {
    if (!modalData || !modalData.showModal) return;

    const modalShown = localStorage.getItem('freeIntroClassModalShown');
    if (!modalShown) {
      const delayMs = (modalData.delaySeconds || 5) * 1000;
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('freeIntroClassModalShown', 'true');
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [modalData]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  // Don't render anything if loading, no data, or modal shouldn't show
  if (loading || !modalData || !modalData.showModal || !showModal) return null;

  const formattedDate = getFormattedDate(modalData.classDate);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-primary-900/95 to-primary-800/95 text-white rounded-3xl p-8 max-w-lg mx-4 shadow-elegant shadow-glow relative border-4 border-accent-500/30 animate-slide-up duration-700 ring-2 ring-inset ring-accent-400/40"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-primary-200 hover:text-accent-400 focus:outline-none transition-transform duration-200 transform hover:scale-125 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h1
          id="modal-title"
          className="text-2xl md:text-3xl font-bold mb-2 tracking-tight text-accent-400 animate-slide-up delay-[150ms]"
        >
          {modalData.title}
          <br />
          <span className="block font-normal text-primary-200 text-base mt-1 animate-fade-in delay-[400ms]">
            {formattedDate}
          </span>
        </h1>

        <div className="mt-2 mb-6 flex items-center justify-center">
          <span className="h-1 w-12 rounded-full bg-accent-400/60 animate-fade-in delay-[600ms]"></span>
        </div>

        <p className="mb-8 text-primary-100 leading-relaxed whitespace-pre-wrap animate-fade-in delay-[800ms]">
          {modalData.description}
        </p>

        <a
          href={modalData.ctaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-semibold text-lg transition-all duration-300 shadow-glow hover:scale-105 hover:brightness-110 hover:bg-accent-500/90 animate-pulse-slow delay-[1100ms] focus:outline-none focus:ring-4 focus:ring-accent-400/60"
        >
          {modalData.ctaText}
          <svg
            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}


export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isScrolling, setIsScrolling] = useState(false); // NEW: Track scrolling state

  // Get section from URL params
  const urlSection = searchParams.get("section");

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // UPDATED: Handle scrolling to sections without jumping to top
  useEffect(() => {
    if (urlSection && !isScrolling) {
      setIsScrolling(true); // Prevent multiple scroll attempts
      
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        let targetElement = null;
        
        switch (urlSection) {
          case "contact":
            targetElement = document.querySelector('footer') || document.getElementById('footer-section');
            break;
          case "registration":
            targetElement = document.getElementById('registration-section');
            break;
          case "calendar":
            targetElement = document.getElementById('calendar-section');
            break;
          case "about":
            targetElement = document.getElementById('about-section');
            break;
          case "gallery":
            targetElement = document.querySelector('[data-section="gallery"]');
            break;
          default:
            targetElement = document.getElementById(`${urlSection}-section`);
        }

        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: "smooth", 
            block: "start" 
          });
          
          // Clear the URL parameter after scrolling to prevent re-triggering
          setTimeout(() => {
            setSearchParams({}, { replace: true });
            setIsScrolling(false);
          }, 1000); // Wait for scroll animation to complete
        } else {
          setIsScrolling(false);
        }
      });
    }
  }, [urlSection, isScrolling, setSearchParams]);

  // UPDATED: Clear scrolling state if no section parameter
  useEffect(() => {
    if (!urlSection && isScrolling) {
      setIsScrolling(false);
    }
  }, [urlSection, isScrolling]);

  const galleryImages = [
    {
      src: "/images/FencingAcademy.jpg",
      alt: "Precision in Motion - Training Excellence",
    },
    {
      src: "/images/FencingPartnership.jpeg",
      alt: "Advanced Technique Mastery",
    },
    {
      src: "/images/TrainingClass.jpg",
      alt: "Championship Competitive Spirit",
    },
    {
      src: "/images/YoungTalents.jpg",
      alt: "Future Champions in Training",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  // Mobile-optimized animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: isMobile ? 30 : 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.6 : 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const fadeInUpFast = {
    hidden: { opacity: 0, y: isMobile ? 20 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.05 : 0.1
      }
    }
  };

  // Mobile-optimized viewport settings
  const mobileViewportSettings = {
    once: true,
    amount: isMobile ? 0.1 : 0.3,
    margin: isMobile ? "0px 0px -100px 0px" : "0px 0px -200px 0px"
  };

  const mobileViewportSettingsEarly = {
    once: true,
    amount: isMobile ? 0.05 : 0.2,
    margin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <InfoBanner />
      <Navbar />
      <FreeIntroClassModal/>
      
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettingsEarly}
        variants={fadeInUpFast}
      >
        <HeroSection />
      </motion.div>

      {/* About Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettingsEarly}
        variants={fadeInUp}
      >
        <AboutSection />
      </motion.div>

      {/* Registration Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettings}
        variants={fadeInUp}
      >
        <RegistrationSection />
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettings}
        variants={staggerContainer}
        data-section="gallery"
      >
        <GallerySection 
          galleryImages={galleryImages}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettings}
        variants={fadeInUp}
      >
        <SocialMediaSection />
      </motion.div>
      
      {/* Footer Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={mobileViewportSettings}
        variants={fadeInUpFast}
      >
        <FooterSection />
      </motion.div>
    </div>
  );
}