'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
  Pill,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalDiscount,
    deliveryFee,
    total,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountVal, setCouponDiscountVal] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Check if any product in cart requires prescription
  const hasPrescriptionItems = items.some((item) => item.product.requiresPrescription);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');

    const formattedCode = couponCode.trim().toUpperCase();
    if (formattedCode === 'MEDISTART20') {
      const discount = Math.round((subtotal - totalDiscount) * 0.2); // 20% discount on sale price
      setAppliedCoupon(formattedCode);
      setCouponDiscountVal(discount);
      setCouponCode('');
    } else if (formattedCode === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try MEDISTART20.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountVal(0);
  };

  const finalTotal = Math.max(subtotal - totalDiscount - couponDiscountVal + (couponDiscountVal > 0 ? 0 : deliveryFee), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg py-12 text-center flex flex-col items-center justify-center container-page">
        <div className="w-20 h-20 rounded-full bg-navy-50 flex items-center justify-center text-navy-400 mb-6 border border-brand-border">
          <ShoppingBag className="w-10 h-10 stroke-[1.25]" />
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-navy-500 max-w-sm mb-8 leading-relaxed">
          Looks like you haven&apos;t added any medicines or wellness products to your cart yet.
        </p>
        <Link
          href="/category/pain-relief"
          className="h-12 px-8 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-1.5"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg py-6 sm:py-10 text-left">
      <div className="container-page">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Items List (lg:col-span-8) ──────── */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Prescription Warning Alert */}
            {hasPrescriptionItems && (
              <div className="p-4 rounded-2xl bg-warning-50 border border-warning-500/20 flex gap-3 items-start animate-fade-in">
                <AlertCircle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-0.5">
                    Prescription Required Items Added
                  </h4>
                  <p className="text-[11px] text-navy-500 leading-relaxed">
                    Some items in your cart require a medical prescription. Please make sure you have a scanned copy ready to upload during checkout.
                  </p>
                </div>
              </div>
            )}

            {/* Cart Items Card */}
            <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm p-4 sm:p-6 space-y-6">
              {items.map((item) => {
                const product = item.product;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col sm:flex-row gap-4 py-6 first:pt-0 last:pb-0 border-b last:border-0 border-brand-muted relative"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-navy-50 rounded-xl overflow-hidden border border-brand-border shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-sm sm:text-base font-bold text-navy-900 leading-tight hover:text-mint-600 truncate">
                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                          </h3>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="p-1 text-navy-400 hover:text-error-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-navy-400 font-semibold uppercase mt-0.5">
                          {product.brand} · {product.packSize}
                        </p>
                        {product.requiresPrescription && (
                          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-error-50 text-[10px] font-bold text-error-500 rounded border border-error-500/10">
                            <Pill className="w-3 h-3" />
                            Rx Item
                          </span>
                        )}
                      </div>

                      {/* Controls & Price Row */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity controls */}
                        <div className="flex items-center justify-between bg-mint-500 text-white rounded-full h-8 w-28 px-1 shadow-sm">
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-sm sm:text-base font-extrabold text-navy-900 block">
                            {formatPrice(product.salePrice * item.quantity)}
                          </span>
                          {product.mrp > product.salePrice && (
                            <span className="text-[11px] text-navy-400 line-through">
                              {formatPrice(product.mrp * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <button
                onClick={clearCart}
                className="text-xs font-bold text-navy-400 hover:text-error-500 transition-colors py-2 px-3 hover:bg-error-50 rounded-xl"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* ── Right Column: Pricing & Checkout (lg:col-span-4) ── */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Coupon Application Block */}
            <div className="bg-white border border-brand-border rounded-3xl p-5 shadow-sm">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-mint-500" />
                Apply Coupon Code
              </h3>
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-mint-50 border border-mint-500/10 rounded-xl p-3 text-xs animate-fade-in">
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-mint-700">{appliedCoupon} Applied!</span>
                    <span className="text-[10px] text-navy-500 mt-0.5">20% off code discount saved you {formatPrice(couponDiscountVal)}</span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-[10px] font-extrabold text-error-500 hover:underline uppercase tracking-wide shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. MEDISTART20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 h-10 border border-brand-border rounded-xl px-3 text-xs text-navy-950 placeholder:text-navy-400 focus:border-mint-400 focus:ring-1 focus:ring-mint-100 outline-none uppercase transition-all"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-xl bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] font-semibold text-error-500 mt-2 text-left">
                  {couponError}
                </p>
              )}
            </div>

            {/* Price Detail Summary Panel */}
            <div className="bg-white border border-brand-border rounded-3xl p-5 shadow-sm text-left">
              <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4">
                Payment Details
              </h3>
              
              <div className="space-y-3 pb-4 border-b border-brand-muted text-xs sm:text-sm">
                <div className="flex justify-between text-navy-500">
                  <span>Cart Subtotal (MRP)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-success-500">
                  <span>Product Discount</span>
                  <span>-{formatPrice(totalDiscount)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-success-500 font-medium">
                    <span>Coupon Discount (20%)</span>
                    <span>-{formatPrice(couponDiscountVal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-navy-500">
                  <span>Delivery Charges</span>
                  {appliedCoupon || deliveryFee === 0 ? (
                    <span className="text-success-500 font-semibold">FREE</span>
                  ) : (
                    <span>{formatPrice(deliveryFee)}</span>
                  )}
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-baseline pt-4 mb-6">
                <span className="text-sm font-bold text-navy-900">Total Amount</span>
                <span className="text-xl sm:text-2xl font-extrabold text-navy-900">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full h-12 bg-mint-500 hover:bg-mint-600 text-white font-bold text-sm rounded-full flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Guarantees watermark */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-navy-400 font-semibold mt-4">
                <ShieldCheck className="w-3.5 h-3.5 text-mint-500" />
                <span>Secure Checkout powered by MediNova SSL</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
