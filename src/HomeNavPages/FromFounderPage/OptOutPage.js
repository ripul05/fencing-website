import React from "react";
import FooterSection from "../../Sections/FooterSection";
import InfoBanner from "../../HomePageComponent/InfoBanner";
import Navbar from "../../HomePageComponent/Navbar";

function SectionHeader({ title, highlight, subtitle }) {
    return (
        <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-8 group">
                <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                    <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
                <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
            </div>

            <div className="overflow-hidden">
                <h2 className="text-5xl font-light text-gray-800 mb-6 tracking-tight animate-slide-up">
                    {title} <span className="font-semibold text-amber-600">{highlight}</span>
                </h2>
            </div>

            {subtitle && (
                <div className="overflow-hidden">
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in">
                        {subtitle}
                    </p>
                </div>
            )}
        </div>
    );
}

function Hero() {
    return (
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-slate-200 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-30 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-20 rounded-full"></div>
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <div className="flex items-center justify-center space-x-4 mb-8 group">
                    <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                    <div className="w-12 h-12 border-2 border-amber-500 rounded-full flex items-center justify-center shadow-lg bg-white/70 backdrop-blur-lg relative group-hover:border-amber-600 transition-all duration-500">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="w-16 h-px bg-amber-500 transition-colors duration-500 group-hover:bg-amber-600"></div>
                </div>

                <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-800 mb-4">
                    Privacy <span className="font-semibold text-amber-600">Preferences</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
                    Manage your cookie preferences and understand how we protect your privacy
                </p>
            </div>
        </section>
    );
}

function PrivacyCard({ title, children, className = "" }) {
    return (
        <div className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 ${className}`}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
                <span className="text-amber-600">• </span> {title}
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
        </div>
    );
}

function CookieItem({ name, expiration, description }) {
    return (
        <div className="border-l-4 border-amber-400 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors duration-300">
            <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-800">{name}</h5>
                <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">{expiration}</span>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function ConsentManager() {
    return (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Manage Your Consent Preferences</h4>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                        <h5 className="font-medium text-gray-800">Functional Cookies</h5>
                        <p className="text-sm text-gray-600">Essential for website operation</p>
                    </div>
                    <div className="bg-gray-300 rounded-full p-1">
                        <div className="bg-gray-500 w-6 h-6 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                        <h5 className="font-medium text-gray-800">Analytics Cookies</h5>
                        <p className="text-sm text-gray-600">Help us understand website usage</p>
                    </div>
                    <button className="bg-amber-500 rounded-full p-1 hover:bg-amber-600 transition-colors">
                        <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
                            <span className="text-amber-600 text-xs">✓</span>
                        </div>
                    </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                    <div>
                        <h5 className="font-medium text-gray-800">Marketing Cookies</h5>
                        <p className="text-sm text-gray-600">Personalized advertising and content</p>
                    </div>
                    <button className="bg-gray-300 rounded-full p-1 hover:bg-gray-400 transition-colors">
                        <div className="bg-gray-500 w-6 h-6 rounded-full"></div>
                    </button>
                </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
                <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                    Save Preferences
                </button>
                <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Accept All
                </button>
            </div>
        </div>
    );
}

function PrivacyContent() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-slate-200 to-gray-300 opacity-20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-gray-200 to-slate-300 opacity-15 rounded-full"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
                    <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <SectionHeader
                    title="Privacy"
                    highlight="Settings"
                    subtitle="Control your data preferences and understand how we use cookies to enhance your experience at Texas Fencing Academy."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        <PrivacyCard title="Introduction">
                            <p>
                                Our website, Texas Fencing Academy (<strong>texasfencingacademy.org</strong>), uses cookies and related technologies to enhance your browsing experience. 
                                This page allows you to manage your preferences and understand how we handle your data.
                            </p>
                            <p className="text-sm text-gray-600 italic">
                                Last updated: March 28, 2024 | Applies to citizens and legal permanent residents of the United States
                            </p>
                        </PrivacyCard>

                        <PrivacyCard title="Cookie Categories">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3">🔧 Functional Cookies</h4>
                                    <p className="mb-3">
                                        Essential cookies that ensure our website works properly. These help you navigate the site, 
                                        keep your preferences, and maintain your session.
                                    </p>
                                    <div className="space-y-3">
                                        <CookieItem 
                                            name="wordpress_test_cookie"
                                            expiration="Session"
                                            description="Tests if cookies can be placed on your browser"
                                        />
                                        <CookieItem 
                                            name="wp-settings-*"
                                            expiration="1 year"
                                            description="Stores your website preferences and settings"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3">📊 Analytics Cookies</h4>
                                    <p className="mb-3">
                                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                                    </p>
                                    <div className="space-y-3">
                                        <CookieItem 
                                            name="_ga"
                                            expiration="2 years"
                                            description="Google Analytics - tracks unique visitors and page views"
                                        />
                                        <CookieItem 
                                            name="_ga_*"
                                            expiration="1 year"
                                            description="Google Analytics - stores session and campaign data"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-3">🎯 Marketing Cookies</h4>
                                    <p className="mb-3">
                                        Used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.
                                    </p>
                                    <div className="space-y-3">
                                        <CookieItem 
                                            name="_fbp"
                                            expiration="90 days"
                                            description="Facebook Pixel - tracks conversions and website activity"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PrivacyCard>

                        <PrivacyCard title="Your Data Rights">
                            <p className="font-medium text-gray-800 mb-3">You have the following rights regarding your personal data:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Request access to the data we process about you</li>
                                <li>Object to the processing of your personal data</li>
                                <li>Request data portability in a commonly used format</li>
                                <li>Request correction or deletion of incorrect/irrelevant data</li>
                                <li>Restrict processing under certain circumstances</li>
                            </ul>
                            <div className="mt-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                <p className="text-sm">
                                    <span className="font-medium">Need help?</span> Contact us using the information below to exercise any of these rights.
                                </p>
                            </div>
                        </PrivacyCard>

                        <PrivacyCard title="Managing Your Browser Settings">
                            <div className="space-y-4">
                                <p>
                                    You can control cookies through your browser settings. Most browsers allow you to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Block all cookies</li>
                                    <li>Allow only first-party cookies</li>
                                    <li>Clear cookies when you close your browser</li>
                                    <li>Receive notifications when cookies are being set</li>
                                </ul>
                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                    <p className="text-sm text-blue-800">
                                        <span className="font-medium">Note:</span> Disabling certain cookies may limit website functionality and prevent you from accessing some features.
                                    </p>
                                </div>
                            </div>
                        </PrivacyCard>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/02/IMG_20190128_173856.jpg"
                                    alt="Texas Fencing Academy Privacy"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Texas Fencing Academy</h4>
                                <p className="text-sm text-gray-600">
                                    We're committed to protecting your privacy while providing the best fencing education experience.
                                </p>
                            </div>
                        </div>

                        <ConsentManager />

                        <PrivacyCard title="Contact Information">
                            <div className="space-y-4">
                                <p className="font-medium text-gray-800">Questions about privacy or cookies?</p>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-gray-700">Texas Fencing Academy</p>
                                            <p className="text-sm text-gray-600">8227 North Lamar</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone: (512) 496-9022</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email: ray@texasfencingacademy.org</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PrivacyCard>

                        <PrivacyCard title="Quick Actions">
                            <div className="space-y-4">
                                <button className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium">
                                    Download My Data
                                </button>
                                <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                                    Delete My Data
                                </button>
                                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                    View Privacy Policy
                                </button>
                            </div>
                        </PrivacyCard>
                    </div>
                </div>

                {/* Footer note */}
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-medium text-gray-700">Privacy Commitment:</span> This privacy information is reviewed regularly and updated to reflect current practices. 
                            We're committed to transparency in how we collect, use, and protect your information while you explore fencing with us.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function OptOutPage() {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden">
            <InfoBanner />
            <Navbar />
            <Hero />
            <PrivacyContent />
        </div>
    );
}
