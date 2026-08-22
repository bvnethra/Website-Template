import React, { useState } from 'react';
import { X, Lock, BookOpen, GraduationCap, Calendar, CheckCircle, Bell, ArrowRight, UserCheck, Shield } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const StudentPortalModal: React.FC = () => {
  const { isStudentPortalOpen, closeStudentPortal, theme, addNotification } = useTheme();
  const [studentId, setStudentId] = useState('EDX-2026-8842');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isStudentPortalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    addNotification('success', 'Student Portal Authenticated', 'Welcome back, Alex Morgan (Grade 11 / IB Honors track)');
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
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Edunexa Student Central</span>
            </div>
            <h2 className="text-xl font-bold font-serif">Student Portal & Canvas LMS</h2>
            <p className="text-xs text-slate-300 mt-0.5">Single sign-on access to schedules, grades, submissions & campus resources</p>
          </div>
          <button
            onClick={closeStudentPortal}
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
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <span className="font-bold block">Protected Academy Authentication</span>
                  <span>Demo credentials prefilled for instant dashboard preview.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Academy ID / Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-600" />
                  <span>Remember this device (30 days)</span>
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('A reset link has been dispatched to student registered mail.'); }} className="text-amber-800 font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In to Student Dashboard</span>
              </button>
            </form>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-800 text-white flex items-center justify-center font-serif font-bold text-lg">
                    AM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Alex Morgan</h3>
                    <p className="text-xs text-slate-500">ID: EDX-2026-8842 • Grade 11 (IB Diploma & STEM)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Active Enrolled
                </span>
              </div>

              {/* Student KPI Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-blue-900 uppercase block">Term GPA</span>
                  <span className="text-xl font-serif font-bold text-blue-950">3.94</span>
                  <span className="text-[10px] text-blue-700 font-medium">Top 5% Cohort</span>
                </div>
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase block">Attendance</span>
                  <span className="text-xl font-serif font-bold text-emerald-950">99.2%</span>
                  <span className="text-[10px] text-emerald-700 font-medium">108 / 109 Days</span>
                </div>
                <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-xl text-center">
                  <span className="text-[11px] font-bold text-amber-900 uppercase block">Due Tasks</span>
                  <span className="text-xl font-serif font-bold text-amber-950">2</span>
                  <span className="text-[10px] text-amber-700 font-medium">Lab Notebook due Fri</span>
                </div>
              </div>

              {/* Quick links */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Today's Schedule & Classes</span>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <div>
                        <span className="font-bold text-slate-900 block">AP Physics C & Quantum Mechanics</span>
                        <span className="text-[11px] text-slate-500">09:00 AM – 10:30 AM • Rutherford Science Pavilion Lab 4B</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">Room 402</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-amber-800" />
                      <div>
                        <span className="font-bold text-slate-900 block">Advanced Algorithmic Foundations</span>
                        <span className="text-[11px] text-slate-500">11:00 AM – 12:30 PM • Turing Computational Studio</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">Studio 12</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    closeStudentPortal();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => {
                    alert('Redirecting to Canvas LMS full dashboard environment...');
                    closeStudentPortal();
                  }}
                  style={{ backgroundColor: theme.primary }}
                  className="flex-1 py-2.5 rounded-xl text-white text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <span>Launch Full LMS App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};