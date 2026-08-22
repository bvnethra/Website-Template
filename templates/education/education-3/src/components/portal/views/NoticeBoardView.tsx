import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { PortalNotice } from '../../../types/auth';
import { 
  BellRing, 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Calendar, 
  User, 
  X, 
  Building, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const NoticeBoardView: React.FC = () => {
  const { notices } = useAuth();
  const { addToast } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoticeModal, setActiveNoticeModal] = useState<PortalNotice | null>(null);

  const categories = ['All', 'Examinations', 'Academic', 'Fees', 'Circulars'];

  const filteredNotices = notices.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.referenceNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadNotice = (notice: PortalNotice) => {
    addToast({
      type: 'success',
      title: 'Official Gazette Downloaded',
      message: `Downloaded "${notice.title.substring(0, 35)}..." (${notice.fileSize || 'PDF Document'}).`
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
            Examination & Academic Notice Board
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D4E]">
            Official circulars, exam schedules, revaluation notifications, and fee advisories issued by the Registrar.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#0D2F2F] text-white shadow-xs'
                  : 'bg-[#F4F1EA] text-[#4A5D4E] hover:text-[#0D2F2F] hover:bg-[#E8EAE3]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#4A5D4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars or reference #..."
            className="w-full pl-9 pr-4 py-2 bg-[#FDFBF7] border border-[#DDD8CE] rounded-xl text-xs text-[#0D2F2F] placeholder-[#A7B3A2] focus:outline-none focus:ring-2 focus:ring-[#0D2F2F]"
          />
        </div>
      </div>

      {/* Notices Grid */}
      <div className="space-y-3">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white p-5 rounded-2xl border border-[#E8EAE3] hover:border-[#0D2F2F] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0D2F2F] text-white">
                  {notice.category}
                </span>
                {notice.priority === 'Urgent' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                    Urgent / COE Order
                  </span>
                )}
                <span className="text-[11px] font-mono text-[#4A5D4E] font-medium">
                  Ref: {notice.referenceNo}
                </span>
                <span className="text-[11px] text-[#4A5D4E]">
                  • {notice.date}
                </span>
              </div>

              <h3 
                onClick={() => setActiveNoticeModal(notice)}
                className="font-heading text-sm sm:text-base font-bold text-[#0D2F2F] hover:text-[#FF6B4A] transition-colors cursor-pointer"
              >
                {notice.title}
              </h3>

              <p className="text-xs text-[#4A5D4E] line-clamp-2">
                {notice.content}
              </p>

              <div className="flex items-center gap-2 text-[11px] text-[#4A5D4E] pt-1">
                <User className="w-3.5 h-3.5" />
                <span>Issued by: <strong>{notice.author}</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => setActiveNoticeModal(notice)}
                className="px-3.5 py-2 bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#0D2F2F] text-xs font-bold rounded-xl transition-colors"
              >
                Read Circular
              </button>
              <button
                onClick={() => handleDownloadNotice(notice)}
                className="p-2 bg-[#0D2F2F] hover:bg-[#082020] text-white rounded-xl transition-colors"
                title="Download Official PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-[#E8EAE3] text-center space-y-3">
            <BellRing className="w-8 h-8 text-[#A7B3A2] mx-auto" />
            <h4 className="font-heading text-base font-bold text-[#0D2F2F]">No Matching Notices Found</h4>
            <p className="text-xs text-[#4A5D4E]">Try adjusting your search criteria or category filter.</p>
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#DDD8CE] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveNoticeModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#4A5D4E] hover:bg-[#F4F1EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* University Seal Header */}
            <div className="border-b border-[#E8EAE3] pb-4 mb-5 text-center">
              <span className="font-heading text-xs font-extrabold tracking-widest text-[#0D2F2F] uppercase block">
                EDUVORA UNIVERSITY • OFFICE OF THE CONTROLLER OF EXAMINATIONS
              </span>
              <span className="text-[10px] text-[#4A5D4E] uppercase font-mono block mt-0.5">
                Official Gazette Reference: {activeNoticeModal.referenceNo}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0D2F2F] text-white">
                  {activeNoticeModal.category} Circular
                </span>
                <span className="text-xs font-medium text-[#4A5D4E]">
                  Published: {activeNoticeModal.date}
                </span>
              </div>

              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#0D2F2F]">
                {activeNoticeModal.title}
              </h2>

              <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] text-xs text-[#0D2F2F] leading-relaxed space-y-3">
                <p>{activeNoticeModal.content}</p>
                <p>
                  All concerned Department Heads, Faculty Proctors, and Candidate Scholars are advised to take note of the above directives and adhere strictly to the schedule stipulated by the Autonomous Examination Council.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E8EAE3] text-xs">
                <div>
                  <span className="font-bold text-[#0D2F2F] block">By Order of the Vice Chancellor</span>
                  <span className="text-[#4A5D4E]">{activeNoticeModal.author}</span>
                </div>

                <button
                  onClick={() => handleDownloadNotice(activeNoticeModal)}
                  className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Gazetted PDF ({activeNoticeModal.fileSize || 'PDF'})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
