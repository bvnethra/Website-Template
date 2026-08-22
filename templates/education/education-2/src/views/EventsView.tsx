import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, Bookmark, CheckCircle, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockEvents } from '../data/mockData';

interface EventsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onNavigate }) => {
  const { theme, savedEvents, toggleSaveEvent, addNotification } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Academic & Lectures', 'Cultural & Arts', 'Athletics & Regatta', 'Admissions & Open House', 'Conferences'];

  const filteredEvents = mockEvents.filter(
    (e) => selectedCategory === 'All' || e.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          University Calendar
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Campus Events, Public Lectures & Symposiums
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Join visiting dignitaries, Nobel laureates, performing artists, and student organizations for public symposiums, masterclasses, and collegiate traditions.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => {
          const isSaved = savedEvents.includes(evt.id);

          return (
            <div
              key={evt.id}
              onClick={() => onNavigate('event-detail', evt.id)}
              className="bg-white rounded-3xl border border-slate-200 p-6 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div
                    style={{ backgroundColor: theme.primary }}
                    className="w-14 h-14 rounded-2xl text-white flex flex-col items-center justify-center shrink-0 shadow-xs"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {evt.date.split(' ')[0]}
                    </span>
                    <span className="text-lg font-black font-serif">{evt.date.split(' ')[1]?.replace(',', '') || '15'}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveEvent(evt.id);
                    }}
                    className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-amber-700 hover:bg-amber-50"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {evt.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {evt.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    <span>{evt.location}</span>
                  </div>
                  {evt.featuredSpeakers && evt.featuredSpeakers.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-700" />
                      <span>Speaker: <strong>{evt.featuredSpeakers[0].name}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                <span className="font-semibold text-emerald-700">{evt.venueType}</span>
                <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Event Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
