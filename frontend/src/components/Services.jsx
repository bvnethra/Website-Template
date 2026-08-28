import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Sparkles, TrendingUp, Cloud, MessageSquare, ArrowUpRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/animations';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    desc: 'Custom, high-speed single page applications built with React, Vite, and Java Spring REST backends.',
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    borderHover: 'hover:border-blue-300',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, human-centered light mode interfaces crafted for maximum visual engagement and accessibility.',
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
    borderHover: 'hover:border-purple-300',
  },
  {
    icon: Sparkles,
    title: 'Digital Solutions',
    desc: 'End-to-end digital transformation strategies and automated workflow integrations for modern businesses.',
    gradient: 'from-cyan-500/10 via-teal-500/5 to-transparent',
    borderHover: 'hover:border-cyan-300',
  },
  {
    icon: TrendingUp,
    title: 'Business Analytics',
    desc: 'Real-time telemetry dashboards and automated reporting widgets engineered to unlock growth vectors.',
    gradient: 'from-emerald-500/10 via-green-500/5 to-transparent',
    borderHover: 'hover:border-emerald-300',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    desc: 'Lightweight microservices architectures designed for instant Docker containerization and serverless hosting.',
    gradient: 'from-sky-500/10 via-blue-500/5 to-transparent',
    borderHover: 'hover:border-sky-300',
  },
  {
    icon: MessageSquare,
    title: 'Consulting Services',
    desc: 'Technical architecture reviews, frontend design audits, and Java backend optimization sessions.',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderHover: 'hover:border-amber-300',
  },
];

export default function Services() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-cyan/10 text-accent-cyan text-xs font-bold uppercase tracking-wider mb-4">
              What We Offer
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
              Tailored <span className="gradient-text">Services</span> & Solutions
            </h2>
          </div>
          <p className="text-slate-500 text-base max-w-md">
            Empower your platform with specialized engineering and design solutions designed for speed and scale.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className={`bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm ${item.borderHover} transition-all duration-300 relative overflow-hidden flex flex-col justify-between group`}
              >
                {/* Subtle Background Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-navy text-navy group-hover:text-white flex items-center justify-center mb-6 shadow-sm transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-indigo transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={handleScrollToContact}
                    className="text-xs font-bold text-accent-indigo inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
