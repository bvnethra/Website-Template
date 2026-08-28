import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Copy, Check, Send, Sparkles, MessageSquare, User, Tag } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Brand Identity',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const emailAddress = 'hello@arjundev.design';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide brief details about your project';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'Brand Identity', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Direct Info & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="contact-info-side"
          >
            <div className="section-tag">Let's Connect</div>
            <h2 className="section-title contact-headline">
              Have an idea <br />
              <span className="text-accent">worth building?</span>
            </h2>
            <p className="contact-subtext">
              Let's turn your next idea into something people remember. I’m currently available for select freelance visual design projects, brand architecture, and creative direction engagements.
            </p>

            {/* Email Box */}
            <div className="glass-card email-display-box">
              <div className="email-box-icon">
                <Mail size={22} />
              </div>
              <div className="email-box-content">
                <span className="email-label">Direct Line</span>
                <a href={`mailto:${emailAddress}`} className="email-address">
                  {emailAddress}
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="copy-btn"
                aria-label="Copy email address"
                title="Copy to clipboard"
              >
                {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="contact-cta-buttons">
              <a href={`mailto:${emailAddress}`} className="btn-primary">
                Send an Email
                <Mail size={16} />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('contact-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary"
              >
                Start a Project
                <Sparkles size={16} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card contact-form-wrapper"
            id="contact-form"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="form-success-state"
              >
                <div className="success-icon-badge">
                  <Check size={32} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you for reaching out. I’ll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <h3 className="form-title">Inquiry Details</h3>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <User size={15} /> Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className={`form-input ${errors.name ? 'has-error' : ''}`}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail size={15} /> Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maya@company.com"
                    className={`form-input ${errors.email ? 'has-error' : ''}`}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* Project Type */}
                <div className="form-group">
                  <label htmlFor="projectType" className="form-label">
                    <Tag size={15} /> Project Type
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="form-select"
                  >
                    <option value="Brand Identity">Brand Identity System</option>
                    <option value="Digital Design">Digital Experience / UI/UX</option>
                    <option value="Motion Graphics">Motion & Interactive System</option>
                    <option value="Creative Direction">Creative Direction</option>
                    <option value="Other">Other Design Service</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <MessageSquare size={15} /> Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your goals, timelines, and visual expectations..."
                    className={`form-textarea ${errors.message ? 'has-error' : ''}`}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary form-submit-btn"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
