'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';
import { MOBILE_NAV_ITEMS } from '@/lib/constants';
import { Home, LayoutGrid, Package, HeartPulse, User, ShoppingCart } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-5 h-5" />,
  grid: <LayoutGrid className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
  'heart-pulse': <HeartPulse className="w-5 h-5" />,
  user: <User className="w-5 h-5" />,
};

export function BottomNavigation() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[40] bg-white border-t border-brand-border px-4 py-2 shadow-lg">
      <nav className="flex justify-between items-center max-w-md mx-auto">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-mint-600 font-semibold'
                  : 'text-navy-500 hover:text-navy-800'
              }`}
            >
              {iconMap[item.icon]}
              <span className="text-[10px] tracking-tight">{item.label}</span>
              
              {/* Optional indicator dots or special active styling */}
              {isActive && (
                <span className="absolute bottom-0 w-1 h-1 rounded-full bg-mint-500" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
