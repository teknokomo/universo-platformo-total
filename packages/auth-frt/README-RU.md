# @universo-platformo/auth-frt

> ⚠️ **Альтернатива на React — не нативный Total.js Platform.**  
> Этот пакет реализует UI аутентификации с использованием **React + MUI + Vite**, которые находятся
> за пределами экосистемы Total.js Platform. В **нативной реализации на Total.js Platform**
> (`start-srv`) аутентификация обрабатывается полностью на сервере через маршруты `/api/auth/*`
> с httpOnly cookies — без React.

Часть монорепозитория [Universo Platformo Total.js](../../README-RU.md).

[English version](./README.md)

## Описание

React фронтенд пакет для аутентификации. Предоставляет контекст `AuthProvider`, компонент `LoginForm`,
`SessionGuard` и хуки авторизации. Все операции аутентификации выполняются через бэкенд-эндпоинты
`/api/auth/*`; сессии управляются через httpOnly cookies, устанавливаемые сервером.

**Технологический стек:**

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 |
| Библиотека компонентов | Material UI (MUI) v5 |
| Аутентификация | Бэкенд `/api/auth/*` (httpOnly cookies) |

## Использование

```bash
pnpm install
```

## Лицензия

MIT
