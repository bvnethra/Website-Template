import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Building, 
  ShieldCheck, 
  Calendar, 
  Heart, 
  Save, 
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, updateContactProfile } = useAuth();
  const { addToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: currentUser.phone,
    personalEmail: currentUser.personalEmail,
    residentialAddress: currentUser.residentialAddress,
    permanentAddress: currentUser.permanentAddress,
    emergencyContactName: currentUser.emergencyContactName,
    emergencyContactPhone: currentUser.emergencyContactPhone,
    emergencyContactRelation: currentUser.emergencyContactRelation,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateContactProfile(formData);
    setIsEditing(false);
    addToast({
      type: 'success',
      title: 'Contact Profile Updated',
      message: 'Your personal communication records have been synchronized with the Central Registrar.'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
            Student Academic Registry & Profile
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D4E]">
            Official permanent student record with read-only institutional data and editable communication channels.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            isEditing
              ? 'bg-[#E8EAE3] text-[#0D2F2F]'
              : 'bg-[#0D2F2F] text-white hover:bg-[#082020]'
          }`}
        >
          {isEditing ? 'Cancel Editing' : 'Edit Contact Details'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 Cols: ID Card Preview & Academic Standing */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 object-cover rounded-3xl border-3 border-[#0D2F2F] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">
                ✓
              </span>
            </div>

            <div>
              <h3 className="font-heading text-lg font-bold text-[#0D2F2F]">{currentUser.name}</h3>
              <p className="font-mono text-xs font-bold text-[#4A5D4E] mt-0.5">{currentUser.studentId}</p>
              <span className="inline-block px-3 py-1 bg-[#F4F1EA] text-[#0D2F2F] font-bold text-[11px] rounded-full border border-[#E8EAE3] mt-2">
                {currentUser.degree}
              </span>
            </div>

            <div className="pt-4 border-t border-[#E8EAE3] grid grid-cols-2 gap-3 text-left text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Batch Year</span>
                <span className="font-bold text-[#0D2F2F]">{currentUser.batch}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Semester</span>
                <span className="font-bold text-[#0D2F2F]">Sem {currentUser.semester} ({currentUser.section})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Cumulative CGPA</span>
                <span className="font-bold text-emerald-700 font-mono">{currentUser.cgpa} / 10.0</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Tuition Status</span>
                <span className="font-bold text-emerald-700">{currentUser.tuitionStatus}</span>
              </div>
            </div>
          </div>

          {/* Academic Advisor Info */}
          <div className="bg-[#F4F1EA] rounded-3xl p-6 border border-[#E0DCD3] space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#0D2F2F] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#FF6B4A]" />
              Assigned Faculty Advisor
            </h4>
            <div>
              <div className="font-bold text-sm text-[#0D2F2F]">{currentUser.advisor}</div>
              <div className="text-xs text-[#4A5D4E] mt-0.5">{currentUser.advisorCabin}</div>
              <div className="text-xs text-[#0D2F2F] font-mono mt-1">{currentUser.advisorEmail}</div>
            </div>
          </div>

        </div>

        {/* Right 8 Cols: Academic Registry (Read-only) + Editable Contact Details */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Read Only Institutional Registry Data */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE3]">
              <h3 className="font-heading text-base font-bold text-[#0D2F2F] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#4A5D4E]" />
                Institutional Registry Record (Read-Only)
              </h3>
              <span className="text-[10px] font-bold text-[#4A5D4E] uppercase">Verified by Registrar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">University Email</span>
                <span className="font-mono font-medium text-[#0D2F2F] break-all">{currentUser.email}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Date of Birth</span>
                <span className="font-medium text-[#0D2F2F]">{currentUser.dob}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Blood Group</span>
                <span className="font-bold text-red-700">{currentUser.bloodGroup}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Father's Name</span>
                <span className="font-medium text-[#0D2F2F]">{currentUser.fatherName}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Mother's Name</span>
                <span className="font-medium text-[#0D2F2F]">{currentUser.motherName}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#4A5D4E] block">Department</span>
                <span className="font-medium text-[#0D2F2F]">{currentUser.department}</span>
              </div>
            </div>
          </div>

          {/* Editable Personal Contact Details */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE3]">
              <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
                Communication & Residence Coordinates
              </h3>
              <span className="text-[10px] text-[#4A5D4E]">Editable by Candidate</span>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                    Primary Mobile Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                    Personal Email Address
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.personalEmail}
                    onChange={(e) => setFormData({ ...formData, personalEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Current Campus / Residential Address
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.residentialAddress}
                  onChange={(e) => setFormData({ ...formData, residentialAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D2F2F] uppercase mb-1">
                  Permanent Home Address
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
                />
              </div>

              {/* Emergency Contact */}
              <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] space-y-3">
                <h4 className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                  Designated Emergency Contact Point
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#4A5D4E] mb-1">Contact Name</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.emergencyContactName}
                      onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#4A5D4E] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={formData.emergencyContactPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#4A5D4E] mb-1">Relationship</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={formData.emergencyContactRelation}
                      onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] disabled:opacity-80"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4 text-[#FF6B4A]" />
                    <span>Save Updated Coordinates</span>
                  </button>
                </div>
              )}
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};
