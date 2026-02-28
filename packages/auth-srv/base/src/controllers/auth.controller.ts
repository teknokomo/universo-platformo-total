// Total.js v5 auth controller
// This file defines routes and actions for authentication

import { AuthService } from '../services/AuthService';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';
const authService = new AuthService(supabaseUrl, supabaseAnonKey);

// These will be registered when Total.js loads this controller
export function registerRoutes() {
  // POST /auth/login
  ROUTE('POST /auth/login', async function (this: TotaljsController) {
    const body = this.body as { email: string; password: string };

    try {
      const session = await authService.login({
        email: body.email,
        password: body.password,
      });
      this.json({ success: true, data: session });
    } catch (_error) {
      this.status(401).json({
        success: false,
        error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid email or password' },
      });
    }
  });

  // POST /auth/register
  ROUTE('POST /auth/register', async function (this: TotaljsController) {
    const body = this.body as { email: string; password: string; display_name?: string };

    try {
      const session = await authService.register({
        email: body.email,
        password: body.password,
        display_name: body.display_name,
      });
      this.json({ success: true, data: session });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      this.status(400).json({
        success: false,
        error: { code: errorMessage, message: 'Registration failed' },
      });
    }
  });

  // POST /auth/logout
  ROUTE('POST /auth/logout', async function (this: TotaljsController) {
    const authHeader = this.headers['authorization'];
    const token = authHeader?.replace('Bearer ', '') ?? '';

    await authService.logout(token);
    this.json({ success: true });
  });

  // GET /auth/session
  ROUTE('GET /auth/session', async function (this: TotaljsController) {
    const authHeader = this.headers['authorization'];
    const token = authHeader?.replace('Bearer ', '') ?? '';

    if (!token) {
      this.status(401).json({
        success: false,
        error: { code: 'AUTH_UNAUTHORIZED', message: 'No token provided' },
      });
      return;
    }

    const session = await authService.getSession(token);

    if (!session) {
      this.status(401).json({
        success: false,
        error: { code: 'AUTH_TOKEN_INVALID', message: 'Invalid token' },
      });
      return;
    }

    this.json({ success: true, data: session });
  });

  // POST /auth/refresh
  ROUTE('POST /auth/refresh', async function (this: TotaljsController) {
    const body = this.body as { refresh_token: string };

    try {
      const session = await authService.refreshSession(body.refresh_token);
      this.json({ success: true, data: session });
    } catch (_error) {
      this.status(401).json({
        success: false,
        error: { code: 'AUTH_TOKEN_EXPIRED', message: 'Refresh token expired' },
      });
    }
  });
}
