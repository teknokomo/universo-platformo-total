# Universo Platformo Total.js

**Universo Platformo** — открытая платформа для создания иммерсивных AR/VR-опытов, AI-рабочих процессов и многопользовательских виртуальных миров с помощью визуального программирования на основе узлов.

[English version](./README.md)

## Обзор

Universo Platformo Total.js — это реализация PNPM монорепозитория, построенная на:
- **Total.js v5** — Node.js бэкенд-фреймворк для API, авторизации и базы данных
- **React + MUI** — Современный фронтенд с компонентами Material UI
- **Supabase** — Провайдер базы данных PostgreSQL и аутентификации

## Технологический стек

| Уровень | Технология |
|---------|------------|
| Бэкенд | Total.js v5, Node.js |
| Фронтенд | React 18, Material UI v5 |
| База данных | Supabase (PostgreSQL) |
| Авторизация | Supabase Auth |
| Сборка | PNPM workspaces, Vite |
| Язык | TypeScript |

## Предварительные требования

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Проект Supabase (для авторизации и базы данных)

## Установка

```bash
# Установите PNPM если его нет
npm install -g pnpm@8.15.0

# Клонируйте репозиторий
git clone https://github.com/teknokomo/universo-platformo-total.git
cd universo-platformo-total

# Установите зависимости
pnpm install

# Настройте переменные окружения
cp .env.example .env
# Отредактируйте .env с вашими учётными данными Supabase
```

## Структура проекта

```
universo-platformo-total/
├── packages/
│   ├── universo-types/        # Общие TypeScript типы
│   │   └── base/src/
│   ├── universo-utils/        # Общие утилиты
│   │   └── base/src/
│   ├── auth-srv/              # Бэкенд авторизации (Total.js)
│   │   └── base/src/
│   ├── auth-frt/              # Фронтенд авторизации (React)
│   │   └── base/src/
│   └── start-frt/             # Стартовые страницы (React)
│       └── base/src/
├── package.json               # Конфиг корневого воркспейса
├── pnpm-workspace.yaml        # Определение PNPM воркспейса
├── tsconfig.json              # Корневая конфигурация TypeScript
└── .env.example               # Шаблон переменных окружения
```

## Начало работы

```bash
# Запустить все пакеты в режиме разработки
pnpm dev

# Собрать все пакеты
pnpm build

# Проверка типов для всех пакетов
pnpm typecheck

# Линтинг всех пакетов
pnpm lint
```

## Пакеты

### @universo-platformo/types
Общие TypeScript определения типов, используемые во всех пакетах.

### @universo-platformo/utils
Общие утилиты: логгер, валидация, обработка переменных окружения, константы.

### @universo-platformo/auth-srv
Бэкенд-сервис на Total.js v5 для аутентификации. Обрабатывает вход, регистрацию, выход и управление сессиями через Supabase.

### @universo-platformo/auth-frt
React фронтенд компоненты для аутентификации. Предоставляет `AuthProvider`, `LoginForm`, `SessionGuard` и хуки авторизации.

### @universo-platformo/start-frt
Стартовые страницы для гостей и авторизованных пользователей. Включает секцию Hero, отзывы, мастер онбординга и дашборд.

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Лицензия

MIT License — см. [LICENSE](./LICENSE) для подробностей.

## Вклад в проект

Pull requests приветствуются. Для крупных изменений, пожалуйста, сначала откройте issue.
