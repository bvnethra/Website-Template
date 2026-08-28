'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Search, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  date: string;
  author: string;
}

const mockArticles: Article[] = [
  { id: 'art-1', title: 'Understanding Vitamin D3 Deficiency', category: 'nutrition', readTime: '5 min read', summary: 'Why Vitamin D3 is critical for your immunity, bone health, and mood, and how to safely correct a deficiency.', date: 'August 24, 2026', author: 'Dr. Ananya Sharma' },
  { id: 'art-2', title: '5 Daily Habits for a Healthy Heart', category: 'cardiology', readTime: '4 min read', summary: 'Simple dietary and lifestyle changes you can implement today to support cardiovascular efficiency.', date: 'August 20, 2026', author: 'Dr. Vikram Malhotra' },
  { id: 'art-3', title: 'A Parent\'s Guide to Childhood Immunity', category: 'pediatrics', readTime: '6 min read', summary: 'Understanding immunizations schedules, gut-health foods, and common cold management in toddlers.', date: 'August 15, 2026', author: 'Dr. Rajesh Patel' },
  { id: 'art-4', title: 'Managing Diabetes: Beyond Insulin', category: 'diabetes', readTime: '7 min read', summary: 'Tracking glycated hemoglobin (HbA1c) and daily carbohydrate distributions for stable blood sugar levels.', date: 'August 10, 2026', author: 'Dr. Ananya Sharma' },
];

export default function HealthLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = mockArticles.filter((art) => {
    return (
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-4xl">
        
        {/* Banner Headers */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            MediNova Health Library
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
            Verified medical advice, wellness guides, and diagnostic explanations compiled by our clinical specialists.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search library for conditions, symptoms, wellness..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-brand-border text-sm text-navy-900 placeholder:text-navy-400 focus:border-mint-400 focus:ring-2 focus:ring-mint-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-brand-border rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-[10px] font-bold text-mint-700 bg-mint-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {art.category}
                  </span>
                  
                  <div className="flex items-center gap-1 text-[10px] text-navy-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-navy-900 mb-2 leading-snug">
                  {art.title}
                </h3>
                
                <p className="text-xs text-navy-500 leading-relaxed mb-6">
                  {art.summary}
                </p>
              </div>

              {/* Author & Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-brand-muted mt-auto">
                <div className="text-left">
                  <p className="text-[10px] text-navy-400 font-semibold">Written by</p>
                  <p className="text-xs font-bold text-navy-800">{art.author}</p>
                </div>

                <button className="flex items-center gap-1 text-xs font-bold text-mint-600 hover:text-mint-700 transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-navy-400">No articles found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}

      </div>
    </div>
  );
}
