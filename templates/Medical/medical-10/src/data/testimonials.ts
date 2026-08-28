export interface Testimonial {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Elena Rostova',
    role: 'Cardiology Patient',
    department: 'Cardiology',
    avatar: '/images/testimonials/elena-rostova.jpg',
    rating: 5,
    comment: 'The level of care and attention at CareNova is unmatched. Dr. Jenkins took the time to listen to my heart symptoms, ran precise diagnostics, and put together a life-changing preventive treatment plan.',
    date: 'August 2026'
  },
  {
    id: 't-2',
    name: 'Marcus Thorne',
    role: 'Orthopedic Patient',
    department: 'Orthopedics',
    avatar: '/images/testimonials/marcus-thorne.jpg',
    rating: 5,
    comment: 'After my knee injury during soccer, I was terrified I wouldn’t run again. Dr. Rodriguez and the physical therapy team got me back on the field stronger than before in just 4 months.',
    date: 'July 2026'
  },
  {
    id: 't-3',
    name: 'Sophia & Baby Liam',
    role: 'Pediatric & OB/GYN Patient',
    department: 'Pediatrics',
    avatar: '/images/testimonials/sophia-liam.jpg',
    rating: 5,
    comment: 'From prenatal ultrasounds with Dr. Martinez to newborn wellness checks with Dr. Chen, CareNova has supported our family every step of the journey with warmth and expertise.',
    date: 'August 2026'
  },
  {
    id: 't-4',
    name: 'David Greenfield',
    role: 'Executive Wellness Patient',
    department: 'General Medicine',
    avatar: '/images/testimonials/david-greenfield.jpg',
    rating: 5,
    comment: 'The online booking, instant lab results on the patient dashboard, and zero wait times in the clinic make CareNova the gold standard of modern healthcare.',
    date: 'June 2026'
  }
];
