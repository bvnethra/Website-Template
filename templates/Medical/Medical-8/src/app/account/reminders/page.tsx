'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Plus, Trash2, Calendar, Pill, AlertCircle, ChevronLeft } from 'lucide-react';

interface Reminder {
  id: string;
  medicineName: string;
  dosage: string;
  schedule: string;
  refillDate: string;
  daysLeft: number;
}

const mockReminders: Reminder[] = [
  { id: 'rem-1', medicineName: 'MediNova Vitamin D3 1000 IU', dosage: '1 Tablet', schedule: 'Once daily after breakfast', refillDate: 'Sept 15, 2026', daysLeft: 18 },
  { id: 'rem-2', medicineName: 'NovaRelief Paracetamol 500mg', dosage: '1-2 Tablets', schedule: 'As needed for fever', refillDate: 'Sept 20, 2026', daysLeft: 23 },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form states
  const [medName, setMedName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule, setSchedule] = useState('');
  const [days, setDays] = useState('30');

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medName || !dosage) return;

    const daysCount = parseInt(days) || 30;
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysCount);
    
    const formattedDate = futureDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newReminder = {
      id: `rem-${Date.now()}`,
      medicineName: medName,
      dosage,
      schedule,
      refillDate: formattedDate,
      daysLeft: daysCount,
    };

    setReminders([...reminders, newReminder]);
    setShowAddForm(false);
    
    // Reset fields
    setMedName('');
    setDosage('');
    setSchedule('');
    setDays('30');
  };

  const handleRemoveReminder = (id: string) => {
    setReminders(reminders.filter((rem) => rem.id !== id));
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-4xl">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-500 hover:text-mint-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List of Reminders (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-navy-900">
                    Medicine Refill Reminders
                  </h1>
                  <p className="text-xs text-navy-500 mt-0.5">
                    We will send SMS notifications when it is time to order again.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="h-9 px-4 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Reminder</span>
                </button>
              </div>

              {/* Reminders List */}
              <div className="space-y-4">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-4 rounded-2xl border border-brand-border flex items-start justify-between gap-4 bg-brand-bg"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="w-9 h-9 rounded-xl bg-mint-50 text-mint-600 flex items-center justify-center shrink-0 border border-mint-500/10">
                        <Pill className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-navy-900">{rem.medicineName}</h4>
                        <p className="text-xs text-navy-500 mt-0.5">Dosage: {rem.dosage} · {rem.schedule}</p>
                        
                        <div className="flex items-center gap-1 mt-2.5 text-[10px] font-bold text-mint-700">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Estimated Refill Date: {rem.refillDate} ({rem.daysLeft} days left)</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveReminder(rem.id)}
                      className="p-1.5 text-navy-400 hover:text-error-500 transition-colors"
                      aria-label="Remove reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {reminders.length === 0 && (
                  <div className="text-center py-12 text-navy-400">
                    <Bell className="w-10 h-10 mx-auto mb-2 text-navy-300" />
                    <p className="text-xs">No active reminders configured yet.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Add Reminder Form panel (lg:col-span-4) */}
          {showAddForm && (
            <div className="lg:col-span-4 bg-white border border-brand-border rounded-3xl p-5 shadow-sm animate-fade-in text-left">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-mint-500" />
                Add Medicine Reminder
              </h3>
              
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Medicine Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vitamin D3"
                    value={medName}
                    onChange={(e) => setMedName(e.target.value)}
                    className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Dosage</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 Tablet"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Schedule</label>
                  <input
                    type="text"
                    placeholder="e.g. Daily after lunch"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Refill Frequency (Days)</label>
                  <select
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full h-10 px-2 border border-brand-border bg-white rounded-lg text-xs outline-none"
                  >
                    <option value="15">Every 15 Days</option>
                    <option value="30">Every 30 Days (1 Month)</option>
                    <option value="60">Every 60 Days (2 Months)</option>
                    <option value="90">Every 90 Days (3 Months)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Save Reminder
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
