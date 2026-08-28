import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Sparkles, MapPin, Users, Info } from "lucide-react";
import { RESTAURANT_TABLES, SEATING_AREAS } from "../../data/tablesData";

export default function StepFloorplan({ selectedTable, onSelectTable, onNext, onPrev }) {
  const [filterArea, setFilterArea] = useState("all");
  const [hoveredTable, setHoveredTable] = useState(null);

  const filteredTables = RESTAURANT_TABLES.filter((t) => {
    if (filterArea === "all") return true;
    return t.category === filterArea;
  });

  const activeTableData = selectedTable
    ? RESTAURANT_TABLES.find((t) => t.id === selectedTable.id || t.name === selectedTable.name)
    : hoveredTable || RESTAURANT_TABLES[7]; // Default to Table 08 for preview

  return (
    <div style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
        <span className="section-tag" style={{ margin: 0 }}>Step 04 / 05</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: "0.4rem", color: "var(--text-primary)" }}>
          Visual Restaurant Floor Plan
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          Select your preferred table location in our architectural dining room or terrace.
        </p>
      </div>

      {/* Area Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "1.5rem"
        }}
      >
        {SEATING_AREAS.map((area) => {
          const isActive = filterArea === area.id;
          return (
            <button
              key={area.id}
              onClick={() => setFilterArea(area.id)}
              style={{
                fontSize: "0.72rem",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                cursor: "pointer",
                background: isActive ? "var(--gold-gradient)" : "rgba(255,255,255,0.04)",
                color: isActive ? "#08090c" : "var(--text-secondary)",
                border: isActive ? "1px solid var(--gold-primary)" : "1px solid rgba(255,255,255,0.08)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                transition: "all 0.2s ease"
              }}
            >
              {area.label}
            </button>
          );
        })}
      </div>

      {/* Main Floor Plan & Table Inspector Split */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem"
        }}
      >
        {/* Interactive Floor Plan Canvas */}
        <div
          style={{
            background: "radial-gradient(circle at center, #141720 0%, #0a0b0e 100%)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            position: "relative",
            minHeight: "380px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)"
          }}
        >
          {/* Floor Header / Landmarks */}
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(212,175,55,0.2)", paddingBottom: "8px", fontSize: "0.72rem", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            <span>← Panoramic Skyline Windows</span>
            <span>Chef's Kitchen Pass →</span>
          </div>

          {/* Interactive Table Grid Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              padding: "1.2rem 0"
            }}
          >
            {filteredTables.map((table) => {
              const isSelected = selectedTable?.id === table.id;
              const isHovered = hoveredTable?.id === table.id;

              return (
                <div
                  key={table.id}
                  onClick={() => onSelectTable(table)}
                  onMouseEnter={() => setHoveredTable(table)}
                  onMouseLeave={() => setHoveredTable(null)}
                  className="interactive-card table-node"
                  style={{
                    background: isSelected
                      ? "var(--gold-gradient)"
                      : isHovered
                      ? "rgba(212, 175, 55, 0.2)"
                      : "rgba(18, 22, 32, 0.8)",
                    border: isSelected
                      ? "2px solid #fff"
                      : table.isVIP
                      ? "1px solid var(--gold-primary)"
                      : "1px solid rgba(212, 175, 55, 0.2)",
                    borderRadius: table.shape === "circle" ? "50%" : "var(--radius-md)",
                    height: "90px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    transform: isSelected || isHovered ? "scale(1.05)" : "scale(1.0)",
                    boxShadow: isSelected
                      ? "0 0 25px rgba(212, 175, 55, 0.6)"
                      : isHovered
                      ? "0 8px 20px rgba(0,0,0,0.6)"
                      : "none",
                    position: "relative"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: isSelected ? "#08090c" : "var(--text-primary)"
                    }}
                  >
                    {table.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      color: isSelected ? "#08090c" : "var(--gold-light)",
                      fontWeight: 600
                    }}
                  >
                    {table.capacity} Guests
                  </span>

                  {table.isVIP && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "var(--gold-primary)",
                        color: "#000",
                        fontSize: "0.55rem",
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: "99px"
                      }}
                    >
                      VIP
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floor Footer Landmarks */}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px dashed rgba(212,175,55,0.2)", paddingTop: "8px", fontSize: "0.72rem", color: "var(--gold-light)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            <span>Grand Entrance & Onyx Bar</span>
            <span>Outdoor Terrace Garden ↗</span>
          </div>
        </div>

        {/* Selected Table Inspector Card */}
        {activeTableData && (
          <div
            style={{
              background: "rgba(18, 22, 30, 0.9)",
              border: "1px solid var(--border-gold)",
              borderRadius: "var(--radius-md)",
              padding: "1.8rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 10px 30px rgba(0,0,0,0.7)"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                <div>
                  <span className="section-tag" style={{ margin: 0 }}>Table Inspector</span>
                  <h4
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "2.2rem",
                      color: "var(--text-primary)",
                      marginTop: "4px"
                    }}
                  >
                    {activeTableData.name.toUpperCase()}
                  </h4>
                </div>
                <span className="gold-badge">Available</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.2rem 0" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Seating Type
                  </div>
                  <div style={{ fontSize: "1rem", color: "var(--gold-light)", fontWeight: 600 }}>
                    {activeTableData.type}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Capacity
                  </div>
                  <div style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    {activeTableData.capacity} Guests
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Location in Restaurant
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    {activeTableData.location}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Ambiance & Atmosphere
                  </div>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                    "{activeTableData.ambiance}"
                  </div>
                </div>
              </div>
            </div>

            {/* Select Table Action Button */}
            <button
              onClick={() => onSelectTable(activeTableData)}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "0.82rem"
              }}
            >
              {selectedTable?.id === activeTableData.id ? (
                <>
                  <Check size={16} />
                  <span>Table Selected</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Select This Table</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={onPrev} className="btn btn-outline" style={{ padding: "12px 24px" }}>
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <button
          onClick={onNext}
          disabled={!selectedTable}
          className="btn btn-primary"
          style={{
            opacity: selectedTable ? 1 : 0.4,
            cursor: selectedTable ? "pointer" : "not-allowed",
            padding: "14px 32px"
          }}
        >
          <span>Continue to Guest Details</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
