import React, { useState, useEffect } from 'react';
import { Doctor, Department, AppointmentFormData, Appointment } from '../types';
import { mockApi } from '../services/mockApi';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  departments: Department[];
  preselectedDoctor?: Doctor | null;
  preselectedDepartment?: string | null;
  preselectedDate?: string;
  preselectedTime?: string;
  onAppointmentCreated: (appointment: Appointment) => void;
  onOpenMyAppointments: () => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  doctors,
  departments,
  preselectedDoctor,
  preselectedDepartment,
  preselectedDate,
  preselectedTime,
  onAppointmentCreated,
  onOpenMyAppointments
}) => {
  // Form fields
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState(preselectedDepartment || '');
  const [doctorId, setDoctorId] = useState(preselectedDoctor?.id || '');
  const [date, setDate] = useState(preselectedDate || '');
  const [time, setTime] = useState(preselectedTime || '');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  // UI States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);

  // Sync state when props change
  useEffect(() => {
    if (preselectedDoctor) {
      setDoctorId(preselectedDoctor.id);
      setDepartment(preselectedDoctor.department);
      if (preselectedDoctor.availableSlots?.[0]) {
        setDate(preselectedDate || preselectedDoctor.availableSlots[0].date);
        setTime(preselectedTime || preselectedDoctor.availableSlots[0].times[0]);
      }
    } else if (preselectedDepartment) {
      setDepartment(preselectedDepartment);
      const matchedDoctor = doctors.find(
        (d) => d.department.toLowerCase() === preselectedDepartment.toLowerCase()
      );
      if (matchedDoctor) {
        setDoctorId(matchedDoctor.id);
        if (matchedDoctor.availableSlots?.[0]) {
          setDate(matchedDoctor.availableSlots[0].date);
          setTime(matchedDoctor.availableSlots[0].times[0]);
        }
      }
    } else {
      // Default to first doctor
      if (doctors.length > 0 && !doctorId) {
        setDoctorId(doctors[0].id);
        setDepartment(doctors[0].department);
        if (doctors[0].availableSlots?.[0]) {
          setDate(doctors[0].availableSlots[0].date);
          setTime(doctors[0].availableSlots[0].times[0]);
        }
      }
    }
  }, [preselectedDoctor, preselectedDepartment, preselectedDate, preselectedTime, isOpen, doctors]);

  if (!isOpen) return null;

  // Filter available doctors by department
  const filteredDoctors = department
    ? doctors.filter((d) => d.department.toLowerCase() === department.toLowerCase())
    : doctors;

  const currentDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  // Available times for currently selected date
  const availableSlotsForDate = currentDoctor?.availableSlots?.find((s) => s.date === date);
  const availableTimes = availableSlotsForDate?.times || [
    '09:00 AM',
    '10:30 AM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM'
  ];

  // Minimum date today
  const todayString = new Date().toISOString().split('T')[0];

  const handleDepartmentChange = (newDept: string) => {
    setDepartment(newDept);
    const newDocs = doctors.filter((d) => d.department.toLowerCase() === newDept.toLowerCase());
    if (newDocs.length > 0) {
      setDoctorId(newDocs[0].id);
      if (newDocs[0].availableSlots?.[0]) {
        setDate(newDocs[0].availableSlots[0].date);
        setTime(newDocs[0].availableSlots[0].times[0]);
      }
    }
    if (errors.department) {
      setErrors((prev) => ({ ...prev, department: '' }));
    }
  };

  const handleDoctorChange = (newDocId: string) => {
    setDoctorId(newDocId);
    const doc = doctors.find((d) => d.id === newDocId);
    if (doc) {
      setDepartment(doc.department);
      if (doc.availableSlots?.[0]) {
        setDate(doc.availableSlots[0].date);
        setTime(doc.availableSlots[0].times[0]);
      }
    }
    if (errors.doctorId) {
      setErrors((prev) => ({ ...prev, doctorId: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!patientName.trim()) {
      newErrors.patientName = 'Full name is required.';
    } else if (patientName.trim().length < 2) {
      newErrors.patientName = 'Please enter a valid patient name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please enter a valid telephone number.';
    }

    if (!department) {
      newErrors.department = 'Please choose a clinical department.';
    }

    if (!doctorId) {
      newErrors.doctorId = 'Please select a specialist physician.';
    }

    if (!date) {
      newErrors.date = 'Please pick an appointment date.';
    } else if (date < todayString) {
      newErrors.date = 'Appointment date cannot be in the past.';
    }

    if (!time) {
      newErrors.time = 'Please select a consultation time slot.';
    }

    if (!reason.trim()) {
      newErrors.reason = 'Please provide a brief reason for your consultation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload: AppointmentFormData = {
        patientName: patientName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        department,
        doctorId,
        date,
        time,
        reason: reason.trim(),
        notes: notes.trim()
      };

      const result = await mockApi.createAppointment(payload);
      setBookingSuccess(result);
      onAppointmentCreated(result);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    } catch (err) {
      setErrors({
        form: 'Failed to confirm booking. Please review your details and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForAnother = () => {
    setBookingSuccess(null);
    setPatientName('');
    setEmail('');
    setPhone('');
    setReason('');
    setNotes('');
    setErrors({});
  };

  return (
    <div
      id="appointment-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div
        id="appointment-booking-dialog"
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-[#15213D] p-6 text-white relative">
          {!isSubmitting && (
            <button
              id="close-appointment-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Booking"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-2 text-xs font-semibold text-[#28B8D4] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Online Patient Reservation</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {bookingSuccess ? 'Appointment Confirmed!' : 'Book Doctor Consultation'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {bookingSuccess
              ? 'Your booking is securely registered in the NovaCare clinical system.'
              : 'Select your specialist, preferred appointment date, and enter patient details.'}
          </p>
        </div>

        {/* Modal Body: Success Screen OR Booking Form */}
        {bookingSuccess ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-800">
                  Confirmation Pass
                </span>
                <h3 className="text-2xl font-extrabold text-emerald-950 font-mono tracking-tight mt-1">
                  {bookingSuccess.id}
                </h3>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-emerald-100 text-left space-y-3 shadow-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <img
                    src={bookingSuccess.doctorImage}
                    alt={bookingSuccess.doctorName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#E4E9F2]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#15213D]">{bookingSuccess.doctorName}</h4>
                    <p className="text-xs text-[#3157D5] font-semibold">{bookingSuccess.doctorSpecialty}</p>
                    <p className="text-[11px] text-[#667085]">Dept: {bookingSuccess.department}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#667085] block">Patient Name:</span>
                    <strong className="text-[#15213D]">{bookingSuccess.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-[#667085] block">Contact Phone:</span>
                    <strong className="text-[#15213D]">{bookingSuccess.patientPhone}</strong>
                  </div>
                  <div>
                    <span className="text-[#667085] block">Date:</span>
                    <strong className="text-[#15213D] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#3157D5]" />
                      {bookingSuccess.date}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#667085] block">Time Slot:</span>
                    <strong className="text-[#15213D] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#28B8D4]" />
                      {bookingSuccess.time}
                    </strong>
                  </div>
                </div>
              </div>

              <p className="text-xs text-emerald-800 leading-relaxed">
                A confirmation has been logged to your patient dashboard. Please arrive 10 minutes prior to your time.
              </p>
            </div>

            {/* Success Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                id="view-in-my-appointments-btn"
                onClick={() => {
                  onClose();
                  onOpenMyAppointments();
                }}
                className="w-full sm:flex-1 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#3157D5]/20"
              >
                <Calendar className="w-4 h-4" />
                <span>View in My Appointments</span>
              </button>

              <button
                id="book-another-appointment-btn"
                onClick={handleResetForAnother}
                className="w-full sm:flex-1 py-3 rounded-xl text-xs sm:text-sm font-semibold text-[#15213D] bg-[#F6F8FC] hover:bg-[#EEF3FA] border border-[#E4E9F2] transition-colors cursor-pointer"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 max-h-[calc(85vh-160px)] overflow-y-auto">
            {errors.form && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Department & Doctor Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] uppercase tracking-wider mb-1.5">
                  Department *
                </label>
                <select
                  id="appointment-form-department-select"
                  value={department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className={`w-full p-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm font-medium text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                    errors.department ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="text-[11px] text-rose-600 mt-1">{errors.department}</p>}
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] uppercase tracking-wider mb-1.5">
                  Specialist Doctor *
                </label>
                <select
                  id="appointment-form-doctor-select"
                  value={doctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className={`w-full p-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm font-medium text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                    errors.doctorId ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                  }`}
                >
                  <option value="">Choose Specialist</option>
                  {filteredDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.specialty})
                    </option>
                  ))}
                </select>
                {errors.doctorId && <p className="text-[11px] text-rose-600 mt-1">{errors.doctorId}</p>}
              </div>
            </div>

            {/* Doctor mini preview if selected */}
            {currentDoctor && (
              <div className="bg-[#F6F8FC] p-3 rounded-2xl border border-[#E4E9F2] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentDoctor.image}
                    alt={currentDoctor.name}
                    className="w-11 h-11 rounded-xl object-cover border border-[#E4E9F2]"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#15213D]">{currentDoctor.name}</h4>
                    <p className="text-[11px] text-[#667085]">{currentDoctor.specialty} • Fee: ${currentDoctor.consultationFee}</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  {currentDoctor.availability}
                </span>
              </div>
            )}

            {/* Date & Time Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] uppercase tracking-wider mb-1.5">
                  Consultation Date *
                </label>
                <div className="relative">
                  <input
                    id="appointment-form-date-input"
                    type="date"
                    min={todayString}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                    }}
                    className={`w-full p-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm font-medium text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                      errors.date ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                    }`}
                  />
                </div>
                {errors.date && <p className="text-[11px] text-rose-600 mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] uppercase tracking-wider mb-1.5">
                  Time Slot *
                </label>
                <select
                  id="appointment-form-time-select"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                  }}
                  className={`w-full p-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm font-medium text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                    errors.time ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                  }`}
                >
                  <option value="">Select Time Slot</option>
                  {availableTimes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && <p className="text-[11px] text-rose-600 mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Patient Personal Info */}
            <div className="space-y-3 pt-2 border-t border-[#E4E9F2]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085]">Patient Information</h4>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] mb-1">Patient Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="appointment-form-patient-name"
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={patientName}
                    onChange={(e) => {
                      setPatientName(e.target.value);
                      if (errors.patientName) setErrors((prev) => ({ ...prev, patientName: '' }));
                    }}
                    className={`w-full pl-9 pr-3 py-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                      errors.patientName ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                    }`}
                  />
                </div>
                {errors.patientName && <p className="text-[11px] text-rose-600 mt-1">{errors.patientName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#15213D] mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="appointment-form-email"
                      type="email"
                      placeholder="alex.morgan@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#15213D] mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="appointment-form-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full pl-9 pr-3 py-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                        errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-xs font-bold text-[#15213D] mb-1">Reason for Visit / Symptoms *</label>
                <textarea
                  id="appointment-form-reason"
                  rows={2}
                  placeholder="Describe your symptoms or consultation goals (e.g. Routine heart check, joint pain)..."
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    if (errors.reason) setErrors((prev) => ({ ...prev, reason: '' }));
                  }}
                  className={`w-full p-2.5 bg-[#F6F8FC] rounded-xl border text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 ${
                    errors.reason ? 'border-rose-400 bg-rose-50/50' : 'border-[#E4E9F2]'
                  }`}
                />
                {errors.reason && <p className="text-[11px] text-rose-600 mt-1">{errors.reason}</p>}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-[#E4E9F2] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#15213D] transition-colors"
              >
                Cancel
              </button>

              <button
                id="submit-appointment-btn"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] disabled:bg-slate-400 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-[#3157D5]/20 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirming Appointment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Book Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
