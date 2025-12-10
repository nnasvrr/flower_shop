import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const flowerAPI = {
  // Получить все товары с параметрами
  getAll: (params = {}) => api.get('/flowers/', { params }),
  
  // Получить один товар
  getById: (id) => api.get(`/flowers/${id}/`),
  
  // Получить категории
  getCategories: () => api.get('/categories/'),
  
  // Фильтрация
  filterByCategory: (categoryId) => api.get(`/flowers/?category=${categoryId}`),
  
  // Поиск
  search: (query) => api.get(`/flowers/?search=${query}`),
};

export default api;