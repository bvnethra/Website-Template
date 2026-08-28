import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle, Sparkles, Building } from 'lucide-react';

export const ProjectEstimator = ({ onApplyEstimate }) => {
  const [projectType, setProjectType] = useState('residential');
  const [areaSqFt, setAreaSqFt] = useState(25000);
  const [finishGrade, setFinishGrade] = useState('ultra-luxury');
  const [includeBim, setIncludeBim] = useState(true);

  // Calculation parameters
  const estimate = useMemo(() => {
    let baseRatePerSqFt = 3400; // Base INR per sq.ft

    if (projectType === 'commercial') baseRatePerSqFt = 4200;
    if (projectType === 'industrial') baseRatePerSqFt = 2600;
    if (projectType === 'infrastructure') baseRatePerSqFt = 5800;
    if (projectType === 'villas') baseRatePerSqFt = 4800;

    let multiplier = 1;
    if (finishGrade === 'premium') multiplier = 1.15;
    if (finishGrade === 'ultra-luxury') multiplier = 1.35;
    if (finishGrade === 'presidential') multiplier = 1.6;

    const totalCost = areaSqFt * baseRatePerSqFt * multiplier * (includeBim ? 1.03 : 1);

    // Approximate timeline in months
    let months = Math.round(12 + (areaSqFt / 15000) * 3);
    if (projectType === 'industrial') months = Math.round(8 + (areaSqFt / 40000) * 2);
    if (projectType === 'infrastructure') months = Math.round(18 + (areaSqFt / 10000) * 4);

    return {
      minCrores: (totalCost * 0.95 / 10000000).toFixed(2),
      maxCrores: (totalCost * 1.1 / 10000000).toFixed(2),
      timelineMonths: months,
      ratePerSqFt: Math.round(baseRatePerSqFt * multiplier)
    };
  }, [projectType, areaSqFt, finishGrade, includeBim]);

  return (
    <section className="section-padding" style={{ background: '#FAF9F5', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Interactive Project Budget & Timeline Estimator">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag center">FEASIBILITY ESTIMATOR</div>
          <h2 className="section-heading-lg">
            CALCULATE YOUR <span className="gold-text">PROJECT BENCHMARKS</span>
          </h2>
          <p className="section-subtext mx-auto">
            Get an instant structural and financial estimate tailored to South Indian municipal codes, high-grade materials, and timeline parameters.
          </p>
        </div>

        <div className="glass-card" style={{ maxWidth: '1050px', margin: '0 auto', padding: '3rem 2.5rem', background: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'center' }}>
            {/* Left Controls */}
            <div>
              {/* Type Picker */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-lux">Project Asset Class</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {[
                    { id: 'residential', label: 'Residential Tower' },
                    { id: 'villas', label: 'Luxury Villas' },
                    { id: 'commercial', label: 'Commercial Hub' },
                    { id: 'industrial', label: 'Industrial / PEB' },
                    { id: 'infrastructure', label: 'Infrastructure' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setProjectType(t.id)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-xs)',
                        border: projectType === t.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                        background: projectType === t.id ? 'var(--gold-gradient)' : '#FAF8F4',
                        color: projectType === t.id ? '#FFFFFF' : '#4A5568',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Slider */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label className="form-label-lux">Built-Up Area (sq. ft.)</label>
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                    {areaSqFt.toLocaleString()} sq. ft.
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--gold-primary)', cursor: 'pointer' }}
                />
              </div>

              {/* Specification Tier */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label-lux">Finishes & Engineering Tier</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {[
                    { id: 'premium', label: 'Grade-A Premium' },
                    { id: 'ultra-luxury', label: 'Ultra-Luxury Signature' },
                    { id: 'presidential', label: 'Bespoke Iconic' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setFinishGrade(g.id)}
                      style={{
                        padding: '0.6rem 0.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-xs)',
                        border: finishGrade === g.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-medium)',
                        background: finishGrade === g.id ? 'rgba(163, 127, 78, 0.15)' : '#FAF8F4',
                        color: finishGrade === g.id ? 'var(--gold-primary)' : '#4A5568'
                      }}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* BIM Toggle */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginTop: '1rem' }}>
                <input
                  type="checkbox"
                  checked={includeBim}
                  onChange={(e) => setIncludeBim(e.target.checked)}
                  style={{ accentColor: 'var(--gold-primary)', width: '18px', height: '18px' }}
                />
                <span style={{ fontSize: '0.85rem', color: '#12151B', fontWeight: 600 }}>
                  Include 5D BIM Modeling & Digital Twin Twin-Clash Detection
                </span>
              </label>
            </div>

            {/* Right Projected Output Card */}
            <div style={{ background: '#FAF8F4', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-xs)', padding: '2.25rem', textAlign: 'center', boxShadow: 'var(--shadow-subtle)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: 800, marginBottom: '0.5rem' }}>
                PROJECTED INVESTMENT RANGE
              </div>

              <div className="gold-text font-display" style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.1, margin: '0.5rem 0' }}>
                ₹{estimate.minCrores} – ₹{estimate.maxCrores} Cr
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Approx. ₹{estimate.ratePerSqFt.toLocaleString()} per sq.ft. (All-inclusive turn-key)
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', padding: '1rem 0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', fontWeight: 700 }}>ESTIMATED TIMELINE</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#12151B', marginTop: '2px' }}>
                    {estimate.timelineMonths} Months
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', fontWeight: 700 }}>QUALITY PROTOCOL</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--gold-primary)', marginTop: '4px' }}>
                    ISO 9001:2015
                  </div>
                </div>
              </div>

              <button
                onClick={() => onApplyEstimate({
                  projectType,
                  areaSqFt,
                  estimatedBudget: `₹${estimate.minCrores} - ${estimate.maxCrores} Cr`,
                  timeline: `${estimate.timelineMonths} Months`
                })}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <span>Lock Estimate & Request Consultation</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
