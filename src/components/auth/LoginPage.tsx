import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  BookOpen,
  ArrowLeft,
  X,
  Send
} from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('student');
  const [studentId, setStudentId] = useState('EDV2026CS104');
  const [password, setPassword] = useState('eduvora@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/portal';

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMessage('');
    if (newRole === 'student') {
      setStudentId('EDV2026CS104');
      setPassword('eduvora@2026');
    } else {
      setStudentId('FAC2026CS01');
      setPassword('eduvora@faculty');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const res = await login(studentId, password, role);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const fillQuickCredentials = (type: 'student' | 'faculty') => {
    if (type === 'student') {
      setRole('student');
      setStudentId('EDV2026CS104');
      setPassword('eduvora@2026');
    } else {
      setRole('faculty');
      setStudentId('FAC2026CS01');
      setPassword('eduvora@faculty');
    }
    setErrorMessage('');
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowResetModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] font-sans flex flex-col justify-between selection:bg-[#FF6B4A] selection:text-white">
      
      {/* Top Header */}
      <header className="border-b border-[#E5DFD5] bg-[#F7F4EE]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-[#FF6B4A]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#0D2F2F] font-display">
                Eduvora
              </span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-bold text-[#FF6B4A] uppercase tracking-wider bg-[#FF6B4A]/10 px-2 py-0.5 rounded-full">
                University Portal
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="text-xs font-bold text-[#0D2F2F] hover:text-[#FF6B4A] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public University Site</span>
          </Link>
        </div>
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: University Branding & Live Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F]">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
              <span>Academic Year 2025–2026 • Spring Term</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D2F2F] font-display tracking-tight leading-[1.15]">
                Unified Student & Examination Portal
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#2D4F4F] leading-relaxed">
                Access end-semester exam registration, dynamic hall tickets with security QR, revaluation tracking, verified transcripts, and academic grievance desk.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#0D2F2F]/5 text-[#0D2F2F] flex items-center justify-center mb-2 font-bold">
                  <BookOpen className="w-4 h-4 text-[#FF6B4A]" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2F2F]">Hall Ticket & Admit Card</h4>
                <p className="text-[11px] text-[#476666] mt-0.5">Printable admit cards with room & seat allocations.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#0D2F2F]/5 text-[#0D2F2F] flex items-center justify-center mb-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#0D2F2F]" />
                </div>
                <h4 className="text-xs font-bold text-[#0D2F2F]">Revaluation & Review</h4>
                <p className="text-[11px] text-[#476666] mt-0.5">Real-time grade difference audit tracker.</p>
              </div>
            </div>

            {/* Quick Demo Credentials Bar */}
            <div className="p-4 rounded-2xl bg-[#EFECE4] border border-[#D8D0C5] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D2F2F] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  1-Click Demo Logins
                </span>
                <span className="text-[10px] text-[#476666] uppercase font-semibold">Pre-Configured</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fillQuickCredentials('student')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D8D0C5] text-[11px] font-bold text-[#0D2F2F] shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3 h-3 text-[#FF6B4A]" />
                  <span>Fill Student (EDV2026CS104)</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillQuickCredentials('faculty')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D8D0C5] text-[11px] font-bold text-[#0D2F2F] shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Building2 className="w-3 h-3 text-[#0D2F2F]" />
                  <span>Fill Faculty (FAC2026CS01)</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Dedicated Login Card */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xl shadow-[#0D2F2F]/5 relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0D2F2F] via-[#FF6B4A] to-[#0D2F2F]" />

              {/* Role Switcher Tabs */}
              <div className="flex p-1 bg-[#F7F4EE] rounded-2xl border border-[#E5DFD5] mb-6">
                <button
                  type="button"
                  onClick={() => handleRoleChange('student')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    role === 'student'
                      ? 'bg-[#0D2F2F] text-white shadow-sm'
                      : 'text-[#2D4F4F] hover:text-[#0D2F2F]'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 ${role === 'student' ? 'text-[#FF6B4A]' : ''}`} />
                  <span>Student Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('faculty')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    role === 'faculty'
                      ? 'bg-[#0D2F2F] text-white shadow-sm'
                      : 'text-[#2D4F4F] hover:text-[#0D2F2F]'
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${role === 'faculty' ? 'text-[#FF6B4A]' : ''}`} />
                  <span>Faculty Portal</span>
                </button>
              </div>

              {/* Card Title */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D2F2F] font-display">
                  {role === 'student' ? 'Student Sign In' : 'Faculty Access Sign In'}
                </h2>
                <p className="text-xs text-[#476666] mt-1">
                  {role === 'student' 
                    ? 'Enter your assigned University ID and secret password'
                    : 'Enter your Faculty Employee ID to access grading & scrutiny'}
                </p>
              </div>

              {/* Error Message alert */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Authentication Notice:</span> {errorMessage}
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* University ID Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="student-id-input" className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                      {role === 'student' ? 'University Student ID' : 'Faculty Employee ID'}
                    </label>
                    <span className="text-[10px] text-[#476666] font-mono">Format: EDV2026CS104</span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#476666]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      id="student-id-input"
                      type="text"
                      required
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                      placeholder={role === 'student' ? 'EDV2026CS104' : 'FAC2026CS01'}
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-[#0D2F2F] placeholder-[#8A9E9E] text-xs sm:text-sm font-mono focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/20 transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="password-input" className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                      Secret Password / PIN
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className="text-[11px] font-bold text-[#FF6B4A] hover:underline"
                    >
                      Forgot / Reset PIN?
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#476666]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-[#0D2F2F] placeholder-[#8A9E9E] text-xs sm:text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/20 transition-all font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#476666] hover:text-[#0D2F2F] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  id="portal-login-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 sm:py-3.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] active:bg-[#D44627] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md shadow-[#FF6B4A]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Registry Credentials...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In to {role === 'student' ? 'Student Portal' : 'Faculty Console'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Security & Registry Trust Footnote */}
              <div className="mt-6 pt-5 border-t border-[#E5DFD5] flex items-center justify-between text-[11px] text-[#476666]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  256-Bit SSL Secured Session
                </span>
                <span>Eduvora v4.8 LTS</span>
              </div>

            </motion.div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2F2F]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-md bg-white rounded-3xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-7 relative overflow-hidden"
            >
              <button
                onClick={() => setShowResetModal(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-[#476666] hover:text-[#0D2F2F] hover:bg-[#F7F4EE] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#FF6B4A]/10 text-[#FF6B4A] flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#0D2F2F] font-display">
                Reset University PIN / Password
              </h3>
              <p className="text-xs text-[#476666] mt-1 leading-relaxed">
                Enter your registered Student University Email ID (e.g. <code>student@eduvora.edu</code>). We will dispatch an OTP verification link.
              </p>

              {resetSent ? (
                <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold">Reset Instructions Dispatched!</div>
                    <p className="text-[11px] text-emerald-700 mt-0.5">Please check your registered university inbox and SMS alerts.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                      Registered Student Email
                    </label>
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="student.id@student.eduvora.edu"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    <span>Send Verification Token</span>
                  </button>
                </form>
              )}

              <div className="mt-4 pt-4 border-t border-[#E5DFD5] text-center text-xs text-[#476666]">
                Need immediate help? Contact <a href="mailto:support@eduvora.edu" className="text-[#FF6B4A] font-bold">support@eduvora.edu</a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-[#E5DFD5] bg-[#F7F4EE] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#476666] gap-2">
          <div>
            © {new Date().getFullYear()} Eduvora University. Office of Academic Registry.
          </div>
          <div className="flex items-center gap-4">
            <a href="#rules" className="hover:text-[#0D2F2F] transition-colors">Exam Guidelines</a>
            <a href="#privacy" className="hover:text-[#0D2F2F] transition-colors">Privacy & Security</a>
            <a href="#contact" className="hover:text-[#0D2F2F] transition-colors">Registrar Helpdesk</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
