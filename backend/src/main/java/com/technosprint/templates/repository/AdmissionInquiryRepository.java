package com.technosprint.templates.repository;

import com.technosprint.templates.entity.AdmissionInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdmissionInquiryRepository extends JpaRepository<AdmissionInquiry, Long> {
    Optional<AdmissionInquiry> findByTrackingId(String trackingId);
}
