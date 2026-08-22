import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Award, 
  Globe2, 
  ShieldCheck, 
  TrendingUp, 
  Compass, 
  Sparkles, 
  BookOpen, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Quote, 
  MapPin, 
  Calendar,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { 
  INSTITUTIONAL_OVERVIEW, 
  PILLARS_DATA, 
  ACCREDITATIONS_DATA, 
  HISTORICAL_MILESTONES, 
  LEADERSHIP_MESSAGES, 
  CAMPUS_FACILITIES 
} from '../data/mockAboutData';
import { DeanMessageModal } from '../components/about/DeanMessageModal';
import { CampusTourModal } from '../components/about/CampusTourModal';
import { LeadershipMessage } from '../types';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');
  const [selectedDean, setSelectedDean] = useState<LeadershipMessage | null>(null);
  const [isDeanModalOpen, setIsDeanModalOpen] = useState(false);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  const handleOpenDean = (dean: LeadershipMessage) => {
    setSelectedDean(dean);
    setIsDeanModalOpen(true);
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
            <span className="font-semibold text-[#2D3436]">About Eduvora</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8EAE3] text-xs font-semibold text-[#4A5D4E] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E]" />
              <span>Chartered 1998 • Global Tier-1 University</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#2D3436] tracking-tight leading-tight">
              Shaping Future Pioneers Through Rigor, Empathy & Ethical Discovery
            </h1>
            <p className="text-base sm:text-lg text-[#2D3436]/80 leading-relaxed">
              Eduvora University unites world-leading researchers, visionary students, and state-of-the-art facilities across 180 acres of sustainable, net-zero infrastructure.
            </p>
          </div>

        </div>
      </section>

      {/* Main Split Layout: Institutional Overview & Tabbed Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">Established</span>
            <div className="text-3xl font-bold font-heading text-[#4A5D4E] mt-1">{INSTITUTIONAL_OVERVIEW.foundedYear}</div>
            <span className="text-xs text-[#2D3436]/70 mt-1">28 Years of Research Excellence</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">Smart Campus</span>
            <div className="text-3xl font-bold font-heading text-[#4A5D4E] mt-1">{INSTITUTIONAL_OVERVIEW.campusSize.split(' ')[0]}</div>
            <span className="text-xs text-[#2D3436]/70 mt-1">180-Acre Net-Zero Facility</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">Student Body</span>
            <div className="text-3xl font-bold font-heading text-[#4A5D4E] mt-1">{INSTITUTIONAL_OVERVIEW.totalStudents}</div>
            <span className="text-xs text-[#2D3436]/70 mt-1">Scholars Across 45+ Countries</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2]">Faculty Ratio</span>
            <div className="text-3xl font-bold font-heading text-[#4A5D4E] mt-1">{INSTITUTIONAL_OVERVIEW.facultyStudentRatio}</div>
            <span className="text-xs text-[#2D3436]/70 mt-1">Intensive Mentorship Model</span>
          </div>
        </div>

        {/* Split Section: Institutional Narrative & Tabbed Mission/Vision/Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Overview Story & Quick Tour Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F1EA] text-xs font-bold text-[#4A5D4E] uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Institutional Charter</span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-[#2D3436]">
                A Living Laboratory for High-Impact Discovery
              </h2>
              <p className="text-sm text-[#2D3436]/80 leading-relaxed">
                {INSTITUTIONAL_OVERVIEW.description}
              </p>
              <p className="text-sm text-[#2D3436]/80 leading-relaxed">
                From pioneering algorithmic models to deploying climate-resilient energy microgrids, Eduvora bridges theoretical depth with scalable human benefit.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsTourModalOpen(true)}
                  id="about-campus-tour-btn"
                  className="flex-1 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white px-4 py-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98"
                >
                  <Compass className="w-4 h-4 text-[#E8EAE3]" />
                  <span>Explore 180-Acre Campus Map</span>
                </button>
                <button
                  onClick={() => navigate('/research')}
                  className="bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#4A5D4E] px-4 py-3 rounded-xl text-xs font-bold transition-colors border border-[#E8EAE3] text-center"
                >
                  Research Hub
                </button>
              </div>
            </div>

            {/* Quick Fast Facts Box */}
            <div className="bg-[#4A5D4E] text-white p-6 rounded-3xl shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#E8EAE3] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Eduvora at a Glance</span>
              </h3>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[#E8EAE3]/80 block">Alumni Network</span>
                  <strong className="text-base font-bold text-white font-heading">{INSTITUTIONAL_OVERVIEW.alumniNetwork}</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[#E8EAE3]/80 block">Retention Rate</span>
                  <strong className="text-base font-bold text-white font-heading">{INSTITUTIONAL_OVERVIEW.retentionRate}</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[#E8EAE3]/80 block">Endowment Pool</span>
                  <strong className="text-base font-bold text-white font-heading">{INSTITUTIONAL_OVERVIEW.endowment}</strong>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <span className="text-[#E8EAE3]/80 block">Global Placement</span>
                  <strong className="text-base font-bold text-white font-heading">96.4% in 6 Mos</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tabbed Interface for Mission, Vision & Core Values */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8EAE3] shadow-xs overflow-hidden">
            
            {/* Tabs Header */}
            <div className="grid grid-cols-3 bg-[#F4F1EA] border-b border-[#E8EAE3] p-1.5 gap-1.5">
              <button
                onClick={() => setActiveTab('mission')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
                  activeTab === 'mission'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#E8EAE3]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Mission</span>
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
                  activeTab === 'vision'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#E8EAE3]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Vision</span>
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 ${
                  activeTab === 'values'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/80 hover:bg-[#E8EAE3]'
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Core Values</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 sm:p-8">
              {activeTab === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                      {PILLARS_DATA.mission.title}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-[#2D3436]">
                      {PILLARS_DATA.mission.subtitle}
                    </h3>
                  </div>
                  <p className="text-sm text-[#2D3436]/90 leading-relaxed">
                    {PILLARS_DATA.mission.content}
                  </p>
                  
                  <div className="space-y-2.5 pt-3 border-t border-[#E8EAE3]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block">
                      Strategic Commitments:
                    </span>
                    {PILLARS_DATA.mission.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2D3436]">
                        <CheckCircle2 className="w-4 h-4 text-[#4A5D4E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                      {PILLARS_DATA.vision.title}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-[#2D3436]">
                      {PILLARS_DATA.vision.subtitle}
                    </h3>
                  </div>
                  <p className="text-sm text-[#2D3436]/90 leading-relaxed">
                    {PILLARS_DATA.vision.content}
                  </p>
                  
                  <div className="space-y-2.5 pt-3 border-t border-[#E8EAE3]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A7B3A2] block">
                      2030 Global Benchmarks:
                    </span>
                    {PILLARS_DATA.vision.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#2D3436]">
                        <Sparkles className="w-4 h-4 text-[#4A5D4E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'values' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {PILLARS_DATA.values.map((val, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8EAE3] space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#2D3436] font-heading">{val.title}</h4>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F4F1EA] text-[#4A5D4E]">
                          {val.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#2D3436]/80 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* Accreditation & Milestone Strip (Grid showcasing Tier-1 NAAC 'A++', NIRF, ABET, AACSB) */}
      <section className="bg-[#F4F1EA] border-y border-[#E8EAE3] py-14 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
              Tier-1 Quality Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#2D3436]">
              Global Accreditations & Benchmark Rankings
            </h2>
            <p className="text-xs sm:text-sm text-[#2D3436]/70">
              Eduvora maintains rigorous compliance with the highest national and international educational rating authorities.
            </p>
          </div>

          {/* Accreditation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ACCREDITATIONS_DATA.map((acc, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E8EAE3] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-2xs font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F4F1EA] text-[#4A5D4E]">
                      {acc.issuedYear}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-[#4A5D4E] uppercase tracking-wider block">
                      {acc.code}
                    </span>
                    <h3 className="text-base font-bold font-heading text-[#2D3436] mt-0.5">
                      {acc.grade}
                    </h3>
                  </div>

                  <p className="text-xs text-[#2D3436]/80 leading-relaxed">
                    {acc.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8EAE3] text-[11px] font-semibold text-[#A7B3A2]">
                  {acc.title}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Leadership & Dean Messages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
              Faculty Leadership & Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#2D3436] mt-1">
              Deans & Academic Chairs
            </h2>
            <p className="text-xs sm:text-sm text-[#2D3436]/70 mt-1">
              Distinguished faculty leaders steering curriculum innovation, grant programs, and research mentorship.
            </p>
          </div>

          <button
            onClick={() => setIsTourModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8EAE3] text-xs font-bold text-[#4A5D4E] hover:bg-[#F4F1EA] transition-colors self-start md:self-auto"
          >
            <Compass className="w-4 h-4" />
            <span>View Campus Facility Map</span>
          </button>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEADERSHIP_MESSAGES.map((dean) => (
            <div
              key={dean.id}
              className="bg-white rounded-2xl border border-[#E8EAE3] p-5 shadow-xs flex flex-col justify-between hover:border-[#4A5D4E] transition-all group"
            >
              <div className="space-y-3.5">
                <div className="relative">
                  <img
                    src={dean.avatar}
                    alt={dean.name}
                    className="w-full h-48 object-cover rounded-xl border border-[#E8EAE3]"
                  />
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#2C382E]/80 backdrop-blur-xs text-white text-[11px] font-semibold">
                    {dean.department.split('&')[0]}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-heading text-[#2D3436] group-hover:text-[#4A5D4E] transition-colors">
                    {dean.name}
                  </h3>
                  <p className="text-xs font-medium text-[#4A5D4E] mt-0.5">
                    {dean.role}
                  </p>
                </div>

                <p className="text-xs text-[#2D3436]/80 italic line-clamp-2">
                  "{dean.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8EAE3]">
                <button
                  onClick={() => handleOpenDean(dean)}
                  className="w-full py-2 px-3 rounded-xl bg-[#F4F1EA] hover:bg-[#4A5D4E] text-[#4A5D4E] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Quote className="w-3.5 h-3.5" />
                  <span>Read Dean's Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Historical Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl border border-[#E8EAE3] p-6 sm:p-10 shadow-xs">
          
          <div className="max-w-2xl mb-8 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
              Evolution of Eduvora
            </span>
            <h2 className="text-2xl font-bold font-heading text-[#2D3436]">
              Milestones on the Path to Global Distinction
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {HISTORICAL_MILESTONES.map((milestone, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8EAE3] space-y-2 relative">
                <div className="w-8 h-8 rounded-lg bg-[#4A5D4E] text-white font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </div>
                <div className="text-lg font-bold font-heading text-[#4A5D4E]">
                  {milestone.year}
                </div>
                <h3 className="text-xs font-bold text-[#2D3436]">
                  {milestone.title}
                </h3>
                <p className="text-[11px] text-[#2D3436]/70 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4A5D4E] rounded-3xl p-8 sm:p-10 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E8EAE3]">
              Join the Eduvora Legacy
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              Ready to Shape the Next Epoch of Discovery?
            </h3>
            <p className="text-sm text-[#E8EAE3]/90 max-w-xl">
              Applications for Fall 2026 are now open across undergraduate, graduate, and doctoral fellowships with merit aid opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/admissions')}
              className="px-6 py-3 bg-white text-[#4A5D4E] hover:bg-[#FDFBF7] rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/research')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              Explore Research Labs
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Modals */}
      <DeanMessageModal
        dean={selectedDean}
        isOpen={isDeanModalOpen}
        onClose={() => setIsDeanModalOpen(false)}
      />

      <CampusTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

    </div>
  );
};
