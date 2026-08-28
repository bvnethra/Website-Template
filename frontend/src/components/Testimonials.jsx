import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fadeInUp } from '../animations/animations';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'NexusTech Global',
    rating: 5,
    quote: 'Polar delivered a stunning React landing page paired with an ultra-responsive Spring Boot REST backend. The Framer Motion animations feel incredibly fluid and polished!',
    initials: 'SJ',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Lead Architect',
    company: 'CloudSphere',
    rating: 5,
    quote: 'The light aesthetic combined with glassmorphism gives our product a premium feel. The stateless backend contact handler was trivial to deploy without database setup.',
    initials: 'MV',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Starlight Studio',
    rating: 5,
    quote: 'Incredible performance! The counter statistics, sticky nav, and smooth scrolling mobile drawer make this website look like a multi-million dollar product.',
    initials: 'ER',
    gradient: 'from-cyan-500 to-teal-600',
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Head of Engineering',
    company: 'Pulse Systems',
    rating: 5,
    quote: 'Clean code structure, zero bloated dependencies, and instantaneous form validation. Easily the best React + Spring Boot landing template we have used.',
    initials: 'DC',
    gradient: 'from-amber-500 to-orange-600',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-indigo/10 text-accent-indigo text-xs font-bold uppercase tracking-wider mb-4"
          >
            Client Reviews
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight"
          >
            Loved by Modern <span className="gradient-text">Teams</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-500"
          >
            Hear what visionary founders and engineering leaders say about building with Polar.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 sm:p-12 border border-white shadow-2xl shadow-accent-indigo/10 relative overflow-hidden"
          >
            {/* Ambient Background Quote Icon */}
            <Quote className="absolute -top-4 -right-4 w-36 h-36 text-slate-100/60 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl sm:text-2xl text-navy font-medium leading-relaxed mb-8 italic">
                  "{current.quote}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${current.gradient} text-white font-bold text-lg flex items-center justify-center shadow-md`}>
                    {current.initials}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy">{current.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{current.role} at <span className="text-accent-indigo">{current.company}</span></p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls & Indicators */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 relative z-10">
              
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-8 bg-accent-indigo' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center transition-all shadow-sm active:scale-95"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
