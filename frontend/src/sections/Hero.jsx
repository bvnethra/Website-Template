import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Sparkles } from 'lucide-react';
import { fadeIn } from '../animations/animationVariants';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX - window.innerWidth / 2) / 25; // damp scale
      const y = (clientY - window.innerHeight / 2) / 25;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set up motion values for spring-based parallax
  const springConfig = { stiffness: 60, damping: 20 };
  const posX = useSpring(0, springConfig);
  const posY = useSpring(0, springConfig);

  useEffect(() => {
    posX.set(mousePos.x);
    posY.set(mousePos.y);
  }, [mousePos, posX, posY]);

  // Derived transforms
  const bgX = useTransform(posX, (value) => value * -0.5);
  const bgY = useTransform(posY, (value) => value * -0.5);
  const ringX = useTransform(posX, (value) => value * 0.8);
  const ringY = useTransform(posY, (value) => value * 0.8);
  const cardX = useTransform(posX, (value) => value * 1.5);
  const cardY = useTransform(posY, (value) => value * 1.5);

  const scrollToContact = (e) => {
    e.preventDefault();
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

  const scrollToAbout = (e) => {
    e.preventDefault();
    const el = document.getElementById('about');
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
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      {/* Background Orbs with slight parallax opposite movement */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          x: bgX,
          y: bgY,
          zIndex: 1,
        }}
      >
        <div className="bg-glow-orb-1" style={{ top: '15%', left: '5%' }} />
        <div className="bg-glow-orb-2" style={{ bottom: '15%', right: '5%' }} />
      </motion.div>

      <div className="section-container" style={{ width: '100%', zIndex: 2 }}>
        <div className="hero-grid">
          {/* Hero Left Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn('right', 'tween', 0.2, 0.8)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                alignSelf: 'flex-start',
                marginBottom: '20px',
              }}
            >
              <Sparkles size={14} style={{ color: '#06b6d4' }} />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#06b6d4',
                  letterSpacing: '1px',
                }}
              >
                THE FUTURE IS NOW
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                lineHeight: 1.15,
                fontWeight: 800,
                marginBottom: '20px',
                textAlign: 'left',
              }}
            >
              BUILD THE <span className="gradient-text">FUTURE</span>.<br />
              EXPERIENCE THE <span className="gradient-text-cyan">DIFFERENCE</span>.
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                color: 'var(--text-secondary)',
                marginBottom: '35px',
                maxWidth: '520px',
                textAlign: 'left',
              }}
            >
              We craft highly immersive, state-of-the-art web architectures backed by secure, modular systems. Transform your business ideas into digital realities.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Get Started <ArrowRight size={18} />
              </a>
              <a
                href="#about"
                onClick={scrollToAbout}
                className="btn-secondary"
                style={{ cursor: 'pointer' }}
              >
                Explore More
              </a>
            </div>
          </motion.div>

          {/* Hero Right Visual (3D-inspired responsive canvas) */}
          <div
            style={{
              position: 'relative',
              height: '480px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Center glowing core orb */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 0 30px rgba(6, 182, 212, 0.4)',
                  '0 0 60px rgba(139, 92, 246, 0.5)',
                  '0 0 30px rgba(6, 182, 212, 0.4)',
                ],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #06b6d4 0%, #8b5cf6 100%)',
                filter: 'blur(3px)',
                position: 'absolute',
                zIndex: 3,
              }}
            />

            {/* Rotating rings with parallax */}
            <motion.div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                border: '1.5px dashed rgba(6, 182, 212, 0.3)',
                borderRadius: '50%',
                x: ringX,
                y: ringY,
                zIndex: 2,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              style={{
                position: 'absolute',
                width: '360px',
                height: '360px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '50%',
                x: useTransform(posX, (value) => value * -0.6),
                y: useTransform(posY, (value) => value * -0.6),
                zIndex: 2,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Glass Cards */}
            <motion.div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '15%',
                right: '5%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '180px',
                x: cardX,
                y: cardY,
                zIndex: 4,
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#3b82f6',
                }}
              >
                <Cpu size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Security Check</p>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>99.9% Secure</h4>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '5%',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '180px',
                x: useTransform(posX, (value) => value * -1.2),
                y: useTransform(posY, (value) => value * -1.2),
                zIndex: 4,
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  color: '#06b6d4',
                }}
              >
                <Layers size={20} />
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Core Flow</p>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Smooth FPS</h4>
              </div>
            </motion.div>

            {/* Glowing lines connecting elements */}
            <svg
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <motion.line
                x1="20%"
                y1="30%"
                x2="50%"
                y2="50%"
                stroke="rgba(6, 182, 212, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <motion.line
                x1="80%"
                y1="70%"
                x2="50%"
                y2="50%"
                stroke="rgba(139, 92, 246, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 60px;
          }
          .hero-grid h1 {
            text-align: center;
          }
          .hero-grid p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-grid div {
            justify-content: center;
            align-items: center;
          }
          .hero-grid .btn-primary, .hero-grid .btn-secondary {
            align-self: center;
          }
        }
      `}</style>
    </section>
  );
}
