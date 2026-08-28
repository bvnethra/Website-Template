import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { experienceData } from '../data/experience';
import './Experience.css';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="section-tag">Career Journey</div>
          <h2 className="section-title">
            Professional <span className="text-accent">Experience</span>
          </h2>
        </motion.div>

        {/* Vertical Timeline */}
        <div className="timeline-container">
          {/* Vertical Connecting Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="timeline-vertical-line"
          />

          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
            >
              {/* Timeline Dot Indicator */}
              <div className="timeline-dot-wrapper">
                <div className="timeline-dot" />
                <div className="timeline-dot-pulse" />
              </div>

              {/* Timeline Content Card */}
              <div className="glass-card timeline-card">
                <div className="timeline-card-header">
                  <span className="timeline-period-badge">
                    <Calendar size={13} />
                    {item.period}
                  </span>
                  <span className="timeline-location">
                    <MapPin size={13} />
                    {item.location}
                  </span>
                </div>

                <h3 className="timeline-role">{item.role}</h3>
                <h4 className="timeline-company">{item.company}</h4>
                <p className="timeline-description">{item.description}</p>

                <div className="timeline-skills">
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="timeline-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
