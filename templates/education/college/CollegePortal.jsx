import React, { useState } from 'react';
import useStylesheet from '../../../frontend/src/services/useStylesheet';

export default function CollegePortal() {
  useStylesheet('/templates/education/college/style.css');

  /* ==========================================
     Admissions Enrollment Booking Form
     ========================================== */
  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [intendedMajor, setIntendedMajor] = useState('Computer Science & Engineering');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!studentName.trim() || !email.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);
    const trackingId = 'CLG-' + Math.floor(100000 + Math.random() * 900000);

    const payload = {
      studentName: studentName.trim(),
      email: email.trim(),
      intendedMajor
    };

    try {
      const response = await fetch('http://localhost:8080/api/college/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setReceipt({
          name: data.studentName,
          trackingId: data.trackingId,
          major: data.intendedMajor
        });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.warn('Backend API connection failed, showing simulated receipt:', err);
      setReceipt({
        name: studentName,
        trackingId: trackingId,
        major: intendedMajor
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setStudentName('');
    setEmail('');
    setReceipt(null);
  };

  return (
    <div className="studypress-root" style={{ paddingTop: '0px' }}>
      {/* 1. Pink Top Bar */}
      <div className="press-top-bar">
        <div className="press-top-container">
          <div className="press-top-left">
            <a href="#faq">FAQ</a>
            <span style={{ opacity: 0.5 }}>|</span>
            <a href="#help">Help Desk</a>
            <span style={{ opacity: 0.5 }}>|</span>
            <a href="#login">Login</a>
          </div>
          <div className="press-top-right">
            <span className="press-top-link" style={{ display: 'flex', gap: 15 }}>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-google-plus-g"></i>
              <i className="fa-brands fa-linkedin-in"></i>
            </span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span className="press-top-link"><i className="fa-solid fa-cart-shopping"></i> (12)</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span className="press-top-link"><i className="fa-solid fa-magnifying-glass"></i></span>
          </div>
        </div>
      </div>

      {/* 2. White Brand Row */}
      <div className="press-brand-row">
        <div className="press-brand-container">
          {/* Logo */}
          <a href="/" className="press-logo-block">
            <div className="press-logo-icon">
              <i className="fa-solid fa-book-open"></i>
            </div>
            <div className="press-logo-text">
              <h2>STUDY<span>PRESS</span></h2>
              <p className="press-logo-sub">Education & Courses HTML Template</p>
            </div>
          </a>

          {/* Info Phone */}
          <div className="press-info-block">
            <div className="press-info-icon">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div className="press-info-text">
              <h4>Call Us Today!</h4>
              <p>+(012) 345 6789</p>
            </div>
          </div>

          {/* Info Hours */}
          <div className="press-info-block">
            <div className="press-info-icon">
              <i className="fa-regular fa-clock"></i>
            </div>
            <div className="press-info-text">
              <h4>We Are Open!</h4>
              <p>Mon-Fri 8:00-16:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dark Navigation Bar */}
      <nav className="press-nav-bar">
        <div className="press-nav-container">
          <ul className="press-nav-menu">
            <li className="press-nav-item active"><a href="/">Home</a></li>
            <li className="press-nav-item" style={{ position: 'relative' }}>
              <a href="#features">Features</a>
              <span className="badge-new">New</span>
            </li>
            <li className="press-nav-item"><a href="#pages">Pages</a></li>
            <li className="press-nav-item" style={{ position: 'relative' }}>
              <a href="#portfolio">Portfolio</a>
              <span className="badge-new">New</span>
            </li>
            <li className="press-nav-item"><a href="#courses">Courses</a></li>
            <li className="press-nav-item"><a href="#teachers">Teachers</a></li>
            <li className="press-nav-item"><a href="#blog">Blog</a></li>
            <li className="press-nav-item"><a href="#shortcodes">Shortcodes</a></li>
          </ul>
          
          <a href="#apply" className="press-btn-book">Book Now</a>
        </div>
      </nav>

      {/* 4. Library Slider Hero */}
      <section 
        className="press-hero-section"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="press-hero-container">
          <div className="press-hero-content">
            <h1>EDUCATION</h1>
            <div className="press-subheading-box">
              Education for Everyone
            </div>
            <p>We provides always our best services for our clients and always try to achieve our client's trust and satisfaction.</p>
            
            {/* Slider Dots */}
            <div className="press-slider-dots" style={{ justifyContent: 'flex-start' }}>
              <div className="press-dot active"></div>
              <div className="press-dot"></div>
              <div className="press-dot"></div>
            </div>
          </div>

          {/* Floating Booking Card */}
          <div id="apply" className="press-booking-card">
            {!receipt ? (
              <form onSubmit={handleApply}>
                <h3>Admissions Booking</h3>
                <div className="press-form-group">
                  <label>Student Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="press-form-input"
                    required
                  />
                </div>
                <div className="press-form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="press-form-input"
                    required
                  />
                </div>
                <div className="press-form-group" style={{ marginBottom: 25 }}>
                  <label>Intended Major</label>
                  <select 
                    value={intendedMajor}
                    onChange={(e) => setIntendedMajor(e.target.value)}
                    className="press-form-input"
                    style={{ background: '#fff' }}
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Business Operations & Marketing">Business Operations & Marketing</option>
                    <option value="Institutional Finance & Economics">Institutional Finance & Economics</option>
                    <option value="Quantum Physics & Astronomy">Quantum Physics & Astronomy</option>
                    <option value="Bio-Genomics & CRISPR Science">Bio-Genomics & CRISPR Science</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="press-form-btn"
                >
                  {submitting ? 'Booking...' : 'Book Admissions Now'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10b981', marginBottom: 15 }}></i>
                <h3>Booking Registered!</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: 20 }}>Copy your candidate code below.</p>
                
                <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'left', marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <span>Candidate</span>
                    <strong>{receipt.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <span>Booking Code</span>
                    <strong style={{ color: '#f53f64' }}>{receipt.trackingId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
                    <span>Major Cluster</span>
                    <strong>{receipt.major}</strong>
                  </div>
                </div>

                <button 
                  onClick={handleRestart}
                  style={{ padding: '10px 24px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Submit Another Booking
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Welcome Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
            <div>
              <span style={{ color: '#f53f64', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, letterSpacing: 1.5 }}>All About</span>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', fontWeight: 900, marginTop: 5, lineHeight: 1.2 }}>THE WORLD'S BEST EDUCATION IN YOUR REGION</h2>
              <p style={{ color: '#64748b', margin: '20px 0', lineHeight: 1.7, fontSize: '0.95rem' }}>We provides always our best services for our clients and always try to achieve our client's trust and satisfaction. Learn from leading global educators and access robust digital libraries.</p>
              <a href="#apply" style={{ display: 'inline-block', padding: '12px 28px', backgroundColor: '#f53f64', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 700 }}>Get Started</a>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" alt="Campus Grid" style={{ width: '100%', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#fff', padding: '50px 0 25px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} StudyPress Education. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
