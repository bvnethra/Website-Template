import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, MessageSquare, ChevronUp, Mail, Loader2, Check } from 'lucide-react';
import { submitNewsletter } from '../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll progress for back-to-top indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const response = await submitNewsletter(email);
      if (response && response.success) {
        setSubscribed(true);
        setEmail('');
      } else {
        setErrorMsg('Subscription failed. Try again.');
      }
    } catch (err) {
      setErrorMsg('Could not connect to subscription services.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleQuickLink = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  // SVG Circle parameters for back-to-top button
  const radius = 20;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#030712',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '80px 24px 40px 24px',
        zIndex: 5,
      }}
    >
      <div className="section-container">
        {/* Footer Top Grid */}
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
            <a
              href="#home"
              onClick={(e) => handleQuickLink(e, 'home')}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4' }} />
              MOTIONA
            </a>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '280px', textAlign: 'left' }}>
              Bespoke digital architecture crafted with premium interactive designs and secure backend systems.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" className="social-icon-btn"><Github size={18} /></a>
              <a href="#" className="social-icon-btn"><Twitter size={18} /></a>
              <a href="#" className="social-icon-btn"><MessageSquare size={18} /></a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Services
            </h4>
            <ul className="footer-links">
              <li><a href="#services" onClick={(e) => handleQuickLink(e, 'services')}>Web Development</a></li>
              <li><a href="#services" onClick={(e) => handleQuickLink(e, 'services')}>UI/UX Design</a></li>
              <li><a href="#services" onClick={(e) => handleQuickLink(e, 'services')}>Cloud Integrations</a></li>
              <li><a href="#services" onClick={(e) => handleQuickLink(e, 'services')}>AI Automations</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explore
            </h4>
            <ul className="footer-links">
              <li><a href="#about" onClick={(e) => handleQuickLink(e, 'about')}>About Us</a></li>
              <li><a href="#features" onClick={(e) => handleQuickLink(e, 'features')}>Core Features</a></li>
              <li><a href="#process" onClick={(e) => handleQuickLink(e, 'process')}>Our Process</a></li>
              <li><a href="#showcase" onClick={(e) => handleQuickLink(e, 'showcase')}>Showcase</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
              Subscribe to recieve technical digests and product showcase briefings.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ position: 'relative', width: '100%' }}>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                disabled={submitting || subscribed}
                style={{
                  width: '100%',
                  padding: '12px 46px 12px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={submitting || subscribed}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  bottom: '6px',
                  background: subscribed ? '#10b981' : 'var(--accent-blue)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  width: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              >
                {submitting ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : subscribed ? (
                  <Check size={14} />
                ) : (
                  <Mail size={14} />
                )}
              </button>
            </form>
            {errorMsg && (
              <span style={{ color: '#ef4444', fontSize: '0.75rem', textAlign: 'left' }}>
                {errorMsg}
              </span>
            )}
            {subscribed && (
              <span style={{ color: '#10b981', fontSize: '0.75rem', textAlign: 'left' }}>
                Successfully subscribed!
              </span>
            )}
          </div>
        </div>

        {/* Footer Bottom Rights */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '35px',
            marginTop: '50px',
            borderTop: '1px solid rgba(255, 255, 255, 0.04)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <span>&copy; {new Date().getFullYear()} MOTIONA Corp. All rights reserved.</span>
          <span>Terms & Privacy Policies</span>
        </div>
      </div>

      {/* Floating Scroll Back to Top progress wheel */}
      {scrollProgress > 0.05 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleScrollTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#040814',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 999,
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
          whileHover={{ scale: 1.1, borderColor: 'var(--accent-blue)' }}
        >
          {/* Scroll progress svg ring */}
          <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '46px', height: '46px' }}>
            <circle
              cx="23"
              cy="23"
              r={radius}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="23"
              cy="23"
              r={radius}
              stroke="var(--accent-blue)"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s' }}
            />
          </svg>
          <ChevronUp size={20} style={{ color: '#fff', zIndex: 2 }} />
        </motion.div>
      )}

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          gap: 40px;
        }

        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          color: var(--text-secondary);
          display: flex;
          alignItems: center;
          justifyContent: center;
          transition: all 0.3s;
          text-decoration: none;
        }

        .social-icon-btn:hover {
          border-color: var(--accent-blue);
          color: #fff;
          transform: translateY(-2px);
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0;
          margin: 0;
          text-align: left;
        }

        .footer-links a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #fff;
        }

        @media (max-width: 991px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
