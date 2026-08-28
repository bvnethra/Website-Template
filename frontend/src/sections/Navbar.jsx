import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'showcase', label: 'Showcase' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section calculation
      const scrollPosition = window.scrollY + 120; // offset
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const navContainerVariants = {
    hidden: { y: -100, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.header
      variants={navContainerVariants}
      initial="hidden"
      animate="show"
      style={{
        position: 'fixed',
        top: scrolled ? '15px' : '30px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: scrolled ? '90%' : '95%',
        maxWidth: '1200px',
        zIndex: 9999,
        background: scrolled ? 'rgba(4, 8, 20, 0.75)' : 'rgba(4, 8, 20, 0.25)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.03)',
        borderRadius: scrolled ? '20px' : '12px',
        padding: scrolled ? '12px 24px' : '18px 30px',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 1px 0 0 rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Brand logo */}
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, 'home')}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#fff',
          textDecoration: 'none',
          letterSpacing: '1px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#06b6d4',
          boxShadow: '0 0 10px #06b6d4',
        }} />
        MOTIONA
      </a>

      {/* Desktop navigation */}
      <nav style={{ display: 'none', gap: '30px', alignItems: 'center' }} className="desktop-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                color: isActive ? '#fff' : '#9ca3af',
                textDecoration: 'none',
                position: 'relative',
                transition: 'color 0.3s ease',
                padding: '4px 0',
              }}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                    borderRadius: '1px',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Get Started Button (Desktop Only) */}
      <div style={{ display: 'none' }} className="desktop-nav">
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="btn-primary"
          style={{ padding: '8px 20px', fontSize: '0.9rem' }}
        >
          Get Started
        </a>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'block',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
        }}
        className="mobile-nav-toggle"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              right: 0,
              background: 'rgba(4, 8, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#06b6d4' : '#9ca3af',
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
                    transition: 'color 0.2s',
                  }}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="btn-primary"
              style={{
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media query styling in styles block since it is clean */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </motion.header>
  );
}
