import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Send, Loader2 } from 'lucide-react';
import { submitContact } from '../services/api';
import { fadeIn } from '../animations/animationVariants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Track field focus for custom label animation
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (formData.phone && !/^\+?[0-9\s-]{6,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await submitContact(formData);
      if (response && response.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setErrorMsg(response?.message || 'Something went wrong. Please check your fields.');
      }
    } catch (err) {
      setErrorMsg('API communication failure. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (fieldName, label, type = "text") => {
    const isFocused = focusedField === fieldName;
    const hasValue = formData[fieldName].length > 0;
    const isFloating = isFocused || hasValue;
    const hasError = !!errors[fieldName];

    return (
      <div style={{ position: 'relative', marginBottom: '24px', width: '100%' }}>
        {/* Floating Label */}
        <label
          style={{
            position: 'absolute',
            left: '16px',
            top: isFloating ? '6px' : '18px',
            fontSize: isFloating ? '0.75rem' : '0.95rem',
            color: hasError 
              ? '#ef4444' 
              : isFocused 
                ? 'var(--accent-cyan)' 
                : 'var(--text-secondary)',
            fontWeight: isFloating ? 600 : 400,
            pointerEvents: 'none',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 2,
          }}
        >
          {label}
        </label>
        
        {/* Input Node */}
        <input
          type={type}
          name={fieldName}
          value={formData[fieldName]}
          onFocus={() => setFocusedField(fieldName)}
          onBlur={() => setFocusedField(null)}
          onChange={handleInputChange}
          style={{
            width: '100%',
            padding: '24px 16px 10px 16px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid',
            borderColor: hasError 
              ? '#ef4444' 
              : isFocused 
                ? 'var(--accent-cyan)' 
                : 'rgba(255,255,255,0.08)',
            borderRadius: '12px',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: isFocused ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
          }}
        />

        {/* Error notification */}
        {hasError && (
          <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', textAlign: 'left', paddingLeft: '4px' }}>
            {errors[fieldName]}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="section-container" style={{ maxWidth: '650px' }}>
        <h2 className="section-title">
          GET IN <span className="gradient-text">TOUCH</span>
        </h2>
        <p className="section-subtitle">
          Submit the form below. Our response system will process your inquiry in real-time.
        </p>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn('up', 'spring', 0.2, 0.8)}
          className="glass-panel"
          style={{
            padding: '40px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(11, 15, 30, 0.45)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Form fields */}
                {renderInputField('name', 'Full Name')}
                {renderInputField('email', 'Email Address', 'email')}
                {renderInputField('phone', 'Phone Number (Optional)', 'tel')}
                {renderInputField('subject', 'Subject / Project Domain')}

                {/* Message Textarea */}
                <div style={{ position: 'relative', marginBottom: '24px', width: '100%' }}>
                  <label
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: focusedField === 'message' || formData.message.length > 0 ? '6px' : '18px',
                      fontSize: focusedField === 'message' || formData.message.length > 0 ? '0.75rem' : '0.95rem',
                      color: errors.message 
                        ? '#ef4444' 
                        : focusedField === 'message' 
                          ? 'var(--accent-cyan)' 
                          : 'var(--text-secondary)',
                      fontWeight: focusedField === 'message' || formData.message.length > 0 ? 600 : 400,
                      pointerEvents: 'none',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 2,
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '24px 16px 12px 16px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid',
                      borderColor: errors.message 
                        ? '#ef4444' 
                        : focusedField === 'message' 
                          ? 'var(--accent-cyan)' 
                          : 'rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'all 0.3s',
                      resize: 'vertical',
                      boxShadow: focusedField === 'message' ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
                    }}
                  />
                  {errors.message && (
                    <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px', textAlign: 'left', paddingLeft: '4px' }}>
                      {errors.message}
                    </div>
                  )}
                </div>

                {/* Submission Error Banner */}
                {errorMsg && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      fontSize: '0.9rem',
                      marginBottom: '24px',
                    }}
                  >
                    <AlertTriangle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px',
                    fontSize: '1.05rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Processing...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '40px 10px',
                  textAlign: 'center',
                }}
              >
                <motion.div
                  initial={{ rotate: -45, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                  style={{
                    color: '#10b981',
                    marginBottom: '20px',
                  }}
                >
                  <CheckCircle2 size={64} />
                </motion.div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '10px' }}>
                  Inquiry Transmitted!
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px' }}>
                  Your detailed message was successfully compiled and recorded. Our team will verify and reply shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-secondary"
                  style={{ padding: '10px 24px' }}
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        /* Spin animation for button loader */
        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
