import axios, { AxiosInstance } from 'axios';
import { formatError } from '@/utils/helpers';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError = formatError(error);
    return Promise.reject(formattedError);
  }
);

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (credentials: { name: string; email: string; password: string }) =>
    api.post('/auth/register', credentials),
  logout: () => api.post('/auth/logout'),
};

export const dataApi = {
  getData: (params: { startDate: string; endDate: string; dataType: string }) =>
    api.get('/data', { params }),
  updateData: (data: any) => api.put('/data', data),
  deleteData: (id: string) => api.delete(`/data/${id}`),
};

export const userApi = {
  getUser: () => api.get('/user'),
  updateUser: (userData: any) => api.put('/user', userData),
};

export const settingsApi = {
  getSettings: () => api.get('/settings'),
  updateSettings: (settings: any) => api.put('/settings', settings),
};

export default api;