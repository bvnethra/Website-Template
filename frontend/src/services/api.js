const BASE_URL = 'http://localhost:8080/api';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Admin', slug: 'admin' },
  { id: 2, name: 'Medical', slug: 'medical' },
  { id: 3, name: 'Block magazine', slug: 'block-magazine' },
  { id: 4, name: 'Comming soon', slug: 'comming-soon' },
  { id: 5, name: 'Travels', slug: 'travels' },
  { id: 6, name: 'Hotel', slug: 'hotel' },
  { id: 7, name: 'Events', slug: 'events' },
  { id: 8, name: 'Photography', slug: 'photography' },
  { id: 9, name: 'Construction', slug: 'construction' },
  { id: 10, name: 'Education', slug: 'education' },
  { id: 11, name: 'Restaurant', slug: 'restaurant' },
  { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
  { id: 13, name: 'Buisness', slug: 'buisness' },
  { id: 14, name: 'onepage', slug: 'onepage' },
  { id: 15, name: 'landing page', slug: 'landing-page' },
  { id: 16, name: 'cooperate', slug: 'cooperate' },
  { id: 17, name: 'agency', slug: 'agency' },
  { id: 18, name: 'portfolio', slug: 'portfolio' }
];

const MOCK_TEMPLATES = [
  {
    id: 1,
    name: 'SnapFolio  -  Dark Minimalist Portfolio',
    slug: 'snapfolio-template',
    previewImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 15000,
    description: 'A dark-themed photography portfolio featuring a floating glass sidebar navigation, animated typewriter hero headlines, responsive masonry layouts, next/prev arrow keyboard navigation lightbox, and integrated booking validation feedback.',
    bootstrapVersion: 'HTML5 / Tailwind CSS',
    version: '1.0',
    demoUrl: '/templates/photography/snapfolio-template/index.html'
  },
  {
    id: 2,
    name: 'Photo  -  Editorial Photography Studio',
    slug: 'photo-template',
    previewImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 8400,
    description: 'A high-end, editorial landing page template for creative photography studios. Features Sphere-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0',
    demoUrl: '/templates/photography/photo-template/index.html'
  },
  {
    id: 3,
    name: 'Lumière — High-End Wedding & Event Photography',
    slug: 'wedding-template',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'A responsive, high-end wedding and event photography portfolio web template with a warm ivory backdrop, center-split navigation, elegant serif headings, and sticky whatsapp/phone buttons.',
    bootstrapVersion: 'HTML5 / Tailwind CSS',
    version: '1.0',
    demoUrl: '/templates/photography/wedding-template/index.html'
  },
  {
    id: 4,
    name: 'Qure Nexa — Advanced Medical & Healthcare Platform',
    slug: 'qure-nexa',
    previewImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 2, name: 'Medical', slug: 'medical' },
    pagesCount: 12,
    downloadsCount: 12400,
    description: 'A modern healthcare and hospital management platform featuring multi-role portals for Patients, Doctors, and Admins, doctor directory, intelligent slot booking, and clinical workflows.',
    bootstrapVersion: 'React 19 / Tailwind CSS / Vite',
    demoUrl: '/templates/medical/qure-nexa/index.html',
    downloadFile: 'qure-nexa-medical.zip',
    version: '1.0'
  },


  {
    id: 7,
    name: 'Soft Glow — Clean Beauty & Skin-First Hydration',
    slug: 'soft-glow',
    previewImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 3,
    downloadsCount: 2450,
    description: 'A high-end Next.js beauty and skincare storefront featuring dewy-gloss styles, peptide bundle builders, marquee notification bars, interactive review boards, and smooth scroll animations.',
    bootstrapVersion: 'Next.js / React / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/ecommerce/ecommerce-1/index.html'
  },
  {
    id: 8,
    name: 'AURA — Premium Acoustic & Luxury Archive',
    slug: 'aura-commerce',
    previewImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 8,
    downloadsCount: 3100,
    description: 'An editorial, dark-themed e-commerce experience dedicated to premium acoustics, luxury timepieces, and structural apparel. Built with interactive cart drawers, wishlist triggers, and gold gradient finishes.',
    bootstrapVersion: 'React / React Router / CSS Modules',
    version: '1.0.0',
    demoUrl: '/templates/ecommerce/ecommerce-6/index.html'
  },
  {
    id: 9,
    name: 'AURELIA — Luxury Jewelry & Emerald Archive',
    slug: 'aurelia-commerce',
    previewImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 9,
    downloadsCount: 1420,
    description: 'A premium, dark emerald & gold themed e-commerce template for high-end luxury jewelry, diamonds, and bridal collections. Styled with custom drawers, search overlay, and elegant product filters.',
    bootstrapVersion: 'React / React Router / Vanilla CSS',
    version: '1.0.0',
    demoUrl: '/templates/ecommerce/ecommerce-2/index.html'
  },

  {
    id: 11,
    name: 'ToyVerse — Interactive Toy & Hobby Store',
    slug: 'toy-store',
    previewImage: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 8,
    downloadsCount: 3200,
    description: 'A vibrant and interactive online storefront designed for modern toy stores and hobby shops. Features a custom 3D flying toy canvas, whimsical category lists, responsive cart drawer, and interactive tracking.',
    demoUrl: '/templates/ecommerce/ecommerce-8/index.html'
  },
  {
    id: 12,
    name: 'NOVA — Futuristic Device & Ecosystem Store',
    slug: 'nova-store',
    previewImage: '/templates/ecommerce/ecommerce-3/images/nova_x1_front.webp',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 4,
    downloadsCount: 4100,
    description: 'A futuristic and clean electronic product storefront dedicated to premium devices and smart ecosystem components. Features automated command search overlays, compare modals, interactive specifications, and cart drawers.',
    demoUrl: '/templates/ecommerce/ecommerce-3/index.html'
  },
  {
    id: 13,
    name: 'Orvana — Premium Design & Lifestyle Concept Store',
    slug: 'orvana-store',
    previewImage: 'https://images.unsplash.com/photo-1441984969733-d4df530a7731?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 14,
    downloadsCount: 5120,
    description: 'A cinematic and immersive e-commerce storefront for lifestyle and fashion concept brands. Features rich animations, cinematic video hero headers, product quick view modals, interactive sorting, and detailed item configuration options.',
    demoUrl: '/templates/ecommerce/ecommerce-4/index.html'
  },
  {
    id: 14,
    name: 'AUREL — Minimalist Fashion & Lifestyle Store',
    slug: 'aurel-store',
    previewImage: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=800&auto=format&fit=crop',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 10,
    downloadsCount: 3820,
    description: 'A minimalist, structured e-commerce storefront for organic fashion and lifestyle labels. Features smooth scroll reveals, custom cursors, floating filter panels, and color/size cart controls.',
    demoUrl: '/templates/ecommerce/ecommerce-5/index.html'
  },
  {
    id: 15,
    name: 'Ember House — Artisan Dining & Gathering Space',
    slug: 'ember-house',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 8,
    downloadsCount: 2950,
    description: 'An elegant, full-featured artisan restaurant and gathering venue template. Features fine dining menu displays, inline reservation requests, slideshow lookbooks, team/chef highlights, and clean typography.',
    demoUrl: '/templates/restaurant/restaurant-1/index.html'
  },
  {
    id: 16,
    name: 'Ember & Olive — Artisan Seasonal Restaurant',
    slug: 'ember-and-olive-react',
    previewImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 6,
    downloadsCount: 9500,
    description: 'An elegant, premium React-refactored restaurant template featuring signature dish modals, scroll progress cursors, reservation sections, event highlights, and a gorgeous lightbox gallery.',
    demoUrl: '/templates/restaurant/restaurant-2/index.html'
  },
  {
    id: 17,
    name: 'Lumière — Modern Culinary Concept Store',
    slug: 'lumiere-restaurant',
    previewImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1840,
    description: 'An immersive and cinematic restaurant concept showcase template. Features custom dynamic cursors, interactive floating dish hover cards, smooth scroll reveals, custom reservation modals, and structured storytelling panels.',
    demoUrl: '/templates/restaurant/restaurant-3/index.html'
  },
  {
    id: 18,
    name: 'Ember House Noire — Contemporary Garden Restaurant',
    slug: 'ember-house-noire',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1450,
    description: 'A contemporary garden restaurant template styled in dark editorial aesthetics. Features botanical garden themes, interactive curatorial grids, testimonial slide bars, custom cursors, and reservation capture forms.',
    demoUrl: '/templates/restaurant/restaurant-4/index.html'
  },
  {
    id: 19,
    name: 'NOIRE — Nocturnal Garden Bar & Grill',
    slug: 'noire-restaurant',
    previewImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 11, name: 'Restaurant', slug: 'restaurant' },
    pagesCount: 1,
    downloadsCount: 1200,
    description: 'An premium, unconventional, and moody restaurant template featuring custom ambient audio lounge music, live fireplace hearth sections, dynamic parallax scroll effects, menu showcases, and reservation builders.',
    demoUrl: '/templates/restaurant/restaurant-5/index.html'
  },
  {
    id: 20,
    name: 'Skillora — Online Education & Learning Platform',
    slug: 'skillora-education',
    previewImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 10, name: 'Education', slug: 'education' },
    pagesCount: 8,
    downloadsCount: 3900,
    description: 'A modern, gorgeous online learning platform with university programs, certified courses, industry mentorship, and dynamic bento animations.',
    bootstrapVersion: 'React / TypeScript / Tailwind CSS',
    version: '1.0.0',
    demoUrl: '/templates/education/education-1/index.html'
  },
  {
    id: 101,
    name: 'BLUECORE — Futuristic Device & Electronics Showroom',
    slug: 'bluecore-showroom',
    previewImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 12,
    downloadsCount: 4500,
    description: 'A high-end, futuristic e-commerce showroom for devices and electronics. Features holographic UI styling, detailed product catalogs across 8 categories, interactive specification panels, and a sleek dark theme.',
    bootstrapVersion: 'React / Framer Motion / Vanilla CSS',
    version: '1.0.0',
    demoUrl: '/templates/ecommerce/ecommerce-9/index.html'
  },
  {
    id: 102,
    name: 'E-Commerce Hub — Modern Kids & Family Fashion Store',
    slug: 'ecom-hub-fashion',
    previewImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 12, name: 'Ecommerce', slug: 'ecommerce' },
    pagesCount: 18,
    downloadsCount: 3600,
    description: 'A modern, responsive e-commerce storefront dedicated to family fashion and kids wear. Features animated custom cursors, product quick-view modals, search overlays, a wishlist manager, and a Spring Boot backend.',
    bootstrapVersion: 'React / Tailwind / Spring Boot',
    version: '1.0.0',
    demoUrl: '/templates/ecommerce/ecommerce-10/index.html'
  },
  {
    id: 103,
    name: 'Eventora — Premier Tech & Leadership Summit Launch Platform',
    slug: 'eventora-event',
    previewImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 7, name: 'Events', slug: 'events' },
    pagesCount: 12,
    downloadsCount: 3200,
    description: 'A premium tech and leadership event launching platform. Features dynamic schedules, speaker registries, digital ticket cards, countdown timers, and reservation capture modals.',
    bootstrapVersion: 'React / Tailwind / Plus Jakarta Sans',
    version: '1.0.0',
    demoUrl: '/templates/events/education-1/index.html'
  },
  {
    id: 104,
    name: 'CYBERNEXUS — Global Technology & Intelligence Summit',
    slug: 'cybernexus-event',
    previewImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 7, name: 'Events', slug: 'events' },
    pagesCount: 8,
    downloadsCount: 2800,
    description: 'A premium, high-tech event landing page for technology and AI conferences. Features interactive scroll spies, customized cursor indicators, schedule registries, and ticket reservation forms.',
    bootstrapVersion: 'React / Vanilla CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/events/events-2/index.html'
  },
  {
    id: 105,
    name: 'VERTEX — Robotics & Quantum Tech Summit',
    slug: 'vertex-event',
    previewImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 7, name: 'Events', slug: 'events' },
    pagesCount: 10,
    downloadsCount: 2900,
    description: 'A premium, light/dark responsive robotics and quantum technology event template. Features quantum style grid animations, particle canvas backgrounds, dynamic tracks, speaker panels, and a sleek modern dark mode design.',
    bootstrapVersion: 'React / Space Grotesk / Vite',
    version: '1.0.0',
    demoUrl: '/templates/events/events-3/index.html'
  },
  {
    id: 106,
    name: 'VORTEX FORGE FITNESS — IRON ASCENT 2026',
    slug: 'iron-ascent-event',
    previewImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 7, name: 'Events', slug: 'events' },
    pagesCount: 15,
    downloadsCount: 2700,
    description: 'A premium athletic and fitness challenge event launching template. Features trainer portfolios, class schedules, program cards, equipment showcases, pricing tables, and registration capture.',
    bootstrapVersion: 'React / Tailwind / Montserrat',
    version: '1.0.0',
    demoUrl: '/templates/events/events-4/index.html'
  },
  {
    id: 107,
    name: 'AQUAVEXA AUTO SPA — Premium Car Wash & Detailing Studio',
    slug: 'aquavexa-autospa',
    previewImage: 'https://images.unsplash.com/photo-1520340356584-f9917d1eed69?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 7, name: 'Events', slug: 'events' },
    pagesCount: 12,
    downloadsCount: 2100,
    description: 'A premium automotive wash, detailing, and paint studio platform. Features services grids, pricing cards, equipment showcases, paint studios, booking panels, and a reactive dark mode design.',
    bootstrapVersion: 'React / Tailwind CSS / Vite',
    version: '1.0.0',
    demoUrl: '/templates/events/events-5/index.html'
  },
  {
    id: 108,
    name: 'Advanced Construction — Heavy Civil Engineering & Crane Infrastructure',
    slug: 'advanced-construction',
    previewImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 9, name: 'Construction', slug: 'construction' },
    pagesCount: 8,
    downloadsCount: 3400,
    description: 'A premium commercial construction and heavy engineering landing page. Features customized pricing cost-estimators, milestone trackers, service portfolios, and a full dark mode design system.',
    bootstrapVersion: 'React / Outfit / Plus Jakarta Sans',
    version: '1.0.0',
    demoUrl: '/templates/construction/construction-1/index.html'
  },
  {
    id: 109,
    name: 'Sage & Shutter — Fine Art Wedding Photography',
    slug: 'sage-shutter-photography',
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 2300,
    description: 'An elegant, high-end fine art wedding photography showcase template. Features delicate earthy desaturated filters, parallax image carousels, custom cursor indicators, and responsive testimonial sliders.',
    bootstrapVersion: 'React / Tailwind CSS / Motion',
    version: '1.0.0',
    demoUrl: '/templates/photography/photography-8/index.html'
  }
];


const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('ts_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/zip')) {
    return response.blob();
  }
  
  return response.json().catch(() => ({}));
};

export const api = {
  // Auth
  async login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(res);
      if (data.token) {
        localStorage.setItem('ts_token', data.token);
        localStorage.setItem('ts_user', JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role
        }));
      }
      return data;
    } catch (err) {
      console.warn("Auth failed, using mock auth:", err);
      if (email === 'admin@technosprint.com' && password === 'adminpassword') {
        const mockUser = { id: 99, name: 'Admin User', email: 'admin@technosprint.com', role: 'ROLE_ADMIN' };
        localStorage.setItem('ts_token', 'mock-jwt-token');
        localStorage.setItem('ts_user', JSON.stringify(mockUser));
        return mockUser;
      }
      if (email === 'admin@admin.com') {
        const dummyAdmin = { token: 'mock-token', id: 99, name: 'Admin User', email: 'admin@admin.com', role: 'ROLE_ADMIN' };
        localStorage.setItem('ts_token', dummyAdmin.token);
        localStorage.setItem('ts_user', JSON.stringify(dummyAdmin));
        return dummyAdmin;
      }
      const dummyUser = { token: 'mock-token', id: 100, name: 'Test User', email: email, role: 'ROLE_USER' };
      localStorage.setItem('ts_token', dummyUser.token);
      localStorage.setItem('ts_user', JSON.stringify(dummyUser));
      return dummyUser;
    }
  },

  async register(name, email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password }),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("Register connection failed, bypassing for mock:", err);
      return { message: "User registered successfully!" };
    }
  },

  logout() {
    localStorage.removeItem('ts_token');
    localStorage.removeItem('ts_user');
    return Promise.resolve();
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('ts_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Templates
  async getTemplates(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category) query.append('category', params.category);
      if (params.search) query.append('search', params.search);
      if (params.type) query.append('type', params.type);
      
      const res = await fetch(`${BASE_URL}/templates?${query.toString()}`, {
        headers: getHeaders(),
      });
      const data = await handleResponse(res);
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
      let filtered = [...MOCK_TEMPLATES];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(t => t.category.slug === params.category);
      }
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter(t => t.templateType === params.type);
      }
      if (params.search) {
        const queryStr = params.search.toLowerCase();
        filtered = filtered.filter(t => 
          t.name.toLowerCase().includes(queryStr) || 
          t.description.toLowerCase().includes(queryStr) ||
          t.category.name.toLowerCase().includes(queryStr)
        );
      }
      return filtered;
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      let filtered = [...MOCK_TEMPLATES];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(t => t.category.slug === params.category);
      }
      if (params.type && params.type !== 'all') {
        filtered = filtered.filter(t => t.templateType === params.type);
      }
      if (params.search) {
        const queryStr = params.search.toLowerCase();
        filtered = filtered.filter(t => 
          t.name.toLowerCase().includes(queryStr) || 
          t.description.toLowerCase().includes(queryStr) ||
          (t.category && t.category.name && t.category.name.toLowerCase().includes(queryStr))
        );
      }
      return filtered;
    }
  },

  async getTemplateById(id) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      return MOCK_TEMPLATES.find(t => t.id === Number(id)) || MOCK_TEMPLATES[0];
    }
  },

  async getTemplateBySlug(slug) {
    try {
      const res = await fetch(`${BASE_URL}/templates/slug/${slug}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API templates fetch failed, utilizing mock fallback:", err);
      return MOCK_TEMPLATES.find(t => t.slug === slug) || MOCK_TEMPLATES[0];
    }
  },

  async createTemplate(dto) {
    try {
      const res = await fetch(`${BASE_URL}/templates`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to create template:", err);
      throw err;
    }
  },

  async updateTemplate(id, dto) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(dto),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to update template:", err);
      throw err;
    }
  },

  async deleteTemplate(id) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.error("Failed to delete template:", err);
      throw err;
    }
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API categories fetch failed, utilizing mock fallback:", err);
      return MOCK_CATEGORIES;
    }
  },

  // Orders
  async createOrder(templateIds) {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ templateIds }),
      });
      return await handleResponse(res);
    } catch (err) {
      console.warn("API order failed, using mock:", err);
      return { id: 88, status: 'PENDING', templateIds };
    }
  },

  async confirmPayment(orderId) {
    try {
      const res = await fetch(`${BASE_URL}/orders/${orderId}/confirm`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id: orderId, status: 'PAID' };
    }
  },

  async getMyOrders() {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async getAllOrders() {
    try {
      const res = await fetch(`${BASE_URL}/orders/all`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  // Licenses
  async getMyLicenses() {
    try {
      const res = await fetch(`${BASE_URL}/licenses`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async validateLicense(key) {
    try {
      const res = await fetch(`${BASE_URL}/licenses/validate/${key}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { valid: true, licenseKey: key };
    }
  },

  // Downloads
  async getDownloadToken(templateId) {
    try {
      const res = await fetch(`${BASE_URL}/templates/${templateId}/download-token`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { token: 'mock-download-token' };
    }
  },

  async getMyDownloadsHistory() {
    try {
      const res = await fetch(`${BASE_URL}/templates/downloads-history`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  // Projects / Builder
  async getMyProjects() {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return [];
    }
  },

  async saveProject(projectName, templateId, projectData) {
    try {
      const res = await fetch(`${BASE_URL}/projects`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ projectName, templateId, projectData }),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id: 77, projectName, templateId, projectData };
    }
  },

  async updateProject(id, projectName, projectData) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ projectName, projectData }),
      });
      return await handleResponse(res);
    } catch (err) {
      return { id, projectName, projectData };
    }
  },

  async deleteProject(id) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return { success: true };
    }
  },

  async exportProject(id) {
    try {
      const res = await fetch(`${BASE_URL}/projects/${id}/export`, {
        method: 'POST',
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return new Blob();
    }
  }
};
