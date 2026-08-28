'use client';

import React from 'react';
import { TRUST_BADGES } from '@/lib/constants';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': ShieldCheck,
  'truck': Truck,
  'rotate-ccw': RotateCcw,
  'lock': Lock,
};

export function TrustBadges() {
  return (
    <section className="bg-navy-950 text-white py-12 border-t border-navy-800" aria-label="Our Guarantees">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_BADGES.map((badge) => {
            const Icon = iconMap[badge.icon] || ShieldCheck;
            
            return (
              <div key={badge.label} className="flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-navy-900 border border-navy-800 flex items-center justify-center text-mint-400 mb-4 shadow-inner">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {badge.label}
                </h3>
                <p className="text-xs text-navy-400 mt-1.5 leading-relaxed max-w-[200px]">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
