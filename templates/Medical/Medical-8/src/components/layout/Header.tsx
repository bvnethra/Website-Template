'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { NAV_ITEMS, POPULAR_SEARCHES } from '@/lib/constants';
import { searchProducts } from '@/data/products';
import type { Product } from '@/types';
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  Menu,
  X,
  Phone,
  Download,
  ShieldCheck,
  ChevronDown,
  Pill,
  Heart,
  FlaskConical,
  Stethoscope,
  FileHeart,
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  pill: <Pill className="w-4 h-4" />,
  heart: <Heart className="w-4 h-4" />,
  flask: <FlaskConical className="w-4 h-4" />,
  stethoscope: <Stethoscope className="w-4 h-4" />,
  'file-heart': <FileHeart className="w-4 h-4" />,
};

export function Header() {
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    searchTimeoutRef.current = setTimeout(() => {
      const results = searchProducts(query).slice(0, 6);
      setSearchResults(results);
    }, 300);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[50] transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-md'
          : 'bg-white border-b border-brand-border'
      }`}
    >
      {/* ── Utility Bar ──────────────────────────────────── */}
      <div className="hidden lg:block bg-navy-900 text-white">
        <div className="container-page flex items-center justify-between py-1.5 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-mint-400" />
              Delivering across India
            </span>
            <span className="text-navy-400">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-mint-400" />
              100% Genuine Products
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+911800000000" className="flex items-center gap-1.5 hover:text-mint-300 transition-colors">
              <Phone className="w-3 h-3" />
              1800-000-0000
            </a>
            <span className="text-navy-400">|</span>
            <button className="flex items-center gap-1.5 hover:text-mint-300 transition-colors">
              <Download className="w-3 h-3" />
              Download App
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Navigation ──────────────────────────────── */}
      <div className="container-page">
        <div className="flex items-center gap-3 lg:gap-6 h-16 lg:h-[72px]">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2 text-navy-700 hover:text-navy-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="MediNova Home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-mint-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-jakarta)' }}>M</span>
            </div>
            <span
              className="hidden sm:block text-xl font-bold text-navy-900 tracking-tight"
              style={{ fontFamily: 'var(--font-jakarta)' }}
            >
              Medi<span className="text-mint-500">Nova</span>
            </span>
          </Link>

          {/* Location Selector */}
          <button className="hidden xl:flex items-center gap-1.5 text-sm text-navy-600 hover:text-navy-900 transition-colors px-3 py-2 rounded-lg hover:bg-navy-50">
            <MapPin className="w-4 h-4 text-mint-500" />
            <span className="font-medium">Delhi 110001</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-navy-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search medicines, wellness products, conditions..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-navy-50 border border-transparent text-sm text-navy-900 placeholder:text-navy-400 focus:bg-white focus:border-mint-400 focus:ring-2 focus:ring-mint-100 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                aria-label="Search products"
                aria-expanded={isSearchOpen}
                aria-controls="search-dropdown"
                role="combobox"
                aria-autocomplete="list"
              />
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && (
              <div
                id="search-dropdown"
                role="listbox"
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-brand-border overflow-hidden animate-fade-in z-[60]"
              >
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    <p className="px-4 py-1.5 text-xs font-semibold text-navy-400 uppercase tracking-wide">
                      Products
                    </p>
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-mint-50 transition-colors"
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        role="option"
                      >
                        <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center shrink-0">
                          <Pill className="w-5 h-5 text-mint-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate">{product.name}</p>
                          <p className="text-xs text-navy-400">{product.brand} · {product.packSize}</p>
                        </div>
                        <span className="text-sm font-semibold text-mint-600">₹{product.salePrice}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-3">
                    <p className="px-4 py-1.5 text-xs font-semibold text-navy-400 uppercase tracking-wide">
                      Popular Searches
                    </p>
                    <div className="px-4 py-2 flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          className="px-3 py-1.5 rounded-full bg-navy-50 text-xs font-medium text-navy-600 hover:bg-mint-50 hover:text-mint-700 transition-colors"
                          onClick={() => { handleSearch(term); searchInputRef.current?.focus(); }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-navy-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
              >
                {iconMap[item.icon]}
                <span className="hidden xl:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/account"
              className="p-2.5 text-navy-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2.5 text-navy-600 hover:text-mint-600 hover:bg-mint-50 rounded-lg transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-mint-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white animate-fade-in">
          <nav className="container-page py-4 space-y-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-navy-700 hover:text-mint-600 hover:bg-mint-50 rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {iconMap[item.icon]}
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-brand-border mt-3">
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-navy-500">
                <Phone className="w-3.5 h-3.5" />
                1800-000-0000 (Toll Free)
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
