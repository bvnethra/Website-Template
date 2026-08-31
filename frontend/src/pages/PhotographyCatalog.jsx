import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JSZip from 'jszip';

export default function PhotographyCatalog() {
  const [downloadingSlug, setDownloadingSlug] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const TEMPLATES = [
    {
      slug: 'photography-1',
      name: 'SnapFolio — Dark Minimalist Portfolio',
      previewImage: '/snapfolio_cover.png',
      demoUrl: '/templates/photography/photography-1/index.html',
      tags: ['Dark Theme', 'Masonry Gallery', 'Lightbox Modal'],
      description: 'A dark-themed photography portfolio featuring a floating glass sidebar navigation, animated typewriter hero headlines, responsive masonry layouts, next/prev arrow keyboard navigation lightbox, and integrated booking validation feedback.'
    },
    {
      slug: 'photography-2',
      name: 'Photo — Editorial Photography Studio',
      previewImage: '/photo_cover.png',
      demoUrl: '/templates/photography/photography-2/index.html',
      tags: ['Editorial Layout', 'Scroll Pinned Canvas', 'Golden Hour Theme'],
      description: 'A high-end, editorial landing page template for creative photography studios. Features Apple-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.'
    },
    {
      slug: 'photography-3',
      name: 'Lumière — High-End Wedding & Event Photography',
      previewImage: '/wedding_cover.png',
      demoUrl: '/templates/photography/photography-3/index.html',
      tags: ['Minimalist Editorial', 'Split Layout Navbar', 'Floating Contact Buttons'],
      description: 'A responsive, high-end wedding and event photography portfolio web template with a warm ivory backdrop, center-split navigation, elegant serif headings, and sticky whatsapp/phone buttons.'
    },
    {
      slug: 'photography-4',
      name: 'Eden Rose — Cinematic Luxury Wedding Portfolio',
      previewImage: '/cinematic_cover.png',
      demoUrl: '/templates/photography/photography-4/index.html',
      tags: ['Luxury Monocrom', 'Preloader curtain', 'Staggered Grid'],
      description: 'A cinematic wedding photography portfolio template in deep black and luxury gold tones. Features intro curtain loaders, route transition reveals, staggered portfolio grids, and boutique inquiry options.'
    },
    {
      slug: 'photography-5',
      name: 'Aura — Premium Fine Art Studio',
      previewImage: '/fineart_cover.png',
      demoUrl: '/templates/photography/photography-5/index.html',
      tags: ['Premium Serif', 'Wipe Reveals', 'Hover Custom Cursor'],
      description: 'A premium, dynamic React portfolio website for a fine art photography studio. Features Ken Burns hero animations, scroll-triggered wipe reveals, and interactive circular gallery navigations.'
    },
    {
      slug: 'photography-6',
      name: 'Kairo — Modern 3D Photography Portfolio',
      previewImage: '/kairo_cover.png',
      demoUrl: '/templates/photography/photography-6/index.html',
      tags: ['3D Scene', 'Interactive Parallax', 'Luxury Editorial'],
      description: 'A modern photography portfolio featuring interactive 3D camera lens aperture graphics rendered in React Three Fiber, scroll-linked fade animations, split-layout bio sections, and fullscreen responsive image tiles.'
    },
    {
      slug: 'photography-7',
      name: 'Lume Studio — Fashion & Editorial Portfolio',
      previewImage: '/lume_cover.png',
      demoUrl: '/templates/photography/photography-7/index.html',
      tags: ['Editorial Fashion', 'Moody Spotlight', 'Bespoke Lighting'],
      description: 'A premium photography portfolio website. Features full-bleed moody editorial layouts, ambient gold twinkling particle overlays, and fluid smooth scroll interactions.'
    },
    {
      slug: 'photography-8',
      name: 'Sage & Shutter — Fine Art Wedding Photography',
      previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      demoUrl: '/templates/photography/photography-8/index.html',
      tags: ['Fine Art', 'Wedding Photography', 'Earthy Filters', 'Tailwind CSS', 'Motion'],
      description: 'An elegant, high-end fine art wedding photography showcase template. Features delicate earthy desaturated filters, parallax image carousels, custom cursor indicators, and responsive testimonial sliders.'
    },
    {
      slug: 'photography-9',
      name: 'Blush Lens — Fine Art Wedding Photography',
      previewImage: '/wedding_cover.png',
      demoUrl: '/templates/photography/photography-9/index.html',
      tags: ['Fine Art', 'Wedding Photography', 'Blush Tones', 'Tailwind CSS', 'Motion'],
      description: 'A premium React wedding photography template featuring romantic blush and warm ivory tones, editorial serif typography, interactive booking forms, and dynamic parallax portfolio galleries.'
    },
    {
      slug: 'photography-10',
      name: 'Aether Studio — Fine Art Editorial Photography',
      previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      demoUrl: '/templates/photography/photography-10/index.html',
      tags: ['Fine Art', 'Editorial Photography', 'Earthy Theme', 'Tailwind CSS', 'Motion'],
      description: 'A high-end, editorial photography showcase template. Features custom slide overlays, parallax grid systems, desaturated earthy image styling, and elegant typewriter layout design.'
    }
  ];

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const TEMPLATE_FILES = {
    'photography-1': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-2': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-3': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-4': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-5': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-6': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-7': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-8': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-9': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css'],
    'photography-10': ['package.json', 'vite.config.js', 'index.html', 'src/main.jsx', 'src/App.jsx', 'src/index.css']
  };

  const handleDownload = async (slug, templateName) => {
    setDownloadingSlug(slug);
    const zip = new JSZip();
    const filesToDownload = TEMPLATE_FILES[slug] || ['package.json', 'index.html', 'src/App.jsx'];
    const folderName = slug;

    try {
      for (const filePath of filesToDownload) {
        const fileUrl = `/templates/photography/${folderName}/${filePath}`;
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
        const text = await response.text();
        zip.file(filePath, text);
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
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          borderRadius: '12px',
          padding: '16px 20px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: toastType === 'error' ? '#f87171' : '#10b981'
          }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 500, flex: 1, color: '#f8fafc' }}>
            {toastMessage}
          </span>
        </div>
      )}

      {/* Hero Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '50px',
        padding: '40px 20px',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          color: '#2563eb',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          marginBottom: '12px',
          display: 'block'
        }}>
          Curated Showcase
        </span>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '16px',
          fontFamily: 'var(--font-title)'
        }}>
          Photography Website Templates
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#64748b',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Discover 10 award-winning photography portfolio templates designed for luxury wedding, editorial, and commercial photographers.
        </p>
      </div>

      {/* Grid of Templates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {TEMPLATES.map((tpl) => (
          <div 
            key={tpl.slug}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {/* Left Column: Device Mockups Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '260px',
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              
              {/* 1. Laptop Mockup Frame */}
              <div style={{
                position: 'relative',
                width: '72%',
                aspectRatio: '16/10',
                background: '#0f172a',
                borderRadius: '8px 8px 0 0',
                border: '4px solid #1e293b',
                boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
                overflow: 'hidden',
                zIndex: 1,
                transform: 'translateX(-8%)',
                boxSizing: 'border-box'
              }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', background: '#ffffff' }}>
                  <img 
                    src={tpl.previewImage} 
                    alt={`${tpl.name} Desktop Preview`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'top'
                    }} 
                  />
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: '#64748b' }} />
              </div>

              {/* 2. Tablet Mockup Frame */}
              <div style={{
                position: 'absolute',
                right: '18%',
                bottom: '18%',
                width: '24%',
                aspectRatio: '3/4',
                background: '#0f172a',
                border: '4px solid #0f172a',
                borderRadius: '10px',
                boxShadow: '0 15px 25px rgba(0,0,0,0.18)',
                overflow: 'hidden',
                zIndex: 2,
                boxSizing: 'border-box'
              }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img 
                    src={tpl.previewImage} 
                    alt={`${tpl.name} Tablet Preview`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'top'
                    }} 
                  />
                </div>
              </div>

              {/* 3. Mobile Mockup Frame */}
              <div style={{
                position: 'absolute',
                right: '6%',
                bottom: '12%',
                width: '15%',
                aspectRatio: '9/19',
                background: '#090d16',
                border: '3px solid #090d16',
                borderRadius: '12px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.22)',
                overflow: 'hidden',
                zIndex: 3,
                boxSizing: 'border-box'
              }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <img 
                    src={tpl.previewImage} 
                    alt={`${tpl.name} Mobile Preview`} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: 'top'
                    }} 
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Title, Metadata, Description & Pill Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Badges / Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {tpl.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '4px 10px',
                    borderRadius: '99px',
                    backgroundColor: '#eff6ff',
                    color: '#1d4ed8',
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
                  fontSize: '1.6rem',
                  fontWeight: '800',
                  color: '#0f172a',
                  margin: 0,
                  fontFamily: 'var(--font-title)',
                  lineHeight: '1.25'
                }}>
                  <a 
                    href={tpl.demoUrl} 
                    style={{ color: '#0f172a', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#0066ff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#0f172a'}
                  >
                    {tpl.name}
                  </a>
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#64748b' }}>
                  <i className="fa-regular fa-clock" style={{ fontSize: '0.85rem' }}></i>
                  <span>Updated recently</span>
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#64748b',
                  lineHeight: '1.7',
                  margin: '6px 0 0 0',
                  fontWeight: 400
                }}>
                  {tpl.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: '10px' }}>
                <a 
                  href={tpl.demoUrl} 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 24px',
                    backgroundColor: '#1e40af',
                    color: 'white',
                    borderRadius: '99px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.25)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#1e40af';
                  }}
                >
                  Live Demo <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '10px' }}></i>
                </a>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
