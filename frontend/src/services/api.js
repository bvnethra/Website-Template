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
    name: 'SnapFolio — Dark Minimalist Portfolio',
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
    name: 'Photo — Editorial Photography Studio',
    slug: 'photo-template',
    previewImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    templateType: 'FREE',
    price: 0,
    category: { id: 8, name: 'Photography', slug: 'photography' },
    pagesCount: 1,
    downloadsCount: 8400,
    description: 'A high-end, editorial landing page template for creative photography studios. Features Apple-style scroll-linked canvas camera aperture and lens flare animations, split-layout typography, and interactive showcase grids.',
    bootstrapVersion: 'HTML5 / Vanilla CSS',
    version: '1.0',
    demoUrl: '/templates/photography/photo-template/index.html'
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
      return await handleResponse(res);
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
          t.category.name.toLowerCase().includes(queryStr)
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
    const res = await fetch(`${BASE_URL}/templates`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },

  async updateTemplate(id, dto) {
    const res = await fetch(`${BASE_URL}/templates/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(dto),
    });
    return handleResponse(res);
  },

  async deleteTemplate(id) {
    const res = await fetch(`${BASE_URL}/templates/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
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
