import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { letterFloatingVariants, floatVariants } from '../../animations/motionVariants';

export default function Hero() {
  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section hero-section">
      <div className="hero-grid">
        
        {/* Left Side Text Content */}
        <div className="hero-text-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-tag" data-cursor="VIEW">CREATIVE PORTFOLIO & STUDIO</span>
            
            <h1 className="hero-heading">
              WE TURN <br />
              <motion.span 
                className="hero-ideas highlight-yellow"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ display: "inline-block", padding: "0 10px" }}
              >
                IDEAS
              </motion.span> <br />
              INTO <br />
              <motion.span 
                className="hero-experiences highlight-green"
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                EXPERIENCES.
              </motion.span>
            </h1>

            <p className="hero-desc">
              We reject the dark neon voids and dashboard templates. Here, we weave code, illustrations, and stories into premium editorial web magazines and interactive digital canvases.
            </p>

            <div className="hero-action-row">
              <button 
                onClick={scrollToStory} 
                className="btn-editorial"
                data-cursor="VIEW"
              >
                EXPLORE OUR STORY <ArrowDownRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side Animated SVG Mascot */}
        <div className="hero-graphic-col">
          <motion.div
            className="mascot-container"
            variants={floatVariants}
            animate="animate"
          >
            {/* Mascot Creative Creature */}
            <svg viewBox="0 0 400 400" className="mascot-svg">
              {/* Background circular highlights */}
              <circle cx="200" cy="200" r="160" fill="#FFE885" opacity="0.4" stroke="#232120" strokeWidth="1.5" strokeDasharray="6 6" />
              
              {/* Main Body (Organic irregular blob shape) */}
              <path 
                d="M 200,90 C 270,90 320,130 320,200 C 320,270 270,310 200,310 C 130,310 90,260 90,200 C 90,130 130,90 200,90 Z" 
                fill="#FF5F38" 
                stroke="#232120" 
                strokeWidth="3.5" 
              />
              
              {/* Left Eye Container & Lid */}
              <g className="mascot-eye left-eye">
                <circle cx="160" cy="180" r="22" fill="#FAF6EE" stroke="#232120" strokeWidth="3" />
                {/* Pupil with blinking animation */}
                <motion.circle 
                  cx="160" 
                  cy="180" 
                  r="8" 
                  fill="#232120"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 2 }}
                />
              </g>

              {/* Right Eye Container & Lid */}
              <g className="mascot-eye right-eye">
                <circle cx="240" cy="180" r="22" fill="#FAF6EE" stroke="#232120" strokeWidth="3" />
                {/* Pupil with blinking animation */}
                <motion.circle 
                  cx="240" 
                  cy="180" 
                  r="8" 
                  fill="#232120"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 2 }}
                />
              </g>

              {/* Mouth (Happy hand-drawn path) */}
              <path d="M 180,225 Q 200,245 220,225" fill="none" stroke="#232120" strokeWidth="4" strokeLinecap="round" />

              {/* Rosy Cheeks */}
              <circle cx="130" cy="205" r="8" fill="#1E4620" opacity="0.3" />
              <circle cx="270" cy="205" r="8" fill="#1E4620" opacity="0.3" />

              {/* Crown (Creative Star) */}
              <g transform="translate(180, 45) scale(0.4)">
                <path d="M50,10 L62,38 L92,38 L68,56 L77,86 L50,68 L23,86 L32,56 L8,38 L38,38 Z" fill="#FFE885" stroke="#232120" strokeWidth="6" />
              </g>

              {/* Floating Environmental Shapes */}
              {/* Little Star Left */}
              <motion.path 
                d="M 60,110 L 65,120 L 75,120 L 67,126 L 70,136 L 60,130 L 50,136 L 53,126 L 45,120 L 55,120 Z" 
                fill="#FFE885" 
                stroke="#232120" 
                strokeWidth="1.5"
                variants={letterFloatingVariants(0.5)}
                animate="animate"
              />
              {/* Little Star Right */}
              <motion.path 
                d="M 320,100 L 325,110 L 335,110 L 327,116 L 330,126 L 320,120 L 310,126 L 313,116 L 305,110 L 315,110 Z" 
                fill="#FAF6EE" 
                stroke="#232120" 
                strokeWidth="1.5"
                variants={letterFloatingVariants(1)}
                animate="animate"
              />
              {/* Loop Shape Bottom Right */}
              <motion.path
                d="M 320,270 Q 350,260 330,290"
                fill="none"
                stroke="#232120"
                strokeWidth="3.5"
                strokeLinecap="round"
                variants={letterFloatingVariants(1.5)}
                animate="animate"
              />
            </svg>
          </motion.div>
        </div>

      </div>

      {/* Decorative arrow floating in hero space */}
      <div className="decor-arrow animate-float">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF5F38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7,7 17,7 17,17"></polyline>
        </svg>
      </div>

      {/* Styles specific to Hero */}
      <style>{`
        .hero-section {
          background-color: var(--bg-cream);
          display: flex;
          align-items: center;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 3rem;
          width: 100%;
          align-items: center;
        }

        @media (max-width: 991px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }
          .hero-action-row {
            justify-content: center;
          }
        }

        .hero-tag {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 0.85rem;
          background-color: var(--accent-yellow);
          color: var(--text-charcoal);
          padding: 4px 10px;
          border: var(--border-sketch);
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .hero-heading {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.05;
          margin-bottom: 2rem;
          font-weight: 900;
          font-family: var(--font-serif);
        }

        .hero-desc {
          font-size: 1.15rem;
          max-width: 550px;
          margin-bottom: 2.5rem;
          color: var(--text-muted);
        }

        @media (max-width: 991px) {
          .hero-desc {
            margin: 0 auto 2.5rem auto;
          }
        }

        .hero-action-row {
          display: flex;
          gap: 1rem;
        }

        .hero-graphic-col {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mascot-container {
          width: 100%;
          max-width: 320px;
        }

        .mascot-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(8px 8px 0px rgba(35, 33, 32, 0.15));
        }

        .decor-arrow {
          position: absolute;
          bottom: 40px;
          right: 80px;
        }

        @media (max-width: 768px) {
          .decor-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
