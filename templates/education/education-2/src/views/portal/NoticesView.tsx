import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  Download,
  FileText,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  X,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NoticeItem } from '../../types';

export const NoticesView: React.FC = () => {
  const { notices, markNoticeRead } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalNotice, setActiveModalNotice] = useState<NoticeItem | null>(null);

  const categories = ['All', 'Examinations', 'Academic', 'Fees', 'Circulars'];

  const filteredNotices = notices.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenNotice = (notice: NoticeItem) => {
    markNoticeRead(notice.id);
    setActiveModalNotice(notice);
  };

  const handleDownloadAttachment = (filename?: string) => {
    alert(`Downloading verified official circular attachment: ${filename || 'Eduvora_Circular.pdf'}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl border border-[#EAE4D7] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F] text-white text-xs font-bold mb-2">
            <Bell className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official University Gazettes & Circulars</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#0D2F2F]">
            Notice Board & Academic Bulletins
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Certified notifications from Controller of Examinations, Academic Council & Bursar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Total Active Notices: <strong className="text-[#0D2F2F]">{notices.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#EAE4D7]">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0D2F2F] text-white shadow-xs'
                  : 'bg-white hover:bg-[#EAE4D7] text-[#0D2F2F] border border-[#EAE4D7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars, topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#EAE4D7] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
          />
        </div>
      </div>

      {/* Notice Feed */}
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => handleOpenNotice(notice)}
              className={`p-5 sm:p-6 rounded-3xl border transition-all cursor-pointer group ${
                notice.isUrgent
                  ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                  : 'bg-[#FDFBF7] border-[#EAE4D7] hover:border-[#0D2F2F]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0D2F2F] text-white">
                    {notice.category}
                  </span>
                  {notice.isUrgent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-600" />
                      Urgent Action
                    </span>
                  )}
                  {notice.isNew && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FF6B4A] text-white">
                      New
                    </span>
                  )}
                  <span className="text-xs font-mono text-slate-500">Ref: {notice.id}</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>{notice.date}</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-serif font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors leading-snug">
                {notice.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                {notice.content}
              </p>

              <div className="mt-4 pt-3 border-t border-[#EAE4D7] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-500">
                  Issued by: <strong className="text-[#0D2F2F]">{notice.issuedBy}</strong>
                </div>

                <div className="flex items-center gap-3">
                  {notice.attachmentName && (
                    <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 bg-[#EAE4D7]/70 px-2.5 py-1 rounded-lg">
                      <FileText className="w-3.5 h-3.5 text-[#0D2F2F]" />
                      <span>{notice.attachmentName} ({notice.attachmentSize})</span>
                    </span>
                  )}
                  <span className="text-[#FF6B4A] font-bold flex items-center gap-1 group-hover:underline">
                    <span>Read Full Circular</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center bg-[#FDFBF7] rounded-3xl border border-[#EAE4D7] space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-[#0D2F2F]">No matching circulars found</h4>
            <p className="text-xs text-slate-500">
              Try adjusting your search keywords or switching category filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal: Full Notice View */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EAE4D7] p-6 sm:p-8 animate-in zoom-in-95 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalNotice(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-[#0D2F2F] hover:bg-[#EAE4D7]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Circular Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#EAE4D7]">
              <div className="w-12 h-12 rounded-2xl bg-[#0D2F2F] text-white flex items-center justify-center font-serif font-black text-xl">
                EV
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B4A] block">
                  Eduvora University • Office of the Registrar
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">
                  Notification Ref: {activeModalNotice.id}
                </span>
              </div>
            </div>

            {/* Notice Title & Meta */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0D2F2F] text-white">
                  {activeModalNotice.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">{activeModalNotice.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0D2F2F] leading-tight">
                {activeModalNotice.title}
              </h2>
            </div>

            {/* Notice Body */}
            <div className="mt-5 p-5 rounded-2xl bg-white border border-[#EAE4D7] text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4">
              <p>{activeModalNotice.content}</p>
              <p>
                All students, departmental heads, and academic faculties are advised to adhere strictly to the timelines outlined herein. Any queries must be directed to the Controller of Examinations Helpdesk or through the Student Grievance Support Hub.
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="italic">Authorized Signatory: {activeModalNotice.issuedBy}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Cryptographically Verified
                </span>
              </div>
            </div>

            {/* Download Attachment Action */}
            {activeModalNotice.attachmentName && (
              <div className="mt-5 p-4 rounded-2xl bg-[#EAE4D7]/60 border border-[#DDD6C8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#0D2F2F]" />
                  <div>
                    <span className="text-xs font-bold text-[#0D2F2F] block">
                      {activeModalNotice.attachmentName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Official Sealed PDF ({activeModalNotice.attachmentSize})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadAttachment(activeModalNotice.attachmentName)}
                  className="px-4 py-2 rounded-xl bg-[#0D2F2F] hover:bg-[#081E1E] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>Download</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t border-[#EAE4D7] flex justify-end">
              <button
                onClick={() => setActiveModalNotice(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0D2F2F] text-white text-xs font-bold"
              >
                Close Circular
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
