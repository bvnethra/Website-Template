package com.technosprint.templates.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "studypro_signups")
public class StudyProSignup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_email", nullable = false)
    private String studentEmail;

    @Column(name = "promotion_code")
    private String promotionCode;

    @Column(name = "signup_date", nullable = false)
    private LocalDateTime signupDate;

    public StudyProSignup() {
    }

    public StudyProSignup(String studentEmail, String promotionCode, LocalDateTime signupDate) {
        this.studentEmail = studentEmail;
        this.promotionCode = promotionCode;
        this.signupDate = signupDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getPromotionCode() {
        return promotionCode;
    }

    public void setPromotionCode(String promotionCode) {
        this.promotionCode = promotionCode;
    }

    public LocalDateTime getSignupDate() {
        return signupDate;
    }

    public void setSignupDate(LocalDateTime signupDate) {
        this.signupDate = signupDate;
    }
}
