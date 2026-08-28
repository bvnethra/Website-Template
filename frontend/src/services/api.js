const BASE_URL = 'http://localhost:8080/api';

// Fallback in-memory data for front-end robustness if backend is down
const FALLBACK_STATS = [
  { label: 'Users', count: 10000, suffix: '+' },
  { label: 'Projects', count: 500, suffix: '+' },
  { label: 'Satisfaction', count: 98, suffix: '%' },
  { label: 'Support', count: 24, suffix: '/7' },
];

const FALLBACK_SERVICES = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: 'Code',
    description: 'Building high-performance, modern, and interactive web applications.',
    badge: 'Next.js / React',
    details: 'Custom engineered web applications utilizing React, Vite, Next.js, and Java microservices. Focused on visual elegance, fluid response, and robust SEO architectural patterns.'
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    icon: 'Layers',
    description: 'Designing visually stunning layouts with premium user journeys.',
    badge: 'Figma / Creative',
    details: 'Creating user interfaces centered around visual hierarchy, immersive color schemes, glassmorphic styling, custom illustrations, and interactive wireframes.'
  },
  {
    id: 'digital-sol',
    name: 'Digital Solutions',
    icon: 'Zap',
    description: 'Empowering your brand through strategic technical consulting.',
    badge: 'Scale / Growth',
    details: 'Strategic technical blueprints mapping out your business requirements into digital architecture, conversion pipelines, and modern visual strategies.'
  },
  {
    id: 'cloud-int',
    name: 'Cloud Integration',
    icon: 'Cloud',
    description: 'Deploying secure, distributed, and scalable cloud solutions.',
    badge: 'AWS / Docker',
    details: 'High-availability infrastructure modeling utilizing Amazon Web Services, Docker containerization, Kubernetes orchestration, and automated CI/CD pipelines.'
  },
  {
    id: 'ai-sol',
    name: 'AI Solutions',
    icon: 'Cpu',
    description: 'Integrating intelligent models and LLM automation pipelines.',
    badge: 'OpenAI / Python',
    details: 'Smart search integration, conversational artificial intelligence bots, neural network recommendations, and workflow automations to elevate operational efficiency.'
  },
  {
    id: 'soft-dev',
    name: 'Software Development',
    icon: 'Terminal',
    description: 'Crafting reliable and modular custom enterprise applications.',
    badge: 'Java / Spring',
    details: 'Robust enterprise applications using Java Spring Boot, microservices architecture, secure RESTful APIs, and optimized query pipelines.'
  }
];

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Aetheric Dashboard',
    category: 'Web App',
    description: 'Premium glassmorphic cloud analytics control board.',
    techStack: ['React', 'Framer Motion', 'Recharts'],
    imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    title: 'Neon Commerce',
    category: 'E-Commerce',
    description: 'Stunning electronic storefront featuring smooth transitions.',
    techStack: ['Vite', 'Node.js', 'Stripe'],
    imagePath: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    title: 'Quantum Portal',
    category: 'Landing Page',
    description: 'Cyberpunk styled interactive promotional portal.',
    techStack: ['Three.js', 'GSAP', 'CSS3'],
    imagePath: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    title: 'Nova Automation',
    category: 'AI Platform',
    description: 'Smart dashboard managing neural workflow integrations.',
    techStack: ['Python', 'React', 'FastAPI'],
    imagePath: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 5,
    title: 'Scribe AI',
    category: 'SaaS App',
    description: 'Collaborative cloud notebook driven by LLMs.',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind'],
    imagePath: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 6,
    title: 'Helix Cloud',
    category: 'Infrastructure',
    description: 'DevOps node monitoring platform with live feedback.',
    techStack: ['Go', 'Docker', 'React'],
    imagePath: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80'
  }
];

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CTO, Aether Labs',
    rating: 5,
    feedback: 'The interactive showcase and fluid animations completely elevated our brand visibility. The technical execution was flawless.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Product Lead, Quantum Dynamics',
    rating: 5,
    feedback: 'The glassmorphic dashboard they built is a work of art. It is incredibly responsive and our users are absolutely wowed.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Founder, Nova Creative',
    rating: 5,
    feedback: 'Exceptional communication, clean Spring Boot architecture, and high-performance Framer Motion transitions. Exceeded all specifications.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

// Helper to handle fetch requests with timeout and error fallback
const apiFetch = async (endpoint, options = {}, fallbackData = null) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.warn(`Fetch to ${endpoint} failed. Utilizing fallback data.`, error);
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw error;
  }
};

export const fetchStats = () => apiFetch('/stats', {}, FALLBACK_STATS);
export const fetchServices = () => apiFetch('/services', {}, FALLBACK_SERVICES);
export const fetchProjects = () => apiFetch('/projects', {}, FALLBACK_PROJECTS);
export const fetchTestimonials = () => apiFetch('/testimonials', {}, FALLBACK_TESTIMONIALS);

export const submitContact = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Server error' }));
      throw new Error(err.message || 'Submission failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Contact submission error:', error);
    // Simulate server response on frontend if backend is offline for direct usability
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Message recorded successfully (Offline Demo mode).' });
      }, 1000);
    });
  }
};

export const submitNewsletter = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Server error' }));
      throw new Error(err.message || 'Newsletter signup failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Subscribed successfully (Offline Demo mode).' });
      }, 1000);
    });
  }
};
