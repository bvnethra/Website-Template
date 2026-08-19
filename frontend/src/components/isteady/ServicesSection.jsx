import React from 'react';

export default function ServicesSection() {
  const modes = [
    {
      num: "01",
      title: "Inception Mode",
      desc: "360-degree infinite barrel roll rotation. Spin the roll axis continuously with a single tap for breathtaking dreamscape videos."
    },
    {
      num: "02",
      title: "FPV Mode",
      desc: "3-axis locks release to follow handle movement on pan, tilt, and roll coordinates, offering full 360-degree immersive viewpoint creation."
    },
    {
      num: "03",
      title: "Sport Mode",
      desc: "Instantly boosts motor response times to trace fast-moving action, running subjects, or high-speed motorsport events."
    }
  ];

  return (
    <section id="services" style={{
      backgroundColor: '#0a0a0c',
      padding: '120px 40px',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{
            color: '#e27b3e',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Stabilization Modes
          </span>
          <h2 style={{
            fontSize: 'calc(2rem + 1vw)',
            fontWeight: '800',
            marginTop: '10px',
            letterSpacing: '-1px'
          }}>
            Creative Shooting Configurations.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}>
          {modes.map((mode, idx) => (
            <div key={idx} style={{
              background: '#121316',
              padding: '40px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.04)'
            }}>
              <span style={{
                color: '#e27b3e',
                fontSize: '2rem',
                fontWeight: '800',
                display: 'block',
                marginBottom: '20px',
                opacity: 0.85
              }}>
                {mode.num}
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px' }}>{mode.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#a1a5b0', fontWeight: '300' }}>{mode.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
