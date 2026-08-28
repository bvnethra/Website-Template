'use client';

import React from 'react';
import Link from 'next/link';
import { QUICK_ACTIONS } from '@/lib/constants';
import { Pill, Upload, FlaskConical, Stethoscope, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pill: Pill,
  upload: Upload,
  flask: FlaskConical,
  stethoscope: Stethoscope,
};

export function QuickHealthActions() {
  return (
    <section className="container-page py-8 lg:py-12" aria-labelledby="quick-actions-heading">
      <h2 id="quick-actions-heading" className="sr-only">Quick Health Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {QUICK_ACTIONS.map((action) => {
          const Icon = iconMap[action.icon] || Pill;
          
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative rounded-2xl overflow-hidden border border-brand-border bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[180px] lg:h-[200px]"
            >
              {/* Decorative Background Gradient Spot */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-navy-50 opacity-40 group-hover:scale-150 transition-transform duration-500" />
              
              <div>
                {/* Icon Container with Gradient */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4 shadow-sm`}>
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                
                {/* Text Content */}
                <h3 className="text-base font-bold text-navy-900 group-hover:text-mint-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-navy-500 mt-1.5 leading-relaxed pr-4">
                  {action.description}
                </p>
              </div>

              {/* Bottom Row: Link indicator */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-mint-600 mt-auto z-10">
                <span>Access Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
