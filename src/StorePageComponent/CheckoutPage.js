// Checkout.js
import { useState, useEffect } from "react";
import { useCart } from "./Cart/CartContex";
const equipmentData = [
  {
    id: 102126284,
    title: "Epee Starter Kit (9 pieces)",
    price: "$396.00",
    category: "Starter Kits",
    description:
      "Complete epee starter kit with all essential equipment for beginners. Includes jacket, mask, glove, weapon, and protective gear.",
    image: "equipment/EpeeStarterKit.jpg",
    badge: "Complete Kit",
  },
  {
    id: 102126285,
    title: "Saber Starter Kit (10 pieces)",
    price: "$449.00",
    category: "Starter Kits",
    description:
      "Comprehensive saber starter kit with lamé and all necessary equipment for competitive saber fencing.",
    image: "equipment/SaberStarterKit.jpg",
    badge: "Complete Kit",
  },
  {
    id: 102126286,
    title: "Jacket",
    price: "$88.00",
    category: "Protective Gear",
    description:
      "High-quality fencing jacket with reinforced padding and proper ventilation for maximum protection and comfort.",
    image: "equipment/FencingJacket.jpg",
  },
  {
    id: 102126287,
    title: "Knickers",
    price: "$55.00",
    category: "Protective Gear",
    description:
      "Professional fencing knickers with reinforced knee area and comfortable fit for optimal mobility.",
    image: "equipment/FencingKnickers.jpg",
  },
  {
    id: 102126288,
    title: "Glove",
    price: "$12.00",
    category: "Protective Gear",
    description:
      "Comfortable fencing glove with excellent grip and dexterity for precise weapon handling.",
    image: "equipment/FencingGlove.jpg",
  },
  {
    id: 102126290,
    title: "Epee Mask",
    price: "$58.00",
    category: "Masks",
    description:
      "Professional epee mask with excellent visibility and ventilation. Meets all safety standards.",
    image: "equipment/EpeeMask.jpg",
  },
  {
    id: 102126291,
    title: "Saber Mask",
    price: "$98.00",
    category: "Masks",
    description:
      "Specialized saber mask with conductive bib for electric scoring. Tournament approved.",
    image: "equipment/SaberMask.jpg",
  },
  {
    id: 102126292,
    title: "Nylon Underarm Protector",
    price: "$22.00",
    category: "Protective Gear",
    description:
      "Essential underarm protection for safe fencing practice and competition.",
    image: "equipment/UnderarmProtector.jpg",
  },
  {
    id: 102126293,
    title: "Chestplate",
    price: "$30.00",
    category: "Protective Gear",
    description:
      "Additional chest protection for enhanced safety during training and competition.",
    image: "equipment/Chestplate.jpg",
  },
  {
    id: 102126295,
    title: "Epee",
    price: "$50.00",
    category: "Weapons",
    description:
      "Professional epee weapon with balanced weight distribution and comfortable grip.",
    image: "equipment/Epee.jpg",
  },
  {
    id: 102126296,
    title: "Saber",
    price: "$50.00",
    category: "Weapons",
    description:
      "High-quality saber weapon designed for precision and durability in competition.",
    image: "equipment/Saber.jpg",
  },
  {
    id: 102126297,
    title: "TFA Team T-Shirt",
    price: "$15.00",
    category: "Apparel",
    description:
      "Official Texas Fencing Academy team t-shirt. Comfortable cotton blend.",
    image: "equipment/TFAShirt.jpg",
  },
  {
    id: 102126298,
    title: "TFA Team Jacket",
    price: "$135.00",
    category: "Apparel",
    description:
      "Premium TFA team jacket with embroidered logo. Perfect for tournaments and events.",
    image: "equipment/TFAJacket.jpg",
  },
  {
    id: 111689421,
    title: "Copper Saber Lame",
    price: "$94.00",
    category: "Electric Equipment",
    description:
      "Professional copper saber lamé for electric scoring. Durable and conductive.",
    image: "equipment/CopperLame.jpg",
  },
  {
    id: 102315415,
    title: "Epee Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Reliable epee body cord for electric scoring systems. Tournament quality.",
    image: "equipment/EpeeBodyCord.jpg",
  },
  {
    id: 103890147,
    title: "Epee - Wired Blade",
    price: "$35.00",
    category: "Weapons",
    description:
      "Pre-wired epee blade ready for electric scoring. Professional grade.",
    image: "equipment/WiredEpeeBlade.jpg",
  },
  {
    id: 111670567,
    title: "Saber Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Professional saber body cord for electric scoring. Reliable connection.",
    image: "equipment/SaberBodyCord.jpg",
  },
  {
    id: 104037303,
    title: "Stainless Steel Saber Lamé",
    price: "$206.00",
    category: "Electric Equipment",
    description:
      "Premium stainless steel saber lamé. Superior durability and conductivity.",
    image: "equipment/SteelLame.jpg",
    badge: "Premium",
  },
  {
    id: 109361582,
    title: "Electric FIE Saber Glove",
    price: "$69.00",
    category: "Electric Equipment",
    description:
      "FIE approved electric saber glove with conductive cuff. Tournament standard.",
    image: "equipment/ElectricGlove.jpg",
    badge: "FIE Approved",
  },
  {
    id: 116484287,
    title: "Mask Cord",
    price: "$10.00",
    category: "Electric Equipment",
    description:
      "Essential mask cord for electric scoring connection. Reliable and durable.",
    image: "equipment/MaskCord.jpg",
  },
  {
    id: 116484295,
    title: "Equipment Rental Fee (per item)",
    price: "$10.00",
    category: "Services",
    description:
      "Rental fee for individual equipment items. Perfect for trying before buying.",
    image: "equipment/EquipmentRental.jpg",
  },
  {
    id: 118034037,
    title: "Saber Blade",
    price: "$20.00",
    category: "Weapons",
    description:
      "Replacement saber blade. High-quality steel with proper flexibility.",
    image: "equipment/SaberBlade.jpg",
  },
  {
    id: 173741927,
    title: "TFA Saber Body Cord",
    price: "$25.00",
    category: "Electric Equipment",
    description:
      "Custom TFA saber body cord. Reliable performance for training and competition.",
    image: "equipment/TFASaberCord.jpg",
  },
];

const repairData = [
  {
    id: 102359873,
    title: "Equipment Repair - Basic",
    price: "$5.00",
    category: "Basic Repairs",
    description: "Basic equipment repair service for minor issues. Includes inspection, cleaning, and simple adjustments to get your gear back in working condition.",
    image: "repairs/BasicRepair.jpg",
    turnaround: "1-2 days"
  },
  {
    id: 102359892,
    title: "Equipment Repair - Standard",
    price: "$10.00",
    category: "Standard Repairs",
    description: "Standard repair service for moderate equipment issues. Includes part replacement, electrical work, and comprehensive testing.",
    image: "repairs/StandardRepair.jpg",
    turnaround: "3-5 days"
  },
  {
    id: 102359893,
    title: "Equipment Repair - Premium",
    price: "$20.00",
    category: "Premium Repairs",
    description: "Comprehensive repair service for complex issues. Includes full restoration, advanced diagnostics, and quality guarantee.",
    image: "repairs/PremiumRepair.jpg",
    turnaround: "5-7 days",
    badge: "Most Popular"
  },
  {
    id: 102359894,
    title: "Mask Repair Service",
    price: "$15.00",
    category: "Specialized Repairs",
    description: "Professional mask repair including mesh replacement, padding renewal, and electrical connection restoration for fencing masks.",
    image: "repairs/MaskRepair.jpg",
    turnaround: "3-4 days"
  },
  {
    id: 102359895,
    title: "Weapon Rewiring",
    price: "$25.00",
    category: "Specialized Repairs",
    description: "Complete weapon rewiring service for epee and saber. Includes new wiring, tip replacement, and electrical testing.",
    image: "repairs/WeaponRewiring.jpg",
    turnaround: "4-6 days"
  },
  {
    id: 102359896,
    title: "Lamé Repair & Restoration",
    price: "$30.00",
    category: "Specialized Repairs",
    description: "Professional lamé repair service including patch work, connection restoration, and conductivity testing for saber lamés.",
    image: "repairs/LameRepair.jpg",
    turnaround: "5-7 days"
  }
]
function EmptyCartComponent({ onNavigateToSection }) {
  const [currentTip, setCurrentTip] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const fencingTips = [
    "Every fencing champion started with their first blade",
    "Great gear makes great fencers",
    "Your next touch begins with the right weapon",
    "Elite fencers trust professional equipment",
  ];

  const featuredCategories = [
    {
      name: "Protective Gear",
      icon: "/store/icons/knight.png",
      description: "Stay safe while you train",
      items: ["Masks", "Jackets", "Gloves"],
      section: "equipment",
    },
    {
      name: "Weapons", 
      icon: "/store/icons/sword.png",
      description: "Find your perfect weapon",
      items: ["Foils", "Épées", "Sabres"],
      section: "equipment",
    },
    {
      name: "Training Equipment",
      icon: "/store/icons/armour.png", 
      description: "Enhance your practice",
      items: ["Targets", "Mats", "Bags"],
      section: "equipment",
    },
  ];

  // Handle resize events for performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % fencingTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigateToEquipment = () => {
    onNavigateToSection("equipment");
  };

  const handleNavigateToRepairs = () => {
    onNavigateToSection("repairs");
  };

  const handleCategoryClick = (category) => {
    if (category.section === "equipment") {
      handleNavigateToEquipment();
    } else {
      handleNavigateToRepairs();
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 relative contain-layout-paint ${
      isResizing ? 'no-animations' : ''
    }`}>
      {/* Clean background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100"></div>
      
      <div
        className={`container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${isResizing ? 'transition-none' : ''}`}
      >
        {/* Main Empty Cart Section - mobile responsive */}
        <div className="text-center mb-12 md:mb-16">
          {/* Clean Cart Icon - mobile responsive */}
          <div className="relative mx-auto w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8">
            <div className="relative z-10 w-full h-full bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-lg">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 004 16h0a1 1 0 001 1v0a1 1 0 001-1v0V7"
                />
                <circle cx="9" cy="20" r="1" />
                <circle cx="20" cy="20" r="1" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-slate-800 px-4">
            Your Cart is Empty
          </h1>
          
          <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Every great fencer needs the right equipment. Start building your arsenal with quality gear that makes the difference.
          </p>

          {/* Clean Rotating Tips - mobile responsive */}
          <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8 max-w-lg mx-auto border border-slate-200 shadow-sm mx-4 md:mx-auto">
            <div className="flex items-center justify-center mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-amber-500 rounded-full flex items-center justify-center mr-2 md:mr-3">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-amber-600 font-semibold text-xs md:text-sm uppercase tracking-wider">
                Pro Tip
              </span>
            </div>
            <p className="text-slate-700 italic transition-all duration-500 text-base md:text-lg">
              "{fencingTips[currentTip]}"
            </p>
          </div>
        </div>

        {/* Clean Categories Grid - mobile responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 px-4 md:px-0">
          {featuredCategories.map((category, index) => (
            <div
              key={category.name}
              className={`group relative bg-white rounded-lg md:rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] transition-all duration-700 ease-out cursor-pointer ${
                isResizing ? 'transition-none' : ''
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => handleCategoryClick(category)}
            >
              {/* Subtle top accent */}
              <div className="absolute top-0 left-4 right-4 md:left-6 md:right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Minimal hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 to-slate-50/0 group-hover:from-amber-50/20 group-hover:to-slate-50/10 transition-all duration-700 rounded-lg md:rounded-xl"></div>

              <div className="relative p-4 md:p-8">
                <div className="text-center">
                  <div className="text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-10 h-10 md:w-12 md:h-12 mx-auto"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2 md:mb-3 group-hover:text-amber-700 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 mb-4 md:mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="bg-slate-100 text-slate-600 px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtle bottom accent */}
              <div className="h-0.5 bg-gradient-to-r from-amber-400/50 to-amber-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Clean Call to Action Section - mobile responsive */}
        <div className="text-center px-4 md:px-0">
          <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-10 border border-slate-200 shadow-sm max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-slate-800">
              Ready to Start Shopping?
            </h2>
            <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              From beginner-friendly gear to professional competition equipment, we have everything you need to excel in your fencing journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button
                onClick={handleNavigateToEquipment}
                className="bg-amber-500 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-amber-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Browse Equipment
                </span>
              </button>
              
              <button
                onClick={handleNavigateToRepairs}
                className="bg-slate-100 text-slate-700 px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Professional Repairs
              </button>
            </div>
          </div>

          {/* Clean Benefits Banner - mobile responsive */}
          <div className="mt-6 md:mt-8 bg-gradient-to-r from-amber-50 to-slate-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-amber-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-slate-700 font-medium text-sm">
                  Free shipping on orders over $100
                </span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-slate-300"></div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-amber-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-700 font-medium text-sm">
                  Professional gear from trusted brands
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for no-animations */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
      `}</style>
    </div>
  );
}
export default function CheckoutPage({ onNavigateToSection }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Handle resize events for performance
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsResizing(false);
      }, 300);
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Get recommendations based on cart items
  const getRecommendations = () => {
    if (cartItems.length === 0) return [];
    
    const cartCategories = new Set(cartItems.map(item => item.category));
    const cartIds = new Set(cartItems.map(item => item.id));
    
    // Combine equipment and repair data for recommendations
    const allItems = [...equipmentData, ...repairData];
    
    // Find items in same categories as cart items, excluding items already in cart
    let recommendations = allItems.filter(item => 
      cartCategories.has(item.category) && !cartIds.has(item.id)
    );
    
    // If not enough recommendations from same categories, add popular items
    if (recommendations.length < 3) {
      const additionalItems = allItems.filter(item => 
        !cartIds.has(item.id) && !recommendations.some(rec => rec.id === item.id)
      );
      recommendations = [...recommendations, ...additionalItems];
    }
    
    return recommendations.slice(0, 3);
  };
  
  const recommendations = getRecommendations();

  // Generate order number
  const generateOrderNumber = () => {
    return 'TFA-' + Date.now().toString().slice(-8);
  };

  // Handle form submission - FIXED VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Store order details before clearing cart
    const orderData = {
      orderNumber: generateOrderNumber(),
      items: [...cartItems], // Create a copy of the cart items
      subtotal: getCartTotal(),
      tax: getCartTotal() * 0.08,
      total: getCartTotal() + (getCartTotal() * 0.08),
      orderDate: new Date().toLocaleDateString()
    };
    
    // Here you'll integrate with Stripe for payment processing
    // For now, simulating the process
    setTimeout(() => {
      // Set order details and show modal - DON'T clear cart yet
      setOrderDetails(orderData);
      setShowThankYouModal(true);
      setIsProcessing(false);
      // Cart will be cleared when modal is closed
    }, 2000);
  };

  // Handle adding recommendation to cart
  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    
    // If already in cart, just increase quantity
    const existing = cartItems.find(ci => ci.id === item.id);
    if (existing) {
      updateQuantity(item.id, existing.quantity + 1);
    } else {
      addToCart(item);
    }
  };

  // Handle clear cart confirmation
  const handleClearCart = () => {
    setShowClearModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearModal(false);
  };

  const cancelClearCart = () => {
    setShowClearModal(false);
  };

  // Handle thank you modal close - FIXED VERSION
  const handleThankYouClose = () => {
    setShowThankYouModal(false);
    setOrderDetails(null);
    // Clear cart AFTER modal is closed to prevent re-render issues
    clearCart();
    // Optionally navigate to another page
    if (onNavigateToSection) {
      onNavigateToSection('equipment');
    }
  };

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax; // No shipping since it's pickup

  // Show empty cart component only if cart is empty AND modal is not showing
  if (cartItems.length === 0 && !showThankYouModal) {
    return <EmptyCartComponent onNavigateToSection={onNavigateToSection} />;
  }

  return (
    <div className={`min-h-screen bg-primary-900 text-white contain-layout-paint ${
      isResizing ? 'no-animations' : ''
    }`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header Section */}
        <div className="mb-6 md:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-400 mb-2">
            Checkout
          </h1>
          <p className="text-primary-200 text-sm md:text-base">
            Complete your order for pickup at Texas Fencing Academy
          </p>
        </div>

        {/* Only show checkout content if cart has items OR if we're showing the modal */}
        {(cartItems.length > 0 || showThankYouModal) && (
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Order Summary - Mobile First, Then Left Column */}
            <div className="order-1 lg:order-1">
              <div className="bg-primary-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-xl">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-accent-400">
                  Order Summary
                </h2>
                
                {/* Cart Items - Mobile Optimized */}
                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 max-h-80 sm:max-h-96 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-primary-700 rounded-lg"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-primary-200 text-xs sm:text-sm">
                          {item.category}
                        </p>
                        <p className="text-accent-400 font-bold text-sm sm:text-base">
                          {item.price}
                        </p>
                      </div>
                      
                      {/* Quantity Controls - Mobile Optimized */}
                      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 flex-shrink-0">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 active:bg-primary-400 transition-colors touch-manipulation"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                              />
                            </svg>
                          </button>
                          
                          <span className="w-8 text-center font-semibold text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-500 active:bg-primary-400 transition-colors touch-manipulation"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item)}
                          aria-label="Remove item"
                          className="text-red-400 hover:text-red-300 active:text-red-200 transition-colors touch-manipulation p-1"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-primary-600 pt-4 space-y-2">
                  <div className="flex justify-between text-primary-200 text-sm sm:text-base">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-primary-200 text-sm sm:text-base">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg sm:text-xl font-bold text-accent-400 pt-2 border-t border-primary-600">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Pickup Information */}
                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-accent-400 bg-opacity-20 rounded-lg border border-accent-400">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-accent-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-accent-400 text-sm sm:text-base">
                        Store Pickup
                      </h3>
                      <p className="text-primary-200 text-xs sm:text-sm mt-1">
                        Items will be ready for pickup at Texas Fencing Academy. You'll receive 
                        an email with pickup instructions and location details after placing your order.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleClearCart}
                    className="order-2 sm:order-1 flex-1 py-4 sm:py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all duration-300 touch-manipulation min-h-[48px]"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className={`order-1 sm:order-2 flex-1 py-4 sm:py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg transition-all duration-300 touch-manipulation min-h-[48px] ${
                      isProcessing
                        ? "bg-primary-600 text-primary-300 cursor-not-allowed"
                        : "bg-accent-400 text-primary-900 hover:bg-accent-500 active:bg-accent-600 transform hover:scale-105"
                    }`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-300"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Place Order - $${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendations Section - Mobile Optimized */}
            <div className="order-2 lg:order-2">
              {recommendations.length > 0 && (
                <div className="bg-primary-800 rounded-lg md:rounded-xl p-4 md:p-6 shadow-xl">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-accent-400">
                    People Also Purchase
                  </h2>
                  <div className="space-y-3 md:space-y-4">
                    {recommendations.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-primary-700 rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-primary-200 text-xs md:text-sm">
                            {item.category}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-accent-400 font-bold text-sm md:text-base">
                              {item.price}
                            </p>
                            {item.badge && (
                              <span className="text-xs bg-accent-400 text-primary-900 px-2 py-1 rounded-full font-semibold">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.turnaround && (
                            <p className="text-primary-300 text-xs mt-1">
                              Turnaround: {item.turnaround}
                            </p>
                          )}
                        </div>

                        {/* Add to Cart Button - Mobile Optimized */}
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
                          className="bg-accent-400 text-primary-900 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm hover:bg-accent-500 active:bg-accent-600 transition-colors flex-shrink-0 flex items-center space-x-1 touch-manipulation min-h-[40px]"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 00-.293.707V19a1 1 0 001 1h12a1 1 0 001-1v-2.586a1 1 0 00-.293-.707L16 13"
                            />
                          </svg>
                          <span className="hidden sm:inline">Add to Cart</span>
                          <span className="sm:hidden">Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal - Mobile Optimized */}
      {showClearModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="clear-cart-title"
        >
          <div className="bg-primary-800 rounded-lg md:rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-md w-full shadow-2xl">
            <div className="flex items-center mb-4">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-red-400 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 id="clear-cart-title" className="text-lg sm:text-xl font-bold text-accent-400">
                Clear Cart
              </h3>
            </div>
            <p className="text-primary-200 mb-6 text-sm sm:text-base">
              Are you sure you want to clear all items from your cart? This action cannot be undone.
            </p>
            <div className="flex flex-col-reverse sm:flex-row gap-3">
              <button
                onClick={cancelClearCart}
                className="flex-1 py-3 px-4 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-600 active:bg-primary-500 transition-colors touch-manipulation min-h-[48px]"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCart}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 active:bg-red-800 transition-colors touch-manipulation min-h-[48px]"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Modal - Mobile Optimized */}
      {showThankYouModal && orderDetails && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="thank-you-title"
        >
          <div className="bg-primary-800 rounded-lg md:rounded-xl p-4 sm:p-6 max-w-sm sm:max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-primary-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 id="thank-you-title" className="text-2xl sm:text-3xl font-bold text-accent-400 mb-3">
                Thank You!
              </h2>
              <p className="text-primary-200 text-base sm:text-lg">
                Your order has been placed successfully and we're excited to help you with your fencing journey!
              </p>
            </div>
            
            <div className="bg-primary-700 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-accent-400 mb-3 text-center">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-primary-200">Order Number:</span>
                  <span className="text-white font-semibold">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-200">Order Date:</span>
                  <span className="text-white">{orderDetails.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-200">Items Ordered:</span>
                  <span className="text-white">{orderDetails.items.length} item(s)</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span className="text-primary-200">Total Paid:</span>
                  <span className="text-accent-400 font-bold">${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-accent-400 bg-opacity-20 border border-accent-400 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-accent-400 mt-1 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-accent-400 text-sm mb-1">
                    Pickup Information
                  </h4>
                  <p className="text-primary-200 text-sm">
                    Your items will be prepared for pickup at Texas Fencing Academy. 
                    You'll receive detailed pickup instructions and our location via email shortly.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={handleThankYouClose}
                className="w-full sm:w-auto bg-accent-400 text-primary-900 px-6 sm:px-8 py-3 rounded-lg font-bold text-base sm:text-lg hover:bg-accent-500 active:bg-accent-600 transition-colors touch-manipulation min-h-[48px]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for no-animations and mobile optimizations */}
      <style jsx>{`
        .no-animations * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Improve scroll behavior on mobile */
        @media (max-width: 640px) {
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
          }
        }

        /* Ensure tap targets are at least 44px */
        .touch-manipulation {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
}