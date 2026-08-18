import { Doctor, Department, Service, Appointment } from '../types';

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'dept-cardiology',
    name: 'Cardiology',
    slug: 'cardiology',
    iconName: 'HeartPulse',
    description: 'Advanced cardiovascular care, non-invasive imaging, and interventional therapeutics.',
    fullDescription: 'Our Department of Cardiology offers comprehensive cardiovascular diagnostics, coronary catheterization, electrophysiology, heart failure clinics, and preventative vascular health screenings powered by state-of-the-art diagnostic technologies.',
    specialistCount: 12,
    keyTreatments: [
      'Coronary Angiography & Stenting',
      'Echocardiography & 3D Doppler',
      'Electrophysiology & Pacemaker Implantation',
      'Cardiac Rehabilitation & Lipid Clinic'
    ],
    headDoctorName: 'Dr. Sarah Mitchell',
    headDoctorTitle: 'Chief of Interventional Cardiology',
    emergencyAvailable: true,
    featuredStats: [
      { label: 'Success Rate', value: '99.4%' },
      { label: 'Annual Procedures', value: '4,200+' },
      { label: 'Avg Triage Time', value: '< 8 min' }
    ]
  },
  {
    id: 'dept-neurology',
    name: 'Neurology',
    slug: 'neurology',
    iconName: 'Brain',
    description: 'Specialized diagnosis and treatment of complex brain, spine, and peripheral nerve disorders.',
    fullDescription: 'The NovaCare Neurology Institute delivers cutting-edge neurological interventions, comprehensive stroke rehabilitation, advanced neuro-imaging (3T MRI & High-Density EEG), and dedicated programs for epilepsy and movement disorders.',
    specialistCount: 9,
    keyTreatments: [
      'Comprehensive Stroke Rapid-Response',
      'High-Density EEG & Video Epilepsy Monitoring',
      'Neuro-muscular Disorder Diagnostics',
      'Deep Brain Stimulation Therapy & Follow-up'
    ],
    headDoctorName: 'Dr. Michael Rodriguez',
    headDoctorTitle: 'Director of Clinical Neuroscience',
    emergencyAvailable: true,
    featuredStats: [
      { label: 'Stroke Center', value: 'Level 1' },
      { label: 'Neurologists', value: '9 Specialists' },
      { label: 'Neuro-ICU Beds', value: '24 Dedicated' }
    ]
  },
  {
    id: 'dept-orthopedics',
    name: 'Orthopedics',
    slug: 'orthopedics',
    iconName: 'Bone',
    description: 'Minimally invasive joint reconstruction, sports medicine, and spinal stabilization.',
    fullDescription: 'Our Orthopedics & Musculoskeletal Center combines robotic-assisted joint replacement surgery with targeted sports physical therapy and spine management to restore optimal mobility with minimal recovery times.',
    specialistCount: 14,
    keyTreatments: [
      'Robotic Mako-Assisted Total Knee & Hip Arthroplasty',
      'Arthroscopic Rotator Cuff & ACL Reconstruction',
      'Minimally Invasive Spine Microdiscectomy',
      'Sports Injury Reconditioning Program'
    ],
    headDoctorName: 'Dr. James Thompson',
    headDoctorTitle: 'Chair of Orthopedic Surgery',
    emergencyAvailable: true,
    featuredStats: [
      { label: 'Joint Surgeries', value: '3,100+' },
      { label: 'Recovery Time', value: '-35% avg' },
      { label: 'Sports Teams Served', value: '18+' }
    ]
  },
  {
    id: 'dept-pediatrics',
    name: 'Pediatrics',
    slug: 'pediatrics',
    iconName: 'Baby',
    description: 'Compassionate pediatric healthcare from neonatal care through adolescent development.',
    fullDescription: 'Dedicated to young patients and their families, our Pediatrics Department provides child-friendly general pediatric examinations, neonatal intensive care (NICU Level III), developmental assessments, and pediatric immunization schedules in a warm environment.',
    specialistCount: 11,
    keyTreatments: [
      'Well-Child Preventive Screenings & Vaccines',
      'Pediatric Asthma & Allergy Management',
      'Neonatal Intensive Care Support',
      'Childhood Developmental & Behavioral Health'
    ],
    headDoctorName: 'Dr. Emily Chen',
    headDoctorTitle: 'Chief of Pediatric Medicine',
    emergencyAvailable: true,
    featuredStats: [
      { label: 'Happy Families', value: '15,000+' },
      { label: 'NICU Survival Rate', value: '99.8%' },
      { label: 'Child-Friendly Units', value: '100%' }
    ]
  },
  {
    id: 'dept-oncology',
    name: 'Oncology',
    slug: 'oncology',
    iconName: 'Activity',
    description: 'Precision molecular oncology, immunotherapy, targeted therapy, and supportive care.',
    fullDescription: 'The NovaCare Cancer Center offers multidisciplinary tumor board care, genomic sequencing to tailor targeted cancer medications, precision radiation therapy, and compassionate patient navigation throughout every phase of healing.',
    specialistCount: 8,
    keyTreatments: [
      'Targeted Molecular & Immunotherapy Protocols',
      'Outpatient Infusion Suites with Biomonitoring',
      'Image-Guided Stereotactic Radiosurgery',
      'Multidisciplinary Tumor Board Consultations'
    ],
    headDoctorName: 'Dr. Robert Kim',
    headDoctorTitle: 'Head of Clinical Oncology & Research',
    emergencyAvailable: false,
    featuredStats: [
      { label: 'Clinical Trials', value: '45 Active' },
      { label: 'Patient Rating', value: '4.9 / 5.0' },
      { label: 'Genomic Profiling', value: '100% Cases' }
    ]
  },
  {
    id: 'dept-emergency',
    name: 'Emergency Care',
    slug: 'emergency-care',
    iconName: 'Ambulance',
    description: '24/7 Level-1 Trauma and acute emergency resuscitation staffed by board-certified ER physicians.',
    fullDescription: 'NovaCare’s 24/7 Emergency and Acute Trauma Center is ready every second of every day. With dedicated helipad access, rapid chest pain evaluation pathways, acute stroke response teams, and immediate CT/surgical capabilities, we ensure urgent, life-saving care.',
    specialistCount: 16,
    keyTreatments: [
      'Level-1 Acute Trauma Resuscitation',
      'Rapid Rapid-Rule-Out Cardiac Protocol',
      'Pediatric Urgent Emergency Care',
      'Toxicology & Poison Emergency Protocol'
    ],
    headDoctorName: 'Dr. Marcus Brody',
    headDoctorTitle: 'Chief of Emergency Medicine',
    emergencyAvailable: true,
    featuredStats: [
      { label: 'Availability', value: '24/7/365' },
      { label: 'Door-to-Doctor', value: '< 6 mins' },
      { label: 'Dedicated ER Bays', value: '42 Bays' }
    ]
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-cardiology',
    name: 'Cardiology Care & Diagnostics',
    category: 'Diagnostic & Treatment',
    iconName: 'Heart',
    shortDescription: 'Comprehensive heart health assessments, ECG, stress testing, and preventative cardiology management.',
    fullDescription: 'Our cardiology care service encompasses everything from routine baseline cardiovascular checks to advanced 24-hour Holter monitoring, stress echocardiography, arterial doppler screening, and customized preventative lifestyle protocols.',
    keyFeatures: [
      'Digital 12-lead ECG and Holter ambulatory recording',
      'Color Doppler echocardiography with 3D reconstruction',
      'Lipid profile optimization and plaque risk scoring',
      'Immediate physician review and electronic health summary'
    ],
    preparationTips: [
      'Fast for 4 hours prior if fasting blood work is scheduled',
      'Wear comfortable 2-piece clothing and athletic shoes for stress testing',
      'Bring a list of all current cardiovascular prescriptions'
    ],
    relatedDepartmentId: 'dept-cardiology',
    estimatedDuration: '45 - 60 mins'
  },
  {
    id: 'srv-neurology',
    name: 'Neurology & Brain Health',
    category: 'Specialized Care',
    iconName: 'BrainCircuit',
    shortDescription: 'Cognitive assessments, high-resolution neuroimaging, migraine clinics, and neuromuscular evaluations.',
    fullDescription: 'Specialized neurological diagnostic and management protocols focusing on headache/migraine treatments, neuropathy screenings, early memory retention evaluations, and spinal nerve conduction studies.',
    keyFeatures: [
      'High-resolution Nerve Conduction & Electromyography (EMG)',
      'Specialized Chronic Migraine & Cluster Headache protocols',
      'Cognitive baseline profiling & memory wellness consultations',
      'Sleep disorder neuro-evaluations'
    ],
    preparationTips: [
      'Ensure hair is clean and free of oils or styling gels for EEG procedures',
      'Avoid caffeine 12 hours before neurological autonomic testing',
      'Bring any recent brain MRI or CT scan discs if available'
    ],
    relatedDepartmentId: 'dept-neurology',
    estimatedDuration: '60 - 90 mins'
  },
  {
    id: 'srv-orthopedic-surgery',
    name: 'Orthopedic Surgery & Sports Rehab',
    category: 'Surgical & Rehabilitation',
    iconName: 'ActivitySquare',
    shortDescription: 'Robotic joint surgery, ligament repair, spine health, and specialized sports performance physical therapy.',
    fullDescription: 'From high-performance athletic rehabilitation to state-of-the-art robotic joint reconstruction, our orthopedic surgical suite and adjoining physical therapy gymnasium provide seamless, start-to-finish mobility restoration.',
    keyFeatures: [
      'Sub-millimeter robotic arm assisted joint replacement',
      'Arthroscopic minimally invasive knee & shoulder repairs',
      'Post-operative physical rehabilitation under clinical oversight',
      'Customized braces and orthotics fitting'
    ],
    preparationTips: [
      'Bring previous X-rays or MRI reports if taken within the last 6 months',
      'Wear shorts or loose-fitting athletic apparel for physical exam',
      'Prepare any questions about daily mobility or sports goals'
    ],
    relatedDepartmentId: 'dept-orthopedics',
    estimatedDuration: '45 mins initial consultation'
  },
  {
    id: 'srv-emergency-trauma',
    name: 'Emergency & Trauma Care',
    category: 'Urgent Care',
    iconName: 'ShieldAlert',
    shortDescription: '24/7 urgent medical attention, walk-in trauma clinic, point-of-care ultrasound, and rapid stabilization.',
    fullDescription: 'Our fully equipped emergency wing handles all critical situations with zero delay. Direct triage access, digital radiology on standby, dedicated pediatric ER suites, and continuous vital monitoring ensure safety in high-stakes moments.',
    keyFeatures: [
      'Zero-wait critical triage protocol for acute conditions',
      'Instant bedside ultrasound, point-of-care laboratory, and digital CT',
      'Fully equipped isolation rooms and pediatric emergency suites',
      'Direct coordination with regional emergency medical services'
    ],
    preparationTips: [
      'No appointment necessary - walk in 24/7 or call emergency lines',
      'If possible, bring photo identification and health insurance card',
      'For severe symptoms (chest pain, stroke signs), call 911 immediately'
    ],
    relatedDepartmentId: 'dept-emergency',
    estimatedDuration: 'Immediate triage'
  },
  {
    id: 'srv-pediatric-wellness',
    name: 'Pediatric Wellness & Neonatal Care',
    category: 'Family Health',
    iconName: 'Smile',
    shortDescription: 'Routine developmental checkups, infant vaccinations, pediatric urgent care, and nutritional guidance.',
    fullDescription: 'Comprehensive care for newborns, toddlers, children, and teenagers. Our pediatric clinic offers gentle, anxiety-free examinations, growth milestone tracking, seasonal vaccines, and pediatric emergency consultations.',
    keyFeatures: [
      'Growth percentile tracking and milestone verification',
      'Gentle CDC-aligned vaccine administration with painless techniques',
      'Same-day acute sick visits for fevers, earaches, and infections',
      'Pediatric nutritional and allergy counseling'
    ],
    preparationTips: [
      'Bring your child’s updated immunization record booklet',
      'Write down recent sleep, feeding, or behavioral patterns to discuss',
      'Comfort toys and strollers are always welcome'
    ],
    relatedDepartmentId: 'dept-pediatrics',
    estimatedDuration: '30 - 45 mins'
  },
  {
    id: 'srv-oncology-care',
    name: 'Comprehensive Oncology & Infusion',
    category: 'Specialized Medicine',
    iconName: 'Sparkles',
    shortDescription: 'Targeted biological therapies, comfortable outpatient infusion suites, and multidisciplinary tumor boards.',
    fullDescription: 'An evidence-based oncology program focused on patient dignity, clinical precision, and comfort. We provide targeted immunotherapy, specialized outpatient chemotherapy, nutrition for oncology, and dedicated oncology nurse navigators.',
    keyFeatures: [
      'State-of-the-art private and semi-private infusion suites with entertainment',
      'Personal oncology nurse navigator assigned to every patient',
      'Real-time genetic sequencing and molecular biomarker testing',
      'Holistic oncology support: nutritional, psychological, and pain management'
    ],
    preparationTips: [
      'Stay well-hydrated starting the day prior to infusion therapy',
      'Wear loose comfortable layers with easy arm or chest-port access',
      'A companion or family member is encouraged to accompany you'
    ],
    relatedDepartmentId: 'dept-oncology',
    estimatedDuration: 'Variable by treatment protocol'
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'doc-sarah-mitchell',
    name: 'Dr. Sarah Mitchell',
    title: 'MD, FACC, FSCAI',
    department: 'Cardiology',
    specialty: 'Interventional Cardiology',
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 348,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Sarah Mitchell is a renowned interventional cardiologist specializing in complex coronary interventions, transcatheter aortic valve replacement (TAVR), and cardiovascular prevention. She serves as the Chief of Interventional Cardiology at NovaCare and has published over 40 peer-reviewed studies.',
    education: [
      'MD, Johns Hopkins University School of Medicine',
      'Residency in Internal Medicine, Massachusetts General Hospital (Harvard)',
      'Fellowship in Cardiovascular Disease & Interventional Cardiology, Cleveland Clinic'
    ],
    specializations: [
      'Coronary Angioplasty & Stenting',
      'TAVR & Structural Heart Interventions',
      'Preventive Lipidology',
      'Women’s Cardiovascular Health'
    ],
    languages: ['English', 'Spanish'],
    consultationFee: 180,
    roomNumber: 'Suite 302, Heart & Vascular Pavilion',
    contactEmail: 's.mitchell@novacare-health.org',
    phone: '+1 (800) 555-0141',
    availableSlots: [
      {
        date: '2026-08-15',
        times: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM']
      },
      {
        date: '2026-08-16',
        times: ['08:30 AM', '11:00 AM', '01:30 PM', '04:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['09:30 AM', '11:30 AM', '02:30 PM']
      },
      {
        date: '2026-08-18',
        times: ['10:00 AM', '01:00 PM', '03:00 PM', '04:30 PM']
      }
    ]
  },
  {
    id: 'doc-michael-rodriguez',
    name: 'Dr. Michael Rodriguez',
    title: 'MD, PhD, FAAN',
    department: 'Neurology',
    specialty: 'Clinical Neurophysiology & Stroke',
    experienceYears: 12,
    rating: 4.7,
    reviewCount: 260,
    availability: 'In Surgery',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Michael Rodriguez specializes in stroke neuro-intervention, comprehensive epilepsy management, and neuromuscular diagnostics. He leads our rapid-response acute stroke team and conducts clinical research on neuroplastic recovery.',
    education: [
      'MD & PhD in Neuroscience, Stanford University School of Medicine',
      'Neurology Residency, UCSF Medical Center',
      'Vascular Neurology & Neuro-critical Care Fellowship, Columbia University'
    ],
    specializations: [
      'Acute Stroke Revascularization',
      'High-Density EEG & Seizure Mapping',
      'Neuro-critical Care',
      'Peripheral Neuropathy Management'
    ],
    languages: ['English', 'Spanish', 'Portuguese'],
    consultationFee: 195,
    roomNumber: 'Suite 415, Neuroscience Center',
    contactEmail: 'm.rodriguez@novacare-health.org',
    phone: '+1 (800) 555-0142',
    availableSlots: [
      {
        date: '2026-08-16',
        times: ['01:00 PM', '02:30 PM', '04:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['09:00 AM', '11:00 AM', '03:00 PM']
      },
      {
        date: '2026-08-18',
        times: ['10:30 AM', '02:00 PM', '04:30 PM']
      }
    ]
  },
  {
    id: 'doc-emily-chen',
    name: 'Dr. Emily Chen',
    title: 'MD, FAAP',
    department: 'Pediatrics',
    specialty: 'General & Developmental Pediatrics',
    experienceYears: 8,
    rating: 5.0,
    reviewCount: 412,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1594824813575-52011b98a33f?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Emily Chen is a compassionate board-certified pediatrician dedicated to comprehensive child health, developmental tracking, and adolescent medicine. Parents value her warm bedside manner, patience, and clear evidence-based parenting advice.',
    education: [
      'MD, Yale School of Medicine',
      'Pediatric Residency, Boston Children’s Hospital / Harvard Medical School',
      'Chief Resident in Pediatrics, Boston Medical Center'
    ],
    specializations: [
      'Newborn & Infant Development',
      'Pediatric Asthma & Allergy Action Plans',
      'Childhood Behavioral & ADHD Evaluations',
      'Adolescent Preventative Care'
    ],
    languages: ['English', 'Mandarin'],
    consultationFee: 150,
    roomNumber: 'Suite 201, Children’s Health Wing',
    contactEmail: 'e.chen@novacare-health.org',
    phone: '+1 (800) 555-0143',
    availableSlots: [
      {
        date: '2026-08-15',
        times: ['08:30 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM']
      },
      {
        date: '2026-08-16',
        times: ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['08:30 AM', '11:00 AM', '02:30 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'doc-james-thompson',
    name: 'Dr. James Thompson',
    title: 'MD, FAAOS',
    department: 'Orthopedics',
    specialty: 'Adult Reconstruction & Sports Medicine',
    experienceYears: 20,
    rating: 4.8,
    reviewCount: 385,
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. James Thompson has performed over 5,000 successful joint replacements and arthroscopic procedures. He is a pioneer in computer-navigated robotic surgery and acts as orthopedic consultant to several professional sports franchises.',
    education: [
      'MD, University of Pennsylvania Perelman School of Medicine',
      'Orthopedic Surgery Residency, Hospital for Special Surgery (HSS)',
      'Fellowship in Adult Reconstruction & Sports Orthopedics, Mayo Clinic'
    ],
    specializations: [
      'Robotic Minimally Invasive Hip & Knee Replacement',
      'Arthroscopic Shoulder & ACL Repair',
      'Complex Revision Joint Arthroplasty',
      'Sports Injury Biomechanics'
    ],
    languages: ['English'],
    consultationFee: 210,
    roomNumber: 'Suite 510, Musculoskeletal Pavilion',
    contactEmail: 'j.thompson@novacare-health.org',
    phone: '+1 (800) 555-0144',
    availableSlots: [
      {
        date: '2026-08-16',
        times: ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['09:00 AM', '10:30 AM', '01:30 PM', '03:30 PM']
      },
      {
        date: '2026-08-18',
        times: ['08:30 AM', '11:30 AM', '02:00 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'doc-lisa-anderson',
    name: 'Dr. Lisa Anderson',
    title: 'MD, FAAD',
    department: 'Dermatology',
    specialty: 'Medical & Surgical Dermatology',
    experienceYears: 10,
    rating: 4.6,
    reviewCount: 198,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Lisa Anderson is a board-certified dermatologist specializing in early melanoma detection, Mohs micrographic surgery, complex eczema, and acne therapies. She emphasizes preventative skin wellness and advanced phototherapy.',
    education: [
      'MD, Northwestern University Feinberg School of Medicine',
      'Dermatology Residency, NYU Langone Health',
      'Procedural Dermatology Fellowship, University of Michigan'
    ],
    specializations: [
      'Skin Cancer Screening & Dermoscopy',
      'Mohs Micrographic Surgery',
      'Psoriasis & Eczema Biologic Management',
      'Laser & Aesthetic Medical Dermatology'
    ],
    languages: ['English', 'French'],
    consultationFee: 165,
    roomNumber: 'Suite 108, Dermatology & Wellness',
    contactEmail: 'l.anderson@novacare-health.org',
    phone: '+1 (800) 555-0145',
    availableSlots: [
      {
        date: '2026-08-15',
        times: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM']
      },
      {
        date: '2026-08-16',
        times: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['08:30 AM', '11:00 AM', '02:30 PM']
      }
    ]
  },
  {
    id: 'doc-robert-kim',
    name: 'Dr. Robert Kim',
    title: 'MD, FACP',
    department: 'Oncology',
    specialty: 'Medical Oncology & Hematology',
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 310,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Robert Kim is an esteemed medical oncologist with extensive clinical trial experience in molecular targeted therapies and immune checkpoint blockade. He works closely with surgical teams to deliver tailored, patient-first cancer therapies.',
    education: [
      'MD, Cornell University Weill Medical College',
      'Internal Medicine Residency, New York-Presbyterian Hospital',
      'Hematology/Oncology Fellowship, Memorial Sloan Kettering Cancer Center'
    ],
    specializations: [
      'Targeted Immunotherapy Protocols',
      'Thoracic & Gastrointestinal Malignancies',
      'Genomic Tumor Profiling',
      'Palliative & Supportive Oncology'
    ],
    languages: ['English', 'Korean'],
    consultationFee: 220,
    roomNumber: 'Suite 604, Cancer Care Pavilion',
    contactEmail: 'r.kim@novacare-health.org',
    phone: '+1 (800) 555-0146',
    availableSlots: [
      {
        date: '2026-08-15',
        times: ['09:30 AM', '11:00 AM', '02:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['10:00 AM', '01:30 PM', '03:30 PM']
      },
      {
        date: '2026-08-18',
        times: ['09:00 AM', '11:30 AM', '02:00 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'doc-marcus-brody',
    name: 'Dr. Marcus Brody',
    title: 'MD, FACEP',
    department: 'Emergency Care',
    specialty: 'Emergency Medicine & Trauma',
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 520,
    availability: 'Available',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Marcus Brody is the Director of Emergency Services at NovaCare. Board-certified in Emergency Medicine, he brings exceptional leadership in high-velocity trauma resuscitation, disaster preparedness, and critical care triage.',
    education: [
      'MD, Georgetown University School of Medicine',
      'Emergency Medicine Residency, Emory University School of Medicine / Grady Memorial',
      'Fellowship in Emergency Resuscitation & Ultrasound, Shock Trauma Center'
    ],
    specializations: [
      'Level 1 Acute Trauma Stabilization',
      'Point-of-Care Emergency Echocardiography',
      'Airway Management & Critical Resuscitation',
      'Mass Casualty Incident Command'
    ],
    languages: ['English', 'German'],
    consultationFee: 175,
    roomNumber: 'Ground Floor, Emergency Trauma Center',
    contactEmail: 'm.brody@novacare-health.org',
    phone: '+1 (800) 555-0911',
    availableSlots: [
      {
        date: '2026-08-15',
        times: ['08:00 AM', '10:00 AM', '01:00 PM', '03:00 PM']
      },
      {
        date: '2026-08-16',
        times: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'doc-elena-vance',
    name: 'Dr. Elena Vance',
    title: 'MD, FACS',
    department: 'Surgery',
    specialty: 'Minimally Invasive & Laparoscopic Surgery',
    experienceYears: 14,
    rating: 4.8,
    reviewCount: 235,
    availability: 'Available Tomorrow',
    image: 'https://images.unsplash.com/photo-1594824813575-52011b98a33f?auto=format&fit=crop&q=80&w=800',
    about: 'Dr. Elena Vance specializes in advanced laparoscopic gastrointestinal surgeries, hernia repairs, and bariatric procedures. She focuses on accelerated recovery pathways (ERAS) that minimize post-op discomfort and hospital stays.',
    education: [
      'MD, Duke University School of Medicine',
      'General Surgery Residency, Johns Hopkins Hospital',
      'Advanced Minimally Invasive Surgery Fellowship, Cleveland Clinic'
    ],
    specializations: [
      'Laparoscopic Gastrointestinal Surgery',
      'Single-Incision Gallbladder & Hernia Procedures',
      'Endocrine Surgery (Thyroid & Parathyroid)',
      'Surgical Critical Care'
    ],
    languages: ['English', 'Italian'],
    consultationFee: 200,
    roomNumber: 'Suite 408, Surgical Pavilion',
    contactEmail: 'e.vance@novacare-health.org',
    phone: '+1 (800) 555-0148',
    availableSlots: [
      {
        date: '2026-08-16',
        times: ['09:00 AM', '11:00 AM', '02:00 PM']
      },
      {
        date: '2026-08-17',
        times: ['10:00 AM', '01:30 PM', '03:30 PM']
      }
    ]
  }
];

export const INITIAL_SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'NC-2026-48291',
    patientName: 'Alex Morgan',
    patientEmail: 'alex.morgan@example.com',
    patientPhone: '+1 (555) 234-8901',
    department: 'Cardiology',
    doctorId: 'doc-sarah-mitchell',
    doctorName: 'Dr. Sarah Mitchell',
    doctorSpecialty: 'Interventional Cardiology',
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    date: '2026-08-18',
    time: '10:30 AM',
    reason: 'Follow-up cardiovascular check and blood pressure evaluation.',
    status: 'Confirmed',
    createdAt: '2026-08-14T09:15:00Z',
    notes: 'Please bring your recent lipid panel lab report.'
  },
  {
    id: 'NC-2026-31904',
    patientName: 'David Miller',
    patientEmail: 'david.miller@example.com',
    patientPhone: '+1 (555) 876-4321',
    department: 'Orthopedics',
    doctorId: 'doc-james-thompson',
    doctorName: 'Dr. James Thompson',
    doctorSpecialty: 'Adult Reconstruction & Sports Medicine',
    doctorImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
    date: '2026-08-20',
    time: '02:00 PM',
    reason: 'Consultation for chronic right knee discomfort during running.',
    status: 'Confirmed',
    createdAt: '2026-08-13T14:30:00Z',
    notes: 'Wear comfortable workout shorts for physical range of motion test.'
  }
];

export const TRUST_STATS = [
  { value: '150+', label: 'Medical Specialists', description: 'Board-certified healthcare leaders' },
  { value: '25+', label: 'Medical Departments', description: 'Comprehensive integrated facilities' },
  { value: '24/7', label: 'Emergency Support', description: 'Instant trauma response units' },
  { value: '98.4%', label: 'Patient Satisfaction', description: 'Verified clinical feedback score' }
];

export const HOSPITAL_INFO = {
  name: 'NovaCare Health Network',
  tagline: 'Smart Digital Healthcare Platform',
  mainAddress: '742 Healthcare Boulevard, Medical District, Suite 100, Metro City, MC 94016',
  generalPhone: '+1 (800) 555-0199',
  emergencyPhone: '+1 (800) 555-0911',
  nurseHelpline: '+1 (800) 555-0188',
  poisonControl: '+1 (800) 222-1222',
  email: 'care@novacare-health.org',
  hours: 'Open 24 Hours, 7 Days a Week (ER) | Clinics: Mon - Sat: 7:30 AM - 8:00 PM',
  mapCoordinates: { lat: 37.7749, lng: -122.4194 }
};
