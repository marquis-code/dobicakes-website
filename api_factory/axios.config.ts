import axios, { type AxiosResponse } from "axios";

// Helper function to redirect to login page
const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    if (!window.location.pathname.includes('/auth/login')) {
      window.location.href = '/auth/login';
    }
  }
};

const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

GATEWAY_ENDPOINT.interceptors.request.use((config: any) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

 GATEWAY_ENDPOINT.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err: any) => {
    if (err.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(err);
  }
);

export type CustomAxiosResponse = AxiosResponse;
