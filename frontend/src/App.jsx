import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function Header() {
  return (
    <>
      {/* Top Executive Utility Bar */}
      <div className="utility-bar">
        <div className="container utility-container">
          <div className="utility-left">
            <span className="utility-item"><i className="fa-solid fa-star"></i> Fall 2026 Admissions Open — Early Decision Deadline Nov 15</span>
            <span className="utility-separator">|</span>
            <span className="utility-item"><i className="fa-solid fa-cloud-sun"></i> Cambridge Meadows: 68°F / 20°C Sunny</span>
          </div>
          <div className="utility-right">
            <span className="utility-item"><i className="fa-solid fa-phone"></i> +1 (800) 555-UNIV</span>
            <span className="utility-separator">|</span>
            <a href="#tuition-calc" className="utility-link">Tuition Calculator</a>
            <span className="utility-separator">|</span>
            <a href="#calendar-events" className="utility-link"><i className="fa-regular fa-calendar-days"></i> Academic Calendar</a>
            <span className="utility-separator">|</span>
            <Link to="/admin" className="utility-link"><i className="fa-solid fa-user-graduate"></i> Staff Portal</Link>
          </div>
        </div>
      </div>

      {/* Transparent Header */}
      <header className="header" style={{ position: 'absolute', top: '40px' }}>
        <div className="container nav-container">
          <Link to="/" className="logo-wrapper">
            <div className="crest-logo">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="logo-text">
              <h3>Modern</h3>
              <p>University</p>
            </div>
          </Link>
          
          <nav className="nav-menu">
            <div className="nav-dropdown-item">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-dropdown-item">
              <a href="#admission-portal">Admission</a>
            </div>
            <div className="nav-dropdown-item">
              <a href="#degree-finder">Academics</a>
            </div>
            <div className="nav-dropdown-item">
              <a href="#tour-section">Campus Life</a>
            </div>
            <div className="nav-dropdown-item">
              <a href="#faculty-showcase">Faculty</a>
            </div>
            <div className="nav-dropdown-item">
              <a href="#calendar-events">Events</a>
            </div>
            <div className="nav-dropdown-item">
              <a href="#gazette">News</a>
            </div>
          </nav>
          
          <div className="header-right-side">
            <a href="#admission-portal" className="btn-apply-now">APPLY NOW</a>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer id="footer" style={{
      background: '#0f172a',
      color: 'white',
      padding: '60px 40px 30px 40px',
      marginTop: 80,
      borderTopLeftRadius: '30px',
      borderTopRightRadius: '30px'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        marginBottom: 50
      }}>
        <div>
          <div className="logo-wrapper" style={{ marginBottom: 20 }}>
            <div className="crest-logo">
              <i className="fa-solid fa-graduation-cap" style={{ color: '#eab308' }}></i>
            </div>
            <div className="logo-text">
              <h3 style={{ color: '#fff' }}>Modern</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>University</p>
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6' }}>
            Pioneering Tier 1 research, state-of-the-art technologies, and future leadership from our Cambridge Meadows campus.
          </p>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem', fontFamily: 'var(--accent-font)' }}>Admissions</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', padding: 0 }}>
            <li><a href="#admission-portal" style={{ color: '#cbd5e1' }}>Enrollment Portal</a></li>
            <li><a href="#tuition-calc" style={{ color: '#cbd5e1' }}>Tuition Calculator</a></li>
            <li><a href="#tour-section" style={{ color: '#cbd5e1' }}>Campus Visits</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem', fontFamily: 'var(--accent-font)' }}>Academics</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', padding: 0 }}>
            <li><a href="#degree-finder" style={{ color: '#cbd5e1' }}>Degree Finder</a></li>
            <li><a href="#faculty-showcase" style={{ color: '#cbd5e1' }}>Distinguished Faculty</a></li>
            <li><a href="#gazette" style={{ color: '#cbd5e1' }}>Research Gazette</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'white', marginBottom: 20, fontSize: '1rem', fontFamily: 'var(--accent-font)' }}>Portals</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', padding: 0 }}>
            <li><Link to="/admin" style={{ color: '#cbd5e1' }}>Staff Console</Link></li>
            <li><Link to="/" style={{ color: '#cbd5e1' }}>Student Portal</Link></li>
          </ul>
        </div>
      </div>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        paddingTop: 30,
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20,
        fontSize: '0.8rem',
        color: '#94a3b8'
      }}>
        <span>&copy; {new Date().getFullYear()} Modern University. All Rights Reserved.</span>
        <span>Built with React + Java Spring Boot + MySQL.</span>
      </div>
    </footer>
  );
}

function MainApp() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Header />
        
        <main style={{ flex: 1, width: '100%', margin: '0 auto', padding: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default MainApp;
