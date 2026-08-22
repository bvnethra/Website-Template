import React, { useState, useMemo } from 'react';
import { X, Calculator, DollarSign, Sparkles, ShieldCheck, CheckCircle, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TuitionCalculatorModal: React.FC = () => {
  const { isTuitionCalcOpen, closeTuitionCalc, theme, openApplyModal } = useTheme();

  const [residency, setResidency] = useState<'in-state' | 'out-of-state' | 'international'>('out-of-state');
  const [housing, setHousing] = useState<'on-campus' | 'off-campus' | 'commuter'>('on-campus');
  const [mealPlan, setMealPlan] = useState<'full' | 'moderate' | 'none'>('full');
  const [income, setIncome] = useState<number>(75000);
  const [gpa, setGpa] = useState<number>(3.85);

  const calculations = useMemo(() => {
    // Base tuition
    let baseTuition = 48500;
    if (residency === 'in-state') baseTuition = 28000;
    if (residency === 'international') baseTuition = 52000;

    // Room & Board
    let roomCost = 12500;
    if (housing === 'off-campus') roomCost = 14200;
    if (housing === 'commuter') roomCost = 0;

    let mealCost = 6800;
    if (mealPlan === 'moderate') mealCost = 4500;
    if (mealPlan === 'none') mealCost = 1500;
    if (housing === 'commuter') mealCost = 1200;

    const booksAndTech = 2200;
    const totalStickerPrice = baseTuition + roomCost + mealCost + booksAndTech;

    // Need-based Grant Calculation (100% need met for under $85k = 100% tuition coverage)
    let needGrant = 0;
    if (income <= 85000) {
      needGrant = baseTuition + roomCost * 0.85;
    } else if (income <= 130000) {
      needGrant = baseTuition * 0.65;
    } else if (income <= 180000) {
      needGrant = baseTuition * 0.35;
    } else {
      needGrant = 5000;
    }

    // Merit Scholarship Calculation based on GPA
    let meritScholarship = 0;
    if (gpa >= 3.9) {
      meritScholarship = 15000;
    } else if (gpa >= 3.7) {
      meritScholarship = 10000;
    } else if (gpa >= 3.5) {
      meritScholarship = 5000;
    }

    const totalAid = Math.min(totalStickerPrice, needGrant + meritScholarship);
    const netCost = Math.max(0, totalStickerPrice - totalAid);
    const monthlyCost = Math.round(netCost / 10);

    return {
      baseTuition,
      roomCost,
      mealCost,
      booksAndTech,
      totalStickerPrice,
      needGrant,
      meritScholarship,
      totalAid,
      netCost,
      monthlyCost,
    };
  }, [residency, housing, mealPlan, income, gpa]);

  if (!isTuitionCalcOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ backgroundColor: theme.primary }} className="p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center text-amber-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Transparency & Financial Aid
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                Undergraduate Net Price & Aid Calculator
              </h3>
            </div>
          </div>
          <button onClick={closeTuitionCalc} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            {/* Residency */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Residency Status</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'in-state', label: 'In-State (MA)' },
                  { id: 'out-of-state', label: 'Out-of-State' },
                  { id: 'international', label: 'International' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setResidency(item.id as any)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                      residency === item.id
                        ? 'border-amber-700 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Housing & Dining */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Living Arrangement</label>
                <select
                  value={housing}
                  onChange={(e) => setHousing(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="on-campus">Residential College (On-Campus)</option>
                  <option value="off-campus">Off-Campus Cambridge Apartment</option>
                  <option value="commuter">Commuting from Home</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Dining Plan</label>
                <select
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                >
                  <option value="full">Unlimited Dining Hall Plan</option>
                  <option value="moderate">14 Meals/Week Plan</option>
                  <option value="none">Self-Cook / Flex Dollars</option>
                </select>
              </div>
            </div>

            {/* Family Household Income Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Estimated Annual Household Income</label>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  ${income.toLocaleString()} / year
                </span>
              </div>
              <input
                type="range"
                min={30000}
                max={250000}
                step={5000}
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-amber-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$30k (100% Free)</span>
                <span>$85k (Pledge Cap)</span>
                <span>$150k</span>
                <span>$250k+</span>
              </div>
            </div>

            {/* GPA Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">High School Unweighted GPA</label>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {gpa.toFixed(2)} GPA
                </span>
              </div>
              <input
                type="range"
                min={3.0}
                max={4.0}
                step={0.05}
                value={gpa}
                onChange={(e) => setGpa(Number(e.target.value))}
                className="w-full accent-amber-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>3.0</span>
                <span>3.5 ($5k Merit)</span>
                <span>3.7 ($10k Merit)</span>
                <span>3.9+ ($15k Merit)</span>
              </div>
            </div>

            {/* Pledge note */}
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Edunexa 100% Need-Met Pledge:</strong> Families earning under $85,000 receive a 100% tuition-free education with zero student loans required.
              </span>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
                Estimated Annual Costs
              </h4>

              <div className="space-y-2 pt-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Tuition & Fees:</span>
                  <span className="font-mono font-semibold">${calculations.baseTuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Room & Housing:</span>
                  <span className="font-mono font-semibold">${calculations.roomCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Dining Plan:</span>
                  <span className="font-mono font-semibold">${calculations.mealCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Books & Technology:</span>
                  <span className="font-mono font-semibold">${calculations.booksAndTech.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Sticker Price:</span>
                  <span className="font-mono">${calculations.totalStickerPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Financial Aid Subtractions */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300 space-y-2 text-xs">
                <h5 className="font-bold text-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Estimated Scholarships & Grants:
                </h5>
                <div className="flex justify-between text-emerald-700">
                  <span>Need-Based Horizon Grant:</span>
                  <span className="font-mono font-bold">-${calculations.needGrant.toLocaleString()}</span>
                </div>
                {calculations.meritScholarship > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Merit Honors Scholarship:</span>
                    <span className="font-mono font-bold">-${calculations.meritScholarship.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Net Cost Box */}
            <div className="p-4 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Net Out-of-Pocket:
              </span>
              <div className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
                ${calculations.netCost.toLocaleString()}{' '}
                <span className="text-xs font-sans font-normal text-slate-500">/ academic year</span>
              </div>
              <span className="text-xs font-semibold text-amber-800 block">
                ≈ ${calculations.monthlyCost.toLocaleString()} / month (10-month plan)
              </span>
            </div>

            <button
              onClick={() => {
                closeTuitionCalc();
                openApplyModal();
              }}
              style={{ backgroundColor: theme.primary }}
              className="w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Apply with Financial Aid</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
