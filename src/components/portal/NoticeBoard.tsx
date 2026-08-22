import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  X,
  FileCheck2,
  Share2,
  Printer
} from 'lucide-react';
import { initialNotices, NoticeItem } from '../../data/portalData';

export const NoticeBoard: React.FC = () => {
  const [notices] = useState<NoticeItem[]>(initialNotices);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(null);

  const categories = ['All', 'Examinations', 'Results', 'Fees', 'Academic', 'General'];

  const filteredNotices = notices.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.referenceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadPdf = (notice: NoticeItem) => {
    // Simulated PDF Download
    const blob = new Blob([`EDUVORA UNIVERSITY - OFFICIAL CIRCULAR\n\nRef: ${notice.referenceNo}\nDate: ${notice.date}\nCategory: ${notice.category}\nSubject: ${notice.title}\n\n${notice.description}\n\nIssued by: ${notice.author}\nAuthorized Controller of Examinations.`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${notice.referenceNo.replace(/\//g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D2F2F]/5 border border-[#0D2F2F]/10 text-xs font-bold text-[#0D2F2F] mb-1.5">
            <Bell className="w-3.5 h-3.5 text-[#FF6B4A]" />
            <span>Official University Notice Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0D2F2F] font-display tracking-tight">
            Academic & Examination Circulars
          </h1>
          <p className="text-xs sm:text-sm text-[#476666] mt-0.5">
            Real-time notifications, gazette bulletins, and examination directives.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E5DFD5] shadow-xs space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#476666]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by subject, reference no (e.g. EDV/COE/2026), or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#FAF8F5] border border-[#D8D0C5] text-[#0D2F2F] placeholder-[#8A9E9E] text-xs sm:text-sm focus:outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/20"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-bold text-[#0D2F2F] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#FF6B4A]" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0D2F2F] text-white shadow-xs'
                  : 'bg-[#FAF8F5] hover:bg-[#EFECE4] text-[#2D4F4F] border border-[#E5DFD5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Notices List */}
      <div className="space-y-3.5">
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-[#E5DFD5] text-center space-y-3">
            <FileText className="w-10 h-10 text-[#8A9E9E] mx-auto" />
            <h4 className="text-base font-bold text-[#0D2F2F]">No Circulars Found</h4>
            <p className="text-xs text-[#476666] max-w-sm mx-auto">
              No official announcements match your filter or search query "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-[#0D2F2F] text-white text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <motion.div
              key={notice.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E5DFD5] shadow-xs hover:border-[#D8D0C5] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                    notice.isUrgent 
                      ? 'bg-red-100 text-red-700 border border-red-200 animate-pulse' 
                      : 'bg-[#0D2F2F]/10 text-[#0D2F2F]'
                  }`}>
                    {notice.category}
                  </span>

                  {notice.isUrgent && (
                    <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Priority Notice
                    </span>
                  )}

                  <span className="text-xs font-mono text-[#476666] font-semibold">
                    Ref: {notice.referenceNo}
                  </span>

                  <span className="text-xs text-[#476666]">
                    • {notice.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0D2F2F] group-hover:text-[#FF6B4A] transition-colors leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-[#476666] leading-relaxed line-clamp-2">
                  {notice.description}
                </p>

                <div className="text-[11px] text-[#8A9E9E]">
                  Issued by: <span className="font-semibold text-[#0D2F2F]">{notice.author}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E5DFD5]">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD5] text-xs font-bold text-[#0D2F2F] transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>Read Notice</span>
                </button>

                <button
                  onClick={() => handleDownloadPdf(notice)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0D2F2F] hover:bg-[#184E4E] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  <span>PDF ({notice.pdfFileSize})</span>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Notice Detail & PDF Simulation Modal */}
      <AnimatePresence>
        {activeNoticeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D2F2F]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-2xl bg-white rounded-3xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col"
            >
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-[#476666] hover:text-[#0D2F2F] hover:bg-[#F7F4EE] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-[#E5DFD5] pb-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#FF6B4A] bg-[#FF6B4A]/10 px-2.5 py-0.5 rounded-full">
                    {activeNoticeModal.referenceNo}
                  </span>
                  <span className="text-xs text-[#476666]">{activeNoticeModal.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-[#0D2F2F] font-display">
                  {activeNoticeModal.title}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#2D4F4F] leading-relaxed p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD5] font-serif">
                <div className="text-center font-sans pb-3 border-b border-[#E5DFD5]">
                  <h4 className="font-bold text-[#0D2F2F] text-sm uppercase">Eduvora University • Examination Bureau</h4>
                  <p className="text-[11px] text-[#476666]">Official Academic Gazette & Student Circular</p>
                </div>

                <p className="pt-2">{activeNoticeModal.description}</p>
                
                <p>
                  All students, department heads, and examination invigilators are directed to comply with the stipulated dates without fail. For exceptions, a formal grievance ticket must be lodged through the Examination Support Portal.
                </p>

                <div className="pt-4 font-sans text-right">
                  <div className="font-bold text-[#0D2F2F]">{activeNoticeModal.author}</div>
                  <div className="text-[11px] text-[#476666]">Eduvora University, Main Campus</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E5DFD5] flex items-center justify-between gap-3">
                <span className="text-xs text-[#476666]">File Size: {activeNoticeModal.pdfFileSize}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPdf(activeNoticeModal)}
                    className="px-4 py-2.5 rounded-xl bg-[#FF6B4A] hover:bg-[#E85535] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official Gazette</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
