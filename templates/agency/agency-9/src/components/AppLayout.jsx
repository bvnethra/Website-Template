import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { MagneticButton } from './MagneticButton';
import '../styles/theme.css';

// SVG Icons for clean, zero-dependency visual fidelity
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const CompassLogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

/**
 * SpatialHeader - Floating Glass Navbar with Magnetic Actions and Theme Toggler
 */
const SpatialHeader = ({ activeNav, onNavChange }) => {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'components', label: 'Component Matrix' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'telemetry', label: 'Telemetry & KPIs' },
    { id: 'case-studies', label: 'Selected Works' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 50,
        margin: '0 auto',
        maxWidth: '1280px',
        padding: '0 20px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          borderRadius: '20px',
          boxShadow: 'var(--shadow-card)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px var(--accent-glow)',
            }}
          >
            <CompassLogoIcon />
          </div>
          <div>
            <div
              style={{
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>AETHER</span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: 'var(--bg-surface-subtle)',
                  color: 'var(--accent-primary)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                SPATIAL
              </span>
            </div>
            <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Architecture & Creative Labs
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="hidden-mobile">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange?.(item.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-surface)' : 'transparent',
                  border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? 'var(--shadow-subtle)' : 'none',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Theme Switcher Button */}
          <MagneticButton
            variant="secondary"
            size="sm"
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              padding: 0,
              borderRadius: '12px',
            }}
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </motion.div>
            </AnimatePresence>
          </MagneticButton>

          {/* Primary CTA */}
          <MagneticButton
            variant="primary"
            size="sm"
            icon={<ArrowRightIcon />}
            iconPosition="right"
            onClick={() => onNavChange?.('components')}
          >
            Explore System
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};

/**
 * SpatialFooter - High Data Organization Agency Footer
 */
const SpatialFooter = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        marginTop: '90px',
        padding: '60px 20px 40px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '50px',
          }}
        >
          {/* Column 1: Brand & Status */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'var(--accent-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <CompassLogoIcon />
              </div>
              <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.02em' }}>
                AETHER // SPATIAL
              </span>
            </div>
            <p
              style={{
                fontSize: '13.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Architecting weightless, spatial, and hyper-responsive digital environments for the next generation of web products.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                fontSize: '11.5px',
                fontWeight: 600,
                color: 'var(--accent-emerald)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent-emerald)',
                  boxShadow: '0 0 8px var(--accent-emerald)',
                  display: 'inline-block',
                }}
              />
              <span>SYSTEMS LIVE • GLOBAL MESH OPERATIONAL</span>
            </div>
          </div>

          {/* Column 2: Architectural Tokens */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Component Foundations
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13.5px', lineHeight: 2 }}>
              <li>
                <a href="#components" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Floating Cards (3D Tilt & Diffuse Shadows)
                </a>
              </li>
              <li>
                <a href="#components" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Magnetic Primary Actions (Spring Physics)
                </a>
              </li>
              <li>
                <a href="#telemetry" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Data Density Containers (1px Grid Matrix)
                </a>
              </li>
              <li>
                <a href="#overview" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Global Spatial Shell & Scroll Observers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Coordinates */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Global Studio Hubs
            </div>
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <div><strong>San Francisco:</strong> 550 Montgomery St, Floor 14</div>
              <div><strong>Tokyo:</strong> Shibuya Stream Tower, 21F</div>
              <div><strong>Berlin:</strong> Torstraße 102, Mitte</div>
              <div style={{ marginTop: '10px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                hello@aether-spatial.design
              </div>
            </div>
          </div>

          {/* Column 4: Magnetic Dispatch */}
          <div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              Spatial Dispatch
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Subscribe to our bi-weekly spatial UI architectures & engineering drops.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="architect@domain.com"
                style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <MagneticButton variant="primary" size="sm">
                Join
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>© {new Date().getFullYear()} AETHER SPATIAL LABS INC. ALL RIGHTS RESERVED.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>PRIVACY PROTOCOL</span>
            <span>TERMS OF ARCHITECTURE</span>
            <span>SYSTEM TELEMETRY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * AppLayout Component (Phase 1 Deliverable)
 * Global layout shell incorporating ThemeProvider, theme tokens, ambient grid,
 * spatial header, and footer.
 */
export const AppLayout = ({ children, activeNav = 'overview', onNavChange }) => {
  return (
    <ThemeProvider>
      <div
        className="aether-app-shell"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Ambient Spatial Background Overlays */}
        <div className="aether-spatial-grid" />
        <div className="aether-ambient-glow" />

        {/* Global Floating Navigation */}
        <SpatialHeader activeNav={activeNav} onNavChange={onNavChange} />

        {/* Main Content Viewport */}
        <main
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '24px 20px 0 20px',
          }}
        >
          {children}
        </main>

        {/* Global Spatial Footer */}
        <SpatialFooter />
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;
