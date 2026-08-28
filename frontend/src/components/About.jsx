import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Code2, Sparkles, Cpu, Layout, ArrowRight } from 'lucide-react';
import { fadeInLeft, fadeInRight, staggerContainer } from '../animations/animations';

const keyPoints = [
  {
    title: 'Modern Technology',
    desc: 'Built on high-performance React 18 frontend and robust Spring Boot 3 microservices.',
    icon: Code2,
  },
  {
    title: 'User-Centered Design',
    desc: 'Light glassmorphic aesthetic crafted specifically for clarity, elegance, and conversion.',
    icon: Layout,
  },
  {
    title: 'Scalable Architecture',
    desc: 'Zero database overhead for light deployment with instant REST endpoint integration.',
    icon: Cpu,
  },
];

export default function About() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Showcase Card */}
          <motion.div
            className="lg:col-span-6 relative"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative rounded-3xl p-8 bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50 overflow-hidden">
              {/* Background Accent Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent-indigo/10 via-accent-purple/10 to-transparent rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-indigo to-accent-purple text-white flex items-center justify-center shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-navy">Pure Architecture</h4>
                  <p className="text-xs text-slate-500">React + Spring Boot Stack</p>
                </div>
              </div>

              {/* Showcase Cards Grid */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      UI
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Framer Motion Animated</p>
                      <p className="text-xs text-slate-500">60 FPS smooth transitions</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">Active</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                      API
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Java 21 Spring REST</p>
                      <p className="text-xs text-slate-500">Stateless contact handling</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">Fast</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-xs">
                      CSS
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">Light Soft Theme</p>
                      <p className="text-xs text-slate-500">Tailwind Glassmorphic styling</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-600 text-xs font-semibold">Clean</span>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute bottom-6 right-6 bg-navy text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <span className="text-2xl font-black text-emerald-400">100%</span>
                <span className="text-xs font-medium leading-tight text-slate-300">Responsive &<br/>Accessible</span>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Column: Text & Features List */}
          <motion.div
            className="lg:col-span-6"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-indigo/10 text-accent-indigo text-xs font-bold uppercase tracking-wider mb-4">
              About Polar Platform
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight mb-6 leading-tight">
              Engineered for Perfection & Scalable Growth
            </h2>

            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8">
              We empower modern product builders with high-caliber software templates and scalable API architectures. Our mission is to bridge cutting-edge frontend animations with enterprise Java backends.
            </p>

            {/* Bullet Points */}
            <motion.div variants={staggerContainer} className="space-y-5 mb-8">
              {keyPoints.map((point, idx) => {
                const IconComponent = point.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200/60 transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-accent-indigo/10 text-accent-indigo flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-navy flex items-center gap-2">
                        {point.title}
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                      </h4>
                      <p className="text-sm text-slate-500 mt-0.5">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Action CTA */}
            <div>
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                <span>Connect With Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
