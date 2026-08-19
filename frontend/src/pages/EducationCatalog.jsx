import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';

// Import local preview mockup screenshots
import onlineLearningImg from '../assets/images/online-learning.jpg';
import mentorEducationImg from '../assets/images/mentor-education.jpg';
import myschoolImg from '../assets/images/myschool.jpg';
import collegeTemplateImg from '../assets/images/college-template.jpg';
import modernUniversityImg from '../assets/images/modern-university.jpg';
import studypressImg from '../assets/images/studypress.jpg';

export default function EducationCatalog() {
  const [downloadingSlug, setDownloadingSlug] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [hoveredCardSlug, setHoveredCardSlug] = useState(null);

  const TEMPLATES = [
    {
      slug: 'academica',
      name: 'Academica — Online Course Hub',
      previewImage: onlineLearningImg,
      tags: ['E-Learning', 'Lavender Accents', 'Interactive Grid', 'Search Filter'],
      description: 'A clean, modern online course directory styled with vibrant lavender accents. Features a clean search box, dynamic category filtering, interactive course highlights, and card zoom animations.'
    },
    {
      slug: 'learner',
      name: 'Learner — Online Courses & Education',
      previewImage: mentorEducationImg,
      tags: ['Teal Theme', 'Minimalist', 'Student Showcase', 'Responsive'],
      description: 'A stunning e-learning portal designed with fresh teal colors and clean grids. Includes course tags, clean typography, hover highlights, and fluid navigation.'
    },
    {
      slug: 'myschool',
      name: 'MySchool — Primary School Portal',
      previewImage: myschoolImg,
      tags: ['School Site', 'Warm Colors', 'Inquiry Form', 'Interactive Modal'],
      description: 'A welcoming primary school homepage template utilizing a friendly warm yellow/amber design. Built with interactive curriculum curriculum cards, a parent inquiry form with instant validation, and clean layouts.'
    },
    {
      slug: 'college',
      name: 'College — Higher Education Hub',
      previewImage: collegeTemplateImg,
      tags: ['College Portal', 'Burgundy Banner', 'Stats Counter', 'Course Finder'],
      description: 'An authoritative higher education layout featuring a prominent burgundy hero banner, statistics animations, student testimonial carousels, and searchable course cards.'
    },
    {
      slug: 'modern-university',
      name: 'Modern University — Classic Campus Template',
      previewImage: modernUniversityImg,
      tags: ['Classic Quad', 'Transparent Header', 'Slide Show', 'Copyright Free'],
      description: 'A classic higher-education template inspired by traditional university architectures. Features a spacious hero image slider, transparent header, dual pill-shaped call-to-action buttons, and a clean layout without copyright constraints.'
    },
    {
      slug: 'studypress',
      name: 'StudyPress — Education & Courses Hub',
      previewImage: studypressImg,
      tags: ['Three-Tier Header', 'Course Catalog', 'Faculty Spotlight', 'Admissions Portal'],
      description: 'A premium education template featuring a three-tier header layout, interactive course catalog with checkout options, a full faculty directory, and multi-step admissions forms.'
    }
  ];

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleDownload = async (slug, templateName) => {
    setDownloadingSlug(slug);
    const zip = new JSZip();
    
    const files = [
      { name: 'index.html', url: `/templates/education/${slug}/index.html` },
      { name: 'style.css', url: `/templates/education/${slug}/style.css` },
      { name: 'script.js', url: `/templates/education/${slug}/script.js` }
    ];

    try {
      // Fetch text files (HTML, CSS, JS)
      for (const file of files) {
        const response = await fetch(file.url);
        if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);
        const text = await response.text();
        zip.file(file.name, text);
      }
      
      const blob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${slug}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast(`${templateName} zip downloaded successfully!`);
    } catch (err) {
      console.error(err);
      showToast(`Failed to bundle ${templateName} files.`, 'error');
    } finally {
      setDownloadingSlug('');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', padding: '30px 0', minHeight: '60vh', position: 'relative' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          maxWidth: '360px',
          width: '100%',
          backgroundColor: toastType === 'error' ? 'rgba(239, 68, 68, 0.95)' : '#1e1e1e',
          color: 'white',
          border: toastType === 'error' ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {toastType === 'error' ? (
            <svg style={{ width: '20px', height: '20px', color: '#fca5a5', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          ) : (
            <svg style={{ width: '20px', height: '20px', color: '#4ade80', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          )}
          <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{toastMessage}</div>
        </div>
      )}

      {/* Category Header */}
      <div style={{ marginBottom: 35 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '99px',
          backgroundColor: 'rgba(84, 78, 232, 0.08)',
          color: '#544ee8',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '12px',
          letterSpacing: '0.5px'
        }}>
          🎓 Category: Education Templates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Education Templates</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Discover isolated, production-ready, beautiful education layouts designed for universities, online academies, training hubs, primary schools, and colleges.</p>
      </div>

      {/* Catalog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '30px',
        marginTop: '30px'
      }}>
        
        {TEMPLATES.map((tpl) => (
          <div key={tpl.slug} style={{
            backgroundColor: '#1e1e1e',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            maxWidth: '420px',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(84, 78, 232, 0.3)';
            e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(84, 78, 232, 0.15)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Image Preview Wrapper */}
              <a 
                href={`/templates/education/${tpl.slug}/index.html`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  height: '270px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  backgroundColor: '#121212',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
                onMouseEnter={() => setHoveredCardSlug(tpl.slug)}
                onMouseLeave={() => setHoveredCardSlug(null)}
              >
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: hoveredCardSlug === tpl.slug ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: hoveredCardSlug === tpl.slug ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
                >
                  <span style={{
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>Live Preview ↗</span>
                </div>
              </a>

              {/* Badges / Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tpl.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '4px 10px',
                    borderRadius: '99px',
                    backgroundColor: '#2a2744',
                    color: '#a5b4fc',
                    fontSize: '10px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>{tag}</span>
                ))}
              </div>

              {/* Typography */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'white',
                  margin: 0
                }}>
                  <a 
                    href={`/templates/education/${tpl.slug}/index.html`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'white', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#a5b4fc'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                  >
                    {tpl.name}
                  </a>
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#94a3b8',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {tpl.description}
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              margin: '24px 0 0 0'
            }}>
              <a 
                href={`/templates/education/${tpl.slug}/index.html`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#262626'}
              >
                Live Demo ↗
              </a>
              
              <button 
                onClick={() => handleDownload(tpl.slug, tpl.name)}
                disabled={!!downloadingSlug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  backgroundColor: '#544ee8',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(84, 78, 232, 0.2)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  opacity: downloadingSlug ? 0.6 : 1
                }}
                onMouseEnter={(e) => { if(!downloadingSlug) e.currentTarget.style.backgroundColor = '#433cc8'; }}
                onMouseLeave={(e) => { if(!downloadingSlug) e.currentTarget.style.backgroundColor = '#544ee8'; }}
              >
                {downloadingSlug === tpl.slug ? (
                  <>Zipping...</>
                ) : (
                  <>Download ↓</>
                )}
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
