import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentUser, 
  FacultyUser, 
  UserRole, 
  LoginHistoryEntry, 
  HallTicketData, 
  SemesterResult, 
  PhotocopyRequest, 
  RevaluationRequest, 
  ReviewRequest, 
  GrievanceTicket, 
  PortalNotice,
  ExamApplicationRecord,
  SubjectExamItem,
  PhotocopySubjectItem,
  RevaluationSubjectItem
} from '../types/auth';
import { 
  DEFAULT_STUDENT_USER, 
  DEFAULT_FACULTY_USER, 
  INITIAL_LOGIN_HISTORY, 
  PORTAL_NOTICES, 
  DEFAULT_HALL_TICKET, 
  SEMESTER_RESULTS_DATA, 
  INITIAL_EXAM_APPLICATIONS, 
  INITIAL_PHOTOCOPY_REQUESTS, 
  INITIAL_REVALUATION_REQUESTS, 
  INITIAL_REVIEW_REQUESTS, 
  INITIAL_GRIEVANCES 
} from '../data/portalMockData';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  token: string | null;
  currentUser: StudentUser;
  facultyUser: FacultyUser;
  loginHistory: LoginHistoryEntry[];
  examApplications: ExamApplicationRecord[];
  hallTicket: HallTicketData;
  resultsData: SemesterResult[];
  photocopyRequests: PhotocopyRequest[];
  revaluationRequests: RevaluationRequest[];
  reviewRequests: ReviewRequest[];
  grievanceTickets: GrievanceTicket[];
  notices: PortalNotice[];
  login: (id: string, pass: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateContactProfile: (data: Partial<StudentUser>) => void;
  submitExamApplication: (subjects: SubjectExamItem[], paymentMode: string) => ExamApplicationRecord;
  submitPhotocopyRequest: (subjectCodes: string[]) => PhotocopyRequest;
  submitRevaluationRequest: (subjectCodes: string[], reason: string) => RevaluationRequest;
  submitReviewRequest: (subjectCode: string, reason: string) => ReviewRequest;
  submitGrievance: (category: GrievanceTicket['category'], subject: string, description: string, priority: GrievanceTicket['priority']) => GrievanceTicket;
  addGrievanceReply: (ticketId: string, text: string) => void;
  terminateOtherSessions: () => void;
  resetPasswordRequest: (idOrEmail: string) => { success: boolean; message: string; tempOtp?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('eduvora_auth_status');
    return saved !== null ? saved === 'true' : true; // Default logged in for instant preview, can be logged out
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('eduvora_user_role');
    return (saved as UserRole) || 'student';
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('eduvora_auth_token') || 'mock_jwt_token_eduvora_2026_cs104';
  });

  const [currentUser, setCurrentUser] = useState<StudentUser>(() => {
    const saved = localStorage.getItem('eduvora_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_STUDENT_USER;
  });

  const [facultyUser] = useState<FacultyUser>(DEFAULT_FACULTY_USER);

  const [loginHistory, setLoginHistory] = useState<LoginHistoryEntry[]>(() => {
    const saved = localStorage.getItem('eduvora_login_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_LOGIN_HISTORY;
  });

  const [examApplications, setExamApplications] = useState<ExamApplicationRecord[]>(() => {
    const saved = localStorage.getItem('eduvora_exam_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_EXAM_APPLICATIONS;
  });

  const [hallTicket] = useState<HallTicketData>(DEFAULT_HALL_TICKET);
  const [resultsData] = useState<SemesterResult[]>(SEMESTER_RESULTS_DATA);

  const [photocopyRequests, setPhotocopyRequests] = useState<PhotocopyRequest[]>(() => {
    const saved = localStorage.getItem('eduvora_photocopy_reqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PHOTOCOPY_REQUESTS;
  });

  const [revaluationRequests, setRevaluationRequests] = useState<RevaluationRequest[]>(() => {
    const saved = localStorage.getItem('eduvora_revaluation_reqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REVALUATION_REQUESTS;
  });

  const [reviewRequests, setReviewRequests] = useState<ReviewRequest[]>(() => {
    const saved = localStorage.getItem('eduvora_review_reqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REVIEW_REQUESTS;
  });

  const [grievanceTickets, setGrievanceTickets] = useState<GrievanceTicket[]>(() => {
    const saved = localStorage.getItem('eduvora_grievances');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_GRIEVANCES;
  });

  const [notices] = useState<PortalNotice[]>(PORTAL_NOTICES);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('eduvora_auth_status', String(isAuthenticated));
    localStorage.setItem('eduvora_user_role', userRole);
    if (token) {
      localStorage.setItem('eduvora_auth_token', token);
    } else {
      localStorage.removeItem('eduvora_auth_token');
    }
  }, [isAuthenticated, userRole, token]);

  useEffect(() => {
    localStorage.setItem('eduvora_student_profile', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eduvora_login_history', JSON.stringify(loginHistory));
  }, [loginHistory]);

  useEffect(() => {
    localStorage.setItem('eduvora_exam_apps', JSON.stringify(examApplications));
  }, [examApplications]);

  useEffect(() => {
    localStorage.setItem('eduvora_photocopy_reqs', JSON.stringify(photocopyRequests));
  }, [photocopyRequests]);

  useEffect(() => {
    localStorage.setItem('eduvora_revaluation_reqs', JSON.stringify(revaluationRequests));
  }, [revaluationRequests]);

  useEffect(() => {
    localStorage.setItem('eduvora_review_reqs', JSON.stringify(reviewRequests));
  }, [reviewRequests]);

  useEffect(() => {
    localStorage.setItem('eduvora_grievances', JSON.stringify(grievanceTickets));
  }, [grievanceTickets]);

  const login = async (id: string, pass: string, role: UserRole = 'student'): Promise<{ success: boolean; error?: string }> => {
    const cleanId = id.trim().toUpperCase();
    const cleanPass = pass.trim();

    // Student Login validation
    if (role === 'student') {
      const isDemoMatch = cleanId === 'EDV2026CS104' || cleanId.startsWith('EDV');
      if (!isDemoMatch && cleanId.length < 5) {
        return { success: false, error: 'Invalid Student ID. Example format: EDV2026CS104.' };
      }
      if (!cleanPass) {
        return { success: false, error: 'Please enter your password or Date of Birth (YYYY-MM-DD).' };
      }
    } else {
      // Faculty Login validation
      const isFacultyMatch = cleanId === 'FAC2026CS01' || cleanId.startsWith('FAC');
      if (!isFacultyMatch && cleanId.length < 4) {
        return { success: false, error: 'Invalid Faculty ID. Example format: FAC2026CS01.' };
      }
      if (!cleanPass) {
        return { success: false, error: 'Please enter your faculty credentials.' };
      }
    }

    // Determine device and mock IP
    const userAgent = navigator.userAgent;
    let deviceName = 'Desktop Workstation';
    let osName = 'macOS / Windows';
    let browserName = 'Chrome Browser';

    if (/iPhone|iPad|iPod/.test(userAgent)) {
      deviceName = 'Apple iPhone / iOS Device';
      osName = 'iOS 17.5';
      browserName = 'Mobile Safari';
    } else if (/Android/.test(userAgent)) {
      deviceName = 'Android Smartphone';
      osName = 'Android 14';
      browserName = 'Chrome Mobile';
    } else if (/Macintosh/.test(userAgent)) {
      deviceName = 'Apple MacBook Pro';
      osName = 'macOS Sonoma';
      browserName = 'Google Chrome';
    } else if (/Windows/.test(userAgent)) {
      deviceName = 'Windows PC';
      osName = 'Windows 11 Pro';
      browserName = 'Microsoft Edge / Chrome';
    }

    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }) + ' ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newSession: LoginHistoryEntry = {
      id: `sess-${Date.now()}`,
      timestamp: timeString,
      ip: `192.168.${Math.floor(Math.random() * 200) + 1}.${Math.floor(Math.random() * 250) + 2}`,
      device: deviceName,
      browser: browserName,
      os: osName,
      location: 'Silicon Valley, CA (Verified Gateway)',
      status: 'Active Session',
      isCurrent: true,
    };

    // Mark previous sessions as ended
    const updatedHistory = [
      newSession,
      ...loginHistory.map(item => ({ ...item, isCurrent: false, status: (item.status === 'Active Session' ? 'Ended' : item.status) as LoginHistoryEntry['status'] }))
    ];

    setLoginHistory(updatedHistory);
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(`jwt_${cleanId.toLowerCase()}_${Date.now()}`);

    return { success: true };
  };

  const logout = () => {
    // End active session in history
    setLoginHistory(prev =>
      prev.map(item =>
        item.isCurrent ? { ...item, isCurrent: false, status: 'Ended' as const } : item
      )
    );
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('eduvora_auth_token');
    localStorage.setItem('eduvora_auth_status', 'false');
  };

  const updateContactProfile = (data: Partial<StudentUser>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...data
    }));
  };

  const submitExamApplication = (subjects: SubjectExamItem[], paymentMode: string): ExamApplicationRecord => {
    const totalFee = subjects.reduce((sum, s) => sum + s.fee, 0);
    const newApp: ExamApplicationRecord = {
      applicationNo: `EXAM-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      semester: currentUser.semester,
      academicYear: currentUser.academicYear,
      appliedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      subjects,
      totalFee,
      paymentStatus: 'Paid',
      paymentRef: `TXN_EDV_${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMode,
      hallTicketGenerated: true
    };

    setExamApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const submitPhotocopyRequest = (subjectCodes: string[]): PhotocopyRequest => {
    const subjects: PhotocopySubjectItem[] = subjectCodes.map(code => {
      const foundInResults = resultsData.flatMap(r => r.subjects).find(s => s.code === code);
      const name = foundInResults ? foundInResults.name : `Course ${code}`;
      return {
        code,
        name,
        fee: 20,
        status: 'Processing Scans',
        scriptUrl: `https://eduvora.edu/vault/scripts/${code}-${currentUser.studentId}.pdf`,
        examinerNotes: 'Answer sheet is being scanned from central valuation records.',
        questionScores: [
          { qNo: 'Part A (Q1 - Q5)', maxMarks: 20, awardedMarks: 16, remarks: 'Verified by First Examiner.' },
          { qNo: 'Part B (Q6 - Q8)', maxMarks: 20, awardedMarks: 15, remarks: 'Evaluation completed.' },
          { qNo: 'Part C (Q9 - Q10)', maxMarks: 20, awardedMarks: 14, remarks: 'Step marks recorded.' }
        ]
      };
    });

    const newRequest: PhotocopyRequest = {
      id: `pc-${Date.now()}`,
      applicationNo: `PC-2026-${Math.floor(5000 + Math.random() * 4999)}`,
      appliedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      semester: currentUser.semester - 1,
      subjects,
      totalFee: subjects.length * 20,
      paymentStatus: 'Paid',
      downloadExpiryDate: 'September 30, 2026'
    };

    setPhotocopyRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const submitRevaluationRequest = (subjectCodes: string[], reason: string): RevaluationRequest => {
    const subjects: RevaluationSubjectItem[] = subjectCodes.map(code => {
      const foundInResults = resultsData.flatMap(r => r.subjects).find(s => s.code === code);
      const originalMarks = foundInResults ? foundInResults.totalMarks : 75;
      const originalGrade = foundInResults ? `${foundInResults.letterGrade} (Grade Pt: ${foundInResults.gradePoint})` : 'A';
      return {
        code,
        name: foundInResults ? foundInResults.name : `Course ${code}`,
        originalMarks,
        originalGrade,
        fee: 50,
        diffStatus: 'Pending Review',
        status: 'Submitted',
        updatedAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      };
    });

    const newReq: RevaluationRequest = {
      id: `rev-${Date.now()}`,
      applicationNo: `REV-2026-${Math.floor(8000 + Math.random() * 1999)}`,
      appliedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      semester: currentUser.semester - 1,
      subjects,
      totalFee: subjects.length * 50,
      paymentStatus: 'Paid',
      remarks: reason || 'Application submitted for board revaluation.'
    };

    setRevaluationRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const submitReviewRequest = (subjectCode: string, reason: string): ReviewRequest => {
    const foundInResults = resultsData.flatMap(r => r.subjects).find(s => s.code === subjectCode);
    const subjectName = foundInResults ? foundInResults.name : `Course ${subjectCode}`;

    const newReq: ReviewRequest = {
      id: `chk-${Date.now()}`,
      applicationNo: `BRD-REV-2026-${Math.floor(100 + Math.random() * 900)}`,
      appliedDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      semester: currentUser.semester - 1,
      subjectCode,
      subjectName,
      fee: 75,
      reason,
      status: 'Submitted',
      resolutionOutcome: 'Dossier dispatched to Chief Valuation Officer for scrutiny.',
      feeRefundStatus: 'Pending'
    };

    setReviewRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const submitGrievance = (
    category: GrievanceTicket['category'], 
    subject: string, 
    description: string, 
    priority: GrievanceTicket['priority']
  ): GrievanceTicket => {
    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newTicket: GrievanceTicket = {
      id: `grv-${Date.now()}`,
      ticketNumber: `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      subject,
      description,
      priority,
      status: 'Open',
      createdAt: timeString,
      lastUpdated: timeString,
      assignedOfficer: 'Controller of Examinations Helpdesk',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'Student',
          text: description,
          timestamp: timeString
        }
      ]
    };

    setGrievanceTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const addGrievanceReply = (ticketId: string, text: string) => {
    const now = new Date();
    const timeString = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    setGrievanceTickets(prev =>
      prev.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastUpdated: timeString,
            messages: [
              ...t.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'Student',
                text,
                timestamp: timeString
              }
            ]
          };
        }
        return t;
      })
    );
  };

  const terminateOtherSessions = () => {
    setLoginHistory(prev =>
      prev.map(item =>
        item.isCurrent ? item : { ...item, status: 'Terminated' as const }
      )
    );
  };

  const resetPasswordRequest = (idOrEmail: string): { success: boolean; message: string; tempOtp?: string } => {
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    return {
      success: true,
      message: `A 6-digit security OTP (${mockOtp}) has been dispatched to your registered university email for ID/Email "${idOrEmail}".`,
      tempOtp: mockOtp
    };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        token,
        currentUser,
        facultyUser,
        loginHistory,
        examApplications,
        hallTicket,
        resultsData,
        photocopyRequests,
        revaluationRequests,
        reviewRequests,
        grievanceTickets,
        notices,
        login,
        logout,
        updateContactProfile,
        submitExamApplication,
        submitPhotocopyRequest,
        submitRevaluationRequest,
        submitReviewRequest,
        submitGrievance,
        addGrievanceReply,
        terminateOtherSessions,
        resetPasswordRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
