import React from 'react';
import {
  BookOpen,
  Calculator,
  Compass,
  Calendar,
  FileText,
  ArrowRight,
  Sparkles,
  Shield,
  Award,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface QuickAccessHubProps {
  onNavigate: (route: string, param?: string) => void;
}

export const QuickAccessHub: React.FC<QuickAccessHubProps> = ({ onNavigate }) => {
  const { openApplyModal, openProspectusModal, openTuitionCalc, openTourModal, theme } = useTheme();

  const hubs = [
    {
      icon: <BookOpen className="w-6 h-6 text-amber-800" />,
      title: 'Academic Catalog',
      subtitle: '25+ Programs & AP/IB Tracks',
      desc: 'Browse curriculum matrices, course requirements, laboratory hours, and faculty advisors.',
      actionLabel: 'Explore Catalog',
      onClick: () => onNavigate('programs'),
      badge: 'Updated 2026',
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#FF6B4A]" />,
      title: 'Student Portal (COE)',
      subtitle: 'Exams, Results & Hall Tickets',
      desc: 'Access exam registration, admit cards, semester results, revaluation, and grievance helpdesk.',
      actionLabel: 'Open Portal',
      onClick: () => onNavigate('portal'),
      badge: 'COE ERP',
    },
    {
      icon: <Calculator className="w-6 h-6 text-amber-800" />,
      title: 'Tuition & Aid Estimator',
      subtitle: 'Net Cost & Scholarships',
      desc: 'Calculate personalized tuition estimates, merit grants, and 100% need-met financial packages.',
      actionLabel: 'Calculate Net Aid',
      onClick: openTuitionCalc,
      badge: 'Interactive Tool',
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-800" />,
      title: 'Smart Campus & Labs',
      subtitle: '120-Acre Boston Waterfront',
      desc: 'Tour cleanroom laboratories, Centennial Library, athletic arenas, and creative arts studios.',
      actionLabel: 'Take Campus Tour',
      onClick: () => onNavigate('facilities'),
      badge: '360° Tour',
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-800" />,
      title: 'Admissions & Events',
      subtitle: 'Open Houses & Masterclasses',
      desc: 'Reserve your seat for upcoming dean lectures, student showcases, and application workshops.',
      actionLabel: 'View Schedule',
      onClick: () => onNavigate('events'),
      badge: 'Live Dates',
    },
    {
      icon: <FileText className="w-6 h-6 text-amber-800" />,
      title: '2026 Prospectus',
      subtitle: '64-Page Academic Guide',
      desc: 'Download high-resolution curriculum roadmaps, graduate placement stats, and faculty profiles.',
      actionLabel: 'Download PDF',
      onClick: openProspectusModal,
      badge: 'Free Guide',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-12 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {hubs.map((hub, idx) => (
          <div
            key={idx}
            onClick={hub.onClick}
            className="bg-white rounded-3xl p-4.5 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="p-2.5 rounded-2xl bg-amber-50 border border-amber-100 group-hover:bg-amber-100 transition-colors">
                  {hub.icon}
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold tracking-tight">
                  {hub.badge}
                </span>
              </div>

              <h3 className="font-serif font-bold text-slate-950 text-sm group-hover:text-amber-800 transition-colors leading-snug">
                {hub.title}
              </h3>
              <span className="text-[10px] font-bold text-amber-800 block mb-1.5">
                {hub.subtitle}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                {hub.desc}
              </p>
            </div>

            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
              <span>{hub.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};