# @universo-platformo/start-frt

> ⚠️ **Альтернатива на React — не нативный Total.js Platform.**  
> Этот пакет реализует стартовые страницы с использованием **React + MUI + Vite**, которые находятся
> за пределами экосистемы Total.js Platform. Для **нативной реализации на Total.js Platform**
> (jComponent, без шага сборки) смотрите [`../start-srv`](../start-srv/README-RU.md).

Часть монорепозитория [Universo Platformo Total.js](../../README-RU.md).

[English version](./README.md)

## Описание

Стартовые страницы Universo Platformo на React. Отображает лендинг для гостей и дашборд для
авторизованных пользователей с мастером онбординга. Использует React 18, MUI v5 и Vite.

**Технологический стек:**

| Слой | Технология |
|------|-----------|
| UI-фреймворк | React 18 |
| Библиотека компонентов | Material UI (MUI) v5 |
| Инструмент сборки | Vite 5 |
| Аутентификация | Supabase JS (через `auth-frt`) |

## Использование

```bash
pnpm install
pnpm --filter @universo-platformo/start-frt dev
```

## Лицензия

MIT
