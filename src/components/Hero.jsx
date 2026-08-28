import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck } from 'lucide-react';
import HeroDashboard from './HeroDashboard';
import FloatingMetric from './FloatingMetric';

export default function Hero({ onOpenDemo }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      style={{ 
        position: 'relative', 
        paddingTop: '160px', 
        paddingBottom: '100px', 
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Header Wrapper */}
        <div style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto', marginBottom: '60px' }}>
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '24px', display: 'inline-block' }}
          >
            <div className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Next-Gen Workflow Platform</span>
              <Sparkles size={14} color="var(--accent-light)" />
            </div>
          </motion.div>

          {/* Heading Line 1 & Line 2 (Highlighted reveal) */}
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            marginBottom: '24px'
          }}>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'block' }}
            >
              Make Every Workflow
            </motion.span>
            
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', position: 'relative' }}
            >
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-gold-gradient gold-glow-text"
                style={{ display: 'inline-block' }}
              >
                Move Smarter.
              </motion.span>
            </motion.span>
          </h1>

          {/* Hero Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 36px auto',
              fontWeight: '400'
            }}
          >
            Aurevyn brings projects, automation, analytics, and team collaboration into one intelligent workspace built for modern businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <button className="btn-primary" onClick={onOpenDemo}>
              Explore Platform
              <ArrowRight size={18} />
            </button>

            <button className="btn-secondary" onClick={() => scrollToSection('solutions')}>
              <Play size={16} fill="var(--text-primary)" />
              See How It Works
            </button>
          </motion.div>

          {/* Trust badges & Floating Metric */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              marginTop: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="var(--accent)" /> SOC2 Certified Security
            </span>
            <span style={{ color: 'rgba(15,23,42,0.15)' }}>|</span>
            <span>No Credit Card Required</span>
            <span style={{ color: 'rgba(15,23,42,0.15)' }}>|</span>
            
            {/* 94% Workflow Efficiency Badge right next to No Credit Card Required */}
            <FloatingMetric position="inline" />
          </motion.div>
        </div>

        {/* Hero Product Visual Container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1120px', margin: '36px auto 0 auto' }}>
          {/* Ambient Glow behind dashboard */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(233, 169, 0, 0.25) 0%, transparent 70%)',
            filter: blur('60px'),
            pointerEvents: 'none',
            zIndex: 0
          }} />

          {/* Dashboard Frame */}
          <HeroDashboard onOpenDemo={onOpenDemo} />
        </div>
      </div>
    </section>
  );
}
