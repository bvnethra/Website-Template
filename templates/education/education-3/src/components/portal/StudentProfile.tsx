import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Lock, 
  Save, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Calendar,
  Sparkles,
  Award,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentProfile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [phone, setPhone] = useState(currentUser?.phone || '+91 98450 12894');
  const [emergencyContact, setEmergencyContact] = useState(currentUser?.emergencyContact || '+91 94432 89011 (Parent)');
  const [address, setAddress] = useState(currentUser?.address || 'Block 4, Flat 302, Green Valley Enclave, Innovation Way, Tech City - 600113');
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'O+ Positive');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      emergencyContact,
      address,
      bloodGroup
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <UserCircle2 className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official Academic Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Student Profile & Registry Record
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Academic records are centrally authenticated by the Office of the Registrar. Contact details can be updated below.
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD5] shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#0D2F2F] border-4 border-[#FF6B4A] overflow-hidden shadow-md">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-500 text-white shadow-xs" title="Registry Verified">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#0D2F2F] font-display">
                {currentUser?.name}
              </h2>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {currentUser?.status || 'Active Regular'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#476666]">
              {currentUser?.program} • Roll No: <strong className="font-mono text-[#0D2F2F]">{currentUser?.studentId}</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#476666]">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FF6B4A]" />
                {currentUser?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#0D2F2F]" />
                {currentUser?.department}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Read-Only Registry + Editable Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: Read-Only Academic Registry */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
              <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#8A9E9E]" />
                Academic Registry (Read-Only)
              </h3>
              <span className="text-[10px] text-[#8A9E9E] font-semibold">Locked by Registrar</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5]">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Enrollment No.</span>
                <span className="font-mono font-bold text-[#0D2F2F]">{currentUser?.studentId}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5]">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Admission Date</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser?.enrollmentDate}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5]">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Academic Batch</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser?.batch}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5]">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Quota / Admission Rank</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser?.quota}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] col-span-2">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Assigned Faculty Advisor</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser?.academicAdvisor}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] col-span-2">
                <span className="text-[#8A9E9E] block text-[10px] uppercase font-bold">Degree & Specialization</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser?.program}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Editable Contact Information */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E5DFD5] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
              <h3 className="text-sm font-bold text-[#0D2F2F] uppercase tracking-wider flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF6B4A]" />
                Contact & Residential Details
              </h3>
              <span className="text-[10px] text-emerald-700 font-bold">Editable</span>
            </div>

            {savedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Contact details updated and synchronized with university servers!</span>
              </motion.div>
            )}

            <form onSubmit={handleSaveContact} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                  Primary Mobile Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] font-semibold focus:outline-none focus:border-[#FF6B4A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                  Emergency Contact / Guardian Phone
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] font-semibold focus:outline-none focus:border-[#FF6B4A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] font-semibold focus:outline-none focus:border-[#FF6B4A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D2F2F] block mb-1">
                  Permanent Residential Communication Address
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D8D0C5] text-xs text-[#0D2F2F] leading-relaxed focus:outline-none focus:border-[#FF6B4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#FF6B4A]" />
                <span>Save Contact Updates</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
