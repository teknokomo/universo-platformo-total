// Auth route definitions for Total.js v5
export const AUTH_ROUTES = {
  LOGIN: 'POST /auth/login',
  REGISTER: 'POST /auth/register',
  LOGOUT: 'POST /auth/logout',
  SESSION: 'GET /auth/session',
  REFRESH: 'POST /auth/refresh',
} as const;
