import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, RotateCcw, User } from 'lucide-react';
import { DOCTORS } from '../data/doctors';
import { DEPARTMENTS } from '../data/departments';
import { DoctorCard } from '../components/ui/DoctorCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DoctorCardSkeleton } from '../components/ui/SkeletonLoader';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Doctors: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialDept = searchParams.get('departmentId') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [minExperience, setMinExperience] = useState<number>(0);
  const [onlyAvailableToday, setOnlyAvailableToday] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'experience'>('recommended');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFilterChange = (setter: (val: any) => void, val: any) => {
    setIsLoading(true);
    setter(val);
    setTimeout(() => setIsLoading(false), 300);
  };

  const clearFilters = () => {
    setIsLoading(true);
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedGender('all');
    setSelectedLanguage('all');
    setMinExperience(0);
    setOnlyAvailableToday(false);
    setSortBy('recommended');
    setSearchParams({});
    setTimeout(() => setIsLoading(false), 300);
  };

  const filteredDoctors = useMemo(() => {
    let result = [...DOCTORS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.biography.toLowerCase().includes(q) ||
          d.expertise.some(e => e.toLowerCase().includes(q))
      );
    }

    if (selectedDept !== 'all') {
      result = result.filter(d => d.departmentId === selectedDept);
    }

    if (selectedGender !== 'all') {
      result = result.filter(d => d.gender === selectedGender);
    }

    if (selectedLanguage !== 'all') {
      result = result.filter(d => d.languages.includes(selectedLanguage));
    }

    if (minExperience > 0) {
      result = result.filter(d => d.experienceYears >= minExperience);
    }

    if (onlyAvailableToday) {
      result = result.filter(d => d.isAvailableToday);
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      result.sort((a, b) => b.experienceYears - a.experienceYears);
    }

    return result;
  }, [searchQuery, selectedDept, selectedGender, selectedLanguage, minExperience, onlyAvailableToday, sortBy]);

  const allLanguages = Array.from(new Set(DOCTORS.flatMap(d => d.languages)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <ScrollReveal direction="down">
        <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
              CareNova Specialist Network
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Find a Medical Specialist</h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Browse world-class board-certified doctors, review clinical qualifications, and book in-person or telemedicine consultations.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleFilterChange(setSearchQuery, e.target.value)}
              placeholder="Search by doctor name, specialty, condition, or procedure..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer w-full md:w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Department</label>
            <select
              value={selectedDept}
              onChange={e => handleFilterChange(setSelectedDept, e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Departments ({DOCTORS.length})</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Gender</label>
            <select
              value={selectedGender}
              onChange={e => handleFilterChange(setSelectedGender, e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">Any Gender</option>
              <option value="female">Female Physicians</option>
              <option value="male">Male Physicians</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Language Spoken</label>
            <select
              value={selectedLanguage}
              onChange={e => handleFilterChange(setSelectedLanguage, e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Languages</option>
              {allLanguages.map((lang, idx) => (
                <option key={idx} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5">Experience</label>
            <select
              value={minExperience}
              onChange={e => handleFilterChange(setMinExperience, Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value={0}>Any Experience</option>
              <option value={10}>10+ Years</option>
              <option value={15}>15+ Years</option>
            </select>
          </div>

          <div className="flex items-center pt-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyAvailableToday}
                onChange={e => handleFilterChange(setOnlyAvailableToday, e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
              <span>Available Today Only</span>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">
              Showing <strong>{filteredDoctors.length}</strong> of {DOCTORS.length} doctors
            </span>
            {selectedDept !== 'all' && (
              <Badge variant="primary" size="sm">
                Dept: {DEPARTMENTS.find(d => d.id === selectedDept)?.name}
              </Badge>
            )}
            {onlyAvailableToday && (
              <Badge variant="success" size="sm">
                Available Today
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-slate-500"
          >
            Reset Filters
          </Button>
        </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <DoctorCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No doctors match your selected filters</h3>
            <p className="text-slate-500 text-sm">
              Try loosening your search criteria or resetting filters to view all available physicians.
            </p>
            <Button variant="primary" size="md" onClick={clearFilters} leftIcon={<RotateCcw className="w-4 h-4" />}>
              Clear All Filters
            </Button>
          </div>
        )}
      </ScrollReveal>
    </div>
  );
};
