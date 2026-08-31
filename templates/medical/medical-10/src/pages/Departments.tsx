import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DEPARTMENTS } from '../data/departments';
import { DepartmentCard } from '../components/ui/DepartmentCard';
import { Badge } from '../components/ui/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Departments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDepts = DEPARTMENTS.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.featuredServices.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <ScrollReveal direction="down">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
              Medical Specializations
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Clinical Departments</h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Discover our 12 world-class centers of excellence, bringing together leading specialists, cutting-edge diagnostics, and compassionate therapy.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search departments, clinical specialties, or procedures..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white transition-colors"
            />
          </div>
          <p className="text-xs text-slate-500 font-semibold shrink-0">
            Showing <strong>{filteredDepts.length}</strong> of 12 Departments
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDepts.map(dept => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
};
