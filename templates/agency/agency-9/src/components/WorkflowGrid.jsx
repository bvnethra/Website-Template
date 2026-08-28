import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { ImmersiveCard } from './ImmersiveCard';
import { MagneticButton } from './MagneticButton';

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SlidersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"></line>
    <line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line>
    <line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);

const GridIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
    <path d="M12 9V4s3.03.55 4 2c1.08 1.62 0 5 0 5"></path>
  </svg>
);

/**
 * WorkflowGrid Component (Phase 4 Deliverable)
 * 4-Stage Spatial Architecture Process with scroll-triggered entrance animations,
 * step numbers, and clear deliverables.
 */
export const WorkflowGrid = () => {
  const workflowSteps = [
    {
      step: '01',
      title: 'Spatial Topology & Discovery',
      subtitle: 'Information architecture & mental models',
      badge: 'Sprint 1',
      badgeVariant: 'primary',
      icon: <SearchIcon />,
      description:
        'We map out user flows, entity relationships, and hierarchy structures, replacing flat menus with dimensional navigation spaces that feel natural to navigate.',
      deliverables: ['Topology Wireframes', 'Information Spatial Maps', 'Interaction Blueprints'],
    },
    {
      step: '02',
      title: 'Kinematic Prototyping',
      subtitle: 'Spring physics & micro-interactions',
      badge: 'Sprint 2',
      badgeVariant: 'cyan',
      icon: <SlidersIcon />,
      description:
        'We engineer interactive code prototypes using Framer Motion and custom spring coefficients, testing magnetic pulls and elevation curves in real time.',
      deliverables: ['Physics Sandbox', 'Magnetic Button Tokens', '3D Tilt Card Prototypes'],
    },
    {
      step: '03',
      title: 'Dense Data Architecture',
      subtitle: '1px strict grid tokens & metrics',
      badge: 'Sprint 3',
      badgeVariant: 'emerald',
      icon: <GridIcon />,
      description:
        'We structure tables, analytics dashboards, and KPI feeds into crisp 1px bordered containers, ensuring high readability and high contrast in both themes.',
      deliverables: ['Dense Grid Containers', 'Tabular Typography Scales', 'Dynamic Theme Context'],
    },
    {
      step: '04',
      title: 'Edge Optimization & Launch',
      subtitle: 'GPU acceleration & 120Hz audit',
      badge: 'Sprint 4',
      badgeVariant: 'amber',
      icon: <RocketIcon />,
      description:
        'We profile composite layers, GPU memory budgets, and responsive scaling to guarantee zero-jank frame rates on every device before global deployment.',
      deliverables: ['Zero-Jank 120FPS Audit', 'WCAG AAA Contrast Pass', 'Production Deployment'],
    },
  ];

  return (
    <section id="workflow" style={{ position: 'relative', paddingTop: '20px' }}>
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
            The 4-Stage Spatial Protocol
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
            Our Engineering Workflow
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A rigorous, structured pipeline transforming complex software requirements into intuitive, spatial digital masterworks.
          </p>
        </div>
      </ScrollReveal>

      {/* 4-Column Responsive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {workflowSteps.map((item, idx) => (
          <ScrollReveal key={idx} direction="up" delay={0.12 * (idx + 1)}>
            <ImmersiveCard
              title={item.title}
              subtitle={item.subtitle}
              badge={item.badge}
              badgeVariant={item.badgeVariant}
              icon={item.icon}
              elevation="card"
              padding="lg"
              headerAction={
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: 'var(--accent-primary)',
                    fontFamily: 'monospace',
                  }}
                >
                  {item.step}
                </span>
              }
              footer={
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--text-muted)',
                      marginBottom: '8px',
                    }}
                  >
                    Key Deliverables
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.deliverables.map((del, dIdx) => (
                      <li key={dIdx}>{del}</li>
                    ))}
                  </ul>
                </div>
              }
              style={{ height: '100%' }}
            >
              <p
                style={{
                  fontSize: '13.5px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  margin: 0,
                }}
              >
                {item.description}
              </p>
            </ImmersiveCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Workflow Bottom Magnetic CTA Bar */}
      <ScrollReveal direction="up" delay={0.3}>
        <div
          style={{
            padding: '24px 32px',
            borderRadius: '20px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            boxShadow: 'var(--shadow-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Ready to execute Sprint 01 for your product?
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              We typically onboard new spatial architecture cohorts on a bi-weekly cycle.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <MagneticButton variant="primary" size="md">
              Reserve Architecture Cohort
            </MagneticButton>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default WorkflowGrid;
