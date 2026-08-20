package com.technosprint.templates.repository;

import com.technosprint.templates.entity.CollegeApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CollegeApplicationRepository extends JpaRepository<CollegeApplication, Long> {
    Optional<CollegeApplication> findByTrackingId(String trackingId);
}
