import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers, Zap } from 'lucide-react';

function CounterNumber({ target, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseFloat(target);
    const totalSteps = 50;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  const displayVal = Number.isInteger(target) ? Math.floor(count) : count.toFixed(0);

  return (
    <span ref={ref}>
      {displayVal}
      {suffix}
    </span>
  );
}

export default function About() {
  const stats = [
    { number: 12, suffix: 'K+', label: 'Active Workflows', sub: 'Executed daily with zero downtime' },
    { number: 94, suffix: '%', label: 'Automation Accuracy', sub: 'Zero-touch error reduction' },
    { number: 38, suffix: '%', label: 'Average Time Saved', sub: 'Reclaimed weekly operational hours' },
  ];

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--background-secondary)' }}>
      <div className="section-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '16px' }}
          >
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Operational Clarity</span>
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
            Built for the way <span className="text-gold-gradient">teams work now.</span>
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
            Aurevyn gives teams a clearer way to plan, automate, measure, and improve the work that keeps their business moving.
          </motion.p>
        </div>

        {/* 3 Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="aurevyn-card"
              style={{
                padding: '36px 30px',
                textAlign: 'center',
                background: '#FFFFFF'
              }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(48px, 5vw, 64px)',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                marginBottom: '10px',
                lineHeight: 1
              }} className="text-gold-gradient gold-glow-text">
                <CounterNumber target={stat.number} suffix={stat.suffix} />
              </div>

              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}>
                {stat.label}
              </div>

              <div style={{
                fontSize: '14px',
                color: 'var(--text-secondary)'
              }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner / Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="aurevyn-card"
          style={{
            padding: '40px',
            background: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(217, 155, 0, 0.1)',
              border: '1px solid rgba(217, 155, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              flexShrink: 0
            }}>
              <Layers size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Single Source of Truth</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Consolidate tool silos into a single interactive view where all tasks, status feeds, and team metrics update live.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(217, 155, 0, 0.1)',
              border: '1px solid rgba(217, 155, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              flexShrink: 0
            }}>
              <Zap size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '6px' }}>Zero Friction Handoffs</h4>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Automate task transitions between design, engineering, sales, and operations without dropping context or momentum.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
