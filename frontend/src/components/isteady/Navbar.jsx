import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#about" },
    { label: "Gallery", href: "#work" },
    { label: "Modes", href: "#services" },
    { label: "Order", href: "#contact" }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '85px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      zIndex: 1000,
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
      backdropFilter: isScrolled ? 'blur(16px)' : 'none',
      boxSizing: 'border-box'
    }}>
      {/* Brand logo */}
      <a href="#home" style={{
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#ffffff',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <span style={{ fontWeight: '300', fontSize: '1.15rem', letterSpacing: '-0.5px' }}>iSteady</span>
        <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#e27b3e' }}>MT3</span>
      </a>

      {/* Nav Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '26px',
          margin: 0,
          padding: 0
        }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: "'Poppins', sans-serif",
                  opacity: 0.65,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = '#e27b3e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = 0.65;
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <a 
          href="#contact" 
          style={{
            background: 'linear-gradient(135deg, #e27b3e 0%, #ff5e3a 100%)',
            color: '#000000',
            textDecoration: 'none',
            fontSize: '0.72rem',
            fontWeight: '800',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '10px 22px',
            borderRadius: '99px',
            boxShadow: '0 4px 15px rgba(226, 123, 62, 0.25)',
            fontFamily: "'Poppins', sans-serif",
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Buy Now
        </a>
      </div>
    </nav>
  );
}
