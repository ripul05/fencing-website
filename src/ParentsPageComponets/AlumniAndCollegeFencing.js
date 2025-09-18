import React, { useState, useEffect, useRef } from "react";
import Navbar from "../HomePageComponent/Navbar";
import InfoBanner from "../HomePageComponent/InfoBanner";
import { sanityClient } from "../Sanity/sanityClient";

function TexasFencingAcademySection() {
  const [inView, setInView] = useState(false);
  const [academyData, setAcademyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchAcademyData = async () => {
      try {
        const query = `*[_type == "texasFencingAcademy"][0]{
          title,
          subtitle,
          storySection{
            heading,
            description,
            legacyBox{
              title,
              achievements[]{
                achievement
              }
            },
            academyImage{
              asset->{
                _id,
                url
              },
              alt
            },
            yearsOfExcellence
          },
          philosophySection{
            heading,
            description,
            tagline
          }
        }`;

        const data = await sanityClient.fetch(query);
        setAcademyData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching academy data:", error);
        setLoading(false);
      }
    };

    fetchAcademyData();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [academyData]);

  useEffect(() => {
    if (academyData && !inView) {
      const timer = setTimeout(() => setInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [academyData, inView]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 sm:h-32 sm:w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Loading Academy Information...
          </p>
        </div>
      </div>
    );
  }

  if (!academyData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 max-w-sm">
          <p className="text-red-600 mb-4 text-base font-semibold">
            Failed to load academy information
          </p>
          <p className="text-gray-600 text-sm">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="academy-section"
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Mobile-optimized background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-15 sm:opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-10 sm:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-8 sm:opacity-10">
          <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/30 to-transparent"></div>
          <div className="hidden sm:block absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-3 sm:left-10 w-0.5 h-10 sm:h-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent -rotate-12"></div>
        <div className="absolute top-1/4 right-3 sm:right-10 w-0.5 h-8 sm:h-16 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-10 sm:mb-20">
          <div
            className={`flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-10 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-12 sm:group-hover:w-24"></div>
            <div className="w-10 sm:w-14 h-10 sm:h-14 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-xl bg-gray-200/80 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-amber-500 rounded-full animate-pulse group-hover:bg-amber-600"></div>
              <div className="absolute inset-0 rounded-full border border-slate-900/10 group-hover:border-slate-900/20 transition-all duration-500"></div>
            </div>
            <div className="w-10 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-12 sm:group-hover:w-24"></div>
          </div>

          <h2
            className={`text-2xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight transition-all duration-700 delay-200 leading-tight ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {academyData.title?.split(" ").map((word, index) => {
              if (word.toLowerCase().includes("fencing")) {
                return (
                  <span
                    key={index}
                    className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300"
                  >
                    {word}{" "}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
          </h2>
          <p
            className={`text-sm sm:text-lg text-slate-900/70 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {academyData.subtitle}
          </p>
        </div>

        {/* Mobile-optimized Story Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-12 lg:mb-20">
          {/* Content - Mobile first approach */}
          <div
            className={`space-y-4 sm:space-y-8 order-2 lg:order-1 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-3xl font-light text-slate-900 leading-tight">
                {academyData.storySection?.heading
                  ?.split(" ")
                  .map((word, index) => {
                    const year = word.match(/\d{4}/);
                    if (year) {
                      return (
                        <span
                          key={index}
                          className="font-semibold text-amber-600"
                        >
                          {word}{" "}
                        </span>
                      );
                    }
                    return <span key={index}>{word} </span>;
                  })}
              </h3>
              <p className="text-sm sm:text-lg text-slate-900/80 leading-relaxed">
                {academyData.storySection?.description}
              </p>

              {/* Mobile-optimized Legacy Box */}
              {academyData.storySection?.legacyBox && (
                <div className="bg-gradient-to-r from-amber-50/80 to-amber-100/60 border-2 border-amber-200/50 rounded-xl sm:rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-amber-300/60 transition-all duration-500 group">
                  <h4 className="text-base sm:text-xl font-semibold text-amber-700 mb-4 sm:mb-6 flex items-center">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-slate-900/10 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full"></div>
                    </div>
                    {academyData.storySection.legacyBox.title}
                  </h4>
                  <ul className="space-y-3 sm:space-y-4 text-slate-900/80">
                    {academyData.storySection.legacyBox.achievements?.map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 sm:gap-4"
                        >
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-sm sm:text-base leading-relaxed">
                            {item.achievement}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile-optimized Image */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-700 delay-500 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group">
              <img
                src={
                  academyData.storySection?.academyImage?.asset?.url ||
                  "/parentsComponent/Gallery/tfacademy.jpg"
                }
                alt={
                  academyData.storySection?.academyImage?.alt ||
                  "Texas Fencing Academy training"
                }
                className="w-full h-48 sm:h-80 lg:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/30 via-transparent to-slate-900/10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-400/5 to-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Mobile-optimized Badge */}
              <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-lg sm:shadow-xl opacity-90 transition-all duration-500 border border-slate-900/10">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold text-amber-600 mb-0.5 sm:mb-1">
                    {academyData.storySection?.yearsOfExcellence || 30}+
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-900/70 font-medium tracking-wide">
                    Years of Excellence
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-12 sm:w-20 h-12 sm:h-20 bg-gradient-to-tr from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>

        {/* Mobile-optimized Philosophy Section */}
        {academyData.philosophySection && (
          <div
            className={`relative py-12 sm:py-20 lg:py-24 transition-all duration-700 delay-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Mobile-friendly background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-250 to-gray-300 rounded-xl sm:rounded-none -mx-4 sm:mx-0">
              <div className="absolute inset-0 opacity-3">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-slate-900/3 to-transparent"></div>
              </div>
            </div>

            {/* Mobile-optimized floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/6 w-32 sm:w-56 h-32 sm:h-56 bg-amber-400/4 sm:bg-amber-400/6 rounded-full blur-2xl sm:blur-3xl"></div>
              <div
                className="absolute bottom-1/3 right-1/6 w-40 sm:w-72 h-40 sm:h-72 bg-amber-500/3 sm:bg-amber-500/5 rounded-full blur-2xl sm:blur-3xl"
                style={{ animationDelay: "1s" }}
              ></div>

              <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent"></div>
              <div className="hidden sm:block absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400/15 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
              {/* Mobile-first grid layout */}
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* Content column - mobile optimized */}
                <div className="lg:col-span-8 space-y-6 sm:space-y-8 order-2 lg:order-1">
                  {/* Mobile-friendly tagline */}
                  <div className="flex items-center gap-3 sm:gap-4 group justify-center lg:justify-start">
                    <div className="flex flex-col gap-1">
                      <div className="w-8 sm:w-10 h-0.5 bg-amber-400/70 rounded-full group-hover:w-12 sm:group-hover:w-14 transition-all duration-400"></div>
                      <div className="w-6 sm:w-7 h-0.5 bg-amber-500/60 rounded-full group-hover:w-8 sm:group-hover:w-10 transition-all duration-400"></div>
                      <div className="w-4 sm:w-5 h-0.5 bg-amber-600/60 rounded-full group-hover:w-6 sm:group-hover:w-8 transition-all duration-400"></div>
                    </div>
                    <span className="text-amber-700/90 font-medium text-xs sm:text-base tracking-wide uppercase group-hover:text-amber-800 transition-colors duration-300 text-center lg:text-left">
                      {academyData.philosophySection.tagline}
                    </span>
                  </div>

                  {/* Mobile-optimized main heading */}
                  <div className="space-y-1 sm:space-y-3 text-center lg:text-left">
                    {academyData.philosophySection.heading
                      ?.split(" ")
                      .map((word, index) => (
                        <div
                          key={index}
                          className={`${
                            word.toLowerCase().includes("innovation")
                              ? "text-2xl sm:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-amber-600/95 via-amber-500/95 to-amber-600/95 bg-clip-text text-transparent"
                              : "text-xl sm:text-3xl lg:text-4xl font-light text-slate-800/95"
                          } leading-tight hover:tracking-wide transition-all duration-400 cursor-default`}
                        >
                          {word}
                        </div>
                      ))}
                  </div>

                  {/* Mobile-friendly description */}
                  <div className="relative mt-6 sm:mt-8">
                    <div className="hidden lg:block absolute -left-4 top-1 w-0.5 h-16 bg-gradient-to-b from-amber-500/40 via-amber-400/30 to-transparent rounded-full"></div>
                    <p className="text-slate-700/90 text-base sm:text-xl leading-relaxed lg:pl-8 max-w-3xl hover:text-slate-800 transition-colors duration-300 text-center lg:text-left">
                      {academyData.philosophySection.description}
                    </p>
                  </div>
                </div>

                {/* Mobile-optimized visual element */}
                <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
                  <div className="relative">
                    {/* Mobile-sized circle */}
                    <div className="w-36 h-36 sm:w-60 sm:h-60 relative group">
                      {/* Gentle outer glow */}
                      <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-amber-200/15 sm:from-amber-200/20 via-amber-300/10 sm:via-amber-300/15 to-amber-400/15 sm:to-amber-400/20 rounded-full blur-xl sm:blur-2xl group-hover:blur-2xl sm:group-hover:blur-3xl transition-all duration-500"></div>

                      {/* Elegant rotating ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/70 via-amber-500/80 to-amber-600/70 rounded-full animate-spin-gentle shadow-lg sm:shadow-xl group-hover:shadow-xl sm:group-hover:shadow-2xl transition-shadow duration-400"></div>

                      {/* Refined inner circle */}
                      <div className="absolute inset-3 sm:inset-5 bg-gradient-to-br from-white/95 via-gray-50/95 to-gray-100/90 rounded-full flex items-center justify-center shadow-md sm:shadow-lg border border-white/60 backdrop-blur-sm group-hover:scale-105 transition-transform duration-400">
                        <div className="text-center">
                          <div className="text-lg sm:text-2xl font-semibold text-slate-800/95 mb-1 group-hover:text-slate-900 transition-colors duration-300">
                            1989
                          </div>
                          <div className="text-[10px] sm:text-sm text-slate-600/80 font-medium tracking-wider">
                            ESTABLISHED
                          </div>
                          <div className="mt-1.5 sm:mt-2 w-4 sm:w-6 h-0.5 bg-amber-500/70 mx-auto rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Subtle orbiting elements */}
                    <div className="absolute inset-0 animate-spin-reverse-gentle opacity-50">
                      <div className="absolute top-3 sm:top-5 left-1/2 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-amber-400/70 rounded-full transform -translate-x-1/2 shadow-sm"></div>
                      <div className="absolute bottom-3 sm:bottom-5 left-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-amber-500/70 rounded-full transform -translate-x-1/2 shadow-sm"></div>
                      <div className="absolute top-1/2 left-3 sm:left-5 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-amber-600/70 rounded-full transform -translate-y-1/2 shadow-sm"></div>
                      <div className="absolute top-1/2 right-3 sm:right-5 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-amber-400/70 rounded-full transform -translate-y-1/2 shadow-sm"></div>
                    </div>

                    {/* Refined floating elements */}
                    <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-3 sm:w-4 h-3 sm:h-4 bg-amber-200/30 rounded-full blur-sm"></div>
                    <div
                      className="absolute -bottom-3 sm:-bottom-4 -left-3 sm:-left-4 w-4 sm:w-5 h-4 sm:h-5 bg-amber-300/25 rounded-full blur-sm"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gentle custom animations */}
            <style jsx>{`
              @keyframes spin-gentle {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              @keyframes spin-reverse-gentle {
                from {
                  transform: rotate(360deg);
                }
                to {
                  transform: rotate(0deg);
                }
              }
              .animate-spin-gentle {
                animation: spin-gentle 35s ease-in-out infinite;
              }
              .animate-spin-reverse-gentle {
                animation: spin-reverse-gentle 45s ease-in-out infinite;
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}

function CollegeFencingExcellenceSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [inView, setInView] = useState(false);
  const [collegeData, setCollegeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const query = `*[_type == "collegeFencingExcellence"][0]{
          title,
          subtitle,
          allAmericansSection{
            title,
            description,
            athletes[]{
              name,
              school,
              achievement,
              profileImage{
                asset->{
                  _id,
                  url
                }
              }
            }
          },
          collegiateSection{
            title,
            description,
            athletes[]{
              name,
              school,
              graduationYear,
              major,
              profileImage{
                asset->{
                  _id,
                  url
                }
              }
            }
          },
          legacyStatement{
            heading,
            description,
            leftTagline,
            rightTagline
          }
        }`;

        const data = await sanityClient.fetch(query);
        setCollegeData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching college data:", error);
        setLoading(false);
      }
    };

    fetchCollegeData();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [collegeData]);

  useEffect(() => {
    if (collegeData && !inView) {
      const timer = setTimeout(() => setInView(true), 100);
      return () => clearTimeout(timer);
    }
  }, [collegeData, inView]);

  const initials = (full) => {
    const parts = full.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 sm:h-32 sm:w-32 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Loading College Excellence...
          </p>
        </div>
      </div>
    );
  }

  if (!collegeData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 max-w-sm">
          <p className="text-red-600 mb-4 text-base font-semibold">
            Failed to load college excellence information
          </p>
          <p className="text-gray-600 text-sm">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <section
      id="college-excellence"
      ref={sectionRef}
      className="relative py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      {/* Mobile-optimized background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-40 sm:w-72 h-40 sm:h-72 bg-gradient-to-br from-gray-300 to-gray-400 opacity-15 sm:opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tl from-gray-300 to-gray-400 opacity-10 sm:opacity-15 rounded-full"></div>
        <div className="absolute inset-0 opacity-8 sm:opacity-10">
          <div className="hidden sm:block absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900/30 to-transparent"></div>
          <div className="hidden sm:block absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-3 sm:left-10 w-0.5 h-10 sm:h-20 bg-gradient-to-b from-transparent via-slate-900/10 to-transparent -rotate-12"></div>
        <div className="absolute top-1/4 right-3 sm:right-10 w-0.5 h-8 sm:h-16 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Mobile-optimized Header */}
        <div className="text-center mb-10 sm:mb-20">
          <div
            className={`flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 group transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-10 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-12 sm:group-hover:w-24"></div>
            <div className="w-10 sm:w-14 h-10 sm:h-14 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-xl bg-gray-200/80 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 bg-amber-500 rounded-full animate-pulse group-hover:bg-amber-600"></div>
              <div className="absolute inset-0 rounded-full border border-slate-900/10 group-hover:border-slate-900/20 transition-all duration-500"></div>
            </div>
            <div className="w-10 sm:w-20 h-px bg-amber-500 transition-all duration-700 group-hover:bg-amber-600 group-hover:w-12 sm:group-hover:w-24"></div>
          </div>

          <h2
            className={`text-2xl sm:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {collegeData.title?.split(" ").map((word, index) => {
              if (word.toLowerCase().includes("excellence")) {
                return (
                  <span
                    key={index}
                    className="font-semibold text-amber-600 inline-block hover:scale-105 transition-transform duration-300"
                  >
                    {word}{" "}
                  </span>
                );
              }
              return <span key={index}>{word} </span>;
            })}
          </h2>
          <p
            className={`text-sm sm:text-lg text-slate-900/70 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {collegeData.subtitle}
          </p>
        </div>

        {/* Mobile-optimized All-Americans showcase */}
        {collegeData.allAmericansSection && (
          <div className="mb-12 sm:mb-20">
            <div
              className={`text-center mb-8 sm:mb-16 transition-all duration-700 delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                <div className="w-10 sm:w-16 h-px bg-amber-400"></div>
                <div className="w-2.5 sm:w-4 h-2.5 sm:h-4 bg-amber-500 rounded-full shadow-sm"></div>
                <div className="w-10 sm:w-16 h-px bg-amber-400"></div>
              </div>
              <h3 className="text-xl sm:text-3xl font-light text-slate-900 mb-2 sm:mb-4 hover:text-amber-600 transition-colors duration-300 leading-tight">
                {collegeData.allAmericansSection.title
                  ?.split(" ")
                  .map((word, index) => {
                    if (word.toLowerCase().includes("champions")) {
                      return (
                        <span
                          key={index}
                          className="font-semibold text-amber-600"
                        >
                          {word}{" "}
                        </span>
                      );
                    }
                    return <span key={index}>{word} </span>;
                  })}
              </h3>
              <p className="text-sm sm:text-lg text-slate-900/70 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
                {collegeData.allAmericansSection.description}
              </p>
            </div>

            {/* Mobile-first avatar list for All-Americans */}
            <div className="md:hidden space-y-3 max-w-md mx-auto">
              {collegeData.allAmericansSection.athletes
                ?.slice(0, 6)
                .map((athlete, index) => (
                  <div
                    key={`aa-m-${index}`}
                    className={`flex items-center gap-3 bg-white/90 border border-slate-900/10 rounded-xl p-3 shadow-sm transition-all ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    }`}
                    style={{
                      transitionDuration: "400ms",
                      transitionDelay: `${150 + index * 50}ms`,
                    }}
                  >
                    <div className="relative w-10 h-10 shrink-0">
                      {athlete.profileImage?.asset?.url ? (
                        <img
                          src={athlete.profileImage.asset.url}
                          alt={athlete.name}
                          className="w-full h-full rounded-full object-cover border border-amber-300"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-300 flex items-center justify-center text-xs font-bold text-amber-700">
                          {initials(athlete.name)}
                        </div>
                      )}
                      <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-slate-900 text-white text-[8px] font-bold flex items-center justify-center">
                        ★
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900 text-sm truncate">
                        {athlete.name}
                      </div>
                      <div className="text-amber-600 text-xs truncate">
                        {athlete.school}
                      </div>
                      <div className="text-slate-700 text-xs truncate">
                        {athlete.achievement}
                      </div>
                    </div>
                  </div>
                ))}

              {/* Show more button for mobile */}
              {collegeData.allAmericansSection.athletes?.length > 6 && (
                <div className="text-center pt-2">
                  <button className="text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors duration-300">
                    View All {collegeData.allAmericansSection.athletes.length}{" "}
                    All-Americans →
                  </button>
                </div>
              )}
            </div>

            {/* Desktop card grid for All-Americans */}
            <div className="hidden md:block max-w-5xl mx-auto">
              {/* First row - 3 items */}
              <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                {collegeData.allAmericansSection.athletes
                  ?.slice(0, 3)
                  .map((athlete, index) => (
                    <div
                      key={`aa-${index}`}
                      className={`group relative bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                        inView
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{ transitionDelay: `${0.5 + index * 0.15}s` }}
                      onMouseEnter={() => setHoveredCard(`aa-${index}`)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                        <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-amber-500 rounded-full"></div>
                        <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                      </div>

                      <div className="text-center relative">
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-6">
                          {athlete.profileImage?.asset?.url ? (
                            <img
                              src={athlete.profileImage.asset.url}
                              alt={athlete.name}
                              className="w-full h-full rounded-full object-cover border-2 border-amber-400/60 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-base sm:text-xl font-bold text-amber-700 border-2 border-amber-400/60 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg">
                              {initials(athlete.name)}
                            </div>
                          )}
                          <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs sm:text-sm font-bold">
                              ★
                            </span>
                          </div>
                        </div>

                        <h4 className="text-lg sm:text-2xl font-light text-slate-900 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                          {athlete.name}
                        </h4>
                        <p className="text-amber-600 font-semibold mb-2 sm:mb-4 text-sm sm:text-lg group-hover:text-amber-500 transition-colors duration-300">
                          {athlete.school}
                        </p>

                        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-900/5 border border-slate-900/15 rounded-full">
                          <span className="text-xs sm:text-sm font-bold text-slate-900/80">
                            {athlete.achievement}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Second row - 2 items centered */}
              {collegeData.allAmericansSection.athletes?.length > 3 && (
                <div className="flex justify-center">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    {collegeData.allAmericansSection.athletes
                      ?.slice(3, 5)
                      .map((athlete, index) => (
                        <div
                          key={`aa-${index + 3}`}
                          className={`group relative bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-sm shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                            inView
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-6"
                          }`}
                          style={{
                            transitionDelay: `${0.5 + (index + 3) * 0.15}s`,
                          }}
                          onMouseEnter={() => setHoveredCard(`aa-${index + 3}`)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                            <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-amber-500 rounded-full"></div>
                            <div className="w-6 sm:w-8 h-px bg-amber-400"></div>
                          </div>

                          <div className="text-center relative">
                            <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-6">
                              {athlete.profileImage?.asset?.url ? (
                                <img
                                  src={athlete.profileImage.asset.url}
                                  alt={athlete.name}
                                  className="w-full h-full rounded-full object-cover border-2 border-amber-400/60 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 rounded-full flex items-center justify-center text-base sm:text-xl font-bold text-amber-700 border-2 border-amber-400/60 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 shadow-lg">
                                  {initials(athlete.name)}
                                </div>
                              )}
                              <div className="absolute -top-1.5 sm:-top-2 -right-1.5 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white text-xs sm:text-sm font-bold">
                                  ★
                                </span>
                              </div>
                            </div>

                            <h4 className="text-lg sm:text-2xl font-light text-slate-900 mb-2 sm:mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                              {athlete.name}
                            </h4>
                            <p className="text-amber-600 font-semibold mb-2 sm:mb-4 text-sm sm:text-lg group-hover:text-amber-500 transition-colors duration-300">
                              {athlete.school}
                            </p>

                            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-900/5 border border-slate-900/15 rounded-full">
                              <span className="text-xs sm:text-sm font-bold text-slate-900/80">
                                {athlete.achievement}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile-optimized Collegiate Athletes */}
        {collegeData.collegiateSection && (
          <div className="mb-12 sm:mb-20">
            <div
              className={`text-center mb-8 sm:mb-16 transition-all duration-700 delay-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-8">
                <div className="w-10 sm:w-16 h-px bg-slate-900/30"></div>
                <div className="w-2.5 sm:w-4 h-2.5 sm:h-4 bg-slate-900/40 rounded-full shadow-sm"></div>
                <div className="w-10 sm:w-16 h-px bg-slate-900/30"></div>
              </div>
              <h3 className="text-xl sm:text-3xl font-light text-slate-900 mb-2 sm:mb-4 hover:text-amber-600 transition-colors duration-300 leading-tight">
                {collegeData.collegiateSection.title
                  ?.split(" ")
                  .map((word, index) => {
                    if (word.toLowerCase().includes("excellence")) {
                      return (
                        <span
                          key={index}
                          className="font-semibold text-amber-600"
                        >
                          {word}{" "}
                        </span>
                      );
                    }
                    return <span key={index}>{word} </span>;
                  })}
              </h3>
              <p className="text-sm sm:text-lg text-slate-900/70 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
                {collegeData.collegiateSection.description}
              </p>
            </div>

            {/* Mobile-first compact list for Collegiate Athletes */}
            <div className="md:hidden space-y-2.5 max-w-sm mx-auto max-h-80 overflow-y-auto">
              {collegeData.collegiateSection.athletes?.map((athlete, index) => (
                <div
                  key={`col-m-${index}`}
                  className={`flex items-center gap-3 bg-white/90 border border-slate-900/10 rounded-lg p-3 shadow-sm transition-all ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3"
                  }`}
                  style={{
                    transitionDuration: "350ms",
                    transitionDelay: `${150 + index * 25}ms`,
                  }}
                >
                  <div className="relative w-9 h-9 shrink-0">
                    {athlete.profileImage?.asset?.url ? (
                      <img
                        src={athlete.profileImage.asset.url}
                        alt={athlete.name}
                        className="w-full h-full rounded-full object-cover border border-slate-900/15"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900/8 border border-slate-900/15 flex items-center justify-center text-xs font-bold text-slate-900/80">
                        {initials(athlete.name)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-slate-900 text-sm truncate">
                      {athlete.name}
                    </div>
                    <div className="text-amber-600 text-xs truncate">
                      {athlete.school}
                    </div>
                    {athlete.graduationYear && (
                      <div className="text-slate-600 text-xs">
                        Class of {athlete.graduationYear}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop grid for Collegiate Athletes */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
              {collegeData.collegiateSection.athletes?.map((athlete, index) => (
                <div
                  key={`col-${index}`}
                  className={`group relative bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-slate-900/10 hover:border-amber-400/40 hover:bg-white/95 transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer overflow-hidden ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${0.8 + index * 0.05}s` }}
                  onMouseEnter={() => setHoveredCard(`athlete-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="absolute top-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="text-center relative z-10">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
                      {athlete.profileImage?.asset?.url ? (
                        <img
                          src={athlete.profileImage.asset.url}
                          alt={athlete.name}
                          className="w-full h-full rounded-full object-cover border-2 border-slate-900/15 group-hover:border-amber-400/40 group-hover:scale-110 transition-all duration-300 shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-900/8 border-2 border-slate-900/15 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-slate-900/80 group-hover:bg-amber-50 group-hover:border-amber-400/40 group-hover:text-amber-700 transition-all duration-300 group-hover:scale-110 shadow-sm">
                          {initials(athlete.name)}
                        </div>
                      )}
                      <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"></div>
                    </div>

                    <h4 className="font-semibold text-slate-900 mb-1 sm:mb-2 group-hover:text-amber-600 transition-colors duration-300 text-sm sm:text-base leading-tight">
                      {athlete.name}
                    </h4>
                    <p className="text-amber-600 font-medium text-xs sm:text-sm leading-relaxed group-hover:text-amber-500 transition-colors duration-300">
                      {athlete.school}
                    </p>
                    {athlete.graduationYear && (
                      <p className="text-slate-600 text-xs mt-1">
                        Class of {athlete.graduationYear}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 sm:mt-4 mx-auto">
                    <div className="w-6 sm:w-8 h-px bg-slate-900/20 mx-auto group-hover:w-8 sm:group-hover:w-12 group-hover:bg-amber-400/70 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile-optimized Legacy Statement */}
        {collegeData.legacyStatement && (
          <div
            className={`group text-center bg-gradient-to-r from-white/80 via-white/95 to-white/80 border-2 border-slate-900/10 hover:border-slate-900/20 rounded-2xl sm:rounded-3xl p-6 sm:p-16 backdrop-blur-sm shadow-lg sm:shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-700 delay-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="max-w-3xl sm:max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-10">
                <div className="w-10 sm:w-16 h-px bg-amber-400 group-hover:bg-amber-500 transition-colors duration-500"></div>
                <div className="w-2.5 sm:w-4 h-2.5 sm:h-4 bg-amber-500 rounded-full shadow-sm group-hover:scale-110 group-hover:bg-amber-600 transition-all duration-500"></div>
                <div className="w-10 sm:w-16 h-px bg-amber-400 group-hover:bg-amber-500 transition-colors duration-500"></div>
              </div>

              <h3 className="text-xl sm:text-4xl font-light text-slate-900 mb-4 sm:mb-8 group-hover:text-slate-800 transition-colors duration-300 leading-tight">
                {collegeData.legacyStatement.heading
                  ?.split(" ")
                  .map((word, index) => {
                    if (word.toLowerCase().includes("forged")) {
                      return (
                        <span
                          key={index}
                          className="font-semibold text-amber-600 group-hover:text-amber-700 transition-colors duration-300"
                        >
                          {word}{" "}
                        </span>
                      );
                    }
                    return <span key={index}>{word} </span>;
                  })}
              </h3>

              <p className="text-sm sm:text-xl text-slate-900/80 leading-relaxed mb-6 sm:mb-10 group-hover:text-slate-900/90 transition-colors duration-300 px-2 sm:px-0">
                {collegeData.legacyStatement.description}
              </p>

              <div className="flex flex-col sm:inline-flex sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-8 py-3 sm:py-3 bg-slate-900/5 border border-slate-900/15 rounded-full group-hover:bg-slate-900/10 group-hover:border-slate-900/20 group-hover:scale-105 transition-all duration-300">
                <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-900/70 group-hover:text-slate-900/80 transition-colors duration-300 text-center">
                  {collegeData.legacyStatement.leftTagline}
                </span>
                <div className="w-4 sm:w-6 h-px bg-slate-900/40 group-hover:bg-slate-900/60 transition-colors duration-300"></div>
                <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-900/70 group-hover:text-slate-900/80 transition-colors duration-300 text-center">
                  {collegeData.legacyStatement.rightTagline}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function AcademyAndAlumniPage() {
  return (
    <>
      <InfoBanner />
      <Navbar />
      <TexasFencingAcademySection />
      <CollegeFencingExcellenceSection />
    </>
  );
}

export default AcademyAndAlumniPage;
