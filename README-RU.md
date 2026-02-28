# Universo Platformo Total.js

**Universo Platformo** — открытая платформа для создания иммерсивных AR/VR-опытов,
AI-рабочих процессов и многопользовательских виртуальных миров с помощью визуального программирования.

[English version](./README.md)

## Обзор

Universo Platformo Total.js — это реализация PNPM монорепозитория на базе **Total.js Platform**.
Основная реализация (`start-srv`) использует исключительно технологии Total.js Platform:
без React, без Vite, без MUI — только Total.js v5 на сервере и jComponent на клиенте.

## Архитектура безопасности

Все учётные данные Supabase и операции с ним выполняются **только на стороне сервера**:

```
Браузер (jComponent)            Бэкенд (Total.js v5)           Supabase
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

**Учётные данные Supabase никогда не передаются в браузер.**
Фронтенд взаимодействует только со своим бэкендом через маршруты `/api/auth/*`.
Бэкенд выдаёт сессионные cookies с флагом `httpOnly` (невидимые для JavaScript).

## Технологический стек

| Слой | Технология | Примечание |
|------|-----------|-----------|
| **Сервер** | [Total.js v5](https://www.totaljs.com/) | Node.js, без шага сборки |
| **Frontend UI** | [jComponent](https://www.totaljs.com/jcomponent/) | Собственная UI-библиотека Total.js, CDN |
| **SPA-маршрутизация** | jComponent `NAV` / `ROUTE` | Клиентская навигация |
| **Состояние** | jComponent `SET` / `GET` | Привязка данных по пути |
| **Авторизация** | Supabase JS на сервере | Только серверная сторона, anon key |
| **Стили** | Чистый CSS | Пользовательские свойства, без препроцессора |
| **Язык** | JavaScript (сервер + клиент) | Без транспиляции TypeScript |
| **Общие типы** | TypeScript | Только скомпилированные пакеты |

## Структура проекта

```
universo-platformo-total/
├── packages/
│   ├── universo-types/        # Общие TypeScript определения типов
│   │   └── base/src/
│   ├── universo-utils/        # Общие утилиты (логгер, валидация, константы)
│   │   └── base/src/
│   ├── auth-srv/              # Модуль авторизации (Total.js, TypeScript)
│   │   └── base/src/
│   ├── start-srv/             # ★ Главное приложение: стартовые страницы + API авторизации
│   │   └── base/
│   │       ├── controllers/   # ROUTE определения (SPA + /api/auth/*)
│   │       ├── views/         # HTML-шаблоны (jComponent)
│   │       └── public/        # Статические файлы (CSS, JS)
│   ├── auth-frt/              # React компоненты авторизации (альтернатива)
│   │   └── base/src/
│   └── start-frt/             # React стартовые страницы (альтернатива)
│       └── base/src/
├── .env.example               # Шаблон переменных окружения
├── package.json               # Конфигурация корневого воркспейса
├── pnpm-workspace.yaml        # Определение PNPM воркспейса
└── tsconfig.json              # Корневая конфигурация TypeScript
```

## Требования

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Проект Supabase (бесплатный тарифный план подходит)

## Установка

```bash
# Установите PNPM если не установлен
npm install -g pnpm@8.15.0

# Клонируйте репозиторий
git clone https://github.com/teknokomo/universo-platformo-total.git
cd universo-platformo-total

# Установите все зависимости
pnpm install

# Настройте переменные окружения
cp .env.example .env
# Отредактируйте .env с вашими учётными данными Supabase
```

## Переменные окружения

```env
# Только на стороне сервера — НИКОГДА не передаются в браузер
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Порт приложения
PORT=4000
NODE_ENV=development
```

Полный список доступных переменных смотрите в `.env.example`.

## Запуск

```bash
# Запустить start-srv (нативный Total.js Platform — рекомендуется)
pnpm --filter @universo-platformo/start-srv dev

# Или запустить напрямую
cd packages/start-srv
node base/index.js

# Режим продакшн
node base/index.js --release
```

Откройте `http://localhost:4000` в браузере.

## Пакеты

### @universo-platformo/start-srv ★ Основной
Приложение Total.js v5. Обслуживает фронтенд на базе jComponent и обрабатывает всю
аутентификацию Supabase через серверные API-маршруты. Сессии используют `httpOnly` cookies.

Предоставляемые API-маршруты:
- `POST /api/auth/login` — вход, установка сессионного cookie
- `POST /api/auth/register` — создание аккаунта, установка сессионного cookie
- `POST /api/auth/logout` — очистка сессионных cookies
- `GET /api/auth/session` — проверка сессионного cookie, возврат пользователя
- `POST /api/auth/refresh` — обновление сессии через refresh cookie

### @universo-platformo/auth-srv
TypeScript модуль аутентификации для Total.js. Предоставляет класс `AuthService`
с методами входа, регистрации, выхода и управления сессиями через Supabase.

### @universo-platformo/universo-types
Общие TypeScript определения типов, используемые во всех пакетах.

### @universo-platformo/universo-utils
Общие утилиты: структурированный логгер, валидационные хелперы, константы HTTP статусов,
коды ошибок и валидация переменных окружения.

### @universo-platformo/start-frt ⚠ Альтернатива на React
Реализация на React 18 + MUI v5 + Vite. Не является нативным Total.js Platform.
Требует переменных окружения `VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY`.

### @universo-platformo/auth-frt ⚠ Альтернатива на React
React компоненты аутентификации (`AuthProvider`, `LoginForm`, `SessionGuard`).
Не является нативным Total.js Platform.

## Участие в разработке

Pull requests приветствуются. Для крупных изменений сначала откройте issue.
Файлы README на английском и русском должны обновляться одновременно.

## Лицензия

Лицензия Омск Опен
