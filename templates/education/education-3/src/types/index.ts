export type DegreeLevel = 'Undergraduate' | 'Postgraduate' | 'Doctorate' | 'Executive Certificate';

export type Department = 
  | 'Computer Science & AI'
  | 'Business & Management'
  | 'BioTech & Health Sciences'
  | 'Design & Media'
  | 'Engineering & Robotics'
  | 'Humanities & Social Sciences';

export type StudyMode = 'On-Campus' | 'Hybrid' | 'Online';

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  email: string;
  qualifications: string;
  bio: string;
  publicationsCount: number;
}

export interface SemesterModule {
  semester: number;
  title: string;
  modules: {
    code: string;
    name: string;
    credits: number;
    description: string;
    type: 'Core' | 'Elective' | 'Lab' | 'Capstone';
  }[];
}

export interface Course {
  id: string;
  title: string;
  degreeLevel: DegreeLevel;
  department: Department;
  mode: StudyMode;
  tagline: string;
  description: string;
  tuitionPerSemester: number;
  durationYears: number;
  totalCredits: number;
  accreditation: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  facultyLead: FacultyMember;
  prerequisites: string[];
  careerOutcomes: string[];
  syllabus: SemesterModule[];
  applicationDeadline: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Cultural' | 'Sports' | 'Guest Lectures' | 'Career Fairs' | 'Workshops';
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  speakerOrHost: string;
  totalSeats: number;
  reservedSeats: number;
  price: 'Free' | string;
  tags: string[];
  featured?: boolean;
}

export interface ClubItem {
  id: string;
  name: string;
  category: 'Technology' | 'Business & Finance' | 'Arts & Culture' | 'Sports & Athletics' | 'Social Impact' | 'Science & Research';
  description: string;
  image: string;
  memberCount: number;
  meetingSchedule: string;
  leadName: string;
  leadEmail: string;
  tags: string[];
  achievements: string[];
}

export type ApplicationStage = 
  | 'Submitted'
  | 'Under Faculty Review'
  | 'Interview Scheduled'
  | 'Admitted'
  | 'Conditional Offer';

export interface DocumentUpload {
  id: string;
  category: 'Transcripts' | 'Statement of Purpose' | 'Resume / CV' | 'Letters of Recommendation' | 'Identity Proof';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export interface ApplicationSubmission {
  referenceId: string;
  submittedAt: string;
  term: string;
  programId: string;
  programTitle: string;
  degreeLevel: string;
  mode: string;
  applicantName: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  previousInstitution: string;
  gpa: number;
  testScoreType?: string;
  testScore?: string;
  scholarshipTier: string;
  estimatedAid: number;
  currentStage: ApplicationStage;
  stageHistory: {
    stage: ApplicationStage;
    date: string;
    completed: boolean;
    note: string;
  }[];
  documentsCount: number;
  interviewDate?: string;
  reviewerNotes?: string;
}

export interface RegisteredCourse {
  code: string;
  name: string;
  credits: number;
  professor: string;
  grade?: string;
  attendancePercent: number;
  schedule: string;
  room: string;
  progressPercent: number;
}

export interface TimetableSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  courseCode: string;
  courseName: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  color: string;
}

export interface TuitionInvoice {
  id: string;
  term: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  breakdown: { item: string; amount: number }[];
}

export interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Administrative' | 'Financial' | 'Career';
  priority: 'High' | 'Normal';
  content: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  leadResearcher: string;
  fundingBody: string;
  grantAmount: string;
  status: 'Active' | 'Peer Review' | 'Clinical/Pilot Stage' | 'Patented';
  abstract: string;
  impactMetric: string;
  collaborators: string[];
  tags: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  citations: number;
  authors: string;
  impactFactor: string;
}

export interface ResearchCenter {
  id: string;
  name: string;
  lead: string;
  leadRole: string;
  leadAvatar: string;
  department: string;
  focusAreas: string[];
  description: string;
  image: string;
  fundedGrants: string;
  publicationsCount: number;
  activeProjects: ResearchProject[];
  keyPublications: PublicationItem[];
  facilities: string[];
}

export interface LabBookingRequest {
  id: string;
  applicantName: string;
  email: string;
  department: string;
  centerId: string;
  facility: string;
  timeSlot: string;
  date: string;
  proposalTitle: string;
  abstract: string;
  equipmentNeeded: string[];
  status: 'Pending Review' | 'Approved' | 'Requires Clarification';
  submittedAt: string;
}

export interface LeadershipMessage {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  credentials: string;
  quote: string;
  fullMessage: string;
  priorPosts: string;
  officeHours: string;
}

export interface CampusZone {
  id: string;
  name: string;
  category: 'Academic' | 'Research' | 'Athletics' | 'Student Life' | 'Innovation';
  tagline: string;
  description: string;
  sqft: string;
  established: string;
  features: string[];
  image: string;
  leadContact: string;
}

