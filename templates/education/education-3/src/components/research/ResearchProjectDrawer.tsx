import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FlaskConical, 
  BookOpen, 
  Award, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Users, 
  FileText, 
  Building2, 
  ChevronRight,
  ShieldCheck,
  Dna,
  Cpu,
  Atom,
  Clock
} from 'lucide-react';
import { ResearchCenter, ResearchProject, PublicationItem } from '../../types';

interface ResearchProjectDrawerProps {
  center: ResearchCenter | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (centerId: string) => void;
}

export const ResearchProjectDrawer: React.FC<ResearchProjectDrawerProps> = ({
  center,
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'publications' | 'facilities'>('projects');
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);

  if (!isOpen || !center) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="research-drawer-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C382E]/70 backdrop-blur-sm transition-opacity"
        />

        {/* Drawer Container */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-2xl bg-[#FDFBF7] border-l border-[#E8EAE3] shadow-2xl flex flex-col"
          >
            
            {/* Drawer Header */}
            <div className="p-6 bg-[#F4F1EA] border-b border-[#E8EAE3] flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-[#4A5D4E] border border-[#E8EAE3]">
                    {center.department}
                  </span>
                  <h3 id="research-drawer-title" className="text-xl font-bold font-heading text-[#2D3436] mt-1.5 leading-snug">
                    {center.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#4A5D4E] mt-0.5">
                    Lead: {center.lead} ({center.leadRole})
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[#A7B3A2] hover:text-[#4A5D4E] hover:bg-[#E8EAE3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Header Tabs */}
            <div className="grid grid-cols-3 bg-white border-b border-[#E8EAE3] p-2 gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'projects'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#F4F1EA]'
                }`}
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Active Projects ({center.activeProjects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('publications')}
                className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'publications'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#F4F1EA]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Key Publications ({center.keyPublications.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('facilities')}
                className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'facilities'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#F4F1EA]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Labs & Specs</span>
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: ACTIVE PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                      Current Sponsored Investigations
                    </span>
                    <span className="text-xs font-semibold text-[#A7B3A2]">
                      Total Grants: {center.fundedGrants.split(' ')[0]}
                    </span>
                  </div>

                  {center.activeProjects.map((proj) => {
                    const isExpanded = selectedProject?.id === proj.id;
                    return (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-xs space-y-3.5 transition-all hover:border-[#4A5D4E]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                proj.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                                proj.status === 'Clinical/Pilot Stage' ? 'bg-teal-100 text-teal-800' :
                                proj.status === 'Patented' ? 'bg-purple-100 text-purple-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {proj.status}
                              </span>
                              <span className="text-[11px] font-bold text-[#4A5D4E] bg-[#F4F1EA] px-2 py-0.5 rounded-md">
                                {proj.grantAmount}
                              </span>
                            </div>
                            <h4 className="text-base font-bold font-heading text-[#2D3436] leading-snug">
                              {proj.title}
                            </h4>
                          </div>
                        </div>

                        <div className="text-xs text-[#2D3436]/70 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span><strong>Lead:</strong> {proj.leadResearcher}</span>
                          <span><strong>Grant:</strong> {proj.fundingBody}</span>
                        </div>

                        <p className="text-xs text-[#2D3436] leading-relaxed bg-[#FDFBF7] p-3 rounded-xl border border-[#E8EAE3]">
                          {proj.abstract}
                        </p>

                        {/* Impact Highlight Box */}
                        <div className="p-3 rounded-xl bg-[#F4F1EA] border border-[#E8EAE3] flex items-start gap-2 text-xs">
                          <TrendingUp className="w-4 h-4 text-[#4A5D4E] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#4A5D4E] block">Demonstrated Impact:</span>
                            <span className="text-[#2D3436]/90">{proj.impactMetric}</span>
                          </div>
                        </div>

                        {/* Tags & Collaborators */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8EAE3] text-[11px]">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tags.map((t, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-[#F4F1EA] text-[#4A5D4E] font-medium">
                                #{t}
                              </span>
                            ))}
                          </div>
                          <span className="text-[#A7B3A2] italic">
                            Collab: {proj.collaborators.join(', ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: KEY PUBLICATIONS */}
              {activeTab === 'publications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                      High-Impact Peer-Reviewed Articles
                    </span>
                    <span className="text-xs font-semibold text-[#A7B3A2]">
                      Annual Center Output: {center.publicationsCount}+
                    </span>
                  </div>

                  {center.keyPublications.map((pub) => (
                    <div
                      key={pub.id}
                      className="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-xs space-y-2.5 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#4A5D4E] text-white">
                          {pub.journal} ({pub.year})
                        </span>
                        <span className="text-xs font-bold text-[#4A5D4E] bg-[#F4F1EA] px-2 py-0.5 rounded-md">
                          Impact Factor: {pub.impactFactor}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#2D3436] font-heading leading-snug">
                        {pub.title}
                      </h4>

                      <p className="text-xs text-[#2D3436]/70">
                        <strong>Authors:</strong> {pub.authors}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-[#E8EAE3] text-xs">
                        <span className="font-semibold text-[#4A5D4E]">
                          Citations: {pub.citations}
                        </span>
                        <div className="flex items-center gap-1.5 text-[#4A5D4E] hover:underline font-mono text-[11px]">
                          <span>DOI: {pub.doi}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: FACILITIES & SPECS */}
              {activeTab === 'facilities' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                      Infrastructure & Instrumentation
                    </span>
                    <h4 className="text-base font-bold font-heading text-[#2D3436]">
                      Specialized Research Suites
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {center.facilities.map((fac, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-[#E8EAE3] space-y-1.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <h5 className="text-xs font-bold text-[#2D3436] font-heading">{fac}</h5>
                        <p className="text-[11px] text-[#2D3436]/70">
                          Accessible to authorized graduate scholars & external grant holders.
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Booking Trigger Callout */}
                  <div className="p-5 rounded-2xl bg-[#4A5D4E] text-white space-y-3 mt-4">
                    <h5 className="text-sm font-bold font-heading flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Need Experimental Time on this Facility?</span>
                    </h5>
                    <p className="text-xs text-[#E8EAE3] leading-relaxed">
                      Eduvora provides time-share allocations for visiting researchers, Ph.D. fellows, and sponsored industrial partners.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking(center.id);
                      }}
                      className="px-4 py-2 bg-white text-[#4A5D4E] rounded-xl text-xs font-bold shadow-xs hover:bg-[#FDFBF7] transition-all"
                    >
                      Request Lab Access or Grant Proposal
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 bg-[#F4F1EA] border-t border-[#E8EAE3] flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-[#2D3436]/80 hover:text-[#4A5D4E] rounded-xl transition-colors"
              >
                Close Drawer
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking(center.id);
                }}
                className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Submit Research Proposal / Lab Slot</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
