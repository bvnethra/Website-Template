import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Monitor, Activity, Eye, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../data/services';
import './Services.css';

const iconMap = {
  Sparkles,
  Monitor,
  Activity,
  Eye
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="section-tag">Services Offered</div>
          <h2 className="section-title">
            What I can <span className="text-accent">create for you</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="glass-card service-card"
              >
                <div className="service-card-header">
                  <span className="service-number">{service.number}</span>
                  <div className="service-icon-box">
                    <IconComponent size={22} />
                  </div>
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-features-list">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="service-feature-item">
                      <CheckCircle2 size={14} className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="service-bottom-border" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
