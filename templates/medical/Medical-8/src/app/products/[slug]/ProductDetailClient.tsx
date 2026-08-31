'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/types';
import { formatPrice, formatRating, formatReviewCount } from '@/lib/utils';
import { Star, ShieldCheck, Heart, Plus, Minus, MapPin, Truck, ChevronRight, Check } from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
}

type TabType = 'overview' | 'ingredients' | 'usage' | 'warnings' | 'faqs';

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => addItem(product, 1);
  const handleIncrement = () => updateQuantity(product.id, quantity + 1);
  const handleDecrement = () => {
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryStatus('Delivery guaranteed by tomorrow evening!');
      setPincodeChecked(true);
    } else {
      setDeliveryStatus('Please enter a valid 6-digit pincode.');
      setPincodeChecked(false);
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage & Directions' },
    { id: 'warnings', label: 'Warnings' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <div className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-sm p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* ── Left: Image Gallery (lg:col-span-5) ───────────── */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-square w-full bg-navy-50 rounded-2xl overflow-hidden border border-brand-border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
              unoptimized
            />
            {/* Discount Badge overlay */}
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-mint-500 text-white text-xs font-bold rounded-full shadow-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {product.images.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border shrink-0 ${
                    selectedImage === imgUrl ? 'border-mint-500 ring-2 ring-mint-100' : 'border-brand-border hover:border-navy-300'
                  } transition-all`}
                >
                  <Image src={imgUrl} alt={`${product.name} View ${i + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info (lg:col-span-7) ──────────── */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Brand / Verified Title block */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold text-mint-600 uppercase tracking-widest">
                {product.brand}
              </span>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full border border-brand-border hover:bg-navy-50 transition-colors ${
                  isWishlisted ? 'text-rose-500' : 'text-navy-400'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-extrabold text-navy-900 leading-tight mb-1">
              {product.name}
            </h1>

            {/* Generic Formula Name */}
            {product.genericName && (
              <p className="text-xs text-navy-400 font-medium mb-3 italic">
                Active Ingredient: {product.genericName}
              </p>
            )}

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-navy-50 px-2.5 py-1 rounded-full text-xs font-bold text-navy-700">
                <Star className="w-3.5 h-3.5 fill-warning-500 text-warning-500" />
                <span>{formatRating(product.rating)}</span>
                <span className="text-navy-400">({formatReviewCount(product.reviewCount)} verified reviews)</span>
              </div>
              {product.isVerified && (
                <span className="inline-flex items-center gap-1 text-[11px] text-mint-600 font-semibold bg-mint-50 px-2 py-0.5 rounded-md border border-mint-500/10">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Genuine Guarantee
                </span>
              )}
            </div>

            {/* Product Metadata Summary */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-4 border-y border-brand-border text-xs mb-5">
              <div>
                <span className="text-navy-400">Form Factor:</span>{' '}
                <span className="font-semibold text-navy-800 capitalize">{product.form}</span>
              </div>
              <div>
                <span className="text-navy-400">Packaging Size:</span>{' '}
                <span className="font-semibold text-navy-800">{product.packSize}</span>
              </div>
              {product.strength && (
                <div>
                  <span className="text-navy-400">Strength:</span>{' '}
                  <span className="font-semibold text-navy-800">{product.strength}</span>
                </div>
              )}
              <div>
                <span className="text-navy-400">Manufacturer:</span>{' '}
                <span className="font-semibold text-navy-800 truncate block sm:inline">{product.manufacturer}</span>
              </div>
            </div>

            {/* Pricing Panel */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                {formatPrice(product.salePrice)}
              </span>
              {product.mrp > product.salePrice && (
                <>
                  <span className="text-sm text-navy-400 line-through">
                    MRP {formatPrice(product.mrp)}
                  </span>
                  <span className="text-xs font-bold text-mint-600 bg-mint-50 border border-mint-500/10 px-2 py-0.5 rounded-md">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Prescription Warning Label */}
            {product.requiresPrescription && (
              <div className="mb-6 p-4 rounded-xl bg-error-50 border border-error-500/20 text-left">
                <p className="text-xs font-bold text-error-500 uppercase tracking-wider mb-0.5">
                  Rx Prescription Required
                </p>
                <p className="text-[11px] text-navy-500 leading-relaxed">
                  This item is a prescription-only drug. You will be required to upload a valid medical prescription signed by a registered practitioner during checkout to purchase this item.
                </p>
              </div>
            )}

            {/* Cart Button Actions */}
            <div className="flex items-center gap-4 mb-6">
              {quantity > 0 ? (
                <div className="flex items-center justify-between bg-mint-500 text-white rounded-full h-12 w-36 px-2 shadow-sm border border-mint-600">
                  <button
                    onClick={handleDecrement}
                    className="w-8 h-8 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <span className="text-base font-bold w-10 text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="h-12 px-8 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 w-full sm:w-48"
                >
                  <Plus className="w-4 h-4" />
                  Add to Cart
                </button>
              )}
            </div>

            {/* ── Pincode Checker (UX) ─────────────────────────── */}
            <div className="border border-brand-border rounded-xl p-4 bg-brand-bg text-left mb-6">
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Delivery Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-brand-border bg-white text-xs text-navy-950 placeholder:text-navy-400 focus:border-mint-400 focus:ring-1 focus:ring-mint-100 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 px-4 rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-xs font-bold transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <div className="flex items-start gap-1.5 mt-2.5">
                  {pincodeChecked ? (
                    <Truck className="w-4 h-4 text-success-500 shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-error-500 shrink-0 mt-2" />
                  )}
                  <p className={`text-[11px] font-semibold ${pincodeChecked ? 'text-success-500' : 'text-error-500'}`}>
                    {deliveryStatus}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs Content Block (Overview, Ingredients, etc.) ─ */}
      <div className="mt-10 border-t border-brand-border pt-8 text-left">
        <div className="flex gap-2 overflow-x-auto border-b border-brand-border pb-px scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 font-bold text-xs sm:text-sm relative transition-colors ${
                  isActive ? 'text-mint-600 font-semibold' : 'text-navy-400 hover:text-navy-700'
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mint-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="py-6 min-h-[160px]">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-navy-600 leading-relaxed">
              <p className="font-semibold text-navy-800 text-base">{product.shortDescription}</p>
              <p>{product.description}</p>
              {product.storage && (
                <div className="mt-4 pt-4 border-t border-brand-muted">
                  <h5 className="font-bold text-navy-800 mb-1">Storage Instructions:</h5>
                  <p>{product.storage}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="text-xs sm:text-sm text-navy-600">
              <h5 className="font-bold text-navy-800 mb-3">Composition & Active Ingredients</h5>
              {product.ingredients && product.ingredients.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1.5">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              ) : (
                <p>Refer to manufacturer label for details.</p>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="text-xs sm:text-sm text-navy-600 space-y-3">
              <h5 className="font-bold text-navy-800">Standard Usage Guidelines</h5>
              <p className="leading-relaxed">{product.usage || 'Take exactly as recommended by your physician or healthcare specialist.'}</p>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="text-xs sm:text-sm text-navy-600">
              <h5 className="font-bold text-error-500 mb-3 uppercase tracking-wider">Safety & Warning Notices</h5>
              {product.warnings && product.warnings.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1.5 text-navy-600">
                  {product.warnings.map((warn, i) => (
                    <li key={i} className="text-navy-600">{warn}</li>
                  ))}
                </ul>
              ) : (
                <p>Always consult your pharmacist or doctor before starting a new medicine.</p>
              )}
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h5 className="font-bold text-navy-800 mb-3 text-sm sm:text-base">Frequently Asked Questions</h5>
              {product.faqs && product.faqs.length > 0 ? (
                <div className="grid gap-4">
                  {product.faqs.map((faq, i) => (
                    <div key={i} className="border border-brand-border rounded-xl p-4 bg-brand-bg">
                      <p className="font-bold text-navy-900 text-xs sm:text-sm mb-1.5">{faq.question}</p>
                      <p className="text-xs sm:text-sm text-navy-500 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-navy-400">No FAQs available for this product yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
