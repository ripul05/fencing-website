import React, { useState } from 'react';

export default function FooterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // submission logic here
  };

  // Your social media links unchanged
  const socialLinks = [
    {
      href: "https://www.instagram.com/texasfencingacademy/",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.78 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    },
    {
      href: "https://www.facebook.com/texasfencingacademy",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    },
    {
      href: "https://twitter.com/texasfencing",
      icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
    }
  ];

  return (
    <footer className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects unchanged */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-radial from-amber-600/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-radial from-amber-500/3 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          <div className="absolute top-1/2 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent transform rotate-15"></div>
          <div className="absolute bottom-1/3 right-1/4 w-px h-64 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent transform -rotate-15"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Improved Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-amber-400 to-amber-600 animate-pulse rounded"></div>
            <span className="text-xs font-bold text-amber-400 tracking-[0.3em] uppercase select-none">
              Join the Duel
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-amber-400 to-amber-600 animate-pulse rounded"></div>
          </div>
          <h2 className="text-5xl font-extralight text-white mb-4 tracking-wide drop-shadow-lg">
            Master the Art of Fencing
          </h2>
          <p className="text-lg text-slate-300 font-light leading-relaxed tracking-wide">
            Contact us to begin your journey with expert coaching, state-of-the-art training, and spirited competition.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 p-10 max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6">Questions? We got answers</h3>
              <p className="text-slate-400 mb-10">
                Have questions about our fencing programs or want to book a trial lesson? Send us a message below.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      placeholder=" "
                      className="peer w-full px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-300"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-4 text-slate-400 text-sm bg-slate-900/60 px-1 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-amber-400 peer-focus:bg-slate-900/80"
                    >
                      Full Name *
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      placeholder=" "
                      className="peer w-full px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-300"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-4 text-slate-400 text-sm bg-slate-900/60 px-1 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-amber-400 peer-focus:bg-slate-900/80"
                    >
                      Email Address *
                    </label>
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      placeholder=" "
                      className="peer w-full px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-300"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-4 top-4 text-slate-400 text-sm bg-slate-900/60 px-1 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-amber-400 peer-focus:bg-slate-900/80"
                    >
                      Phone Number
                    </label>
                  </div>

                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="peer w-full px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-300"
                    >
                      <option value="" disabled hidden></option>
                      <option value="trial-lesson">Trial Lesson</option>
                      <option value="programs">Program Information</option>
                      <option value="competitive">Competitive Training</option>
                      <option value="private-lessons">Private Lessons</option>
                      <option value="camps">Summer Camps</option>
                      <option value="other">Other</option>
                    </select>
                    <label
                      htmlFor="subject"
                      className="absolute left-4 top-4 text-slate-400 text-sm bg-slate-900/60 px-1 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-amber-400 peer-focus:bg-slate-900/80"
                    >
                      Subject *
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder=" "
                    className="peer w-full px-4 py-4 bg-slate-900/60 border border-slate-700 rounded-lg text-white placeholder-transparent resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition duration-300"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-slate-400 text-sm bg-slate-900/60 px-1 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-amber-400 peer-focus:bg-slate-900/80"
                  >
                    Message *
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-3 bg-gradient-to-r from-amber-500 to-amber-600 font-semibold rounded-lg text-slate-900 shadow-md hover:shadow-amber-400/50 hover:brightness-105 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-amber-400"
                  aria-label="Send Message"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info and Socials (1/3 width), untouched */}
          <div className="space-y-6 text-white">
            {/* Academy Location */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">Academy Location</h3>
              </div>
              <div className="text-slate-300 text-sm space-y-1">
                <p className="font-medium">Texas Fencing Academy</p>
                <p>
                  8227 North Lamar
                  <br />
                  Austin, TX 78753
                </p>
                <p className="text-slate-400 text-xs pt-2">Mon-Sat • Classes from 4:00 PM</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">Get In Touch</h3>
              </div>
              <div className="space-y-3 text-sm">
                <a href="tel:+15551234567" className="flex items-center text-slate-300 hover:text-amber-400 transition-colors duration-300">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                  (512) 496-9022
                </a>
                <a
                  href="mailto:info@texasfencingacademy.org"
                  className="flex items-center text-slate-300 hover:text-amber-400 transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-3"></div>
                 ray@texasfencingacademy.org
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-3.22l-1.88 1.88a.75.75 0 01-1.06 0L7.22 15H5a2 2 0 01-2-2V5zm5.99-.5a.5.5 0 00-.99 0v.875a1.5 1.5 0 009.001 0V4.5a.5.5 0 00-.99 0v.875a.5.5 0 01-.99 0V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-semibold">Follow Us</h3>
              </div>
              <div className="flex space-x-3">
                {socialLinks.map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center text-slate-400 hover:bg-amber-600/20 hover:text-amber-400 transition-all duration-300"
                    aria-label={`Link to social media ${index + 1}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar bottom (unchanged) */}
        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-amber-600/20 rounded-lg flex items-center justify-center">
                <img
                  src="/images/TFALogo.jpeg"
                  alt="Texas Fencing Academy"
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <div className="w-6 h-6 flex items-center justify-center hidden">
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L19 7L17.91 13.26L22 15L16.91 17.74L17 24L12 19L7 24L7.09 17.74L2 15L6.09 13.26L5 7L10.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-white font-semibold">Texas Fencing Academy</span>
                <p className="text-slate-400 text-xs">Excellence since 1990</p>
              </div>
            </div>

            {/* Quick Links */}
            <nav className="flex space-x-6 text-sm">
              {['About', 'Programs', 'Gallery', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <div className="text-slate-500 text-sm">© 2025 Texas Fencing Academy</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
