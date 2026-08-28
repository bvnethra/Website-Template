import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Calendar, Award, Globe } from 'lucide-react';
import type { Doctor } from '../../data/doctors';
import { Button } from './Button';
import { Badge } from './Badge';

interface DoctorCardProps {
  doctor: Doctor;
  onBookClick?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookClick }) => {
  const navigate = useNavigate();

  const handleBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookClick) {
      onBookClick(doctor);
    } else {
      navigate(`/appointments?doctorId=${doctor.id}&departmentId=${doctor.departmentId}`);
    }
  };

  return (
    <div className="group bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex gap-4 items-start">
          <div className="relative shrink-0">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const initials = doctor.name.replace(/^Dr\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'DR';
                const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#155EEF"/><stop offset="100%" stop-color="#12B8A6"/></linearGradient></defs><rect width="200" height="200" rx="32" fill="url(#g)"/><circle cx="100" cy="100" r="75" fill="none" stroke="#FFF" stroke-opacity="0.2" stroke-width="4"/><text x="50%" y="54%" font-family="sans-serif" font-size="64" font-weight="800" fill="#FFF" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
                (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
              }}
            />
            {doctor.isAvailableToday && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Available Today" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 mb-1">
              <Badge variant="primary" size="sm">
                {doctor.specialty}
              </Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{doctor.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
              </div>
            </div>

            <Link
              to={`/doctors/${doctor.slug}`}
              className="font-bold text-slate-900 text-lg hover:text-primary transition-colors line-clamp-1 block"
            >
              {doctor.name}
            </Link>
            <p className="text-xs text-slate-500 line-clamp-1">{doctor.title}</p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{doctor.experienceYears} Yrs Experience</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span className="truncate">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{doctor.languages.join(', ')}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between bg-slate-50 rounded-2xl px-3 py-2 text-xs">
          <span className="text-slate-500 font-medium">Consultation Fee</span>
          <span className="font-bold text-slate-900 text-sm">${doctor.fee}</span>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
        <Link to={`/doctors/${doctor.slug}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
        <Button variant="primary" size="sm" className="flex-1" onClick={handleBook} leftIcon={<Calendar className="w-3.5 h-3.5" />}>
          Book Visit
        </Button>
      </div>
    </div>
  );
};
