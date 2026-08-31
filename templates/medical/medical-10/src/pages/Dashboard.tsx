import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  User,
  MessageSquare,
  LogOut,
  Clock,
  MapPin,
  Plus,
  Send
} from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { appointments, cancelAppointment } = useAppointments();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'profile' | 'messages'>('overview');
  const [selectedCancelId, setSelectedCancelId] = useState<string | null>(null);

  const [messages, setMessages] = useState([
    { id: '1', sender: 'Dr. Sarah Jenkins', text: 'Hello Alex, your resting ECG results look great. Keep up the 30-minute daily walking routine!', date: 'Yesterday' },
    { id: '2', sender: 'Patient Support', text: 'Your upcoming appointment at Central Flagship Hub is confirmed for Sept 2.', date: '3 days ago' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const activeAppts = appointments.filter(a => a.status === 'Confirmed');

  const nextAppt = activeAppts[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'You (Alex Morgan)', text: newMessage, date: 'Just now' }
    ]);
    setNewMessage('');
    showToast('Message Sent', 'Sent to Dr. Sarah Jenkins clinic inbox.', 'success');
  };

  const handleConfirmCancel = () => {
    if (selectedCancelId) {
      cancelAppointment(selectedCancelId);
      setSelectedCancelId(null);
      showToast('Appointment Cancelled', 'Booking updated in patient portal.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ScrollReveal direction="down">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary text-white font-extrabold text-xl flex items-center justify-center shadow-soft shrink-0">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Welcome, Alex Morgan</h1>
              <Badge variant="success" size="sm">Active Account</Badge>
            </div>
            <p className="text-slate-500 text-xs mt-1">Patient ID: <strong>CN-PT-980412</strong> | Primary Hub: Central Flagship</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Link to="/appointments" className="w-full md:w-auto">
            <Button variant="primary" size="md" className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
              New Appointment
            </Button>
          </Link>
          <button
            onClick={() => {
              showToast('Signed Out', 'You have been safely signed out.', 'info');
              navigate('/');
            }}
            className="p-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 block">
            Portal Menu
          </span>

          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'appointments', label: 'My Appointments', icon: Calendar, badge: activeAppts.length },
            { id: 'messages', label: 'Doctor Messages', icon: MessageSquare, badge: messages.length },
            { id: 'profile', label: 'Patient Profile', icon: User }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-primary font-extrabold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="lg:col-span-9 space-y-6">
            {nextAppt ? (
              <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="md" className="bg-blue-900/80 text-blue-200 border-blue-700">
                    Upcoming Confirmed Visit
                  </Badge>
                  <span className="font-mono text-xs text-slate-300">ID: {nextAppt.id}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <img src={nextAppt.doctorAvatar} alt={nextAppt.doctorName} className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20" />
                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <h2 className="text-2xl font-bold">{nextAppt.doctorName}</h2>
                    <p className="text-xs text-primary-300 font-medium">{nextAppt.doctorSpecialty} • {nextAppt.departmentName}</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-400" /> {nextAppt.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" /> {nextAppt.timeSlot}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> {nextAppt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <Link to={`/appointments/confirmation?id=${nextAppt.id}`}>
                    <Button variant="outline-light" size="sm">
                      View Full Details
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => setSelectedCancelId(nextAppt.id)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 text-center space-y-3">
                <p className="font-bold text-slate-900 text-lg">No Upcoming Appointments</p>
                <p className="text-xs text-slate-500">You currently have no scheduled medical consultations.</p>
                <Link to="/appointments">
                  <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Schedule Now
                  </Button>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
                <p className="text-xs text-slate-400 font-bold uppercase">Blood Pressure</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">118 / 78 <span className="text-xs text-emerald-600 font-normal">Normal</span></p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
                <p className="text-xs text-slate-400 font-bold uppercase">Heart Rate</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">72 <span className="text-xs text-slate-500 font-normal">bpm</span></p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
                <p className="text-xs text-slate-400 font-bold uppercase">BMI Ratio</p>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">22.8 <span className="text-xs text-emerald-600 font-normal">Healthy</span></p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Your Appointment History</h2>

              <div className="space-y-4">
                {appointments.map(a => (
                  <div key={a.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={a.doctorAvatar} alt={a.doctorName} className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 text-sm">{a.doctorName}</p>
                          <Badge variant={a.status === 'Confirmed' ? 'success' : 'neutral'} size="sm">
                            {a.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-primary font-semibold">{a.doctorSpecialty} • {a.date} at {a.timeSlot}</p>
                        <p className="text-[11px] text-slate-500">Format: {a.appointmentType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Link to={`/appointments/confirmation?id=${a.id}`}>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </Link>
                      {a.status === 'Confirmed' && (
                        <Button variant="danger" size="sm" onClick={() => setSelectedCancelId(a.id)}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Doctor-Patient Messages</h2>

            <div className="space-y-3 max-h-96 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {messages.map(m => (
                <div key={m.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-900">
                    <span>{m.sender}</span>
                    <span className="text-slate-400 font-normal">{m.date}</span>
                  </div>
                  <p className="text-xs text-slate-700">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a secure message to your doctor..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none"
              />
              <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
                Send
              </Button>
            </form>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Patient Personal Profile</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-500 mb-1">Full Name</label>
                <input type="text" defaultValue="Alex Morgan" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-bold text-slate-500 mb-1">Email Address</label>
                <input type="email" defaultValue="alex.morgan@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-bold text-slate-500 mb-1">Phone Number</label>
                <input type="text" defaultValue="(555) 234-5678" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5" />
              </div>
              <div>
                <label className="block font-bold text-slate-500 mb-1">Date of Birth</label>
                <input type="date" defaultValue="1990-05-14" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5" />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button variant="primary" size="sm" onClick={() => showToast('Profile Saved', 'Personal details updated.', 'success')}>
                Save Profile Changes
              </Button>
            </div>
          </div>
        )}
      </div>
      </ScrollReveal>

      {selectedCancelId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Confirm Cancellation</h3>
            <p className="text-xs text-slate-600">Are you sure you want to cancel booking {selectedCancelId}?</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedCancelId(null)}>No, Keep</Button>
              <Button variant="danger" size="sm" onClick={handleConfirmCancel}>Yes, Cancel Visit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
