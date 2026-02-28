// ============================================================
// auth-frt — authApi
//
// All auth requests go to the backend (/api/auth/*).
// Credentials are managed via httpOnly cookies set by the server
// (never stored in localStorage or accessible to JavaScript).
//
// Uses native fetch with credentials: 'include' so the browser
// automatically attaches the httpOnly session cookies on every
// request, even across origins configured with a Vite proxy.
// ============================================================

import { ApiResponse } from '@universo-platformo/types';

// Response shapes returned by start-srv (/api/auth/* routes).
// Access tokens are NOT included — they live in httpOnly cookies.
export interface AuthUser {
id: string;
email: string;
display_name: string | null;
}

export interface LoginResponse {
user: AuthUser;
}

export interface RegisterResponse {
user: AuthUser;
requires_confirmation: boolean;
}

// Base URL for API requests.
// VITE_API_URL can be set to an absolute URL for cross-origin deployments
// (e.g. VITE_API_URL=http://localhost:4000 when running the Vite dev server
// without its built-in proxy). Defaults to '' (relative paths) which works
// in production (same-origin) and in dev with the Vite proxy configured.
const API_BASE: string = import.meta.env.VITE_API_URL ?? '';

async function apiFetch<T>(
method: string,
path: string,
body?: unknown
): Promise<ApiResponse<T>> {
const opts: RequestInit = {
method,
credentials: 'include',  // send/receive httpOnly cookies automatically
headers:     { 'Content-Type': 'application/json' }
};
if (body !== undefined) opts.body = JSON.stringify(body);

const res = await fetch(`${API_BASE}${path}`, opts);

let data: ApiResponse<T>;
try {
data = await res.json() as ApiResponse<T>;
} catch {
// Server returned non-JSON (e.g. 502, 504 gateway error)
data = {
success:      false,
error: {
code:       'PARSE_ERROR',
message:    'Unexpected server response',
statusCode: res.status,
timestamp:  new Date().toISOString()
}
};
}

// Normalize error shape: backend may only send { code, message } without
// statusCode / timestamp. Ensure the fields expected by ApiError are present.
if (!data.success && data.error) {
if (data.error.statusCode == null) {
data.error.statusCode = res.status;
}
if (!data.error.timestamp) {
data.error.timestamp = new Date().toISOString();
}
}

return data;
}

export const authApi = {
login: (body: { email: string; password: string }) =>
apiFetch<LoginResponse>('POST', '/api/auth/login', body),

register: (body: { email: string; password: string; display_name?: string }) =>
apiFetch<RegisterResponse>('POST', '/api/auth/register', body),

logout: () =>
apiFetch<void>('POST', '/api/auth/logout'),

getSession: () =>
apiFetch<LoginResponse>('GET', '/api/auth/session'),

refresh: () =>
apiFetch<LoginResponse>('POST', '/api/auth/refresh'),
};

export default authApi;
