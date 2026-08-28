import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Splash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait for exit animation to complete
        }, 500); // Stay completed for 500ms
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    exit: {
      y: '-100vh',
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Cinematic cubic-bezier
      },
    },
  };

  const letterVariants = {
    hidden: { y: 30, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const brandText = "MOTIONA";

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="splash-screen"
          variants={containerVariants}
          exit="exit"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#040814',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999,
            overflow: 'hidden',
          }}
        >
          {/* Animated Background Particles */}
          <div className="splash-particles" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[...Array(15)].map((_, idx) => (
              <motion.div
                key={idx}
                style={{
                  position: 'absolute',
                  width: Math.random() * 6 + 2,
                  height: Math.random() * 6 + 2,
                  background: idx % 2 === 0 ? '#3b82f6' : '#06b6d4',
                  borderRadius: '50%',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  filter: 'blur(1px)',
                }}
                animate={{
                  y: [0, -100 - Math.random() * 100],
                  x: [0, (Math.random() - 0.5) * 50],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Logo Reveal */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '30px' }}>
            {brandText.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="show"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '3.5rem',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '2px',
                  background: i >= 4 ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'none',
                  WebkitBackgroundClip: i >= 4 ? 'text' : 'none',
                  WebkitTextFillColor: i >= 4 ? 'transparent' : 'none',
                  textShadow: i < 4 ? '0 0 20px rgba(255, 255, 255, 0.1)' : 'none',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress Bar Container */}
          <div style={{ width: '220px', position: 'relative' }}>
            <div
              style={{
                height: '2px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '1px',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                  width: `${progress}%`,
                  boxShadow: '0 0 8px #3b82f6',
                }}
              />
            </div>

            {/* Percentage Text */}
            <motion.div
              style={{
                marginTop: '12px',
                color: '#9ca3af',
                fontSize: '0.9rem',
                fontFamily: "'Space Grotesk', sans-serif",
                textAlign: 'center',
                letterSpacing: '1px',
              }}
            >
              {progress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
