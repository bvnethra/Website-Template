import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', teamSize: '10-50' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D99B00', '#FFC52E', '#0F172A']
      });
    } catch (err) {
      // ignore
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(12px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              background: '#FFFFFF',
              border: '1px solid rgba(217, 155, 0, 0.4)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 25px 70px rgba(15, 23, 42, 0.25), 0 0 50px rgba(217, 155, 0, 0.2)',
              zIndex: 1000
            }}
          >
            {/* Close Button */}
            <button
              onClick={resetAndClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #FFC52E, #D99B00)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A'
                  }}>
                    <Layers size={18} strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Instant Workspace Setup
                  </span>
                </div>

                <h3 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Explore <span className="text-gold-gradient">Aurevyn Today</span>
                </h3>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Get immediate access to Aurevyn’s interactive workflow platform sandbox. No credit card required.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: '600' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#F8FAFC',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: '600' }}>
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#F8FAFC',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: '600' }}>
                      Team Size
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#F8FAFC',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    >
                      <option value="1-10">1 - 10 Team Members</option>
                      <option value="10-50">10 - 50 Team Members</option>
                      <option value="50-250">50 - 250 Team Members</option>
                      <option value="250+">250+ Enterprise</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '8px', width: '100%' }}>
                    Launch Interactive Workspace
                    <Sparkles size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(217, 155, 0, 0.15)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  border: '1px solid var(--accent)'
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px', color: 'var(--text-primary)' }}>
                  Workspace Ready!
                </h3>

                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                  Welcome aboard, <strong style={{ color: 'var(--accent)' }}>{formData.name || 'Friend'}</strong>! We’ve sent your instant workspace access credentials to <strong style={{ color: 'var(--text-primary)' }}>{formData.email}</strong>.
                </p>

                <button className="btn-primary" onClick={resetAndClose} style={{ width: '100%' }}>
                  Continue Exploring Template
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
