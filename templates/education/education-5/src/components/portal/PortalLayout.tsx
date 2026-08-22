import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Bell, 
  FileCheck2, 
  Ticket, 
  Award, 
  FileText, 
  RotateCcw, 
  SearchCheck, 
  UserCircle2, 
  HelpCircle, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initialNotices } from '../../data/portalData';

export const PortalLayout: React.FC = () => {
  const { currentUser, logout, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      label: 'Portal Overview',
      path: '/portal/overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: 'Notice Board',
      path: '/portal/notices',
      icon: Bell,
      badge: '5 New'
    },
    {
      label: 'Exam Application',
      path: '/portal/exam-apply',
      icon: FileCheck2,
      badge: 'Active'
    },
    {
      label: 'Download Hall Ticket',
      path: '/portal/hall-ticket',
      icon: Ticket,
      badge: 'Ready'
    },
    {
      label: 'Exam Results',
      path: '/portal/results',
      icon: Award,
      badge: 'CGPA 8.92'
    },
    {
      label: 'Photocopy Application',
      path: '/portal/photocopy',
      icon: FileText,
      badge: null
    },
    {
      label: 'Revaluation Hub',
      path: '/portal/revaluation',
      icon: RotateCcw,
      badge: '+5 Diff'
    },
    {
      label: 'Review Hub',
      path: '/portal/review',
      icon: SearchCheck,
      badge: null
    },
    {
      label: 'Academic Profile',
      path: '/portal/profile',
      icon: UserCircle2,
      badge: null
    },
    {
      label: 'Support & Grievances',
      path: '/portal/support',
      icon: HelpCircle,
      badge: null
    },
    {
      label: 'Login Audit & Security',
      path: '/portal/security',
      icon: ShieldAlert,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] font-sans flex flex-col selection:bg-[#FF6B4A] selection:text-white">
      
      {/* Top University Portal Bar */}
      <header className="h-16 bg-[#0D2F2F] text-white sticky top-0 z-40 border-b border-[#184E4E] px-4 sm:px-6 flex items-center justify-between shadow-md">
        
        {/* Left: Mobile Menu Toggle + Crest Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#133E3E] text-white hover:bg-[#1C5555] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/portal/overview" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B4A] to-[#FFA07A] p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#0D2F2F] rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#FF6B4A]" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight font-display text-white">
                Learnora
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-[10px] font-bold text-[#FF6B4A] uppercase tracking-wider bg-[#FF6B4A]/20 px-2 py-0.5 rounded-full border border-[#FF6B4A]/30">
                Student Examination Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Academic Context, Notification Bell, User Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Quick Academic Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#133E3E] border border-[#1E5252] text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-200">Sem {currentUser?.semester || 6} (Spring 2026)</span>
            <span className="text-slate-400">•</span>
            <span className="font-bold text-[#FF6B4A]">CGPA {currentUser?.cgpa || 8.92}</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-[#133E3E] text-slate-200 hover:text-white hover:bg-[#1C5555] transition-colors relative"
              title="Official Circulars"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B4A] text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-[#0D2F2F] rounded-2xl shadow-2xl border border-[#E5DFD5] p-4 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                    <div className="font-bold text-xs uppercase tracking-wider text-[#0D2F2F] flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#FF6B4A]" />
                      Official Circulars
                    </div>
                    <Link
                      to="/portal/notices"
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] font-bold text-[#FF6B4A] hover:underline"
                    >
                      View All (5)
                    </Link>
                  </div>

                  <div className="divide-y divide-[#E5DFD5] max-h-72 overflow-y-auto mt-2">
                    {initialNotices.slice(0, 3).map((notice) => (
                      <Link
                        key={notice.id}
                        to="/portal/notices"
                        onClick={() => setShowNotifications(false)}
                        className="p-2.5 block hover:bg-[#F7F4EE] rounded-xl transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                            notice.isUrgent ? 'bg-red-100 text-red-700' : 'bg-[#0D2F2F]/10 text-[#0D2F2F]'
                          }`}>
                            {notice.category}
                          </span>
                          <span className="text-[10px] text-[#476666]">{notice.date}</span>
                        </div>
                        <h5 className="text-xs font-bold text-[#0D2F2F] mt-1 line-clamp-1">
                          {notice.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Student Profile Badge & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-xl bg-[#133E3E] hover:bg-[#1C5555] border border-[#1E5252] transition-colors focus:outline-none"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'Student'}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-[#FF6B4A]"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white line-clamp-1 leading-tight">
                  {currentUser?.name || 'Student User'}
                </div>
                <div className="text-[10px] font-mono text-slate-300">
                  {currentUser?.studentId || 'EDV2026CS104'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white text-[#0D2F2F] rounded-2xl shadow-2xl border border-[#E5DFD5] p-3 z-50"
                >
                  <div className="p-2 border-b border-[#E5DFD5]">
                    <div className="font-bold text-xs text-[#0D2F2F]">{currentUser?.name}</div>
                    <div className="text-[11px] text-[#476666] font-mono">{currentUser?.studentId}</div>
                    <div className="text-[10px] text-[#FF6B4A] font-semibold mt-0.5">{currentUser?.department}</div>
                  </div>

                  <div className="py-1 space-y-1">
                    <Link
                      to="/portal/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-xs font-semibold text-[#0D2F2F] flex items-center gap-2"
                    >
                      <UserCircle2 className="w-4 h-4 text-[#FF6B4A]" />
                      <span>Academic Registry Profile</span>
                    </Link>

                    <Link
                      to="/portal/security"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-xs font-semibold text-[#0D2F2F] flex items-center gap-2"
                    >
                      <ShieldAlert className="w-4 h-4 text-[#0D2F2F]" />
                      <span>Login Sessions & Security</span>
                    </Link>

                    <Link
                      to="/"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F4EE] text-xs font-semibold text-[#0D2F2F] flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-[#0D2F2F]" />
                      <span>University Public Website</span>
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-[#E5DFD5]">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out from Portal</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>

      {/* Main App Body with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar / Collapsible Mobile Drawer */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72 bg-[#0D2F2F] text-slate-200 border-r border-[#184E4E] 
            transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col justify-between pt-16 lg:pt-0
          `}
        >
          {/* Top of Sidebar: Student ID Crest Badge Card */}
          <div className="p-4 border-b border-[#184E4E]">
            <div className="p-3.5 rounded-2xl bg-[#133E3E] border border-[#1E5252] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0D2F2F] border-2 border-[#FF6B4A] overflow-hidden shrink-0">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {currentUser?.status || 'Active Regular'}
                    </span>
                  </div>
                  <h4 className="text-xs font-extrabold text-white truncate mt-1">
                    {currentUser?.name}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-300">
                    ID: {currentUser?.studentId}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#1E5252] grid grid-cols-2 gap-2 text-center text-[10px]">
                <div className="bg-[#0D2F2F]/60 p-1.5 rounded-lg">
                  <span className="text-slate-400 block">Semester</span>
                  <span className="font-bold text-white text-xs">Sem {currentUser?.semester}</span>
                </div>
                <div className="bg-[#0D2F2F]/60 p-1.5 rounded-lg">
                  <span className="text-slate-400 block">CGPA</span>
                  <span className="font-bold text-[#FF6B4A] text-xs">{currentUser?.cgpa}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items List */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1 scrollbar-thin">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Academic & Examination Hub
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/portal/overview' && location.pathname === '/portal');

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all group
                    ${isActive
                      ? 'bg-[#FF6B4A] text-white shadow-md shadow-[#FF6B4A]/25'
                      : 'text-slate-300 hover:bg-[#133E3E] hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#FF6B4A]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#184E4E] text-[#FFA07A]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Bottom Sidebar: Logout & University Helpdesk */}
          <div className="p-3 border-t border-[#184E4E] space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#133E3E] hover:bg-[#1C5555] text-red-300 hover:text-red-200 text-xs font-bold transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sign Out Session</span>
            </button>
            <div className="text-center text-[10px] text-slate-400">
              Exam Helpline: <span className="text-[#FFA07A] font-mono">+91 44 2890 1000</span>
            </div>
          </div>

        </aside>

        {/* Backdrop for Mobile Menu */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-2xs z-30 lg:hidden"
          />
        )}

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto bg-[#F7F4EE] p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};
