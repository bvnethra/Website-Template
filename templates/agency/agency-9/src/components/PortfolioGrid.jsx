import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { AnimatedMetricCard, AnimatedNumber } from './AnimatedMetricCard';
import { MagneticButton } from './MagneticButton';

const ArrowUpRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
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
 * CaseStudyCard - Individual Portfolio Card with dark gradient overlay hover fade,
 * internal image/visual zoom, embedded live metric tickers, and generous whitespace.
 */
const CaseStudyCard = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: `1px solid ${isHovered ? 'var(--border-strong)' : 'var(--border-medium)'}`,
        boxShadow: isHovered ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        height: '100%',
        boxSizing: 'border-box',
      }}
      className="case-study-card"
    >
      {/* Visual Thumbnail Area with Dark Gradient Overlay that fades away on hover */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          width: '100%',
          overflow: 'hidden',
          background: project.backgroundGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Animated Inner Graphic Canvas / Mockup */}
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Stylized Spatial Interface Preview Box */}
          <div
            style={{
              width: '90%',
              height: '80%',
              borderRadius: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.08em' }}>
                {project.clientCode}
              </span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                {project.heroMetricValue}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {project.heroMetricLabel}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ height: '4px', flex: 1, borderRadius: '2px', background: 'rgba(255, 255, 255, 0.4)' }} />
              <div style={{ height: '4px', flex: 2, borderRadius: '2px', background: '#38bdf8' }} />
              <div style={{ height: '4px', flex: 1, borderRadius: '2px', background: 'rgba(255, 255, 255, 0.4)' }} />
            </div>
          </div>
        </motion.div>

        {/* Dark Gradient Overlay that fades away on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.15 : 0.65,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(7, 9, 14, 0.9) 0%, rgba(7, 9, 14, 0.4) 60%, rgba(7, 9, 14, 0.1) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Top Floating Category Tag */}
        <span
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            fontSize: '10.5px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '9999px',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 2,
          }}
        >
          {project.category}
        </span>

        {/* Top Right Quick Action Icon */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <ArrowUpRightIcon />
        </motion.div>
      </div>

      {/* Project Content & Metadata Area */}
      <div
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '4px' }}>
            {project.client}
          </div>
          <h3
            style={{
              fontSize: '21px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 10px 0',
              lineHeight: 1.25,
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: '13.5px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: '0 0 20px 0',
            }}
          >
            {project.summary}
          </p>
        </div>

        {/* Animated Metrics Strip with tight alignment & generous padding */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {project.metric1Label}
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                marginTop: '4px',
              }}
            >
              <AnimatedNumber
                value={project.metric1Value}
                prefix={project.metric1Prefix}
                suffix={project.metric1Suffix}
                decimals={project.metric1Decimals || 0}
              />
            </div>
          </div>

          <div
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {project.metric2Label}
            </div>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--accent-emerald)',
                marginTop: '4px',
              }}
            >
              <AnimatedNumber
                value={project.metric2Value}
                prefix={project.metric2Prefix}
                suffix={project.metric2Suffix}
                decimals={project.metric2Decimals || 0}
              />
            </div>
          </div>
        </div>

        {/* Footer Case Study Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {project.techStack.map((tech, tIdx) => (
              <span
                key={tIdx}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <MagneticButton
            variant="ghost"
            size="sm"
            onClick={() => onSelect?.(project)}
          >
            Inspect Case Study →
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

/**
 * PortfolioGrid Component (Phase 7 Deliverable)
 * Rigid, clean case study masonry grid featuring dark gradient overlay hover reveals,
 * animated number tickers, and category filtering.
 */
export const PortfolioGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const caseStudies = [
    {
      id: 'kinetix-os',
      client: 'Kinetix Labs Inc.',
      clientCode: 'KTX-SPATIAL-01',
      title: 'Spatial Desktop OS & Dynamic Window Manager',
      category: 'Spatial OS',
      summary: 'Architected a weightless WebGL spatial desktop environment with frictionless window snapping, micro-gravity physics, and multi-workspace matrix layers.',
      backgroundGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #7c3aed 100%)',
      heroMetricValue: '120 FPS',
      heroMetricLabel: 'GPU Frame Rate',
      metric1Label: 'Render Latency',
      metric1Value: 1.4,
      metric1Prefix: '',
      metric1Suffix: ' ms',
      metric1Decimals: 1,
      metric2Label: 'Throughput',
      metric2Value: 340,
      metric2Prefix: '+',
      metric2Suffix: '%',
      techStack: ['React 19', 'Three.js', 'Framer Springs'],
    },
    {
      id: 'valence-quantum',
      client: 'Valence Quantum Systems',
      clientCode: 'VLC-CLOUD-02',
      title: 'Quantum Telemetry & High-Density Compute Dashboard',
      category: 'Enterprise SaaS',
      summary: 'Engineered a 1px border-collapse matrix console streaming 50,000 real-time qubit coherence telemetry signals per second with sub-2ms render cycles.',
      backgroundGradient: 'linear-gradient(135deg, #065f46 0%, #0284c7 50%, #0d9488 100%)',
      heroMetricValue: '50K Qubits',
      heroMetricLabel: 'Live Telemetry Stream',
      metric1Label: 'DOM Recalcs',
      metric1Value: 0.8,
      metric1Prefix: '< ',
      metric1Suffix: ' ms',
      metric1Decimals: 1,
      metric2Label: 'Data Density',
      metric2Value: 4.8,
      metric2Prefix: '',
      metric2Suffix: 'x Higher',
      metric2Decimals: 1,
      techStack: ['Next.js', 'Dense 1px Grids', 'WebSockets'],
    },
    {
      id: 'aura-neural',
      client: 'Aura Protocol AI',
      clientCode: 'AUR-NEURAL-03',
      title: 'Generative Neural Canvas & Token Interaction Node',
      category: 'AI & Neural',
      summary: 'Designed an infinite-canvas visual prompt builder with live LLM streaming token shaders, latent space graph exploration, and spatial audio feedback.',
      backgroundGradient: 'linear-gradient(135deg, #831843 0%, #d946ef 50%, #4338ca 100%)',
      heroMetricValue: '850K Tok/s',
      heroMetricLabel: 'Streaming Capacity',
      metric1Label: 'Token Stream Latency',
      metric1Value: 12,
      metric1Prefix: '',
      metric1Suffix: ' ms',
      metric2Label: 'Retention Lift',
      metric2Value: 88,
      metric2Prefix: '+',
      metric2Suffix: '%',
      techStack: ['React Flow', 'Neural Shader', 'WebGL Canvas'],
    },
    {
      id: 'strata-fintech',
      client: 'Strata High-Frequency Capital',
      clientCode: 'STR-TRADING-04',
      title: 'High-Frequency Algorithmic Execution Terminal',
      category: 'FinTech',
      summary: 'Redesigned the quantitative trading surface with high-contrast obsidian dark mode tokens, monospaced tabular price ladders, and zero-latency micro-interactions.',
      backgroundGradient: 'linear-gradient(135deg, #78350f 0%, #f59e0b 50%, #b45309 100%)',
      heroMetricValue: '$14.2B',
      heroMetricLabel: 'Daily Routed Volume',
      metric1Label: 'Execution Slip',
      metric1Value: 0.02,
      metric1Prefix: '< ',
      metric1Suffix: '%',
      metric1Decimals: 2,
      metric2Label: 'Trader NPS',
      metric2Value: 94,
      metric2Prefix: '',
      metric2Suffix: ' / 100',
      techStack: ['TypeScript', 'Tabular CSS Engine', 'Fast-Path IPC'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Architectures (4)' },
    { id: 'Spatial OS', label: 'Spatial OS' },
    { id: 'Enterprise SaaS', label: 'Enterprise SaaS' },
    { id: 'AI & Neural', label: 'AI & Neural' },
    { id: 'FinTech', label: 'FinTech' },
  ];

  const filteredStudies =
    activeCategory === 'all'
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  return (
    <section id="portfolio" style={{ position: 'relative', paddingTop: '20px' }}>
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
            }}
          >
            Selected Works & Case Studies
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              margin: '8px 0 16px 0',
              color: 'var(--text-primary)',
            }}
          >
            Interactive Case Study Matrix
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Explore how we engineered spatial depth, 1px dense data grids, and measurable business transformations for category-defining platforms.
          </p>
        </div>
      </ScrollReveal>

      {/* Category Filter Pills */}
      <ScrollReveal direction="up" delay={0.1}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '40px',
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-gradient)' : 'var(--bg-surface)',
                  border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--border-medium)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--shadow-magnetic)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Rigid 2-Column Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        {filteredStudies.map((study, idx) => (
          <ScrollReveal key={study.id} direction="up" delay={0.1 * (idx + 1)}>
            <CaseStudyCard project={study} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;
