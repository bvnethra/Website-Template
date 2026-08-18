import React, { useState } from 'react';
import { HOSPITAL_INFO } from '../data/mockData';
import {
  PhoneCall,
  AlertTriangle,
  Ambulance,
  HeartPulse,
  Clock,
  MapPin,
  ShieldAlert,
  Navigation,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface EmergencySectionProps {
  onOpenDirectionsModal?: () => void;
}

export const EmergencySection: React.FC<EmergencySectionProps> = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [showDirections, setShowDirections] = useState(false);

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  return (
    <section
      id="emergency-section"
      className="py-16 lg:py-24 bg-gradient-to-b from-[#0B1528] via-[#15213D] to-[#0B1528] text-white relative overflow-hidden"
    >
      {/* Red Alert Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-600/20">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
                  Level-1 Trauma Center Active
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                24/7 Emergency & Acute Care
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-xs text-slate-300">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Average Triage Time: <strong className="text-white">&lt; 6 mins</strong></span>
          </div>
        </div>

        {/* Emergency Hotline Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Main 911 Call Card */}
          <div className="bg-gradient-to-br from-rose-600 to-red-700 rounded-3xl p-6 sm:p-7 shadow-2xl text-white flex flex-col justify-between border border-rose-400/30 group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
                  Life Threatening Emergency
                </span>
                <PhoneCall className="w-5 h-5 text-white/80 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-xl font-extrabold mb-1">Call Regional 911</h3>
              <p className="text-xs text-rose-100 leading-relaxed mb-6">
                For severe chest pain, sudden stroke symptoms, severe breathing distress, or acute physical trauma.
              </p>
            </div>

            <a
              id="call-911-emergency-btn"
              href="tel:911"
              className="w-full py-3.5 bg-white text-rose-700 font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:bg-rose-50 transition-colors cursor-pointer active:scale-95"
            >
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <span>Call 911 Immediately</span>
            </a>
          </div>

          {/* NovaCare Hospital ER Direct Hotline */}
          <div className="bg-white/10 rounded-3xl p-6 sm:p-7 border border-white/15 backdrop-blur-sm flex flex-col justify-between hover:bg-white/15 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full">
                  NovaCare ER Desk
                </span>
                <Ambulance className="w-5 h-5 text-[#28B8D4]" />
              </div>
              <h3 className="text-xl font-extrabold mb-1">Hospital Emergency Hotline</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Direct contact to the on-duty emergency physician and acute intake team at NovaCare Metro.
              </p>
            </div>

            <div className="space-y-2">
              <a
                id="call-er-direct-btn"
                href={`tel:${HOSPITAL_INFO.emergencyPhone}`}
                className="w-full py-3.5 bg-[#3157D5] hover:bg-[#2443AE] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call {HOSPITAL_INFO.emergencyPhone}</span>
              </a>
            </div>
          </div>

          {/* Nurse Helpline & Poison Control Card */}
          <div className="bg-white/10 rounded-3xl p-6 sm:p-7 border border-white/15 backdrop-blur-sm flex flex-col justify-between hover:bg-white/15 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Triage & Helplines
                </span>
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-extrabold mb-1">24/7 Clinical Helplines</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Free confidential guidance from registered triage nurses and toxicologists.
              </p>
            </div>

            <div className="space-y-2.5">
              <a
                id="call-nurse-helpline-btn"
                href={`tel:${HOSPITAL_INFO.nurseHelpline}`}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center justify-between transition-colors border border-white/10"
              >
                <span>Nurse 24/7 Helpline:</span>
                <strong className="text-emerald-300">{HOSPITAL_INFO.nurseHelpline}</strong>
              </a>

              <a
                id="call-poison-control-btn"
                href={`tel:${HOSPITAL_INFO.poisonControl}`}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl flex items-center justify-between transition-colors border border-white/10"
              >
                <span>Poison Control Hotline:</span>
                <strong className="text-amber-300">{HOSPITAL_INFO.poisonControl}</strong>
              </a>
            </div>
          </div>

        </div>

        {/* ER Location & Walk-In Guidelines */}
        <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#28B8D4] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Walk-In ER Bay & Helipad Location</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              NovaCare Emergency Entrance: Gate 4 (Red Canopy)
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              {HOSPITAL_INFO.mainAddress}. Open 24 hours every day without prior appointment. Free immediate valet ambulance triage parking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="view-er-directions-btn"
              onClick={() => setShowDirections(!showDirections)}
              className="px-5 py-3 rounded-xl bg-white text-[#15213D] font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Navigation className="w-4 h-4 text-[#3157D5]" />
              <span>{showDirections ? 'Hide Directions' : 'Get ER Directions'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Directions Panel */}
        {showDirections && (
          <div className="mt-4 p-5 rounded-2xl bg-white text-[#15213D] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-[#15213D]">NovaCare Emergency Room Navigation</h4>
                <p className="text-xs text-[#667085]">Follow the prominent Red Emergency Canopies off Healthcare Boulevard.</p>
              </div>
              <button
                onClick={() => setShowDirections(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#F6F8FC] rounded-xl border border-[#E4E9F2]">
                <strong className="block text-[#3157D5] mb-1">From North / Highway 101</strong>
                <p className="text-[#667085]">Take Exit 42B onto Metro Pkwy. Turn right on Healthcare Blvd. Gate 4 on the right.</p>
              </div>
              <div className="p-3 bg-[#F6F8FC] rounded-xl border border-[#E4E9F2]">
                <strong className="block text-[#3157D5] mb-1">From Downtown / South</strong>
                <p className="text-[#667085]">Proceed north on 7th Ave into Medical Center District. Follow Red ER signs directly to ambulance bay.</p>
              </div>
              <div className="p-3 bg-[#F6F8FC] rounded-xl border border-[#E4E9F2]">
                <strong className="block text-[#3157D5] mb-1">Public Transit & Paratransit</strong>
                <p className="text-[#667085]">Metro Line 14 stops directly in front of the NovaCare Clinical Pavilion entrance.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
