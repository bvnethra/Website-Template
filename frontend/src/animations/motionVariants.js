// Framer Motion Animation Variants

export const introVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 }
  },
  exit: {
    y: "-100%",
    skewY: -5,
    transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] }
  }
};

export const paperFoldVariants = {
  hidden: { rotateX: 90, opacity: 0 },
  visible: { 
    rotateX: 0, 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
    rotateY: -90, 
    opacity: 0, 
    transition: { duration: 0.8, ease: "easeIn" } 
  }
};

export const wordRevealVariants = {
  hidden: { y: "100%", rotate: 5 },
  visible: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
  }
};

export const floatVariants = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 1.5, 0],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const letterFloatingVariants = (delay = 0) => ({
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay
    }
  }
});

export const envelopeVariants = {
  closed: { scaleY: 1 },
  open: { 
    scaleY: [1, 1.1, 0], 
    transition: { duration: 0.8, ease: "easeInOut" } 
  }
};

export const paperSlideVariants = {
  closed: { y: "100%", opacity: 0 },
  open: { 
    y: "0%", 
    opacity: 1, 
    transition: { delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const planeLaunchVariants = {
  idle: { x: 0, y: 0, opacity: 0, scale: 0 },
  launch: {
    x: [0, 200, 600],
    y: [0, -150, -400],
    rotate: [0, -15, -45],
    scale: [0, 1, 0.2],
    opacity: [0, 1, 0],
    transition: { duration: 1.5, ease: "easeIn" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

export const springHover = {
  hover: {
    scale: 1.05,
    y: -5,
    boxShadow: "10px 10px 0px #232120",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};
