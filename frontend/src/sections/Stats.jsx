import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fetchStats } from '../services/api';
import { scaleUp, staggerContainer } from '../animations/animationVariants';

function AnimatedNumber({ value, duration = 1.5 }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) {
      setCurrent(value);
      return;
    }

    if (end === 0) return;

    const totalSteps = 60;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{current.toLocaleString()}</span>;
}

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <section id="stats" style={{ position: 'relative', zIndex: 3, padding: '40px 24px' }}>
      <div className="section-container">
        <motion.div
          variants={staggerContainer(0.15, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="stats-grid"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={scaleUp(idx * 0.1, 0.5)}
              className="glass-panel stat-card glow-effect"
              style={{
                padding: '30px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
              }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(6, 182, 212, 0.4)',
                boxShadow: '0 15px 35px -10px rgba(6, 182, 212, 0.25)',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: idx % 2 === 0 
                    ? 'linear-gradient(135deg, #fff, #3b82f6)' 
                    : 'linear-gradient(135deg, #fff, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <AnimatedNumber value={stat.count} />
                <span>{stat.suffix}</span>
              </h2>
              <p
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 991px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
