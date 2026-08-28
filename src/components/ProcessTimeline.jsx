import React, { useState } from 'react';
import { processSteps } from '../data/processData';
import { Compass, Calendar, Layers, ShieldCheck, CheckCircle2, Award, Clock } from 'lucide-react';

export const ProcessTimeline = () => {
  const [selectedStep, setSelectedStep] = useState(processSteps[0]);

  return (
    <section id="process" className="section-padding" style={{ background: '#F4F2EB', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Our 6-Step Construction Process">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag center">STRUCTURED METHODOLOGY</div>
          <h2 className="section-heading-lg">
            OUR PROVEN <span className="gold-text">PROCESS</span>
          </h2>
          <p className="section-subtext mx-auto">
            From preliminary reconnaissance to final key handover, our 6-stage lifecycle guarantees total transparency and impeccable execution.
          </p>
        </div>

        {/* 6-Node Horizontal Timeline Grid */}
        <div className="process-timeline-horizontal">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="process-node-card"
              onClick={() => setSelectedStep(item)}
              style={{
                cursor: 'pointer',
                borderColor: selectedStep.step === item.step ? 'var(--gold-primary)' : 'var(--border-subtle)',
                background: selectedStep.step === item.step ? '#FFFFFF' : '#FAF9F5',
                boxShadow: selectedStep.step === item.step ? 'var(--shadow-elevated)' : 'var(--shadow-subtle)'
              }}
            >
              <div className="process-step-badge font-display">
                {item.step}
              </div>

              <div className="process-phase-tag">{item.phase}</div>
              <h3 className="process-title">{item.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Detail Card for the Selected Step */}
        <div className="glass-card" style={{ marginTop: '2.5rem', padding: '2.5rem 3rem', background: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span className="gold-text font-display" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                  STAGE {selectedStep.step}
                </span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                  // {selectedStep.phase}
                </span>
              </div>

              <h4 className="font-serif" style={{ fontSize: '1.6rem', color: '#12151B', marginBottom: '1rem' }}>
                {selectedStep.title}
              </h4>

              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.75', fontSize: '0.98rem' }}>
                {selectedStep.extendedDetails}
              </p>
            </div>

            <div style={{ background: '#FAF8F4', padding: '1.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                <Clock size={16} />
                <span>Typical Duration: {selectedStep.duration}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-dim)', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Stage Deliverables:
                </span>
                {selectedStep.milestones.map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#12151B', fontWeight: 500 }}>
                    <CheckCircle2 size={16} color="var(--gold-primary)" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
