import React, { useState } from 'react';
import { Doctor } from '../types';
import {
  X,
  Star,
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  Award,
  Languages,
  Mail,
  Phone,
  ShieldCheck,
  Building,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor, selectedDate?: string, selectedTime?: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBookAppointment
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  if (!doctor) return null;

  const currentAvailableDates = doctor.availableSlots || [];
  const activeSlotObj = currentAvailableDates.find((d) => d.date === selectedDate) || currentAvailableDates[0];

  const handleSelectTime = (time: string, date: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleConfirmBooking = () => {
    onBookAppointment(doctor, selectedDate || currentAvailableDates[0]?.date, selectedTime || currentAvailableDates[0]?.times[0]);
  };

  return (
    <div
      id="doctor-profile-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id={`doctor-profile-dialog-${doctor.id}`}
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon / Banner */}
        <div className="bg-gradient-to-r from-[#15213D] via-[#2443AE] to-[#3157D5] p-6 text-white relative">
          <button
            id="close-doctor-profile-btn"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Doctor Profile"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Verified MD
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="bg-white/20 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-0.5 rounded-lg">
                  {doctor.department}
                </span>
                <span className="text-emerald-300 text-xs font-semibold bg-emerald-500/20 px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {doctor.availability}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{doctor.name}</h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">{doctor.specialty} • {doctor.title}</p>

              <div className="flex items-center gap-4 mt-3 text-xs text-slate-200">
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {doctor.rating} ({doctor.reviewCount} reviews)
                </span>
                <span>•</span>
                <span>{doctor.experienceYears} Years Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-200px)] overflow-y-auto">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F6F8FC] p-4 rounded-2xl border border-[#E4E9F2]">
            <div>
              <span className="text-[10px] text-[#667085] uppercase font-bold block">Consultation Fee</span>
              <span className="text-sm font-bold text-[#15213D]">${doctor.consultationFee}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667085] uppercase font-bold block">Clinic Location</span>
              <span className="text-xs font-bold text-[#15213D] truncate block">{doctor.roomNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667085] uppercase font-bold block">Languages</span>
              <span className="text-xs font-bold text-[#15213D] truncate block">{doctor.languages.join(', ')}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#667085] uppercase font-bold block">Direct Helpline</span>
              <span className="text-xs font-bold text-[#3157D5] truncate block">{doctor.phone}</span>
            </div>
          </div>

          {/* Biography */}
          <div>
            <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#3157D5]" />
              About Specialist
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">{doctor.about}</p>
          </div>

          {/* Education & Credentials */}
          <div>
            <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#7567E8]" />
              Education & Clinical Training
            </h3>
            <ul className="space-y-1.5">
              {doctor.education.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#15213D]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Specializations */}
          <div>
            <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#28B8D4]" />
              Clinical Focus & Procedures
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#EEF3FA] text-[#15213D] rounded-xl text-xs font-medium border border-[#E4E9F2]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Available Slots Selector */}
          {currentAvailableDates.length > 0 && (
            <div className="bg-[#F6F8FC] p-4.5 rounded-2xl border border-[#E4E9F2]">
              <h3 className="text-sm font-bold text-[#15213D] mb-3 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#3157D5]" />
                Select Preferred Consultation Slot
              </h3>

              {/* Date selection tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3">
                {currentAvailableDates.map((slot) => {
                  const isDateActive = (selectedDate || currentAvailableDates[0]?.date) === slot.date;
                  return (
                    <button
                      key={slot.date}
                      onClick={() => {
                        setSelectedDate(slot.date);
                        setSelectedTime('');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isDateActive
                          ? 'bg-[#3157D5] text-white shadow-xs'
                          : 'bg-white text-[#15213D] border border-[#E4E9F2] hover:bg-[#EEF3FA]'
                      }`}
                    >
                      {new Date(slot.date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </button>
                  );
                })}
              </div>

              {/* Times for selected date */}
              <div className="flex flex-wrap gap-2">
                {activeSlotObj?.times.map((time) => {
                  const isTimeActive = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => handleSelectTime(time, activeSlotObj.date)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isTimeActive
                          ? 'bg-[#2443AE] text-white ring-2 ring-[#3157D5]'
                          : 'bg-white text-[#15213D] border border-[#E4E9F2] hover:border-[#3157D5]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-[#F6F8FC] border-t border-[#E4E9F2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${doctor.contactEmail}`}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#15213D] bg-white hover:bg-[#EEF3FA] border border-[#E4E9F2] flex items-center justify-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#667085]" />
              <span>Email Office</span>
            </a>
            <a
              href={`tel:${doctor.phone}`}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#15213D] bg-white hover:bg-[#EEF3FA] border border-[#E4E9F2] flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#3157D5]" />
              <span>Call Clinic</span>
            </a>
          </div>

          <button
            id="modal-book-this-doctor-btn"
            onClick={handleConfirmBooking}
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] shadow-md shadow-[#3157D5]/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment with {doctor.name.split(' ')[1] || doctor.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
