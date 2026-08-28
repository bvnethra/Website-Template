import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { fetchTestimonials } from '../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchTestimonials().then((data) => {
      setTestimonials(data);
      setLoading(false);
    });
  }, []);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testimonials, activeIdx]);

  if (loading || testimonials.length === 0) return null;

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIdx];

  // Slide variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  return (
    <section id="testimonials" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating decorative elements */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ maxWidth: '850px' }}>
        <h2 className="section-title">
          WHAT THEY <span className="gradient-text">SAY</span>
        </h2>
        <p className="section-subtitle">
          Read detailed reviews from enterprise leaders who transformed their digital systems with our solutions.
        </p>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '-60px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s',
            }}
            className="carousel-arrow"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Testimonial Panel */}
          <div style={{ width: '100%', minHeight: '280px', position: 'relative' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="glass-panel testimonial-card"
                style={{
                  padding: '50px 40px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(11, 15, 30, 0.45)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              >
                <Quote size={40} style={{ color: 'rgba(59, 130, 246, 0.15)', position: 'absolute', top: '30px', left: '40px' }} />

                {/* Stars */}
                <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" />
                  ))}
                </div>

                {/* Feedback */}
                <p style={{ fontSize: '1.2rem', color: '#f3f4f6', italic: true, lineHeight: 1.6, maxWidth: '680px' }}>
                  "{current.feedback}"
                </p>

                {/* Avatar and Meta */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
                  <img
                    src={current.avatarUrl}
                    alt={current.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent-blue)',
                    }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{current.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '-60px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.3s',
            }}
            className="carousel-arrow"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bullet Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIdx ? 1 : -1);
                setActiveIdx(idx);
              }}
              style={{
                width: activeIdx === idx ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: activeIdx === idx ? 'var(--accent-blue)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .carousel-arrow:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--accent-blue) !important;
          color: var(--accent-blue) !important;
        }

        @media (max-width: 991px) {
          .carousel-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
