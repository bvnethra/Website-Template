import React, { useState, useEffect } from "react";
import { Utensils, Calendar, Phone, Menu as MenuIcon, X, Sparkles, Layers } from "lucide-react";
import { SLIDES } from "../data/slidesData";

export default function Navbar({
  onOpenReservation,
  currentSlide,
  onGoToSlide,
  viewMode,
  onToggleViewMode
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", slideIndex: 0, href: "#hero" },
    { label: "Story", slideIndex: 1, href: "#story" },
    { label: "Signature", slideIndex: 2, href: "#signature" },
    { label: "Menu", slideIndex: 3, href: "#menu" },
    { label: "Chef", slideIndex: 5, href: "#chef" },
    { label: "Experiences", slideIndex: 6, href: "#experiences" },
    { label: "Gallery", slideIndex: 7, href: "#gallery" },
    { label: "Visit", slideIndex: 9, href: "#location" }
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onGoToSlide) {
      onGoToSlide(link.slideIndex);
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 90,
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        backgroundColor: scrolled || viewMode === "slide" ? "rgba(10, 11, 14, 0.94)" : "transparent",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.18)",
        padding: "1rem 0"
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, navLinks[0])}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textDecoration: "none"
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.95rem",
              letterSpacing: "0.22em",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1
            }}
          >
            ÉLANE
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--gold-primary)",
              marginTop: "4px"
            }}
          >
            Fine Dining • NYC
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "2rem"
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isCurrentActive = currentSlide === link.slideIndex;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: isCurrentActive ? 700 : 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: isCurrentActive ? "var(--gold-light)" : "var(--text-secondary)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  position: "relative",
                  paddingBottom: "4px",
                  borderBottom: isCurrentActive ? "1px solid var(--gold-primary)" : "1px solid transparent"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-primary)")}
                onMouseLeave={(e) => {
                  if (!isCurrentActive) e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions (Mode Switcher + Book Button) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          {/* Reservation Button */}
          <button
            onClick={() => onOpenReservation()}
            className="btn btn-primary"
            style={{
              fontSize: "0.78rem",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <Calendar size={15} />
            <span>Reserve Table</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-menu-btn"
            style={{
              display: "none",
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "var(--gold-primary)",
              cursor: "pointer"
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 70px)",
            backgroundColor: "rgba(8, 9, 12, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2rem 1.5rem",
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <span className="section-tag" style={{ margin: 0 }}>ÉLANE Slide Experience</span>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.6rem",
                  color: currentSlide === link.slideIndex ? "var(--gold-light)" : "var(--text-primary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  paddingBottom: "0.6rem"
                }}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: "0.8rem", color: "var(--gold-primary)", fontFamily: "var(--font-sans)" }}>
                  Slide 0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px" }}
            >
              <Calendar size={16} />
              <span>Book Table Experience</span>
            </button>
            <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem" }}>
              18 Aurora Avenue, Manhattan, New York • (212) 555-0198
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 959px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
