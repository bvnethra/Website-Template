import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code2, Rocket, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/animations';

const steps = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Understand Requirements',
    description: 'We collaborate to map out objectives, scope, target audience, and architecture requirements.',
    icon: Search,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    number: '02',
    title: 'Plan',
    subtitle: 'Create Perfect Strategy',
    description: 'Design interactive wireframes, select color palettes, and define Spring REST API contracts.',
    icon: Compass,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Develop Solution',
    description: 'Write modular React components with Framer Motion animations and robust Java controllers.',
    icon: Code2,
    color: 'from-purple-500 to-pink-600',
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Deliver & Scale',
    description: 'Deploy to production with continuous integration, performance tuning, and 24/7 monitoring.',
    icon: Rocket,
    color: 'from-pink-500 to-rose-600',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface-subtle/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-indigo/10 text-accent-indigo text-xs font-bold uppercase tracking-wider mb-4"
          >
            Seamless Workflow
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight"
          >
            How It <span className="gradient-text">Works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-500"
          >
            A simple, proven 4-step framework that turns ideas into high-performing digital realities.
          </motion.p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
          
          {/* Animated Progress Overlay Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 -translate-y-1/2 z-0 origin-left"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Circle & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 group-hover:text-accent-indigo transition-colors duration-200">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-navy mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-accent-indigo mb-3 uppercase tracking-wider">
                      {step.subtitle}
                    </p>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom indicator */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-400">
                    <span>Step {step.number} of 04</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
