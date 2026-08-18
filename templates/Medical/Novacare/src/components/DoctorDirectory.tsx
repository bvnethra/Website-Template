import React, { useState, useMemo } from 'react';
import { Doctor } from '../types';
import {
  Search,
  Filter,
  Star,
  Clock,
  Calendar,
  UserCheck,
  Building,
  RotateCcw,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface DoctorDirectoryProps {
  doctors: Doctor[];
  isLoading: boolean;
  onViewDoctorProfile: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
  initialSearchQuery?: string;
  initialSpecialty?: string;
}

const SPECIALTY_FILTERS = [
  'All',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Oncology',
  'Surgery',
  'Emergency Care'
];

const AVAILABILITY_FILTERS = [
  { label: 'All Availabilities', value: 'All' },
  { label: 'Available Today', value: 'Available' },
  { label: 'Available Tomorrow', value: 'Available Tomorrow' },
  { label: 'In Surgery / Busy', value: 'In Surgery' }
];

export const DoctorDirectory: React.FC<DoctorDirectoryProps> = ({
  doctors,
  isLoading,
  onViewDoctorProfile,
  onBookDoctor,
  initialSearchQuery = '',
  initialSpecialty = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Filter logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.department.toLowerCase().includes(q) ||
        doc.specializations.some((s) => s.toLowerCase().includes(q));

      const matchesSpecialty =
        selectedSpecialty === 'All' ||
        doc.department.toLowerCase() === selectedSpecialty.toLowerCase() ||
        doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

      const matchesAvailability =
        selectedAvailability === 'All' || doc.availability === selectedAvailability;

      return matchesQuery && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, searchQuery, selectedSpecialty, selectedAvailability]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All');
    setSelectedAvailability('All');
  };

  const getAvailabilityBadge = (status: Doctor['availability']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available Today
          </span>
        );
      case 'Available Tomorrow':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Available Tomorrow
          </span>
        );
      case 'In Surgery':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            In Surgery
          </span>
        );
      case 'On Leave':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            On Leave
          </span>
        );
    }
  };

  return (
    <section id="doctors-section" className="py-16 lg:py-24 bg-white border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157D5]/10 text-[#3157D5] text-xs font-bold uppercase tracking-wide mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Medical Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight">
              Find & Book Specialists
            </h2>
            <p className="text-sm sm:text-base text-[#667085] mt-2 max-w-xl">
              Connect with certified clinical specialists, check their immediate appointment schedules, and reserve your consultation securely online.
            </p>
          </div>

          {/* Results summary tag */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#667085] bg-[#F6F8FC] px-3.5 py-2 rounded-xl border border-[#E4E9F2]">
              Showing <strong className="text-[#15213D] font-bold">{filteredDoctors.length}</strong> of {doctors.length} Doctors
            </span>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-[#F6F8FC] p-4 sm:p-5 rounded-2xl border border-[#E4E9F2] mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="doctor-directory-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name, medical specialty, or procedure..."
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#E4E9F2] text-sm text-[#15213D] placeholder-[#667085]/70 focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 focus:border-[#3157D5]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Availability dropdown */}
            <div className="md:col-span-4">
              <select
                id="doctor-availability-select"
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-white rounded-xl border border-[#E4E9F2] text-sm text-[#15213D] font-medium focus:outline-none focus:ring-2 focus:ring-[#3157D5]/30 focus:border-[#3157D5]"
              >
                {AVAILABILITY_FILTERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Specialty Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#3157D5]" />
              Specialty:
            </span>
            {SPECIALTY_FILTERS.map((spec) => {
              const isSelected = selectedSpecialty.toLowerCase() === spec.toLowerCase();
              return (
                <button
                  key={spec}
                  id={`filter-specialty-${spec.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3157D5] text-white shadow-xs'
                      : 'bg-white text-[#15213D] border border-[#E4E9F2] hover:bg-[#EEF3FA] hover:text-[#3157D5]'
                  }`}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-[#F6F8FC] rounded-2xl p-5 border border-[#E4E9F2] animate-pulse">
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl bg-slate-200" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-10 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredDoctors.length === 0 && (
          <div className="bg-[#F6F8FC] rounded-3xl p-10 text-center border border-[#E4E9F2] max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto text-[#667085] mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#15213D] mb-1">No specialists match your search</h3>
            <p className="text-xs sm:text-sm text-[#667085] mb-6">
              Try adjusting your specialty filters, keywords, or availability preferences.
            </p>
            <button
              id="reset-doctor-filters-btn"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3157D5] text-white text-xs font-semibold hover:bg-[#2443AE] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Doctors Grid */}
        {!isLoading && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                id={`doctor-card-${doc.id}`}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4E9F2] hover:border-[#3157D5]/40 hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Top: Photo & Basic Details */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl object-cover border border-[#E4E9F2] group-hover:scale-102 transition-transform"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-md shadow-xs">
                        <ShieldCheck className="w-4 h-4 text-[#3157D5]" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5">{getAvailabilityBadge(doc.availability)}</div>
                      <h3 className="text-base font-bold text-[#15213D] group-hover:text-[#3157D5] transition-colors truncate">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#3157D5] truncate mb-1">{doc.specialty}</p>
                      <div className="flex items-center gap-2 text-xs text-[#667085]">
                        <span className="font-semibold">{doc.experienceYears}+ yrs exp</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-bold text-[#15213D]">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {doc.rating}
                          <span className="text-[11px] font-normal text-[#667085]">({doc.reviewCount})</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Department & Location */}
                  <div className="bg-[#F6F8FC] rounded-xl p-2.5 mb-4 space-y-1 text-xs text-[#667085]">
                    <div className="flex items-center gap-1.5 truncate">
                      <Building className="w-3.5 h-3.5 text-[#3157D5] flex-shrink-0" />
                      <span className="font-medium text-[#15213D]">{doc.department}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#28B8D4] flex-shrink-0" />
                      <span className="truncate">{doc.roomNumber}</span>
                    </div>
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex items-center justify-between text-xs mb-4 px-1">
                    <span className="text-[#667085]">Consultation Fee:</span>
                    <span className="font-bold text-[#15213D] text-sm">${doc.consultationFee}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#E4E9F2] flex items-center gap-2">
                  <button
                    id={`view-profile-btn-${doc.id}`}
                    onClick={() => onViewDoctorProfile(doc)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#15213D] bg-[#F6F8FC] hover:bg-[#EEF3FA] border border-[#E4E9F2] transition-colors cursor-pointer"
                  >
                    View Profile
                  </button>

                  <button
                    id={`book-doctor-btn-${doc.id}`}
                    onClick={() => onBookDoctor(doc)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
