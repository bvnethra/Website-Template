import React, { useState } from "react";
import { MapPin, Clock, Phone, Mail, Navigation, Car, Shirt, Compass } from "lucide-react";

export default function LocationHours({ onOpenReservation }) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText("18 Aurora Avenue, Manhattan, New York, NY 10012");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="section" style={{ backgroundColor: "#08090c" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-tag">Manhattan Sanctuary</span>
          <h2 className="section-title">VISIT ÉLANE</h2>
          <p className="section-subtitle">
            Situated within Manhattan's historic architectural district, minutes from premier cultural galleries.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "stretch"
          }}
        >
          {/* Left Column: Hours, Contact & Concierge Information */}
          <div
            style={{
              background: "rgba(18, 22, 30, 0.8)",
              border: "1px solid var(--border-gold)",
              borderRadius: "var(--radius-lg)",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              {/* Hours Grid */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-primary)", marginBottom: "1rem" }}>
                  <Clock size={18} />
                  <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
                    Service Hours
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.8rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)" }}>Dinner Service</span>
                      <span className="gold-badge">Tue – Sun</span>
                    </div>
                    <div style={{ color: "var(--gold-light)", fontSize: "0.9rem", marginTop: "2px" }}>
                      5:30 PM – 11:00 PM
                    </div>
                  </div>

                  <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.8rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)" }}>Lunch & Midday</span>
                      <span className="gold-badge">Fri – Sun</span>
                    </div>
                    <div style={{ color: "var(--gold-light)", fontSize: "0.9rem", marginTop: "2px" }}>
                      12:00 PM – 3:00 PM
                    </div>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-muted)" }}>Monday</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Kitchen Research & Foraging</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Direct Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <MapPin size={18} color="#d4af37" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Address</div>
                    <div style={{ color: "var(--text-primary)", fontSize: "0.95rem" }}>
                      18 Aurora Avenue, Manhattan, New York, NY 10012
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Phone size={18} color="#d4af37" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Concierge Desk</div>
                    <a href="tel:+12125550198" style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "0.95rem" }}>
                      +1 (212) 555-0198
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Mail size={18} color="#d4af37" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Private Events</div>
                    <a href="mailto:concierge@elane-restaurant.com" style={{ color: "var(--text-primary)", textDecoration: "none", fontSize: "0.95rem" }}>
                      concierge@elane-restaurant.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={handleCopyAddress}
                className="btn btn-outline"
                style={{ flex: 1, padding: "12px" }}
              >
                <Navigation size={15} />
                <span>{copied ? "Address Copied!" : "Get Directions"}</span>
              </button>

              <button
                onClick={() => onOpenReservation()}
                className="btn btn-primary"
                style={{ flex: 1, padding: "12px" }}
              >
                <span>Reserve Visit</span>
              </button>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Dark Map & Hospitality Amenities */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Stylized Dark Map Preview */}
            <div
              style={{
                position: "relative",
                height: "320px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-gold)",
                background: "#11141c"
              }}
            >
              {/* Map Image / Abstract Graphic */}
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
                alt="ÉLANE Location Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(70%) brightness(40%) contrast(120%)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, transparent 30%, #08090c 100%)"
                }}
              />

              {/* Pin Marker on Map */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  animation: "floatSlow 3s infinite ease-in-out"
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "var(--gold-gradient)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(212, 175, 55, 0.8)"
                  }}
                >
                  <MapPin size={24} />
                </div>
                <div
                  style={{
                    marginTop: "8px",
                    background: "rgba(10, 11, 15, 0.9)",
                    border: "1px solid var(--gold-primary)",
                    padding: "4px 14px",
                    borderRadius: "var(--radius-full)",
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.95rem",
                    color: "#fff",
                    fontWeight: 600
                  }}
                >
                  ÉLANE Manhattan
                </div>
              </div>
            </div>

            {/* Hospitality Amenities Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem"
              }}
            >
              <div
                style={{
                  padding: "16px",
                  background: "rgba(18, 22, 30, 0.6)",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-primary)", marginBottom: "6px" }}>
                  <Car size={16} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Complimentary Valet
                  </span>
                </div>
                <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  White-glove curbside valet parking is provided at 18 Aurora Avenue for all dining guests.
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  background: "rgba(18, 22, 30, 0.6)",
                  border: "1px solid rgba(212, 175, 55, 0.15)",
                  borderRadius: "var(--radius-sm)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-primary)", marginBottom: "6px" }}>
                  <Shirt size={16} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Dress Code
                  </span>
                </div>
                <p style={{ fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  Smart Sophisticated / Evening Elegant. Jackets recommended for gentlemen. Athletic wear not permitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
