export interface Department {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  specialistCount: number;
  featuredServices: string[];
  headDoctorId: string;
  headDoctorName: string;
  faqs: { question: string; answer: string }[];
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'cardiology',
    slug: 'cardiology',
    name: 'Cardiology',
    shortDescription: 'Comprehensive heart care, cardiovascular diagnostics, and preventative cardiac health programs.',
    fullDescription: 'Our Cardiology Department is a center of excellence dedicated to the prevention, diagnosis, and treatment of heart conditions. Equipped with state-of-the-art echocardiography, Holter monitoring, and stress testing, our world-class team provides personalized cardiovascular care.',
    iconName: 'Heart',
    image: '/images/departments/cardiology.jpg',
    specialistCount: 6,
    featuredServices: ['Echocardiography & ECG', 'Hypertension Management', 'Coronary Artery Screening', 'Heart Failure Care'],
    headDoctorId: 'doc-1',
    headDoctorName: 'Dr. Sarah Jenkins',
    faqs: [
      {
        question: 'When should I see a cardiologist?',
        answer: 'You should consult a cardiologist if you experience chest discomfort, shortness of breath, palpitations, high blood pressure, or have a family history of heart disease.'
      },
      {
        question: 'What non-invasive heart tests do you perform?',
        answer: 'We provide 12-lead ECG, 24-48 hour Holter monitoring, exercise stress tests, and high-resolution transthoracic echocardiograms.'
      }
    ]
  },
  {
    id: 'neurology',
    slug: 'neurology',
    name: 'Neurology',
    shortDescription: 'Advanced diagnosis and therapy for brain, spine, nerve, and neuromuscular conditions.',
    fullDescription: 'The Neurology Department offers expert care for complex central and peripheral nervous system disorders. We utilize cutting-edge neuro-imaging and EEG technology to treat migraines, epilepsy, neuropathy, and movement disorders.',
    iconName: 'Brain',
    image: '/images/departments/neurology.jpg',
    specialistCount: 4,
    featuredServices: ['Migraine Therapy', 'Epilepsy & Seizure Care', 'EMG & Nerve Studies', 'Parkinson’s Clinic'],
    headDoctorId: 'doc-2',
    headDoctorName: 'Dr. Marcus Vance',
    faqs: [
      {
        question: 'What symptoms indicate a neurological checkup is needed?',
        answer: 'Persistent headaches, numbness or tingling in limbs, memory loss, dizziness, and tremors are common reasons to visit a neurologist.'
      }
    ]
  },
  {
    id: 'pediatrics',
    slug: 'pediatrics',
    name: 'Pediatrics',
    shortDescription: 'Gentle, specialized healthcare for infants, children, and teenagers in a welcoming environment.',
    fullDescription: 'Our Pediatric Center is designed around children’s comfort and well-being. From newborn screenings and routine vaccinations to managing adolescent health, our pediatricians work closely with parents to support healthy child development.',
    iconName: 'Baby',
    image: '/images/departments/pediatrics.jpg',
    specialistCount: 5,
    featuredServices: ['Well-Child Checks', 'Immunization Schedules', 'Pediatric Asthma Care', 'Growth & Development Tracking'],
    headDoctorId: 'doc-3',
    headDoctorName: 'Dr. Amara Chen',
    faqs: [
      {
        question: 'How often should my baby have wellness checkups?',
        answer: 'We recommend wellness visits at 2 weeks, 1, 2, 4, 6, 9, 12, 15, 18, and 24 months, followed by annual checkups.'
      }
    ]
  },
  {
    id: 'dermatology',
    slug: 'dermatology',
    name: 'Dermatology',
    shortDescription: 'Expert care for skin health, hair, nails, skin cancer screening, and cosmetic treatments.',
    fullDescription: 'The Dermatology Department delivers expert solutions for medical skin conditions such as eczema, psoriasis, and severe acne, alongside advanced skin cancer dermoscopy screening and cosmetic skin rejuvenation therapies.',
    iconName: 'Sparkles',
    image: '/images/departments/dermatology.jpg',
    specialistCount: 4,
    featuredServices: ['Full-Body Skin Cancer Exam', 'Acne & Rosacea Clinic', 'Laser Skin Resurfacing', 'Eczema & Psoriasis Therapy'],
    headDoctorId: 'doc-4',
    headDoctorName: 'Dr. Robert Sterling',
    faqs: [
      {
        question: 'How frequently should I have a skin cancer screening?',
        answer: 'An annual full-body mole and skin examination is recommended for adults, especially those with fair skin or a history of sun exposure.'
      }
    ]
  },
  {
    id: 'orthopedics',
    slug: 'orthopedics',
    name: 'Orthopedics',
    shortDescription: 'Comprehensive bone, joint, ligament, and spine treatments, including minimally invasive surgery.',
    fullDescription: 'Our Orthopedics Department focuses on restoring pain-free movement. Our surgeons and sports medicine physicians treat joint degeneration, sports injuries, fractures, and spinal conditions with advanced minimally invasive procedures.',
    iconName: 'Activity',
    image: '/images/departments/orthopedics.jpg',
    specialistCount: 5,
    featuredServices: ['Total Joint Replacement', 'Arthroscopic Knee & Shoulder Surgery', 'Sports Injury Rehabilitation', 'Spine Care'],
    headDoctorId: 'doc-5',
    headDoctorName: 'Dr. Elena Rodriguez',
    faqs: [
      {
        question: 'What is the recovery time for arthroscopic knee surgery?',
        answer: 'Most patients return to light daily activities within 1 to 2 weeks, with full athletic recovery in 6 to 12 weeks supported by physical therapy.'
      }
    ]
  },
  {
    id: 'dental-care',
    slug: 'dental-care',
    name: 'Dental Care',
    shortDescription: 'Painless general dentistry, cosmetic smile makeovers, digital implants, and orthodontics.',
    fullDescription: 'The Dental Care Department provides modern, stress-free oral care. Utilizing 3D intraoral scanners and digital imaging, we specialize in preventive hygiene, teeth whitening, porcelain veneers, and dental implants.',
    iconName: 'Smile',
    image: '/images/departments/dental-care.jpg',
    specialistCount: 4,
    featuredServices: ['Digital 3D Dental Cleaning', 'Porcelain Veneers & Crowns', 'Dental Implant Surgery', 'Invisalign Teeth Straightening'],
    headDoctorId: 'doc-6',
    headDoctorName: 'Dr. James Wilson',
    faqs: [
      {
        question: 'Are dental implants painful?',
        answer: 'Dental implant procedures are performed under local anesthesia to ensure complete comfort. Post-procedure discomfort is minimal and easily managed with prescribed care.'
      }
    ]
  },
  {
    id: 'ophthalmology',
    slug: 'ophthalmology',
    name: 'Ophthalmology',
    shortDescription: 'Precision eye exams, vision correction, cataract laser microsurgery, and glaucoma management.',
    fullDescription: 'Our Eye Institute delivers complete vision care using optical coherence tomography (OCT) and femtosecond lasers. We diagnose and treat myopia, cataracts, glaucoma, dry eyes, and macular degeneration.',
    iconName: 'Eye',
    image: '/images/departments/ophthalmology.jpg',
    specialistCount: 3,
    featuredServices: ['Laser Cataract Removal', 'Glaucoma Screening & Laser Therapy', 'LASIK Refractive Surgery', 'Retinal Exam'],
    headDoctorId: 'doc-7',
    headDoctorName: 'Dr. Priya Patel',
    faqs: [
      {
        question: 'How long does a routine eye exam take?',
        answer: 'A comprehensive eye evaluation including pupil dilation and intraocular pressure check takes approximately 45 to 60 minutes.'
      }
    ]
  },
  {
    id: 'gynecology',
    slug: 'gynecology',
    name: 'Gynecology',
    shortDescription: 'Compassionate women’s health, obstetrics, prenatal tracking, and minimally invasive surgery.',
    fullDescription: 'The Women’s Health & Gynecology Center offers supportive, individualized care through all phases of life—from adolescent wellness to prenatal care, high-risk birth delivery, and menopause management.',
    iconName: 'UserCheck',
    image: '/images/departments/gynecology.jpg',
    specialistCount: 4,
    featuredServices: ['Prenatal Care & 3D Ultrasound', 'Minimally Invasive Hysterectomy', 'Menopausal Hormone Therapy', 'Fertility Screening'],
    headDoctorId: 'doc-8',
    headDoctorName: 'Dr. Sophia Martinez',
    faqs: [
      {
        question: 'When should I schedule my first prenatal appointment?',
        answer: 'We recommend scheduling your first prenatal visit around 6 to 8 weeks after your last menstrual period.'
      }
    ]
  },
  {
    id: 'general-medicine',
    slug: 'general-medicine',
    name: 'General Medicine',
    shortDescription: 'Primary care, chronic condition management, preventive wellness checkups, and adult medicine.',
    fullDescription: 'General Medicine serves as your healthcare home. Our board-certified internists focus on long-term wellness, annual health screenings, managing chronic diseases like diabetes and high blood pressure, and acute illness treatment.',
    iconName: 'Stethoscope',
    image: '/images/departments/general-medicine.jpg',
    specialistCount: 7,
    featuredServices: ['Annual Executive Health Checkup', 'Diabetes & Cholesterol Control', 'Immunizations & Travel Medicine', 'Urgent Medical Evaluation'],
    headDoctorId: 'doc-9',
    headDoctorName: 'Dr. David Kim',
    faqs: [
      {
        question: 'What is included in an annual health physical?',
        answer: 'Your annual visit includes full vital signs, comprehensive blood chemistry panel, ECG if indicated, lifestyle counseling, and preventive health recommendations.'
      }
    ]
  },
  {
    id: 'physiotherapy',
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    shortDescription: 'Personalized physical rehabilitation, posture correction, manual therapy, and sports recovery.',
    fullDescription: 'Our Physical Rehabilitation Center helps patients overcome musculoskeletal pain, regain mobility after surgery or trauma, and improve athletic performance through evidence-based kinesiology and physical therapy.',
    iconName: 'Zap',
    image: '/images/departments/physiotherapy.jpg',
    specialistCount: 4,
    featuredServices: ['Post-Surgical Rehabilitation', 'Spinal Pain & Sciatica Rehab', 'Sports Injury Recovery', 'Dry Needling Therapy'],
    headDoctorId: 'doc-10',
    headDoctorName: 'Dr. Olivia Taylor',
    faqs: [
      {
        question: 'Do I need a doctor referral for physical therapy?',
        answer: 'In most cases, you can self-refer directly for physical therapy evaluation. We also coordinate with your physician for continuous care.'
      }
    ]
  },
  {
    id: 'psychiatry',
    slug: 'psychiatry',
    name: 'Psychiatry',
    shortDescription: 'Compassionate mental wellness care, psychiatric evaluation, mood stabilization, and psychotherapy.',
    fullDescription: 'The Behavioral Health & Psychiatry Department offers a safe, confidential space for emotional wellbeing. We specialize in treating anxiety, clinical depression, stress, ADHD, and emotional trauma with therapeutic modalities and medication when appropriate.',
    iconName: 'SmilePlus',
    image: '/images/departments/psychiatry.jpg',
    specialistCount: 3,
    featuredServices: ['Psychiatric Consultation', 'Medication Management', 'Anxiety & Panic Relief', 'Stress & Burnout Counseling'],
    headDoctorId: 'doc-11',
    headDoctorName: 'Dr. Nathaniel Cross',
    faqs: [
      {
        question: 'Are tele-psychiatry video consultations available?',
        answer: 'Yes! We offer fully confidential, HIPAA-compliant video consultations for all ongoing psychiatric appointments.'
      }
    ]
  },
  {
    id: 'ent',
    slug: 'ent',
    name: 'ENT (Ear, Nose & Throat)',
    shortDescription: 'Advanced diagnostics and treatment for sinus infections, hearing loss, allergies, and throat conditions.',
    fullDescription: 'The Otolaryngology (ENT) Department treats conditions affecting the head, neck, ears, nose, and throat. Using modern video endoscopy and audiology labs, we relieve chronic sinus pressure, balance disorders, and vocal strain.',
    iconName: 'ShieldAlert',
    image: '/images/departments/ent.jpg',
    specialistCount: 3,
    featuredServices: ['Endoscopic Sinus Surgery', 'Hearing & Balance Diagnostics', 'Allergy Immunotherapy', 'Sleep Apnea Evaluation'],
    headDoctorId: 'doc-12',
    headDoctorName: 'Dr. Claire Bennett',
    faqs: [
      {
        question: 'What is the treatment for chronic sinusitis?',
        answer: 'We begin with targeted medical management (nasal rinses, anti-inflammatories). If symptoms persist, balloon sinuplasty or endoscopic sinus surgery may be performed.'
      }
    ]
  }
];
