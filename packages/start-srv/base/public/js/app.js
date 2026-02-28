/* ============================================================
   Universo Platformo — app.js
   Client-side application logic using Total.js jComponent
   patterns: SET/GET for state, ROUTE for SPA navigation.

   Security architecture:
     - NO Supabase credentials in the browser
     - All auth operations go through backend API (/api/auth/*)
     - Sessions managed via httpOnly cookies (set by the server)
     - The server handles all Supabase communication

   Dependencies (loaded from CDN in index.html):
     - jComponent (spa.min@20.js) — state management, routing

   No build step required. Served as a static file by Total.js.
   ============================================================ */

/* global SET, GET, ROUTE, REDIRECT, ON, SETTER */
'use strict';

// ── Password minimum length ──────────────────────────────────
// Must match the validation in packages/universo-utils/base/src/validation.ts
var PASSWORD_MIN_LENGTH = 8;

// ── Main application namespace ───────────────────────────────
// All methods are attached to window.UP to avoid polluting the
// global namespace while remaining accessible from inline HTML.
var UP = (function () {

// ── Backend API helper ─────────────────────────────────────
// All requests to /api/auth/* include credentials:'same-origin'
// so the browser automatically sends the httpOnly session cookies.

function apiRequest(method, path, body) {
var opts = {
method:      method,
credentials: 'same-origin',   // sends httpOnly cookies automatically
headers:     { 'Content-Type': 'application/json' }
};
if (body) opts.body = JSON.stringify(body);

return fetch(path, opts).then(function (res) {
return res.json().then(function (data) {
data._httpStatus = res.status;
return data;
}).catch(function () {
// Server returned non-JSON (e.g. 502, 504 from proxy)
return { success: false, _httpStatus: res.status, error: { code: 'PARSE_ERROR', message: 'Unexpected server response' } };
});
});
}

// ── State helpers (jComponent SET/GET) ────────────────────
// jComponent's SET() stores values at dot-notation paths and
// notifies any bound ui-components. GET() reads them back.

function setState(path, value) {
SET('app.' + path, value);
}

function getState(path) {
return GET('app.' + path);
}

// ── DOM helpers ────────────────────────────────────────────
function el(id) { return document.getElementById(id); }

function show(id) {
var e = el(id);
if (e) { e.classList.remove('hidden'); }
}

function hide(id) {
var e = el(id);
if (e) { e.classList.add('hidden'); }
}

function showPage(pageId) {
// Remove 'visible' from all pages
var pages = document.querySelectorAll('.page');
pages.forEach(function (p) { p.classList.remove('visible'); });

var page = el(pageId);
if (page) { page.classList.add('visible'); }
}

function showError(id, msg) {
var e = el(id);
if (!e) return;
e.textContent = msg;
e.classList.remove('hidden');
}

function clearError(id) {
var e = el(id);
if (!e) return;
e.textContent = '';
e.classList.add('hidden');
}

// ── Loading screen ─────────────────────────────────────────
function showLoadingScreen() {
show('loading-screen');
hide('page-guest');
hide('page-auth');
}

function hideLoadingScreen() {
hide('loading-screen');
}

// ── Page routing ───────────────────────────────────────────
// jComponent's client-side ROUTE() handles URL changes.

function setupRoutes() {
// Root route — handled by session check on init
ROUTE('/', function () {
var user = getState('user');
if (user) {
showAuthPage(user);
} else {
showGuestPage();
}
});

// Catch-all — redirect to root if route not found
ON('404', function () {
REDIRECT('/');
});
}

// ── Guest page ─────────────────────────────────────────────
function showGuestPage() {
hideLoadingScreen();
showPage('page-guest');
// Store state via jComponent
setState('currentPage', 'guest');
}

function showAuthSection() {
show('auth-section');
// Smooth-scroll to auth card
setTimeout(function () {
var section = el('auth-section');
if (section) {
section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}, 50);
}

function hideAuthSection() {
hide('auth-section');
window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToFeatures() {
var section = el('features-section');
if (section) {
section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
}

// ── Auth tab switcher ──────────────────────────────────────
function switchTab(tab) {
var tabLogin  = el('tab-login');
var tabReg    = el('tab-register');
var formLogin = el('login-form');
var formReg   = el('register-form');

clearError('login-error');
clearError('reg-error');
clearError('reg-success');

if (tab === 'login') {
tabLogin  && tabLogin.classList.add('active');
tabReg    && tabReg.classList.remove('active');
formLogin && formLogin.classList.remove('hidden');
formReg   && formReg.classList.add('hidden');
el('auth-title').textContent    = 'Welcome Back';
el('auth-subtitle').textContent = 'Sign in to your account';
} else {
tabLogin  && tabLogin.classList.remove('active');
tabReg    && tabReg.classList.add('active');
formLogin && formLogin.classList.add('hidden');
formReg   && formReg.classList.remove('hidden');
el('auth-title').textContent    = 'Create Account';
el('auth-subtitle').textContent = 'Join Universo Platformo for free';
}
}

// ── Login ──────────────────────────────────────────────────
// Sends credentials to the BACKEND only — never to Supabase directly.
function handleLogin(event) {
event.preventDefault();

var email    = el('login-email').value.trim();
var password = el('login-password').value;
var btn      = el('login-btn');

clearError('login-error');
btn.disabled    = true;
btn.textContent = 'Signing in\u2026';
SETTER('loading/show');

apiRequest('POST', '/api/auth/login', { email: email, password: password })
.then(function (result) {
SETTER('loading/hide');
btn.disabled    = false;
btn.textContent = 'Sign In';

if (!result.success) {
showError('login-error', (result.error && result.error.message) || 'Login failed. Please try again.');
return;
}

showAuthPage(result.data.user);
})
.catch(function (err) {
SETTER('loading/hide');
btn.disabled    = false;
btn.textContent = 'Sign In';
showError('login-error', err.message || 'Login failed. Please try again.');
});
}

// ── Register ───────────────────────────────────────────────
// Sends registration data to the BACKEND only.
function handleRegister(event) {
event.preventDefault();

var name     = (el('reg-name') && el('reg-name').value.trim()) || '';
var email    = el('reg-email').value.trim();
var password = el('reg-password').value;
var btn      = el('reg-btn');

clearError('reg-error');
hide('reg-success');

if (password.length < PASSWORD_MIN_LENGTH) {
showError('reg-error', 'Password must be at least ' + PASSWORD_MIN_LENGTH + ' characters.');
return;
}

btn.disabled    = true;
btn.textContent = 'Creating account\u2026';
SETTER('loading/show');

var body = { email: email, password: password };
if (name) body.display_name = name;

apiRequest('POST', '/api/auth/register', body)
.then(function (result) {
SETTER('loading/hide');
btn.disabled    = false;
btn.textContent = 'Create Account';

if (!result.success) {
showError('reg-error', (result.error && result.error.message) || 'Registration failed. Please try again.');
return;
}

if (result.data.requires_confirmation) {
// Email confirmation required — backend returned user but no session
var successEl = el('reg-success');
if (successEl) {
successEl.textContent = 'Account created! Please check your email to confirm.';
successEl.classList.remove('hidden');
}
return;
}

showAuthPage(result.data.user);
})
.catch(function (err) {
SETTER('loading/hide');
btn.disabled    = false;
btn.textContent = 'Create Account';
showError('reg-error', err.message || 'Registration failed. Please try again.');
});
}

// ── Logout ─────────────────────────────────────────────────
// Clears httpOnly cookies server-side.
function handleLogout() {
SETTER('loading/show');

apiRequest('POST', '/api/auth/logout')
.then(function () {
SETTER('loading/hide');
setState('user', null);
showGuestPage();
})
.catch(function () {
SETTER('loading/hide');
setState('user', null);
showGuestPage();
});
}

// ── Authenticated page ─────────────────────────────────────
function showAuthPage(user) {
hideLoadingScreen();
showPage('page-auth');
setState('currentPage', 'auth');
setState('user', user);

// Populate user info in the UI
var email = user.email || '';
el('appbar-email') && (el('appbar-email').textContent = email);

// user.display_name is flattened by the backend mapUser() from user_metadata
var displayName = user.display_name
|| (email && email.indexOf('@') > 0 ? email.split('@')[0] : 'User');
el('dashboard-name') && (el('dashboard-name').textContent = displayName);

// Check if onboarding was already completed (stored in localStorage)
var onboardingDone = localStorage.getItem('up_onboarding_' + user.id) === 'done';
if (onboardingDone) {
showDashboard();
} else {
showOnboarding();
}
}

// ── Onboarding wizard ──────────────────────────────────────
function showOnboarding() {
show('onboarding-section');
hide('dashboard-section');
onboardingNext(1);
}

function onboardingNext(step) {
// Hide all steps
[1, 2, 3].forEach(function (n) {
var stepEl = el('onboarding-step-' + n);
var indEl  = el('step-indicator-' + n);
if (stepEl) { stepEl.classList.remove('active'); }
if (indEl)  { indEl.classList.remove('active', 'done'); }
});

// Activate requested step
var current = el('onboarding-step-' + step);
if (current) { current.classList.add('active'); }

var indicator = el('step-indicator-' + step);
if (indicator) { indicator.classList.add('active'); }

// Mark previous steps as done
for (var i = 1; i < step; i++) {
var prev = el('step-indicator-' + i);
if (prev) { prev.classList.add('done'); }
}
}

function onboardingComplete() {
onboardingNext(3);
}

function showDashboard() {
// Mark onboarding complete for this user
var user = getState('user');
if (user) {
localStorage.setItem('up_onboarding_' + user.id, 'done');
}

hide('onboarding-section');
show('dashboard-section');
}

// ── Initialization ─────────────────────────────────────────
// Checks for an existing server-side session on page load.
// Validates the httpOnly cookie via the backend — not browser JS.
function init() {
showLoadingScreen();
setupRoutes();

// Ask the backend if there is a valid session cookie
apiRequest('GET', '/api/auth/session')
.then(function (result) {
if (result.success && result.data && result.data.user) {
showAuthPage(result.data.user);
} else {
showGuestPage();
}
})
.catch(function () {
showGuestPage();
});
}

// ── Public API ─────────────────────────────────────────────
return {
init:               init,
showAuthSection:    showAuthSection,
hideAuthSection:    hideAuthSection,
scrollToFeatures:   scrollToFeatures,
switchTab:          switchTab,
handleLogin:        handleLogin,
handleRegister:     handleRegister,
handleLogout:       handleLogout,
onboardingNext:     onboardingNext,
onboardingComplete: onboardingComplete,
showDashboard:      showDashboard,
};

}());

// ── Boot ─────────────────────────────────────────────────────
// jComponent fires 'ready' once the DOM and all ui-components
// are initialized. This is the correct hook to start the app.
ON('ready', function () {
UP.init();
});
