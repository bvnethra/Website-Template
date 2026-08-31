import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import type { BlogArticle } from '../../data/blog';
import { Badge } from './Badge';

interface BlogCardProps {
  article: BlogArticle;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={article.heroImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" size="md">
            {article.category}
          </Badge>
        </div>
        <button
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:text-primary transition-colors shadow-soft"
          title="Save Article"
        >
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            <Link to={`/health-library/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={article.authorAvatar}
              alt={article.authorName}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div>
              <p className="text-xs font-semibold text-slate-900 leading-tight">{article.authorName}</p>
              <p className="text-[10px] text-slate-500">{article.authorRole}</p>
            </div>
          </div>

          <Link
            to={`/health-library/${article.slug}`}
            className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"
            aria-label={`Read ${article.title}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};
