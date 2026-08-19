import React from 'react';

export default function HeroGrid() {
  const images = [
    { url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80", title: "Active Action Tracking" },
    { url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80", title: "Low Angle Cinematics" },
    { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", title: "Vlog Framing Lock" },
    { url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", title: "Steady Run Captures" },
    { url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80", title: "Bespoke Portraiture" },
    { url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", title: "Dynamic Panoramas" }
  ];

  return (
    <section id="work" style={{
      backgroundColor: '#000000',
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
            Creative Gallery
          </span>
          <h2 style={{
            fontSize: 'calc(2rem + 1vw)',
            fontWeight: '800',
            marginTop: '10px',
            letterSpacing: '-1px'
          }}>
            Captured with iSteady.
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {images.map((item, idx) => (
            <div key={idx} style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              cursor: 'pointer'
            }}>
              <img 
                src={item.url} 
                alt={item.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '24px',
                boxSizing: 'border-box'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
