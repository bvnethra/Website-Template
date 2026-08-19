import React from 'react';

export default function AboutSection() {
  const features = [
    {
      title: "Magnetic AI Tracking Module",
      desc: "No apps required. The intelligent magnetic AI module locks onto subjects instantly, offering gesture-controlled framing and automated composition tracking."
    },
    {
      title: "Physical Focus & Zoom Wheel",
      desc: "Designed for tactile precision. Dial in organic lens focus pulls or zoom transitions smoothly with the mechanical side control wheel."
    },
    {
      title: "Quick-Release Mounting Grid",
      desc: "Swap gear in seconds. The universal quick-release base supports instant transitions between mirrorless camera, action cam, and smartphone plates."
    }
  ];

  return (
    <section id="about" style={{
      backgroundColor: '#0a0a0c',
      padding: '120px 40px',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '80px',
        alignItems: 'center'
      }}>
        {/* Left Side Feature Showcase */}
        <div>
          <span style={{
            color: '#e27b3e',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '15px'
          }}>
            Technology & Integration
          </span>
          <h2 style={{
            fontSize: 'calc(2rem + 1vw)',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '30px',
            letterSpacing: '-1px'
          }}>
            Stabilization Redefined by Smart Design.
          </h2>
          <p style={{
            fontSize: '0.95rem',
            lineHeight: '1.8',
            color: '#a1a5b0',
            marginBottom: '40px',
            fontWeight: '300'
          }}>
            The iSteady MT3 Pro is engineered to eliminate camera shake across three independent physical motor planes. By combining advanced gyro sensors with intelligent software balancing algorithms, it secures fluid, cinematic output regardless of active terrain.
          </p>
          <a href="#services" style={{
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '14px 32px',
            borderRadius: '99px',
            fontSize: '0.8rem',
            fontWeight: '600',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e27b3e'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'}
          >
            Explore Shooting Modes
          </a>
        </div>

        {/* Right Side Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              background: '#121316',
              padding: '30px 40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{
                color: '#e27b3e',
                fontSize: '1.5rem',
                fontWeight: '800',
                display: 'block',
                marginBottom: '15px'
              }}>
                {`0${idx + 1}`}
              </span>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: '#a1a5b0',
                fontWeight: '300'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
