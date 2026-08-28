import React from 'react';
import Link from 'next/link';
import { Pill, Upload, ArrowRight, ShieldCheck, Clock, Users } from 'lucide-react';
import { QuickHealthActions } from '@/components/home/QuickHealthActions';
import { CategoryRail } from '@/components/home/CategoryRail';
import { ShopByHealthGoal } from '@/components/home/ShopByHealthGoal';
import { ProductCarousel } from '@/components/product/ProductCarousel';
import { TrustBadges } from '@/components/home/TrustBadges';
import { getBestSellers, getNewArrivals, getTrending } from '@/data/products';

export default function Home() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const trendingProducts = getTrending();

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-white border-b border-brand-border py-12 sm:py-20 lg:py-24">
        {/* Background Decorative Grid/Abstract Shapes */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gradient-to-br from-mint-200/50 to-mint-400/20 blur-3xl" />
          <div className="absolute left-10 bottom-0 w-72 h-72 rounded-full bg-gradient-to-tr from-navy-100/50 to-mint-100/30 blur-2xl" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8ecf1_1px,transparent_1px),linear-gradient(to_bottom,#e8ecf1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Tagline / Subtitle Pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mint-50 border border-mint-500/10 text-xs font-semibold text-mint-700 mb-6 animate-fade-in">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted Digital Pharmacy & Care
            </span>

            {/* Main Headline */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-900 tracking-tight leading-[1.1] mb-6 animate-slide-up"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Healthcare That Fits <br />
              <span className="bg-gradient-to-r from-mint-600 to-mint-500 bg-clip-text text-transparent">
                Your Entire Life.
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base text-navy-500 leading-relaxed mb-8 max-w-xl animate-slide-up">
              Order authentic medicines, book home-sample diagnostic tests, consult top specialists online, and manage your health records in one secure marketplace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-10 animate-slide-up">
              <Link
                href="/category/pain-relief"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-navy-900 hover:bg-mint-600 text-white font-bold transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Pill className="w-4 h-4" />
                <span>Order Medicines</span>
              </Link>
              <Link
                href="/prescription"
                className="flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-brand-border bg-white hover:bg-navy-50 text-navy-800 font-bold transition-all duration-200 shadow-xs"
              >
                <Upload className="w-4 h-4 text-mint-600" />
                <span>Upload Prescription</span>
              </Link>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-brand-border w-full max-w-lg">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-mint-50 text-mint-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">2-Hour</h4>
                  <p className="text-[10px] text-navy-400 font-medium">Fast delivery</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-mint-50 text-mint-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">100%</h4>
                  <p className="text-[10px] text-navy-400 font-medium">Genuine stock</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-mint-50 text-mint-600">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">50k+</h4>
                  <p className="text-[10px] text-navy-400 font-medium">Happy patients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual/Promotion Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Branded Pharmacy Box Mock */}
            <div className="relative w-full max-w-[380px] bg-gradient-to-tr from-navy-900 to-navy-950 text-white rounded-3xl p-8 shadow-xl overflow-hidden animate-fade-in border border-navy-800">
              {/* Decorative Circle Grid */}
              <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-mint-500/10 blur-xl" />
              
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-mint-500 flex items-center justify-center">
                  <span className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>M</span>
                </div>
                <span className="font-bold text-sm tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  Medi<span className="text-mint-400">Nova</span> Care
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2">Need a Lab Test?</h2>
              <p className="text-xs text-navy-300 mb-6 leading-relaxed">
                Book comprehensive health checks from home. NABL certified labs, verified reports in 12 hours.
              </p>

              <div className="bg-navy-800/80 rounded-2xl p-4 border border-navy-700/60 mb-6">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-navy-700/60">
                  <span className="text-navy-300">Basic Health Checkup</span>
                  <span className="font-bold text-mint-400">₹699</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2">
                  <span className="text-navy-300">Complete Hemogram</span>
                  <span className="font-bold text-mint-400">₹299</span>
                </div>
              </div>

              <Link
                href="/lab-tests"
                className="w-full h-11 bg-mint-500 hover:bg-mint-400 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Book Diagnostic Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Health Actions ─────────────────────────── */}
      <QuickHealthActions />

      {/* ── Categories Scrollable Rail ──────────────────── */}
      <CategoryRail />

      {/* ── Discovery Carousel: Trending Now ─────────────── */}
      <ProductCarousel
        title="Trending Now"
        description="The most ordered healthcare and nutrition products this week"
        products={trendingProducts}
      />

      {/* ── Shop By Health Goal ──────────────────────────── */}
      <ShopByHealthGoal />

      {/* ── Discovery Carousel: Best Value ──────────────── */}
      <ProductCarousel
        title="Best Value Deals"
        description="High discounts on top-tier healthcare essentials"
        products={bestSellers}
      />

      {/* ── Promotional Offers Banner ───────────────────── */}
      <section className="container-page py-6">
        <div className="bg-gradient-to-r from-mint-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute left-0 bottom-0 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          
          <div className="relative z-10 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 text-white px-2.5 py-1 rounded-full">
              Limited Time Coupon
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-3" style={{ fontFamily: 'var(--font-heading)' }}>
              Get Flat 20% Off + Free Delivery
            </h3>
            <p className="text-xs sm:text-sm text-mint-100 mt-1">
              On your first medicine order. Use coupon code <strong className="text-white font-semibold">MEDISTART20</strong> at checkout.
            </p>
          </div>
          
          <Link
            href="/category/pain-relief"
            className="relative z-10 shrink-0 h-11 px-6 rounded-full bg-white text-mint-700 hover:bg-mint-50 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Shop Medicines</span>
            <ArrowRight className="w-3.5 h-3.5 text-mint-600" />
          </Link>
        </div>
      </section>

      {/* ── Discovery Carousel: New Arrivals ────────────── */}
      <ProductCarousel
        title="New Arrivals"
        description="Newly curated wellness, diagnostics, and everyday items"
        products={newArrivals}
      />

      {/* ── Trust Badges & Guarantees ────────────────────── */}
      <TrustBadges />
    </div>
  );
}
