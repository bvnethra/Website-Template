'use client';

import React, { useState, useMemo } from 'react';
import type { Category, Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Star, Check, RefreshCw } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface CategoryPageClientProps {
  category: Category;
  initialProducts: Product[];
}

type SortType = 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export function CategoryPageClient({ category, initialProducts }: CategoryPageClientProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(() => {
    if (initialProducts.length === 0) return 3000;
    return Math.max(...initialProducts.map((p) => p.salePrice), 3000);
  });
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'requires' | 'none'>('all');
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortType>('recommended');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Extract unique brands in this category for the sidebar filter
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return Array.from(brandsSet);
  }, [initialProducts]);

  // Find the absolute highest price in these products to set slider upper bound
  const highestPriceLimit = useMemo(() => {
    if (initialProducts.length === 0) return 1000;
    return Math.max(...initialProducts.map((p) => p.salePrice), 1000);
  }, [initialProducts]);

  // Main Filter + Sort Chain
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // 1. Subcategory filter
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // 2. Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    // 3. Price filter
    result = result.filter((p) => p.salePrice <= maxPrice);

    // 4. Prescription filter
    if (prescriptionFilter === 'requires') {
      result = result.filter((p) => p.requiresPrescription);
    } else if (prescriptionFilter === 'none') {
      result = result.filter((p) => !p.requiresPrescription);
    }

    // 5. Discount filter
    if (onlyDiscounted) {
      result = result.filter((p) => p.discount > 0);
    }

    // 6. Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => b.discount - a.discount);
    } else {
      // 'recommended' - Sort by bestseller and high rating
      result.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return b.rating - a.rating;
      });
    }

    return result;
  }, [initialProducts, selectedSubcategory, selectedBrands, maxPrice, prescriptionFilter, onlyDiscounted, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedSubcategory('');
    setSelectedBrands([]);
    setMaxPrice(highestPriceLimit);
    setPrescriptionFilter('all');
    setOnlyDiscounted(false);
    setSortBy('recommended');
  };

  const isFilterActive =
    selectedSubcategory !== '' ||
    selectedBrands.length > 0 ||
    maxPrice < highestPriceLimit ||
    prescriptionFilter !== 'all' ||
    onlyDiscounted;

  // Reusable Sidebar filter elements
  const renderFilterOptions = () => (
    <div className="space-y-6 text-left">
      {/* Subcategories (if category has subcategories) */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="border-b border-brand-border pb-5">
          <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-3">
            Subcategories
          </h3>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setSelectedSubcategory('')}
              className={`text-xs font-semibold py-1 px-2.5 rounded-lg text-left transition-colors ${
                selectedSubcategory === ''
                  ? 'bg-mint-500 text-white'
                  : 'text-navy-600 hover:bg-navy-50'
              }`}
            >
              All {category.name}
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.slug)}
                className={`text-xs font-semibold py-1 px-2.5 rounded-lg text-left transition-colors flex justify-between items-center ${
                  selectedSubcategory === sub.slug
                    ? 'bg-mint-500 text-white'
                    : 'text-navy-600 hover:bg-navy-50'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] ${selectedSubcategory === sub.slug ? 'text-white/80' : 'text-navy-400'}`}>
                  {sub.productCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Brand Filters */}
      {availableBrands.length > 0 && (
        <div className="border-b border-brand-border pb-5">
          <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-3">
            Filter by Brand
          </h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandToggle(brand)}
                  className="flex items-center gap-2.5 text-xs text-navy-600 hover:text-navy-950 font-medium py-0.5 text-left group"
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'bg-mint-500 border-mint-500 text-white' : 'border-brand-border group-hover:border-navy-400'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{brand}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Price Limit Slider */}
      <div className="border-b border-brand-border pb-5">
        <div className="flex justify-between items-baseline mb-3">
          <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider">
            Max Price
          </h3>
          <span className="text-xs font-extrabold text-mint-600">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={30}
          max={highestPriceLimit}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1.5 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-mint-500"
        />
        <div className="flex justify-between text-[10px] text-navy-400 font-semibold mt-1.5">
          <span>{formatPrice(30)}</span>
          <span>{formatPrice(highestPriceLimit)}</span>
        </div>
      </div>

      {/* Prescription Filter */}
      <div className="border-b border-brand-border pb-5">
        <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-3">
          Prescription Requirements
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'requires', label: 'Prescription Required (Rx)' },
            { id: 'none', label: 'No Prescription Needed' },
          ].map((opt) => {
            const isSelected = prescriptionFilter === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setPrescriptionFilter(opt.id as 'all' | 'requires' | 'none')}
                className="flex items-center gap-2.5 text-xs text-navy-600 hover:text-navy-950 font-medium py-0.5 text-left group"
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-mint-500 border-mint-500 text-white' : 'border-brand-border group-hover:border-navy-400'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggle Discount */}
      <div>
        <button
          onClick={() => setOnlyDiscounted(!onlyDiscounted)}
          className="flex items-center gap-2.5 text-xs text-navy-800 hover:text-navy-950 font-semibold py-0.5 text-left group"
        >
          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
            onlyDiscounted ? 'bg-mint-500 border-mint-500 text-white' : 'border-brand-border group-hover:border-navy-400'
          }`}>
            {onlyDiscounted && <Check className="w-3 h-3 stroke-[3]" />}
          </div>
          <span>Show Only Discounted Products</span>
        </button>
      </div>

      {/* Reset Button */}
      {isFilterActive && (
        <button
          onClick={resetFilters}
          className="w-full h-9 rounded-lg border border-brand-border text-navy-600 hover:text-mint-600 hover:bg-mint-50 hover:border-mint-500/20 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* ── Desktop Sidebar: Filters (lg:col-span-3) ───────── */}
      <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-brand-border p-6 shadow-sm h-fit">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-5">
          <h2 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider">
            Filters
          </h2>
          {isFilterActive && (
            <span className="w-2.5 h-2.5 rounded-full bg-mint-500" title="Active filters" />
          )}
        </div>
        {renderFilterOptions()}
      </aside>

      {/* ── Main Products Grid Area (lg:col-span-9) ───────── */}
      <main className="lg:col-span-9">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-3 mb-6 bg-white border border-brand-border rounded-xl px-4 py-3 shadow-xs">
          <span className="text-xs sm:text-sm font-semibold text-navy-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </span>
          
          <div className="flex items-center gap-2">
            {/* Mobile Filters trigger */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden h-9 px-3 rounded-lg border border-brand-border text-navy-700 hover:bg-navy-50 text-xs font-bold flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-navy-500" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-navy-600 font-semibold">
              <ArrowUpDown className="w-3.5 h-3.5 text-navy-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortType)}
                className="bg-transparent border border-brand-border rounded-lg h-9 px-2.5 font-bold outline-none text-xs text-navy-800 focus:border-mint-400"
              >
                <option value="recommended">Best Match</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filters state */
          <div className="bg-white border border-brand-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-14 h-14 rounded-full bg-navy-50 flex items-center justify-center text-navy-400 mb-4">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy-900 mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-navy-500 max-w-xs mb-6 leading-relaxed">
              We couldn&apos;t find any items matching your selected filter parameters. Try clearing some options.
            </p>
            <button
              onClick={resetFilters}
              className="h-10 px-6 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold text-xs transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* ── Mobile Filters Drawer (Modal) ─────────────────── */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] bg-navy-950/50 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-[320px] bg-white h-full flex flex-col animate-slide-up shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border shrink-0">
              <h2 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider">
                Filters
              </h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-navy-400 hover:text-navy-950 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Scrollable filters form */}
            <div className="flex-1 overflow-y-auto p-5">
              {renderFilterOptions()}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-brand-border shrink-0 flex gap-2">
              <button
                onClick={() => { resetFilters(); setIsMobileFiltersOpen(false); }}
                className="flex-1 h-10 rounded-lg border border-brand-border text-navy-600 font-bold text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 h-10 rounded-lg bg-mint-500 text-white font-bold text-xs"
              >
                Apply ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
