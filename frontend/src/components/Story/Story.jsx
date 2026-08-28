import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/motionVariants';

const STORY_STEPS = [
  {
    num: '01',
    title: 'THE IDEA',
    desc: 'Every milestone starts as a simple, unrefined thought. A spark that challenges standard solutions and asks "what if?"',
    color: '#FF5F38',
    illustration: (
      <svg viewBox="0 0 100 100" className="story-svg">
        <circle cx="50" cy="50" r="30" fill="none" stroke="#232120" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M 50,20 L 50,80 M 20,50 L 80,50" stroke="#232120" strokeWidth="2" />
        <circle cx="50" cy="50" r="12" fill="#FFE885" stroke="#232120" strokeWidth="2" />
      </svg>
    )
  },
  {
    num: '02',
    title: 'THE FIRST SKETCH',
    desc: 'Translating concepts onto paper. Organic grids, irregular borders, and messy pencil strokes reveal the initial structure.',
    color: '#FFE885',
    illustration: (
      <svg viewBox="0 0 100 100" className="story-svg">
        <path d="M 20,80 Q 40,20 80,40" fill="none" stroke="#232120" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 80,40 L 72,32 M 80,40 L 68,44" stroke="#232120" strokeWidth="2.5" />
        <rect x="15" y="65" width="20" height="20" rx="3" fill="none" stroke="#FF5F38" strokeWidth="2" transform="rotate(-15, 25, 75)" />
      </svg>
    )
  },
  {
    num: '03',
    title: 'THE EXPERIMENT',
    desc: 'Where code meets graphics. Deforming shapes, dragging objects, and testing physics loops until the experience feels alive.',
    color: '#1E4620',
    illustration: (
      <svg viewBox="0 0 100 100" className="story-svg">
        <path d="M 35,30 C 50,10 70,50 50,75 C 30,90 20,50 35,30 Z" fill="none" stroke="#1E4620" strokeWidth="2.5" />
        <circle cx="50" cy="75" r="5" fill="#FFE885" stroke="#232120" strokeWidth="1.5" />
        <circle cx="35" cy="50" r="3" fill="#FF5F38" stroke="#232120" strokeWidth="1.5" />
        <circle cx="60" cy="35" r="7" fill="none" stroke="#232120" strokeWidth="2" />
      </svg>
    )
  },
  {
    num: '04',
    title: 'THE BUILD',
    desc: 'Connecting validated frontends to clean Spring Boot backends, ensuring validation limits are met and routes load fast.',
    color: '#FAF6EE',
    illustration: (
      <svg viewBox="0 0 100 100" className="story-svg">
        <rect x="25" y="25" width="50" height="50" rx="6" fill="none" stroke="#232120" strokeWidth="2.5" />
        <line x1="25" y1="40" x2="75" y2="40" stroke="#232120" strokeWidth="2" />
        <circle cx="35" cy="32" r="3" fill="#FF5F38" />
        <circle cx="45" cy="32" r="3" fill="#FFE885" />
        <circle cx="55" cy="32" r="3" fill="#1E4620" />
      </svg>
    )
  },
  {
    num: '05',
    title: 'THE FINAL EXPERIENCE',
    desc: 'Launching the website. A premium digital story combining visual magazine aesthetics and highly optimized animations.',
    color: '#FF5F38',
    illustration: (
      <svg viewBox="0 0 100 100" className="story-svg">
        <path d="M50,15 L60,40 L85,40 L65,55 L75,80 L50,65 L25,80 L35,55 L15,40 L40,40 Z" fill="#FFE885" stroke="#232120" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="5" fill="#FF5F38" />
      </svg>
    )
  }
];

export default function Story() {
  return (
    <section id="story" className="section story-section">
      <div className="story-header">
        <span className="story-sup">OUR VISION</span>
        <h2 className="story-main-heading">EVERY GREAT PROJECT STARTS WITH A STORY.</h2>
        <div className="sketch-divider-wave"></div>
      </div>

      <div className="story-timeline-container">
        {/* Growing vertical center line */}
        <div className="story-timeline-line"></div>

        {STORY_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={step.num}
              className={`story-step-row ${isEven ? 'row-left' : 'row-right'}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Timeline dot marker */}
              <div className="timeline-node">
                <span className="node-num">{step.num}</span>
              </div>

              {/* Story Details Card */}
              <motion.div 
                className="story-step-card sketch-card"
                variants={staggerItem}
                style={{ borderLeftColor: step.color }}
              >
                <div className="card-header-row">
                  <span className="step-number" style={{ backgroundColor: step.color }}>{step.num}</span>
                  <h3 className="step-title">{step.title}</h3>
                </div>
                <p className="step-desc">{step.desc}</p>
              </motion.div>

              {/* Story Illustration Card */}
              <motion.div 
                className="story-step-illustration organic-card-1"
                variants={staggerItem}
                data-cursor="DRAG"
              >
                {step.illustration}
              </motion.div>

            </motion.div>
          );
        })}
      </div>

      <style>{`
        .story-section {
          background-color: var(--bg-cream);
        }

        .story-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .story-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .story-main-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .story-timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        /* Timeline vertical line */
        .story-timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 2px;
          background: linear-gradient(to bottom, var(--border-color) 70%, transparent 100%);
          transform: translateX(-50%);
        }

        .story-step-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-bottom: 6rem;
          position: relative;
          align-items: center;
        }

        /* Timeline node placement */
        .timeline-node {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-cream);
          border: var(--border-sketch);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 2px 2px 0px var(--border-color);
        }

        .node-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 800;
        }

        .story-step-card {
          position: relative;
          border-left: 6px solid var(--border-color);
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .step-number {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: bold;
          padding: 3px 8px;
          border: var(--border-sketch);
          border-radius: 4px;
        }

        .step-title {
          font-size: 1.4rem;
          font-family: var(--font-sans);
          font-weight: 800;
        }

        .step-desc {
          font-size: 1rem;
          color: var(--text-muted);
        }

        .story-step-illustration {
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          margin: 0 auto;
          box-shadow: 4px 4px 0 var(--border-color);
        }

        .story-svg {
          width: 100%;
          height: 100%;
        }

        /* Align columns based on row position */
        .row-left .story-step-card {
          grid-column: 1;
        }
        .row-left .story-step-illustration {
          grid-column: 2;
        }

        .row-right .story-step-card {
          grid-column: 2;
        }
        .row-right .story-step-illustration {
          grid-column: 1;
        }

        /* Responsive Layout */
        @media (max-width: 768px) {
          .story-timeline-line {
            left: 20px;
            transform: none;
          }
          .timeline-node {
            left: 20px;
            top: 30px;
            transform: translate(-50%, 0);
          }
          .story-step-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 4rem;
            padding-left: 45px;
          }
          .row-left .story-step-card, .row-right .story-step-card {
            grid-column: 1;
          }
          .row-left .story-step-illustration, .row-right .story-step-illustration {
            grid-column: 1;
            margin-left: 0;
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </section>
  );
}
