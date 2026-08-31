'use client';

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  services: string[];
  pincode: string;
}

const mockStores: Store[] = [
  { id: 'store-1', name: 'MediNova Connaught Place', address: 'B-24, Radial Road 3, Connaught Place', city: 'Delhi', phone: '+91 11 4032 5900', hours: '08:00 AM - 10:00 PM (All Days)', services: ['Express delivery dispatch', 'Self Collection (Pick)', 'Pharmacist Beratung'], pincode: '110001' },
  { id: 'store-2', name: 'MediNova Sector 54 Metro', address: 'Ground Floor, Metro Station Plaza, Sector 54', city: 'Gurugram', phone: '+91 124 4920 100', hours: '24 Hours (Open Daily)', services: ['24/7 Dispensation', 'Home sample lab drop', 'Immunizations desk'], pincode: '122011' },
  { id: 'store-3', name: 'MediNova Indiranagar Double Road', address: '492, 100 Feet Rd, Indiranagar', city: 'Bengaluru', phone: '+91 80 4120 4800', hours: '08:00 AM - 11:00 PM', services: ['Self Collection', 'Fittings & orthoses', 'Diabetes support corner'], pincode: '560038' },
  { id: 'store-4', name: 'MediNova Bandra Link Road', address: 'Unit 4, Capital Towers, Linking Road, Bandra West', city: 'Mumbai', phone: '+91 22 2640 1200', hours: '08:00 AM - 10:00 PM', services: ['Cold-chain storage dispatch', 'Direct support helpline', 'General checkups desk'], pincode: '400050' },
];

export default function StoresPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = useMemo(() => {
    return mockStores.filter((store) => {
      const q = searchQuery.toLowerCase();
      return (
        store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.city.toLowerCase().includes(q) ||
        store.pincode.includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page">
        
        {/* Banner Headers */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Find MediNova Store
          </h1>
          <p className="text-xs sm:text-sm text-navy-500 mt-2 leading-relaxed">
            Locate a pharmacy near you to pick up orders or drop diagnostic samples. All stores are fictional.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search by city, area, store name, or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-brand-border text-sm text-navy-900 placeholder:text-navy-400 focus:border-mint-400 focus:ring-2 focus:ring-mint-100 outline-none transition-all"
            />
          </div>
        </div>

        {/* Layout Split: Left Store Cards, Right map placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Store cards (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white border border-brand-border rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow space-y-4"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-900 leading-tight">
                    {store.name}
                  </h3>
                  <p className="text-xs text-navy-500 mt-1 leading-relaxed">
                    {store.address}, {store.city} - {store.pincode}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-navy-600 border-t border-brand-muted pt-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-mint-500 shrink-0" />
                    <span>{store.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-mint-500 shrink-0" />
                    <a href={`tel:${store.phone}`} className="hover:underline font-medium text-navy-900">{store.phone}</a>
                  </div>
                </div>

                <div className="border-t border-brand-muted pt-3">
                  <h4 className="text-[10px] font-bold text-navy-400 uppercase tracking-wider mb-2">Available Services</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {store.services.map((serv, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-navy-50 text-navy-700 px-2 py-0.5 rounded-md"
                      >
                        {serv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredStores.length === 0 && (
              <div className="bg-white border border-brand-border rounded-2xl p-8 text-center">
                <ShieldAlert className="w-8 h-8 text-navy-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-navy-800">No stores found matching &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          {/* Map placeholder card (lg:col-span-6) */}
          <div className="lg:col-span-6 bg-navy-100 rounded-3xl overflow-hidden border border-brand-border h-[400px] relative flex flex-col justify-end p-6">
            {/* Grid graphic lines simulating coordinates */}
            <div className="absolute inset-0 bg-[radial-gradient(#BDC9D7_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
            
            {/* mock dots */}
            <div className="absolute left-[30%] top-[40%] w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 animate-pulse" />
            <div className="absolute left-[60%] top-[25%] w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 animate-pulse" />
            <div className="absolute left-[45%] top-[70%] w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 animate-pulse" />

            <div className="bg-white rounded-2xl p-4 border border-brand-border shadow-md text-left z-10 max-w-sm">
              <div className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-mint-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Map Interface Ready</h4>
                  <p className="text-[10px] text-navy-500 leading-normal mt-0.5">
                    Live GPS tracker hooks will display routes and dispatch hubs in Phase 3.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
