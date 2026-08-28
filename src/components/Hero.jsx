import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Compass, Sparkles, Building2, ShieldCheck } from 'lucide-react';

export const Hero = ({ onExploreProjects, onStartProject }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85",
      tag: "LUXURY RESIDENTIAL • COASTAL HIGH-RISE",
      title: "Auren Heights, OMR",
      location: "Chennai, India"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85",
      tag: "GRADE-A COMMERCIAL • CORPORATE CAMPUS",
      title: "Nova Business District",
      location: "Guindy, Chennai"
    },
    {
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=85",
      tag: "BESPOKE TROPICAL VILLAS • SANCTUARY",
      title: "The Orchard Villas",
      location: "ECR, Chennai"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="hero" className="hero-section" aria-label="Hero Section">
      {/* Background Visual Container */}
      <div className="hero-bg-container">
        {heroSlides.map((slide, idx) => (
          <img
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            className="hero-bg-image"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: activeSlide === idx ? 1 : 0,
              transition: 'opacity 1.8s ease-in-out',
              zIndex: activeSlide === idx ? 1 : 0
            }}
          />
        ))}
      </div>

      {/* Overlays */}
      <div className="hero-overlay-dark" />
      <div className="hero-overlay-grid" />

      {/* Hero Content */}
      <div className="container hero-content-wrapper">
        {/* Architectural Label Tag */}
        <div className="hero-badge-pill">
          <span className="hero-badge-dot"></span>
          <span>CONSTRUCTION • ARCHITECTURE • DEVELOPMENT</span>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="hero-main-title">
          We Build the Future <br />
          <span className="gold-text">One Landmark at a Time.</span>
        </h1>

        {/* Supporting Narrative */}
        <p className="hero-lead-text">
          From ambitious architectural concepts to exceptional completed spaces, we deliver construction projects engineered for quality, performance and lasting value.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-actions">
          <button
            onClick={onExploreProjects}
            className="btn btn-primary"
          >
            <span>Explore Our Projects</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={onStartProject}
            className="btn btn-secondary"
          >
            <Sparkles size={16} color="var(--gold-primary)" />
            <span>Start Your Project</span>
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {heroSlides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              style={{
                width: activeSlide === idx ? '32px' : '8px',
                height: '5px',
                borderRadius: '4px',
                background: activeSlide === idx ? 'var(--gold-primary)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.4s ease'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Cue Indicator */}
        <div>
          <a href="#about" className="hero-scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={18} className="scroll-indicator-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};
