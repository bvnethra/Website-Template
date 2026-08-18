import React, { useState } from 'react';
import { Appointment } from '../types';
import { mockApi } from '../services/mockApi';
import {
  X,
  Calendar,
  Clock,
  User,
  Search,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Building,
  RotateCcw,
  Plus,
  Loader2,
  Trash2
} from 'lucide-react';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onAppointmentCancelled: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onAppointmentCancelled,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Cancelled'>('All');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmCancelModalId, setConfirmCancelModalId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter((app) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      app.id.toLowerCase().includes(q) ||
      app.doctorName.toLowerCase().includes(q) ||
      app.department.toLowerCase().includes(q) ||
      app.patientName.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const handleCancelAppointment = async (id: string) => {
    setCancellingId(id);
    try {
      await mockApi.cancelAppointment(id);
      onAppointmentCancelled(id);
      setConfirmCancelModalId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div
      id="my-appointments-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="my-appointments-dialog"
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#15213D] p-6 text-white relative flex-shrink-0">
          <button
            id="close-my-appointments-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close My Appointments"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#28B8D4] uppercase tracking-wider mb-1.5">
            <Calendar className="w-4 h-4" />
            <span>Patient Portal</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                My Health Appointments
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Track your active consultations, specialist visits, and history.
              </p>
            </div>

            <button
              id="dashboard-new-booking-btn"
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="px-4 py-2 bg-[#3157D5] hover:bg-[#2443AE] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:p-5 bg-[#F6F8FC] border-b border-[#E4E9F2] flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="appointments-search-input"
              type="text"
              placeholder="Search by ID (e.g. NC-2026), Doctor, or Department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E4E9F2] text-xs sm:text-sm text-[#15213D] focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 self-start sm:self-auto">
            {(['All', 'Confirmed', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#3157D5] text-white'
                    : 'bg-white text-[#15213D] border border-[#E4E9F2] hover:bg-[#EEF3FA]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3.5">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 px-4 bg-[#F6F8FC] rounded-2xl border border-[#E4E9F2]">
              <Calendar className="w-10 h-10 text-[#667085] mx-auto mb-3 opacity-60" />
              <h3 className="text-sm font-bold text-[#15213D]">No appointments found</h3>
              <p className="text-xs text-[#667085] mt-1 mb-4">
                {searchQuery || statusFilter !== 'All'
                  ? 'Try clearing your search query or filters.'
                  : 'You have no appointments booked yet.'}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-4 py-2 bg-[#3157D5] text-white text-xs font-semibold rounded-xl hover:bg-[#2443AE] transition-colors"
              >
                Book Your First Appointment
              </button>
            </div>
          ) : (
            filteredAppointments.map((app) => (
              <div
                key={app.id}
                id={`appointment-card-${app.id}`}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E9F2] hover:border-[#3157D5]/30 shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={app.doctorImage}
                    alt={app.doctorName}
                    className="w-13 h-13 rounded-xl object-cover border border-[#E4E9F2] flex-shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#3157D5] bg-[#3157D5]/10 px-2 py-0.5 rounded-md">
                        {app.id}
                      </span>
                      {getStatusBadge(app.status)}
                    </div>

                    <h4 className="text-sm font-bold text-[#15213D]">{app.doctorName}</h4>
                    <p className="text-xs text-[#667085]">{app.doctorSpecialty} • {app.department}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#15213D] font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#3157D5]" />
                        {app.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#28B8D4]" />
                        {app.time}
                      </span>
                      <span className="flex items-center gap-1 text-[#667085]">
                        <User className="w-3.5 h-3.5" />
                        Patient: {app.patientName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action: Cancel if Confirmed */}
                {app.status === 'Confirmed' && (
                  <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E4E9F2]">
                    <button
                      id={`cancel-appointment-btn-${app.id}`}
                      onClick={() => setConfirmCancelModalId(app.id)}
                      disabled={cancellingId === app.id}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                    >
                      {cancellingId === app.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Cancelling...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Cancel Appointment</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F6F8FC] border-t border-[#E4E9F2] flex items-center justify-between text-xs text-[#667085] flex-shrink-0">
          <span>Local storage synced • {appointments.length} total records</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-semibold text-[#15213D] bg-white border border-[#E4E9F2] hover:bg-slate-100 transition-colors"
          >
            Done
          </button>
        </div>

        {/* Nested Cancel Confirmation Modal */}
        {confirmCancelModalId && (
          <div
            id="confirm-cancel-dialog-backdrop"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in"
          >
            <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-[#E4E9F2] text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#15213D]">Cancel this appointment?</h4>
                <p className="text-xs text-[#667085] mt-1">
                  Appointment ID <strong className="font-mono">{confirmCancelModalId}</strong> will be marked as cancelled.
                </p>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setConfirmCancelModalId(null)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-[#15213D] bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Keep It
                </button>
                <button
                  onClick={() => handleCancelAppointment(confirmCancelModalId)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
