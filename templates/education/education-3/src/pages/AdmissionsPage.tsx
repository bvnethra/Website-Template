import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { COURSES_DATA } from '../data/mockData';
import { ApplicationSubmission, ApplicationStage, DocumentUpload } from '../types';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  CheckCircle2, 
  UploadCloud, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Search, 
  Clock, 
  Award, 
  AlertCircle, 
  ShieldCheck, 
  FileCheck, 
  Trash2, 
  Eye, 
  Copy, 
  Download, 
  Calendar, 
  UserCheck, 
  Send,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdmissionsPage: React.FC = () => {
  const { 
    selectedCourseForApply, 
    setSelectedCourseForApply, 
    addNewApplication, 
    getApplicationByRef, 
    applications,
    addToast 
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Tab: 'apply' or 'tracker'
  const [activeTab, setActiveTab] = useState<'apply' | 'tracker'>('apply');

  // Multi-step form step (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal & Academic Background
    fullName: 'Alexandre DuPont',
    email: 'alex.dupont@example.com',
    phone: '+1 (555) 234-8901',
    dob: '2002-06-15',
    nationality: 'United States',
    previousInstitution: 'Cornell University (B.S. Applied Math)',
    gpa: '3.86',
    testType: 'GRE',
    testScore: '328 (Q: 167, V: 161)',
    
    // Step 2: Program & Term Selection
    programId: selectedCourseForApply ? selectedCourseForApply.id : 'ms-data-science',
    degreeLevel: selectedCourseForApply ? selectedCourseForApply.degreeLevel : 'Postgraduate',
    term: 'Fall 2026',
    mode: selectedCourseForApply ? selectedCourseForApply.mode : 'Hybrid',
    housingNeeded: false,
    sopText: 'I am passionate about advancing generative neural networks and multi-agent coordination architectures at Eduvora University.',

    // Step 4: Terms
    confirmedTruthful: true,
  });

  // Simulated uploaded documents state
  const [uploadedDocs, setUploadedDocs] = useState<DocumentUpload[]>([
    {
      id: 'doc-1',
      category: 'Transcripts',
      fileName: 'Official_Undergraduate_Transcript_Cornell.pdf',
      fileSize: '2.4 MB',
      uploadedAt: 'Just now',
      progress: 100,
      status: 'completed',
    },
    {
      id: 'doc-2',
      category: 'Statement of Purpose',
      fileName: 'Statement_of_Purpose_Eduvora_Fall2026.pdf',
      fileSize: '1.1 MB',
      uploadedAt: 'Just now',
      progress: 100,
      status: 'completed',
    }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocCategory, setSelectedDocCategory] = useState<DocumentUpload['category']>('Resume / CV');

  // Tracker State
  const [searchRefInput, setSearchRefInput] = useState<string>('EDV-2026-8942');
  const [trackedApplication, setTrackedApplication] = useState<ApplicationSubmission | null>(null);

  // Parse URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    const stepParam = params.get('step');
    const refParam = params.get('ref');
    const gpaParam = params.get('gpa');

    if (tabParam === 'tracker') {
      setActiveTab('tracker');
    }
    if (stepParam) {
      setCurrentStep(parseInt(stepParam));
    }
    if (refParam) {
      setActiveTab('tracker');
      setSearchRefInput(refParam);
      const app = getApplicationByRef(refParam);
      if (app) setTrackedApplication(app);
    } else {
      // Default lookup initial
      const defaultApp = getApplicationByRef('EDV-2026-8942');
      if (defaultApp) setTrackedApplication(defaultApp);
    }
    if (gpaParam) {
      setFormData((prev) => ({ ...prev, gpa: gpaParam }));
    }
  }, [location.search]);

  // Sync selectedCourseForApply when it changes
  useEffect(() => {
    if (selectedCourseForApply) {
      setFormData((prev) => ({
        ...prev,
        programId: selectedCourseForApply.id,
        degreeLevel: selectedCourseForApply.degreeLevel,
        mode: selectedCourseForApply.mode,
      }));
    }
  }, [selectedCourseForApply]);

  // Selected Program object
  const currentProgram = COURSES_DATA.find((c) => c.id === formData.programId) || COURSES_DATA[0];

  // Dynamic Scholarship Calculation
  const numericGpa = parseFloat(formData.gpa) || 3.0;
  const estimatedAidAmount = numericGpa >= 3.85 ? 15000 : numericGpa >= 3.6 ? 11000 : numericGpa >= 3.2 ? 7500 : 3500;
  const scholarshipTier = numericGpa >= 3.85 
    ? 'Presidential Merit Fellowship ($15,000/yr)' 
    : numericGpa >= 3.6 
    ? 'Dean\'s Academic Excellence Award ($11,000/yr)' 
    : numericGpa >= 3.2 
    ? 'Eduvora Honors Achievement Grant ($7,500/yr)' 
    : 'University Entrance Opportunity Grant ($3,500/yr)';

  // Step Form Validation
  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formData.fullName.trim()) {
        addToast({ type: 'warning', title: 'Missing Name', message: 'Please enter your full legal name.' });
        return false;
      }
      if (!formData.email.includes('@')) {
        addToast({ type: 'warning', title: 'Invalid Email', message: 'Please provide a valid email address.' });
        return false;
      }
      if (!formData.gpa || isNaN(parseFloat(formData.gpa))) {
        addToast({ type: 'warning', title: 'Invalid GPA', message: 'Please input a valid GPA or percentage.' });
        return false;
      }
    }
    if (step === 3) {
      if (uploadedDocs.length === 0) {
        addToast({ type: 'warning', title: 'Documents Required', message: 'Please upload at least your Academic Transcript or Resume.' });
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // Simulate File Upload
  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const newDocId = `doc-${Date.now()}`;
    const newDoc: DocumentUpload = {
      id: newDocId,
      category: selectedDocCategory,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: 'Uploading...',
      progress: 20,
      status: 'uploading',
    };

    setUploadedDocs((prev) => [...prev, newDoc]);
    setIsUploading(true);

    // Simulate progress
    setTimeout(() => {
      setUploadedDocs((prev) =>
        prev.map((d) => (d.id === newDocId ? { ...d, progress: 65 } : d))
      );
    }, 400);

    setTimeout(() => {
      setUploadedDocs((prev) =>
        prev.map((d) => (d.id === newDocId ? { ...d, progress: 100, status: 'completed', uploadedAt: 'Just now' } : d))
      );
      setIsUploading(false);
      addToast({
        type: 'success',
        title: 'Document Uploaded',
        message: `${file.name} successfully encrypted and uploaded.`,
      });
    }, 900);
  };

  const handleDeleteDoc = (docId: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.id !== docId));
    addToast({ type: 'info', title: 'Document Removed', message: 'The uploaded file has been removed.' });
  };

  // Final Form Submit
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirmedTruthful) {
      addToast({ type: 'warning', title: 'Certification Required', message: 'Please check the certification checkbox before submitting.' });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRefId = `EDV-2026-${randomSuffix}`;

    const newSubmission: ApplicationSubmission = {
      referenceId: newRefId,
      submittedAt: new Date().toISOString().split('T')[0],
      term: formData.term,
      programId: currentProgram.id,
      programTitle: currentProgram.title,
      degreeLevel: currentProgram.degreeLevel,
      mode: formData.mode,
      applicantName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      nationality: formData.nationality,
      previousInstitution: formData.previousInstitution,
      gpa: numericGpa,
      testScoreType: formData.testType,
      testScore: formData.testScore,
      scholarshipTier,
      estimatedAid: estimatedAidAmount,
      currentStage: 'Submitted',
      documentsCount: uploadedDocs.length,
      reviewerNotes: 'Application dossier received. Academic committee verification scheduled within 48-72 business hours.',
      stageHistory: [
        { stage: 'Submitted', date: new Date().toISOString().split('T')[0], completed: true, note: 'Application dossier submitted with all required transcripts.' },
        { stage: 'Under Faculty Review', date: 'Pending', completed: false, note: 'Faculty board verification.' },
        { stage: 'Interview Scheduled', date: 'Pending', completed: false, note: 'Departmental interview.' },
        { stage: 'Admitted', date: 'Pending', completed: false, note: 'Final decision letter issuance.' },
      ]
    };

    addNewApplication(newSubmission);
    setSubmittedRefId(newRefId);
    setTrackedApplication(newSubmission);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A5D4E', '#A7B3A2', '#F4F1EA', '#8E9E8C'],
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Status Search
  const handleTrackerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRefInput.trim()) return;

    const found = getApplicationByRef(searchRefInput);
    if (found) {
      setTrackedApplication(found);
      addToast({
        type: 'success',
        title: 'Application Found',
        message: `Dossier loaded for ${found.applicantName} (${found.referenceId}).`,
      });
    } else {
      addToast({
        type: 'error',
        title: 'Reference ID Not Found',
        message: `No application matching "${searchRefInput}". Check for typos or test with EDV-2026-8942.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] pb-24">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-[#E8EAE3] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1EA] text-[#4A5D4E] text-xs font-bold uppercase tracking-wider border border-[#E8EAE3]">
                <ShieldCheck className="w-4 h-4 text-[#4A5D4E]" />
                <span>Eduvora Admissions Portal 2026-2027</span>
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4A5D4E]">
                {activeTab === 'apply' ? 'Online Application & Financial Aid' : 'Application Status Tracker'}
              </h1>
              <p className="text-sm sm:text-base text-[#2D3436]/70">
                {activeTab === 'apply'
                  ? 'Submit your official application dossier, estimate merit scholarships, and join the Eduvora cohort.'
                  : 'Track your live faculty review pipeline, schedule interviews, and access decision letters.'}
              </p>
            </div>

            {/* Toggle Tabs: 'Apply Online' vs 'Track Status' */}
            <div className="flex items-center bg-[#F4F1EA] p-1.5 rounded-2xl border border-[#E8EAE3] self-start md:self-auto">
              <button
                onClick={() => {
                  setActiveTab('apply');
                  setSubmittedRefId(null);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'apply'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/70 hover:text-[#4A5D4E]'
                }`}
              >
                Apply Online
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'tracker'
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#2D3436]/70 hover:text-[#4A5D4E]'
                }`}
              >
                Track Status Pipeline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {activeTab === 'apply' ? (
          
          /* =========================================================================
             MULTI-STEP APPLICATION FLOW
             ========================================================================= */
          submittedRefId ? (
            
            /* SUCCESS CONFIRMATION STATE */
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-[#E8EAE3] shadow-lg text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center mx-auto shadow-inner border border-[#E8EAE3]">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#4A5D4E]">
                  Application Dossier Received
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#4A5D4E]">
                  Congratulations, {formData.fullName}!
                </h2>
                <p className="text-sm text-[#2D3436]/80 max-w-lg mx-auto leading-relaxed">
                  Your application for <strong>{currentProgram.title}</strong> ({formData.term}) has been successfully submitted to the Admissions Board.
                </p>
              </div>

              {/* Unique Reference Card */}
              <div className="bg-[#F9F7F2] p-6 rounded-2xl border border-[#E8EAE3] max-w-md mx-auto space-y-3">
                <span className="text-xs uppercase font-bold text-[#A7B3A2] block">
                  Official Application Reference ID
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-[#4A5D4E] tracking-wider">
                    {submittedRefId}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(submittedRefId);
                      addToast({ type: 'success', title: 'Copied!', message: 'Reference ID copied to clipboard.' });
                    }}
                    className="p-2 hover:bg-[#F4F1EA] rounded-lg text-[#4A5D4E] transition-colors"
                    title="Copy Reference ID"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="pt-2 border-t border-[#E8EAE3] flex justify-between text-xs text-[#2D3436]/70">
                  <span>Estimated Merit Aid:</span>
                  <span className="font-bold text-[#4A5D4E]">${estimatedAidAmount.toLocaleString()}/yr</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setActiveTab('tracker');
                    setSearchRefInput(submittedRefId);
                    const app = getApplicationByRef(submittedRefId);
                    if (app) setTrackedApplication(app);
                  }}
                  className="px-6 py-3 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-white" />
                  <span>View Live Status Pipeline</span>
                </button>

                <button
                  onClick={() => {
                    setSubmittedRefId(null);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#4A5D4E] rounded-xl text-xs font-bold transition-colors border border-[#E8EAE3]"
                >
                  Submit Another Application
                </button>
              </div>
            </div>

          ) : (

            /* 4-STEP FORM */
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Stepper Progress Header */}
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E8EAE3] shadow-xs">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { step: 1, label: 'Personal & Academic' },
                    { step: 2, label: 'Program & Term' },
                    { step: 3, label: 'Document Upload' },
                    { step: 4, label: 'Review & Aid' },
                  ].map((s) => (
                    <div
                      key={s.step}
                      onClick={() => s.step < currentStep && setCurrentStep(s.step)}
                      className={`cursor-pointer group flex flex-col items-center gap-1.5 ${
                        s.step === currentStep
                          ? 'text-[#4A5D4E] font-bold'
                          : s.step < currentStep
                          ? 'text-[#4A5D4E]'
                          : 'text-[#A7B3A2]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          s.step === currentStep
                            ? 'bg-[#4A5D4E] text-white ring-4 ring-[#4A5D4E]/10'
                            : s.step < currentStep
                            ? 'bg-[#4A5D4E] text-white'
                            : 'bg-[#F4F1EA] text-[#A7B3A2] border border-[#E8EAE3]'
                        }`}
                      >
                        {s.step < currentStep ? '✓' : s.step}
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Step Panel */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8EAE3] shadow-sm space-y-8">
                
                {/* STEP 1: Personal & Academic Background */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E8EAE3] pb-4">
                      <h3 className="font-heading text-xl font-bold text-[#4A5D4E]">
                        Step 1: Personal & Academic Background
                      </h3>
                      <p className="text-xs text-[#2D3436]/70 mt-1">
                        Please provide verified details as they appear on your passport or academic transcripts.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Alexandre DuPont"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Previous School / University Institution *
                        </label>
                        <input
                          type="text"
                          value={formData.previousInstitution}
                          onChange={(e) => setFormData({ ...formData, previousInstitution: e.target.value })}
                          placeholder="e.g. Cornell University (B.S. Mathematics)"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Cumulative GPA / Percentage *
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="2.0"
                          max="4.0"
                          value={formData.gpa}
                          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                          placeholder="e.g. 3.86"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#4A5D4E] font-bold focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                        <span className="text-[11px] text-[#A7B3A2] block">
                          Merit aid calculates automatically from this GPA in Step 4.
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Standardized Test (GRE / SAT / IELTS)
                        </label>
                        <input
                          type="text"
                          value={formData.testScore}
                          onChange={(e) => setFormData({ ...formData, testScore: e.target.value })}
                          placeholder="e.g. GRE 328 (Q:167, V:161) or SAT 1520"
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 2: Program & Term Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E8EAE3] pb-4">
                      <h3 className="font-heading text-xl font-bold text-[#4A5D4E]">
                        Step 2: Program Selection & Term
                      </h3>
                      <p className="text-xs text-[#2D3436]/70 mt-1">
                        Select your targeted academic program and starting semester cohort.
                      </p>
                    </div>

                    <div className="space-y-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Choose Academic Program *
                        </label>
                        <select
                          value={formData.programId}
                          onChange={(e) => {
                            const prog = COURSES_DATA.find((c) => c.id === e.target.value);
                            if (prog) {
                              setFormData({
                                ...formData,
                                programId: prog.id,
                                degreeLevel: prog.degreeLevel,
                                mode: prog.mode,
                              });
                            }
                          }}
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm font-bold text-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        >
                          {COURSES_DATA.map((c) => (
                            <option key={c.id} value={c.id}>
                              [{c.degreeLevel}] {c.title} — ${c.tuitionPerSemester === 0 ? 'Funded' : `${c.tuitionPerSemester.toLocaleString()}/sem`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                            Intake Term *
                          </label>
                          <select
                            value={formData.term}
                            onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] font-semibold focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                          >
                            <option value="Fall 2026">Fall 2026 (Begins September 2026)</option>
                            <option value="Spring 2027">Spring 2027 (Begins January 2027)</option>
                            <option value="Summer 2027">Summer 2027 (Intensive Session)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                            Study Mode Preference
                          </label>
                          <select
                            value={formData.mode}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm text-[#2D3436] font-semibold focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                          >
                            <option value="On-Campus">On-Campus Immersion</option>
                            <option value="Hybrid">Hybrid (On-Campus + Live Online)</option>
                            <option value="Online">100% Asynchronous Online</option>
                          </select>
                        </div>

                      </div>

                      {/* Program Summary Preview Card */}
                      <div className="p-4 rounded-2xl bg-[#F9F7F2] border border-[#E8EAE3] flex items-center gap-4">
                        <img
                          src={currentProgram.image}
                          alt={currentProgram.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-xl object-cover border border-[#E8EAE3] shrink-0"
                        />
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-[#4A5D4E] leading-tight">
                            {currentProgram.title}
                          </h4>
                          <p className="text-xs text-[#2D3436]/70">
                            {currentProgram.department} • {currentProgram.durationYears} Years • {currentProgram.totalCredits} Credits
                          </p>
                          <span className="text-[11px] font-bold text-[#4A5D4E]">
                            Application Deadline: {currentProgram.applicationDeadline}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                          Statement of Purpose / Research Motivation (Brief Preview)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.sopText}
                          onChange={(e) => setFormData({ ...formData, sopText: e.target.value })}
                          placeholder="Briefly state your academic objectives and reasons for selecting Eduvora..."
                          className="w-full px-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-xs text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                        />
                      </div>

                    </div>
                  </div>
                )}

                {/* STEP 3: Document Upload Simulator */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E8EAE3] pb-4">
                      <h3 className="font-heading text-xl font-bold text-[#4A5D4E]">
                        Step 3: Document Upload Simulator
                      </h3>
                      <p className="text-xs text-[#2D3436]/70 mt-1">
                        Upload official academic records, statement of purpose, and reference letters (PDF, DOCX, JPG).
                      </p>
                    </div>

                    {/* Category Selector for Upload */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] mr-2">
                        Document Type:
                      </span>
                      {(['Transcripts', 'Statement of Purpose', 'Resume / CV', 'Letters of Recommendation', 'Identity Proof'] as const).map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedDocCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            selectedDocCategory === cat
                              ? 'bg-[#4A5D4E] text-white shadow-xs'
                              : 'bg-[#F4F1EA] text-[#4A5D4E] hover:bg-[#E8EAE3] border border-[#E8EAE3]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* Drag and Drop Zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#E8EAE3] hover:border-[#4A5D4E] bg-[#FDFBF7] hover:bg-[#F4F1EA] p-8 rounded-3xl text-center cursor-pointer transition-all space-y-3"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        accept=".pdf,.docx,.doc,.jpg,.png"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center mx-auto border border-[#E8EAE3]">
                        <UploadCloud className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#4A5D4E]">
                          Click or Drag files to upload {selectedDocCategory}
                        </h4>
                        <p className="text-xs text-[#A7B3A2]">
                          Supported formats: PDF, DOCX, JPG (Max 25MB per file)
                        </p>
                      </div>
                    </div>

                    {/* Uploaded Documents List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                        Attached Application Dossier ({uploadedDocs.length} Files)
                      </h4>

                      <div className="space-y-2.5">
                        {uploadedDocs.map((doc) => (
                          <div
                            key={doc.id}
                            className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8EAE3] flex items-center justify-between gap-4 shadow-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] text-[#4A5D4E] flex items-center justify-center shrink-0 border border-[#E8EAE3]">
                                <FileText className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#4A5D4E] truncate">
                                    {doc.fileName}
                                  </span>
                                  <span className="text-[10px] font-semibold bg-[#F4F1EA] px-2 py-0.5 rounded-full text-[#4A5D4E] border border-[#E8EAE3]">
                                    {doc.category}
                                  </span>
                                </div>
                                <span className="text-[11px] text-[#A7B3A2]">
                                  {doc.fileSize} • {doc.uploadedAt}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              {doc.status === 'uploading' ? (
                                <div className="w-24 bg-[#F4F1EA] rounded-full h-2 overflow-hidden border border-[#E8EAE3]">
                                  <div
                                    className="bg-[#4A5D4E] h-2 transition-all duration-300"
                                    style={{ width: `${doc.progress}%` }}
                                  />
                                </div>
                              ) : (
                                <span className="text-xs font-bold text-[#4A5D4E] flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span className="hidden sm:inline">Verified</span>
                                </span>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeleteDoc(doc.id)}
                                className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                title="Remove file"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* STEP 4: Review, Scholarship Estimator & Final Submission */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#E8EAE3] pb-4">
                      <h3 className="font-heading text-xl font-bold text-[#4A5D4E]">
                        Step 4: Review, Scholarship Estimator & Submission
                      </h3>
                      <p className="text-xs text-[#2D3436]/70 mt-1">
                        Review your application details and merit-based financial aid package before final sign-off.
                      </p>
                    </div>

                    {/* Dynamic Scholarship Evaluation Card */}
                    <div className="p-6 rounded-3xl bg-[#4A5D4E] text-white shadow-md space-y-3 relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#E8EAE3]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-[#E8EAE3]">
                            Merit Scholarship Calculator
                          </span>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/20">
                          GPA: {numericGpa.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black font-heading tracking-tight">
                          ${estimatedAidAmount.toLocaleString()}
                        </span>
                        <span className="text-sm text-[#E8EAE3]">/ Academic Year Grant</span>
                      </div>

                      <p className="text-xs text-[#E8EAE3]/90">
                        Qualified for: <strong>{scholarshipTier}</strong>. This estimate will be formalized by the Financial Aid Board upon document evaluation.
                      </p>
                    </div>

                    {/* Summary Review Grid */}
                    <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8EAE3] space-y-3 text-xs">
                      <h4 className="font-bold text-[#4A5D4E] uppercase tracking-wider">
                        Applicant Summary Checklist
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 divide-y sm:divide-y-0 divide-[#E8EAE3]">
                        <div>
                          <span className="text-[#A7B3A2] block">Applicant Name:</span>
                          <span className="font-bold text-[#2D3436]">{formData.fullName}</span>
                        </div>
                        <div>
                          <span className="text-[#A7B3A2] block">Email & Phone:</span>
                          <span className="font-bold text-[#2D3436]">{formData.email} ({formData.phone})</span>
                        </div>
                        <div>
                          <span className="text-[#A7B3A2] block">Target Program:</span>
                          <span className="font-bold text-[#4A5D4E]">{currentProgram.title}</span>
                        </div>
                        <div>
                          <span className="text-[#A7B3A2] block">Intake Term & Mode:</span>
                          <span className="font-bold text-[#2D3436]">{formData.term} • {formData.mode}</span>
                        </div>
                        <div>
                          <span className="text-[#A7B3A2] block">Previous Degree:</span>
                          <span className="font-bold text-[#2D3436]">{formData.previousInstitution}</span>
                        </div>
                        <div>
                          <span className="text-[#A7B3A2] block">Uploaded Documents:</span>
                          <span className="font-bold text-[#4A5D4E]">{uploadedDocs.length} Verified Files Attached</span>
                        </div>
                      </div>
                    </div>

                    {/* Truthful Certification */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl border border-[#E8EAE3] bg-[#FDFBF7] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.confirmedTruthful}
                        onChange={(e) => setFormData({ ...formData, confirmedTruthful: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                      />
                      <span className="text-xs text-[#2D3436]/80 leading-relaxed">
                        I hereby certify that all information submitted in this application is authentic, accurate, and complete. I understand that falsification may result in immediate disqualification.
                      </span>
                    </label>

                  </div>
                )}

                {/* Footer Navigation Buttons */}
                <div className="pt-6 border-t border-[#E8EAE3] flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-5 py-2.5 rounded-xl border border-[#E8EAE3] text-[#2D3436] font-bold text-xs hover:bg-[#F4F1EA] transition-colors flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : <div />}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="px-8 py-3 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>Submit Application Dossier</span>
                    </button>
                  )}
                </div>

              </div>
            </div>

          )
        ) : (

          /* =========================================================================
             APPLICATION STATUS TRACKER PIPELINE
             ========================================================================= */
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Search Reference ID Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8EAE3] shadow-xs space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#4A5D4E]">
                Check Application Progress
              </h3>

              <form onSubmit={handleTrackerSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A7B3A2]" />
                  <input
                    type="text"
                    value={searchRefInput}
                    onChange={(e) => setSearchRefInput(e.target.value)}
                    placeholder="Enter Reference ID (e.g., EDV-2026-8942)"
                    className="w-full pl-11 pr-4 py-3 bg-[#FDFBF7] rounded-xl border border-[#E8EAE3] text-sm font-mono font-bold text-[#4A5D4E] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Track Pipeline
                </button>
              </form>

              {/* Sample Quick Lookup Tags */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#A7B3A2]">Quick Test Dossiers:</span>
                {applications.slice(0, 3).map((app) => (
                  <button
                    key={app.referenceId}
                    onClick={() => {
                      setSearchRefInput(app.referenceId);
                      setTrackedApplication(app);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#F4F1EA] hover:bg-[#E8EAE3] text-[#4A5D4E] font-mono text-[11px] font-semibold transition-colors border border-[#E8EAE3]"
                  >
                    {app.referenceId} ({app.currentStage})
                  </button>
                ))}
              </div>
            </div>

            {/* Application Dossier View & Live Pipeline Timeline */}
            {trackedApplication ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8EAE3] shadow-sm space-y-8">
                
                {/* Top Applicant Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8EAE3]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#4A5D4E] text-white">
                        {trackedApplication.referenceId}
                      </span>
                      <span className="text-xs text-[#A7B3A2]">
                        Submitted on {trackedApplication.submittedAt}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-[#4A5D4E]">
                      {trackedApplication.applicantName}
                    </h2>
                    <p className="text-xs text-[#2D3436]/70">
                      Program: <strong>{trackedApplication.programTitle}</strong> • {trackedApplication.term}
                    </p>
                  </div>

                  <div className="text-right sm:self-center bg-[#F4F1EA] px-4 py-2.5 rounded-2xl border border-[#E8EAE3]">
                    <span className="text-[10px] uppercase font-bold text-[#A7B3A2] block">Current Stage</span>
                    <span className="text-sm font-extrabold text-[#4A5D4E] font-heading">
                      {trackedApplication.currentStage}
                    </span>
                  </div>
                </div>

                {/* 4-Stage Interactive Visual Pipeline */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E]">
                    Faculty Admissions Pipeline
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { stage: 'Submitted', desc: 'Dossier received & logged' },
                      { stage: 'Under Faculty Review', desc: 'Curriculum & GPA check' },
                      { stage: 'Interview Scheduled', desc: 'Departmental interview' },
                      { stage: 'Admitted', desc: 'Official letter of admission' },
                    ].map((step, idx) => {
                      const stagesOrder: ApplicationStage[] = ['Submitted', 'Under Faculty Review', 'Interview Scheduled', 'Admitted'];
                      const currentIdx = stagesOrder.indexOf(trackedApplication.currentStage);
                      const isComplete = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div
                          key={step.stage}
                          className={`p-4 rounded-2xl border transition-all ${
                            isCurrent
                              ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-md ring-2 ring-[#4A5D4E]/20'
                              : isComplete
                              ? 'bg-[#F9F7F2] text-[#2D3436] border-[#E8EAE3]'
                              : 'bg-[#FDFBF7] text-[#A7B3A2] border-[#E8EAE3]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold uppercase">
                              Stage 0{idx + 1}
                            </span>
                            {isComplete ? (
                              <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-[#4A5D4E]'}`} />
                            ) : (
                              <Clock className="w-4 h-4 text-[#A7B3A2]" />
                            )}
                          </div>

                          <h5 className={`text-xs font-bold ${isCurrent ? 'text-white' : 'text-[#4A5D4E]'}`}>
                            {step.stage}
                          </h5>
                          <p className={`text-[11px] mt-1 leading-snug ${isCurrent ? 'text-[#E8EAE3]' : 'text-[#2D3436]/60'}`}>
                            {step.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviewer Comments & Interview Actions Box */}
                <div className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E8EAE3] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#4A5D4E]" />
                      <span>Admissions Committee Notes</span>
                    </h4>
                    <span className="text-[11px] text-[#4A5D4E] font-semibold">
                      Scholarship: ${trackedApplication.estimatedAid.toLocaleString()}/yr
                    </span>
                  </div>

                  <p className="text-xs text-[#2D3436]/80 leading-relaxed bg-white p-3.5 rounded-xl border border-[#E8EAE3]">
                    "{trackedApplication.reviewerNotes || 'Your dossier is currently assigned to the faculty evaluating committee.'}"
                  </p>

                  {trackedApplication.interviewDate && (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4F1EA] border border-[#E8EAE3] text-xs">
                      <span className="font-semibold text-[#4A5D4E]">
                        Scheduled Interview: {trackedApplication.interviewDate}
                      </span>
                      <button
                        onClick={() => addToast({ type: 'info', title: 'Calendar Invite', message: 'Interview details sent to your registered email.' })}
                        className="px-3 py-1 bg-[#4A5D4E] text-white rounded-lg font-bold text-[11px]"
                      >
                        Add to Calendar
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#E8EAE3] space-y-3">
                <p className="text-sm font-semibold text-[#A7B3A2]">Enter your Reference ID above to track your application.</p>
              </div>
            )}

          </div>

        )}

      </section>

    </div>
  );
};
