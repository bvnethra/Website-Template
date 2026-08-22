import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  RefreshCw, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  X,
  FileCheck,
  Building,
  School,
  ChevronRight
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect') ? decodeURIComponent(searchParams.get('redirect')!) : '/portal';
  
  const { login, isAuthenticated, resetPasswordRequest } = useAuth();
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'faculty'>('student');
  const [studentId, setStudentId] = useState('EDV2026CS104');
  const [password, setPassword] = useState('eduvora@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7K9P');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Forgot Password Modal State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotStep, setForgotStep] = useState<'enter_id' | 'verify_otp' | 'success'>('enter_id');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // If already authenticated, allow direct proceed
  useEffect(() => {
    if (isAuthenticated) {
      // User is already logged in
    }
  }, [isAuthenticated]);

  // Generate random 4-char captcha
  const generateNewCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  const handleTabSwitch = (tab: 'student' | 'faculty') => {
    setActiveTab(tab);
    setLoginError(null);
    if (tab === 'student') {
      setStudentId('EDV2026CS104');
      setPassword('eduvora@2026');
    } else {
      setStudentId('FAC2026CS01');
      setPassword('faculty@2026');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    // Validate CAPTCHA
    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      setLoginError('Security CAPTCHA does not match. Please verify the 4-character code.');
      generateNewCaptcha();
      return;
    }

    setIsLoading(true);

    try {
      const res = await login(studentId, password, activeTab);
      if (res.success) {
        addToast({
          type: 'success',
          title: `Welcome back, ${activeTab === 'student' ? 'Alex Morgan' : 'Dr. Vance'}!`,
          message: 'Authenticated successfully. Redirecting to your examination dashboard.'
        });
        navigate(redirectUrl);
      } else {
        setLoginError(res.error || 'Authentication failed. Please check your credentials.');
        generateNewCaptcha();
      }
    } catch (err: any) {
      setLoginError('Unable to communicate with the Central Examination server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-Click Demo Logins
  const handleQuickDemoStudent = () => {
    setStudentId('EDV2026CS104');
    setPassword('eduvora@2026');
    setActiveTab('student');
    setCaptchaInput(captchaCode);
    setLoginError(null);
  };

  const handleQuickDemoFaculty = () => {
    setStudentId('FAC2026CS01');
    setPassword('faculty@2026');
    setActiveTab('faculty');
    setCaptchaInput(captchaCode);
    setLoginError(null);
  };

  // Handle forgot password request
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) {
      addToast({ type: 'error', title: 'Input Required', message: 'Please enter your Student ID or Registered Email.' });
      return;
    }
    const res = resetPasswordRequest(forgotInput);
    if (res.tempOtp) {
      setGeneratedOtp(res.tempOtp);
      setEnteredOtp(res.tempOtp); // prefill for testing ease
      setForgotStep('verify_otp');
      addToast({
        type: 'info',
        title: 'Security OTP Dispatched',
        message: res.message
      });
    }
  };

  const handleVerifyOtpAndReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp) {
      addToast({ type: 'error', title: 'Invalid OTP', message: 'The 6-digit OTP entered is incorrect.' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      addToast({ type: 'warning', title: 'Weak Password', message: 'Password must be at least 6 characters long.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({ type: 'error', title: 'Mismatch', message: 'New password and confirmation do not match.' });
      return;
    }

    setForgotStep('success');
    addToast({
      type: 'success',
      title: 'Password Updated',
      message: 'Your portal credentials have been updated successfully.'
    });
  };

  // Check ID format feedback
  const isStudentIdValid = studentId.toUpperCase().startsWith('EDV') || studentId.length >= 6;

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner Branding */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#E8EAE3]">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0D2F2F] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            E
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-tight text-[#0D2F2F] block leading-tight">
              EDUVORA UNIVERSITY
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#4A5D4E] uppercase">
              Central Examination & Academic Registry Portal
            </span>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-xs text-[#4A5D4E] font-medium">
          <div className="flex items-center gap-1.5 bg-[#EFECE4] px-3 py-1.5 rounded-lg border border-[#E0DCD3]">
            <ShieldCheck className="w-4 h-4 text-[#0D2F2F]" />
            <span>256-Bit SSL Encrypted Session</span>
          </div>
          <Link to="/" className="hover:text-[#0D2F2F] font-semibold flex items-center gap-1">
            Back to Home <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Authentication Card Grid */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Context & Examination Highlights */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAE6DD] text-[#0D2F2F] text-xs font-bold border border-[#DDD8CE]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Autonomous Examination Controller System</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0D2F2F] tracking-tight leading-tight">
            Sign In to Access Your Academic Registry
          </h1>

          <p className="text-sm text-[#4A5D4E] leading-relaxed">
            Secure, centralized gateway for verified students and academic faculty to manage semester exam registration, hall tickets, provisional marksheets, photocopy requests, and revaluation tracking.
          </p>

          {/* Feature Badges */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-[#E8EAE3]">
              <div className="p-2 rounded-lg bg-[#EFECE4] text-[#0D2F2F]">
                <FileCheck className="w-5 h-5 text-[#0D2F2F]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0D2F2F]">Digital Hall Ticket Issuance</h4>
                <p className="text-[11px] text-[#4A5D4E]">Instant downloadable admit cards with timetable and QR code verification.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/70 rounded-xl border border-[#E8EAE3]">
              <div className="p-2 rounded-lg bg-[#EFECE4] text-[#0D2F2F]">
                <ShieldCheck className="w-5 h-5 text-[#0D2F2F]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0D2F2F]">Revaluation & Script Review</h4>
                <p className="text-[11px] text-[#4A5D4E]">Transparent answer booklet photocopy scrutiny and score differential tracking.</p>
              </div>
            </div>
          </div>

          {/* Quick Demo Fillers for testing */}
          <div className="p-4 bg-[#EFECE4] rounded-2xl border border-[#E0DCD3] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#FF6B4A]" />
                Demo Credentials (1-Click Test)
              </span>
              <span className="text-[10px] bg-[#0D2F2F] text-white px-2 py-0.5 rounded-md font-bold">Fast Fill</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="btn-demo-student"
                onClick={handleQuickDemoStudent}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTab === 'student' && studentId === 'EDV2026CS104'
                    ? 'bg-[#0D2F2F] text-white border-[#0D2F2F] shadow-sm'
                    : 'bg-white text-[#0D2F2F] border-[#DDD8CE] hover:border-[#0D2F2F]'
                }`}
              >
                <div className="text-[11px] font-bold">Student Demo</div>
                <div className="text-[10px] opacity-80 font-mono">EDV2026CS104</div>
                <div className="text-[9px] opacity-70">Pass: eduvora@2026</div>
              </button>

              <button
                type="button"
                id="btn-demo-faculty"
                onClick={handleQuickDemoFaculty}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  activeTab === 'faculty' && studentId === 'FAC2026CS01'
                    ? 'bg-[#0D2F2F] text-white border-[#0D2F2F] shadow-sm'
                    : 'bg-white text-[#0D2F2F] border-[#DDD8CE] hover:border-[#0D2F2F]'
                }`}
              >
                <div className="text-[11px] font-bold">Faculty Demo</div>
                <div className="text-[10px] opacity-80 font-mono">FAC2026CS01</div>
                <div className="text-[9px] opacity-70">Pass: faculty@2026</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Login Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0DCD3] shadow-lg relative overflow-hidden">
            
            {/* Top Accent line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0D2F2F]" />

            {/* Portal Role Switcher Tabs */}
            <div className="flex bg-[#F4F1EA] p-1.5 rounded-2xl border border-[#E8EAE3] mb-6">
              <button
                type="button"
                id="tab-student-login"
                onClick={() => handleTabSwitch('student')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'student'
                    ? 'bg-[#0D2F2F] text-white shadow-xs'
                    : 'text-[#4A5D4E] hover:text-[#0D2F2F]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Portal</span>
              </button>

              <button
                type="button"
                id="tab-faculty-login"
                onClick={() => handleTabSwitch('faculty')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'faculty'
                    ? 'bg-[#0D2F2F] text-white shadow-xs'
                    : 'text-[#4A5D4E] hover:text-[#0D2F2F]'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Faculty / Staff</span>
              </button>
            </div>

            {/* Login Header */}
            <div className="mb-6">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0D2F2F]">
                {activeTab === 'student' ? 'Student Credential Login' : 'Faculty & Staff Authentication'}
              </h2>
              <p className="text-xs text-[#4A5D4E] mt-1">
                {activeTab === 'student' 
                  ? 'Enter your University Roll Number / Student ID and your secret password or DOB.'
                  : 'Enter your Faculty Staff ID and university enterprise directory credentials.'}
              </p>
            </div>

            {/* Error Notification */}
            {loginError && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Input 1: Student ID / Roll Number */}
              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{activeTab === 'student' ? 'University Student ID / Roll No.' : 'Faculty ID / Employee Code'}</span>
                  <span className="text-[10px] font-normal text-[#4A5D4E] lowercase">
                    {activeTab === 'student' ? 'format: EDV2026CS104' : 'format: FAC2026CS01'}
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A5D4E]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="input-student-id"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                    placeholder={activeTab === 'student' ? 'e.g. EDV2026CS104' : 'e.g. FAC2026CS01'}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm font-mono font-medium text-[#0D2F2F] placeholder-[#A7B3A2] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F] focus:border-transparent transition-all"
                  />
                  {isStudentIdValid && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* Input 2: Password / DOB */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                    Password / Date of Birth
                  </label>
                  <button
                    type="button"
                    id="btn-forgot-password-modal"
                    onClick={() => {
                      setIsForgotModalOpen(true);
                      setForgotStep('enter_id');
                      setForgotInput(studentId);
                    }}
                    className="text-xs font-bold text-[#FF6B4A] hover:underline"
                  >
                    Forgot Password / Reset PIN?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4A5D4E]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password or YYYY-MM-DD"
                    required
                    className="w-full pl-10 pr-12 py-3 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm text-[#0D2F2F] placeholder-[#A7B3A2] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    id="btn-toggle-password-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#4A5D4E] hover:text-[#0D2F2F]"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Input 3: Security CAPTCHA Verification */}
              <div className="p-3.5 bg-[#F7F4EE] rounded-2xl border border-[#E8EAE3] space-y-2">
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                  Security Check (CAPTCHA Verification)
                </label>
                <div className="flex items-center gap-3">
                  {/* Visual Captcha Box */}
                  <div className="px-4 py-2 bg-[#0D2F2F] rounded-xl text-white font-mono text-lg font-extrabold tracking-widest select-none shadow-inner border border-[#082020] relative">
                    <span className="italic transform -rotate-3 inline-block">{captchaCode}</span>
                    <span className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    type="button"
                    id="btn-refresh-captcha"
                    onClick={generateNewCaptcha}
                    className="p-2.5 rounded-xl bg-white border border-[#DDD8CE] text-[#4A5D4E] hover:text-[#0D2F2F] hover:bg-[#EFECE4] transition-colors"
                    title="Refresh CAPTCHA"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    id="input-captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter 4 characters"
                    maxLength={4}
                    required
                    className="flex-1 py-2.5 px-3 bg-white border border-[#DDD8CE] rounded-xl text-sm font-mono text-[#0D2F2F] uppercase placeholder-[#A7B3A2] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-portal-submit-login"
                disabled={isLoading}
                className="w-full mt-2 bg-[#0D2F2F] hover:bg-[#082020] active:scale-[0.99] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials & Audit Log...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Enter Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#FF6B4A]" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Notice */}
            <div className="mt-6 pt-4 border-t border-[#E8EAE3] text-center text-xs text-[#4A5D4E]">
              <span>Need examination grievance assistance? </span>
              <a href="mailto:coe@eduvora.edu" className="font-bold text-[#0D2F2F] hover:underline">
                Contact Office of COE (coe@eduvora.edu)
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Forgot Password / Reset PIN Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#DDD8CE] shadow-2xl relative">
            
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#4A5D4E] hover:bg-[#F4F1EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D2F2F] text-white flex items-center justify-center">
                <KeyRound className="w-5 h-5 text-[#FF6B4A]" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0D2F2F]">Credential Reset Desk</h3>
                <p className="text-xs text-[#4A5D4E]">Multi-Factor OTP Recovery Simulation</p>
              </div>
            </div>

            {forgotStep === 'enter_id' && (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <p className="text-xs text-[#4A5D4E] leading-relaxed">
                  Enter your University Student ID (e.g. <strong>EDV2026CS104</strong>) or your registered student email address. A one-time verification token will be dispatched.
                </p>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">Student ID / Email</label>
                  <input
                    type="text"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    placeholder="EDV2026CS104 or alex@student.eduvora.edu"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm font-mono text-[#0D2F2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D2F2F] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#082020] transition-colors"
                >
                  Dispatch Verification OTP
                </button>
              </form>
            )}

            {forgotStep === 'verify_otp' && (
              <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                  A simulated OTP code (<strong>{generatedOtp}</strong>) has been generated.
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    maxLength={6}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm font-mono text-center tracking-widest font-bold text-[#0D2F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">New Security Password / PIN</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm text-[#0D2F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    required
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-sm text-[#0D2F2F]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0D2F2F] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#082020] transition-colors"
                >
                  Verify OTP & Update Password
                </button>
              </form>
            )}

            {forgotStep === 'success' && (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-heading text-lg font-bold text-[#0D2F2F]">Credentials Reset Successfully</h4>
                <p className="text-xs text-[#4A5D4E]">
                  You can now log in using your newly configured security password.
                </p>
                <button
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setPassword(newPassword || 'eduvora@2026');
                  }}
                  className="w-full bg-[#0D2F2F] text-white py-2.5 rounded-xl font-bold text-xs"
                >
                  Return to Sign In
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Bottom Disclaimer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-[#4A5D4E] pt-6 border-t border-[#E8EAE3]">
        <p>© 2026 Eduvora University. Controller of Examinations Academic Management System (v4.8.2). All rights reserved.</p>
      </div>

    </div>
  );
};
