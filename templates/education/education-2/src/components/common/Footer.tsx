import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronUp,
  CheckCircle,
  Sliders,
  Globe,
  FileText,
  Lock,
  Heart,
  Users,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  onNavigate: (route: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const {
    theme,
    config,
    openApplyModal,
    openProspectusModal,
    openTuitionCalc,
    openStudentPortal,
    openParentPortal,
    openCustomizer,
    addNotification,
  } = useTheme();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addNotification(
      'success',
      'Subscribed to Academy Gazette',
      `Academic updates and research bulletins will be delivered to ${newsletterEmail}`
    );
    setNewsletterEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden border-t border-slate-800">
      {/* Subtle top geometric background accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600" />

      {/* Top Pre-Footer Call to Action Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Begin Your Journey • Cohort 2026–2027
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Shape the Future at Edunexa
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Experience world-class STEM, arts, and humanities curriculum in Boston's premier waterfront academic campus.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openApplyModal()}
              style={{ backgroundColor: theme.accent }}
              className="px-6 py-3.5 rounded-xl text-slate-950 font-bold text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span>Apply for 2026–2027</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => openProspectusModal()}
              className="px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-800/80 text-white font-bold text-sm hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Download Prospectus</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3.5 rounded-xl border border-slate-700 text-slate-300 font-semibold text-sm hover:text-white hover:bg-slate-800 transition-all"
            >
              Schedule Campus Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Institutional Bio & Crest (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: theme.primary }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-md border border-white/10"
              >
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-serif font-black tracking-tight text-xl text-white block leading-none">
                  {config.name.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Excellence in Intellect & Character • Est. 2001
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Edunexa is an independent, non-sectarian co-educational day and boarding school providing an integrated STEM, International Baccalaureate, and liberal arts education for scholars in Grades K–12 and advanced post-graduate fellowships.
            </p>

            {/* Accreditation Badges */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Accreditations & Affiliations
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>NEASC Accredited</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>IB World School</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                  <GraduationCap className="w-3 h-3 text-amber-400" />
                  <span>College Board AP Capstone</span>
                </span>
              </div>
            </div>

            {/* Quick Newsletter Signup */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Subscribe to Academy Gazette
              </span>
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: theme.primary }}
                    className="px-4 py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity shrink-0"
                  >
                    Join
                  </button>
                </form>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Subscribed! Check your inbox for our latest edition.</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Columns (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Col 1: Academics */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Academics
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors">
                    All Academic Programs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('programs', 'STEM')} className="hover:text-white transition-colors">
                    STEM & Quantum Labs
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('programs', 'High School')} className="hover:text-white transition-colors">
                    High School Honors
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                    Academic Departments
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('faculty')} className="hover:text-white transition-colors">
                    Faculty Scholars & Chairs
                  </button>
                </li>
                <li>
                  <button onClick={openProspectusModal} className="hover:text-white transition-colors text-amber-300">
                    2026 Academic Catalog
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Admissions & Aid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Admissions & Aid
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">
                    Application Process
                  </button>
                </li>
                <li>
                  <button onClick={() => openApplyModal()} className="hover:text-white transition-colors">
                    Online Application
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('scholarships')} className="hover:text-white transition-colors">
                    Scholarships & Grants
                  </button>
                </li>
                <li>
                  <button onClick={openTuitionCalc} className="hover:text-white transition-colors text-amber-300">
                    Tuition & Aid Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors">
                    Admissions FAQ
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                    Schedule a Consultation
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Campus & Culture */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Campus & Culture
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('facilities')} className="hover:text-white transition-colors">
                    Facilities & Cleanrooms
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('campus-life')} className="hover:text-white transition-colors">
                    Student Life & Housing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('campus-life')} className="hover:text-white transition-colors">
                    Clubs & Student Guilds
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                    Campus Photo Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors">
                    Calendar & Events
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('news')} className="hover:text-white transition-colors">
                    Academy Press Gazette
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Community & Portals */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Portals & Access
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={openStudentPortal} className="hover:text-white transition-colors flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-amber-400" />
                    <span>Student Portal (Canvas)</span>
                  </button>
                </li>
                <li>
                  <button onClick={openParentPortal} className="hover:text-white transition-colors flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />
                    <span>Parent & Guardian Gateway</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('alumni')} className="hover:text-white transition-colors">
                    Alumni Association
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('research')} className="hover:text-white transition-colors">
                    Research Repository
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('placements')} className="hover:text-white transition-colors">
                    College Matriculation
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('documentation')} className="hover:text-white transition-colors text-slate-400">
                    System Architecture
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Direct Contact Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Main Campus Address</span>
              <span className="text-slate-400">{config.contact.address}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Admissions & General Office</span>
              <span className="text-slate-400">
                Phone: {config.contact.admissionsPhone} (Mon–Fri 8AM–5PM EST)
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Inquiries & Admissions</span>
              <span className="text-slate-400">{config.contact.admissionsEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal, Theme Controls & Copyright */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-4 sm:px-8 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Edunexa, Inc. All rights reserved.
            </span>
            <span className="hidden sm:inline text-slate-800">•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Edunexa Privacy Policy: We adhere strictly to FERPA & GDPR standards.'); }} className="hover:text-slate-300">
              Privacy Policy & FERPA
            </a>
            <span className="hidden sm:inline text-slate-800">•</span>
            <a href="#titleix" onClick={(e) => { e.preventDefault(); alert('Edunexa Non-Discrimination Policy: Edunexa admits students of any race, color, national and ethnic origin.'); }} className="hover:text-slate-300">
              Non-Discrimination & Title IX
            </a>
            <span className="hidden sm:inline text-slate-800">•</span>
            <button onClick={openCustomizer} className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              <span>Academic Color Theme ({theme.name})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              title="Return to top"
            >
              <span>Back to top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};