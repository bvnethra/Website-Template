import React, { useState } from 'react';
import { ShieldAlert, Heart, CheckCircle2, Plus, Trash2, Clock, Calculator } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../context/ToastContext';

export const HealthTools: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'bmi' | 'bp' | 'meds' | 'checklist'>('bmi');

  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  const bmi = weightKg / Math.pow(heightCm / 100, 2);

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { category: 'Underweight', color: 'text-amber-500', bg: 'bg-amber-50' };
    if (val < 24.9) return { category: 'Healthy Weight', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (val < 29.9) return { category: 'Overweight', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { category: 'Obesity', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const bmiRes = getBmiCategory(bmi);

  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);

  const getBpCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return { title: 'Normal Blood Pressure', color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'Your blood pressure reading is in the ideal healthy range.' };
    if (sys <= 129 && dia < 80) return { title: 'Elevated Blood Pressure', color: 'text-amber-600', bg: 'bg-amber-50', desc: 'Your systolic blood pressure is slightly elevated. Lifestyle modifications recommended.' };
    if (sys <= 139 || dia <= 89) return { title: 'Hypertension Stage 1', color: 'text-amber-700', bg: 'bg-amber-100', desc: 'Consult your doctor for cardiovascular evaluation and blood pressure tracking.' };
    return { title: 'Hypertension Stage 2', color: 'text-red-600', bg: 'bg-red-50', desc: 'High blood pressure stage. Please consult a physician promptly.' };
  };

  const bpRes = getBpCategory(systolic, diastolic);

  const [meds, setMeds] = useState([
    { id: '1', name: 'Multivitamin', time: '08:00 AM', taken: true },
    { id: '2', name: 'Omega-3 Fish Oil', time: '01:00 PM', taken: false }
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedTime, setNewMedTime] = useState('09:00 AM');

  const addMed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim()) return;
    setMeds(prev => [...prev, { id: Date.now().toString(), name: newMedName, time: newMedTime, taken: false }]);
    setNewMedName('');
    showToast('Reminder Added', `Scheduled ${newMedName} for ${newMedTime}.`, 'success');
  };

  const toggleMed = (id: string) => {
    setMeds(prev => prev.map(m => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  const deleteMed = (id: string) => {
    setMeds(prev => prev.filter(m => m.id !== id));
  };

  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Annual Executive Health Physical', done: true },
    { id: 'c2', label: 'Complete Lipid & Cholesterol Panel', done: true },
    { id: 'c3', label: 'Dermatology Full-Body Skin Exam', done: false },
    { id: 'c4', label: 'Ophthalmology Vision Check', done: false },
    { id: 'c5', label: 'Dental Hygiene & Cleaning', done: true }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(c => (c.id === id ? { ...c, done: !c.done } : c)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl space-y-3">
          <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
            Interactive Digital Wellness
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Interactive Health Tools</h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Monitor your Body Mass Index (BMI), classify blood pressure readings, set medication reminders, and track annual health screenings.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs font-medium">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Medical Disclaimer:</strong> These interactive digital tools are provided for informational and wellness tracking purposes only and do not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider regarding a medical condition.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'bmi', label: 'BMI Calculator', icon: Calculator },
          { id: 'bp', label: 'Blood Pressure Guide', icon: Heart },
          { id: 'meds', label: 'Medication Reminders', icon: Clock },
          { id: 'checklist', label: 'Screening Checklist', icon: CheckCircle2 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-soft'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'bmi' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Body Mass Index (BMI) Calculator</h2>

            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Weight (kg)</span>
                  <span className="text-primary">{weightKg} kg</span>
                </label>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Height (cm)</span>
                  <span className="text-primary">{heightCm} cm</span>
                </label>
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={heightCm}
                  onChange={e => setHeightCm(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border border-slate-200 text-center space-y-4 ${bmiRes.bg}`}>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Calculated BMI</p>
            <p className="text-5xl sm:text-6xl font-extrabold text-slate-900">{bmi.toFixed(1)}</p>
            <Badge variant="primary" size="md" className={`mx-auto ${bmiRes.color}`}>
              Category: {bmiRes.category}
            </Badge>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Healthy adult BMI range is generally considered 18.5 – 24.9.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'bp' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Blood Pressure Classifier</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Systolic Pressure (mmHg)</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={e => setSystolic(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Diastolic Pressure (mmHg)</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={e => setDiastolic(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold"
                />
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border border-slate-200 text-center space-y-4 ${bpRes.bg}`}>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Reading</p>
            <p className="text-4xl font-extrabold text-slate-900">{systolic} / {diastolic} <span className="text-xs font-normal text-slate-500">mmHg</span></p>
            <Badge variant="primary" size="md" className={`mx-auto ${bpRes.color}`}>
              {bpRes.title}
            </Badge>
            <p className="text-xs text-slate-600">{bpRes.desc}</p>
          </div>
        </div>
      )}

      {activeTab === 'meds' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Daily Medication Reminder Tracker</h2>

          <form onSubmit={addMed} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Medication name (e.g. Lisinopril 10mg)..."
              value={newMedName}
              onChange={e => setNewMedName(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none"
            />
            <input
              type="text"
              value={newMedTime}
              onChange={e => setNewMedTime(e.target.value)}
              placeholder="Time (e.g. 08:00 AM)"
              className="w-36 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              Add Reminder
            </Button>
          </form>

          <div className="space-y-2 pt-2">
            {meds.map(m => (
              <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={m.taken}
                    onChange={() => toggleMed(m.id)}
                    className="w-5 h-5 rounded text-primary accent-primary cursor-pointer"
                  />
                  <div>
                    <p className={`font-bold text-sm ${m.taken ? 'line-through text-slate-400' : 'text-slate-900'}`}>{m.name}</p>
                    <p className="text-xs text-slate-500">Scheduled: {m.time}</p>
                  </div>
                </div>

                <button onClick={() => deleteMed(m.id)} className="text-slate-400 hover:text-red-500 p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Annual Health Screening Checklist</h2>
          <div className="space-y-3">
            {checklist.map(c => (
              <label key={c.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={c.done}
                  onChange={() => toggleCheck(c.id)}
                  className="w-5 h-5 rounded text-emerald-500 accent-emerald-500"
                />
                <span className={`font-semibold text-sm ${c.done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
