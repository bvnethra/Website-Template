import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp, CheckCircle2, Play } from 'lucide-react';
import { fadeInUp, staggerContainer, floatVariant } from '../animations/animations';

export default function Hero() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-background">
      
      {/* Background Animated Floating Blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blob-1 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[30rem] h-[30rem] rounded-full bg-blob-2 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-blob-3 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '4s' }} />
      
      {/* Subtle Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold text-accent-indigo">
                <Sparkles className="w-4 h-4 text-accent-indigo animate-spin" style={{ animationDuration: '8s' }} />
                <span>Next Generation Platform v2.5</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy leading-[1.15] mb-6"
            >
              Build Something{' '}
              <span className="gradient-text">Extraordinary</span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl font-normal"
            >
              Transform your ideas into powerful digital experiences with modern technology, beautiful design and intelligent solutions engineered for modern growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-indigo via-accent-purple to-accent-indigo bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base shadow-xl shadow-accent-indigo/25 hover:shadow-accent-indigo/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <a
                href="#features"
                onClick={handleScrollToFeatures}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-base shadow-sm hover:shadow-md hover:border-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
                <span>Explore Features</span>
              </a>
            </motion.div>

            {/* Key trust bullets */}
            <motion.div variants={fadeInUp} className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-indigo shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">No DB required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-indigo shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">Instant API</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-indigo shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">99.99% Uptime</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Interactive Dashboard / Visual Card Mockup */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Main Interactive Card */}
            <div className="relative rounded-3xl p-6 sm:p-8 glass-card border border-white shadow-2xl shadow-accent-indigo/10 overflow-hidden">
              
              {/* Card Header Mockup */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-400">dashboard.polar.io</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </div>
              </div>

              {/* Main Metric Visualization */}
              <div className="bg-slate-50/80 rounded-2xl p-5 mb-6 border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Total Revenue</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-navy">$128,450.00</h3>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-accent-indigo/10 text-accent-indigo text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +28.4%
                  </div>
                </div>

                {/* Animated Chart Bars */}
                <div className="h-28 flex items-end justify-between gap-2 pt-4">
                  {[40, 65, 45, 80, 55, 90, 75, 100].map((height, idx) => (
                    <motion.div
                      key={idx}
                      className="w-full rounded-t-lg bg-gradient-to-t from-accent-indigo to-accent-purple"
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.08, ease: "easeOut" }}
                    />
                  ))}
                </div>
              </div>

              {/* Grid of Micro Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent-blue flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Response</p>
                    <p className="text-sm font-bold text-navy">12ms avg</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-accent-purple flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Security</p>
                    <p className="text-sm font-bold text-navy">Verified</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Floating Floating Card 1: Top Right Badge */}
            <motion.div
              variants={floatVariant}
              animate="animate"
              className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Spring Boot 3.3 API</p>
                <p className="text-sm font-bold text-navy">200 OK — 100% Valid</p>
              </div>
            </motion.div>

            {/* Floating Floating Card 2: Bottom Left Badge */}
            <motion.div
              variants={floatVariant}
              animate="animate"
              style={{ animationDelay: '2.5s' }}
              className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3 z-20"
            >
              <div className="w-9 h-9 rounded-full bg-accent-indigo/10 text-accent-indigo flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Satisfaction</p>
                <p className="text-sm font-bold text-navy">4.9 / 5.0 Rating</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
