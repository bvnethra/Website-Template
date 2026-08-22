import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  FileText, 
  Calendar, 
  Compass, 
  UserCheck, 
  Award, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, studentProfile } = useApp();

  const navLinks = [
    { name: 'Academics', path: '/courses?category=all' },
    { name: 'Courses', path: '/courses' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Campus Life', path: '/campus-life' },
    { name: 'Research', path: '/research' },
    { name: 'About', path: '/about' },
    { name: 'Portal', path: '/portal' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('?')[0]);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8EAE3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo - Eduvora University */}
          <Link 
            to="/" 
            id="brand-logo" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white shadow-xs group-hover:bg-[#3B4B3F] transition-colors">
              {/* Crest Column/Shield Icon */}
              <div className="relative flex items-center justify-center font-bold text-lg">
                E
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-[#4A5D4E] leading-none">
                EDUVORA
              </span>
              <span className="text-[11px] font-medium tracking-wider text-[#A7B3A2] uppercase mt-0.5">
                UNIVERSITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors relative ${
                    active
                      ? 'text-[#4A5D4E] font-semibold bg-[#F4F1EA]'
                      : 'text-[#4A5D4E]/80 hover:text-[#4A5D4E] hover:bg-[#F4F1EA]/70'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#4A5D4E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA Action */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && (
              <Link
                to="/portal"
                id="header-user-status"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F1EA] border border-[#E8EAE3] text-xs font-medium text-[#4A5D4E] hover:bg-[#E8EAE3] transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#4A5D4E] animate-pulse" />
                <span>{userRole === 'student' ? studentProfile.name.split(' ')[0] : 'Applicant ID: 2026-9941'}</span>
              </Link>
            )}

            <button
              onClick={() => navigate('/admissions')}
              id="header-apply-now-btn"
              className="bg-[#4A5D4E] hover:bg-[#3B4B3F] active:scale-[0.98] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-xs transition-all flex items-center gap-2"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4 text-[#A7B3A2]" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => navigate('/admissions')}
              id="mobile-header-apply-btn"
              className="bg-[#4A5D4E] text-white px-3.5 py-1.5 rounded-xl font-medium text-xs shadow-xs"
            >
              Apply Now
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 rounded-xl text-[#4A5D4E] hover:bg-[#F4F1EA] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-drawer" 
          className="lg:hidden border-t border-[#E8EAE3] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#4A5D4E] text-white font-semibold'
                    : 'text-[#4A5D4E] hover:bg-[#F4F1EA]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className={`w-4 h-4 ${active ? 'text-[#A7B3A2]' : 'text-[#A7B3A2]'}`} />
              </Link>
            );
          })}

          <div className="pt-4 mt-3 border-t border-[#E8EAE3] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/admissions');
              }}
              className="w-full bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white py-3 rounded-xl font-semibold text-center shadow-xs"
            >
              Start Admission Application
            </button>
            <Link
              to="/portal"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#4A5D4E] py-3 rounded-xl font-medium text-center text-sm border border-[#E8EAE3]"
            >
              Access Student & Applicant Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
