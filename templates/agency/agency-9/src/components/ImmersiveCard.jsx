import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ImmersiveCard Component
 * Reusable spatial card with pure white background, diffuse elevation shadows,
 * 3D micro-tilt physics, and smooth hover interaction.
 */
export const ImmersiveCard = ({
  children,
  title,
  subtitle,
  badge,
  badgeVariant = 'primary', // 'primary' | 'cyan' | 'emerald' | 'amber' | 'neutral'
  icon,
  onClick,
  interactive = true,
  tiltIntensity = 12, // Maximum degrees of 3D tilt
  padding = 'lg', // 'sm' | 'md' | 'lg' | 'xl' | 'none'
  elevation = 'card', // 'subtle' | 'card' | 'elevated' | 'floating'
  variant = 'solid', // 'solid' (pure white/dark surface) | 'glass' | 'subtle' | 'gradient-border'
  className = '',
  style = {},
  headerAction,
  footer,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseY, [-0.5, 0.5], [0.15, 0]), springConfig);

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Padding styles
  const paddingMap = {
    none: '0px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '44px',
  };

  // Elevation base & hover shadow
  const getElevationShadow = () => {
    if (isHovered && interactive) {
      return elevation === 'floating'
        ? 'var(--shadow-floating)'
        : 'var(--shadow-elevated)';
    }
    switch (elevation) {
      case 'subtle':
        return 'var(--shadow-subtle)';
      case 'elevated':
        return 'var(--shadow-elevated)';
      case 'floating':
        return 'var(--shadow-floating)';
      case 'card':
      default:
        return 'var(--shadow-card)';
    }
  };

  // Surface background variants
  const getBackgroundStyle = () => {
    switch (variant) {
      case 'glass':
        return {
          background: 'var(--bg-surface-glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: isHovered ? 'var(--border-accent)' : 'var(--bg-surface-glass-border)',
        };
      case 'subtle':
        return {
          background: 'var(--bg-surface-subtle)',
          borderColor: isHovered ? 'var(--border-medium)' : 'var(--border-subtle)',
        };
      case 'gradient-border':
        return {
          background: 'var(--bg-surface)',
          borderColor: isHovered ? 'var(--accent-primary)' : 'var(--border-subtle)',
        };
      case 'solid':
      default:
        return {
          background: 'var(--bg-surface)',
          borderColor: isHovered ? 'var(--border-medium)' : 'var(--border-subtle)',
        };
    }
  };

  const badgeStyles = {
    primary: { bg: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent-primary)', border: 'rgba(37, 99, 235, 0.2)' },
    cyan: { bg: 'rgba(2, 132, 199, 0.1)', color: 'var(--accent-cyan)', border: 'rgba(2, 132, 199, 0.2)' },
    emerald: { bg: 'rgba(5, 150, 105, 0.1)', color: 'var(--accent-emerald)', border: 'rgba(5, 150, 105, 0.2)' },
    amber: { bg: 'rgba(217, 119, 6, 0.1)', color: 'var(--accent-amber)', border: 'rgba(217, 119, 6, 0.2)' },
    neutral: { bg: 'var(--bg-surface-subtle)', color: 'var(--text-secondary)', border: 'var(--border-medium)' },
  };

  const currentBadgeStyle = badgeStyles[badgeVariant] || badgeStyles.primary;
  const bgStyle = getBackgroundStyle();

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        width: '100%',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      className={`immersive-card-wrapper ${className}`}
    >
      <motion.div
        style={{
          borderRadius: '20px',
          borderWidth: '1px',
          borderStyle: 'solid',
          padding: paddingMap[padding] || paddingMap.lg,
          boxShadow: getElevationShadow(),
          y: isHovered && interactive ? -6 : 0,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          willChange: 'transform, box-shadow',
          transition: 'box-shadow 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, background 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...bgStyle,
        }}
        className="immersive-card"
      >
        {/* Subtle Ambient Light Shimmer Overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%)',
            opacity: isHovered ? glareOpacity : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Card Header Section */}
        {(title || subtitle || icon || badge || headerAction) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: children ? '20px' : '0px',
              gap: '16px',
            }}
            className="card-header"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {icon && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--accent-primary)',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
              )}
              <div>
                {title && (
                  <h3
                    style={{
                      margin: 0,
                      fontSize: '19px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.25,
                    }}
                  >
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '13.5px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.4,
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {badge && (
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: currentBadgeStyle.bg,
                    color: currentBadgeStyle.color,
                    border: `1px solid ${currentBadgeStyle.border}`,
                  }}
                >
                  {badge}
                </span>
              )}
              {headerAction}
            </div>
          </div>
        )}

        {/* Card Body Content */}
        {children && (
          <div style={{ flex: 1, position: 'relative', zIndex: 1 }} className="card-body">
            {children}
          </div>
        )}

        {/* Card Footer Section */}
        {footer && (
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              position: 'relative',
              zIndex: 1,
            }}
            className="card-footer"
          >
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ImmersiveCard;
