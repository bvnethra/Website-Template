import React, { useState } from 'react';
import { careersData } from '../data/careersData';
import { Briefcase, MapPin, Clock, ArrowRight, ChevronDown, CheckCircle2, X } from 'lucide-react';

export const CareersSection = ({ onOpenApplicationModal }) => {
  const [expandedJobId, setExpandedJobId] = useState(null);

  const toggleJob = (id) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="careers" className="section-padding" style={{ background: '#FAF9F5' }} aria-label="Careers at AUREN">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">TALENT & CULTURE</div>
          <h2 className="section-heading-lg">
            BUILD YOUR CAREER <span className="gold-text">WITH US</span>
          </h2>
          <p className="section-subtext mx-auto">
            "We are always looking for architects, engineers, project managers, designers and construction professionals who want to build meaningful places."
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#careers-list" className="btn btn-primary">
              <span>View Open Positions</span>
              <ArrowRight size={16} />
            </a>
            <button 
              onClick={() => onOpenApplicationModal("General Engineering Application")}
              className="btn btn-secondary"
            >
              <span>Join Our Team</span>
            </button>
          </div>
        </div>

        {/* Jobs List Accordion */}
        <div id="careers-list" style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {careersData.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <div 
                key={job.id} 
                className="faq-accordion-item" 
                style={{ borderColor: isExpanded ? 'var(--gold-primary)' : 'var(--border-subtle)', background: '#FFFFFF' }}
              >
                <div 
                  onClick={() => toggleJob(job.id)}
                  style={{
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 800 }}>
                      {job.department}
                    </span>
                    <h3 className="font-serif" style={{ fontSize: '1.25rem', color: '#12151B', fontWeight: 700, margin: '0.25rem 0' }}>
                      {job.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <span>📍 {job.location}</span>
                      <span>•</span>
                      <span>⏳ {job.type}</span>
                      <span>•</span>
                      <span>💼 {job.experience}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenApplicationModal(job.title);
                      }}
                      className="btn btn-outline-gold"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                    >
                      Apply Now
                    </button>
                    <ChevronDown
                      size={20}
                      color="var(--gold-primary)"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0 2rem 2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', background: '#FAF9F5' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                      {job.description}
                    </p>

                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#12151B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                      Key Role Competencies:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {job.requirements.map((req, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: '#334155' }}>
                          <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onOpenApplicationModal(job.title)}
                      className="btn btn-primary"
                    >
                      <span>Submit Application for {job.title}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
