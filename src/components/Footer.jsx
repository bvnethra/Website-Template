import React, { useState } from 'react';
import { Layers, ArrowRight, Globe, Share2, Send, MessageSquare, Check } from 'lucide-react';

export default function Footer({ onOpenDemo }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const socialLinks = [
    { label: 'Website', Icon: Globe },
    { label: 'Community', Icon: MessageSquare },
    { label: 'Connect', Icon: Share2 },
    { label: 'Channel', Icon: Send }
  ];

  return (
    <footer style={{
      background: '#F8FAFC',
      borderTop: '1px solid var(--border)',
      paddingTop: '80px',
      paddingBottom: '40px',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="section-container">
        {/* Top Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Info & Newsletter */}
          <div style={{ gridColumn: 'span 2' }}>
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #FFC52E 0%, #D99B00 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F172A',
                boxShadow: '0 0 14px rgba(217, 155, 0, 0.35)'
              }}>
                <Layers size={18} strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)'
              }}>
                AUREVYN
              </span>
            </a>

            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '360px',
              marginBottom: '24px'
            }}>
              An intelligent workspace for teams that want to work with more clarity, speed, and continuous operational visibility.
            </p>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', maxWidth: '380px' }}>
              <input
                type="email"
                placeholder="Enter your work email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  background: '#FFFFFF',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '12px 20px', fontSize: '13px' }}
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>
            {subscribed && (
              <div style={{ fontSize: '12px', color: 'var(--accent)', marginTop: '8px', fontWeight: '600' }}>
                ✓ Thank you for subscribing to Aurevyn Updates!
              </div>
            )}
          </div>

          {/* Column 1: Product */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '18px' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              {['Platform', 'Features', 'Pricing', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--accent)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '18px' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              {['About', 'Careers', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo(); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--accent)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '18px' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              {['Documentation', 'Help Center', 'Guides', 'Community'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo(); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--accent)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '18px' }}>
              Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              {['Privacy', 'Terms', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => { e.preventDefault(); onOpenDemo(); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.target.style.color = 'var(--accent)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '30px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-secondary)'
        }}>
          <div>© 2026 Aurevyn. All rights reserved. Built for high-performance teams.</div>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {socialLinks.map(({ label, Icon }, idx) => (
              <a
                key={idx}
                href="#"
                aria-label={label}
                onClick={(e) => { e.preventDefault(); onOpenDemo(); }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
