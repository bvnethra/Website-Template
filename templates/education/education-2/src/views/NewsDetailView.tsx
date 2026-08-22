import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { mockNews } from '../data/mockData';

interface NewsDetailViewProps {
  newsId?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({ newsId, onNavigate }) => {
  const { theme, addNotification } = useTheme();

  const article = mockNews.find((n) => n.id === newsId) || mockNews[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addNotification('info', 'Link Copied', 'Article permalink copied to clipboard.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('news')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gazette Articles</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-md">
            {article.category}
          </span>
          <span className="text-xs text-slate-400">• Press Release</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-slate-900 leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-b border-slate-200 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-700" />
              <strong>{article.author}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-amber-800 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Article</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="rounded-3xl overflow-hidden shadow-md aspect-video">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <div className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed font-serif">
        <p className="text-lg sm:text-xl font-sans font-medium text-slate-900 leading-snug border-l-4 border-amber-500 pl-4 italic">
          {article.summary}
        </p>

        <p>
          CAMBRIDGE, MA — Edunexa University today shared extensive findings from its landmark research collaborative, demonstrating significant progress across multidisciplinary initiatives. Faculty investigators, graduate scholars, and international research partners convened at the campus center to present preliminary empirical validation.
        </p>

        <p>
          "This project embodies Edunexa’s foundational charter — applying rigorous scholastic theory to address urgent societal needs," noted the Vice Provost for Research. "By integrating cutting-edge computational architecture with classical scientific discipline, our teams are charting new frontiers in academic inquiry."
        </p>

        <p>
          Funding for the initiative was supported through federal endowments, private philanthropy, and corporate research alliances. Further symposium discussions and open-access publications will follow in next month's peer-reviewed journals.
        </p>
      </div>

      {/* Tags & Footer Navigation */}
      <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {article.tags.map((t, i) => (
            <span key={i} className="text-xs font-semibold px-3 py-1 rounded-xl bg-slate-100 text-slate-700">
              #{t}
            </span>
          ))}
        </div>

        <button
          onClick={() => onNavigate('news')}
          style={{ backgroundColor: theme.primary }}
          className="px-5 py-2.5 rounded-xl text-white font-bold text-xs hover:opacity-95"
        >
          View More University News
        </button>
      </div>
    </div>
  );
};
