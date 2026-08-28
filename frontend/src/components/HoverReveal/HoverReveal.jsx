import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HoverReveal() {
  const [hoveredKey, setHoveredKey] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate coordinates relative to container to avoid offset issues
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const PREVIEWS = {
    design: {
      title: "Editorial Design",
      desc: "Warm HSL color cards, organic shapes, and irregular sketch lines.",
      graphic: (
        <svg viewBox="0 0 160 120" className="reveal-graphic-svg">
          <circle cx="50" cy="60" r="30" fill="#FFE885" stroke="#232120" strokeWidth="1.5" />
          <rect x="70" y="30" width="60" height="60" rx="6" fill="#FF5F38" stroke="#232120" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="140" y2="100" stroke="#232120" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      )
    },
    code: {
      title: "Interactive Code",
      desc: "Robust React state systems joined with Spring Boot WebMVC REST APIs.",
      graphic: (
        <svg viewBox="0 0 160 120" className="reveal-graphic-svg">
          <text x="30" y="55" fontFamily="var(--font-mono)" fontSize="18" fill="#1E4620" fontWeight="bold">&lt;React /&gt;</text>
          <text x="50" y="85" fontFamily="var(--font-mono)" fontSize="18" fill="#FF5F38" fontWeight="bold">Spring</text>
          <path d="M10,10 L150,10 L150,110 L10,110 Z" fill="none" stroke="#232120" strokeWidth="1.5" />
        </svg>
      )
    },
    ideas: {
      title: "Creative Sparks",
      desc: "Transforming abstract thoughts into premium digital magazines.",
      graphic: (
        <svg viewBox="0 0 160 120" className="reveal-graphic-svg">
          {/* Starburst */}
          <path d="M80,10 L90,45 L125,45 L95,65 L105,100 L80,80 L55,100 L65,65 L35,45 L70,45 Z" fill="#FFE885" stroke="#232120" strokeWidth="2" />
          <circle cx="80" cy="55" r="8" fill="#FF5F38" />
        </svg>
      )
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hover-reveal" 
      className="section hover-reveal-section"
      onMouseMove={handleMouseMove}
    >
      <div className="reveal-bg-text">MAGAZINE</div>
      
      <div className="reveal-container-box">
        <span className="reveal-sup">TACTILE EXPLORATION</span>
        
        <h2 className="reveal-instruction-title">
          MOVE YOUR CURSOR OVER THE WORDS.
        </h2>

        <div className="reveal-interactive-text">
          WE MERGE{" "}
          <span 
            className="reveal-keyword keyword-design"
            onMouseEnter={() => setHoveredKey('design')}
            onMouseLeave={() => setHoveredKey(null)}
            data-cursor="VIEW"
          >
            DESIGN
          </span>
          ,{" "}
          <span 
            className="reveal-keyword keyword-code"
            onMouseEnter={() => setHoveredKey('code')}
            onMouseLeave={() => setHoveredKey(null)}
            data-cursor="VIEW"
          >
            CODE
          </span>
          , AND BRAND{" "}
          <span 
            className="reveal-keyword keyword-ideas"
            onMouseEnter={() => setHoveredKey('ideas')}
            onMouseLeave={() => setHoveredKey(null)}
            data-cursor="VIEW"
          >
            IDEAS
          </span>
          .
        </div>
      </div>

      {/* Floating Preview Card */}
      <AnimatePresence>
        {hoveredKey && PREVIEWS[hoveredKey] && (
          <motion.div
            className="floating-preview-card sketch-card"
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 1 }}
            exit={{ opacity: 0, scale: 0.85, rotate: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            style={{
              position: 'absolute',
              left: coords.x + 20,
              top: coords.y + 20,
              pointerEvents: 'none',
              zIndex: 100,
              width: '260px',
              padding: '1.2rem'
            }}
          >
            <div className="preview-graphic-box">
              {PREVIEWS[hoveredKey].graphic}
            </div>
            <h4 className="preview-card-title">{PREVIEWS[hoveredKey].title}</h4>
            <p className="preview-card-desc">{PREVIEWS[hoveredKey].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hover-reveal-section {
          background-color: var(--bg-paper);
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .reveal-bg-text {
          position: absolute;
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: 20vw;
          color: rgba(35, 33, 32, 0.03);
          pointer-events: none;
          user-select: none;
          z-index: 0;
          line-height: 1;
        }

        .reveal-container-box {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
        }

        .reveal-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.85rem;
          background: var(--accent-yellow);
          padding: 2px 8px;
          border: var(--border-sketch);
          border-radius: 4px;
        }

        .reveal-instruction-title {
          font-size: 1.2rem;
          font-family: var(--font-body);
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }

        .reveal-interactive-text {
          font-family: var(--font-serif);
          font-weight: 900;
          font-size: clamp(2rem, 5vw, 4rem);
          line-height: 1.3;
          color: var(--text-charcoal);
        }

        .reveal-keyword {
          color: var(--accent-coral);
          text-decoration: underline;
          text-decoration-style: wavy;
          cursor: pointer;
          position: relative;
          display: inline-block;
          transition: transform 0.2s;
        }

        .reveal-keyword:hover {
          transform: scale(1.05) rotate(-1deg);
        }

        .keyword-design {
          color: var(--accent-coral);
        }

        .keyword-code {
          color: var(--accent-green);
        }

        .keyword-ideas {
          color: var(--text-charcoal);
          background-color: var(--accent-yellow);
          padding: 0 10px;
          border-radius: 4px;
          text-decoration: none;
          border: var(--border-sketch);
        }

        /* Preview floaters */
        .preview-graphic-box {
          border: var(--border-sketch);
          background-color: var(--bg-cream);
          border-radius: 8px;
          margin-bottom: 0.8rem;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reveal-graphic-svg {
          width: 100%;
          height: 100%;
        }

        .preview-card-title {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .preview-card-desc {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
