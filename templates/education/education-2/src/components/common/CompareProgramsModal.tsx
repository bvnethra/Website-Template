import React from 'react';
import { X, Check, ArrowRight, BookOpen, Clock, Award, DollarSign, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockPrograms } from '../../data/mockData';

export const CompareProgramsModal: React.FC = () => {
  const { isCompareModalOpen, closeCompareModal, compareProgramIds, toggleCompareProgram, openApplyModal, theme } = useTheme();

  if (!isCompareModalOpen) return null;

  const comparedPrograms = mockPrograms.filter((p) => compareProgramIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div
          style={{ backgroundColor: theme.primary }}
          className="p-6 text-white flex items-center justify-between shrink-0"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>Side-by-Side Evaluation</span>
            </div>
            <h2 className="text-xl font-bold font-serif">Academic Program Comparison</h2>
            <p className="text-xs text-slate-300">Comparing curricula, duration, tuition, and prospective career trajectories</p>
          </div>
          <button
            onClick={closeCompareModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {comparedPrograms.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-slate-500">
              <BookOpen className="w-12 h-12 stroke-1 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Programs Selected for Comparison</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Explore our academic catalog and click the "Compare" checkbox on up to 3 programs to view their comparative breakdown here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-4 font-bold text-slate-700 uppercase tracking-wider w-1/4">Criteria</th>
                    {comparedPrograms.map((prog) => (
                      <th key={prog.id} className="p-4 font-bold text-slate-900 w-1/3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider block">{prog.level}</span>
                            <span className="text-sm font-serif font-bold text-slate-900">{prog.name}</span>
                          </div>
                          <button
                            onClick={() => toggleCompareProgram(prog.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">School & Department</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 font-medium text-slate-800">
                        {prog.departmentName}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Duration & Credits</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 text-slate-700">
                        <span className="font-bold text-slate-900">{prog.duration}</span> ({prog.credits} Credits)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Annual Tuition</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 font-mono font-bold text-emerald-800">
                        ${prog.annualTuition.toLocaleString()} / year
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Study Modality</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 text-slate-700">
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium">
                          {prog.studyMode}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Career Placement</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 space-y-1">
                        <span className="font-bold text-emerald-700 block">{prog.careerProspects.placementRate} placement</span>
                        <span className="text-slate-500 text-[11px]">Avg: {prog.careerProspects.averageSalary}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Key Roles</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4 text-slate-600">
                        {prog.careerProspects.roles.slice(0, 3).join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Application Action</td>
                    {comparedPrograms.map((prog) => (
                      <td key={prog.id} className="p-4">
                        <button
                          onClick={() => {
                            closeCompareModal();
                            openApplyModal(prog.id);
                          }}
                          style={{ backgroundColor: theme.primary }}
                          className="w-full py-2 rounded-xl text-white font-bold text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};