import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Shield, Cpu, Hexagon, Command, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/animations';

const brands = [
  { name: 'ApexLabs', icon: Layers },
  { name: 'VortexAI', icon: Cpu },
  { name: 'SecureGrid', icon: Shield },
  { name: 'HyperFlow', icon: Hexagon },
  { name: 'QuantumData', icon: Command },
  { name: 'PulseCloud', icon: Globe },
];

export default function TrustSection() {
  return (
    <section className="py-12 bg-surface-subtle/60 border-y border-slate-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
            Trusted by modern engineering teams worldwide
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center"
        >
          {brands.map((brand, idx) => {
            const Icon = brand.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/60 hover:bg-white border border-transparent hover:border-slate-200 shadow-none hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-accent-indigo transition-colors duration-300" />
                <span className="text-sm font-bold tracking-tight text-slate-600 group-hover:text-navy transition-colors duration-300">
                  {brand.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
