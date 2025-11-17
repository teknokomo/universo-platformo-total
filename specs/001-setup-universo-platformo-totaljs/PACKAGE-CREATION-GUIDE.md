# Package Creation Guide

**Version**: 1.0.0  
**Last Updated**: 2025-11-17  
**Status**: Reference Implementation Guide

## Overview

This guide provides step-by-step instructions for creating new packages in the Universo Platformo Total.js monorepo. Following these standards ensures consistency, maintainability, and proper integration with the overall architecture.

---

## Package Types

### Frontend Package (`-frt` suffix)

Frontend packages contain user interface components, pages, hooks, and API clients.

**Naming**: `{feature}-frt` (e.g., `clusters-frt`, `metaverses-frt`)

**Structure**:
```
packages/{feature}-frt/
├── base/                           # Base implementation
│   ├── src/
│   │   ├── api/                    # API client functions
│   │   │   ├── apiClient.ts        # HTTP client configuration
│   │   │   ├── queryKeys.ts        # React Query cache keys
│   │   │   └── {entity}.ts         # Entity-specific API functions
│   │   ├── components/             # Reusable UI components
│   │   │   └── {Component}.tsx
│   │   ├── pages/                  # Page components
│   │   │   ├── {Page}.tsx
│   │   │   └── __tests__/          # Page tests
│   │   │       └── {Page}.test.tsx
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── use{Hook}.ts
│   │   ├── types/                  # TypeScript type definitions
│   │   │   └── {module}.d.ts
│   │   ├── utils/                  # Utility functions
│   │   │   └── {utility}.ts
│   │   ├── i18n/                   # Internationalization (if needed)
│   │   │   └── index.ts
│   │   ├── menu-items/             # Navigation menu configuration
│   │   │   └── {feature}Dashboard.ts
│   │   └── index.ts                # Package exports
│   ├── dist/                       # Build output (gitignored)
│   ├── package.json
│   ├── tsconfig.json               # TypeScript config
│   ├── vitest.config.ts            # Test configuration
│   ├── setupTests.ts               # Test setup
│   ├── README.md                   # English documentation
│   └── README-RU.md                # Russian documentation
└── README.md                       # Package overview
```

---

### Backend Package (`-srv` suffix)

Backend packages contain API routes, business logic, database entities, and services.

**Naming**: `{feature}-srv` (e.g., `clusters-srv`, `metaverses-srv`)

**Structure**:
```
packages/{feature}-srv/
├── base/
│   ├── src/
│   │   ├── database/
│   │   │   ├── entities/           # Database entities
│   │   │   │   ├── {Entity}.ts     # Entity definition
│   │   │   │   └── index.ts        # Entity exports
│   │   │   └── migrations/         # Database migrations
│   │   │       └── postgres/       # Postgres-specific migrations
│   │   │           ├── {timestamp}-{Description}.ts
│   │   │           └── index.ts    # Migration exports
│   │   ├── routes/                 # API route handlers
│   │   │   └── {feature}Routes.ts
│   │   ├── services/               # Business logic
│   │   │   └── {Feature}Service.ts
│   │   ├── middleware/             # Custom middleware
│   │   │   └── {middleware}.ts
│   │   ├── types/                  # TypeScript types
│   │   │   └── {module}.d.ts
│   │   ├── utils/                  # Utility functions
│   │   │   └── {utility}.ts
│   │   └── index.ts                # Package exports
│   ├── dist/                       # Build output (gitignored)
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md                   # English documentation
│   └── README-RU.md                # Russian documentation
└── README.md
```

---

### Shared Package (no suffix)

Shared packages contain types, utilities, or configurations used across multiple packages.

**Naming**: `{purpose}` (e.g., `shared-types`, `shared-utils`, `universo-api-client`)

---

## Step-by-Step Creation Process

### Step 1: Create Package Directory Structure

```bash
# Navigate to packages directory
cd packages/

# Create frontend package
mkdir -p {feature}-frt/base/src/{api,components,pages,hooks,types,utils}

# Create backend package
mkdir -p {feature}-srv/base/src/{database/entities,database/migrations/postgres,routes,services,middleware,types,utils}
```

---

### Step 2: Create package.json

**Frontend package.json**:
```json
{
  "name": "@universo/{feature}-frt",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsdown",
    "dev": "vite",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/**/*.{ts,tsx}",
    "clean": "rimraf dist"
  },
  "dependencies": {
    "@mui/material": "catalog:",
    "@mui/icons-material": "catalog:",
    "react": "catalog:",
    "react-dom": "catalog:"
  },
  "devDependencies": {
    "@types/react": "catalog:",
    "@types/react-dom": "catalog:",
    "typescript": "catalog:",
    "vitest": "catalog:",
    "tsdown": "catalog:",
    "vite": "catalog:"
  }
}
```

**Backend package.json**:
```json
{
  "name": "@universo/{feature}-srv",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint src/**/*.ts",
    "clean": "rimraf dist"
  },
  "dependencies": {
    "typeorm": "catalog:",
    "zod": "catalog:"
  },
  "devDependencies": {
    "typescript": "catalog:",
    "vitest": "catalog:",
    "@types/node": "catalog:"
  }
}
```

**Note**: Use `catalog:` references for all shared dependencies defined in root `pnpm-workspace.yaml`.

---

### Step 3: Create TypeScript Configuration

**tsconfig.json** (for both frontend and backend):
```json
{
  "extends": "../../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declarationDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

---

### Step 4: Define Database Entity (Backend Only)

**src/database/entities/{Entity}.ts**:
```typescript
import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class YourEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description: string | null;

  @ManyToOne(() => ParentEntity, parent => parent.children)
  parent: ParentEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

---

### Step 5: Export Entity from Central Registry

**packages/{feature}-srv/base/src/database/entities/index.ts**:
```typescript
export { YourEntity } from './YourEntity';
```

**Then add to central registry** at `packages/flowise-server/src/database/entities/index.ts`:
```typescript
// Import from your package
export * from '@universo/{feature}-srv/database/entities';
```

---

### Step 6: Create Database Migration

```bash
# Generate migration (if using TypeORM CLI)
pnpm typeorm migration:create packages/{feature}-srv/base/src/database/migrations/postgres/CreateYourEntity
```

**packages/{feature}-srv/base/src/database/migrations/postgres/{timestamp}-CreateYourEntity.ts**:
```typescript
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateYourEntity1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'your_entity',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'name', type: 'varchar', length: '255' },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('your_entity');
  }
}
```

---

### Step 7: Export Migrations

**packages/{feature}-srv/base/src/database/migrations/postgres/index.ts**:
```typescript
import { CreateYourEntity1234567890 } from './1234567890-CreateYourEntity';

export const yourFeatureMigrations = [
  CreateYourEntity1234567890
];
```

**Add to central migration registry** at `packages/flowise-server/src/database/migrations/postgres/index.ts`:
```typescript
import { yourFeatureMigrations } from '@universo/{feature}-srv/database/migrations/postgres';

export const postgresMigrations = [
  // ... existing migrations
  ...yourFeatureMigrations
];
```

---

### Step 8: Create API Routes (Backend)

**packages/{feature}-srv/base/src/routes/{feature}Routes.ts**:
```typescript
import { Router } from 'express';
import { verifyToken, ensureAuthWithRls, rateLimiter } from '@universo/shared-middleware';

const router = Router();

// Middleware chain: auth → RLS → rate limit
router.use(verifyToken);
router.use(ensureAuthWithRls);
router.use(rateLimiter({ points: 100, duration: 60 }));

// GET /api/v1/{feature}
router.get('/', async (req, res) => {
  try {
    const repo = getDataSource().getRepository(YourEntity);
    const items = await repo.find({
      skip: Number(req.query.offset) || 0,
      take: Number(req.query.limit) || 100
    });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: 'InternalServerError',
      message: 'Failed to fetch items',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }
});

export default router;
```

---

### Step 9: Create API Client (Frontend)

**packages/{feature}-frt/base/src/api/{feature}.ts**:
```typescript
import { apiClient } from './apiClient';
import type { YourEntity } from '@universo/{feature}-srv';

export interface PaginationParams {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchItems(params: PaginationParams = {}): Promise<YourEntity[]> {
  const { data } = await apiClient.get('/api/v1/{feature}', { params });
  return data;
}

export async function fetchItemById(id: string): Promise<YourEntity> {
  const { data } = await apiClient.get(`/api/v1/{feature}/${id}`);
  return data;
}

export async function createItem(item: Partial<YourEntity>): Promise<YourEntity> {
  const { data } = await apiClient.post('/api/v1/{feature}', item);
  return data;
}
```

---

### Step 10: Create React Query Hooks (Frontend)

**packages/{feature}-frt/base/src/api/queryKeys.ts**:
```typescript
export const queryKeys = {
  all: ['{feature}'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: string) => [...queryKeys.lists(), { filters }] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => [...queryKeys.details(), id] as const
};
```

**packages/{feature}-frt/base/src/hooks/use{Feature}.ts**:
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchItems, createItem, queryKeys } from '../api/{feature}';

export function useItems() {
  return useQuery({
    queryKey: queryKeys.lists(),
    queryFn: () => fetchItems()
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lists() });
    }
  });
}
```

---

### Step 11: Create Tests

**Frontend test** - `packages/{feature}-frt/base/src/pages/__tests__/{Page}.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { YourPage } from '../YourPage';

describe('YourPage', () => {
  it('renders page title', () => {
    render(<YourPage />);
    expect(screen.getByText(/Your Feature/i)).toBeInTheDocument();
  });
});
```

**Backend test** - `packages/{feature}-srv/base/src/routes/__tests__/{feature}Routes.test.ts`:
```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../../app';
import { getTestToken } from '../testUtils';

describe('GET /api/v1/{feature}', () => {
  let authToken: string;

  beforeAll(async () => {
    authToken = await getTestToken('viewer');
  });

  it('returns 200 with items list', async () => {
    const res = await request(app)
      .get('/api/v1/{feature}')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

---

### Step 12: Create Documentation

**README.md** (English):
```markdown
# {Feature} Package

## Overview

Brief description of package purpose and functionality.

## Installation

```bash
pnpm add @universo/{feature}-frt
```

## Usage

```typescript
import { useItems } from '@universo/{feature}-frt';

function MyComponent() {
  const { data, isLoading } = useItems();
  
  if (isLoading) return <div>Loading...</div>;
  
  return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
}
```

## API Reference

### `useItems()`

Fetches list of items with pagination.

**Returns**: `{ data: Item[], isLoading: boolean, error: Error | null }`

### `useCreateItem()`

Creates a new item.

**Returns**: `{ mutate: (item: Partial<Item>) => void, isLoading: boolean }`

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build package
pnpm build
```

## Contributing

Please refer to the root CONTRIBUTING.md for contribution guidelines.

## License

See root LICENSE file.
```

**README-RU.md** (Russian translation with identical structure)

---

### Step 13: Register Package in Workspace

**Root pnpm-workspace.yaml** (should already include):
```yaml
packages:
  - 'packages/*'
  - 'packages/*/base'
```

This pattern automatically includes all packages in the workspace.

---

### Step 14: Update Root Package Scripts (if needed)

If package requires special build steps, update root `package.json`:
```json
{
  "scripts": {
    "build:{feature}": "pnpm --filter @universo/{feature}-frt build && pnpm --filter @universo/{feature}-srv build"
  }
}
```

---

### Step 15: Install Dependencies

```bash
# From repository root
pnpm install

# Verify package is recognized
pnpm list --depth 0
```

---

## Best Practices

### Naming Conventions

- **Packages**: `{feature}-frt` or `{feature}-srv`
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Functions**: camelCase (e.g., `fetchUserData()`)
- **Types/Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Import Order

```typescript
// 1. External dependencies
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

// 2. Internal workspace packages
import { apiClient } from '@universo/shared-api-client';
import { UserProfile } from '@universo/profile-frt';

// 3. Relative imports
import { useItems } from '../hooks/useItems';
import type { Item } from '../types/item';
```

### TypeScript

- Always export types used across package boundaries
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` if type is truly unknown
- Document complex types with JSDoc comments

### Testing

- Test user-facing behavior, not implementation details
- Mock external dependencies (API calls, database)
- Use descriptive test names: `it('should display error message when API fails')`
- Aim for 70%+ code coverage

### Documentation

- Keep README concise but complete
- Include usage examples for all exported functions/hooks
- Document edge cases and error handling
- Maintain 100% EN/RU parity

---

## Troubleshooting

### Package Not Found

```bash
# Rebuild workspace
pnpm install

# Check package.json "name" field matches imports
```

### Build Errors

```bash
# Clean all builds
pnpm clean:all

# Rebuild from scratch
pnpm build:all
```

### TypeScript Path Resolution

Ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "paths": {
      "@universo/*": ["./packages/*/base/src"]
    }
  }
}
```

---

## Checklist

Before submitting PR:

- [ ] Package follows naming convention (`{feature}-frt` or `{feature}-srv`)
- [ ] `base/` directory structure is correct
- [ ] All shared dependencies use `catalog:` references
- [ ] Entities are exported to central registry
- [ ] Migrations are exported to central migration array
- [ ] README.md and README-RU.md are structurally identical
- [ ] Tests pass: `pnpm test`
- [ ] Build succeeds: `pnpm build`
- [ ] Linting passes: `pnpm lint`
- [ ] Code is formatted: `pnpm format`

---

## Additional Resources

- [Constitution](../../../.specify/memory/constitution.md) - Core principles
- [Specification](./spec.md) - Detailed requirements
- [Architecture Comparison](./ARCHITECTURE-COMPARISON.md) - Pattern analysis

---

**Version History**:
- **1.0.0** (2025-11-17): Initial package creation guide based on universo-platformo-react analysis
