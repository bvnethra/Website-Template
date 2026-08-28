import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-900 via-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/60 mb-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
              <Phone className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">Need Immediate Emergency Assistance?</h3>
              <p className="text-slate-400 text-sm mt-0.5">
                Our Level 1 Trauma Center & Dispatch team is active 24/7/365.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:5559112273"
              className="w-full sm:w-auto justify-center bg-danger hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-2xl transition-colors text-base shadow-soft flex items-center gap-2"
            >
              <span>Call (555) 911-CARE</span>
            </a>
            <Link
              to="/locations"
              className="w-full sm:w-auto text-center bg-slate-800 hover:bg-slate-700 text-white font-semibold px-5 py-3.5 rounded-2xl transition-colors text-sm border border-slate-700"
            >
              Find Nearest ER
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-primary flex items-center justify-center text-white shadow-soft">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Care<span className="text-primary-400">Nova</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Better Care. Smarter Health. CareNova is an evidence-based, technology-driven healthcare platform serving over 100,000 patients annually.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>HIPAA Compliant & Accredited Medical Network</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/doctors" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <span>Find a Doctor</span>
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <span>Medical Departments</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <span>Clinical Services</span>
                </Link>
              </li>
              <li>
                <Link to="/timetable" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <span>Doctor Timetable</span>
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  <span>Book Appointment</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Patient Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/health-library" className="hover:text-primary-400 transition-colors">
                  Health Library & Blog
                </Link>
              </li>
              <li>
                <Link to="/health-tools" className="hover:text-primary-400 transition-colors">
                  Interactive Health Tools
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary-400 transition-colors">
                  Facilities Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-400 transition-colors">
                  Patient Portal Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3.5 text-sm text-slate-400">
            <h4 className="text-white font-bold text-base mb-4 tracking-wide">Contact & Hours</h4>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary-400 shrink-0 mt-1" />
              <span>450 Innovation Parkway, Suite 100, Metropolis NY 10001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary-400 shrink-0" />
              <span>(555) 019-2831</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary-400 shrink-0" />
              <span>contact@carenovahealth.com</span>
            </div>
            <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-white font-semibold">Mon - Fri: 08:00 AM - 08:00 PM</p>
                <p>Sat: 09:00 AM - 05:00 PM | Sun: Emergency Only</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CareNova Health System Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
