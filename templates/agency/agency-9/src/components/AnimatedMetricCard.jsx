import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

/**
 * AnimatedNumber - Counts up smoothly from 0 to target value when in viewport
 */
export const AnimatedNumber = ({
  value,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(0);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  useEffect(() => {
    let lastFormatted = null;
    const unsubscribe = springValue.on('change', (latest) => {
      const formatted = Number(latest.toFixed(decimals));
      if (formatted !== lastFormatted) {
        lastFormatted = formatted;
        setDisplayValue(formatted);
      }
    });
    return () => unsubscribe();
  }, [springValue, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

/**
 * AnimatedMetricCard Component (Phase 7 Deliverable)
 * Compact metric card with scroll-triggered counting animation,
 * strict 1px borders, generous whitespace padding, and spark progress bar.
 */
export const AnimatedMetricCard = ({
  label,
  value,
  targetNumber,
  prefix = '',
  suffix = '',
  decimals = 0,
  subtext,
  trend,
  trendDirection = 'up', // 'up' | 'down' | 'neutral'
  progressPercent,
  icon,
  border = true,
  dense = false,
  className = '',
  style = {},
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const trendColor =
    trendDirection === 'up'
      ? 'var(--accent-emerald)'
      : trendDirection === 'down'
      ? 'var(--accent-rose)'
      : 'var(--text-muted)';

  return (
    <div
      ref={cardRef}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '16px',
        border: border ? '1px solid var(--border-medium)' : 'none',
        padding: dense ? '16px' : '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-subtle)',
        transition: 'all 0.3s ease',
        ...style,
      }}
      className={`animated-metric-card ${className}`}
    >
      {/* Label and Icon Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontSize: '11.5px',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {label}
        </span>
        {icon && (
          <span
            style={{
              color: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </span>
        )}
      </div>

      {/* Numerical Counter */}
      <div>
        <div
          style={{
            fontSize: dense ? '24px' : '32px',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}
        >
          {typeof targetNumber === 'number' ? (
            <AnimatedNumber
              value={targetNumber}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals}
            />
          ) : (
            value
          )}
        </div>

        {/* Trend / Subtext details */}
        {(trend || subtext) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px',
              fontSize: '12px',
            }}
          >
            {trend && (
              <span
                style={{
                  fontWeight: 700,
                  color: trendColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2px',
                }}
              >
                {trendDirection === 'up' && '▲ '}
                {trendDirection === 'down' && '▼ '}
                {trend}
              </span>
            )}
            {subtext && <span style={{ color: 'var(--text-muted)' }}>{subtext}</span>}
          </div>
        )}

        {/* Progress Bar (if provided) */}
        {typeof progressPercent === 'number' && (
          <div
            style={{
              marginTop: '12px',
              height: '4px',
              borderRadius: '9999px',
              background: 'var(--border-subtle)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isInView ? `${progressPercent}%` : 0 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              style={{
                height: '100%',
                background: 'var(--accent-gradient)',
                borderRadius: '9999px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedMetricCard;
