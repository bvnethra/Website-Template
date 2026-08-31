'use client';

import React, { useState, useMemo } from 'react';
import { Search, Stethoscope, Star, CheckCircle, Video, Clock, X, Calendar, User } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  fee: number;
  rating: number;
  reviews: number;
  languages: string[];
  isAvailableNow: boolean;
  avatarText: string;
}

const mockDoctors: Doctor[] = [
  { id: 'doc-1', name: 'Dr. Ananya Sharma', specialty: 'general', qualification: 'MBBS, MD (General Medicine)', experience: 12, fee: 499, rating: 4.8, reviews: 1420, languages: ['English', 'Hindi'], isAvailableNow: true, avatarText: 'AS' },
  { id: 'doc-2', name: 'Dr. Vikram Malhotra', specialty: 'cardiology', qualification: 'MBBS, MD, DM (Cardiology)', experience: 18, fee: 799, rating: 4.9, reviews: 980, languages: ['English', 'Hindi', 'Punjabi'], isAvailableNow: false, avatarText: 'VM' },
  { id: 'doc-3', name: 'Dr. Rajesh Patel', specialty: 'pediatrics', qualification: 'MBBS, DCH (Paediatrics)', experience: 15, fee: 499, rating: 4.7, reviews: 2150, languages: ['English', 'Gujarati', 'Hindi'], isAvailableNow: true, avatarText: 'RP' },
  { id: 'doc-4', name: 'Dr. Priyanjana Das', specialty: 'dermatology', qualification: 'MBBS, MD (Dermatology)', experience: 8, fee: 599, rating: 4.6, reviews: 640, languages: ['English', 'Bengali'], isAvailableNow: true, avatarText: 'PD' },
  { id: 'doc-5', name: 'Dr. Amit Verma', specialty: 'gastroenterology', qualification: 'MBBS, MD, DM (Gastro)', experience: 14, fee: 699, rating: 4.8, reviews: 750, languages: ['English', 'Hindi'], isAvailableNow: false, avatarText: 'AV' },
  { id: 'doc-6', name: 'Dr. Sunita Rao', specialty: 'gynaecology', qualification: 'MBBS, DGO, MS (Obstetrics)', experience: 16, fee: 599, rating: 4.9, reviews: 1840, languages: ['English', 'Telugu', 'Hindi'], isAvailableNow: true, avatarText: 'SR' },
];

const specialties = [
  { id: 'all', label: 'All Specialties' },
  { id: 'general', label: 'General Physician' },
  { id: 'pediatrics', label: 'Pediatrics (Child)' },
  { id: 'dermatology', label: 'Dermatology (Skin)' },
  { id: 'gynaecology', label: 'Gynaecology (Women)' },
  { id: 'cardiology', label: 'Cardiology (Heart)' },
];

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  
  // Consultation booking modal states
  const [bookingDoc, setBookingDoc] = useState<Doctor | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [consultSlot, setConsultSlot] = useState('06:00 PM - 06:30 PM');
  const [isBooked, setIsBooked] = useState(false);

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !consultDate) return;
    
    // Simulate booking API
    setIsBooked(true);
  };

  const closeBookingModal = () => {
    setBookingDoc(null);
    setIsBooked(false);
    setPatientName('');
    setPatientPhone('');
    setConsultDate('');
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page">
        
        {/* Banner Headers */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Consult Doctors Online
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
            Consult NABL-verified practitioners within 15 minutes via secure video or voice callback. Fictional doctors listed for demonstration.
          </p>
        </div>

        {/* Search & Specialties panel */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search specialists (e.g. Ananya Sharma, MD, MBBS)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-brand-border text-sm text-navy-900 placeholder:text-navy-400 focus:border-mint-400 focus:ring-2 focus:ring-mint-100 outline-none transition-all"
            />
          </div>

          {/* Specialties Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {specialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`h-9 px-4 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  selectedSpecialty === spec.id
                    ? 'bg-mint-500 text-white'
                    : 'bg-white border border-brand-border text-navy-600 hover:bg-navy-50'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-brand-border rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow text-left"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  {/* Doctor Avatar Badge */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-mint-500 to-mint-600 text-white font-bold flex items-center justify-center text-lg shrink-0 shadow-inner">
                    {doc.avatarText}
                  </div>
                  
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-navy-900 truncate">
                        {doc.name}
                      </h3>
                      {doc.isAvailableNow && (
                        <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" title="Available now" />
                      )}
                    </div>
                    
                    <p className="text-[11px] text-mint-600 font-bold uppercase tracking-wider mt-0.5 capitalize">
                      {doc.specialty} Specialist
                    </p>
                    
                    <p className="text-xs text-navy-400 font-semibold mt-1">
                      {doc.qualification}
                    </p>
                    
                    <p className="text-xs text-navy-500 mt-0.5">
                      {doc.experience} Years Experience
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-brand-muted text-[11px] text-navy-500 mb-4">
                  <div>
                    <span className="text-navy-400">Languages:</span>{' '}
                    <span className="font-semibold text-navy-800">{doc.languages.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-navy-400">Available:</span>{' '}
                    <span className="font-semibold text-navy-800">{doc.isAvailableNow ? 'Now' : 'Later Today'}</span>
                  </div>
                </div>
              </div>

              {/* Fee & Action row */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-xs text-navy-400 font-semibold">Consultation Fee</span>
                  <span className="text-lg font-extrabold text-navy-900 leading-none">
                    {formatPrice(doc.fee)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-navy-50 px-2 py-1 rounded-lg text-xs font-bold text-navy-700">
                    <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
                    <span>{doc.rating}</span>
                  </div>
                  
                  <button
                    onClick={() => setBookingDoc(doc)}
                    className="h-9 px-4 bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs rounded-full transition-colors flex items-center gap-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Consult</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if nothing matches */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16 bg-white border border-brand-border rounded-3xl max-w-xl mx-auto">
            <Stethoscope className="w-10 h-10 text-navy-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-900">No matching doctor found</h3>
            <p className="text-xs text-navy-500 mt-1 max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any doctors matching your search query. Try changing specialties.
            </p>
          </div>
        )}

        {/* ── Consultation Booking Modal ─────────────────── */}
        {bookingDoc && (
          <div className="fixed inset-0 z-[70] bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-brand-border w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                  Book Video Consultation
                </h3>
                <button
                  onClick={closeBookingModal}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-navy-400 hover:text-navy-950 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form body */}
              {!isBooked ? (
                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 text-left">
                  
                  {/* Selected doctor details */}
                  <div className="bg-brand-bg rounded-xl p-3 border border-brand-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-mint-500 text-white font-bold flex items-center justify-center text-xs">
                      {bookingDoc.avatarText}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-navy-400 block">{bookingDoc.specialty.toUpperCase()} SPECIALIST</span>
                      <span className="text-xs font-bold text-navy-900 block">{bookingDoc.name}</span>
                      <span className="text-xs font-semibold text-navy-500 block">{bookingDoc.qualification}</span>
                    </div>
                  </div>

                  {/* Patient Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Patient Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter patient name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Contact Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter 10-digit number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                    />
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Appointment Date</label>
                      <input
                        type="date"
                        required
                        value={consultDate}
                        onChange={(e) => setConsultDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Video Time Slot</label>
                      <select
                        value={consultSlot}
                        onChange={(e) => setConsultSlot(e.target.value)}
                        className="w-full h-10 px-2 border border-brand-border bg-white rounded-lg text-xs outline-none focus:border-mint-400"
                      >
                        <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                        <option value="12:00 PM - 12:30 PM">12:00 PM - 12:30 PM</option>
                        <option value="06:00 PM - 06:30 PM">06:00 PM - 06:30 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Consultation Fee Info */}
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="font-semibold text-navy-600">Total Consultation Fee:</span>
                    <span className="font-extrabold text-navy-900">{formatPrice(bookingDoc.fee)}</span>
                  </div>

                  {/* Book CTA */}
                  <button
                    type="submit"
                    className="w-full h-11 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Video className="w-4 h-4" />
                    <span>Confirm Booking & Pay</span>
                  </button>

                </form>
              ) : (
                /* Success booking message */
                <div className="p-6 text-center space-y-6 animate-fade-in">
                  <CheckCircle className="w-14 h-14 text-mint-500 mx-auto" />
                  <div>
                    <h4 className="text-base font-extrabold text-navy-900">Consultation Scheduled!</h4>
                    <p className="text-xs text-navy-500 mt-2 leading-relaxed">
                      We have booked your appointment with <strong className="text-navy-900">{bookingDoc.name}</strong> on <strong className="text-navy-900">{consultDate}</strong> at <strong className="text-navy-900">{consultSlot}</strong>.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-brand-bg rounded-xl border border-brand-border text-[11px] text-navy-500 text-left space-y-1.5">
                    <p className="font-bold text-navy-700">How to join: </p>
                    <p>1. You will receive a secure MediNova consultation call link via SMS 10 minutes prior.</p>
                    <p>2. Keep your patient history files or prescriptions ready to share screen.</p>
                  </div>

                  <button
                    onClick={closeBookingModal}
                    className="w-full h-10 bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs rounded-full transition-colors animate-fade-in"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
