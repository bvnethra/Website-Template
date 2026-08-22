import React from 'react';
import { Users, Compass, Award, Building, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CampusLifeViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const CampusLifeView: React.FC<CampusLifeViewProps> = ({ onNavigate }) => {
  const { theme, config, openTourModal } = useTheme();

  const clubs = [
    { name: 'Edunexa Robotics & Autonomous Systems Society', members: '340+ members', category: 'Engineering & Tech' },
    { name: 'Charles River Philosophical & Debating Union', members: '210+ members', category: 'Humanities & Civic' },
    { name: 'Global Health & Biomedical Equity Coalition', members: '180+ members', category: 'Clinical & Pre-Med' },
    { name: 'Edunexa Symphony Orchestra & Chamber Ensemble', members: '110 musicians', category: 'Performing Arts' },
    { name: 'Venture Capital & Entrepreneurship Guild', members: '420+ members', category: 'Business & Startup' },
    { name: 'Edunexa Environmental Action & Solar Initiative', members: '260+ members', category: 'Sustainability' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Student Experience & Traditions
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Residential House Life & Student Guilds
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Life at {config.name} is centered around our residential houses and innovation commons, where students live, dine, debate, and collaborate alongside resident faculty mentors and visiting fellows.
        </p>
      </div>

      {/* Hero Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <Building className="w-8 h-8 text-amber-800" />
          <h3 className="text-base font-serif font-bold text-slate-900">Residential Houses</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every scholar is part of an active residential house community with dedicated dining salons, quiet reading libraries, and intramural athletic teams.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <Users className="w-8 h-8 text-blue-800" />
          <h3 className="text-base font-serif font-bold text-slate-900">120+ Student Organizations</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            From autonomous rocketry and parliamentary debate to acapella, student journalism, hackathons, and varsity athletics.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <Compass className="w-8 h-8 text-emerald-800" />
          <h3 className="text-base font-serif font-bold text-slate-900">Boston Innovation District</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Directly situated on the waterfront with rapid transit access to Boston’s biotech corridors, fine arts museums, and venture hubs.
          </p>
        </div>
      </div>

      {/* Featured Student Organizations */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
            Co-Curricular Engagement
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Featured Student Societies & Guilds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                {club.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 font-serif">{club.name}</h3>
              <span className="text-xs text-slate-500 block">{club.members}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Tour Invite */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-white">Experience Campus Life in Person</h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Join a current student ambassador for a 90-minute walking tour through our residential quads, dining halls, robotics labs, and athletic boathouse.
          </p>
        </div>
        <button
          onClick={openTourModal}
          style={{ backgroundColor: theme.accent }}
          className="px-6 py-3 rounded-2xl text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-md shrink-0 flex items-center gap-2"
        >
          <Compass className="w-4 h-4 text-slate-950" />
          <span>Book Walking Tour</span>
        </button>
      </div>
    </div>
  );
};
