import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fadeIn } from '../animations/animationVariants';

// Reusable Magnetic Button wrapper for premium hover
function MagneticButton({ children, className, style, onClick }) {
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Displacement offset from center
    const dx = e.clientX - (rect.left + width / 2);
    const dy = e.clientY - (rect.top + height / 2);

    // Limit pull to 20px max
    x.set(dx * 0.35);
    y.set(dy * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        x: springX,
        y: springY,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function CTA() {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleScrollToProcess = () => {
    const el = document.getElementById('process');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Animated Gradient Overlay */}
      <div className="cta-bg-layer" />

      {/* Floating particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(6)].map((_, idx) => (
          <motion.div
            key={idx}
            style={{
              position: 'absolute',
              width: idx % 2 === 0 ? '12px' : '24px',
              height: idx % 2 === 0 ? '12px' : '24px',
              borderRadius: '50%',
              background: idx % 2 === 0 ? 'rgba(6, 182, 212, 0.2)' : 'rgba(139, 92, 246, 0.2)',
              filter: 'blur(4px)',
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 5 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="section-container" style={{ zIndex: 2 }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn('up', 'tween', 0.2, 0.8)}
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '24px',
            }}
          >
            <Sparkles size={14} style={{ color: '#06b6d4' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', color: '#06b6d4' }}>
              COLLABORATION
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '24px',
            }}
          >
            READY TO CREATE<br />
            SOMETHING <span className="gradient-text">AMAZING?</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '560px',
              marginInline: 'auto',
            }}
          >
            Let's connect and deconstruct your ideas into full-stack robust systems. Start your digital journey with us today.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <MagneticButton
              onClick={handleScrollToContact}
              className="btn-primary"
              style={{ padding: '16px 36px', fontSize: '1.05rem', cursor: 'pointer' }}
            >
              Start Your Journey <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton
              onClick={handleScrollToProcess}
              className="btn-secondary"
              style={{ padding: '16px 36px', fontSize: '1.05rem', cursor: 'pointer' }}
            >
              How It Works
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta-bg-layer {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, #040814 0%, #0b0f1e 40%, rgba(139, 92, 246, 0.15) 75%, rgba(6, 182, 212, 0.15) 100%);
          background-size: 200% 200%;
          animation: shiftGradients 10s ease infinite alternate;
        }

        @keyframes shiftGradients {
          0% { background-position: 0% 50% }
          100% { background-position: 100% 50% }
        }
      `}</style>
    </section>
  );
}
