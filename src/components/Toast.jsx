import React from "react";
import { Sparkles, CheckCircle2, X } from "lucide-react";

export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        background: "rgba(14, 17, 24, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--gold-primary)",
        borderRadius: "var(--radius-md)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.2)",
        animation: "slideUp 0.35s var(--ease-luxury)",
        maxWidth: "420px"
      }}
    >
      <Sparkles size={20} color="#d4af37" style={{ flexShrink: 0 }} />
      <div style={{ fontSize: "0.86rem", color: "var(--text-primary)", lineHeight: 1.4 }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          cursor: "pointer",
          padding: "4px",
          marginLeft: "8px",
          display: "flex",
          alignItems: "center"
        }}
        aria-label="Dismiss Notification"
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
