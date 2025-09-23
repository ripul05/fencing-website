import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import EquipmentStore from "./Equipment";
import RepairsPage from "./Repair";
import { useCart } from "./Cart/CartContex";
import homepageLogo from "../assets/homepagelogo.PNG";

const storeSections = [
  {
    id: "equipment",
    label: "Equipment",
    description: "Shop for high-quality fencing gear and supplies.",
  },
  {
    id: "repairs",
    label: "Repairs",
    description: "Professional repairs for all your fencing equipment.",
  }
];

export default function StoreContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  // Get section from URL params, default to "equipment"
  const urlSection = searchParams.get("section");
  const [selectedSection, setSelectedSection] = useState(
    urlSection && storeSections.find((sec) => sec.id === urlSection)
      ? urlSection
      : "equipment"
  );

  // Handle home navigation
  const handleHomeClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  // Update URL when section changes internally
  const handleSectionChange = (sectionId) => {
    setSelectedSection(sectionId);
    setSearchParams({ section: sectionId });
  };

  // Listen for URL parameter changes (when navigating from navbar)
  useEffect(() => {
    const urlSection = searchParams.get("section");
    if (urlSection && storeSections.find((sec) => sec.id === urlSection)) {
      setSelectedSection(urlSection);
    } else if (!urlSection) {
      setSelectedSection("equipment");
    }
  }, [searchParams]);

  // Scroll to top whenever section changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSection]);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case "equipment":
        return <EquipmentStore />;
      case "repairs":
        return <RepairsPage />;
      default:
        return <EquipmentStore />;
    }
  };

  return (
    <section className="relative min-h-screen bg-primary-900 text-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex">
        {/* Left Vertical Navbar - Fixed Position */}
        <aside className="fixed left-0 top-0 w-64 h-screen py-8 px-6 bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 shadow-xl rounded-tr-3xl rounded-br-3xl z-20 animate-slide-up overflow-y-auto">
          
          {/* Compact Round Logo */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={handleHomeClick}
              className="group relative transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-full"
              aria-label="Go to home page"
            >
              {/* Round logo container */}
              <div className="relative bg-white/95 p-2 rounded-full border border-accent-400/30 group-hover:border-accent-400/60 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <img
                  src={homepageLogo}
                  alt="TFA Logo"
                  className="h-12 w-12 object-contain rounded-full group-hover:brightness-105 transition-all duration-300"
                />
              </div>
            </button>
          </div>

          {/* Enhanced Store Title */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-wide text-transparent bg-gradient-to-r from-accent-400 via-amber-300 to-accent-400 bg-clip-text select-none mb-2">
              TFA Store
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-400 to-transparent mx-auto opacity-60"></div>
          </div>

          <nav className="flex flex-col gap-2">
            {storeSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleSectionChange(sec.id)}
                className={`text-left group py-3 px-5 rounded-l-lg transition-all duration-300
                            font-semibold tracking-wide relative
                            ${
                              selectedSection === sec.id
                                ? "bg-accent-400/20 text-accent-400 shadow-lg scale-105"
                                : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
                            }`}
              >
                <span className="block">{sec.label}</span>
                {sec.id === "checkout" && getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-400 text-primary-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {getCartCount()}
                  </span>
                )}
                {selectedSection === sec.id && (
                  <span className="block w-10 h-1 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full mt-2 animate-fade-in" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area - With Left Margin for Fixed Sidebar */}
        <main className="flex-1 ml-64 min-h-screen">
          {renderSectionContent()}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Enhanced Mobile Header */}
        <div className="w-full bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 py-4 px-4 flex items-center justify-between border-b border-primary-700/50 shadow-lg">
          
          {/* Mobile Round Logo */}
          <button
            onClick={handleHomeClick}
            className="group relative transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:ring-offset-2 focus:ring-offset-primary-900 rounded-full"
            aria-label="Go to home page"
          >
            <div className="relative bg-white/95 p-1.5 rounded-full border border-accent-400/30 group-hover:border-accent-400/60 transition-all duration-300 shadow-md">
              <img
                src={homepageLogo}
                alt="TFA Logo"
                className="h-8 w-8 object-contain rounded-full group-hover:brightness-105 transition-all duration-300"
              />
            </div>
          </button>

          {/* Mobile title with enhanced styling */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-accent-400 via-amber-300 to-accent-400 bg-clip-text">
              TFA Store
            </h1>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-400 to-transparent mx-auto mt-1 opacity-60"></div>
          </div>

          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Mobile navbar - Sticky at top */}
        <nav className="w-full sticky top-0 z-30 bg-primary-900 py-4 px-3 flex gap-2 border-b border-primary-700 animate-slide-up justify-center">
          {storeSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSectionChange(sec.id)}
              className={`px-6 py-2 rounded-full transition-all font-semibold text-sm relative
                          ${
                            selectedSection === sec.id
                              ? "bg-accent-400/20 text-accent-400 scale-105"
                              : "text-primary-200 hover:bg-primary-800/80 hover:text-accent-400"
                          }`}
            >
              {sec.label}
              {sec.id === "checkout" && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-400 text-primary-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Content */}
        <main className="min-h-screen">{renderSectionContent()}</main>
      </div>
    </section>
  );
}
