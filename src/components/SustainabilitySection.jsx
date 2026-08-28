import React from 'react';
import { Leaf, Droplets, Sun, Recycle, Trees, Building2, Award } from 'lucide-react';
import { sustainabilityPillars } from '../data/technologyData';

export const SustainabilitySection = () => {
  const getPillarIcon = (iconName) => {
    switch (iconName) {
      case 'Leaf': return Leaf;
      case 'Droplets': return Droplets;
      case 'Sun': return Sun;
      case 'Recycle': return Recycle;
      case 'Trees': return Trees;
      case 'Building2': return Building2;
      default: return Leaf;
    }
  };

  return (
    <section id="sustainability" className="section-padding" style={{ background: '#FAF9F5' }} aria-label="Sustainability and Green Building">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">ENVIRONMENTAL RESPONSIBILITY</div>
          <h2 className="section-heading-lg">
            BUILDING A <span className="gold-text">GREENER TOMORROW</span>
          </h2>
          <p className="section-subtext mx-auto">
            "We believe great buildings should perform beautifully while respecting the environment."
          </p>
        </div>

        {/* Split Layout: Image on Left + Grid of Pillars on Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '3.5rem', alignItems: 'center' }}>
          {/* Architectural Image with Greenery */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
              alt="Sustainable biophilic architecture with integrated vertical gardens"
              style={{ width: '100%', height: '520px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-elevated)' }}
            />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', background: '#FFFFFF', border: '1px solid var(--border-gold)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={26} color="var(--gold-primary)" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#12151B' }}>IGBC Platinum & GRIHA 5-Star Benchmarks</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Net-Zero ready envelopes engineered for south Indian climate</div>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Sustainability Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {sustainabilityPillars.map((p, idx) => {
              const Icon = getPillarIcon(p.icon);
              return (
                <div key={idx} className="glass-card" style={{ padding: '1.75rem 1.5rem', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-xs)', background: 'rgba(163, 127, 78, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color="var(--gold-primary)" />
                    </div>
                    <h3 className="font-serif" style={{ fontSize: '1.05rem', color: '#12151B', fontWeight: 700 }}>
                      {p.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
