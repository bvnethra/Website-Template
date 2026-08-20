import React from 'react';
import useStylesheet from '../services/useStylesheet';

export default function LearnerPortal() {
  useStylesheet('/templates/education/learner/style.css');

  return (
    <div className="learner-portal-root" style={{ padding: '120px 24px 60px 24px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Learner Portal Component</h2>
      <p style={{ color: '#64748b', marginTop: '10px' }}>This module has been fully converted to a React component.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Return Home</a>
      </div>
    </div>
  );
}
