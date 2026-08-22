import React, { useState } from 'react';
import { X, MapPin, Calendar, Clock, Users, Sparkles, CheckCircle, Video, Compass } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { mockFacilities } from '../../data/mockData';

export const CampusTourModal: React.FC = () => {
  const { isTourModalOpen, closeTourModal, theme, addNotification } = useTheme();

  const [tourType, setTourType] = useState<'virtual' | 'in-person'>('virtual');
  const [selectedFacility, setSelectedFacility] = useState(mockFacilities[0].id);
  const [booked, setBooked] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    email: '',
    date: '2025-10-15',
    guests: '2 Guests',
    interest: 'Engineering & Computing Labs',
  });

  if (!isTourModalOpen) return null;

  const currentFacility = mockFacilities.find((f) => f.id === selectedFacility) || mockFacilities[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.email) {
      addNotification('warning', 'Details Missing', 'Please enter your name and email for tour pass reservation.');
      return;
    }
    setBooked(true);
    addNotification('success', 'Campus Visit Confirmed', `Your walking tour reservation for ${bookingDetails.date} has been confirmed.`);
  };

  const handleClose = () => {
    setBooked(false);
    closeTourModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ backgroundColor: theme.primary }} className="p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Experience Edunexa
              </span>
              <h3 className="text-lg font-bold font-serif text-white">
                Virtual & In-Person Campus Tours
              </h3>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex gap-2">
          <button
            onClick={() => setTourType('virtual')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              tourType === 'virtual'
                ? 'bg-white shadow-xs text-slate-900 border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Video className="w-4 h-4 text-amber-700" />
            <span>Interactive 360° Virtual Walkthrough</span>
          </button>
          <button
            onClick={() => setTourType('in-person')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              tourType === 'in-person'
                ? 'bg-white shadow-xs text-slate-900 border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Book In-Person Walking Tour</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {tourType === 'virtual' ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 shadow-sm bg-slate-900 group">
                <img
                  src={currentFacility.image}
                  alt={currentFacility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs w-fit mb-1">
                    {currentFacility.category} • {currentFacility.leedCertification || 'Campus Landmark'}
                  </span>
                  <h4 className="text-xl font-bold font-serif text-white">{currentFacility.name}</h4>
                  <p className="text-xs text-slate-200 line-clamp-2 mt-1">{currentFacility.description}</p>
                </div>
              </div>

              {/* Location Selectors */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">Explore Featured Campus Hotspots:</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {mockFacilities.map((fac) => (
                    <button
                      key={fac.id}
                      onClick={() => setSelectedFacility(fac.id)}
                      className={`p-2.5 rounded-xl text-left text-xs font-semibold transition-all border ${
                        selectedFacility === fac.id
                          ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="block font-bold truncate">{fac.name}</span>
                      <span className="text-[10px] text-slate-500">{fac.category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900">Amenities & Highlights in this Facility:</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentFacility.amenities.map((amenity, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                      ✓ {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : !booked ? (
            <form onSubmit={handleBooking} className="space-y-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1">
                <span className="font-bold text-amber-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-700" />
                  Student-Led 90-Minute Campus Walking Tour
                </span>
                <p className="text-slate-600">
                  Tours depart Monday through Saturday from the Welcome Center. Includes access to lecture halls, laboratories, residential dining, and the Great Quad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Number of Guests</label>
                  <select
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, guests: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>1 (Self Only)</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Family Group</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Academic Interest</label>
                  <select
                    value={bookingDetails.interest}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>Engineering & Computing Labs</option>
                    <option>Medical Sciences & Biology</option>
                    <option>Business & Economics</option>
                    <option>Humanities & Law</option>
                    <option>General Undergraduate Campus</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: theme.primary }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Reserve Free Campus Tour Pass</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold font-serif text-slate-900">Your Campus Visit is Reserved</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We look forward to welcoming you, <strong>{bookingDetails.name}</strong>, on <strong>{bookingDetails.date}</strong>.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1.5">
                <div><strong>Departure:</strong> Welcome Center, 750 University Ave</div>
                <div><strong>Time:</strong> 10:00 AM & 2:00 PM Sessions</div>
                <div><strong>Parking:</strong> Free Visitor Garage Pass attached to your email</div>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-bold hover:bg-amber-900"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
