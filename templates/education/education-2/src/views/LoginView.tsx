import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  X,
  Sparkles,
  BookOpen,
  QrCode,
  FileCheck2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState('EDV2026CS104');
  const [password, setPassword] = useState('eduvora@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot PIN Modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetId, setResetId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setError(null);
    if (newRole === 'student') {
      setStudentId('EDV2026CS104');
      setPassword('eduvora@2026');
    } else {
      setStudentId('FAC2026CS01');
      setPassword('eduvora@fac');
    }
  };

  const validateStudentId = (id: string) => {
    if (role === 'student') {
      // e.g. EDV2026CS104
      const regex = /^EDV\d{4}[A-Z]{2}\d{3}$/i;
      return regex.test(id.trim()) || id.trim().length >= 8;
    }
    return id.trim().length >= 5;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!studentId.trim()) {
      setError(role === 'student' ? 'Please provide your Student ID' : 'Please provide your Faculty ID');
      return;
    }

    if (role === 'student' && !validateStudentId(studentId)) {
      setError('Student ID format must follow EDV[Year][Dept][Roll], e.g., EDV2026CS104');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password / security PIN');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(studentId, password, role);
      if (result.success) {
        const from = (location.state as any)?.from?.pathname || '/portal';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An unexpected error occurred during secure authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetId.trim() || !resetEmail.trim()) return;
    setResetSuccess(true);
    setTimeout(() => {
      setIsForgotModalOpen(false);
      setResetSuccess(false);
      setResetId('');
      setResetEmail('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] flex flex-col justify-between selection:bg-[#FF6B4A]/20 selection:text-[#0D2F2F]">
      {/* Top University Brand Bar */}
      <header className="w-full bg-[#0D2F2F] text-white px-6 py-4 shadow-md border-b border-[#0D2F2F]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center text-white shadow-md font-serif font-black text-lg">
              EV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg tracking-tight">EDUVORA UNIVERSITY</span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FF6B4A]/20 text-[#FF6B4A] border border-[#FF6B4A]/30">
                  EXAM CELL & ERP
                </span>
              </div>
              <p className="text-[11px] text-slate-300">Office of the Controller of Examinations • Est. 1984</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#081E1E] hover:bg-[#1A4F4F] border border-[#1A4F4F] text-slate-200 text-xs font-semibold transition-all"
              title="Return to Eduvora University Public Website"
            >
              <span>← University Public Site</span>
            </button>

            <div className="hidden md:flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-[#081E1E] px-3 py-1.5 rounded-lg border border-[#1A4F4F]">
                <ShieldCheck className="w-4 h-4 text-[#FF6B4A]" />
                <span>TLS 1.3 256-Bit Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Login Canvas */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl bg-[#FDFBF7] rounded-3xl shadow-xl border border-[#EAE4D7] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Hero & System Information Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0D2F2F] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Texture Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1A4F4F]/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B4A]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A4F4F] border border-[#286B6B] text-xs font-semibold text-[#FF6B4A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Academic Session 2026–2027</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Academic Registry & Examination Gateway
                </h1>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
                  Access course registration, verified hall tickets, consolidated grade sheets, photocopy
                  applications, and the real-time revaluation audit tracker.
                </p>
              </div>

              {/* Portal Feature List */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#081E1E]/80 border border-[#1A4F4F]/70 text-xs">
                  <FileCheck2 className="w-5 h-5 text-[#FF6B4A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Instant Hall Ticket Generation</span>
                    <span className="text-slate-300">Digitally signed admit cards with QR validation and venue map.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#081E1E]/80 border border-[#1A4F4F]/70 text-xs">
                  <QrCode className="w-5 h-5 text-[#FF6B4A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Transparent Grade Book</span>
                    <span className="text-slate-300">Detailed CIA internal + End-Sem external score breakdowns.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#081E1E]/80 border border-[#1A4F4F]/70 text-xs">
                  <BookOpen className="w-5 h-5 text-[#FF6B4A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Revaluation & Review Hub</span>
                    <span className="text-slate-300">Track second evaluation mark diffs and Board hearings live.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Helper Credentials Card */}
            <div className="relative z-10 mt-8 pt-6 border-t border-[#1A4F4F]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Demo Credentials</span>
                <span className="text-[10px] text-[#FF6B4A] font-bold">1-Click Auto Fill</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleRoleChange('student');
                    setStudentId('EDV2026CS104');
                    setPassword('eduvora@2026');
                  }}
                  className="p-2.5 rounded-xl bg-[#1A4F4F]/70 hover:bg-[#1A4F4F] border border-[#286B6B] text-left transition-all group"
                >
                  <span className="text-[10px] text-slate-400 block font-medium">Student Demo</span>
                  <span className="text-xs font-bold text-white font-mono block">EDV2026CS104</span>
                  <span className="text-[10px] text-[#FF6B4A] group-hover:underline mt-0.5 block">Use Student PIN →</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleRoleChange('faculty');
                    setStudentId('FAC2026CS01');
                    setPassword('eduvora@fac');
                  }}
                  className="p-2.5 rounded-xl bg-[#1A4F4F]/70 hover:bg-[#1A4F4F] border border-[#286B6B] text-left transition-all group"
                >
                  <span className="text-[10px] text-slate-400 block font-medium">Faculty Chair</span>
                  <span className="text-xs font-bold text-white font-mono block">FAC2026CS01</span>
                  <span className="text-[10px] text-[#FF6B4A] group-hover:underline mt-0.5 block">Use Faculty PIN →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Login Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-[#FDFBF7]">
            <div>
              {/* Role Toggle Switch */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE4D7]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0D2F2F]">
                    Sign In to Eduvora Portal
                  </h2>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Select your portal role and enter your institutional identity
                  </p>
                </div>

                <div className="bg-[#EAE4D7] p-1 rounded-2xl flex items-center border border-[#DDD6C8]">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      role === 'student'
                        ? 'bg-[#0D2F2F] text-white shadow-sm'
                        : 'text-[#0D2F2F] hover:text-[#081E1E]'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('faculty')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      role === 'faculty'
                        ? 'bg-[#0D2F2F] text-white shadow-sm'
                        : 'text-[#0D2F2F] hover:text-[#081E1E]'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>Faculty</span>
                  </button>
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-bold block">Authentication Check</span>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* ID Input */}
                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider mb-2">
                    {role === 'student' ? 'University Student ID / Roll No.' : 'Faculty ID / Employee Code'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                      placeholder={role === 'student' ? 'e.g. EDV2026CS104' : 'e.g. FAC2026CS01'}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white border border-[#DDD6C8] text-[#0D2F2F] font-mono text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-[#FF6B4A] transition-all shadow-xs"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                    <span>Format: <strong>EDV[Year][Dept][Roll]</strong> (e.g. EDV2026CS104)</span>
                    {studentId && validateStudentId(studentId) && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Valid Format
                      </span>
                    )}
                  </p>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                      Password / Security PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs font-bold text-[#FF6B4A] hover:text-[#E55535] hover:underline"
                    >
                      Forgot PIN / Password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl bg-white border border-[#DDD6C8] text-[#0D2F2F] text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] focus:border-[#FF6B4A] transition-all shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-[#0D2F2F]"
                      aria-label="Toggle password view"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Privacy */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#FF6B4A] focus:ring-[#FF6B4A] border-[#DDD6C8]"
                    />
                    <span>Remember terminal authentication</span>
                  </label>

                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Single Sign-On Active</span>
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-2xl bg-[#FF6B4A] hover:bg-[#E55535] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authenticating with Central Registry...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In to {role === 'student' ? 'Student Portal' : 'Faculty Command'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Bottom Footer Help */}
            <div className="pt-8 mt-6 border-t border-[#EAE4D7] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0D2F2F]" />
                <span>Trouble signing in? Contact <strong>examcell@eduvora.edu</strong></span>
              </div>
              <span className="font-mono text-[11px]">Eduvora COE v4.8</span>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password / Reset PIN Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE4D7] p-6 sm:p-8 animate-in zoom-in-95 relative">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-[#0D2F2F] hover:bg-[#EAE4D7]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">Reset Portal PIN / Password</h3>
                <p className="text-xs text-slate-500">Self-service emergency PIN recovery</p>
              </div>
            </div>

            {resetSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Security PIN Dispatched!</h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  A temporary one-time password (OTP) and password reset link has been dispatched to your registered institutional email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your University Student ID and primary email. Our cryptographic key authority will issue a 6-digit OTP instantly.
                </p>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1.5">
                    Student ID / Employee ID
                  </label>
                  <input
                    type="text"
                    required
                    value={resetId}
                    onChange={(e) => setResetId(e.target.value.toUpperCase())}
                    placeholder="e.g. EDV2026CS104"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] font-mono text-xs font-bold focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1.5">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. a.rivera@student.eduvora.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-medium focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#DDD6C8] text-xs font-bold text-slate-700 hover:bg-[#EAE4D7]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E55535] text-white text-xs font-bold shadow-sm"
                  >
                    Send Reset Token
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Institutional Legal Footer */}
      <footer className="py-4 px-6 text-center text-xs text-slate-500 bg-[#EAE4D7]/50 border-t border-[#EAE4D7]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Eduvora University. All Rights Reserved. Controller of Examinations System.</span>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Examination By-Laws</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">FERPA & Academic Integrity</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Security Protocol</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
