import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/projectsData';
import { ProjectModal } from './ProjectModal';
import { MapPin, Calendar, ArrowRight, Search, Sparkles } from 'lucide-react';

export const ProjectsSection = ({ onEnquireProject, onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Upcoming'];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        item.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === 'Upcoming' && item.status.toLowerCase() === 'upcoming');

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tag.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="section-padding" aria-label="Signature Projects Portfolio">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-tag center">PORTFOLIO OF EXCELLENCE</div>
          <h2 className="section-heading-lg">
            OUR SIGNATURE <span className="gold-text">PROJECTS</span>
          </h2>
          <p className="section-subtext mx-auto">
            "Spaces designed with purpose. Structures built to last."
          </p>
        </div>

        {/* Category Filter Pills & Search Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', marginBottom: '3rem' }}>
          <div className="filter-pills-bar" style={{ margin: 0 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search size={16} color="var(--color-text-dim)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by project name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input-lux"
              style={{ paddingLeft: '2.5rem', width: '100%', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xs)' }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>No projects match your filter criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="btn btn-outline-gold"
              style={{ marginTop: '1.25rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '2.5rem' }}>
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card-luxury">
                {/* Visual Thumbnail */}
                <div className="project-img-wrapper">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="project-thumbnail"
                    loading="lazy"
                  />
                  <div className="project-status-badge">
                    {project.status}
                  </div>
                  <div className="project-category-tag">
                    {project.tag}
                  </div>
                </div>

                {/* Information Body */}
                <div className="project-info-body">
                  <div className="project-location-meta">
                    <MapPin size={14} />
                    <span>{project.location} • {project.yearBadge}</span>
                  </div>

                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-desc-snippet">{project.description}</p>

                  {/* Specs Quick Matrix */}
                  <div className="project-specs-mini-grid">
                    <div className="mini-spec-item">
                      <span>Scale</span>
                      <strong>{project.specs.floors}</strong>
                    </div>
                    <div className="mini-spec-item">
                      <span>Area</span>
                      <strong>{project.specs.builtUpArea || project.specs.units}</strong>
                    </div>
                    <div className="mini-spec-item">
                      <span>Land Extent</span>
                      <strong>{project.specs.landArea}</strong>
                    </div>
                    <div className="mini-spec-item">
                      <span>Handover</span>
                      <strong>{project.specs.timeline.split('(')[0]}</strong>
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn-text-arrow"
                    >
                      <span>View Project</span>
                      <span className="arrow">→</span>
                    </button>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-display)' }}>
                      {project.specs.certifications.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEnquire={(projTitle) => {
            setSelectedProject(null);
            onEnquireProject(projTitle);
          }}
          onOpenLightbox={onOpenLightbox}
        />
      )}
    </section>
  );
};
