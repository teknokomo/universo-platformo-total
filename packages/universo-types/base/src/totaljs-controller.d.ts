// Type definitions for Total.js v5 Controller
export interface Controller {
  user: AuthUser | null;
  session: Session | null;
  body: Record<string, unknown>;
  query: Record<string, string>;
  params: Record<string, string>;
  headers: Record<string, string>;
  ip: string;
  url: string;
  method: string;
  isAuthorized: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  display_name?: string;
  role?: string;
}

export interface Session {
  id: string;
  userId: string;
  access_token: string;
  expires_at?: number;
}
