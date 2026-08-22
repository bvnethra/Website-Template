import React, { useState } from 'react';
import { X, Lock, Users, CreditCard, Award, Calendar, CheckCircle, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ParentPortalModal: React.FC = () => {
  const { isParentPortalOpen, closeParentPortal, theme, addNotification } = useTheme();
  const [parentEmail, setParentEmail] = useState('j.morgan@family.net');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isParentPortalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    addNotification('success', 'Parent Gateway Authenticated', 'Connected to Edunexa Family Portal');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div
          style={{ backgroundColor: theme.primary }}
          className="p-6 text-white flex items-center justify-between relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Edunexa Family Gateway</span>
            </div>
            <h2 className="text-xl font-bold font-serif">Parent & Guardian Portal</h2>
            <p className="text-xs text-slate-300 mt-0.5">Tuition payments, academic reports, attendance telemetry & faculty appointments</p>
          </div>
          <button
            onClick={closeParentPortal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors relative z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-800 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-950">
                  <span className="font-bold block">Encrypted Family Connection</span>
                  <span>Demo credentials prefilled for verified parent account testing.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parent Registered Email
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Portal Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-600" />
                  <span>Keep me logged in</span>
                </label>
                <a href="#support" onClick={(e) => { e.preventDefault(); alert('Parent help desk contact: support@edunexa.edu'); }} className="text-amber-800 font-bold hover:underline">
                  Need Help?
                </a>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Enter Parent Command Center</span>
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Dr. Jonathan & Clara Morgan</h3>
                  <p className="text-xs text-slate-500">Student: Alex Morgan (Grade 11, ID: EDX-8842)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  Verified Guardian
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-900 uppercase">Tuition & Statements</span>
                    <CreditCard className="w-4 h-4 text-amber-800" />
                  </div>
                  <span className="text-xl font-serif font-bold text-amber-950 block">$0.00 Due</span>
                  <span className="text-[11px] text-amber-800">Fall 2026 Installment fully settled.</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-900 uppercase">Next Report Card</span>
                    <Award className="w-4 h-4 text-emerald-800" />
                  </div>
                  <span className="text-xl font-serif font-bold text-emerald-950 block">Mid-Term Oct 28</span>
                  <span className="text-[11px] text-emerald-800">Interim feedback published on LMS.</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Upcoming Parent-Teacher Consultations</span>
                <p className="text-slate-600">
                  Virtual 1-on-1 advisor conferences with Dr. Chen (Physics) and Mrs. Vance (Mathematics) available for scheduling.
                </p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => alert('Conference slot reserved for Thursday 4:00 PM EST via Zoom.')}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold text-xs hover:bg-slate-800"
                  >
                    Schedule 15-Min Conference
                  </button>
                  <button
                    onClick={() => alert('Download complete PDF academic ledger & attendance statement.')}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-xs hover:bg-slate-200"
                  >
                    Download Statements
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    closeParentPortal();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700"
                >
                  Sign Out
                </button>
                <button
                  onClick={closeParentPortal}
                  style={{ backgroundColor: theme.primary }}
                  className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <span>Close Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};