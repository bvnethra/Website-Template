'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Plus, Trash2, Calendar, ShieldCheck, Download, AlertCircle, ChevronLeft } from 'lucide-react';

interface Record {
  id: string;
  title: string;
  category: 'prescription' | 'lab_report' | 'other';
  date: string;
  fileName: string;
}

const initialRecords: Record[] = [
  { id: 'rec-1', title: 'Thyroid Panel Lab Report', category: 'lab_report', date: 'Aug 10, 2026', fileName: 'Thyroid_Report_Aug26.pdf' },
  { id: 'rec-2', title: 'Dr Rajesh Pediatric Prescription', category: 'prescription', date: 'June 05, 2026', fileName: 'Pediatric_Prescription_June26.jpg' },
];

export default function HealthRecordsPage() {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'prescription' | 'lab_report' | 'other'>('prescription');
  const [date, setDate] = useState('');
  const [fileName, setFileName] = useState('');

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !fileName) return;

    const newRecord: Record = {
      id: `rec-${Date.now()}`,
      title,
      category,
      date: new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      fileName,
    };

    setRecords([newRecord, ...records]);
    setShowAddForm(false);

    // Reset Form
    setTitle('');
    setCategory('prescription');
    setDate('');
    setFileName('');
  };

  const handleRemoveRecord = (id: string) => {
    setRecords(records.filter((rec) => rec.id !== id));
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
          
          {/* Records List (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-lg sm:text-xl font-extrabold text-navy-900">
                    Secure Health Records
                  </h1>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Store and organize your medical files, prescriptions, and lab reports.
                  </p>
                </div>
                
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="h-9 px-4 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Record</span>
                </button>
              </div>

              {/* Records List */}
              <div className="space-y-4">
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4 bg-brand-bg text-left"
                  >
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-500 flex items-center justify-center shrink-0 border border-brand-border">
                        <FileText className="w-5 h-5 text-mint-600" />
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                          {rec.title}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-navy-400 font-semibold mt-0.5">
                          {rec.category === 'prescription' ? 'Prescription' : rec.category === 'lab_report' ? 'Laboratory Report' : 'Other Document'} · Date: {rec.date}
                        </p>
                        <p className="text-[10px] text-navy-400 italic mt-0.5 truncate max-w-xs">{rec.fileName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="p-1.5 text-navy-500 hover:text-mint-600 transition-colors"
                        aria-label="Download document"
                        onClick={() => alert(`Mock downloading file: ${rec.fileName}`)}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveRecord(rec.id)}
                        className="p-1.5 text-navy-400 hover:text-error-500 transition-colors"
                        aria-label="Remove record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {records.length === 0 && (
                  <div className="text-center py-12 text-navy-400">
                    <FileText className="w-10 h-10 mx-auto mb-2 text-navy-300" />
                    <p className="text-xs">No health records uploaded yet.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Upload Form panel (lg:col-span-4) */}
          {showAddForm && (
            <div className="lg:col-span-4 bg-white border border-brand-border rounded-3xl p-5 shadow-sm animate-fade-in text-left">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-mint-500" />
                Upload New Document
              </h3>
              
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Document Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lipids Blood Test July"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Record Type</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'prescription' | 'lab_report' | 'other')}
                    className="w-full h-10 px-2.5 border border-brand-border bg-white rounded-lg text-xs outline-none"
                  >
                    <option value="prescription">Prescription</option>
                    <option value="lab_report">Laboratory Report</option>
                    <option value="other">Other Document</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Record Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-10 px-3 border border-brand-border rounded-lg text-xs outline-none focus:border-mint-400"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-navy-800 uppercase tracking-wider block">Upload File</label>
                  <input
                    type="file"
                    required
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                    className="w-full text-xs text-navy-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-navy-50 file:text-navy-700 hover:file:bg-navy-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
                >
                  Save to Health Vault
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
