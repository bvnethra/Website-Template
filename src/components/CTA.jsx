import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';

export default function CTA({ onOpenDemo }) {
  return (
    <section id="contact" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Animated Gold Aura */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(217, 155, 0, 0.18) 0%, rgba(255, 197, 46, 0.05) 50%, transparent 80%)',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="aurevyn-card"
          style={{
            padding: '70px 40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            borderColor: 'rgba(217, 155, 0, 0.35)',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.1), 0 0 50px rgba(217, 155, 0, 0.2)',
            maxWidth: '960px',
            margin: '0 auto'
          }}
        >
          {/* Badge */}
          <div style={{ marginBottom: '20px', display: 'inline-block' }}>
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Get Started In Minutes</span>
            </span>
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Ready to make work <br />
            <span className="text-gold-gradient gold-glow-text">flow better?</span>
          </h2>

          {/* Supporting Text */}
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '620px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6
          }}>
            Bring your team's ideas, processes, and goals into one smarter workspace. Free forever for core teams.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <button className="btn-primary" onClick={onOpenDemo} style={{ padding: '16px 36px', fontSize: '16px' }}>
              Start Free
              <ArrowRight size={18} />
            </button>

            <button className="btn-secondary" onClick={onOpenDemo} style={{ padding: '16px 32px', fontSize: '16px' }}>
              <MessageSquare size={18} />
              Talk to Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
