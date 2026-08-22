import React, { useState } from 'react';
import useStylesheet from '../../../frontend/src/services/useStylesheet';

export default function CollegePortal() {
  useStylesheet('/templates/education/education-7/style.css');

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

  /* ==========================================
     Academic Course Catalog Filtering
     ========================================== */
  const [activeCourseCategory, setActiveCourseCategory] = useState('all');
  const [cartCount, setCartCount] = useState(12);

  const courses = [
    { id: 1, category: 'computing', termPrice: '$4,500', name: 'B.Sc. Artificial Intelligence & Systems', desc: 'Study algorithm design patterns, deep learning pipelines, neural networks, and automated code reasoning.', rating: '4.9', students: '1.2k', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
    { id: 2, category: 'computing', termPrice: '$4,800', name: 'M.Sc. Cybersecurity & Cloud Defense', desc: 'Advanced cryptographic patterns, defensive cloud architectures, zero-trust setups, and intrusion analysis.', rating: '4.8', students: '850', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' },
    { id: 3, category: 'health', termPrice: '$5,000', name: 'CRISPR Gene Therapy & Biology', desc: 'Pioneering molecular biology studies, CRISPR-Cas12 cell engineering, telomeric repair, and clinical immuno-oncology.', rating: '4.9', students: '640', img: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80' },
    { id: 4, category: 'business', termPrice: '$6,200', name: 'Executive MBA & Corporate Governance', desc: 'Organizational behavior, international trade economics, venture capital frameworks, and financial ethics audits.', rating: '4.7', students: '1.1k', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
    { id: 5, category: 'business', termPrice: '$4,100', name: 'Comparative Transnational Jurisprudence', desc: 'International IP rules, cyber law structures, maritime laws, and human rights treaties in cross-border litigation.', rating: '4.8', students: '750', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80' },
    { id: 6, category: 'design', termPrice: '$3,800', name: 'Digital Media & Graphic Computing', desc: 'Human-computer interface architectures, responsive design aesthetics, UX layouts, and spatial 3D model renderings.', rating: '4.6', students: '900', img: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80' }
  ];

  const filteredCourses = activeCourseCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCourseCategory);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    alert('Course added to your study cart!');
  };

  /* ==========================================
     Faculty Laureates Filtering (Exactly 6)
     ========================================== */
  const [activeFacultyCategory, setActiveFacultyCategory] = useState('all');

  const facultyList = [
    { id: 1, category: 'computing', name: 'Dr. Julian Thorne', title: 'Professor of AI & Computer Science', badge: 'Turing Fellow', desc: 'Stanford Ph.D. Neural Networks & Quantum Computing directorate lead.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
    { id: 2, category: 'medicine', name: 'Dr. Evelyn Reed', title: 'Director of Biomedical Genetics', badge: 'Endowed Chair', desc: 'Johns Hopkins M.D. / Oxford Ph.D. CRISPR therapies division coordinator.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
    { id: 3, category: 'business', name: 'Prof. Arthur Sterling', title: 'Dean of Global Economics', badge: 'Dean', desc: 'Cambridge D.Phil. Specialist in sovereign wealth, funds, and transition finance.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
    { id: 4, category: 'design', name: 'Dr. Maya Lin', title: 'Chair of Architecture & Digital Arts', badge: 'Chair', desc: 'MIT M.Arch. / Tokyo Ph.D. Responsive spatial computing architect.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    { id: 5, category: 'computing', name: 'Prof. Tariq Al-Mansoor', title: 'Chair of Cybersecurity & Cloud Defense', badge: 'Turing Fellow', desc: 'Carnegie Mellon Ph.D. Zero-Trust system infrastructure pioneer.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { id: 6, category: 'business', name: 'Dr. Camille Laurent', title: 'Professor of Transnational Jurisprudence', badge: 'Faculty Lead', desc: 'Yale J.D. / Sorbonne Ph.D. Expert in global IP legislation and cyber laws.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' }
  ];

  const filteredFaculty = activeFacultyCategory === 'all'
    ? facultyList
    : facultyList.filter(f => f.category === activeFacultyCategory);

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
              <i className="fa-brands fa-facebook-f" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-twitter" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-google-plus-g" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-linkedin-in" style={{ cursor: 'pointer' }}></i>
            </span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span className="press-top-link"><i className="fa-solid fa-cart-shopping"></i> ({cartCount})</span>
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
            <div className="press-logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <a href="#priorities">Features</a>
              <span className="badge-new">New</span>
            </li>
            <li className="press-nav-item"><a href="#portfolio">Pages</a></li>
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

      <section 
        className="press-hero-section"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80')` }}
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

      {/* 5. Core Priorities (Features & Highlights) */}
      <section id="priorities" style={{ padding: '80px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
          <div>
            <span style={{ color: '#f53f64', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, letterSpacing: 1.5 }}>Core Priorities</span>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 900, margin: '10px 0 40px 0' }}>Features & Highlights</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Feature 1 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 30, borderRadius: 12 }}>
                <div style={{ width: 50, height: 50, background: '#f53f64', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 10px 0' }}>Active Learning</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Modern pedagogical approaches focused on team collaborations, hands-on labs, and real-world projects.</p>
              </div>
              {/* Feature 2 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 30, borderRadius: 12 }}>
                <div style={{ width: 50, height: 50, background: '#f53f64', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 10px 0' }}>Expert Teachers</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Study under internationally recognized thinkers, Nobel Prize laureates, and industry innovators.</p>
              </div>
              {/* Feature 3 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 30, borderRadius: 12 }}>
                <div style={{ width: 50, height: 50, background: '#f53f64', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 10px 0' }}>Digital Library</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Instant digital catalog access to over 5 million manuscripts, research papers, and journals.</p>
              </div>
              {/* Feature 4 */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: 30, borderRadius: 12 }}>
                <div style={{ width: 50, height: 50, background: '#f53f64', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 800, margin: '0 0 10px 0' }}>Global Certification</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>Earn fully accredited degrees and transcripts recognized by top-tier academic boards worldwide.</p>
              </div>
            </div>
          </div>

          {/* Right Tour Card */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.05)' }}>
            <div style={{ position: 'relative', height: 220, background: '#e2e8f0' }}>
              <img src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&q=80" alt="Video Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 70, height: 70, background: '#f53f64', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(245,63,100,0.4)' }}>
                <i className="fa-solid fa-play"></i>
              </div>
            </div>
            <div style={{ padding: 30 }}>
              <h3 style={{ fontSize: '1.35rem', color: '#0f172a', fontWeight: 900, margin: '0 0 10px 0' }}>Virtual Campus Tour</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>Take a 5-minute video journey through our historic quadrangles, advanced robotics labs, and modern dormitories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Explore Academic Programs */}
      <section id="courses" style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#f53f64', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, letterSpacing: 1.5 }}>Degree Listings</span>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 900, marginTop: 5 }}>Explore Academic Programs</h2>
            <p style={{ color: '#64748b', marginTop: 10 }}>Filter programs by academic school, read detailed curriculum plans, and add courses directly to your study cart.</p>

            {/* Filter buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
              {['all', 'computing', 'health', 'business', 'design'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCourseCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    background: activeCourseCategory === cat ? '#f53f64' : '#fff',
                    color: activeCourseCategory === cat ? '#fff' : '#0f172a',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {cat === 'all' ? 'All Programs' : cat === 'computing' ? 'Computing & AI' : cat === 'health' ? 'Health Sciences' : cat === 'business' ? 'Business & Law' : 'Design & Humanities'}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 30 }}>
            {filteredCourses.map(course => (
              <div key={course.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ position: 'relative', height: 200 }}>
                  <img src={course.img} alt={course.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: 15, right: 15, background: '#0f172a', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
                    {course.termPrice}/term
                  </span>
                </div>
                <div style={{ padding: 25 }}>
                  <span style={{ color: '#f53f64', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    {course.category === 'computing' ? 'COMPUTING & AI' : course.category === 'health' ? 'HEALTH SCIENCES' : course.category === 'business' ? 'BUSINESS & LAW' : 'DESIGN & HUMANITIES'}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '8px 0 12px 0', fontWeight: 800 }}>{course.name}</h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, minHeight: 60 }}>{course.desc}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '15px 0', fontSize: '0.8rem', color: '#eab308' }}>
                    <i className="fa-solid fa-star"></i>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>{course.rating}</span>
                    <span style={{ color: '#64748b' }}>({course.students} Students)</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 10, borderTop: '1px solid #f1f5f9', paddingTop: 15 }}>
                    <a href="#apply" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #cbd5e1', color: '#0f172a', textDecoration: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>Details</a>
                    <button 
                      onClick={handleAddToCart}
                      style={{ padding: 10, background: '#f53f64', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer' }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Distinguished Faculty & Laureates */}
      <section id="teachers" style={{ padding: '80px 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <span style={{ color: '#f53f64', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, letterSpacing: 1.5 }}>Faculty Roster</span>
            <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 900, marginTop: 5 }}>Distinguished Faculty & Laureates</h2>
            <p style={{ color: '#64748b', marginTop: 10 }}>Browse through our roster of Turing fellows, Nobel laureates, and endowed chair professors.</p>

            {/* Filter buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
              {['all', 'computing', 'medicine', 'business', 'design'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveFacultyCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '20px',
                    border: '1px solid #cbd5e1',
                    background: activeFacultyCategory === cat ? '#f53f64' : '#fff',
                    color: activeFacultyCategory === cat ? '#fff' : '#0f172a',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {cat === 'all' ? 'All Faculty' : cat === 'computing' ? 'Computing & AI' : cat === 'medicine' ? 'Medicine & Health' : cat === 'business' ? 'Business & Law' : 'Design & Humanities'}
                </button>
              ))}
            </div>
          </div>

          {/* Faculty Grid (Exactly 6 Members) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 30 }}>
            {filteredFaculty.map(fac => (
              <div key={fac.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', textAlign: 'left', position: 'relative' }}>
                
                {/* Badge Overlay */}
                <span style={{ position: 'absolute', top: 15, right: 15, background: '#f53f64', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {fac.badge}
                </span>

                <img src={fac.img} alt={fac.name} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
                <div style={{ padding: 25 }}>
                  <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>{fac.name}</h3>
                  <span style={{ display: 'block', color: '#f53f64', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 10px 0' }}>{fac.title}</span>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 20px 0', minHeight: 50 }}>{fac.desc}</p>
                  <button style={{ width: '100%', padding: '10px 0', border: '1px solid #cbd5e1', background: 'none', color: '#0f172a', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Campus Media Portfolio */}
      <section id="portfolio" style={{ padding: '80px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ color: '#f53f64', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 800, letterSpacing: 1.5 }}>Campus Showcase</span>
          <h2 style={{ fontSize: '2.5rem', color: '#0f172a', fontWeight: 900, marginTop: 5, marginBottom: 15 }}>Campus Media Portfolio</h2>
          <p style={{ color: '#64748b', marginBottom: 50 }}>Browse through high-resolution galleries of our classrooms, research laboratories, and libraries.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 240 }}>
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80" alt="Campus 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 240 }}>
              <img src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80" alt="Campus 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 240 }}>
              <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80" alt="Campus 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', height: 240 }}>
              <img src="https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&w=600&q=80" alt="Campus 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Premium Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#fff', padding: '80px 24px 40px 24px', borderTop: '4px solid #f53f64' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 60, textAlign: 'left' }}>
          <div>
            <div className="press-logo-block" style={{ marginBottom: 20 }}>
              <div className="press-logo-icon" style={{ color: '#fff' }}><i className="fa-solid fa-book-open"></i></div>
              <div className="press-logo-text"><h3 style={{ color: '#fff', margin: 0 }}>STUDYPRESS</h3></div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>StudyPress is a globally accredited institution providing modern computational, biomedical, humanities, and governance studies under laureates mentorship.</p>
            
            <div style={{ display: 'flex', gap: 15, marginTop: 20, fontSize: '1.1rem' }}>
              <i className="fa-brands fa-facebook-f" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-twitter" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-linkedin-in" style={{ cursor: 'pointer' }}></i>
              <i className="fa-brands fa-instagram" style={{ cursor: 'pointer' }}></i>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: 25, fontSize: '1rem' }}>Quick Directories</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem' }}>
              <li><a href="#courses" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Course Directory</a></li>
              <li><a href="#teachers" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Faculty Laureates</a></li>
              <li><a href="#portfolio" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Campus Media</a></li>
              <li><a href="#priorities" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Feature Highlights</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: 25, fontSize: '1rem' }}>Contact Registrar</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.8 }}>
              <i className="fa-solid fa-location-dot" style={{ marginRight: 8 }}></i> 455 University Boulevard, Cambridge Meadows, MA 02138<br />
              <i className="fa-solid fa-phone" style={{ marginRight: 8, marginTop: 10 }}></i> +(012) 345 6789<br />
              <i className="fa-solid fa-envelope" style={{ marginRight: 8, marginTop: 10 }}></i> admissions@studypress.edu
            </p>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: 25, fontSize: '1rem' }}>Gazette Digests</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 20 }}>Subscribe to receive publication notices and campus event invites.</p>
            <form style={{ display: 'flex' }} onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
              <input type="email" placeholder="student@university.edu" style={{ padding: '12px 16px', borderRadius: '8px 0 0 8px', border: 'none', outline: 'none', background: '#1e293b', color: '#fff', fontSize: '0.85rem', width: '100%' }} required />
              <button type="submit" style={{ padding: '12px 20px', background: '#f53f64', color: '#fff', border: 'none', borderRadius: '0 8px 8px 0', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Join Digest</button>
            </form>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 25, textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} StudyPress Education. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
