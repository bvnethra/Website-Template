import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Send } from 'lucide-react';
import { scaleUp } from '../animations/animations';

export default function CTA() {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-accent-indigo via-accent-purple to-indigo-700 text-white overflow-hidden shadow-2xl shadow-accent-indigo/25"
        >
          {/* Ambient Glow Blobs Inside Card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl pointer-events-none" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Let's Collaborate Today</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              Ready to Build Something Amazing?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-xl text-indigo-100 font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Let's turn your ideas into a digital experience that makes an impact with high-speed React animations and enterprise Spring Boot integration.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-accent-indigo font-extrabold text-base shadow-xl hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                <span>Contact Sales</span>
              </a>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
