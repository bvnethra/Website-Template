import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Submit contact form payload to Spring Boot backend API
 * @param {Object} formData { name, email, phone, subject, message }
 * @returns {Promise<Object>} Response data from server
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.request) {
      throw {
        success: false,
        message: 'Unable to reach backend server. Please check if Spring Boot is running on port 8080.',
      };
    } else {
      throw {
        success: false,
        message: error.message || 'An unexpected error occurred.',
      };
    }
  }
};

export default apiClient;
