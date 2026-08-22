import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { EventItem, ClubItem } from '../types';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Clock, 
  Ticket, 
  Search, 
  Sparkles, 
  Trophy, 
  Music, 
  Compass, 
  CheckCircle2, 
  X, 
  QrCode, 
  Download, 
  Send, 
  Mail, 
  ArrowRight,
  Filter,
  Flame,
  Award,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CampusLifePage: React.FC = () => {
  const { 
    events, 
    userTickets, 
    rsvpEvent, 
    cancelRsvp, 
    clubs, 
    joinedClubIds, 
    joinClub, 
    addToast 
  } = useApp();

  // Active section tab: 'events' | 'clubs' | 'tickets'
  const [activeSection, setActiveSection] = useState<'events' | 'clubs' | 'tickets'>('events');

  // Event Filters
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');
  const [eventSearch, setEventSearch] = useState<string>('');

  // Club Filters
  const [clubCategoryFilter, setClubCategoryFilter] = useState<string>('All');
  const [clubSearch, setClubSearch] = useState<string>('');

  // RSVP Modal State
  const [selectedEventForRsvp, setSelectedEventForRsvp] = useState<EventItem | null>(null);
  const [rsvpFormData, setRsvpFormData] = useState({
    name: 'Alexandre DuPont',
    email: 'alex.dupont@example.com',
    seats: 1,
  });
  const [issuedTicketModal, setIssuedTicketModal] = useState<any | null>(null);

  // Join Club Modal State
  const [selectedClubForJoin, setSelectedClubForJoin] = useState<ClubItem | null>(null);
  const [clubFormData, setClubFormData] = useState({
    name: 'Alexandre DuPont',
    email: 'alex.dupont@example.com',
    year: 'Year 2 Undergraduate',
    reason: 'I would love to contribute to autonomous hardware prototyping and collaborative student builds.',
  });

  const eventCategories = ['All', 'Hackathons', 'Cultural', 'Sports', 'Guest Lectures', 'Career Fairs', 'Workshops'];
  const clubCategories = ['All', 'Technology', 'Business & Finance', 'Arts & Culture', 'Sports & Athletics', 'Social Impact'];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      if (eventCategoryFilter !== 'All' && evt.category !== eventCategoryFilter) {
        return false;
      }
      if (eventSearch.trim()) {
        const q = eventSearch.toLowerCase();
        return evt.title.toLowerCase().includes(q) || evt.description.toLowerCase().includes(q) || evt.location.toLowerCase().includes(q);
      }
      return true;
    });
  }, [events, eventCategoryFilter, eventSearch]);

  // Filtered Clubs
  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      if (clubCategoryFilter !== 'All' && club.category !== clubCategoryFilter) {
        return false;
      }
      if (clubSearch.trim()) {
        const q = clubSearch.toLowerCase();
        return club.name.toLowerCase().includes(q) || club.description.toLowerCase().includes(q) || club.tags.some((t) => t.toLowerCase().includes(q));
      }
      return true;
    });
  }, [clubs, clubCategoryFilter, clubSearch]);

  // Submit RSVP
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForRsvp) return;

    const result = rsvpEvent(
      selectedEventForRsvp.id,
      rsvpFormData.name,
      rsvpFormData.email,
      rsvpFormData.seats
    );

    if (result.success && result.ticket) {
      setIssuedTicketModal(result.ticket);
      setSelectedEventForRsvp(null);
    } else {
      addToast({
        type: 'error',
        title: 'RSVP Failed',
        message: result.message || 'Unable to reserve seats at this time.',
      });
    }
  };

  // Submit Join Club
  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClubForJoin) return;

    joinClub(selectedClubForJoin.id, {
      name: clubFormData.name,
      email: clubFormData.email,
      year: clubFormData.year,
      reason: clubFormData.reason,
    });

    setSelectedClubForJoin(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-24">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E8EAE3] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] text-[#4A5D4E] text-xs font-bold uppercase tracking-wider border border-[#E8EAE3]">
                <Users className="w-4 h-4 text-[#4A5D4E]" />
                <span>Collegiate Life & Activities</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4A5D4E]">
                Campus Life & Event Hub
              </h1>
              <p className="text-sm sm:text-base text-[#2D3436]/70">
                Immerse yourself in 120+ active student organizations, annual hackathons, varsity athletics, and world-class guest lecture symposiums.
              </p>
            </div>

            {/* Sub-nav Tabs */}
            <div className="flex items-center bg-[#F4F1EA] p-1.5 rounded-2xl border border-[#E8EAE3] self-start md:self-auto">
              <button
                onClick={() => setActiveSection('events')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'events'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/70 hover:text-[#4A5D4E]'
                }`}
              >
                Events & Seminars
              </button>
              <button
                onClick={() => setActiveSection('clubs')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSection === 'clubs'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/70 hover:text-[#4A5D4E]'
                }`}
              >
                Student Guilds & Clubs
              </button>
              <button
                onClick={() => setActiveSection('tickets')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeSection === 'tickets'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/70 hover:text-[#4A5D4E]'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>My Passes ({userTickets.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* =========================================================================
           1. EVENTS & SEMINARS TAB
           ========================================================================= */}
        {activeSection === 'events' && (
          <div className="space-y-6">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8EAE3]">
              
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {eventCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      eventCategoryFilter === cat
                        ? 'bg-[#4A5D4E] text-white shadow-xs'
                        : 'bg-[#F4F1EA] text-[#4A5D4E] hover:bg-[#E8EAE3] border border-[#E8EAE3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7B3A2]" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Search events, speakers, halls..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => {
                const remainingSeats = evt.totalSeats - evt.reservedSeats;
                const isSoldOut = remainingSeats <= 0;
                const dateParts = evt.date.split(' ');

                return (
                  <div
                    key={evt.id}
                    id={`event-card-${evt.id}`}
                    className="bg-white hover:bg-[#FDFBF7] rounded-3xl border border-[#E8EAE3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image & Date Badge */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={evt.image}
                          alt={evt.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3 bg-[#4A5D4E]/90 backdrop-blur-xs text-white px-3 py-1 rounded-xl text-center leading-none">
                          <span className="text-[10px] font-bold uppercase text-[#E8EAE3] block">
                            {dateParts[0]}
                          </span>
                          <span className="text-sm font-extrabold font-heading block mt-0.5">
                            {dateParts[1]?.replace(',', '')}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#4A5D4E] text-white shadow-xs">
                            {evt.category}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[11px] text-[#E8EAE3] block">{evt.time}</span>
                          <h3 className="text-sm font-bold font-heading text-white line-clamp-1">
                            {evt.title}
                          </h3>
                        </div>
                      </div>

                      {/* Details Body */}
                      <div className="p-5 space-y-3">
                        <p className="text-xs text-[#2D3436]/80 leading-relaxed line-clamp-2">
                          {evt.description}
                        </p>

                        <div className="space-y-1 text-xs text-[#2D3436]/70 pt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                            <span className="truncate">{evt.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#4A5D4E] shrink-0" />
                            <span>Host: {evt.speakerOrHost}</span>
                          </div>
                        </div>

                        {/* Real-time Seat Progress Bar */}
                        <div className="space-y-1.5 pt-2 border-t border-[#E8EAE3]">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-[#A7B3A2]">Seat Capacity</span>
                            <span className={isSoldOut ? 'text-red-600' : 'text-[#4A5D4E]'}>
                              {isSoldOut ? 'Sold Out' : `${remainingSeats} Seats Available`}
                            </span>
                          </div>
                          <div className="w-full bg-[#F4F1EA] rounded-full h-2 overflow-hidden border border-[#E8EAE3]">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isSoldOut ? 'bg-red-500' : 'bg-[#4A5D4E]'
                              }`}
                              style={{ width: `${(evt.reservedSeats / evt.totalSeats) * 100}%` }}
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Footer RSVP Action */}
                    <div className="px-5 py-3.5 bg-[#F9F7F2] border-t border-[#E8EAE3] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#4A5D4E]">
                        {evt.price}
                      </span>

                      <button
                        onClick={() => setSelectedEventForRsvp(evt)}
                        disabled={isSoldOut}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSoldOut
                            ? 'bg-[#F4F1EA] text-[#A7B3A2] cursor-not-allowed border border-[#E8EAE3]'
                            : 'bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white shadow-xs active:scale-95'
                        }`}
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>{isSoldOut ? 'Waitlist Only' : 'RSVP Free Seat'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* =========================================================================
           2. STUDENT CLUBS & SOCIETIES TAB
           ========================================================================= */}
        {activeSection === 'clubs' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8EAE3]">
              <div className="flex flex-wrap items-center gap-1.5">
                {clubCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setClubCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      clubCategoryFilter === cat
                        ? 'bg-[#4A5D4E] text-white shadow-xs'
                        : 'bg-[#F4F1EA] text-[#4A5D4E] hover:bg-[#E8EAE3] border border-[#E8EAE3]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A7B3A2]" />
                <input
                  type="text"
                  value={clubSearch}
                  onChange={(e) => setClubSearch(e.target.value)}
                  placeholder="Search clubs, societies, guilds..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>
            </div>

            {/* Clubs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredClubs.map((club) => {
                const isMember = joinedClubIds.includes(club.id);

                return (
                  <div
                    key={club.id}
                    className="bg-white hover:bg-[#FDFBF7] rounded-3xl border border-[#E8EAE3] p-6 shadow-xs transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <img
                          src={club.image}
                          alt={club.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-2xl object-cover border border-[#E8EAE3] shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A5D4E] block">
                            {club.category}
                          </span>
                          <h3 className="text-base font-bold font-heading text-[#4A5D4E] leading-tight">
                            {club.name}
                          </h3>
                          <span className="text-xs text-[#2D3436]/70 mt-0.5 block">
                            {club.memberCount} Active Student Members
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#2D3436]/80 leading-relaxed">
                        {club.description}
                      </p>

                      <div className="p-3 bg-[#F9F7F2] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#4A5D4E]" />
                          <span>Schedule: {club.meetingSchedule}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#4A5D4E]" />
                          <span>Lead: {club.leadName} ({club.leadEmail})</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {club.tags.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3] text-[10px] font-semibold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8EAE3] flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#4A5D4E]">
                        {club.achievements[0]}
                      </span>

                      <button
                        onClick={() => setSelectedClubForJoin(club)}
                        disabled={isMember}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isMember
                            ? 'bg-[#F4F1EA] text-[#4A5D4E] border border-[#E8EAE3] cursor-default'
                            : 'bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white shadow-xs active:scale-95'
                        }`}
                      >
                        {isMember ? '✓ Joined Guild' : 'Join Guild'}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* =========================================================================
           3. MY EVENT TICKETS & PASSES TAB
           ========================================================================= */}
        {activeSection === 'tickets' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {userTickets.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8EAE3] space-y-4">
                <Ticket className="w-12 h-12 text-[#A7B3A2] mx-auto" />
                <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                  No event passes booked yet
                </h3>
                <p className="text-xs text-[#2D3436]/70">
                  Browse upcoming hackathons, varsity matches, and guest lectures to claim free entry passes.
                </p>
                <button
                  onClick={() => setActiveSection('events')}
                  className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Explore Upcoming Events
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {userTickets.map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="bg-white rounded-3xl border border-[#E8EAE3] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#4A5D4E] text-white">
                          {ticket.ticketId}
                        </span>
                        <span className="text-xs text-[#4A5D4E] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmed Entry Pass</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold font-heading text-[#4A5D4E]">
                        {ticket.eventTitle}
                      </h3>

                      <div className="text-xs text-[#2D3436]/70 space-y-0.5">
                        <p>Date & Time: {ticket.date} • {ticket.time}</p>
                        <p>Venue: {ticket.location}</p>
                        <p>Holder: {ticket.userName} ({ticket.seatsCount} Reserved Pass)</p>
                      </div>
                    </div>

                    {/* QR Code & Actions */}
                    <div className="flex sm:flex-col items-center gap-3 shrink-0">
                      <img
                        src={ticket.qrCode}
                        alt="Event Pass QR"
                        className="w-20 h-20 rounded-xl bg-white p-1 border border-[#E8EAE3]"
                      />
                      <button
                        onClick={() => cancelRsvp(ticket.ticketId)}
                        className="text-[11px] font-bold text-red-600 hover:underline"
                      >
                        Cancel RSVP
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </section>

      {/* RSVP MODAL POPUP */}
      {selectedEventForRsvp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedEventForRsvp(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E8EAE3] shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8EAE3] pb-3">
              <h3 className="font-heading text-lg font-bold text-[#4A5D4E] flex items-center gap-2">
                <Ticket className="w-5 h-5 text-[#4A5D4E]" />
                <span>Reserve Event Entry Pass</span>
              </h3>
              <button onClick={() => setSelectedEventForRsvp(null)} className="p-1 text-[#A7B3A2] hover:text-[#4A5D4E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F9F7F2] border border-[#E8EAE3] text-xs space-y-1">
              <h4 className="font-bold text-[#4A5D4E]">{selectedEventForRsvp.title}</h4>
              <p className="text-[#2D3436]/70">{selectedEventForRsvp.date} • {selectedEventForRsvp.time}</p>
              <p className="text-[#2D3436]/70">{selectedEventForRsvp.location}</p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Attendee Name *</label>
                <input
                  type="text"
                  required
                  value={rsvpFormData.name}
                  onChange={(e) => setRsvpFormData({ ...rsvpFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Notification Email *</label>
                <input
                  type="email"
                  required
                  value={rsvpFormData.email}
                  onChange={(e) => setRsvpFormData({ ...rsvpFormData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Number of Reserved Seats</label>
                <select
                  value={rsvpFormData.seats}
                  onChange={(e) => setRsvpFormData({ ...rsvpFormData, seats: parseInt(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs font-bold text-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                >
                  <option value={1}>1 Attendee Pass</option>
                  <option value={2}>2 Attendee Passes</option>
                  <option value={3}>3 Attendee Passes</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E8EAE3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedEventForRsvp(null)}
                  className="px-4 py-2 font-bold text-[#2D3436]/70 hover:text-[#4A5D4E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl font-bold shadow-xs transition-all active:scale-95"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ISSUED TICKET SUCCESS MODAL */}
      {issuedTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIssuedTicketModal(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="relative bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 border border-[#E8EAE3] shadow-2xl z-10 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center mx-auto border border-[#E8EAE3]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A5D4E]">
                Entry Pass Confirmed
              </span>
              <h3 className="font-heading text-xl font-bold text-[#4A5D4E]">
                {issuedTicketModal.eventTitle}
              </h3>
            </div>

            {/* QR Card */}
            <div className="bg-[#F9F7F2] p-5 rounded-2xl border border-[#E8EAE3] space-y-3">
              <img
                src={issuedTicketModal.qrCode}
                alt="Ticket QR"
                className="w-32 h-32 mx-auto"
              />
              <span className="font-mono text-xs font-bold text-[#4A5D4E] block">
                {issuedTicketModal.ticketId}
              </span>
              <p className="text-[11px] text-[#2D3436]/70">
                {issuedTicketModal.userName} • {issuedTicketModal.seatsCount} Pass(es) • {issuedTicketModal.date}
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  setIssuedTicketModal(null);
                  setActiveSection('tickets');
                }}
                className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                View in My Passes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOIN CLUB MODAL */}
      {selectedClubForJoin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedClubForJoin(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs" 
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-[#E8EAE3] shadow-2xl z-10 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8EAE3] pb-3">
              <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                Apply for {selectedClubForJoin.name}
              </h3>
              <button onClick={() => setSelectedClubForJoin(null)} className="p-1 text-[#A7B3A2] hover:text-[#4A5D4E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleClubSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={clubFormData.name}
                  onChange={(e) => setClubFormData({ ...clubFormData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">University Email *</label>
                <input
                  type="email"
                  required
                  value={clubFormData.email}
                  onChange={(e) => setClubFormData({ ...clubFormData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Academic Year / Major</label>
                <input
                  type="text"
                  value={clubFormData.year}
                  onChange={(e) => setClubFormData({ ...clubFormData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-[#4A5D4E]">Why would you like to join?</label>
                <textarea
                  rows={3}
                  value={clubFormData.reason}
                  onChange={(e) => setClubFormData({ ...clubFormData, reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#E8EAE3] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedClubForJoin(null)}
                  className="px-4 py-2 font-bold text-[#2D3436]/70 hover:text-[#4A5D4E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl font-bold shadow-xs transition-all active:scale-95"
                >
                  Submit Guild Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
