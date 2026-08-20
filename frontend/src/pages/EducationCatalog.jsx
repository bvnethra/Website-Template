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
      slug: 'modern-university',
      name: 'Modern University — Classic Campus Template',
      previewImage: modernUniversityImg,
      tags: ['Classic Quad', 'Transparent Header', 'Slide Show', 'Copyright Free'],
      description: 'A classic higher-education template inspired by traditional university architectures. Features a spacious hero image slider, transparent header, dual pill-shaped call-to-action buttons, and a clean layout without copyright constraints.'
    },
    {
      slug: 'college',
      name: 'College — Higher Education Hub',
      previewImage: collegeTemplateImg,
      tags: ['College Portal', 'Burgundy Banner', 'Stats Counter', 'Course Finder'],
      description: 'An authoritative higher education layout featuring a prominent burgundy hero banner, statistics animations, student testimonial carousels, and searchable course cards.'
    },
    {
      slug: 'myschool',
      name: 'MySchool — Nurturing Minds, Building Tomorrow',
      previewImage: myschoolImg,
      tags: ['Primary Education', 'Badges Showcase', 'Parent Inquiries'],
      description: 'A warm, friendly primary school template featuring clean circular grid elements, program detail cards, and integrated parent admission query forms.'
    },
    {
      slug: 'education-1',
      name: 'StudyPro — Education & Courses Replica',
      previewImage: collegeTemplateImg,
      tags: ['Green Utility Bar', 'Stacked Promo Card', 'Featured Clusters', 'Vibrant Layout'],
      description: 'A replica of the StudyPro education layout featuring a green header bar, centralized branding row, transparent banner slider, and floating course promotion widgets.'
    },
    {
      slug: 'studypress',
      name: 'StudyPress — Campus Gallery Showcase',
      previewImage: studypressImg,
      tags: ['Three-Tier Header', '30-Image Gallery', 'Fullscreen Lightbox', 'Dynamic Filter'],
      description: 'A campus portfolio showcase template featuring a dynamic category photo gallery of 30 landmark images with a built-in fullscreen lightbox carousel.'
    },
    {
      slug: 'academica',
      name: 'Academica — E-Learning Portal',
      previewImage: onlineLearningImg,
      tags: ['Academics', 'React Component', 'E-Learning'],
      description: 'A React-only portal component configured for e-learning platforms and academic syllabus trackers.'
    },
    {
      slug: 'learner',
      name: 'Learner — Student Learning Hub',
      previewImage: mentorEducationImg,
      tags: ['Learners', 'React Component', 'Mentorship'],
      description: 'A React-only student learning portal designed for peer-to-peer mentorship and curriculum directories.'
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
    <div style={{ animation: 'fadeIn 0.5s ease-out', padding: '30px 24px', minHeight: '60vh', position: 'relative', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
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
            <span style={{ color: '#ef4444', fontSize: '1.25rem' }}>⚠️</span>
          ) : (
            <span style={{ color: '#10b981', fontSize: '1.25rem' }}>✅</span>
          )}
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toastMessage}</span>
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
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          color: '#10b981',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          marginBottom: '12px',
          letterSpacing: '0.5px'
        }}>
          🎓 Category: Education Templates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px', color: '#0f172a' }}>Education Templates Catalog</h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Discover isolated, production-ready, beautiful education layouts designed for universities, online academies, training hubs, primary schools, and colleges.</p>
      </div>

      {/* Catalog Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px',
        marginTop: '30px'
      }}>
        
        {TEMPLATES.map((tpl) => (
          <div key={tpl.slug} style={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '24px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            maxWidth: '420px',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#10b981';
            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.1)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e2e8f0';
            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Image Preview Wrapper */}
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                backgroundColor: '#f1f5f9'
              }}>
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              {/* Tags Grid */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tpl.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#64748b',
                    padding: '4px 8px',
                    borderRadius: '8px',
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
                  color: '#0f172a',
                  margin: 0
                }}>
                  <Link 
                    to={tpl.slug === 'modern-university' ? '/' : `/${tpl.slug}`}
                    style={{ color: '#0f172a', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#10b981'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#0f172a'}
                  >
                    {tpl.name}
                  </Link>
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
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
              <Link 
                to={tpl.slug === 'modern-university' ? '/' : `/${tpl.slug}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  backgroundColor: '#0f172a',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
              >
                Live Demo ↗
              </Link>
              
              <button 
                onClick={() => handleDownload(tpl.slug, tpl.name)}
                disabled={!!downloadingSlug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '12px 16px',
                  backgroundColor: '#f1f5f9',
                  color: '#0f172a',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '0.8rem',
                  border: '1px solid #cbd5e1',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              >
                {downloadingSlug === tpl.slug ? 'Bundling...' : 'Download Code'}
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
