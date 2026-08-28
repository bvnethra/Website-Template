import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { fetchServices } from '../../services/api';

// Canvas predefined coordinate mappings (percentage based)
const BASE_POSITIONS = [
  { x: 20, y: 25 }, // Creative Development
  { x: 50, y: 18 }, // Web Experiences
  { x: 80, y: 30 }, // Branding
  { x: 15, y: 70 }, // UI/UX
  { x: 45, y: 75 }, // Digital Products
  { x: 75, y: 68 }  // Interactive Media
];

// Structural connection mapping between nodes
const CONNECTIONS = [
  [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [4, 5], [2, 5]
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    fetchServices().then((data) => {
      // Map API items to positions
      const mapped = data.map((s, idx) => ({
        ...s,
        baseX: BASE_POSITIONS[idx]?.x || 50,
        baseY: BASE_POSITIONS[idx]?.y || 50
      }));
      setServices(mapped);
    });
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Get active coordinates of a node factoring in mouse parallax
  const getNodeCoords = (node, idx) => {
    if (!node) return { x: 0, y: 0 };
    // Different nodes react with different sensitivities
    const factor = 15 + (idx % 3) * 10; 
    const dx = mousePos.x * factor;
    const dy = mousePos.y * factor;
    return {
      x: `calc(${node.baseX}% + ${dx}px)`,
      y: `calc(${node.baseY}% + ${dy}px)`
    };
  };

  return (
    <section id="services" className="section services-section">
      <div className="services-header">
        <span className="services-sup">WHAT WE OFFER</span>
        <h2 className="services-heading">CREATIVE SERVICES</h2>
        <p className="services-desc">Move your cursor to drift the canvas. Click any node to open the editorial handbook.</p>
      </div>

      {/* Floating Canvas Area */}
      <div 
        ref={containerRef}
        className="canvas-container organic-card-2"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Connecting Lines SVG Overlay */}
        <svg className="canvas-svg-overlay">
          {services.length > 0 && CONNECTIONS.map(([startIdx, endIdx], idx) => {
            const start = services[startIdx];
            const end = services[endIdx];
            if (!start || !end) return null;

            const isHighlighted = hoveredNode === startIdx || hoveredNode === endIdx;

            return (
              <motion.line
                key={idx}
                x1={`${start.baseX}%`}
                y1={`${start.baseY}%`}
                x2={`${end.baseX}%`}
                y2={`${end.baseY}%`}
                stroke={isHighlighted ? "var(--accent-coral)" : "rgba(35, 33, 32, 0.15)"}
                strokeWidth={isHighlighted ? 2.5 : 1}
                style={{
                  transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
                  transition: 'stroke 0.2s, stroke-width 0.2s, transform 0.1s ease-out'
                }}
              />
            );
          })}
        </svg>

        {/* Floating Labels / Nodes */}
        {services.map((service, idx) => {
          const coords = getNodeCoords(service, idx);
          const isHovered = hoveredNode === idx;

          return (
            <motion.div
              key={service.id}
              className={`canvas-node-card ${isHovered ? 'hovered' : ''}`}
              style={{
                left: coords.x,
                top: coords.y,
                transform: 'translate(-50%, -50%)',
                borderColor: service.accentColor || 'var(--border-color)'
              }}
              onMouseEnter={() => setHoveredNode(idx)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedService(service)}
              data-cursor="OPEN"
            >
              <div className="node-num-tag">{idx + 1}</div>
              <span className="node-label-title">{service.title}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Information Panel overlay */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="service-modal-card sketch-card"
              initial={{ scale: 0.9, y: 50, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.9, y: 50, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedService(null)}
                data-cursor="CLOSE"
              >
                <X size={20} />
              </button>

              <span className="modal-category" style={{ backgroundColor: selectedService.accentColor }}>SERVICE DESCRIPTION</span>
              <h3 className="modal-title">{selectedService.title}</h3>
              <p className="modal-desc">{selectedService.description}</p>
              
              <div className="modal-details-container">
                <h4>DELIVERABLES & SCOPE</h4>
                <ul className="modal-details-list">
                  {selectedService.details?.map((detail, dIdx) => (
                    <li key={dIdx} className="detail-item">
                      <span className="check-bullet"><Check size={14} /></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .services-section {
          background-color: var(--bg-cream);
        }

        .services-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .services-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .services-desc {
          font-size: 1rem;
          color: var(--text-muted);
          margin-top: 10px;
        }

        /* Canvas Arena */
        .canvas-container {
          position: relative;
          height: 60vh;
          min-height: 480px;
          width: 100%;
          overflow: hidden;
          background-color: var(--bg-paper);
          box-shadow: 6px 6px 0px var(--border-color);
          cursor: crosshair;
        }

        .canvas-svg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* Floating Cards */
        .canvas-node-card {
          position: absolute;
          z-index: 2;
          background: var(--bg-cream);
          border: var(--border-sketch);
          border-radius: 20px 8px 20px 8px/8px 20px 8px 20px;
          padding: 0.8rem 1.4rem;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 4px 4px 0px var(--border-color);
          cursor: pointer;
          user-select: none;
          will-change: left, top;
          transition: transform 0.1s ease-out, box-shadow 0.2s, background-color 0.2s;
        }

        .canvas-node-card:hover {
          background-color: var(--accent-yellow);
          box-shadow: 6px 6px 0px var(--border-color);
          transform: translate(-50%, -50%) scale(1.08) !important;
        }

        .node-num-tag {
          font-family: var(--font-mono);
          font-weight: bold;
          font-size: 0.75rem;
          background: var(--accent-coral);
          color: var(--bg-cream);
          border-radius: 4px;
          padding: 2px 6px;
          border: 1px solid var(--border-color);
        }

        .node-label-title {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.2px;
        }

        /* Mobile fallback positioning (stacked) */
        @media (max-width: 768px) {
          .canvas-container {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 2rem 1.5rem;
            overflow: visible;
          }
          .canvas-svg-overlay {
            display: none;
          }
          .canvas-node-card {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            width: 100%;
            justify-content: center;
          }
          .canvas-node-card:hover {
            transform: scale(1.02) !important;
          }
        }

        /* Detail Modal */
        .service-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(35, 33, 32, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
        }

        .service-modal-card {
          width: 100%;
          max-width: 520px;
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.2rem;
          right: 1.2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-charcoal);
        }

        .modal-close-btn:hover {
          color: var(--accent-coral);
        }

        .modal-category {
          font-family: var(--font-mono);
          font-weight: bold;
          font-size: 0.75rem;
          padding: 3px 8px;
          border: var(--border-sketch);
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 2.2rem;
          font-family: var(--font-serif);
          font-weight: 900;
          margin-bottom: 1rem;
        }

        .modal-desc {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
        }

        .modal-details-container h4 {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .modal-details-list {
          list-style: none;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-charcoal);
        }

        .check-bullet {
          color: var(--accent-green);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(30, 70, 32, 0.08);
          border: 1px solid rgba(30, 70, 32, 0.15);
        }
      `}</style>
    </section>
  );
}
