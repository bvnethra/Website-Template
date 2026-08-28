import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutStory from "./components/AboutStory";
import SignatureDish from "./components/SignatureDish";
import MenuSection from "./components/Menu/MenuSection";
import Reservation from "./components/Reservation/Reservation";
import ChefSection from "./components/ChefSection";
import Experiences from "./components/Experiences";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import LocationHours from "./components/LocationHours";
import Footer from "./components/Footer";
import SlideNavigator from "./components/SlideNavigator";
import CustomCursor from "./components/CustomCursor";
import Toast from "./components/Toast";
import { SLIDES } from "./data/slidesData";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [viewMode, setViewMode] = useState("slide"); // "slide" | "scroll"
  const [toastMessage, setToastMessage] = useState(null);
  const [prepopulatedDish, setPrepopulatedDish] = useState(null);
  
  // Wheel throttle lock
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);

  const handleNotify = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev < SLIDES.length - 1) return prev + 1;
      return prev;
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleGoToSlide = (index) => {
    setCurrentSlide(index);
    if (viewMode === "scroll") {
      const slide = SLIDES[index];
      const el = document.getElementById(slide.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleOpenReservation = () => {
    handleGoToSlide(4); // Slide 4 is Reservation
    if (viewMode === "scroll") {
      document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrepopulateReservationDish = (dish) => {
    setPrepopulatedDish(dish);
    handleNotify(`Added note for ${dish.name} ($${dish.price}) to reservation!`);
    handleGoToSlide(4);
  };

  const handleExploreMenu = () => {
    handleGoToSlide(3); // Slide 3 is Menu
    if (viewMode === "scroll") {
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard navigation for slide deck mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== "slide") return;
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode]);

  // Mouse wheel throttle handler for slide mode
  useEffect(() => {
    if (viewMode !== "slide") return;

    const handleWheel = (e) => {
      // Allow internal scrolling on modals or specific inner containers
      const target = e.target;
      if (target.closest(".modal-content") || target.closest(".floorplan-canvas") || target.closest(".slider-tray")) {
        return;
      }

      if (isScrollingRef.current) return;

      if (Math.abs(e.deltaY) > 25) {
        isScrollingRef.current = true;
        if (e.deltaY > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 750);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [viewMode]);

  // Touch Swipe for mobile devices
  useEffect(() => {
    if (viewMode !== "slide") return;

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;
      if (Math.abs(diffY) > 50) {
        if (diffY > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [viewMode]);

  // Active slide component render in Slide Deck Mode
  const renderCurrentSlideComponent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Hero
            onOpenReservation={handleOpenReservation}
            onExploreMenu={handleExploreMenu}
          />
        );
      case 1:
        return <AboutStory onOpenReservation={handleOpenReservation} />;
      case 2:
        return (
          <SignatureDish
            onExploreMenu={handleExploreMenu}
            onOpenReservation={handleOpenReservation}
          />
        );
      case 3:
        return (
          <MenuSection
            onOpenReservation={handleOpenReservation}
            onPrepopulateReservationDish={handlePrepopulateReservationDish}
          />
        );
      case 4:
        return (
          <Reservation
            prepopulatedDish={prepopulatedDish}
            onNotify={handleNotify}
          />
        );
      case 5:
        return <ChefSection onOpenReservation={handleOpenReservation} />;
      case 6:
        return <Experiences onOpenReservation={handleOpenReservation} />;
      case 7:
        return <Gallery />;
      case 8:
        return <Testimonials />;
      case 9:
        return (
          <>
            <LocationHours onOpenReservation={handleOpenReservation} />
            <Footer onNotify={handleNotify} onOpenReservation={handleOpenReservation} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-root" style={{ minHeight: "100vh", backgroundColor: "var(--bg-black)", color: "var(--text-primary)" }}>
      {/* Luxury Trailing Cursor */}
      <CustomCursor />

      {/* Top Gold Progress Indicator */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${((currentSlide + 1) / SLIDES.length) * 100}%`,
          background: "var(--gold-gradient)",
          zIndex: 9999,
          boxShadow: "0 0 12px rgba(212, 175, 55, 0.8)",
          transition: "width 0.4s var(--ease-luxury)"
        }}
      />

      {/* Sticky Luxury Navbar */}
      <Navbar
        onOpenReservation={handleOpenReservation}
        currentSlide={currentSlide}
        onGoToSlide={handleGoToSlide}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === "slide" ? "scroll" : "slide")}
      />

      {/* Floating HUD & Bottom Deck Controls */}
      <SlideNavigator
        currentSlide={currentSlide}
        onGoToSlide={handleGoToSlide}
        onNextSlide={handleNextSlide}
        onPrevSlide={handlePrevSlide}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === "slide" ? "scroll" : "slide")}
        onOpenReservation={handleOpenReservation}
      />

      {/* DUAL MODE CONTAINER */}
      {viewMode === "slide" ? (
        <main className="slide-deck-container">
          <div key={currentSlide} className="slide-stage-pane">
            {renderCurrentSlideComponent()}
          </div>
        </main>
      ) : (
        <main style={{ paddingTop: "70px" }}>
          <Hero onOpenReservation={handleOpenReservation} onExploreMenu={handleExploreMenu} />
          <AboutStory onOpenReservation={handleOpenReservation} />
          <SignatureDish onExploreMenu={handleExploreMenu} onOpenReservation={handleOpenReservation} />
          <MenuSection onOpenReservation={handleOpenReservation} onPrepopulateReservationDish={handlePrepopulateReservationDish} />
          <Reservation prepopulatedDish={prepopulatedDish} onNotify={handleNotify} />
          <ChefSection onOpenReservation={handleOpenReservation} />
          <Experiences onOpenReservation={handleOpenReservation} />
          <Gallery />
          <Testimonials />
          <LocationHours onOpenReservation={handleOpenReservation} />
          <Footer onNotify={handleNotify} onOpenReservation={handleOpenReservation} />
        </main>
      )}

      {/* Toast Notifications */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
