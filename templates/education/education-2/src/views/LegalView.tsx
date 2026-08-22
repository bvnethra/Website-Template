import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LegalViewProps {
  initialTab?: string;
  onNavigate: (route: string, param?: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = 'privacy', onNavigate }) => {
  const { theme, config } = useTheme();
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
          Governance & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
          Legal Policies, Privacy & Accreditation
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Institutional statements on data privacy, equal opportunity non-discrimination, accreditation compliance, and terms of service.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'privacy', label: 'Privacy & FERPA' },
          { id: 'terms', label: 'Terms of Use' },
          { id: 'accreditation', label: 'NECHE Accreditation' },
          { id: 'accessibility', label: 'Digital Accessibility' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-sans font-bold text-slate-900">Family Educational Rights and Privacy Act (FERPA)</h2>
            <p>
              Edunexa University complies strictly with the Family Educational Rights and Privacy Act (FERPA) of 1974. Student educational records, transcripts, financial aid evaluations, and disciplinary proceedings are strictly confidential.
            </p>
            <p>
              Information collected via admissions inquiry forms, digital net price calculators, and campus visit bookings is protected by 256-bit encryption and is never leased, sold, or shared with third-party advertising brokers.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-sans font-bold text-slate-900">Institutional Terms of Use</h2>
            <p>
              All materials published on the Edunexa University portal, including course syllabi, faculty research publications, photographs, and institutional seals, are protected under United States and international copyright statutes.
            </p>
            <p>
              Prospective students and applicants agree to provide authentic, verifiable academic transcripts and biographical data under the Edunexa University Honor Code.
            </p>
          </div>
        )}

        {activeTab === 'accreditation' && (
          <div className="space-y-4">
            <h2 className="text-xl font-sans font-bold text-slate-900">Accreditations & Regulatory Authority</h2>
            <p>
              Edunexa University is accredited by the New England Commission of Higher Education (NECHE), the regional accrediting body recognized by the Council for Higher Education Accreditation (CHEA) and the U.S. Department of Education.
            </p>
            <p>
              Professional degree programs carry specialized program accreditations from ABET (Engineering and Computing), AACSB (Business Administration), and the American Bar Association (Law).
            </p>
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div className="space-y-4">
            <h2 className="text-xl font-sans font-bold text-slate-900">Digital Accessibility Commitment (WCAG 2.1 AA)</h2>
            <p>
              Edunexa is dedicated to digital equity and accessibility. Our portal adheres to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA benchmarks, supporting screen readers, keyboard navigation, and high-contrast color fidelity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
