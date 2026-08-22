import { Course, EventItem, ClubItem, ApplicationSubmission, RegisteredCourse, TimetableSlot, TuitionInvoice, NoticeItem, FacultyMember } from './index';

export type UserRole = 'student' | 'faculty';

export interface StudentUser {
  studentId: string;
  rollNumber: string;
  name: string;
  email: string;
  personalEmail: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  department: string;
  degree: string;
  specialization: string;
  semester: number;
  batch: string;
  academicYear: string;
  section: string;
  cgpa: number;
  sgpa: number;
  creditsEarned: number;
  totalCreditsRequired: number;
  academicStanding: string;
  advisor: string;
  advisorEmail: string;
  advisorCabin: string;
  residentialAddress: string;
  permanentAddress: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  avatar: string;
  enrolledCourses: RegisteredCourse[];
  tuitionStatus: 'Paid in Full' | 'Pending Dues';
  examEligibility: 'Eligible (Attendance > 85%)' | 'Conditionally Eligible' | 'Barred';
}

export interface FacultyUser {
  facultyId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  cabin: string;
  assignedCourses: string[];
  avatar: string;
}

export interface LoginHistoryEntry {
  id: string;
  timestamp: string;
  ip: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  status: 'Active Session' | 'Ended' | 'Terminated';
  isCurrent: boolean;
}

export interface SubjectExamItem {
  code: string;
  name: string;
  semester: number;
  credits: number;
  type: 'Regular' | 'Backlog' | 'Practical' | 'Elective';
  fee: number;
  selected: boolean;
  instructor: string;
}

export interface ExamApplicationRecord {
  applicationNo: string;
  semester: number;
  academicYear: string;
  appliedDate: string;
  subjects: SubjectExamItem[];
  totalFee: number;
  paymentStatus: 'Paid' | 'Pending';
  paymentRef: string;
  paymentMode: string;
  hallTicketGenerated: boolean;
}

export interface TimetableExamSlot {
  subjectCode: string;
  subjectName: string;
  examDate: string;
  session: 'Forenoon (09:30 AM - 12:30 PM)' | 'Afternoon (02:00 PM - 05:00 PM)';
  hallNo: string;
  seatNo: string;
  reportingTime: string;
}

export interface HallTicketData {
  hallTicketNo: string;
  examSession: string;
  academicYear: string;
  studentId: string;
  rollNumber: string;
  studentName: string;
  degree: string;
  department: string;
  semester: number;
  centerCode: string;
  centerName: string;
  photoUrl: string;
  signatureUrl: string;
  qrCodeData: string;
  barcodeData: string;
  issuedDate: string;
  controllerSignUrl: string;
  timetable: TimetableExamSlot[];
  instructions: string[];
}

export interface SubjectMarksRecord {
  code: string;
  name: string;
  credits: number;
  internalMarks: number; // Max 40
  maxInternal: number;
  externalMarks: number; // Max 60
  maxExternal: number;
  totalMarks: number;    // Max 100
  gradePoint: number;
  letterGrade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'RA';
  result: 'PASS' | 'FAIL';
}

export interface SemesterResult {
  semester: number;
  semesterTitle: string;
  examHeldMonthYear: string;
  publishedDate: string;
  sgpa: number;
  cgpa: number;
  totalCredits: number;
  earnedCredits: number;
  resultStatus: 'PASSED - FIRST CLASS WITH DISTINCTION' | 'PASSED - FIRST CLASS' | 'PASSED' | 'RE-APPEAR';
  subjects: SubjectMarksRecord[];
}

export interface PhotocopySubjectItem {
  code: string;
  name: string;
  fee: number;
  status: 'Application Submitted' | 'Processing Scans' | 'Script Available' | 'Completed';
  scriptUrl?: string;
  examinerNotes?: string;
  questionScores?: { qNo: string; maxMarks: number; awardedMarks: number; remarks: string }[];
}

export interface PhotocopyRequest {
  id: string;
  applicationNo: string;
  appliedDate: string;
  semester: number;
  subjects: PhotocopySubjectItem[];
  totalFee: number;
  paymentStatus: 'Paid' | 'Pending';
  downloadExpiryDate: string;
}

export interface RevaluationSubjectItem {
  code: string;
  name: string;
  originalMarks: number;
  originalGrade: string;
  revaluedMarks?: number;
  revaluedGrade?: string;
  fee: number;
  diffStatus: 'Grade Improved (+12 Marks)' | 'Grade Improved (+8 Marks)' | 'No Change in Marks' | 'Pending Review';
  status: 'Submitted' | 'Under Board Valuation' | 'Approval Committee' | 'Published';
  updatedAt: string;
}

export interface RevaluationRequest {
  id: string;
  applicationNo: string;
  appliedDate: string;
  semester: number;
  subjects: RevaluationSubjectItem[];
  totalFee: number;
  paymentStatus: 'Paid' | 'Pending';
  remarks?: string;
}

export interface ReviewRequest {
  id: string;
  applicationNo: string;
  appliedDate: string;
  semester: number;
  subjectCode: string;
  subjectName: string;
  fee: number;
  reason: string;
  status: 'Submitted' | 'Under Chief Examiner Committee' | 'Final Resolution Dispatched';
  resolutionOutcome?: string;
  feeRefundStatus: 'Eligible for 100% Refund' | 'Standard Fee Retained' | 'Pending';
}

export interface GrievanceMessage {
  id: string;
  sender: 'Student' | 'Controller of Examinations' | 'Academic Registrar' | 'Support Desk';
  text: string;
  timestamp: string;
  attachmentName?: string;
}

export interface GrievanceTicket {
  id: string;
  ticketNumber: string;
  category: 'Examinations & Hall Ticket' | 'Marksheet Discrepancy' | 'Fee & Payment' | 'Photocopy / Revaluation' | 'Profile & Registration';
  subject: string;
  description: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdated: string;
  assignedOfficer: string;
  messages: GrievanceMessage[];
}

export interface PortalNotice {
  id: string;
  title: string;
  date: string;
  category: 'Examinations' | 'Academic' | 'Fees' | 'Circulars';
  priority: 'Urgent' | 'High' | 'Normal';
  author: string;
  referenceNo: string;
  content: string;
  fileSize?: string;
  isNew?: boolean;
}
