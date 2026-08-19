import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';

export default function PhotographyCatalog() {
  const [downloadingSlug, setDownloadingSlug] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const TEMPLATES = [
    {
      slug: 'snapfolio-template',
      name: 'SnapFolio — Dark Minimalist Portfolio',
      previewImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
      tags: ['Dark Theme', 'Masonry Gallery', 'Lightbox Modal'],
      description: 'A dark-themed photography portfolio featuring a floating glass sidebar navigation, animated typewriter hero headlines, responsive masonry layouts, next/prev arrow keyboard navigation lightbox, and integrated booking validation feedback.'
    },
    {
      slug: 'photo-template',
      name: 'Photo — Editorial Photography Studio',
      previewImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      tags: ['Editorial Layout', 'Scroll Pinned Canvas', 'Golden Hour Theme'],
      description: 'A high-end, editorial landing page template for creative photography studios. Features Apple-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.'
    },
    {
      slug: 'wedding-template',
      name: 'Lumière — High-End Wedding & Event Photography',
      previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      tags: ['Minimalist Editorial', 'Split Layout Navbar', 'Floating Contact Buttons'],
      description: 'A responsive, high-end wedding and event photography portfolio web template with a warm ivory backdrop, center-split navigation, elegant serif headings, and sticky whatsapp/phone buttons.'
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
      { name: 'index.html', url: `/templates/photography/${slug}/index.html` },
      { name: 'style.css', url: `/templates/photography/${slug}/style.css` },
      { name: 'script.js', url: `/templates/photography/${slug}/script.js` }
    ];

    try {
      // 1. Fetch text files (HTML, CSS, JS)
      for (const file of files) {
        const response = await fetch(file.url);
        if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);
        const text = await response.text();
        zip.file(file.name, text);
      }
      
      // 2. Fetch and add frames sequence binary files for the photo-template
      if (slug === 'photo-template') {
        const framesFolder = zip.folder('frames');
        for (let i = 0; i < 100; i++) {
          const paddedIndex = String(i).padStart(6, '0');
          const frameName = `frame_${paddedIndex}.jpg`;
          const frameUrl = `/templates/photography/${slug}/frames/${frameName}`;
          
          try {
            const response = await fetch(frameUrl);
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              framesFolder.file(frameName, arrayBuffer);
            }
          } catch (e) {
            console.warn(`Frame ${frameName} fetch skipped:`, e);
          }
        }
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
          📷 Category: Photography Templates
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>Photography Templates</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Discover isolated, production-ready, dark minimalist layouts tailored for visual storytellers, freelance portfolios, and photography studios.</p>
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
                href={`/templates/photography/${tpl.slug}/index.html`} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  position: 'relative',
                  display: 'block',
                  width: '100%',
                  aspectRatio: '16/10',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#121212',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <img 
                  src={tpl.previewImage} 
                  alt={tpl.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
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
                  margin: 0,
                  fontFamily: 'var(--font-title)'
                }}>
                  <a 
                    href={`/templates/photography/${tpl.slug}/index.html`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'white', transition: 'color 0.2s' }}
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
                href={`/templates/photography/${tpl.slug}/index.html`} 
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
                Live Demo <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '10px' }}></i>
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
                  <>Zipping <i className="fa-solid fa-circle-notch animate-spin"></i></>
                ) : (
                  <>Download <i className="fa-solid fa-download"></i></>
                )}
              </button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
