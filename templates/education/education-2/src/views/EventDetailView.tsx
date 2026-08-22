import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Bookmark,
  Sparkles,
  CheckCircle,
  Share2,
  Ticket,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockEvents } from '../data/mockData';

interface EventDetailViewProps {
  eventId?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({ eventId, onNavigate }) => {
  const { theme, savedEvents, toggleSaveEvent, addNotification } = useTheme();

  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0];
  const isSaved = savedEvents.includes(event.id);

  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [ticketCount, setTicketCount] = useState('1 Ticket');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpEmail) {
      addNotification('warning', 'Missing Details', 'Please provide your name and email to reserve seats.');
      return;
    }
    setRegistered(true);
    addNotification('success', 'RSVP Confirmed', `Admission ticket for "${event.title}" sent to ${rsvpEmail}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('events')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to University Events</span>
        </button>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-md">
              {event.category}
            </span>
            <span className="text-xs text-slate-500 font-semibold">• Open to Public</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveEvent(event.id)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 text-xs font-bold"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
              <span>{isSaved ? 'Saved to Calendar' : 'Bookmark Event'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-serif font-black text-slate-900 leading-tight">
          {event.title}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: theme.primary }}
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0"
            >
              <Calendar className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Date</span>
              <span className="font-bold text-slate-900 text-sm">{event.date}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Time</span>
              <span className="font-bold text-slate-900 text-sm">{event.time}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Venue</span>
              <span className="font-bold text-slate-900 text-sm">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Description & Speaker */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-slate-900 border-b border-slate-200 pb-2">
              Event Overview & Keynote Agenda
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {event.featuredSpeakers && event.featuredSpeakers.length > 0 && (
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
                Featured Speakers & Panelists
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.featuredSpeakers.map((spk, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                    <h4 className="text-sm font-serif font-bold text-slate-900">{spk.name}</h4>
                    <p className="text-xs font-semibold text-amber-800">{spk.role}</p>
                    <p className="text-[11px] text-slate-500">{spk.org}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Admission & Seating Guidelines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc">
              <li>Doors open 30 minutes prior to the scheduled lecture start time.</li>
              <li>General admission seating is allocated on a first-come, first-served basis.</li>
              <li>Live high-definition audio/video stream will be recorded and archived in the Edunexa Digital Repository.</li>
            </ul>
          </div>
        </div>

        {/* Right: RSVP Ticket Reservation Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-700" />
              <h3 className="text-base font-serif font-bold text-slate-900">
                Reserve Free Admission Pass
              </h3>
            </div>

            {!registered ? (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={rsvpEmail}
                    onChange={(e) => setRsvpEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ticket Quantity</label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  >
                    <option>1 Ticket (Single Pass)</option>
                    <option>2 Tickets (Guest Pass)</option>
                    <option>3 Tickets</option>
                    <option>4 Tickets (Family Group)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{ backgroundColor: theme.primary }}
                  className="w-full py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-95 shadow-sm mt-2"
                >
                  Confirm Registration
                </button>
              </form>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold font-serif text-emerald-950">RSVP Confirmed</h4>
                <p className="text-[11px] text-emerald-800">
                  Your digital event ticket and venue QR pass have been transmitted to <strong>{rsvpEmail}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
