import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { fetchProjects } from '../services/api';
import { fadeIn, staggerContainer } from '../animations/animationVariants';

// 3D Tilt Card Component
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  
  // Create motion values for rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add springs for smooth tracking
  const rotateXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const rotateYSpring = useSpring(y, { damping: 20, stiffness: 150 });
  
  // Transform coordinate displacement into rotation degrees
  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position inside card (-0.5 to 0.5)
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(relativeY); // Rotates on X axis based on Y movement
    y.set(relativeX); // Rotates on Y axis based on X movement
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="glass-panel project-card interactive-card"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      {/* Project Image Container with Tilt */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          borderRadius: '12px',
          overflow: 'hidden',
          transform: 'translateZ(20px)', // Elevate element in 3D space
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={project.imagePath}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="project-img"
        />

        {/* Dynamic Hover Overlay */}
        <div
          className="project-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(4, 8, 20, 0.9) 30%, rgba(4, 8, 20, 0.4) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '20px',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div style={{ transform: 'translateZ(30px)', width: '100%' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    color: '#fff',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Meta Info */}
      <div style={{ padding: '24px 0 0', transform: 'translateZ(10px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.category}
          </span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: 'var(--text-secondary)', hoverColor: '#fff', transition: 'color 0.2s' }}
          >
            <ExternalLink size={18} />
          </a>
        </div>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
          {project.title}
        </h4>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Showcase() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="showcase" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">
          INTERACTIVE <span className="gradient-text">SHOWCASE</span>
        </h2>
        <p className="section-subtitle">
          Tilt and hover over our latest projects to inspect tech stacks and details in real-time.
        </p>

        {/* Categories Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '45px',
          }}
        >
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`glass-panel cat-btn ${activeCategory === cat ? 'active-cat' : ''}`}
              style={{
                padding: '8px 20px',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '9999px',
                background: activeCategory === cat ? 'var(--accent-blue)' : 'rgba(11, 15, 30, 0.4)',
                color: '#fff',
                fontSize: '0.9rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="projects-grid"
          variants={staggerContainer(0.08, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .project-card {
          padding: 20px;
          background: rgba(11, 15, 30, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
        }

        .project-card:hover .project-img {
          transform: scale(1.15);
        }

        .project-card:hover .project-overlay {
          opacity: 1 !important;
        }

        .cat-btn:hover {
          border-color: var(--accent-blue);
        }

        .cat-btn.active-cat {
          box-shadow: 0 4px 15px var(--glow-blue);
          border-color: var(--accent-blue);
        }

        @media (max-width: 991px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 650px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
