import React, { useState } from "react";
import { Sparkles, Wine, Flame, Clock, Award, ArrowRight } from "lucide-react";

export default function SignatureDish({ onOpenDishModal, onExploreMenu, onOpenReservation }) {
  const [activeTab, setActiveTab] = useState("cut");

  const dishDetails = {
    name: "Charcoal-Seared Truffle Ribeye",
    price: "$48",
    tagline: "The Culmination of Flame & Terroir",
    description: "A perfectly aged cut finished with black truffle jus, roasted shallots, and delicate herb oil.",
    extendedNotes: "Charred over Japanese Kishu Binchotan coals at 900°F to seal the juices while imparting delicate smoky aromatics. Accompanied by a 72-hour reduction of black Périgord truffle jus and caramelized shallot petals.",
    pairing: "2018 Château Pontet-Canet Pauillac Grand Cru",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85"
  };

  return (
    <section id="signature" className="section" style={{ backgroundColor: "#08090c", overflow: "hidden" }}>
      <div className="container">
        <div
          style={{
            background: "linear-gradient(135deg, rgba(18, 22, 30, 0.8) 0%, rgba(10, 11, 15, 0.95) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(2rem, 5vw, 4.5rem)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(212, 175, 55, 0.05)",
            position: "relative"
          }}
        >
          {/* Subtle Background Glow */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "300px",
              height: "300px",
              background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
              pointerEvents: "none"
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3.5rem",
              alignItems: "center"
            }}
          >
            {/* Left Side: Dramatic Dish Photography with interactive badges */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                  border: "1px solid rgba(212, 175, 55, 0.25)"
                }}
              >
                <img
                  src={dishDetails.image}
                  alt={dishDetails.name}
                  style={{
                    width: "100%",
                    height: "460px",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.8s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                />
                
                {/* Overlay Vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(8,9,12,0.8) 0%, transparent 50%)"
                  }}
                />

                {/* Price Gold Pill */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "var(--gold-gradient)",
                    color: "#000",
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    padding: "8px 20px",
                    borderRadius: "var(--radius-full)",
                    boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)"
                  }}
                >
                  {dishDetails.price}
                </div>

                {/* Bottom Highlight Tag */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(10, 11, 15, 0.85)",
                    backdropFilter: "blur(8px)",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(212, 175, 55, 0.3)"
                  }}
                >
                  <Sparkles size={14} color="#d4af37" />
                  <span style={{ fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-light)" }}>
                    Crafted by Adrian Laurent
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Editorial Spotlight Details */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.8rem" }}>
                <span className="section-tag" style={{ margin: 0 }}>The Signature</span>
                <span className="gold-badge">Item 01 / 10</span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                  marginBottom: "1rem"
                }}
              >
                Charcoal-Seared <br />
                <span className="text-gold-gradient">Truffle Ribeye</span>
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  color: "var(--gold-light)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  fontStyle: "italic"
                }}
              >
                "{dishDetails.description}"
              </p>

              <p
                style={{
                  fontSize: "0.92rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "1.8rem"
                }}
              >
                {dishDetails.extendedNotes}
              </p>

              {/* Sommelier Wine Pairing Card */}
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(212, 175, 55, 0.08)",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "2.2rem"
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "rgba(212, 175, 55, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Wine size={20} color="#d4af37" />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold-light)", fontWeight: 600 }}>
                    Sommelier's Cru Selection
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", fontWeight: 500 }}>
                    {dishDetails.pairing}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
                <button
                  onClick={() => {
                    if (onExploreMenu) onExploreMenu();
                    else {
                      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="btn btn-primary"
                  style={{ padding: "14px 30px" }}
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => onOpenReservation()}
                  className="btn btn-outline"
                  style={{ padding: "14px 26px" }}
                >
                  Reserve For This Dish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
