import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle2 } from 'lucide-react';

export default function FloatingMetric({ position = 'inline' }) {
  const isInline = position === 'inline';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="floating-anim floating-metric-badge"
      style={{
        position: isInline ? 'relative' : 'absolute',
        top: !isInline ? '-24px' : 'auto',
        right: !isInline ? '24px' : 'auto',
        zIndex: 25,
        background: '#FFFFFF',
        border: '1px solid rgba(217, 155, 0, 0.4)',
        borderRadius: '16px',
        padding: '10px 18px',
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08), 0 0 20px rgba(217, 155, 0, 0.2)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        margin: isInline ? '0 0 0 8px' : '0'
      }}
    >
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(217, 155, 0, 0.2) 0%, rgba(255, 197, 46, 0.1) 100%)',
        border: '1px solid rgba(217, 155, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent)',
        flexShrink: 0
      }}>
        <TrendingUp size={18} />
      </div>

      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', lineHeight: 1.1 }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '18px',
            fontWeight: '800',
            color: 'var(--accent)',
            letterSpacing: '-0.02em'
          }}>
            94%
          </span>
          <CheckCircle2 size={13} color="var(--accent)" />
        </div>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginTop: '2px'
        }}>
          Workflow Efficiency
        </div>
      </div>
    </motion.div>
  );
}
