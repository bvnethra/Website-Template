import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { ImmersiveCard } from './ImmersiveCard';
import { MagneticButton } from './MagneticButton';

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

/**
 * FluidSectionDivider - Organic SVG curve creating seamless transition between background tones
 */
export const FluidSectionDivider = ({ flip = false, style = {} }) => {
  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        lineHeight: 0,
        transform: flip ? 'rotate(180deg)' : 'none',
        pointerEvents: 'none',
        ...style,
      }}
      className="fluid-section-divider"
    >
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        preserveAspectRatio="none"
      >
        <path
          d="M0 48C240 16 480 80 720 48C960 16 1200 80 1440 48V96H0V48Z"
          fill="var(--bg-surface-subtle)"
          opacity="0.75"
        />
        <path
          d="M0 64C320 20 640 90 960 50C1200 24 1360 70 1440 60V96H0V64Z"
          fill="var(--bg-surface-subtle)"
        />
      </svg>
    </div>
  );
};

/**
 * AboutSection Component (Phase 4 Deliverable)
 * Features Organic Fluid Section Divider, Staggered Multi-Column Grid,
 * and Structured Typographic Hierarchy.
 */
export const AboutSection = () => {
  const pillars = [
    {
      icon: <TargetIcon />,
      title: 'Our Core Mission',
      badge: 'Mission',
      badgeVariant: 'primary',
      description:
        'To liberate modern software from flat, static canvases by architecting spatial, weightless, and sensory-rich digital environments that elevate product engagement.',
    },
    {
      icon: <EyeIcon />,
      title: 'Spatial UI Vision',
      badge: 'Vision',
      badgeVariant: 'cyan',
      description:
        'We envision a web ecosystem where micro-interactions obey realistic physics, data density is clear and structured, and themes effortlessly adapt to user cognition.',
    },
    {
      icon: <AwardIcon />,
      title: 'Engineering Standard',
      badge: 'Precision',
      badgeVariant: 'emerald',
      description:
        'Every pixel, shadow diffusion radius, and spring dampening constant is mathematically refined to ensure 120fps fluid execution on hardware across the globe.',
    },
  ];

  return (
    <section id="about" style={{ position: 'relative', paddingTop: '20px' }}>
      {/* Top Fluid Section Divider */}
      <FluidSectionDivider />

      <div
        style={{
          background: 'var(--bg-surface-subtle)',
          borderRadius: '28px',
          padding: '60px 36px',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-subtle)',
        }}
      >
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div style={{ maxWidth: '780px', marginBottom: '52px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-primary)',
              }}
            >
              The Agency Story & Philosophy
            </span>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                margin: '10px 0 18px 0',
                color: 'var(--text-primary)',
                lineHeight: 1.15,
              }}
            >
              We are <span className="text-gradient">AETHER</span>. A collective of spatial architects and kinetic engineers.
            </h2>
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                margin: 0,
              }}
            >
              Founded in Tokyo and San Francisco, we partner with world-class engineering teams, venture-backed startups, and AI pioneers to build tactile, spatial user interfaces that leave lasting impressions.
            </p>
          </div>
        </ScrollReveal>

        {/* Staggered 3-Column Content Grid for Mission / Vision / Standards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={idx} direction="up" delay={0.15 * (idx + 1)}>
              <ImmersiveCard
                title={pillar.title}
                badge={pillar.badge}
                badgeVariant={pillar.badgeVariant}
                icon={pillar.icon}
                elevation="card"
                padding="lg"
                style={{ height: '100%' }}
              >
                <p
                  style={{
                    fontSize: '14.5px',
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {pillar.description}
                </p>
              </ImmersiveCard>
            </ScrollReveal>
          ))}
        </div>

        {/* 2-Column Detailed Studio Intelligence & Stat Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
            paddingTop: '32px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                }}
              >
                Balancing Spatial Depth with High Data Clarity
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}
              >
                Rather than treating animation as an afterthought, we engineer movement as an intuitive feedback loop. Every elevation change, magnetic pull, and theme cross-fade communicates hierarchical status and system state.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <MagneticButton variant="primary" size="sm">
                  Explore Studio Methodology
                </MagneticButton>
                <MagneticButton variant="outline" size="sm">
                  View Leadership
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.25}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-primary)' }} className="tabular-nums">
                  98.4%
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  User Retention Boost
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Measured on spatial redesigns
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-emerald)' }} className="tabular-nums">
                  &lt; 2ms
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  Micro-Interaction Latency
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Hardware-accelerated frames
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
