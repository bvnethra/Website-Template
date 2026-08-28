import React, { useState } from "react";
import { GALLERY_ITEMS, GALLERY_CATEGORIES } from "../data/galleryData";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, ZoomIn } from "lucide-react";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="section" style={{ backgroundColor: "#08090c" }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">Visual Atmosphere</span>
          <h2 className="section-title">THE ÉLANE GALLERY</h2>
          <p className="section-subtitle">
            A glimpse into the architectural drama, culinary precision, and glowing warmth of our dining chambers.
          </p>
        </div>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem"
          }}
        >
          {GALLERY_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontSize: "0.76rem",
                  padding: "8px 18px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  background: isActive ? "var(--gold-gradient)" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#08090c" : "var(--text-secondary)",
                  border: isActive ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.08)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "all 0.25s ease"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry / Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.2rem"
          }}
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="interactive-card"
              style={{
                position: "relative",
                height: item.aspect === "tall" ? "380px" : item.aspect === "wide" ? "260px" : "320px",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.35s ease"
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease"
                }}
              />

              {/* Hover Dark Overlay & Title */}
              <div
                className="gallery-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.3) 60%, transparent 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.4rem",
                  opacity: 0,
                  transition: "opacity 0.3s ease"
                }}
              >
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--gold-primary)" }}>
                  {item.category}
                </div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--text-primary)", margin: "2px 0 6px" }}>
                  {item.title}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-light)", fontSize: "0.72rem" }}>
                  <ZoomIn size={14} />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxIndex !== null && (
        <div className="modal-backdrop" onClick={() => setLightboxIndex(null)}>
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "scaleUp 0.3s ease"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="btn-icon"
              style={{
                position: "absolute",
                top: "-45px",
                right: "0",
                background: "rgba(255,255,255,0.1)",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              <X size={22} />
            </button>

            {/* Lightbox Main Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                border: "1px solid var(--border-gold)",
                backgroundColor: "#000"
              }}
            >
              <img
                src={filteredItems[lightboxIndex]?.image}
                alt={filteredItems[lightboxIndex]?.title}
                style={{
                  width: "100%",
                  maxHeight: "72vh",
                  objectFit: "contain",
                  display: "block"
                }}
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="btn-icon"
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(10,11,15,0.75)",
                  color: "#fff",
                  border: "1px solid rgba(212,175,55,0.3)"
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                className="btn-icon"
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(10,11,15,0.75)",
                  color: "#fff",
                  border: "1px solid rgba(212,175,55,0.3)"
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div
              style={{
                marginTop: "1rem",
                textAlign: "center",
                color: "var(--text-primary)",
                maxWidth: "700px"
              }}
            >
              <div style={{ fontSize: "0.72rem", color: "var(--gold-primary)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                {filteredItems[lightboxIndex]?.category} • {filteredItems[lightboxIndex]?.subtitle}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", margin: "4px 0" }}>
                {filteredItems[lightboxIndex]?.title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {filteredItems[lightboxIndex]?.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery CSS */}
      <style>{`
        .interactive-card:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .interactive-card:hover img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
