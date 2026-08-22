import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ContactViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const { theme, config, addNotification } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Undergraduate Admissions',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addNotification('warning', 'Missing Details', 'Please complete all required contact fields.');
      return;
    }
    setSubmitted(true);
    addNotification('success', 'Inquiry Dispatched', `Your message was forwarded to ${formData.department}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Campus Directory & Support
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Contact {config.name}
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Connect with the Office of Undergraduate Admissions, the Registrar, Financial Aid, or Student Affairs.
        </p>
      </div>

      {/* Emergency Strip */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="text-rose-950 font-semibold">
            <strong>24/7 Campus Police & Medical Emergency Hotline:</strong> {config.contact.emergencyHotline} (From campus landline: dial 5555)
          </span>
        </div>
        <span className="text-rose-800 font-bold">Blue Light Safety Phones Active 24/7</span>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Office Contacts */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900">Campus Headquarters</h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Main Campus Address:</strong>
                  <p>{config.address.street}, {config.address.city}, {config.address.state} {config.address.zip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>General Switchboard:</strong>
                  <p>{config.contact.generalPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>General Email:</strong>
                  <p>{config.contact.generalEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Welcome Center Hours:</strong>
                  <p>Monday – Friday: 8:00 AM – 5:30 PM EST<br />Saturday: 9:00 AM – 2:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Transit & Directions</h4>
            <p className="text-slate-600 leading-relaxed">
              {config.name} is accessible via the MBTA Green & Orange Lines, Commuter Rail (Back Bay / Ruggles), and MBTA Express Bus lines. Visitor parking is available at Academy East Garage (100 Academy Blvd).
            </p>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-serif font-bold text-slate-900">Send an Official Inquiry</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Office / Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>Undergraduate Admissions</option>
                    <option>Graduate School of Arts & Sciences</option>
                    <option>Financial Aid & Student Accounts</option>
                    <option>University Registrar & Transcripts</option>
                    <option>Alumni Affairs & Giving</option>
                    <option>University Communications & Press</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Message Content *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include applicant ID or details regarding your question..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: theme.primary }}
                  className="w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>Send Message to {formData.department}</span>
                </button>
              </form>
            ) : (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold font-serif text-emerald-950">Inquiry Transmitted</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A staff representative from <strong>{formData.department}</strong> will reply to <strong>{formData.email}</strong> within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
