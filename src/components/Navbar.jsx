import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Mail, ChevronDown } from 'lucide-react';

export const Navbar = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Track active section
      const sections = ['hero', 'about', 'projects', 'services', 'process', 'sustainability', 'careers', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'Sustainability', href: '#sustainability', id: 'sustainability' },
    { name: 'Careers', href: '#careers', id: 'careers' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Logo */}
          <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="logo-main">AUREN</span>
            <span className="logo-sub">BUILD & DEVELOPMENTS</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links-desktop">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side Action */}
          <div className="nav-cta-group">
            <button
              onClick={onOpenConsultation}
              className="btn btn-primary"
              style={{ padding: '0.7rem 1.4rem', fontSize: '0.8rem' }}
            >
              <span>Start a Project</span>
              <ArrowRight size={15} />
            </button>

            {/* Hamburger Button */}
            <button
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Menu */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="nav-logo">
            <span className="logo-main">AUREN</span>
            <span className="logo-sub">BUILD & DEVELOPMENTS</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#fff', background: 'none', border: 'none', padding: '0.5rem' }}
            aria-label="Close menu"
          >
            <X size={30} />
          </button>
        </div>

        <ul className="mobile-links">
          {navLinks.map((link, idx) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span>{link.name}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--gold-primary)', fontFamily: 'var(--font-display)' }}>
                  0{idx + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-footer-info">
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenConsultation(); }}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            <span>Start a Project</span>
            <ArrowRight size={16} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={15} color="var(--gold-primary)" />
            <span>+91 98765 43210</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Mail size={15} color="var(--gold-primary)" />
            <span>hello@aurenbuild.com</span>
          </div>
        </div>
      </div>
    </>
  );
};
