const API_BASE_URL = 'http://localhost:8081/api';

export const fetchSiteInfo = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/site-info`);
    if (!res.ok) throw new Error('Failed to fetch site info');
    return await res.json();
  } catch (error) {
    console.error('API Error (site-info):', error);
    // Fallback data
    return {
      name: "Creative Studio",
      tagline: "We turn ideas into experiences",
      description: "An interactive design studio crafting premium digital stories and physical-feeling web magazines.",
      email: "hello@creativestudio.com",
      socialLinks: { instagram: "#", twitter: "#", linkedin: "#", github: "#" }
    };
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return await res.json();
  } catch (error) {
    console.error('API Error (projects):', error);
    return [
      { id: "urban-stories", title: "Urban Stories", category: "Creative Development", description: "An interactive editorial journey documenting urban typography, soundscapes, and architectural geometry mapped onto a fluid browser canvas.", year: 2026, client: "Metropolis Culture", imageUrl: "urban", color: "#FF5F38" },
      { id: "future-classroom", title: "Future Classroom", category: "Web Experiences", description: "An exploratory interface built for physical education labs, allowing students to interactively map physics formulas onto vector shapes.", year: 2025, client: "EduTech Labs", imageUrl: "classroom", color: "#FFE885" },
      { id: "motion-machines", title: "Motion & Machines", category: "Interactive Media", description: "A generative audio-visual browser installation translating physical kinetic movements into dynamic canvas geometries.", year: 2026, client: "Kinetic Basel", imageUrl: "motion", color: "#1E4620" },
      { id: "digital-playground", title: "Digital Playground", category: "Branding & UI/UX", description: "A web magazine and design system showcasing fluid transitions, raw textured paper layers, and custom typography frameworks.", year: 2026, client: "Creative Labs Studio", imageUrl: "playground", color: "#FAF6EE" }
    ];
  }
};

export const fetchServices = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch (error) {
    console.error('API Error (services):', error);
    return [
      { id: "creative-dev", title: "Creative Development", description: "Building interactive layouts that break standard grid structures.", details: ["WebGL & Canvas Art", "GSAP Physics Systems", "Tactile Micro-interactions", "Lottie & SVG Animation"], accentColor: "#FF5F38" },
      { id: "web-experiences", title: "Web Experiences", description: "Crafting high-fidelity website designs built to inspire.", details: ["Vite & React Ecosystems", "Premium SEO Structure", "Fluid Transitions & Parallax", "Reduced Motion Compliance"], accentColor: "#FFE885" },
      { id: "branding", title: "Branding", description: "Synthesizing custom illustrations and editorial guidelines.", details: ["Hand-drawn Vector Graphics", "Harmonious Warm Palettes", "Custom Typography Design", "Brand Identity Packs"], accentColor: "#1E4620" },
      { id: "ui-ux", title: "UI/UX", description: "Design pathways mapped with meticulous details and user feedback.", details: ["Tactile Wireframes", "Interactive Magazine Layouts", "Usability Audits", "Figma Design Systems"], accentColor: "#FAF6EE" },
      { id: "digital-products", title: "Digital Products", description: "Scalable architectural engineering from concept to production-ready servers.", details: ["Java Spring Boot APIs", "Validated Web Architectures", "In-Memory Scalability", "Cross-Platform Optimization"], accentColor: "#FF5F38" },
      { id: "interactive-media", title: "Interactive Media", description: "Where art intersects front-end engineering in sound and canvas.", details: ["Generative Web Audio", "Complex Scroll Triggers", "Cursor-Linked Collisions", "CSS Page Folds"], accentColor: "#1E4620" }
    ];
  }
};

export const fetchTeam = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/team`);
    if (!res.ok) throw new Error('Failed to fetch team');
    return await res.json();
  } catch (error) {
    console.error('API Error (team):', error);
    return [
      { id: "vishal", name: "Vishal", role: "Creative Developer", bio: "Obsessed with smooth layouts, canvas rendering, and translating organic illustrations into interactive web elements.", avatarUrl: "vishal" },
      { id: "nethra", name: "Nethra", role: "Product Designer", bio: "Architect of editorial design grids, handmade textures, and brand identities with a physical magazine feel.", avatarUrl: "nethra" },
      { id: "sakthi", name: "Sakthi", role: "Developer", bio: "Enjoys constructing robust backend APIs, server logic, and optimizing application load parameters.", avatarUrl: "sakthi" },
      { id: "varun", name: "Varun", role: "Developer", bio: "Bridges the gap between creative visual designers and high-performance front-end applications.", avatarUrl: "varun" }
    ];
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return await res.json();
  } catch (error) {
    console.error('API Error (testimonials):', error);
    return [
      { id: "t1", quote: "\"They crafted a digital experience that doesn't feel like a standard website. It feels like flipping through a gorgeous, tactile art magazine.\"", author: "Sofia Rossi", company: "Atelier Milan", rotation: -3 },
      { id: "t2", quote: "\"Working with this creative studio was an interactive adventure. The micro-animations and custom envelope forms are incredibly charming.\"", author: "Marcus Sterling", company: "Luminate Media", rotation: 2 },
      { id: "t3", quote: "\"They proved that a landing page can be an interactive canvas without sacrificing performance, speed, and mobile responsiveness.\"", author: "Elara Vance", company: "Nouveau Creative Group", rotation: -1 },
      { id: "t4", quote: "\"Our digital narrative feels elevated and completely memorable. Our clients keep talking about the layout experience.\"", author: "Julian Thorne", company: "Frame & Line Studio", rotation: 3 }
    ];
  }
};

export const submitContact = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });
  
  const data = await res.json();
  if (!res.ok) {
    // If validation error, data will contain a field-to-message map
    throw { status: res.status, errors: data };
  }
  return data;
};
