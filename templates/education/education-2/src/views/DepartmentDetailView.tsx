import React from 'react';
import {
  ArrowLeft,
  Building,
  Users,
  BookOpen,
  Award,
  DollarSign,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockDepartments, mockPrograms, mockFaculty, mockResearchProjects } from '../data/mockData';

interface DepartmentDetailViewProps {
  departmentId?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const DepartmentDetailView: React.FC<DepartmentDetailViewProps> = ({ departmentId, onNavigate }) => {
  const { theme, openApplyModal } = useTheme();

  const dept = mockDepartments.find((d) => d.id === departmentId) || mockDepartments[0];
  const deptPrograms = mockPrograms.filter((p) => p.departmentId === dept.id);
  const deptFaculty = mockFaculty.filter((f) => f.departmentId === dept.id);
  const deptResearch = mockResearchProjects.filter((r) => r.departmentId === dept.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back navigation */}
      <div>
        <button
          onClick={() => onNavigate('departments')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Academic Departments</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          <img src={dept.image} alt={dept.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400 text-slate-950 w-fit mb-2">
              {dept.school}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
              {dept.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
              {dept.description}
            </p>
          </div>
        </div>

        {/* Info Ribbon */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 font-semibold block">Dean of School:</span>
            <span className="font-bold text-slate-900 text-sm">{dept.dean}</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-slate-500 font-semibold block">Headquarters:</span>
            <span className="font-bold text-slate-900 text-sm">{dept.location}</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-slate-500 font-semibold block">Annual Research Grants:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">{dept.stats.researchGrants}</span>
          </div>
          <div className="space-y-1 pt-3 sm:pt-0 sm:pl-4">
            <span className="text-slate-500 font-semibold block">Enrollment & Faculty:</span>
            <span className="font-bold text-slate-900 text-sm">{dept.stats.studentCount} Students • {dept.stats.facultyCount} Faculty</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Degrees & Research */}
        <div className="lg:col-span-8 space-y-10">
          {/* Degree Programs */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Curricular Pathways
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Degree Programs Offered by this Department
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deptPrograms.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => onNavigate('program-detail', prog.id)}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                      {prog.level}
                    </span>
                    <h4 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors">
                      {prog.name}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{prog.shortDescription}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">${prog.annualTuition.toLocaleString()}/yr</span>
                    <span className="text-amber-800 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>View Degree</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Faculty */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Scholarly Community
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                Endowed Faculty & Principal Investigators
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deptFaculty.map((fac) => (
                <div
                  key={fac.id}
                  onClick={() => onNavigate('faculty-detail', fac.id)}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex gap-3.5 items-center group"
                >
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div className="space-y-0.5 flex-1">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      {fac.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 block line-clamp-1">{fac.title}</span>
                    <span className="text-[10px] text-amber-800 font-semibold">{fac.office}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Initiatives */}
          {deptResearch.length > 0 && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                  Funded Research
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  Active Grants & Laboratory Investigations
                </h3>
              </div>

              <div className="space-y-3">
                {deptResearch.map((res) => (
                  <div key={res.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-emerald-700">{res.grantAmount}</span>
                      <span className="font-bold text-slate-600">Sponsor: {res.fundingBody}</span>
                    </div>
                    <h4 className="text-sm font-bold font-serif text-slate-900">{res.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{res.summary}</p>
                    <div className="text-[11px] text-slate-500 pt-1">
                      Lead Investigator: <strong>{res.leadInvestigator}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Contact & Office info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Department Office
            </span>
            <h4 className="text-base font-serif font-bold text-slate-900">{dept.name} Administrative Suites</h4>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{dept.location}, Cambridge Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{dept.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Office Hours: Mon–Fri, 8:30 AM – 5:00 PM</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <button
                onClick={() => openApplyModal()}
                style={{ backgroundColor: theme.primary }}
                className="w-full py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-95 shadow-sm"
              >
                Apply for School Admission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
