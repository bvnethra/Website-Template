import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Palette, Zap, Compass, Layers } from 'lucide-react';
import { FigmaIcon } from './SocialIcons';
import { skillsData } from '../data/skills';
import './Skills.css';

const iconMap = {
  Layout,
  Palette,
  Zap,
  Compass,
  Figma: FigmaIcon,
  Layers
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="section-tag">Core Competencies</div>
          <h2 className="section-title">
            Skills & <span className="text-accent">Technical Mastery</span>
          </h2>
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {skillsData.map((skill, index) => {
            const IconComponent = iconMap[skill.iconName] || Layout;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card skill-card"
              >
                <div className="skill-card-top">
                  <div className="skill-icon-container">
                    <IconComponent className="skill-icon" size={24} />
                  </div>
                  <span className="skill-category-badge">{skill.category}</span>
                </div>

                <div className="skill-card-body">
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                </div>

                <div className="skill-card-footer">
                  <div className="skill-progress-info">
                    <span className="skill-progress-label">Proficiency</span>
                    <span className="skill-percentage">{skill.percentage}%</span>
                  </div>
                  <div className="skill-progress-bar-bg">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
                      className="skill-progress-bar-fill"
                    />
                  </div>
                </div>

                <div className="skill-hover-glow" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
