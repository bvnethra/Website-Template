import React, { useState } from 'react';
import { X, MapPin, Calendar, Building, Maximize2, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

export const ProjectModal = ({ project, onClose, onEnquire, onOpenLightbox }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  return (
    <div className="modal-backdrop-fixed" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog-shell" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Project Detail Modal">
          <X size={22} />
        </button>

        {/* Modal Hero Cover */}
        <div className="modal-hero-cover">
          <img src={project.heroImage} alt={project.title} />
          <div className="modal-hero-overlay">
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className="project-status-badge" style={{ position: 'static' }}>
                {project.status}
              </span>
              <span className="project-category-tag" style={{ position: 'static' }}>
                {project.tag}
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', color: '#fff', lineHeight: 1.1 }}>
              {project.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-light)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
              <MapPin size={16} />
              <span>{project.location}</span>
              <span>•</span>
              <span>{project.specs.timeline}</span>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="modal-body-container">
          {/* Key Specifications Ribbon */}
          <div className="modal-specs-ribbon">
            <div className="modal-spec-col">
              <span className="modal-spec-lbl">Scale & Units</span>
              <span className="modal-spec-val">{project.specs.floors} / {project.specs.units}</span>
            </div>
            <div className="modal-spec-col">
              <span className="modal-spec-lbl">Land & Built Area</span>
              <span className="modal-spec-val">{project.specs.landArea} ({project.specs.builtUpArea})</span>
            </div>
            <div className="modal-spec-col">
              <span className="modal-spec-lbl">Architecture</span>
              <span className="modal-spec-val">{project.specs.architecture}</span>
            </div>
            <div className="modal-spec-col">
              <span className="modal-spec-lbl">Certification</span>
              <span className="modal-spec-val" style={{ color: 'var(--gold-light)' }}>
                {project.specs.certifications}
              </span>
            </div>
          </div>

          {/* Navigation Tabs Header */}
          <div className="modal-tabs-header">
            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              PROJECT OVERVIEW
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              DESIGN APPROACH
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'construction' ? 'active' : ''}`}
              onClick={() => setActiveTab('construction')}
            >
              CONSTRUCTION JOURNEY
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              KEY FEATURES
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              PROJECT TIMELINE
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              PHOTO GALLERY ({project.gallery?.length || 0})
            </button>
          </div>

          {/* Tab Content Panes */}
          <div style={{ minHeight: '220px' }}>
            {activeTab === 'overview' && (
              <div>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  {project.tagline}
                </h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1.5rem' }}>
                  {project.overview}
                </p>
                <div style={{ background: 'var(--bg-surface-raised)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', borderLeft: '3px solid var(--gold-primary)' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gold-light)' }}>
                    <strong>Developer Guarantee:</strong> Built strictly in accordance with NBC 2016 safety norms and ISO 9001:2015 engineering compliance by AUREN Build & Developments.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Architectural Philosophy & Materiality
                </h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                  {project.designApproach}
                </p>
              </div>
            )}

            {activeTab === 'construction' && (
              <div>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)', marginBottom: '0.75rem' }}>
                  Structural Engineering & Execution Protocols
                </h4>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
                  {project.constructionJourney}
                </p>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)', marginBottom: '1rem' }}>
                  Integrated Infrastructure & Amenities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {project.keyFeatures.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--bg-surface-raised)', padding: '1rem', borderRadius: 'var(--radius-xs)' }}>
                      <CheckCircle2 size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)', marginBottom: '1.25rem' }}>
                  Execution Milestones & Handover Schedule
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.timelineStages.map((stg, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-surface-raised)', borderRadius: 'var(--radius-xs)', borderLeft: stg.status === 'Completed' ? '3px solid var(--gold-primary)' : '3px solid var(--border-medium)' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-warm-white)', fontSize: '0.95rem' }}>{stg.phase}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>Target: {stg.date}</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-xs)', background: stg.status === 'Completed' ? 'rgba(197, 168, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)', color: stg.status === 'Completed' ? 'var(--gold-light)' : 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {stg.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-warm-white)' }}>
                    Visual Documentation & Perspectives
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Click image to enlarge</span>
                </div>
                <div className="gallery-grid-modal">
                  {project.gallery?.map((img, idx) => (
                    <div
                      key={idx}
                      className="gallery-modal-card"
                      onClick={() => onOpenLightbox(img.url, `${project.title} — ${img.title} (${img.type})`)}
                    >
                      <img src={img.url} alt={img.title} />
                      <div className="gallery-card-badge">
                        {img.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer Ribbon */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Interested in acquiring or building a similar landmark structure?
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  onClose();
                  onEnquire(project.title);
                }}
                className="btn btn-primary"
              >
                <span>Enquire About This Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
