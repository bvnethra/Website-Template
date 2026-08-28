export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  image: string;
  duration: string;
  priceEstimate: string;
  preparationInstructions: string[];
  departmentId: string;
  departmentName: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'primary-care',
    title: 'Primary Care & Wellness',
    category: 'General Health',
    shortDescription: 'Comprehensive routine medical care, annual wellness physicals, vaccinations, and health tracking.',
    fullDescription: 'Our Primary Care services establish a lifelong foundation for your health. Our dedicated internists provide thorough physical examinations, blood panels, early disease screening, lifestyle recommendations, and continuous care coordination.',
    iconName: 'Shield',
    image: '/images/services/primary-care.jpg',
    duration: '45 mins',
    priceEstimate: '$110 - $160',
    preparationInstructions: [
      'Fast for 8-12 hours prior if routine blood testing is requested.',
      'Bring a list of current prescription and OTC medications.',
      'Bring your insurance card and official photo ID.'
    ],
    departmentId: 'general-medicine',
    departmentName: 'General Medicine'
  },
  {
    id: 'srv-2',
    slug: 'specialist-consultation',
    title: 'Specialist Consultation',
    category: 'Specialty Care',
    shortDescription: 'Direct access to top-tier medical specialists across cardiology, neurology, orthopedics, and more.',
    fullDescription: 'Receive expert clinical diagnosis and individualized treatment plans from board-certified specialists equipped with advanced diagnostic technologies and evidence-based protocols.',
    iconName: 'UserCheck',
    image: '/images/services/specialist-consultation.jpg',
    duration: '30 - 60 mins',
    priceEstimate: '$140 - $200',
    preparationInstructions: [
      'Compile previous medical records, X-rays, or MRI scans relevant to your consultation.',
      'Write down your key symptoms and questions beforehand.'
    ],
    departmentId: 'cardiology',
    departmentName: 'Multiple Departments'
  },
  {
    id: 'srv-3',
    slug: 'diagnostic-imaging',
    title: 'Diagnostic Imaging & Radiology',
    category: 'Diagnostics',
    shortDescription: 'State-of-the-art MRI, CT scans, 3D Digital X-rays, and high-frequency Ultrasounds.',
    fullDescription: 'Our Radiology Imaging Center uses ultra-low radiation digital X-rays, 3T MRI scanners, and high-definition ultrasound systems to deliver precise anatomical imaging for fast, reliable diagnoses.',
    iconName: 'Cpu',
    image: '/images/services/diagnostic-imaging.jpg',
    duration: '20 - 45 mins',
    priceEstimate: '$180 - $450',
    preparationInstructions: [
      'Remove all metal objects and jewelry before MRI scans.',
      'Follow specific fasting instructions provided for abdominal ultrasounds or contrast CT scans.'
    ],
    departmentId: 'general-medicine',
    departmentName: 'Radiology & Diagnostics'
  },
  {
    id: 'srv-4',
    slug: 'laboratory-testing',
    title: 'Laboratory & Blood Pathology',
    category: 'Diagnostics',
    shortDescription: 'Rapid, accredited blood panels, cholesterol screens, hormonal profiles, and molecular testing.',
    fullDescription: 'Our on-site CAP-accredited diagnostic laboratory offers rapid turnaround times for lipid panels, HbA1c, thyroid function, allergy screens, and viral screening tests.',
    iconName: 'FileText',
    image: '/images/services/laboratory-testing.jpg',
    duration: '15 mins',
    priceEstimate: '$40 - $120',
    preparationInstructions: [
      'Drink plenty of water before blood drawing.',
      'Inform the lab phlebotomist if you have a history of fainting during blood draws.'
    ],
    departmentId: 'general-medicine',
    departmentName: 'Central Diagnostics'
  },
  {
    id: 'srv-5',
    slug: 'preventive-care',
    title: 'Preventive Health Screening',
    category: 'Prevention',
    shortDescription: 'Proactive early detection screenings for cardiovascular health, oncology, and metabolic wellness.',
    fullDescription: 'Preventive health packages tailored by age and gender to catch early markers of cardiovascular disease, diabetes, bone density loss, and oncological risk long before symptoms develop.',
    iconName: 'Activity',
    image: '/images/services/preventive-care.jpg',
    duration: '60 - 90 mins',
    priceEstimate: '$250 - $400',
    preparationInstructions: [
      'Overnight fasting required for comprehensive metabolic panel.',
      'Wear comfortable clothing suitable for exercise stress testing.'
    ],
    departmentId: 'general-medicine',
    departmentName: 'General Medicine'
  },
  {
    id: 'srv-6',
    slug: 'physical-therapy',
    title: 'Physical Therapy & Rehab',
    category: 'Rehabilitation',
    shortDescription: 'Targeted physical rehabilitation for sports injury, spinal alignment, post-operative mobility, and joint pain.',
    fullDescription: 'Our Licensed Physical Therapy team creates customized mechanical therapy, dry needling, and therapeutic exercise programs to eliminate pain and restore full functional movement.',
    iconName: 'Zap',
    image: '/images/services/physiotherapy.jpg',
    duration: '45 mins',
    priceEstimate: '$100 - $140',
    preparationInstructions: [
      'Wear athletic shorts, loose t-shirt, and supportive sneakers.',
      'Bring any surgical release notes or physician referral forms.'
    ],
    departmentId: 'physiotherapy',
    departmentName: 'Physiotherapy'
  },
  {
    id: 'srv-7',
    slug: 'mental-wellness',
    title: 'Mental Wellness & Tele-Psychiatry',
    category: 'Behavioral Health',
    shortDescription: 'Confidential psychiatric evaluations, stress management, mood disorder therapy, and tele-health.',
    fullDescription: 'Empathetic psychiatric and psychotherapeutic services designed to alleviate anxiety, burnout, clinical depression, and psychological stress in a judgment-free, confidential environment.',
    iconName: 'SmilePlus',
    image: '/images/services/neurology.jpg',
    duration: '50 mins',
    priceEstimate: '$150 - $220',
    preparationInstructions: [
      'Ensure a quiet, private space for virtual tele-psychiatry calls.',
      'Note down main personal goals or emotional challenges to discuss.'
    ],
    departmentId: 'psychiatry',
    departmentName: 'Psychiatry'
  },
  {
    id: 'srv-8',
    slug: 'telemedicine',
    title: '24/7 Virtual Telemedicine',
    category: 'Digital Health',
    shortDescription: 'Instant video consultations with board-certified physicians from the comfort of your home.',
    fullDescription: 'Access medical advice, prescription renewals, lab result explanations, and urgent care guidance anytime via our encrypted 24/7 high-definition video platform.',
    iconName: 'Video',
    image: '/images/services/specialist-consultation.jpg',
    duration: '20 mins',
    priceEstimate: '$60 - $85',
    preparationInstructions: [
      'Test your smartphone or laptop camera and microphone prior to connection.',
      'Have your medication bottles nearby for quick reference.'
    ],
    departmentId: 'general-medicine',
    departmentName: 'Digital Care'
  }
];
