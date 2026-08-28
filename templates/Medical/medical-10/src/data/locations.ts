export interface ClinicLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  parkingInfo: string;
  image: string;
  coordinates: { lat: number; lng: number };
  isPrimary?: boolean;
}

export const CLINIC_LOCATIONS: ClinicLocation[] = [
  {
    id: 'loc-1',
    name: 'CareNova Central Flagship Hub',
    address: '450 Innovation Parkway, Suite 100',
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    phone: '(555) 019-2831',
    emergencyPhone: '(555) 911-CARE',
    email: 'central@carenovahealth.com',
    hours: {
      weekdays: '08:00 AM - 08:00 PM',
      saturday: '09:00 AM - 05:00 PM',
      sunday: '24/7 Emergency & Urgent Care Only'
    },
    services: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', '24/7 ER', 'MRI & CT Radiology', 'Laboratory'],
    parkingInfo: 'Free 4-level underground garage with valet service for patients and emergency mobility access.',
    image: '/images/gallery/atrium.jpg',
    coordinates: { lat: 40.7128, lng: -74.006 },
    isPrimary: true
  },
  {
    id: 'loc-2',
    name: 'CareNova Westside Medical Center',
    address: '1280 Boulevard West, Floor 3',
    city: 'Metropolis',
    state: 'NY',
    zip: '10023',
    phone: '(555) 018-9920',
    emergencyPhone: '(555) 911-CARE',
    email: 'westside@carenovahealth.com',
    hours: {
      weekdays: '08:30 AM - 07:00 PM',
      saturday: '09:00 AM - 03:00 PM',
      sunday: 'Closed (Telehealth On-Call Available)'
    },
    services: ['Dental Care', 'Physiotherapy', 'General Medicine', 'Behavioral Health', 'Pharmacy'],
    parkingInfo: 'Dedicated surface lot with electric vehicle charging stations and accessible parking adjacent to main lobby.',
    image: '/images/gallery/mri-bay.jpg',
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: 'loc-3',
    name: 'CareNova Northside Women & Children Plaza',
    address: '890 Heights Avenue',
    city: 'Metropolis',
    state: 'NY',
    zip: '10031',
    phone: '(555) 017-4412',
    emergencyPhone: '(555) 911-CARE',
    email: 'northside@carenovahealth.com',
    hours: {
      weekdays: '08:00 AM - 06:00 PM',
      saturday: '09:00 AM - 02:00 PM',
      sunday: 'Closed'
    },
    services: ['Pediatrics', 'Gynecology & Obstetrics', 'Dermatology', 'ENT', 'Ultrasound Imaging'],
    parkingInfo: 'Structured garage parking directly connected via climate-controlled skybridge on level 2.',
    image: '/images/gallery/pediatric-suite.jpg',
    coordinates: { lat: 40.7829, lng: -73.9654 }
  }
];
