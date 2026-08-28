import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

export default function Experiments() {
  const containerRef = useRef(null);
  
  // Manage state for random positioning key changes to trigger entry animation on rearrange
  const [positions, setPositions] = useState({
    circle: { x: 50, y: 80 },
    star: { x: 260, y: 40 },
    arrow: { x: 480, y: 150 },
    blob: { x: 120, y: 220 },
    cube: { x: 650, y: 70 },
    card: { x: 380, y: 240 }
  });

  const handleRearrange = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width - 150;
    const maxY = rect.height - 150;

    setPositions({
      circle: { x: Math.random() * maxX, y: Math.random() * maxY },
      star: { x: Math.random() * maxX, y: Math.random() * maxY },
      arrow: { x: Math.random() * maxX, y: Math.random() * maxY },
      blob: { x: Math.random() * maxX, y: Math.random() * maxY },
      cube: { x: Math.random() * maxX, y: Math.random() * maxY },
      card: { x: Math.random() * maxX, y: Math.random() * maxY }
    });
  };

  // State to deform blob on hover
  const [blobRadius, setBlobRadius] = useState("30% 70% 70% 30% / 30% 30% 70% 70%");
  const handleBlobHover = () => {
    setBlobRadius("60% 40% 30% 70% / 60% 30% 70% 40%");
  };
  const handleBlobLeave = () => {
    setBlobRadius("30% 70% 70% 30% / 30% 30% 70% 70%");
  };

  // State for scale changes on click
  const [starScale, setStarScale] = useState(1);
  const [arrowRotate, setArrowRotate] = useState(0);
  const [cubeRotate, setCubeRotate] = useState(0);

  return (
    <section id="experiments" className="section experiments-section">
      <div className="experiments-header">
        <span className="experiments-sup">INTERACTIVE PLAYGROUND</span>
        <h2 className="experiments-heading">TRY SOMETHING.</h2>
        <p className="experiments-desc">
          Drag objects around. Click shapes to spin or scale. Hover to warp the liquid blob.
        </p>
        <button 
          onClick={handleRearrange}
          className="btn-editorial rearrange-btn"
          data-cursor="OPEN"
        >
          REARRANGE OBJECTS <RefreshCw size={16} />
        </button>
      </div>

      {/* Physics Sandbox Arena */}
      <div ref={containerRef} className="sandbox-arena organic-card-1">
        
        {/* Object 1: DRAGGABLE CIRCLE */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
          className="sandbox-item circle-item"
          style={{ left: positions.circle.x, top: positions.circle.y }}
          data-cursor="DRAG"
          whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
        >
          <span>PULL</span>
        </motion.div>

        {/* Object 2: DRAGGABLE STAR */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          className="sandbox-item star-item"
          style={{ left: positions.star.x, top: positions.star.y }}
          data-cursor="DRAG"
          animate={{ scale: starScale }}
          whileDrag={{ cursor: 'grabbing' }}
          onClick={() => setStarScale(prev => prev === 1 ? 1.4 : 1)}
        >
          <svg viewBox="0 0 100 100" className="star-svg-exp">
            <path d="M50,5 L64,36 L98,36 L70,55 L81,88 L50,68 L19,88 L30,55 L2,36 L36,36 Z" fill="#FFE885" stroke="#232120" strokeWidth="3" />
          </svg>
        </motion.div>

        {/* Object 3: DRAGGABLE ARROW */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          className="sandbox-item arrow-item"
          style={{ left: positions.arrow.x, top: positions.arrow.y }}
          data-cursor="DRAG"
          animate={{ rotate: arrowRotate }}
          whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
          onClick={() => setArrowRotate(prev => prev + 90)}
        >
          <svg viewBox="0 0 100 100" className="arrow-svg-exp">
            <line x1="10" y1="50" x2="90" y2="50" stroke="#FF5F38" strokeWidth="8" strokeLinecap="round" />
            <polyline points="60,20 90,50 60,80" fill="none" stroke="#FF5F38" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Object 4: DEFORMABLE BLOB */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.15}
          className="sandbox-item blob-item"
          style={{ 
            left: positions.blob.x, 
            top: positions.blob.y,
            borderRadius: blobRadius
          }}
          data-cursor="DRAG"
          onMouseEnter={handleBlobHover}
          onMouseLeave={handleBlobLeave}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <span>WARP</span>
        </motion.div>

        {/* Object 5: WIREFRAME CUBE */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          className="sandbox-item cube-item"
          style={{ left: positions.cube.x, top: positions.cube.y }}
          data-cursor="DRAG"
          animate={{ rotateY: cubeRotate, rotateX: cubeRotate }}
          onClick={() => setCubeRotate(prev => prev + 45)}
          whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="cube-wire">
            <div className="cube-face face-front">C</div>
            <div className="cube-face face-back"></div>
            <div className="cube-face face-right">S</div>
            <div className="cube-face face-left"></div>
          </div>
        </motion.div>

        {/* Object 6: EDITORIAL CARD */}
        <motion.div
          drag
          dragConstraints={containerRef}
          dragElastic={0.1}
          className="sandbox-item card-item sketch-card"
          style={{ left: positions.card.x, top: positions.card.y }}
          data-cursor="DRAG"
          whileDrag={{ scale: 1.05, rotate: -2, cursor: 'grabbing' }}
        >
          <div className="card-texture"></div>
          <span className="card-tag-exp">NOTE</span>
          <p className="card-text-exp">TACTILE LAYOUT</p>
        </motion.div>

      </div>

      <style>{`
        .experiments-section {
          background-color: var(--bg-cream);
        }

        .experiments-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .experiments-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .experiments-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .experiments-desc {
          font-size: 1rem;
          color: var(--text-muted);
          margin: 10px 0 20px 0;
        }

        .rearrange-btn {
          margin-top: 5px;
        }

        /* Sandbox Arena */
        .sandbox-arena {
          position: relative;
          height: 60vh;
          min-height: 480px;
          width: 100%;
          background-color: var(--bg-paper);
          box-shadow: 6px 6px 0px var(--border-color);
          overflow: hidden;
          touch-action: none;
        }

        /* Draggable Items */
        .sandbox-item {
          position: absolute;
          cursor: grab;
          z-index: 10;
          user-select: none;
        }

        /* Circle */
        .circle-item {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--accent-yellow);
          border: var(--border-sketch);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: 0.8rem;
          box-shadow: 4px 4px 0px var(--border-color);
        }

        /* Star */
        .star-item {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .star-svg-exp {
          width: 100%;
          height: 100%;
          filter: drop-shadow(4px 4px 0px var(--border-color));
        }

        /* Arrow */
        .arrow-item {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-svg-exp {
          width: 100%;
          height: 100%;
          filter: drop-shadow(3px 3px 0px var(--border-color));
        }

        /* Blob */
        .blob-item {
          width: 110px;
          height: 110px;
          background: var(--accent-coral);
          border: var(--border-sketch);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: 0.9rem;
          color: var(--bg-cream);
          box-shadow: 4px 4px 0px var(--border-color);
        }

        /* Cube Wire */
        .cube-item {
          width: 80px;
          height: 80px;
          perspective: 600px;
        }

        .cube-wire {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s;
        }

        .cube-face {
          position: absolute;
          width: 80px;
          height: 80px;
          border: var(--border-sketch);
          background: rgba(30, 70, 32, 0.1);
          color: var(--accent-green);
          font-weight: 900;
          font-family: var(--font-sans);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }

        .face-front { transform: rotateY(0deg) translateZ(40px); }
        .face-back  { transform: rotateY(180deg) translateZ(40px); }
        .face-right { transform: rotateY(90deg) translateZ(40px); }
        .face-left  { transform: rotateY(-90deg) translateZ(40px); }

        /* Card Item */
        .card-item {
          width: 140px;
          padding: 1.2rem;
          text-align: center;
          cursor: grab;
          border-radius: 8px;
        }

        .card-tag-exp {
          font-family: var(--font-mono);
          font-size: 9px;
          border: var(--border-sketch);
          border-radius: 4px;
          padding: 1px 4px;
          background: var(--accent-yellow);
        }

        .card-text-exp {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.95rem;
          margin-top: 10px;
          color: var(--text-charcoal);
        }
      `}</style>
    </section>
  );
}
