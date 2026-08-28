import React, { useState } from 'react';
import { ArrowRight, Check, X, Shield, Award, Clock, MapPin, Sparkles } from 'lucide-react';

export const AboutSection = () => {
  const [showStoryModal, setShowStoryModal] = useState(false);

  return (
    <section id="about" className="section-padding" aria-label="About Company">
      <div className="container">
        <div className="about-split-layout">
          {/* Left Visual Frame */}
          <div className="about-visual-frame">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
              alt="AUREN Architects and Engineers reviewing master blueprints"
              className="about-main-photo"
            />
            {/* Experience Floating Badge */}
            <div className="about-floating-experience-badge">
              <div className="exp-years">14+</div>
              <div className="exp-text">Years of Excellence</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--gold-primary)', fontWeight: 700, marginTop: '4px' }}>
                Est. 2012 • Chennai
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="about-text-content">
            <div className="section-tag">WHO WE ARE</div>
            
            <h2 className="section-heading-lg">
              Engineering Excellence <br />
              <span className="gold-text">Into Every Structure.</span>
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: '1.75', marginBottom: '1.5rem' }}>
              AUREN Build & Developments is a multidisciplinary construction and development company delivering high-quality residential, commercial and infrastructure projects.
            </p>

            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.75', marginBottom: '1.75rem' }}>
              From initial planning and architectural coordination to construction management and final handover, our team brings together experienced professionals, advanced technology and disciplined project execution.
            </p>

            <div className="about-quote-box">
              "Our philosophy is simple: build with precision, communicate with transparency and create spaces that stand the test of time."
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowStoryModal(true)}
                className="btn-text-arrow"
                style={{ fontSize: '0.95rem' }}
              >
                <span>Discover Our Story</span>
                <span className="arrow">→</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>
                <MapPin size={16} color="var(--gold-primary)" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Story Modal */}
      {showStoryModal && (
        <div className="modal-backdrop-fixed" onClick={() => setShowStoryModal(false)}>
          <div 
            className="modal-dialog-shell" 
            style={{ maxWidth: '850px', background: '#FFFFFF' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn" 
              onClick={() => setShowStoryModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div style={{ padding: '3.5rem 3rem' }}>
              <div className="section-tag">OUR LEGACY & ETHOS</div>
              <h3 className="section-heading-lg" style={{ fontSize: '2.1rem', color: '#12151B' }}>
                The AUREN Story: Shaping Tomorrow’s Skyline
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
                <p>
                  Founded in 2012 in Chennai, Tamil Nadu, AUREN was born out of a desire to bridge the gap between world-class architectural visionary design and rigorous civil engineering execution.
                </p>
                <p>
                  Over the past 14 years, we have delivered over 85 landmark residential towers, bespoke coastal villas, grade-A corporate tech campuses, and large-scale urban infrastructure viaducts across southern India.
                </p>
                <p>
                  We operate as a fully integrated practice with in-house structural engineers, master architects, MEP coordinators, and BIM specialists. Every project we undertake is governed by strict ISO quality benchmarks, 100% digital clash resolution, and a zero-harm safety mandate.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ textAlign: 'center', background: '#FAF8F4', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
                  <div className="gold-text" style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>85+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Completed Landmarks</div>
                </div>
                <div style={{ textAlign: 'center', background: '#FAF8F4', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
                  <div className="gold-text" style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>14+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Years Track Record</div>
                </div>
                <div style={{ textAlign: 'center', background: '#FAF8F4', padding: '1.25rem', borderRadius: 'var(--radius-xs)' }}>
                  <div className="gold-text" style={{ fontSize: '1.85rem', fontWeight: 800, fontFamily: 'var(--font-display)' }}>1.2K+</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Happy Clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
