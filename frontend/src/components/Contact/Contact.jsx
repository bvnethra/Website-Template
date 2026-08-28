import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MailOpen, AlertCircle } from 'lucide-react';
import { submitContact } from '../../services/api';
import { 
  envelopeVariants, 
  paperSlideVariants, 
  planeLaunchVariants 
} from '../../animations/motionVariants';

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [launchPlane, setLaunchPlane] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await submitContact(formData);
      // Success flow
      setIsSuccess(true);
      setLaunchPlane(true);
      // Clean form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setLaunchPlane(false);
      }, 2000);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setErrors({ global: 'Unable to deliver message at this time. Try again later.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      
      {/* Paper Plane Animation Overlay */}
      <AnimatePresence>
        {launchPlane && (
          <motion.div
            className="flying-plane-box"
            variants={planeLaunchVariants}
            initial="idle"
            animate="launch"
            exit="idle"
          >
            {/* Paper Plane SVG icon */}
            <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="var(--accent-coral)" strokeWidth="1.5">
              <path d="M22 2L2 9L11 13L19 6L12 14L15 22L22 2Z" fill="#FFE885" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contact-header">
        <span className="contact-sup">GET IN TOUCH</span>
        <h2 className="contact-heading">SO, WHAT SHOULD WE CREATE NEXT?</h2>
        <p className="contact-desc">
          Click the envelope below to slide out our letter form and pitch your project ideas.
        </p>
      </div>

      <div className="envelope-system-container">
        
        {/* Envelope wrapper */}
        <div 
          className={`envelope-envelope ${isOpen ? 'open' : ''} ${isSuccess ? 'success' : ''}`}
          onClick={() => { if(!isOpen && !isSuccess) setIsOpen(true); }}
          data-cursor={!isOpen ? "OPEN" : ""}
        >
          {/* Back face of envelope */}
          <div className="envelope-back"></div>

          {/* Front Fold Flaps */}
          <div className="envelope-flap-left"></div>
          <div className="envelope-flap-right"></div>
          
          {/* Top closing flap */}
          <motion.div 
            className="envelope-flap-top"
            variants={envelopeVariants}
            animate={isOpen ? 'open' : 'closed'}
          ></motion.div>

          {/* Letter / Paper Sheet holding form */}
          <motion.div 
            className="envelope-letter sketch-card"
            variants={paperSlideVariants}
            animate={isOpen ? 'open' : 'closed'}
            onClick={(e) => e.stopPropagation()} // Stop bubble up close click
          >
            {isSuccess ? (
              <div className="contact-success-screen">
                <span className="success-emoji">📬</span>
                <h3>IDEA DELIVERED!</h3>
                <p>Your creative message has folded into a paper plane and is flying towards our inbox. We will get back to you shortly.</p>
                <button 
                  onClick={() => { setIsSuccess(false); setIsOpen(false); }}
                  className="btn-editorial"
                  data-cursor="OPEN"
                >
                  SEND ANOTHER IDEA
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-letter-form">
                <div className="form-grid">
                  
                  {/* Name field */}
                  <div className="input-group">
                    <label htmlFor="contact-name">YOUR NAME</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    {errors.name && <span className="field-error"><AlertCircle size={12} /> {errors.name}</span>}
                  </div>

                  {/* Email field */}
                  <div className="input-group">
                    <label htmlFor="contact-email">EMAIL ADDRESS</label>
                    <input 
                      type="text" 
                      id="contact-email" 
                      name="email" 
                      placeholder="jane@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="field-error"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>

                  {/* Subject field */}
                  <div className="input-group full-width">
                    <label htmlFor="contact-subject">WHAT SHOULD WE CREATE?</label>
                    <input 
                      type="text" 
                      id="contact-subject" 
                      name="subject" 
                      placeholder="Interactive Brand Campaign"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                    {errors.subject && <span className="field-error"><AlertCircle size={12} /> {errors.subject}</span>}
                  </div>

                  {/* Message field */}
                  <div className="input-group full-width">
                    <label htmlFor="contact-message">TELL US MORE ABOUT THE IDEA</label>
                    <textarea 
                      id="contact-message" 
                      name="message" 
                      rows="4" 
                      placeholder="Write down the coordinates of your imagination..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    {errors.message && <span className="field-error"><AlertCircle size={12} /> {errors.message}</span>}
                  </div>

                  {errors.global && (
                    <div className="input-group full-width global-error">
                      <span>{errors.global}</span>
                    </div>
                  )}

                  <div className="form-submit-row full-width">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-editorial submit-btn"
                      data-cursor="OPEN"
                    >
                      {isSubmitting ? 'DELIVERING...' : 'SEND THE IDEA'} <Send size={16} />
                    </button>
                  </div>

                </div>
              </form>
            )}
          </motion.div>

          {/* Prompt showing before envelope opens */}
          {!isOpen && !isSuccess && (
            <div className="envelope-prompt">
              <MailOpen size={24} />
              <span>OPEN ENVELOPE</span>
            </div>
          )}

        </div>

      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-cream);
          overflow: hidden;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-sup {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--accent-coral);
          font-size: 0.9rem;
        }

        .contact-heading {
          font-size: clamp(2rem, 3.5vw, 3rem);
          margin-top: 10px;
          font-family: var(--font-serif);
        }

        .contact-desc {
          font-size: 1rem;
          color: var(--text-muted);
          margin-top: 10px;
        }

        /* Flying Paper Plane */
        .flying-plane-box {
          position: fixed;
          left: 10%;
          bottom: 20%;
          pointer-events: none;
          z-index: 2000;
        }

        /* Envelope positioning container */
        .envelope-system-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          min-height: 480px;
          margin-top: 2rem;
          position: relative;
        }

        .envelope-envelope {
          position: relative;
          width: 580px;
          height: 340px;
          background-color: #E6E1D5;
          border: var(--border-sketch);
          border-radius: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          cursor: pointer;
          transition: background-color 0.3s;
        }

        @media (max-width: 650px) {
          .envelope-envelope {
            width: 90%;
            height: 280px;
          }
          .envelope-system-container {
            min-height: 600px;
          }
        }

        .envelope-envelope.open {
          cursor: default;
          background-color: #D6D1C5;
        }

        /* Flaps styling using clip-paths */
        .envelope-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #E8E3D7;
          z-index: 1;
        }

        .envelope-flap-left {
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: #ECE7DA;
          border-left: 1px solid var(--border-color);
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
          z-index: 3;
        }

        .envelope-flap-right {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: #ECE7DA;
          border-right: 1px solid var(--border-color);
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
          z-index: 3;
        }

        .envelope-flap-top {
          position: absolute;
          top: -1.5px;
          left: 0;
          width: 100%;
          height: 50%;
          background: #E0DBD0;
          border-top: var(--border-sketch);
          clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
          z-index: 4;
          transform-origin: top center;
        }

        /* Letter paper sheet form */
        .envelope-letter {
          position: absolute;
          left: 5%;
          right: 5%;
          bottom: 10px;
          background: #FAF6EE;
          z-index: 2;
          padding: 2rem !important;
          box-shadow: 4px -4px 15px rgba(0,0,0,0.08) !important;
          max-height: 520px;
          overflow-y: auto;
        }

        @media (max-width: 650px) {
          .envelope-letter {
            max-height: 480px;
          }
        }

        .envelope-prompt {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-weight: bold;
          font-size: 0.85rem;
          color: var(--text-charcoal);
          pointer-events: none;
        }

        /* Form Details */
        .contact-letter-form label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 800;
          display: block;
          margin-bottom: 6px;
          color: var(--text-charcoal);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group.full-width {
          grid-column: span 2;
        }

        @media (max-width: 600px) {
          .input-group.full-width {
            grid-column: span 1;
          }
        }

        .contact-letter-form input,
        .contact-letter-form textarea {
          font-family: var(--font-body);
          font-size: 0.9rem;
          padding: 8px 12px;
          border: var(--border-sketch);
          border-radius: 6px;
          background: var(--bg-paper);
          color: var(--text-charcoal);
          outline: none;
        }

        .contact-letter-form input:focus,
        .contact-letter-form textarea:focus {
          border-color: var(--accent-coral);
          background-color: #fff;
        }

        .field-error {
          font-family: var(--font-mono);
          color: var(--accent-coral);
          font-size: 0.65rem;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .global-error {
          background: rgba(255, 95, 56, 0.1);
          border: 1px solid var(--accent-coral);
          padding: 8px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-coral);
          text-align: center;
        }

        .form-submit-row {
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
        }

        /* Success screen card */
        .contact-success-screen {
          text-align: center;
          padding: 2rem 1rem;
        }

        .success-emoji {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }

        .contact-success-screen h3 {
          font-family: var(--font-sans);
          font-weight: 900;
          margin-bottom: 10px;
        }

        .contact-success-screen p {
          font-size: 0.95rem;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
