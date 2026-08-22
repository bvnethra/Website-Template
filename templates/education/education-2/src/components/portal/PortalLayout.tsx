import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  ClipboardList,
  FileCheck,
  Award,
  Copy,
  RotateCcw,
  Scale,
  UserCheck,
  LifeBuoy,
  ShieldAlert,
  GraduationCap,
  LayoutDashboard,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const PortalLayout: React.FC = () => {
  const { currentUser, role, logout, notices, markNoticeRead, isExamRegistered } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNoticesDrawerOpen, setIsNoticesDrawerOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [idCopied, setIdCopied] = useState(false);

  const unreadNoticesCount = notices.filter((n) => n.isNew).length;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const copyStudentId = () => {
    if (currentUser?.studentId) {
      navigator.clipboard.writeText(currentUser.studentId);
      setIdCopied(true);
      setTimeout(() => setIdCopied(false), 2000);
    }
  };

  const navItems = [
    {
      to: '/portal',
      label: 'Portal Overview',
      icon: LayoutDashboard,
      badge: null,
      exact: true,
    },
    {
      to: '/portal/notices',
      label: 'Notice Board',
      icon: Bell,
      badge: unreadNoticesCount > 0 ? `${unreadNoticesCount} New` : null,
      badgeColor: 'bg-[#FF6B4A] text-white',
    },
    {
      to: '/portal/exam-apply',
      label: 'Exam Application',
      icon: ClipboardList,
      badge: isExamRegistered ? 'Registered' : 'Action Required',
      badgeColor: isExamRegistered ? 'bg-emerald-800 text-emerald-200' : 'bg-[#FF6B4A] text-white',
    },
    {
      to: '/portal/hall-ticket',
      label: 'Download Hall Ticket',
      icon: FileCheck,
      badge: 'Admit Card Ready',
      badgeColor: 'bg-emerald-700 text-white',
    },
    {
      to: '/portal/results',
      label: 'Exam Results',
      icon: Award,
      badge: 'Sem 1–5',
      badgeColor: 'bg-[#1A4F4F] text-[#FF6B4A]',
    },
    {
      to: '/portal/photocopy',
      label: 'Photocopy Application',
      icon: Copy,
      badge: null,
    },
    {
      to: '/portal/revaluation',
      label: 'Revaluation Hub',
      icon: RotateCcw,
      badge: 'Diff Tracker',
      badgeColor: 'bg-[#FF6B4A]/20 text-[#FF6B4A] border border-[#FF6B4A]/40',
    },
    {
      to: '/portal/review',
      label: 'Review Hub',
      icon: Scale,
      badge: 'Board Hearing',
      badgeColor: 'bg-[#081E1E] text-slate-300',
    },
    {
      to: '/portal/profile',
      label: 'Academic Profile',
      icon: UserCheck,
      badge: null,
    },
    {
      to: '/portal/support',
      label: 'Helpdesk & Grievance',
      icon: LifeBuoy,
      badge: null,
    },
    {
      to: '/portal/security',
      label: 'Login History & Security',
      icon: ShieldAlert,
      badge: 'Audit Log',
      badgeColor: 'bg-[#1A4F4F] text-slate-300',
    },
  ];

  // Helper to determine current route title
  const getCurrentTitle = () => {
    const item = navItems.find((n) => n.to === location.pathname);
    return item ? item.label : 'Student Examination Portal';
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] flex flex-col font-sans selection:bg-[#FF6B4A]/20 selection:text-[#0D2F2F]">
      {/* 1. TOP UTILITY HEADER */}
      <header className="sticky top-0 z-30 bg-[#0D2F2F] text-white px-4 sm:px-6 py-3 shadow-md border-b border-[#1A4F4F]/40 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1A4F4F]"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Crest */}
          <div
            onClick={() => navigate('/portal')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF6B4A] flex items-center justify-center text-white font-serif font-black shadow-md group-hover:scale-105 transition-transform">
              EV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg tracking-tight leading-none text-white">
                  EDUVORA UNIVERSITY
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#FF6B4A]/20 text-[#FF6B4A] border border-[#FF6B4A]/30">
                  COE ERP
                </span>
              </div>
              <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-0.5 hidden sm:block">
                Academic & Examination Command Center
              </p>
            </div>
          </div>
        </div>

        {/* Center Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-300 bg-[#081E1E] px-3.5 py-1.5 rounded-full border border-[#1A4F4F]">
          <span>Portal</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[#FF6B4A] font-bold">{getCurrentTitle()}</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">AY 2026–2027</span>
        </div>

        {/* Right quick controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Return to University Main Website */}
          <button
            onClick={() => navigate('/')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081E1E] hover:bg-[#1A4F4F] border border-[#1A4F4F] text-slate-200 text-xs font-semibold transition-all group"
            title="Go to Eduvora University Public Website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>University Site</span>
          </button>

          {/* Quick Hall Ticket trigger */}
          <button
            onClick={() => navigate('/portal/hall-ticket')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E55535] text-white text-xs font-bold shadow-xs transition-all"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Admit Card</span>
          </button>

          {/* Notices Bell Trigger */}
          <button
            onClick={() => setIsNoticesDrawerOpen(true)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1A4F4F] transition-colors relative"
            title="View Circulars & Urgent Notices"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            {unreadNoticesCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FF6B4A] ring-2 ring-[#0D2F2F] animate-pulse" />
            )}
          </button>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#081E1E] hover:bg-[#1A4F4F] border border-[#1A4F4F] text-left transition-colors"
            >
              <img
                src={currentUser?.avatarUrl}
                alt={currentUser?.fullName}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#FF6B4A]"
              />
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentUser?.fullName}
                </span>
                <span className="text-[10px] text-slate-300 font-mono block">
                  {currentUser?.studentId}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-[#FDFBF7] text-[#0D2F2F] rounded-2xl shadow-2xl border border-[#EAE4D7] p-2 z-50 animate-in fade-in zoom-in-95"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="p-3 bg-[#EAE4D7]/50 rounded-xl mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] block">
                    {role === 'student' ? 'Enrolled Student' : 'Faculty Member'}
                  </span>
                  <h4 className="font-bold text-xs text-[#0D2F2F] mt-0.5">{currentUser?.fullName}</h4>
                  <p className="text-[11px] font-mono text-slate-600">{currentUser?.studentId}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{currentUser?.program}</p>
                </div>

                <div className="space-y-1 text-xs font-semibold">
                  <button
                    onClick={() => navigate('/')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2 text-slate-800"
                  >
                    <ExternalLink className="w-4 h-4 text-[#FF6B4A]" />
                    <span>University Public Website</span>
                  </button>
                  <button
                    onClick={() => navigate('/portal/profile')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-[#0D2F2F]" />
                    <span>View Academic Profile</span>
                  </button>
                  <button
                    onClick={() => navigate('/portal/security')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-[#0D2F2F]" />
                    <span>Login Audit & Sessions</span>
                  </button>
                  <button
                    onClick={() => navigate('/portal/support')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#EAE4D7] flex items-center gap-2"
                  >
                    <LifeBuoy className="w-4 h-4 text-[#0D2F2F]" />
                    <span>Helpdesk & Support</span>
                  </button>
                </div>

                <div className="mt-2 pt-2 border-t border-[#EAE4D7]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-700 flex items-center gap-2 font-bold text-xs"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT: COLLAPSIBLE SIDEBAR + MAIN VIEWPORT */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Collapsible) */}
        <aside
          className={`hidden lg:flex flex-col justify-between bg-[#081E1E] text-white border-r border-[#1A4F4F]/40 transition-all duration-300 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Top ID Card & Navigation */}
          <div className="flex-1 overflow-y-auto py-5 px-3 space-y-4">
            {/* Quick Link to University Site */}
            <button
              onClick={() => navigate('/')}
              className="w-full p-2.5 rounded-xl bg-[#0D2F2F] hover:bg-[#1A4F4F] border border-[#1A4F4F] text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all group shadow-xs"
              title="Return to University Public Website"
            >
              <ExternalLink className="w-4 h-4 text-[#FF6B4A]" />
              {!sidebarCollapsed && <span className="truncate">← University Public Site</span>}
            </button>

            {/* Student ID Badge */}
            {!sidebarCollapsed ? (
              <div className="p-3.5 rounded-2xl bg-[#0D2F2F] border border-[#1A4F4F] shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B4A]/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <img
                    src={currentUser?.avatarUrl}
                    alt={currentUser?.fullName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#FF6B4A] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-white truncate">{currentUser?.fullName}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[11px] font-mono font-bold text-[#FF6B4A]">
                        {currentUser?.studentId}
                      </span>
                      <button
                        onClick={copyStudentId}
                        className="text-slate-400 hover:text-white p-0.5"
                        title="Copy Student ID"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {idCopied && (
                  <div className="mt-2 text-[10px] text-emerald-300 font-bold bg-emerald-950/60 p-1 rounded text-center">
                    Student ID Copied!
                  </div>
                )}

                <div className="mt-3 pt-2.5 border-t border-[#1A4F4F] flex items-center justify-between text-[10px] text-slate-300">
                  <span>Semester: <strong>{currentUser?.semester}</strong></span>
                  <span>CGPA: <strong className="text-[#FF6B4A]">{currentUser?.cgpa}</strong></span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-bold">
                    Active
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-2 rounded-xl bg-[#0D2F2F] border border-[#1A4F4F]">
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.fullName}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#FF6B4A]"
                />
                <span className="text-[10px] font-mono font-bold text-[#FF6B4A] mt-1.5">S6</span>
              </div>
            )}

            {/* Nav Links */}
            <nav className="space-y-1 pt-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all group ${
                        isActive
                          ? 'bg-[#FF6B4A] text-white shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-[#1A4F4F]/60'
                      }`
                    }
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`ml-2 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider shrink-0 ${
                              item.badgeColor || 'bg-[#1A4F4F] text-slate-200'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Collapse Trigger & Logout */}
          <div className="p-3 border-t border-[#1A4F4F]/40 space-y-2">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2 px-3 rounded-xl bg-[#0D2F2F] hover:bg-[#1A4F4F] text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Menu className="w-4 h-4" />
              {!sidebarCollapsed && <span>Collapse Sidebar</span>}
            </button>

            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex animate-in fade-in">
            <div className="w-72 bg-[#081E1E] text-white h-full flex flex-col justify-between p-4 shadow-2xl animate-in slide-in-from-left">
              <div className="space-y-4 overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#1A4F4F]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6B4A] flex items-center justify-center font-serif font-black text-white text-sm">
                      EV
                    </div>
                    <span className="font-serif font-bold text-sm text-white">EDUVORA ERP</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile ID Badge */}
                <div className="p-3 rounded-xl bg-[#0D2F2F] border border-[#1A4F4F]">
                  <h4 className="text-xs font-bold text-white">{currentUser?.fullName}</h4>
                  <p className="text-[11px] font-mono text-[#FF6B4A]">{currentUser?.studentId}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{currentUser?.program}</p>
                </div>

                {/* Return to University Main Site */}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#0D2F2F] hover:bg-[#1A4F4F] border border-[#1A4F4F] text-slate-200 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4 text-[#FF6B4A]" />
                  <span>← University Public Site</span>
                </button>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#FF6B4A] text-white shadow-md'
                              : 'text-slate-300 hover:text-white hover:bg-[#1A4F4F]'
                          }`
                        }
                      >
                        <IconComponent className="w-4 h-4" />
                        <div className="flex-1 flex items-center justify-between">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold bg-[#1A4F4F] text-slate-200">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-3 border-t border-[#1A4F4F]">
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-xl bg-red-950/60 text-red-300 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F7F4EE] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* 3. NOTICES DRAWER (Modal / Slide-Over) */}
      {isNoticesDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl border-l border-[#EAE4D7] flex flex-col justify-between p-6 animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE4D7]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#0D2F2F] text-[#FF6B4A] flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#0D2F2F]">Official Circulars</h3>
                    <p className="text-xs text-slate-500">Controller of Examinations Notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsNoticesDrawerOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-[#0D2F2F] hover:bg-[#EAE4D7]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => markNoticeRead(notice.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      notice.isNew
                        ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                        : 'bg-white border-[#EAE4D7] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0D2F2F] text-white">
                        {notice.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">{notice.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-[#0D2F2F] leading-snug">{notice.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {notice.content}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 italic">Issued by {notice.issuedBy}</span>
                      <span className="text-[#FF6B4A] font-bold flex items-center gap-1 hover:underline">
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE4D7]">
              <button
                onClick={() => {
                  setIsNoticesDrawerOpen(false);
                  navigate('/portal/notices');
                }}
                className="w-full py-3 rounded-xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>Open Notice Board Page</span>
                <ChevronRight className="w-4 h-4 text-[#FF6B4A]" />
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsNoticesDrawerOpen(false)} />
        </div>
      )}
    </div>
  );
};
