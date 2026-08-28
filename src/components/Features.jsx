import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '../data/features';
import FeatureCard from './FeatureCard';

export default function Features({ onOpenDemo }) {
  return (
    <section id="platform" className="section-padding">
      <div className="section-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 64px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '16px' }}
          >
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Core Capabilities</span>
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: '800',
              marginBottom: '20px'
            }}
          >
            Everything connected. <br />
            <span className="text-gold-gradient">Nothing complicated.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            Aurevyn replaces fragmented tools with a single, intelligent workflow infrastructure built for fast-moving businesses.
          </motion.p>
        </div>

        {/* 6-Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {featuresData.map((feature, idx) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={idx}
              onOpenDemo={onOpenDemo}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
