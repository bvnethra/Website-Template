import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  Bell, 
  Flame, 
  Award,
  BookOpen,
  Compass,
  Users,
  FolderKanban,
  Info,
  Calendar,
  User,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenCommunity?: () => void;
  onOpenResources?: () => void;
  onOpenAbout?: () => void;
  studentXP: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth,
  onOpenSearch,
  onOpenCommunity,
  onOpenResources,
  onOpenAbout,
  studentXP,
  streak,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'courses', label: 'COURSES', action: () => handleNavScroll('courses') },
    { id: 'paths', label: 'PATHS', action: () => handleNavScroll('paths') },
    { id: 'community', label: 'COMMUNITY', action: () => onOpenCommunity ? onOpenCommunity() : handleNavScroll('community') },
    { id: 'resources', label: 'RESOURCES', action: () => onOpenResources ? onOpenResources() : handleNavScroll('resources') },
    { id: 'about', label: 'ABOUT', action: () => onOpenAbout ? onOpenAbout() : handleNavScroll('about') },
  ];

  const handleNavScroll = (id: string) => {
    setActiveTab('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header 
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-3' 
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo - Eduvora */}
          <button 
            id="brand-logo-btn"
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            {/* Custom Eduvora icon */}
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100/80 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-teal-600">
                <path d="M4 7C8 7 10 9 14 9C18 9 20 7 20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12C8 12 10 14 14 14C18 14 20 12 20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17C8 17 10 19 14 19C18 19 20 17 20 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              Eduvora
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={link.action}
                className="text-xs font-bold tracking-wider text-slate-700 hover:text-teal-600 transition-colors uppercase py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs transition-colors"
              title="Search courses (⌘K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Search</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-bell-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 z-50 text-slate-800"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Bell className="w-4 h-4 text-teal-600" /> Notifications
                      </h4>
                      <button 
                        onClick={() => setNotificationCount(0)}
                        className="text-[11px] text-slate-500 hover:text-teal-600 font-medium"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="mt-3 space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-amber-500" /> 14-Day Streak Unlocked!
                        </div>
                        <p className="text-slate-600 mt-1">Keep learning daily to earn the Consistency Titan badge.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">15 min ago</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-teal-600" /> Data Science Masterclass
                        </div>
                        <p className="text-slate-600 mt-1">Module 2 on Gradient Boosting & XGBoost is now ready.</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* University Portal Link */}
            <button
              id="nav-university-portal-btn"
              onClick={() => navigate('/portal')}
              className="bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold uppercase tracking-wider px-3.5 sm:px-4 py-2 rounded-md shadow-xs transition-all flex items-center gap-1.5 border border-[#0D2F2F]"
            >
              <GraduationCap className="w-4 h-4 text-[#FF6B4A]" />
              <span className="hidden sm:inline">Student Portal</span>
              <span className="sm:hidden">Portal</span>
            </button>

            {/* REGISTER Button (Solid blue/teal button as shown in picture) */}
            <button
              id="nav-register-btn"
              onClick={onOpenAuth}
              className="bg-[#1570EF] hover:bg-[#1258bd] text-white text-xs font-bold uppercase tracking-wider px-3.5 sm:px-4 py-2 rounded-md shadow-sm transition-all active:scale-95 hidden sm:block"
            >
              REGISTER
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-white border-b border-slate-200 shadow-xl md:hidden p-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    link.action();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-bold text-sm text-slate-800 hover:text-teal-600 py-2 border-b border-slate-100"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/portal');
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0D2F2F] text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#FF6B4A]" /> Eduvora Student Portal
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Search Courses
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full mt-2 py-2.5 rounded-md bg-[#1570EF] font-bold text-xs text-white uppercase shadow-sm flex items-center justify-center gap-1.5"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
