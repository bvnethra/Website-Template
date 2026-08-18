import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data/mockData';
import { mockApi } from '../services/mockApi';
import { ContactFormData } from '../types';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Navigation,
  Sparkles
} from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) errs.message = 'Please type your inquiry message.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await mockApi.submitContactForm(formData);
      setSubmittedSuccess(true);
      onShowToast(
        'Inquiry Submitted Successfully',
        'Thank you! Our patient relations team has received your message and will reply within 24 business hours.',
        'success'
      );
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      onShowToast('Submission Failed', 'Please check your information and retry.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="py-16 lg:py-24 bg-white border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157D5]/10 text-[#3157D5] text-xs font-bold uppercase tracking-wide mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with NovaCare</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight">
            Contact & Hospital Information
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-2 leading-relaxed">
            Have questions about specialized treatments, insurance coverage, or facility directions? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F6F8FC] p-6 sm:p-8 rounded-3xl border border-[#E4E9F2]">
            <h3 className="text-lg font-bold text-[#15213D] mb-1">Send a Direct Message</h3>
            <p className="text-xs text-[#667085] mb-6">
              Our clinical coordination coordinators respond to all non-emergency inquiries within 24 hours.
            </p>

            {submittedSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-950">Thank You! Your Message is Received.</h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  A representative from our patient services coordinator desk will contact you via email or phone shortly.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer mt-2"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#15213D] mb-1">Your Full Name *</label>
                    <input
                      id="contact-form-name"
                      type="text"
                      placeholder="e.g. Jordan Lee"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full p-2.5 bg-white rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                        errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#15213D] mb-1">Email Address *</label>
                    <input
                      id="contact-form-email"
                      type="email"
                      placeholder="jordan.lee@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-2.5 bg-white rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#15213D] mb-1">Telephone Number</label>
                    <input
                      id="contact-form-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white rounded-xl border border-[#E4E9F2] text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-[#15213D] mb-1">Subject *</label>
                    <input
                      id="contact-form-subject"
                      type="text"
                      placeholder="e.g. Appointment Inquiry, Insurance Question"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full p-2.5 bg-white rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                        errors.subject ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                      }`}
                    />
                    {errors.subject && <p className="text-[11px] text-rose-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-[#15213D] mb-1">Your Message *</label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    placeholder="How can our clinical coordinator team assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-2.5 bg-white rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                      errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  id="submit-contact-message-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#3157D5] hover:bg-[#2443AE] disabled:bg-slate-400 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#3157D5]/20 transition-all cursor-pointer active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Hospital Details & Interactive Campus Location */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Contact Details Card */}
            <div className="bg-[#F6F8FC] p-6 rounded-3xl border border-[#E4E9F2] space-y-4">
              <h3 className="text-base font-bold text-[#15213D] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#3157D5]" />
                Hospital & Main Campus
              </h3>

              <div className="space-y-3 text-xs text-[#15213D]">
                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E4E9F2]">
                  <MapPin className="w-4 h-4 text-[#3157D5] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#15213D]">Campus Address</strong>
                    <span className="text-[#667085]">{HOSPITAL_INFO.mainAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E4E9F2]">
                  <Phone className="w-4 h-4 text-[#28B8D4] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#15213D]">General Information</strong>
                    <a href={`tel:${HOSPITAL_INFO.generalPhone}`} className="text-[#3157D5] hover:underline font-semibold">
                      {HOSPITAL_INFO.generalPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E4E9F2]">
                  <Mail className="w-4 h-4 text-[#7567E8] mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#15213D]">Patient Services Email</strong>
                    <a href={`mailto:${HOSPITAL_INFO.email}`} className="text-[#3157D5] hover:underline">
                      {HOSPITAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#E4E9F2]">
                  <Clock className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="block text-[#15213D]">Operating Hours</strong>
                    <span className="text-[#667085] leading-relaxed block">{HOSPITAL_INFO.hours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map Display */}
            <div className="rounded-3xl border border-[#E4E9F2] overflow-hidden bg-slate-900 text-white relative h-52 flex flex-col justify-end p-5">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600"
                alt="Map location visual"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="relative z-10 bg-slate-950/80 backdrop-blur-xs p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#3157D5] flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">NovaCare Medical District</span>
                    <span className="text-[10px] text-slate-300">Metro City Medical Complex</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#28B8D4]" />
                  <span>Open Map</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
