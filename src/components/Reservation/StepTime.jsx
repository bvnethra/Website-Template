import React from "react";
import { ChevronLeft, ChevronRight, Clock, Sun, Moon, Sparkles } from "lucide-react";

export default function StepTime({ selectedTime, onSelectTime, onNext, onPrev }) {
  const dinnerSlots = [
    { time: "5:30 PM", label: "Early Twilight", available: true },
    { time: "6:00 PM", label: "Evening Seating", available: true },
    { time: "6:30 PM", label: "Sunset Ambiance", available: true },
    { time: "7:00 PM", label: "Prime Service", badge: "High Demand", available: true },
    { time: "7:30 PM", label: "Prime Service", badge: "Popular", available: true },
    { time: "8:00 PM", label: "Prime Service", badge: "High Demand", available: true },
    { time: "8:30 PM", label: "Chef's Cut", available: true },
    { time: "9:00 PM", label: "Candlelit Late", available: true },
    { time: "9:30 PM", label: "Late Night Salon", available: true }
  ];

  const lunchSlots = [
    { time: "12:00 PM", label: "Lunch Service", available: true },
    { time: "12:30 PM", label: "Executive Lunch", available: true },
    { time: "1:00 PM", label: "Afternoon Light", available: true },
    { time: "1:30 PM", label: "Midday Tasting", available: true },
    { time: "2:00 PM", label: "Late Lunch", available: true }
  ];

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="section-tag" style={{ margin: 0 }}>Step 02 / 05</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: "0.4rem", color: "var(--text-primary)" }}>
          Choose Seating Time
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          We hold tables for 15 minutes past reservation time. Multi-course tastings average 2.5 hours.
        </p>
      </div>

      {/* Dinner Section */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem", color: "var(--gold-light)" }}>
          <Moon size={16} />
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            Dinner Service (5:30 PM – 11:00 PM)
          </h4>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.8rem"
          }}
        >
          {dinnerSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.time}
                onClick={() => onSelectTime(slot.time)}
                className="interactive-card"
                style={{
                  background: isSelected ? "var(--gold-gradient)" : "rgba(18, 22, 30, 0.7)",
                  border: isSelected ? "1px solid var(--gold-primary)" : "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "14px 10px",
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
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: isSelected ? "#08090c" : "var(--text-primary)"
                  }}
                >
                  {slot.time}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: isSelected ? "#08090c" : "var(--text-muted)",
                    letterSpacing: "0.04em"
                  }}
                >
                  {slot.label}
                </span>
                {slot.badge && (
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: isSelected ? "#854d0e" : "var(--gold-light)",
                      background: isSelected ? "rgba(0,0,0,0.1)" : "rgba(212, 175, 55, 0.12)",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      marginTop: "2px"
                    }}
                  >
                    {slot.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lunch Section */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem", color: "var(--gold-light)" }}>
          <Sun size={16} />
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            Lunch Service (12:00 PM – 3:00 PM)
          </h4>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
            gap: "0.8rem"
          }}
        >
          {lunchSlots.map((slot) => {
            const isSelected = selectedTime === slot.time;
            return (
              <button
                key={slot.time}
                onClick={() => onSelectTime(slot.time)}
                className="interactive-card"
                style={{
                  background: isSelected ? "var(--gold-gradient)" : "rgba(18, 22, 30, 0.7)",
                  border: isSelected ? "1px solid var(--gold-primary)" : "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "12px 10px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "2px",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "translateY(-3px)" : "none",
                  boxShadow: isSelected ? "0 8px 20px rgba(212, 175, 55, 0.3)" : "none"
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: isSelected ? "#08090c" : "var(--text-primary)"
                  }}
                >
                  {slot.time}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    color: isSelected ? "#08090c" : "var(--text-muted)"
                  }}
                >
                  {slot.label}
                </span>
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
          disabled={!selectedTime}
          className="btn btn-primary"
          style={{
            opacity: selectedTime ? 1 : 0.4,
            cursor: selectedTime ? "pointer" : "not-allowed",
            padding: "14px 32px"
          }}
        >
          <span>Continue to Guests</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
