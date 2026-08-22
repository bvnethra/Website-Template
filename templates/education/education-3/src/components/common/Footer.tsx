import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUp, 
  ShieldCheck, 
  Award,
  Globe2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2C382E] text-[#FDFBF7] border-t border-[#3B4B3F] pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3B4B3F]">
          
          {/* Col 1: University Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] flex items-center justify-center text-white font-bold text-lg shadow-xs">
                E
              </div>
              <div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white block leading-none">
                  Eduvora University
                </span>
                <span className="text-xs font-semibold tracking-wider text-[#A7B3A2] uppercase mt-1 block">
                  Excellence in Research & Discovery
                </span>
              </div>
            </div>

            <p className="text-sm text-[#D4DDD0] leading-relaxed max-w-sm">
              Empowering the next generation of global leaders, researchers, and technologists through rigorous inquiry, ethical innovation, and collaborative discovery.
            </p>

            <div className="space-y-2 text-xs text-[#A7B3A2]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#A7B3A2] shrink-0" />
                <span>Eduvora Quad, 100 University Boulevard, Tech District, MA 02138</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#A7B3A2] shrink-0" />
                <span>+1 (800) 458-EDUV / +1 (617) 555-0199</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#A7B3A2] shrink-0" />
                <span>admissions@eduvora.edu | registrar@eduvora.edu</span>
              </div>
            </div>
          </div>

          {/* Col 2: Academics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Academics
            </h4>
            <ul className="space-y-2 text-sm text-[#C4D0C2]">
              <li>
                <Link to="/courses?degree=Undergraduate" className="hover:text-white hover:underline transition-colors">
                  Undergraduate Degrees
                </Link>
              </li>
              <li>
                <Link to="/courses?degree=Postgraduate" className="hover:text-white hover:underline transition-colors">
                  Graduate & Master's
                </Link>
              </li>
              <li>
                <Link to="/courses?degree=Doctorate" className="hover:text-white hover:underline transition-colors">
                  Ph.D. Fellowships
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white hover:underline transition-colors">
                  Executive Education
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white hover:underline transition-colors">
                  Online & Hybrid Catalogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Admissions & Aid */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Admissions & Aid
            </h4>
            <ul className="space-y-2 text-sm text-[#C4D0C2]">
              <li>
                <Link to="/admissions" className="hover:text-white hover:underline transition-colors">
                  Apply Online (Fall 2026)
                </Link>
              </li>
              <li>
                <Link to="/admissions?tab=tracker" className="hover:text-white hover:underline transition-colors">
                  Track Application Status
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white hover:underline transition-colors">
                  Merit Scholarship Estimator
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white hover:underline transition-colors">
                  Tuition & Financial Aid
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="hover:text-white hover:underline transition-colors">
                  International Student Visas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Portal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-heading">
              Campus & Portal
            </h4>
            <ul className="space-y-2 text-sm text-[#C4D0C2]">
              <li>
                <Link to="/campus-life" className="hover:text-white hover:underline transition-colors">
                  Events & RSVP Hub
                </Link>
              </li>
              <li>
                <Link to="/campus-life" className="hover:text-white hover:underline transition-colors">
                  Clubs & Student Societies
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-white hover:underline transition-colors">
                  Student Portal Login
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-white hover:underline transition-colors">
                  Research Centers & Labs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  Leadership & Faculty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching image links: University Directory, Help Desk, Accreditation (NAAC, NIRF), Legal, Social Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#A7B3A2]">
          
          {/* Essential links bar matching screenshot */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-white transition-colors">
              University Directory
            </Link>
            <span className="text-[#3B4B3F]">•</span>
            <Link to="/portal" className="hover:text-white transition-colors">
              Help Desk
            </Link>
            <span className="text-[#3B4B3F]">•</span>
            <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#A7B3A2]" />
              <span>Accreditation (NAAC A++, NIRF Ranked #12, ABET)</span>
            </Link>
            <span className="text-[#3B4B3F]">•</span>
            <Link to="/about" className="hover:text-white transition-colors">
              Legal & Privacy Policy
            </Link>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#A7B3A2]">Social:</span>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#3B4B3F] hover:bg-[#4A5D4E] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-xs">f</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#3B4B3F] hover:bg-[#4A5D4E] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-xs">ig</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-7 h-7 rounded-full bg-[#3B4B3F] hover:bg-[#4A5D4E] text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-xs">in</span>
              </a>
            </div>

            {/* Back to Top button */}
            <button
              onClick={scrollToTop}
              id="back-to-top-btn"
              className="flex items-center gap-1.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs active:scale-95"
              title="Back to Top"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#A7B3A2]" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center md:text-left text-[11px] text-[#A7B3A2]/80">
          © 2026 Eduvora University. All rights reserved. Eduvora is an affirmative action, equal opportunity educator and employer.
        </div>
      </div>
    </footer>
  );
};
