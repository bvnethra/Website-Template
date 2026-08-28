import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { MagneticButton } from './MagneticButton';

// Minimalist Icons for Services with micro-animation triggers
const SpatialUIIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      rotate: isHovered ? [0, -12, 12, 0] : 0,
      scale: isHovered ? 1.15 : 1,
    }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </motion.svg>
);

const DenseGridIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      scale: isHovered ? 1.18 : 1,
      rotate: isHovered ? 90 : 0,
    }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </motion.svg>
);

const KineticMotionIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      x: isHovered ? [0, 4, -4, 0] : 0,
      scale: isHovered ? 1.2 : 1,
    }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </motion.svg>
);

const AICanvasIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      rotate: isHovered ? 180 : 0,
      scale: isHovered ? 1.15 : 1,
    }}
    transition={{ duration: 0.6, ease: 'backOut' }}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </motion.svg>
);

const EdgeFrontEndIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      y: isHovered ? [-2, 2, -2] : 0,
      scale: isHovered ? 1.15 : 1,
    }}
    transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
  >
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
  </motion.svg>
);

const SpatialBrandIcon = ({ isHovered }) => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{
      scale: isHovered ? [1, 1.25, 1.1] : 1,
    }}
    transition={{ duration: 0.4 }}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </motion.svg>
);

const ChevronDownIcon = ({ isOpen }) => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.25 }}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </motion.svg>
);

/**
 * ServiceCard - Individual Interactive Matrix Card with smooth detail expansion
 * and grid-integrity preservation.
 */
const ServiceCard = ({ service, isExpanded, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="service-card-wrapper"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        style={{
          background: 'var(--bg-surface)',
          borderRadius: '20px',
          border: `1px solid ${isHovered || isExpanded ? 'var(--border-strong)' : 'var(--border-medium)'}`,
          boxShadow: isHovered || isExpanded ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
          padding: '28px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '260px',
          height: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="service-card"
      >
        {/* Ambient Top Corner Glow on Hover */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '160px',
            height: '160px',
            background: 'radial-gradient(circle at top right, var(--accent-glow) 0%, transparent 70%)',
            opacity: isHovered || isExpanded ? 0.8 : 0,
            transition: 'opacity 0.35s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Top Metadata Row: Icon + Code Tag + Expand Trigger */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            {/* Animated Icon Container */}
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: isHovered || isExpanded ? 'var(--accent-gradient)' : 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isHovered || isExpanded ? '#ffffff' : 'var(--accent-primary)',
                transition: 'background 0.3s ease, color 0.3s ease',
                boxShadow: isHovered || isExpanded ? 'var(--shadow-magnetic)' : 'none',
              }}
            >
              {React.cloneElement(service.icon, { isHovered: isHovered || isExpanded })}
            </div>

            {/* Code Tag & Expand Arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {service.code}
              </span>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isExpanded ? 'var(--bg-surface-subtle)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                }}
              >
                <ChevronDownIcon isOpen={isExpanded} />
              </div>
            </div>
          </div>

          {/* Service Title & Brief Subtitle */}
          <h3
            style={{
              fontSize: '19px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: '0 0 8px 0',
              lineHeight: 1.3,
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontSize: '13.5px',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
              margin: '0 0 16px 0',
            }}
          >
            {service.tagline}
          </p>
        </div>

        {/* Expandable Dense Details Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  paddingTop: '16px',
                  marginTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                {/* Dense Capabilities List */}
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Core Deliverables
                </div>
                <ul
                  style={{
                    margin: '0 0 16px 0',
                    paddingLeft: '16px',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  {service.deliverables.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {service.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '10.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-subtle)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--accent-primary)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Status / Toggle CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: isExpanded ? 'none' : '1px solid var(--border-subtle)',
            fontSize: '12px',
          }}
        >
          <span
            style={{
              fontWeight: 700,
              color: isExpanded ? 'var(--accent-primary)' : 'var(--text-muted)',
              letterSpacing: '0.02em',
            }}
          >
            {isExpanded ? 'Collapse Matrix ▲' : 'Expand Capabilities ▼'}
          </span>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '11px' }}>
            {service.sla}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * ServicesMatrix Component (Phase 5 Deliverable)
 * Dense interactive services & capabilities matrix with micro-animated iconography,
 * expandable detail layers, and grid-integrity preservation.
 */
export const ServicesMatrix = () => {
  const [expandedId, setExpandedId] = useState(null);

  const services = [
    {
      id: 'spatial-ui',
      code: 'SRV-01',
      title: 'Spatial UI & 3D Shaders',
      tagline: 'Dimensional interfaces with real-time GLSL canvas rendering and depth perspective.',
      icon: <SpatialUIIcon isHovered={false} />,
      sla: 'Sprint 01 Ready',
      deliverables: [
        'WebGL / WebGPU interactive canvases',
        'Custom GLSL background shaders',
        'Z-axis perspective layering and viewport snapping',
      ],
      stack: ['Three.js', 'React Three Fiber', 'GLSL', 'CSS 3D Transforms'],
    },
    {
      id: 'dense-saas',
      code: 'SRV-02',
      title: 'High-Density SaaS Grids',
      tagline: 'Enterprise tabular architectures for data-heavy financial & telemetry consoles.',
      icon: <DenseGridIcon isHovered={false} />,
      sla: 'Sub-2ms Render',
      deliverables: [
        '1px crisp border-collapse data tables',
        'Monospaced tabular numeral systems',
        'Multi-axis filtering & live metric sparklines',
      ],
      stack: ['React 19', 'Tabular Typographic Tokens', 'Virtual DOM Streaming'],
    },
    {
      id: 'kinetic-motion',
      code: 'SRV-03',
      title: 'Kinetic Spring Engineering',
      tagline: 'Physics-based magnetic pulls, spring dampening, and zero-jank micro-interactions.',
      icon: <KineticMotionIcon isHovered={false} />,
      sla: '120 FPS Audit',
      deliverables: [
        'Magnetic cursor attraction algorithms',
        'Cinematic text-masking reveal sequences',
        'Staggered scroll-linked viewport triggers',
      ],
      stack: ['Framer Motion', 'Spring Calculus', 'Hardware GPU Acceleration'],
    },
    {
      id: 'ai-interfaces',
      code: 'SRV-04',
      title: 'AI & Neural Streaming Canvas',
      tagline: 'Tactile interfaces for LLMs, diffusion engines, and complex generative workflows.',
      icon: <AICanvasIcon isHovered={false} />,
      sla: 'Token Streaming',
      deliverables: [
        'Multi-modal prompt canvases & node graphs',
        'Real-time token stream animations',
        'Latency-optimized latency beacons',
      ],
      stack: ['WebSockets', 'Canvas 2D', 'React Flow', 'Neural Tokens'],
    },
    {
      id: 'edge-frontend',
      code: 'SRV-05',
      title: 'Edge Front-End Architecture',
      tagline: 'Ultra-fast, globally replicated frontend architectures with seamless dark/light crossfades.',
      icon: <EdgeFrontEndIcon isHovered={false} />,
      sla: '100% WCAG AAA',
      deliverables: [
        'Dynamic CSS custom property theme token cascades',
        'Sub-millisecond static asset delivery',
        'Zero-CLS hydration architecture',
      ],
      stack: ['TypeScript', 'Vite', 'Tailwind Utilities', 'CSS Variables'],
    },
    {
      id: 'spatial-brand',
      code: 'SRV-06',
      title: 'Spatial Brand Identity',
      tagline: 'Comprehensive visual design tokens, 3D design languages, and motion guidelines.',
      icon: <SpatialBrandIcon isHovered={false} />,
      sla: 'Design System CI',
      deliverables: [
        'Living component design libraries',
        'Figma to React token automated sync',
        'Micro-interaction choreography specs',
      ],
      stack: ['Figma Tokens', 'Storybook', 'Design Tokens Format (W3C)'],
    },
  ];

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="services" style={{ position: 'relative', paddingTop: '20px' }}>
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
            Capabilities & Service Architecture
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
            Dense Capabilities Matrix
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Click or hover any capability module below to inspect dense engineering deliverables, tech stacks, and performance SLA benchmarks.
          </p>
        </div>
      </ScrollReveal>

      {/* 3-Column Strict Grid maintaining alignment */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {services.map((service, idx) => (
          <ScrollReveal key={service.id} direction="up" delay={0.08 * (idx + 1)}>
            <ServiceCard
              service={service}
              isExpanded={expandedId === service.id}
              onToggle={() => handleToggle(service.id)}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default ServicesMatrix;
