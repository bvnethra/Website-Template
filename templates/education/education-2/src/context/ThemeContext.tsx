import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UniversityConfig, ThemePreset, NotificationItem } from '../types';
import { defaultUniversityConfig, themePresets } from '../config/templateConfig';

interface ThemeContextType {
  theme: ThemePreset;
  setThemeById: (id: string) => void;
  config: UniversityConfig;
  updateConfig: (updater: Partial<UniversityConfig> | ((prev: UniversityConfig) => UniversityConfig)) => void;
  isApplyModalOpen: boolean;
  applyProgramId?: string;
  openApplyModal: (programId?: string) => void;
  closeApplyModal: () => void;
  isBrochureModalOpen: boolean;
  brochureProgramId?: string;
  openBrochureModal: (programId?: string) => void;
  closeBrochureModal: () => void;
  isTourModalOpen: boolean;
  openTourModal: () => void;
  closeTourModal: () => void;
  isTuitionCalcOpen: boolean;
  openTuitionCalc: () => void;
  closeTuitionCalc: () => void;
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isStudentPortalOpen: boolean;
  openStudentPortal: () => void;
  closeStudentPortal: () => void;
  isParentPortalOpen: boolean;
  openParentPortal: () => void;
  closeParentPortal: () => void;
  isNotificationsDrawerOpen: boolean;
  openNotificationsDrawer: () => void;
  closeNotificationsDrawer: () => void;
  isProspectusModalOpen: boolean;
  openProspectusModal: () => void;
  closeProspectusModal: () => void;
  isCompareModalOpen: boolean;
  compareProgramIds: string[];
  toggleCompareProgram: (id: string) => void;
  openCompareModal: () => void;
  closeCompareModal: () => void;
  savedPrograms: string[];
  toggleSaveProgram: (id: string) => void;
  savedEvents: string[];
  toggleSaveEvent: (id: string) => void;
  notifications: NotificationItem[];
  addNotification: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeNotification: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const safeStorage = {
  getItem: (key: string): string | null => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  setItem: (key: string, value: string): void => {
    try { localStorage.setItem(key, value); } catch (e) {}
  },
  removeItem: (key: string): void => {
    try { localStorage.removeItem(key); } catch (e) {}
  }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemePreset>(() => {
    const saved = safeStorage.getItem('edunexa_theme_id');
    const match = themePresets.find((t) => t.id === saved);
    return match || themePresets[0];
  });

  const [config, setConfig] = useState<UniversityConfig>(() => {
    const saved = safeStorage.getItem('edunexa_univ_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUniversityConfig;
      }
    }
    return defaultUniversityConfig;
  });

  // Modal states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyProgramId, setApplyProgramId] = useState<string | undefined>(undefined);

  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [brochureProgramId, setBrochureProgramId] = useState<string | undefined>(undefined);

  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isTuitionCalcOpen, setIsTuitionCalcOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isParentPortalOpen, setIsParentPortalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isProspectusModalOpen, setIsProspectusModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareProgramIds, setCompareProgramIds] = useState<string[]>([]);

  // Bookmarks
  const [savedPrograms, setSavedPrograms] = useState<string[]>(() => {
    try {
      return JSON.parse(safeStorage.getItem('edunexa_saved_programs') || '[]');
    } catch {
      return [];
    }
  });

  const [savedEvents, setSavedEvents] = useState<string[]>(() => {
    try {
      return JSON.parse(safeStorage.getItem('edunexa_saved_events') || '[]');
    } catch {
      return [];
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Update theme & inject CSS variables
  const setThemeById = (id: string) => {
    const target = themePresets.find((t) => t.id === id);
    if (target) {
      setThemeState(target);
      safeStorage.setItem('edunexa_theme_id', target.id);
      addNotification('info', 'Academic Palette Updated', `Applied "${target.name}" style preset.`);
    }
  };

  const updateConfig = (updater: Partial<UniversityConfig> | ((prev: UniversityConfig) => UniversityConfig)) => {
    setConfig((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      safeStorage.setItem('edunexa_univ_config', JSON.stringify(next));
      return next;
    });
  };

  const openApplyModal = (programId?: string) => {
    setApplyProgramId(programId);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setApplyProgramId(undefined);
  };

  const openBrochureModal = (programId?: string) => {
    setBrochureProgramId(programId);
    setIsBrochureModalOpen(true);
  };

  const closeBrochureModal = () => {
    setIsBrochureModalOpen(false);
    setBrochureProgramId(undefined);
  };

  const openTourModal = () => setIsTourModalOpen(true);
  const closeTourModal = () => setIsTourModalOpen(false);

  const openTuitionCalc = () => setIsTuitionCalcOpen(true);
  const closeTuitionCalc = () => setIsTuitionCalcOpen(false);

  const openCustomizer = () => setIsCustomizerOpen(true);
  const closeCustomizer = () => setIsCustomizerOpen(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openStudentPortal = () => setIsStudentPortalOpen(true);
  const closeStudentPortal = () => setIsStudentPortalOpen(false);

  const openParentPortal = () => setIsParentPortalOpen(true);
  const closeParentPortal = () => setIsParentPortalOpen(false);

  const openNotificationsDrawer = () => setIsNotificationsDrawerOpen(true);
  const closeNotificationsDrawer = () => setIsNotificationsDrawerOpen(false);

  const openProspectusModal = () => setIsProspectusModalOpen(true);
  const closeProspectusModal = () => setIsProspectusModalOpen(false);

  const openCompareModal = () => setIsCompareModalOpen(true);
  const closeCompareModal = () => setIsCompareModalOpen(false);

  const toggleCompareProgram = (id: string) => {
    setCompareProgramIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((p) => p !== id);
      }
      if (prev.length >= 3) {
        addNotification('warning', 'Comparison Limit', 'You can compare up to 3 programs simultaneously.');
        return prev;
      }
      return [...prev, id];
    });
  };

  const toggleSaveProgram = (id: string) => {
    setSavedPrograms((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((p) => p !== id) : [...prev, id];
      safeStorage.setItem('edunexa_saved_programs', JSON.stringify(updated));
      addNotification(
        exists ? 'info' : 'success',
        exists ? 'Program Removed' : 'Program Saved to Shortlist',
        exists ? 'Program removed from your bookmarked tray.' : 'Program saved for quick reference & comparison.'
      );
      return updated;
    });
  };

  const toggleSaveEvent = (id: string) => {
    setSavedEvents((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((e) => e !== id) : [...prev, id];
      safeStorage.setItem('edunexa_saved_events', JSON.stringify(updated));
      addNotification(
        exists ? 'info' : 'success',
        exists ? 'Event Removed' : 'Event RSVP Confirmed',
        exists ? 'Event removed from your saved calendar.' : 'Event RSVP saved to your personal schedule.'
      );
      return updated;
    });
  };

  const addNotification = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const newNotif: NotificationItem = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      title,
      message,
      timestamp: Date.now(),
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 6)]);

    setTimeout(() => {
      removeNotification(newNotif.id);
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Keyboard shortcut for Command Search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Synchronize CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.primaryHover);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-accent-hover', theme.accentHover);
    root.style.setProperty('--color-gold', theme.gold);
    root.style.setProperty('--color-surface', theme.surface);
    root.style.setProperty('--color-badge', theme.badge);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeById,
        config,
        updateConfig,
        isApplyModalOpen,
        applyProgramId,
        openApplyModal,
        closeApplyModal,
        isBrochureModalOpen,
        brochureProgramId,
        openBrochureModal,
        closeBrochureModal,
        isTourModalOpen,
        openTourModal,
        closeTourModal,
        isTuitionCalcOpen,
        openTuitionCalc,
        closeTuitionCalc,
        isCustomizerOpen,
        openCustomizer,
        closeCustomizer,
        isSearchOpen,
        openSearch,
        closeSearch,
        isStudentPortalOpen,
        openStudentPortal,
        closeStudentPortal,
        isParentPortalOpen,
        openParentPortal,
        closeParentPortal,
        isNotificationsDrawerOpen,
        openNotificationsDrawer,
        closeNotificationsDrawer,
        isProspectusModalOpen,
        openProspectusModal,
        closeProspectusModal,
        isCompareModalOpen,
        compareProgramIds,
        toggleCompareProgram,
        openCompareModal,
        closeCompareModal,
        savedPrograms,
        toggleSaveProgram,
        savedEvents,
        toggleSaveEvent,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
