'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/types';
import { formatPrice, formatRating, formatReviewCount } from '@/lib/utils';
import { Star, ShieldCheck, Heart, Plus, Minus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-card group relative flex flex-col bg-white rounded-2xl border border-brand-border overflow-hidden h-full">
      {/* Badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discount > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-bold text-white bg-mint-500 rounded-full shadow-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.requiresPrescription && (
            <span className="px-2.5 py-1 text-[10px] font-bold text-error-500 bg-error-50 border border-error-500/20 rounded-full shadow-sm">
              Rx Required
            </span>
          )}
        </div>
        <button
          onClick={toggleWishlist}
          className="pointer-events-auto w-8 h-8 rounded-full bg-white/95 shadow-sm border border-brand-border flex items-center justify-center text-navy-400 hover:text-rose-500 transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square w-full bg-navy-50 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={product.isBestSeller}
          unoptimized
        />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand & Genuine Badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-semibold text-navy-400 uppercase tracking-wider truncate">
            {product.brand}
          </span>
          {product.isVerified && (
            <span title="Verified Genuine">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-500" />
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.slug}`} className="block mb-2 group-hover:text-mint-600 transition-colors">
          <h3 className="text-sm font-semibold text-navy-900 leading-tight line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating and Pack Size */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="text-navy-500 font-medium">{product.packSize}</span>
          
          <div className="flex items-center gap-1 bg-navy-50 px-2 py-0.5 rounded-full font-medium text-navy-700">
            <Star className="w-3 h-3 fill-warning-500 text-warning-500" />
            <span>{formatRating(product.rating)}</span>
            <span className="text-navy-400 text-[10px]">({formatReviewCount(product.reviewCount)})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-auto pt-3 border-t border-brand-muted flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-navy-900 leading-none">
              {formatPrice(product.salePrice)}
            </span>
            {product.mrp > product.salePrice && (
              <span className="text-xs text-navy-400 line-through mt-0.5">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          <div className="w-24 shrink-0">
            {quantity > 0 ? (
              <div className="flex items-center justify-between bg-mint-500 text-white rounded-full h-9 px-1.5 shadow-sm">
                <button
                  onClick={handleDecrement}
                  className="w-6 h-6 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-6 h-6 rounded-full hover:bg-mint-600 flex items-center justify-center transition-colors text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full h-9 rounded-full bg-navy-900 hover:bg-mint-600 text-white text-xs font-bold transition-all duration-200 shadow-sm flex items-center justify-center gap-1 group-hover:bg-navy-950"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
