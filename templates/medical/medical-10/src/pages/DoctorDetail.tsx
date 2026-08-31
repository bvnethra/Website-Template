import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Calendar,
  Clock,
  Award,
  Globe,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Building
} from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const DoctorDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const doctor = DOCTORS.find(d => d.slug === slug || d.id === slug);

  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [consultType, setConsultType] = useState<'In-person Consultation' | 'Video Telehealth'>('In-person Consultation');

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Doctor Profile Not Found</h2>
        <p className="text-slate-600">The physician profile you requested could not be located in our directory.</p>
        <Link to="/doctors">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Doctor Directory
          </Button>
        </Link>
      </div>
    );
  }

  const activeDaySchedule = doctor.schedule.find(s => s.day === selectedDay) || doctor.schedule[0];

  const handleProceedBooking = () => {
    if (!selectedSlot) {
      showToast('Select Time Slot', 'Please choose a consultation time slot from the schedule matrix below.', 'info');
      return;
    }
    navigate(`/appointments?doctorId=${doctor.id}&departmentId=${doctor.departmentId}&timeSlot=${encodeURIComponent(selectedSlot)}&type=${encodeURIComponent(consultType)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Doctors Directory</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 relative flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-4 border-white shadow-soft"
              onError={(e) => {
                const initials = doctor.name.replace(/^Dr\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'DR';
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#155EEF"/><stop offset="100%" stop-color="#12B8A6"/></linearGradient></defs><rect width="300" height="300" rx="44" fill="url(#g)"/><circle cx="150" cy="150" r="110" fill="none" stroke="#FFF" stroke-opacity="0.2" stroke-width="6"/><text x="50%" y="54%" font-family="sans-serif" font-size="96" font-weight="800" fill="#FFF" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
                (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
              }}
            />
            {doctor.isAvailableToday && (
              <span className="absolute bottom-2 right-2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-white shadow-soft">
                Available Today
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-amber-500 bg-amber-50 px-4 py-1.5 rounded-full font-bold text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{doctor.rating.toFixed(1)} Rating</span>
            <span className="text-slate-400 font-normal">({doctor.reviewCount} patient reviews)</span>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="primary" size="md">
                {doctor.specialty}
              </Badge>
              <Badge variant="secondary" size="md">
                {doctor.departmentName} Department
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{doctor.name}</h1>
            <p className="text-slate-600 font-medium text-base mt-1">{doctor.title}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs">Experience</p>
                <p className="font-bold text-slate-900">{doctor.experienceYears} Years Clinical</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-secondary flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs">Languages</p>
                <p className="font-bold text-slate-900">{doctor.languages.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <p className="text-slate-400 font-medium text-xs">Clinic Hub</p>
                <p className="font-bold text-slate-900 truncate">{doctor.location}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium block">Standard Consultation Fee</span>
              <span className="text-2xl font-extrabold text-slate-900">${doctor.fee} USD</span>
            </div>

            <Button variant="primary" size="lg" onClick={handleProceedBooking} leftIcon={<Calendar className="w-5 h-5" />}>
              Schedule Appointment
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> About {doctor.name}
            </h3>
            <p className="text-slate-600 leading-relaxed text-base">{doctor.biography}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-3">Core Areas of Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.expertise.map((item, idx) => (
                  <span key={idx} className="bg-blue-50 text-primary font-semibold text-xs px-3.5 py-1.5 rounded-full border border-blue-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-lg mb-3">Clinical Services Provided</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                {doctor.servicesOffered.map((srv, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-3">Education & Credentials</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-lg mb-3">Board Affiliations</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {doctor.affiliations.map((aff, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                    <span>{aff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Patient Reviews ({doctor.reviews.length})
              </h3>
              <div className="flex items-center gap-1 font-bold text-amber-500 text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{doctor.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {doctor.reviews.map(rev => (
                <div key={rev.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-xs italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6 sticky top-28">
            <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Consulting Schedule Matrix
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">Select Consultation Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setConsultType('In-person Consultation')}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-colors ${
                    consultType === 'In-person Consultation'
                      ? 'bg-blue-50 border-primary text-primary'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  In-Person Clinic
                </button>
                <button
                  onClick={() => setConsultType('Video Telehealth')}
                  className={`p-3 rounded-2xl text-xs font-bold border transition-colors ${
                    consultType === 'Video Telehealth'
                      ? 'bg-teal-50 border-secondary text-secondary-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  24/7 Telehealth
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">Available Practice Days</label>
              <div className="flex flex-wrap gap-2">
                {doctor.schedule.map(s => (
                  <button
                    key={s.day}
                    onClick={() => {
                      setSelectedDay(s.day);
                      setSelectedSlot('');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedDay === s.day
                        ? 'bg-primary text-white border-primary shadow-soft'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Available Time Slots for <strong className="text-slate-900">{selectedDay}</strong>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {activeDaySchedule.slots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSlot === slot
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-soft'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {selectedSlot && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1">
                <p className="font-bold text-emerald-900">Selected Appointment Slot:</p>
                <p className="text-emerald-700 font-semibold">
                  {selectedDay} at {selectedSlot} ({consultType})
                </p>
              </div>
            )}

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-glow"
              onClick={handleProceedBooking}
              leftIcon={<Calendar className="w-5 h-5" />}
            >
              Book Selected Slot
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
