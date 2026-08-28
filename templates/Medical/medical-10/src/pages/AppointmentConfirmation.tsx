import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Printer,
  RotateCcw,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const AppointmentConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { getAppointmentById, cancelAppointment } = useAppointments();
  const { showToast } = useToast();

  const appointmentId = searchParams.get('id') || 'CN-2026-00482';
  const appt = getAppointmentById(appointmentId);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  if (!appt) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Appointment Record Not Found</h2>
        <p className="text-slate-600">The confirmation record for ID {appointmentId} was not found.</p>
        <Link to="/appointments">
          <Button variant="primary" size="md">
            Schedule New Appointment
          </Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`CareNova Appointment: ${appt.doctorName}`);
    const details = encodeURIComponent(`Appointment with ${appt.doctorName} (${appt.doctorSpecialty}) at ${appt.location}. Booking ID: ${appt.id}`);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${encodeURIComponent(appt.location)}`;
    window.open(googleCalendarUrl, '_blank');
    showToast('Calendar Link Opened', 'Google Calendar event pre-filled in a new window.', 'success');
  };

  const handleCancel = () => {
    cancelAppointment(appt.id);
    setIsCancelModalOpen(false);
    showToast('Appointment Cancelled', `Booking ID ${appt.id} has been cancelled.`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border-4 border-emerald-100 flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <Badge variant={appt.status === 'Confirmed' ? 'success' : 'danger'} size="md" className="mx-auto">
            Status: {appt.status}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Appointment Confirmed!</h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Your visit has been reserved with CareNova Health System. A confirmation has been logged to your patient portal.
          </p>
        </div>

        <div className="inline-block bg-slate-900 text-white rounded-2xl px-6 py-3 font-mono font-bold text-lg tracking-wider shadow-soft">
          ID: {appt.id}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
          <Button variant="primary" size="md" onClick={handleAddToCalendar} leftIcon={<Calendar className="w-4 h-4" />}>
            Add to Calendar
          </Button>
          <Button variant="outline" size="md" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print / Save Confirmation
          </Button>
          <Link to={`/appointments?doctorId=${appt.doctorId}`}>
            <Button variant="ghost" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
              Reschedule
            </Button>
          </Link>
          {appt.status === 'Confirmed' && (
            <Button variant="danger" size="md" onClick={() => setIsCancelModalOpen(true)} leftIcon={<XCircle className="w-4 h-4" />}>
              Cancel Visit
            </Button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Appointment Specifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <img src={appt.doctorAvatar} alt={appt.doctorName} className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <p className="font-bold text-slate-900 text-base">{appt.doctorName}</p>
              <p className="text-xs text-primary font-semibold">{appt.doctorSpecialty}</p>
              <p className="text-xs text-slate-500">{appt.departmentName}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Date: <strong>{appt.date}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-secondary shrink-0" />
              <span>Time Slot: <strong>{appt.timeSlot}</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Location: <strong>{appt.location}</strong></span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p><strong>Patient Name:</strong> {appt.patientName}</p>
            <p><strong>Email:</strong> {appt.patientEmail} | <strong>Phone:</strong> {appt.patientPhone}</p>
            <p><strong>Appointment Format:</strong> {appt.appointmentType}</p>
            <p><strong>Reason for Visit:</strong> {appt.reasonForVisit}</p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
          <span>View Active Appointments in Patient Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Cancel Appointment?</h3>
            <p className="text-sm text-slate-600">
              Are you sure you want to cancel booking <strong>{appt.id}</strong> with {appt.doctorName}?
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" size="sm" onClick={() => setIsCancelModalOpen(false)}>
                Keep Appointment
              </Button>
              <Button variant="danger" size="sm" onClick={handleCancel}>
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
