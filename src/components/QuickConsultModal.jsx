import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const QuickConsultModal = ({ isOpen, initialTitle, type = 'consultation', onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectScope: initialTitle || 'General Architectural / Construction Inquiry',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmitted(true);
    setTimeout(() => {
      onSuccess?.(
        type === 'career'
          ? `Application submitted for ${formData.projectScope}! Our Talent team will review your credentials.`
          : `Consultation booked for ${formData.projectScope}! We will call you shortly.`
      );
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-backdrop-fixed" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog-shell" style={{ maxWidth: '600px', background: '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        <div style={{ padding: '3rem 2.5rem' }}>
          <div className="section-tag">
            {type === 'career' ? 'CAREER APPLICATION' : 'DIRECT CONSULTATION'}
          </div>

          <h3 className="font-serif" style={{ fontSize: '1.75rem', color: '#12151B', fontWeight: 800, marginBottom: '0.5rem' }}>
            {type === 'career' ? `Apply: ${initialTitle}` : `Start Your Project: ${initialTitle || 'AUREN Build'}`}
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
            {type === 'career'
              ? 'Join our award-winning architectural and engineering team in Chennai.'
              : 'Directly connect with our Senior Project Principal for technical feasibility, budgets, and scheduling.'}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group-lux">
              <label className="form-label-lux">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Ramachandran"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input-lux"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group-lux">
                <label className="form-label-lux">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input-lux"
                />
              </div>

              <div className="form-group-lux">
                <label className="form-label-lux">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input-lux"
                />
              </div>
            </div>

            <div className="form-group-lux">
              <label className="form-label-lux">
                {type === 'career' ? 'LinkedIn / Portfolio URL' : 'Target Location / Site Extent'}
              </label>
              <input
                type="text"
                placeholder={type === 'career' ? 'https://linkedin.com/in/... or portfolio link' : 'e.g. 3.5 Acres in OMR / Guindy'}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="form-input-lux"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.95rem', marginTop: '0.75rem' }}
            >
              <span>{type === 'career' ? 'Submit Application' : 'Confirm Consultation Request'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
