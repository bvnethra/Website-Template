import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone,
  Star,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { DoctorCard } from '../components/ui/DoctorCard';
import { DepartmentCard } from '../components/ui/DepartmentCard';
import { BlogCard } from '../components/ui/BlogCard';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Badge } from '../components/ui/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { DOCTORS } from '../data/doctors';
import { DEPARTMENTS } from '../data/departments';
import { SERVICES } from '../data/services';
import { BLOG_ARTICLES } from '../data/blog';
import { TESTIMONIALS } from '../data/testimonials';
import { FAQS } from '../data/faqs';
import { CLINIC_LOCATIONS } from '../data/locations';
import { useToast } from '../context/ToastContext';

const HERO_SLIDES = [
  { image: '/images/hero/pexels-shvetsa-4769133.jpg', alt: 'CareNova Surgical Suite & Operating Room' },
  { image: '/images/hero/pexels-tima-miroshnichenko-6011667.jpg', alt: 'CareNova Physician & Patient Care' },
  { image: '/images/hero/pexels-cottonbro-8657359.jpg', alt: 'CareNova Clinical Examination' },
  { image: '/images/hero/pexels-rdne-6129444.jpg', alt: 'CareNova Medical Specialists' },
  { image: '/images/hero/pexels-gustavo-fring-8770713.jpg', alt: 'CareNova Diagnostic Care' }
];

export const Home: React.FC = () => {
  const { showToast } = useToast();
  const [activeFaq, setActiveFaq] = useState<string | null>(FAQS[0].id);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [heroIdx, setHeroIdx] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx(prev => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const featuredDoctors = DOCTORS.slice(0, 4);
  const featuredDepartments = DEPARTMENTS.slice(0, 4);
  const featuredServices = SERVICES.slice(0, 3);
  const featuredArticles = BLOG_ARTICLES.slice(0, 3);

  const nextTestimonial = () => {
    setTestimonialIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Validation Error', 'Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed!', 'Thank you for subscribing to CareNova Health updates.', 'success');
    setNewsletterEmail('');
  };

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      {/* 2. SPLIT HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="primary" size="md" dot className="shadow-sm">
                Trusted Healthcare Network 2026
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Healthcare that puts your wellbeing <span className="text-gradient">first.</span>
              </h1>

              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                CareNova Health connects you with top-tier medical specialists, 24/7 virtual care, and state-of-the-art diagnostic facilities for compassionate, long-term health outcomes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/doctors" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-glow" leftIcon={<Search className="w-5 h-5" />}>
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/appointments" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<Calendar className="w-5 h-5 text-primary" />}>
                    Book an Appointment
                  </Button>
                </Link>
              </div>

              {/* Trust Stats Bar */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">50+</h4>
                  <p className="text-xs text-slate-500 font-medium">Board Specialists</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">20+</h4>
                  <p className="text-xs text-slate-500 font-medium">Departments</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">24/7</h4>
                  <p className="text-xs text-slate-500 font-medium">Urgent Telehealth</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image + Floating Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl bg-white group">
                  <img
                    key={heroIdx}
                    src={HERO_SLIDES[heroIdx].image}
                    alt={HERO_SLIDES[heroIdx].alt}
                    className="w-full h-[460px] object-cover object-center transition-all duration-700 animate-in fade-in"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                  {/* Carousel Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-20 bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    {HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroIdx(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === heroIdx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Card 1: Next Available */}
                <div className="absolute top-3 left-3 sm:-top-4 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-lg border border-slate-100 flex items-center gap-2.5 sm:gap-3 animate-float z-10">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Next Available</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">Today, 02:30 PM</p>
                  </div>
                </div>

                {/* Floating Card 2: 98% Satisfaction */}
                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-soft-lg border border-slate-100 flex items-center gap-2.5 sm:gap-3 animate-float z-10" style={{ animationDelay: '1.5s' }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-slate-900 text-xs sm:text-sm">4.9 / 5.0</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium">98% Patient Satisfaction</p>
                  </div>
                </div>

                {/* Floating Card 3: 24/7 Support */}
                <div className="absolute top-1/2 right-3 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-soft-lg border border-slate-100 hidden sm:flex items-center gap-2.5 sm:gap-3 animate-float z-10" style={{ animationDelay: '2.5s' }}>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">HIPAA Certified</p>
                    <p className="text-[10px] text-slate-500">Encrypted Data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK ACTIONS GRID */}
      <ScrollReveal direction="up" delay={0.1}>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Search,
                title: 'Find a Specialist',
                desc: 'Filter 50+ board-certified doctors by department, language, or availability.',
                link: '/doctors',
                color: 'bg-blue-50 text-primary'
              },
              {
                icon: Calendar,
                title: 'Book Appointment',
                desc: 'Schedule in 5 quick steps with instant appointment confirmation.',
                link: '/appointments',
                color: 'bg-teal-50 text-secondary'
              },
              {
                icon: Stethoscope,
                title: 'Explore Departments',
                desc: 'Discover our 12 clinical centers of excellence and care programs.',
                link: '/departments',
                color: 'bg-indigo-50 text-indigo-600'
              },
              {
                icon: Clock,
                title: 'View Doctor Timetable',
                desc: 'Check live weekly schedules and available consulting slots.',
                link: '/timetable',
                color: 'bg-amber-50 text-amber-600'
              }
            ].map((act, idx) => (
              <Link
                key={idx}
                to={act.link}
                className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${act.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <act.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">{act.title}</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">{act.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Access Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. EMERGENCY CARE BANNER */}
      <ScrollReveal direction="zoom">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="bg-white/20 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                24/7 Emergency Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">Require Urgent Medical Attention?</h2>
              <p className="text-red-100 text-sm max-w-xl">
                Our Level 1 Trauma Center is open 24 hours a day, 365 days a year. Immediate ambulance dispatch available.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="tel:5559112273"
                className="w-full sm:w-auto bg-white hover:bg-slate-100 text-red-600 font-extrabold px-6 py-4 rounded-2xl transition-colors shadow-soft text-center flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5 animate-pulse" />
                <span>Call (555) 911-CARE</span>
              </a>
              <Link to="/locations" className="w-full sm:w-auto">
                <Button variant="outline-light" size="lg" className="w-full">
                  View Emergency ER Locations
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 5. DEPARTMENT EXPLORER GRID */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="primary" size="md" className="mb-2">
                Centers of Excellence
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Explore Our Departments</h2>
              <p className="text-slate-600 text-base mt-2 max-w-xl">
                Specialized medical centers providing comprehensive diagnosis, therapeutic treatments, and rehabilitation.
              </p>
            </div>
            <Link to="/departments">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All 12 Departments
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDepartments.map(dept => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 6. FEATURED DOCTORS */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="secondary" size="md" className="mb-2">
                Medical Leadership
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Featured Specialists</h2>
              <p className="text-slate-600 text-base mt-2 max-w-xl">
                Consult with board-certified physicians committed to providing personalized patient-first care.
              </p>
            </div>
            <Link to="/doctors">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Browse Doctor Directory
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDoctors.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 7. HOW IT WORKS */}
      <ScrollReveal direction="zoom">
        <section className="bg-slate-900 text-white py-20 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 lg:px-12 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="primary" size="md" className="mb-3 bg-blue-900/50 text-blue-300 border-blue-700">
                Seamless Patient Experience
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How CareNova Works</h2>
              <p className="text-slate-400 text-base mt-3">
                Get access to world-class healthcare in 3 simple steps from your phone or desktop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: '01',
                  title: 'Find a Specialist',
                  desc: 'Filter our 50+ physicians by medical specialty, gender, insurance, or immediate availability.'
                },
                {
                  step: '02',
                  title: 'Choose Date & Time',
                  desc: 'Select in-person clinic visits or 24/7 video telehealth slots that fit your daily schedule.'
                },
                {
                  step: '03',
                  title: 'Receive Expert Care',
                  desc: 'Get personalized treatment, automated prescription refills, and lab tracking on your portal.'
                }
              ].map((st, i) => (
                <div key={i} className="relative bg-slate-800/80 rounded-3xl p-8 border border-slate-700 space-y-4">
                  <span className="text-4xl font-extrabold text-primary-400 block">{st.step}</span>
                  <h3 className="font-bold text-xl text-white">{st.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 8. SERVICES OVERVIEW */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="primary" size="md" className="mb-2">
                Comprehensive Offerings
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Clinical Services</h2>
              <p className="text-slate-600 text-base mt-2 max-w-xl">
                From preventive wellness physicals to high-precision imaging and diagnostic lab panels.
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map(srv => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 9. APPOINTMENT CTA BAND */}
      <ScrollReveal direction="zoom">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-primary rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 relative z-10 max-w-xl text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Ready to take charge of your health today?
              </h2>
              <p className="text-blue-100 text-base">
                Book a consultation with our experienced medical team. Same-day appointments available for urgent inquiries.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link to="/appointments" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full shadow-lg" leftIcon={<Calendar className="w-5 h-5" />}>
                  Schedule Appointment Now
                </Button>
              </Link>
              <Link to="/timetable" className="w-full sm:w-auto">
                <Button variant="outline-light" size="lg" className="w-full">
                  View Weekly Timetable
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 10. HEALTH LIBRARY PREVIEW */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="primary" size="md" className="mb-2">
                Medical Knowledge
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Health Library & Articles</h2>
              <p className="text-slate-600 text-base mt-2 max-w-xl">
                Stay informed with physician-backed articles, preventive tips, and medical research updates.
              </p>
            </div>
            <Link to="/health-library">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore All Articles
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map(art => (
              <BlogCard key={art.id} article={art} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 11. STATISTICS BAND */}
      <ScrollReveal direction="fade">
        <section className="bg-slate-50 border-y border-slate-200/80 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-primary">50+</p>
                <p className="text-slate-600 text-sm font-semibold mt-2">Specialist Doctors</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-secondary">20+</p>
                <p className="text-slate-600 text-sm font-semibold mt-2">Departments</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-slate-900">100K+</p>
                <p className="text-slate-600 text-sm font-semibold mt-2">Patients Served</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold text-primary">15+</p>
                <p className="text-slate-600 text-sm font-semibold mt-2">Years Excellence</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <p className="text-4xl sm:text-5xl font-extrabold text-amber-500">98%</p>
                <p className="text-slate-600 text-sm font-semibold mt-2">Patient Satisfaction</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 12. TESTIMONIALS CAROUSEL */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-soft relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Badge variant="secondary" size="md" className="mb-2">
                  Patient Stories
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">What Our Patients Say</h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 shrink-0">
                <img
                  src={TESTIMONIALS[testimonialIdx].avatar}
                  alt={TESTIMONIALS[testimonialIdx].name}
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-100 shadow-soft"
                  onError={(e) => {
                    const initials = TESTIMONIALS[testimonialIdx].name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PT';
                    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="gt" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0284C7"/><stop offset="100%" stop-color="#0D9488"/></linearGradient></defs><rect width="200" height="200" rx="40" fill="url(#gt)"/><circle cx="100" cy="100" r="75" fill="none" stroke="#FFF" stroke-opacity="0.2" stroke-width="4"/><text x="50%" y="54%" font-family="sans-serif" font-size="64" font-weight="800" fill="#FFF" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
                  }}
                />
              </div>
              <div className="md:col-span-8 space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(TESTIMONIALS[testimonialIdx].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed italic">
                  "{TESTIMONIALS[testimonialIdx].comment}"
                </blockquote>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{TESTIMONIALS[testimonialIdx].name}</h4>
                  <p className="text-xs text-primary font-semibold">{TESTIMONIALS[testimonialIdx].role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 13. FAQ ACCORDION */}
      <ScrollReveal direction="up">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="primary" size="md" className="mb-2">
              Got Questions?
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-base mt-2">
              Everything you need to know about booking appointments, insurance coverage, and telehealth services.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.slice(0, 5).map(faq => (
              <div key={faq.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft">
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-base hover:text-primary transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === faq.id ? 'rotate-90 text-primary' : ''}`} />
                </button>
                {activeFaq === faq.id && (
                  <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/faq" className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1">
              <span>View All FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* 14. LOCATIONS PREVIEW */}
      <ScrollReveal direction="up">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <Badge variant="secondary" size="md" className="mb-2">
                Convenient Locations
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">CareNova Medical Hubs</h2>
              <p className="text-slate-600 text-base mt-2">
                Modern medical centers conveniently situated with state-of-the-art facilities and free parking.
              </p>
            </div>
            <Link to="/locations">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Locations
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINIC_LOCATIONS.map(loc => (
              <div key={loc.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft flex flex-col justify-between">
                <div className="relative h-44">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
                  {loc.isPrimary && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-soft">
                      Flagship Center
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{loc.name}</h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-600">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{loc.address}, {loc.city}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-secondary shrink-0" />
                        <span>{loc.phone}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link to="/locations">
                      <Button variant="outline" size="sm" className="w-full">
                        Get Directions & Info
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 15. NEWSLETTER SIGNUP */}
      <ScrollReveal direction="zoom">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50/80 rounded-3xl p-8 sm:p-12 border border-blue-100 text-center space-y-6">
            <Badge variant="primary" size="md" className="mx-auto">
              Stay Informed
            </Badge>
            <h2 className="text-3xl font-extrabold text-slate-900">Subscribe to CareNova Health Insights</h2>
            <p className="text-slate-600 text-base max-w-xl mx-auto">
              Receive monthly physician-backed wellness articles, seasonal health alerts, and clinic news directly to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                required
              />
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </form>
            <p className="text-[11px] text-slate-400">We respect your privacy. Unsubscribe at any time with one click.</p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};
