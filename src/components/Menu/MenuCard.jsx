import React, { useState } from "react";
import { Eye, Sparkles, Plus, Wine } from "lucide-react";

export default function MenuCard({ dish, onClick, onSelectForReservation }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card interactive-card"
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.18)"
          : "0 6px 20px rgba(0, 0, 0, 0.4)",
        borderColor: isHovered ? "var(--border-gold)" : "var(--border-subtle)",
        background: isHovered ? "rgba(22, 26, 35, 0.95)" : "rgba(14, 16, 22, 0.75)"
      }}
    >
      {/* Dish Image Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "230px",
          overflow: "hidden",
          backgroundColor: "#111"
        }}
      >
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isHovered ? "scale(1.08)" : "scale(1.0)",
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(14, 16, 22, 0.95) 0%, rgba(14, 16, 22, 0.2) 60%, transparent 100%)"
          }}
        />

        {/* Dish Index Number Badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            background: "rgba(10, 11, 14, 0.8)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            color: "var(--gold-primary)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: "var(--radius-full)",
            letterSpacing: "0.1em"
          }}
        >
          {dish.number}
        </div>

        {/* Category Tag & Badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            display: "flex",
            gap: "6px"
          }}
        >
          {dish.isSignature && (
            <span
              style={{
                background: "var(--gold-gradient)",
                color: "#000",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <Sparkles size={10} /> Signature
            </span>
          )}
          <span
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(6px)",
              color: "var(--text-secondary)",
              fontSize: "0.68rem",
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: "var(--radius-full)"
            }}
          >
            {dish.category}
          </span>
        </div>

        {/* Hover "View Dish" Overlay Button */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(8, 9, 12, 0.45)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              background: "rgba(212, 175, 55, 0.95)",
              color: "#08090c",
              padding: "10px 20px",
              borderRadius: "var(--radius-full)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.6)",
              transform: isHovered ? "translateY(0)" : "translateY(10px)",
              transition: "transform 0.3s ease"
            }}
          >
            <Eye size={14} />
            <span>View Dish Details</span>
          </div>
        </div>
      </div>

      {/* Card Content Details */}
      <div
        style={{
          padding: "1.4rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between"
        }}
      >
        <div>
          {/* Header with Title & Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "0.5rem"
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.45rem",
                color: "var(--text-primary)",
                fontWeight: 500,
                lineHeight: 1.2
              }}
            >
              {dish.name}
            </h3>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                color: "var(--gold-primary)",
                fontWeight: 600,
                whiteSpace: "nowrap"
              }}
            >
              ${dish.price}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: "0.86rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "1.2rem"
            }}
          >
            {dish.description}
          </p>
        </div>

        {/* Bottom Details (Dietary & Action) */}
        <div
          style={{
            paddingTop: "0.8rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {dish.dietary?.map((tag, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "0.68rem",
                  color: "var(--gold-muted)",
                  background: "rgba(212, 175, 55, 0.08)",
                  padding: "2px 8px",
                  borderRadius: "4px"
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: isHovered ? "var(--gold-light)" : "var(--text-muted)",
              transition: "color 0.2s ease"
            }}
          >
            Explore →
          </span>
        </div>
      </div>
    </div>
  );
}
