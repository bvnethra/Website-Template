import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export default function HeroDashboard({ onOpenDemo }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '100%',
        background: '#FFFFFF',
        border: '1px solid rgba(15, 23, 42, 0.12)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 70px -15px rgba(15, 23, 42, 0.12), 0 0 40px rgba(217, 155, 0, 0.15)',
        position: 'relative'
      }}
    >
      {/* Top Window Bar */}
      <div style={{
        padding: '16px 24px',
        background: '#F8FAFC',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Window Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }} />
          <span style={{ marginLeft: '12px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
            app.aurevyn.com / main-workspace
          </span>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '6px', background: '#E2E8F0', padding: '4px', borderRadius: '10px' }}>
          {['overview', 'automations', 'performance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                background: activeTab === tab ? 'var(--accent)' : 'transparent',
                color: activeTab === tab ? '#FFFFFF' : 'var(--text-secondary)',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div style={{ padding: '24px 28px', background: '#FFFFFF' }}>
        {/* Metric Cards Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Card 1 */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
              <span>Monthly Volume</span>
              <Activity size={16} color="var(--accent)" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '8px' }}>
              $142,850
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent)', marginTop: '4px', fontWeight: '600' }}>
              <ArrowUpRight size={14} /> +18.4% this month
            </div>
          </div>

          {/* Card 2 */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
              <span>Active Workflows</span>
              <Zap size={16} color="var(--accent)" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '8px' }}>
              1,280
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent)', marginTop: '4px', fontWeight: '600' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
              99.9% Uptime SLA
            </div>
          </div>

          {/* Card 3 */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
              <span>Automation Velocity</span>
              <Clock size={16} color="var(--accent)" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', marginTop: '8px' }}>
              1.2s avg
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              3.8x faster handoffs
            </div>
          </div>

          {/* Card 4 */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '500' }}>
              <span>Team Velocity Score</span>
              <Sparkles size={16} color="var(--accent)" />
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--accent)', marginTop: '8px' }}>
              98.4 / 100
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Top 1% Operational Rank
            </div>
          </div>
        </div>

        {/* Mid Grid: Visual Graph & Live Pipelines */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Chart Card */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Workflow Throughput</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Real-time execution analytics across 7 days</p>
              </div>
              <SlidersHorizontal size={18} color="var(--text-secondary)" />
            </div>

            {/* SVG Graph Animation */}
            <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', alignItems: 'flex-end', gap: '12px', paddingBottom: '10px' }}>
              {[45, 65, 50, 85, 75, 95, 88].map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.08 }}
                    style={{
                      width: '100%',
                      maxWidth: '32px',
                      background: i === 5 
                        ? 'linear-gradient(180deg, #B87F00 0%, #8C5E00 100%)'
                        : 'linear-gradient(180deg, #D99B00 0%, #A37000 100%)',
                      borderRadius: '6px',
                      boxShadow: i === 5 ? '0 0 16px rgba(184, 127, 0, 0.4)' : 'none'
                    }}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Live Pipelines */}
          <div className="dashboard-box" style={{
            background: '#F8FAFC',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>Live Pipeline Activity</h4>
              <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)' }} /> Live Sync
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { title: 'Customer Onboarding Flow', status: 'Running', time: '2m ago', count: '342 tasks' },
                { title: 'Stripe Billing Sync & Invoice', status: 'Completed', time: '14m ago', count: '1,050 tasks' },
                { title: 'GitHub PR Auto-Review Gate', status: 'Running', time: 'Just now', count: '89 tasks' },
              ].map((pipe, idx) => (
                <div key={idx} style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: 'rgba(217, 155, 0, 0.12)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>{pipe.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{pipe.count} • {pipe.time}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
