import React, { useState, useEffect, useRef } from 'react';
import {
  HeartPulse,
  PhoneCall,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Clock,
  ShieldCheck,
  Building2,
  Stethoscope,
  Users,
  FileText,
  HelpCircle,
  Mail
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenMyAppointments: () => void;
  onOpenEmergency: () => void;
  appointmentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBooking,
  onOpenMyAppointments,
  onOpenEmergency,
  appointmentCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E4E9F2] py-2.5'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#E4E9F2]/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-[#3157D5] rounded-xl p-1 -ml-1 transition-transform active:scale-95"
            aria-label="NovaCare Health Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2443AE] to-[#3157D5] flex items-center justify-center text-white shadow-md shadow-[#3157D5]/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#15213D] block leading-none">
                Nova<span className="text-[#3157D5]">Care</span>
              </span>
              <span className="text-[10px] tracking-wider text-[#667085] uppercase font-semibold block mt-0.5">
                Digital Health
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-link-home"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'home'
                  ? 'text-[#3157D5] bg-[#3157D5]/10 font-semibold'
                  : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'about'
                  ? 'text-[#3157D5] bg-[#3157D5]/10 font-semibold'
                  : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
              }`}
            >
              About
            </button>
            <button
              id="nav-link-departments"
              onClick={() => handleNavClick('departments')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'departments'
                  ? 'text-[#3157D5] bg-[#3157D5]/10 font-semibold'
                  : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
              }`}
            >
              Departments
            </button>
            <button
              id="nav-link-services"
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'services'
                  ? 'text-[#3157D5] bg-[#3157D5]/10 font-semibold'
                  : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
              }`}
            >
              Services
            </button>
            <button
              id="nav-link-doctors"
              onClick={() => handleNavClick('doctors')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === 'doctors'
                  ? 'text-[#3157D5] bg-[#3157D5]/10 font-semibold'
                  : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
              }`}
            >
              Doctors
            </button>

            {/* My Appointments Pill Tab */}
            <button
              id="nav-link-my-appointments"
              onClick={onOpenMyAppointments}
              className="relative px-3 py-2 rounded-lg text-sm font-medium text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA] transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-[#3157D5]" />
              <span>My Appointments</span>
              {appointmentCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold text-white bg-[#3157D5] rounded-full min-w-[18px]">
                  {appointmentCount}
                </span>
              )}
            </button>

            {/* Dropdown for More */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-more-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  dropdownOpen ? 'bg-[#EEF3FA] text-[#3157D5]' : 'text-[#15213D] hover:text-[#3157D5] hover:bg-[#EEF3FA]'
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div
                  id="nav-dropdown-menu"
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E4E9F2] p-2 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    id="dropdown-link-emergency"
                    onClick={() => {
                      handleNavClick('emergency');
                      onOpenEmergency();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                  >
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    <span>24/7 Emergency Center</span>
                  </button>
                  <button
                    id="dropdown-link-contact"
                    onClick={() => handleNavClick('contact')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg text-[#15213D] hover:bg-[#EEF3FA] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#3157D5]" />
                    <span>Contact & Location</span>
                  </button>
                  <button
                    id="dropdown-link-stats"
                    onClick={() => handleNavClick('stats')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left rounded-lg text-[#15213D] hover:bg-[#EEF3FA] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#28B8D4]" />
                    <span>Trust & Credentials</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons: Emergency & Book Appointment */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Emergency Hotline Button */}
            <button
              id="header-emergency-btn"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#E5484D] bg-[#E5484D]/10 hover:bg-[#E5484D]/20 border border-[#E5484D]/20 transition-all active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency 24/7</span>
            </button>

            {/* Book Appointment CTA */}
            <button
              id="header-book-appointment-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] shadow-sm shadow-[#3157D5]/25 transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-emergency-quick-btn"
              onClick={onOpenEmergency}
              className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-200"
              aria-label="Emergency"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#15213D] hover:bg-[#EEF3FA] border border-[#E4E9F2]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="lg:hidden mt-3 pt-3 pb-4 border-t border-[#E4E9F2] flex flex-col gap-1.5 animate-in slide-in-from-top duration-200"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'home' ? 'bg-[#3157D5]/10 text-[#3157D5] font-semibold' : 'text-[#15213D] hover:bg-[#EEF3FA]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'about' ? 'bg-[#3157D5]/10 text-[#3157D5] font-semibold' : 'text-[#15213D] hover:bg-[#EEF3FA]'
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('departments')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'departments' ? 'bg-[#3157D5]/10 text-[#3157D5] font-semibold' : 'text-[#15213D] hover:bg-[#EEF3FA]'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'services' ? 'bg-[#3157D5]/10 text-[#3157D5] font-semibold' : 'text-[#15213D] hover:bg-[#EEF3FA]'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('doctors')}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'doctors' ? 'bg-[#3157D5]/10 text-[#3157D5] font-semibold' : 'text-[#15213D] hover:bg-[#EEF3FA]'
              }`}
            >
              Doctors
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyAppointments();
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#15213D] hover:bg-[#EEF3FA] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3157D5]" />
                My Appointments
              </span>
              {appointmentCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-[#3157D5] rounded-full">
                  {appointmentCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#15213D] hover:bg-[#EEF3FA] flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#3157D5]" />
              Contact & Location
            </button>

            <div className="pt-3 mt-2 border-t border-[#E4E9F2] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEmergency();
                }}
                className="w-full py-2.5 rounded-xl text-center text-sm font-semibold text-[#E5484D] bg-[#E5484D]/10 border border-[#E5484D]/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Emergency Hotline (24/7)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
