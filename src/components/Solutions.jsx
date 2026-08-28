import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { solutionsData } from '../data/solutions';
import { CheckCircle2, ArrowRight, Compass, Zap, TrendingUp } from 'lucide-react';

const iconMap = { Compass, Zap, TrendingUp };

export default function Solutions({ onOpenDemo }) {
  const [activeStep, setActiveStep] = useState(0);
  const currentSolution = solutionsData[activeStep];
  const IconComponent = iconMap[currentSolution.visualIcon] || Compass;

  return (
    <section id="solutions" className="section-padding" style={{ background: 'var(--background-secondary)' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '16px' }}
          >
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Step-by-Step Lifecycle</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: '800',
              marginBottom: '20px'
            }}
          >
            Designed around <span className="text-gold-gradient">real work.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Whether planning Q4 goals or automating routine task handoffs, Aurevyn adapts to how your operations evolve.
          </motion.p>
        </div>

        {/* Step Tabs Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {solutionsData.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveStep(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 28px',
                  borderRadius: 'var(--radius-full)',
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: isActive ? 'rgba(217, 155, 0, 0.12)' : '#FFFFFF',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isActive ? '0 4px 20px rgba(217, 155, 0, 0.2)' : 'none'
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)'
                }}>
                  {item.id}
                </span>
                <span>{item.step}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Showcase Card */}
        <div className="aurevyn-card" style={{ padding: '0', overflow: 'hidden', background: '#FFFFFF' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSolution.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'stretch'
              }}
            >
              {/* Left Details */}
              <div style={{ padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '42px',
                    fontWeight: '800',
                    color: 'var(--accent)',
                    lineHeight: 1
                  }}>
                    {currentSolution.id}
                  </span>
                  <span className="glass-badge" style={{ padding: '4px 12px', fontSize: '11px' }}>
                    {currentSolution.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: '800',
                  lineHeight: 1.25,
                  marginBottom: '18px',
                  color: 'var(--text-primary)'
                }}>
                  {currentSolution.title}
                </h3>

                <p style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '32px'
                }}>
                  {currentSolution.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '36px' }}>
                  {currentSolution.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={18} color="var(--accent)" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button className="btn-primary" onClick={onOpenDemo} style={{ alignSelf: 'flex-start' }}>
                  Deploy {currentSolution.step} Stage
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Right Visual Simulation Mockup */}
              <div style={{
                background: '#F8FAFC',
                borderLeft: '1px solid var(--border)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(217, 155, 0, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(217, 155, 0, 0.15)',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{currentSolution.step} Module</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Live Status Sync</div>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: 'var(--accent)',
                      background: 'rgba(217, 155, 0, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}>
                      {currentSolution.previewMetric}
                    </span>
                  </div>

                  {/* Dynamic Simulation Content */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[1, 2, 3].map((stepNum) => (
                      <div key={stepNum} style={{
                        background: '#F8FAFC',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: stepNum === 1 ? 'var(--accent)' : 'rgba(15,23,42,0.08)',
                            color: stepNum === 1 ? '#FFFFFF' : 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '700'
                          }}>
                            {stepNum}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600' }}>
                            {currentSolution.step} Action Pipeline #{stepNum}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700' }}>
                          {stepNum === 1 ? 'Active' : 'Queued'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
