# 🚀 Polar — Full-Stack Animated Landing Page (React + Java Spring Boot)

A premium, modern, highly animated, fully responsive light-theme landing page built with **React (Vite)**, **Framer Motion**, **Tailwind CSS**, and **Java 21 Spring Boot 3**.

---

## 🎨 Design System & Palette

- **Primary Background**: `#F8FAFC` (Slate 50)
- **Secondary Surface**: `#F1F5F9` (Slate 100)
- **Accents**: Soft Blue (`#3B82F6`), Indigo (`#6366F1`), Lavender (`#8B5CF6`), Cyan (`#0EA5E9`)
- **Text Primary**: Dark Navy (`#0F172A`), Slate (`#64748B`)
- **Theme**: Light, Glassmorphic, Soft Shadows, Smooth Animated Micro-Interactions

---

## 🛠️ Tech Stack

### Frontend
- **React.js 18** (Vite build system)
- **Framer Motion** for physics-based fluid animations
- **Tailwind CSS** with glassmorphism & ambient keyframe utilities
- **Lucide React** for modern iconography
- **Axios** for REST API communication

### Backend
- **Java 21** & **Spring Boot 3.3**
- **Spring Web** & **Jakarta Validation**
- **In-Memory Storage**: Stateless architecture with zero database (MySQL/PostgreSQL/MongoDB) dependencies
- **REST Controller**: `POST /api/contact` handling validation, CORS, and JSON error responses

---

## 📁 Repository Structure

```
landing-page-10/
├── frontend/
│   ├── src/
│   │   ├── animations/
│   │   │   └── animations.js         # Framer Motion variants
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Sticky glassmorphism nav with mobile drawer
│   │   │   ├── Hero.jsx              # Hero section with animated dashboard mockup
│   │   │   ├── TrustSection.jsx      # Brand logos marquee showcase
│   │   │   ├── About.jsx             # 2-column feature breakdown & badges
│   │   │   ├── Features.jsx          # 6 interactive capability cards
│   │   │   ├── Services.jsx          # 6 offering cards with custom gradients
│   │   │   ├── Statistics.jsx        # Viewport animated count-up metrics
│   │   │   ├── HowItWorks.jsx        # 4-step progressive animated timeline
│   │   │   ├── Testimonials.jsx      # Auto-sliding reviews carousel
│   │   │   ├── CTA.jsx               # Vibrant conversion section
│   │   │   ├── Contact.jsx           # Validated contact form with Spring API state
│   │   │   └── Footer.jsx            # Brand links and legal notices
│   │   ├── services/
│   │   │   └── api.js                # Axios REST API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                 # Tailwind directives & glassmorphic utilities
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/
│   ├── src/main/java/com/example/landingpage/
│   │   ├── controller/
│   │   │   └── ContactController.java # POST /api/contact REST endpoint
│   │   ├── service/
│   │   │   └── ContactService.java    # In-memory storage & logging
│   │   ├── model/
│   │   │   ├── ContactRequest.java    # Request DTO with Jakarta Validation
│   │   │   └── ApiResponse.java       # Standard response DTO
│   │   └── LandingPageApplication.java
│   ├── src/main/resources/
│   │   └── application.properties     # Server port 8080 configuration
│   └── pom.xml
│
└── README.md
```

---

## ⚡ Quick Start & Run Commands

### 1. Running the React Frontend

Open a terminal in the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run locally at: `http://localhost:5173`

---

### 2. Running the Java Spring Boot Backend

Open a terminal in the `backend` directory:

```bash
cd backend
```

Using Maven (or Maven Wrapper):

```bash
# Using installed Maven:
mvn spring-boot:run

# Or compile and run using Java 21:
mvn clean package
java -jar target/landing-page-backend-1.0.0.jar
```

The backend server will run at: `http://localhost:8080`

---

## 🔌 API Endpoint Specification

### `POST /api/contact`

**Request Payload:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1 (555) 234-5678",
  "subject": "Project Inquiry",
  "message": "We would like to build a web application using React and Spring Boot."
}
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Your message has been submitted successfully."
}
```

**Validation Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation failed for contact request",
  "errors": {
    "email": "Please provide a valid email address",
    "message": "Message must be between 10 and 2000 characters"
  }
}
```

---

## ♿ Accessibility & Reduced Motion

The application includes native support for `prefers-reduced-motion`. Users with animation sensitivity receive instantaneous transitions without motion triggers.
