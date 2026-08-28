package com.example.landingpage.controller;

import com.example.landingpage.model.ApiResponse;
import com.example.landingpage.model.ContactRequest;
import com.example.landingpage.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> handleContactSubmit(@Valid @RequestBody ContactRequest request) {
        contactService.processContactSubmission(request);
        
        ApiResponse response = new ApiResponse(
            true, 
            "Your message has been submitted successfully."
        );
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/contact")
    public ResponseEntity<ApiResponse> getSubmissionsCount() {
        int count = contactService.getAllSubmissions().size();
        return ResponseEntity.ok(new ApiResponse(true, "Total in-memory submissions: " + count));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse response = new ApiResponse(
            false, 
            "Validation failed for contact request", 
            errors
        );
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
