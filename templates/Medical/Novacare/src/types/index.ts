export type AvailabilityStatus = 'Available' | 'In Surgery' | 'Available Tomorrow' | 'On Leave';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  department: string;
  specialty: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  availability: AvailabilityStatus;
  image: string;
  about: string;
  education: string[];
  specializations: string[];
  languages: string[];
  consultationFee: number;
  roomNumber: string;
  availableSlots: {
    date: string;
    times: string[];
  }[];
  contactEmail: string;
  phone: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  fullDescription: string;
  specialistCount: number;
  keyTreatments: string[];
  headDoctorName: string;
  headDoctorTitle: string;
  emergencyAvailable: boolean;
  featuredStats: { label: string; value: string }[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  preparationTips: string[];
  relatedDepartmentId: string;
  estimatedDuration: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  department: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export interface AppointmentFormData {
  patientName: string;
  email: string;
  phone: string;
  department: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  createdAt: string;
  status: 'Received' | 'Responded';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    actionType: 'book' | 'emergency' | 'department' | 'doctors' | 'contact';
    payload?: string;
  };
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
