import React, { useState } from "react";
import { SLIDES } from "../data/slidesData";
import { ChevronUp, ChevronDown, Layers, Scroll, Calendar, Sparkles } from "lucide-react";

export default function SlideNavigator({
  currentSlide,
  onGoToSlide,
  onNextSlide,
  onPrevSlide,
  viewMode,
  onToggleViewMode,
  onOpenReservation
}) {
  const [hoveredDot, setHoveredDot] = useState(null);
  const activeSlideData = SLIDES[currentSlide] || SLIDES[0];

  return (
    <>
      {/* Right Side Vertical HUD (Slide Dots & Roman Numerals) */}
      <aside
        className="slide-vertical-hud"
        style={{
          position: "fixed",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 80,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "center"
        }}
        aria-label="Slide Deck Navigation"
      >
        {SLIDES.map((slide, idx) => {
          const isActive = currentSlide === idx;
          const isHovered = hoveredDot === idx;

          return (
            <div
              key={slide.id}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              {/* Tooltip on Hover */}
              {(isHovered || isActive) && (
                <div
                  style={{
                    position: "absolute",
                    right: "32px",
                    background: "rgba(10, 12, 17, 0.92)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid var(--border-gold)",
                    borderRadius: "var(--radius-sm)",
                    padding: "4px 10px",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                    animation: "fadeIn 0.2s ease",
                    pointerEvents: "none"
                  }}
                >
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "0.78rem", color: "var(--gold-primary)", fontWeight: 700 }}>
                    {slide.roman}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {slide.title}
                  </span>
                </div>
              )}

              {/* Dot / Button */}
              <button
                onClick={() => onGoToSlide(idx)}
                onMouseEnter={() => setHoveredDot(idx)}
                onMouseLeave={() => setHoveredDot(null)}
                style={{
                  width: isActive ? "28px" : "12px",
                  height: isActive ? "28px" : "12px",
                  borderRadius: "50%",
                  background: isActive
                    ? "var(--gold-gradient)"
                    : isHovered
                    ? "rgba(212, 175, 55, 0.4)"
                    : "rgba(255, 255, 255, 0.15)",
                  border: isActive
                    ? "1px solid #fff"
                    : "1px solid rgba(212, 175, 55, 0.2)",
                  color: "#08090c",
                  fontFamily: "var(--font-serif)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isActive ? "0 0 15px rgba(212, 175, 55, 0.8)" : "none"
                }}
                aria-label={`Go to slide ${slide.roman}: ${slide.title}`}
              >
                {isActive ? slide.roman : ""}
              </button>
            </div>
          );
        })}
      </aside>

      {/* Bottom Floating Control Deck / Dock */}
      <div
        className="slide-bottom-dock"
        style={{
          position: "fixed",
          bottom: "22px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 80,
          background: "rgba(12, 14, 20, 0.88)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid var(--border-gold)",
          borderRadius: "var(--radius-full)",
          padding: "6px 12px 6px 18px",
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.15)"
        }}
      >
        {/* Slide Counter & Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--gold-primary)"
            }}
          >
            {activeSlideData.roman}
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-primary)" }}>
              {activeSlideData.title}
            </span>
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              SLIDE {activeSlideData.number} OF 10
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "24px", background: "rgba(212, 175, 55, 0.25)" }} />

        {/* Up / Down Navigation Arrows */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={onPrevSlide}
            disabled={currentSlide === 0}
            className="btn-icon"
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              color: currentSlide === 0 ? "var(--text-dim)" : "var(--gold-light)",
              cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              borderRadius: "50%"
            }}
            aria-label="Previous Slide (Arrow Up)"
            title="Previous Slide (↑)"
          >
            <ChevronUp size={16} />
          </button>

          <button
            onClick={onNextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className="btn-icon"
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              color: currentSlide === SLIDES.length - 1 ? "var(--text-dim)" : "var(--gold-light)",
              cursor: currentSlide === SLIDES.length - 1 ? "not-allowed" : "pointer",
              borderRadius: "50%"
            }}
            aria-label="Next Slide (Arrow Down)"
            title="Next Slide (↓)"
          >
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "24px", background: "rgba(212, 175, 55, 0.25)" }} />

        {/* Mode Switcher Toggle */}
        <button
          onClick={onToggleViewMode}
          className="btn-outline"
          style={{
            padding: "6px 14px",
            fontSize: "0.68rem",
            borderRadius: "var(--radius-full)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: viewMode === "slide" ? "rgba(212, 175, 55, 0.15)" : "transparent",
            borderColor: viewMode === "slide" ? "var(--gold-primary)" : "rgba(212, 175, 55, 0.25)"
          }}
          title="Switch between Cinematic Slide Deck and Continuous Scroll"
        >
          {viewMode === "slide" ? (
            <>
              <Layers size={13} color="#d4af37" />
              <span>Slide Deck</span>
            </>
          ) : (
            <>
              <Scroll size={13} color="#d4af37" />
              <span>Full Scroll</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .slide-vertical-hud {
            display: none !important;
          }
          .slide-bottom-dock {
            bottom: 12px !important;
            padding: 6px 12px !important;
            gap: 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
}
