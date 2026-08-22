import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Compass, 
  Building2, 
  Mail, 
  ChevronRight, 
  Info,
  Maximize2
} from 'lucide-react';
import { CAMPUS_FACILITIES } from '../../data/mockAboutData';
import { CampusZone } from '../../types';

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampusTourModal: React.FC<CampusTourModalProps> = ({ isOpen, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<CampusZone>(CAMPUS_FACILITIES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Research', 'Academic', 'Innovation', 'Athletics', 'Student Life'];

  const filteredZones = filterCategory === 'All'
    ? CAMPUS_FACILITIES
    : CAMPUS_FACILITIES.filter(z => z.category === filterCategory);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#2C382E]/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#FDFBF7] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#E8EAE3] overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4F1EA] border-b border-[#E8EAE3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4A5D4E] uppercase tracking-wider block">
                  Interactive Campus Navigator
                </span>
                <h3 id="tour-modal-title" className="text-xl font-bold font-heading text-[#2D3436]">
                  180-Acre EcoSmart Campus & Facilities
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#A7B3A2] hover:text-[#4A5D4E] hover:bg-[#E8EAE3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-6 py-3 bg-white border-b border-[#E8EAE3] flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-[#4A5D4E] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Filter Zones:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'bg-[#F4F1EA] text-[#2D3436]/80 hover:bg-[#E8EAE3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main Layout: Split Zone Selector & Detail View */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
            
            {/* Left Column: Zone List */}
            <div className="lg:col-span-5 border-r border-[#E8EAE3] bg-[#FDFBF7] p-4 space-y-2.5 overflow-y-auto max-h-[60vh] lg:max-h-none">
              {filteredZones.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-white border-[#4A5D4E] shadow-sm ring-1 ring-[#4A5D4E]'
                        : 'bg-white/60 border-[#E8EAE3] hover:bg-white hover:border-[#A7B3A2]'
                    }`}
                  >
                    <img
                      src={zone.image}
                      alt={zone.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#E8EAE3]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#F4F1EA] text-[#4A5D4E]">
                          {zone.category}
                        </span>
                        <span className="text-[11px] font-medium text-[#A7B3A2]">
                          {zone.sqft}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2D3436] font-heading mt-1 truncate">
                        {zone.name}
                      </h4>
                      <p className="text-xs text-[#2D3436]/70 truncate mt-0.5">
                        {zone.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Zone Deep Dive */}
            <div className="lg:col-span-7 p-6 bg-white space-y-5 overflow-y-auto">
              
              {/* Photo Banner with Info Badges */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E8EAE3] shadow-sm">
                <img
                  src={selectedZone.image}
                  alt={selectedZone.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C382E]/90 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#4A5D4E] text-white">
                      {selectedZone.category} Zone
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
                      Est. {selectedZone.established}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold font-heading text-white mt-1.5">
                    {selectedZone.name}
                  </h4>
                  <p className="text-xs text-[#E8EAE3] mt-0.5">
                    {selectedZone.tagline}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Facility Overview</span>
                </h5>
                <p className="text-sm text-[#2D3436] leading-relaxed">
                  {selectedZone.description}
                </p>
              </div>

              {/* Key Features & Tech Capabilities */}
              <div className="space-y-3 bg-[#F4F1EA] p-4 rounded-2xl border border-[#E8EAE3]">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Key Infrastructure & Research Assets</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedZone.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#2D3436] bg-white p-2.5 rounded-xl border border-[#E8EAE3]">
                      <CheckCircle2 className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs & Contact Strip */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-[#FDFBF7] border border-[#E8EAE3] text-xs">
                <div className="flex items-center gap-2 text-[#4A5D4E] font-medium">
                  <MapPin className="w-4 h-4 text-[#4A5D4E] shrink-0" />
                  <span>Floor Area: <strong className="font-bold text-[#2D3436]">{selectedZone.sqft}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#2D3436]/80">
                  <Mail className="w-3.5 h-3.5 text-[#4A5D4E]" />
                  <span>Inquiries: <strong className="text-[#4A5D4E]">{selectedZone.leadContact}</strong></span>
                </div>
              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-[#F4F1EA] border-t border-[#E8EAE3] flex items-center justify-between">
            <span className="text-xs text-[#2D3436]/70">
              Campus visitors must register at Quad Welcome Center.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95"
            >
              <span>Close Tour</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
