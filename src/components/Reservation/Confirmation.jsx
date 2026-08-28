import React, { useEffect } from "react";
import { CheckCircle2, Calendar, Clock, Users, MapPin, Sparkles, Download, ArrowRight, Share2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Confirmation({ reservationData, onReset }) {
  const { date, time, guests, preference, table, details, bookingRef } = reservationData;

  useEffect(() => {
    // Launch gold & champagne luxury confetti
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f3e5ab", "#ffffff", "#c5a880"]
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handleDownloadPass = () => {
    window.print();
  };

  return (
    <div
      style={{
        animation: "scaleUp 0.4s var(--ease-luxury)",
        textAlign: "center",
        padding: "1rem 0"
      }}
    >
      {/* Animated Gold Seal */}
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "var(--gold-gradient)",
          color: "#08090c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
          boxShadow: "0 10px 40px rgba(212, 175, 55, 0.4)",
          animation: "pulseGold 2s infinite"
        }}
      >
        <CheckCircle2 size={46} strokeWidth={2.2} />
      </div>

      <span className="section-tag" style={{ margin: 0 }}>Exclusive Confirmation</span>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "2.6rem",
          color: "var(--text-primary)",
          marginTop: "0.4rem",
          marginBottom: "0.5rem"
        }}
      >
        Reservation Confirmed
      </h3>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.2rem",
          fontStyle: "italic",
          color: "var(--gold-light)",
          marginBottom: "2rem"
        }}
      >
        "Your table at ÉLANE is waiting for you."
      </p>

      {/* Luxury Golden Ticket / Boarding Pass */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(22, 26, 36, 0.95) 0%, rgba(12, 14, 20, 0.98) 100%)",
          border: "1px solid var(--border-gold)",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          maxWidth: "600px",
          margin: "0 auto 2.5rem",
          textAlign: "left",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(212,175,55,0.05)",
          position: "relative"
        }}
      >
        {/* Ticket Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "1px dashed rgba(212, 175, 55, 0.3)",
            paddingBottom: "1.2rem",
            marginBottom: "1.5rem"
          }}
        >
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 600, color: "var(--text-primary)" }}>
              ÉLANE
            </div>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold-primary)" }}>
              Haute Gastronomy Pass
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Reference
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--gold-light)", fontWeight: 700 }}>
              {bookingRef || "#ELN-8942"}
            </div>
          </div>
        </div>

        {/* Ticket Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem",
            marginBottom: "1.5rem"
          }}
        >
          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Guest of Honor
            </div>
            <div style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 600 }}>
              {details?.name || "Guest Patron"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Party Size
            </div>
            <div style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 600 }}>
              {guests} {guests === 1 ? "Guest" : "Guests"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Date & Seating Time
            </div>
            <div style={{ fontSize: "0.95rem", color: "var(--gold-light)", fontWeight: 600 }}>
              {date} • {time}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Table & Area
            </div>
            <div style={{ fontSize: "0.95rem", color: "var(--gold-light)", fontWeight: 600 }}>
              {table?.name || "Selected"} ({table?.type || preference})
            </div>
          </div>
        </div>

        {/* Location & Dress Code Reminder */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.78rem",
            color: "var(--text-muted)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <MapPin size={14} color="#d4af37" />
            <span>18 Aurora Avenue, Manhattan</span>
          </div>
          <span style={{ color: "var(--gold-light)" }}>Attire: Elegant / Smart Sophisticated</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={handleDownloadPass} className="btn btn-outline" style={{ padding: "12px 24px" }}>
          <Download size={16} />
          <span>Save Digital Pass</span>
        </button>

        <button onClick={onReset} className="btn btn-primary" style={{ padding: "12px 28px" }}>
          <span>Make Another Reservation</span>
        </button>
      </div>
    </div>
  );
}
