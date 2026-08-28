import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Award, Smile, Headphones } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../animations/animations';

const statsData = [
  {
    target: 10,
    suffix: 'K+',
    label: 'Happy Users',
    icon: Users,
    description: 'Active developers & teams',
  },
  {
    target: 250,
    suffix: '+',
    label: 'Projects Completed',
    icon: Award,
    description: 'Deployed across cloud platforms',
  },
  {
    target: 98,
    suffix: '%',
    label: 'Customer Satisfaction',
    icon: Smile,
    description: 'Based on 1,500+ reviews',
  },
  {
    target: 24,
    suffix: '/7',
    label: 'Dedicated Support',
    icon: Headphones,
    description: 'Round-the-clock technical help',
  },
];

function CountUpNumber({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500; // ms
    const increment = Math.ceil(target / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-navy via-navy-800 to-navy text-white relative overflow-hidden">
      
      {/* Subtle Glowing Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-accent-indigo/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-accent-purple/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center flex flex-col items-center hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-accent-cyan flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 font-sans">
                  <CountUpNumber target={stat.target} suffix={stat.suffix} inView={isInView} />
                </div>

                <h4 className="text-base font-bold text-slate-200 mb-1">
                  {stat.label}
                </h4>

                <p className="text-xs text-slate-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
