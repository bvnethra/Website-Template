package com.motiona.backend.service;

import com.motiona.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class LandingPageService {

    private final List<StatsInfo> statsList = new ArrayList<>();
    private final List<ServiceInfo> servicesList = new ArrayList<>();
    private final List<Project> projectsList = new ArrayList<>();
    private final List<Testimonial> testimonialsList = new ArrayList<>();

    public LandingPageService() {
        loadMockData();
    }

    private void loadMockData() {
        // Load statistics
        statsList.add(new StatsInfo("Users", 10000, "+"));
        statsList.add(new StatsInfo("Projects", 500, "+"));
        statsList.add(new StatsInfo("Satisfaction", 98, "%"));
        statsList.add(new StatsInfo("Support", 24, "/7"));

        // Load capabilities/services
        servicesList.add(new ServiceInfo(
                "web-dev",
                "Web Development",
                "Code",
                "Building high-performance, modern, and interactive web applications.",
                "Next.js / React",
                "Custom engineered web applications utilizing React, Vite, Next.js, and Java microservices. Focused on visual elegance, fluid response, and robust SEO architectural patterns."
        ));
        servicesList.add(new ServiceInfo(
                "ui-ux",
                "UI/UX Design",
                "Layers",
                "Designing visually stunning layouts with premium user journeys.",
                "Figma / Creative",
                "Creating user interfaces centered around visual hierarchy, immersive color schemes, glassmorphic styling, custom illustrations, and interactive wireframes."
        ));
        servicesList.add(new ServiceInfo(
                "digital-sol",
                "Digital Solutions",
                "Zap",
                "Empowering your brand through strategic technical consulting.",
                "Scale / Growth",
                "Strategic technical blueprints mapping out your business requirements into digital architecture, conversion pipelines, and modern visual strategies."
        ));
        servicesList.add(new ServiceInfo(
                "cloud-int",
                "Cloud Integration",
                "Cloud",
                "Deploying secure, distributed, and scalable cloud solutions.",
                "AWS / Docker",
                "High-availability infrastructure modeling utilizing Amazon Web Services, Docker containerization, Kubernetes orchestration, and automated CI/CD pipelines."
        ));
        servicesList.add(new ServiceInfo(
                "ai-sol",
                "AI Solutions",
                "Cpu",
                "Integrating intelligent models and LLM automation pipelines.",
                "OpenAI / Python",
                "Smart search integration, conversational artificial intelligence bots, neural network recommendations, and workflow automations to elevate operational efficiency."
        ));
        servicesList.add(new ServiceInfo(
                "soft-dev",
                "Software Development",
                "Terminal",
                "Crafting reliable and modular custom enterprise applications.",
                "Java / Spring",
                "Robust enterprise applications using Java Spring Boot, microservices architecture, secure RESTful APIs, and optimized query pipelines."
        ));

        // Load showcase projects
        projectsList.add(new Project(
                1,
                "Aetheric Dashboard",
                "Web App",
                "Premium glassmorphic cloud analytics control board.",
                Arrays.asList("React", "Framer Motion", "Recharts"),
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
        ));
        projectsList.add(new Project(
                2,
                "Neon Commerce",
                "E-Commerce",
                "Stunning electronic storefront featuring smooth transitions.",
                Arrays.asList("Vite", "Node.js", "Stripe"),
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
        ));
        projectsList.add(new Project(
                3,
                "Quantum Portal",
                "Landing Page",
                "Cyberpunk styled interactive promotional portal.",
                Arrays.asList("Three.js", "GSAP", "CSS3"),
                "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
        ));
        projectsList.add(new Project(
                4,
                "Nova Automation",
                "AI Platform",
                "Smart dashboard managing neural workflow integrations.",
                Arrays.asList("Python", "React", "FastAPI"),
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
        ));
        projectsList.add(new Project(
                5,
                "Scribe AI",
                "SaaS App",
                "Collaborative cloud notebook driven by LLMs.",
                Arrays.asList("Next.js", "PostgreSQL", "Tailwind"),
                "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
        ));
        projectsList.add(new Project(
                6,
                "Helix Cloud",
                "Infrastructure",
                "DevOps node monitoring platform with live feedback.",
                Arrays.asList("Go", "Docker", "React"),
                "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80"
        ));

        // Load testimonials
        testimonialsList.add(new Testimonial(
                1,
                "Sarah Jenkins",
                "CTO, Aether Labs",
                5,
                "The interactive showcase and fluid animations completely elevated our brand visibility. The technical execution was flawless.",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
        ));
        testimonialsList.add(new Testimonial(
                2,
                "Marcus Chen",
                "Product Lead, Quantum Dynamics",
                5,
                "The glassmorphic dashboard they built is a work of art. It is incredibly responsive and our users are absolutely wowed.",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
        ));
        testimonialsList.add(new Testimonial(
                3,
                "Elena Rostova",
                "Founder, Nova Creative",
                5,
                "Exceptional communication, clean Spring Boot architecture, and high-performance Framer Motion transitions. Exceeded all specifications.",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        ));
    }

    public List<StatsInfo> getStats() { return statsList; }
    public List<ServiceInfo> getServices() { return servicesList; }
    public List<Project> getProjects() { return projectsList; }
    public List<Testimonial> getTestimonials() { return testimonialsList; }

    public void processContact(ContactRequest request) {
        System.out.println("--- RECEIVED CONTACT INQUIRY ---");
        System.out.println("Sender: " + request.getName() + " (" + request.getEmail() + ")");
        System.out.println("Phone: " + request.getPhone());
        System.out.println("Subject: " + request.getSubject());
        System.out.println("Message: " + request.getMessage());
        System.out.println("---------------------------------");
    }

    public void processNewsletter(NewsletterRequest request) {
        System.out.println("--- NEWSLETTER SUBSCRIPTION ---");
        System.out.println("Subscriber email: " + request.getEmail());
        System.out.println("-------------------------------");
    }
}
