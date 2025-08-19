import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '../Sanity/sanityClient';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// Optimized video URL builder
export function videoUrlFor(videoAsset, options = {}) {
  if (!videoAsset?.url) return null;
  
  const {
    quality = 'auto',
    format = 'mp4'
  } = options;
  
  // For Sanity file assets, the URL is direct
  // Add optimization parameters if needed
  let url = videoAsset.url;
  
  // Add query parameters for optimization (if your CDN supports them)
  const params = new URLSearchParams();
  if (quality !== 'auto') params.set('quality', quality);
  if (format && format !== 'mp4') params.set('fm', format);
  
  const queryString = params.toString();
  return queryString ? `${url}?${queryString}` : url;
}

// Utility to get optimized video attributes
export function getVideoAttributes(videoAsset) {
  if (!videoAsset) return {};
  
  return {
    src: videoAsset.url,
    type: videoAsset.mimeType || 'video/mp4',
    size: videoAsset.size,
    preload: videoAsset.size > 5000000 ? 'metadata' : 'auto' // 5MB threshold
  };
}
