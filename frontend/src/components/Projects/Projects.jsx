import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects } from '../../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then((data) => setProjects(data));
  }, []);

  // Helper to render project-specific illustrations
  const renderIllustration = (imageId) => {
    switch (imageId) {
      case 'urban':
        return (
          <svg viewBox="0 0 400 300" className="project-svg">
            <rect width="100%" height="100%" fill="#FCF9F2" />
            <line x1="50" y1="0" x2="50" y2="300" stroke="#232120" strokeWidth="1" />
            <line x1="350" y1="0" x2="350" y2="300" stroke="#232120" strokeWidth="1" />
            {/* Skyscrapers */}
            <rect x="90" y="100" width="60" height="200" fill="none" stroke="#232120" strokeWidth="2.5" />
            <rect x="170" y="60" width="70" height="240" fill="#FF5F38" stroke="#232120" strokeWidth="2.5" />
            <rect x="260" y="140" width="60" height="160" fill="none" stroke="#232120" strokeWidth="2.5" />
            {/* Windows */}
            <circle cx="120" cy="130" r="4" fill="#232120" />
            <circle cx="120" cy="160" r="4" fill="#232120" />
            <circle cx="205" cy="100" r="4" fill="#FCF9F2" />
            <circle cx="205" cy="140" r="4" fill="#FCF9F2" />
            <circle cx="290" cy="180" r="4" fill="#232120" />
            {/* Sun */}
            <circle cx="300" cy="80" r="25" fill="#FFE885" stroke="#232120" strokeWidth="2" />
          </svg>
        );
      case 'classroom':
        return (
          <svg viewBox="0 0 400 300" className="project-svg">
            <rect width="100%" height="100%" fill="#FCF9F2" />
            {/* Chalkboard lines & math formula sketches */}
            <circle cx="200" cy="150" r="80" fill="none" stroke="#232120" strokeWidth="2" strokeDasharray="6 6" />
            <line x1="200" y1="150" x2="280" y2="150" stroke="#FF5F38" strokeWidth="2.5" />
            <circle cx="200" cy="150" r="5" fill="#232120" />
            <text x="210" y="140" fontFamily="var(--font-mono)" fontSize="14" fill="#232120">r = 10px</text>
            <text x="200" y="270" fontFamily="var(--font-serif)" fontSize="18" fontStyle="italic" textAnchor="middle" fill="#1E4620">F = m × a</text>
            {/* Geometry shapes */}
            <polygon points="60,60 120,60 90,120" fill="#FFE885" stroke="#232120" strokeWidth="2" />
          </svg>
        );
      case 'motion':
        return (
          <svg viewBox="0 0 400 300" className="project-svg">
            <rect width="100%" height="100%" fill="#FCF9F2" />
            {/* Audio Waves */}
            <path d="M 50,150 Q 100,50 150,150 T 250,150 T 350,150" fill="none" stroke="#1E4620" strokeWidth="3" strokeLinecap="round" />
            <path d="M 50,150 Q 100,100 150,150 T 250,150 T 350,150" fill="none" stroke="#232120" strokeWidth="1" strokeDasharray="4 4" />
            {/* Generative particles */}
            <circle cx="100" cy="98" r="6" fill="#FF5F38" stroke="#232120" strokeWidth="1.5" />
            <circle cx="200" cy="150" r="8" fill="#FFE885" stroke="#232120" strokeWidth="1.5" />
            <circle cx="300" cy="202" r="5" fill="#232120" />
          </svg>
        );
      case 'playground':
      default:
        return (
          <svg viewBox="0 0 400 300" className="project-svg">
            <rect width="100%" height="100%" fill="#FCF9F2" />
            {/* Grid structure and stars */}
            <rect x="50" y="50" width="120" height="90" fill="none" stroke="#232120" strokeWidth="2" strokeDasharray="5 5" />
            <rect x="230" y="160" width="120" height="90" fill="#FFE885" stroke="#232120" strokeWidth="2" />
            <circle cx="110" cy="200" r="30" fill="#FF5F38" stroke="#232120" strokeWidth="2" />
            {/* Handdrawn line connections */}
            <path d="M 110,170 Q 170,120 230,195" fill="none" stroke="#232120" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="projects-header">
        <span className="projects-sup">SELECTED WORK</span>
        <h2 className="projects-heading">CASE STUDIES</h2>
        <div className="sketch-divider-wave"></div>
      </div>

      <div className="projects-vertical-gallery">
        {projects.map((project, idx) => {
          return (
            <div key={project.id} className="project-fullscreen-card">
              <div className="project-card-grid">
                
                {/* Text Metadata Details Column */}
                <div className="project-details-col">
                  <div className="project-meta-top">
                    <span className="project-index">0{idx + 1}</span>
                    <span className="project-client">{project.client}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category-tag" style={{ borderBottom: `2.5px solid ${project.color}` }}>
                    {project.category}
                  </span>

                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-footer-meta">
                    <span>Year: {project.year}</span>
                    <span>Role: Creative Direction & Code</span>
                  </div>
                </div>

                {/* Animated Image/Illustration Column */}
                <div className="project-image-col">
                  <motion.div
                    className="project-image-container"
                    initial={{ 
                      clipPath: "polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)",
                      scale: 0.95
                    }}
                    whileInView={{ 
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      scale: 1
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
                    data-cursor="VIEW"
                  >
                    {renderIllustration(project.imageUrl)}
                  </motion.div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .projects-section {
          background-color: var(--bg-cream);
        }

        .projects-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .projects-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .projects-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .projects-vertical-gallery {
          display: flex;
          flex-direction: column;
          gap: 12vh;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .project-fullscreen-card {
          min-height: 70vh;
          border: var(--border-sketch);
          background-color: var(--bg-paper);
          border-radius: 16px;
          box-shadow: 6px 6px 0px var(--border-color);
          padding: 3rem;
          display: flex;
          align-items: center;
        }

        .project-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          width: 100%;
          align-items: center;
        }

        @media (max-width: 900px) {
          .project-card-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .project-fullscreen-card {
            padding: 1.5rem;
          }
        }

        .project-details-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .project-index {
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--accent-coral);
        }

        .project-client {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .project-title {
          font-size: clamp(2.2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          line-height: 1;
          margin-bottom: 10px;
          font-family: var(--font-serif);
        }

        .project-category-tag {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: bold;
          align-self: flex-start;
          padding-bottom: 4px;
          margin-bottom: 1.5rem;
        }

        .project-description {
          font-size: 1.05rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .project-footer-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid rgba(35, 33, 32, 0.1);
          padding-top: 1rem;
        }

        /* Image Mask container */
        .project-image-col {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .project-image-container {
          width: 100%;
          max-width: 440px;
          border: var(--border-sketch);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 4px 4px 0px var(--border-color);
          background-color: var(--bg-cream);
        }

        .project-svg {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </section>
  );
}
