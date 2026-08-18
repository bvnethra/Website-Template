import React from 'react';
import { TRUST_STATS } from '../data/mockData';
import { Users, Building2, PhoneCall, Award, CheckCircle } from 'lucide-react';

interface TrustStatsProps {
  onNavigateTo: (section: string) => void;
}

export const TrustStats: React.FC<TrustStatsProps> = ({ onNavigateTo }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Users className="w-5 h-5 text-[#3157D5]" />;
      case 1:
        return <Building2 className="w-5 h-5 text-[#28B8D4]" />;
      case 2:
        return <PhoneCall className="w-5 h-5 text-[#E5484D]" />;
      default:
        return <Award className="w-5 h-5 text-[#7567E8]" />;
    }
  };

  return (
    <section id="trust-stats-section" className="py-12 bg-white border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_STATS.map((stat, idx) => (
            <div
              key={idx}
              id={`stat-card-${idx}`}
              className="p-5 sm:p-6 rounded-2xl bg-[#F6F8FC] border border-[#E4E9F2]/80 hover:border-[#3157D5]/30 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(idx)}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#667085] bg-white px-2 py-0.5 rounded-full border border-[#E4E9F2]">
                  Verified
                </span>
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight mb-1">
                {stat.value}
              </div>
              <h3 className="text-sm font-bold text-[#15213D] mb-0.5">{stat.label}</h3>
              <p className="text-xs text-[#667085] leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
