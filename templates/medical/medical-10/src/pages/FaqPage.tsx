import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { Badge } from '../components/ui/Badge';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<string | null>(FAQS[0].id);

  const categories = ['All', 'Appointments', 'Insurance & Billing', 'Services', 'Virtual Care', 'Emergency Care'];

  const filteredFaqs = FAQS.filter(faq => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesQuery =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center space-y-3">
        <Badge variant="primary" size="md" className="mx-auto bg-blue-900/60 text-blue-200 border-blue-700">
          Knowledge Base
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-slate-300 text-base max-w-xl mx-auto">
          Find instant answers to common questions about patient care, insurance plans, scheduling, and telehealth.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by keyword (e.g., insurance, telehealth, cancel)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
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

      <div className="space-y-4">
        {filteredFaqs.map(faq => (
          <div key={faq.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft">
            <button
              onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-base hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <Badge variant="primary" size="sm">
                  {faq.category}
                </Badge>
                <span>{faq.question}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeFaq === faq.id ? 'rotate-180 text-primary' : ''}`} />
            </button>
            {activeFaq === faq.id && (
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
