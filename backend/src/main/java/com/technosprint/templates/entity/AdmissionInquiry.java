package com.technosprint.templates.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admission_inquiries")
public class AdmissionInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(name = "target_program", nullable = false)
    private String targetProgram;

    @Column(name = "counselor_notes", columnDefinition = "TEXT")
    private String counselorNotes;

    @Column(name = "tracking_id", nullable = false, unique = true)
    private String trackingId;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    public AdmissionInquiry() {
    }

    public AdmissionInquiry(String fullName, String email, String targetProgram, String counselorNotes, String trackingId, LocalDateTime submissionDate) {
        this.fullName = fullName;
        this.email = email;
        this.targetProgram = targetProgram;
        this.counselorNotes = counselorNotes;
        this.trackingId = trackingId;
        this.submissionDate = submissionDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTargetProgram() {
        return targetProgram;
    }

    public void setTargetProgram(String targetProgram) {
        this.targetProgram = targetProgram;
    }

    public String getCounselorNotes() {
        return counselorNotes;
    }

    public void setCounselorNotes(String counselorNotes) {
        this.counselorNotes = counselorNotes;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }
}
