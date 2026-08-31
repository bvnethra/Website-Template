'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle,
  Truck,
  MapPin,
  CreditCard,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function OrderTrackingClient() {
  const params = useParams();
  const orderId = (params?.id as string) || 'MN682490';

  const orderDetails = {
    id: orderId,
    date: 'August 28, 2026 at 02:40 PM',
    status: 'out_for_delivery',
    statusLabel: 'Out for Delivery',
    paymentMethod: 'UPI (Paytm)',
    address: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      line1: 'Flat 402, Block C, Royal Residency',
      line2: 'Sector 56, Gurgaon',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122011',
    },
    items: [
      { name: 'MediNova Vitamin D3 1000 IU', packSize: '60 Tablets', qty: 1, price: 338 },
      { name: 'NovaRelief Paracetamol 500mg', packSize: '15 Tablets', qty: 2, price: 30 },
    ],
    subtotal: 510,
    discount: 112,
    deliveryFee: 49,
    total: 447,
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 sm:py-12 text-left">
      <div className="container-page max-w-4xl">
        <div className="mb-6">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs font-bold text-navy-500 hover:text-mint-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Account
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
              <span className="text-[10px] font-bold text-mint-600 uppercase tracking-widest">Live Order Progress</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-1">
                Order Reference: {orderDetails.id}
              </h1>
              <p className="text-xs text-navy-400 mt-0.5">Placed on {orderDetails.date}</p>
              
              <div className="mt-8 relative pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-border">
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8.5 w-4 h-4 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 flex items-center justify-center text-white">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900">Order Registered</h3>
                    <p className="text-[11px] text-navy-400 mt-0.5">Verified inventory availability.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8.5 w-4 h-4 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 flex items-center justify-center text-white">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900">Prescriptions Verified</h3>
                    <p className="text-[11px] text-navy-400 mt-0.5">Pharmacist verified doctor signature stamps.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8.5 w-4 h-4 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 flex items-center justify-center text-white">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900">Packed & Dispatched</h3>
                    <p className="text-[11px] text-navy-400 mt-0.5">Loaded into secure isothermal bag.</p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-8.5 w-4 h-4 rounded-full bg-mint-500 ring-4 ring-mint-100 z-10 flex items-center justify-center text-white animate-pulse">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-navy-900">Out for Delivery</h3>
                    <p className="text-[11px] text-navy-500 mt-0.5">Rider is approaching your address.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-brand-border p-6 shadow-sm">
              <h3 className="text-sm font-bold text-navy-900 mb-4 uppercase tracking-wider">
                Cart Items
              </h3>
              <div className="space-y-4">
                {orderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-3 border-b border-brand-muted last:border-0 last:pb-0">
                    <div>
                      <p className="font-bold text-navy-900">{item.name}</p>
                      <p className="text-[10px] text-navy-400 font-medium mt-0.5">Pack size: {item.packSize} · Qty: {item.qty}</p>
                    </div>
                    <span className="font-extrabold text-navy-800">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-brand-border p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-mint-500" />
                Delivery Address
              </h3>
              <div className="text-xs space-y-1">
                <p className="font-bold text-navy-900">{orderDetails.address.name}</p>
                <p className="text-navy-500 leading-relaxed">{orderDetails.address.line1}, {orderDetails.address.line2}</p>
                <p className="text-navy-400 font-semibold">{orderDetails.address.city}, {orderDetails.address.state} - {orderDetails.address.pincode}</p>
                <p className="text-navy-500 font-semibold pt-1">Phone: {orderDetails.address.phone}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-brand-border p-5 shadow-sm space-y-3 text-xs text-navy-500">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-mint-500" />
                Payment Breakdown
              </h3>
              <div className="flex justify-between">
                <span>Items MRP Subtotal</span>
                <span>{formatPrice(orderDetails.subtotal)}</span>
              </div>
              <div className="flex justify-between text-success-500">
                <span>Verified Discount</span>
                <span>-{formatPrice(orderDetails.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fees</span>
                <span>{formatPrice(orderDetails.deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-brand-muted text-sm font-extrabold text-navy-900">
                <span>Grand Total</span>
                <span>{formatPrice(orderDetails.total)}</span>
              </div>
              <div className="flex items-center gap-1 bg-mint-50 border border-mint-500/10 p-2 rounded-xl text-[10px] text-mint-700 font-semibold mt-2 justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Paid via {orderDetails.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
