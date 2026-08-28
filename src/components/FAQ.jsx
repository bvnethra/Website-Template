import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqData } from '../data/faq';
import { Plus, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="section-padding" style={{ background: 'var(--background-secondary)' }}>
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
              <span>Questions & Answers</span>
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
            Frequently Asked <span className="text-gold-gradient">Questions.</span>
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
            Everything you need to know about Aurevyn’s platform, automation capabilities, and plans.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="aurevyn-card"
                style={{
                  background: '#FFFFFF',
                  borderColor: isOpen ? 'rgba(217, 155, 0, 0.4)' : 'var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px',
                    fontWeight: '700',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <HelpCircle size={20} color={isOpen ? 'var(--accent)' : 'var(--text-secondary)'} />
                    {item.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(217, 155, 0, 0.15)' : 'rgba(15,23,42,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isOpen ? 'var(--accent)' : 'var(--text-secondary)',
                      flexShrink: 0
                    }}
                  >
                    <Plus size={18} />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 28px 24px 60px',
                        fontSize: '15px',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        borderTop: '1px solid rgba(15, 23, 42, 0.05)',
                        paddingTop: '16px'
                      }}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
