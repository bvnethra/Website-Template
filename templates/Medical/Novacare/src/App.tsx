import React, { useState, useEffect } from 'react';
import { Doctor, Department, Service, Appointment, ToastNotification } from './types';
import { mockApi } from './services/mockApi';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { AboutSection } from './components/AboutSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { ServicesSection } from './components/ServicesSection';
import { DoctorDirectory } from './components/DoctorDirectory';
import { EmergencySection } from './components/EmergencySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals & Widgets
import { AppointmentModal } from './components/AppointmentModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  // Data State
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState<boolean>(true);

  // Active Navigation
  const [activeSection, setActiveSection] = useState<string>('home');

  // Search/Filter Jump State
  const [doctorSearchQuery, setDoctorSearchQuery] = useState<string>('');
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState<string>('All');

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState<boolean>(false);
  const [activeDoctorProfile, setActiveDoctorProfile] = useState<Doctor | null>(null);
  const [activeDepartmentDetail, setActiveDepartmentDetail] = useState<Department | null>(null);
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);

  // Pre-filled booking parameters
  const [bookingPrefillDoctor, setBookingPrefillDoctor] = useState<Doctor | null>(null);
  const [bookingPrefillDepartment, setBookingPrefillDepartment] = useState<string | null>(null);
  const [bookingPrefillDate, setBookingPrefillDate] = useState<string | undefined>(undefined);
  const [bookingPrefillTime, setBookingPrefillTime] = useState<string | undefined>(undefined);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastNotification = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initial Data Fetch
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoadingDoctors(true);
        const [docsData, deptsData, srvsData, apptsData] = await Promise.all([
          mockApi.getDoctors(),
          mockApi.getDepartments(),
          mockApi.getServices(),
          mockApi.getAppointments()
        ]);
        setDoctors(docsData);
        setDepartments(deptsData);
        setServices(srvsData);
        setAppointments(apptsData);
      } catch (err) {
        showToast('Error Loading Data', 'Failed to retrieve clinical information.', 'error');
      } finally {
        setIsLoadingDoctors(false);
      }
    }
    loadData();
  }, []);

  // Section observer for active navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'departments', 'services', 'doctors', 'emergency', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(`${sectionId}-section`) || (sectionId === 'home' ? document.getElementById('hero-section') : null);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Helper
  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(`${sectionId}-section`);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle Opening Booking Modal
  const handleOpenBooking = (
    doctor: Doctor | null = null,
    departmentName: string | null = null,
    date?: string,
    time?: string
  ) => {
    setBookingPrefillDoctor(doctor);
    setBookingPrefillDepartment(departmentName || doctor?.department || null);
    setBookingPrefillDate(date);
    setBookingPrefillTime(time);
    setIsBookingOpen(true);
  };

  // Appointment Created Callback
  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
    showToast(
      'Appointment Confirmed',
      `Booking ${newAppointment.id} with ${newAppointment.doctorName} registered successfully!`,
      'success'
    );
  };

  // Appointment Cancelled Callback
  const handleAppointmentCancelled = (cancelledId: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === cancelledId ? { ...app, status: 'Cancelled' } : app))
    );
    showToast('Appointment Cancelled', `Appointment ${cancelledId} has been cancelled.`, 'info');
  };

  // Search Doctors Helper from Hero or LiveChat
  const handleSearchDoctorsFromHero = (query: string) => {
    setDoctorSearchQuery(query);
    navigateToSection('doctors');
  };

  // Active confirmed appointment count
  const confirmedAppointmentsCount = appointments.filter((a) => a.status === 'Confirmed').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-[#15213D]">
      
      {/* Global Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Global Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        onOpenEmergency={() => navigateToSection('emergency')}
        appointmentCount={confirmedAppointmentsCount}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onSearchDoctors={handleSearchDoctorsFromHero}
          onNavigateTo={navigateToSection}
          onOpenEmergency={() => navigateToSection('emergency')}
        />

        {/* 2. Trust Statistics */}
        <TrustStats onNavigateTo={navigateToSection} />

        {/* 3. About Section */}
        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
          onNavigateTo={navigateToSection}
        />

        {/* 4. Departments Section */}
        <DepartmentsSection
          departments={departments}
          onSelectDepartment={(dept) => setActiveDepartmentDetail(dept)}
          onOpenBookingWithDepartment={(deptName) => handleOpenBooking(null, deptName)}
        />

        {/* 5. Services Section */}
        <ServicesSection
          services={services}
          onSelectService={(srv) => setActiveServiceDetail(srv)}
          onBookService={(srv) => {
            const matchedDept = departments.find((d) => d.id === srv.relatedDepartmentId);
            handleOpenBooking(null, matchedDept?.name || null);
          }}
        />

        {/* 6. Doctors Directory with Search & Filter */}
        <DoctorDirectory
          doctors={doctors}
          isLoading={isLoadingDoctors}
          onViewDoctorProfile={(doc) => setActiveDoctorProfile(doc)}
          onBookDoctor={(doc) => handleOpenBooking(doc)}
          initialSearchQuery={doctorSearchQuery}
          initialSpecialty={doctorSpecialtyFilter}
        />

        {/* 7. Emergency Information & 24/7 Hotlines */}
        <EmergencySection />

        {/* 8. Contact & Map Section */}
        <ContactSection onShowToast={showToast} />
      </main>

      {/* 9. Global Footer */}
      <Footer
        onNavigateTo={navigateToSection}
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => navigateToSection('emergency')}
        onShowToast={showToast}
      />

      {/* Interactive Floating Live Chat Demo Assistant */}
      <LiveChatWidget
        onOpenBooking={() => handleOpenBooking()}
        onOpenEmergency={() => navigateToSection('emergency')}
        onNavigateTo={navigateToSection}
      />

      {/* ================= MODALS ================= */}

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctors={doctors}
        departments={departments}
        preselectedDoctor={bookingPrefillDoctor}
        preselectedDepartment={bookingPrefillDepartment}
        preselectedDate={bookingPrefillDate}
        preselectedTime={bookingPrefillTime}
        onAppointmentCreated={handleAppointmentCreated}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
      />

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={activeDoctorProfile}
        onClose={() => setActiveDoctorProfile(null)}
        onBookAppointment={(doc, date, time) => {
          setActiveDoctorProfile(null);
          handleOpenBooking(doc, doc.department, date, time);
        }}
      />

      {/* Department Detail Modal */}
      <DepartmentDetailModal
        department={activeDepartmentDetail}
        doctors={doctors}
        onClose={() => setActiveDepartmentDetail(null)}
        onBookDepartment={(deptName) => {
          handleOpenBooking(null, deptName);
        }}
        onSelectDoctor={(doc) => {
          setActiveDepartmentDetail(null);
          setActiveDoctorProfile(doc);
        }}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onBookService={(srv) => {
          const matchedDept = departments.find((d) => d.id === srv.relatedDepartmentId);
          handleOpenBooking(null, matchedDept?.name || null);
        }}
      />

      {/* My Appointments Dashboard Modal */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onAppointmentCancelled={handleAppointmentCancelled}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
