# @universo-platformo/auth-frt

> ⚠️ **Альтернатива на React — не нативный Total.js Platform.**  
> Этот пакет реализует UI аутентификации с использованием **React + MUI + Vite**, которые находятся
> за пределами экосистемы Total.js Platform. В **нативной реализации на Total.js Platform**
> (`start-srv`) аутентификация обрабатывается через Supabase JS, загружаемый напрямую с CDN
> внутри HTML-шаблонов Total.js — без React.

Часть монорепозитория [Universo Platformo Total.js](../../README-RU.md).

[English version](./README.md)

## Описание

React фронтенд пакет для аутентификации. Предоставляет контекст `AuthProvider`, компонент `LoginForm`,
`SessionGuard` и хуки авторизации на основе Supabase JS.

**Технологический стек:**

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 |
| Библиотека компонентов | Material UI (MUI) v5 |
| Аутентификация | Supabase JS |

## Использование

```bash
pnpm install
```

## Лицензия

MIT
