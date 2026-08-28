import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { pricingData } from '../data/pricing';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function Pricing({ onOpenDemo }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="section-padding" style={{ background: 'var(--background-secondary)' }}>
      <div className="section-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '16px' }}
          >
            <span className="glass-badge">
              <span className="glass-badge-dot" />
              <span>Transparent Pricing</span>
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
            Simple plans for <span className="text-gold-gradient">growing teams.</span>
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
            Start for free, scale as your team expands. No hidden charges or complex contracts.
          </motion.p>
        </div>

        {/* Billing Cycle Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', marginBottom: '60px' }}>
          <span style={{ fontSize: '14px', color: !isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: !isAnnual ? '700' : '500' }}>
            Monthly Billing
          </span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            style={{
              width: '56px',
              height: '30px',
              borderRadius: '15px',
              background: 'rgba(217, 155, 0, 0.15)',
              border: '1px solid var(--accent)',
              padding: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isAnnual ? 'flex-end' : 'flex-start',
              transition: 'all 0.3s ease'
            }}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px rgba(217, 155, 0, 0.4)'
              }}
            />
          </button>

          <span style={{ fontSize: '14px', color: isAnnual ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isAnnual ? '700' : '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            Annual Billing
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#0F172A',
              background: 'linear-gradient(135deg, #FFC52E, #D99B00)',
              padding: '2px 8px',
              borderRadius: '10px'
            }}>
              Save 20%
            </span>
          </span>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '30px',
          alignItems: 'stretch'
        }}>
          {pricingData.map((plan, idx) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="aurevyn-card"
                style={{
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: '#FFFFFF',
                  border: plan.isPopular ? '2px solid var(--accent)' : '1px solid var(--border)',
                  boxShadow: plan.isPopular ? '0 20px 50px -10px rgba(15, 23, 42, 0.12), 0 0 35px -5px rgba(217, 155, 0, 0.25)' : '0 4px 20px rgba(0,0,0,0.03)',
                  transform: plan.isPopular ? 'scale(1.03)' : 'scale(1)',
                  zIndex: plan.isPopular ? 2 : 1
                }}
              >
                <div>
                  {/* Top Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '14px',
                      fontWeight: '800',
                      letterSpacing: '0.1em',
                      color: plan.isPopular ? 'var(--accent)' : 'var(--text-secondary)'
                    }}>
                      {plan.name}
                    </span>

                    {plan.isPopular && (
                      <span className="glass-badge" style={{ padding: '4px 10px', fontSize: '11px' }}>
                        <Sparkles size={12} /> Most Popular
                      </span>
                    )}
                  </div>

                  {/* Price display */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '48px',
                      fontWeight: '800',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.03em'
                    }}>
                      {price}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                      {plan.period}
                    </span>
                  </div>

                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '30px', minHeight: '42px' }}>
                    {plan.description}
                  </p>

                  <div style={{ height: '1px', background: 'var(--border)', marginBottom: '28px' }} />

                  {/* Features List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                    {plan.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'rgba(217, 155, 0, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--accent)',
                          flexShrink: 0
                        }}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onOpenDemo}
                  className={plan.isPopular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%' }}
                >
                  {plan.ctaText}
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
