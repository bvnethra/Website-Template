import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Eye } from 'lucide-react';
import { projectsData, filterCategories } from '../data/projects';
import ProjectModal from './ProjectModal';
import './Portfolio.css';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="section portfolio-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header portfolio-header-row"
        >
          <div>
            <div className="section-tag">Featured Works</div>
            <h2 className="section-title">
              Selected <span className="text-accent">Portfolio</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills-row">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div
                    layoutId="filterActiveBackground"
                    className="filter-active-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45 }}
                className="glass-card project-card"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-container">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-number-tag">{project.number}</div>

                  {/* Dark Hover Overlay */}
                  <div className="project-overlay">
                    <div className="project-overlay-content">
                      <span className="project-category-badge">{project.category}</span>
                      <h3 className="project-overlay-title">{project.title}</h3>
                      <p className="project-overlay-subtitle">{project.subtitle}</p>

                      <div className="project-action-btn">
                        <span>View Project</span>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info on card */}
                <div className="project-card-info">
                  <div>
                    <h3 className="project-card-title">{project.title}</h3>
                    <span className="project-card-subtitle">{project.subtitle}</span>
                  </div>
                  <button className="project-card-arrow-btn" aria-label={`View ${project.title}`}>
                    <Eye size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
