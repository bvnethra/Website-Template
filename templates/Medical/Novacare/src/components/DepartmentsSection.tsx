import React from 'react';
import { Department } from '../types';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Activity,
  Ambulance,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';

interface DepartmentsSectionProps {
  departments: Department[];
  onSelectDepartment: (department: Department) => void;
  onOpenBookingWithDepartment: (departmentName: string) => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  departments,
  onSelectDepartment,
  onOpenBookingWithDepartment
}) => {
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-[#3157D5]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#7567E8]" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-[#28B8D4]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-amber-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-rose-500" />;
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-[#E5484D]" />;
      default:
        return <HeartPulse className="w-6 h-6 text-[#3157D5]" />;
    }
  };

  return (
    <section id="departments-section" className="py-16 lg:py-24 bg-white border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157D5]/10 text-[#3157D5] text-xs font-bold uppercase tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Medicine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight">
              Clinical Departments
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-2 max-w-xl">
              Comprehensive specialty care across leading medical centers, equipped with state-of-the-art diagnostic and therapeutic facilities.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#667085] bg-[#F6F8FC] px-3.5 py-2 rounded-xl border border-[#E4E9F2] self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-[#3157D5]" />
            <span>All Departments Fully Certified</span>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              id={`department-card-${dept.slug}`}
              onClick={() => onSelectDepartment(dept)}
              className="group relative bg-[#F6F8FC] hover:bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E9F2] hover:border-[#3157D5]/40 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-[#E4E9F2] flex items-center justify-center group-hover:scale-110 group-hover:shadow-sm transition-all duration-200">
                    {getDepartmentIcon(dept.iconName)}
                  </div>
                  {dept.emergencyAvailable && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E5484D] bg-[#E5484D]/10 px-2.5 py-1 rounded-full border border-[#E5484D]/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] animate-ping" />
                      24/7 ER
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#15213D] group-hover:text-[#3157D5] transition-colors mb-2">
                  {dept.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-6">
                  {dept.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E4E9F2] flex items-center justify-between">
                <span className="text-xs font-bold text-[#3157D5] group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {dept.specialistCount} Specialists
                </span>

                <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#3157D5] group-hover:text-white text-[#667085] border border-[#E4E9F2] flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
