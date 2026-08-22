import React from 'react';
import { Award, Users, DollarSign, Globe, BookOpen, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const MetricsSection: React.FC = () => {
  const { theme, config } = useTheme();

  const metrics = [
    {
      value: config.employmentRate,
      label: 'Ivy & Top-50 Matriculation',
      sublabel: 'Graduates attending Harvard, MIT, Stanford, Oxford, Yale & Cambridge',
      icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
    },
    {
      value: '150+',
      label: 'Distinguished Faculty Scholars',
      sublabel: '88% hold terminal PhDs and Masters from leading global universities',
      icon: <Users className="w-5 h-5 text-amber-400" />,
    },
    {
      value: '42',
      label: 'Olympiad & ISEF Medals',
      sublabel: 'National and international accolades in Physics, Math, Chemistry & AI',
      icon: <Award className="w-5 h-5 text-amber-400" />,
    },
    {
      value: config.researchFunding,
      label: 'Annual Student Research Grants',
      sublabel: 'Endowed labs supporting published high-school student peer-reviewed papers',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    },
    {
      value: '120',
      label: 'Acre Waterfront Campus',
      sublabel: 'State-of-the-art cleanrooms, robotics arenas, library & athletic complex',
      icon: <Globe className="w-5 h-5 text-amber-400" />,
    },
    {
      value: '100%',
      label: 'Demonstrated Need-Met Aid',
      sublabel: 'No deserving scholar is turned away due to financial constraints',
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-8 relative overflow-hidden border-y border-slate-800">
      {/* Decorative background glow */}
      <div
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.primary}50 0%, transparent 70%)`,
        }}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Validated Academic Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Measuring Our Global Educational Footprint
          </h2>
          <p className="text-sm text-slate-300">
            Every metric reflects our unwavering dedication to intellectual discovery, student mentorship, and holistic human development.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl sm:text-4xl font-serif font-black text-amber-300 group-hover:text-amber-200 transition-colors">
                  {metric.value}
                </span>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-amber-400/20 transition-colors">
                  {metric.icon}
                </div>
              </div>

              <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-100">
                {metric.label}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};