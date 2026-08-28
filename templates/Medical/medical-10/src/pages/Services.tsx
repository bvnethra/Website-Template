import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SERVICES } from '../data/services';
import { ServiceCard } from '../components/ui/ServiceCard';
import { Badge } from '../components/ui/Badge';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Services: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'General Health', 'Specialty Care', 'Diagnostics', 'Prevention', 'Rehabilitation', 'Behavioral Health', 'Digital Health'];

  const filteredServices = SERVICES.filter(srv => {
    const matchesCat = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesQuery =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Banner */}
      <ScrollReveal direction="down">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl space-y-3">
            <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
              CareNova Healthcare Offerings
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Clinical Services</h1>
            <p className="text-slate-300 text-base leading-relaxed">
              From routine preventive checkups to advanced imaging, blood pathology, and physical therapy programs.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Filter Chips & Search Bar */}
      <ScrollReveal direction="up">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search clinical services or procedures..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary shadow-soft'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <ScrollReveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredServices.map(srv => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
};
