import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Compass, Layers, ShieldCheck, Award } from 'lucide-react';
import './FloatingCard.css';

const iconMap = {
  Sparkles,
  Zap,
  Compass,
  Layers,
  ShieldCheck,
  Award
};

export default function FloatingCard({ title, subtitle, iconName, floatDistance = 10, duration = 4, className = '', delay = 0 }) {
  const IconComponent = iconMap[iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -floatDistance, 0] 
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: {
          duration: duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: delay + 0.5
        }
      }}
      className={`floating-card ${className}`}
    >
      <div className="floating-card-icon-wrapper">
        <IconComponent className="floating-card-icon" size={18} />
      </div>
      <div className="floating-card-text">
        <span className="floating-card-title">{title}</span>
        {subtitle && <span className="floating-card-subtitle">{subtitle}</span>}
      </div>
      <div className="floating-card-pulse" />
    </motion.div>
  );
}
