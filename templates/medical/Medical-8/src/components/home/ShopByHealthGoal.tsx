'use client';

import React from 'react';
import Link from 'next/link';
import { healthGoals } from '@/data/categories';
import {
  Moon,
  Shield,
  Leaf,
  Droplet,
  Heart,
  Activity,
  Sparkles,
  Flower2,
  Zap,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  moon: Moon,
  shield: Shield,
  leaf: Leaf,
  droplet: Droplet,
  heart: Heart,
  bone: Activity, // representation for bones
  sparkle: Sparkles,
  flower: Flower2,
  bolt: Zap,
};

export function ShopByHealthGoal() {
  return (
    <section className="container-page py-10 lg:py-14 border-t border-brand-border bg-brand-bg" aria-labelledby="goals-heading">
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2 id="goals-heading" className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">
          Shop by Health Goal
        </h2>
        <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
          Targeted solutions designed to support your personal wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
        {healthGoals.map((goal) => {
          const Icon = iconMap[goal.icon] || Heart;
          
          return (
            <Link
              key={goal.id}
              href={`/category/nutrition?goal=${goal.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white p-5 sm:p-6 border border-brand-border hover:border-mint-500/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[160px] sm:min-h-[180px]"
            >
              {/* Colored gradient line at top */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${goal.color}`} />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  {/* Icon with light gray bg that on hover scales and matches gradient */}
                  <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-700 flex items-center justify-center group-hover:bg-mint-50 group-hover:text-mint-600 transition-colors">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                </div>
                
                <h3 className="text-sm sm:text-base font-bold text-navy-900 group-hover:text-mint-600 transition-colors">
                  {goal.name}
                </h3>
                <p className="text-xs text-navy-500 mt-1 line-clamp-2 leading-relaxed">
                  {goal.description}
                </p>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-1 text-[11px] font-bold text-mint-600 mt-4">
                <span>View Products</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
