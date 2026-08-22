import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  Award, 
  DollarSign, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  Percent
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ScholarshipCalculatorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [gpa, setGpa] = useState<number>(3.85);
  const [degreeLevel, setDegreeLevel] = useState<'Undergraduate' | 'Postgraduate' | 'Doctorate'>('Postgraduate');
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [hasLeadership, setHasLeadership] = useState<boolean>(true);
  const [hasResearch, setHasResearch] = useState<boolean>(false);

  const { setSelectedCourseForApply, addToast } = useApp();
  const navigate = useNavigate();

  // Dynamic calculation logic
  const calculation = useMemo(() => {
    let baseAmount = 0;
    let tierName = 'Standard Merit Consideration';
    let percentageCovered = 0;

    if (degreeLevel === 'Doctorate') {
      return {
        amount: 38000,
        tierName: 'Full Fellowship + $3,800/mo Research Stipend',
        percentageCovered: 100,
        isFullyFunded: true,
        renewable: 'Renewable for 4-5 years',
      };
    }

    if (gpa >= 3.9) {
      baseAmount = degreeLevel === 'Undergraduate' ? 16000 : 18000;
      tierName = 'Presidential Global Scholar Fellowship';
      percentageCovered = 70;
    } else if (gpa >= 3.7) {
      baseAmount = degreeLevel === 'Undergraduate' ? 12000 : 15000;
      tierName = 'Dean’s Academic Excellence Award';
      percentageCovered = 55;
    } else if (gpa >= 3.4) {
      baseAmount = degreeLevel === 'Undergraduate' ? 8000 : 10000;
      tierName = 'Eduvora Merit Achievement Grant';
      percentageCovered = 35;
    } else if (gpa >= 3.0) {
      baseAmount = degreeLevel === 'Undergraduate' ? 5000 : 6000;
      tierName = 'University Access & Potential Scholarship';
      percentageCovered = 20;
    } else {
      baseAmount = 2500;
      tierName = 'Opportunity Entrance Grant';
      percentageCovered = 10;
    }

    if (hasLeadership) baseAmount += 1500;
    if (hasResearch) baseAmount += 2000;
    if (isInternational) baseAmount += 1000;

    return {
      amount: baseAmount,
      tierName,
      percentageCovered: Math.min(90, percentageCovered + (hasLeadership ? 5 : 0) + (hasResearch ? 8 : 0)),
      isFullyFunded: false,
      renewable: 'Renewable annually based on 3.2+ GPA',
    };
  }, [gpa, degreeLevel, isInternational, hasLeadership, hasResearch]);

  if (!isOpen) return null;

  const handleApplyWithScholarship = () => {
    onClose();
    addToast({
      type: 'success',
      title: 'Estimate Applied',
      message: `Estimated $${calculation.amount.toLocaleString()} scholarship applied to your application form.`,
    });
    navigate('/admissions?step=1&gpa=' + gpa);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-[#FDFBF7] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E8EAE3] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4F1EA] border-b border-[#E8EAE3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-[#4A5D4E]">
                  Merit Scholarship & Aid Estimator
                </h3>
                <p className="text-xs text-[#2D3436]/70">
                  Interactive financial projection based on Eduvora 2026 Academic Criteria
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#A7B3A2] hover:text-[#4A5D4E] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Calculator Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Top Result Card */}
            <div className="p-6 rounded-2xl bg-[#4A5D4E] text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#E8EAE3] uppercase tracking-wider block">
                    Estimated Merit-Based Aid Amount
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-black font-heading tracking-tight text-white">
                      ${calculation.amount.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-[#E8EAE3]">/ Academic Year</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#3B4B3F] text-white border border-[#E8EAE3]/30">
                      {calculation.tierName}
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 text-right md:min-w-[170px]">
                  <span className="text-xs text-[#E8EAE3] block">Approx. Tuition Offset</span>
                  <span className="text-2xl font-bold text-white font-heading mt-0.5 block">
                    ~{calculation.percentageCovered}%
                  </span>
                  <span className="text-[11px] text-[#E8EAE3]/80 block mt-1">
                    {calculation.renewable}
                  </span>
                </div>
              </div>
            </div>

            {/* Inputs Section */}
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E8EAE3]">
              
              {/* GPA Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#4A5D4E] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#4A5D4E]" />
                    <span>Grade Point Average (GPA / 4.0 Scale)</span>
                  </label>
                  <span className="px-3 py-1 bg-[#F4F1EA] border border-[#E8EAE3] rounded-lg text-base font-bold text-[#4A5D4E] font-heading">
                    {gpa.toFixed(2)}
                  </span>
                </div>
                
                <input
                  type="range"
                  min="2.5"
                  max="4.0"
                  step="0.05"
                  value={gpa}
                  onChange={(e) => setGpa(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-[#F4F1EA] rounded-lg appearance-none cursor-pointer accent-[#4A5D4E]"
                />
                
                <div className="flex justify-between text-[11px] font-medium text-[#2D3436]/70">
                  <span>2.50 (Base)</span>
                  <span>3.00 (Good)</span>
                  <span>3.50 (Honors)</span>
                  <span>3.85 (High Distinction)</span>
                  <span>4.00 (Perfect)</span>
                </div>
              </div>

              {/* Degree Level Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
                  Target Academic Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Undergraduate', 'Postgraduate', 'Doctorate'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDegreeLevel(level)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                        degreeLevel === level
                          ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-xs'
                          : 'bg-[#FDFBF7] text-[#2D3436] border-[#E8EAE3] hover:bg-[#F4F1EA]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonus Criteria Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-[#E8EAE3]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] block">
                  Additional Distinction Boosters
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] cursor-pointer hover:bg-[#F4F1EA] transition-colors">
                    <input
                      type="checkbox"
                      checked={hasLeadership}
                      onChange={(e) => setHasLeadership(e.target.checked)}
                      className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                    />
                    <span className="text-xs font-semibold text-[#2D3436]">
                      Leadership / Community
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] cursor-pointer hover:bg-[#F4F1EA] transition-colors">
                    <input
                      type="checkbox"
                      checked={hasResearch}
                      onChange={(e) => setHasResearch(e.target.checked)}
                      className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                    />
                    <span className="text-xs font-semibold text-[#2D3436]">
                      Research Publication
                    </span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] cursor-pointer hover:bg-[#F4F1EA] transition-colors">
                    <input
                      type="checkbox"
                      checked={isInternational}
                      onChange={(e) => setIsInternational(e.target.checked)}
                      className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                    />
                    <span className="text-xs font-semibold text-[#2D3436]">
                      International Scholar
                    </span>
                  </label>
                </div>
              </div>

            </div>

          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-[#F4F1EA] border-t border-[#E8EAE3] flex items-center justify-between">
            <span className="text-xs text-[#2D3436]/70">
              Official grant verified upon document submission.
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-[#2D3436]/70 hover:text-[#4A5D4E] rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleApplyWithScholarship}
                className="px-5 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Proceed to Application</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
