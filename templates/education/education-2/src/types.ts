export type UserRole = 'student' | 'faculty';

export interface CourseGrade {
  courseCode: string;
  courseName: string;
  category: 'Core' | 'Elective' | 'Laboratory' | 'Project';
  credits: number;
  internalMarks: number; // Max 40 or 50
  externalMarks: number; // Max 60 or 50
  totalMarks: number;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'RA' | 'AB';
  gradePoint: number;
  resultStatus: 'PASS' | 'FAIL' | 'ABSENT';
}

export interface SemesterResult {
  semester: number;
  academicYear: string;
  monthYear: string;
  sgpa: number;
  cgpa: number;
  totalCreditsEarned: number;
  totalCreditsRegistered: number;
  status: 'PROMOTED' | 'PASSED' | 'WITHHELD' | 'ARREARS';
  courses: CourseGrade[];
  publishedDate: string;
}

export interface ExamSubject {
  code: string;
  name: string;
  semester: number;
  credits: number;
  type: 'Theory' | 'Practical' | 'Elective' | 'Backlog';
  fee: number;
  examDate: string;
  session: 'FN (09:30 AM - 12:30 PM)' | 'AN (02:00 PM - 05:00 PM)';
  hallNumber: string;
  deskNumber: string;
  isRegistered?: boolean;
}

export interface HallTicketData {
  admitCardNumber: string;
  studentId: string;
  studentName: string;
  registrationNumber: string;
  degree: string;
  department: string;
  semester: number;
  academicYear: string;
  examinationCentre: string;
  centreCode: string;
  examSubjects: ExamSubject[];
  issueDate: string;
  controllerOfExams: string;
  barcodeValue: string;
  qrPayload: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  category: 'Examinations' | 'Academic' | 'Fees' | 'Circulars' | 'Urgent';
  date: string;
  isUrgent?: boolean;
  isNew?: boolean;
  content: string;
  attachmentName?: string;
  attachmentSize?: string;
  issuedBy: string;
}

export interface PhotocopyRequest {
  id: string;
  subjectCode: string;
  subjectName: string;
  appliedDate: string;
  feePaid: number;
  status: 'Received' | 'Answer Sheet Retrieved' | 'Digitizing' | 'Available to Download' | 'Scanned & Dispatched' | 'Under Digitization';
  downloadUrl?: string;
  trackingRef: string;
}

export interface RevaluationRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  originalExternal: number;
  originalTotal: number;
  originalGrade: string;
  revisedExternal?: number;
  revisedTotal?: number;
  revisedGrade?: string;
  status: 'Under Evaluation' | 'Marks Upgraded' | 'No Change' | 'Review Recommended' | 'Marks Upgraded & Published';
  appliedDate: string;
  resolvedDate?: string;
  remarks?: string;
  feePaid: number;
}

export interface ReviewRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  appliedDate: string;
  boardChair: string;
  status: 'Committee Constituted' | 'Hearing Scheduled' | 'Report Submitted' | 'Grade Revised' | 'Verdict Upheld' | 'Verdict Published';
  scheduledDate?: string;
  hearingDate?: string;
  finalVerdict?: string;
  feePaid: number;
}

export interface SupportTicket {
  id: string;
  category: 'Exam Discrepancy' | 'Fee & Payment Issue' | 'Hall Ticket Correction' | 'Certificate Request' | 'General' | 'Examination' | 'Revaluation' | 'Photocopy' | 'Fee Payment';
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical' | 'Urgent';
  status: 'Open' | 'In Review' | 'Resolved' | 'Closed' | 'In Progress';
  createdDate: string;
  lastUpdated: string;
  messages: {
    sender: 'Student' | 'Support Staff' | 'Exam Cell';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface LoginSession {
  id: string;
  ipAddress: string;
  device: string;
  browser: string;
  location: string;
  timestamp: string;
  isCurrent: boolean;
  status: 'Active' | 'Logged Out' | 'Terminated';
}

export interface UserProfile {
  studentId: string;
  registrationNumber: string;
  fullName: string;
  email: string;
  personalEmail: string;
  phone: string;
  emergencyContact: string;
  guardianName: string;
  guardianPhone: string;
  department: string;
  program: string;
  degree: string;
  semester: number;
  batch: string;
  section: string;
  advisorName: string;
  advisorEmail: string;
  mentorName?: string;
  admissionYear?: string;
  dob?: string;
  cgpa: number;
  totalCredits: number;
  admissionCategory: 'Merit' | 'International' | 'Sports' | 'Institutional Scholar';
  bloodGroup: string;
  address: string;
  avatarUrl: string;
  role: UserRole;
  facultyDesignation?: string;
  enrolledCourses: {
    code: string;
    name: string;
    instructor: string;
    credits: number;
  }[];
}

// Broad compatibility interfaces for template Config & Mock Data
export interface UniversityConfig {
  name: string;
  shortName?: string;
  motto?: string;
  mottoTranslation?: string;
  established?: number;
  location?: string;
  campusSize?: string;
  studentCount?: number;
  facultyCount?: number;
  acceptanceRate?: string;
  tagline?: string;
  founded?: number;
  accreditation?: string;
  accreditations?: string[];
  [key: string]: any;
}

export interface ThemePreset {
  id: string;
  name: string;
  subtitle?: string;
  primary: string;
  primaryHover?: string;
  secondary: string;
  accent: string;
  accentHover?: string;
  gold?: string;
  surface: string;
  badge?: string;
  fontHeading?: string;
  bg?: string;
  font?: string;
  [key: string]: any;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp?: number;
  time?: string;
  read?: boolean;
  type?: 'academic' | 'admission' | 'event' | 'alert' | 'success' | 'error' | 'info' | 'warning' | string;
  [key: string]: any;
}

export type DegreeLevel = 'Undergraduate' | 'Graduate' | 'Doctoral' | 'High School' | 'Honors' | 'STEM' | 'Arts' | string;

export interface Program {
  id: string;
  name: string;
  degree?: string;
  departmentId?: string;
  departmentName?: string;
  school?: string;
  level?: string;
  duration?: string;
  credits?: number;
  tuition?: number;
  annualTuition?: number;
  shortDesc?: string;
  shortDescription?: string;
  description?: string;
  highlights?: string[];
  careerPaths?: string[];
  careerProspects?: any;
  prerequisites?: string[];
  admissionRequirements?: string[];
  imageUrl?: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
  studyMode?: string;
  applicationDeadline?: string;
  curriculum?: any;
  [key: string]: any;
}

export interface Department {
  id: string;
  name: string;
  head?: string;
  school?: string;
  description?: string;
  programsCount?: number;
  facultyCount?: number;
  imageUrl?: string;
  image?: string;
  location?: string;
  stats?: any;
  [key: string]: any;
}

export interface FacultyMember {
  id: string;
  name: string;
  title?: string;
  departmentId?: string;
  departmentName?: string;
  email?: string;
  bio?: string;
  education?: any;
  publicationsCount?: number;
  publications?: any;
  imageUrl?: string;
  avatar?: string;
  specialization?: any;
  office?: string;
  qualification?: string;
  officeHours?: string;
  [key: string]: any;
}

export interface ResearchProject {
  id: string;
  title: string;
  lead?: string;
  leadInvestigator?: string;
  department?: string;
  departmentId?: string;
  summary?: string;
  status?: string;
  funding?: string;
  fundingBody?: string;
  grantAmount?: string;
  tags?: string[];
  impactMetrics?: any;
  [key: string]: any;
}

export interface CampusFacility {
  id: string;
  name: string;
  category?: string;
  description?: string;
  location?: string;
  features?: string[];
  imageUrl?: string;
  image?: string;
  amenities?: string[];
  leedCertification?: string;
  [key: string]: any;
}

export interface StudentClub {
  id: string;
  name: string;
  category?: string;
  description?: string;
  members?: number;
  president?: string;
  imageUrl?: string;
  image?: string;
  [key: string]: any;
}

export interface UniversityEvent {
  id: string;
  title: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  description?: string;
  speaker?: string;
  registrationOpen?: boolean;
  imageUrl?: string;
  venueType?: string;
  [key: string]: any;
}

export interface NewsArticle {
  id: string;
  title: string;
  date?: string;
  publishDate?: string;
  author?: string;
  category?: string;
  summary?: string;
  content?: string | string[] | any;
  readTime?: string;
  imageUrl?: string;
  image?: string;
  tags?: string[];
  [key: string]: any;
}

export interface AlumniTestimonial {
  id: string;
  name: string;
  classYear?: number;
  gradYear?: number;
  degree?: string;
  company?: string;
  role?: string;
  currentRole?: string;
  quote?: string;
  imageUrl?: string;
  avatar?: string;
  [key: string]: any;
}

export interface Scholarship {
  id: string;
  name?: string;
  title?: string;
  amount?: string;
  deadline?: string;
  eligibility?: string | string[] | any;
  description?: string;
  coverage?: string;
  renewable?: boolean;
  type?: string;
  [key: string]: any;
}

export interface Recruiter {
  id?: string;
  name: string;
  industry?: string;
  logo?: string;
  category?: string;
  hiredCount?: string;
  [key: string]: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  category?: string;
  imageUrl?: string;
  [key: string]: any;
}

export interface FaqItem {
  id?: string;
  question: string;
  answer: string;
  category?: string;
  [key: string]: any;
}
