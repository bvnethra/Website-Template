package com.technosprint.templates.controller;

import com.technosprint.templates.entity.*;
import com.technosprint.templates.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import java.util.*;

@RestController
@RequestMapping("/api/seed")
public class DatabaseSeederController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TemplateRepository templateRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    private DownloadRepository downloadRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    public void autoSeedOnStartup() {
        if (categoryRepository.count() == 0 || templateRepository.count() == 0) {
            System.out.println(">>> [AUTO-SEED] Seeding initial categories and templates into database...");
            seedDatabase();
        }
    }

    @PostMapping
    @GetMapping
    public ResponseEntity<?> seedDatabase() {
        Map<String, Object> logs = new LinkedHashMap<>();

        // 1. Clear existing database data to remove dummy data completely
        downloadRepository.deleteAll();
        licenseRepository.deleteAll();
        orderRepository.deleteAll();
        templateRepository.deleteAll();
        categoryRepository.deleteAll();
        logs.put("cleanup", "Cleared all old template, category, download, order, and license records.");

        // 2. Seed Users
        if (!userRepository.existsByEmail("admin@technosprint.com")) {
            User admin = new User(
                    "TechnoSprint Admin",
                    "admin@technosprint.com",
                    passwordEncoder.encode("adminpassword"),
                    "ROLE_ADMIN",
                    "ACTIVE"
            );
            userRepository.save(admin);
            logs.put("adminUser", "Created (admin@technosprint.com / adminpassword)");
        } else {
            logs.put("adminUser", "Exists");
        }

        if (!userRepository.existsByEmail("user@technosprint.com")) {
            User user = new User(
                    "Jane Doe",
                    "user@technosprint.com",
                    passwordEncoder.encode("userpassword"),
                    "ROLE_USER",
                    "ACTIVE"
            );
            userRepository.save(user);
            logs.put("regularUser", "Created (user@technosprint.com / userpassword)");
        } else {
            logs.put("regularUser", "Exists");
        }

        // 3. Seed exact 18 categories requested
        String[][] categoryData = {
                {"Admin", "admin", "Admin dashboards and control panels."},
                {"Medical", "medical", "Websites for clinics, doctors, and hospitals."},
                {"Block magazine", "block-magazine", "Blog layouts, news portals, and magazine grids."},
                {"Comming soon", "comming-soon", "Under construction pages and pre-launch countdown overlays."},
                {"Travels", "travels", "Tour agencies, booking services, and travel logs."},
                {"Hotel", "hotel", "Resorts, motels, and luxury hotel reservation templates."},
                {"Events", "events", "Conferences, meetups, exhibitions, and ticket bookings."},
                {"Photography", "photography", "Portfolio grids for photographers and visual artists."},
                {"Construction", "construction", "Building developers, architectural firms, and contracting companies."},
                {"Education", "education", "Universities, e-learning dashboards, and primary schools."},
                {"Restaurant", "restaurant", "Food bistros, cafes, bakeries, and dining menu showcases."},
                {"Ecommerce", "ecommerce", "Online storefronts, checkout flows, and product catalogs."},
                {"Buisness", "buisness", "Sleek corporate sites, startup landing pages, and agencies."},
                {"onepage", "onepage", "Single page scroll themes and minimal sales funnels."},
                {"landing page", "landing-page", "High-conversion lead forms and app promotion layouts."},
                {"cooperate", "cooperate", "Enterprise consulting, corporate services, and financial groups."},
                {"agency", "agency", "Design studios, marketing firms, and creative agencies."},
                {"portfolio", "portfolio", "Personal resumes, developer bios, and work showcases."}
        };

        Map<String, Category> catMap = new HashMap<>();
        for (String[] data : categoryData) {
            Category cat = new Category(data[0], data[1], data[2], "ACTIVE");
            categoryRepository.save(cat);
            catMap.put(data[1], cat);
            logs.put("category_" + data[1], "Created");
        }

        // 4. Seed Qure Nexa template under Medical category
        Category medicalCategory = catMap.get("medical");
        if (medicalCategory != null) {
            Template qureNexa = new Template();
            qureNexa.setName("Qure Nexa — Advanced Medical & Healthcare Platform");
            qureNexa.setSlug("qure-nexa");
            qureNexa.setDescription("A modern healthcare and hospital management platform featuring multi-role portals for Patients, Doctors, and Admins, doctor directory, intelligent slot booking, and clinical workflows.");
            qureNexa.setCategory(medicalCategory);
            qureNexa.setPrice(0.0);
            qureNexa.setTemplateType("FREE");
            qureNexa.setBootstrapVersion("React 19 / Tailwind CSS / Vite");
            qureNexa.setDemoUrl("/templates/medical/qure-nexa/index.html");
            qureNexa.setDownloadFile("qure-nexa-medical.zip");
            qureNexa.setPreviewImage("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80");
            qureNexa.setVersion("1.0");
            qureNexa.setStatus("PUBLISHED");
            qureNexa.setPagesCount(12);
            qureNexa.setDownloadsCount(12400);
            qureNexa.setTags(new ArrayList<>(Arrays.asList("medical", "healthcare", "hospital", "doctor", "patient-portal", "clinic")));
            templateRepository.save(qureNexa);
            logs.put("qureNexaTemplate", "Seeded Qure Nexa under Medical category");
        }

        // 5. Seed Photography templates
        Category photography = catMap.get("photography");
        if (photography != null) {
            // SnapFolio template
            Template snapfolio = new Template();
            snapfolio.setName("SnapFolio — Dark Minimalist Portfolio");
            snapfolio.setSlug("snapfolio-template");
            snapfolio.setDescription("A dark-themed photography portfolio featuring a floating glass sidebar navigation, animated typewriter hero headlines, responsive masonry layouts, next/prev arrow keyboard navigation lightbox, and integrated booking validation feedback.");
            snapfolio.setCategory(photography);
            snapfolio.setPrice(0.0);
            snapfolio.setTemplateType("FREE");
            snapfolio.setBootstrapVersion("HTML5 / Tailwind CSS");
            snapfolio.setDemoUrl("/templates/photography/snapfolio-template/index.html");
            snapfolio.setDownloadFile("snapfolio-template.zip");
            snapfolio.setPreviewImage("https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80");
            snapfolio.setVersion("1.0.0");
            snapfolio.setStatus("PUBLISHED");
            snapfolio.setPagesCount(1);
            snapfolio.setDownloadsCount(12450);
            snapfolio.setTags(new ArrayList<>(Arrays.asList("Dark Theme", "Masonry Gallery", "Lightbox Modal")));
            templateRepository.save(snapfolio);
            logs.put("template_snapfolio", "Created");

            // Photo template
            Template photo = new Template();
            photo.setName("Photo — Editorial Photography Studio");
            photo.setSlug("photo-template");
            photo.setDescription("A high-end, editorial landing page template for creative photography studios. Features Apple-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.");
            photo.setCategory(photography);
            photo.setPrice(0.0);
            photo.setTemplateType("FREE");
            photo.setBootstrapVersion("HTML5 / Vanilla CSS");
            photo.setDemoUrl("/templates/photography/photo-template/index.html");
            photo.setDownloadFile("photo-template.zip");
            photo.setPreviewImage("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80");
            photo.setVersion("1.0.0");
            photo.setStatus("PUBLISHED");
            photo.setPagesCount(1);
            photo.setDownloadsCount(15200);
            photo.setTags(new ArrayList<>(Arrays.asList("Editorial Layout", "Scroll Pinned Canvas", "Golden Hour Theme")));
            templateRepository.save(photo);
            logs.put("template_photo", "Created");

            // Wedding template (Lumière)
            Template wedding = new Template();
            wedding.setName("Lumière — High-End Wedding & Event Photography");
            wedding.setSlug("wedding-template");
            wedding.setDescription("A responsive, high-end wedding and event photography portfolio web template with a warm ivory backdrop, center-split navigation, elegant serif headings, and sticky whatsapp/phone buttons.");
            wedding.setCategory(photography);
            wedding.setPrice(0.0);
            wedding.setTemplateType("FREE");
            wedding.setBootstrapVersion("HTML5 / Tailwind CSS");
            wedding.setDemoUrl("/templates/photography/wedding-template/index.html");
            wedding.setDownloadFile("wedding-template.zip");
            wedding.setPreviewImage("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80");
            wedding.setVersion("1.0.0");
            wedding.setStatus("PUBLISHED");
            wedding.setPagesCount(1);
            wedding.setDownloadsCount(1200);
            wedding.setTags(new ArrayList<>(Arrays.asList("Wedding Theme", "Ivory Background", "Serif Typography")));
            templateRepository.save(wedding);
            logs.put("template_wedding", "Created");

            // Fine Art template (Aura)
            Template fineart = new Template();
            fineart.setName("Aura — Premium Fine Art Studio");
            fineart.setSlug("fineart-template");
            fineart.setDescription("A premium, dynamic React portfolio website for a fine art photography studio. Features Ken Burns hero animations, scroll-triggered wipe reveals, and interactive circular gallery navigations.");
            fineart.setCategory(photography);
            fineart.setPrice(0.0);
            fineart.setTemplateType("FREE");
            fineart.setBootstrapVersion("HTML5 / Vanilla CSS");
            fineart.setDemoUrl("/templates/photography/fineart-template/index.html");
            fineart.setDownloadFile("fineart-template.zip");
            fineart.setPreviewImage("/fineart_cover.png");
            fineart.setVersion("1.0.0");
            fineart.setStatus("PUBLISHED");
            fineart.setPagesCount(1);
            fineart.setDownloadsCount(1500);
            fineart.setTags(new ArrayList<>(Arrays.asList("Premium Serif", "Wipe Reveals", "Hover Custom Cursor")));
            templateRepository.save(fineart);
            logs.put("template_fineart", "Created");

            // Cinematic Wedding template (Eden Rose)
            Template cinematic = new Template();
            cinematic.setName("Eden Rose — Cinematic Luxury Wedding Portfolio");
            cinematic.setSlug("cinematic-wedding");
            cinematic.setDescription("A cinematic wedding photography portfolio template in deep black and luxury gold tones. Features intro curtain loaders, route transition reveals, staggered portfolio grids, and boutique inquiry options.");
            cinematic.setCategory(photography);
            cinematic.setPrice(0.0);
            cinematic.setTemplateType("FREE");
            cinematic.setBootstrapVersion("HTML5 / Tailwind CSS");
            cinematic.setDemoUrl("/templates/photography/cinematic-wedding/index.html");
            cinematic.setDownloadFile("cinematic-wedding.zip");
            cinematic.setPreviewImage("/cinematic_cover.png");
            cinematic.setVersion("1.0.0");
            cinematic.setStatus("PUBLISHED");
            cinematic.setPagesCount(1);
            cinematic.setDownloadsCount(12450);
            cinematic.setTags(new ArrayList<>(Arrays.asList("Luxury Monocrom", "Preloader curtain", "Staggered Grid")));
            templateRepository.save(cinematic);
            logs.put("template_cinematic", "Created");

            // Kairo template
            Template kairo = new Template();
            kairo.setName("Kairo — Modern 3D Photography Portfolio");
            kairo.setSlug("kairo-template");
            kairo.setDescription("A modern photography portfolio featuring interactive 3D camera lens aperture graphics rendered in React Three Fiber, scroll-linked fade animations, split-layout bio sections, and fullscreen responsive image tiles.");
            kairo.setCategory(photography);
            kairo.setPrice(0.0);
            kairo.setTemplateType("FREE");
            kairo.setBootstrapVersion("HTML5 / Tailwind CSS");
            kairo.setDemoUrl("/templates/photography/kairo-template/index.html");
            kairo.setDownloadFile("kairo-template.zip");
            kairo.setPreviewImage("/kairo_cover.png");
            kairo.setVersion("1.0.0");
            kairo.setStatus("PUBLISHED");
            kairo.setPagesCount(1);
            kairo.setDownloadsCount(8200);
            kairo.setTags(new ArrayList<>(Arrays.asList("3D Scene", "Interactive Parallax", "Luxury Editorial")));
            templateRepository.save(kairo);
            logs.put("template_kairo", "Created");

            // iSteady Gimbal template
            Template isteady = new Template();
            isteady.setName("iSteady MT3 Pro — AI Stabilizer Portfolio");
            isteady.setSlug("isteady-template");
            isteady.setDescription("A premium product launch page designed for camera gimbals. Features interactive 3D stabilizer rigs in R3F, multi-axis stabilizing sine movements, exploded scroll animations, and tactile specs.");
            isteady.setCategory(photography);
            isteady.setPrice(0.0);
            isteady.setTemplateType("FREE");
            isteady.setBootstrapVersion("HTML5 / Tailwind CSS");
            isteady.setDemoUrl("/templates/photography/isteady-template/index.html");
            isteady.setDownloadFile("isteady-template.zip");
            isteady.setPreviewImage("/isteady_cover.png");
            isteady.setVersion("1.0.0");
            isteady.setStatus("PUBLISHED");
            isteady.setPagesCount(1);
            isteady.setDownloadsCount(9500);
            isteady.setTags(new ArrayList<>(Arrays.asList("AI Stabilizer", "OLED HUD", "Brushed Metal Arm")));
            templateRepository.save(isteady);
            logs.put("template_isteady", "Created");
        }

        // 6. Seed Restaurant templates
        Category restaurantCategory = catMap.get("restaurant");
        if (restaurantCategory != null) {
            Template restaurant = new Template();
            restaurant.setName("Ember & Olive — Artisan Seasonal Restaurant");
            restaurant.setSlug("ember-and-olive");
            restaurant.setDescription("An elegant, full-featured artisan restaurant template featuring wood-fired dining menus, reservation bars, chef profiles, interactive events pages, and responsive design.");
            restaurant.setCategory(restaurantCategory);
            restaurant.setPrice(0.0);
            restaurant.setTemplateType("FREE");
            restaurant.setBootstrapVersion("HTML5 / Bootstrap 5");
            restaurant.setDemoUrl("/templates/restaurant/ember-and-olive/index.html");
            restaurant.setDownloadFile("ember-and-olive-restaurant.zip");
            restaurant.setPreviewImage("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80");
            restaurant.setVersion("1.0.0");
            restaurant.setStatus("PUBLISHED");
            restaurant.setPagesCount(6);
            restaurant.setDownloadsCount(9500);
            restaurant.setTags(new ArrayList<>(Arrays.asList("Wood-Fired", "Artisan Dining", "Reservation Micro UI", "Responsive Menu")));
            templateRepository.save(restaurant);
            logs.put("template_restaurant", "Created");
        }

        // 7. Seed Ecommerce templates
        Category ecommerceCategory = catMap.get("ecommerce");
        if (ecommerceCategory != null) {
            Template ecommerce = new Template();
            ecommerce.setName("Nexa Commerce — High-End Ecommerce Platform");
            ecommerce.setSlug("nexa-commerce");
            ecommerce.setDescription("A modern, full-featured retail platform featuring dynamic product catalogs, a fully-featured customer cart, responsive checkouts, and a comprehensive admin inventory management dashboard.");
            ecommerce.setCategory(ecommerceCategory);
            ecommerce.setPrice(0.0);
            ecommerce.setTemplateType("FREE");
            ecommerce.setBootstrapVersion("HTML5 / Vanilla CSS / JS");
            ecommerce.setDemoUrl("/templates/ecommerce/nexa/index.html");
            ecommerce.setDownloadFile("nexa-commerce.zip");
            ecommerce.setPreviewImage("https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=800&q=80");
            ecommerce.setVersion("1.0.0");
            ecommerce.setStatus("PUBLISHED");
            ecommerce.setPagesCount(12);
            ecommerce.setDownloadsCount(11000);
            ecommerce.setTags(new ArrayList<>(Arrays.asList("Retail Shop", "Product Catalog", "Cart Logic", "Inventory Dashboard")));
            templateRepository.save(ecommerce);
            logs.put("template_ecommerce", "Created");
        }

        logs.put("status", "Database Seeding Completed Successfully! All templates seeded.");
        return ResponseEntity.ok(logs);
    }
}
