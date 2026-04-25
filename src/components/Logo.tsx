import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background Circle (Subtle) */}
      <circle cx="100" cy="100" r="95" fill="#1B4332" fillOpacity="0.05" />
      
      {/* Outer Ring - Broken for modern feel */}
      <path 
        d="M100 10 A 90 90 0 1 1 90 10" 
        stroke="#1B4332" 
        strokeWidth="1" 
        strokeLinecap="round" 
        fill="none"
      />
      
      {/* The Nib - Minimalist Line Art */}
      <g transform="translate(100, 100)">
        {/* Main Nib Body */}
        <path 
          d="M0 -70 C 15 -70, 35 -30, 35 10 L 25 70 L -25 70 L -35 10 C -35 -30, -15 -70, 0 -70 Z" 
          fill="#1B4332" 
          stroke="#D4AF37" 
          strokeWidth="2"
        />
        
        {/* The Slit */}
        <line 
          x1="0" y1="-70" 
          x2="0" y2="-10" 
          stroke="#D4AF37" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        
        {/* The Breather Hole - Stylized as a Diamond/Spark */}
        <path 
          d="M0 -15 L 5 -10 L 0 -5 L -5 -10 Z" 
          fill="#D4AF37" 
        />
        
        {/* Abstract 'S' for Storytelling / Scholar integrated into the nib shoulders */}
        <path 
          d="M-20 -20 Q -10 -30, 0 -20 Q 10 -10, 20 -20" 
          stroke="#D4AF37" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.5"
        />
        
        {/* Decorative Lines - Raven Wing Metaphor */}
        <path 
          d="M-35 10 Q -45 30, -25 50" 
          stroke="#D4AF37" 
          strokeWidth="1" 
          fill="none"
        />
        <path 
          d="M35 10 Q 45 30, 25 50" 
          stroke="#D4AF37" 
          strokeWidth="1" 
          fill="none"
        />
      </g>
      
      {/* Accent Dots - Intellectual/Creative Spark */}
      <circle cx="100" cy="20" r="2" fill="#D4AF37" />
      <circle cx="180" cy="100" r="1.5" fill="#D4AF37" opacity="0.6" />
      <circle cx="20" cy="100" r="1.5" fill="#D4AF37" opacity="0.6" />
    </svg>
  );
};

export default Logo;
