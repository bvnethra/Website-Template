import {
  Doctor,
  Department,
  Service,
  Appointment,
  AppointmentFormData,
  ContactFormData,
  ContactSubmission
} from '../types';
import {
  DOCTORS_DATA,
  DEPARTMENTS_DATA,
  SERVICES_DATA,
  INITIAL_SEED_APPOINTMENTS
} from '../data/mockData';

const APPOINTMENTS_STORAGE_KEY = 'novacare_appointments';
const CONTACTS_STORAGE_KEY = 'novacare_contacts';

// Helper to get appointments from localStorage
function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPOINTMENTS));
      return INITIAL_SEED_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load appointments from localStorage', error);
    return INITIAL_SEED_APPOINTMENTS;
  }
}

// Helper to save appointments to localStorage
function saveStoredAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Failed to save appointments to localStorage', error);
  }
}

// Helper to get contacts from localStorage
function getStoredContacts(): ContactSubmission[] {
  try {
    const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to load contacts from localStorage', error);
    return [];
  }
}

// Helper to save contacts to localStorage
function saveStoredContacts(contacts: ContactSubmission[]): void {
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Failed to save contacts to localStorage', error);
  }
}

export const mockApi = {
  // Get all doctors
  getDoctors: async (): Promise<Doctor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...DOCTORS_DATA]);
      }, 350);
    });
  },

  // Get doctor by ID
  getDoctorById: async (id: string): Promise<Doctor | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = DOCTORS_DATA.find((doc) => doc.id === id) || null;
        resolve(found);
      }, 250);
    });
  },

  // Search & filter doctors
  searchDoctors: async (
    searchQuery: string = '',
    specialtyFilter: string = 'All',
    availabilityFilter: string = 'All'
  ): Promise<Doctor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const query = searchQuery.trim().toLowerCase();
        const results = DOCTORS_DATA.filter((doc) => {
          // Search query matching doctor name, specialty, department, or specializations
          const matchesQuery =
            !query ||
            doc.name.toLowerCase().includes(query) ||
            doc.specialty.toLowerCase().includes(query) ||
            doc.department.toLowerCase().includes(query) ||
            doc.specializations.some((s) => s.toLowerCase().includes(query));

          // Specialty filter
          const matchesSpecialty =
            specialtyFilter === 'All' ||
            doc.department.toLowerCase() === specialtyFilter.toLowerCase() ||
            doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());

          // Availability filter
          const matchesAvailability =
            availabilityFilter === 'All' ||
            doc.availability.toLowerCase() === availabilityFilter.toLowerCase() ||
            (availabilityFilter === 'Available Now' && doc.availability === 'Available');

          return matchesQuery && matchesSpecialty && matchesAvailability;
        });

        resolve(results);
      }, 400);
    });
  },

  // Get all departments
  getDepartments: async (): Promise<Department[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...DEPARTMENTS_DATA]);
      }, 300);
    });
  },

  // Get department by slug or ID
  getDepartmentById: async (idOrSlug: string): Promise<Department | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found =
          DEPARTMENTS_DATA.find(
            (d) => d.id === idOrSlug || d.slug.toLowerCase() === idOrSlug.toLowerCase()
          ) || null;
        resolve(found);
      }, 250);
    });
  },

  // Get all services
  getServices: async (): Promise<Service[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...SERVICES_DATA]);
      }, 300);
    });
  },

  // Get service by ID
  getServiceById: async (id: string): Promise<Service | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = SERVICES_DATA.find((s) => s.id === id) || null;
        resolve(found);
      }, 250);
    });
  },

  // Get user's appointments
  getAppointments: async (): Promise<Appointment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const list = getStoredAppointments();
        resolve(list);
      }, 350);
    });
  },

  // Create new appointment
  createAppointment: async (formData: AppointmentFormData): Promise<Appointment> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!formData.patientName || !formData.email || !formData.phone || !formData.doctorId || !formData.date || !formData.time) {
          reject(new Error('Please fill in all required appointment fields.'));
          return;
        }

        const doctor = DOCTORS_DATA.find((d) => d.id === formData.doctorId);
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const newId = `NC-2026-${randomNum}`;

        const newAppointment: Appointment = {
          id: newId,
          patientName: formData.patientName,
          patientEmail: formData.email,
          patientPhone: formData.phone,
          department: formData.department || doctor?.department || 'General Medicine',
          doctorId: formData.doctorId,
          doctorName: doctor?.name || 'Selected Specialist',
          doctorSpecialty: doctor?.specialty || 'Specialist Physician',
          doctorImage: doctor?.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
          date: formData.date,
          time: formData.time,
          reason: formData.reason || 'General Health Consultation',
          status: 'Confirmed',
          createdAt: new Date().toISOString(),
          notes: formData.notes
        };

        const existing = getStoredAppointments();
        const updated = [newAppointment, ...existing];
        saveStoredAppointments(updated);

        resolve(newAppointment);
      }, 800);
    });
  },

  // Cancel an appointment
  cancelAppointment: async (appointmentId: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existing = getStoredAppointments();
        const targetIndex = existing.findIndex((a) => a.id === appointmentId);
        if (targetIndex === -1) {
          reject(new Error('Appointment ID not found.'));
          return;
        }

        existing[targetIndex].status = 'Cancelled';
        saveStoredAppointments([...existing]);
        resolve(true);
      }, 500);
    });
  },

  // Submit contact message
  submitContactForm: async (formData: ContactFormData): Promise<ContactSubmission> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!formData.name || !formData.email || !formData.message) {
          reject(new Error('Name, email, and message are required.'));
          return;
        }

        const submission: ContactSubmission = {
          ...formData,
          id: `MSG-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'Received'
        };

        const existing = getStoredContacts();
        saveStoredContacts([submission, ...existing]);

        resolve(submission);
      }, 650);
    });
  }
};
