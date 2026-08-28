import React, { useState } from 'react';
import { ArrowUp, ArrowRight, ShieldCheck, Mail, Globe, Share2 } from 'lucide-react';

export const Footer = ({ onOpenLegalModal, onShowToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    if (onShowToast) onShowToast('Subscribed to AUREN Architectural Monographs & Quarterly Journals!');
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer-lux" aria-label="Footer">
      <div className="container">
        {/* Top Grid */}
        <div className="footer-top-grid">
          {/* Column 1: Brand & Tagline */}
          <div>
            <div className="nav-logo" style={{ marginBottom: '1rem' }}>
              <span className="logo-main" style={{ fontSize: '1.75rem' }}>AUREN</span>
              <span className="logo-sub" style={{ fontSize: '0.65rem' }}>BUILD & DEVELOPMENTS</span>
            </div>
            <p style={{ fontStyle: 'italic', color: 'var(--gold-light)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              "Building Spaces. Shaping Tomorrow."
            </p>
            <p style={{ color: 'var(--color-text-dim)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
              Premium multidisciplinary construction and real estate development company headquartered in Chennai, Tamil Nadu.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', maxWidth: '320px' }}>
              <input
                type="email"
                placeholder="Architectural Journal..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="form-input-lux"
                style={{ fontSize: '0.78rem', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-xs) 0 0 var(--radius-xs)' }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0 1rem', borderRadius: '0 var(--radius-xs) var(--radius-xs) 0' }}
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={15} />
              </button>
            </form>
          </div>

          {/* Column 2: Company */}
          <div>
            <div className="footer-col-title">COMPANY</div>
            <ul className="footer-nav-list">
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#why-us">Why Auren</a></li>
              <li><a href="#safety">Safety Protocols</a></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <div className="footer-col-title">SERVICES</div>
            <ul className="footer-nav-list">
              <li><a href="#services">Construction Management</a></li>
              <li><a href="#services">Design & Build</a></li>
              <li><a href="#services">Real Estate Development</a></li>
              <li><a href="#services">Infrastructure</a></li>
              <li><a href="#services">Renovation & Retrofitting</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <div className="footer-col-title">RESOURCES</div>
            <ul className="footer-nav-list">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#sustainability">Sustainability</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#technology">BIM & Digital Studio</a></li>
              <li><a href="#progress">Live Site Dashboard</a></li>
            </ul>
          </div>

          {/* Column 5: Social Links with clean SVGs */}
          <div>
            <div className="footer-col-title">CONNECT</div>
            <ul className="footer-nav-list" style={{ marginBottom: '1.5rem' }}>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <polygon points="10 15 15 12 10 9 10 15"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <div>
            © 2026 Auren Build & Developments. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenLegalModal('Privacy Policy')}
              style={{ color: 'var(--color-text-dim)', fontSize: '0.8125rem' }}
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => onOpenLegalModal('Terms & Conditions')}
              style={{ color: 'var(--color-text-dim)', fontSize: '0.8125rem' }}
            >
              Terms & Conditions
            </button>
            <span>|</span>
            <button
              onClick={() => onOpenLegalModal('RERA Compliance Disclosures')}
              style={{ color: 'var(--color-text-dim)', fontSize: '0.8125rem' }}
            >
              RERA Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
