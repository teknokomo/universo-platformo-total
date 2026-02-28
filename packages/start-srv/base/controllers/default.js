// ===================================================
// Universo Platformo | start-srv
// Default controller — routes for SPA + Auth API
// ===================================================

'use strict';

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build the config model injected into the HTML view.
 * Only the Supabase anon key is exposed to the browser — it is
 * intentionally public (Row Level Security enforces permissions).
 */
function buildViewModel() {
	return {
		supabaseUrl: CONF.supabaseUrl || process.env.SUPABASE_URL || '',
		supabaseAnonKey: CONF.supabaseAnonKey || process.env.SUPABASE_ANON_KEY || '',
	};
}

// ── View routes ──────────────────────────────────────────────────────────────

/**
 * Serve the SPA shell for the root URL.
 */
ROUTE('GET /', view_index);

/**
 * SPA fallback: every unmatched GET route serves the same HTML shell.
 * Client-side routing (jComponent NAV) handles URL changes without
 * a full page reload.
 */
ROUTE('GET /*', view_index);

function view_index($) {
	$.view('index', buildViewModel());
}
