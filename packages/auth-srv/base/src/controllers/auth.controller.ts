// Total.js v5 auth controller
// This file defines routes and actions for authentication.
//
// Note: In Total.js v5, HTTP status codes are set via:
//   this.response.status = code;
//   this.json(data);
// The chainable this.status(code).json() pattern does NOT exist in Total.js v5.

import { AuthService } from '../services/AuthService';

const SERVICE_NAME = 'auth-controller';
const supabaseUrl     = process.env.SUPABASE_URL     ?? '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? '';
const authService     = new AuthService(supabaseUrl, supabaseAnonKey);

function logError(context: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error(JSON.stringify({ service: SERVICE_NAME, context, error: message, ts: new Date().toISOString() }));
}

// These will be registered when Total.js loads this controller
export function registerRoutes() {
  // POST /auth/login
  ROUTE('POST /auth/login', async function (this: TotaljsController) {
    const body = this.body as { email: string; password: string };

    try {
      const session = await authService.login({
        email:    body.email,
        password: body.password,
      });
      this.json({ success: true, data: session });
    } catch (error) {
      logError('login', error);
      this.response.status = 401;
      this.json({
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
        email:        body.email,
        password:     body.password,
        display_name: body.display_name,
      });
      this.json({ success: true, data: session });
    } catch (error) {
      logError('register', error);
      const errorCode = error instanceof Error ? error.message : 'REGISTRATION_FAILED';
      this.response.status = 400;
      this.json({
        success: false,
        error: { code: errorCode, message: 'Registration failed' },
      });
    }
  });

  // POST /auth/logout
  ROUTE('POST /auth/logout', async function (this: TotaljsController) {
    const authHeader = this.headers['authorization'];
    const token      = authHeader?.replace('Bearer ', '') ?? '';

    try {
      await authService.logout(token);
    } catch (error) {
      logError('logout', error);
    }
    this.json({ success: true });
  });

  // GET /auth/session
  ROUTE('GET /auth/session', async function (this: TotaljsController) {
    const authHeader = this.headers['authorization'];
    const token      = authHeader?.replace('Bearer ', '') ?? '';

    if (!token) {
      this.response.status = 401;
      this.json({
        success: false,
        error: { code: 'AUTH_UNAUTHORIZED', message: 'No token provided' },
      });
      return;
    }

    const session = await authService.getSession(token);

    if (!session) {
      this.response.status = 401;
      this.json({
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
    } catch (error) {
      logError('refresh', error);
      this.response.status = 401;
      this.json({
        success: false,
        error: { code: 'AUTH_TOKEN_EXPIRED', message: 'Refresh token expired' },
      });
    }
  });
}
