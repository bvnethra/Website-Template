import React from 'react';
import { ArrowUp } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, DribbbleIcon, BehanceIcon } from './SocialIcons';
import './Footer.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: BehanceIcon, href: 'https://behance.net', label: 'Behance' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: DribbbleIcon, href: 'https://dribbble.com', label: 'Dribbble' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-row">
          {/* Logo & Tagline */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <div className="logo-badge">AD</div>
              <span className="logo-text">Arjun<span className="text-accent">Dev</span></span>
            </a>
            <p className="footer-tagline">
              Designed with curiosity. Built with intention.
            </p>
          </div>

          {/* Nav Links */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-nav-list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Scroll Top */}
          <div className="footer-social-col">
            <h4 className="footer-col-title">Connect</h4>
            <div className="footer-socials-row">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-social-btn"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <button
              onClick={scrollToTop}
              className="scroll-top-btn"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© 2026 Arjun Dev. All rights reserved.</p>
          <p className="footer-craft-text">
            Crafted for modern visual experiences
          </p>
        </div>
      </div>
    </footer>
  );
}
