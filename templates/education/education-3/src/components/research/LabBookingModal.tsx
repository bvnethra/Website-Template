import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  FlaskConical, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Building, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Upload,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { RESEARCH_CENTERS_DATA } from '../../data/mockResearchData';
import { useApp } from '../../context/AppContext';
import { LabBookingRequest } from '../../types';

interface LabBookingModalProps {
  isOpen: boolean;
  initialCenterId?: string;
  onClose: () => void;
  onSuccessSubmission?: (newBooking: LabBookingRequest) => void;
}

export const LabBookingModal: React.FC<LabBookingModalProps> = ({
  isOpen,
  initialCenterId,
  onClose,
  onSuccessSubmission,
}) => {
  const { addToast } = useApp();

  const [centerId, setCenterId] = useState<string>(initialCenterId || RESEARCH_CENTERS_DATA[0].id);
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [facility, setFacility] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 01:00 PM)');
  const [date, setDate] = useState('2026-09-25');
  const [proposalTitle, setProposalTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [equipmentList, setEquipmentList] = useState<string[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRequest, setConfirmedRequest] = useState<LabBookingRequest | null>(null);

  // Available facilities based on selected center
  const currentCenter = RESEARCH_CENTERS_DATA.find(c => c.id === centerId) || RESEARCH_CENTERS_DATA[0];

  useEffect(() => {
    if (initialCenterId) {
      setCenterId(initialCenterId);
    }
  }, [initialCenterId]);

  useEffect(() => {
    if (currentCenter.facilities.length > 0) {
      setFacility(currentCenter.facilities[0]);
    }
  }, [centerId]);

  if (!isOpen) return null;

  const equipmentOptions = [
    'NVIDIA H100 GPU Cluster Access (Slurm queue)',
    '10-mK Dilution Refrigerator Cryostat',
    'Illumina NovaSeq X Next-Gen Sequencer',
    'Class-100 Cleanroom Biological Flow Hood',
    'Gamry Reference 3000 Potentiostat & EIS',
    'Atomic Force / Electron Beam Microscope',
    'Atmospheric Gas Chromatography Analyzer',
    'Cryogenic Bio-Repository Storage (-196°C)'
  ];

  const handleEquipmentToggle = (item: string) => {
    if (equipmentList.includes(item)) {
      setEquipmentList(equipmentList.filter(e => e !== item));
    } else {
      setEquipmentList([...equipmentList, item]);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!applicantName.trim()) errs.applicantName = 'Applicant name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid academic or institution email is required';
    if (!department.trim()) errs.department = 'Department / Affiliation is required';
    if (!proposalTitle.trim()) errs.proposalTitle = 'Research proposal title is required';
    if (!abstract.trim() || abstract.length < 20) errs.abstract = 'Please provide a brief technical abstract (min. 20 chars)';
    if (!facility) errs.facility = 'Please select a specific lab facility';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `LAB-REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking: LabBookingRequest = {
        id: generatedId,
        applicantName,
        email,
        department,
        centerId,
        facility,
        timeSlot,
        date,
        proposalTitle,
        abstract,
        equipmentNeeded: equipmentList.length > 0 ? equipmentList : ['General Cleanroom Bench Access'],
        status: 'Pending Review',
        submittedAt: new Date().toISOString().split('T')[0],
      };

      setConfirmedRequest(newBooking);
      setIsSubmitting(false);

      if (onSuccessSubmission) {
        onSuccessSubmission(newBooking);
      }

      addToast({
        type: 'success',
        title: 'Proposal & Lab Booking Received',
        message: `Your request #${generatedId} has been logged. The laboratory director will review prerequisites within 48 hours.`,
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setConfirmedRequest(null);
    setApplicantName('');
    setEmail('');
    setDepartment('');
    setProposalTitle('');
    setAbstract('');
    setEquipmentList([]);
    setUploadedFileName(null);
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-[#2C382E]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-[#FDFBF7] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#E8EAE3] overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="px-6 py-5 bg-[#F4F1EA] border-b border-[#E8EAE3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center shadow-xs">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#4A5D4E] uppercase tracking-wider block">
                  Eduvora Research Infrastructure Office
                </span>
                <h3 id="booking-modal-title" className="text-xl font-bold font-heading text-[#2D3436]">
                  Grant & Lab Access Request Portal
                </h3>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-xl text-[#A7B3A2] hover:text-[#4A5D4E] hover:bg-[#E8EAE3] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            
            {confirmedRequest ? (
              /* CONFIRMATION STATE */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-[#4A5D4E] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9 text-[#E8EAE3]" />
                </div>

                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F4F1EA] text-[#4A5D4E] uppercase tracking-wider inline-block">
                    Submission Confirmed
                  </span>
                  <h4 className="text-2xl font-bold font-heading text-[#2D3436]">
                    Research Proposal & Booking Docket Created
                  </h4>
                  <p className="text-xs text-[#2D3436]/70 max-w-md mx-auto">
                    Your application has been routed to the Academic Research Review Board and Laboratory Lead.
                  </p>
                </div>

                {/* Docket Summary Card */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8EAE3] text-left space-y-3.5 max-w-lg mx-auto shadow-xs text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8EAE3]">
                    <span className="font-semibold text-[#A7B3A2]">Tracking Reference:</span>
                    <strong className="font-mono text-sm font-bold text-[#4A5D4E] bg-[#F4F1EA] px-2.5 py-0.5 rounded-md">
                      {confirmedRequest.id}
                    </strong>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[#A7B3A2] block">Principal Applicant</span>
                      <strong className="text-[#2D3436] font-semibold">{confirmedRequest.applicantName}</strong>
                    </div>
                    <div>
                      <span className="text-[#A7B3A2] block">Target Facility</span>
                      <strong className="text-[#2D3436] font-semibold">{confirmedRequest.facility}</strong>
                    </div>
                    <div>
                      <span className="text-[#A7B3A2] block">Scheduled Window</span>
                      <strong className="text-[#2D3436] font-semibold">{confirmedRequest.date} ({confirmedRequest.timeSlot.split(' ')[0]})</strong>
                    </div>
                    <div>
                      <span className="text-[#A7B3A2] block">Initial Status</span>
                      <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        <span>{confirmedRequest.status}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E8EAE3]">
                    <span className="text-[#A7B3A2] block">Investigation Title:</span>
                    <p className="font-bold text-[#2D3436] mt-0.5">{confirmedRequest.proposalTitle}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2"
                  >
                    <span>Done & Return to Research Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* INTERACTIVE FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Notice Banner */}
                <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E8EAE3] flex items-start gap-3 text-xs text-[#2D3436]/90">
                  <ShieldCheck className="w-5 h-5 text-[#4A5D4E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-[#4A5D4E] block">Open Access for Eduvora Faculty, Ph.D. Fellows & External Partners</strong>
                    <span>All requests require laboratory safety orientation compliance. Sponsored grant allocations are prioritized.</span>
                  </div>
                </div>

                {/* Section 1: Center & Facility Selection */}
                <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E8EAE3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                    <Building className="w-4 h-4" />
                    <span>Target Research Center & Facility</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1.5">
                        Research Center <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={centerId}
                        onChange={(e) => setCenterId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] text-xs font-semibold text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                      >
                        {RESEARCH_CENTERS_DATA.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1.5">
                        Specific Lab Facility <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={facility}
                        onChange={(e) => setFacility(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] text-xs font-semibold text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                      >
                        {currentCenter.facilities.map((fac, idx) => (
                          <option key={idx} value={fac}>{fac}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1.5">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        min="2026-08-25"
                        max="2027-05-30"
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] text-xs font-semibold text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1.5">
                        Operational Time Slot <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8EAE3] bg-[#FDFBF7] text-xs font-semibold text-[#2D3436] focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                      >
                        <option value="Morning (09:00 AM - 01:00 PM)">Morning (09:00 AM - 01:00 PM)</option>
                        <option value="Afternoon (02:00 PM - 06:00 PM)">Afternoon (02:00 PM - 06:00 PM)</option>
                        <option value="Full Day (09:00 AM - 06:00 PM)">Full Day (09:00 AM - 06:00 PM)</option>
                        <option value="Overnight Batch (08:00 PM - 08:00 AM)">Overnight Batch (08:00 PM - 08:00 AM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Scholar / Applicant Details */}
                <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#E8EAE3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Scholar & Project Information</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1">
                        Principal Applicant Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Maya Lin / Alex Chen"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium bg-[#FDFBF7] focus:outline-none ${
                          errors.applicantName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E8EAE3] focus:ring-2 focus:ring-[#4A5D4E]'
                        }`}
                      />
                      {errors.applicantName && <p className="text-[11px] text-red-600 mt-0.5">{errors.applicantName}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1">
                        Institutional Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="scholar@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium bg-[#FDFBF7] focus:outline-none ${
                          errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E8EAE3] focus:ring-2 focus:ring-[#4A5D4E]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#2D3436] block mb-1">
                        Department / Affiliation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BioInformatics Lab"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium bg-[#FDFBF7] focus:outline-none ${
                          errors.department ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E8EAE3] focus:ring-2 focus:ring-[#4A5D4E]'
                        }`}
                      />
                      {errors.department && <p className="text-[11px] text-red-600 mt-0.5">{errors.department}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D3436] block mb-1">
                      Investigation / Grant Proposal Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Single-Cell Spatial Mapping of Glioblastoma Microenvironment"
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium bg-[#FDFBF7] focus:outline-none ${
                        errors.proposalTitle ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E8EAE3] focus:ring-2 focus:ring-[#4A5D4E]'
                      }`}
                    />
                    {errors.proposalTitle && <p className="text-[11px] text-red-600 mt-0.5">{errors.proposalTitle}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D3436] block mb-1">
                      Technical Abstract & Methodology Summary <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Summarize scientific objectives, experimental methodology, safety precautions, and expected outcome..."
                      value={abstract}
                      onChange={(e) => setAbstract(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-medium bg-[#FDFBF7] focus:outline-none ${
                        errors.abstract ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[#E8EAE3] focus:ring-2 focus:ring-[#4A5D4E]'
                      }`}
                    />
                    {errors.abstract && <p className="text-[11px] text-red-600 mt-0.5">{errors.abstract}</p>}
                  </div>
                </div>

                {/* Section 3: Specialized Equipment Checkboxes */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#E8EAE3]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A5D4E] flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>Specialized Hardware & Instrument Access</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {equipmentOptions.map((item, idx) => {
                      const isChecked = equipmentList.includes(item);
                      return (
                        <label
                          key={idx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                            isChecked
                              ? 'bg-[#F4F1EA] border-[#4A5D4E] font-semibold text-[#4A5D4E]'
                              : 'bg-[#FDFBF7] border-[#E8EAE3] text-[#2D3436]/80 hover:bg-[#F4F1EA]/60'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleEquipmentToggle(item)}
                            className="w-4 h-4 rounded text-[#4A5D4E] focus:ring-[#4A5D4E] accent-[#4A5D4E]"
                          />
                          <span>{item}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Proposal PDF Upload */}
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-dashed border-[#A7B3A2] text-center space-y-2">
                  <Upload className="w-6 h-6 text-[#4A5D4E] mx-auto" />
                  <div className="text-xs font-medium text-[#2D3436]">
                    {uploadedFileName ? (
                      <span className="font-bold text-[#4A5D4E]">{uploadedFileName} (Ready for submission)</span>
                    ) : (
                      <>Attach Formal Grant Dossier or IRB Protocol (PDF/DOCX max 25MB)</>
                    )}
                  </div>
                  <label className="inline-block px-3 py-1 bg-white border border-[#E8EAE3] text-[11px] font-bold text-[#4A5D4E] rounded-lg cursor-pointer hover:bg-[#F4F1EA]">
                    Browse Files
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Form Actions */}
                <div className="pt-3 border-t border-[#E8EAE3] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-4 py-2.5 text-xs font-bold text-[#2D3436]/70 hover:text-[#4A5D4E] transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#4A5D4E] hover:bg-[#3B4B3F] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Generating Docket...</span>
                    ) : (
                      <>
                        <span>Submit Research Proposal & Reserve Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
