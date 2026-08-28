import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchTestimonials } from '../../services/api';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    fetchTestimonials().then((data) => setTestimonials(data));
  }, []);

  // Automatic slide cycle
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) return null;

  const current = testimonials[activeIdx];

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="testimonials-header">
        <span className="testimonials-sup">KIND WORDS</span>
        <h2 className="testimonials-heading">TESTIMONIALS</h2>
      </div>

      <div className="testimonials-arena">
        
        {/* Active Handwritten Note Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="handwritten-paper-card"
            initial={{ scale: 0.9, rotate: current.rotation - 5, opacity: 0 }}
            animate={{ scale: 1, rotate: current.rotation, opacity: 1 }}
            exit={{ scale: 0.9, rotate: current.rotation + 5, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            data-cursor="DRAG"
          >
            {/* Double Border physical texture */}
            <div className="paper-border-inner">
              <span className="paper-pin">📌</span>
              
              <p className="paper-quote">{current.quote}</p>
              
              <div className="paper-signature-line">
                <span className="sig-name">{current.author}</span>
                <span className="sig-company">{current.company}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators (dots) */}
        <div className="testimonials-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`test-dot-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              data-cursor="OPEN"
            ></button>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--bg-paper);
          display: flex;
          align-items: center;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .testimonials-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        /* Handwritten Note placement */
        .testimonials-arena {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .handwritten-paper-card {
          width: 100%;
          background: #FFFDF9;
          border: var(--border-sketch);
          border-radius: 4px 20px 4px 20px/20px 4px 20px 4px;
          padding: 2.5rem;
          box-shadow: 8px 8px 0px var(--border-color);
          position: relative;
          cursor: pointer;
        }

        .paper-border-inner {
          border: 1px dashed rgba(35, 33, 32, 0.2);
          border-radius: 4px 18px 4px 18px/18px 4px 18px 4px;
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 220px;
        }

        .paper-pin {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
        }

        .paper-quote {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 700;
          font-style: italic;
          line-height: 1.4;
          text-align: center;
          color: var(--text-charcoal);
          margin-bottom: 2rem;
        }

        .paper-signature-line {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-top: 1.5px solid #232120;
          width: 60%;
          margin: 0 auto;
          padding-top: 0.8rem;
        }

        .sig-name {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1rem;
          color: var(--text-charcoal);
        }

        .sig-company {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-coral);
          font-weight: bold;
          margin-top: 2px;
        }

        /* Dots indicator */
        .testimonials-dots {
          display: flex;
          gap: 12px;
          margin-top: 2.5rem;
        }

        .test-dot-btn {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: var(--border-sketch);
          background-color: var(--bg-cream);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .test-dot-btn.active {
          background-color: var(--accent-coral);
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
}
