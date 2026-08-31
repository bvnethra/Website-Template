import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

/**
 * Geometric Masks SVG Definitions & Styles
 * Hexagonal Chamfer, Diagonal Slash, Spatial Octagon, and Capsule
 */
const geometricMaskShapes = {
  // Hexagonal Chamfer
  hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  // Sleek Diagonal Cut
  diagonal: 'polygon(12% 0%, 100% 0%, 88% 100%, 0% 100%)',
  // Chamfered Spatial Octagon
  octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
  // Spatial Diamond Shield
  shield: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
};

/**
 * TeamMemberCard Component (Phase 6 Deliverable)
 * Features static geometric SVG/CSS mask, internal photo zoom on hover,
 * centered high-contrast typography, and specialization metadata.
 */
export const TeamMemberCard = ({
  name,
  role,
  department,
  imageSrc,
  initials,
  gradientBg,
  maskType = 'hexagon', // 'hexagon' | 'diagonal' | 'octagon' | 'shield'
  credentials,
  bio,
  socialLinks = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const selectedClipPath = geometricMaskShapes[maskType] || geometricMaskShapes.hexagon;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: `1px solid ${isHovered ? 'var(--border-strong)' : 'var(--border-medium)'}`,
        boxShadow: isHovered ? 'var(--shadow-elevated)' : 'var(--shadow-card)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
      }}
      className="team-member-card"
    >
      {/* Top Department Badge */}
      {department && (
        <span
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            fontSize: '10.5px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            padding: '3px 8px',
            borderRadius: '6px',
            background: 'var(--bg-surface-subtle)',
            color: 'var(--accent-primary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {department}
        </span>
      )}

      {/* Static Geometric Mask Container with Internal Hover Zoom */}
      <div
        style={{
          width: '150px',
          height: '150px',
          position: 'relative',
          margin: '12px auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Glowing Geometric Outline Frame */}
        <div
          style={{
            position: 'absolute',
            inset: '-3px',
            clipPath: selectedClipPath,
            WebkitClipPath: selectedClipPath,
            background: isHovered ? 'var(--accent-gradient)' : 'var(--border-medium)',
            transition: 'background 0.35s ease',
            zIndex: 0,
          }}
        />

        {/* Masked Viewport (Static Mask) */}
        <div
          style={{
            position: 'absolute',
            inset: '0px',
            clipPath: selectedClipPath,
            WebkitClipPath: selectedClipPath,
            background: gradientBg || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {imageSrc ? (
            /* Internal Photo with smooth scale on hover */
            <motion.img
              src={imageSrc}
              alt={name}
              animate={{
                scale: isHovered ? 1.12 : 1,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            /* Fallback Stylized Geometric Monogram Avatar */
            <motion.div
              animate={{
                scale: isHovered ? 1.12 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                background: gradientBg || 'var(--accent-gradient)',
              }}
            >
              {initials}
            </motion.div>
          )}
        </div>
      </div>

      {/* Centered High-Contrast Profile Data */}
      <h3
        style={{
          fontSize: '19px',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          margin: '0 0 4px 0',
          lineHeight: 1.25,
        }}
      >
        {name}
      </h3>

      <div
        style={{
          fontSize: '13.5px',
          fontWeight: 600,
          color: 'var(--accent-primary)',
          letterSpacing: '-0.01em',
          marginBottom: '8px',
        }}
      >
        {role}
      </div>

      {credentials && (
        <div
          style={{
            fontSize: '11.5px',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
            marginBottom: '12px',
          }}
        >
          {credentials}
        </div>
      )}

      {bio && (
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
            margin: '0 0 16px 0',
            flex: 1,
          }}
        >
          {bio}
        </p>
      )}

      {/* Social / Contact Quick Action */}
      <div style={{ marginTop: 'auto', paddingTop: '12px', width: '100%' }}>
        <MagneticButton variant="secondary" size="sm" fullWidth>
          Connect Profile
        </MagneticButton>
      </div>
    </div>
  );
};

export default TeamMemberCard;
