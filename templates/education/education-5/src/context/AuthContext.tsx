import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfileData, 
  LoginAuditSession, 
  initialStudentProfile, 
  initialLoginSessions 
} from '../data/portalData';

export type UserRole = 'student' | 'faculty';

export interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole;
  currentUser: StudentProfileData | null;
  token: string | null;
  loginHistory: LoginAuditSession[];
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (val: boolean) => void;
  login: (id: string, pass: string, selectedRole?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<StudentProfileData>) => void;
  revokeSession: (sessionId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('learnora_auth_state');
    return saved === 'true';
  });

  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('learnora_role') as UserRole) || 'student';
  });

  const [currentUser, setCurrentUser] = useState<StudentProfileData | null>(() => {
    const savedUser = localStorage.getItem('learnora_current_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return initialStudentProfile;
      }
    }
    return initialStudentProfile;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('learnora_auth_token') || (isAuthenticated ? 'mock_jwt_token_learnora_2026_xyz' : null);
  });

  const [loginHistory, setLoginHistory] = useState<LoginAuditSession[]>(() => {
    const savedHistory = localStorage.getItem('learnora_login_sessions');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        return initialLoginSessions;
      }
    }
    return initialLoginSessions;
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(() => {
    return localStorage.getItem('learnora_2fa') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('learnora_auth_state', isAuthenticated ? 'true' : 'false');
    localStorage.setItem('learnora_role', role);
    if (currentUser) {
      localStorage.setItem('learnora_current_user', JSON.stringify(currentUser));
    }
    if (token) {
      localStorage.setItem('learnora_auth_token', token);
    } else {
      localStorage.removeItem('learnora_auth_token');
    }
    localStorage.setItem('learnora_login_sessions', JSON.stringify(loginHistory));
    localStorage.setItem('learnora_2fa', twoFactorEnabled ? 'true' : 'false');
  }, [isAuthenticated, role, currentUser, token, loginHistory, twoFactorEnabled]);

  const login = async (id: string, pass: string, selectedRole: UserRole = 'student'): Promise<{ success: boolean; error?: string }> => {
    // Artificial latency for authentic verification experience
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanId = id.trim().toUpperCase();
    const cleanPass = pass.trim();

    // Validation
    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter both University ID and Password.' };
    }

    // Role check logic
    if (selectedRole === 'student') {
      const studentIdRegex = /^EDV[0-9]{4}[A-Z]{2,4}[0-9]{2,4}$/;
      const isMockStudent = (cleanId === 'EDV2026CS104' || cleanId.startsWith('EDV')) && (cleanPass === 'learnora@2026' || cleanPass.length >= 6);
      
      if (!isMockStudent) {
        return { 
          success: false, 
          error: 'Invalid Student ID or Password. (Demo: EDV2026CS104 / learnora@2026)' 
        };
      }

      const verifiedUser: StudentProfileData = {
        ...initialStudentProfile,
        studentId: cleanId,
        name: cleanId === 'EDV2026CS104' ? initialStudentProfile.name : `Student (${cleanId})`
      };

      const generatedToken = `learnora_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // Append new session to audit history
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' at ' + now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const newSession: LoginAuditSession = {
        id: `sess-${Date.now()}`,
        ipAddress: '103.24.188.92 (Current Session)',
        device: navigator.userAgent.includes('Mac') ? 'Apple MacBook Pro (macOS)' : navigator.userAgent.includes('Windows') ? 'Windows 11 Workstation' : 'Mobile / Tablet Device',
        browser: 'Google Chrome / Safari (TLS 1.3)',
        location: 'Tamil Nadu / Bangalore Campus Network',
        timestamp: formattedDate,
        isCurrent: true,
        status: 'Active'
      };

      setLoginHistory(prev => [
        newSession,
        ...prev.map(s => ({ ...s, isCurrent: false }))
      ]);

      setIsAuthenticated(true);
      setRole('student');
      setCurrentUser(verifiedUser);
      setToken(generatedToken);

      return { success: true };
    } else {
      // Faculty role verification
      const isMockFaculty = (cleanId === 'FAC2026CS01' || cleanId.startsWith('FAC')) && (cleanPass === 'learnora@faculty' || cleanPass.length >= 6);
      
      if (!isMockFaculty) {
        return { 
          success: false, 
          error: 'Invalid Faculty Credentials. (Demo: FAC2026CS01 / learnora@faculty)' 
        };
      }

      const verifiedFaculty: StudentProfileData = {
        ...initialStudentProfile,
        studentId: cleanId,
        name: 'Prof. Dr. Arvind Krishnamurthy',
        program: 'Faculty of Computer Science & AI',
        status: 'Active Regular'
      };

      const generatedToken = `learnora_fac_jwt_${Date.now()}`;
      setIsAuthenticated(true);
      setRole('faculty');
      setCurrentUser(verifiedFaculty);
      setToken(generatedToken);

      return { success: true };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('learnora_auth_state');
    localStorage.removeItem('learnora_auth_token');
  };

  const updateProfile = (data: Partial<StudentProfileData>) => {
    setCurrentUser(prev => prev ? { ...prev, ...data } : null);
  };

  const revokeSession = (sessionId: string) => {
    setLoginHistory(prev => prev.filter(s => s.id !== sessionId));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        currentUser,
        token,
        loginHistory,
        twoFactorEnabled,
        setTwoFactorEnabled,
        login,
        logout,
        updateProfile,
        revokeSession,
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
