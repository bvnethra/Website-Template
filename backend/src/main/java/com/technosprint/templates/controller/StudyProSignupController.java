package com.technosprint.templates.controller;

import com.technosprint.templates.entity.StudyProSignup;
import com.technosprint.templates.repository.StudyProSignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/studypro")
public class StudyProSignupController {

    @Autowired
    private StudyProSignupRepository studyProSignupRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> submitSignup(@RequestBody Map<String, String> request) {
        String studentEmail = request.get("studentEmail");
        String promotionCode = request.getOrDefault("promotionCode", "STUDY40");

        if (studentEmail == null || studentEmail.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Student email is required"));
        }

        StudyProSignup signup = new StudyProSignup(
                studentEmail.trim(),
                promotionCode.trim(),
                LocalDateTime.now()
        );

        StudyProSignup saved = studyProSignupRepository.save(signup);

        return ResponseEntity.ok(Map.of(
                "message", "StudyPro registration successful",
                "studentEmail", saved.getStudentEmail(),
                "promotionCode", saved.getPromotionCode(),
                "signupDate", saved.getSignupDate().toString()
        ));
    }

    @GetMapping("/signups")
    public List<StudyProSignup> getAllSignups() {
        return studyProSignupRepository.findAll();
    }
}
