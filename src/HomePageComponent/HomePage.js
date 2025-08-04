import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import RegistrationSection from '../Sections/RegistrationSection';
import HeroSection from '../Sections/HeroSection';
import AboutSection from '../Sections/AboutSection';
import GallerySection from '../Sections/GallerySection';
import SocialMediaSection from '../Sections/SocialMediaSection';
import FooterSection from '../Sections/FooterSection';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Elegant Info Banner with sword motif
function InfoBanner() {
  const orientationDate = process.env.REACT_APP_FENCING_CLASS_ORIENTATION_DATE;
  console.log("Orientation Date ::", orientationDate)
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle sword blade pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transform -skew-x-12"></div>
        <div className="absolute top-0 right-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transform skew-x-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center text-center">
          <div className="flex items-center space-x-4">
            {/* Elegant pulse indicator */}
            <div className="relative">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute inset-0 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-sm font-light text-slate-300 tracking-wide">
                NEXT NEW FENCER ORIENTATION
              </span>
              <div className="h-4 w-px bg-amber-400/50"></div>
              <span className="text-sm font-semibold text-white tracking-wider">
                {orientationDate}
              </span>
            </div>

            <a
              href="https://texasfencingacademy.glide.page/dl/17171d"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-6 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-sm font-semibold rounded-md hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              SECURE YOUR SPOT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function DelayedModal() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const rawOrientationDate = process.env.REACT_APP_FENCING_CLASS_ORIENTATION_DATE;

  // Format the date: "August 9th, 2025" → "Saturday August 9"
  let formattedDate = "";
  if (rawOrientationDate) {
    const parsedDate = new Date(rawOrientationDate);
    if (!isNaN(parsedDate.getTime())) {
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      formattedDate = parsedDate.toLocaleDateString('en-US', options); // → "Saturday, August 9"
      formattedDate = formattedDate.replace(",", ""); // → "Saturday August 9"
    } else {
      formattedDate = rawOrientationDate; // fallback in case of parse error
    }
  }

  useEffect(() => {
    const modalShown = localStorage.getItem('openHouseModalShown');
    if (!modalShown) {
      const timer = setTimeout(() => {
        setShowModal(true);
        localStorage.setItem('openHouseModalShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

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
          Join us for our Open House<br />
          <span className="block font-normal text-primary-200 text-base mt-1 animate-fade-in delay-[400ms]">
            {formattedDate}
          </span>
        </h1>

        <div className="mt-2 mb-6 flex items-center justify-center">
          <span className="h-1 w-12 rounded-full bg-accent-400/60 animate-fade-in delay-[600ms]"></span>
        </div>

        <p className="mb-8 text-primary-100 leading-relaxed whitespace-pre-wrap animate-fade-in delay-[800ms]">
          Learn about fencing, see a demonstration, and try some of the moves yourself!
        </p>

        <a
          href="/open-house"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 font-semibold text-lg transition-all duration-300 shadow-glow hover:scale-105 hover:brightness-110 hover:bg-accent-500/90 animate-pulse-slow delay-[1100ms] focus:outline-none focus:ring-4 focus:ring-accent-400/60"
        >
          Register Now!
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <InfoBanner />
      <Navbar />
      <DelayedModal/>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <RegistrationSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <GallerySection 
          galleryImages={galleryImages}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <SocialMediaSection />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <FooterSection />
      </motion.div>
    </div>
  );
}

