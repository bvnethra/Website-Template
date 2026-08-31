import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blog';
import { BlogCard } from '../components/ui/BlogCard';
import { Badge } from '../components/ui/Badge';
import { Link } from 'react-router-dom';

export const HealthLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Heart Health', 'Neurology', 'Children\'s Health', 'Dermatology', 'Fitness', 'Mental Wellness', 'Preventive Care'];

  const featuredArticle = BLOG_ARTICLES.find(a => a.isFeatured) || BLOG_ARTICLES[0];

  const filteredArticles = BLOG_ARTICLES.filter(art => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
            Medical Insights & Research
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Health Library & Articles</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Evidence-based medical articles, doctor advice, preventive guidelines, and clinical news written by CareNova specialists.
          </p>
        </div>
      </div>

      {featuredArticle && !searchQuery && selectedCategory === 'All' && (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 relative h-64 lg:h-auto">
            <img src={featuredArticle.heroImage} alt={featuredArticle.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <Badge variant="primary" size="md">
                Featured Article
              </Badge>
            </div>
          </div>
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{featuredArticle.publishedDate}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 hover:text-primary transition-colors">
                <Link to={`/health-library/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{featuredArticle.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={featuredArticle.authorAvatar} alt={featuredArticle.authorName} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-900">{featuredArticle.authorName}</p>
                  <p className="text-[10px] text-slate-500">{featuredArticle.authorRole}</p>
                </div>
              </div>

              <Link to={`/health-library/${featuredArticle.slug}`}>
                <Badge variant="secondary" size="md">
                  Read Article
                </Badge>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search health topics, conditions, or doctor articles..."
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map(art => (
          <BlogCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
};
