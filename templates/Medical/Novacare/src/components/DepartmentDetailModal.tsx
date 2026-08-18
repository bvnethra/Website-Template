import React from 'react';
import { Department, Doctor } from '../types';
import {
  X,
  Building2,
  Users,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Activity,
  ArrowRight,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface DepartmentDetailModalProps {
  department: Department | null;
  doctors: Doctor[];
  onClose: () => void;
  onBookDepartment: (departmentName: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  doctors,
  onClose,
  onBookDepartment,
  onSelectDoctor
}) => {
  if (!department) return null;

  const departmentDoctors = doctors.filter(
    (d) => d.department.toLowerCase() === department.name.toLowerCase()
  );

  return (
    <div
      id="department-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id={`department-dialog-${department.id}`}
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#15213D] p-6 sm:p-7 text-white relative">
          <button
            id="close-department-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Department Details"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#28B8D4] uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4" />
            <span>Clinical Department</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Department of {department.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            {department.fullDescription}
          </p>

          {/* Department stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10">
            {department.featuredStats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{stat.label}</span>
                <span className="text-base font-bold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-220px)] overflow-y-auto">
          
          {/* Key Treatments */}
          <div>
            <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-[#3157D5]" />
              Specialized Procedures & Treatments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {department.keyTreatments.map((treatment, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F8FC] border border-[#E4E9F2]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-[#15213D]">{treatment}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Staff */}
          <div className="bg-[#F6F8FC] p-4.5 rounded-2xl border border-[#E4E9F2] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#667085] uppercase font-bold tracking-wider block">Department Leadership</span>
              <h4 className="text-sm font-bold text-[#15213D]">{department.headDoctorName}</h4>
              <p className="text-xs text-[#667085]">{department.headDoctorTitle}</p>
            </div>
            <span className="text-xs font-semibold text-[#3157D5] bg-[#3157D5]/10 px-3 py-1.5 rounded-xl">
              {department.specialistCount} Active Specialists
            </span>
          </div>

          {/* Associated Specialists */}
          {departmentDoctors.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#7567E8]" />
                Specialists in {department.name}
              </h3>
              <div className="space-y-2.5">
                {departmentDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E4E9F2] hover:border-[#3157D5]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-11 h-11 rounded-xl object-cover border border-[#E4E9F2]"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#15213D]">{doc.name}</h4>
                        <p className="text-[11px] text-[#667085]">{doc.specialty} • {doc.experienceYears}+ yrs</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectDoctor(doc);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3157D5] bg-[#3157D5]/10 hover:bg-[#3157D5] hover:text-white transition-colors cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#F6F8FC] border-t border-[#E4E9F2] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#15213D] transition-colors"
          >
            Close
          </button>
          <button
            id={`book-from-dept-${department.slug}-btn`}
            onClick={() => {
              onClose();
              onBookDepartment(department.name);
            }}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#3157D5]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation in {department.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
