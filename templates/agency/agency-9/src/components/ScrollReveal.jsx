import React from 'react';
import { motion } from 'framer-motion';

/**
 * ScrollReveal Component
 * Smooth scroll-observer motion wrapper for spatial section entry animations.
 */
export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 32,
  threshold = 0.15,
  className = '',
  style = {},
  cascade = false,
  staggerDelay = 0.08,
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'zoom':
        return { scale: 0.95, opacity: 0 };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'zoom':
        return { scale: 1, opacity: 1 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  const containerVariants = {
    hidden: getInitialPosition(),
    visible: {
      ...getTargetPosition(),
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Custom cinematic spring-like ease
        when: cascade ? 'beforeChildren' : undefined,
        staggerChildren: cascade ? staggerDelay : undefined,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
