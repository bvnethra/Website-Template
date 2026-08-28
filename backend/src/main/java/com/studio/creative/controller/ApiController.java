package com.studio.creative.controller;

import com.studio.creative.model.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class ApiController {

    private final List<Project> projects = new ArrayList<>();
    private final List<Service> services = new ArrayList<>();
    private final List<TeamMember> team = new ArrayList<>();
    private final List<Testimonial> testimonials = new ArrayList<>();
    private final SiteInfo siteInfo;

    public ApiController() {
        // Populate Projects
        projects.add(new Project(
                "urban-stories",
                "Urban Stories",
                "Creative Development",
                "An interactive editorial journey documenting urban typography, soundscapes, and architectural geometry mapped onto a fluid browser canvas.",
                2026,
                "Metropolis Culture",
                "urban",
                "#FF5F38"
        ));
        projects.add(new Project(
                "future-classroom",
                "Future Classroom",
                "Web Experiences",
                "An exploratory interface built for physical education labs, allowing students to interactively map physics formulas onto vector shapes.",
                2025,
                "EduTech Labs",
                "classroom",
                "#FFE885"
        ));
        projects.add(new Project(
                "motion-machines",
                "Motion & Machines",
                "Interactive Media",
                "A generative audio-visual browser installation translating physical kinetic movements into dynamic canvas geometries.",
                2026,
                "Kinetic Basel",
                "motion",
                "#1E4620"
        ));
        projects.add(new Project(
                "digital-playground",
                "Digital Playground",
                "Branding & UI/UX",
                "A web magazine and design system showcasing fluid transitions, raw textured paper layers, and custom typography frameworks.",
                2026,
                "Creative Labs Studio",
                "playground",
                "#FAF6EE"
        ));

        // Populate Services
        services.add(new Service(
                "creative-dev",
                "Creative Development",
                "Building interactive layouts that break standard grid structures and captivate visitors.",
                Arrays.asList("WebGL & Canvas Art", "GSAP Physics Systems", "Tactile Micro-interactions", "Lottie & SVG Animation"),
                "#FF5F38"
        ));
        services.add(new Service(
                "web-experiences",
                "Web Experiences",
                "Crafting high-fidelity website designs built to inspire and maintain fluid navigation.",
                Arrays.asList("Vite & React Ecosystems", "Premium SEO Structure", "Fluid Transitions & Parallax", "Reduced Motion Compliance"),
                "#FFE885"
        ));
        services.add(new Service(
                "branding",
                "Branding",
                "Synthesizing custom illustrations, typography styles, and editorial guidelines.",
                Arrays.asList("Hand-drawn Vector Graphics", "Harmonious Warm Palettes", "Custom Typography Design", "Brand Identity Packs"),
                "#1E4620"
        ));
        services.add(new Service(
                "ui-ux",
                "UI/UX",
                "Design pathways mapped with meticulous details and interactive visual feedback.",
                Arrays.asList("Tactile Wireframes", "Interactive Magazine Layouts", "Usability Audits", "Figma Design Systems"),
                "#FAF6EE"
        ));
        services.add(new Service(
                "digital-products",
                "Digital Products",
                "Scalable architectural engineering from concept blueprinting to production-ready servers.",
                Arrays.asList("Java Spring Boot APIs", "Validated Web Architectures", "In-Memory Scalability", "Cross-Platform Optimization"),
                "#FF5F38"
        ));
        services.add(new Service(
                "interactive-media",
                "Interactive Media",
                "Where art intersects front-end engineering in spatial displays, graphics, and sound.",
                Arrays.asList("Generative Web Audio", "Complex Scroll Triggers", "Cursor-Linked Collisions", "CSS Page Folds"),
                "#1E4620"
        ));

        // Populate Team
        team.add(new TeamMember(
                "vishal",
                "Vishal",
                "Creative Developer",
                "Obsessed with smooth layouts, canvas rendering, and translating organic illustrations into interactive web elements.",
                "vishal"
        ));
        team.add(new TeamMember(
                "nethra",
                "Nethra",
                "Product Designer",
                "Architect of editorial design grids, handmade textures, and brand identities with a physical magazine feel.",
                "nethra"
        ));
        team.add(new TeamMember(
                "sakthi",
                "Sakthi",
                "Developer",
                "Enjoys constructing robust backend APIs, server logic, and optimizing application load parameters.",
                "sakthi"
        ));
        team.add(new TeamMember(
                "varun",
                "Varun",
                "Developer",
                "Bridges the gap between creative visual designers and high-performance front-end applications.",
                "varun"
        ));

        // Populate Testimonials
        testimonials.add(new Testimonial(
                "t1",
                "\"They crafted a digital experience that doesn't feel like a standard website. It feels like flipping through a gorgeous, tactile art magazine.\"",
                "Sofia Rossi",
                "Atelier Milan",
                -3
        ));
        testimonials.add(new Testimonial(
                "t2",
                "\"Working with this creative studio was an interactive adventure. The micro-animations and custom envelope forms are incredibly charming.\"",
                "Marcus Sterling",
                "Luminate Media",
                2
        ));
        testimonials.add(new Testimonial(
                "t3",
                "\"They proved that a landing page can be an interactive canvas without sacrificing performance, speed, and mobile responsiveness.\"",
                "Elara Vance",
                "Nouveau Creative Group",
                -1
        ));
        testimonials.add(new Testimonial(
                "t4",
                "\"Our digital narrative feels elevated and completely memorable. Our clients keep talking about the layout experience.\"",
                "Julian Thorne",
                "Frame & Line Studio",
                3
        ));

        // Site Info
        Map<String, String> socialLinks = new HashMap<>();
        socialLinks.put("instagram", "#");
        socialLinks.put("twitter", "#");
        socialLinks.put("linkedin", "#");
        socialLinks.put("github", "#");

        siteInfo = new SiteInfo(
                "Creative Studio",
                "We turn ideas into experiences",
                "An interactive design studio crafting premium digital stories and physical-feeling web magazines.",
                "hello@creativestudio.com",
                socialLinks
        );
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projects;
    }

    @GetMapping("/services")
    public List<Service> getServices() {
        return services;
    }

    @GetMapping("/team")
    public List<TeamMember> getTeam() {
        return team;
    }

    @GetMapping("/testimonials")
    public List<Testimonial> getTestimonials() {
        return testimonials;
    }

    @GetMapping("/site-info")
    public SiteInfo getSiteInfo() {
        return siteInfo;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> submitContact(@Valid @RequestBody ContactForm form) {
        // Sample in-memory handling
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Your idea has been launched! Watch it fly.");
        response.put("receivedData", form);
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
