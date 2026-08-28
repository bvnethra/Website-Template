import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { ImmersiveCard } from './ImmersiveCard';

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

/**
 * MaskedHeadline - Text-masking reveal animation for cinematic headline
 */
const MaskedHeadline = ({ lines = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // Smooth cinematic exponential ease
      },
    },
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        fontSize: 'clamp(38px, 6vw, 64px)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.04em',
        margin: '0 0 24px 0',
        color: 'var(--text-primary)',
      }}
    >
      {lines.map((line, index) => (
        <span
          key={index}
          style={{
            display: 'block',
            overflow: 'hidden',
            paddingBottom: '4px',
          }}
        >
          <motion.span
            variants={lineVariants}
            style={{
              display: 'inline-block',
              ...(line.isGradient ? {
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : {}),
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};

/**
 * CinematicHero Component (Phase 3 Deliverable)
 * Features Staggered Text-Masking Headline, Clean Bright Background,
 * and Multi-layered Scroll Parallax on Abstract Geometric Shapes.
 */
export const CinematicHero = ({ onExploreClick, onContactClick }) => {
  const heroRef = useRef(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const parallaxShape1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const parallaxShape2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const parallaxCard = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  const headlineLines = [
    { text: 'Architecting', isGradient: false },
    { text: 'Weightless Spatial UI', isGradient: true },
    { text: 'for Next-Gen Products.', isGradient: false },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        padding: '60px 0 80px 0',
        overflow: 'hidden',
      }}
    >
      {/* Abstract Parallax Geometric Background Elements */}
      <motion.div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
          y: parallaxShape1,
          zIndex: 0,
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          y: parallaxShape2,
          zIndex: 0,
        }}
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="hero-inner-container"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Column: Masked Typography & Call-To-Action */}
          <div>
            {/* Top Spatial Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-medium)',
                marginBottom: '28px',
                boxShadow: 'var(--shadow-subtle)',
              }}
            >
              <SparklesIcon />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.04em',
                }}
              >
                SPATIAL ARCHITECTURE & INTERACTIVE LABS
              </span>
            </motion.div>

            {/* Cinematic Staggered Text Masking Headline */}
            <MaskedHeadline lines={headlineLines} />

            {/* Paragraph Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{
                fontSize: '17.5px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                margin: '0 0 36px 0',
                maxWidth: '540px',
              }}
            >
              We craft high-contrast, spatial interfaces engineered with physics-based micro-interactions, diffuse elevation shadows, and hyper-dense tabular data clarity.
            </motion.p>

            {/* Magnetic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}
            >
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={onExploreClick}
              >
                Explore Spatial UI Matrix
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={onContactClick}
              >
                Our 4-Stage Workflow
              </MagneticButton>
            </motion.div>

            {/* Live Agency Performance Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }} className="tabular-nums">
                  120 Hz
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>GPU Kinetic Physics</div>
              </div>
              <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-emerald)' }} className="tabular-nums">
                  0.4s
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Token Crossfade</div>
              </div>
              <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--accent-primary)' }} className="tabular-nums">
                  AAA
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>High Contrast WCAG</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Parallax Floating Showcase Card */}
          <motion.div
            style={{ y: parallaxCard }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImmersiveCard
              title="AETHER SPATIAL ENGINE"
              subtitle="Weightless UI depth preview & coordinate tracker"
              badge="v3.8 Live"
              badgeVariant="primary"
              icon={<CompassIcon />}
              elevation="floating"
              tiltIntensity={16}
              padding="xl"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* 3D Geometric Abstract Viewport Wireframe */}
                <div
                  style={{
                    height: '180px',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, var(--bg-surface-subtle) 0%, var(--bg-surface) 100%)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Wireframe Rotating Gyro Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '50%',
                      border: '2px dashed var(--accent-primary)',
                      opacity: 0.6,
                      position: 'absolute',
                    }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '75px',
                      height: '75px',
                      borderRadius: '50%',
                      border: '2px dotted var(--accent-secondary)',
                      opacity: 0.5,
                      position: 'absolute',
                    }}
                  />
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'var(--accent-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: 'var(--shadow-magnetic)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <LayersIcon />
                  </div>
                  <span
                    style={{
                      marginTop: '12px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Spatial Coordinate Matrix
                  </span>
                </div>

                {/* Dense Telemetry Data Row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Shadow Depth</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      45px Diffuse
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Damping</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '2px' }}>
                      15 N·s/m
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'var(--bg-surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contrast</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-emerald)', marginTop: '2px' }}>
                      High Pure
                    </div>
                  </div>
                </div>

                <MagneticButton variant="glow" size="md" fullWidth strength={0.4}>
                  Test Magnetic Pull Response
                </MagneticButton>
              </div>
            </ImmersiveCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
