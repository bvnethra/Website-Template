import React from "react";
import { X, Sparkles, Wine, Clock, Flame, ShieldAlert, Calendar, Check } from "lucide-react";

export default function DishModal({ dish, onClose, onBookTableWithDish }) {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "880px",
          overflow: "hidden",
          borderRadius: "var(--radius-lg)"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "rgba(10, 11, 15, 0.8)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            color: "var(--text-primary)",
            zIndex: 10,
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          aria-label="Close Dish Details"
        >
          <X size={20} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            maxHeight: "85vh",
            overflowY: "auto"
          }}
        >
          {/* Left Column: Full-height High-Res Food Visual */}
          <div style={{ position: "relative", minHeight: "360px", backgroundColor: "#0b0c10" }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(15, 18, 24, 0.9) 0%, transparent 60%)"
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end"
              }}
            >
              <div>
                <span className="gold-badge" style={{ marginBottom: "6px" }}>
                  Dish #{dish.number} • {dish.category}
                </span>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: "#fff", fontWeight: 600 }}>
                  ${dish.price}
                </div>
              </div>

              {dish.isSignature && (
                <span
                  style={{
                    background: "var(--gold-gradient)",
                    color: "#000",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <Sparkles size={12} /> Chef's Signature
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Culinary Composition */}
          <div style={{ padding: "2.2rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-primary)", marginBottom: "4px" }}>
                {dish.tagline || "Haute Gastronomy"}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.2rem",
                  color: "var(--text-primary)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                  marginBottom: "1rem"
                }}
              >
                {dish.name}
              </h3>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem"
                }}
              >
                {dish.longDescription || dish.description}
              </p>

              {/* Curated Ingredients */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    fontWeight: 600,
                    marginBottom: "8px"
                  }}
                >
                  Key Ingredients & Origins
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px"
                  }}
                >
                  {dish.ingredients?.map((ing, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold-primary)" }} />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sommelier Pairing Recommendation */}
              {dish.pairings && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(212, 175, 55, 0.08)",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "1.5rem"
                  }}
                >
                  <Wine size={18} color="#d4af37" />
                  <div>
                    <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-light)" }}>
                      Suggested Wine Pairing
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-primary)", fontWeight: 500 }}>
                      {dish.pairings}
                    </div>
                  </div>
                </div>
              )}

              {/* Allergens & Dietary Information */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  padding: "8px 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  marginBottom: "1.8rem"
                }}
              >
                <div>
                  Allergens: <span style={{ color: "var(--text-secondary)" }}>{dish.allergens?.join(", ") || "None"}</span>
                </div>
                <div>
                  Prep: <span style={{ color: "var(--text-secondary)" }}>{dish.prepTime || "Freshly Seared"}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => {
                  onBookTableWithDish(dish);
                  onClose();
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: "14px" }}
              >
                <Calendar size={16} />
                <span>Reserve Table for this Dish</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
