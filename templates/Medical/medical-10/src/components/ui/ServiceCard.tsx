import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../../data/services';
import { Button } from './Button';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-soft">
          {service.category}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {service.shortDescription}
          </p>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {service.duration}
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Tag className="w-3.5 h-3.5 text-secondary" />
              {service.priceEstimate}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <Link to={`/services/${service.slug}`}>
            <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
