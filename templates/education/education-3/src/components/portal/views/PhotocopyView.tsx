import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useApp } from '../../../context/AppContext';
import { PhotocopyRequest, PhotocopySubjectItem } from '../../../types/auth';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';

export const PhotocopyView: React.FC = () => {
  const { photocopyRequests, resultsData, submitPhotocopyRequest } = useAuth();
  const { addToast } = useApp();

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [activeViewerModal, setActiveViewerModal] = useState<PhotocopySubjectItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available subjects for photocopy from previous semester results (Sem 5)
  const sem5Subjects = resultsData.find(r => r.semester === 5)?.subjects || [];

  const toggleSubject = (code: string) => {
    if (selectedSubjects.includes(code)) {
      setSelectedSubjects(selectedSubjects.filter(c => c !== code));
    } else {
      setSelectedSubjects([...selectedSubjects, code]);
    }
  };

  const handleApplyPhotocopy = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0) {
      addToast({
        type: 'error',
        title: 'Subject Required',
        message: 'Please choose at least one course for answer booklet photocopy.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      submitPhotocopyRequest(selectedSubjects);
      setSelectedSubjects([]);
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Photocopy Application Submitted',
        message: `Dispatched digital scan request for ${selectedSubjects.length} subjects. Scans available within 48 hours.`
      });
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h2 className="font-heading text-2xl font-bold text-[#0D2F2F]">
          Evaluated Answer Booklet Photocopy Portal
        </h2>
        <p className="text-xs sm:text-sm text-[#4A5D4E]">
          Apply for high-resolution scanned copies of your evaluated End-Semester answer scripts with examiner rubrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Apply for Photocopy Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Apply for Answer Script Photocopy (Semester V)
            </h3>
            <p className="text-xs text-[#4A5D4E]">
              Fee: $20.00 per subject booklet. Digital scans will be hosted securely in your Student Vault.
            </p>

            <form onSubmit={handleApplyPhotocopy} className="space-y-3">
              <div className="space-y-2">
                {sem5Subjects.map((sub) => {
                  const isChecked = selectedSubjects.includes(sub.code);
                  return (
                    <div
                      key={sub.code}
                      onClick={() => toggleSubject(sub.code)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#FDFBF7] border-[#0D2F2F] shadow-xs'
                          : 'bg-white border-[#E8EAE3] hover:border-[#DDD8CE]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#0D2F2F] focus:ring-[#0D2F2F]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#0D2F2F] bg-[#F4F1EA] px-2 py-0.5 rounded">
                              {sub.code}
                            </span>
                            <span className="text-xs font-bold text-[#0D2F2F]">{sub.name}</span>
                          </div>
                          <span className="text-[11px] text-[#4A5D4E] mt-0.5 block">
                            Awarded: {sub.totalMarks}/100 (Grade: {sub.letterGrade})
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-xs text-[#0D2F2F]">$20.00</span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E8EAE3] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0D2F2F]">
                  Selected: {selectedSubjects.length} subject(s) • Total: ${selectedSubjects.length * 20}.00
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting || selectedSubjects.length === 0}
                  className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Apply & Pay (${selectedSubjects.length * 20}.00)</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#FF6B4A]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right 5 Cols: Active Scanned Scripts & Download Status */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 border border-[#E8EAE3] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#0D2F2F]">
              Your Evaluated Answer Booklets
            </h3>
            <p className="text-xs text-[#4A5D4E]">
              Scanned booklets available for scrutiny & revaluation evaluation.
            </p>

            <div className="space-y-3">
              {photocopyRequests.flatMap(req => req.subjects).map((item) => (
                <div
                  key={item.code}
                  className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E8EAE3] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold bg-[#0D2F2F] text-white px-2.5 py-0.5 rounded">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#0D2F2F]">{item.name}</h4>
                    <p className="text-[11px] text-[#4A5D4E] mt-1 line-clamp-2">
                      {item.examinerNotes || 'Scanned booklet verified by Central Evaluation Cell.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[#E8EAE3]">
                    <button
                      onClick={() => setActiveViewerModal(item)}
                      className="flex-1 py-2 bg-[#0D2F2F] hover:bg-[#082020] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#FF6B4A]" />
                      <span>View Scored Booklet</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Answer Script Viewer Modal */}
      {activeViewerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#DDD8CE] shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
            
            <button
              onClick={() => setActiveViewerModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#4A5D4E] hover:bg-[#F4F1EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E8EAE3] pb-4">
              <span className="text-[10px] font-mono text-[#4A5D4E] uppercase block font-bold">
                EDUVORA CONTROLLER OF EXAMINATIONS • OFFICIAL SCANNED ANSWER BOOKLET
              </span>
              <h3 className="font-heading text-lg font-bold text-[#0D2F2F] mt-1">
                {activeViewerModal.code} — {activeViewerModal.name}
              </h3>
            </div>

            {/* Question Wise Score Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#0D2F2F] uppercase tracking-wider">
                Examiner Marks Distribution & Question Rubric
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-[#E8EAE3]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F4F1EA] text-[#0D2F2F]">
                    <tr>
                      <th className="py-2.5 px-3.5 font-bold">Section / Question</th>
                      <th className="py-2.5 px-3.5 font-bold text-center">Max Marks</th>
                      <th className="py-2.5 px-3.5 font-bold text-center">Awarded</th>
                      <th className="py-2.5 px-3.5 font-bold">Evaluator Rubric Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8EAE3]">
                    {activeViewerModal.questionScores?.map((q) => (
                      <tr key={q.qNo}>
                        <td className="py-2.5 px-3.5 font-semibold text-[#0D2F2F]">{q.qNo}</td>
                        <td className="py-2.5 px-3.5 text-center font-mono text-[#4A5D4E]">{q.maxMarks}</td>
                        <td className="py-2.5 px-3.5 text-center font-mono font-bold text-[#0D2F2F]">{q.awardedMarks}</td>
                        <td className="py-2.5 px-3.5 text-[#4A5D4E]">{q.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Simulated Booklet Scanned Pages Preview Box */}
            <div className="p-6 bg-[#FDFBF7] rounded-2xl border-2 border-dashed border-[#DDD8CE] text-center space-y-3">
              <FileText className="w-10 h-10 text-[#0D2F2F] mx-auto" />
              <h4 className="font-heading text-sm font-bold text-[#0D2F2F]">
                Digital Answer Script Preview (24 Verified Pages)
              </h4>
              <p className="text-xs text-[#4A5D4E] max-w-md mx-auto">
                Official red-ink evaluated manuscript with Chief Examiner validation watermark stamp.
              </p>
              <button
                onClick={() => {
                  addToast({
                    type: 'success',
                    title: 'Scanned Manuscript Downloaded',
                    message: `Downloaded full scanned answer booklet for ${activeViewerModal.code}.`
                  });
                }}
                className="bg-[#0D2F2F] hover:bg-[#082020] text-white px-5 py-2.5 rounded-xl font-bold text-xs inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#FF6B4A]" />
                <span>Download Full Script PDF (4.8 MB)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
