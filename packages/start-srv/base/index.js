// ===================================================
// Universo Platformo | start-srv
// Total.js v5 application entry point
//
// This package is the Total.js Platform native implementation
// of the start experience. It serves HTML views using the
// jComponent UI library (Total.js's own frontend library)
// and handles authentication via the Supabase client loaded
// from CDN — with NO React, NO Vite, NO MUI.
//
// Technology stack (100% Total.js Platform):
//   Backend : Total.js v5 (Node.js)
//   Frontend: jComponent (cdn.componentator.com)
//   Auth    : Supabase JS (CDN, anon key only)
//   Styling : Plain CSS (public/css/app.css)
// ===================================================

'use strict';

require('total5');

const options = {};

// options.ip = '127.0.0.1';
// options.unixsocket = PATH.join(F.tmpdir, 'universo_platformo.socket');

options.release = process.argv.includes('--release');

var rawPort = parseInt(process.env.PORT || '4000', 10);
if (isNaN(rawPort) || rawPort < 1 || rawPort > 65535) {
	console.error('[start-srv] Invalid PORT value "' + process.env.PORT + '". Using default port 4000.');
	rawPort = 4000;
}
options.port = rawPort;

// Service mode (no HTTP, background tasks only):
// options.servicemode = process.argv.includes('--service');

Total.run(options);
