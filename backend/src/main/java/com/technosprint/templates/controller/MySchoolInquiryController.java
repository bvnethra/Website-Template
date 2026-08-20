package com.technosprint.templates.controller;

import com.technosprint.templates.entity.MySchoolInquiry;
import com.technosprint.templates.repository.MySchoolInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/myschool")
public class MySchoolInquiryController {

    @Autowired
    private MySchoolInquiryRepository mySchoolInquiryRepository;

    @PostMapping("/apply")
    public ResponseEntity<?> submitInquiry(@RequestBody Map<String, String> request) {
        String parentName = request.get("parentName");
        String childName = request.get("childName");
        String email = request.get("email");
        String targetGrade = request.get("targetGrade");
        String message = request.getOrDefault("message", "");

        if (parentName == null || parentName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Parent name is required"));
        }
        if (childName == null || childName.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Child name is required"));
        }
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        if (targetGrade == null || targetGrade.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Target grade level is required"));
        }

        MySchoolInquiry inquiry = new MySchoolInquiry(
                parentName.trim(),
                childName.trim(),
                email.trim(),
                targetGrade.trim(),
                message.trim(),
                LocalDateTime.now()
        );

        MySchoolInquiry saved = mySchoolInquiryRepository.save(inquiry);

        return ResponseEntity.ok(Map.of(
                "message", "Parent inquiry registered successfully",
                "parentName", saved.getParentName(),
                "childName", saved.getChildName(),
                "email", saved.getEmail(),
                "targetGrade", saved.getTargetGrade(),
                "submissionDate", saved.getSubmissionDate().toString()
        ));
    }

    @GetMapping("/inquiries")
    public List<MySchoolInquiry> getAllInquiries() {
        return mySchoolInquiryRepository.findAll();
    }
}
