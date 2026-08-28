import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="section-padding" style={{ background: '#F8F7F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Client Testimonials and Endorsements">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">CLIENT REPUTATION</div>
          <h2 className="section-heading-lg">
            ENDORSED BY <span className="gold-text">VISIONARIES</span>
          </h2>
          <p className="section-subtext mx-auto">
            Read perspectives from discerning homeowners, corporate leaders, and institutional property investors who trusted AUREN.
          </p>
        </div>

        {/* 3 Editorial Cards Grid */}
        <div className="grid-3" style={{ gap: '2rem' }}>
          {testimonialsData.slice(0, 3).map((item) => (
            <article key={item.id} className="testimonial-card-editorial">
              <Quote size={28} color="var(--gold-primary)" style={{ opacity: 0.5, marginBottom: '1rem' }} />

              <div className="test-stars-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--gold-primary)" />
                ))}
              </div>

              <blockquote className="testimonial-quote">
                "{item.quote}"
              </blockquote>

              <div className="testimonial-author-meta">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="author-avatar"
                />
                <div>
                  <div className="author-name">{item.author}</div>
                  <div className="author-role">{item.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: 700, marginTop: '2px' }}>
                    {item.project}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
