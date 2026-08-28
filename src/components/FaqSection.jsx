import React, { useState } from 'react';
import { faqData } from '../data/faqData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

export const FaqSection = ({ onContactClick }) => {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-padding" style={{ background: '#F8F7F2', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }} aria-label="Frequently Asked Questions">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag center">CLARITY & INSIGHTS</div>
          <h2 className="section-heading-lg">
            FREQUENTLY ASKED <span className="gold-text">QUESTIONS</span>
          </h2>
          <p className="section-subtext mx-auto">
            Everything you need to know about our project engagement model, design & build coordination, and quality warranties.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                style={{ background: '#FFFFFF' }}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="faq-header-btn"
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <ChevronDown className="faq-toggle-icon" />
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Prompt */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Have a custom architectural inquiry or commercial master plan to discuss?
          </p>
          <button
            onClick={onContactClick}
            className="btn-text-arrow"
            style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}
          >
            <span>Speak Directly with Our Technical Lead</span>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
