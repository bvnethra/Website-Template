import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { fetchServices } from '../services/api';
import { fadeIn } from '../animations/animationVariants';

export default function Services() {
  const [services, setServices] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  if (loading || services.length === 0) return null;

  const currentService = services[selectedIdx];

  // Helper to dynamically render Lucide icons by string name
  const renderIcon = (iconName, size = 32, className = "") => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">
          OUR CORE <span className="gradient-text">CAPABILITIES</span>
        </h2>
        <p className="section-subtitle">
          Explore specialized services engineered to deliver performance, security, and exceptional aesthetics.
        </p>

        <div className="services-showcase-grid">
          {/* Left Navigation Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {services.map((service, idx) => {
              const isActive = selectedIdx === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`glass-panel service-tab-btn ${isActive ? 'active-tab' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '20px 24px',
                    textAlign: 'left',
                    width: '100%',
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' 
                      : 'rgba(11, 15, 30, 0.3)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(59, 130, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '12px',
                      background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      color: isActive ? '#3b82f6' : 'var(--text-secondary)',
                      transition: 'all 0.3s',
                    }}
                  >
                    {renderIcon(service.icon, 20)}
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 600 }}>
                    {service.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Central Showcase Card */}
          <div style={{ position: 'relative', minHeight: '380px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, x: 20, y: 5 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -5 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="glass-panel showcase-detail-card"
                style={{
                  height: '100%',
                  padding: '40px',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  background: 'linear-gradient(135deg, rgba(11, 15, 30, 0.75) 0%, rgba(4, 8, 20, 0.9) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Floating ambient orb inside card */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Service Badge */}
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#a78bfa',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}
                >
                  {currentService.badge}
                </div>

                {/* Service Title with Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <motion.div
                    animate={{ rotate: [0, 5, 0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      color: '#3b82f6',
                    }}
                  >
                    {renderIcon(currentService.icon, 36)}
                  </motion.div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                    {currentService.name}
                  </h3>
                </div>

                {/* Service Descriptions */}
                <p style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '16px', lineHeight: 1.5 }}>
                  {currentService.description}
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {currentService.details}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .services-showcase-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
          align-items: stretch;
        }

        .service-tab-btn:hover {
          border-color: rgba(59, 130, 246, 0.2);
          background: rgba(255, 255, 255, 0.02) !important;
          color: #fff !important;
        }

        .service-tab-btn.active-tab {
          color: #fff !important;
        }

        @media (max-width: 768px) {
          .services-showcase-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
