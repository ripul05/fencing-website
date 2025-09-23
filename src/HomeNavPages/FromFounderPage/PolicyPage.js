import React from "react";
import FooterSection from "../../Sections/FooterSection";
import InfoBanner from "../../HomePageComponent/InfoBanner";
import Navbar from "../../HomePageComponent/Navbar";



function Hero() {
    return (
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-amber-600 mb-4 tracking-tight">
                {title}
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
        </div>
    );
}




function PoliciesContent() {
    return (
        <section className="relative pt-0 pb-24 overflow-hidden">
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Main sections stacked */}
                    <div className="lg:col-span-2 space-y-8">
                        <PolicyCard title="General">
                            <div className="space-y-3">
                                <p>
                                    The Texas Fencing Academy (TFA) policies define expectations for private lessons, make-up lessons, and long absences. These policies may change without notice.
                                </p>
                                <p className="font-medium text-amber-600 text-left">This document summarizes:</p>
                                <ul className="list-disc pl-6 space-y-1 text-left">
                                    <li>Private fencing lessons policy: scheduling, cancellation, make-ups</li>
                                    <li>Make-up classes</li>
                                    <li>Vacation notice and payments</li>
                                    <li>Holiday schedule (group lessons, private make-ups)</li>
                                </ul>

                            </div>
                        </PolicyCard>
                        <PolicyCard title="Private Lessons Policies">
                            <ol className="list-decimal pl-6 space-y-3 text-left">
                                <li>
                                    Private fencing lessons are provided to students only at the discretion of TFA and are subject to availability of the coach and space at TFA. TFA reserves the right to discontinue private lessons for any student at any time. TFA does not typically revoke private training, but may exercise this right due to unusual circumstances.</li>
                                <li>
                                    Please note that your private lesson slot is reserved specifically for you and TFA does its best to keep it unchanged throughout the entire season (Aug 1 – July 31 each year). As the club grows it becomes increasingly difficult to schedule and reschedule the lessons and it becomes more important that fencers show up on time, keep their scheduled time slot, and avoid cancellations within reason.</li>
                                <li>
                                    All private lessons are managed via online software and it is responsibility of a fencer/parent to manage cancellations and makeup lessons per TFA policy.</li>
                                <li>
                                    All private lessons are paid at the end of the month based on actual number of private lessons taken in this month. If fencer or parent forgot to cancel a private lesson in the system it will be charged in full and no makeup or credit will be given. It is a responsibility of a fencer or parent to cancel private lessons on time to avoid charged for non taken lessons.</li>
                                <li className="space-y-2">
                                    <div className="font-medium text-gray-800">Cancellation policy:</div>
                                    <ul className="list-disc pl-6 space-y-2 text-left">
                                        <li>All private lessons must be cancelled at least 24 hours in advance.</li>
                                        <li>
                                            Sometimes it is unavoidable to cancel a lesson on the same day (for example, in case of sudden sickness, family emergency). In that case TFA will allow a last-minute cancellation. This type of cancellation is only allowed up to two times per fencing season (August 1 – July 31 each year). </li>
                                        <li>
                                            If the student repeatedly misses or is late to his/her private lesson, TFA will reconsider providing private lessons to that student.</li>
                                    </ul>
                                </li>
                                <li className="space-y-2">
                                    <div className="font-medium text-gray-800">Tardiness:</div>
                                    <ul className="list-disc pl-6 text-left">
                                        <li>
                                            Students are expected to arrive at least 10 minutes prior to the start of the private lesson to allow time for warming up and stretching. If the student is late, the lesson will be shortened accordingly. If the student is more than 10 minutes late, the lesson will be cancelled and considered an unexcused cancellation. No make-up will be given.</li>
                                    </ul>

                                </li>
                                <li className="space-y-2">
                                    <div className="font-medium text-gray-800">Make-up private lessons:</div>
                                    <ul className="list-disc pl-6 text-left">
                                        <li>
                                            In general if there are existing free slots in the coach’s schedule (in regular club hours such that the coach does not need to make a special trip to the club for the lesson) then the the student can book one of these slots using online scheduling software. </li>
                                    </ul>

                                </li>
                            </ol>
                        </PolicyCard>


                        <PolicyCard title="Vacations and Long-Term Absences">
                            <p>
                                TFA balances occupancy, scheduling, and instruction to provide an adequate experience at all levels.
                            </p>
                            <ol className="list-decimal pl-6 space-y-3 text-left list-inside">
                                <li>For an absence of three weeks or fewer, monthly tuition must be paid in full.</li>
                                <li>
                                    <span className="font-medium text-gray-800">For an absence of 21 days of more :</span>
                                    <ul className="list-disc pl-6 space-y-2 text-left">
                                        <li>In order to guarantee your spot in the same level/class when you return, the class fee will be 50% of the regular class dee for the same level. </li>
                                        <li>
                                            If you do not  meet the above criteria, you effectively cancel your class and club membership.  </li>

                                    </ul>
                                </li>

                            </ol>
                        </PolicyCard>

                       
                    </div>
                    {/* Right: Sidebar content */}
                    <div className="space-y-8">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-500 transition-all">
                            <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/02/IMG_20190128_173856.jpg"
                                    alt="Texas Fencing Academy"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl shadow-lg p-6">
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
                                        <p className="text-sm text-gray-700 text-left">
                                            <span className="font-medium">Important:</span> All strip coaching fees are to be paid before competition, and will be charged automatically (+$5/event late fees) after the competition if not paid on time. This is a critical aspect of competitive fencing, or else we would not insist on it!
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </PolicyCard>
                        
                    </div>
                </div>
                {/* Footer note */}
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed text-left">
  <span className="font-medium text-gray-700">Policy Updates:</span> TFA will decide how many coaches and who among coaches will go based on the number of fencers participating in the competition. The decision is solely of TFA based on these and other factors.
</p>
</div>
                </div>
            </div>
        </section>
    );
}

export default function PoliciesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-slate-200">
            <InfoBanner />
            <Navbar />
            <Hero />
            <PoliciesContent />
            <FooterSection />
        </div>
    );
}
