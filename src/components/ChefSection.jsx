import React, { useState } from "react";
import { Award, Sparkles, BookOpen, Star, UtensilsCrossed } from "lucide-react";
import { ACCOLADES } from "../data/experiencesData";

export default function ChefSection({ onOpenReservation }) {
  const [activeTab, setActiveTab] = useState("philosophy");

  return (
    <section id="chef" className="section" style={{ backgroundColor: "#08090c", position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center"
          }}
        >
          {/* Left Column: Portrait & Floating Badges */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-gold)",
                boxShadow: "0 25px 70px rgba(0,0,0,0.8)"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85"
                alt="Executive Chef Adrian Laurent"
                style={{
                  width: "100%",
                  height: "580px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.2) 60%, transparent 100%)"
                }}
              />

              {/* Bottom Portrait Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "25px",
                  left: "25px",
                  right: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end"
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    Adrian Laurent
                  </div>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-primary)" }}>
                    Executive Chef & Culinary Visionary
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(10, 11, 15, 0.85)",
                    border: "1px solid var(--border-gold)",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-full)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <Star size={12} fill="#d4af37" color="#d4af37" />
                  <span style={{ fontSize: "0.72rem", color: "var(--gold-light)", fontWeight: 600 }}>3 Stars</span>
                </div>
              </div>
            </div>

            {/* Corner Luxury Trim */}
            <div
              style={{
                position: "absolute",
                bottom: "-15px",
                right: "-15px",
                width: "140px",
                height: "140px",
                borderBottom: "2px solid var(--gold-primary)",
                borderRight: "2px solid var(--gold-primary)",
                pointerEvents: "none",
                zIndex: 0
              }}
            />
          </div>

          {/* Right Column: Editorial Narrative, Quote & Accolades */}
          <div>
            <span className="section-tag">The Master Craftsman</span>
            <h2 className="section-title">THE ART BEHIND THE PLATE</h2>

            {/* Chef Quote Card */}
            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.38rem",
                fontStyle: "italic",
                color: "var(--gold-light)",
                lineHeight: 1.6,
                borderLeft: "2px solid var(--gold-primary)",
                paddingLeft: "1.5rem",
                margin: "1.5rem 0 2rem"
              }}
            >
              "Driven by seasonality, technique, and a belief that exceptional food should feel both surprising and familiar."
            </blockquote>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "2rem"
              }}
            >
              Trained under Europe's most exacting masters before establishing ÉLANE in Manhattan, Chef Laurent synthesizes classical discipline with contemporary botanical forages. His cuisine elevates rare heirloom cuts and seasonal flora into unforgettable sensory landscapes.
            </p>

            {/* Accolades Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
                marginBottom: "2.5rem"
              }}
            >
              {ACCOLADES.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "12px 16px",
                    background: "rgba(18, 21, 28, 0.5)",
                    border: "1px solid rgba(212, 175, 55, 0.15)",
                    borderRadius: "var(--radius-sm)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-primary)", marginBottom: "3px" }}>
                    <Award size={15} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>{item.title}</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{item.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenReservation()}
                className="btn btn-primary"
                style={{ padding: "14px 30px" }}
              >
                <UtensilsCrossed size={16} />
                <span>Reserve Chef's Table</span>
              </button>

              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                Accepting reservations for the current season
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
