import React, { useState } from 'react';
import { ArrowUpRight, Compass, Send, X, CheckCircle } from 'lucide-react';

export default function ContactSection({ isOpenModal, onCloseModal, onOpenModal }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Residential',
    location: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onCloseModal();
      setFormData({
        name: '',
        email: '',
        projectType: 'Residential',
        location: '',
        message: ''
      });
    }, 2500);
  };

  return (
    <section id="contact" className="py-36 bg-charcoal text-soft-white border-t border-soft-white/10 relative overflow-hidden">
      
      {/* Animated Subtle Architectural Grid Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none arch-grid-bg">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="300" stroke="#E8E4DC" strokeWidth="0.5" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '60s' }} />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#8A705C" strokeWidth="0.5" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#8A705C" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-10 relative z-10">
        
        {/* Label */}
        <div className="inline-flex items-center space-x-2 font-mono-tech text-[11px] uppercase tracking-[0.3em] text-arch-gray">
          <Compass className="w-3.5 h-3.5 text-deep-earth" />
          <span>INQUIRIES // COMMISSIONS</span>
        </div>

        {/* Heading */}
        <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-soft-white font-light leading-none tracking-tight">
          Let’s imagine what’s next.
        </h2>

        {/* Text */}
        <p className="font-sans text-sm md:text-base text-soft-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Every project begins with a conversation, a question, or an unfinished idea.
        </p>

        {/* CTA Button */}
        <div className="pt-6">
          <button
            onClick={onOpenModal}
            data-cursor="OPEN"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-limestone transition-all duration-300 shadow-2xl group"
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="w-4 h-4 text-arch-gray group-hover:text-charcoal group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Direct Contact Details */}
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono-tech text-xs text-arch-gray border-t border-soft-white/10 max-w-3xl mx-auto">
          <div>
            <span className="text-deep-earth block text-[10px] uppercase">DIRECT EMAIL</span>
            <a href="mailto:hello@ateliernorth.studio" className="text-soft-white hover:text-limestone transition-colors">
              hello@ateliernorth.studio
            </a>
          </div>
          <div>
            <span className="text-deep-earth block text-[10px] uppercase">STUDIO TELEPHONE</span>
            <span className="text-soft-white">+00 000 000 0000</span>
          </div>
          <div>
            <span className="text-deep-earth block text-[10px] uppercase">FICTIONAL HEADQUARTERS</span>
            <span className="text-soft-white">Northwood Studio 04</span>
          </div>
        </div>

      </div>

      {/* Inquiry Slide-Over / Modal */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <div className="bg-charcoal border border-soft-white/20 max-w-xl w-full p-6 md:p-10 relative space-y-6">
            <button
              onClick={onCloseModal}
              className="absolute top-6 right-6 text-soft-white/70 hover:text-soft-white p-2 border border-soft-white/20 hover:border-soft-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-soft-white/10 pb-6">
              <span className="font-mono-tech text-xs text-deep-earth">ATELIER NORTH // INQUIRY FORM</span>
              <h3 className="font-editorial text-3xl md:text-4xl text-soft-white">
                Start a Conversation
              </h3>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono-tech text-xs">
                <CheckCircle className="w-12 h-12 text-deep-earth mx-auto animate-bounce" />
                <h4 className="font-editorial text-2xl text-soft-white">Inquiry Received</h4>
                <p className="text-arch-gray max-w-sm mx-auto">
                  Thank you. Our studio practice team will review your project parameters and respond within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono-tech">
                <div>
                  <label className="block text-arch-gray mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Marlow"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-soft-white/5 border border-soft-white/20 px-4 py-3 text-soft-white focus:outline-none focus:border-deep-earth"
                  />
                </div>

                <div>
                  <label className="block text-arch-gray mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-soft-white/5 border border-soft-white/20 px-4 py-3 text-soft-white focus:outline-none focus:border-deep-earth"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-arch-gray mb-1">PROJECT CATEGORY</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-charcoal border border-soft-white/20 px-3 py-3 text-soft-white focus:outline-none focus:border-deep-earth"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Civic">Civic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-arch-gray mb-1">LOCATION / REGION</label>
                    <input
                      type="text"
                      placeholder="Northwood"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-soft-white/5 border border-soft-white/20 px-4 py-3 text-soft-white focus:outline-none focus:border-deep-earth"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-arch-gray mb-1">PROJECT DESCRIPTION & VISION</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your site, timeline, and spatial intentions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-soft-white/5 border border-soft-white/20 px-4 py-3 text-soft-white focus:outline-none focus:border-deep-earth"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-soft-white text-charcoal font-sans text-xs uppercase tracking-[0.25em] font-semibold hover:bg-limestone transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
