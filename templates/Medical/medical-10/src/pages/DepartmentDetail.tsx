import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, CheckCircle2, ChevronDown, User } from 'lucide-react';
import { DEPARTMENTS } from '../data/departments';
import { DOCTORS } from '../data/doctors';
import { DoctorCard } from '../components/ui/DoctorCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const DepartmentDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const dept = DEPARTMENTS.find(d => d.slug === slug || d.id === slug);

  if (!dept) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Department Not Found</h2>
        <p className="text-slate-600">The requested medical department could not be found.</p>
        <Link to="/departments">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Departments
          </Button>
        </Link>
      </div>
    );
  }

  const departmentDoctors = DOCTORS.filter(d => d.departmentId === dept.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link to="/departments" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Departments</span>
      </Link>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
        <div className="relative h-80 sm:h-96">
          <img src={dept.image} alt={dept.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 text-white space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="md" className="bg-blue-900/80 text-blue-200 border-blue-700">
              Department of Excellence
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Users className="w-3.5 h-3.5 text-secondary" />
              {dept.specialistCount} Board Specialists
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold">{dept.name}</h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">{dept.shortDescription}</p>

          <div className="pt-2">
            <Link to={`/appointments?departmentId=${dept.id}`}>
              <Button variant="primary" size="lg" className="shadow-glow" leftIcon={<Calendar className="w-5 h-5" />}>
                Book Department Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">About {dept.name} Care</h2>
          <p className="text-slate-600 text-base leading-relaxed">{dept.fullDescription}</p>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-3">Key Specialized Care Offerings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dept.featuredServices.map((srv, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-800 text-sm">{srv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
          <h3 className="font-bold text-slate-900 text-xl">Department Head</h3>
          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-primary flex items-center justify-center font-bold text-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{dept.headDoctorName}</p>
              <p className="text-xs text-slate-500">Chief of {dept.name}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
            <div className="flex justify-between">
              <span className="text-slate-400">Emergency Support:</span>
              <span className="font-bold text-slate-900">Available 24/7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="font-bold text-slate-900">CareNova Central Hub</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Department Specialists</h2>
          <p className="text-slate-600 text-sm mt-1">Consult with physicians attached to the {dept.name} division.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentDoctors.map(doc => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </div>

      {dept.faqs.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {dept.faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200/80 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 text-sm hover:text-primary transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-slate-600 text-xs leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
