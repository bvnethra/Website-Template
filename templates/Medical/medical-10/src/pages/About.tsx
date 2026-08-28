import React from 'react';
import { ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="bg-gradient-to-r from-slate-900 via-primary-900 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <Badge variant="primary" size="md" className="bg-blue-900/60 text-blue-200 border-blue-700">
            About CareNova Health
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Better Care. Smarter Health.</h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Founded with a vision to redefine modern medical practice, CareNova Health bridges world-class clinical expertise with technology-driven patient convenience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To deliver accessible, evidence-based, human-centered healthcare across every stage of life—empowering patients with proactive wellness and transparent clinical outcomes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-secondary flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To set the international benchmark for integrated digital health networks, seamlessly combining hospital care, outpatient specialty clinics, and 24/7 virtual care.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900">Core Values That Drive Us</h2>
          <p className="text-slate-600 text-sm mt-1">Guided by integrity, clinical excellence, and patient empathy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Compassionate Care', desc: 'Putting patient dignity and comfort at the center of every decision.' },
            { title: 'Clinical Rigor', desc: 'Adhering to strict evidence-based protocols and medical guidelines.' },
            { title: 'Digital Innovation', desc: 'Utilizing telemetry, AI diagnostics, and seamless online portals.' },
            { title: 'Community Trust', desc: 'Fostering long-term wellness relationships spanning generations.' }
          ].map((val, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <h3 className="font-bold text-slate-900 text-base">{val.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold text-slate-900">Executive Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: 'Dr. Sarah Jenkins', role: 'Chief Medical Officer', avatar: '/images/doctors/dr-sarah-jenkins.jpg' },
            { name: 'Dr. Marcus Vance', role: 'Director of Clinical Research', avatar: '/images/doctors/dr-marcus-vance.jpg' },
            { name: 'Dr. Amara Chen', role: 'Head of Pediatric Services', avatar: '/images/doctors/dr-amara-chen.jpg' }
          ].map((lead, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft text-center space-y-3">
              <img src={lead.avatar} alt={lead.name} className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-slate-100" />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{lead.name}</h3>
                <p className="text-xs text-primary font-semibold">{lead.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
