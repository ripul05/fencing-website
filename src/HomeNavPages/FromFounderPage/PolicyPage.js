import React from "react";
import FooterSection from "../../Sections/FooterSection";
import InfoBanner from "../../HomePageComponent/InfoBanner";
import Navbar from "../../HomePageComponent/Navbar";

// Optional: If you have shared components like InfoBanner and Navbar, import them.
// import InfoBanner from "../HomePageComponent/InfoBanner";
// import Navbar from "../HomePageComponent/Navbar";

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
                    TFA <span className="font-semibold text-amber-600">Policies</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
                    Expectations for private lessons, make-ups, absences, and more
                </p>
            </div>
        </section>
    );
}

function PolicyCard({ title, children }) {
    return (
        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
                <span className="text-amber-600">• </span> {title}
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
        </div>
    );
}

function PoliciesContent() {
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
                    title="Club"
                    highlight="Policies"
                    subtitle="These policies set expectations between TFA members and the Academy. Policies are subject to change without notice."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Main sections stacked */}
                    <div className="lg:col-span-2 space-y-8">
                        <PolicyCard title="General">
                            <div className="space-y-3">
                                <p>
                                    The Texas Fencing Academy (TFA) policies define expectations for private lessons, make-up lessons, and long absences. These policies may change without notice.
                                </p>
                                <p className="font-medium text-gray-800">This document summarizes:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Private fencing lessons policy: scheduling, cancellation, make-ups</li>
                                    <li>Make-up classes</li>
                                    <li>Vacation notice and payments</li>
                                    <li>Holiday schedule (group lessons, private make-ups)</li>
                                </ul>
                            </div>
                        </PolicyCard>

                        <PolicyCard title="Private Lessons Policies">
                            <ol className="list-decimal pl-6 space-y-3">
                                <li>
                                    Private lessons are provided at TFA's discretion and depend on coach and space availability. TFA may discontinue private lessons for any student at any time in unusual circumstances.
                                </li>
                                <li>
                                    Your private lesson slot is reserved for you and is kept as consistent as possible throughout the season (Aug 1 – Jul 31). Please be on time and avoid avoidable cancellations.
                                </li>
                                <li>
                                    All private lessons are managed via online software. It is the fencer's/parent's responsibility to manage cancellations and makeups per TFA policy.
                                </li>
                                <li>
                                    Private lessons are paid monthly based on the number taken. If you forget to cancel in the system, the full fee will be charged—no makeup or credit will be given.
                                </li>
                                <li className="space-y-2">
                                    <div className="font-medium text-gray-800">Cancellation policy</div>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>All private lessons must be cancelled at least 24 hours in advance.</li>
                                        <li>
                                            Same-day cancellation is allowed up to two times per season (Aug 1 – Jul 31) for unavoidable reasons (e.g., sudden sickness, family emergency).
                                        </li>
                                        <li>
                                            Repeated missed or late lessons may result in TFA reconsidering private lessons for the student.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Tardiness: Arrive at least 10 minutes early to warm up and stretch. If late, the lesson will be shortened. If more than 10 minutes late, the lesson is cancelled and considered unexcused; no makeup will be given.
                                </li>
                                <li className="space-y-2">
                                    <div className="font-medium text-gray-800">Make-up private lessons</div>
                                    <p>
                                        If there are free slots in the coach's regular schedule (during normal club hours), the student may book a makeup using the online system.
                                    </p>
                                </li>
                            </ol>
                        </PolicyCard>

                        <PolicyCard title="Make-up Classes">
                            <div className="space-y-3">
                                <p>
                                    Group classes that are missed may be made up in another class of the same level during the same month, subject to space availability.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Make-ups must be scheduled in advance through the online system</li>
                                    <li>No make-ups are allowed for different skill levels</li>
                                    <li>Make-ups expire at the end of each month</li>
                                </ul>
                            </div>
                        </PolicyCard>

                        <PolicyCard title="Vacations and Long-Term Absences">
                            <p>
                                TFA balances occupancy, scheduling, and instruction to provide an adequate experience at all levels.
                            </p>
                            <ol className="list-decimal pl-6 space-y-3">
                                <li>For an absence of three weeks or fewer, monthly tuition must be paid in full.</li>
                                <li className="space-y-2">
                                    <div>For an absence of 21 days or more:</div>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>
                                            To guarantee your spot in the same level/class upon return, pay 50% of the regular class fee for that level.
                                        </li>
                                        <li>
                                            If not, your class and club membership will be considered cancelled.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Notice must be given at least two weeks in advance for extended absences.
                                </li>
                            </ol>
                        </PolicyCard>

                        <PolicyCard title="Holiday Schedule">
                            <div className="space-y-3">
                                <p>
                                    TFA observes major holidays and may adjust schedules accordingly.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Group lessons follow the local school district calendar</li>
                                    <li>Private lessons may be available during some holidays</li>
                                    <li>Advanced notice will be given for any schedule changes</li>
                                    <li>No tuition adjustments for observed holidays</li>
                                </ul>
                            </div>
                        </PolicyCard>
                    </div>

                    {/* Right: Sidebar content */}
                    <div className="space-y-8">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/02/IMG_20190128_173856.jpg"
                                    alt="Texas Fencing Academy"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Texas Fencing Academy</h4>
                                <p className="text-sm text-gray-600">
                                    State-of-the-art training facility dedicated to fencing excellence and character development.
                                </p>
                            </div>
                        </div>

                        <PolicyCard title="Strip Coaching">
                            <div className="space-y-4">
                                <p>
                                    Strip Coaching is part of fencing education and is not optional. It is an important component of success and learning.
                                </p>
                                <p>
                                    TFA determines which coaches attend a competition based on number of participants and other factors.
                                </p>
                                <div className="pt-2">
                                    <div className="font-medium text-gray-800 mb-3">Fees (Updated 8/1/2022)</div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">Local (no hotel required)</span>
                                            <span className="font-semibold text-amber-600">$60 per event</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">Local Travel (hotel required)</span>
                                            <span className="font-semibold text-amber-600">$95 per event</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">Travel (flying required)</span>
                                            <span className="font-semibold text-amber-600">$210 first event</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                                            <span className="text-gray-700">Additional travel events</span>
                                            <span className="font-semibold text-amber-600">$95 each</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Important:</span> All strip coaching fees must be paid before competition. Unpaid fees are charged automatically after the event with a $5 late fee per event.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </PolicyCard>

                        <PolicyCard title="Contact Information">
                            <div className="space-y-3">
                                <p className="font-medium text-gray-800">Questions about policies?</p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Visit the front desk</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Email inquiries welcome</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Review online portal</span>
                                    </div>
                                </div>
                            </div>
                        </PolicyCard>
                    </div>
                </div>

                {/* Footer note */}
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-medium text-gray-700">Policy Updates:</span> These policies are reviewed periodically and may be updated to support club operations and athlete development. Members will be notified of significant changes via email and posted announcements.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function PoliciesPage() {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden">
            <InfoBanner />
            <Navbar />
            <Hero />
            <PoliciesContent />
        </div>
    );
}
