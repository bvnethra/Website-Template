import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Palette, Shield, Cpu, Link } from 'lucide-react';
import { fadeIn, staggerContainer } from '../animations/animationVariants';

const FEATURE_DATA = [
  {
    icon: Brain,
    title: 'Smart Experience',
    description: 'Immersive layouts crafted around user psychology, maximizing engagement and conversion metrics.',
    color: 'rgba(6, 182, 212, 0.5)',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Blazing fast load speeds. Clean React rendering coupled with Spring Boot API endpoints.',
    color: 'rgba(59, 130, 246, 0.5)',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Premium layouts featuring glassmorphism, tailored neon highlights, and custom cyber fonts.',
    color: 'rgba(139, 92, 246, 0.5)',
  },
  {
    icon: Shield,
    title: 'Secure Architecture',
    description: 'Rock solid backend structures built on Java Spring Security. Encrypted token handling APIs.',
    color: 'rgba(236, 72, 153, 0.5)',
  },
  {
    icon: Cpu,
    title: 'Intelligent Automation',
    description: 'Integrated cron controllers, AI models, and workflow automations to speed up business actions.',
    color: 'rgba(16, 185, 129, 0.5)',
  },
  {
    icon: Link,
    title: 'Seamless Integration',
    description: 'Flexible API bridges connecting platforms, databases, and microservices in real time.',
    color: 'rgba(245, 158, 11, 0.5)',
  },
];

// Interactive spotlight card component
function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      variants={fadeIn('up', 'spring', index * 0.08, 0.6)}
      className="glass-panel feature-card"
      style={{
        position: 'relative',
        padding: '40px 30px',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        background: 'rgba(11, 15, 30, 0.45)',
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-start',
        textAlign: 'left',
      }}
      whileHover={{
        y: -8,
        borderColor: 'rgba(255,255,255,0.15)',
      }}
    >
      {/* Dynamic Cursor Spotlight background */}
      {isFocused && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.06), transparent 80%)`,
            zIndex: 1,
          }}
        />
      )}

      {/* Dynamic spotlight border glow */}
      {isFocused && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            maskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black 30%, transparent 100%)`,
            zIndex: 2,
          }}
        />
      )}

      {/* Floating Sparkles inside card */}
      <motion.div
        animate={{
          rotate: isFocused ? 360 : 0,
          scale: isFocused ? 1.1 : 1,
        }}
        transition={{ duration: 0.5 }}
        style={{
          padding: '16px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          color: '#fff',
          zIndex: 3,
          position: 'relative',
          boxShadow: isFocused ? `0 0 25px ${feature.color}` : 'none',
          borderColor: isFocused ? feature.color : 'rgba(255,255,255,0.05)',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        <Icon size={28} style={{ color: '#fff' }} />
      </motion.div>

      <div style={{ zIndex: 3, position: 'relative' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
          {feature.title}
        </h4>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">
          DYNAMIZE YOUR <span className="gradient-text">SYSTEMS</span>
        </h2>
        <p className="section-subtitle">
          Unleash the potential of your application with modular features structured for the modern web.
        </p>

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="features-grid"
        >
          {FEATURE_DATA.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        @media (max-width: 991px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
