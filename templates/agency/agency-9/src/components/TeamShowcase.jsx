import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { TeamMemberCard } from './TeamMemberCard';
import { MagneticButton } from './MagneticButton';

/**
 * TeamShowcase Component (Phase 6 Deliverable)
 * Leadership & Architecture Team section utilizing sharp geometric photo masks,
 * departmental filters, and high-contrast typographic data.
 */
export const TeamShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const teamMembers = [
    {
      id: 'alex-mercer',
      name: 'Dr. Alex Mercer',
      role: 'Founder & Chief Spatial Architect',
      department: 'Architecture',
      credentials: 'Ph.D. Spatial Computing • Ex-Apple Vision',
      initials: 'AM',
      maskType: 'hexagon',
      gradientBg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
      bio: 'Pioneered spatial UI coordinate matrix protocols and sub-millisecond kinetic physics for next-generation dimensional computing.',
    },
    {
      id: 'elena-rostova',
      name: 'Elena Rostova',
      role: 'VP of Kinetic Physics Engineering',
      department: 'Engineering',
      credentials: 'Physics Simulation • Ex-Unreal Engine',
      initials: 'ER',
      maskType: 'diagonal',
      gradientBg: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)',
      bio: 'Specializes in GPU-accelerated spring mechanics, micro-gravity UI damping, and hardware-accelerated 120Hz web rendering.',
    },
    {
      id: 'kaito-tanaka',
      name: 'Kaito Tanaka',
      role: 'Head of High-Density Design Systems',
      department: 'Systems',
      credentials: 'Tokyo Institute of Tech • Ex-Stripe',
      initials: 'KT',
      maskType: 'octagon',
      gradientBg: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
      bio: 'Architected precision 1px tabular grids, multi-theme dynamic CSS cascades, and WCAG AAA contrast ratio token systems.',
    },
    {
      id: 'maya-lin',
      name: 'Maya Lin',
      role: 'Principal AI Interface Architect',
      department: 'AI & Canvas',
      credentials: 'Stanford AI Lab • Generative UI Lead',
      initials: 'ML',
      maskType: 'shield',
      gradientBg: 'linear-gradient(135deg, #9a3412 0%, #f97316 100%)',
      bio: 'Designing real-time token streaming interfaces, non-linear generative canvas workflows, and latent space interaction models.',
    },
  ];

  const filteredMembers =
    activeFilter === 'all'
      ? teamMembers
      : teamMembers.filter((m) => m.department.toLowerCase().includes(activeFilter.toLowerCase()));

  const filterTabs = [
    { id: 'all', label: 'All Leadership' },
    { id: 'architecture', label: 'Spatial Architecture' },
    { id: 'engineering', label: 'Kinetic Physics' },
    { id: 'systems', label: 'Design Systems' },
    { id: 'ai', label: 'AI & Canvas' },
  ];

  return (
    <section id="team" style={{ position: 'relative', paddingTop: '20px' }}>
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
            Engineering & Design Leadership
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
            Geometric Leadership Profiles
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Meet the architects and engineers pioneering weightless interaction design, mathematical spring calculus, and spatial UI topologies.
          </p>
        </div>
      </ScrollReveal>

      {/* Filter Tabs */}
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
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
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
                {tab.label}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 4-Column Team Member Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          alignItems: 'stretch',
        }}
      >
        {filteredMembers.map((member, idx) => (
          <ScrollReveal key={member.id} direction="up" delay={0.1 * (idx + 1)}>
            <TeamMemberCard {...member} />
          </ScrollReveal>
        ))}
      </div>

      {/* Leadership Footer Note */}
      <ScrollReveal direction="up" delay={0.3}>
        <div
          style={{
            marginTop: '36px',
            textAlign: 'center',
            fontSize: '13px',
            color: 'var(--text-muted)',
          }}
        >
          Want to join our spatial architecture lab in Tokyo, San Francisco, or Berlin?{' '}
          <a href="#careers" style={{ color: 'var(--accent-primary)', fontWeight: 600, textDecoration: 'none' }}>
            View Open Engineering Roles (8 Openings) →
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default TeamShowcase;
