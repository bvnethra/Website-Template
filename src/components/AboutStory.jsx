import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Flame, Leaf, Award, X } from "lucide-react";

export default function AboutStory({ onOpenReservation }) {
  const [showStoryModal, setShowStoryModal] = useState(false);

  const pillars = [
    {
      icon: Flame,
      title: "Artisanal Charcoal & Fire",
      desc: "Japanese binchotan white charcoal imparts a subtle smoky aromatics to dry-aged cuts and wild ocean seafood."
    },
    {
      icon: Leaf,
      title: "Hyper-Seasonal Provenance",
      desc: "Micro-seasons dictate our creations. Sourced directly from regenerative Hudson Valley farms and coastal divers."
    },
    {
      icon: Award,
      title: "Chef-Crafted Mastery",
      desc: "Every dish represents months of olfactory formulation, balanced textures, and precise culinary technique."
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Hospitality",
      desc: "Intuitive, gracious table choreography designed to make every dining guest feel completely celebrated."
    }
  ];

  return (
    <section id="story" className="section" style={{ backgroundColor: "#0b0c10", position: "relative" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center"
          }}
        >
          {/* Left Column: Large Editorial Restaurant Image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-gold)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
                alt="ÉLANE Dining Room Ambiance"
                style={{
                  width: "100%",
                  height: "560px",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.8s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,9,12,0.85) 0%, transparent 60%)"
                }}
              />

              {/* Floating Badge on Image */}
              <div
                style={{
                  position: "absolute",
                  bottom: "25px",
                  left: "25px",
                  right: "25px",
                  background: "rgba(14, 17, 24, 0.85)",
                  backdropFilter: "blur(12px)",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)" }}>
                    The Grand Salon
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gold-light)", letterSpacing: "0.08em" }}>
                    Designed by Studio Aurum • New York
                  </div>
                </div>
                <span className="gold-badge">120 Seats</span>
              </div>
            </div>

            {/* Decorative Gold Accent Frame */}
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "-15px",
                width: "120px",
                height: "120px",
                borderTop: "2px solid var(--gold-primary)",
                borderLeft: "2px solid var(--gold-primary)",
                pointerEvents: "none",
                zIndex: 0
              }}
            />
          </div>

          {/* Right Column: Editorial Text & Pillars */}
          <div>
            <span className="section-tag">Our Culinary Heritage</span>
            
            <h2 className="section-title" style={{ marginTop: "0.5rem" }}>
              A Table for the <br />
              <span className="text-gold-gradient" style={{ fontStyle: "italic" }}>Extraordinary</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.35rem",
                color: "var(--gold-light)",
                lineHeight: 1.6,
                marginBottom: "1.5rem"
              }}
            >
              "At ÉLANE, every detail is thoughtfully composed — from the first welcome to the final course."
            </p>

            <p
              style={{
                fontSize: "0.98rem",
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: "2.5rem"
              }}
            >
              Founded with the conviction that gastronomy is an emotional art form, ÉLANE marries classical French foundation with visionary contemporary techniques. We celebrate organic terroir, rare botanical essences, and the transformative alchemy of live fire.
            </p>

            {/* Core Pillars Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                marginBottom: "2.8rem"
              }}
              className="pillars-grid"
            >
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: "16px",
                      background: "rgba(18, 21, 28, 0.5)",
                      border: "1px solid rgba(212, 175, 55, 0.12)",
                      borderRadius: "var(--radius-sm)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <Icon size={18} color="#d4af37" />
                      <h4 style={{ fontSize: "0.9rem", color: "var(--text-primary)", fontWeight: 600 }}>{item.title}</h4>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Discover Story CTA Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setShowStoryModal(true)}
                className="link-gold"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.92rem",
                  fontWeight: 600
                }}
              >
                <span>Discover Our Full Story</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onOpenReservation()}
                className="btn btn-outline"
                style={{ fontSize: "0.8rem", padding: "11px 22px" }}
              >
                Experience ÉLANE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Story Full Modal */}
      {showStoryModal && (
        <div className="modal-backdrop" onClick={() => setShowStoryModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "750px", padding: "2.5rem" }}
          >
            <button
              onClick={() => setShowStoryModal(false)}
              className="btn-icon"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "var(--text-primary)"
              }}
            >
              <X size={20} />
            </button>

            <span className="section-tag">Chapter I • The Origin</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", margin: "0.5rem 0 1.5rem" }}>
              The Philosophy of ÉLANE
            </h3>

            <div style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <p>
                ÉLANE was born from a singular conviction: dining should transcend sustenance to become an enduring emotional resonance. Nestled on Aurora Avenue in Manhattan, our space was sculpted around the interplay of shadow, golden illumination, and acoustic serenity.
              </p>
              <p>
                Under the visionary stewardship of Executive Chef Adrian Laurent, our culinary team views each evening as a live theatrical symphony. Ingredients arrive daily from our dedicated network of heirloom farmers in upstate New York, divers in Maine, and rare spice purveyors across Kashmir and Provence.
              </p>
              <p>
                Whether you join us for a spontaneous glass at our Onyx Bar or a 9-course anniversary tasting in the Gold Room, our commitment remains unyielding: you will leave not merely satisfied, but profoundly inspired.
              </p>
            </div>

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(212,175,55,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--gold-light)" }}>
                — Adrian Laurent, Executive Chef & Co-Founder
              </div>
              <button
                onClick={() => {
                  setShowStoryModal(false);
                  onOpenReservation();
                }}
                className="btn btn-primary"
                style={{ fontSize: "0.8rem", padding: "10px 20px" }}
              >
                Reserve Your Experience
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
