import axios, { type AxiosResponse } from "axios";

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
      // Only clear stale auth state — do NOT redirect.
      // Individual pages that require auth handle their own redirects.
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('auth-change'));
      }
    }
    return Promise.reject(err);
  }
);

export type CustomAxiosResponse = AxiosResponse;
