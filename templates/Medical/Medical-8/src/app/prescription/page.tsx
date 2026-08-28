'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, FileText, CheckCircle, Clock, FileWarning, ArrowRight, ShieldCheck, User } from 'lucide-react';
import Image from 'next/image';

export default function PrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Generate preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null); // PDF or other file
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !patientName || !patientPhone) return;

    setIsSubmitting(true);
    // Simulate upload delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setPatientName('');
    setPatientPhone('');
    setNotes('');
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-3xl">
        
        {/* Banner Headers */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Upload Prescription
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
            Upload your doctor&apos;s prescription. Our certified pharmacists will review it and curate your medicine list in minutes.
          </p>
        </div>

        {/* ── Screen 1: Submit Form ───────────────────────── */}
        {!isSubmitted ? (
          <div className="bg-white rounded-3xl border border-brand-border shadow-sm p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* File Drop Zone */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy-800 uppercase tracking-wider block">
                  Upload Scanned Copy / Photo
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer min-h-[200px] ${
                    file ? 'border-mint-500 bg-mint-50/10' : 'border-brand-border hover:border-mint-400 bg-brand-bg'
                  }`}
                >
                  <input
                    type="file"
                    id="prescription-file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    required={!file}
                  />
                  
                  {file ? (
                    <div className="text-center space-y-4 w-full flex flex-col items-center">
                      {previewUrl ? (
                        <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-brand-border">
                          <Image src={previewUrl} alt="Prescription preview" fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-navy-50 flex items-center justify-center text-mint-600 border border-brand-border">
                          <FileText className="w-8 h-8" />
                        </div>
                      )}
                      
                      <div className="text-xs">
                        <p className="font-bold text-navy-900 truncate max-w-xs">{file.name}</p>
                        <p className="text-navy-400 font-medium">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                      </div>
                      
                      <label
                        htmlFor="prescription-file"
                        className="text-xs font-bold text-mint-600 hover:text-mint-700 cursor-pointer underline"
                      >
                        Change File
                      </label>
                    </div>
                  ) : (
                    <label htmlFor="prescription-file" className="flex flex-col items-center text-center cursor-pointer w-full h-full py-4">
                      <div className="w-12 h-12 rounded-xl bg-mint-50 text-mint-600 flex items-center justify-center mb-4">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-navy-900 block">
                        Drag and drop your file here
                      </span>
                      <span className="text-xs text-navy-400 mt-1 block">
                        Supports JPEG, PNG, or PDF up to 10MB
                      </span>
                      <span className="mt-4 px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-bold shadow-sm hover:bg-navy-950 transition-colors">
                        Browse Files
                      </span>
                    </label>
                  )}
                </div>
              </div>

              {/* Patient Details Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="patient-name" className="text-xs font-bold text-navy-800 uppercase tracking-wider block">
                    Patient Full Name
                  </label>
                  <input
                    type="text"
                    id="patient-name"
                    placeholder="Enter patient's name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    className="w-full h-11 px-4 border border-brand-border rounded-xl text-xs text-navy-950 placeholder:text-navy-400 focus:border-mint-400 focus:ring-1 focus:ring-mint-100 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="patient-phone" className="text-xs font-bold text-navy-800 uppercase tracking-wider block">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    id="patient-phone"
                    placeholder="Enter 10-digit number"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    required
                    className="w-full h-11 px-4 border border-brand-border rounded-xl text-xs text-navy-950 placeholder:text-navy-400 focus:border-mint-400 focus:ring-1 focus:ring-mint-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Pharmacist Instructions / Notes */}
              <div className="space-y-1.5">
                <label htmlFor="notes" className="text-xs font-bold text-navy-800 uppercase tracking-wider block">
                  Instructions for Pharmacist (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="e.g. Call me before finalizing order, or include only brand names."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 border border-brand-border rounded-xl text-xs text-navy-950 placeholder:text-navy-400 focus:border-mint-400 focus:ring-1 focus:ring-mint-100 outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || !file}
                className="w-full h-12 bg-mint-500 hover:bg-mint-600 text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 transition-colors shadow-md disabled:bg-navy-200 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading & Verifying...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Submit Prescription</span>
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* ── Screen 2: Status Tracking (Simulated) ───────── */
          <div className="bg-white rounded-3xl border border-brand-border shadow-sm p-6 sm:p-8 text-center space-y-8 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-mint-50 text-mint-500 flex items-center justify-center mx-auto border border-mint-500/10">
              <CheckCircle className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-900">
                Prescription Uploaded Successfully!
              </h2>
              <p className="text-xs text-navy-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, {patientName}. Our pharmacy verification desk has received your prescription file.
              </p>
            </div>

            {/* Tracking Steps Timeline */}
            <div className="max-w-md mx-auto bg-brand-bg rounded-2xl p-6 border border-brand-border text-left">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-5">
                Review Status Timeline
              </h3>
              
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-[1.5px] before:bg-brand-border">
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10" />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                      <span>Prescription Received</span>
                      <CheckCircle className="w-3.5 h-3.5 text-mint-500" />
                    </h4>
                    <p className="text-[10px] text-navy-400 mt-0.5">We have registered your contact details.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 animate-pulse-soft" />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
                      <span>Pharmacist Reviewing</span>
                      <Clock className="w-3.5 h-3.5 text-mint-500 animate-spin" style={{ animationDuration: '3s' }} />
                    </h4>
                    <p className="text-[10px] text-navy-500 mt-0.5">Digitizing your dosage and verifying instructions.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4 opacity-50">
                  <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-navy-200 z-10" />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">Medicines Matching</h4>
                    <p className="text-[10px] text-navy-400 mt-0.5">Matching items with available inventory.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4 opacity-50">
                  <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-navy-200 z-10" />
                  <div>
                    <h4 className="text-xs font-bold text-navy-900">Cart Cart Ready</h4>
                    <p className="text-[10px] text-navy-400 mt-0.5">You will receive an SMS checkout link once verified.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <button
                onClick={handleReset}
                className="h-11 px-6 rounded-full border border-brand-border bg-white hover:bg-navy-50 text-navy-800 text-xs font-bold transition-all w-full sm:w-auto"
              >
                Upload Another
              </button>
              <Link
                href="/"
                className="h-11 px-6 rounded-full bg-navy-900 hover:bg-mint-600 text-white text-xs font-bold transition-all w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                <span>Return to Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Info footer */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="flex gap-2.5 p-4 rounded-xl bg-white border border-brand-border">
            <ShieldCheck className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy-800">NABL & GPP Compliant</h4>
              <p className="text-[10px] text-navy-500 leading-relaxed mt-0.5">
                Our verification centers operate under strict Good Pharmacy Practices (GPP). All prescriptions are handled under direct pharmacist supervision.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 p-4 rounded-xl bg-white border border-brand-border">
            <FileWarning className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy-800">Valid Rx Criteria</h4>
              <p className="text-[10px] text-navy-500 leading-relaxed mt-0.5">
                Must contain doctor credentials, date, patient details, and brand/generic name. We do not process expired or blank prescriptions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
