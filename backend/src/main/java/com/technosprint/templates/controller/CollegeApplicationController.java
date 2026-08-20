package com.technosprint.templates.controller;

import com.technosprint.templates.entity.CollegeApplication;
import com.technosprint.templates.repository.CollegeApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/college")
public class CollegeApplicationController {

    @Autowired
    private CollegeApplicationRepository collegeApplicationRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> submitApplication(@RequestBody Map<String, String> request) {
        String studentName = request.get("studentName");
        String email = request.get("email");
        String intendedMajor = request.get("intendedMajor");

        if (studentName == null || studentName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student name is required"));
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        if (intendedMajor == null || intendedMajor.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Intended major is required"));
        }

        // Generate tracking ID: CLG-XXXXXX
        String trackingId;
        Random random = new Random();
        do {
            int code = 100000 + random.nextInt(900000);
            trackingId = "CLG-" + code;
        } while (collegeApplicationRepository.findByTrackingId(trackingId).isPresent());

        CollegeApplication application = new CollegeApplication(
                studentName.trim(),
                email.trim(),
                intendedMajor.trim(),
                trackingId,
                LocalDateTime.now()
        );

        CollegeApplication saved = collegeApplicationRepository.save(application);

        return ResponseEntity.ok(Map.of(
                "message", "Application submitted successfully",
                "trackingId", saved.getTrackingId(),
                "studentName", saved.getStudentName(),
                "email", saved.getEmail(),
                "intendedMajor", saved.getIntendedMajor(),
                "submissionDate", saved.getSubmissionDate().toString()
        ));
    }

    @GetMapping("/applications")
    public List<CollegeApplication> getAllApplications() {
        return collegeApplicationRepository.findAll();
    }
}
