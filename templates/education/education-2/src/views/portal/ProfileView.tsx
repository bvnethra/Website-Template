import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BookOpen,
  Calendar,
  Building,
  Save,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Award,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfileView: React.FC = () => {
  const { currentUser, updateProfileContact } = useAuth();

  const [phone, setPhone] = useState(currentUser?.phone || '+1 (617) 555-0199');
  const [personalEmail, setPersonalEmail] = useState(
    currentUser?.personalEmail || 'alex.rivera.personal@gmail.com'
  );
  const [emergencyContact, setEmergencyContact] = useState(
    currentUser?.emergencyContact || '+1 (617) 555-0812 (Elena Rivera - Mother)'
  );
  const [address, setAddress] = useState(
    currentUser?.address || '742 Evergreen Terrace, Suite 4B, Cambridge, MA 02138'
  );
  const [guardianPhone, setGuardianPhone] = useState(
    currentUser?.guardianPhone || '+1 (617) 555-0812'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileContact({
      phone,
      personalEmail,
      emergencyContact,
      address,
      guardianPhone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Header Card */}
      <div className="bg-[#0D2F2F] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1A4F4F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6B4A]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <img
            src={currentUser?.avatarUrl}
            alt={currentUser?.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-[#FF6B4A] shadow-xl shrink-0"
          />

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1A4F4F] text-[#FF6B4A] font-bold text-xs">
                Active Enrolled Candidate
              </span>
              <span className="px-3 py-1 rounded-full bg-[#081E1E] text-slate-300 font-mono text-xs border border-[#1A4F4F]">
                Roll: {currentUser?.studentId}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {currentUser?.fullName}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300">
              {currentUser?.program} • Faculty Advisor: <strong>{currentUser?.mentorName}</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#FF6B4A]" />
                <span>DOB: {currentUser?.dob}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#FF6B4A]" />
                <span>CGPA: <strong>{currentUser?.cgpa}</strong></span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Blood Group: {currentUser?.bloodGroup}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Editable Contact Information vs Enrolled Curriculum */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Contact & Emergency Details (6 cols) */}
        <div className="lg:col-span-6 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE4D7]">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
                Contact & Residential Details
              </h3>
              <p className="text-xs text-slate-500">
                Ensure emergency phone and addresses are kept current.
              </p>
            </div>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Primary Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Personal Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={personalEmail}
                  onChange={(e) => setPersonalEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Guardian Contact Phone
              </label>
              <input
                type="text"
                required
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Emergency Contact Description
              </label>
              <input
                type="text"
                required
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs font-semibold text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                Permanent Residential Address
              </label>
              <textarea
                required
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#0D2F2F] focus:ring-2 focus:ring-[#FF6B4A]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4 text-[#FF6B4A]" />
              <span>Update Profile Contact</span>
            </button>
          </form>
        </div>

        {/* Right Info: Academic Registry Meta (6 cols) */}
        <div className="lg:col-span-6 bg-[#FDFBF7] p-6 sm:p-7 rounded-3xl border border-[#EAE4D7] shadow-xs space-y-5">
          <div className="pb-3 border-b border-[#EAE4D7]">
            <h3 className="font-serif font-bold text-lg text-[#0D2F2F]">
              Academic Registry & Enrolment
            </h3>
            <p className="text-xs text-slate-500">
              Permanent institutional record on Central SIS
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7]">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Registration No.
              </span>
              <span className="font-mono font-bold text-[#0D2F2F] text-xs mt-0.5 block">
                {currentUser?.registrationNumber}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7]">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Admission Year
              </span>
              <span className="font-bold text-[#0D2F2F] text-xs mt-0.5 block">
                {currentUser?.admissionYear}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7]">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Current Term / Semester
              </span>
              <span className="font-bold text-[#0D2F2F] text-xs mt-0.5 block">
                Semester VI (Term 6)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#EAE4D7]">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">
                Faculty Advisor
              </span>
              <span className="font-bold text-[#0D2F2F] text-xs mt-0.5 block">
                {currentUser?.mentorName}
              </span>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Active Registered Courses (Term VI)
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {currentUser?.enrolledCourses.map((c) => (
                <div
                  key={c.code}
                  className="p-3 rounded-xl bg-white border border-[#EAE4D7] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-[#0D2F2F]">{c.code}</span>
                    <span className="font-semibold text-slate-800 ml-2">{c.name}</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Instructor: {c.instructor}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#0D2F2F]/10 text-[#0D2F2F] font-bold text-[10px] shrink-0">
                    {c.credits} CR
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
