import React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";

export default function StepDate({ selectedDate, onSelectDate, onNext }) {
  // Generate dates for the next 14 days
  const today = new Date();
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      full: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      monthName: d.toLocaleDateString("en-US", { month: "short" }),
      dateNum: d.getDate(),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
      isToday: i === 0
    };
  });

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="section-tag" style={{ margin: 0 }}>Step 01 / 05</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: "0.4rem", color: "var(--text-primary)" }}>
          Select Date of Dining
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          Reservations open 14 days in advance. Friday and Saturday evenings feature live acoustic harp.
        </p>
      </div>

      {/* Date Carousel Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(105px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem"
        }}
      >
        {availableDates.map((item) => {
          const isSelected = selectedDate === item.full;
          return (
            <button
              key={item.full}
              onClick={() => onSelectDate(item.full)}
              className="interactive-card"
              style={{
                background: isSelected
                  ? "var(--gold-gradient)"
                  : "rgba(18, 22, 30, 0.7)",
                border: isSelected
                  ? "1px solid var(--gold-primary)"
                  : "1px solid rgba(212, 175, 55, 0.15)",
                borderRadius: "var(--radius-md)",
                padding: "16px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: isSelected ? "translateY(-4px)" : "none",
                boxShadow: isSelected ? "0 10px 25px rgba(212, 175, 55, 0.35)" : "none"
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isSelected ? "#08090c" : "var(--gold-light)"
                }}
              >
                {item.dayName}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: isSelected ? "#08090c" : "var(--text-primary)",
                  lineHeight: 1.1
                }}
              >
                {item.dateNum}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: isSelected ? "#08090c" : "var(--text-muted)",
                  textTransform: "uppercase"
                }}
              >
                {item.monthName}
              </span>

              {item.isToday && (
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    marginTop: "4px",
                    background: isSelected ? "rgba(0,0,0,0.15)" : "rgba(212, 175, 55, 0.15)",
                    color: isSelected ? "#000" : "var(--gold-light)",
                    padding: "2px 6px",
                    borderRadius: "4px"
                  }}
                >
                  Tonight
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className="btn btn-primary"
          style={{
            opacity: selectedDate ? 1 : 0.4,
            cursor: selectedDate ? "pointer" : "not-allowed",
            padding: "14px 32px"
          }}
        >
          <span>Continue to Time Slot</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
