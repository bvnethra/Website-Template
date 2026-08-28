import React from "react";
import { EXPERIENCES } from "../data/experiencesData";
import { Sparkles, Calendar, ArrowRight, Check } from "lucide-react";

export default function Experiences({ onOpenReservation }) {
  return (
    <section id="experiences" className="section" style={{ backgroundColor: "#0b0c10" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-tag">Curated Gastronomy</span>
          <h2 className="section-title">EXCLUSIVE DINING EXPERIENCES</h2>
          <p className="section-subtitle">
            From intimate private salons to front-row kitchen counter alchemy, discover bespoke ways to experience ÉLANE.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem"
          }}
        >
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="glass-card interactive-card"
              style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "all 0.35s ease"
              }}
            >
              {/* Card Image */}
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img
                  src={exp.image}
                  alt={exp.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(14, 16, 22, 0.95) 0%, rgba(14, 16, 22, 0.3) 60%, transparent 100%)"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "14px",
                    background: "rgba(10, 11, 15, 0.8)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid var(--border-gold)",
                    color: "var(--gold-light)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)"
                  }}
                >
                  {exp.price}
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    left: "16px"
                  }}
                >
                  <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gold-primary)" }}>
                    {exp.subtitle}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "#fff", lineHeight: 1.1 }}>
                    {exp.title}
                  </h3>
                </div>
              </div>

              {/* Card Content */}
              <div
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.05rem",
                      fontStyle: "italic",
                      color: "var(--gold-light)",
                      marginBottom: "0.8rem",
                      lineHeight: 1.4
                    }}
                  >
                    "{exp.tagline}"
                  </p>
                  <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.4rem" }}>
                    {exp.description}
                  </p>

                  {/* Bullet points */}
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1.8rem" }}>
                    {exp.features.map((feat, idx) => (
                      <li key={idx} style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <Check size={13} color="#d4af37" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking Link */}
                <button
                  onClick={() => onOpenReservation()}
                  className="btn btn-outline"
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "0.78rem",
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                >
                  <Calendar size={14} />
                  <span>Reserve {exp.title}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
