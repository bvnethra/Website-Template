const BASE_URL = 'http://localhost:8080/api';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Admin', slug: 'admin' },
  { id: 2, name: 'Medical', slug: 'medical' },
  { id: 3, name: 'Block magazine', slug: 'block-magazine' },
  { id: 4, name: 'Comming soon', slug: 'comming-soon' },
  { id: 5, name: 'Travels', slug: 'travels' },
  { id: 6, name: 'Hotel', slug: 'hotel' }
];

const MOCK_TEMPLATES = [
  {
    id: 101,
    name: 'Aura Resort & Spa',
    slug: 'aura-resort',
    description: 'A high-end, full-featured luxury hotel website template featuring glassmorphism, responsive navigation, custom theme toggle, quick-booking bar, room selection, spa ritual guides, photo gallery lightbox, and auto-playing testimonials.',
    price: 29.00,
    templateType: 'PREMIUM',
    previewImage: '/hotel_template_preview.jpg',
    demoUrl: '/hotel-template',
    bootstrapVersion: 'Bootstrap 5',
    pagesCount: 1,
    downloadsCount: 1250,
    version: '1.0.0',
    createdAt: '2026-08-15T00:00:00Z',
    category: { id: 6, name: 'Hotel', slug: 'hotel' }
  },
  {
    id: 102,
    name: 'Techno Admin Dashboard',
    slug: 'techno-admin',
    description: 'Modern admin dashboard with light/dark theme, charts, widgets and custom components.',
    price: 19.00,
    templateType: 'PREMIUM',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    demoUrl: '#',
    bootstrapVersion: 'Bootstrap 5',
    pagesCount: 15,
    downloadsCount: 3400,
    version: '2.1.0',
    createdAt: '2026-08-10T00:00:00Z',
    category: { id: 1, name: 'Admin', slug: 'admin' }
  },
  {
    id: 103,
    name: 'Velo Medical Portal',
    slug: 'velo-medical',
    description: 'Clinic and doctor appointment template with scheduling, bio pages and patient intake forms.',
    price: 0.00,
    templateType: 'FREE',
    previewImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80',
    demoUrl: '#',
    bootstrapVersion: 'Bootstrap 5',
    pagesCount: 8,
    downloadsCount: 1800,
    version: '1.2.0',
    createdAt: '2026-08-05T00:00:00Z',
    category: { id: 2, name: 'Medical', slug: 'medical' }
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
      if (email === 'admin@technosprint.com' && password === 'adminpassword') {
        const mockUser = { id: 99, name: 'Admin User', email: 'admin@technosprint.com', role: 'ROLE_ADMIN' };
        localStorage.setItem('ts_token', 'mock-jwt-token');
        localStorage.setItem('ts_user', JSON.stringify(mockUser));
        return mockUser;
      }
      throw err;
    }
  },

  register(name, email, password) {
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    }).then(handleResponse);
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
      console.warn("Backend offline, returning mock templates:", err);
      let filtered = [...MOCK_TEMPLATES];
      if (params.category) {
        filtered = filtered.filter(t => t.category.slug === params.category);
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
      }
      if (params.type) {
        filtered = filtered.filter(t => t.templateType === params.type);
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
      const found = MOCK_TEMPLATES.find(t => t.id === Number(id));
      if (found) return found;
      throw err;
    }
  },

  async getTemplateBySlug(slug) {
    try {
      const res = await fetch(`${BASE_URL}/templates/slug/${slug}`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      const found = MOCK_TEMPLATES.find(t => t.slug === slug);
      if (found) return found;
      throw err;
    }
  },

  createTemplate(dto) {
    return fetch(`${BASE_URL}/templates`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(dto),
    }).then(handleResponse);
  },

  updateTemplate(id, dto) {
    return fetch(`${BASE_URL}/templates/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(dto),
    }).then(handleResponse);
  },

  deleteTemplate(id) {
    return fetch(`${BASE_URL}/templates/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(handleResponse);
  },

  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${BASE_URL}/categories`, {
        headers: getHeaders(),
      });
      return await handleResponse(res);
    } catch (err) {
      return MOCK_CATEGORIES;
    }
  },

  // Orders
  createOrder(templateIds) {
    return fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ templateIds }),
    }).then(handleResponse);
  },

  confirmPayment(orderId) {
    return fetch(`${BASE_URL}/orders/${orderId}/confirm`, {
      method: 'POST',
      headers: getHeaders(),
    }).then(handleResponse);
  },

  getMyOrders() {
    return fetch(`${BASE_URL}/orders`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  getAllOrders() {
    return fetch(`${BASE_URL}/orders/all`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  // Licenses
  getMyLicenses() {
    return fetch(`${BASE_URL}/licenses`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  validateLicense(key) {
    return fetch(`${BASE_URL}/licenses/validate/${key}`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  // Downloads
  getDownloadToken(templateId) {
    return fetch(`${BASE_URL}/templates/${templateId}/download-token`, {
      method: 'POST',
      headers: getHeaders(),
    }).then(handleResponse);
  },

  getMyDownloadsHistory() {
    return fetch(`${BASE_URL}/templates/downloads-history`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  // Projects / Builder
  getMyProjects() {
    return fetch(`${BASE_URL}/projects`, {
      headers: getHeaders(),
    }).then(handleResponse);
  },

  saveProject(projectName, templateId, projectData) {
    return fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ projectName, templateId, projectData }),
    }).then(handleResponse);
  },

  updateProject(id, projectName, projectData) {
    return fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ projectName, projectData }),
    }).then(handleResponse);
  },

  deleteProject(id) {
    return fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(handleResponse);
  },

  async exportProject(id) {
    const res = await fetch(`${BASE_URL}/projects/${id}/export`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });
    return handleResponse(res);
  }
};
