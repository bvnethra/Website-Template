import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2, Phone, Mail, MapPin, Clock, Building } from 'lucide-react';

export const ContactSection = ({ prefillData, onShowToast }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: prefillData?.projectType || 'Residential',
    projectLocation: 'Chennai, Tamil Nadu',
    estimatedBudget: prefillData?.estimatedBudget || '₹10 Cr - ₹25 Cr',
    projectTimeline: prefillData?.timeline || '18 - 24 Months',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      if (onShowToast) onShowToast('Please complete required fields (Name, Email, Phone)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onShowToast) onShowToast('Consultation request received! Our Senior Partner will contact you within 24 hours.');
    }, 1200);
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-surface)' }} aria-label="Project Consultation Enquiry">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">START YOUR PROJECT</div>
          <h2 className="section-heading-lg">
            HAVE A PROJECT <span className="gold-text">IN MIND?</span>
          </h2>
          <p className="section-subtext mx-auto">
            "Let's turn your vision into a structure built to last."
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3.5rem', alignItems: 'flex-start' }}>
          {/* Main Enquiry Form */}
          <div className="contact-form-lux">
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(197, 168, 128, 0.15)', border: '2px solid var(--gold-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle2 size={36} color="var(--gold-primary)" />
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '0.75rem' }}>
                  Consultation Request Submitted
                </h3>
                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 2rem' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your project dossier has been assigned to our Executive Principal Engineer. We will review your feasibility requirements and reach out via {formData.email}.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-outline-gold"
                >
                  Submit Another Project Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  {/* Full Name */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="e.g. Rajiv Menon"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. rajiv@enterprise.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 98765 43210"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Company */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Apex Developments Ltd"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Project Type *</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="form-select-lux"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Project Location */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Project Location</label>
                    <input
                      type="text"
                      name="projectLocation"
                      placeholder="e.g. Guindy / OMR, Chennai"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Estimated Budget */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Estimated Budget</label>
                    <input
                      type="text"
                      name="estimatedBudget"
                      placeholder="e.g. ₹5 Cr – ₹20 Cr"
                      value={formData.estimatedBudget}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>

                  {/* Project Timeline */}
                  <div className="form-group-lux">
                    <label className="form-label-lux">Project Timeline</label>
                    <input
                      type="text"
                      name="projectTimeline"
                      placeholder="e.g. 18 – 24 Months"
                      value={formData.projectTimeline}
                      onChange={handleChange}
                      className="form-input-lux"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="form-group-lux" style={{ marginTop: '0.25rem' }}>
                  <label className="form-label-lux">Project Brief / Specific Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Describe your site parameters, architectural aspirations, approximate square footage, or specific timeline goals..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea-lux"
                  ></textarea>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1.1rem', fontSize: '0.95rem', marginTop: '1rem' }}
                >
                  <span>{isSubmitting ? 'PROCESSING DOSSIER...' : 'REQUEST A CONSULTATION →'}</span>
                  {!isSubmitting && <ArrowRight size={18} />}
                </button>
              </form>
            )}
          </div>

          {/* Right Brand Contact Information */}
          <div>
            <div className="glass-card" style={{ padding: '2.5rem 2.25rem' }}>
              <div className="nav-logo" style={{ marginBottom: '1.75rem' }}>
                <span className="logo-main" style={{ fontSize: '1.75rem' }}>AUREN</span>
                <span className="logo-sub" style={{ fontSize: '0.68rem' }}>BUILD & DEVELOPMENTS</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <MapPin size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Corporate Headquarters</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '2px', lineHeight: '1.5' }}>
                      123 Architecture Avenue, Anna Salai,<br />
                      Chennai, Tamil Nadu, 600002, India
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Phone size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Direct Inquiries</div>
                    <div style={{ color: 'var(--gold-light)', fontSize: '0.95rem', marginTop: '2px', fontWeight: 600 }}>
                      +91 98765 43210
                    </div>
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem' }}>Toll Free (India): 1800 425 9000</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Mail size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Electronic Correspondence</div>
                    <div style={{ color: 'var(--gold-light)', fontSize: '0.9rem', marginTop: '2px' }}>
                      hello@aurenbuild.com
                    </div>
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem' }}>tenders@aurenbuild.com</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <Clock size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>Business Hours</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                      Monday – Saturday: 9:00 AM – 6:00 PM IST
                    </div>
                    <div style={{ color: 'var(--color-text-dim)', fontSize: '0.75rem' }}>Sunday: Architectural Concierge by Appointment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
