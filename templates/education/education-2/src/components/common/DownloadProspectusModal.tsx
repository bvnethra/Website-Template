import React, { useState } from 'react';
import { X, FileText, Download, CheckCircle, Sparkles, Building, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const DownloadProspectusModal: React.FC = () => {
  const { isProspectusModalOpen, closeProspectusModal, theme, addNotification } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gradeOfInterest: 'High School Honors & STEM (Grades 9-12)',
    country: 'United States',
  });
  const [downloaded, setDownloaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isProspectusModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDownloaded(true);
      addNotification('success', 'Prospectus Generated', 'Official 2026–2027 Edunexa Academic Guide dispatched.');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div
          style={{ backgroundColor: theme.primary }}
          className="p-6 text-white flex items-center justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Official Institutional Guide</span>
            </div>
            <h2 className="text-xl font-bold font-serif">Download 2026–2027 Prospectus</h2>
            <p className="text-xs text-slate-300 mt-0.5">Comprehensive curriculum guides, faculty profiles, lab specs & admission criteria</p>
          </div>
          <button
            onClick={closeProspectusModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors relative z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!downloaded ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Hayes"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Program Level of Interest
                  </label>
                  <select
                    value={formData.gradeOfInterest}
                    onChange={(e) => setFormData({ ...formData, gradeOfInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    <option>High School Honors & STEM (Grades 9-12)</option>
                    <option>Middle School Exploratory (Grades 6-8)</option>
                    <option>Primary & Foundation (Grades K-5)</option>
                    <option>International Baccalaureate (IB) Diploma</option>
                    <option>Advanced Quantum & AI Fellowship</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Your information is protected under our strict academic privacy policy. No promotional spam.</span>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating Custom PDF Prospectus...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Instant PDF & Send to Email</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-bold text-slate-900">Prospectus Ready!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  We have prepared the complete 64-page <strong>Edunexa 2026–2027 Prospectus</strong> for {formData.name || 'you'}.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto text-left flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-amber-800 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Edunexa_Prospectus_2026.pdf</span>
                    <span className="text-[11px] text-slate-500">14.8 MB • High Resolution Academic Guide</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const blob = new Blob([
                      `EDUNEXA — 2026-2027 OFFICIAL PROSPECTUS\n\nRecipient: ${formData.name}\nEmail: ${formData.email}\nProgram Track: ${formData.gradeOfInterest}\n\n1. Institutional Overview & 25-Year Legacy\n2. STEM, IB & Arts Curricular Matrices\n3. Faculty Scholars & Laboratory Specs\n4. Admissions Timelines & Financial Grants\n\nThank you for your interest in Edunexa.`
                    ], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Edunexa_Prospectus_2026.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-3 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold hover:bg-amber-900 transition-colors flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save File</span>
                </button>
              </div>

              <div className="pt-3 flex gap-3 max-w-md mx-auto">
                <button
                  onClick={closeProspectusModal}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};