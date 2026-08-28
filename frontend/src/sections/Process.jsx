import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Search, Compass, Terminal, ShieldAlert, Rocket } from 'lucide-react';
import { fadeIn } from '../animations/animationVariants';

const PROCESS_STEPS = [
  {
    num: '01',
    phase: 'DISCOVER',
    title: 'Research & Strategy',
    icon: Search,
    color: '#06b6d4',
    description: 'We run deep audits of your product landscape, target audiences, and project demands to construct the initial product architecture.',
  },
  {
    num: '02',
    phase: 'PLAN',
    title: 'Visual Design & Prototyping',
    icon: Compass,
    color: '#3b82f6',
    description: 'Developing design systems and high-fidelity wireframes. Structuring user flows, glassmorphism templates, and interactive models.',
  },
  {
    num: '03',
    phase: 'BUILD',
    title: 'Full Stack Coding',
    icon: Terminal,
    color: '#8b5cf6',
    description: 'Engineering the frontend React components and the backend Spring Boot REST services, optimizing queries and caching systems.',
  },
  {
    num: '04',
    phase: 'TEST',
    title: 'Quality Verification',
    icon: ShieldAlert,
    color: '#ec4899',
    description: 'Executing unit tests, endpoint verification, responsive breakpoints validation, and load balancing audits for zero defects.',
  },
  {
    num: '05',
    phase: 'LAUNCH',
    title: 'Deployment & Scaling',
    icon: Rocket,
    color: '#10b981',
    description: 'Migrating builds to production servers. Launching monitoring systems, backup routines, and indexing SEO configurations.',
  },
];

export default function Process() {
  const containerRef = useRef(null);

  // Track scroll position specifically inside this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeightSpring = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Convert scroll ratio into percentage height for drawing line
  const lineHeight = useTransform(lineHeightSpring, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="process" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">
          THE ROADMAP TO <span className="gradient-text">SUCCESS</span>
        </h2>
        <p className="section-subtitle">
          Follow our transparent, step-by-step engineering journey to construct outstanding web systems.
        </p>

        <div style={{ position: 'relative', marginTop: '60px' }}>
          {/* Vertical Connecting Line (Desktop: Center, Mobile: Left) */}
          <div
            className="process-line-track"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '2px',
              zIndex: 1,
            }}
          />

          {/* Animated Drawing Line overlay */}
          <motion.div
            className="process-line-draw"
            style={{
              position: 'absolute',
              top: 0,
              width: '4px',
              height: lineHeight,
              background: 'linear-gradient(to bottom, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #10b981)',
              borderRadius: '2px',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              zIndex: 2,
            }}
          />

          {/* Steps List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', position: 'relative', zIndex: 3 }}>
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`process-item-row ${isEven ? 'even-row' : 'odd-row'}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '80px',
                    alignItems: 'center',
                  }}
                >
                  {/* Content Column */}
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn(isEven ? 'right' : 'left', 'spring', 0.1, 0.6)}
                    style={{
                      order: isEven ? 1 : 3,
                      textAlign: isEven ? 'right' : 'left',
                    }}
                  >
                    <div
                      className="glass-panel"
                      style={{
                        padding: '30px',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        background: 'rgba(11, 15, 30, 0.4)',
                        borderRadius: '20px',
                        display: 'inline-block',
                        maxWidth: '460px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: step.color,
                          letterSpacing: '2px',
                          marginBottom: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Icon size={14} /> {step.phase}
                      </div>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px' }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Spacer Column (Holds node symbol on the line) */}
                  <div
                    style={{
                      order: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Glowing Node Button */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#040814',
                        border: `2px solid ${step.color}`,
                        color: step.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 'bold',
                        zIndex: 4,
                        boxShadow: `0 0 15px ${step.color}66`,
                      }}
                    >
                      {step.num}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        /* Center line positioning on desktop */
        .process-line-track, .process-line-draw {
          left: 50%;
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .process-line-track, .process-line-draw {
            left: 30px !important;
            transform: none !important;
          }

          .process-item-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding-left: 70px;
          }

          .process-item-row > div {
            order: unset !important;
            text-align: left !important;
          }

          /* Relocate nodes onto left line track */
          .process-item-row > div:nth-child(2) {
            position: absolute;
            left: 0;
            top: 20px;
          }
        }
      `}</style>
    </section>
  );
}
