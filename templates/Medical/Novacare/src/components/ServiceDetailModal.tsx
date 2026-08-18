import React from 'react';
import { Service } from '../types';
import {
  X,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Stethoscope,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService
}) => {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id={`service-dialog-${service.id}`}
        className="relative bg-white rounded-3xl shadow-2xl border border-[#E4E9F2] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#15213D] via-[#2443AE] to-[#3157D5] p-6 text-white relative">
          <button
            id="close-service-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Service Details"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block text-[11px] font-semibold text-[#28B8D4] uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-md mb-2">
            {service.category}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            {service.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {service.fullDescription}
          </p>

          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-200">
            <Clock className="w-4 h-4 text-[#28B8D4]" />
            <span>Estimated Duration: <strong>{service.estimatedDuration}</strong></span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-5 max-h-[calc(85vh-200px)] overflow-y-auto">
          
          {/* Key Clinical Features */}
          <div>
            <h3 className="text-sm font-bold text-[#15213D] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#3157D5]" />
              Clinical Inclusions & Capabilities
            </h3>
            <div className="space-y-2">
              {service.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F8FC] border border-[#E4E9F2]"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-[#15213D]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Preparation Instructions */}
          {service.preparationTips.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Patient Preparation Guidelines
              </h3>
              <ul className="space-y-1.5">
                {service.preparationTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-amber-950 flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-[#F6F8FC] border-t border-[#E4E9F2] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#667085] hover:text-[#15213D]"
          >
            Close
          </button>
          <button
            id={`book-service-${service.id}-btn`}
            onClick={() => {
              onClose();
              onBookService(service);
            }}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2443AE] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-[#3157D5]/20"
          >
            <Calendar className="w-4 h-4" />
            <span>Book This Service</span>
          </button>
        </div>

      </div>
    </div>
  );
};
