import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = testimonialsData[currentIndex];

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="section testimonials-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header text-center"
        >
          <div className="section-tag">Endorsements</div>
          <h2 className="section-title">
            Client <span className="text-accent">Reflections</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="testimonial-slider-wrapper">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="glass-card testimonial-card"
            >
              <div className="testimonial-stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="star-icon" fill="var(--accent-cyan)" />
                ))}
              </div>

              <div className="testimonial-quote-wrapper">
                <Quote className="quote-background-icon" size={60} />
                <p className="testimonial-quote-text">"{current.quote}"</p>
              </div>

              <div className="testimonial-author-row">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-author-info">
                  <h3 className="author-name">{current.name}</h3>
                  <span className="author-role">{current.role} — {current.company}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Navigation Controls */}
          <div className="slider-controls-row">
            <button
              onClick={prevSlide}
              className="slider-nav-btn"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Pagination Dots */}
            <div className="pagination-dots">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="slider-nav-btn"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
