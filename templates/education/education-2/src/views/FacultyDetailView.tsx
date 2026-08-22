import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  MapPin,
  BookOpen,
  Award,
  ExternalLink,
  Sparkles,
  Calendar,
  FileText,
  Clock,
  Send,
  CheckCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockFaculty, mockPrograms } from '../data/mockData';

interface FacultyDetailViewProps {
  facultyId?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const FacultyDetailView: React.FC<FacultyDetailViewProps> = ({ facultyId, onNavigate }) => {
  const { theme, addNotification } = useTheme();

  const faculty = mockFaculty.find((f) => f.id === facultyId) || mockFaculty[0];

  const [message, setMessage] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message) {
      addNotification('warning', 'Incomplete Inquiry', 'Please include your email and message.');
      return;
    }
    setSent(true);
    addNotification('success', 'Message Transmitted', `Your inquiry has been sent to Professor ${faculty.name.split(' ').pop()}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('faculty')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Faculty Directory</span>
        </button>
      </div>

      {/* Main Faculty Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
          <img
            src={faculty.avatar}
            alt={faculty.name}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl object-cover border-4 border-slate-100 shadow-md"
          />
        </div>

        <div className="md:col-span-8 lg:col-span-9 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
              {faculty.departmentName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
              {faculty.name}
            </h1>
            <p className="text-sm font-semibold text-slate-600">{faculty.title}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{faculty.email}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Office: {faculty.office}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Award className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{faculty.qualification}</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Office Hours: {faculty.officeHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bio & Publications */}
        <div className="lg:col-span-8 space-y-8">
          {/* Biography */}
          <div className="space-y-3">
            <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Scholarly Biography & Research Focus
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {faculty.bio}
            </p>
          </div>

          {/* Research Specializations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Research Domains & Key Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {faculty.specialization.map((spec, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Selected Peer-Reviewed Publications
            </h3>
            <div className="space-y-3">
              {faculty.publications.map((pub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-mono font-bold text-amber-800">{pub.year}</span>
                    <span className="italic">{pub.journal}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">{pub.title}</h4>
                  <div className="text-[11px] text-slate-400 font-mono">Citations: {pub.citations.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Contact Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-900">
              Schedule Office Hours / Inquiries
            </h3>
            <p className="text-xs text-slate-600">
              Prospective advisees, graduate researchers, and peer collaborators may contact Professor {faculty.name.split(' ').pop()} directly.
            </p>

            {!sent ? (
              <form onSubmit={handleContact} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Email *</label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Subject / Inquiry *</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your research inquiry or office hour request..."
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: theme.primary }}
                  className="w-full py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto" />
                <span className="text-xs font-bold text-emerald-950 block">Message Delivered</span>
                <p className="text-[11px] text-emerald-800">
                  Professor {faculty.name.split(' ').pop()} will respond to {senderEmail} within 2 academic working days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
