import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro({ onComplete }) {
  const [text, setText] = useState('');
  const fullText = "WELCOME TO A DIFFERENT KIND OF DIGITAL EXPERIENCE.";
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1200); // Matches page-turn transition duration
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="intro-overlay"
          initial={{ y: 0, rotateY: 0 }}
          exit={{
            y: "-100%",
            rotateY: -90,
            skewY: 6,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            perspective: 2000,
            transformOrigin: "left center"
          }}
        >
          {/* Newspaper Paper Container */}
          <div className="newspaper-wrapper">
            {/* Top Newspaper Header */}
            <div className="newspaper-header">
              <div className="header-meta">
                <span>VOL. I NO. 1</span>
                <span>CREATIVE STUDIO CHRONICLE</span>
                <span>EST. 2026</span>
              </div>
              <h2 className="newspaper-title">THE DAILY CHRONICLE</h2>
              <div className="header-divider"></div>
            </div>

            {/* Main Content Area */}
            <div className="newspaper-body">
              <div className="newspaper-col-left">
                <span className="col-sub">LATEST ISSUE</span>
                <h3>REJECTING THE NEON DIGITAL UTILITY</h3>
                <p>
                  Today we announce a formal departure from the dark dashboard grids and generic templates that have filled our viewports for too long.
                </p>
                <div className="sketch-divider-small"></div>
                <p>
                  By embracing warm cream paper, rich charcoal typography, and tactile interactions, we invite you to read a digital story rather than consume a service.
                </p>
              </div>

              <div className="newspaper-col-main">
                <div className="editorial-statement">
                  <div className="quote-marks">“</div>
                  <h1 className="typed-statement">
                    {text}
                    <span className="blinking-cursor">|</span>
                  </h1>
                </div>

                {isTypingDone && (
                  <motion.div 
                    className="action-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button 
                      onClick={handleEnter} 
                      className="btn-editorial"
                      data-cursor="OPEN"
                    >
                      ENTER EXPERIENCE →
                    </button>
                  </motion.div>
                )}
              </div>

              <div className="newspaper-col-right">
                <span className="col-sub">INTERACTIVE MEDIA</span>
                <h3>TACTILE WEB CRAFTSMANSHIP</h3>
                <div className="sketch-shape-box">
                  {/* Decorative sketch SVG star */}
                  <svg viewBox="0 0 100 100" className="sketch-star">
                    <path 
                      d="M50,10 L62,38 L92,38 L68,56 L77,86 L50,68 L23,86 L32,56 L8,38 L38,38 Z" 
                      fill="none" 
                      stroke="#232120" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p>
                  Every click is accompanied by a custom micro-interaction. Explore the circular process, rearrange physics objects, and fold messages.
                </p>
              </div>
            </div>
          </div>

          {/* Newspaper Styling styling embedded inside component */}
          <style>{`
            .newspaper-wrapper {
              width: 90%;
              max-width: 1200px;
              border: 1px solid var(--border-color);
              padding: 2.5rem;
              background-color: var(--bg-paper);
              box-shadow: 10px 10px 0px rgba(0,0,0,0.05);
              transform: rotate(-0.5deg);
              position: relative;
            }
            .newspaper-wrapper::before {
              content: '';
              position: absolute;
              top: 4px; left: 4px; right: 4px; bottom: 4px;
              border: 1px solid var(--border-color);
              pointer-events: none;
            }
            .newspaper-header {
              text-align: center;
              margin-bottom: 2rem;
            }
            .header-meta {
              display: flex;
              justify-content: space-between;
              font-family: var(--font-mono);
              font-size: 11px;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .newspaper-title {
              font-size: 3.5rem;
              font-family: var(--font-serif);
              letter-spacing: -2px;
              font-weight: 900;
              margin: 10px 0;
              text-transform: uppercase;
            }
            .header-divider {
              height: 4px;
              border-top: var(--border-sketch);
              border-bottom: 1px solid var(--border-color);
              margin-top: 10px;
            }
            .newspaper-body {
              display: grid;
              grid-template-columns: 1fr 2fr 1fr;
              gap: 2rem;
            }
            @media (max-width: 991px) {
              .newspaper-body {
                grid-template-columns: 1fr;
              }
              .newspaper-col-left, .newspaper-col-right {
                display: none;
              }
              .newspaper-title {
                font-size: 2.2rem;
              }
            }
            .col-sub {
              font-family: var(--font-mono);
              font-size: 10px;
              background: var(--accent-yellow);
              padding: 2px 6px;
              border: var(--border-sketch);
              border-radius: 4px;
              display: inline-block;
              margin-bottom: 12px;
            }
            .newspaper-col-left h3, .newspaper-col-right h3 {
              font-size: 1.2rem;
              font-weight: 700;
              margin-bottom: 12px;
              font-family: var(--font-serif);
            }
            .newspaper-col-left p, .newspaper-col-right p {
              font-size: 0.9rem;
              color: var(--text-muted);
            }
            .sketch-divider-small {
              height: 1px;
              background: var(--border-color);
              margin: 15px 0;
            }
            .newspaper-col-main {
              border-left: 1px solid var(--border-color);
              border-right: 1px solid var(--border-color);
              padding: 0 1.5rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-height: 350px;
            }
            @media (max-width: 991px) {
              .newspaper-col-main {
                border: none;
                padding: 0;
                min-height: auto;
              }
            }
            .editorial-statement {
              position: relative;
              padding-top: 1.5rem;
            }
            .quote-marks {
              position: absolute;
              top: -30px;
              left: -10px;
              font-size: 8rem;
              font-family: var(--font-serif);
              color: rgba(255, 95, 56, 0.12);
              pointer-events: none;
            }
            .typed-statement {
              font-size: 2.2rem;
              font-family: var(--font-serif);
              line-height: 1.2;
              color: var(--text-charcoal);
              position: relative;
              font-weight: 900;
            }
            @media (max-width: 600px) {
              .typed-statement {
                font-size: 1.6rem;
              }
            }
            .blinking-cursor {
              animation: blink 0.8s infinite;
              color: var(--accent-coral);
            }
            @keyframes blink {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            .action-container {
              text-align: center;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            .sketch-shape-box {
              width: 80px;
              height: 80px;
              margin: 15px auto;
            }
            .sketch-star {
              width: 100%;
              height: 100%;
              animation: spin-slow 15s linear infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
