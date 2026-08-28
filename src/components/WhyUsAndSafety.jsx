import React from 'react';
import { Check, ShieldAlert, HardHat, Award, Eye, Clock, CheckCircle } from 'lucide-react';

export const WhyUsAndSafety = () => {
  const whyPoints = [
    "Experienced project teams",
    "Transparent project management",
    "Strict quality control",
    "Advanced construction technology",
    "Safety-first approach",
    "Sustainable building practices",
    "On-time project delivery",
    "Dedicated client support"
  ];

  return (
    <section className="section-padding" style={{ background: '#F8F7F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Why Choose Us & Site Safety Protocols">
      <div className="container">
        {/* Split Layout: Why AUREN */}
        <div className="about-split-layout" style={{ marginBottom: '6rem' }}>
          {/* Left Content */}
          <div>
            <div className="section-tag">WHY PARTNER WITH US</div>
            <h2 className="section-heading-lg">
              WHY <span className="gold-text">AUREN?</span>
            </h2>
            <p className="section-subtext" style={{ marginBottom: '2.5rem' }}>
              We combine architectural refinement with uncompromising civil precision, ensuring that complex landmark projects are executed seamlessly.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              {whyPoints.map((point, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    background: '#FFFFFF',
                    padding: '0.95rem 1.25rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(163, 127, 78, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={15} color="var(--gold-primary)" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#12151B', fontWeight: 600 }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="about-visual-frame">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80"
              alt="Engineers and architects on active construction site inspecting precision formwork"
              className="about-main-photo"
              style={{ height: '480px' }}
            />
          </div>
        </div>

        {/* Dark Safety Section (High contrast architectural statement card) */}
        <div className="safety-dark-wrapper">
          <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-tag center" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#E2CFB4', borderColor: 'rgba(226, 207, 180, 0.3)' }}>
              SAFETY & COMPLIANCE MANDATE
            </div>
            <h2 className="section-heading-lg" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF' }}>
              SAFETY IS BUILT INTO <br />
              <span className="gold-text" style={{ background: 'linear-gradient(135deg, #FDEFD8 0%, #E6C89A 50%, #C99E63 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                EVERYTHING WE DO.
              </span>
            </h2>
            <p style={{ color: '#E2E8F0', fontSize: '1.05rem', lineHeight: '1.75' }}>
              "Our commitment to safety extends across every project, every team and every stage of construction."
            </p>
          </div>

          {/* 3 Prominent Safety Metrics */}
          <div className="safety-stats-triple">
            <div className="safety-stat-box">
              <div className="safety-stat-num">0</div>
              <div className="safety-stat-lbl">Compromise on Safety</div>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>
                Zero-tolerance EHS protocols strictly enforced on every active site.
              </p>
            </div>

            <div className="safety-stat-box">
              <div className="safety-stat-num">100%</div>
              <div className="safety-stat-lbl">Site Safety Compliance</div>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>
                Mandatory PPE, daily toolbox briefings, and regular emergency drills.
              </p>
            </div>

            <div className="safety-stat-box">
              <div className="safety-stat-num">24/7</div>
              <div className="safety-stat-lbl">Project Monitoring</div>
              <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.35rem' }}>
                AI CCTV perimeter coverage, digital logs, and drone aerial surveys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
