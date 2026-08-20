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


            // Seed Soft Glow template
            Template softGlow = new Template();
            softGlow.setName("Soft Glow — Clean Beauty & Skin-First Hydration");
            softGlow.setSlug("soft-glow");
            softGlow.setDescription("A high-end Next.js beauty and skincare storefront featuring dewy-gloss styles, peptide bundle builders, marquee notification bars, interactive review boards, and smooth scroll animations.");
            softGlow.setCategory(ecommerceCategory);
            softGlow.setPrice(0.0);
            softGlow.setTemplateType("FREE");
            softGlow.setBootstrapVersion("Next.js / React / Tailwind CSS");
            softGlow.setDemoUrl("/templates/ecommerce/ecommerce-1/index.html");
            softGlow.setDownloadFile("soft-glow-beauty.zip");
            softGlow.setPreviewImage("https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80");
            softGlow.setVersion("1.0.0");
            softGlow.setStatus("PUBLISHED");
            softGlow.setPagesCount(3);
            softGlow.setDownloadsCount(2450);
            softGlow.setTags(new ArrayList<>(Arrays.asList("Skincare", "Beauty Shop", "Next.js Store", "Tailwind CSS")));
            templateRepository.save(softGlow);
            logs.put("template_softglow", "Created");

            // Seed AURA template
            Template aura = new Template();
            aura.setName("AURA — Premium Acoustic & Luxury Archive");
            aura.setSlug("aura-commerce");
            aura.setDescription("An editorial, dark-themed e-commerce experience dedicated to premium acoustics, luxury timepieces, and structural apparel. Built with interactive cart drawers, wishlist triggers, and gold gradient finishes.");
            aura.setCategory(ecommerceCategory);
            aura.setPrice(0.0);
            aura.setTemplateType("FREE");
            aura.setBootstrapVersion("React / React Router / CSS Modules");
            aura.setDemoUrl("/templates/ecommerce/ecommerce-6/index.html");
            aura.setDownloadFile("aura-acoustic.zip");
            aura.setPreviewImage("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80");
            aura.setVersion("1.0.0");
            aura.setStatus("PUBLISHED");
            aura.setPagesCount(8);
            aura.setDownloadsCount(3100);
            aura.setTags(new ArrayList<>(Arrays.asList("Luxury Archive", "Premium Acoustics", "React Store", "Wishlist System")));
            templateRepository.save(aura);
            logs.put("template_aura", "Created");

            // Seed AURELIA template
            Template aurelia = new Template();
            aurelia.setName("AURELIA — Luxury Jewelry & Emerald Archive");
            aurelia.setSlug("aurelia-commerce");
            aurelia.setDescription("A premium, dark emerald & gold themed e-commerce template for high-end luxury jewelry, diamonds, and bridal collections. Styled with custom drawers, search overlay, and elegant product filters.");
            aurelia.setCategory(ecommerceCategory);
            aurelia.setPrice(0.0);
            aurelia.setTemplateType("FREE");
            aurelia.setBootstrapVersion("React / React Router / Vanilla CSS");
            aurelia.setDemoUrl("/templates/ecommerce/ecommerce-2/index.html");
            aurelia.setDownloadFile("aurelia-jewelry.zip");
            aurelia.setPreviewImage("https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80");
            aurelia.setVersion("1.0.0");
            aurelia.setStatus("PUBLISHED");
            aurelia.setPagesCount(9);
            aurelia.setDownloadsCount(1420);
            aurelia.setTags(new ArrayList<>(Arrays.asList("Jewelry Store", "Emerald Collection", "React Store", "Luxury Premium")));
            templateRepository.save(aurelia);
            logs.put("template_aurelia", "Created");

            // Seed ShopSphere template
            Template shopsphere = new Template();
            shopsphere.setName("ShopSphere — Modern Fashion & Lifestyle Store");
            shopsphere.setSlug("shopsphere-commerce");
            shopsphere.setDescription("A sleek, modern e-commerce storefront for fashion and lifestyle brands. Features sidebar navigation, interactive category listings, search filter overlay, and a clean minimalist design.");
            shopsphere.setCategory(ecommerceCategory);
            shopsphere.setPrice(0.0);
            shopsphere.setTemplateType("FREE");
            shopsphere.setBootstrapVersion("HTML5 / CSS3 / JavaScript");
            shopsphere.setDemoUrl("/templates/ecommerce/ecommerce-7/index.html");
            shopsphere.setDownloadFile("shopsphere-fashion.zip");
            shopsphere.setPreviewImage("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80");
            shopsphere.setVersion("1.0.0");
            shopsphere.setStatus("PUBLISHED");
            shopsphere.setPagesCount(5);
            shopsphere.setDownloadsCount(2850);
            shopsphere.setTags(new ArrayList<>(Arrays.asList("Fashion Store", "Minimalist Layout", "HTML5 CSS3", "Interactive sidebar")));
            templateRepository.save(shopsphere);
            logs.put("template_shopsphere", "Created");

            // Seed ToyVerse template
            Template toyverse = new Template();
            toyverse.setName("ToyVerse — Interactive Toy & Hobby Store");
            toyverse.setSlug("toy-store");
            toyverse.setDescription("A vibrant and interactive online storefront designed for modern toy stores and hobby shops. Features a custom 3D flying toy canvas, whimsical category lists, responsive cart drawer, and interactive tracking.");
            toyverse.setCategory(ecommerceCategory);
            toyverse.setPrice(0.0);
            toyverse.setTemplateType("FREE");
            toyverse.setBootstrapVersion("React / TypeScript / GSAP");
            toyverse.setDemoUrl("/templates/ecommerce/ecommerce-8/index.html");
            toyverse.setDownloadFile("toyverse-hobby.zip");
            toyverse.setPreviewImage("https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80");
            toyverse.setVersion("1.0.0");
            toyverse.setStatus("PUBLISHED");
            toyverse.setPagesCount(8);
            toyverse.setDownloadsCount(3200);
            toyverse.setTags(new ArrayList<>(Arrays.asList("Toy Store", "GSAP Animations", "3D Whimsical Layout", "Hobby Shop")));
            templateRepository.save(toyverse);
            logs.put("template_toyverse", "Created");


        }

        // 8. Seed Coming Soon templates
        Category commingSoonCategory = catMap.get("comming-soon");
        if (commingSoonCategory != null) {
            Template comingSoon = new Template();
            comingSoon.setName("Orange 16  -  Coming Soon Template");
            comingSoon.setSlug("coming-soon-template");
            comingSoon.setDescription("A new experience of performance, photography and design is about to arrive. Explore the revolutionary Orange 16 with White and Black Titanium craft, O18 Pro chip, slow-motion video, and exploded engineering architecture.");
            comingSoon.setCategory(commingSoonCategory);
            comingSoon.setPrice(0.0);
            comingSoon.setTemplateType("FREE");
            comingSoon.setBootstrapVersion("HTML5 / Vanilla CSS");
            comingSoon.setDemoUrl("/templates/comming-soon/coming-soon-template/index.html");
            comingSoon.setPreviewImage("/templates/comming-soon/coming-soon-template/orange-cover.jpg");
            comingSoon.setVersion("1.0");
            comingSoon.setStatus("PUBLISHED");
            comingSoon.setPagesCount(1);
            comingSoon.setDownloadsCount(1200);
            comingSoon.setTags(new ArrayList<>(Arrays.asList("Orange 16", "Coming Soon", "Titanium Design")));
            templateRepository.save(comingSoon);

            Template novaSoon = new Template();
            novaSoon.setName("NOVA X1  -  Cinematic Coming Soon Template");
            novaSoon.setSlug("nova-x1-template");
            novaSoon.setDescription("A production-quality futuristic automotive showroom template. Explore the NOVA X1 electric SUV with interactive 3D WebGL visuals, scroll-driven camera reveals, dynamic paint customizer, performance analytics, and pre-booking capture.");
            novaSoon.setCategory(commingSoonCategory);
            novaSoon.setPrice(0.0);
            novaSoon.setTemplateType("FREE");
            novaSoon.setBootstrapVersion("React / Three.js / GSAP");
            novaSoon.setDemoUrl("/templates/comming-soon/cm-2/index.html");
            novaSoon.setPreviewImage("/templates/comming-soon/cm-2/car-cover.jpg");
            novaSoon.setVersion("1.0");
            novaSoon.setStatus("PUBLISHED");
            novaSoon.setPagesCount(1);
            novaSoon.setDownloadsCount(1850);
            novaSoon.setTags(new ArrayList<>(Arrays.asList("3D Showroom", "NOVA MOTORS", "Automotive", "GSAP ScrollTrigger")));
            templateRepository.save(novaSoon);

            Template auraSoon = new Template();
            auraSoon.setName("AURA SKY RESIDENCES  -  Premium Cinematic Building Launch Template");
            auraSoon.setSlug("aura-sky-template");
            auraSoon.setDescription("Create a modern, premium, cinematic coming soon website for luxury real-estate projects. Features continuous slow-motion building rendering background loops, Lenis smooth scrolling, architectural specification grids, and modular registration capture forms.");
            auraSoon.setCategory(commingSoonCategory);
            auraSoon.setPrice(0.0);
            auraSoon.setTemplateType("FREE");
            auraSoon.setBootstrapVersion("HTML5 / Tailwind CSS");
            auraSoon.setDemoUrl("/templates/comming-soon/cm-3/index.html");
            auraSoon.setPreviewImage("/templates/comming-soon/cm-3/buliding-jpg/ezgif-frame-001.jpg");
            auraSoon.setVersion("1.0");
            auraSoon.setStatus("PUBLISHED");
            auraSoon.setPagesCount(1);
            auraSoon.setDownloadsCount(950);
            auraSoon.setTags(new ArrayList<>(Arrays.asList("Real Estate", "Luxury Skyline", "Lenis Smooth Scroll", "Audio Engine")));
            templateRepository.save(auraSoon);

            Template botanicalSoon = new Template();
            botanicalSoon.setName("BOTANICAL STUDIES  -  Heritage Folio Book Launch Template");
            botanicalSoon.setSlug("botanical-studies-template");
            botanicalSoon.setDescription("An exquisite collector’s edition book coming soon website template. Features interactive 9-frame video background engine, live millisecond-precision countdown timer, Linnean author showcase, antiquarian Web Audio synthesizer, botanical plate inspector modal, and responsive laptop/tab/phone preview.");
            botanicalSoon.setCategory(commingSoonCategory);
            botanicalSoon.setPrice(0.0);
            botanicalSoon.setTemplateType("FREE");
            botanicalSoon.setBootstrapVersion("HTML5 / Tailwind / Vanilla JS");
            botanicalSoon.setDemoUrl("/templates/comming-soon/cm-4/index.html");
            botanicalSoon.setPreviewImage("/templates/comming-soon/cm-4/botanical-cover.jpg");
            botanicalSoon.setVersion("1.0");
            botanicalSoon.setStatus("PUBLISHED");
            botanicalSoon.setPagesCount(1);
            botanicalSoon.setDownloadsCount(1420);
            botanicalSoon.setTags(new ArrayList<>(Arrays.asList("Book Launch", "Heritage Folio", "Live Countdown", "Video Background", "Audio Synthesizer")));
            templateRepository.save(botanicalSoon);

            Template watchSoon = new Template();
            watchSoon.setName("AURELIA CHRONOS  -  18K Luxury Golden Watch Launch Template");
            watchSoon.setSlug("aurelia-chronos-template");
            watchSoon.setDescription("A luxurious 18k solid gold watch launch template. Features weightless floating antigravity 3D physics, interactive 360-degree studio orbit rotation, fluted crown and sunburst guilloché macro lens inspectors, 28,800 vph mechanical escapement audio synthesizer, and VIP allocation reservation capture.");
            watchSoon.setCategory(commingSoonCategory);
            watchSoon.setPrice(0.0);
            watchSoon.setTemplateType("FREE");
            watchSoon.setBootstrapVersion("HTML5 / Tailwind CSS / Vanilla JS");
            watchSoon.setDemoUrl("/templates/comming-soon/cm-5/index.html");
            watchSoon.setPreviewImage("/templates/comming-soon/cm-5/watch-hero.jpg");
            watchSoon.setVersion("1.0");
            watchSoon.setStatus("PUBLISHED");
            watchSoon.setPagesCount(1);
            watchSoon.setDownloadsCount(1680);
            watchSoon.setTags(new ArrayList<>(Arrays.asList("Golden Watch", "Antigravity 3D", "Haute Horlogerie", "360 Orbit", "Live Countdown")));
            templateRepository.save(watchSoon);
        }

        logs.put("status", "Database Seeding Completed Successfully! All templates seeded.");
        return ResponseEntity.ok(logs);
    }
}
