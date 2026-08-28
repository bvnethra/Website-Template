import React, { useEffect } from 'react';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose, message]);

  if (!message) return null;

  return (
    <div className="toast-container-fixed" role="status" aria-live="polite">
      <CheckCircle2 size={20} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
      <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-warm-white)' }}>
        {message}
      </span>
      <button 
        onClick={onClose}
        style={{ color: 'var(--color-text-dim)', border: 'none', background: 'none', cursor: 'pointer', padding: '0.2rem' }}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};
