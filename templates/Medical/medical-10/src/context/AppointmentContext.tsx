import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BookedAppointment {
  id: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientDob: string;
  appointmentType: 'In-person Consultation' | 'Video Telehealth' | 'Follow-up Visit';
  reasonForVisit: string;
  preferredContact: 'Email' | 'Phone' | 'SMS';
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  location: string;
}

interface AppointmentContextType {
  appointments: BookedAppointment[];
  addAppointment: (appointment: Omit<BookedAppointment, 'id' | 'createdAt' | 'status'>) => BookedAppointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTimeSlot: string) => void;
  getAppointmentById: (id: string) => BookedAppointment | undefined;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const INITIAL_DEMO_APPOINTMENTS: BookedAppointment[] = [
  {
    id: 'CN-2026-00482',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Cardiology',
    doctorAvatar: '/images/doctors/dr-sarah-jenkins.jpg',
    date: '2026-09-02',
    timeSlot: '10:30 AM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '(555) 234-5678',
    patientDob: '1990-05-14',
    appointmentType: 'In-person Consultation',
    reasonForVisit: 'Annual cardiovascular risk screening and resting ECG evaluation.',
    preferredContact: 'Email',
    createdAt: '2026-08-25T10:00:00Z',
    status: 'Confirmed',
    location: 'CareNova Central Flagship Hub'
  },
  {
    id: 'CN-2026-00319',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    doctorId: 'doc-9',
    doctorName: 'Dr. David Kim',
    doctorSpecialty: 'General Medicine',
    doctorAvatar: '/images/doctors/dr-david-kim.jpg',
    date: '2026-08-10',
    timeSlot: '09:00 AM',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '(555) 234-5678',
    patientDob: '1990-05-14',
    appointmentType: 'In-person Consultation',
    reasonForVisit: 'Routine wellness physical & cholesterol screening.',
    preferredContact: 'Email',
    createdAt: '2026-08-01T14:30:00Z',
    status: 'Completed',
    location: 'CareNova Central Flagship Hub'
  }
];

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<BookedAppointment[]>(() => {
    const saved = localStorage.getItem('carenova_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse appointments', e);
      }
    }
    return INITIAL_DEMO_APPOINTMENTS;
  });

  useEffect(() => {
    localStorage.setItem('carenova_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (data: Omit<BookedAppointment, 'id' | 'createdAt' | 'status'>): BookedAppointment => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newAppointment: BookedAppointment = {
      ...data,
      id: `CN-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Cancelled' } : item))
    );
  };

  const rescheduleAppointment = (id: string, newDate: string, newTimeSlot: string) => {
    setAppointments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, date: newDate, timeSlot: newTimeSlot, status: 'Confirmed' } : item
      )
    );
  };

  const getAppointmentById = (id: string) => {
    return appointments.find(item => item.id === id);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        rescheduleAppointment,
        getAppointmentById
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
