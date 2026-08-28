import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldCheck, Layers, BarChart3, Globe, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, cardHover } from '../animations/animations';

const features = [
  {
    icon: Cpu,
    title: 'Smart Solutions',
    description: 'Leverage intelligent algorithms and automated workflows tailored to accelerate your business operations.',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Ultra-low latency asset Delivery with Vite bundling and optimized Spring REST response pipelines.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Platform',
    description: 'Stateless request validation and sanitized REST endpoints to safeguard data with enterprise standards.',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Layers,
    title: 'Easy Integration',
    description: 'Modular React component architecture paired with standard JSON API contracts for rapid expansion.',
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Insights',
    description: 'Track key interactions, system throughput, and operational metrics with interactive visual widgets.',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Globe,
    title: 'Scalable Architecture',
    description: 'Designed from the ground up for seamless cloud deployment, zero DB locking, and horizontal scaling.',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-surface-subtle/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold uppercase tracking-wider mb-4"
          >
            Core Capabilities
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight"
          >
            Everything You Need to <span className="gradient-text">Move Forward</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-500"
          >
            Explore our comprehensive suite of modern tools designed to streamline your product development lifecycle.
          </motion.p>
        </div>

        {/* 6 Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="rest"
                whileHover="hover"
                animate="rest"
                custom={cardHover}
                className="glass-card rounded-3xl p-8 border border-white/80 shadow-md hover:border-accent-indigo/30 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.iconColor} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-300 tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-indigo transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Arrow Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-accent-indigo transition-colors duration-200">
                  <span>Explore detail</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
