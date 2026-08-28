export const fadeIn = (direction = 'up', type = 'tween', delay = 0, duration = 0.6) => ({
  hidden: {
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const scaleUp = (delay = 0, duration = 0.5) => ({
  hidden: {
    scale: 0.85,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      delay,
      duration,
    },
  },
});

export const floatTransition = {
  y: {
    duration: 3,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  },
  rotate: {
    duration: 6,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
  }
};

export const glowVariants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 0.8, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
