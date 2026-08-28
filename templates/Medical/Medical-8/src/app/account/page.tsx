'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  FileText,
  MapPin,
  Heart,
  Bell,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Video,
} from 'lucide-react';

const mockProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  memberSince: 'August 2026',
};

const activeOrder = {
  orderNumber: 'MN682490',
  date: 'Today, 02:40 PM',
  status: 'out_for_delivery',
  statusText: 'Out for Delivery',
  total: 676,
  itemsCount: 2,
};

const mockMenu = [
  { label: 'My Orders', desc: 'Track, return or buy items again', icon: Package, href: '/account/orders', color: 'text-blue-500 bg-blue-50' },
  { label: 'Uploaded Prescriptions', desc: 'Review pharmacist checks and status', icon: FileText, href: '/account/prescriptions', color: 'text-teal-500 bg-teal-50' },
  { label: 'Saved Addresses', desc: 'Manage home, office and billing PINs', icon: MapPin, href: '/account/addresses', color: 'text-amber-500 bg-amber-50' },
  { label: 'Refill Reminders', desc: 'Alerts for recurring chronic pills', icon: Bell, href: '/account/reminders', color: 'text-rose-500 bg-rose-50' },
];

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-5xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Column: Profile Card (lg:col-span-4) ─────── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Main Profile Info */}
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-mint-500 to-teal-600 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-inner mb-4">
                JD
              </div>
              <h2 className="text-lg font-extrabold text-navy-900">{mockProfile.name}</h2>
              <p className="text-xs text-navy-400 mt-0.5">{mockProfile.email}</p>
              <p className="text-xs text-navy-500 font-semibold mt-1">{mockProfile.phone}</p>
              
              <div className="mt-6 pt-6 border-t border-brand-muted flex justify-between text-[11px] text-navy-400 font-semibold">
                <span>Member Status: Verified</span>
                <span>Since {mockProfile.memberSince}</span>
              </div>
            </div>

            {/* Premium secure badge */}
            <div className="bg-navy-950 text-white rounded-2xl p-4 flex gap-3 items-center border border-navy-800">
              <ShieldCheck className="w-5 h-5 text-mint-400 shrink-0" />
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">MediNova Secure Vault</h4>
                <p className="text-[10px] text-navy-400 leading-normal mt-0.5">
                  Your prescription and genetic diagnostic details are encrypted using AES-256 protocols.
                </p>
              </div>
            </div>

          </div>

          {/* ── Right Column: Dashboard Details (lg:col-span-8) ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Active Order Tracker Widget */}
            {activeOrder && (
              <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-brand-muted pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-mint-600 uppercase tracking-widest">Active Order Tracking</span>
                    <h3 className="text-sm font-bold text-navy-900 mt-1">
                      Order ID: {activeOrder.orderNumber}
                    </h3>
                    <p className="text-[10px] text-navy-400 font-semibold mt-0.5">Placed: {activeOrder.date} · {activeOrder.itemsCount} Items</p>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-mint-50 border border-mint-500/10 px-3 py-1 rounded-full text-xs font-bold text-mint-700">
                    <Truck className="w-4 h-4 text-mint-500 shrink-0" />
                    <span>{activeOrder.statusText}</span>
                  </div>
                </div>

                {/* Animated tracker dots timeline */}
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-1 before:bottom-1 before:w-[1.5px] before:bg-brand-border">
                  <div className="relative flex items-start gap-4">
                    <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10" />
                    <div>
                      <h4 className="text-xs font-bold text-navy-900">Order Dispatched</h4>
                      <p className="text-[10px] text-navy-400 mt-0.5">Your package was loaded at Delhi Central Hub.</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-start gap-4">
                    <div className="absolute -left-6.5 w-3 h-3 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 animate-pulse-soft" />
                    <div>
                      <h4 className="text-xs font-bold text-navy-900">Out for Delivery</h4>
                      <p className="text-[10px] text-navy-500 mt-0.5">Rider is approaching your address with refrigerated bag.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions Menu Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockMenu.map((menu) => {
                const Icon = menu.icon;
                return (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    className="group bg-white border border-brand-border rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex items-start gap-4 text-left"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${menu.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-navy-900 group-hover:text-mint-600 transition-colors">
                        {menu.label}
                      </h4>
                      <p className="text-[10px] text-navy-400 mt-0.5 leading-relaxed">
                        {menu.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
