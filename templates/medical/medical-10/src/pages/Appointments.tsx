import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { DEPARTMENTS } from '../data/departments';
import { DOCTORS } from '../data/doctors';
import { useAppointments } from '../context/AppointmentContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';

const patientFormSchema = z.object({
  fullName: z.string().min(2, 'Full Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (at least 10 digits)'),
  dob: z.string().min(1, 'Date of birth is required'),
  appointmentType: z.enum(['In-person Consultation', 'Video Telehealth', 'Follow-up Visit']),
  reasonForVisit: z.string().min(5, 'Please summarize the reason for your visit (at least 5 characters)'),
  preferredContact: z.enum(['Email', 'Phone', 'SMS']),
});

type PatientFormData = z.infer<typeof patientFormSchema>;

export const Appointments: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addAppointment } = useAppointments();
  const { showToast } = useToast();

  const queryDeptId = searchParams.get('departmentId');
  const queryDoctorId = searchParams.get('doctorId');
  const queryTimeSlot = searchParams.get('timeSlot');

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(queryDeptId || DEPARTMENTS[0].id);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(queryDoctorId || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(queryTimeSlot || '');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (queryDoctorId) {
      const doc = DOCTORS.find(d => d.id === queryDoctorId);
      if (doc) {
        setSelectedDeptId(doc.departmentId);
        setSelectedDoctorId(doc.id);
        if (queryTimeSlot) {
          setSelectedTimeSlot(queryTimeSlot);
          setCurrentStep(5);
        } else {
          setCurrentStep(3);
        }
      }
    }
  }, [queryDoctorId, queryTimeSlot]);

  const filteredDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '(555) 234-5678',
      dob: '1992-06-15',
      appointmentType: 'In-person Consultation',
      reasonForVisit: 'Routine wellness physical examination and general checkup.',
      preferredContact: 'Email'
    }
  });

  const selectedDepartmentObj = DEPARTMENTS.find(d => d.id === selectedDeptId);
  const selectedDoctorObj = DOCTORS.find(d => d.id === selectedDoctorId) || filteredDoctors[0];

  const handleStep1Next = () => {
    if (!selectedDeptId) {
      showToast('Selection Required', 'Please choose a department to proceed.', 'error');
      return;
    }
    const inDept = DOCTORS.filter(d => d.departmentId === selectedDeptId);
    if (inDept.length > 0 && !selectedDoctorId) {
      setSelectedDoctorId(inDept[0].id);
    }
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!selectedDoctorId) {
      showToast('Selection Required', 'Please select a doctor to continue.', 'error');
      return;
    }
    setCurrentStep(3);
  };

  const handleStep3Next = () => {
    if (!selectedDate) {
      showToast('Date Required', 'Please select an appointment date.', 'error');
      return;
    }
    setCurrentStep(4);
  };

  const handleStep4Next = () => {
    if (!selectedTimeSlot) {
      showToast('Time Required', 'Please select a time slot.', 'error');
      return;
    }
    setCurrentStep(5);
  };

  const onSubmitPatientForm = (data: PatientFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newAppt = addAppointment({
        departmentId: selectedDeptId,
        departmentName: selectedDepartmentObj?.name || 'General Medicine',
        doctorId: selectedDoctorObj.id,
        doctorName: selectedDoctorObj.name,
        doctorSpecialty: selectedDoctorObj.specialty,
        doctorAvatar: selectedDoctorObj.avatar,
        date: selectedDate,
        timeSlot: selectedTimeSlot || '10:00 AM',
        patientName: data.fullName,
        patientEmail: data.email,
        patientPhone: data.phone,
        patientDob: data.dob,
        appointmentType: data.appointmentType,
        reasonForVisit: data.reasonForVisit,
        preferredContact: data.preferredContact,
        location: selectedDoctorObj.location || 'CareNova Central Flagship Hub'
      });

      setIsSubmitting(false);
      showToast('Appointment Confirmed!', `Booking ID ${newAppt.id} generated successfully.`, 'success');
      navigate(`/appointments/confirmation?id=${newAppt.id}`);
    }, 600);
  };

  const availableTimeSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM',
    '10:30 AM', '11:00 AM', '01:30 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:30 PM'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ScrollReveal direction="down">
        <div className="text-center space-y-2">
          <Badge variant="primary" size="md" className="mx-auto">
            Online Appointment System
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Schedule Your Consultation</h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Complete our 5-step scheduling wizard to reserve your visit with CareNova specialists.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between relative">
          {[
            { step: 1, label: 'Department', icon: Stethoscope },
            { step: 2, label: 'Doctor', icon: User },
            { step: 3, label: 'Date', icon: CalendarIcon },
            { step: 4, label: 'Time', icon: Clock },
            { step: 5, label: 'Patient Info', icon: CheckCircle2 }
          ].map((st, idx) => (
            <React.Fragment key={st.step}>
              <div className="flex flex-col items-center gap-1 z-10">
                <button
                  onClick={() => {
                    if (st.step < currentStep) setCurrentStep(st.step);
                  }}
                  disabled={st.step > currentStep}
                  className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                    currentStep === st.step
                      ? 'bg-primary text-white shadow-glow scale-110'
                      : currentStep > st.step
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <st.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className={`text-[10px] sm:text-[11px] font-semibold hidden sm:inline ${currentStep === st.step ? 'text-primary font-bold' : 'text-slate-500'}`}>
                  {st.label}
                </span>
              </div>
              {idx < 4 && (
                <div
                  className={`flex-1 h-1 rounded mx-2 transition-colors ${
                    currentStep > st.step ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Step 1: Choose Medical Department</h2>
              <p className="text-xs text-slate-500">Select the clinical department corresponding to your healthcare need.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    selectedDeptId === dept.id
                      ? 'bg-blue-50/80 border-primary shadow-soft text-primary'
                      : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedDeptId === dept.id ? 'bg-primary text-white' : 'bg-white text-slate-600 border'}`}>
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900">{dept.name}</p>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{dept.shortDescription}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="primary" size="md" onClick={handleStep1Next} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next: Select Doctor
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Step 2: Choose Doctor</h2>
              <p className="text-xs text-slate-500">
                Select from specialists in <strong>{selectedDepartmentObj?.name}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredDoctors.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                    selectedDoctorId === doc.id
                      ? 'bg-blue-50/80 border-primary shadow-soft ring-2 ring-primary/20'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{doc.name}</p>
                    <p className="text-xs text-primary font-semibold">{doc.specialty}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{doc.experienceYears} Yrs Exp • ${doc.fee} Fee</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={handleStep2Next} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next: Choose Date
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Step 3: Choose Appointment Date</h2>
              <p className="text-xs text-slate-500">
                Select your preferred date for consulting with <strong>{selectedDoctorObj?.name}</strong>.
              </p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <label className="block text-xs font-bold text-slate-600">Appointment Date</label>
              <input
                type="date"
                min="2026-08-28"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-base font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />

              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-500 block mb-2">Quick Date Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Tomorrow', date: '2026-08-29' },
                    { label: 'Next Monday', date: '2026-08-31' },
                    { label: 'Next Wednesday', date: '2026-09-02' },
                    { label: 'Next Friday', date: '2026-09-04' }
                  ].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(p.date)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selectedDate === p.date
                          ? 'bg-primary text-white border-primary shadow-soft'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={handleStep3Next} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next: Choose Time Slot
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Step 4: Choose Time Slot</h2>
              <p className="text-xs text-slate-500">
                Available consultation slots for <strong>{selectedDate}</strong> with {selectedDoctorObj?.name}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTimeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`p-3.5 rounded-2xl font-bold text-sm border text-center transition-all ${
                    selectedTimeSlot === slot
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-soft scale-105'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" size="md" onClick={handleStep4Next} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next: Patient Information
              </Button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <form onSubmit={handleSubmit(onSubmitPatientForm)} className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Step 5: Patient Details & Confirmation</h2>
              <p className="text-xs text-slate-500">Please provide patient information to generate your booking confirmation.</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs space-y-1.5">
              <p className="font-bold text-primary">Booking Summary Review:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-700 font-medium">
                <p>Doctor: <strong>{selectedDoctorObj?.name}</strong></p>
                <p>Date: <strong>{selectedDate}</strong></p>
                <p>Time: <strong>{selectedTimeSlot}</strong></p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name *</label>
                <input
                  type="text"
                  {...register('fullName')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  {...register('dob')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.dob && <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Appointment Format *</label>
                <select
                  {...register('appointmentType')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none"
                >
                  <option value="In-person Consultation">In-person Clinic Visit</option>
                  <option value="Video Telehealth">24/7 Video Telehealth</option>
                  <option value="Follow-up Visit">Follow-up Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Confirmation Method *</label>
                <select
                  {...register('preferredContact')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none"
                >
                  <option value="Email">Email Confirmation</option>
                  <option value="Phone">Phone Call</option>
                  <option value="SMS">SMS Text Alert</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Visit / Symptoms *</label>
                <textarea
                  rows={3}
                  {...register('reasonForVisit')}
                  placeholder="Please describe symptoms, medical history notes, or reason for visit..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                {errors.reasonForVisit && <p className="text-xs text-red-500 mt-1">{errors.reasonForVisit.message}</p>}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button type="button" variant="outline" size="md" onClick={() => setCurrentStep(4)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} leftIcon={<CheckCircle2 className="w-5 h-5" />}>
                Confirm & Generate Appointment
              </Button>
            </div>
          </form>
        )}
        </div>
      </ScrollReveal>
    </div>
  );
};
