import React, { useState } from "react";
import { ArrowRight, Heart, Check, Sparkles } from "lucide-react";

export default function Footer({ onNotify, onOpenReservation }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    if (onNotify) {
      onNotify("Thank you for subscribing to ÉLANE Gazette!");
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Menu", href: "#menu" },
    { label: "Reservations", href: "#reservation" },
    { label: "Our Story", href: "#story" },
    { label: "Chef", href: "#chef" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit & Contact", href: "#location" }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#050608",
        borderTop: "1px solid rgba(212, 175, 55, 0.2)",
        padding: "80px 0 35px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Top Ambient Line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "2px",
          background: "var(--gold-gradient)"
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3.5rem",
            marginBottom: "4rem"
          }}
        >
          {/* Col 1: Brand & Narrative */}
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", letterSpacing: "0.18em", color: "var(--text-primary)", marginBottom: "6px" }}>
              ÉLANE
            </div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.15rem", fontStyle: "italic", color: "var(--gold-light)", marginBottom: "1.2rem" }}>
              "Where Every Plate Becomes a Memory."
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Contemporary Haute Cuisine curated by Executive Chef Adrian Laurent in Manhattan, New York.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                {
                  label: "Instagram",
                  href: "https://instagram.com",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  )
                },
                {
                  label: "Facebook",
                  href: "https://facebook.com",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )
                },
                {
                  label: "YouTube",
                  href: "https://youtube.com",
                  svg: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(212, 175, 55, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold-light)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold-primary)";
                    e.currentTarget.style.background = "rgba(212, 175, 55, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  aria-label={item.label}
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Navigation
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease"
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold-primary)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Gastronomy Hours */}
          <div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Dining Hours
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Dinner</strong>
                <div>Tuesday – Sunday: 5:30 PM – 11:00 PM</div>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Lunch & Midday</strong>
                <div>Friday – Sunday: 12:00 PM – 3:00 PM</div>
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
                Valet parking available at entrance.
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <div style={{ fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold-primary)", fontWeight: 700, marginBottom: "1.5rem" }}>
              Stay in the know.
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.2rem" }}>
              Receive invitations to private seasonal tasting debuts, cellar reserves, and chef collaborations.
            </p>

            {subscribed ? (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(212, 175, 55, 0.12)",
                  border: "1px solid var(--gold-primary)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--gold-light)",
                  fontSize: "0.85rem"
                }}
              >
                <Check size={16} color="#d4af37" />
                <span>You are now subscribed to the ÉLANE Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    padding: "12px 14px",
                    background: "rgba(18, 22, 30, 0.8)",
                    border: "1px solid rgba(212, 175, 55, 0.3)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(212, 175, 55, 0.3)")}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "12px", fontSize: "0.78rem" }}
                >
                  <span>Subscribe</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            paddingTop: "1.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.78rem",
            color: "var(--text-muted)"
          }}
        >
          <div>© 2026 ÉLANE Restaurant Group. All Rights Reserved.</div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>Terms of Hospitality</span>
            <span style={{ cursor: "pointer" }}>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
