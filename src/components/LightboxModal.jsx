import React from 'react';
import { X, Maximize2 } from 'lucide-react';

export const LightboxModal = ({ isOpen, image, title, onClose }) => {
  if (!isOpen || !image) return null;

  return (
    <div 
      className="modal-backdrop-fixed" 
      onClick={onClose}
      style={{ zIndex: 3000, background: 'rgba(5, 6, 8, 0.96)' }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{ position: 'relative', maxWidth: '1200px', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          style={{ top: '-1rem', right: '0' }}
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>

        <img
          src={image}
          alt={title || 'Architectural View'}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border-gold)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)'
          }}
        />

        {title && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <h4 className="font-serif" style={{ color: '#fff', fontSize: '1.25rem' }}>{title}</h4>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-light)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '4px' }}>
              AUREN Architectural Portfolio Archive
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
