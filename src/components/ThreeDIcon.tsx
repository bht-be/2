import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface ThreeDIconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

export default function ThreeDIcon({ 
  icon: Icon, 
  size = 24, 
  color = "currentColor", 
  className = "",
  animate = true
}: ThreeDIconProps) {
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center three-d-icon ${className}`}
      whileHover={animate ? { 
        rotateX: 15, 
        rotateY: 15, 
        scale: 1.1,
        z: 50
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      {/* Shadow layer for depth */}
      <Icon 
        size={size} 
        className="absolute opacity-20 blur-[2px] translate-y-1 translate-x-1" 
        style={{ color: "black" }}
      />
      {/* Main icon */}
      <Icon 
        size={size} 
        style={{ color }} 
        className="relative z-10"
      />
      
      {/* Glow effect on hover */}
      {animate && (
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-0"
          whileHover={{ opacity: 0.4 }}
          style={{ backgroundColor: color }}
        />
      )}
    </motion.div>
  );
}
