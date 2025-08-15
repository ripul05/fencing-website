import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import homepageLogo from "../assets/homepagelogo.PNG";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle responsive design properly
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close mobile menu on screen size change
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  }, [isMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      text: "Summer Camps 2025",
      href: "/summercamp",
      icon: "/navbarIcons/summercamp.png",
    },
    {
      text: "About Us",
      href: "/",
      icon: "/navbarIcons/aboutus.png",
      dropdown: [
        { text: "About TFA", href: "/founder" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      text: "Programs",
      href: "/program",
      icon: "/navbarIcons/program.png",
      dropdown: [
        { text: "All Programs", href: "/program" },
        { text: "Youth Programs", href: "/youthFencing" },
        { text: "Adult Fencing", href: "/adultFencing" },
        { text: "Private Lessons", href: "/privateLessons" },
      ],
    },
    {
      text: "Parents",
      href: "/safety",
      icon: "/navbarIcons/family.png",
      dropdown: [
        { text: "Safety & Parents Role", href: "/safety" },
        { text: "College Advantage", href: "/safety" },
      ],
    },
    {
      text: "Store",
      href: "/store",
      icon: "/navbarIcons/store.png",
      dropdown: [
        { text: "Equipment", href: "/store?section=equipment" },
        { text: "Repairs", href: "/store?section=repairs" },
      ],
    },
  ];

  const handleNavigation = (href, scrollTarget = null) => {
    // Close mobile menu and dropdowns
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    // Check if we're on the home page and trying to scroll to a section
    if (location.pathname === "/" && (href.startsWith("#") || scrollTarget)) {
      // Direct scroll to section without navigation
      let targetElement = null;

      if (scrollTarget) {
        // Use specific scroll target
        if (scrollTarget === "footer") {
          targetElement = document.querySelector("footer");
        } else {
          targetElement = document.getElementById(scrollTarget);
        }
      } else if (href.startsWith("#")) {
        // Use href for section ID
        const sectionId = href.substring(1);
        if (sectionId === "contact") {
          targetElement = document.querySelector("footer");
        } else {
          targetElement =
            document.getElementById(sectionId) ||
            document.getElementById(`${sectionId}-section`);
        }
      }

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return; // Exit early, no navigation needed
      }
    }

    // Handle different types of navigation for other cases
    if (href.includes("?section=")) {
      navigate(href);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else if (href.startsWith("#")) {
      // If not on home page, navigate to home first, then scroll
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      // Handle regular page navigation
      navigate(href);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Check if current page matches the nav item
  const isActive = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.includes(href)) return true;
    return false;
  };

  // Check if any dropdown item is active
  const isDropdownActive = (item) => {
    if (!item.dropdown) return false;
    return item.dropdown.some((dropdownItem) => isActive(dropdownItem.href));
  };

  // Close dropdown when clicking outside (only for desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMobile && !event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile]);

  return (
    <>
      <nav className="sticky top-0 bg-white w-full z-[1000] shadow-lg border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <img
                onClick={() => handleNavigation("/")}
                alt="Texas Fencing Academy Logo"
                className="h-12 w-40 object-contain hover:scale-105 transition-transform duration-300"
                src={homepageLogo}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item, index) => (
                  <div
                    key={item.text}
                    className="relative group dropdown-container"
                  >
                    <div className="flex">
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className={`
                          flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:scale-105 transform
                          ${
                            !item.dropdown
                              ? "rounded-l-lg rounded-r-lg"
                              : "rounded-l-lg rounded-r-none"
                          }
                          ${
                            isActive(item.href) || isDropdownActive(item)
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg"
                              : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                          }
                        `}
                        aria-label={`Navigate to ${item.text}`}
                      >
                        <div className="flex items-center justify-center rounded transition-all duration-300 p-0.5">
                          <img
                            alt="Fencing Icon"
                            className="w-5 h-5 object-contain transition-all duration-300"
                            src={item.icon}
                            style={{ filter: "none", opacity: 1 }}
                          />
                        </div>
                        <span>{item.text}</span>
                      </button>

                      {item.dropdown && (
                        <button
                          onClick={() => handleDropdownToggle(index)}
                          className={`
                            px-2 py-2 rounded-r-lg text-sm font-medium transition-all duration-300 ease-in-out border-l border-opacity-20
                            ${
                              isActive(item.href) || isDropdownActive(item)
                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg border-slate-700"
                                : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 border-gray-300"
                            }
                          `}
                          aria-label={`Toggle ${item.text} dropdown menu`}
                          aria-expanded={openDropdown === index}
                          aria-haspopup="true"
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              openDropdown === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Desktop Dropdown */}
                    {item.dropdown && openDropdown === index && (
                      <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl min-w-56 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <button
                              key={dropdownItem.text}
                              onClick={() =>
                                handleNavigation(dropdownItem.href)
                              }
                              className={`
                                w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center
                                ${
                                  isActive(dropdownItem.href)
                                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-amber-50 hover:text-amber-600 hover:translate-x-1"
                                }
                              `}
                            >
                              <span className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></span>
                              {dropdownItem.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Icon (Desktop) */}
            <div
              className="hidden md:flex items-center relative"
              style={{ minWidth: "56px" }}
            >
              <div className="relative flex items-center">
                <div
                  className="flex items-center border border-gray-300 px-3 py-[7px] rounded-lg shadow bg-white overflow-hidden transition-[width,opacity] duration-300 ease-in-out"
                  style={{ width: "0px", opacity: 0, whiteSpace: "nowrap" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-400 w-5 h-5 mr-2 flex-shrink-0"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M21 21l-4.3-4.3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <button
                    type="button"
                    className="flex items-center justify-center ml-2 rounded-full hover:text-amber-600 transition-colors"
                    aria-label="Close search"
                    style={{ height: "28px", width: "28px" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                    </svg>
                  </button>
                </div>
                <button
                  className="p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 absolute right-0"
                  aria-label="Open search"
                  style={{ transform: "translateX(0px)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M21 21l-4.3-4.3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200"
                aria-label="Toggle mobile navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - OVERLAY ONLY */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-2xl z-50 border-t border-amber-200 animate-in slide-in-from-top-2 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
            {navItems.map((item, index) => (
              <div key={item.text} className="w-full">
                <div className="flex items-stretch">
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      flex-1 flex items-center gap-4 px-4 py-3 text-base font-medium transition-all duration-200
                      ${!item.dropdown ? "rounded-lg" : "rounded-l-lg"}
                      ${
                        isActive(item.href) || isDropdownActive(item)
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      }
                    `}
                    aria-label={`Navigate to ${item.text}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <div className="flex items-center justify-center rounded transition-all duration-300 p-0.5">
                        <img
                          alt="Fencing Icon"
                          className="w-5 h-5 object-contain transition-all duration-300"
                          src={item.icon}
                          style={{ filter: "none", opacity: 1 }}
                        />
                      </div>
                    </div>
                    <span className="flex-1 text-left">{item.text}</span>
                  </button>

                  {item.dropdown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(index);
                      }}
                      className={`
                        px-4 py-3 rounded-r-lg transition-all duration-200 border-l border-opacity-20
                        ${
                          isActive(item.href) || isDropdownActive(item)
                            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 shadow-lg border-slate-700"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 border-gray-300"
                        }
                      `}
                      aria-label={`Toggle ${item.text} dropdown menu`}
                      aria-expanded={openDropdown === index}
                      aria-haspopup="true"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Dropdown */}
                {item.dropdown && openDropdown === index && (
                  <div className="mt-1 ml-4 space-y-1">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <button
                        key={`${dropdownItem.text}-${dropdownIndex}`}
                        onClick={() => handleNavigation(dropdownItem.href)}
                        className={`
                          w-full text-left px-6 py-3 text-sm font-medium transition-all duration-300 flex items-center rounded-lg
                          ${
                            isActive(dropdownItem.href)
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                              : "text-gray-600 hover:bg-amber-50 hover:text-amber-600"
                          }
                        `}
                      >
                        <span className="w-1.5 h-1.5 bg-current rounded-full mr-3 opacity-60"></span>
                        {dropdownItem.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Search Button */}
            <div className="px-4 py-3 border-t border-amber-200 mt-4">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-all duration-200"
                aria-label="Open search"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M21 21l-4.3-4.3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-top-2 {
          animation-name: slide-in-from-top-2;
        }
      `}</style>
    </>
  );
};

export default Navbar;
