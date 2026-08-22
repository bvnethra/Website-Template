import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, EventItem, ApplicationSubmission, ClubItem, RegisteredCourse, TuitionInvoice } from '../types';
import { COURSES_DATA, EVENTS_DATA, CLUBS_DATA, INITIAL_APPLICATIONS, MOCK_STUDENT_PROFILE } from '../data/mockData';

interface EventTicket {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  userName: string;
  userEmail: string;
  seatsCount: number;
  qrCode: string;
  bookedAt: string;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Course application pre-fill
  selectedCourseForApply: Course | null;
  setSelectedCourseForApply: (course: Course | null) => void;

  // Comparison & bookmarks
  comparedCourseIds: string[];
  toggleCompareCourse: (courseId: string) => void;
  clearComparedCourses: () => void;
  savedCourseIds: string[];
  toggleSaveCourse: (courseId: string) => void;

  // Applications & Status Tracking
  applications: ApplicationSubmission[];
  addNewApplication: (submission: ApplicationSubmission) => void;
  getApplicationByRef: (refId: string) => ApplicationSubmission | undefined;
  updateApplicationStage: (refId: string, newStage: ApplicationSubmission['currentStage'], note?: string) => void;

  // Events & RSVP
  events: EventItem[];
  userTickets: EventTicket[];
  rsvpEvent: (eventId: string, userName: string, userEmail: string, seats?: number) => { success: boolean; ticket?: EventTicket; message: string };
  cancelRsvp: (ticketId: string) => void;

  // Clubs
  clubs: ClubItem[];
  joinedClubIds: string[];
  joinClub: (clubId: string, applicantData: { name: string; email: string; year: string; reason: string }) => boolean;

  // Portal & Authentication
  isAuthenticated: boolean;
  userRole: 'student' | 'applicant' | 'guest';
  loginAsStudent: () => void;
  loginAsApplicant: (refId?: string) => void;
  logout: () => void;
  studentProfile: typeof MOCK_STUDENT_PROFILE;
  payStudentInvoice: (invoiceId: string) => boolean;

  // Global Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Active drawer & modal triggers
  activeCourseDetailModal: Course | null;
  setActiveCourseDetailModal: (course: Course | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCourseForApply, setSelectedCourseForApply] = useState<Course | null>(null);
  const [activeCourseDetailModal, setActiveCourseDetailModal] = useState<Course | null>(null);
  const [comparedCourseIds, setComparedCourseIds] = useState<string[]>([]);
  const [savedCourseIds, setSavedCourseIds] = useState<string[]>(['ms-data-science']);

  const [applications, setApplications] = useState<ApplicationSubmission[]>(() => {
    const saved = localStorage.getItem('eduvora_applications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_APPLICATIONS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('eduvora_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return EVENTS_DATA;
  });

  const [userTickets, setUserTickets] = useState<EventTicket[]>(() => {
    const saved = localStorage.getItem('eduvora_tickets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [clubs] = useState<ClubItem[]>(CLUBS_DATA);
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>(['club-robotics']);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<'student' | 'applicant' | 'guest'>('student');
  const [studentProfile, setStudentProfile] = useState<typeof MOCK_STUDENT_PROFILE>(MOCK_STUDENT_PROFILE);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('eduvora_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('eduvora_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eduvora_tickets', JSON.stringify(userTickets));
  }, [userTickets]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompareCourse = (courseId: string) => {
    setComparedCourseIds((prev) => {
      if (prev.includes(courseId)) {
        return prev.filter((id) => id !== courseId);
      }
      if (prev.length >= 3) {
        addToast({
          type: 'warning',
          title: 'Comparison limit reached',
          message: 'You can compare up to 3 programs simultaneously.',
        });
        return prev;
      }
      addToast({
        type: 'info',
        title: 'Program added to compare',
        message: 'View the side-by-side comparison matrix.',
      });
      return [...prev, courseId];
    });
  };

  const clearComparedCourses = () => {
    setComparedCourseIds([]);
  };

  const toggleSaveCourse = (courseId: string) => {
    setSavedCourseIds((prev) => {
      const exists = prev.includes(courseId);
      if (exists) {
        addToast({ type: 'info', title: 'Removed', message: 'Program removed from your bookmarks.' });
        return prev.filter((id) => id !== courseId);
      } else {
        addToast({ type: 'success', title: 'Bookmarked', message: 'Program saved to your favorites.' });
        return [...prev, courseId];
      }
    });
  };

  const addNewApplication = (submission: ApplicationSubmission) => {
    setApplications((prev) => [submission, ...prev]);
    addToast({
      type: 'success',
      title: 'Application Submitted!',
      message: `Your reference ID is ${submission.referenceId}. Track progress anytime.`,
    });
  };

  const getApplicationByRef = (refId: string) => {
    const cleaned = refId.trim().toUpperCase();
    return applications.find((app) => app.referenceId.toUpperCase() === cleaned);
  };

  const updateApplicationStage = (refId: string, newStage: ApplicationSubmission['currentStage'], note?: string) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.referenceId.toUpperCase() === refId.toUpperCase()) {
          const updatedHistory = app.stageHistory.map((h) => {
            if (h.stage === newStage) {
              return { ...h, completed: true, date: new Date().toISOString().split('T')[0], note: note || h.note };
            }
            return h;
          });
          return {
            ...app,
            currentStage: newStage,
            reviewerNotes: note || app.reviewerNotes,
            stageHistory: updatedHistory,
          };
        }
        return app;
      })
    );
  };

  const rsvpEvent = (eventId: string, userName: string, userEmail: string, seats: number = 1) => {
    const event = events.find((e) => e.id === eventId);
    if (!event) return { success: false, message: 'Event not found.' };

    const remaining = event.totalSeats - event.reservedSeats;
    if (remaining < seats) {
      return { success: false, message: `Only ${remaining} seats remaining for this event.` };
    }

    // Update reserved seat count
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, reservedSeats: e.reservedSeats + seats } : e))
    );

    const ticketId = `TKT-EDV-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket: EventTicket = {
      ticketId,
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      userName,
      userEmail,
      seatsCount: seats,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EDUVORA-TICKET-${ticketId}-${event.id}`,
      bookedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setUserTickets((prev) => [newTicket, ...prev]);

    addToast({
      type: 'success',
      title: 'RSVP Confirmed!',
      message: `Your pass for "${event.title}" has been issued.`,
    });

    return { success: true, ticket: newTicket, message: 'Ticket confirmed!' };
  };

  const cancelRsvp = (ticketId: string) => {
    const ticket = userTickets.find((t) => t.ticketId === ticketId);
    if (ticket) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === ticket.eventId ? { ...e, reservedSeats: Math.max(0, e.reservedSeats - ticket.seatsCount) } : e
        )
      );
      setUserTickets((prev) => prev.filter((t) => t.ticketId !== ticketId));
      addToast({
        type: 'info',
        title: 'RSVP Cancelled',
        message: 'Your seat has been released back to the event pool.',
      });
    }
  };

  const joinClub = (clubId: string, applicantData: { name: string; email: string; year: string; reason: string }) => {
    if (!joinedClubIds.includes(clubId)) {
      setJoinedClubIds((prev) => [...prev, clubId]);
      addToast({
        type: 'success',
        title: 'Membership Request Sent!',
        message: `Welcome to the club! The faculty advisor & student lead will connect via ${applicantData.email}.`,
      });
      return true;
    }
    return false;
  };

  const loginAsStudent = () => {
    setIsAuthenticated(true);
    setUserRole('student');
    addToast({
      type: 'success',
      title: 'Logged in as Student',
      message: `Welcome back, ${studentProfile.name}!`,
    });
  };

  const loginAsApplicant = (refId: string = 'EDV-2026-8942') => {
    setIsAuthenticated(true);
    setUserRole('applicant');
    addToast({
      type: 'info',
      title: 'Logged in as Applicant',
      message: `Viewing active application dossier (${refId}).`,
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('guest');
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been safely signed out of the Eduvora portal.',
    });
  };

  const payStudentInvoice = (invoiceId: string) => {
    setStudentProfile((prev) => {
      const updatedInvoices = prev.invoices.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'Paid' as const,
            paidDate: `${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} via Online Portal`,
          };
        }
        return inv;
      });
      return {
        ...prev,
        invoices: updatedInvoices,
        tuitionStatus: 'Paid in Full',
      };
    });

    addToast({
      type: 'success',
      title: 'Tuition Payment Confirmed',
      message: 'Official university receipt generated and balance cleared.',
    });
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        selectedCourseForApply,
        setSelectedCourseForApply,
        activeCourseDetailModal,
        setActiveCourseDetailModal,
        comparedCourseIds,
        toggleCompareCourse,
        clearComparedCourses,
        savedCourseIds,
        toggleSaveCourse,
        applications,
        addNewApplication,
        getApplicationByRef,
        updateApplicationStage,
        events,
        userTickets,
        rsvpEvent,
        cancelRsvp,
        clubs,
        joinedClubIds,
        joinClub,
        isAuthenticated,
        userRole,
        loginAsStudent,
        loginAsApplicant,
        logout,
        studentProfile,
        payStudentInvoice,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
