import { 
  StudentUser, 
  FacultyUser, 
  LoginHistoryEntry, 
  HallTicketData, 
  SemesterResult, 
  PhotocopyRequest, 
  RevaluationRequest, 
  ReviewRequest, 
  GrievanceTicket, 
  PortalNotice,
  ExamApplicationRecord,
  SubjectExamItem
} from '../types/auth';

export const DEFAULT_STUDENT_USER: StudentUser = {
  studentId: 'EDV2026CS104',
  rollNumber: '2026-CS-104',
  name: 'Alex Morgan',
  email: 'a.morgan@student.eduvora.edu',
  personalEmail: 'alex.morgan.dev@gmail.com',
  phone: '+1 (555) 382-9014',
  dob: '2004-09-18',
  gender: 'Female',
  bloodGroup: 'O+ Positive',
  fatherName: 'Arthur Morgan',
  motherName: 'Eleanor Morgan',
  department: 'Computer Science & AI',
  degree: 'B.Tech in Computer Science & Artificial Intelligence',
  specialization: 'Distributed Intelligent Systems',
  semester: 6,
  batch: '2023 - 2027',
  academicYear: '2026 - 2027',
  section: 'Section B (Honors)',
  cgpa: 8.92,
  sgpa: 9.15,
  creditsEarned: 118,
  totalCreditsRequired: 160,
  academicStanding: "Dean's High Honors (Top 5% Cohort)",
  advisor: 'Dr. Evelyn Vance',
  advisorEmail: 'e.vance@eduvora.edu',
  advisorCabin: 'Alan Turing Block - Level 4, Cabin 402',
  residentialAddress: 'Campus Residence Hall - Asteria Tower B, Suite 412, Eduvora Central Campus',
  permanentAddress: '742 Evergreen Terrace, Silicon Valley, CA 94025, United States',
  emergencyContactName: 'Arthur Morgan',
  emergencyContactPhone: '+1 (555) 789-2341',
  emergencyContactRelation: 'Father',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  tuitionStatus: 'Paid in Full',
  examEligibility: 'Eligible (Attendance > 85%)',
  enrolledCourses: [
    {
      code: 'CS601',
      name: 'Deep Neural Architectures & Transformer LLMs',
      credits: 4,
      professor: 'Dr. Evelyn Vance',
      grade: 'A+',
      attendancePercent: 96,
      schedule: 'Mon / Wed 09:30 AM - 11:00 AM',
      room: 'Turing Hall 301',
      progressPercent: 88,
    },
    {
      code: 'CS602',
      name: 'Distributed Cloud Storage & High-Concurrency Systems',
      credits: 4,
      professor: 'Prof. Liam O\'Connor',
      grade: 'A',
      attendancePercent: 92,
      schedule: 'Tue / Thu 11:30 AM - 01:00 PM',
      room: 'Cloud Computing Lab 4',
      progressPercent: 82,
    },
    {
      code: 'CS603',
      name: 'Compiler Optimization & Quantum Computing Foundations',
      credits: 4,
      professor: 'Dr. Marcus Holloway',
      grade: 'A+',
      attendancePercent: 94,
      schedule: 'Mon / Wed 02:00 PM - 03:30 PM',
      room: 'Quantum Center 102',
      progressPercent: 90,
    },
    {
      code: 'CS604L',
      name: 'Applied AI & Autonomous Agent Systems Lab',
      credits: 2,
      professor: 'Dr. Evelyn Vance',
      grade: 'O',
      attendancePercent: 100,
      schedule: 'Friday 09:00 AM - 12:00 PM',
      room: 'Robotics & AI Lab B',
      progressPercent: 95,
    },
    {
      code: 'MGT610',
      name: 'Technology Commercialization & Venture Capital Strategy',
      credits: 3,
      professor: 'Prof. Alistair Sterling',
      grade: 'A',
      attendancePercent: 90,
      schedule: 'Tue / Thu 03:30 PM - 05:00 PM',
      room: 'Business Pavilion 201',
      progressPercent: 80,
    }
  ]
};

export const DEFAULT_FACULTY_USER: FacultyUser = {
  facultyId: 'FAC2026CS01',
  name: 'Dr. Evelyn Vance',
  email: 'e.vance@eduvora.edu',
  department: 'Computer Science & AI',
  designation: 'Professor & Dean of Computing',
  cabin: 'Alan Turing Block - 402',
  assignedCourses: ['CS601: Deep Neural Architectures', 'CS604L: AI Lab', 'CS501: Matrix Theory'],
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
};

export const INITIAL_LOGIN_HISTORY: LoginHistoryEntry[] = [
  {
    id: 'sess-curr',
    timestamp: '2026-08-21 09:28 AM',
    ip: '192.0.2.148',
    device: 'Apple MacBook Pro M2 Max',
    browser: 'Google Chrome 127.0 (macOS)',
    os: 'macOS Sonoma 14.5',
    location: 'Silicon Valley, CA, USA',
    status: 'Active Session',
    isCurrent: true,
  },
  {
    id: 'sess-1',
    timestamp: '2026-08-20 03:45 PM',
    ip: '172.56.21.84',
    device: 'Apple iPhone 15 Pro',
    browser: 'Mobile Safari 17.4',
    os: 'iOS 17.5.1',
    location: 'Eduvora Campus Wi-Fi, CA',
    status: 'Ended',
    isCurrent: false,
  },
  {
    id: 'sess-2',
    timestamp: '2026-08-18 10:12 AM',
    ip: '192.0.2.148',
    device: 'Apple MacBook Pro M2 Max',
    browser: 'Google Chrome 127.0 (macOS)',
    os: 'macOS Sonoma 14.5',
    location: 'Silicon Valley, CA, USA',
    status: 'Ended',
    isCurrent: false,
  },
  {
    id: 'sess-3',
    timestamp: '2026-08-14 08:30 PM',
    ip: '104.28.19.44',
    device: 'Dell XPS 15 Workstation',
    browser: 'Mozilla Firefox 128.0',
    os: 'Linux Ubuntu 24.04',
    location: 'Eduvora Central Library Terminals',
    status: 'Ended',
    isCurrent: false,
  }
];

export const PORTAL_NOTICES: PortalNotice[] = [
  {
    id: 'pn-1',
    title: 'Schedule for End-Semester Examinations (November/December 2026)',
    date: 'August 19, 2026',
    category: 'Examinations',
    priority: 'Urgent',
    author: 'Office of the Controller of Examinations',
    referenceNo: 'COE/NOT/2026/884',
    content: 'The official timetable for Semester VI End-Semester Examinations has been notified. Students are required to download their verified Hall Tickets and verify all subject codes before October 15, 2026. Hall tickets will not be issued without 75% minimum aggregate attendance.',
    fileSize: '1.4 MB PDF',
    isNew: true,
  },
  {
    id: 'pn-2',
    title: 'Notification Regarding Photocopy & Revaluation for Semester V Re-Appears',
    date: 'August 14, 2026',
    category: 'Examinations',
    priority: 'High',
    author: 'Evaluation & Records Wing',
    referenceNo: 'COE/REV/2026/102',
    content: 'Candidates who appeared in the Summer Supplementary / Semester V Regular examinations can apply for evaluated answer script photocopies through the Student Portal till August 30, 2026. Revaluation windows will open immediately after photocopy dispatch.',
    fileSize: '840 KB PDF',
    isNew: true,
  },
  {
    id: 'pn-3',
    title: 'Fall 2026 Semester Examination Fee Registration Deadline',
    date: 'August 10, 2026',
    category: 'Fees',
    priority: 'High',
    author: 'Bursar & Finance Division',
    referenceNo: 'BUR/FEES/2026/419',
    content: 'All undergraduate and postgraduate scholars must complete subject registration and exam fee clearance through the Exam Apply portal. Late fee penalty of $35 will apply after September 15, 2026.',
    fileSize: '620 KB PDF',
  },
  {
    id: 'pn-4',
    title: 'Academic Advisory on Continuous Internal Evaluation (CIE) Weights',
    date: 'July 28, 2026',
    category: 'Academic',
    priority: 'Normal',
    author: 'Dean of Academic Affairs',
    referenceNo: 'ACA/CIE/2026/091',
    content: 'As per revised Academic Council guidelines, internal assessments constitute 40% (2 Mid-term tests + 2 Quizzes + Lab Practicum) and Semester End Exams constitute 60% of the aggregate grade.',
    fileSize: '510 KB PDF',
  }
];

export const DEFAULT_HALL_TICKET: HallTicketData = {
  hallTicketNo: 'HT-2026-FALL-CS104',
  examSession: 'Autumn / End-Semester Examinations 2026',
  academicYear: '2026 - 2027',
  studentId: 'EDV2026CS104',
  rollNumber: '2026-CS-104',
  studentName: 'Alex Morgan',
  degree: 'Bachelor of Technology (B.Tech)',
  department: 'Computer Science & AI',
  semester: 6,
  centerCode: 'EDV-CTR-01',
  centerName: 'Eduvora Main Academic Campus, Alan Turing Examination Block, Hall 3',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  signatureUrl: 'https://api.iconify.design/fluent-emoji-flat:pen.svg',
  qrCodeData: 'https://eduvora.edu/verify/admit/EDV2026CS104-HT-2026-FALL',
  barcodeData: '*EDV2026CS104HT2026FALL*',
  issuedDate: '18-Aug-2026',
  controllerSignUrl: 'Dr. Robert C. Lang, Controller of Examinations',
  timetable: [
    {
      subjectCode: 'CS601',
      subjectName: 'Deep Neural Architectures & Transformer LLMs',
      examDate: '2026-11-16',
      session: 'Forenoon (09:30 AM - 12:30 PM)',
      hallNo: 'Turing Hall 301',
      seatNo: 'Desk #34-A',
      reportingTime: '08:45 AM',
    },
    {
      subjectCode: 'CS602',
      subjectName: 'Distributed Cloud Storage & High-Concurrency Systems',
      examDate: '2026-11-19',
      session: 'Forenoon (09:30 AM - 12:30 PM)',
      hallNo: 'Turing Hall 301',
      seatNo: 'Desk #34-A',
      reportingTime: '08:45 AM',
    },
    {
      subjectCode: 'CS603',
      subjectName: 'Compiler Optimization & Quantum Computing Foundations',
      examDate: '2026-11-23',
      session: 'Forenoon (09:30 AM - 12:30 PM)',
      hallNo: 'Turing Hall 301',
      seatNo: 'Desk #34-A',
      reportingTime: '08:45 AM',
    },
    {
      subjectCode: 'MGT610',
      subjectName: 'Technology Commercialization & Venture Capital Strategy',
      examDate: '2026-11-26',
      session: 'Afternoon (02:00 PM - 05:00 PM)',
      hallNo: 'Business Block 102',
      seatNo: 'Desk #12-C',
      reportingTime: '01:15 PM',
    },
    {
      subjectCode: 'CS604L',
      subjectName: 'Applied AI & Autonomous Agent Systems Lab (Practical Viva)',
      examDate: '2026-11-30',
      session: 'Forenoon (09:30 AM - 12:30 PM)',
      hallNo: 'Robotics & AI Lab B',
      seatNo: 'Workstation 08',
      reportingTime: '08:45 AM',
    }
  ],
  instructions: [
    'Candidates must occupy their allotted seats 15 minutes before the commencement of examination.',
    'No candidate will be admitted into the examination hall after 30 minutes from the start time.',
    'Programmable calculators, mobile phones, smartwatches, and unauthorized electronics are strictly prohibited.',
    'Candidates must bring this Hall Ticket along with their official University Identity Smart Card.',
    'Any discrepancy in candidate details must be brought to the notice of the Controller of Examinations immediately.'
  ]
};

export const SEMESTER_RESULTS_DATA: SemesterResult[] = [
  {
    semester: 6,
    semesterTitle: 'Semester VI — Spring 2026 (Provisional)',
    examHeldMonthYear: 'May / June 2026',
    publishedDate: 'July 15, 2026',
    sgpa: 9.15,
    cgpa: 8.92,
    totalCredits: 22,
    earnedCredits: 22,
    resultStatus: 'PASSED - FIRST CLASS WITH DISTINCTION',
    subjects: [
      { code: 'CS601', name: 'Deep Neural Architectures & Transformer LLMs', credits: 4, internalMarks: 38, maxInternal: 40, externalMarks: 54, maxExternal: 60, totalMarks: 92, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'CS602', name: 'Distributed Cloud Storage & Concurrency', credits: 4, internalMarks: 36, maxInternal: 40, externalMarks: 50, maxExternal: 60, totalMarks: 86, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS603', name: 'Compiler Optimization & Quantum Computing', credits: 4, internalMarks: 35, maxInternal: 40, externalMarks: 48, maxExternal: 60, totalMarks: 83, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS604L', name: 'Applied AI & Autonomous Agent Systems Lab', credits: 2, internalMarks: 39, maxInternal: 40, externalMarks: 58, maxExternal: 60, totalMarks: 97, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'MGT610', name: 'Technology Commercialization & Venture Capital', credits: 3, internalMarks: 34, maxInternal: 40, externalMarks: 47, maxExternal: 60, totalMarks: 81, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS605', name: 'Information Security & Blockchain Protocols', credits: 3, internalMarks: 33, maxInternal: 40, externalMarks: 44, maxExternal: 60, totalMarks: 77, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'INT601', name: 'Summer Research Internship Defense', credits: 2, internalMarks: 38, maxInternal: 40, externalMarks: 56, maxExternal: 60, totalMarks: 94, gradePoint: 10, letterGrade: 'O', result: 'PASS' }
    ]
  },
  {
    semester: 5,
    semesterTitle: 'Semester V — Autumn 2025',
    examHeldMonthYear: 'November / December 2025',
    publishedDate: 'January 22, 2026',
    sgpa: 8.85,
    cgpa: 8.87,
    totalCredits: 22,
    earnedCredits: 22,
    resultStatus: 'PASSED - FIRST CLASS WITH DISTINCTION',
    subjects: [
      { code: 'CS501', name: 'Operating Systems & Kernel Architecture', credits: 4, internalMarks: 35, maxInternal: 40, externalMarks: 49, maxExternal: 60, totalMarks: 84, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS502', name: 'Database Management Systems & NoSQL', credits: 4, internalMarks: 37, maxInternal: 40, externalMarks: 51, maxExternal: 60, totalMarks: 88, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS503', name: 'Design and Analysis of Algorithms', credits: 4, internalMarks: 34, maxInternal: 40, externalMarks: 45, maxExternal: 60, totalMarks: 79, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'CS504L', name: 'Kernel & Database Systems Lab', credits: 2, internalMarks: 39, maxInternal: 40, externalMarks: 55, maxExternal: 60, totalMarks: 94, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'CS505', name: 'Computer Networks & Socket Programming', credits: 3, internalMarks: 36, maxInternal: 40, externalMarks: 48, maxExternal: 60, totalMarks: 84, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'MAT501', name: 'Discrete Mathematics & Graph Theory', credits: 3, internalMarks: 32, maxInternal: 40, externalMarks: 42, maxExternal: 60, totalMarks: 74, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'HUM502', name: 'Professional Ethics & Intellectual Property Rights', credits: 2, internalMarks: 36, maxInternal: 40, externalMarks: 50, maxExternal: 60, totalMarks: 86, gradePoint: 9, letterGrade: 'A+', result: 'PASS' }
    ]
  },
  {
    semester: 4,
    semesterTitle: 'Semester IV — Spring 2025',
    examHeldMonthYear: 'May / June 2025',
    publishedDate: 'July 18, 2025',
    sgpa: 8.90,
    cgpa: 8.88,
    totalCredits: 20,
    earnedCredits: 20,
    resultStatus: 'PASSED - FIRST CLASS WITH DISTINCTION',
    subjects: [
      { code: 'CS401', name: 'Object Oriented Programming with Java & C++', credits: 4, internalMarks: 37, maxInternal: 40, externalMarks: 53, maxExternal: 60, totalMarks: 90, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'CS402', name: 'Computer Organization & Architecture', credits: 4, internalMarks: 33, maxInternal: 40, externalMarks: 46, maxExternal: 60, totalMarks: 79, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'CS403', name: 'Theory of Computation & Automata', credits: 3, internalMarks: 36, maxInternal: 40, externalMarks: 49, maxExternal: 60, totalMarks: 85, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS404L', name: 'Software Development & Version Control Lab', credits: 2, internalMarks: 38, maxInternal: 40, externalMarks: 57, maxExternal: 60, totalMarks: 95, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'MAT401', name: 'Probability, Random Variables & Statistics', credits: 4, internalMarks: 35, maxInternal: 40, externalMarks: 47, maxExternal: 60, totalMarks: 82, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'ENV401', name: 'Environmental Science & Sustainability Engineering', credits: 3, internalMarks: 38, maxInternal: 40, externalMarks: 52, maxExternal: 60, totalMarks: 90, gradePoint: 10, letterGrade: 'O', result: 'PASS' }
    ]
  },
  {
    semester: 3,
    semesterTitle: 'Semester III — Autumn 2024',
    examHeldMonthYear: 'November / December 2024',
    publishedDate: 'January 28, 2025',
    sgpa: 8.75,
    cgpa: 8.87,
    totalCredits: 20,
    earnedCredits: 20,
    resultStatus: 'PASSED - FIRST CLASS WITH DISTINCTION',
    subjects: [
      { code: 'CS301', name: 'Data Structures & Algorithms in C++', credits: 4, internalMarks: 36, maxInternal: 40, externalMarks: 50, maxExternal: 60, totalMarks: 86, gradePoint: 9, letterGrade: 'A+', result: 'PASS' },
      { code: 'CS302', name: 'Digital Logic & Microprocessor Design', credits: 4, internalMarks: 34, maxInternal: 40, externalMarks: 45, maxExternal: 60, totalMarks: 79, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'MAT301', name: 'Linear Algebra & Numerical Methods', credits: 4, internalMarks: 38, maxInternal: 40, externalMarks: 52, maxExternal: 60, totalMarks: 90, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'CS303L', name: 'Data Structures Practicum Lab', credits: 2, internalMarks: 39, maxInternal: 40, externalMarks: 56, maxExternal: 60, totalMarks: 95, gradePoint: 10, letterGrade: 'O', result: 'PASS' },
      { code: 'ECE304', name: 'Analog Electronic Circuits & Signals', credits: 3, internalMarks: 31, maxInternal: 40, externalMarks: 43, maxExternal: 60, totalMarks: 74, gradePoint: 8, letterGrade: 'A', result: 'PASS' },
      { code: 'HUM301', name: 'Economics for Engineers & Technocrats', credits: 3, internalMarks: 35, maxInternal: 40, externalMarks: 47, maxExternal: 60, totalMarks: 82, gradePoint: 9, letterGrade: 'A+', result: 'PASS' }
    ]
  }
];

export const INITIAL_EXAM_SUBJECTS: SubjectExamItem[] = [
  { code: 'CS601', name: 'Deep Neural Architectures & Transformer LLMs', semester: 6, credits: 4, type: 'Regular', fee: 25, selected: true, instructor: 'Dr. Evelyn Vance' },
  { code: 'CS602', name: 'Distributed Cloud Storage & High-Concurrency Systems', semester: 6, credits: 4, type: 'Regular', fee: 25, selected: true, instructor: 'Prof. Liam O\'Connor' },
  { code: 'CS603', name: 'Compiler Optimization & Quantum Computing Foundations', semester: 6, credits: 4, type: 'Regular', fee: 25, selected: true, instructor: 'Dr. Marcus Holloway' },
  { code: 'MGT610', name: 'Technology Commercialization & Venture Capital Strategy', semester: 6, credits: 3, type: 'Elective', fee: 20, selected: true, instructor: 'Prof. Alistair Sterling' },
  { code: 'CS604L', name: 'Applied AI & Autonomous Agent Systems Lab (Practical)', semester: 6, credits: 2, type: 'Practical', fee: 30, selected: true, instructor: 'Dr. Evelyn Vance' },
  { code: 'CS503-B', name: 'Design and Analysis of Algorithms (Improvement/Backlog)', semester: 5, credits: 4, type: 'Backlog', fee: 35, selected: false, instructor: 'Prof. Sarah Jenkins' }
];

export const INITIAL_EXAM_APPLICATIONS: ExamApplicationRecord[] = [
  {
    applicationNo: 'EXAM-APP-2026-6019',
    semester: 6,
    academicYear: '2026 - 2027',
    appliedDate: 'August 16, 2026',
    subjects: INITIAL_EXAM_SUBJECTS.filter(s => s.selected),
    totalFee: 125,
    paymentStatus: 'Paid',
    paymentRef: 'TXN_EDV_89201948',
    paymentMode: 'University Student Smart Account / Card',
    hallTicketGenerated: true,
  }
];

export const INITIAL_PHOTOCOPY_REQUESTS: PhotocopyRequest[] = [
  {
    id: 'pc-01',
    applicationNo: 'PC-2026-5501',
    appliedDate: 'August 08, 2026',
    semester: 5,
    totalFee: 40,
    paymentStatus: 'Paid',
    downloadExpiryDate: 'September 15, 2026',
    subjects: [
      {
        code: 'CS503',
        name: 'Design and Analysis of Algorithms',
        fee: 20,
        status: 'Script Available',
        scriptUrl: 'https://eduvora.edu/vault/scripts/CS503-EDV2026CS104.pdf',
        examinerNotes: 'Section A: Q1-Q5 evaluated fully (18/20). Section B: Dynamic programming proof awarded 14/20. Section C: Branch & Bound tree awarded 13/20.',
        questionScores: [
          { qNo: 'Part A (Q1 - Q5)', maxMarks: 20, awardedMarks: 18, remarks: 'Accurate asymptotic complexity derivations.' },
          { qNo: 'Part B (Q6 - Q8)', maxMarks: 20, awardedMarks: 14, remarks: 'Memoization table state transition partially missing induction base case.' },
          { qNo: 'Part C (Q9 - Q10)', maxMarks: 20, awardedMarks: 13, remarks: 'Traveling Salesperson lower bound bounding function correctly shown.' }
        ]
      },
      {
        code: 'MAT501',
        name: 'Discrete Mathematics & Graph Theory',
        fee: 20,
        status: 'Script Available',
        scriptUrl: 'https://eduvora.edu/vault/scripts/MAT501-EDV2026CS104.pdf',
        examinerNotes: 'All questions evaluated. Planar graph theorem proof evaluated with 8/10 marks.',
        questionScores: [
          { qNo: 'Part A (Q1 - Q5)', maxMarks: 20, awardedMarks: 16, remarks: 'Good set theory and bijection proofs.' },
          { qNo: 'Part B (Q6 - Q8)', maxMarks: 20, awardedMarks: 14, remarks: 'Eulerian path conditions verified.' },
          { qNo: 'Part C (Q9 - Q10)', maxMarks: 20, awardedMarks: 12, remarks: 'Chromatic polynomial computation verified.' }
        ]
      }
    ]
  }
];

export const INITIAL_REVALUATION_REQUESTS: RevaluationRequest[] = [
  {
    id: 'rev-01',
    applicationNo: 'REV-2026-8802',
    appliedDate: 'August 12, 2026',
    semester: 5,
    totalFee: 50,
    paymentStatus: 'Paid',
    remarks: 'Re-evaluation conducted by Senior Valuation Board. Marks in CS503 upgraded by +8 marks after reviewing step marks in dynamic programming question.',
    subjects: [
      {
        code: 'CS503',
        name: 'Design and Analysis of Algorithms',
        originalMarks: 79,
        originalGrade: 'A (Grade Pt: 8)',
        revaluedMarks: 87,
        revaluedGrade: 'A+ (Grade Pt: 9)',
        fee: 50,
        diffStatus: 'Grade Improved (+8 Marks)',
        status: 'Published',
        updatedAt: 'August 17, 2026'
      }
    ]
  }
];

export const INITIAL_REVIEW_REQUESTS: ReviewRequest[] = [
  {
    id: 'chk-01',
    applicationNo: 'BRD-REV-2026-101',
    appliedDate: 'August 14, 2026',
    semester: 5,
    subjectCode: 'MAT501',
    subjectName: 'Discrete Mathematics & Graph Theory',
    fee: 75,
    reason: 'Challenge valuation requested for Eulerian recurrence proof in Question 9.',
    status: 'Under Chief Examiner Committee',
    resolutionOutcome: 'Special Committee of 3 Deans is reviewing the script. Hearing scheduled on Aug 28, 2026.',
    feeRefundStatus: 'Pending'
  }
];

export const INITIAL_GRIEVANCES: GrievanceTicket[] = [
  {
    id: 'grv-1',
    ticketNumber: 'GRV-2026-8419',
    category: 'Examinations & Hall Ticket',
    subject: 'Seat Allotment Clashing with Elective Practical Schedule',
    description: 'My elective lab exam for CS604L was previously indicated on Nov 30, but the portal timetable shows a potential 30-minute overlap with MGT610 review. Kindly clarify the venue timings.',
    priority: 'High',
    status: 'Resolved',
    createdAt: '2026-08-16 11:30 AM',
    lastUpdated: '2026-08-17 04:15 PM',
    assignedOfficer: 'Prof. Liam O\'Connor (Chief Superintendent)',
    messages: [
      {
        id: 'msg-1',
        sender: 'Student',
        text: 'Hello Exam Cell, I noticed a tentative timing clash between CS604L and the elective presentation. Could you please confirm the staggered batch slots?',
        timestamp: '2026-08-16 11:30 AM',
      },
      {
        id: 'msg-2',
        sender: 'Controller of Examinations',
        text: 'Dear Alex, CS604L practicals have been divided into Batch 1 (09:00 AM - 12:00 PM) and Batch 2 (01:00 PM - 04:00 PM). As per your roll number (EDV2026CS104), your allocated slot is Forenoon Batch 1. You will have a 2-hour break before MGT610 at 02:00 PM. The updated hall ticket reflects this.',
        timestamp: '2026-08-17 04:15 PM',
      }
    ]
  },
  {
    id: 'grv-2',
    ticketNumber: 'GRV-2026-9022',
    category: 'Marksheet Discrepancy',
    subject: 'Request to update revised grade on official DigiLocker transcript',
    description: 'Following the successful revaluation in CS503 where my grade was upgraded from A to A+, I request the Registrar to push the updated provisional grade card to the National Academic Depository (NAD / DigiLocker).',
    priority: 'Normal',
    status: 'Under Investigation',
    createdAt: '2026-08-18 02:10 PM',
    lastUpdated: '2026-08-19 10:00 AM',
    assignedOfficer: 'Academic Records Officer (Mr. David Vance)',
    messages: [
      {
        id: 'msg-3',
        sender: 'Student',
        text: 'Good day, please sync the updated grade for CS503 (87/100, A+) with the central DigiLocker transcript database.',
        timestamp: '2026-08-18 02:10 PM'
      },
      {
        id: 'msg-4',
        sender: 'Academic Registrar',
        text: 'Your request has been logged. The bi-weekly batch sync to the DigiLocker repository will execute on Friday, August 22. You will receive an automated SMS confirmation.',
        timestamp: '2026-08-19 10:00 AM'
      }
    ]
  }
];
