import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  BellRing, 
  FileEdit, 
  Download, 
  Award, 
  FileText, 
  ShieldCheck, 
  Scale, 
  User, 
  HelpCircle, 
  Shield, 
  LogOut, 
  Menu, 
  X, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Search
} from 'lucide-react';

// Views
import { DashboardView } from './views/DashboardView';
import { NoticeBoardView } from './views/NoticeBoardView';
import { ExamApplyView } from './views/ExamApplyView';
import { HallTicketView } from './views/HallTicketView';
import { ExamResultsView } from './views/ExamResultsView';
import { PhotocopyView } from './views/PhotocopyView';
import { RevaluationView } from './views/RevaluationView';
import { ReviewView } from './views/ReviewView';
import { ProfileView } from './views/ProfileView';
import { SupportView } from './views/SupportView';
import { SecurityView } from './views/SecurityView';

interface StudentPortalLayoutProps {
  initialTab?: string;
}

export const StudentPortalLayout: React.FC<StudentPortalLayoutProps> = ({ initialTab = 'dashboard' }) => {
  const { currentUser, logout, notices } = useAuth();
  const { addToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL or fallback
  const getTabFromPath = () => {
    const path = location.pathname.replace('/portal', '').replace('/', '');
    if (!path || path === '') return 'dashboard';
    return path;
  };

  const [activeTab, setActiveTab] = useState<string>(getTabFromPath());
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync state if location changes
  React.useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
    navigate(tabId === 'dashboard' ? '/portal' : `/portal/${tabId}`);
  };

  const handleLogout = () => {
    logout();
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been securely signed out of the Examination Portal.'
    });
    navigate('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notices', label: 'Notice Board', icon: BellRing, badge: notices.length },
    { id: 'exam-apply', label: 'Exam Application', icon: FileEdit },
    { id: 'hall-ticket', label: 'Download Hall Ticket', icon: Download, highlight: true },
    { id: 'results', label: 'Exam Results', icon: Award },
    { id: 'photocopy', label: 'Photocopy Application', icon: FileText },
    { id: 'revaluation', label: 'Revaluation Hub', icon: ShieldCheck },
    { id: 'review', label: 'Review Hub', icon: Scale },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'support', label: 'Support / Grievance', icon: HelpCircle },
    { id: 'security', label: 'Login History & Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#0D2F2F] flex flex-col font-sans">
      
      {/* Top Universal Banner */}
      <div className="bg-[#0D2F2F] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-white/10 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Eduvora University Public Portal</span>
          </Link>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">Controller of Examinations Autonomous Portal</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-300 font-mono text-[11px] font-bold hidden md:inline">
            ● Secure Candidate Gateway
          </span>
          <button
            onClick={handleLogout}
            id="btn-portal-top-logout"
            className="text-white/80 hover:text-white flex items-center gap-1 font-semibold text-xs transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:flex w-72 flex-col bg-white border-r border-[#E8EAE3] p-4 shrink-0 shadow-xs justify-between overflow-y-auto">
          <div className="space-y-6">
            
            {/* Student ID Profile Badge */}
            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-xl object-cover border border-[#0D2F2F]"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading font-bold text-xs text-[#0D2F2F] truncate">
                    {currentUser.name}
                  </h3>
                  <p className="font-mono text-[10px] font-bold text-[#FF6B4A]">
                    {currentUser.studentId}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8EAE3] text-[10px] text-[#4A5D4E] flex items-center justify-between font-medium">
                <span>Sem {currentUser.semester} ({currentUser.section})</span>
                <span className="text-emerald-700 font-bold">CGPA: {currentUser.cgpa}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              <span className="text-[10px] font-bold text-[#4A5D4E] uppercase tracking-wider px-3 mb-2 block">
                Examination Services
              </span>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-[#0D2F2F] text-white shadow-xs'
                        : item.highlight
                        ? 'bg-[#FFF2EE] text-[#FF6B4A] hover:bg-[#FFE6DF]'
                        : 'text-[#4A5D4E] hover:bg-[#F4F1EA] hover:text-[#0D2F2F]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF6B4A]' : item.highlight ? 'text-[#FF6B4A]' : 'text-[#4A5D4E]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#0D2F2F] text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Sidebar Footer Support info */}
          <div className="pt-4 border-t border-[#E8EAE3] space-y-2">
            <div className="p-3 bg-[#F4F1EA] rounded-xl text-[11px] text-[#4A5D4E] space-y-1">
              <span className="font-bold text-[#0D2F2F] block">COE Helpline</span>
              <p>examdesk@eduvora.edu</p>
              <p>Ext. 4082 (Mon-Fri 9AM-5PM)</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
              onClick={() => setIsMobileSidebarOpen(false)} 
            />
            <div className="relative w-72 max-w-[85vw] bg-white h-full p-4 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#0D2F2F] text-white flex items-center justify-center font-heading font-black text-lg">
                      E
                    </div>
                    <span className="font-heading text-sm font-bold text-[#0D2F2F]">Eduvora Portal</span>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-2 rounded-lg text-[#4A5D4E] hover:bg-[#F4F1EA]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="p-3.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] flex items-center gap-3">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-[#0D2F2F]">{currentUser.name}</h4>
                    <p className="font-mono text-[10px] text-[#4A5D4E]">{currentUser.studentId}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          isActive
                            ? 'bg-[#0D2F2F] text-white'
                            : 'text-[#4A5D4E] hover:bg-[#F4F1EA]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] bg-[#0D2F2F] text-white px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-xs font-bold text-red-600 bg-red-50 rounded-xl"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#F7F4EE]">
          
          {/* Top Bar for Mobile & Breadcrumb View */}
          <div className="bg-white px-4 sm:px-8 py-3.5 border-b border-[#E8EAE3] flex items-center justify-between sticky top-0 z-20 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#0D2F2F] hover:bg-[#F4F1EA]"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#4A5D4E] font-medium hidden sm:inline">Student Portal</span>
                <ChevronRight className="w-3 h-3 text-[#4A5D4E] hidden sm:inline" />
                <span className="font-bold text-[#0D2F2F] capitalize">
                  {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleTabChange('notices')}
                className="p-2 rounded-xl bg-[#F4F1EA] text-[#0D2F2F] hover:bg-[#E8EAE3] relative transition-colors"
                title="Circulars & Notices"
              >
                <BellRing className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B4A] rounded-full" />
              </button>

              <div 
                onClick={() => handleTabChange('profile')}
                className="flex items-center gap-2.5 pl-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-lg object-cover border border-[#0D2F2F]"
                />
                <span className="font-bold text-xs text-[#0D2F2F] hidden sm:inline">
                  {currentUser.name}
                </span>
              </div>
            </div>
          </div>

          {/* Sub-view Rendering Container */}
          <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
            {activeTab === 'dashboard' && <DashboardView onNavigate={handleTabChange} />}
            {activeTab === 'notices' && <NoticeBoardView />}
            {activeTab === 'exam-apply' && <ExamApplyView />}
            {activeTab === 'hall-ticket' && <HallTicketView />}
            {activeTab === 'results' && <ExamResultsView onNavigate={handleTabChange} />}
            {activeTab === 'photocopy' && <PhotocopyView />}
            {activeTab === 'revaluation' && <RevaluationView />}
            {activeTab === 'review' && <ReviewView />}
            {activeTab === 'profile' && <ProfileView />}
            {activeTab === 'support' && <SupportView />}
            {activeTab === 'security' && <SecurityView />}
          </div>

        </main>

      </div>

    </div>
  );
};
