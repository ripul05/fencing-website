import { useState, useEffect } from 'react'
import { sanityFetch } from '../Sanity/sanityClient'
import { LANDING_PAGE_ABOUT_QUERY } from '../Sanity/queries'

// Helper function to render emphasis text
// Helper function to render emphasis text - FIXED VERSION
const renderTextWithEmphasis = (text, emphasisWords = []) => {
  if (!text) return { __html: '' }
  if (!emphasisWords || emphasisWords.length === 0) return { __html: text }
  
  let processedText = text
  emphasisWords.forEach(word => {
    if (word && typeof word === 'string') {
      // Escape special regex characters
      const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const regex = new RegExp(`(${escapedWord})`, 'gi')
      processedText = processedText.replace(
        regex, 
        `<em class="text-amber-600 font-medium">$1</em>`
      )
    }
  })
  
  return { __html: processedText }
}

// Icon mapping for blockquote icons
const getIconPath = (iconType) => {
  const icons = {
    'arrow-up': "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z",
    'star': "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
    'trophy': "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
    'target': "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    'sword': "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
  }
  return icons[iconType] || icons['arrow-up']
}

export default function AboutSection() {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setError(null)
        const data = await sanityFetch(LANDING_PAGE_ABOUT_QUERY)
        
        if (!data) {
          throw new Error('No data returned from Sanity')
        }
        
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Mobile optimized loading state
  if (loading) {
    return (
      <section id="about-section" className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-64 sm:h-96">
            <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </section>
    )
  }

  // Mobile optimized error state
  if (error) {
    return (
      <section id="about-section" className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-red-600 text-sm sm:text-base">Error loading about section: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Mobile optimized no data state
  if (!aboutData) {
    return (
      <section id="about-section" className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <p className="text-slate-600 text-sm sm:text-base">About section content not available</p>
          </div>
        </div>
      </section>
    )
  }

  const { sectionHeader, contentParagraphs, blockquote, callToAction, video, statsWidget } = aboutData

  return (
    <section id="about-section" className="py-12 sm:py-24 bg-gradient-to-b from-slate-50 relative overflow-hidden">
      {/* Unified Background elements - matching GallerySection */}
      <div className="absolute inset-0">
        {/* Gradient orbs - same positioning and styling as gallery */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-400/5 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-900/5 rounded-full"></div>
        
        {/* Subtle geometric patterns inspired by fencing - unified with gallery */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-px h-96 bg-gradient-to-b from-transparent via-amber-400 to-transparent transform rotate-12 animate-fade-in"></div>
          <div className="absolute bottom-1/4 right-1/4 w-px h-96 bg-gradient-to-b from-transparent via-slate-400 to-transparent transform -rotate-12 animate-fade-in delay-500"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-fade-in delay-300"></div>
        </div>
        
        {/* Floating decorative elements - matching gallery positions */}
        <div className="absolute top-32 right-32 w-4 h-4 border border-amber-200 rounded-full animate-pulse-slow delay-700"></div>
        <div className="absolute bottom-40 left-40 w-6 h-6 border border-slate-200 rounded-full animate-pulse-slow delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          
          {/* Content Side - Enhanced with animations - Mobile optimized */}
          <div className="space-y-6 sm:space-y-10 order-2 lg:order-1">
            {/* Animated section header - Mobile responsive */}
            <div className="space-y-6 sm:space-y-8 animate-slide-up">
              <div className="flex items-center space-x-2 sm:space-x-4 group">
                <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-500 group-hover:to-amber-600 transition-all duration-500 animate-slide-up"></div>
                <div className="relative">
                  <span className="text-xs sm:text-sm font-semibold text-amber-600 tracking-[0.2em] sm:tracking-[0.3em] relative z-10">
                    {sectionHeader?.label || 'OUR PHILOSOPHY'}
                  </span>
                  <div className="absolute inset-0 bg-amber-50 rounded-full scale-150 opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 leading-tight animate-slide-up delay-200 px-2 sm:px-0">
                {sectionHeader?.mainHeading?.regularText || 'We Forge'} 
                <span className="block font-semibold text-amber-600 hover:scale-105 transition-transform duration-300 inline-block">
                  {sectionHeader?.mainHeading?.highlightedText || 'Champions'}
                </span>
              </h2>
            </div>

            {/* Enhanced content with staggered animations - Mobile optimized */}
            <div className="space-y-6 sm:space-y-8 text-slate-600 leading-relaxed px-2 sm:px-0">
              {contentParagraphs && Array.isArray(contentParagraphs) && contentParagraphs.map((item, index) => (
                <p
                  key={index}
                  className={`animate-fade-in hover:text-slate-700 transition-colors duration-300 text-base sm:text-lg ${
                    item?.isLarge ? 'text-lg sm:text-xl font-light' : ''
                  }`}
                  style={{ animationDelay: `${item?.animationDelay || 400}ms` }}
                  dangerouslySetInnerHTML={renderTextWithEmphasis(item?.text, item?.emphasis)}
                />
              ))}

              {/* Enhanced blockquote with sophisticated styling - Mobile optimized */}
              {blockquote && (
                <blockquote className="relative group animate-fade-in delay-800">
                  <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-amber-50 to-slate-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative border-l-2 sm:border-l-4 border-amber-500 pl-4 sm:pl-8 py-4 sm:py-6 bg-gradient-to-r from-slate-50/50 to-transparent rounded-r-xl group-hover:shadow-md transition-all duration-500">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 sm:w-4 h-3 sm:h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d={getIconPath(blockquote.icon)} clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="italic text-slate-700 font-light leading-relaxed mb-2 text-sm sm:text-base">
                          "{blockquote.quote}"
                        </p>
                        <div className="flex items-center space-x-2 text-amber-600">
                          <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                          <span className="text-xs font-medium tracking-wider">
                            {blockquote.attribution}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </blockquote>
              )}
            </div>

            {/* Enhanced CTA with sophisticated styling - Mobile optimized */}
            {callToAction && (
              <div className="pt-8 sm:pt-10 animate-slide-up delay-1000 px-2 sm:px-0">
                <div className="relative inline-block group w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-slate-600 rounded-lg opacity-20 blur group-hover:opacity-40 transition-opacity duration-500"></div>
                  <a
                    href={callToAction.buttonUrl}
                    className="relative group inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-slate-900 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-elegant hover:shadow-slate-900/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <span className="relative z-10 group-hover:text-slate-900 transition-colors duration-500 tracking-wide text-sm sm:text-base">
                      {callToAction.buttonText}
                    </span>
                    
                    <svg className="relative z-10 ml-3 sm:ml-4 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 group-hover:text-slate-900 transition-all duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                {callToAction.description && (
                  <p className="mt-3 sm:mt-4 text-sm text-slate-500 font-light animate-fade-in delay-1200 text-center sm:text-left">
                    {callToAction.description}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Video Side with sophisticated frame and animations - Mobile optimized */}
          {video && (
            <div className="relative animate-fade-in delay-500 order-1 lg:order-2">
              {/* Multi-layered decorative frame - Mobile responsive */}
              <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-br from-amber-100/30 via-transparent to-slate-100/30 rounded-2xl sm:rounded-3xl animate-pulse-slow"></div>
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-amber-100/50 via-transparent to-slate-100/50 rounded-xl sm:rounded-2xl"></div>
              
              {/* Main video container - Mobile optimized */}
              <div className="relative group">
                <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-elegant overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-900/10">
                  <video
                    autoPlay={video.autoplay}
                    muted={video.muted}
                    loop={video.loop}
                    controls={video.showControls}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    poster={video.posterImage?.asset?.url}
                  >
                    <source
                      src={video.videoUrl || video.videoFile?.asset?.url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Enhanced overlay with better positioning - Mobile optimized */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-4 sm:p-6 lg:p-8">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-light leading-relaxed mb-2 text-sm sm:text-base">
                            {video.videoDescription}
                          </p>
                          <div className="flex items-center space-x-2 text-amber-300">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium tracking-wider">
                              {video.videoLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Play button overlay for better UX - Mobile responsive */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                      <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating stats or badges - Mobile optimized */}
                {statsWidget?.isVisible && (
                  <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-slate-900">
                        {statsWidget.number}
                      </div>
                      <div className="text-xs text-slate-600 font-medium">
                        {statsWidget.label}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional decorative elements - Mobile responsive */}
              <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-12 sm:w-16 h-12 sm:h-16 border-2 border-amber-200 rounded-full opacity-30 animate-pulse-slow delay-2000"></div>
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-8 sm:w-12 h-8 sm:h-12 border-2 border-slate-200 rounded-full opacity-30 animate-pulse-slow delay-1000"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

