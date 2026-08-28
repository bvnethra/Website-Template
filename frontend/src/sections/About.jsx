import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, Settings, Sparkles } from 'lucide-react';
import { fadeIn, staggerContainer } from '../animations/animationVariants';

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Idea Discovery',
    icon: Lightbulb,
    color: '#06b6d4',
    description: 'Deconstructing challenges to formulate core concepts. We search for untapped opportunities and map architectural blueprints.',
  },
  {
    step: '02',
    title: 'Futuristic Innovation',
    icon: Sparkles,
    color: '#3b82f6',
    description: 'Transforming blueprints into modern interactive experiences. Wireframing design systems with vibrant details and visual excellence.',
  },
  {
    step: '03',
    title: 'Agile Development',
    icon: Settings,
    color: '#8b5cf6',
    description: 'Writing secure, performant Spring Boot microservices connected to fluid React.js components. Built for maximum speed.',
  },
  {
    step: '04',
    title: 'Seamless Launch',
    icon: Rocket,
    color: '#ec4899',
    description: 'Configuring secure pipelines, cloud deployment clusters, and optimizing SEO indices for global availability and high traffic.',
  },
];

export default function About() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="about" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container">
        <h2 className="section-title">
          WE ARE <span className="gradient-text">MOTIONA</span>
        </h2>
        <p className="section-subtitle">
          A dedicated crew of engineers and visual designers crafting premium digital solutions.
        </p>

        <div className="about-grid">
          {/* Left Side: Large Typography & Interactive Visual */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn('right', 'tween', 0.2, 0.8)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '2.2rem',
                lineHeight: 1.3,
                marginBottom: '20px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              We believe in <span className="gradient-text-cyan">elevating</span> the user experience to an art form.
            </h3>
            <p style={{ marginBottom: '30px', fontSize: '1.05rem' }}>
              Standard templates are a thing of the past. We engineering bespoke interfaces with liquid animation structures, secure APIs, and responsive micro-details.
            </p>

            {/* Rotating Core Visual representing active stage */}
            <div
              style={{
                position: 'relative',
                height: '240px',
                width: '100%',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              {/* Rotating grid circle */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  width: '320px',
                  height: '320px',
                  border: '1px dashed rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                }}
              />

              {/* Active Step Visual Display */}
              <div style={{ zIndex: 2, textAlign: 'center' }}>
                <motion.div
                  key={activeStep}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'inline-flex',
                    padding: '20px',
                    borderRadius: '50%',
                    background: `rgba(${activeStep === 0 ? '6, 182, 212' : activeStep === 1 ? '59, 130, 246' : activeStep === 2 ? '139, 92, 246' : '236, 72, 153'}, 0.1)`,
                    color: TIMELINE_STEPS[activeStep].color,
                    marginBottom: '15px',
                    boxShadow: `0 0 30px rgba(${activeStep === 0 ? '6, 182, 212' : activeStep === 1 ? '59, 130, 246' : activeStep === 2 ? '139, 92, 246' : '236, 72, 153'}, 0.2)`,
                  }}
                >
                  {(() => {
                    const Icon = TIMELINE_STEPS[activeStep].icon;
                    return <Icon size={44} />;
                  })()}
                </motion.div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                  {TIMELINE_STEPS[activeStep].title}
                </h4>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Timeline Steps */}
          <motion.div
            variants={staggerContainer(0.2, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
            }}
          >
            {/* Timeline connecting line */}
            <div
              style={{
                position: 'absolute',
                left: '29px',
                top: '40px',
                bottom: '40px',
                width: '2px',
                background: 'linear-gradient(to bottom, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
                opacity: 0.3,
                zIndex: 1,
              }}
            />

            {TIMELINE_STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;

              return (
                <motion.div
                  key={idx}
                  variants={fadeIn('left', 'spring', idx * 0.1, 0.6)}
                  className={`glass-panel timeline-card ${isActive ? 'active-timeline' : ''}`}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    gap: '20px',
                    padding: '20px',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(255, 255, 255, 0.03)' : 'rgba(11, 15, 30, 0.4)',
                    borderColor: isActive ? item.color : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isActive ? `0 10px 30px -10px ${item.color}33` : 'none',
                  }}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ x: 6 }}
                >
                  {/* Step Icon Shield */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: isActive ? item.color : 'rgba(255,255,255,0.03)',
                      color: isActive ? '#fff' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      fontFamily: "'Space Grotesk', sans-serif",
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>

                  {/* Step Description */}
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '6px', color: isActive ? '#fff' : 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 60px;
        }

        @media (max-width: 991px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </section>
  );
}
