import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FlaskConical, 
  Atom, 
  Dna, 
  Cpu, 
  Globe2, 
  TrendingUp, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  ArrowRight, 
  Sparkles,
  Layers,
  FileText,
  Building2,
  Users
} from 'lucide-react';
import { 
  RESEARCH_IMPACT_METRICS, 
  RESEARCH_CENTERS_DATA, 
  INITIAL_LAB_BOOKINGS 
} from '../data/mockResearchData';
import { ResearchProjectDrawer } from '../components/research/ResearchProjectDrawer';
import { LabBookingModal } from '../components/research/LabBookingModal';
import { ResearchCenter, LabBookingRequest } from '../types';

export const ResearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCenter, setSelectedCenter] = useState<ResearchCenter | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingTargetCenterId, setBookingTargetCenterId] = useState<string | undefined>(undefined);

  // Local state for interactive lab bookings
  const [labBookings, setLabBookings] = useState<LabBookingRequest[]>(INITIAL_LAB_BOOKINGS);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  const handleOpenDrawer = (center: ResearchCenter) => {
    setSelectedCenter(center);
    setIsDrawerOpen(true);
  };

  const handleOpenBooking = (centerId?: string) => {
    setBookingTargetCenterId(centerId);
    setIsBookingModalOpen(true);
  };

  const handleNewBookingSubmission = (newBooking: LabBookingRequest) => {
    setLabBookings(prev => [newBooking, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-16">
      
      {/* Top Breadcrumb & Hero Banner */}
      <section className="bg-[#F4F1EA] border-b border-[#E8EAE3] pt-10 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#4A5D4E] font-medium mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#A7B3A2]" />
            <span className="font-semibold text-[#2D3436]">Research & Innovation</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8EAE3] text-xs font-semibold text-[#4A5D4E] shadow-2xs">
              <FlaskConical className="w-3.5 h-3.5 text-[#4A5D4E]" />
              <span>Eduvora Frontier Research Hub • Tier-1 Research Academy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#2D3436] tracking-tight leading-tight">
              Pioneering Discoveries That Shape the Next Century
            </h1>
            <p className="text-base sm:text-lg text-[#2D3436]/80 leading-relaxed">
              From zero-carbon smart grids to predictive oncology machine learning and topological quantum devices, Eduvora operates at the leading edge of interdisciplinary science.
            </p>
          </div>

        </div>
      </section>

      {/* Live Research Impact Counters (4-column counter) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESEARCH_IMPACT_METRICS.map((metric) => (
            <div 
              key={metric.id}
              className="bg-white p-6 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">
                    {metric.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center">
                    {metric.id === 'grants' && <TrendingUp className="w-4 h-4" />}
                    {metric.id === 'publications' && <BookOpen className="w-4 h-4" />}
                    {metric.id === 'patents' && <ShieldCheck className="w-4 h-4" />}
                    {metric.id === 'incubation' && <Award className="w-4 h-4" />}
                  </div>
                </div>
                <div className="text-3xl font-bold font-heading text-[#4A5D4E] mt-2">
                  {metric.value}
                </div>
                <p className="text-xs text-[#2D3436]/70 mt-1">
                  {metric.subtitle}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8EAE3] flex items-center gap-1.5 text-[11px] font-bold text-[#4A5D4E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Research Centers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
              Specialized Institutes & Cleanrooms
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#2D3436] mt-1">
              Active Research Centers
            </h2>
            <p className="text-xs sm:text-sm text-[#2D3436]/70 mt-1">
              Four state-of-the-art research centers driving breakthrough discoveries, federal grants, and global industry partnerships.
            </p>
          </div>

          <button
            onClick={() => handleOpenBooking()}
            id="research-open-proposal-btn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4A5D4E] text-white text-xs font-bold hover:bg-[#3B4B3F] transition-all shadow-xs self-start md:self-auto active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Lab Access / Grant Request</span>
          </button>
        </div>

        {/* 4 Research Centers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESEARCH_CENTERS_DATA.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-3xl border border-[#E8EAE3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C382E]/90 via-[#2C382E]/30 to-transparent flex flex-col justify-between p-5 text-white">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4A5D4E] text-white self-start shadow-xs">
                      {center.department}
                    </span>

                    <div>
                      <span className="text-xs font-semibold text-[#E8EAE3] block">
                        Annual Grant Funding: {center.fundedGrants.split(' ')[0]}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-white mt-0.5 leading-snug">
                        {center.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Center Content Body */}
                <div className="p-6 space-y-4">
                  <p className="text-sm text-[#2D3436]/90 leading-relaxed">
                    {center.description}
                  </p>

                  {/* Focus Areas Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A7B3A2] block">
                      Core Strategic Thrusts:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {center.focusAreas.map((area, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-[#F4F1EA] text-[#4A5D4E] text-xs font-semibold">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Publications Strip */}
                  <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E8EAE3] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A5D4E] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Recent Highlighted Publication:</span>
                      </span>
                      <span className="text-[11px] font-semibold text-[#A7B3A2]">
                        {center.keyPublications[0]?.journal} ({center.keyPublications[0]?.year})
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#2D3436] line-clamp-1">
                      "{center.keyPublications[0]?.title}"
                    </p>
                  </div>

                  {/* Lead Info */}
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E8EAE3] text-xs">
                    <img
                      src={center.leadAvatar}
                      alt={center.lead}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E8EAE3]"
                    />
                    <div>
                      <span className="font-bold text-[#2D3436] block">{center.lead}</span>
                      <span className="text-[#2D3436]/70 text-[11px]">{center.leadRole}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-[#F4F1EA] border-t border-[#E8EAE3] flex items-center justify-between gap-3">
                <button
                  onClick={() => handleOpenBooking(center.id)}
                  className="text-xs font-bold text-[#4A5D4E] hover:underline"
                >
                  Book Lab Access
                </button>

                <button
                  onClick={() => handleOpenDrawer(center)}
                  id={`btn-view-projects-${center.id}`}
                  className="px-4 py-2 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <span>View Active Projects ({center.activeProjects.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Grant & Lab Booking Request Interactive Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        <div className="bg-white rounded-3xl border border-[#E8EAE3] p-6 sm:p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8EAE3]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4" />
                <span>Open Science Infrastructure</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#2D3436] mt-1">
                Grant Allocation & Lab Access Portal
              </h3>
              <p className="text-xs sm:text-sm text-[#2D3436]/70 mt-0.5">
                Reserve experimental instrument time, submit grant proposals, or track ongoing laboratory dockets.
              </p>
            </div>

            <button
              onClick={() => handleOpenBooking()}
              id="submit-proposal-banner-btn"
              className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 self-start md:self-auto active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Request Docket</span>
            </button>
          </div>

          {/* Table of Active Requests & Statuses */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                Recent Research Access Requests & Dockets ({labBookings.length})
              </h4>
              <span className="text-xs text-[#A7B3A2]">
                Updated live by Research Infrastructure Office
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F4F1EA] text-[#4A5D4E] font-bold border-b border-[#E8EAE3]">
                    <th className="py-3 px-4 rounded-l-xl">Reference ID</th>
                    <th className="py-3 px-4">Applicant & Affiliation</th>
                    <th className="py-3 px-4">Target Lab Facility</th>
                    <th className="py-3 px-4">Scheduled Window</th>
                    <th className="py-3 px-4">Proposal Focus</th>
                    <th className="py-3 px-4 rounded-r-xl text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8EAE3]">
                  {labBookings.map((req) => (
                    <tr key={req.id} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#4A5D4E]">
                        {req.id}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#2D3436] block">{req.applicantName}</span>
                        <span className="text-[11px] text-[#A7B3A2]">{req.department}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-[#2D3436]">
                        {req.facility}
                      </td>
                      <td className="py-3 px-4 text-[#2D3436]/80">
                        <span className="font-semibold block">{req.date}</span>
                        <span className="text-[11px] text-[#A7B3A2]">{req.timeSlot.split(' ')[0]}</span>
                      </td>
                      <td className="py-3 px-4 max-w-xs truncate text-[#2D3436]/90" title={req.proposalTitle}>
                        {req.proposalTitle}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          req.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                          req.status === 'Requires Clarification' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {req.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{req.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </section>

      {/* Incubation Hub & Seed Venture Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#4A5D4E] text-white rounded-3xl p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#E8EAE3] uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-white" />
                <span>Eduvora Venture Incubation Hub</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">
                From Laboratory Bench to Market Transformation
              </h3>
              <p className="text-sm text-[#E8EAE3]/90 leading-relaxed max-w-2xl">
                The Eduvora Seed Incubation Fund provides up to $250,000 in non-dilutive pre-seed grants, dedicated wet-lab suites, and executive mentorship for student and faculty spinout ventures.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2 text-xs">
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-[#E8EAE3]/80 block">Active Startups</span>
                  <strong className="text-xl font-bold text-white font-heading">48 Ventures</strong>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-[#E8EAE3]/80 block">Follow-On Capital</span>
                  <strong className="text-xl font-bold text-white font-heading">$18.5M Raised</strong>
                </div>
                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                  <span className="text-[#E8EAE3]/80 block">Patents Licensed</span>
                  <strong className="text-xl font-bold text-white font-heading">85+ Filings</strong>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4 text-center">
              <Sparkles className="w-8 h-8 text-white mx-auto" />
              <h4 className="text-base font-bold font-heading">
                Have an Invention or Spinout Concept?
              </h4>
              <p className="text-xs text-[#E8EAE3] leading-relaxed">
                Connect with the Eduvora Technology Transfer Office to audit patent eligibility and request seed capital.
              </p>
              <button
                onClick={() => handleOpenBooking()}
                className="w-full py-2.5 px-4 bg-white text-[#4A5D4E] hover:bg-[#FDFBF7] rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95"
              >
                Inquire for Incubation Support
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Drawers & Modals */}
      <ResearchProjectDrawer
        center={selectedCenter}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenBooking={(cId) => handleOpenBooking(cId)}
      />

      <LabBookingModal
        isOpen={isBookingModalOpen}
        initialCenterId={bookingTargetCenterId}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccessSubmission={handleNewBookingSubmission}
      />

    </div>
  );
};
