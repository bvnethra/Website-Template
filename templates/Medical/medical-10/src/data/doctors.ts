export interface DoctorSchedule {
  day: string;
  slots: string[];
}

export interface DoctorReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: string;
  departmentId: string;
  departmentName: string;
  gender: 'male' | 'female';
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  avatar: string;
  location: string;
  isAvailableToday: boolean;
  education: string[];
  affiliations: string[];
  biography: string;
  expertise: string[];
  servicesOffered: string[];
  schedule: DoctorSchedule[];
  reviews: DoctorReview[];
}

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    slug: 'dr-sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    title: 'MD, FACC - Senior Cardiologist',
    specialty: 'Cardiology',
    departmentId: 'cardiology',
    departmentName: 'Cardiology',
    gender: 'female',
    languages: ['English', 'Spanish'],
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 142,
    fee: 150,
    avatar: '/images/doctors/dr-sarah-jenkins.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: true,
    education: [
      'MD, Harvard Medical School',
      'Cardiology Fellowship, Johns Hopkins Hospital',
      'B.S. in Biochemistry, Stanford University'
    ],
    affiliations: [
      'Fellow of the American College of Cardiology (FACC)',
      'American Heart Association Member'
    ],
    biography: 'Dr. Sarah Jenkins is a renowned cardiologist specializing in preventive cardiology, coronary artery disease management, and advanced echocardiography. With over 16 years of clinical practice, she takes a compassionate, patient-centered approach to cardiovascular health.',
    expertise: ['Preventive Cardiology', 'Coronary Artery Disease', 'Heart Failure Management', 'Echocardiography'],
    servicesOffered: ['Cardiovascular Risk Assessment', 'ECG & Holter Monitoring', 'Cardiac Rehabilitation Planning', 'Hypertension Therapy'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '10:30 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Tuesday', slots: ['08:30 AM', '11:00 AM', '01:30 PM', '03:30 PM'] },
      { day: 'Wednesday', slots: ['09:00 AM', '11:30 AM', '02:30 PM'] },
      { day: 'Thursday', slots: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'] },
      { day: 'Friday', slots: ['09:00 AM', '12:00 PM', '02:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Michael R.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Dr. Jenkins was extremely thorough during my heart checkup. She explained everything clearly and gave me peace of mind.'
      },
      {
        id: 'rev-2',
        author: 'Elena T.',
        rating: 5,
        date: '1 month ago',
        comment: 'Exceptional care! Her recommended treatment plan dramatically improved my blood pressure control.'
      }
    ]
  },
  {
    id: 'doc-2',
    slug: 'dr-marcus-vance',
    name: 'Dr. Marcus Vance',
    title: 'MD, PhD - Neurologist & Neurophysiologist',
    specialty: 'Neurology',
    departmentId: 'neurology',
    departmentName: 'Neurology',
    gender: 'male',
    languages: ['English', 'German'],
    experienceYears: 18,
    rating: 4.8,
    reviewCount: 118,
    fee: 180,
    avatar: '/images/doctors/dr-marcus-vance.jpg',
    location: 'Westside Health Center',
    isAvailableToday: false,
    education: [
      'MD/PhD in Neurobiology, Columbia University',
      'Residency in Neurology, Mayo Clinic',
      'Neurophysiology Fellowship, UCSF'
    ],
    affiliations: [
      'American Academy of Neurology (AAN)',
      'International Parkinson and Movement Disorder Society'
    ],
    biography: 'Dr. Marcus Vance brings 18 years of groundbreaking experience in neurological diagnostics, epilepsy management, migraine therapies, and movement disorders. He combines advanced diagnostic tools with personalized patient care.',
    expertise: ['Migraine & Headache Disorders', 'Epilepsy & Seizures', 'Parkinson’s Disease', 'Nerve Conduction Studies'],
    servicesOffered: ['Neurological Evaluation', 'EEG Diagnostic Testing', 'Botox for Chronic Migraines', 'Memory & Cognitive Screening'],
    schedule: [
      { day: 'Tuesday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Thursday', slots: ['09:30 AM', '01:00 PM', '03:30 PM'] },
      { day: 'Friday', slots: ['08:30 AM', '10:30 AM', '01:30 PM'] }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'David K.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'After years of suffering from severe migraines, Dr. Vance’s treatment plan finally gave me relief.'
      }
    ]
  },
  {
    id: 'doc-3',
    slug: 'dr-amara-chen',
    name: 'Dr. Amara Chen',
    title: 'MD, FAAP - Chief of Pediatrics',
    specialty: 'Pediatrics',
    departmentId: 'pediatrics',
    departmentName: 'Pediatrics',
    gender: 'female',
    languages: ['English', 'Mandarin'],
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 185,
    fee: 130,
    avatar: '/images/doctors/dr-amara-chen.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: true,
    education: [
      'MD, Yale School of Medicine',
      'Pediatric Residency, Boston Children’s Hospital'
    ],
    affiliations: [
      'Fellow of the American Academy of Pediatrics (FAAP)',
      'Pediatric Health Initiative Director'
    ],
    biography: 'Dr. Amara Chen is dedicated to providing warm, gentle, and comprehensive healthcare for newborns, children, and adolescents. She emphasizes preventive wellness, growth tracking, and adolescent medicine.',
    expertise: ['Well-Child Exams', 'Developmental Screening', 'Pediatric Asthma', 'Immunizations'],
    servicesOffered: ['Newborn Care & Feeding Support', 'Annual School & Sports Physicals', 'Vaccination Schedule', 'Acute Illness Management'],
    schedule: [
      { day: 'Monday', slots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'] },
      { day: 'Wednesday', slots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'] },
      { day: 'Friday', slots: ['09:00 AM', '11:00 AM', '01:30 PM', '04:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Sarah M.',
        rating: 5,
        date: '1 week ago',
        comment: 'Dr. Chen is amazing with kids! My 4-year-old actually looks forward to doctor visits now.'
      }
    ]
  },
  {
    id: 'doc-4',
    slug: 'dr-robert-sterling',
    name: 'Dr. Robert Sterling',
    title: 'MD, FAAD - Consultant Dermatologist',
    specialty: 'Dermatology',
    departmentId: 'dermatology',
    departmentName: 'Dermatology',
    gender: 'male',
    languages: ['English', 'French'],
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 96,
    fee: 160,
    avatar: '/images/doctors/dr-robert-sterling.jpg',
    location: 'Northside Medical Plaza',
    isAvailableToday: true,
    education: [
      'MD, Perelman School of Medicine (Penn)',
      'Dermatology Residency, NYU Langone Health'
    ],
    affiliations: [
      'American Academy of Dermatology (AAD)',
      'Society for Investigative Dermatology'
    ],
    biography: 'Dr. Robert Sterling offers expert medical and cosmetic dermatology care. From acne and eczema therapies to skin cancer screenings and advanced laser treatments, he prioritizes skin health and aesthetic confidence.',
    expertise: ['Skin Cancer Screening (Dermoscopy)', 'Acne & Rosacea', 'Psoriasis & Eczema', 'Cosmetic Dermatology'],
    servicesOffered: ['Full Body Skin Exam', 'Mole Removal & Biopsy', 'Laser Skin Resurfacing', 'Customized Acne Management'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Tuesday', slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
      { day: 'Thursday', slots: ['09:00 AM', '11:30 AM', '02:30 PM'] }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Jessica P.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Very professional skin screening. Dr. Sterling identified a suspicious lesion early and took care of it effortlessly.'
      }
    ]
  },
  {
    id: 'doc-5',
    slug: 'dr-elena-rodriguez',
    name: 'Dr. Elena Rodriguez',
    title: 'MD, FAAOS - Orthopedic Surgeon',
    specialty: 'Orthopedics',
    departmentId: 'orthopedics',
    departmentName: 'Orthopedics',
    gender: 'female',
    languages: ['English', 'Spanish'],
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 164,
    fee: 175,
    avatar: '/images/doctors/dr-elena-rodriguez.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: false,
    education: [
      'MD, UCLA David Geffen School of Medicine',
      'Orthopedic Surgery Residency, HSS New York'
    ],
    affiliations: [
      'American Academy of Orthopaedic Surgeons (AAOS)',
      'Arthroscopy Association of North America'
    ],
    biography: 'Dr. Elena Rodriguez specializes in joint reconstruction, sports injury rehabilitation, knee and shoulder arthroscopy, and fracture management. She has helped hundreds of athletes and active individuals return to optimal mobility.',
    expertise: ['Joint Replacement', 'Sports Injuries', 'Knee & Shoulder Arthroscopy', 'ACL Reconstruction'],
    servicesOffered: ['Joint Pain Evaluation', 'Minimally Invasive Joint Surgery', 'Cortisone & PRP Injections', 'Post-Op Rehabilitation'],
    schedule: [
      { day: 'Monday', slots: ['08:30 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Wednesday', slots: ['09:00 AM', '01:30 PM', '04:00 PM'] },
      { day: 'Friday', slots: ['08:00 AM', '10:30 AM', '01:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Thomas B.',
        rating: 5,
        date: '1 month ago',
        comment: 'Dr. Rodriguez reconstructed my knee ACL. 6 months later, I am back to running pain-free!'
      }
    ]
  },
  {
    id: 'doc-6',
    slug: 'dr-james-wilson',
    name: 'Dr. James Wilson',
    title: 'DDS - Restorative & Cosmetic Dentist',
    specialty: 'Dental Care',
    departmentId: 'dental-care',
    departmentName: 'Dental Care',
    gender: 'male',
    languages: ['English'],
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 210,
    fee: 120,
    avatar: '/images/doctors/dr-james-wilson.jpg',
    location: 'Westside Health Center',
    isAvailableToday: true,
    education: [
      'DDS, University of Michigan School of Dentistry',
      'Advanced Esthetic Dentistry Certification'
    ],
    affiliations: [
      'American Dental Association (ADA)',
      'Academy of General Dentistry'
    ],
    biography: 'Dr. James Wilson is passionate about delivering gentle, precision dental care. He utilizes state-of-the-art digital dentistry for crowns, veneers, dental implants, and painless preventive maintenance.',
    expertise: ['Cosmetic Veneers', 'Dental Implants', 'Root Canal Therapy', 'Teeth Whitening'],
    servicesOffered: ['Comprehensive Dental Exam & Cleaning', '3D Intraoral Scanning', 'Composite Restorations', 'Invisalign Consultation'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:30 PM'] },
      { day: 'Tuesday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Wednesday', slots: ['09:00 AM', '11:30 AM', '02:30 PM'] },
      { day: 'Thursday', slots: ['10:00 AM', '01:00 PM', '03:30 PM'] }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Amanda G.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Painless dentist visit! The staff is so welcoming and Dr. Wilson made my smile look natural and bright.'
      }
    ]
  },
  {
    id: 'doc-7',
    slug: 'dr-priya-patel',
    name: 'Dr. Priya Patel',
    title: 'MD, ABO - Ophthalmic Surgeon',
    specialty: 'Ophthalmology',
    departmentId: 'ophthalmology',
    departmentName: 'Ophthalmology',
    gender: 'female',
    languages: ['English', 'Hindi', 'Gujarati'],
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 88,
    fee: 145,
    avatar: '/images/doctors/dr-priya-patel.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: true,
    education: [
      'MD, Washington University School of Medicine',
      'Ophthalmology Residency, Wills Eye Hospital'
    ],
    affiliations: [
      'American Board of Ophthalmology (ABO)',
      'American Society of Cataract and Refractive Surgery'
    ],
    biography: 'Dr. Priya Patel is an expert ophthalmic surgeon specializing in laser vision correction, cataract microsurgery, glaucoma treatment, and comprehensive eye care.',
    expertise: ['Cataract Surgery', 'LASIK & Vision Correction', 'Glaucoma Management', 'Diabetic Retinopathy'],
    servicesOffered: ['Complete Vision & Eye Exam', 'Laser Cataract Removal', 'Intraocular Pressure Monitoring', 'Dry Eye Therapy'],
    schedule: [
      { day: 'Tuesday', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Wednesday', slots: ['10:00 AM', '01:00 PM', '03:30 PM'] },
      { day: 'Friday', slots: ['08:30 AM', '11:30 AM', '02:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-8',
        author: 'Kenneth H.',
        rating: 5,
        date: '1 month ago',
        comment: 'Had my cataract surgery performed by Dr. Patel. My vision is now 20/20! Forever grateful.'
      }
    ]
  },
  {
    id: 'doc-8',
    slug: 'dr-sophia-martinez',
    name: 'Dr. Sophia Martinez',
    title: 'MD, FACOG - Obstetrician & Gynecologist',
    specialty: 'Gynecology',
    departmentId: 'gynecology',
    departmentName: 'Gynecology',
    gender: 'female',
    languages: ['English', 'Spanish'],
    experienceYears: 17,
    rating: 4.9,
    reviewCount: 198,
    fee: 155,
    avatar: '/images/doctors/dr-sophia-martinez.jpg',
    location: 'Northside Medical Plaza',
    isAvailableToday: true,
    education: [
      'MD, Northwestern University Feinberg School of Medicine',
      'OB/GYN Residency, Prentice Women’s Hospital'
    ],
    affiliations: [
      'Fellow of the American College of Obstetricians and Gynecologists (FACOG)',
      'North American Menopause Society'
    ],
    biography: 'Dr. Sophia Martinez provides compassionate, holistic healthcare across all stages of women’s lives, from adolescent gynecology and high-risk pregnancy care to menopause management.',
    expertise: ['Prenatal Care & High-Risk Obstetrics', 'Minimally Invasive Gynecologic Surgery', 'Menopause & Hormonal Health', 'Fertility Evaluation'],
    servicesOffered: ['Annual Well-Woman Exam', '3D Prenatal Ultrasound', 'Laparoscopic Surgery', 'Family Planning & Contraception'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Wednesday', slots: ['08:30 AM', '10:30 AM', '01:30 PM'] },
      { day: 'Thursday', slots: ['09:00 AM', '11:30 AM', '03:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-9',
        author: 'Maria S.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Dr. Martinez guided me through my pregnancy with unbelievable care and reassurance. She is truly the best!'
      }
    ]
  },
  {
    id: 'doc-9',
    slug: 'dr-david-kim',
    name: 'Dr. David Kim',
    title: 'MD - Primary Care & Internal Medicine Specialist',
    specialty: 'General Medicine',
    departmentId: 'general-medicine',
    departmentName: 'General Medicine',
    gender: 'male',
    languages: ['English', 'Korean'],
    experienceYears: 10,
    rating: 4.8,
    reviewCount: 130,
    fee: 110,
    avatar: '/images/doctors/dr-david-kim.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: true,
    education: [
      'MD, Weill Cornell Medical College',
      'Internal Medicine Residency, NewYork-Presbyterian Hospital'
    ],
    affiliations: [
      'American College of Physicians (ACP)',
      'Society of General Internal Medicine'
    ],
    biography: 'Dr. David Kim focuses on lifelong preventive medicine, chronic disease management (diabetes, hypertension, cholesterol), and routine healthcare screenings for adults of all ages.',
    expertise: ['Preventive Medicine', 'Diabetes Management', 'Hypertension & Cholesterol', 'Adult Health Screenings'],
    servicesOffered: ['Annual Comprehensive Physical', 'Chronic Care Coordination', 'Blood Work Interpretation', 'Urgent Sick Visits'],
    schedule: [
      { day: 'Monday', slots: ['08:00 AM', '09:30 AM', '11:00 AM', '01:30 PM', '03:30 PM'] },
      { day: 'Tuesday', slots: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM'] },
      { day: 'Wednesday', slots: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Friday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: 'Arthur C.',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Dr. Kim listens carefully and never rushes. He helped me get my blood sugar levels under control.'
      }
    ]
  },
  {
    id: 'doc-10',
    slug: 'dr-olivia-taylor',
    name: 'Dr. Olivia Taylor',
    title: 'DPT, OCS - Lead Physical Therapist',
    specialty: 'Physiotherapy',
    departmentId: 'physiotherapy',
    departmentName: 'Physiotherapy',
    gender: 'female',
    languages: ['English'],
    experienceYears: 9,
    rating: 4.9,
    reviewCount: 74,
    fee: 100,
    avatar: '/images/doctors/dr-olivia-taylor.jpg',
    location: 'Westside Health Center',
    isAvailableToday: true,
    education: [
      'Doctor of Physical Therapy (DPT), University of Southern California',
      'Board Certified Orthopedic Clinical Specialist (OCS)'
    ],
    affiliations: [
      'American Physical Therapy Association (APTA)'
    ],
    biography: 'Dr. Olivia Taylor specializes in sports physical therapy, post-surgical recovery, spinal rehabilitation, and ergonomic posture alignment.',
    expertise: ['Spinal Rehabilitation', 'Post-Op Physical Therapy', 'Dry Needling & Manual Therapy', 'Ergonomic Evaluation'],
    servicesOffered: ['Comprehensive Biomechanical Assessment', 'Personalized Rehab Exercise Plans', 'Manual Soft Tissue Therapy', 'Gait Analysis'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'] },
      { day: 'Tuesday', slots: ['08:30 AM', '10:30 AM', '01:30 PM'] },
      { day: 'Thursday', slots: ['09:00 AM', '11:30 AM', '02:30 PM'] }
    ],
    reviews: [
      {
        id: 'rev-11',
        author: 'Daniel V.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Olivia helped me recover from lower back sciatica within just 6 sessions. Her exercises are clear and super effective.'
      }
    ]
  },
  {
    id: 'doc-11',
    slug: 'dr-nathaniel-cross',
    name: 'Dr. Nathaniel Cross',
    title: 'MD, DFAPA - Adult & Adolescent Psychiatrist',
    specialty: 'Psychiatry',
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry',
    gender: 'male',
    languages: ['English'],
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 112,
    fee: 200,
    avatar: '/images/doctors/dr-nathaniel-cross.jpg',
    location: 'Central Medical Hub',
    isAvailableToday: false,
    education: [
      'MD, Duke University School of Medicine',
      'Psychiatry Residency, McLean Hospital / Harvard Medical School'
    ],
    affiliations: [
      'Distinguished Fellow of the American Psychiatric Association (DFAPA)'
    ],
    biography: 'Dr. Nathaniel Cross provides empathetic, evidence-based psychiatric evaluations, psychopharmacology, and cognitive therapies for anxiety, depression, mood disorders, and stress management.',
    expertise: ['Mood Disorders & Depression', 'Anxiety & Panic Disorders', 'ADHD & Executive Dysfunction', 'Cognitive Behavioral Therapy (CBT) Integration'],
    servicesOffered: ['Initial Psychiatric Consultation', 'Medication Management', 'Stress & Burnout Therapy', 'Tele-Psychiatry Sessions'],
    schedule: [
      { day: 'Tuesday', slots: ['10:00 AM', '01:00 PM', '03:30 PM'] },
      { day: 'Wednesday', slots: ['09:00 AM', '11:30 AM', '02:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM', '01:00 PM', '04:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-12',
        author: 'Rachel W.',
        rating: 5,
        date: '1 month ago',
        comment: 'Dr. Cross is deeply compassionate and insightful. He completely changed my perspective on managing stress.'
      }
    ]
  },
  {
    id: 'doc-12',
    slug: 'dr-claire-bennett',
    name: 'Dr. Claire Bennett',
    title: 'MD, FACS - ENT & Head and Neck Specialist',
    specialty: 'ENT',
    departmentId: 'ent',
    departmentName: 'Ear, Nose & Throat (ENT)',
    gender: 'female',
    languages: ['English', 'German'],
    experienceYears: 13,
    rating: 4.8,
    reviewCount: 94,
    fee: 140,
    avatar: '/images/doctors/dr-claire-bennett.jpg',
    location: 'Northside Medical Plaza',
    isAvailableToday: true,
    education: [
      'MD, University of Chicago Pritzker School of Medicine',
      'Otolaryngology Residency, Vanderbilt University Medical Center'
    ],
    affiliations: [
      'American Academy of Otolaryngology - Head and Neck Surgery (AAO-HNS)',
      'Fellow of the American College of Surgeons (FACS)'
    ],
    biography: 'Dr. Claire Bennett treats complex sinus conditions, hearing disorders, tinnitus, voice & swallowing problems, and pediatric ENT ailments using state-of-the-art endoscopic techniques.',
    expertise: ['Endoscopic Sinus Surgery', 'Hearing & Balance Assessment', 'Voice & Throat Disorders', 'Snoring & Sleep Apnea Evaluation'],
    servicesOffered: ['Diagnostic Nasal Endoscopy', 'Audiology Screening', 'Allergy Testing & Immunotherapy', 'Tonsillectomy & Adenoidectomy Consultation'],
    schedule: [
      { day: 'Monday', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
      { day: 'Wednesday', slots: ['09:30 AM', '01:00 PM', '03:30 PM'] },
      { day: 'Thursday', slots: ['08:30 AM', '11:00 AM', '02:00 PM'] }
    ],
    reviews: [
      {
        id: 'rev-13',
        author: 'George K.',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Dr. Bennett resolved my chronic sinus pressure. The endoscopic treatment was quick and effective.'
      }
    ]
  }
];
