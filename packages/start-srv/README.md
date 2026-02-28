# `@universo-platformo/start-srv`

Total.js v5 application — guest start page, authenticated start page, and Supabase authentication.

This package is the **Total.js Platform native** implementation of the Universo Platformo start experience.
It uses **only** technologies from the Total.js Platform ecosystem — no React, no Vite, no MUI.

---

## Technology Stack (100% Total.js Platform)

| Layer | Technology |
|-------|-----------|
| **Server** | [Total.js v5](https://www.totaljs.com/) (Node.js, no transpilation needed) |
| **Frontend UI** | [jComponent](https://www.totaljs.com/jcomponent/) (loaded from CDN, 300+ web components) |
| **SPA Routing** | jComponent `NAV` / `ROUTE` (client-side navigation without page reloads) |
| **State Management** | jComponent `SET` / `GET` / `UPD` / `WATCH` (path-based data binding) |
| **Authentication** | [Supabase JS](https://supabase.com/) (loaded from CDN, anon key only in browser) |
| **Styles** | Plain CSS with custom properties (no preprocessor needed) |

> **Why no React/Vite/MUI?**  
> The previous implementation (`start-frt`, `auth-frt`) used React + MUI + Vite which are _not_ part of
> the Total.js Platform. jComponent is Total.js's own, built-in UI library — it ships with every
> Total.js application and requires zero build step.

---

## Features

- **Guest start page** — hero section, features grid, testimonials, login/register form
- **Authenticated start page** — navigation bar, onboarding wizard (step-by-step), dashboard with quick actions
- **Supabase authentication** — sign-in, sign-up, sign-out, session restore on page reload
- **jComponent patterns** — `SET`/`GET` state, `ROUTE` SPA navigation, `ON('ready')` boot hook
- **Server-side config injection** — Total.js templates inject the Supabase public anon key at serve time

---

## Prerequisites

- Node.js ≥ 18.0.0
- A Supabase project (free tier is sufficient)

---

## Installation

```bash
# From the monorepo root
pnpm install

# Or install this package alone
cd packages/start-srv
npm install
```

---

## Configuration

Copy `.env.example` (repo root) to `.env` and fill in your Supabase values:

```env
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

The `SUPABASE_ANON_KEY` is intentionally exposed to the browser — it is the **public** anonymous key.
Supabase Row Level Security (RLS) policies enforce data access permissions.

---

## Running

```bash
# Development (debug mode, hot reload)
pnpm --filter @universo-platformo/start-srv dev

# Or directly
cd packages/start-srv
node base/index.js

# Production
node base/index.js --release
```

Open `http://localhost:4000` in your browser.

---

## Project Structure

```
packages/start-srv/
├── base/
│   ├── controllers/
│   │   └── default.js      ← Total.js routes (serve SPA for all GET requests)
│   ├── public/
│   │   ├── css/app.css     ← Application styles (plain CSS, no preprocessor)
│   │   └── js/app.js       ← Client-side logic (jComponent + Supabase CDN)
│   ├── views/
│   │   └── index.html      ← SPA shell (Total.js template, jComponent components)
│   └── index.js            ← Total.js v5 entry point
├── package.json
├── README.md
└── README-RU.md
```

---

## How jComponent Works Here

```
┌─────────────────────────────────────────────────────────┐
│ Total.js server (Node.js)                               │
│  • Reads SUPABASE_URL and SUPABASE_ANON_KEY from env    │
│  • Injects them into views/index.html via @{model.xxx}  │
│  • Serves index.html for ALL GET routes (SPA pattern)   │
│  • Serves static files from public/ (/css/, /js/)       │
└────────────────────────┬────────────────────────────────┘
                         │ HTML response
                         ▼
┌─────────────────────────────────────────────────────────┐
│ Browser                                                 │
│  jComponent (CDN) loads and fires ON('ready')           │
│  → UP.init() runs                                       │
│     → Supabase.auth.getSession() checks for active auth │
│     → Shows #page-guest (anonymous) or #page-auth       │
│  jComponent SET/GET manages all UI state                │
│  jComponent ROUTE handles back/forward navigation       │
│  Supabase onAuthStateChange keeps UI in sync            │
└─────────────────────────────────────────────────────────┘
```

---

## API Reference

### `window.UP` — Public application API

| Method | Description |
|--------|-------------|
| `UP.showAuthSection()` | Scroll to and show the auth form on the guest page |
| `UP.hideAuthSection()` | Hide the auth form |
| `UP.scrollToFeatures()` | Smooth-scroll to features section |
| `UP.switchTab(tab)` | Switch between `'login'` and `'register'` tabs |
| `UP.handleLogin(event)` | Handle login form submit |
| `UP.handleRegister(event)` | Handle register form submit |
| `UP.handleLogout()` | Sign out current user |
| `UP.onboardingNext(step)` | Navigate to onboarding step (1, 2, or 3) |
| `UP.onboardingComplete()` | Mark onboarding as finished |
| `UP.showDashboard()` | Skip onboarding and show dashboard |

---

## Relationship to React Packages

The `start-frt` and `auth-frt` packages in this monorepo are **alternative React-based implementations**.
`start-srv` replaces them with a Total.js Platform native approach.

| Package | Stack | Status |
|---------|-------|--------|
| `start-srv` | Total.js v5 + jComponent (CDN) | ✅ Total.js Platform native |
| `start-frt` | React + MUI + Vite | ⚠️ React-based alternative (not Total.js native) |
| `auth-frt` | React + MUI + Vite | ⚠️ React-based alternative (not Total.js native) |

---

## Contributing

Follow the project conventions in `.specify/memory/constitution.md`.
All code changes require both English and Russian README updates.

## License

Omsk Open License
