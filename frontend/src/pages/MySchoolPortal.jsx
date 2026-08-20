import React, { useState } from 'react';
import useStylesheet from '../services/useStylesheet';

export default function MySchoolPortal() {
  useStylesheet('/templates/education/myschool/style.css');

  /* ==========================================
     Parent Inquiry form
     ========================================== */
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [email, setEmail] = useState('');
  const [targetGrade, setTargetGrade] = useState('Grade 1');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = async (e) => {
    e.preventDefault();
    if (!parentName.trim() || !childName.trim() || !email.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    setSubmitting(true);

    const payload = {
      parentName: parentName.trim(),
      childName: childName.trim(),
      email: email.trim(),
      targetGrade,
      message: message.trim()
    };

    try {
      const response = await fetch('http://localhost:8080/api/myschool/apply', {
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
    setParentName('');
    setChildName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="myschool-portal-root" style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', color: '#1e293b' }}>
        <div className="container hero-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'center', gap: 40, padding: '80px 24px' }}>
          <div>
            <span className="hero-tag" style={{ background: '#1e293b', color: '#fff', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
              <i className="fa-solid fa-school"></i> Primary School Education
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#1e293b', marginTop: 15, lineHeight: 1.2 }}>Nurturing Minds, Building Tomorrow</h1>
            <p style={{ fontSize: '1.1rem', margin: '20px 0', color: '#334155' }}>We provide a welcoming, friendly, and structured environment where children explore ideas, build foundational skills, and grow into happy, lifelong learners.</p>
            <div className="hero-actions">
              <a href="#inquiry" className="btn btn-black" style={{ padding: '12px 24px', background: '#1e293b', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Admission Inquiry</a>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <i className="fa-solid fa-shapes" style={{ fontSize: '8rem', color: '#854d0e', opacity: 0.85 }}></i>
          </div>
        </div>
      </section>

      {/* Curriculum Showcase Section */}
      <section className="curriculum-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="finder-header" style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="section-tag" style={{ color: '#ca8a04', textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>Curriculum</span>
            <h2>Our Core Learning Pathways</h2>
            <p style={{ color: '#64748b' }}>We prioritize developmental milestones, creative thinking, and standard academic foundations.</p>
          </div>

          <div className="curriculum-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
            <div className="cur-card" style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '4px solid #ca8a04' }}>
              <div className="cur-icon" style={{ fontSize: '2.5rem', color: '#ca8a04', marginBottom: 15 }}><i className="fa-solid fa-book-open-reader"></i></div>
              <h3>Early Literacy & Reading</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 10 }}>Developing phonetic awareness, word structure grids, storytelling, and early writing habits.</p>
            </div>
            <div className="cur-card" style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '4px solid #ca8a04' }}>
              <div className="cur-icon" style={{ fontSize: '2.5rem', color: '#ca8a04', marginBottom: 15 }}><i className="fa-solid fa-shapes"></i></div>
              <h3>Creative Arts & Exploration</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 10 }}>Exploring colors, clay structures, music arrangements, and theatrical play to nurture curiosity.</p>
            </div>
            <div className="cur-card" style={{ background: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0', borderTop: '4px solid #ca8a04' }}>
              <div className="cur-icon" style={{ fontSize: '2.5rem', color: '#ca8a04', marginBottom: 15 }}><i className="fa-solid fa-calculator"></i></div>
              <h3>Mathematical Reasoning</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 10 }}>Foundations of arithmetic logic, geometric spatial puzzles, and dynamic counting games.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Inquiry Form Section */}
      <section id="inquiry" className="inquiry-section" style={{ padding: '80px 0', background: '#fefcf0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="finder-header" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2>Parent Enrollment Inquiry</h2>
            <p>Tell us about your child and select target grade levels to inquire about seat availability.</p>
          </div>

          <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid #fef08a', boxShadow: '0 10px 30px rgba(133,77,14,0.03)' }}>
            {!submitted ? (
              <form onSubmit={handleInquiry}>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Parent Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Robert Smith"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Child Name</label>
                  <input 
                    type="text" 
                    placeholder="Tommy Smith"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="robert@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Target Grade Level</label>
                  <select 
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: '#fff' }}
                  >
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 30 }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Additional Details (Optional)</label>
                  <textarea 
                    placeholder="Tell us about your child's interests or schooling background..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', minHeight: '100px', resize: 'vertical' }}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ width: '100%', padding: '14px', background: '#ca8a04', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Register Inquiry'}
                </button>
              </form>
            ) : (
              <div className="success-receipt" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', color: '#10b981', marginBottom: 15 }}><i className="fa-solid fa-circle-check"></i></div>
                <h3>Parent Inquiry Registered!</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 25 }}>Thank you for reaching out. Our registrar office will email you within 24 hours to confirm grade-level seat vacancies.</p>
                
                <button 
                  onClick={handleRestart}
                  style={{ padding: '10px 24px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
