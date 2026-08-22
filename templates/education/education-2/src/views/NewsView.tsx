import React, { useState } from 'react';
import { FileText, ArrowRight, Search, Sparkles, Clock, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockNews } from '../data/mockData';

interface NewsViewProps {
  onNavigate: (route: string, param?: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onNavigate }) => {
  const { theme, config } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'Quantum Computing', 'Oncology', 'Humanities', 'Sustainability', 'Campus Expansion'];

  const filteredNews = mockNews.filter((n) => {
    const matchesTag = selectedTag === 'All' || n.tags.includes(selectedTag);
    const matchesQuery =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Institutional Gazette & Press
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          {config.name} Gazette & Research Discoveries
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Official news releases, faculty journal commentaries, laboratory breakthroughs, and presidential announcements from {config.name}.
        </p>
      </div>

      {/* Filter and Tags */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedTag === tag
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news releases..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigate('news-detail', item.id)}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{item.publishDate}</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {item.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>By {item.author}</span>
              <span className="text-amber-800 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
