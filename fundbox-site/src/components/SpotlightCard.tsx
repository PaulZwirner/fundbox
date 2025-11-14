"use client";

import { useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import './SpotlightCard.css';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <motion.div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`card-spotlight ${className}`}
      style={{ zIndex: 1 }}
      whileHover={{ 
        scale: 1.05, 
        y: -8,
        zIndex: 20,
        boxShadow: className.includes('custom-spotlight-card') 
          ? '0 40px 90px -20px rgba(0, 0, 0, 0.65), 0 28px 60px -15px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          : undefined,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={false}
    >
      {children}
    </motion.div>
  );
};

export default SpotlightCard;

