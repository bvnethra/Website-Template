import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye, Lightbulb, PenTool, Sparkles, Sliders, Rocket } from 'lucide-react';

const STAGES = [
  { num: '01', name: 'DISCOVER', icon: <Eye size={20} />, desc: 'Researching constraints, auditing targets, and analyzing the project landscape to establish a solid roadmap.' },
  { num: '02', name: 'IMAGINE', icon: <Lightbulb size={20} />, desc: 'Brainstorming creative stories, visual directions, palettes, and tactile wireframes that stand out.' },
  { num: '03', name: 'CREATE', icon: <PenTool size={20} />, desc: 'Developing the layout using React, custom CSS, and drawing vector shapes and SVG mascot illustrations.' },
  { num: '04', name: 'TEST', icon: <Sparkles size={20} />, desc: 'Refining scroll animations, checking clip-paths, validating REST endpoints, and verifying layout parameters.' },
  { num: '05', name: 'REFINE', icon: <Sliders size={20} />, desc: 'Polishing responsiveness on mobile, custom cursor indicators, input feedback and physics reactions.' },
  { num: '06', name: 'LAUNCH', icon: <Rocket size={20} />, desc: 'Building the Spring Boot artifacts, configuring web hosts, and deploying the premium digital story.' }
];

export default function Process() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [rotation, setRotation] = useState(0);
  const requestRef = useRef(null);

  // Rotation animation loop
  useEffect(() => {
    const updateRotation = () => {
      // Pause rotation on hover
      if (hoveredIdx === null) {
        setRotation((prev) => (prev + 0.15) % 360);
      }
      requestRef.current = requestAnimationFrame(updateRotation);
    };

    requestRef.current = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(requestRef.current);
  }, [hoveredIdx]);

  return (
    <section id="process" className="section process-section">
      <div className="process-header">
        <span className="process-sup">METHODOLOGY</span>
        <h2 className="process-heading">OUR PROCESS</h2>
        <p className="process-desc">Hover over any stage around the orbit to examine details.</p>
      </div>

      <div className="process-wheel-container">
        {/* Central Hub showing active details */}
        <div className="wheel-center-hub sketch-card">
          {hoveredIdx !== null ? (
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="center-hub-content"
            >
              <div className="center-icon-badge">
                {STAGES[hoveredIdx].icon}
              </div>
              <span className="center-stage-num">STAGE {STAGES[hoveredIdx].num}</span>
              <h3 className="center-stage-name">{STAGES[hoveredIdx].name}</h3>
              <p className="center-stage-desc">{STAGES[hoveredIdx].desc}</p>
            </motion.div>
          ) : (
            <div className="center-hub-content idle">
              <span className="center-stage-num">01 — 06</span>
              <h3 className="center-stage-name">TACTILE LOOPS</h3>
              <p className="center-stage-desc">Our process rotates in an organic loop. Hover over a stage to see the breakdown.</p>
            </div>
          )}
        </div>

        {/* Orbit System */}
        <div className="orbit-track-line"></div>

        {/* Rotating Nodes Wrapper */}
        <div 
          className="orbit-nodes-wrapper"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {STAGES.map((stage, idx) => {
            // Place nodes evenly around the circle
            const angle = (idx * 360) / STAGES.length;
            const radius = 200; // Radius in pixels

            // Compute absolute translation offset
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={stage.num}
                className={`orbit-node-item ${isHovered ? 'active' : ''}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) rotate(${-rotation}deg)`,
                  position: 'absolute',
                  left: 'calc(50% - 40px)',
                  top: 'calc(50% - 40px)',
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                data-cursor="OPEN"
              >
                <div className="node-circle-button">
                  <span className="node-num-label">{stage.num}</span>
                  <span className="node-text-label">{stage.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-section {
          background-color: var(--bg-cream);
          overflow: hidden;
        }

        .process-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .process-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .process-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .process-desc {
          font-size: 1rem;
          color: var(--text-muted);
          margin-top: 10px;
        }

        /* Circular Wheel Layout */
        .process-wheel-container {
          position: relative;
          width: 520px;
          height: 520px;
          margin: 3rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .process-wheel-container {
            width: 100%;
            height: auto;
            flex-direction: column;
            gap: 2rem;
            margin: 1rem 0;
          }
          .orbit-track-line, .orbit-nodes-wrapper {
            display: none;
          }
        }

        /* Center Hub Box */
        .wheel-center-hub {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          background-color: var(--bg-paper);
          border: var(--border-sketch);
          box-shadow: 4px 4px 0px var(--border-color);
          padding: 1.5rem;
          text-align: center;
        }

        @media (max-width: 768px) {
          .wheel-center-hub {
            width: 100%;
            height: auto;
            border-radius: 12px;
            box-shadow: 4px 4px 0px var(--border-color);
          }
        }

        .center-hub-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .center-icon-badge {
          background-color: var(--accent-yellow);
          color: var(--text-charcoal);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--border-sketch);
          margin-bottom: 0.8rem;
          box-shadow: 2px 2px 0px var(--border-color);
        }

        .center-stage-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-coral);
          font-weight: 800;
        }

        .center-stage-name {
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: 1.25rem;
          margin: 4px 0 8px 0;
        }

        .center-stage-desc {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-muted);
        }

        /* Circular Track Line */
        .orbit-track-line {
          position: absolute;
          width: 400px;
          height: 400px;
          border: 1.5px dashed rgba(35, 33, 32, 0.2);
          border-radius: 50%;
          z-index: 1;
        }

        .orbit-nodes-wrapper {
          position: absolute;
          width: 400px;
          height: 400px;
          z-index: 3;
          will-change: transform;
        }

        /* Individual orbiting node */
        .orbit-node-item {
          width: 80px;
          height: 80px;
          z-index: 4;
          cursor: pointer;
        }

        .node-circle-button {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--bg-cream);
          border: var(--border-sketch);
          box-shadow: 3px 3px 0px var(--border-color);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }

        .orbit-node-item:hover .node-circle-button,
        .orbit-node-item.active .node-circle-button {
          background-color: var(--accent-yellow);
          box-shadow: 4px 4px 0px var(--border-color);
          transform: scale(1.1);
        }

        .node-num-label {
          font-family: var(--font-mono);
          font-weight: bold;
          font-size: 0.7rem;
        }

        .node-text-label {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.55rem;
          letter-spacing: 0.2px;
          margin-top: 2px;
        }

        /* Mobile list fallback items */
        .mobile-process-list {
          display: none;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 768px) {
          .mobile-process-list {
            display: flex;
          }
        }

        .mobile-process-row {
          display: flex;
          gap: 1rem;
          padding: 1.2rem;
        }

        .mobile-row-num {
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 1.2rem;
          color: var(--accent-coral);
        }
      `}</style>

      {/* Mobile list view backup */}
      <div className="mobile-process-list">
        {STAGES.map((stage) => (
          <div key={stage.num} className="mobile-process-row sketch-card">
            <span className="mobile-row-num">{stage.num}</span>
            <div className="mobile-row-body">
              <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '5px' }}>{stage.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
