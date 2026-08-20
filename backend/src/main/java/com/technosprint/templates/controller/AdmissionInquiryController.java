package com.technosprint.templates.controller;

import com.technosprint.templates.entity.AdmissionInquiry;
import com.technosprint.templates.repository.AdmissionInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionInquiryController {

    @Autowired
    private AdmissionInquiryRepository admissionInquiryRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> submitInquiry(@RequestBody Map<String, String> request) {
        String fullName = request.get("fullName");
        String email = request.get("email");
        String targetProgram = request.get("targetProgram");
        String counselorNotes = request.getOrDefault("counselorNotes", "");

        if (fullName == null || fullName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Full name is required"));
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        if (targetProgram == null || targetProgram.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Target degree program is required"));
        }

        // Generate a unique tracking ID: MU-XXXXXX
        String trackingId;
        Random random = new Random();
        do {
            int code = 100000 + random.nextInt(900000);
            trackingId = "MU-" + code;
        } while (admissionInquiryRepository.findByTrackingId(trackingId).isPresent());

        AdmissionInquiry inquiry = new AdmissionInquiry(
                fullName.trim(),
                email.trim(),
                targetProgram.trim(),
                counselorNotes.trim(),
                trackingId,
                LocalDateTime.now()
        );

        AdmissionInquiry saved = admissionInquiryRepository.save(inquiry);

        return ResponseEntity.ok(Map.of(
                "message", "Inquiry submitted successfully",
                "trackingId", saved.getTrackingId(),
                "fullName", saved.getFullName(),
                "email", saved.getEmail(),
                "targetProgram", saved.getTargetProgram(),
                "submissionDate", saved.getSubmissionDate().toString()
        ));
    }

    @GetMapping("/inquiries")
    public List<AdmissionInquiry> getAllInquiries() {
        return admissionInquiryRepository.findAll();
    }
}
