import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Brain,
  Baby,
  Sparkles,
  Activity,
  Smile,
  Eye,
  UserCheck,
  Stethoscope,
  Zap,
  SmilePlus,
  ShieldAlert,
  ArrowRight,
  Users
} from 'lucide-react';
import type { Department } from '../../data/departments';

interface DepartmentCardProps {
  department: Department;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Heart,
  Brain,
  Baby,
  Sparkles,
  Activity,
  Smile,
  Eye,
  UserCheck,
  Stethoscope,
  Zap,
  SmilePlus,
  ShieldAlert
};

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const IconComponent = ICON_MAP[department.iconName] || Stethoscope;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="relative h-40 overflow-hidden">
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
        
        <div className="absolute top-4 left-4 w-11 h-11 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center text-primary shadow-soft">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-white/90 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          <Users className="w-3.5 h-3.5 text-secondary" />
          <span>{department.specialistCount} Specialists</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-xl group-hover:text-primary transition-colors">
            {department.name}
          </h3>
          <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {department.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {department.featuredServices.slice(0, 3).map((srv, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-lg">
                {srv}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Link
            to={`/departments/${department.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary-700 transition-colors"
          >
            <span>Explore Department</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
