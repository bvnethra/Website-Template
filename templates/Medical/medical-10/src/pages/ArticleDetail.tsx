import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Calendar as CalendarIcon, MessageSquare, Send } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blog';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BlogCard } from '../components/ui/BlogCard';
import { useToast } from '../context/ToastContext';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();
  const article = BLOG_ARTICLES.find(a => a.slug === slug || a.id === slug);

  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState([
    { id: '1', author: 'Dr. Michael Vance', text: 'Excellent summary on lifestyle interventions for hypertension.', date: '3 days ago' },
    { id: '2', author: 'Emily Watson', text: 'Thank you for explaining the Mediterranean diet steps so clearly!', date: '1 week ago' }
  ]);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-600">The requested article could not be located in our health library.</p>
        <Link to="/health-library">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Health Library
          </Button>
        </Link>
      </div>
    );
  }

  const relatedArticles = BLOG_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentsList(prev => [
      { id: Date.now().toString(), author: 'Patient Visitor', text: commentText, date: 'Just now' },
      ...prev
    ]);
    setCommentText('');
    showToast('Comment Submitted', 'Thank you for sharing your thoughts on this article.', 'success');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Article link copied to your clipboard.', 'success');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link to="/health-library" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Health Library</span>
      </Link>

      <div className="space-y-4">
        <Badge variant="primary" size="md">
          {article.category}
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">{article.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-b border-slate-100 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img src={article.authorAvatar} alt={article.authorName} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
            <div>
              <p className="font-bold text-slate-900 text-sm">{article.authorName}</p>
              <p className="text-[10px] text-slate-500">{article.authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <button onClick={handleShare} className="p-2 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-primary rounded-xl transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden shadow-soft max-h-[440px]">
        <img src={article.heroImage} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {article.tableOfContents.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">Table of Contents</h3>
          <ul className="space-y-1.5 text-xs text-primary font-semibold">
            {article.tableOfContents.map((toc, i) => (
              <li key={i}>
                <a href={`#section-${i}`} className="hover:underline">
                  • {toc}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-6">
        {article.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="bg-gradient-primary rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-bold text-xl">Have questions about this condition?</h3>
          <p className="text-blue-100 text-xs mt-1">Consult directly with our specialist physicians for a personalized health evaluation.</p>
        </div>
        <Link to="/appointments">
          <Button variant="secondary" size="md" leftIcon={<CalendarIcon className="w-4 h-4" />}>
            Book Consultation
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex items-center gap-4">
        <img src={article.authorAvatar} alt={article.authorName} className="w-16 h-16 rounded-2xl object-cover" />
        <div>
          <p className="font-bold text-slate-900 text-base">Written by {article.authorName}</p>
          <p className="text-xs text-slate-500">{article.authorRole} at CareNova Health System</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <h3 className="font-bold text-slate-900 text-xl flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" /> Patient & Community Discussion ({commentsList.length})
        </h3>

        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            rows={3}
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Add your thoughts or ask a question about this article..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Post Comment
            </Button>
          </div>
        </form>

        <div className="space-y-3 pt-4 border-t border-slate-100">
          {commentsList.map(c => (
            <div key={c.id} className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{c.author}</span>
                <span className="text-slate-400 font-normal">{c.date}</span>
              </div>
              <p className="text-slate-600">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map(art => (
            <BlogCard key={art.id} article={art} />
          ))}
        </div>
      </div>
    </div>
  );
};
