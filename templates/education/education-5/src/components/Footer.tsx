import React from 'react';
import { 
  GraduationCap, 
  Github, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Heart,
  Globe,
  ShieldCheck,
  Zap,
  Mail,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  onExploreCourses: () => void;
  onOpenAITutor: () => void;
  onOpenLiveLab: () => void;
  onOpenCommunity?: () => void;
  onOpenResources?: () => void;
  onOpenAbout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExploreCourses,
  onOpenAITutor,
  onOpenLiveLab,
  onOpenCommunity,
  onOpenResources,
  onOpenAbout,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-teal-400">
                  <path d="M4 7C8 7 10 9 14 9C18 9 20 7 20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 12C8 12 10 14 14 14C18 14 20 12 20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 17C8 17 10 19 14 19C18 19 20 17 20 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                Learnora
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Empowering learners worldwide through expert-led courses, career tracks, interactive coding labs, and a global collaborative study community.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#github" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links: Curriculums */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Courses</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onExploreCourses} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Data Science Masterclass
                </button>
              </li>
              <li>
                <button onClick={onExploreCourses} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Digital Marketing Strategy
                </button>
              </li>
              <li>
                <button onClick={onExploreCourses} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Python for AI Applications
                </button>
              </li>
              <li>
                <button onClick={onExploreCourses} className="text-slate-400 hover:text-teal-400 transition-colors">
                  React & TypeScript Systems
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Platform */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenLiveLab} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Interactive Lab Sandbox
                </button>
              </li>
              <li>
                <button onClick={onOpenAITutor} className="text-slate-400 hover:text-teal-400 transition-colors">
                  AI Mentor & Study Buddy
                </button>
              </li>
              <li>
                <button onClick={onOpenCommunity} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Student Circles & Community
                </button>
              </li>
              <li>
                <button onClick={onOpenResources} className="text-slate-400 hover:text-teal-400 transition-colors">
                  Resource Handbooks & Cheatsheets
                </button>
              </li>
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenAbout} className="text-slate-400 hover:text-teal-400 transition-colors">
                  About Learnora
                </button>
              </li>
              <li>
                <a href="#careers" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Careers & Hiring
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Learnora Learning Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Verified Industry Certifications
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              Available in 120+ Countries
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
