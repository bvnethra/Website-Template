import React, { useState } from 'react';
import { 
  X, 
  Users, 
  MessageSquare, 
  Send, 
  ThumbsUp, 
  Flame, 
  Sparkles, 
  GraduationCap, 
  Award,
  Search,
  Hash,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

interface Thread {
  id: string;
  author: string;
  avatar: string;
  role: string;
  badge?: string;
  timeAgo: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 'th-1',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    role: 'Instructor • Lead Data Scientist',
    badge: 'Faculty',
    timeAgo: '20 min ago',
    title: 'Tips for mastering Z-Score normalization in Pandas for high-dimensional sets',
    content: 'When standardizing massive continuous feature vectors, always ensure zero variance features are safely guarded with epsilon (1e-8) to avoid divide-by-zero runtime exceptions in production pipelines!',
    category: 'Data Science',
    likes: 38,
    commentsCount: 9,
  },
  {
    id: 'th-2',
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    role: 'Student • Cohort #14',
    timeAgo: '1 hour ago',
    title: 'Just unlocked the Consistency Titan badge (14-day study streak)!',
    content: 'Doing 30 minutes of Python & unit economics code exercises every morning before work made a tremendous difference. Happy to answer any questions for new learners.',
    category: 'Milestones',
    likes: 64,
    commentsCount: 14,
  },
  {
    id: 'th-3',
    author: 'Ben Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    role: 'Instructor • Growth Strategist',
    badge: 'Faculty',
    timeAgo: '3 hours ago',
    title: 'Live Q&A Workshop this Thursday: LTV/CAC Modeling for SaaS in 2026',
    content: 'We will walk through real-world attribution models across Google Ads, Meta, and Organic SEO. Drop your campaign questions below!',
    category: 'Marketing',
    likes: 92,
    commentsCount: 27,
  }
];

export const CommunityModal: React.FC<CommunityModalProps> = ({
  isOpen,
  onClose,
  studentName,
}) => {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeChannel, setActiveChannel] = useState('All');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  if (!isOpen) return null;

  const channels = ['All', 'Data Science', 'Marketing', 'AI & ML', 'Milestones', 'Job Board'];

  const handleLike = (id: string) => {
    setThreads(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          likes: t.isLiked ? t.likes - 1 : t.likes + 1,
          isLiked: !t.isLiked,
        };
      }
      return t;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newThread: Thread = {
      id: `th-${Date.now()}`,
      author: studentName,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      role: 'Student • Active Learner',
      timeAgo: 'Just now',
      title: newPostTitle,
      content: newPostContent,
      category: activeChannel === 'All' ? 'Data Science' : activeChannel,
      likes: 1,
      commentsCount: 0,
      isLiked: true,
    };

    setThreads([newThread, ...threads]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsPosting(false);
  };

  const filteredThreads = activeChannel === 'All'
    ? threads
    : threads.filter(t => t.category === activeChannel);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-teal-50 via-white to-orange-50/50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-display">
                Learnora Community & Study Circles
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-extrabold uppercase">
                  18,400+ Online
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Collaborate with peers, ask faculty questions, and share project milestones.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channels Tab Strip */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {channels.map((chan) => (
              <button
                key={chan}
                onClick={() => setActiveChannel(chan)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeChannel === chan
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                #{chan}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsPosting(!isPosting)}
            className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs shrink-0 flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isPosting ? 'Cancel Post' : 'New Discussion'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* New Post Form */}
          {isPosting && (
            <form onSubmit={handleCreatePost} className="p-4 rounded-xl bg-orange-50/60 border border-orange-200 space-y-3">
              <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider">Start a Community Discussion</h4>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Thread topic or question title..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-orange-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300 font-medium"
                required
              />
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Share your insights, code problem, or project update..."
                rows={3}
                className="w-full px-3 py-2 text-xs rounded-lg border border-orange-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300 font-normal"
                required
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPosting(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" /> Post Thread
                </button>
              </div>
            </form>
          )}

          {/* Thread Cards */}
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-teal-200 transition-colors"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={thread.avatar}
                    alt={thread.author}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{thread.author}</span>
                      {thread.badge && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800">
                          {thread.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">{thread.role} • {thread.timeAgo}</div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  #{thread.category}
                </span>
              </div>

              {/* Title & Content */}
              <h3 className="mt-3 text-sm font-bold text-slate-900">
                {thread.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                {thread.content}
              </p>

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(thread.id)}
                    className={`flex items-center gap-1.5 font-bold transition-colors ${
                      thread.isLiked ? 'text-orange-600' : 'text-slate-600 hover:text-orange-500'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{thread.likes}</span>
                  </button>

                  <button className="flex items-center gap-1.5 font-medium hover:text-slate-800 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{thread.commentsCount} replies</span>
                  </button>
                </div>

                <button className="flex items-center gap-1 hover:text-slate-800 text-[11px] font-medium">
                  <Share2 className="w-3 h-3" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> All community discussions are moderated & spam-free
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
