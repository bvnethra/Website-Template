import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" style={{
      backgroundColor: '#000000',
      padding: '120px 40px',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '60px'
      }}>
        {/* Left Column */}
        <div>
          <span style={{
            color: '#e27b3e',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>
            Pre-Order
          </span>
          <h2 style={{
            fontSize: 'calc(2rem + 1vw)',
            fontWeight: '800',
            margin: '12px 0 24px 0',
            letterSpacing: '-1px'
          }}>
            Secure Your iSteady MT3 Pro
          </h2>
          <p style={{
            fontSize: '0.95rem',
            lineHeight: '1.8',
            color: '#a1a5b0',
            marginBottom: '40px',
            fontWeight: '300'
          }}>
            Orders placed today include the magnetic AI tracking sensor module and custom hard-shell travel case bundle for free.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Studio Email</span>
              <p style={{ marginTop: '4px', fontSize: '1rem', fontWeight: '500' }}>sales@isteady-tech.com</p>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>Helpdesk</span>
              <p style={{ marginTop: '4px', fontSize: '1rem', fontWeight: '500' }}>support@isteady-tech.com</p>
            </div>
          </div>
        </div>

        {/* Right Column Form */}
        <div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Pre-order received! We will contact you with shipping confirmation details.'); }} style={{
            background: '#0a0a0c',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Full Name</label>
              <input type="text" required placeholder="Enter name" style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '14px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Email Address</label>
              <input type="email" required placeholder="Enter email address" style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '14px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Inquiry Details</label>
              <textarea required rows="3" placeholder="I would like to preorder..." style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '14px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'none'
              }}></textarea>
            </div>

            <button type="submit" style={{
              width: '100%',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '15px',
              borderRadius: '99px',
              fontSize: '0.85rem',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e27b3e'; e.currentTarget.style.color = '#000000'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
