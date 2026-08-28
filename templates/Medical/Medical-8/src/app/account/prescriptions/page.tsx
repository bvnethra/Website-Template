'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, CheckCircle, Clock, FileWarning, ArrowUpRight, ChevronLeft } from 'lucide-react';

interface MockRx {
  id: string;
  fileName: string;
  patientName: string;
  uploadedAt: string;
  status: 'verified' | 'processing' | 'rejected';
  statusText: string;
}

const mockRxList: MockRx[] = [
  { id: 'rx-1', fileName: 'Prescription_Aug2026.pdf', patientName: 'John Doe', uploadedAt: 'Aug 28, 2026', status: 'processing', statusText: 'Under Verification' },
  { id: 'rx-2', fileName: 'Pediatric_Care_DrRajesh.png', patientName: 'Baby Doe', uploadedAt: 'June 10, 2026', status: 'verified', statusText: 'Verified' },
];

export default function PrescriptionsPage() {
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

        <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-navy-900">
                Uploaded Prescriptions
              </h1>
              <p className="text-xs text-navy-500 mt-0.5">
                Past files submitted to our verification desks.
              </p>
            </div>
            
            <Link
              href="/prescription"
              className="h-9 px-4 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <span>Upload New</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* List Layout */}
          <div className="space-y-4">
            {mockRxList.map((rx) => {
              const isVerified = rx.status === 'verified';
              const isProcessing = rx.status === 'processing';
              
              return (
                <div
                  key={rx.id}
                  className="p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-4 bg-brand-bg text-left"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-500 flex items-center justify-center shrink-0 border border-brand-border">
                      <FileText className="w-5 h-5" />
                    </div>
                    
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-navy-900 truncate">
                        {rx.fileName}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-navy-400 font-semibold mt-0.5">
                        Patient: {rx.patientName} · Uploaded: {rx.uploadedAt}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                    isVerified ? 'bg-success-50 text-success-500 border border-success-500/10' : isProcessing ? 'bg-warning-50 text-warning-500 border border-warning-500/10' : 'bg-error-50 text-error-500 border border-error-500/10'
                  }`}>
                    {isVerified ? (
                      <CheckCircle className="w-3.5 h-3.5 text-success-500" />
                    ) : isProcessing ? (
                      <Clock className="w-3.5 h-3.5 text-warning-500 animate-pulse" />
                    ) : (
                      <FileWarning className="w-3.5 h-3.5 text-error-500" />
                    )}
                    <span>{rx.statusText}</span>
                  </div>
                </div>
              );
            })}

            {mockRxList.length === 0 && (
              <div className="text-center py-12 text-navy-400">
                <FileText className="w-10 h-10 mx-auto mb-2 text-navy-300" />
                <p className="text-xs">No uploaded prescriptions found.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
