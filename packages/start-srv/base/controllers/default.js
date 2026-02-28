// ===================================================
// Universo Platformo | start-srv
// Default controller — SPA view + Auth API routes
//
// Security architecture:
//   - ALL Supabase credentials stay on the server only
//   - Browser never receives SUPABASE_URL or SUPABASE_ANON_KEY
//   - Auth state is managed via httpOnly session cookies
//   - Frontend communicates with Supabase ONLY through /api/auth/* routes
// ===================================================

'use strict';

// ── Server-side Supabase client ───────────────────────────────────────────────
// Initialized once. Credentials come from environment variables only.
// They are NEVER sent to the browser.

var _supabaseModule = null;
var _supabaseClient = null;

function getSupabase() {
if (_supabaseClient) return _supabaseClient;

var url = process.env.SUPABASE_URL || '';
var key = process.env.SUPABASE_ANON_KEY || '';

if (!url || !key) return null;

if (!_supabaseModule) {
_supabaseModule = require('@supabase/supabase-js');
}

_supabaseClient = _supabaseModule.createClient(url, key, {
auth: {
persistSession: false,   // server-side: no persistent session storage
autoRefreshToken: false  // tokens managed explicitly per request
}
});

return _supabaseClient;
}

// ── Cookie configuration ──────────────────────────────────────────────────────
// httpOnly: inaccessible to JavaScript — protected against XSS.
// SameSite=Strict: not sent on cross-site requests — protected against CSRF.
// Secure: only sent over HTTPS (enabled automatically in production).
// Cookie paths are scoped to /api/ to avoid sending tokens with static assets.

var COOKIE_ACCESS  = 'up_access';
var COOKIE_REFRESH = 'up_refresh';
var PAST_DATE      = new Date(0);   // epoch = far in the past, used to clear cookies

function cookieOpts(path) {
var opts = { httpOnly: true, samesite: 'Strict', path: path || '/api/' };
if (process.env.NODE_ENV === 'production') opts.secure = true;
return opts;
}

function setAuthCookies($, accessToken, refreshToken) {
// Scope to /api/ so tokens are NOT sent with static files (/, /css/, /js/)
$.cookie(COOKIE_ACCESS,  accessToken,  '+1 hour',  cookieOpts('/api/'));
$.cookie(COOKIE_REFRESH, refreshToken, '+30 days', cookieOpts('/api/auth'));
}

function clearAuthCookies($) {
$.cookie(COOKIE_ACCESS,  '', PAST_DATE, cookieOpts('/api/'));
$.cookie(COOKIE_REFRESH, '', PAST_DATE, cookieOpts('/api/auth'));
}

// ── User mapper ───────────────────────────────────────────────────────────────
// Returns only the non-sensitive user fields the frontend needs.
// Note: display_name is flattened from user_metadata so the frontend
// can access it directly as user.display_name without knowing Supabase internals.

function mapUser(user) {
return {
id:           user.id,
email:        user.email || '',
display_name: (user.user_metadata && user.user_metadata.display_name) || null
};
}

// ── Helper: send JSON with status code ───────────────────────────────────────
// In Total.js v5, $.response.status sets the HTTP status before $.json() sends it.

function jsonResponse($, statusCode, data) {
$.response.status = statusCode;
$.json(data);
}

// ── Auth API — POST /api/auth/login ───────────────────────────────────────────
ROUTE('POST /api/auth/login', async function ($) {
var sb = getSupabase();
if (!sb) {
jsonResponse($, 503, { success: false, error: { code: 'SERVICE_UNAVAILABLE', message: 'Auth service not configured' } });
return;
}

var body     = $.body || {};
var email    = (body.email    || '').trim();
var password = body.password  || '';

if (!email || !password) {
jsonResponse($, 400, { success: false, error: { code: 'INVALID_INPUT', message: 'Email and password are required' } });
return;
}

var result = await sb.auth.signInWithPassword({ email: email, password: password });

if (result.error || !result.data || !result.data.session) {
jsonResponse($, 401, { success: false, error: { code: 'AUTH_INVALID_CREDENTIALS', message: 'Invalid email or password' } });
return;
}

setAuthCookies($, result.data.session.access_token, result.data.session.refresh_token);
$.json({ success: true, data: { user: mapUser(result.data.user) } });
});

// ── Auth API — POST /api/auth/register ────────────────────────────────────────
ROUTE('POST /api/auth/register', async function ($) {
var sb = getSupabase();
if (!sb) {
jsonResponse($, 503, { success: false, error: { code: 'SERVICE_UNAVAILABLE', message: 'Auth service not configured' } });
return;
}

var body        = $.body || {};
var email       = (body.email        || '').trim();
var password    = body.password      || '';
var displayName = (body.display_name || '').trim();

if (!email || !password) {
jsonResponse($, 400, { success: false, error: { code: 'INVALID_INPUT', message: 'Email and password are required' } });
return;
}

if (password.length < 8) {
jsonResponse($, 400, { success: false, error: { code: 'INVALID_PASSWORD', message: 'Password must be at least 8 characters' } });
return;
}

var signUpOptions = displayName ? { data: { display_name: displayName } } : {};
var result = await sb.auth.signUp({ email: email, password: password, options: signUpOptions });

if (result.error || !result.data || !result.data.user) {
var code = 'REGISTRATION_FAILED';
var msg  = 'Registration failed';
if (result.error && result.error.message) {
if (result.error.message.toLowerCase().includes('already registered')) {
code = 'AUTH_EMAIL_TAKEN';
msg  = 'Email already in use';
} else {
msg = result.error.message;
}
}
jsonResponse($, 400, { success: false, error: { code: code, message: msg } });
return;
}

// Email confirmation required — no session yet
if (!result.data.session) {
$.json({ success: true, data: { user: mapUser(result.data.user), requires_confirmation: true } });
return;
}

setAuthCookies($, result.data.session.access_token, result.data.session.refresh_token);
$.json({ success: true, data: { user: mapUser(result.data.user), requires_confirmation: false } });
});

// ── Auth API — POST /api/auth/logout ──────────────────────────────────────────
ROUTE('POST /api/auth/logout', function ($) {
clearAuthCookies($);
$.json({ success: true });
});

// ── Auth API — GET /api/auth/session ──────────────────────────────────────────
ROUTE('GET /api/auth/session', async function ($) {
var sb = getSupabase();
if (!sb) {
jsonResponse($, 503, { success: false, error: { code: 'SERVICE_UNAVAILABLE', message: 'Auth service not configured' } });
return;
}

var token = $.cookie(COOKIE_ACCESS);
if (!token) {
jsonResponse($, 401, { success: false, error: { code: 'AUTH_UNAUTHORIZED', message: 'Not authenticated' } });
return;
}

var result = await sb.auth.getUser(token);

if (result.error || !result.data || !result.data.user) {
clearAuthCookies($);
jsonResponse($, 401, { success: false, error: { code: 'AUTH_TOKEN_INVALID', message: 'Session invalid or expired' } });
return;
}

$.json({ success: true, data: { user: mapUser(result.data.user) } });
});

// ── Auth API — POST /api/auth/refresh ─────────────────────────────────────────
ROUTE('POST /api/auth/refresh', async function ($) {
var sb = getSupabase();
if (!sb) {
jsonResponse($, 503, { success: false, error: { code: 'SERVICE_UNAVAILABLE', message: 'Auth service not configured' } });
return;
}

var refreshToken = $.cookie(COOKIE_REFRESH);
if (!refreshToken) {
jsonResponse($, 401, { success: false, error: { code: 'AUTH_UNAUTHORIZED', message: 'No refresh token' } });
return;
}

var result = await sb.auth.refreshSession({ refresh_token: refreshToken });

if (result.error || !result.data || !result.data.session) {
clearAuthCookies($);
jsonResponse($, 401, { success: false, error: { code: 'AUTH_TOKEN_EXPIRED', message: 'Session expired, please sign in again' } });
return;
}

setAuthCookies($, result.data.session.access_token, result.data.session.refresh_token);
$.json({ success: true, data: { user: mapUser(result.data.user) } });
});

// ── View routes ───────────────────────────────────────────────────────────────
// All GET routes serve the SPA shell. jComponent NAV handles client-side routing.

ROUTE('GET /', view_index);
ROUTE('GET /*', view_index);

function view_index($) {
// No sensitive config is passed to the view — credentials stay on the server.
$.view('index');
}
