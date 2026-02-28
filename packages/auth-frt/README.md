# @universo-platformo/auth-frt

> ⚠️ **React-based alternative — not Total.js Platform native.**  
> This package implements auth UI using **React + MUI + Vite**, which are outside
> the Total.js Platform ecosystem. In the **Total.js Platform native** implementation
> (`start-srv`), authentication is handled by Supabase JS loaded directly from CDN
> inside Total.js HTML views — no React needed.

Part of the [Universo Platformo Total.js](../../README.md) monorepo.

[Русская версия](./README-RU.md)

## Description

React-based frontend authentication package. Provides `AuthProvider` context, `LoginForm` component,
`SessionGuard`, and auth hooks powered by Supabase JS.

**Technology stack:**

| Layer | Technology |
|-------|-----------|
| UI framework | React 18 |
| Component library | Material UI (MUI) v5 |
| Auth | Supabase JS |

## Usage

```bash
pnpm install
```

## License

MIT
