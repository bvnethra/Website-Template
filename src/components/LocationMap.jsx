import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export const LocationMap = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-main)', paddingTop: 0 }} aria-label="Office Location & Interactive Map">
      <div className="container">
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', overflow: 'hidden' }}>
          <div style={{ padding: '2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <span className="section-tag" style={{ margin: 0, padding: '0.2rem 0.5rem' }}>VISIT OUR STUDIO</span>
              <h3 className="font-serif" style={{ fontSize: '1.4rem', color: '#fff', marginTop: '0.35rem' }}>
                Chennai Headquarters & Materials Experience Center
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Chennai,Tamil+Nadu,India"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
              style={{ fontSize: '0.78rem', padding: '0.6rem 1.25rem' }}
            >
              <Navigation size={14} />
              <span>Open in Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Interactive Map Canvas Embed / Styled Map View */}
          <div style={{ position: 'relative', height: '420px', width: '100%', background: '#12161f' }}>
            <iframe
              title="AUREN Build & Developments Chennai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124419.86591632733!2d80.14115162464731!3d12.964177484379377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d264560799%3A0x6e2467d582377317!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.85)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Custom Architectural Location Pin Floating Card */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(11, 13, 16, 0.92)', border: '1px solid var(--border-gold)', backdropFilter: 'blur(12px)', padding: '1.25rem', borderRadius: 'var(--radius-xs)', maxWidth: '320px', boxShadow: 'var(--shadow-elevated)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-primary)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                <MapPin size={16} />
                <span>AUREN DESIGN STUDIO</span>
              </div>
              <p style={{ color: '#fff', fontSize: '0.85rem', marginTop: '0.4rem', lineHeight: '1.4' }}>
                123 Architecture Avenue, Anna Salai, Chennai 600002
              </p>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.4rem' }}>
                Valet parking and private consultation rooms available on-site.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
