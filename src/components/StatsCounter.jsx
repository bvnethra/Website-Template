import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle2, Hammer, Users, Star } from 'lucide-react';

export const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { target: 14, suffix: "+", label: "Years of Experience", icon: Award, decimals: 0 },
    { target: 85, suffix: "+", label: "Projects Delivered", icon: CheckCircle2, decimals: 0 },
    { target: 12, suffix: "+", label: "Projects in Progress", icon: Hammer, decimals: 0 },
    { target: 1200, suffix: "+", label: "Satisfied Clients", icon: Users, decimals: 0 },
    { target: 4.8, suffix: "★", label: "Client Satisfaction", icon: Star, decimals: 1 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section-wrap" aria-label="Company Statistics">
      <div className="container">
        <div className="stats-glass-bar">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="stat-item-box">
              <div className="stat-metric-number font-display">
                <CounterNumber 
                  target={stat.target} 
                  decimals={stat.decimals} 
                  suffix={stat.suffix} 
                  animate={isVisible} 
                />
              </div>
              <div className="stat-metric-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CounterNumber = ({ target, decimals, suffix, animate }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let start = 0;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;

      if (frame === totalFrames) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(current);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [animate, target]);

  return (
    <span>
      {decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
};
