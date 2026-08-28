import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, User, Tag, CheckCircle } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="glass-card modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header Bar */}
          <div className="modal-header-bar">
            <div className="modal-category-tag">
              <Tag size={14} />
              <span>{project.category}</span>
            </div>

            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close Project Details Modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="modal-scroll-content">
            {/* Project Image Banner */}
            <div className="modal-image-wrapper">
              <img
                src={project.image}
                alt={project.title}
                className="modal-banner-img"
              />
              <div className="modal-image-badge">{project.number}</div>
            </div>

            {/* Title & Client Metadata */}
            <div className="modal-body-content">
              <div className="modal-title-row">
                <div>
                  <h2 className="modal-project-title">{project.title}</h2>
                  <p className="modal-project-subtitle">{project.subtitle}</p>
                </div>

                <a
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary modal-live-btn"
                  onClick={(e) => e.preventDefault()}
                >
                  Live Preview
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Meta Stats Grid */}
              <div className="modal-meta-grid">
                <div className="meta-item">
                  <span className="meta-label"><User size={14} /> Client</span>
                  <span className="meta-value">{project.client}</span>
                </div>

                <div className="meta-item">
                  <span className="meta-label"><Calendar size={14} /> Year</span>
                  <span className="meta-value">{project.year}</span>
                </div>

                <div className="meta-item">
                  <span className="meta-label"><Tag size={14} /> Category</span>
                  <span className="meta-value">{project.category}</span>
                </div>
              </div>

              {/* Description */}
              <div className="modal-section-block">
                <h3 className="modal-section-heading">Overview</h3>
                <p className="modal-description-text">{project.description}</p>
              </div>

              {/* Services Provided */}
              {project.services && (
                <div className="modal-section-block">
                  <h3 className="modal-section-heading">Services & Deliverables</h3>
                  <div className="modal-services-tags">
                    {project.services.map((service, index) => (
                      <span key={index} className="modal-service-pill">
                        <CheckCircle size={14} className="service-pill-icon" />
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer-bar">
            <button onClick={onClose} className="btn-secondary modal-footer-close">
              Close Project
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
