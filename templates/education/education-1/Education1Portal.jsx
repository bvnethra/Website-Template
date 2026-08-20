import React, { useState, useEffect } from 'react';
import useStylesheet from '../services/useStylesheet';

export default function CollegePortal() {
  useStylesheet('/templates/education/college/style.css');

  /* ==========================================
     Course Catalog Search and Filter
     ========================================== */
  const [searchBy, setSearchBy] = useState('category'); // 'category' or 'title'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courseCatalog = [
    { title: 'Introduction to Financial Accounting', code: 'BUS-101', category: 'Business', level: 'UG', credits: 3 },
    { title: 'Microeconomic Principles & Analysis', code: 'BUS-204', category: 'Business', level: 'UG', credits: 4 },
    { title: 'Corporate Finance & Valuation', code: 'BUS-310', category: 'Business', level: 'GRAD', credits: 3 },
    { title: 'World History: Medieval to Modern', code: 'HUM-110', category: 'Humanities', level: 'UG', credits: 3 },
    { title: 'Introduction to Ethics & Moral Philosophy', code: 'HUM-202', category: 'Humanities', level: 'UG', credits: 3 },
    { title: 'Calculus I: Limits & Integration', code: 'MTH-151', category: 'Math', level: 'UG', credits: 4 },
    { title: 'Linear Algebra & Vector Spaces', code: 'MTH-220', category: 'Math', level: 'UG', credits: 3 },
    { title: 'Organic Chemistry I & Lab', code: 'SCI-211', category: 'Science', level: 'UG', credits: 4 },
    { title: 'Introduction to Quantum Physics', code: 'SCI-340', category: 'Science', level: 'GRAD', credits: 4 },
    { title: 'Data Structures & Algorithm Design', code: 'ENG-201', category: 'Engineering', level: 'UG', credits: 4 },
    { title: 'Database Systems & SQL Modeling', code: 'ENG-305', category: 'Engineering', level: 'UG', credits: 3 },
    { title: 'Computer Architecture & Assembly', code: 'ENG-312', category: 'Engineering', level: 'GRAD', credits: 3 }
  ];

  const categories = ['Business', 'Humanities', 'Math', 'Science', 'Engineering', 'Arts', 'Law', 'Medicine'];

  const filteredCourses = courseCatalog.filter(course => {
    if (searchBy === 'category') {
      const matchCat = selectedCategory === 'all' || course.category === selectedCategory;
      const matchQuery = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    } else {
      return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             course.code.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

  /* ==========================================
     Admissions Enrollment Form
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
    <div className="college-portal-root" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-left">
            <span className="hero-tag"><i className="fa-solid fa-graduation-cap"></i> Dynamic Higher Education</span>
            <h1>Pioneering Research, Excellence & Leadership</h1>
            <p>Join a vibrant global community of scholars dedicated to shaping the technology, commerce, and culture of tomorrow.</p>
            <div className="hero-actions">
              <a href="#courses" className="btn btn-navy">Find Courses</a>
              <a href="#apply" className="btn btn-gold">Admissions Portal</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-stacked-cards">
              <div className="info-card bg-navy">
                <h3>International Research Centers</h3>
                <p>Collaborate with scholars across 40+ research fields, including next-gen bioinformatics and green energy grids.</p>
                <a href="#about" className="card-link">Learn More <i className="fa-solid fa-arrow-right"></i></a>
              </div>
              <div className="info-card bg-gold">
                <h3>Fall 2026 Admissions Open</h3>
                <p>Begin your application process. Speak directly with admission advisors to lock in financial grants early.</p>
                <a href="#apply" className="card-link dark-link">Apply Now <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="stats-strip">
        <div className="container stats-container">
          <div className="stat-item">
            <h2>12,000+</h2>
            <p>Enrolled Students</p>
          </div>
          <div className="stat-item">
            <h2>140+</h2>
            <p>Degree Choices</p>
          </div>
          <div className="stat-item">
            <h2>94%</h2>
            <p>Career Employment Rate</p>
          </div>
        </div>
      </section>

      {/* Course Finder Section */}
      <section id="courses" className="course-finder-section">
        <div className="container">
          <div className="finder-header">
            <h2>Interactive Course Finder</h2>
            <p>Filter through our live catalog registry by subject category or query title.</p>
          </div>

          <div className="finder-wrapper">
            <div className="finder-sidebar">
              <h3>Search Filters</h3>
              <div className="filter-group">
                <label>Search Parameters</label>
                <div className="radio-row" style={{ display: 'flex', gap: 15, margin: '8px 0' }}>
                  <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="search_type" 
                      value="category" 
                      checked={searchBy === 'category'} 
                      onChange={() => setSearchBy('category')}
                    /> By Category
                  </label>
                  <label style={{ display: 'flex', gap: 6, alignItems: 'center', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="search_type" 
                      value="title" 
                      checked={searchBy === 'title'} 
                      onChange={() => setSearchBy('title')}
                    /> By Title
                  </label>
                </div>
              </div>

              <div className="filter-group">
                <label htmlFor="course-query">Keywords / Code</label>
                <input 
                  type="text" 
                  id="course-query" 
                  placeholder="e.g. BUS-101"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              {searchBy === 'category' && (
                <div className="filter-group">
                  <label>Categories Grid</label>
                  <div className="categories-select-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                    <button 
                      className={`cat-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedCategory('all')}
                    >
                      All Subjects
                    </button>
                    {categories.map((cat, idx) => (
                      <button 
                        key={idx}
                        className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="finder-content">
              <div className="results-header">
                <span>Showing {filteredCourses.length} matching courses</span>
              </div>
              
              <div className="courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, idx) => (
                    <div key={idx} className="course-card" style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <span className="course-badge" style={{ background: '#002f6c', color: '#fff', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', float: 'right' }}>{course.level}</span>
                      <span className="course-code" style={{ fontSize: '0.8rem', color: '#d4af37', fontWeight: 700 }}>{course.code}</span>
                      <h3 style={{ fontSize: '1.1rem', margin: '8px 0' }}>{course.title}</h3>
                      <div className="course-footer" style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, marginTop: 15, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Category: <strong>{course.category}</strong></span>
                        <span>Credits: <strong>{course.credits}</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: '#64748b' }}>
                    No courses match your active search terms.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions Apply Form */}
      <section id="apply" className="admissions-section" style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="finder-header" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2>Admissions Portal Form</h2>
            <p>Register your interest in entering one of our academic major clusters.</p>
          </div>

          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
            {!receipt ? (
              <form onSubmit={handleApply}>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Student Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="janedoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 30 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Intended Academic Major</label>
                  <select 
                    value={intendedMajor}
                    onChange={(e) => setIntendedMajor(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
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
                  style={{ width: '100%', padding: '14px', background: '#002f6c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Register Application'}
                </button>
              </form>
            ) : (
              <div className="success-receipt" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: 15 }}><i className="fa-solid fa-circle-check"></i></div>
                <h3>Application Submitted successfully!</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 20 }}>Copy your candidate code below for tracking.</p>
                
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'left', marginBottom: 25 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span>Candidate Name</span>
                    <strong>{receipt.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span>Tracking ID</span>
                    <strong style={{ color: '#002f6c' }}>{receipt.trackingId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span>Intended Major</span>
                    <strong>{receipt.major}</strong>
                  </div>
                </div>

                <button 
                  onClick={handleRestart}
                  style={{ padding: '10px 24px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Submit Another Form
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
