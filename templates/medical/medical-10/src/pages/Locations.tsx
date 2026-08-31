import React, { useState } from 'react';
import { MapPin, Phone, Clock, Car, Navigation, Calendar, CheckCircle2 } from 'lucide-react';
import { CLINIC_LOCATIONS } from '../data/locations';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Locations: React.FC = () => {
  const [activeLocId, setActiveLocId] = useState<string>(CLINIC_LOCATIONS[0].id);

  const activeLoc = CLINIC_LOCATIONS.find(l => l.id === activeLocId) || CLINIC_LOCATIONS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <ScrollReveal direction="down">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
              CareNova Physical Facilities
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Our Clinic Locations</h1>
            <p className="text-slate-300 text-base leading-relaxed">
              CareNova operates 3 state-of-the-art medical centers across the metropolitan area, featuring free structured parking and valet services.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          {CLINIC_LOCATIONS.map(loc => (
            <div
              key={loc.id}
              onClick={() => setActiveLocId(loc.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                activeLocId === loc.id
                  ? 'bg-blue-50/80 border-primary shadow-soft ring-2 ring-primary/20'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-lg">{loc.name}</h3>
                {loc.isPrimary && <Badge variant="primary" size="sm">Flagship</Badge>}
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{loc.address}, {loc.city} {loc.zip}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>{loc.phone}</span>
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Open Today
                </span>
                <span className="font-bold text-primary">View Facilities →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-900 flex items-center justify-center text-white p-6 shadow-inner">
            <img src={activeLoc.image} alt={activeLoc.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="relative z-10 text-center space-y-3 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <MapPin className="w-8 h-8 text-primary mx-auto animate-bounce" />
              <p className="font-extrabold text-lg">{activeLoc.name}</p>
              <p className="text-xs text-slate-300">{activeLoc.address}, {activeLoc.city}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeLoc.address + ' ' + activeLoc.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold text-xs px-4 py-2 rounded-xl shadow-soft hover:bg-primary-600 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-xl">{activeLoc.name} Overview</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" /> Operating Hours
                </p>
                <p>Weekdays: {activeLoc.hours.weekdays}</p>
                <p>Saturday: {activeLoc.hours.saturday}</p>
                <p className="text-red-600 font-semibold">{activeLoc.hours.sunday}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-secondary" /> Parking & Mobility
                </p>
                <p className="leading-relaxed">{activeLoc.parkingInfo}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Clinical Departments at This Hub:</h4>
              <div className="flex flex-wrap gap-1.5">
                {activeLoc.services.map((srv, idx) => (
                  <span key={idx} className="bg-blue-50 text-primary font-semibold text-xs px-3 py-1 rounded-lg">
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <Link to="/appointments">
                <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
                  Book Visit at {activeLoc.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </div>
  );
};
