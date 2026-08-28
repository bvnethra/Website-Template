import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * MagneticButton Component
 * Premium button with physics-based cursor attraction and fluid hover elevation.
 */
export const MagneticButton = ({
  children,
  onClick,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'pill'
  size = 'md', // 'sm' | 'md' | 'lg'
  strength = 0.35, // Magnetic pull coefficient
  textStrength = 0.5, // Parallax text/icon pull coefficient
  icon,
  iconPosition = 'right',
  fullWidth = false,
  disabled = false,
  className = '',
  style = {},
  type = 'button',
  href,
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw cursor position relative to button center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics spring configurations
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  // Parallax translation for text/icons inside the button for multi-layered depth
  const textX = useTransform(buttonX, (v) => v * (textStrength / (strength || 1)));
  const textY = useTransform(buttonY, (v) => v * (textStrength / (strength || 1)));

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Size styles
  const sizeStyles = {
    sm: { padding: '8px 18px', fontSize: '13px', borderRadius: '10px', gap: '6px' },
    md: { padding: '12px 26px', fontSize: '14.5px', borderRadius: '14px', gap: '8px' },
    lg: { padding: '16px 36px', fontSize: '16px', borderRadius: '18px', gap: '10px' },
  };

  // Base and Variant Visual Styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--accent-gradient)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: isHovered
            ? 'var(--shadow-magnetic)'
            : '0 4px 14px -2px var(--accent-glow)',
        };
      case 'glow':
        return {
          background: 'var(--accent-primary)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: isHovered
            ? '0 0 25px var(--accent-glow-strong), 0 8px 20px rgba(0,0,0,0.1)'
            : '0 0 12px var(--accent-glow)',
        };
      case 'secondary':
        return {
          background: 'var(--bg-surface-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-medium)',
          boxShadow: isHovered ? 'var(--shadow-card)' : 'var(--shadow-subtle)',
        };
      case 'outline':
        return {
          background: isHovered ? 'var(--bg-surface-subtle)' : 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'none',
        };
      case 'ghost':
        return {
          background: isHovered ? 'var(--bg-surface-subtle)' : 'transparent',
          color: 'var(--text-primary)',
          border: '1px solid transparent',
          boxShadow: 'none',
        };
      case 'pill':
        return {
          background: 'var(--bg-surface-glass)',
          backdropFilter: 'blur(16px)',
          color: 'var(--text-primary)',
          border: '1px solid var(--bg-surface-glass-border)',
          borderRadius: '9999px',
          boxShadow: isHovered ? 'var(--shadow-elevated)' : 'var(--shadow-subtle)',
        };
      default:
        return {};
    }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.md;
  const variantStyle = getVariantStyles();

  const buttonBaseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    position: 'relative',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
    userSelect: 'none',
    ...selectedSize,
    ...variantStyle,
    ...style,
  };

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      type={href ? undefined : type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...buttonBaseStyle,
        x: buttonX,
        y: buttonY,
      }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`magnetic-btn magnetic-btn-${variant} ${className}`}
    >
      <motion.span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: selectedSize.gap,
          x: textX,
          y: textY,
          pointerEvents: 'none',
        }}
      >
        {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
      </motion.span>
    </MotionComponent>
  );
};

export default MagneticButton;
