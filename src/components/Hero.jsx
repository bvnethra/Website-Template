import React from "react";
import { ArrowDown, Calendar, Compass, Sparkles, Star } from "lucide-react";

export default function Hero({ onOpenReservation, onExploreMenu }) {
  const scrollToDiscover = () => {
    const storySection = document.getElementById("story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "120px 1.5rem 80px"
      }}
    >
      {/* Background Image with Slow Zoom Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90')",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          transform: "scale(1.05)",
          animation: "heroZoom 20s infinite alternate ease-in-out",
          zIndex: 1
        }}
      />

      {/* Cinematic Dark Gradient Layers */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at center, rgba(8, 9, 12, 0.4) 0%, rgba(8, 9, 12, 0.85) 60%, rgba(8, 9, 12, 0.98) 100%),
            linear-gradient(to top, rgba(8, 9, 12, 1) 0%, rgba(8, 9, 12, 0.5) 40%, rgba(8, 9, 12, 0.4) 70%, rgba(8, 9, 12, 0.9) 100%)
          `,
          zIndex: 2
        }}
      />

      {/* Ambient Gold Ray Effect */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)",
          filter: "blur(40px)",
          zIndex: 2,
          pointerEvents: "none"
        }}
      />

      {/* Hero Content Box */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: "920px",
          animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}
      >
        {/* Prestige Tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(18, 20, 27, 0.75)",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            padding: "8px 20px",
            borderRadius: "9999px",
            backdropFilter: "blur(10px)",
            marginBottom: "2rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}
        >
          <div style={{ display: "flex", gap: "2px" }}>
            {[...Array(3)].map((_, i) => (
              <Star key={i} size={13} fill="#d4af37" color="#d4af37" />
            ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold-light)"
            }}
          >
            Three-Star Michelin Excellence • Manhattan
          </span>
        </div>

        {/* Brand Name Title */}
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3.4rem, 8.5vw, 6.8rem)",
            fontWeight: 400,
            letterSpacing: "0.15em",
            lineHeight: 1.05,
            color: "var(--text-primary)",
            marginBottom: "0.8rem",
            textShadow: "0 8px 40px rgba(0,0,0,0.8)"
          }}
        >
          ÉLANE
        </h1>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--gold-light)",
            letterSpacing: "0.04em",
            marginBottom: "1.8rem"
          }}
        >
          "Where Every Plate Becomes a Memory."
        </div>

        {/* Supporting Narrative */}
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
            fontWeight: 300,
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            maxWidth: "680px",
            margin: "0 auto 2.8rem",
            letterSpacing: "0.02em"
          }}
        >
          An elevated dining experience where contemporary cuisine, refined hospitality, and unforgettable moments come together in the heart of Manhattan.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            flexWrap: "wrap",
            marginBottom: "3.5rem"
          }}
        >
          <button
            onClick={() => onOpenReservation()}
            className="btn btn-primary"
            style={{
              padding: "16px 36px",
              fontSize: "0.88rem",
              boxShadow: "0 6px 30px rgba(212, 175, 55, 0.35)"
            }}
          >
            <Calendar size={18} />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={() => {
              if (onExploreMenu) onExploreMenu();
              else {
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="btn btn-outline"
            style={{
              padding: "16px 34px",
              fontSize: "0.88rem"
            }}
          >
            <Compass size={18} />
            <span>Explore Menu</span>
          </button>
        </div>

        {/* Floating Quick Info Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
            padding: "12px 30px",
            background: "rgba(14, 16, 22, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "var(--radius-full)",
            backdropFilter: "blur(12px)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}></span>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
              Dinner Service Tonight: <strong style={{ color: "var(--gold-light)", fontWeight: 600 }}>5:30 PM – 11:00 PM</strong>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles size={13} color="#d4af37" />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
              Seasonal Spring/Summer Tasting Available
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToDiscover}
        style={{
          position: "absolute",
          bottom: "35px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          transition: "color 0.2s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        aria-label="Scroll to discover ÉLANE"
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 600
          }}
        >
          Scroll To Discover
        </span>
        <div
          style={{
            width: "24px",
            height: "40px",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px"
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              background: "var(--gold-primary)",
              borderRadius: "2px",
              animation: "scrollDot 1.6s infinite ease-in-out"
            }}
          />
        </div>
      </button>

      {/* Hero Animations */}
      <style>{`
        @keyframes heroZoom {
          0% { transform: scale(1.03); }
          100% { transform: scale(1.1); }
        }
        @keyframes scrollDot {
          0% { transform: translateY(0); opacity: 1; }
          60% { transform: translateY(12px); opacity: 0.2; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
