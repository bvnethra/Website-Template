import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Layers } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Platform', href: '#platform' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = navItems.map(item => item.href.substring(1));
      const currentPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= currentPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(targetId);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled
          ? '1px solid rgba(15, 23, 42, 0.08)'
          : '1px solid rgba(15, 23, 42, 0.04)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FFC52E 0%, #D99B00 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0F172A',
            boxShadow: '0 0 16px rgba(217, 155, 0, 0.35)'
          }}>
            <Layers size={20} strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '22px',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}>
            AUREVYN
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                style={{
                  position: 'relative',
                  padding: '8px 14px',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  borderRadius: '6px'
                }}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '12px',
                      right: '12px',
                      height: '2px',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, #D99B00, #FFC52E)',
                      boxShadow: '0 0 8px rgba(217, 155, 0, 0.5)'
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            className="btn-primary" 
            onClick={onOpenDemo}
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? <X size={26} color="var(--accent)" /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: '#FFFFFF',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
              padding: '20px 24px 30px 24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    style={{
                      fontSize: '18px',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(15,23,42,0.05)'
                    }}
                  >
                    <span>{item.label}</span>
                    {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />}
                  </motion.a>
                );
              })}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="btn-primary"
                onClick={() => { setMobileMenuOpen(false); onOpenDemo(); }}
                style={{ marginTop: '12px', width: '100%' }}
              >
                Get Started
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </motion.header>
  );
}
