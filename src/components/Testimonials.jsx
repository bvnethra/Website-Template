import React from 'react';
import { motion } from 'framer-motion';
import { testimonialsData } from '../data/testimonials';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding">
      <div className="section-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '16px' }}
          >
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Customer Success</span>
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
            Teams are <span className="text-gold-gradient">moving differently.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: '18px',
              color: 'var(--text-secondary)'
            }}
          >
            Discover how operations teams, product leaders, and founders achieve clarity with Aurevyn.
          </motion.p>
        </div>

        {/* 3 Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {testimonialsData.map((item, idx) => {
            const isCenter = idx === 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="aurevyn-card"
                style={{
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  borderColor: isCenter ? 'rgba(217, 155, 0, 0.4)' : 'var(--border)',
                  boxShadow: isCenter ? '0 20px 45px -10px rgba(15, 23, 42, 0.1), 0 0 30px -5px rgba(217, 155, 0, 0.2)' : '0 4px 20px rgba(0,0,0,0.03)'
                }}
              >
                <div>
                  {/* Top Bar: Stars & Quote Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
                      ))}
                    </div>

                    <Quote size={24} color="var(--accent)" opacity={0.4} />
                  </div>

                  {/* Quote Body */}
                  <p style={{
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: 'var(--text-primary)',
                    fontStyle: 'italic',
                    marginBottom: '28px'
                  }}>
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)'
                }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--accent)'
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {item.role} • <span style={{ color: 'var(--accent)', fontWeight: '600' }}>{item.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
