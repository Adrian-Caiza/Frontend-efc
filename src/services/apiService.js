import axios from 'axios';

// Usamos la URL que generó tu compañero con loca.lt
const API_URL = 'https://epnmatriculas.loca.lt/api'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  login: async (credentials) => {
    // Apunta a /auth/login
    const response = await api.post('/auth/login', credentials);
    return response.data; 
  },

  getAll: async (endpointName) => {
    const response = await api.get(`/${endpointName}`);
    return response.data;
  },

  create: async (endpointName, data) => {
    const response = await api.post(`/${endpointName}`, data);
    return response.data;
  },

  // AJUSTE CLAVE: Tu compañero armó el PUT para que reciba el ID dentro del JSON, no en la URL
  update: async (endpointName, data) => {
    const response = await api.put(`/${endpointName}`, data);
    return response.data;
  },

  delete: async (endpointName, id) => {
    const response = await api.delete(`/${endpointName}/${id}`);
    return response.data;
  }
};

export default apiService;