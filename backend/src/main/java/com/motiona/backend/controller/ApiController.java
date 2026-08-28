package com.motiona.backend.controller;

import com.motiona.backend.model.*;
import com.motiona.backend.service.LandingPageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final LandingPageService service;

    public ApiController(LandingPageService service) {
        this.service = service;
    }

    @GetMapping("/stats")
    public ResponseEntity<List<StatsInfo>> getStats() {
        return ResponseEntity.ok(service.getStats());
    }

    @GetMapping("/services")
    public ResponseEntity<List<ServiceInfo>> getServices() {
        return ResponseEntity.ok(service.getServices());
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getProjects() {
        return ResponseEntity.ok(service.getProjects());
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<Testimonial>> getTestimonials() {
        return ResponseEntity.ok(service.getTestimonials());
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, Object>> submitContact(@Valid @RequestBody ContactRequest request) {
        service.processContact(request);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Contact inquiry successfully recorded.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/newsletter")
    public ResponseEntity<Map<String, Object>> subscribeNewsletter(@Valid @RequestBody NewsletterRequest request) {
        service.processNewsletter(request);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Email successfully registered to newsletter updates.");
        return ResponseEntity.ok(response);
    }

    // Method to handle validation failures and return structured JSON
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", "Validation failed");
        response.put("errors", errors);

        return ResponseEntity.badRequest().body(response);
    }
}
