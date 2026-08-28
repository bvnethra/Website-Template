import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2, Twitter, Github, Linkedin } from 'lucide-react';
import { submitContactForm } from '../services/api';
import { fadeInLeft, fadeInRight } from '../animations/animations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false, errorMsg: '' });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, success: false, errorMsg: '' });

    try {
      const response = await submitContactForm(formData);
      if (response && response.success) {
        setStatus({ loading: false, success: true, errorMsg: '' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
      } else {
        setStatus({
          loading: false,
          success: false,
          errorMsg: response?.message || 'Failed to send message.',
        });
      }
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        errorMsg: err?.message || 'Error connecting to Spring Boot server. Please ensure the backend is running.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 bg-surface-subtle/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-indigo/10 text-accent-indigo text-xs font-bold uppercase tracking-wider mb-4">
              Get In Touch
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-6">
              Let’s Start a <span className="gradient-text">Conversation</span>
            </h2>

            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Have a project in mind or want to learn more about our React + Spring Boot architectural capabilities? Send us a message and our team will get back to you within 24 hours.
            </p>

            {/* Info Cards */}
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-accent-indigo flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Email Us</p>
                  <p className="text-base font-bold text-navy">hello@polar-platform.io</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-accent-purple flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Call Us</p>
                  <p className="text-base font-bold text-navy">+1 (555) 234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-accent-cyan flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Global Headquarters</p>
                  <p className="text-base font-bold text-navy">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Twitter, href: '#' },
                  { icon: Github, href: '#' },
                  { icon: Linkedin, href: '#' },
                ].map((social, i) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-accent-indigo hover:border-accent-indigo hover:shadow-md flex items-center justify-center transition-all duration-200"
                    >
                      <IconComp className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white shadow-2xl shadow-slate-200/60 relative">
              
              <h3 className="text-2xl font-bold text-navy mb-2">Send a Message</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-8">Fill in the fields below. Submissions POST directly to Spring Boot backend API.</p>

              {/* Success Banner */}
              <AnimatePresence>
                {status.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold">Message Sent Successfully!</h5>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Your inquiry has been received by our Java Spring Boot backend API. We will get back to you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Banner */}
              <AnimatePresence>
                {status.errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold">Submission Failed</h5>
                      <p className="text-xs text-rose-700 mt-0.5">{status.errorMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-accent-indigo focus:ring-indigo-100'
                      } text-navy text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name}</p>}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-accent-indigo focus:ring-indigo-100'
                      } text-navy text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider" htmlFor="phone">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-accent-indigo focus:ring-indigo-100 text-navy text-sm focus:outline-none focus:ring-4 transition-all duration-200"
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider" htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.subject ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-accent-indigo focus:ring-indigo-100'
                      } text-navy text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message TextArea */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements or goals..."
                    className={`w-full px-4 py-3 rounded-xl bg-white border ${
                      errors.message ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:border-accent-indigo focus:ring-indigo-100'
                    } text-navy text-sm focus:outline-none focus:ring-4 transition-all duration-200`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-indigo to-accent-purple text-white font-extrabold text-base shadow-lg shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending to Backend API...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
