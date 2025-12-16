import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const flowerAPI = {
  getAll: (params = {}) => api.get('/flowers/', { params }), 
  getById: (id) => api.get(`/flowers/${id}/`), 
  getCategories: () => api.get('/categories/'), 
  filterByCategory: (categoryId) => api.get(`/flowers/?category=${categoryId}`), 
  search: (query) => api.get(`/flowers/?search=${query}`),
};

export default api;