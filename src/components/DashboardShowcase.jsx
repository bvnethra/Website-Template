import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function DashboardShowcase({ onOpenDemo }) {
  const [range, setRange] = useState('7d');

  const rangeData = {
    '7d': { total: '14,290', completion: '98.6%', speed: '1.2s', chart: [40, 65, 80, 55, 90, 85, 98] },
    '30d': { total: '58,410', completion: '99.1%', speed: '1.0s', chart: [60, 75, 85, 90, 88, 94, 99] },
    '90d': { total: '182,900', completion: '99.4%', speed: '0.9s', chart: [50, 70, 82, 88, 92, 96, 100] }
  };

  const current = rangeData[range];

  return (
    <section className="section-padding">
      <div className="section-container">
        
        {/* Header */}
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
              <span>Interactive Command Center</span>
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
            See your operation <span className="text-gold-gradient">at a glance.</span>
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
            Gain instant operational clarity with real-time analytics, automated pipeline monitoring, and team throughput metrics.
          </motion.p>
        </div>

        {/* Product Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="aurevyn-card"
          style={{
            padding: '30px',
            background: '#FFFFFF',
            boxShadow: '0 25px 70px -15px rgba(15, 23, 42, 0.1), 0 0 50px rgba(217, 155, 0, 0.15)'
          }}
        >
          {/* Top Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border)',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px var(--accent)'
              }} />
              <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Live Operations Telemetry
              </span>
            </div>

            {/* Time Filter Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {['7d', '30d', '90d'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  style={{
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    borderRadius: '8px',
                    border: range === r ? '1px solid var(--accent)' : '1px solid var(--border)',
                    background: range === r ? 'rgba(217, 155, 0, 0.12)' : 'transparent',
                    color: range === r ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout inside Showcase */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '24px'
          }}>
            {/* Stat 1 */}
            <div className="dashboard-box" style={{
              background: '#F8FAFC',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
                <span>Total Executions</span>
                <Activity size={16} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)', marginTop: '8px', color: 'var(--text-primary)' }}>
                {current.total}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                <ArrowUpRight size={14} /> +24% vs previous period
              </div>
            </div>

            {/* Stat 2 */}
            <div className="dashboard-box" style={{
              background: '#F8FAFC',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
                <span>Completion Rate</span>
                <CheckCircle2 size={16} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)', marginTop: '8px', color: 'var(--accent)' }}>
                {current.completion}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Zero workflow failures detected
              </div>
            </div>

            {/* Stat 3 */}
            <div className="dashboard-box" style={{
              background: '#F8FAFC',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px' }}>
                <span>Avg Latency Speed</span>
                <Clock size={16} color="var(--accent)" />
              </div>
              <div style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)', marginTop: '8px', color: 'var(--text-primary)' }}>
                {current.speed}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Global edge routing active
              </div>
            </div>
          </div>

          {/* Interactive Chart Container */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Workflow Completion Analytics</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated tasks executed across active team workspaces</p>
              </div>
              <span className="glass-badge" style={{ padding: '4px 10px', fontSize: '11px' }}>
                Live Stream
              </span>
            </div>

            {/* Bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '16px',
              height: '180px',
              paddingTop: '20px'
            }}>
              {current.chart.map((val, idx) => (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    style={{
                      width: '100%',
                      background: val > 90
                        ? 'linear-gradient(180deg, #B87F00 0%, #8C5E00 100%)'
                        : 'linear-gradient(180deg, #D99B00 0%, #A37000 100%)',
                      borderRadius: '8px',
                      boxShadow: val > 90 ? '0 0 16px rgba(184, 127, 0, 0.4)' : 'none'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    P{idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Bar */}
          <div style={{
            marginTop: '24px',
            textAlign: 'center',
            paddingTop: '20px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Want to see Aurevyn with your team's live data?
            </span>
            <button className="btn-primary" onClick={onOpenDemo} style={{ padding: '10px 20px', fontSize: '13px' }}>
              Launch Full Dashboard Demo
              <Sparkles size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
