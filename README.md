# Universo Platformo Total.js

**Universo Platformo** is an open-source platform for creating immersive AR/VR experiences, AI-powered workflows, and multiplayer virtual worlds using visual node-based programming.

[Русская версия](./README-RU.md)

## Overview

Universo Platformo Total.js is a PNPM monorepo implementation built on:
- **Total.js v5** — Node.js backend framework for API, auth, and database
- **React + MUI** — Modern frontend with Material UI components
- **Supabase** — PostgreSQL database and authentication provider

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Total.js v5, Node.js |
| Frontend | React 18, Material UI v5 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Build | PNPM workspaces, Vite |
| Language | TypeScript |

## Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Supabase project (for auth and database)

## Installation

```bash
# Install PNPM if you don't have it
npm install -g pnpm@8.15.0

# Clone the repository
git clone https://github.com/teknokomo/universo-platformo-total.git
cd universo-platformo-total

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials
```

## Project Structure

```
universo-platformo-total/
├── packages/
│   ├── universo-types/        # Shared TypeScript types
│   │   └── base/src/
│   ├── universo-utils/        # Shared utilities
│   │   └── base/src/
│   ├── auth-srv/              # Auth backend (Total.js)
│   │   └── base/src/
│   ├── auth-frt/              # Auth frontend (React)
│   │   └── base/src/
│   └── start-frt/             # Start pages (React)
│       └── base/src/
├── package.json               # Root workspace config
├── pnpm-workspace.yaml        # PNPM workspace definition
├── tsconfig.json              # Root TypeScript config
└── .env.example               # Environment template
```

## Getting Started

```bash
# Run all packages in development mode
pnpm dev

# Build all packages
pnpm build

# Type check all packages
pnpm typecheck

# Lint all packages
pnpm lint
```

## Packages

### @universo-platformo/types
Shared TypeScript type definitions used across all packages.

### @universo-platformo/utils
Common utility functions: logger, validation, environment variable handling, constants.

### @universo-platformo/auth-srv
Total.js v5 backend service for authentication. Handles login, register, logout, and session management via Supabase.

### @universo-platformo/auth-frt
React frontend authentication components. Provides `AuthProvider`, `LoginForm`, `SessionGuard`, and auth hooks.

### @universo-platformo/start-frt
Start pages for guest and authenticated users. Includes hero section, testimonials, onboarding wizard, and dashboard.

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## License

MIT License — see [LICENSE](./LICENSE) for details.

## Contributing

Pull requests are welcome. For major changes, please open an issue first.
