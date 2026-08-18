import React from 'react';
import { Service } from '../types';
import {
  Heart,
  BrainCircuit,
  ActivitySquare,
  ShieldAlert,
  Smile,
  Sparkles,
  Check,
  Clock,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  onBookService: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  onBookService
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#3157D5]" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-[#7567E8]" />;
      case 'ActivitySquare':
        return <ActivitySquare className="w-5 h-5 text-[#28B8D4]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-[#E5484D]" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-amber-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-rose-500" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#3157D5]" />;
    }
  };

  return (
    <section id="services-section" className="py-16 lg:py-24 bg-[#F6F8FC] border-b border-[#E4E9F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3157D5]/10 text-[#3157D5] text-xs font-bold uppercase tracking-wide mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Integrated Clinical Offerings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#15213D] tracking-tight">
            Comprehensive Medical Services
          </h2>
          <p className="text-sm sm:text-base text-[#667085] mt-3 leading-relaxed">
            From preventative screenings and robotic surgery to emergency trauma interventions, our services deliver compassionate, patient-first excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E4E9F2] hover:border-[#3157D5]/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F6F8FC] border border-[#E4E9F2] flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-[#667085] bg-[#F6F8FC] px-2.5 py-1 rounded-lg border border-[#E4E9F2] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3157D5]" />
                    {service.estimatedDuration}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#15213D] mb-2 leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed mb-5">
                  {service.shortDescription}
                </p>

                {/* Key Features Bullets */}
                <ul className="space-y-2 mb-6">
                  {service.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#15213D]">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E4E9F2] flex items-center gap-2">
                <button
                  id={`service-details-btn-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-[#15213D] bg-[#F6F8FC] hover:bg-[#EEF3FA] border border-[#E4E9F2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#3157D5]" />
                </button>
                <button
                  id={`service-book-btn-${service.id}`}
                  onClick={() => onBookService(service)}
                  className="py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] transition-colors cursor-pointer"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
