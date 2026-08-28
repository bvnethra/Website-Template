import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Calendar,
  Search,
  Menu,
  X,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../ui/Button';
import { GlobalSearchModal } from '../common/GlobalSearchModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find a Doctor', path: '/doctors' },
    { name: 'Departments', path: '/departments' },
    { name: 'Services', path: '/services' },
    { name: 'Timetable', path: '/timetable' },
    { name: 'Health Library', path: '/health-library' },
    { name: 'Health Tools', path: '/health-tools' },
    { name: 'Locations', path: '/locations' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              24/7 Care Network Active
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              Emergency Dispatch: <strong className="text-white font-bold">(555) 911-CARE</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-primary-300 transition-colors hidden md:inline">
              Support & Help Center
            </Link>
            <Link to="/dashboard" className="flex items-center gap-1.5 font-semibold text-secondary hover:text-teal-300 transition-colors">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Patient Portal
            </Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-header shadow-soft border-b border-slate-200/80 py-3'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                Care<span className="text-primary">Nova</span>
              </span>
              <span className="block text-[10px] uppercase font-bold text-secondary tracking-widest leading-none">
                Health Platform
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-primary font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-2xl text-slate-600 hover:bg-slate-100 hover:text-primary transition-colors"
              title="Search CareNova (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link to="/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/appointments" className="hidden md:inline-block">
              <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                Book Visit
              </Button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-2xl lg:hidden text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[105px] z-50 bg-slate-900/60 backdrop-blur-md lg:hidden animate-in fade-in duration-200">
          <div className="bg-white w-full h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation</div>
              <nav className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between p-3.5 rounded-2xl font-semibold text-base transition-colors ${
                      isActive(link.path)
                        ? 'bg-blue-50 text-primary font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link to="/appointments" className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-center" leftIcon={<Calendar className="w-5 h-5" />}>
                  Book Appointment
                </Button>
              </Link>
              <Link to="/login" className="block w-full">
                <Button variant="outline" size="md" className="w-full justify-center">
                  Patient Sign In / Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-soft-lg flex gap-2">
        <Link to="/doctors" className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            Find Doctor
          </Button>
        </Link>
        <Link to="/appointments" className="flex-1">
          <Button variant="primary" size="sm" className="w-full" leftIcon={<Calendar className="w-4 h-4" />}>
            Book Visit
          </Button>
        </Link>
      </div>

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
