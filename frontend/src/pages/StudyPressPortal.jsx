import React, { useState } from 'react';
import useStylesheet from '../services/useStylesheet';

export default function StudyPressPortal() {
  useStylesheet('/templates/education/studypress/style.css');

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryItems = [
    // Campus (6 images)
    { id: 1, category: 'campus', title: 'University Campus Exterior', path: '/templates/education/studypress/images/campus-1.jpg' },
    { id: 2, category: 'campus', title: 'Students Walking Around Campus', path: '/templates/education/studypress/images/campus-2.jpg' },
    { id: 3, category: 'campus', title: 'University Library', path: '/templates/education/studypress/images/campus-3.jpg' },
    { id: 4, category: 'campus', title: 'Students Studying Together', path: '/templates/education/studypress/images/campus-4.jpg' },
    { id: 5, category: 'campus', title: 'Classroom Environment', path: '/templates/education/studypress/images/campus-5.jpg' },
    { id: 6, category: 'campus', title: 'Campus Courtyard', path: '/templates/education/studypress/images/campus-6.jpg' },
    
    // Graduation (6 images)
    { id: 7, category: 'graduation', title: 'Throwing Graduation Caps', path: '/templates/education/studypress/images/graduation-1.jpg' },
    { id: 8, category: 'graduation', title: 'Graduation Ceremony', path: '/templates/education/studypress/images/graduation-2.jpg' },
    { id: 9, category: 'graduation', title: 'Graduate Receiving Certificate', path: '/templates/education/studypress/images/graduation-3.jpg' },
    { id: 10, category: 'graduation', title: 'Students Wearing Gowns', path: '/templates/education/studypress/images/graduation-4.jpg' },
    { id: 11, category: 'graduation', title: 'Group Graduation Photo', path: '/templates/education/studypress/images/graduation-5.jpg' },
    { id: 12, category: 'graduation', title: 'Graduation Celebration', path: '/templates/education/studypress/images/graduation-6.jpg' },

    // Laboratories (6 images)
    { id: 13, category: 'laboratories', title: 'Computer Science Laboratory', path: '/templates/education/studypress/images/laboratories-1.jpg' },
    { id: 14, category: 'laboratories', title: 'Engineering Laboratory', path: '/templates/education/studypress/images/laboratories-2.jpg' },
    { id: 15, category: 'laboratories', title: 'Robotics Design Center', path: '/templates/education/studypress/images/laboratories-3.jpg' },
    { id: 16, category: 'laboratories', title: 'Chemical Analytics Lab', path: '/templates/education/studypress/images/laboratories-4.jpg' },
    { id: 17, category: 'laboratories', title: 'Biomedical Research Center', path: '/templates/education/studypress/images/laboratories-5.jpg' },
    { id: 18, category: 'laboratories', title: 'Cleanroom Semiconductor Grid', path: '/templates/education/studypress/images/laboratories-6.jpg' },

    // Sports (6 images)
    { id: 19, category: 'sports', title: 'Soccer Championship Match', path: '/templates/education/studypress/images/sports-1.jpg' },
    { id: 20, category: 'sports', title: 'Basketball Training Session', path: '/templates/education/studypress/images/sports-2.jpg' },
    { id: 21, category: 'sports', title: 'Volleyball Team Practice', path: '/templates/education/studypress/images/sports-3.jpg' },
    { id: 22, category: 'sports', title: 'Athletics Track Event', path: '/templates/education/studypress/images/sports-4.jpg' },
    { id: 23, category: 'sports', title: 'Indoor Gymnastics Gym', path: '/templates/education/studypress/images/sports-5.jpg' },
    { id: 24, category: 'sports', title: 'Tennis Tournament Court', path: '/templates/education/studypress/images/sports-6.jpg' },

    // Events (6 images)
    { id: 25, category: 'events', title: 'Scientific Seminar Hall', path: '/templates/education/studypress/images/events-1.jpg' },
    { id: 26, category: 'events', title: 'International Conference Keynote', path: '/templates/education/studypress/images/events-2.jpg' },
    { id: 27, category: 'events', title: 'Guest Lecture Series', path: '/templates/education/studypress/images/events-3.jpg' },
    { id: 28, category: 'events', title: 'Interactive Workshop Panel', path: '/templates/education/studypress/images/events-4.jpg' },
    { id: 29, category: 'events', title: 'Distinguished Speaker Night', path: '/templates/education/studypress/images/events-5.jpg' },
    { id: 30, category: 'events', title: 'Admissions Open House Exhibition', path: '/templates/education/studypress/images/events-6.jpg' }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    setLightboxIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    setLightboxIndex(prev => (prev + 1) % filteredItems.length);
  };

  return (
    <div className="studypress-portal-root" style={{ paddingTop: '80px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header className="header" style={{ background: '#0f172a', color: '#fff', padding: '16px 0' }}>
        <div className="container nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>StudyPress</div>
          <nav style={{ display: 'flex', gap: 20 }}>
            <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Modern University</a>
            <a href="/college" style={{ color: '#fff', textDecoration: 'none' }}>College Portal</a>
            <a href="/myschool" style={{ color: '#fff', textDecoration: 'none' }}>MySchool Portal</a>
          </nav>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="portfolio-section" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2>Campus Media Gallery</h2>
            <p style={{ color: '#64748b' }}>Explore campus landmarks, ceremonies, sports activities, and labs.</p>
          </div>

          {/* Filtering tabs */}
          <div className="portfolio-filters" style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
            {['all', 'campus', 'graduation', 'laboratories', 'sports', 'events'].map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  border: '1px solid #cbd5e1',
                  background: activeCategory === cat ? '#0f172a' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#0f172a',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="portfolio-card"
                onClick={() => setLightboxIndex(idx)}
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '16px', border: '1px solid #e2e8f0' }}
              >
                <img 
                  src={item.path} 
                  alt={item.title} 
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} 
                />
                <div style={{ padding: '16px', background: '#fff' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>{item.category}</span>
                  <h3 style={{ fontSize: '1rem', marginTop: 5 }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="lightbox-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(15,23,42,0.95)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button 
            style={{ position: 'absolute', top: 30, right: 30, background: 'none', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}
            onClick={() => setLightboxIndex(null)}
          >
            &times;
          </button>

          {/* Previous / Next buttons */}
          <button 
            style={{ position: 'absolute', left: 30, background: 'none', border: 'none', color: '#fff', fontSize: '3rem', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            &#8249;
          </button>
          
          <button 
            style={{ position: 'absolute', right: 30, background: 'none', border: 'none', color: '#fff', fontSize: '3rem', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            &#8250;
          </button>

          {/* Active Image */}
          <img 
            src={filteredItems[lightboxIndex].path} 
            alt="Lightbox view" 
            style={{ maxWidth: '85%', maxHeight: '75%', objectFit: 'contain', borderRadius: '8px' }}
            onClick={(e) => e.stopPropagation()}
          />

          <div style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
            <h3>{filteredItems[lightboxIndex].title}</h3>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginTop: 5 }}>
              {filteredItems[lightboxIndex].category.toUpperCase()} &mdash; {lightboxIndex + 1} / {filteredItems.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
