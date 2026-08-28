import React, { useState, useEffect } from "react";
import StepDate from "./StepDate";
import StepTime from "./StepTime";
import StepGuests from "./StepGuests";
import StepFloorplan from "./StepFloorplan";
import StepDetails from "./StepDetails";
import Confirmation from "./Confirmation";
import { RESTAURANT_TABLES } from "../../data/tablesData";
import { Calendar, Clock, Users, MapPin, CheckCircle, Sparkles } from "lucide-react";

export default function Reservation({ prepopulatedDish, onNotify }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [time, setTime] = useState("7:30 PM");
  const [guests, setGuests] = useState(2);
  const [preference, setPreference] = useState("Window Table");
  const [occasion, setOccasion] = useState("");
  const [selectedTable, setSelectedTable] = useState(RESTAURANT_TABLES[7]); // Default Table 08 (Window)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requests: ""
  });
  const [bookingRef, setBookingRef] = useState("");

  const steps = [
    { num: "01", label: "Date" },
    { num: "02", label: "Time" },
    { num: "03", label: "Guests" },
    { num: "04", label: "Table" },
    { num: "05", label: "Details" }
  ];

  const handleFormChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleConfirmReservation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `#ELN-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onNotify) {
        onNotify(`Reservation confirmed for ${formData.name || "Guest"}! Ref: ${generatedRef}`);
      }
    }, 900);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setFormData({ name: "", email: "", phone: "", requests: "" });
  };

  return (
    <section
      id="reservation"
      className="section"
      style={{
        backgroundColor: "#07080b",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Subtle Background Lighting */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
          pointerEvents: "none"
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span className="section-tag">An Unforgettable Evening</span>
          <h2 className="section-title">YOUR TABLE AWAITS</h2>
          <p className="section-subtitle">
            Secure your preferred seating in our main dining salon, private gold room, or botanical terrace.
          </p>
        </div>

        {/* Main Booking Container */}
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "linear-gradient(180deg, rgba(16, 19, 27, 0.9) 0%, rgba(10, 11, 15, 0.98) 100%)",
            border: "1px solid var(--border-gold)",
            borderRadius: "var(--radius-xl)",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.08)"
          }}
        >
          {/* Multi-Step Progress Indicator (Shown unless submitted) */}
          {!isSubmitted && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(212, 175, 55, 0.18)",
                paddingBottom: "1.8rem",
                marginBottom: "2.5rem",
                overflowX: "auto",
                gap: "1rem"
              }}
            >
              {steps.map((step, idx) => {
                const stepIndex = idx + 1;
                const isCurrent = currentStep === stepIndex;
                const isCompleted = currentStep > stepIndex;

                return (
                  <div
                    key={step.num}
                    onClick={() => {
                      if (stepIndex < currentStep) setCurrentStep(stepIndex);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: stepIndex < currentStep ? "pointer" : "default",
                      opacity: isCurrent ? 1 : isCompleted ? 0.9 : 0.45,
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: isCurrent
                          ? "var(--gold-gradient)"
                          : isCompleted
                          ? "rgba(212, 175, 55, 0.2)"
                          : "rgba(255,255,255,0.06)",
                        color: isCurrent ? "#08090c" : isCompleted ? "var(--gold-light)" : "var(--text-muted)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: isCurrent
                          ? "1px solid var(--gold-light)"
                          : isCompleted
                          ? "1px solid var(--gold-primary)"
                          : "1px solid rgba(255,255,255,0.1)"
                      }}
                    >
                      {step.num}
                    </div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-sans)",
                        fontWeight: isCurrent ? 700 : 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isCurrent ? "var(--gold-light)" : "var(--text-secondary)"
                      }}
                    >
                      {step.label}
                    </span>

                    {idx < steps.length - 1 && (
                      <span style={{ color: "rgba(212, 175, 55, 0.3)", marginLeft: "8px" }}>—</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Step Content Panes */}
          {isSubmitted ? (
            <Confirmation
              reservationData={{
                date,
                time,
                guests,
                preference,
                table: selectedTable,
                details: formData,
                bookingRef
              }}
              onReset={handleReset}
            />
          ) : (
            <>
              {currentStep === 1 && (
                <StepDate
                  selectedDate={date}
                  onSelectDate={(newDate) => setDate(newDate)}
                  onNext={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 2 && (
                <StepTime
                  selectedTime={time}
                  onSelectTime={(newTime) => setTime(newTime)}
                  onNext={() => setCurrentStep(3)}
                  onPrev={() => setCurrentStep(1)}
                />
              )}

              {currentStep === 3 && (
                <StepGuests
                  guestCount={guests}
                  onSelectGuests={(count) => setGuests(count)}
                  seatingPreference={preference}
                  onSelectPreference={(pref) => setPreference(pref)}
                  occasion={occasion}
                  onSelectOccasion={(occ) => setOccasion(occ)}
                  onNext={() => setCurrentStep(4)}
                  onPrev={() => setCurrentStep(2)}
                />
              )}

              {currentStep === 4 && (
                <StepFloorplan
                  selectedTable={selectedTable}
                  onSelectTable={(tbl) => setSelectedTable(tbl)}
                  onNext={() => setCurrentStep(5)}
                  onPrev={() => setCurrentStep(3)}
                />
              )}

              {currentStep === 5 && (
                <StepDetails
                  formData={formData}
                  onChangeForm={handleFormChange}
                  prepopulatedDish={prepopulatedDish}
                  onSubmit={handleConfirmReservation}
                  onPrev={() => setCurrentStep(4)}
                  isSubmitting={isSubmitting}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
