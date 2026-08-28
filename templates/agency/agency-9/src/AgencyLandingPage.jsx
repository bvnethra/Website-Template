import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { CinematicHero } from './components/CinematicHero';
import { AboutSection } from './components/AboutSection';
import { ServicesMatrix } from './components/ServicesMatrix';
import { WorkflowGrid } from './components/WorkflowGrid';
import { PortfolioGrid } from './components/PortfolioGrid';
import { TeamShowcase } from './components/TeamShowcase';
import { ImmersiveCard } from './components/ImmersiveCard';
import { MagneticButton } from './components/MagneticButton';
import { DenseDataContainer, MetricTile, DenseTable } from './components/DenseDataContainer';
import { ScrollReveal } from './components/ScrollReveal';
import './styles/theme.css';

// Minimal SVG Icons
const LayersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const DatabaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const CpuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const ActivityIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const CompassIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

/**
 * TelemetrySection - Real-time Performance & KPI Container Matrix
 */
const TelemetrySection = () => {
  const pipelineDataHeaders = ['Engine Service Module', 'Cluster Status', 'Edge Latency', 'Uptime SLA', 'Hardware Throughput', 'Action'];
  const pipelineDataRows = [
    [
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
        <span>Aether Spatial Core v3.8</span>
      </div>,
      <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Operational</span>,
      '3.8 ms',
      '99.999%',
      '248.4 GB/s',
      <MagneticButton variant="ghost" size="sm">Inspect</MagneticButton>
    ],
    [
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
        <span>Kinetic Spring Physics Engine</span>
      </div>,
      <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Optimized</span>,
      '1.0 ms',
      '100.00%',
      '128.2 GB/s',
      <MagneticButton variant="ghost" size="sm">Inspect</MagneticButton>
    ],
    [
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></span>
        <span>Dynamic Token Crossfade CSS</span>
      </div>,
      <span style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Active</span>,
      '0.6 ms',
      '99.995%',
      '64.0 GB/s',
      <MagneticButton variant="ghost" size="sm">Inspect</MagneticButton>
    ],
    [
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-amber)' }}></span>
        <span>Dense Tabular Grid Stream</span>
      </div>,
      <span style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Synchronizing</span>,
      '12.4 ms',
      '99.980%',
      '98.6 GB/s',
      <MagneticButton variant="ghost" size="sm">Inspect</MagneticButton>
    ],
  ];

  return (
    <section id="telemetry" style={{ position: 'relative', paddingTop: '20px' }}>
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
            }}
          >
            Live Performance Matrix
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
            Spatial Telemetry & KPI Containers
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            High-density telemetry containers with 1px strict grid borders, status pills, and tabular numeric alignment.
          </p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ScrollReveal direction="up" delay={0.1}>
          <DenseDataContainer
            title="AGENCY CORE TELEMETRY BENCHMARK"
            subtitle="Global compute nodes, memory bandwidth, and frame rate metrics"
            badge="Live Telemetry"
            action={
              <MagneticButton variant="ghost" size="sm">
                Download Benchmark CSV
              </MagneticButton>
            }
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <MetricTile
                label="Average Render Latency"
                value="1.84 ms"
                change="28.4%"
                trendDirection="up"
                sublabel="vs standard DOM"
                icon={<ActivityIcon />}
              />
              <MetricTile
                label="Fluid Frame Budget"
                value="120 FPS"
                change="ProMotion"
                trendDirection="up"
                sublabel="Zero GPU dropped frames"
                icon={<ZapIcon />}
              />
              <MetricTile
                label="Contrast Ratio Index"
                value="16.8 : 1"
                change="AAA Grade"
                trendDirection="up"
                sublabel="WCAG 2.2 Compliant"
                icon={<ShieldCheckIcon />}
              />
              <MetricTile
                label="Active Edge Nodes"
                value="5,240"
                change="+412 today"
                trendDirection="up"
                sublabel="Worldwide instances"
                borderRight={false}
                icon={<CpuIcon />}
              />
            </div>
          </DenseDataContainer>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <DenseDataContainer
            title="ENGINE SERVICE MODULES & EDGE LATENCY"
            subtitle="1px strict border-collapse grid with tabular numeric alignment"
            badge="4 Active Modules"
          >
            <DenseTable headers={pipelineDataHeaders} rows={pipelineDataRows} />
          </DenseDataContainer>
        </ScrollReveal>
      </div>
    </section>
  );
};

/**
 * ComponentMatrixSection - Live UI Component Sandbox
 */
const ComponentMatrixSection = () => {
  const [tiltAmount, setTiltAmount] = useState(14);
  const [magneticPower, setMagneticPower] = useState(0.4);

  return (
    <section id="components" style={{ position: 'relative', paddingTop: '20px' }}>
      <ScrollReveal direction="up">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
            }}
          >
            Interactive Component Suite
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
            Spatial UI Component Library
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Direct interactive playground for <strong>ImmersiveCard</strong>, <strong>MagneticButton</strong>, and <strong>DenseDataContainer</strong>.
          </p>
        </div>
      </ScrollReveal>

      {/* Live Sandbox Sliders */}
      <ScrollReveal direction="up" delay={0.1}>
        <div
          style={{
            padding: '16px 24px',
            borderRadius: '16px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            boxShadow: 'var(--shadow-subtle)',
            marginBottom: '32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
              3D Tilt Sensitivity:
            </span>
            <input
              type="range"
              min="0"
              max="25"
              value={tiltAmount}
              onChange={(e) => setTiltAmount(Number(e.target.value))}
              style={{ cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }} className="tabular-nums">
              {tiltAmount}°
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Magnetic Pull Power:
            </span>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={magneticPower}
              onChange={(e) => setMagneticPower(Number(e.target.value))}
              style={{ cursor: 'pointer', accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent-primary)' }} className="tabular-nums">
              {(magneticPower * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* 3 Immersive Card Variants */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}
      >
        <ImmersiveCard
          title="Pure White Floating Card"
          subtitle="Subtle diffuse drop-shadows"
          badge="Solid Base"
          badgeVariant="primary"
          icon={<LayersIcon />}
          tiltIntensity={tiltAmount}
          elevation="card"
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Crafted with ample internal padding, pure white surface in light mode, and elevation shadows that smoothly elevate upon hover.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <MagneticButton variant="secondary" size="sm" strength={magneticPower}>
              Inspect Tokens
            </MagneticButton>
          </div>
        </ImmersiveCard>

        <ImmersiveCard
          title="Glassmorphic Translucency"
          subtitle="Subtle backdrop-filter blur"
          badge="Glass Panel"
          badgeVariant="cyan"
          variant="glass"
          icon={<ZapIcon />}
          tiltIntensity={tiltAmount}
          elevation="elevated"
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Features a 16px spatial blur with ambient background light transmission, maintaining crisp high-contrast text across light and dark modes.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <MagneticButton variant="primary" size="sm" strength={magneticPower}>
              Activate Shader
            </MagneticButton>
          </div>
        </ImmersiveCard>

        <ImmersiveCard
          title="Kinetic Depth & Glare"
          subtitle="Cursor glare shimmer tracking"
          badge="Floating 3D"
          badgeVariant="emerald"
          variant="gradient-border"
          icon={<CpuIcon />}
          tiltIntensity={tiltAmount}
          elevation="floating"
        >
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Applies realistic micro-tilt angles tracking cursor movement with frictionless spring physics for true spatial immersion.
          </p>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <MagneticButton variant="glow" size="sm" strength={magneticPower}>
              Launch Viewport
            </MagneticButton>
          </div>
        </ImmersiveCard>
      </div>

      {/* Magnetic Action Buttons Showcase */}
      <div
        style={{
          padding: '32px',
          borderRadius: '20px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'rgba(37, 99, 235, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
            }}
          >
            <ZapIcon />
          </div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
            Magnetic Action Matrix (Physics Attraction)
          </h3>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Hover your cursor near each button to test how the spring dynamics pull the button toward your pointer:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <MagneticButton variant="primary" size="md" strength={magneticPower}>
            Primary Gradient
          </MagneticButton>
          <MagneticButton variant="glow" size="md" strength={magneticPower}>
            Glowing Neon Aura
          </MagneticButton>
          <MagneticButton variant="secondary" size="md" strength={magneticPower}>
            Elevated Surface
          </MagneticButton>
          <MagneticButton variant="outline" size="md" strength={magneticPower}>
            Crisp 1px Outline
          </MagneticButton>
          <MagneticButton variant="pill" size="md" strength={magneticPower}>
            Spatial Glass Pill
          </MagneticButton>
          <MagneticButton
            variant="primary"
            size="md"
            strength={magneticPower}
            icon={<SparklesIcon />}
            iconPosition="right"
          >
            Parallax Icon Action
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

/**
 * SpatialFooter - High Data Organization Agency Footer
 */
const SpatialFooter = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        marginTop: '90px',
        padding: '60px 20px 40px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '50px',
          }}
        >
          {/* Column 1: Brand & Status */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <CompassIcon />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em' }}>
                AETHER // SPATIAL
              </span>
            </div>
            <p
              style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Architecting weightless, spatial, and hyper-responsive digital environments for the next generation of web products.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--accent-emerald)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  boxShadow: '0 0 8px var(--accent-emerald)',
                  display: 'inline-block',
                }}
              />
              <span>SYSTEMS LIVE • GLOBAL MESH OPERATIONAL</span>
            </div>
          </div>

          {/* Column 2: Architectural Tokens */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Component Matrix
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', lineHeight: 2 }}>
              <li>
                <a href="#services" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Services Matrix (Interactive Expandable Grid)
                </a>
              </li>
              <li>
                <a href="#portfolio" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Portfolio Index (Animated Counter Metrics)
                </a>
              </li>
              <li>
                <a href="#team" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Leadership Profiles (Geometric SVG Masks)
                </a>
              </li>
              <li>
                <a href="#components" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Floating Cards (3D Tilt & Diffuse Shadows)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Coordinates */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Global Studio Hubs
            </div>
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <div><strong>San Francisco:</strong> 550 Montgomery St, Floor 14</div>
              <div><strong>Tokyo:</strong> Shibuya Stream Tower, 21F</div>
              <div><strong>Berlin:</strong> Torstraße 102, Mitte</div>
              <div style={{ marginTop: '10px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                hello@aether-spatial.design
              </div>
            </div>
          </div>

          {/* Column 4: Magnetic Dispatch */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Spatial Dispatch
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Subscribe to our bi-weekly spatial UI architectures & engineering drops.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="architect@domain.com"
                style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <MagneticButton variant="primary" size="sm">
                Join
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>© {new Date().getFullYear()} AETHER SPATIAL LABS INC. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>PRIVACY PROTOCOL</span>
            <span>TERMS OF ARCHITECTURE</span>
            <span>SYSTEM TELEMETRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * AgencyLandingPage - Final Master Page (Phase 8 Deliverable)
 * Enforcing strict grid alignment, vertical rhythm, fluid theme cross-fades,
 * and 60fps hardware-accelerated animations.
 */
export const AgencyLandingPage = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider>
      <div
        className="aether-landing-root"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Ambient Spatial Background Grid & Radial Glows */}
        <div className="aether-spatial-grid" />
        <div className="aether-ambient-glow" />

        {/* Phase 3: Sticky Glassmorphic Navigation Header */}
        <Header activeSection={activeSection} onNavigate={scrollToSection} />

        {/* Main Spatial Content Viewport with Consistent Vertical Rhythm */}
        <main
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '24px 20px 0 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '72px', // Mathematically consistent vertical rhythm
          }}
        >
          {/* Phase 3: Cinematic Hero with Masked Typography & Scroll Parallax */}
          <CinematicHero
            onExploreClick={() => scrollToSection('services')}
            onContactClick={() => scrollToSection('workflow')}
          />

          {/* Phase 4: Spatial About Us Section with Fluid SVG Divider & Mission Grid */}
          <AboutSection />

          {/* Phase 5: Dense Services & Capabilities Matrix */}
          <ServicesMatrix />

          {/* Phase 4: 4-Stage Spatial Workflow Protocol */}
          <WorkflowGrid />

          {/* Phase 7: Interactive Portfolio Grid with Counting Animated Metrics */}
          <PortfolioGrid />

          {/* Phase 6: Leadership Showcase with Geometric SVG Masks */}
          <TeamShowcase />

          {/* Phase 2: Interactive Component Matrix & Physics Sandbox */}
          <ComponentMatrixSection />

          {/* Real-time Telemetry & Dense KPI Matrix */}
          <TelemetrySection />

          {/* Final Call To Action Banner */}
          <ScrollReveal direction="zoom">
            <div
              style={{
                padding: '64px 40px',
                borderRadius: '28px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-strong)',
                boxShadow: 'var(--shadow-floating)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                }}
              >
                Initiate Architecture
              </span>
              <h2
                style={{
                  fontSize: 'clamp(28px, 4vw, 46px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  margin: '12px 0 16px 0',
                  color: 'var(--text-primary)',
                }}
              >
                Ready to engineer your <span className="text-gradient">spatial digital future</span>?
              </h2>
              <p
                style={{
                  fontSize: '16.5px',
                  color: 'var(--text-secondary)',
                  maxWidth: '640px',
                  margin: '0 auto 36px auto',
                  lineHeight: 1.6,
                }}
              >
                Partner with AETHER to build high-contrast, weightless, and sensory-rich web applications that outperform standard flat web canvases.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <MagneticButton variant="primary" size="lg" strength={0.45}>
                  Initiate Project Brief
                </MagneticButton>
                <MagneticButton variant="secondary" size="lg" strength={0.45}>
                  Schedule Engineering Consultation
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </main>

        {/* Global Spatial Footer */}
        <SpatialFooter />
      </div>
    </ThemeProvider>
  );
};

export default AgencyLandingPage;
