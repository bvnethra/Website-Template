import React, { useState } from 'react';
import { galleryImages } from '../data/galleryData';
import { ArrowRight, Eye, Sparkles } from 'lucide-react';

export const GallerySection = ({ onOpenLightbox, onOpenProjectByTitle }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Exterior', 'Interior', 'Structure', 'Engineering', 'Landscape', 'Night View'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="section-padding" style={{ background: 'var(--bg-surface)' }} aria-label="Architecture & Construction Photography Gallery">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-tag center">VISUAL ARCHIVE</div>
          <h2 className="section-heading-lg">
            ARCHITECTURE & <span className="gold-text">ENGINEERING GALLERY</span>
          </h2>
          <p className="section-subtext mx-auto">
            A curated photographic documentation of monolithic glass facades, post-tensioned superstructures, and artisanal interior joinery.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="filter-pills-bar" style={{ marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`filter-pill-btn ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="masonry-gallery-grid">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className="masonry-item"
              onClick={() => onOpenLightbox(item.image, `${item.title} — ${item.project}`)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="masonry-overlay">
                <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.5rem', alignSelf: 'flex-start' }}>
                  {item.category}
                </span>
                <h4 className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', margin: '0.4rem 0 0.2rem' }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                  {item.project} • {item.desc}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                  <span>VIEW PROJECT</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
