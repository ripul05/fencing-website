import React from 'react';

export const FencingSilhouetteIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Head */}
    <ellipse cx="44" cy="16" rx="6" ry="8" fill="currentColor"/>
    {/* Torso */}
    <rect x="38" y="20" width="12" height="18" rx="5" fill="currentColor"/>
    {/* Right arm */}
    <rect x="48" y="22" width="12" height="4" rx="2" fill="currentColor" transform="rotate(-15 48 22)"/>
    {/* Left arm (bent back) */}
    <rect x="34" y="22" width="8" height="3" rx="1.3" fill="currentColor" transform="rotate(-40 38 23.5)"/>
    {/* Right leg (lunge) */}
    <rect x="44" y="38" width="16" height="4" rx="2" fill="currentColor" transform="rotate(20 44 38)"/>
    {/* Left leg */}
    <rect x="34" y="38" width="5" height="14" rx="2.2" fill="currentColor" />
    {/* Blade */}
    <rect x="60" y="24" width="26" height="1.2" fill="currentColor" />
  </svg>
);

export default FencingSilhouetteIcon;
