import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000000',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '60px 40px',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>
          iSteady Stabilizer
        </span>
        <div style={{ display: 'flex', gap: '20px', fontSize: '0.75rem', opacity: 0.6 }}>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms of Service</a>
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>
          &copy; 2026 iSteady Tech. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
