export interface StudentProfileData {
  studentId: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  emergencyContact: string;
  address: string;
  bloodGroup: string;
  program: string;
  department: string;
  semester: number;
  batch: string;
  academicAdvisor: string;
  enrollmentDate: string;
  cgpa: number;
  creditsEarned: number;
  totalCredits: number;
  attendancePercentage: number;
  category: string;
  status: 'Active Regular' | 'Probation' | 'Alumni';
  quota: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'Examinations' | 'Academic' | 'Fees' | 'Results' | 'General';
  date: string;
  isUrgent: boolean;
  referenceNo: string;
  description: string;
  pdfFileSize: string;
  author: string;
}

export interface SubjectRegistration {
  code: string;
  title: string;
  credits: number;
  type: 'Theory' | 'Practical' | 'Elective' | 'Arrear';
  fee: number;
  examDate: string;
  session: 'Morning (09:30 AM - 12:30 PM)' | 'Afternoon (02:00 PM - 05:00 PM)';
  selected: boolean;
  internalMarks: number;
  maxInternal: number;
}

export interface HallTicketData {
  hallTicketNumber: string;
  studentId: string;
  studentName: string;
  examCenter: string;
  centerCode: string;
  seatNumber: string;
  semester: string;
  academicYear: string;
  controllerOfExams: string;
  issueDate: string;
  timetable: {
    subjectCode: string;
    subjectName: string;
    date: string;
    day: string;
    time: string;
    hallNo: string;
    invigilatorSign: boolean;
  }[];
  instructions: string[];
}

export interface SemesterMarksheet {
  semester: number;
  semesterName: string;
  examMonthYear: string;
  resultDate: string;
  status: 'PASS' | 'FAIL' | 'WITHHELD';
  sgpa: number;
  cgpaCumulative: number;
  totalCredits: number;
  subjects: {
    code: string;
    name: string;
    credits: number;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    maxMarks: number;
    grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'RA' | 'AB';
    gradePoint: number;
    result: 'PASS' | 'FAIL';
  }[];
}

export interface PhotocopyRequest {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  appliedDate: string;
  feePaid: number;
  status: 'Submitted' | 'In Processing' | 'Ready to View' | 'Expired';
  evaluatorRemarks: string;
  watermarkedPdfUrl?: string;
  totalPages: number;
  marksObtained: number;
}

export interface RevaluationRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  appliedDate: string;
  originalMarks: number;
  originalGrade: string;
  revisedMarks?: number;
  revisedGrade?: string;
  markDifference?: number;
  status: 'Under Evaluation' | 'Completed' | 'No Change' | 'Grade Upgraded';
  fee: number;
  resolvedDate?: string;
  remarks: string;
}

export interface ReviewRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  semester: number;
  appliedDate: string;
  boardChair: string;
  status: 'Committee Assigned' | 'Under Review' | 'Board Decision Finalized';
  initialOutcome: string;
  finalDecision: string;
  remarks: string;
}

export interface GrievanceTicket {
  id: string;
  category: 'Examination' | 'Hall Ticket' | 'Evaluation' | 'Fee & Payment' | 'Portal Bug';
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  updatedAt: string;
  assignedOfficer: string;
  responses: {
    sender: 'student' | 'officer';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface LoginAuditSession {
  id: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  timestamp: string;
  isCurrent: boolean;
  status: 'Active' | 'Logged Out';
}

// Initial Mock Datasets
export const initialStudentProfile: StudentProfileData = {
  studentId: 'EDV2026CS104',
  name: 'Aarav Sharma',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  email: 'aarav.sharma@student.eduvora.edu',
  phone: '+91 98450 12894',
  emergencyContact: '+91 94432 89011 (Parent)',
  address: 'Block 4, Flat 302, Green Valley Enclave, Innovation Way, Tech City - 600113',
  bloodGroup: 'O+ Positive',
  program: 'Bachelor of Technology (B.Tech - Honors)',
  department: 'Computer Science & Artificial Intelligence',
  semester: 6,
  batch: '2023 - 2027',
  academicAdvisor: 'Prof. Dr. Arvind Krishnamurthy (Dean of Academic Affairs)',
  enrollmentDate: 'August 12, 2023',
  cgpa: 8.92,
  creditsEarned: 134,
  totalCredits: 160,
  attendancePercentage: 92.4,
  category: 'General / Merit',
  status: 'Active Regular',
  quota: 'State Level Entrance Rank #142',
};

export const initialNotices: NoticeItem[] = [
  {
    id: 'NOT-2026-089',
    title: 'Final Examination Schedule & Hall Ticket Issuance for Semester 6 (Spring 2026)',
    category: 'Examinations',
    date: 'August 18, 2026',
    isUrgent: true,
    referenceNo: 'EDV/COE/2026/08-089',
    description: 'End Semester Theory & Practical examinations commence from Sept 10, 2026. Students must clear library dues and complete subject exam registration before Aug 30, 2026.',
    pdfFileSize: '1.4 MB',
    author: 'Office of Controller of Examinations'
  },
  {
    id: 'NOT-2026-084',
    title: 'Publication of Semester 5 Revaluation & Review Challenge Valuation Results',
    category: 'Results',
    date: 'August 12, 2026',
    isUrgent: false,
    referenceNo: 'EDV/COE/2026/08-084',
    description: 'Updated provisional marksheets for students who applied for Revaluation & Review in June 2026 have been synchronized in the Student Portal.',
    pdfFileSize: '820 KB',
    author: 'Evaluation Board Registry'
  },
  {
    id: 'NOT-2026-079',
    title: 'Standard Operating Procedures for Answer Book Photocopy Procurement',
    category: 'Examinations',
    date: 'August 05, 2026',
    isUrgent: false,
    referenceNo: 'EDV/EXAM/2026/08-079',
    description: 'Guidelines on obtaining digital watermarked copies of evaluated answer books, fee payment details, and revaluation eligibility rules.',
    pdfFileSize: '2.1 MB',
    author: 'Academic Council'
  },
  {
    id: 'NOT-2026-072',
    title: 'Semester Registration Fee Payment & Examination Application Portal Extension',
    category: 'Fees',
    date: 'July 29, 2026',
    isUrgent: false,
    referenceNo: 'EDV/FIN/2026/07-072',
    description: 'Online examination registration fee deadline extended till Aug 30, 2026 with no late penal fee.',
    pdfFileSize: '650 KB',
    author: 'Finance & Accounts Bureau'
  },
  {
    id: 'NOT-2026-068',
    title: 'Academic Calendar Revision: Mid-Term Assessments & Technical Symposium Dates',
    category: 'Academic',
    date: 'July 15, 2026',
    isUrgent: false,
    referenceNo: 'EDV/ACAD/2026/07-068',
    description: 'Schedule for intra-university project demonstrations, capstone review milestones, and industrial internships.',
    pdfFileSize: '950 KB',
    author: 'Dean of Student Affairs'
  }
];

export const initialAvailableSubjects: SubjectRegistration[] = [
  {
    code: 'CS601',
    title: 'Deep Learning & Neural Network Architectures',
    credits: 4,
    type: 'Theory',
    fee: 450,
    examDate: '10 Sep 2026',
    session: 'Morning (09:30 AM - 12:30 PM)',
    selected: true,
    internalMarks: 38,
    maxInternal: 40
  },
  {
    code: 'CS602',
    title: 'Distributed Cloud Systems & Microservices',
    credits: 4,
    type: 'Theory',
    fee: 450,
    examDate: '14 Sep 2026',
    session: 'Morning (09:30 AM - 12:30 PM)',
    selected: true,
    internalMarks: 36,
    maxInternal: 40
  },
  {
    code: 'CS603',
    title: 'Information Security, Cryptography & Blockchain',
    credits: 3,
    type: 'Theory',
    fee: 450,
    examDate: '18 Sep 2026',
    session: 'Afternoon (02:00 PM - 05:00 PM)',
    selected: true,
    internalMarks: 37,
    maxInternal: 40
  },
  {
    code: 'CS604',
    title: 'Natural Language Processing & LLM Fine-Tuning (Elective)',
    credits: 3,
    type: 'Elective',
    fee: 450,
    examDate: '22 Sep 2026',
    session: 'Morning (09:30 AM - 12:30 PM)',
    selected: true,
    internalMarks: 39,
    maxInternal: 40
  },
  {
    code: 'CS605P',
    title: 'Autonomous AI Agents Laboratory & Capstone Demo',
    credits: 2,
    type: 'Practical',
    fee: 600,
    examDate: '26 Sep 2026',
    session: 'Morning (09:30 AM - 12:30 PM)',
    selected: true,
    internalMarks: 58,
    maxInternal: 60
  },
  {
    code: 'CS606P',
    title: 'Cloud DevOps & Container Orchestration Lab',
    credits: 2,
    type: 'Practical',
    fee: 600,
    examDate: '28 Sep 2026',
    session: 'Afternoon (02:00 PM - 05:00 PM)',
    selected: true,
    internalMarks: 56,
    maxInternal: 60
  }
];

export const initialHallTicket: HallTicketData = {
  hallTicketNumber: 'HT-2026-SEM6-104882',
  studentId: 'EDV2026CS104',
  studentName: 'Aarav Sharma',
  examCenter: 'Eduvora Main Campus - Sir C.V. Raman Examination Block (Block C)',
  centerCode: 'EDV-CTR-01',
  seatNumber: 'DESK-C3-14',
  semester: 'Semester 6 (Final End-Term)',
  academicYear: '2025-2026',
  controllerOfExams: 'Dr. R. Sundaresan, M.Tech, Ph.D.',
  issueDate: 'August 19, 2026',
  timetable: [
    {
      subjectCode: 'CS601',
      subjectName: 'Deep Learning & Neural Network Architectures',
      date: '10-09-2026',
      day: 'Thursday',
      time: '09:30 AM - 12:30 PM',
      hallNo: 'Hall C-302',
      invigilatorSign: true,
    },
    {
      subjectCode: 'CS602',
      subjectName: 'Distributed Cloud Systems & Microservices',
      date: '14-09-2026',
      day: 'Monday',
      time: '09:30 AM - 12:30 PM',
      hallNo: 'Hall C-302',
      invigilatorSign: true,
    },
    {
      subjectCode: 'CS603',
      subjectName: 'Information Security, Cryptography & Blockchain',
      date: '18-09-2026',
      day: 'Friday',
      time: '02:00 PM - 05:00 PM',
      hallNo: 'Hall C-304',
      invigilatorSign: true,
    },
    {
      subjectCode: 'CS604',
      subjectName: 'Natural Language Processing & LLM Fine-Tuning',
      date: '22-09-2026',
      day: 'Tuesday',
      time: '09:30 AM - 12:30 PM',
      hallNo: 'Hall C-302',
      invigilatorSign: true,
    },
    {
      subjectCode: 'CS605P',
      subjectName: 'Autonomous AI Agents Laboratory & Capstone Demo',
      date: '26-09-2026',
      day: 'Saturday',
      time: '09:30 AM - 12:30 PM',
      hallNo: 'AI Lab Complex 2',
      invigilatorSign: true,
    },
    {
      subjectCode: 'CS606P',
      subjectName: 'Cloud DevOps & Container Orchestration Lab',
      date: '28-09-2026',
      day: 'Monday',
      time: '02:00 PM - 05:00 PM',
      hallNo: 'DevOps Server Lab',
      invigilatorSign: true,
    }
  ],
  instructions: [
    'Candidates must report to the examination hall at least 30 minutes before the scheduled commencement.',
    'Strictly produce this original Hall Ticket along with valid Eduvora University Student ID card.',
    'Mobile phones, programmable calculators, smart watches, and digital storage media are strictly prohibited.',
    'No candidate will be allowed to leave the examination hall during the first 60 minutes of the examination.',
    'Tampering with the barcode or invigilator signature will result in immediate disqualification.'
  ]
};

export const sampleSemestersMarks: SemesterMarksheet[] = [
  {
    semester: 5,
    semesterName: 'Semester 5 (Fall 2025)',
    examMonthYear: 'December 2025',
    resultDate: 'January 24, 2026',
    status: 'PASS',
    sgpa: 9.14,
    cgpaCumulative: 8.92,
    totalCredits: 22,
    subjects: [
      { code: 'CS501', name: 'Design and Analysis of Algorithms', credits: 4, internalMarks: 38, externalMarks: 56, totalMarks: 94, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS502', name: 'Artificial Intelligence & Search Logic', credits: 4, internalMarks: 37, externalMarks: 52, totalMarks: 89, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: 'CS503', name: 'Database Engineering & High-Scale SQL', credits: 4, internalMarks: 39, externalMarks: 54, totalMarks: 93, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS504', name: 'Computer Networks & Socket Protocol', credits: 3, internalMarks: 35, externalMarks: 48, totalMarks: 83, maxMarks: 100, grade: 'A', gradePoint: 8, result: 'PASS' },
      { code: 'CS505P', name: 'Algorithms & AI Sandbox Lab', credits: 2, internalMarks: 58, externalMarks: 38, totalMarks: 96, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS506P', name: 'Full-Stack Database Application Lab', credits: 2, internalMarks: 57, externalMarks: 36, totalMarks: 93, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'HS507', name: 'Engineering Economics & Tech Ethics', credits: 3, internalMarks: 36, externalMarks: 49, totalMarks: 85, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
    ]
  },
  {
    semester: 4,
    semesterName: 'Semester 4 (Spring 2025)',
    examMonthYear: 'May 2025',
    resultDate: 'June 28, 2025',
    status: 'PASS',
    sgpa: 8.86,
    cgpaCumulative: 8.85,
    totalCredits: 23,
    subjects: [
      { code: 'CS401', name: 'Operating Systems & Kernel Internals', credits: 4, internalMarks: 36, externalMarks: 50, totalMarks: 86, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: 'CS402', name: 'Software Engineering & Agile Architectures', credits: 3, internalMarks: 38, externalMarks: 52, totalMarks: 90, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS403', name: 'Theory of Computation & Automata', credits: 4, internalMarks: 34, externalMarks: 46, totalMarks: 80, maxMarks: 100, grade: 'A', gradePoint: 8, result: 'PASS' },
      { code: 'MA404', name: 'Probability, Statistics & Stochastic Process', credits: 4, internalMarks: 37, externalMarks: 50, totalMarks: 87, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: 'CS405P', name: 'Operating Systems & Shell Lab', credits: 2, internalMarks: 56, externalMarks: 36, totalMarks: 92, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS406P', name: 'Microprocessor & Embedded Systems Lab', credits: 2, internalMarks: 54, externalMarks: 34, totalMarks: 88, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
    ]
  },
  {
    semester: 3,
    semesterName: 'Semester 3 (Fall 2024)',
    examMonthYear: 'December 2024',
    resultDate: 'January 18, 2025',
    status: 'PASS',
    sgpa: 8.78,
    cgpaCumulative: 8.84,
    totalCredits: 22,
    subjects: [
      { code: 'CS301', name: 'Data Structures & OOP with C++', credits: 4, internalMarks: 38, externalMarks: 51, totalMarks: 89, maxMarks: 100, grade: 'A+', gradePoint: 9, result: 'PASS' },
      { code: 'CS302', name: 'Digital Logic & Computer Organization', credits: 4, internalMarks: 36, externalMarks: 47, totalMarks: 83, maxMarks: 100, grade: 'A', gradePoint: 8, result: 'PASS' },
      { code: 'MA303', name: 'Discrete Mathematics & Graph Theory', credits: 4, internalMarks: 37, externalMarks: 53, totalMarks: 90, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS304', name: 'Object Oriented Programming with Java', credits: 3, internalMarks: 39, externalMarks: 53, totalMarks: 92, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
      { code: 'CS305P', name: 'Data Structures Laboratory', credits: 2, internalMarks: 57, externalMarks: 37, totalMarks: 94, maxMarks: 100, grade: 'O', gradePoint: 10, result: 'PASS' },
    ]
  }
];

export const initialPhotocopies: PhotocopyRequest[] = [
  {
    id: 'PC-2026-041',
    subjectCode: 'CS504',
    subjectName: 'Computer Networks & Socket Protocol',
    semester: 5,
    appliedDate: '15 Feb 2026',
    feePaid: 350,
    status: 'Ready to View',
    evaluatorRemarks: 'Script verified. All 5 descriptive sections evaluated with rubric sheet attached.',
    totalPages: 24,
    marksObtained: 83
  },
  {
    id: 'PC-2026-039',
    subjectCode: 'CS403',
    subjectName: 'Theory of Computation & Automata',
    semester: 4,
    appliedDate: '10 Jul 2025',
    feePaid: 350,
    status: 'Ready to View',
    evaluatorRemarks: 'Archived script digitized with official university watermark.',
    totalPages: 20,
    marksObtained: 80
  }
];

export const initialRevaluations: RevaluationRecord[] = [
  {
    id: 'REV-2026-102',
    subjectCode: 'CS504',
    subjectName: 'Computer Networks & Socket Protocol',
    semester: 5,
    appliedDate: '20 Feb 2026',
    originalMarks: 83,
    originalGrade: 'A',
    revisedMarks: 88,
    revisedGrade: 'A+',
    markDifference: 5,
    status: 'Grade Upgraded',
    fee: 650,
    resolvedDate: '12 Mar 2026',
    remarks: 'Re-evaluation of Q4(b) protocol handshake awarded +5 marks due to missed rubric benchmark.'
  },
  {
    id: 'REV-2026-088',
    subjectCode: 'CS403',
    subjectName: 'Theory of Computation & Automata',
    semester: 4,
    appliedDate: '18 Jul 2025',
    originalMarks: 80,
    originalGrade: 'A',
    revisedMarks: 80,
    revisedGrade: 'A',
    markDifference: 0,
    status: 'No Change',
    fee: 650,
    resolvedDate: '05 Aug 2025',
    remarks: 'Evaluation was accurate and verified by senior review board.'
  }
];

export const initialReviews: ReviewRecord[] = [
  {
    id: 'BR-2026-014',
    subjectCode: 'CS504',
    subjectName: 'Computer Networks & Socket Protocol',
    semester: 5,
    appliedDate: '15 Mar 2026',
    boardChair: 'Prof. Dr. Elizabeth Vance (Controller of Quality)',
    status: 'Board Decision Finalized',
    initialOutcome: 'Revaluation concluded +5 mark increase.',
    finalDecision: 'Board Challenge upheld. Final Grade fixed at A+ (88/100). Credit points updated in central academic registry.',
    remarks: 'Resolution passed in Academic Council Review Session #44.'
  }
];

export const initialGrievances: GrievanceTicket[] = [
  {
    id: 'GRV-2026-092',
    category: 'Examination',
    subject: 'Request for Clashing Exam Session Adjustment in Elective Papers',
    description: 'My selected elective CS604 and practical demonstration CS605 were initially scheduled closely. Seeking confirmation on hall allocation.',
    priority: 'High',
    status: 'Resolved',
    createdAt: '18 Aug 2026, 11:20 AM',
    updatedAt: '19 Aug 2026, 03:45 PM',
    assignedOfficer: 'Officer K. Rajesh (Examination Support Desk)',
    responses: [
      {
        sender: 'student',
        senderName: 'Aarav Sharma',
        message: 'Hello, please confirm if the practical session CS605P reporting time has a 30-min buffer from the elective room.',
        timestamp: '18 Aug 2026, 11:20 AM'
      },
      {
        sender: 'officer',
        senderName: 'Officer K. Rajesh',
        message: 'Dear Student, your practical slot is scheduled with a 90-minute staggered buffer in AI Lab Complex 2. You may proceed normally.',
        timestamp: '19 Aug 2026, 03:45 PM'
      }
    ]
  },
  {
    id: 'GRV-2026-081',
    category: 'Evaluation',
    subject: 'Clarification on SGPA calculation in Semester 5 Provisional Marksheet',
    description: 'Seeking breakdown verification on grade weights for 4-credit vs 3-credit subjects.',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '28 Jan 2026, 10:15 AM',
    updatedAt: '30 Jan 2026, 02:00 PM',
    assignedOfficer: 'Registry Data Officer',
    responses: [
      {
        sender: 'student',
        senderName: 'Aarav Sharma',
        message: 'Kindly clarify the rounding off threshold for the SGPA calculation.',
        timestamp: '28 Jan 2026, 10:15 AM'
      },
      {
        sender: 'officer',
        senderName: 'Registry Data Officer',
        message: 'The SGPA is truncated at two decimal points according to Eduvora University 2023 Academic Regulations.',
        timestamp: '30 Jan 2026, 02:00 PM'
      }
    ]
  }
];

export const initialLoginSessions: LoginAuditSession[] = [
  {
    id: 'sess-current',
    ipAddress: '103.24.188.92 (Current Session)',
    device: 'Apple MacBook Pro (macOS 15.4)',
    browser: 'Google Chrome v128.0 (Encrypted TLS 1.3)',
    location: 'Chennai / Bangalore, India',
    timestamp: 'August 21, 2026 at 10:05 AM',
    isCurrent: true,
    status: 'Active'
  },
  {
    id: 'sess-2',
    ipAddress: '157.48.91.12',
    device: 'Apple iPhone 16 Pro (iOS 19.1)',
    browser: 'Mobile Safari v19.0',
    location: 'Chennai, India',
    timestamp: 'August 20, 2026 at 08:30 PM',
    isCurrent: false,
    status: 'Active'
  },
  {
    id: 'sess-3',
    ipAddress: '103.24.188.92',
    device: 'Dell XPS 15 (Windows 11)',
    browser: 'Microsoft Edge v127.0',
    location: 'University Campus WiFi (EDV-Secure-5G)',
    timestamp: 'August 18, 2026 at 02:15 PM',
    isCurrent: false,
    status: 'Logged Out'
  },
  {
    id: 'sess-4',
    ipAddress: '182.72.10.44',
    device: 'iPad Air 5th Gen (iPadOS 19)',
    browser: 'Mobile Safari v19.0',
    location: 'Bangalore, India',
    timestamp: 'August 14, 2026 at 11:40 AM',
    isCurrent: false,
    status: 'Logged Out'
  }
];
