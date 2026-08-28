import { useEffect, useRef } from 'react';

const TEXT_ITEMS = ["CREATE", "THINK", "DESIGN", "BUILD", "EXPERIENCE", "INNOVATE", "TRANSFORM"];

export default function Marquee() {
  const marquee1Ref = useRef(null);
  const marquee2Ref = useRef(null);
  const scrollPosRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let animationFrameId;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const diff = currentScroll - lastScroll;
      lastScroll = currentScroll;
      
      // Calculate velocity with smoothing
      velocityRef.current = diff * 0.4;
    };

    window.addEventListener('scroll', handleScroll);

    // Continuous update loop
    let offset1 = 0;
    let offset2 = 0;

    const tick = () => {
      // Decay velocity slowly
      velocityRef.current *= 0.95;

      // Base speed plus scroll velocity
      const baseSpeed = 1;
      const speed1 = baseSpeed + velocityRef.current;
      const speed2 = -baseSpeed + velocityRef.current;

      offset1 += speed1;
      offset2 += speed2;

      // Apply style translations and a slight rotation proportional to velocity
      const skew = Math.min(Math.max(velocityRef.current * 0.2, -6), 6);
      
      if (marquee1Ref.current) {
        marquee1Ref.current.style.transform = `translateX(${offset1 % 50}%) skewX(${skew}deg)`;
      }
      if (marquee2Ref.current) {
        marquee2Ref.current.style.transform = `translateX(${offset2 % 50}%) skewX(${-skew}deg)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderMarqueeRow = (ref, isReverse) => {
    // Duplicate items to ensure seamless loop
    const content = [...TEXT_ITEMS, ...TEXT_ITEMS, ...TEXT_ITEMS, ...TEXT_ITEMS];
    return (
      <div className={`marquee-row-wrapper ${isReverse ? 'reverse' : ''}`}>
        <div ref={ref} className="marquee-content">
          {content.map((text, idx) => (
            <span key={idx} className="marquee-text">
              {text} <span className="marquee-dot">★</span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="marquee-section-container">
      {renderMarqueeRow(marquee1Ref, false)}
      {renderMarqueeRow(marquee2Ref, true)}

      <style>{`
        .marquee-section-container {
          background-color: var(--bg-paper);
          border-top: var(--border-sketch);
          border-bottom: var(--border-sketch);
          padding: 1.5rem 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .marquee-row-wrapper {
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .marquee-content {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
          transition: transform 0.05s linear;
        }

        .marquee-text {
          font-family: var(--font-sans);
          font-weight: 900;
          font-size: clamp(2rem, 4.5vw, 4.5rem);
          color: var(--text-charcoal);
          padding-right: 2.5rem;
          user-select: none;
          display: inline-flex;
          align-items: center;
          gap: 1.5rem;
        }

        .marquee-dot {
          color: var(--accent-coral);
          font-size: 2rem;
        }

        .marquee-row-wrapper.reverse .marquee-text {
          color: var(--accent-green);
          -webkit-text-stroke: 1px var(--text-charcoal);
        }

        .marquee-row-wrapper.reverse .marquee-dot {
          color: var(--accent-yellow);
        }
      `}</style>
    </div>
  );
}
