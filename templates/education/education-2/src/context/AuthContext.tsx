import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  LoginSession,
  NoticeItem,
  ExamSubject,
  HallTicketData,
  SemesterResult,
  PhotocopyRequest,
  RevaluationRecord,
  ReviewRecord,
  SupportTicket,
} from '../types';
import {
  mockStudentUser,
  mockFacultyUser,
  mockNotices,
  mockExamSubjects,
  mockHallTicket,
  mockSemesterResults,
  mockPhotocopies,
  mockRevaluations,
  mockReviews,
  mockSupportTickets,
  mockLoginSessions,
} from '../data/portalData';

interface ExamReceipt {
  date: string;
  amount: number;
  subjects: ExamSubject[];
  txId: string;
  paymentMethod: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  token: string | null;
  role: UserRole;
  login: (id: string, pass: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginHistory: LoginSession[];
  terminateSession: (sessionId: string) => void;
  terminateOtherSessions: () => void;
  
  // Notice board
  notices: NoticeItem[];
  markNoticeRead: (id: string) => void;

  // Exam Application & Hall Ticket
  examSubjects: ExamSubject[];
  toggleSubjectRegistration: (code: string) => void;
  completeExamRegistration: (paymentMethod: string) => ExamReceipt;
  isExamRegistered: boolean;
  examReceipt: ExamReceipt | null;
  hallTicket: HallTicketData;

  // Results
  results: SemesterResult[];
  selectedSemester: number;
  setSelectedSemester: (sem: number) => void;

  // Photocopy, Revaluation & Review
  photocopies: PhotocopyRequest[];
  applyPhotocopy: (subjectCode: string) => { success: boolean; id: string };
  revaluations: RevaluationRecord[];
  applyRevaluation: (subjectCode: string, reason: string) => { success: boolean; id: string };
  reviews: ReviewRecord[];
  applyReview: (subjectCode: string, grounds: string) => { success: boolean; id: string };

  // Support
  supportTickets: SupportTicket[];
  createTicket: (
    category: SupportTicket['category'],
    subject: string,
    message: string,
    priority: SupportTicket['priority']
  ) => { success: boolean; id: string };
  replyTicket: (ticketId: string, message: string) => void;

  // Profile
  updateProfileContact: (data: {
    phone: string;
    personalEmail: string;
    emergencyContact: string;
    address: string;
    guardianPhone: string;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with default mock student or localStorage
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('eduvora_auth_token') || 'demo_token_edv_2026';
  });

  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('eduvora_user_role') as UserRole) || 'student';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('eduvora_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return mockStudentUser;
      }
    }
    return mockStudentUser;
  });

  const isAuthenticated = Boolean(token && currentUser);

  // Portal Stateful collections
  const [loginHistory, setLoginHistory] = useState<LoginSession[]>(() => {
    const saved = localStorage.getItem('eduvora_login_history');
    return saved ? JSON.parse(saved) : mockLoginSessions;
  });

  const [notices, setNotices] = useState<NoticeItem[]>(mockNotices);
  const [examSubjects, setExamSubjects] = useState<ExamSubject[]>(mockExamSubjects);
  const [isExamRegistered, setIsExamRegistered] = useState<boolean>(true);
  const [examReceipt, setExamReceipt] = useState<ExamReceipt | null>(() => ({
    date: '19 Aug 2026, 11:20 AM',
    amount: 3150,
    subjects: mockExamSubjects.filter((s) => s.isRegistered),
    txId: 'TXN-EDV-99842109',
    paymentMethod: 'Eduvora Student UPI FastPay',
  }));

  const [hallTicket] = useState<HallTicketData>(mockHallTicket);
  const [results] = useState<SemesterResult[]>(mockSemesterResults);
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const [photocopies, setPhotocopies] = useState<PhotocopyRequest[]>(mockPhotocopies);
  const [revaluations, setRevaluations] = useState<RevaluationRecord[]>(mockRevaluations);
  const [reviews, setReviews] = useState<ReviewRecord[]>(mockReviews);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(mockSupportTickets);

  // Sync to local storage
  useEffect(() => {
    if (token) {
      localStorage.setItem('eduvora_auth_token', token);
    } else {
      localStorage.removeItem('eduvora_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eduvora_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eduvora_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('eduvora_user_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('eduvora_login_history', JSON.stringify(loginHistory));
  }, [loginHistory]);

  const login = async (id: string, pass: string, selectedRole: UserRole): Promise<{ success: boolean; error?: string }> => {
    const cleanId = id.trim().toUpperCase();
    const cleanPass = pass.trim();

    // Verify format or mock credentials
    if (selectedRole === 'student') {
      if (cleanId === 'EDV2026CS104' && (cleanPass === 'eduvora@2026' || cleanPass === 'password')) {
        const user = { ...mockStudentUser };
        const newToken = `jwt_edv_student_${Date.now()}`;
        setToken(newToken);
        setCurrentUser(user);
        setRole('student');
        recordNewLoginSession('Alex Rivera (Student)', 'Boston, MA (Campus Gateway)');
        return { success: true };
      } else if (cleanId.startsWith('EDV') && cleanPass.length >= 6) {
        // Allow flexible format matches as well
        const user: UserProfile = {
          ...mockStudentUser,
          studentId: cleanId,
        };
        const newToken = `jwt_edv_student_${Date.now()}`;
        setToken(newToken);
        setCurrentUser(user);
        setRole('student');
        recordNewLoginSession(`${user.fullName} (${cleanId})`, 'Boston, MA');
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Invalid Student ID or Password. Demo: ID "EDV2026CS104" & Pass "eduvora@2026"',
        };
      }
    } else {
      // Faculty login
      if (cleanId === 'FAC2026CS01' && (cleanPass === 'eduvora@fac' || cleanPass === 'password')) {
        const user = { ...mockFacultyUser };
        const newToken = `jwt_edv_fac_${Date.now()}`;
        setToken(newToken);
        setCurrentUser(user);
        setRole('faculty');
        recordNewLoginSession('Dr. Evelyn Vance (Faculty Chair)', 'Eduvora Academic Enclave');
        return { success: true };
      } else if (cleanId.startsWith('FAC') && cleanPass.length >= 6) {
        const user: UserProfile = {
          ...mockFacultyUser,
          studentId: cleanId,
        };
        const newToken = `jwt_edv_fac_${Date.now()}`;
        setToken(newToken);
        setCurrentUser(user);
        setRole('faculty');
        recordNewLoginSession(`${user.fullName} (${cleanId})`, 'Eduvora Campus');
        return { success: true };
      } else {
        return {
          success: false,
          error: 'Invalid Faculty Credentials. Demo: ID "FAC2026CS01" & Pass "eduvora@fac"',
        };
      }
    }
  };

  const recordNewLoginSession = (identifier: string, locationStr: string) => {
    const userAgent = navigator.userAgent;
    let deviceName = 'Desktop Workstation (Chrome)';
    if (/iPhone/i.test(userAgent)) deviceName = 'Apple iPhone';
    else if (/Macintosh/i.test(userAgent)) deviceName = 'Apple MacBook Pro (macOS)';
    else if (/Windows/i.test(userAgent)) deviceName = 'Windows PC (Edge/Chrome)';
    else if (/Android/i.test(userAgent)) deviceName = 'Android Device';

    const newSession: LoginSession = {
      id: `SES-${Date.now().toString().slice(-4)}`,
      ipAddress: `198.51.100.${Math.floor(Math.random() * 80 + 10)} (Secure Gateway)`,
      device: deviceName,
      browser: 'Chrome 128.0 (Modern Secure Engine)',
      location: locationStr || 'Boston, MA, USA',
      timestamp: new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      isCurrent: true,
      status: 'Active',
    };

    setLoginHistory((prev) => [
      newSession,
      ...prev.map((s) => ({ ...s, isCurrent: false })),
    ]);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('eduvora_auth_token');
    localStorage.removeItem('eduvora_current_user');
  };

  const terminateSession = (sessionId: string) => {
    setLoginHistory((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status: 'Terminated', isCurrent: false } : s))
    );
  };

  const terminateOtherSessions = () => {
    setLoginHistory((prev) =>
      prev.map((s) => (s.isCurrent ? s : { ...s, status: 'Terminated' }))
    );
  };

  const markNoticeRead = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isNew: false } : n))
    );
  };

  const toggleSubjectRegistration = (code: string) => {
    setExamSubjects((prev) =>
      prev.map((s) => (s.code === code ? { ...s, isRegistered: !s.isRegistered } : s))
    );
  };

  const completeExamRegistration = (paymentMethod: string): ExamReceipt => {
    const selected = examSubjects.filter((s) => s.isRegistered);
    const totalAmount = selected.reduce((sum, s) => sum + s.fee, 0);
    const receipt: ExamReceipt = {
      date: new Date().toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      amount: totalAmount,
      subjects: selected,
      txId: `TXN-EDV-${Math.floor(10000000 + Math.random() * 90000000)}`,
      paymentMethod: paymentMethod || 'Online Payment Gateway',
    };
    setExamReceipt(receipt);
    setIsExamRegistered(true);
    return receipt;
  };

  const applyPhotocopy = (subjectCode: string): { success: boolean; id: string } => {
    const target = examSubjects.find((s) => s.code === subjectCode) || {
      code: subjectCode,
      name: 'Theory & Practical Evaluation Script',
    };
    const newId = `PC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: PhotocopyRequest = {
      id: newId,
      subjectCode: target.code,
      subjectName: target.name,
      appliedDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      feePaid: 300,
      status: 'Received',
      trackingRef: `TRK-EDV-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    setPhotocopies((prev) => [newRecord, ...prev]);
    return { success: true, id: newId };
  };

  const applyRevaluation = (subjectCode: string, reason: string): { success: boolean; id: string } => {
    const target = examSubjects.find((s) => s.code === subjectCode) || {
      code: subjectCode,
      name: 'Evaluated Theory Subject',
    };
    const newId = `REV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: RevaluationRecord = {
      id: newId,
      subjectCode: target.code,
      subjectName: target.name,
      originalExternal: 44,
      originalTotal: 78,
      originalGrade: 'A (8.0)',
      status: 'Under Evaluation',
      appliedDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      remarks: reason || 'Application accepted. Sent to Second Board of Examiners for blind re-evaluation.',
      feePaid: 650,
    };
    setRevaluations((prev) => [newRecord, ...prev]);
    return { success: true, id: newId };
  };

  const applyReview = (subjectCode: string, grounds: string): { success: boolean; id: string } => {
    const target = examSubjects.find((s) => s.code === subjectCode) || {
      code: subjectCode,
      name: 'Board of Review Examination Subject',
    };
    const newId = `BR-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: ReviewRecord = {
      id: newId,
      subjectCode: target.code,
      subjectName: target.name,
      appliedDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      boardChair: 'Prof. Alistair Thorne (Dean of Examinations)',
      status: 'Committee Constituted',
      finalVerdict: `Petition grounds logged: "${grounds.slice(0, 60)}...". Examination Appellate Board notified.`,
      feePaid: 1200,
    };
    setReviews((prev) => [newRecord, ...prev]);
    return { success: true, id: newId };
  };

  const createTicket = (
    category: SupportTicket['category'],
    subject: string,
    message: string,
    priority: SupportTicket['priority']
  ): { success: boolean; id: string } => {
    const newId = `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      id: newId,
      category,
      subject,
      priority,
      status: 'Open',
      createdDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastUpdated: 'Just now',
      messages: [
        {
          sender: 'Student',
          senderName: currentUser?.fullName || 'Student Candidate',
          text: message,
          timestamp: 'Just now',
        },
      ],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    return { success: true, id: newId };
  };

  const replyTicket = (ticketId: string, message: string) => {
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          return {
            ...t,
            lastUpdated: 'Just now',
            messages: [
              ...t.messages,
              {
                sender: 'Student',
                senderName: currentUser?.fullName || 'Student Candidate',
                text: message,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return t;
      })
    );
  };

  const updateProfileContact = (data: {
    phone: string;
    personalEmail: string;
    emergencyContact: string;
    address: string;
    guardianPhone: string;
  }) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        phone: data.phone,
        personalEmail: data.personalEmail,
        emergencyContact: data.emergencyContact,
        address: data.address,
        guardianPhone: data.guardianPhone,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        token,
        role,
        login,
        logout,
        loginHistory,
        terminateSession,
        terminateOtherSessions,
        notices,
        markNoticeRead,
        examSubjects,
        toggleSubjectRegistration,
        completeExamRegistration,
        isExamRegistered,
        examReceipt,
        hallTicket,
        results,
        selectedSemester,
        setSelectedSemester,
        photocopies,
        applyPhotocopy,
        revaluations,
        applyRevaluation,
        reviews,
        applyReview,
        supportTickets,
        createTicket,
        replyTicket,
        updateProfileContact,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
