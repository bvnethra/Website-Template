import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', num: '01', label: 'HOME' },
  { id: 'story', num: '02', label: 'STORY' },
  { id: 'services', num: '03', label: 'SERVICES' },
  { id: 'experiments', num: '04', label: 'TRY SOMETHING' },
  { id: 'projects', num: '05', label: 'WORK' },
  { id: 'process', num: '06', label: 'PROCESS' },
  { id: 'team', num: '07', label: 'PEOPLE' },
  { id: 'contact', num: '08', label: 'CONTACT' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState(null);

  // Monitor scroll to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation Rail */}
      <nav className="desktop-nav-rail">
        <div className="nav-logo">
          <span className="logo-text">C★S</span>
        </div>
        <div className="nav-items-container">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className={`nav-rail-item ${isActive ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                data-cursor="OPEN"
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <motion.div
                    className="active-rail-indicator"
                    layoutId="activeRailIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="nav-item-num">{item.num}</span>
                
                <motion.span
                  className="nav-item-label"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isHovered || isActive ? 'auto' : 0,
                    opacity: isHovered || isActive ? 1 : 0,
                    marginLeft: isHovered || isActive ? 10 : 0
                  }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {item.label}
                </motion.span>
              </div>
            );
          })}
        </div>
        <div className="nav-rail-footer">
          <div className="nav-line-drawn"></div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              <span className="mobile-btn-num">{item.num}</span>
              <span className="mobile-btn-label">{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Styling for Navigation */}
      <style>{`
        /* Desktop Rail */
        .desktop-nav-rail {
          position: fixed;
          top: 0;
          left: 0;
          width: 80px;
          height: 100vh;
          background-color: var(--bg-paper);
          border-right: var(--border-sketch);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          z-index: 999;
        }

        .nav-logo {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1.4rem;
          border: var(--border-sketch);
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--accent-yellow);
          box-shadow: 2px 2px 0px var(--border-color);
        }

        .nav-items-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          width: 100%;
          padding-left: 20px;
        }

        .nav-rail-item {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          height: 30px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .nav-rail-item:hover, .nav-rail-item.active {
          color: var(--text-charcoal);
        }

        .nav-item-num {
          font-size: 0.9rem;
          display: inline-block;
          position: relative;
          z-index: 2;
        }

        .nav-item-label {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          overflow: hidden;
          font-weight: 800;
        }

        .active-rail-indicator {
          position: absolute;
          left: -20px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--accent-coral);
          border: 1px solid var(--border-color);
        }

        .nav-rail-footer {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .nav-line-drawn {
          width: 2px;
          height: 50px;
          background-color: var(--border-color);
        }

        /* Mobile Bottom Nav */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 65px;
          background-color: var(--bg-paper);
          border-top: var(--border-sketch);
          z-index: 999;
          justify-content: space-around;
          align-items: center;
          padding: 0 5px;
          box-shadow: 0px -5px 15px rgba(0,0,0,0.05);
        }

        .mobile-nav-btn {
          background: none;
          border: none;
          outline: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-grow: 1;
          height: 100%;
        }

        .mobile-btn-num {
          font-family: var(--font-mono);
          font-size: 0.7rem;
        }

        .mobile-btn-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 800;
          margin-top: 3px;
        }

        .mobile-nav-btn.active {
          color: var(--accent-coral);
          background-color: rgba(255, 95, 56, 0.05);
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .desktop-nav-rail {
            display: none;
          }
          .mobile-bottom-nav {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
