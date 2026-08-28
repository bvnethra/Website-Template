import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onReset }) {
  const handleBackToBeginning = () => {
    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Reset parent application state to trigger entry intro transition
    onReset();
  };

  return (
    <footer className="footer-section-container">
      
      {/* Decorative hand-drawn SVG line drawing */}
      <div className="footer-divider-sketch">
        <svg viewBox="0 0 1200 40" className="sketch-line-svg">
          <path 
            d="M 10,20 Q 300,10 600,25 T 1190,15" 
            fill="none" 
            stroke="#232120" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      <div className="footer-body-grid">
        
        {/* Brand details */}
        <div className="footer-col-brand">
          <h2 className="footer-logo">CREATIVE STUDIO</h2>
          <p className="footer-tagline">Rejecting neon spaces since 2026.</p>
          <span className="footer-copyright">© 2026 Creative Studio. No Database. REST API.</span>
        </div>

        {/* Links */}
        <div className="footer-col-links">
          <h4>EXPLORE</h4>
          <ul className="footer-links-list">
            <li><a href="#hero">01 HOME</a></li>
            <li><a href="#story">02 STORY</a></li>
            <li><a href="#services">03 SERVICES</a></li>
            <li><a href="#projects">05 WORK</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="footer-col-contact">
          <h4>CONNECT</h4>
          <ul className="footer-links-list">
            <li><a href="mailto:hello@creativestudio.com">hello@creativestudio.com</a></li>
            <li><a href="#" target="_blank">Instagram <ArrowUpRight size={12} style={{ display: 'inline' }} /></a></li>
            <li><a href="#" target="_blank">Twitter <ArrowUpRight size={12} style={{ display: 'inline' }} /></a></li>
            <li><a href="#" target="_blank">LinkedIn <ArrowUpRight size={12} style={{ display: 'inline' }} /></a></li>
          </ul>
        </div>

        {/* Back to top prompt */}
        <div className="footer-col-reset">
          <button 
            onClick={handleBackToBeginning} 
            className="btn-editorial back-beginning-btn"
            data-cursor="OPEN"
          >
            BACK TO BEGINNING
          </button>
        </div>

      </div>

      <style>{`
        .footer-section-container {
          background-color: var(--bg-paper);
          border-top: var(--border-sketch);
          padding: 3rem 6vw;
          width: 100%;
          position: relative;
        }

        .footer-divider-sketch {
          width: 100%;
          height: 40px;
          margin-bottom: 2rem;
        }

        .sketch-line-svg {
          width: 100%;
          height: 100%;
        }

        .footer-body-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        @media (max-width: 900px) {
          .footer-body-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .footer-col-brand {
            grid-column: span 2;
          }
          .footer-col-reset {
            grid-column: span 2;
            text-align: center;
          }
        }

        @media (max-width: 500px) {
          .footer-body-grid {
            grid-template-columns: 1fr;
          }
          .footer-col-brand, .footer-col-reset {
            grid-column: span 1;
          }
        }

        .footer-logo {
          font-family: var(--font-serif);
          font-weight: 900;
          font-size: 1.8rem;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .footer-copyright {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .footer-body-grid h4 {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 0.85rem;
          margin-bottom: 1.2rem;
          letter-spacing: 0.5px;
          color: var(--text-charcoal);
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links-list a {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .footer-links-list a:hover {
          color: var(--accent-coral);
          text-decoration: underline;
        }

        .footer-col-reset {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        @media (max-width: 900px) {
          .footer-col-reset {
            justify-content: center;
          }
        }

        .back-beginning-btn {
          background-color: var(--accent-green);
        }

        .back-beginning-btn:hover {
          color: var(--accent-green);
        }
      `}</style>
    </footer>
  );
}
