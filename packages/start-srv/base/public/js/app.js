/* ============================================================
   Universo Platformo — app.js
   Client-side application logic using Total.js jComponent
   patterns: SET/GET for state, ROUTE for SPA navigation.

   Dependencies (loaded from CDN in index.html):
     - jComponent (spa.min@20.js) — state management, routing
     - Supabase JS (@supabase/supabase-js@2) — authentication

   No build step required. Served as a static file by Total.js.
   ============================================================ */

/* global supabase, SET, GET, ROUTE, REDIRECT, ON, SETTER */
'use strict';

// ── Password minimum length ──────────────────────────────────
// Must match the validation in packages/universo-utils/base/src/validation.ts
var PASSWORD_MIN_LENGTH = 8;

// ── Main application namespace ───────────────────────────────
// All methods are attached to window.UP to avoid polluting the
// global namespace while remaining accessible from inline HTML.
var UP = (function () {

	// ── Supabase client ────────────────────────────────────────
	var _supabase = null;

	/**
	 * Initialize the Supabase client using config injected by
	 * the Total.js server into window.APP at render time.
	 */
	function initSupabase() {
		var url = (window.APP && window.APP.supabaseUrl) || '';
		var key = (window.APP && window.APP.supabaseAnonKey) || '';

		if (!url || !key) {
			console.warn('[UP] Supabase config missing. Auth will not work.');
			return;
		}

		// supabase is the global from the Supabase CDN UMD build
		_supabase = supabase.createClient(url, key);
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
		// Root route — handled by auth check on init
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
		var tabLogin = el('tab-login');
		var tabReg   = el('tab-register');
		var formLogin = el('login-form');
		var formReg   = el('register-form');

		clearError('login-error');
		clearError('reg-error');
		clearError('reg-success');

		if (tab === 'login') {
			tabLogin && tabLogin.classList.add('active');
			tabReg   && tabReg.classList.remove('active');
			formLogin && formLogin.classList.remove('hidden');
			formReg   && formReg.classList.add('hidden');
			el('auth-title').textContent = 'Welcome Back';
			el('auth-subtitle').textContent = 'Sign in to your account';
		} else {
			tabLogin && tabLogin.classList.remove('active');
			tabReg   && tabReg.classList.add('active');
			formLogin && formLogin.classList.add('hidden');
			formReg   && formReg.classList.remove('hidden');
			el('auth-title').textContent = 'Create Account';
			el('auth-subtitle').textContent = 'Join Universo Platformo for free';
		}
	}

	// ── Login ──────────────────────────────────────────────────
	function handleLogin(event) {
		event.preventDefault();
		if (!_supabase) {
			showError('login-error', 'Auth service unavailable. Check server config.');
			return;
		}

		var email = el('login-email').value.trim();
		var password = el('login-password').value;
		var btn = el('login-btn');

		clearError('login-error');
		btn.disabled = true;
		btn.textContent = 'Signing in…';

		// Use jComponent loading indicator while request is in flight
		SETTER('loading/show');

		_supabase.auth.signInWithPassword({ email: email, password: password })
			.then(function (result) {
				SETTER('loading/hide');
				btn.disabled = false;
				btn.textContent = 'Sign In';

				if (result.error) {
					showError('login-error', result.error.message);
					return;
				}

				// Auth state change listener will call showAuthPage()
			})
			.catch(function (err) {
				SETTER('loading/hide');
				btn.disabled = false;
				btn.textContent = 'Sign In';
				showError('login-error', err.message || 'Login failed. Please try again.');
			});
	}

	// ── Register ───────────────────────────────────────────────
	function handleRegister(event) {
		event.preventDefault();
		if (!_supabase) {
			showError('reg-error', 'Auth service unavailable. Check server config.');
			return;
		}

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

		btn.disabled = true;
		btn.textContent = 'Creating account…';
		SETTER('loading/show');

		var options = {};
		if (name) { options.data = { display_name: name }; }

		_supabase.auth.signUp({ email: email, password: password, options: options })
			.then(function (result) {
				SETTER('loading/hide');
				btn.disabled = false;
				btn.textContent = 'Create Account';

				if (result.error) {
					showError('reg-error', result.error.message);
					return;
				}

				if (!result.data.session) {
					// Email confirmation required
					var successEl = el('reg-success');
					if (successEl) {
						successEl.textContent = 'Account created! Please check your email to confirm.';
						successEl.classList.remove('hidden');
					}
					return;
				}

				// Signed in immediately (auth state change listener handles page switch)
			})
			.catch(function (err) {
				SETTER('loading/hide');
				btn.disabled = false;
				btn.textContent = 'Create Account';
				showError('reg-error', err.message || 'Registration failed. Please try again.');
			});
	}

	// ── Logout ─────────────────────────────────────────────────
	function handleLogout() {
		if (!_supabase) { return; }
		SETTER('loading/show');
		_supabase.auth.signOut().then(function () {
			SETTER('loading/hide');
			// Auth state change listener will call showGuestPage()
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

		var displayName = (user.user_metadata && user.user_metadata.display_name)
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

	// ── Initialisation ─────────────────────────────────────────
	function init() {
		showLoadingScreen();
		initSupabase();
		setupRoutes();

		if (!_supabase) {
			// No Supabase config — show guest page immediately
			showGuestPage();
			return;
		}

		// Get existing session (restores state after page reload)
		_supabase.auth.getSession().then(function (result) {
			if (result.data && result.data.session) {
				showAuthPage(result.data.session.user);
			} else {
				showGuestPage();
			}
		}).catch(function () {
			showGuestPage();
		});

		// Listen for auth state changes (login / logout events)
		_supabase.auth.onAuthStateChange(function (event, session) {
			if (session && session.user) {
				showAuthPage(session.user);
			} else {
				setState('user', null);
				showGuestPage();
			}
		});
	}

	// ── Public API ─────────────────────────────────────────────
	return {
		init:              init,
		showAuthSection:   showAuthSection,
		hideAuthSection:   hideAuthSection,
		scrollToFeatures:  scrollToFeatures,
		switchTab:         switchTab,
		handleLogin:       handleLogin,
		handleRegister:    handleRegister,
		handleLogout:      handleLogout,
		onboardingNext:    onboardingNext,
		onboardingComplete: onboardingComplete,
		showDashboard:     showDashboard,
	};

}());

// ── Boot ─────────────────────────────────────────────────────
// jComponent fires 'ready' once the DOM and all ui-components
// are initialized. This is the correct hook to start the app.
ON('ready', function () {
	UP.init();
});
