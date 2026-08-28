import React, { useState, useEffect } from "react";
import { TESTIMONIALS } from "../data/experiencesData";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  // Auto advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="section" style={{ backgroundColor: "#0b0c10", position: "relative" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">Critical Acclaim</span>
          <h2 className="section-title">WORDS OF THE PATRONS</h2>
        </div>

        {/* Testimonial Stage */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, rgba(18, 22, 30, 0.8) 0%, rgba(12, 14, 20, 0.95) 100%)",
            border: "1px solid var(--border-gold)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            textAlign: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
              color: "var(--gold-primary)"
            }}
          >
            <Quote size={24} />
          </div>

          {/* Star Rating */}
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "1.5rem" }}>
            {[...Array(current.stars)].map((_, i) => (
              <Star key={i} size={18} fill="#d4af37" color="#d4af37" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.65rem)",
              fontStyle: "italic",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              marginBottom: "2rem",
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            "{current.quote}"
          </blockquote>

          {/* Author Details */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.3rem",
                fontWeight: 600,
                color: "var(--gold-light)",
                letterSpacing: "0.05em"
              }}
            >
              — {current.author}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
              {current.role} • <span style={{ color: "var(--text-muted)" }}>{current.date}</span>
            </div>
          </div>

          {/* Prev / Next Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "2.5rem"
            }}
          >
            <button
              onClick={prevSlide}
              className="btn-icon"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "var(--gold-light)",
                cursor: "pointer"
              }}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Indicator dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: idx === currentIndex ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: idx === currentIndex ? "var(--gold-primary)" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="btn-icon"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.2)",
                color: "var(--gold-light)",
                cursor: "pointer"
              }}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
