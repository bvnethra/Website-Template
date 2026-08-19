import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';

export default function ProductBackdrop({ containerRef }) {
  const [isMobile, setIsMobile] = useState(false);
  
  // Motion values for tracking cursor position relative to window center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Damped springs for smooth lagging parallax shift
  const springConfig = { damping: 28, stiffness: 120, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map position relative to center (-0.5 to 0.5) to a max 15px shift
  const translateX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Scroll linked transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return; // Disable parallax calculation on touch devices
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth) - 0.5;
      const y = (e.clientY / clientHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {/* 1. Red Spotlight Glow Behind the Gimbal */}
      <div style={{
        position: 'absolute',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(226, 123, 62, 0.15) 0%, rgba(255, 58, 26, 0.08) 50%, transparent 100%)',
        filter: 'blur(60px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* 2. Main Animated Product Image Wrapper */}
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '520px',
          height: 'auto',
          zIndex: 2,
          // Combine Spring Parallax and Scroll transforms
          x: isMobile ? 0 : translateX,
          y: isMobile ? 0 : translateY,
          scale: scrollScale,
          opacity: scrollOpacity
        }}
      >
        <motion.img
          src="/isteady_product.png"
          alt="iSteady MT3 Pro Stabilizer"
          // Load animation: fade in + scale 0.95 to 1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            // Idle floating up-down bob loop
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { duration: 1.0, ease: 'easeOut' },
            scale: { duration: 1.0, ease: 'easeOut' },
            y: { 
              duration: 4.5, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: 1.0
            }
          }}
          style={{
            width: '90%',
            height: 'auto',
            maxHeight: '65vh',
            objectFit: 'contain',
            // Mask checkerboard pattern by blending or visual drop shadows
            filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.8))'
          }}
        />
      </motion.div>
    </div>
  );
}
