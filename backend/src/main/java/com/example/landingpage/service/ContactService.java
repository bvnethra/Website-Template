package com.example.landingpage.service;

import com.example.landingpage.model.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);
    
    // In-memory thread-safe storage without any database dependency
    private final List<ContactRequest> contactSubmissions = Collections.synchronizedList(new ArrayList<>());

    public boolean processContactSubmission(ContactRequest request) {
        logger.info("Processing contact submission from: {} ({})", request.getName(), request.getEmail());
        contactSubmissions.add(request);
        logger.info("Total in-memory submissions recorded: {}", contactSubmissions.size());
        return true;
    }

    public List<ContactRequest> getAllSubmissions() {
        return new ArrayList<>(contactSubmissions);
    }
}
