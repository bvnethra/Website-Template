import React, { useState } from 'react';
import { constructionLifecycle } from '../data/processData';
import { ChevronRight, ArrowDown } from 'lucide-react';

export const ConstructionLifecycle = () => {
  const [activeStage, setActiveStage] = useState(constructionLifecycle[4]); // Foundation by default

  return (
    <section className="section-padding" style={{ background: '#FAF9F5' }} aria-label="Construction Lifecycle">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag center">END-TO-END MILESTONES</div>
          <h2 className="section-heading-lg">
            Complete Construction <span className="gold-text">Lifecycle</span>
          </h2>
          <p className="section-subtext mx-auto">
            A continuous progression of technical discipline and rigorous quality milestones from initial sketch to final ribbon cutting.
          </p>
        </div>

        {/* Horizontal Lifecycle Interactive Track */}
        <div className="lifecycle-track">
          {constructionLifecycle.map((item, idx) => (
            <div
              key={item.id}
              className="lifecycle-item"
              onClick={() => setActiveStage(item)}
              style={{ cursor: 'pointer' }}
            >
              <div 
                className="lifecycle-node"
                style={{
                  background: activeStage.id === item.id ? 'var(--gold-gradient)' : '#FFFFFF',
                  color: activeStage.id === item.id ? '#FFFFFF' : 'var(--gold-primary)',
                  borderColor: activeStage.id === item.id ? 'var(--gold-primary)' : 'var(--border-subtle)',
                  boxShadow: activeStage.id === item.id ? '0 6px 20px rgba(163, 127, 78, 0.35)' : 'var(--shadow-subtle)'
                }}
              >
                0{item.id}
              </div>
              <div className="lifecycle-name">{item.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', marginTop: '2px', fontWeight: 600 }}>
                {item.stage}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Highlight Banner */}
        <div 
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--border-gold)',
            borderRadius: 'var(--radius-xs)',
            padding: '1.75rem 2.25rem',
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <div>
            <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
              CURRENT INSPECTION FOCUS: {activeStage.stage} — {activeStage.name.toUpperCase()}
            </span>
            <p style={{ color: '#12151B', fontSize: '1.05rem', marginTop: '0.5rem', fontWeight: 600 }}>
              {activeStage.desc}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontSize: '0.85rem', fontWeight: 800 }}>
            <span>Stage 0{activeStage.id} of 09</span>
          </div>
        </div>
      </div>
    </section>
  );
};
