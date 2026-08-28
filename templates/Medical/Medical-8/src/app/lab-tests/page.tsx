'use client';

import React, { useState, useMemo } from 'react';
import { Search, FlaskConical, Clock, HeartPulse, ShieldCheck, CheckCircle2, X, Calendar, MapPin } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface LabTest {
  id: string;
  name: string;
  category: string;
  description: string;
  mrp: number;
  salePrice: number;
  discount: number;
  sampleType: string;
  preparation: string;
  reportTime: string;
  parameters: number;
}

const mockTests: LabTest[] = [
  { id: 'test-1', name: 'Active Full Body Health Checkup', category: 'packages', description: 'Comprehensive screening of blood sugar, kidney, liver, cholesterol, thyroid, and blood counts.', mrp: 2999, salePrice: 999, discount: 66, sampleType: 'Blood & Urine', preparation: '10-12 hours fasting required', reportTime: '12 Hours', parameters: 84 },
  { id: 'test-2', name: 'MediNova Basic Fitness Screening', category: 'packages', description: 'Essential test package covering blood counts, glucose, lipids, and key minerals.', mrp: 1499, salePrice: 699, discount: 53, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '8 Hours', parameters: 45 },
  { id: 'test-3', name: 'Thyroid Profile (T3, T4, TSH)', category: 'hormones', description: 'Screening for hyperthyroidism and hypothyroidism conditions.', mrp: 799, salePrice: 349, discount: 56, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '6 Hours', parameters: 3 },
  { id: 'test-4', name: 'Lipid Profile (Cholesterol)', category: 'heart', description: 'Measures total cholesterol, LDL, HDL, and triglycerides levels to check cardiac risk.', mrp: 599, salePrice: 249, discount: 58, sampleType: 'Blood', preparation: '9-12 hours fasting required', reportTime: '8 Hours', parameters: 8 },
  { id: 'test-5', name: 'HbA1c (Glycated Haemoglobin)', category: 'diabetes', description: 'Measures average blood sugar levels over the past 3 months.', mrp: 499, salePrice: 289, discount: 42, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '6 Hours', parameters: 1 },
  { id: 'test-6', name: 'Complete Blood Count (CBC)', category: 'blood', description: 'Evaluates overall health and checks for anemia, infection, and immune system status.', mrp: 399, salePrice: 199, discount: 50, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '6 Hours', parameters: 24 },
  { id: 'test-7', name: 'Vitamin D (25-Hydroxy)', category: 'vitamins', description: 'Checks for vitamin D deficiency, essential for bone density and immunity.', mrp: 1299, salePrice: 599, discount: 53, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '12 Hours', parameters: 1 },
  { id: 'test-8', name: 'Liver Function Test (LFT)', category: 'organs', description: 'Checks enzyme levels to monitor liver health and track potential damage.', mrp: 899, salePrice: 449, discount: 50, sampleType: 'Blood', preparation: 'Fasting not required', reportTime: '8 Hours', parameters: 11 },
];

const categories = [
  { id: 'all', label: 'All Tests' },
  { id: 'packages', label: 'Health Packages' },
  { id: 'diabetes', label: 'Diabetes Care' },
  { id: 'heart', label: 'Heart & Cholesterol' },
  { id: 'hormones', label: 'Hormones & Thyroid' },
  { id: 'organs', label: 'Liver & Kidneys' },
];

export default function LabTestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Booking modal states
  const [bookingTest, setBookingTest] = useState<LabTest | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingSlot, setBookingSlot] = useState('07:00 AM - 10:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Filter tests
  const filteredTests = useMemo(() => {
    return mockTests.filter((test) => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            test.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !pincode || !bookingDate) return;
    
    // Simulate API booking
    setIsBooked(true);
  };

  const closeBookingModal = () => {
    setBookingTest(null);
    setIsBooked(false);
    setPatientName('');
    setPatientPhone('');
    setPincode('');
    setBookingDate('');
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page">
        
        {/* Banner Headers */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Diagnostic & Lab Tests
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
            Free home sample collection. Verified reports delivered in 12 hours from NABL accredited diagnostic centers.
          </p>
        </div>

        {/* Search and Filters panel */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search tests (e.g. CBC, Vitamin D, Cholesterol, Thyroid)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-brand-border text-sm text-navy-900 placeholder:text-navy-400 focus:border-mint-400 focus:ring-2 focus:ring-mint-100 outline-none transition-all"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-9 px-4 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-mint-500 text-white'
                    : 'bg-white border border-brand-border text-navy-600 hover:bg-navy-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-brand-border shadow-xs p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-2 justify-between mb-3">
                  <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {test.parameters} Parameters
                  </span>
                  
                  <div className="flex items-center gap-1 text-[10px] text-navy-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-mint-500" />
                    <span>Report in {test.reportTime}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-navy-900 mb-1 leading-snug">
                  {test.name}
                </h3>
                
                <p className="text-[11px] text-navy-500 leading-relaxed mb-4">
                  {test.description}
                </p>

                {/* Technical specs block */}
                <div className="bg-brand-bg rounded-xl p-3 text-[10px] sm:text-xs text-navy-500 space-y-1.5 mb-4">
                  <div>
                    <span className="text-navy-400">Sample type:</span>{' '}
                    <span className="font-semibold text-navy-800">{test.sampleType}</span>
                  </div>
                  <div>
                    <span className="text-navy-400">Preparation:</span>{' '}
                    <span className="font-semibold text-navy-800 leading-normal">{test.preparation}</span>
                  </div>
                </div>
              </div>

              {/* Price & Checkout CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-muted">
                <div className="flex flex-col">
                  <span className="text-lg font-extrabold text-navy-900 leading-none">
                    {formatPrice(test.salePrice)}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-navy-400 line-through">
                      {formatPrice(test.mrp)}
                    </span>
                    <span className="text-[10px] font-bold text-mint-600 bg-mint-50 px-1 py-0.2 rounded">
                      {test.discount}% OFF
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setBookingTest(test)}
                  className="h-9 px-5 bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs rounded-full transition-colors shadow-xs"
                >
                  Book Test
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state if nothing matches */}
        {filteredTests.length === 0 && (
          <div className="text-center py-16 bg-white border border-brand-border rounded-3xl max-w-xl mx-auto">
            <FlaskConical className="w-10 h-10 text-navy-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-navy-900">No matching test found</h3>
            <p className="text-xs text-navy-500 mt-1 max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any laboratory test matching your query. Check spelling or browse other categories.
            </p>
          </div>
        )}

        {/* ── Booking Modal (Overlay) ────────────────────── */}
        {bookingTest && (
          <div className="fixed inset-0 z-[70] bg-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-3xl border border-brand-border w-full max-w-md overflow-hidden shadow-2xl animate-slide-up">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                  Book Diagnostic Slot
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
                <form onSubmit={handleBooking} className="p-6 space-y-4 text-left">
                  
                  {/* Selected test box */}
                  <div className="bg-brand-bg rounded-xl p-3 border border-brand-border">
                    <span className="text-[10px] font-bold text-navy-400 block">Selected Test:</span>
                    <span className="text-xs font-bold text-navy-900 block">{bookingTest.name}</span>
                    <span className="text-xs font-extrabold text-mint-600 block mt-1">{formatPrice(bookingTest.salePrice)}</span>
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

                  {/* Patient Phone & Pincode */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Pincode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="6-digit PIN"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                      />
                    </div>
                  </div>

                  {/* Date & Time Slot selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Collection Date</label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Collection Slot</label>
                      <select
                        value={bookingSlot}
                        onChange={(e) => setBookingSlot(e.target.value)}
                        className="w-full h-10 px-2 border border-brand-border bg-white rounded-lg text-xs outline-none focus:border-mint-400"
                      >
                        <option value="07:00 AM - 10:00 AM">07:00 AM - 10:00 AM</option>
                        <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                        <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full h-11 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-sm mt-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Home Collection Booking</span>
                  </button>

                </form>
              ) : (
                /* Success screen in modal */
                <div className="p-6 text-center space-y-6 animate-fade-in">
                  <CheckCircle2 className="w-14 h-14 text-mint-500 mx-auto" />
                  <div>
                    <h4 className="text-base font-extrabold text-navy-900">Lab Test Booked Successfully!</h4>
                    <p className="text-xs text-navy-500 mt-2 leading-relaxed">
                      We have confirmed your home sample collection slot for <strong className="text-navy-900">{bookingDate}</strong> during <strong className="text-navy-900">{bookingSlot}</strong>.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-brand-bg rounded-xl border border-brand-border text-[11px] text-navy-500 text-left space-y-1">
                    <p>· Patient: <span className="font-semibold text-navy-900">{patientName}</span></p>
                    <p>· Phone: <span className="font-semibold text-navy-900">{patientPhone}</span></p>
                    <p>· Verification pincode will be sent via SMS shortly.</p>
                  </div>

                  <button
                    onClick={closeBookingModal}
                    className="w-full h-10 bg-navy-900 hover:bg-navy-950 text-white font-bold text-xs rounded-full transition-colors"
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
