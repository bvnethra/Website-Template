import React, { useState } from 'react';
import { progressProjects } from '../data/technologyData';
import { Activity, Clock, ShieldCheck, HardHat, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';

export const ProgressDashboard = () => {
  const [selectedProjectId, setSelectedProjectId] = useState('nova-business-district');

  const currentProject = progressProjects.find((p) => p.id === selectedProjectId) || progressProjects[0];

  return (
    <section className="section-padding" style={{ background: '#FAF9F5' }} aria-label="Interactive Construction Progress Dashboard">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">TRANSPARENT CLIENT PORTAL</div>
          <h2 className="section-heading-lg">
            LIVE PROJECT <span className="gold-text">PROGRESS TRACKER</span>
          </h2>
          <p className="section-subtext mx-auto">
            Real-time construction analytics, structural milestones, and completion telemetry directly from our on-site engineers.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {progressProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`filter-pill-btn ${selectedProjectId === p.id ? 'active' : ''}`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Dashboard Box Frame */}
        <div className="progress-dashboard-frame">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left Metrics & Progress Bars */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
                    {currentProject.type}
                  </span>
                  <h3 className="font-serif" style={{ fontSize: '1.75rem', color: '#12151B', fontWeight: 800, marginTop: '0.5rem' }}>
                    {currentProject.name}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px', fontWeight: 500 }}>
                    📍 {currentProject.location}
                  </div>
                </div>

                {/* Overall Radial / Big Metric */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Overall Progress
                  </div>
                  <div className="gold-text font-display" style={{ fontSize: '2.75rem', fontWeight: 900, lineHeight: 1 }}>
                    {currentProject.overallProgress}%
                  </div>
                </div>
              </div>

              {/* Progress Bar Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.75rem' }}>
                {currentProject.phases.map((ph, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                      <span style={{ color: '#12151B', fontWeight: 700 }}>{ph.name}</span>
                      <span style={{ color: 'var(--gold-primary)', fontWeight: 800 }}>
                        {ph.progress}% <span style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem' }}>({ph.status})</span>
                      </span>
                    </div>
                    <div className="progress-bar-track">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${ph.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Target Handover Ribbon */}
              <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 700 }}>
                  <Calendar size={18} />
                  <span>Target Handover: {currentProject.completionDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <HardHat size={16} color="var(--gold-primary)" />
                  <span>{currentProject.workforceOnSite}</span>
                </div>
              </div>
            </div>

            {/* Right Live Site Photo & Telemetry Badge */}
            <div style={{ position: 'relative' }}>
              <img
                src={currentProject.image}
                alt={`${currentProject.name} Active Construction Site`}
                style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-elevated)' }}
              />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#FFFFFF', border: '1px solid var(--border-gold)', padding: '0.5rem 0.9rem', borderRadius: 'var(--radius-xs)', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 8px #16a34a' }}></span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', color: '#12151B', textTransform: 'uppercase' }}>
                  LIVE SITE CAM FEED
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', background: 'rgba(255, 255, 255, 0.94)', border: '1px solid var(--border-subtle)', backdropFilter: 'blur(10px)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-xs)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Safety Record</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-primary)', fontWeight: 800 }}>
                  🛡️ {currentProject.safetyHours}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
