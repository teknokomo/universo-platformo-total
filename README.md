# Universo Platformo Total.js

**Universo Platformo** is an open-source platform for creating immersive AR/VR experiences,
AI-powered workflows, and multiplayer virtual worlds using visual node-based programming.

[Русская версия](./README-RU.md)

## Overview

Universo Platformo Total.js is a PNPM monorepo implementation built on the **Total.js Platform**.
The primary implementation (`start-srv`) uses exclusively Total.js Platform technologies:
no React, no Vite, no MUI — just Total.js v5 on the server and jComponent on the client.

## Security Architecture

All Supabase credentials and operations are **server-side only**:

```
Browser (jComponent)            Backend (Total.js v5)          Supabase
      |                               |                            |
      |  POST /api/auth/login         |                            |
      |  { email, password }   -----> |                            |
      |                               |  signInWithPassword() ---> |
      |                               | <--- { access_token }      |
      |  Set-Cookie: up_access=...    |                            |
      | <----- (httpOnly cookie) ---- |                            |
      |                               |                            |
      |  GET /api/auth/session        |                            |
      |  Cookie: up_access=...  ----> |                            |
      |                               |  getUser(token) ---------> |
      |                               | <--- { user }              |
      | <---- { user }                |                            |
```

**No Supabase credentials are ever sent to the browser.**
The frontend talks to its own backend via `/api/auth/*` routes.
The backend issues `httpOnly` session cookies (invisible to JavaScript).

## Technology Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Server** | [Total.js v5](https://www.totaljs.com/) | Node.js, no build step |
| **Frontend UI** | [jComponent](https://www.totaljs.com/jcomponent/) | Total.js's own UI library, CDN |
| **SPA routing** | jComponent `NAV` / `ROUTE` | Client-side navigation |
| **State** | jComponent `SET` / `GET` | Path-based data binding |
| **Auth** | Supabase JS on server | Server-side only, anon key |
| **Styles** | Plain CSS | Custom properties, no preprocessor |
| **Language** | JavaScript (server + client) | No TypeScript transpilation needed |
| **Shared types** | TypeScript | Compiled packages only |

## Project Structure

```
universo-platformo-total/
├── packages/
│   ├── universo-types/        # Shared TypeScript type definitions
│   │   └── base/src/
│   ├── universo-utils/        # Shared utilities (logger, validation, constants)
│   │   └── base/src/
│   ├── auth-srv/              # Auth backend module (Total.js, TypeScript)
│   │   └── base/src/
│   ├── start-srv/             # ★ Main app: start pages + auth API (Total.js v5)
│   │   └── base/
│   │       ├── controllers/   # ROUTE definitions (SPA + /api/auth/*)
│   │       ├── views/         # HTML templates (jComponent)
│   │       └── public/        # Static files (CSS, JS)
│   ├── auth-frt/              # React auth components (alternative)
│   │   └── base/src/
│   └── start-frt/             # React start pages (alternative)
│       └── base/src/
├── .env.example               # Environment variable template
├── package.json               # Root workspace configuration
├── pnpm-workspace.yaml        # PNPM workspace definition
└── tsconfig.json              # Root TypeScript configuration
```

## Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Supabase project (free tier is sufficient)

## Installation

```bash
# Install PNPM if not already installed
npm install -g pnpm@8.15.0

# Clone the repository
git clone https://github.com/teknokomo/universo-platformo-total.git
cd universo-platformo-total

# Install all dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

## Environment Variables

```env
# Server-side only — NEVER sent to the browser
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Application port
PORT=4000
NODE_ENV=development
```

See `.env.example` for the full list of available variables.

## Running

```bash
# Run start-srv (Total.js Platform native — recommended)
pnpm --filter @universo-platformo/start-srv dev

# Or run directly
cd packages/start-srv
node base/index.js

# Production mode
node base/index.js --release
```

Open `http://localhost:4000` in your browser.

## Packages

### @universo-platformo/start-srv ★ Primary
Total.js v5 application. Serves the jComponent-based frontend and handles all
Supabase authentication via server-side API routes. Sessions use `httpOnly` cookies.

API routes provided:
- `POST /api/auth/login` — sign in, set session cookie
- `POST /api/auth/register` — create account, set session cookie
- `POST /api/auth/logout` — clear session cookies
- `GET /api/auth/session` — validate session cookie, return user
- `POST /api/auth/refresh` — refresh session using refresh cookie

### @universo-platformo/auth-srv
TypeScript authentication module for Total.js. Provides `AuthService` class
with login, register, logout, and session management via Supabase.

### @universo-platformo/universo-types
Shared TypeScript type definitions used across all packages.

### @universo-platformo/universo-utils
Common utilities: structured logger, validation helpers, HTTP status constants,
error codes, and environment variable validation.

### @universo-platformo/start-frt ⚠ React alternative
React 18 + MUI v5 + Vite implementation. Not Total.js Platform native.
Uses the backend `/api/auth/*` endpoints via `auth-frt`.

### @universo-platformo/auth-frt ⚠ React alternative
React authentication components (`AuthProvider`, `LoginForm`, `SessionGuard`)
that call the backend `/api/auth/*` endpoints with httpOnly cookies.
Not Total.js Platform native.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.
Both English and Russian README files must be updated together.

## License

Omsk Open License
