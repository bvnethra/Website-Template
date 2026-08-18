import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data/mockData';
import {
  HeartPulse,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Lock,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigateTo: (section: string) => void;
  onOpenBooking: () => void;
  onOpenEmergency: () => void;
  onShowToast: (title: string, message: string, type?: 'success' | 'error' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTo,
  onOpenBooking,
  onOpenEmergency,
  onShowToast
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      onShowToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    onShowToast(
      'Subscribed to Health Updates',
      'You will receive monthly wellness tips and specialist updates.',
      'success'
    );
    setNewsletterEmail('');
  };

  return (
    <footer id="main-footer" className="bg-[#0B1528] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Overview (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2443AE] to-[#3157D5] flex items-center justify-center text-white shadow-md">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-none">
                  Nova<span className="text-[#3157D5]">Care</span>
                </span>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold block mt-0.5">
                  Smart Digital Healthcare
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              NovaCare is an integrated digital healthcare platform providing seamless access to board-certified specialists, state-of-the-art medical departments, and 24/7 urgent trauma care.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>JCI Accredited</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-[#28B8D4]" />
                <span>HIPAA Compliant</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About NovaCare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Clinical Departments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medical Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('doctors')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#28B8D4] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Departments</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cardiology & Heart Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Neurology & Brain Institute
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Orthopedics & Joint Surgery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pediatric Medicine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTo('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Comprehensive Oncology
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEmergency}
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>24/7 Emergency Care</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Emergency Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Emergency & Updates</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for seasonal health advisories and wellness bulletins.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full py-2 px-3 bg-white/10 text-white rounded-xl text-xs border border-slate-700 focus:outline-none focus:border-[#3157D5] placeholder-slate-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#3157D5] hover:bg-[#2443AE] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </form>

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Emergency: 911 / {HOSPITAL_INFO.emergencyPhone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NovaCare Health Network. All rights reserved. Demo Healthcare Platform.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onShowToast('Privacy Policy', 'NovaCare enforces strict HIPAA and patient data privacy guidelines.', 'info')}>
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onShowToast('Terms of Service', 'Terms of clinical service and telehealth platform guidelines.', 'info')}>
              Terms of Care
            </span>
            <span>•</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={() => onNavigateTo('contact')}>
              Hospital Contact
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
