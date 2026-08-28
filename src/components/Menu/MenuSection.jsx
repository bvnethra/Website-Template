import React, { useState, useMemo } from "react";
import MenuCard from "./MenuCard";
import DishModal from "./DishModal";
import { MENU_ITEMS, MENU_CATEGORIES } from "../../data/menuData";
import { Sparkles, Utensils, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, Wine, Eye } from "lucide-react";

export default function MenuSection({ onOpenReservation, onPrepopulateReservationDish }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedDish, setSelectedDish] = useState(null);
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [menuLayout, setMenuLayout] = useState("slider"); // "slider" | "grid"
  const [sliderIndex, setSliderIndex] = useState(0);

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchCategory =
        activeCategory === "all" ? true : dish.category.toLowerCase() === activeCategory.toLowerCase();
      
      const matchDietary =
        dietaryFilter === "all"
          ? true
          : dish.dietary?.some((d) => d.toLowerCase().includes(dietaryFilter.toLowerCase()));

      return matchCategory && matchDietary;
    });
  }, [activeCategory, dietaryFilter]);

  const activeSlideDish = filteredDishes[sliderIndex] || filteredDishes[0] || MENU_ITEMS[0];

  const handleNextDish = () => {
    setSliderIndex((prev) => (prev >= filteredDishes.length - 1 ? 0 : prev + 1));
  };

  const handlePrevDish = () => {
    setSliderIndex((prev) => (prev <= 0 ? filteredDishes.length - 1 : prev - 1));
  };

  const handleBookTableWithDish = (dish) => {
    if (onPrepopulateReservationDish) {
      onPrepopulateReservationDish(dish);
    }
    if (onOpenReservation) {
      onOpenReservation();
    }
  };

  return (
    <section id="menu" className="section" style={{ backgroundColor: "#090a0e", position: "relative" }}>
      <div className="container">
        {/* Section Header with View Layout Switcher */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div>
            <span className="section-tag" style={{ margin: 0 }}>Haute Cuisine Carte</span>
            <h2 className="section-title" style={{ margin: "0.4rem 0 0" }}>The Culinary Repertoire</h2>
            <p className="section-subtitle" style={{ margin: "0.5rem 0 0", textAlign: "left" }}>
              Ten signature culinary movements balancing binchotan charcoal smoke, heirloom forage, and rare saffron.
            </p>
          </div>

          {/* Slider vs Grid Switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "rgba(18, 22, 30, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              borderRadius: "var(--radius-full)",
              padding: "4px"
            }}
          >
            <button
              onClick={() => setMenuLayout("slider")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: menuLayout === "slider" ? "var(--gold-gradient)" : "transparent",
                color: menuLayout === "slider" ? "#08090c" : "var(--text-secondary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <SlidersHorizontal size={13} />
              <span>Interactive Slider</span>
            </button>

            <button
              onClick={() => setMenuLayout("grid")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: menuLayout === "grid" ? "var(--gold-gradient)" : "transparent",
                color: menuLayout === "grid" ? "#08090c" : "var(--text-secondary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <LayoutGrid size={13} />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
            marginBottom: "2rem"
          }}
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSliderIndex(0);
                }}
                className="category-tab"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  border: isActive
                    ? "1px solid var(--gold-primary)"
                    : "1px solid rgba(212, 175, 55, 0.15)",
                  background: isActive
                    ? "var(--gold-gradient)"
                    : "rgba(18, 21, 28, 0.6)",
                  color: isActive ? "#08090c" : "var(--text-secondary)",
                  boxShadow: isActive ? "0 4px 15px rgba(212, 175, 55, 0.3)" : "none"
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* INTERACTIVE SLIDER VIEW */}
        {menuLayout === "slider" && activeSlideDish && (
          <div style={{ animation: "fadeIn 0.35s ease", marginBottom: "3rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(20, 24, 34, 0.85) 0%, rgba(10, 11, 15, 0.95) 100%)",
                border: "1px solid var(--border-gold)",
                borderRadius: "var(--radius-xl)",
                padding: "clamp(1.5rem, 4vw, 3.5rem)",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.8)",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "3rem",
                  alignItems: "center"
                }}
              >
                {/* Left: Big Stage Dish Image */}
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => setSelectedDish(activeSlideDish)}
                    style={{
                      position: "relative",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                      border: "1px solid rgba(212, 175, 55, 0.3)",
                      height: "420px",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      src={activeSlideDish.image}
                      alt={activeSlideDish.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s ease"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                    />

                    {/* Gradient & Badge */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(10, 11, 15, 0.85) 0%, transparent 60%)"
                      }}
                    />

                    {/* Dish Number Pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background: "var(--gold-gradient)",
                        color: "#08090c",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        padding: "4px 14px",
                        borderRadius: "var(--radius-full)"
                      }}
                    >
                      Dish {activeSlideDish.number}
                    </div>

                    {/* Price Gold Pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "rgba(10, 11, 15, 0.9)",
                        border: "1px solid var(--gold-primary)",
                        color: "var(--gold-light)",
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.4rem",
                        fontWeight: 700,
                        padding: "6px 16px",
                        borderRadius: "var(--radius-full)"
                      }}
                    >
                      ${activeSlideDish.price}
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "16px",
                        left: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--gold-light)",
                        fontSize: "0.75rem",
                        background: "rgba(10, 11, 15, 0.85)",
                        padding: "6px 14px",
                        borderRadius: "var(--radius-full)",
                        border: "1px solid rgba(212, 175, 55, 0.2)"
                      }}
                    >
                      <Eye size={14} />
                      <span>Click to view full recipe notes & allergens</span>
                    </div>
                  </div>
                </div>

                {/* Right: Dish Description & Slide Navigator */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.8rem" }}>
                    <span className="section-tag" style={{ margin: 0 }}>
                      {activeSlideDish.category}
                    </span>
                    {activeSlideDish.isSignature && (
                      <span className="gold-badge">Chef's Signature</span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      color: "var(--text-primary)",
                      lineHeight: 1.15,
                      marginBottom: "1rem"
                    }}
                  >
                    {activeSlideDish.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.2rem",
                      color: "var(--gold-light)",
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      marginBottom: "1.2rem"
                    }}
                  >
                    "{activeSlideDish.description}"
                  </p>

                  <p
                    style={{
                      fontSize: "0.92rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.7,
                      marginBottom: "1.8rem"
                    }}
                  >
                    {activeSlideDish.longDescription}
                  </p>

                  {/* Sommelier Wine Pairing Card */}
                  {activeSlideDish.pairings && (
                    <div
                      style={{
                        padding: "12px 18px",
                        background: "rgba(212, 175, 55, 0.08)",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "2rem"
                      }}
                    >
                      <Wine size={20} color="#d4af37" />
                      <div>
                        <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--gold-light)" }}>
                          Sommelier Reserve Pairing
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 500 }}>
                          {activeSlideDish.pairings}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action and Dish Carousel Controls */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.2rem" }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <button
                        onClick={() => setSelectedDish(activeSlideDish)}
                        className="btn btn-primary"
                        style={{ padding: "12px 24px", fontSize: "0.8rem" }}
                      >
                        <Eye size={15} />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => handleBookTableWithDish(activeSlideDish)}
                        className="btn btn-outline"
                        style={{ padding: "12px 20px", fontSize: "0.8rem" }}
                      >
                        <span>Reserve for this Dish</span>
                      </button>
                    </div>

                    {/* Dish Slide Arrows & Pagination */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={handlePrevDish}
                        className="btn-icon"
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(212,175,55,0.3)",
                          color: "var(--gold-light)",
                          cursor: "pointer"
                        }}
                        aria-label="Previous Dish"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <span style={{ fontSize: "0.78rem", color: "var(--gold-light)", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
                        {sliderIndex + 1} / {filteredDishes.length}
                      </span>

                      <button
                        onClick={handleNextDish}
                        className="btn-icon"
                        style={{
                          width: "38px",
                          height: "38px",
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(212,175,55,0.3)",
                          color: "var(--gold-light)",
                          cursor: "pointer"
                        }}
                        aria-label="Next Dish"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Mini Thumbnails Bar */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                padding: "1rem 0",
                marginTop: "1rem",
                scrollbarWidth: "none"
              }}
            >
              {filteredDishes.map((d, idx) => {
                const isCurrent = sliderIndex === idx;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSliderIndex(idx)}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: isCurrent ? "rgba(212, 175, 55, 0.2)" : "rgba(18, 22, 30, 0.7)",
                      border: isCurrent ? "1px solid var(--gold-primary)" : "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "var(--radius-sm)",
                      padding: "6px 12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <img
                      src={d.image}
                      alt={d.name}
                      style={{ width: "28px", height: "28px", borderRadius: "4px", objectFit: "cover" }}
                    />
                    <span style={{ fontSize: "0.75rem", color: isCurrent ? "var(--gold-light)" : "var(--text-secondary)", fontWeight: isCurrent ? 700 : 400 }}>
                      {d.number}. {d.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {menuLayout === "grid" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "2rem",
              marginBottom: "3.5rem",
              animation: "fadeIn 0.35s ease"
            }}
          >
            {filteredDishes.map((dish) => (
              <MenuCard
                key={dish.id}
                dish={dish}
                onClick={() => setSelectedDish(dish)}
                onSelectForReservation={() => handleBookTableWithDish(dish)}
              />
            ))}
          </div>
        )}

        {/* Bottom Menu Note & Pairing Link */}
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            background: "rgba(18, 21, 28, 0.4)",
            border: "1px solid rgba(212, 175, 55, 0.15)",
            borderRadius: "var(--radius-md)",
            maxWidth: "780px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--gold-light)" }}>
            <Sparkles size={16} />
            <span style={{ fontSize: "0.82rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
              Bespoke Culinary & Sommelier Inquiries
            </span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            Our kitchen gladly accommodates bespoke dietary accommodations with 24-hour advance notice. Wine pairing flights and non-alcoholic botanical pairings available with every table booking.
          </p>
          <button
            onClick={() => onOpenReservation()}
            className="btn btn-primary"
            style={{ fontSize: "0.8rem", padding: "12px 28px" }}
          >
            Reserve Your Tasting Experience
          </button>
        </div>
      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <DishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onBookTableWithDish={handleBookTableWithDish}
        />
      )}
    </section>
  );
}
