import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { ArrowRight, CheckCircle2, ChevronRight, X, Layers, Hammer, Compass, Landmark, RefreshCw, Activity } from 'lucide-react';

export const ServicesSection = ({ onConsultService }) => {
  const [activeServiceModal, setActiveServiceModal] = useState(null);

  const getServiceIcon = (id) => {
    switch (id) {
      case 'construction-management': return Layers;
      case 'general-contracting': return Hammer;
      case 'design-and-build': return Compass;
      case 'real-estate-development': return Landmark;
      case 'renovation-restoration': return RefreshCw;
      case 'infrastructure': return Activity;
      default: return Layers;
    }
  };

  return (
    <section id="services" className="section-padding" style={{ background: '#FAF9F5' }} aria-label="Our Construction & Engineering Services">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">END-TO-END CAPABILITIES</div>
          <h2 className="section-heading-lg">
            Integrated Construction <br />
            <span className="gold-text">& Engineering Services</span>
          </h2>
          <p className="section-subtext mx-auto">
            From visionary master planning and high-tensile civil engineering to luxury residential delivery, we provide single-point accountability.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid-3">
          {servicesData.map((svc) => {
            const Icon = getServiceIcon(svc.id);
            return (
              <article key={svc.id} className="service-card-lux">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="service-number">{svc.number}</div>
                    <Icon size={24} color="var(--gold-primary)" />
                  </div>

                  <h3 className="service-title">{svc.title}</h3>
                  <div className="service-subtitle">{svc.subtitle}</div>
                  
                  <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.65' }}>
                    "{svc.description}"
                  </p>

                  {/* Highlights list */}
                  <ul className="service-feature-list">
                    {svc.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="service-feature-item">
                        <CheckCircle2 size={16} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setActiveServiceModal(svc)}
                    className="btn-text-arrow"
                  >
                    <span>Detailed Scope</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Service Deep Dive Modal */}
      {activeServiceModal && (
        <div className="modal-backdrop-fixed" onClick={() => setActiveServiceModal(null)}>
          <div className="modal-dialog-shell" style={{ maxWidth: '800px', background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveServiceModal(null)} aria-label="Close service modal">
              <X size={20} />
            </button>

            <div style={{ padding: '3.5rem 3rem' }}>
              <div className="section-tag">{activeServiceModal.number} — SERVICE SPECIFICATION</div>
              <h3 className="section-heading-lg" style={{ fontSize: '2.1rem', marginBottom: '0.5rem', color: '#12151B' }}>
                {activeServiceModal.title}
              </h3>
              <p style={{ color: 'var(--gold-primary)', fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem' }}>
                {activeServiceModal.subtitle}
              </p>

              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1.02rem', marginBottom: '2rem' }}>
                {activeServiceModal.detailedOverview}
              </p>

              <h4 className="font-serif" style={{ color: '#12151B', fontSize: '1.15rem', marginBottom: '1rem' }}>
                Core Engineering Capabilities
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {activeServiceModal.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#FAF8F4', border: '1px solid var(--border-subtle)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-xs)' }}>
                    <CheckCircle2 size={16} color="var(--gold-primary)" />
                    <span style={{ fontSize: '0.9rem', color: '#12151B', fontWeight: 500 }}>{f}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-serif" style={{ color: '#12151B', fontSize: '1.15rem', marginBottom: '1rem' }}>
                Standard Project Deliverables
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
                {activeServiceModal.deliverables.map((del, i) => (
                  <span key={i} style={{ background: 'rgba(163, 127, 78, 0.1)', border: '1px solid var(--border-gold)', color: 'var(--gold-dark)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-xs)', fontSize: '0.82rem', fontWeight: 700 }}>
                    ✓ {del}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  onClick={() => {
                    const title = activeServiceModal.title;
                    setActiveServiceModal(null);
                    onConsultService(title);
                  }}
                  className="btn btn-primary"
                >
                  <span>Request Proposal for {activeServiceModal.title}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
