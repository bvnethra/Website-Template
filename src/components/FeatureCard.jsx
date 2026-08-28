import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Zap, 
  TrendingUp, 
  Users, 
  LayoutGrid, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  BrainCircuit,
  Zap,
  TrendingUp,
  Users,
  LayoutGrid,
  ShieldCheck
};

export default function FeatureCard({ feature, index, onOpenDemo }) {
  const IconComponent = iconMap[feature.iconName] || BrainCircuit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="aurevyn-card"
      onClick={onOpenDemo}
      style={{
        padding: '36px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%',
        background: '#FFFFFF'
      }}
    >
      <div>
        {/* Card Header: Number & Icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            fontWeight: '800',
            color: 'var(--accent)',
            opacity: 0.9,
            letterSpacing: '-0.02em'
          }}>
            {feature.id}
          </span>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'rgba(217, 155, 0, 0.12)',
              border: '1px solid rgba(217, 155, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)'
            }}
          >
            <IconComponent size={22} />
          </motion.div>
        </div>

        {/* Tag */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--accent)',
            background: 'rgba(217, 155, 0, 0.1)',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid rgba(217, 155, 0, 0.25)'
          }}>
            {feature.tag}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '22px',
          fontWeight: '700',
          marginBottom: '12px',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em'
        }}>
          {feature.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          marginBottom: '28px'
        }}>
          {feature.description}
        </p>
      </div>

      {/* Footer Link Arrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: '700',
        color: 'var(--accent)',
        marginTop: 'auto'
      }}>
        <span>Explore Feature</span>
        <motion.div
          className="feature-arrow"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}
