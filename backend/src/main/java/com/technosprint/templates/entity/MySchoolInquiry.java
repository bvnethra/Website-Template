package com.technosprint.templates.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "myschool_inquiries")
public class MySchoolInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "parent_name", nullable = false)
    private String parentName;

    @Column(name = "child_name", nullable = false)
    private String childName;

    @Column(nullable = false)
    private String email;

    @Column(name = "target_grade", nullable = false)
    private String targetGrade;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate;

    public MySchoolInquiry() {
    }

    public MySchoolInquiry(String parentName, String childName, String email, String targetGrade, String message, LocalDateTime submissionDate) {
        this.parentName = parentName;
        this.childName = childName;
        this.email = email;
        this.targetGrade = targetGrade;
        this.message = message;
        this.submissionDate = submissionDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public String getChildName() {
        return childName;
    }

    public void setChildName(String childName) {
        this.childName = childName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTargetGrade() {
        return targetGrade;
    }

    public void setTargetGrade(String targetGrade) {
        this.targetGrade = targetGrade;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }
}
