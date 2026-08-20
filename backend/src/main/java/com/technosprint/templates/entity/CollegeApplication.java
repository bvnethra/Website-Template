package com.technosprint.templates.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "college_applications")
public class CollegeApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String email;

    @Column(name = "intended_major", nullable = false)
    private String intendedMajor;

    @Column(name = "tracking_id", nullable = false, unique = true)
    private String trackingId;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    public CollegeApplication() {
    }

    public CollegeApplication(String studentName, String email, String intendedMajor, String trackingId, LocalDateTime submissionDate) {
        this.studentName = studentName;
        this.email = email;
        this.intendedMajor = intendedMajor;
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

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIntendedMajor() {
        return intendedMajor;
    }

    public void setIntendedMajor(String intendedMajor) {
        this.intendedMajor = intendedMajor;
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
