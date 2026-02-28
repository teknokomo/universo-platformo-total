import axios from 'axios';
import { ApiResponse, AuthSession, AuthCredentials, RegisterCredentials } from '@universo-platformo/types';

const apiUrl =
  (typeof window !== 'undefined'
    ? (window as unknown as Record<string, string>).__VITE_API_URL__
    : undefined) ??
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : undefined) ??
  'http://localhost:4000';

const client = axios.create({
  baseURL: `${apiUrl}/auth`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Add auth token to requests
client.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: AuthCredentials): Promise<ApiResponse<AuthSession>> => {
    const { data } = await client.post<ApiResponse<AuthSession>>('/login', credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthSession>> => {
    const { data } = await client.post<ApiResponse<AuthSession>>('/register', credentials);
    return data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const { data } = await client.post<ApiResponse<void>>('/logout');
    return data;
  },

  getSession: async (): Promise<ApiResponse<AuthSession>> => {
    const { data } = await client.get<ApiResponse<AuthSession>>('/session');
    return data;
  },

  refresh: async (refreshToken: string): Promise<ApiResponse<AuthSession>> => {
    const { data } = await client.post<ApiResponse<AuthSession>>('/refresh', {
      refresh_token: refreshToken,
    });
    return data;
  },
};

export default authApi;
