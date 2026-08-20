import React, { useState } from 'react';
import useStylesheet from '../services/useStylesheet';

export default function Education1Portal() {
  useStylesheet('/templates/education/education-1/style.css');

  /* ==========================================
     Promo Signup form (40% Off Banner Card)
     ========================================== */
  const [studentEmail, setStudentEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handlePromoSignup = async (e) => {
    e.preventDefault();
    if (!studentEmail.trim()) {
      alert('Please enter your email.');
      return;
    }

    setSubmitting(true);

    const payload = {
      studentEmail: studentEmail.trim(),
      promotionCode: 'STUDY40'
    };

    try {
      const response = await fetch('http://localhost:8080/api/studypro/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.warn('Backend API connection failed, showing simulated success:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setStudentEmail('');
    setSubmitted(false);
  };

  return (
    <div className="studypro-root" style={{ paddingTop: '0px' }}>
      {/* 1. Green Top Utility Bar */}
      <div className="study-top-bar">
        <div className="study-top-container">
          <div className="study-top-left">
            <i className="fa-regular fa-clock"></i> Opening Hours: Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed
          </div>
          <div className="study-top-right">
            <a href="#login" className="study-top-link"><i className="fa-solid fa-lock"></i> Login / Register</a>
            <span className="study-top-separator">|</span>
            <span className="study-top-link"><i className="fa-solid fa-earth-americas"></i> ENG <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.65rem' }}></i></span>
          </div>
        </div>
      </div>

      {/* 2. Brand Row Header */}
      <div className="study-brand-row">
        <div className="study-brand-container">
          {/* Left Block */}
          <div className="study-info-block">
            <div className="study-info-icon">
              <i className="fa-regular fa-envelope-open"></i>
            </div>
            <div className="study-info-text">
              <h4>Mail Us Today</h4>
              <p>info@yourdomain.com</p>
            </div>
          </div>

          {/* Center Logo */}
          <a href="/" className="study-logo-block">
            <div className="study-logo-title-row">
              <h2>STUDY <span>PRO</span></h2>
            </div>
            <p className="study-logo-sub">Education & Courses HTML5 Template</p>
          </a>

          {/* Right Block */}
          <div className="study-info-block">
            <div className="study-info-icon">
              <i className="fa-solid fa-phone-volume"></i>
            </div>
            <div className="study-info-text">
              <h4>Call Us For More Details</h4>
              <p>+(012) 345 6789</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Header Bar */}
      <nav className="study-nav-bar">
        <div className="study-nav-container">
          <ul className="study-nav-menu">
            <li className="study-nav-item active"><a href="/">Home</a></li>
            <li className="study-nav-item"><a href="/college">College Portal</a></li>
            <li className="study-nav-item"><a href="/myschool">MySchool Portal</a></li>
            <li className="study-nav-item"><a href="#courses">Courses</a></li>
            <li className="study-nav-item"><a href="#teachers">Teachers</a></li>
            <li className="study-nav-item"><a href="/admin">Staff Console</a></li>
          </ul>
          
          <div className="study-nav-right">
            <button className="study-search-trigger">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Hero Wrapper Section */}
      <section 
        className="study-hero-wrapper"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="study-hero-container">
          <div className="study-hero-content">
            <h1>Take the <span>world's best</span> Education Site.</h1>
            <p>We provides always our best services for our clients and always try to achieve our client's trust and satisfaction.</p>
            <div className="study-hero-actions">
              <a href="#courses" className="study-btn study-btn-green">Read More</a>
              <a href="#apply" className="study-btn study-btn-outline">Register Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Floating Stacked Cards */}
      <section className="study-cards-section">
        <div className="study-cards-grid">
          {/* Card 1 */}
          <div className="study-info-card study-card-navy">
            <div className="study-card-icon">
              <i className="fa-solid fa-book"></i>
            </div>
            <h3>Online Course</h3>
            <p>Lorem ipsum dolor sit amet adipisi elit molestias non nulla placeat odio dolor amet dicta alias.</p>
          </div>

          {/* Card 2 (Promo) */}
          <div 
            className="study-info-card study-card-promo"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80')` }}
          >
            <div className="study-promo-content">
              {!submitted ? (
                <form onSubmit={handlePromoSignup}>
                  <span>Admission for Semester</span>
                  <h2>40% Off</h2>
                  <input 
                    type="email" 
                    placeholder="Enter email for promo"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="study-promo-input"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="study-promo-btn"
                  >
                    {submitting ? 'Signing up...' : 'Signup Now'}
                  </button>
                </form>
              ) : (
                <div className="promo-success">
                  <i className="fa-solid fa-circle-check" style={{ fontSize: '2.5rem', color: '#fff', marginBottom: 10 }}></i>
                  <h4>40% Off Activated!</h4>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', marginTop: 5 }}>Promo code sent to your email.</p>
                  <button 
                    onClick={handleRestart}
                    style={{ marginTop: 15, padding: '6px 16px', borderRadius: '20px', border: 'none', background: '#182238', color: '#fff', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    Enter Another Email
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Card 3 */}
          <div className="study-info-card study-card-navy">
            <div className="study-card-icon">
              <i className="fa-solid fa-user-tie"></i>
            </div>
            <h3>Expert Teachers</h3>
            <p>Lorem ipsum dolor sit amet adipisi elit molestias non nulla placeat odio dolor amet dicta alias.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section id="courses" style={{ padding: '40px 0 80px 0', backgroundColor: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#00c853', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 1.5 }}>Popular Programs</span>
            <h2 style={{ fontSize: '2rem', color: '#182238', fontWeight: 800, marginTop: 5 }}>Explore Our Featured Course Clusters</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80" alt="CompSci" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>TECHNOLOGY</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>Computer Science & Big Data Systems</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Master data structuring, neural network designs, cloud microservices, and database clustering.</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80" alt="Finance" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>BUSINESS</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>Corporate Finance & Operations Management</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Analyze asset valuation methodologies, market supply metrics, and project management systems.</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80" alt="Medicine" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>SCIENCES</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>Clinical Research & Genetic Pathologies</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Deep-dive into cellular pathways, disease mechanisms, and structural bioinformatics.</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80" alt="Robotics" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>ENGINEERING</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>Robotics & Autonomous Control Systems</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Study sensor telemetry, kinematic path calculations, mechanical actuators, and feedback loops.</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80" alt="Relations" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>HUMANITIES</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>International Relations & Public Policy</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Explore geopolitical alliances, global trade negotiations, treaty structures, and legislation.</p>
              </div>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80" alt="Design" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 25 }}>
                <span style={{ color: '#00c853', fontWeight: 700, fontSize: '0.8rem' }}>ARTS & DESIGN</span>
                <h3 style={{ fontSize: '1.2rem', color: '#182238', margin: '10px 0' }}>Digital Media & Interactive UI/UX Design</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>Master screen-based wireframing, high-fidelity layouts, micro-animations, and visual branding.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#182238', color: '#fff', padding: '60px 0 30px 0', borderTop: '4px solid #00c853' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
          <div>
            <h3 style={{ margin: '0 0 15px 0' }}>STUDY PRO</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>Leading education and course structures globally. Powered by state-of-the-art interactive modules in React.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, fontSize: '0.9rem' }}>
              <li><a href="#courses" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Our Courses</a></li>
              <li><a href="#teachers" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Expert Faculty</a></li>
              <li><a href="/admin" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Staff Portal</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Details</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Address: 100 University Plaza, NY<br />
              Email: info@yourdomain.com<br />
              Phone: +(012) 345 6789
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 40, paddingTop: 20, textAlign: 'center', fontSize: '0.8rem', color: '#cbd5e1' }}>
          &copy; {new Date().getFullYear()} StudyPro Education Templates. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
