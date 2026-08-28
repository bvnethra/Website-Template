import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { DEPARTMENTS } from '../data/departments';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';

interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  departmentId: string;
  departmentName: string;
  status: 'Available' | 'Booked' | 'Unavailable' | 'On Leave';
}

export const Timetable: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const allSlots: TimetableSlot[] = DOCTORS.flatMap(doc => {
    return daysOfWeek.flatMap(day => {
      const daySched = doc.schedule.find(s => s.day === day);
      if (!daySched || day === 'Sunday') {
        const offSlot: TimetableSlot = {
          id: `${doc.id}-${day}-off`,
          day,
          time: '09:00 AM - 05:00 PM',
          doctorId: doc.id,
          doctorName: doc.name,
          doctorSpecialty: doc.specialty,
          doctorAvatar: doc.avatar,
          departmentId: doc.departmentId,
          departmentName: doc.departmentName,
          status: day === 'Sunday' ? 'On Leave' : 'Unavailable'
        };
        return [offSlot];
      }
      return daySched.slots.map((slotTime, idx) => {
        const activeSlot: TimetableSlot = {
          id: `${doc.id}-${day}-${idx}`,
          day,
          time: slotTime,
          doctorId: doc.id,
          doctorName: doc.name,
          doctorSpecialty: doc.specialty,
          doctorAvatar: doc.avatar,
          departmentId: doc.departmentId,
          departmentName: doc.departmentName,
          status: idx % 3 === 0 ? 'Booked' : 'Available'
        };
        return activeSlot;
      });
    });
  });

  const filteredSlots = allSlots.filter(s => {
    const matchesDay = s.day === selectedDay;
    const matchesDept = selectedDept === 'all' || s.departmentId === selectedDept;
    const matchesDoc = selectedDoc === 'all' || s.doctorId === selectedDoc;
    const matchesSearch =
      s.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDay && matchesDept && matchesDoc && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
            Interactive Roster Schedule
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Weekly Doctor Timetable</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Real-time operating schedule across all 12 clinical departments. View doctor duty hours and reserve open consultation slots.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
        {/* Days Pills Bar */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Day of Week</label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition-all ${
                  selectedDay === day
                    ? 'bg-primary text-white border-primary shadow-glow'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Inputs */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Filter by Department</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Filter by Doctor</label>
            <select
              value={selectedDoc}
              onChange={e => setSelectedDoc(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="all">All Doctors</option>
              {DOCTORS.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Search Roster</label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Doctor name or department..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">
            Schedule Matrix for <span className="text-primary">{selectedDay}</span>
          </h2>
          <span className="text-xs text-slate-500 font-semibold">
            Showing {filteredSlots.length} schedule entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Physician</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Time Slot</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSlots.map(slot => (
                <tr key={slot.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={slot.doctorAvatar} alt={slot.doctorName} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{slot.doctorName}</p>
                        <p className="text-xs text-slate-500">{slot.doctorSpecialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{slot.departmentName}</td>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">{slot.time}</td>
                  <td className="px-6 py-4">
                    {slot.status === 'Available' && (
                      <Badge variant="success" size="sm" dot>
                        Available
                      </Badge>
                    )}
                    {slot.status === 'Booked' && (
                      <Badge variant="warning" size="sm">
                        Booked
                      </Badge>
                    )}
                    {slot.status === 'Unavailable' && (
                      <Badge variant="neutral" size="sm">
                        Unavailable
                      </Badge>
                    )}
                    {slot.status === 'On Leave' && (
                      <Badge variant="danger" size="sm">
                        On Leave
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {slot.status === 'Available' ? (
                      <Link to={`/appointments?doctorId=${slot.doctorId}&timeSlot=${encodeURIComponent(slot.time)}`}>
                        <Button variant="primary" size="sm">
                          Book Slot
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" size="sm" disabled>
                        Unavailable
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE STACKED CARDS VIEW */}
      <div className="md:hidden space-y-4">
        <h2 className="font-bold text-slate-900 text-lg px-1">
          Schedule for <span className="text-primary">{selectedDay}</span>
        </h2>

        {filteredSlots.map(slot => (
          <div key={slot.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={slot.doctorAvatar} alt={slot.doctorName} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{slot.doctorName}</p>
                  <p className="text-xs text-slate-500">{slot.doctorSpecialty}</p>
                </div>
              </div>
              {slot.status === 'Available' && <Badge variant="success" size="sm" dot>Available</Badge>}
              {slot.status === 'Booked' && <Badge variant="warning" size="sm">Booked</Badge>}
              {slot.status === 'On Leave' && <Badge variant="danger" size="sm">On Leave</Badge>}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Time: <strong className="text-slate-900 font-mono">{slot.time}</strong></span>
              {slot.status === 'Available' && (
                <Link to={`/appointments?doctorId=${slot.doctorId}&timeSlot=${encodeURIComponent(slot.time)}`}>
                  <Button variant="primary" size="sm">
                    Book Visit
                  </Button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
