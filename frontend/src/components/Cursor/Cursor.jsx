import { useEffect, useState, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if touch device
    const checkTouch = () => {
      const touchCapable = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.matchMedia("(max-width: 1024px)").matches;
      setIsMobile(touchCapable);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isMobile) return;

    const cursor = cursorRef.current;
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth cursor interpolation (lerp)
    const render = () => {
      const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
      currentX = lerp(currentX, mouseX, 0.15);
      currentY = lerp(currentY, mouseY, 0.15);

      if (cursor) {
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    const animationId = requestAnimationFrame(render);

    // Event delegation for custom hover labels
    const onMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovered ? 'expanded' : ''}`}
      style={{
        display: isVisible ? 'flex' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      {isHovered && cursorText && (
        <span style={{ animation: 'fadeIn 0.2s forwards' }}>{cursorText}</span>
      )}
    </div>
  );
}
