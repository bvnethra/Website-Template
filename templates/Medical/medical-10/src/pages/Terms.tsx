import React from 'react';
import { Badge } from '../components/ui/Badge';

export const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2">
        <Badge variant="primary" size="md">
          Terms of Service Agreement
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-xs text-slate-500">Effective Date: January 1, 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft space-y-6 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>By accessing or utilizing the CareNova Health Platform, scheduling appointments, or registering a patient portal account, you agree to be bound by these Terms of Service.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. Emergency Medical Disclaimer</h2>
          <p>CareNova digital telehealth platforms and scheduling tools are NOT for acute, life-threatening medical emergencies. If you suspect a stroke, heart attack, or major trauma, call emergency services (911) immediately.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Cancellation & Rescheduling</h2>
          <p>Appointments may be rescheduled or cancelled up to 24 hours prior to the scheduled slot without penalty through your Patient Dashboard.</p>
        </section>
      </div>
    </div>
  );
};
