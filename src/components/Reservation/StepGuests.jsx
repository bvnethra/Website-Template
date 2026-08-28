import React from "react";
import { ChevronLeft, ChevronRight, Users, Heart, Sparkles, GlassWater } from "lucide-react";

export default function StepGuests({
  guestCount,
  onSelectGuests,
  seatingPreference,
  onSelectPreference,
  occasion,
  onSelectOccasion,
  onNext,
  onPrev
}) {
  const guestOptions = [
    { value: 1, label: "1 Guest", note: "Solo Connoisseur" },
    { value: 2, label: "2 Guests", note: "Intimate Pairing" },
    { value: 3, label: "3 Guests", note: "Small Party" },
    { value: 4, label: "4 Guests", note: "Banquette Seating" },
    { value: 5, label: "5 Guests", note: "Salon Table" },
    { value: 6, label: "6+ Guests", note: "Private / Group" }
  ];

  const seatingOptions = [
    { id: "Indoor Dining", label: "Indoor Dining", desc: "Velvet booths & chandeliers" },
    { id: "Window Table", label: "Window Table", desc: "Manhattan skyline view" },
    { id: "Private Dining", label: "Private Dining", desc: "Acoustic luxury suite" },
    { id: "Outdoor Terrace", label: "Outdoor Terrace", desc: "Heated rooftop garden" }
  ];

  const occasions = [
    "Anniversary Celebration",
    "Birthday Dinner",
    "Romantic Evening",
    "Business & Executive",
    "First Visit to ÉLANE",
    "Casual Fine Dining"
  ];

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="section-tag" style={{ margin: 0 }}>Step 03 / 05</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: "0.4rem", color: "var(--text-primary)" }}>
          Party Size & Seating Preference
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          Parties of 6 or more include dedicated sommelier coordination.
        </p>
      </div>

      {/* Guest Count Options */}
      <div style={{ marginBottom: "2.2rem" }}>
        <div style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-light)", fontWeight: 600, marginBottom: "0.8rem" }}>
          Number of Guests
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.8rem"
          }}
        >
          {guestOptions.map((opt) => {
            const isSelected = guestCount === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => onSelectGuests(opt.value)}
                className="interactive-card"
                style={{
                  background: isSelected ? "var(--gold-gradient)" : "rgba(18, 22, 30, 0.7)",
                  border: isSelected ? "1px solid var(--gold-primary)" : "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 10px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "translateY(-3px)" : "none",
                  boxShadow: isSelected ? "0 8px 20px rgba(212, 175, 55, 0.3)" : "none"
                }}
              >
                <Users size={16} color={isSelected ? "#08090c" : "#d4af37"} />
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: isSelected ? "#08090c" : "var(--text-primary)"
                  }}
                >
                  {opt.label}
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: isSelected ? "#08090c" : "var(--text-muted)"
                  }}
                >
                  {opt.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Seating Atmosphere Preference */}
      <div style={{ marginBottom: "2.2rem" }}>
        <div style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-light)", fontWeight: 600, marginBottom: "0.8rem" }}>
          Seating Preference
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "0.8rem"
          }}
        >
          {seatingOptions.map((opt) => {
            const isSelected = seatingPreference === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectPreference(opt.id)}
                className="interactive-card"
                style={{
                  background: isSelected ? "rgba(212, 175, 55, 0.15)" : "rgba(18, 22, 30, 0.6)",
                  border: isSelected ? "1px solid var(--gold-primary)" : "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease"
                }}
              >
                <div style={{ color: isSelected ? "var(--gold-light)" : "var(--text-primary)", fontWeight: 600, fontSize: "0.92rem", marginBottom: "3px" }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion Tags */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-light)", fontWeight: 600, marginBottom: "0.8rem" }}>
          Dining Occasion (Optional)
        </div>
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {occasions.map((occ) => {
            const isSelected = occasion === occ;
            return (
              <button
                key={occ}
                onClick={() => onSelectOccasion(isSelected ? "" : occ)}
                style={{
                  background: isSelected ? "rgba(212, 175, 55, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  border: isSelected ? "1px solid var(--gold-primary)" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isSelected ? "var(--gold-light)" : "var(--text-secondary)",
                  fontSize: "0.75rem",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {occ}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onPrev} className="btn btn-outline" style={{ padding: "12px 24px" }}>
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          disabled={!guestCount || !seatingPreference}
          className="btn btn-primary"
          style={{
            opacity: guestCount && seatingPreference ? 1 : 0.4,
            cursor: guestCount && seatingPreference ? "pointer" : "not-allowed",
            padding: "14px 32px"
          }}
        >
          <span>Continue to Table Selection</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
