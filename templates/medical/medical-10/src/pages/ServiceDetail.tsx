import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, CheckCircle2, Calendar, FileText } from 'lucide-react';
import { SERVICES } from '../data/services';
import { DOCTORS } from '../data/doctors';
import { DoctorCard } from '../components/ui/DoctorCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug || s.id === slug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Service Not Found</h2>
        <p className="text-slate-600">The clinical service you requested could not be located.</p>
        <Link to="/services">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Services
          </Button>
        </Link>
      </div>
    );
  }

  const assignedDoctors = DOCTORS.filter(d => d.departmentId === service.departmentId || d.servicesOffered.some(so => so.toLowerCase().includes(service.title.toLowerCase()))).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Clinical Services</span>
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              {service.category}
            </Badge>
            <Badge variant="secondary" size="md">
              {service.departmentName}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{service.title}</h1>
          <p className="text-slate-600 text-base leading-relaxed">{service.fullDescription}</p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Estimated Duration</p>
                <p className="font-bold text-slate-900">{service.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
              <Tag className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-xs text-slate-400 font-medium">Price Estimate</p>
                <p className="font-bold text-slate-900">{service.priceEstimate}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Patient Preparation Instructions
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {service.preparationInstructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link to={`/appointments?serviceId=${service.id}`}>
              <Button variant="primary" size="lg" className="shadow-glow" leftIcon={<Calendar className="w-5 h-5" />}>
                Book This Service
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-lg h-full min-h-[300px]">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {assignedDoctors.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Physicians Offering This Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assignedDoctors.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
