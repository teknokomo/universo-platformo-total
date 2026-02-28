# @universo-platformo/start-frt

> ⚠️ **React-based alternative — not Total.js Platform native.**  
> This package implements the start pages using **React + MUI + Vite**, which are outside
> the Total.js Platform ecosystem. For the **Total.js Platform native** implementation
> (jComponent, no build step), see [`../start-srv`](../start-srv/README.md).

Part of the [Universo Platformo Total.js](../../README.md) monorepo.

[Русская версия](./README-RU.md)

## Description

React-based start pages for Universo Platformo. Renders a hero landing page for guests and an
authenticated dashboard with onboarding wizard. Uses React 18, MUI v5, and Vite.

**Technology stack:**

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Component library | Material UI (MUI) v5 |
| Build tool | Vite 5 |
| Auth | Supabase JS (via `auth-frt`) |

## Usage

```bash
pnpm install
pnpm --filter @universo-platformo/start-frt dev
```

## License

MIT
