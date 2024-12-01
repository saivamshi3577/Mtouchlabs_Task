import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mtouchlabs-task-1.onrender.com/', 
  // baseURL: 'https://localhost:7777/', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
