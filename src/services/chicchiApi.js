import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const chicchiApi = {
  getAllChicchi: () => axios.get(`${API_BASE}/chiccos`),
  getChicco: (id) => axios.get(`${API_BASE}/chiccos/${id}`),
  searchChicchi: (search) => axios.get(`${API_BASE}/chiccos?search=${search}`),
  filterByCategory: (category) => axios.get(`${API_BASE}/chiccos?category=${category}`)
};