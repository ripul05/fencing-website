import InfoBanner from "../../HomePageComponent/InfoBanner";
import Navbar from "../../HomePageComponent/Navbar";


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
                    Fencing <span className="font-semibold text-amber-600">Links</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
                    Your comprehensive resource for fencing organizations, equipment, and community connections
                </p>
            </div>
        </section>
    );
}

function LinkCard({ title, children, className = "" }) {
    return (
        <div className={`bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 ${className}`}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
                <span className="text-amber-600">• </span> {title}
            </h3>
            <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
        </div>
    );
}

function LinkItem({ title, url, description }) {
    return (
        <div className="border-l-4 border-amber-400 pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors duration-300">
            <h4 className="font-semibold text-gray-800 mb-2">
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
                >
                    {title}
                </a>
            </h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function FencingLinksContent() {
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
                {/* Introduction */}
                <div className="text-center mb-16">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                            If you're looking for a resource to help you extend your knowledge of fencing, then you've found it. 
                            Here you'll find virtually anything that you need in fencing and all things that are related to fencing.
                        </p>
                        <p className="text-lg text-gray-600">
                            These <strong>fencing links</strong> are organized into categories. In the list you'll find a lot of information 
                            related to important fencing resources, both national and international.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Main sections stacked */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        <LinkCard title="Fencing Organizations">
                            <div className="space-y-4">
                                <LinkItem 
                                    title="Federation Internationale D'Escrime (FIE)"
                                    url="http://www.fie.org/"
                                    description="The governing body of international fencing. Find information about international competitions, historical results, athlete ratings, and the official 'Escrime' magazine."
                                />
                                
                                <LinkItem 
                                    title="US Fencing Association (USFA)"
                                    url="http://usfencing.org/"
                                    description="The governing body of US fencing. Information on national level events, competitions, national championships, North America Cup, and relevant manuals."
                                />
                                
                                <LinkItem 
                                    title="US Fencing Coaches Association (USFCA)"
                                    url="http://usfca.org/"
                                    description="Organization providing resources, education, training and certificates to US fencing coaches."
                                />
                                
                                <LinkItem 
                                    title="South Texas Division of USFA"
                                    url="https://www.southtexasdivision.net/"
                                    description="TFA belongs to the South Texas Division of USFA. Find local competitions and regional information here."
                                />
                            </div>
                        </LinkCard>

                        <LinkCard title="International Fencing Resources">
                            <div className="space-y-4">
                                <LinkItem 
                                    title="FIE YouTube Channel"
                                    url="https://www.youtube.com/user/FIEvideo"
                                    description="The most important fencing video channel on the web! All highest level international tournaments are live streamed and archived here."
                                />
                                
                                <LinkItem 
                                    title="Asian Fencing Confederation"
                                    url="http://www.asianfencing.com/"
                                    description="Asian fencing confederation with links to member nation's federations. Great resource as Asia becomes a fencing superpower."
                                />
                            </div>
                        </LinkCard>

                        <LinkCard title="Fencing Equipment Vendors">
                            <div className="space-y-4">
                                <p className="text-gray-600 mb-4">
                                    Unlike traditional sports, fencing equipment cannot be purchased in regular sport shops. 
                                    Here are reputable vendors we recommend based on our experience:
                                </p>
                                
                                <LinkItem 
                                    title="Absolute Fencing Gear"
                                    url="http://www.absolutefencinggear.com/"
                                    description="One of the largest fencing equipment companies in the US. Easy to navigate website with clear pricing. Located in New Jersey."
                                />
                                
                                <LinkItem 
                                    title="The Fencing Post"
                                    url="http://thefencingpost.net/"
                                    description="Reputable fencing equipment company from Southern California with a good reputation for weapon orders."
                                />
                                
                                <LinkItem 
                                    title="Fencing.net"
                                    url="http://www.fencing.net/"
                                    description="Atlanta-based company famous for their exceptional fencing forum and blog resources in addition to equipment."
                                />
                                
                                <LinkItem 
                                    title="Leon Paul USA"
                                    url="http://www.leonpaulusa.com/"
                                    description="Innovative UK manufacturer with US subsidiary. Higher-end pricing but excellent quality and the best website experience in fencing."
                                />
                            </div>
                        </LinkCard>

                        <LinkCard title="Community Resources">
                            <div className="space-y-4">
                                <LinkItem 
                                    title="Fencing Forum"
                                    url="http://www.fencingforum.com/"
                                    description="The most popular fencing forum in the USA with discussions on various fencing topics."
                                />
                                
                                <LinkItem 
                                    title="AskFred"
                                    url="https://askfred.net/"
                                    description="Fencing Results and Events Database. All domestic competitions (except nationals and NACs) are run through this site."
                                />
                            </div>
                        </LinkCard>

                        <LinkCard title="Fencing Blogs & Influencers">
                            <div className="space-y-4">
                                <LinkItem 
                                    title="Better Fencer"
                                    url="https://betterfencer.com/"
                                    description="The most comprehensive fencing blog managed by Olympic Silver Medalist Jason Rogers. 2-3 quality articles monthly."
                                />
                                
                                <LinkItem 
                                    title="Fencing University"
                                    url="https://fencinguniversity.org/"
                                    description="Platform created by Tim Morehouse to promote fencing in the US and Fencing in The Schools program."
                                />
                                
                                <LinkItem 
                                    title="The Fencing Coach"
                                    url="http://thefencingcoach.com/"
                                    description="Blog by Damien Lehfeld providing coaching and parental advice with great observations and insights."
                                />
                                
                                <LinkItem 
                                    title="Sabre Coach Kate"
                                    url="https://sabrecoachkate.wordpress.com/"
                                    description="Personal blog of coach Kate Sierra from Cutting Edge Fencing Club in Texas with quality material."
                                />
                                
                                <LinkItem 
                                    title="Race Imboden's Blog"
                                    url="http://www.havefoilwilltravel.com/"
                                    description="Personal blog of World #1 ranked fencer Race Imboden. Mix of fencing, fashion, and insights from an elite athlete."
                                />
                                
                                <LinkItem 
                                    title="West Coast Fencing Archive"
                                    url="http://www.westcoastfencingarchive.com/"
                                    description="Historical fencing resource with articles, stories, and memorabilia from the beginning of last century."
                                />
                            </div>
                        </LinkCard>
                    </div>

                    {/* Right: Sidebar content */}
                    <div className="space-y-8">
                        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200">
                                <img
                                    src="https://texasfencingacademy.org/wp-content/uploads/2019/02/IMG_20190128_173856.jpg"
                                    alt="Texas Fencing Academy Training"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Texas Fencing Academy</h4>
                                <p className="text-sm text-gray-600">
                                    State-of-the-art training facility dedicated to fencing excellence and building character through sport.
                                </p>
                            </div>
                        </div>

                        <LinkCard title="Living Resource">
                            <div className="space-y-4">
                                <p>
                                    This post is intended to be a living resource, constantly updated with new information. 
                                    The current list is not complete and by definition will never be.
                                </p>
                                <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Found a resource not listed here?</span> Please let us know! 
                                        We'll include it in our next update with full acknowledgement of your contribution.
                                    </p>
                                </div>
                            </div>
                        </LinkCard>

                        <LinkCard title="Social Media">
                            <div className="space-y-4">
                                <p>
                                    Many fencing organizations, companies, teams and athletes have Facebook pages and Twitter accounts 
                                    with valuable information, announcements, and updates.
                                </p>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Follow your favorite fencers</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Join fencing communities</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                                        <span className="text-gray-600">Stay updated on events</span>
                                    </div>
                                </div>
                            </div>
                        </LinkCard>

                        <LinkCard title="Equipment Tips">
                            <div className="space-y-4">
                                <p className="font-medium text-gray-800">Important Notes:</p>
                                <ul className="list-disc pl-6 space-y-2 text-sm">
                                    <li>Most vendors carry multiple world-famous fencing brands</li>
                                    <li>Quality varies significantly between manufacturers</li>
                                    <li>Consider shipping costs and return policies</li>
                                    <li>Ask your coach for recommendations</li>
                                </ul>
                                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Tip:</span> Start with basic equipment and upgrade as you advance in the sport.
                                    </p>
                                </div>
                            </div>
                        </LinkCard>
                    </div>
                </div>

                {/* Footer note */}
                <div className="max-w-3xl mx-auto mt-16 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-medium text-gray-700">Resource Updates:</span> This list is regularly updated with new resources and verified links. 
                            We welcome suggestions from the fencing community to keep this resource comprehensive and current.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function FencingLinksPage() {
    return (
        <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen overflow-hidden">
            <InfoBanner />
            <Navbar />
            <Hero />
            <FencingLinksContent />
        </div>
    );
}
