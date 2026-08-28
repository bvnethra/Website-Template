import React, { useState } from 'react';
import { technologyItems } from '../data/technologyData';
import { Layers, Eye, Plane, Smartphone, Cpu, BarChart3, ChevronRight } from 'lucide-react';

export const TechnologySection = () => {
  const [selectedTech, setSelectedTech] = useState(technologyItems[0]);

  const getTechIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'Eye': return Eye;
      case 'Plane': return Plane;
      case 'Smartphone': return Smartphone;
      case 'Cpu': return Cpu;
      case 'BarChart3': return BarChart3;
      default: return Layers;
    }
  };

  return (
    <section className="section-padding" style={{ background: '#F8F7F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Construction Technology and BIM Innovation">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">NEXT-GEN DIGITAL ENGINEERING</div>
          <h2 className="section-heading-lg">
            SMARTER CONSTRUCTION. <br />
            <span className="gold-text">BETTER RESULTS.</span>
          </h2>
          <p className="section-subtext mx-auto">
            Deploying high-precision BIM models, autonomous drone surveys, and AI-enabled construction analytics to eliminate rework and deliver precision.
          </p>
        </div>

        {/* 6 Technology Interactive Cards */}
        <div className="grid-3">
          {technologyItems.map((tech) => {
            const Icon = getTechIcon(tech.icon);
            return (
              <div 
                key={tech.id}
                className="glass-card"
                onClick={() => setSelectedTech(tech)}
                style={{
                  padding: '2rem 1.75rem',
                  cursor: 'pointer',
                  borderColor: selectedTech.id === tech.id ? 'var(--gold-primary)' : 'var(--border-subtle)',
                  background: selectedTech.id === tech.id ? '#FFFFFF' : '#FAF9F5',
                  boxShadow: selectedTech.id === tech.id ? 'var(--shadow-elevated)' : 'var(--shadow-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-xs)', background: 'rgba(163, 127, 78, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} color="var(--gold-primary)" />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--gold-dark)', background: 'rgba(163, 127, 78, 0.12)', padding: '0.25rem 0.65rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-gold)', fontFamily: 'var(--font-display)' }}>
                    {tech.metric}
                  </span>
                </div>

                <h3 className="font-serif" style={{ fontSize: '1.15rem', color: '#12151B', fontWeight: 700, marginBottom: '0.35rem' }}>
                  {tech.title}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                  {tech.subtitle}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '1.25rem' }}>
                  {tech.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {tech.tags.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', fontWeight: 600, color: '#4A5568', background: '#F1EFE9', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-xs)' }}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
