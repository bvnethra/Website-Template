import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Menu,
  X,
  Search,
  Sparkles,
  GraduationCap,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface EduNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenSearch: () => void;
}

export const EduNavbar: React.FC<EduNavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string; action?: () => void }[] = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'paths', label: 'Programs' },
    {
      id: 'home',
      label: 'Universities',
      action: () => {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('universities-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
    },
    { id: 'mentorship', label: 'Instructors' },
    { id: 'resources', label: 'Resources' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.action) {
      link.action();
    } else {
      onNavigate(link.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            {/* Stylized Skillora Glowing Vector Logo */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display flex items-center gap-1.5">
                SKILLORA
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />
              </span>
              <span className="text-[10px] text-indigo-600 font-mono font-bold tracking-widest uppercase -mt-0.5">
                Learn • Build
              </span>
            </div>
          </button>
        </div>

        {/* Center: Modern Floating Pill Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id && !link.action;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Login + CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-slate-600 hover:text-slate-900 rounded-full bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
            title="Search courses, skills, and programs"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer rounded-full hover:bg-slate-100"
          >
            Log in
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-full shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Started</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id && !link.action;
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`w-full min-h-[44px] flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-2.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer text-center"
            >
              Log in
            </button>

            <button
              onClick={() => {
                onOpenAuth('register');
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-600/25 cursor-pointer text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started Free</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
