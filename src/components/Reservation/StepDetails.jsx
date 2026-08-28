import React, { useState } from "react";
import { ChevronLeft, Check, Sparkles, User, Mail, Phone, MessageSquare, Utensils } from "lucide-react";

export default function StepDetails({
  formData,
  onChangeForm,
  prepopulatedDish,
  onSubmit,
  onPrev,
  isSubmitting
}) {
  const [errors, setErrors] = useState({});

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name?.trim()) errs.name = "Please enter your full name.";
    if (!formData.email?.trim() || !formData.email.includes("@")) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.phone?.trim() || formData.phone.length < 7) {
      errs.phone = "Please enter a contact phone number.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      setErrors({});
      onSubmit();
    }
  };

  return (
    <form onSubmit={validateAndSubmit} style={{ animation: "fadeIn 0.35s ease" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="section-tag" style={{ margin: 0 }}>Step 05 / 05</span>
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginTop: "0.4rem", color: "var(--text-primary)" }}>
          Guest Information & Notes
        </h3>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
          A digital concierge confirmation with calendar pass will be dispatched immediately.
        </p>
      </div>

      {/* Prepopulated Dish Highlight if present */}
      {prepopulatedDish && (
        <div
          style={{
            padding: "12px 16px",
            background: "rgba(212, 175, 55, 0.1)",
            border: "1px solid rgba(212, 175, 55, 0.3)",
            borderRadius: "var(--radius-sm)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1.8rem"
          }}
        >
          <Utensils size={18} color="#d4af37" />
          <div style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
            Reserved interest in signature creation:{" "}
            <strong style={{ color: "var(--gold-light)" }}>{prepopulatedDish.name} (${prepopulatedDish.price})</strong>
          </div>
        </div>
      )}

      {/* Input Fields Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.4rem",
          marginBottom: "1.8rem"
        }}
      >
        {/* Full Name */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              fontWeight: 600,
              marginBottom: "6px"
            }}
          >
            Full Name *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => onChangeForm("name", e.target.value)}
              placeholder="e.g. Eleanor Vance"
              required
              style={{
                width: "100%",
                padding: "14px 16px 14px 42px",
                background: "rgba(18, 22, 30, 0.8)",
                border: errors.name ? "1px solid #ef4444" : "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                outline: "none",
                transition: "border 0.2s ease"
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-primary)")}
              onBlur={(e) => (e.target.style.borderColor = errors.name ? "#ef4444" : "rgba(212, 175, 55, 0.25)")}
            />
            <User size={16} color="#d4af37" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          {errors.name && <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors.name}</span>}
        </div>

        {/* Email Address */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              fontWeight: 600,
              marginBottom: "6px"
            }}
          >
            Email Address *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => onChangeForm("email", e.target.value)}
              placeholder="eleanor@example.com"
              required
              style={{
                width: "100%",
                padding: "14px 16px 14px 42px",
                background: "rgba(18, 22, 30, 0.8)",
                border: errors.email ? "1px solid #ef4444" : "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                outline: "none",
                transition: "border 0.2s ease"
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-primary)")}
              onBlur={(e) => (e.target.style.borderColor = errors.email ? "#ef4444" : "rgba(212, 175, 55, 0.25)")}
            />
            <Mail size={16} color="#d4af37" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          {errors.email && <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              fontWeight: 600,
              marginBottom: "6px"
            }}
          >
            Phone Number *
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => onChangeForm("phone", e.target.value)}
              placeholder="+1 (212) 555-0143"
              required
              style={{
                width: "100%",
                padding: "14px 16px 14px 42px",
                background: "rgba(18, 22, 30, 0.8)",
                border: errors.phone ? "1px solid #ef4444" : "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                outline: "none",
                transition: "border 0.2s ease"
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-primary)")}
              onBlur={(e) => (e.target.style.borderColor = errors.phone ? "#ef4444" : "rgba(212, 175, 55, 0.25)")}
            />
            <Phone size={16} color="#d4af37" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          {errors.phone && <span style={{ fontSize: "0.72rem", color: "#ef4444", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
        </div>

        {/* Special Requests & Dietary Notes */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--gold-light)",
              fontWeight: 600,
              marginBottom: "6px"
            }}
          >
            Special Requests, Allergies or Dietary Notes
          </label>
          <div style={{ position: "relative" }}>
            <textarea
              name="requests"
              rows={3}
              value={formData.requests}
              onChange={(e) => onChangeForm("requests", e.target.value)}
              placeholder="e.g., Shellfish allergy for 1 guest, anniversary celebration flowers..."
              style={{
                width: "100%",
                padding: "14px 16px 14px 42px",
                background: "rgba(18, 22, 30, 0.8)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                outline: "none",
                resize: "vertical"
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--gold-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(212, 175, 55, 0.25)")}
            />
            <MessageSquare size={16} color="#d4af37" style={{ position: "absolute", left: "14px", top: "18px" }} />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button type="button" onClick={onPrev} className="btn btn-outline" style={{ padding: "12px 24px" }}>
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
          style={{
            padding: "16px 36px",
            fontSize: "0.88rem",
            boxShadow: "0 8px 30px rgba(212, 175, 55, 0.4)"
          }}
        >
          {isSubmitting ? (
            <span>Confirming Reservation...</span>
          ) : (
            <>
              <Check size={18} />
              <span>Confirm Reservation</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
