import React, { useState } from 'react';
import {
  Calendar,
  Search,
  ShieldCheck,
  Clock,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  HeartPulse,
  Sparkles,
  PhoneCall,
  Activity
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onSearchDoctors: (query: string) => void;
  onNavigateTo: (sectionId: string) => void;
  onOpenEmergency: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onSearchDoctors,
  onNavigateTo,
  onOpenEmergency
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchDoctors(searchQuery.trim());
      onNavigateTo('doctors');
    } else {
      onNavigateTo('doctors');
    }
  };

  return (
    <section id="hero-section" className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-[#F6F8FC] via-[#F6F8FC] to-white border-b border-[#E4E9F2]/60">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3157D5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#28B8D4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge */}
            <div
              id="hero-smart-badge"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3157D5]/10 border border-[#3157D5]/20 text-[#3157D5] text-xs font-bold tracking-wide uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#3157D5]" />
              <span>Smart Healthcare Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15213D] tracking-tight leading-[1.15] mb-5">
              Better Care Starts With{' '}
              <span className="text-[#3157D5] relative inline-block">
                Better Access
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#28B8D4]/60"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M0,15 Q50,0 100,15"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-xl mb-8">
              Find trusted specialists, explore medical services and book appointments from one simple healthcare platform with instant confirmation and 24/7 emergency support.
            </p>

            {/* Quick Doctor Search Bar */}
            <form
              id="hero-quick-search-form"
              onSubmit={handleSearchSubmit}
              className="w-full max-w-lg mb-8 bg-white p-2 rounded-2xl shadow-lg shadow-[#15213D]/5 border border-[#E4E9F2] flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                <Search className="w-5 h-5 text-[#667085]" />
                <input
                  id="hero-search-input"
                  type="text"
                  placeholder="Search doctor, specialty (e.g. Cardiology)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-[#15213D] placeholder-[#667085]/70 focus:outline-none py-2"
                />
              </div>
              <button
                id="hero-search-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#3157D5] hover:bg-[#2443AE] text-white text-sm font-semibold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Find Doctor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                id="hero-book-btn"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] shadow-md shadow-[#3157D5]/25 transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                id="hero-find-doctor-btn"
                onClick={() => onNavigateTo('doctors')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#15213D] bg-white hover:bg-[#EEF3FA] border border-[#E4E9F2] shadow-sm transition-all duration-150 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#3157D5]" />
                <span>Explore Specialists</span>
              </button>
            </div>

            {/* Small Trust Info */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E4E9F2]/80 w-full">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#15213D]">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>24/7 Emergency Care</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#15213D]">
                <div className="w-5 h-5 rounded-full bg-[#3157D5]/10 flex items-center justify-center text-[#3157D5]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>150+ Verified Specialists</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#15213D]">
                <div className="w-5 h-5 rounded-full bg-[#28B8D4]/15 flex items-center justify-center text-[#0E90AB]">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Instant Online Booking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Stage with Interactive Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Display Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#15213D] to-[#2443AE] p-6 sm:p-7 shadow-2xl text-white overflow-hidden border border-white/10">
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

                {/* Header of the visual card */}
                <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#28B8D4]">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold tracking-wider text-slate-300 uppercase">Live Clinic Hub</h4>
                      <p className="text-sm font-bold text-white">NovaCare Medical Center</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live & Online
                  </span>
                </div>

                {/* Doctor Highlight in card */}
                <div className="bg-white/10 rounded-2xl p-4 border border-white/10 mb-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
                      alt="Dr. Sarah Mitchell"
                      className="w-13 h-13 rounded-xl object-cover border-2 border-white/30"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#28B8D4] font-semibold uppercase tracking-wider">Cardiology Lead</span>
                        <span className="text-[11px] text-emerald-300 font-medium">★ 4.9 (348)</span>
                      </div>
                      <h4 className="text-sm font-bold text-white truncate">Dr. Sarah Mitchell</h4>
                      <p className="text-xs text-slate-300">Next Slot: Today, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-slate-300">Consultation: <strong className="text-white">$180</strong></span>
                    <button
                      onClick={onOpenBooking}
                      className="text-xs px-3 py-1.5 bg-[#3157D5] hover:bg-[#28B8D4] text-white font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Book Slot
                    </button>
                  </div>
                </div>

                {/* Quick triage status row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase font-medium">ER Wait Time</span>
                    <span className="text-base font-extrabold text-white">&lt; 6 Minutes</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                    <span className="text-[10px] text-slate-300 block uppercase font-medium">Specialists On Duty</span>
                    <span className="text-base font-extrabold text-[#28B8D4]">28 Active</span>
                  </div>
                </div>
              </div>

              {/* Floating Card 1: 24/7 Emergency Support */}
              <div
                id="hero-floating-card-emergency"
                onClick={onOpenEmergency}
                className="absolute -top-6 -left-6 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all active:scale-95 group z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#15213D] block group-hover:text-rose-600 transition-colors">24/7 Emergency</span>
                  <span className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Call Hotline 911
                  </span>
                </div>
              </div>

              {/* Floating Card 2: 150+ Specialists */}
              <div
                id="hero-floating-card-specialists"
                onClick={() => onNavigateTo('doctors')}
                className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#E4E9F2] flex items-center gap-3 cursor-pointer hover:shadow-2xl transition-all active:scale-95 group z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3157D5]/10 border border-[#3157D5]/20 flex items-center justify-center text-[#3157D5] group-hover:scale-105 transition-transform">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#15213D] block">150+ Specialists</span>
                  <span className="text-[11px] text-[#667085]">Across 25 Departments</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
