import React from 'react';
import { Badge } from '../components/ui/Badge';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <Badge variant="primary" size="md">
          HIPAA & Data Privacy Notice
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: January 1, 2026 | Last Updated: August 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-6 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
          <p>CareNova Health System collects personal health information (PHI) when you register a patient profile, schedule consultations, request prescription renewals, or submit contact forms. This includes contact details, demographic information, insurance details, and medical history.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. Compliance with HIPAA Regulations</h2>
          <p>All electronic protected health information (ePHI) handled via the CareNova platform is encrypted using AES-256 standards in transit and at rest in accordance with the Health Insurance Portability and Accountability Act (HIPAA).</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Data Sharing & Third Parties</h2>
          <p>We strictly do not sell, rent, or trade patient personal health data. Information is disclosed only to accredited medical labs, operating specialists, and insurance payors as necessary for medical treatment and billing.</p>
        </section>
      </div>
    </div>
  );
};
