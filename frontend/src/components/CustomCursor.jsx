import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only active on desktop fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Outer subtle ring or label box */}
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
          isHovered
            ? 'w-16 h-16 bg-soft-white text-charcoal shadow-2xl scale-110'
            : 'w-6 h-6 border border-soft-white/40 bg-charcoal/20 backdrop-blur-sm'
        }`}
      >
        {isHovered && (
          <span className="font-mono-tech text-[10px] tracking-widest uppercase font-medium">
            {cursorText}
          </span>
        )}
      </div>

      {/* Precise crosshair center dot when not hovered */}
      {!isHovered && (
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-soft-white rounded-full -translate-x-1/2 -translate-y-1/2" />
      )}
    </div>
  );
}
