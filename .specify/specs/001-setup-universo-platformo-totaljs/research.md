# Research & Technology Decisions

**Feature**: 001-setup-universo-platformo-totaljs  
**Phase**: Phase 0 - Research  
**Date**: 2025-11-17  
**Updated**: 2025-11-17 (Web Research + Context7 Integration)  
**Purpose**: Resolve all "NEEDS CLARIFICATION" items from Technical Context and establish concrete technology choices for Total.js Platform v5 implementation

---

## Research Methodology

This research combines:
- **Web Search**: Best practices from industry sources for Total.js v5, TypeScript, monorepo patterns
- **Context7 Documentation**: Official Total.js v5 and Framework5 documentation
- **Comparative Analysis**: Patterns from universo-platformo-react adapted for Total.js
- **Community Best Practices**: Modern JavaScript/TypeScript ecosystem standards

---

## Research Tasks

This document addresses the following unknowns from the Technical Context:
1. ORM choice for Total.js (TypeORM vs Total.js native tools)
2. Build orchestration tool (Turbo vs Total.js native tools)
3. Testing framework compatible with Total.js and TypeScript
4. Target concurrent users and throughput requirements
5. Total.js best practices for monorepo structure
6. Total.js + TypeScript integration patterns
7. Total.js + Material UI integration approach

---

## 1. Database ORM Selection

### Decision: Use Total.js DBMS with Custom Repository Pattern

**Rationale** (validated by Context7 documentation):
- Total.js Platform v5 provides native database abstraction through `DBMS()` API
- Total.js supports multiple databases (PostgreSQL, MongoDB, MySQL) natively
- Using Total.js native tools ensures better framework integration
- TypeORM is not recommended for Total.js v5 (different architecture paradigm)
- QueryBuilder pattern is built into Total.js

**Total.js DBMS API** (from Context7):
Total.js provides a fluent QueryBuilder API:
```javascript
// Query examples from Total.js documentation
var db = DBMS();

// Find with conditions
db.find('tbl_users')
  .where('active', true)
  .where('age', '>', 18)
  .callback(function(err, response) {
    // Handle results
  });

// Search with ILIKE (case-insensitive)
builder.search('name', 'John', '*'); // throughout text
builder.search('email', 'example', 'beg'); // at beginning

// User ID filtering
builder.userid(userId);

// Custom SQL injection
builder.query('custom_field = 123');

// Read by ID with error handling
await DATA.read('tbl_todo')
  .id(model.id)
  .error(404)
  .promise($);

// Insert with promise
await DATA.insert('tbl_todo', model).promise($);
```

**Implementation Approach**:
1. **Use Total.js `DBMS()` API** for all database operations
2. **Implement Repository pattern** manually on top of Total.js DBMS:
   - Create `BaseRepository` class with common CRUD operations
   - Each entity gets specific repository (e.g., `UserRepository`)
   - Repositories encapsulate Total.js DBMS calls
3. **Create adapter interfaces** for future DBMS switching:
   - Define `IDatabaseAdapter` interface
   - Implement `SupabaseAdapter` using Total.js DBMS
   - Future: Create adapters for other databases
4. **Use Total.js schema definitions** for data validation (NEWACTION input validation)

**Repository Pattern Example**:
```typescript
// BaseRepository.ts
export abstract class BaseRepository<T> {
  constructor(protected tableName: string) {}

  async findById(id: string): Promise<T | null> {
    const db = DBMS();
    return await db.find(this.tableName)
      .where('id', id)
      .first()
      .promise();
  }

  async findAll(filters?: any): Promise<T[]> {
    const db = DBMS();
    const query = db.find(this.tableName);
    
    if (filters) {
      Object.keys(filters).forEach(key => {
        query.where(key, filters[key]);
      });
    }
    
    return await query.promise();
  }

  async create(data: Partial<T>): Promise<T> {
    return await DATA.insert(this.tableName, data).promise();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return await DATA.update(this.tableName)
      .id(id)
      .set(data)
      .promise();
  }

  async delete(id: string): Promise<void> {
    await DATA.remove(this.tableName)
      .id(id)
      .promise();
  }
}

// UserRepository.ts
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('tbl_users');
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = DBMS();
    return await db.find(this.tableName)
      .where('email', email)
      .first()
      .promise();
  }
}
```

**Supabase Integration**:
Total.js DBMS can connect to PostgreSQL (Supabase's database):
```javascript
// In Total.js configuration
DBMS().connection({
  type: 'postgresql',
  host: process.env.SUPABASE_DB_HOST,
  port: 5432,
  user: process.env.SUPABASE_DB_USER,
  password: process.env.SUPABASE_DB_PASSWORD,
  database: process.env.SUPABASE_DB_NAME
});
```

**Alternatives Considered**:
- **TypeORM**: Popular but adds complexity; not aligned with Total.js patterns; requires decorators
- **Prisma**: Modern ORM but introduces different mental model; another dependency layer
- **Raw SQL**: Too low-level; violates Constitution Principle X (Data Access Patterns)
- **Supabase JS Client**: Good for simple queries but doesn't integrate with Total.js patterns

**References**: 
- Total.js DBMS documentation: https://docs.totaljs.com/total5/
- Total.js QueryBuilder: https://github.com/totaljs/framework5/blob/main/docs/globals.md
- Total.js Actions: https://github.com/totaljs/framework5/blob/main/docs/actions.md

---

## 2. Build Orchestration Tool

### Decision: Use PNPM Workspaces with Total.js Native Build

**Rationale**:
- PNPM workspaces provide built-in monorepo support without additional tools
- Total.js v5 has native TypeScript compilation and build capabilities
- Turbo adds complexity that may not be needed for initial setup
- PNPM workspace scripts can orchestrate builds across packages efficiently
- Simpler solution aligns with Constitution governance (simplicity is default)

**Implementation Approach**:
- Define workspace-level scripts in root `package.json`: `build:all`, `dev:all`, `test:all`
- Use PNPM's `--filter` flag for selective package builds
- Leverage PNPM's dependency topological sorting for correct build order
- Use Total.js native watch mode for development builds

**Alternatives Considered**:
- **Turbo**: Powerful but adds caching layer complexity; may be premature optimization
- **Nx**: Feature-rich but heavyweight; better suited for larger monorepos
- **Lerna**: Legacy tool, largely superseded by PNPM workspaces

**Future Consideration**: If build times exceed 2 minutes (FR-032), consider adding Turbo for caching

---

## 3. Testing Framework

### Decision: Use Vitest for All Testing Layers

**Rationale** (confirmed by web research):
- Vitest is fast, modern, and has excellent TypeScript support
- Native ESM support aligns with Total.js v5 and modern Node.js
- Compatible with Total.js project structure
- Unified testing framework for unit, integration, and E2E tests
- Built-in coverage reporting (uses c8)
- Compatible with existing ecosystem (Jest-compatible API)
- Multi-project support perfect for monorepos

**Testing Strategy Best Practices** (from web research):

**1. Unit Testing**:
- **Framework**: Vitest with Jest-compatible API
- **Pattern**: AAA (Arrange, Act, Assert)
- **Coverage Target**: 70% code coverage
- **Best Practices**:
  - Mock external dependencies (databases, APIs)
  - Use beforeEach/afterEach for setup/teardown
  - Keep tests isolated (no shared state)
  - Test both success and error paths
  - Make tests readable and descriptive

**2. Integration Testing**:
- **Framework**: Vitest + Supertest or MSW
- **Coverage Target**: 60% of API endpoints
- **Best Practices**:
  - Test inter-module communication
  - Use test database or in-memory data store
  - Mock external services (3rd party APIs)
  - Test "happy path" and edge cases
  - Ensure test independence (no execution order dependency)

**3. E2E Testing**:
- **Framework**: Playwright (recommended over Cypress for Total.js)
- **Coverage**: Critical user paths only
- **Best Practices**:
  - Focus on business-critical journeys
  - Run in CI/CD pipelines
  - Use fixtures for test data
  - Mock authentication for controlled environment

**Monorepo Configuration** (from web research):

Root `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'packages/*',        // Each package is a project
      '!packages/excluded' // Exclude non-test packages
    ],
  },
})
```

Package-level `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()], // Resolve TypeScript path aliases
  test: {
    environment: 'node', // or 'jsdom' for frontend tests
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
      lines: 70,
      branches: 70,
      functions: 70,
      statements: 70
    }
  }
})
```

**API Integration Testing with Vitest + MSW**:
```typescript
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { beforeAll, afterAll, afterEach, describe, test, expect } from 'vitest'

const server = setupServer()

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('API endpoint', () => {
  test('returns expected data', async () => {
    server.use(
      http.get('/api/foo', () => HttpResponse.json({ foo: 'bar' }))
    )
    const response = await fetch('/api/foo')
    const data = await response.json()
    expect(data).toEqual({ foo: 'bar' })
  })
})
```

**API Integration Testing with Vitest + Supertest**:
```typescript
import request from 'supertest'
import { app } from '../src/app' // Total.js app

describe('Total.js API Integration', () => {
  it('should respond with JSON', async () => {
    const res = await request(app)
      .get('/api/users')
      .expect(200)
    expect(res.body).toHaveProperty('users')
  })
})
```

**Implementation Approach**:
- Install Vitest in each package: `pnpm add -D vitest`
- Install MSW for API mocking: `pnpm add -D msw`
- Install Supertest for HTTP testing: `pnpm add -D supertest @types/supertest`
- Configure vitest.config.ts in root and each package
- Use `vite-tsconfig-paths` plugin for path alias resolution
- Set up coverage thresholds (70% unit, 60% integration)
- Use Playwright for E2E tests (critical paths only)

**Alternatives Considered**:
- **Jest**: Mature but slower; ESM support still evolving; heavier configuration
- **Total.js Testing**: Native but less documentation and tooling; not TypeScript-first
- **Mocha + Chai**: Older stack; requires more configuration; less modern features

**References**: 
- Vitest documentation: https://vitest.dev/
- Vitest monorepo guide: https://vitest.dev/guide/projects
- MSW documentation: https://mswjs.io/
- JavaScript testing best practices: https://github.com/goldbergyoni/javascript-testing-best-practices

---

## 4. Performance & Scale Targets

### Decision: Initial Scale for MVP Phase

**Target Metrics**:
- **Concurrent Users**: 100 concurrent users (initial development phase)
- **Throughput**: 500 requests/second sustained
- **API Response Time**: <200ms p95 for standard queries
- **Database Connections**: Pool of 20-50 connections
- **Frontend Bundle Size**: <500KB gzipped for initial load

**Rationale**:
- These targets are appropriate for initial development and testing
- Supabase free tier supports up to 500MB database, 50,000 monthly active users
- Total.js v5 is designed for high performance; these targets are conservative
- Targets can be scaled up in production deployment phase

**Monitoring Strategy**:
- Track metrics via Total.js built-in stats
- Implement structured logging (FR-038)
- Add metrics endpoint with histogram data (FR-038a)
- Use Supabase dashboard for database performance

---

## 5. Total.js Best Practices for Monorepo

### Research Findings: Monorepo Structure Best Practices

**Key Findings from Web Research**:

1. **Directory Organization** (Industry Standard):
```
totaljs-monorepo/
├── packages/
│   ├── api/            # Total.js (backend) project
│   ├── web/            # Frontend app (React/MUI)
│   ├── shared/         # Shared TypeScript code (types, utils)
│   ├── services/       # Additional microservices
│   └── ...
├── .github/            # GitHub Actions/workflows
├── docker-compose.yml  # Container orchestration
├── package.json        # Root tooling/dev scripts
├── tsconfig.json       # Root TypeScript config (project references)
├── pnpm-workspace.yaml # PNPM workspace definition
└── ...
```

2. **Tooling Recommendations** (Web Research):
- **pnpm** for package management (speed, disk efficiency)
- **Changesets** for versioning and publishing (if needed)
- **ESLint/Prettier** for linting and formatting
- **TypeScript project references** for scalable type checking

3. **Total.js Project Structure** (from Context7):
```
/packages/[package-name]/base/
├── index.js                # Entry point (compiled from TypeScript)
├── definitions/            # Global definitions and settings
├── controllers/            # API endpoints (ROUTE, NEWACTION)
├── models/                 # Data schemas
├── public/                 # Static files
└── views/                  # Views (if server-rendered)
```

4. **Total.js Routing Patterns** (from Context7):
```javascript
// From Total.js documentation
exports.install = function() {
    // View routing
    ROUTE('GET /');
    ROUTE('GET /', 'view_name');

    // REST API with authorization ("+" requires auth)
    ROUTE('+GET    /api/users/        --> Users/query');
    ROUTE('+GET    /api/users/{id}/   --> Users/read');
    ROUTE('+POST   /api/users/        --> Users/insert');
    ROUTE('+PUT    /api/users/{id}/   --> Users/update');
    ROUTE('+PATCH  /api/users/{id}/   --> Users/patch');
    ROUTE('+DELETE /api/users/        --> Users/remove');

    // Custom routing
    ROUTE('GET /', custom_action);
};
```

5. **Total.js Action Pattern** (NEWACTION - from Context7):
```javascript
// Modern Total.js v5 pattern for API endpoints
NEWACTION('Todo|read', {
    name: 'Read a specific task',
    input: '*id:UID',
    route: '+API ?',
    action: async function($, model) {
        let response = await DATA.read('tbl_todo')
            .id(model.id)
            .error(404)
            .promise($);
        $.callback(response);
    }
});
```

**Adaptation for Our Monorepo**:
1. Each package follows Total.js structure inside `base/src/`
2. Frontend packages use React/Material UI instead of Total.js views
3. Backend packages use Total.js `NEWACTION` or `ROUTE` for API endpoints
4. Shared packages provide utilities, types, and common code
5. Use PNPM catalog for centralized dependency management
6. Use TypeScript project references for inter-package type sharing

**Key Practices**:
- Use Total.js `ROUTE()` or `NEWACTION()` for defining API endpoints
- Use Total.js schemas for data validation
- Use Total.js `DBMS()` API for database operations
- Use Total.js `controller.authorize()` for authentication middleware
- Use Total.js workers for heavy operations (future)
- Use Total.js FlowStream for business logic composition (future)

**References**: 
- Total.js v5 documentation: https://docs.totaljs.com/total5/
- Total.js Framework 5: https://github.com/totaljs/framework5
- Monorepo best practices: https://monorepo.tools/
- TypeScript monorepo guide: https://maxrohde.com/2021/11/20/the-ultimate-guide-to-typescript-monorepos/

---

## 6. Total.js + TypeScript Integration

### Research Findings: TypeScript with Total.js v5

**Important Discovery from Web Research**:
Total.js v5 is **NOT officially designed for TypeScript-first development**. The framework:
- Is written in JavaScript and optimized for direct JavaScript development
- Does NOT provide built-in TypeScript decorators, types, or integration packages
- Philosophy emphasizes independence from external tooling and simplicity
- Documentation and community confirm minimal official TypeScript support

**However, TypeScript Integration IS Possible**:
Total.js can be used with TypeScript by treating it like any Node.js JavaScript project:
1. Install TypeScript as a development dependency
2. Configure `tsconfig.json` with appropriate settings
3. Compile TypeScript to JavaScript
4. Run Total.js with the compiled JavaScript output
5. Write custom type definitions for Total.js APIs (framework doesn't ship with `.d.ts` files)

**Recommended TypeScript Configuration** (from web research):
```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "NodeNext",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "allowJs": true,
    "resolveJsonModule": true,
    "moduleDetection": "force",
    "isolatedModules": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "outDir": "dist",
    "declaration": false,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

**TypeScript Project References for Monorepo** (from web research):
Root `tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./packages/api" },
    { "path": "./packages/web" },
    { "path": "./packages/shared" }
  ]
}
```

Package-level `tsconfig.json`:
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "references": [
    { "path": "../shared" }
  ]
}
```

**Implementation Strategy (Revised)**:
1. **Acceptance**: Total.js is NOT TypeScript-first; we adapt TypeScript to it
2. **Custom Types**: Create comprehensive type definitions for Total.js APIs in `@types/totaljs`
3. **Compilation Pipeline**: Always compile `.ts` → `.js` before running Total.js
4. **Path Aliases**: Use `vite-tsconfig-paths` or similar for resolving TypeScript path aliases
5. **Type Safety**: Expect to use `any` for some Total.js framework APIs without types
6. **No Decorators**: Unlike NestJS, Total.js doesn't support TypeScript decorators; use functional patterns

**Type Definitions Strategy**:
- Install `@types/node` for Node.js types
- Install `@types/passport` and `@types/passport-jwt` for auth
- Create custom type definitions for Total.js in `packages/shared-types/base/src/`:
  - `totaljs-globals.d.ts` - Global functions (ROUTE, NEWACTION, DBMS, etc.)
  - `totaljs-controller.d.ts` - Controller instance type
  - `totaljs-schema.d.ts` - Schema definition types
  - `totaljs-flow.d.ts` - FlowStream types

**References**: 
- Total.js v5 documentation: https://docs.totaljs.com/total5/
- Total.js Framework 5 GitHub: https://github.com/totaljs/framework5
- TypeScript tsconfig best practices: https://www.totaltypescript.com/tsconfig-cheat-sheet

---

## 7. Total.js + Material UI Integration

### Research Findings: Frontend Strategy

**Important Discovery from Web Research**:
Total.js Platform v5 has its own UI component library (300+ web components) and is designed for vanilla JavaScript/HTML apps. Material UI is React-based. These are fundamentally different approaches.

**Hybrid Architecture Decision**:
- **Backend packages**: Pure Total.js for API endpoints
- **Frontend packages**: React + Material UI for UI components (separate from Total.js UI)
- **Communication**: REST API between React frontend and Total.js backend
- **No Direct Integration**: Material UI and Total.js UI are separate ecosystems

**Total.js UI Components** (from web research):
- 300+ reusable web components (jComponent library)
- Uses `<ui-bind>` for data binding (similar to React state)
- Path-based data management system
- CDN-hosted, MIT licensed
- Great for simple Total.js-only SPAs

**Material UI v5 Integration** (recommended approach):
Since we're using React + MUI, completely separate from Total.js UI:

1. **Frontend Package Structure**:
```
packages/[feature]-frt/base/
├── src/
│   ├── components/         # React + MUI components
│   ├── pages/              # Page components
│   ├── services/           # API client services (call Total.js backend)
│   ├── hooks/              # Custom React hooks
│   ├── theme/              # MUI theme configuration
│   └── App.tsx             # Main app component
├── public/                 # Static assets
├── index.html              # Entry HTML
└── vite.config.ts          # Vite configuration
```

2. **MUI v5 Styling** (from web research):
- Material UI v5 uses **Emotion** for styling (not JSS)
- Use `ThemeProvider` for consistent theming
- Create shared theme in `packages/shared-ui/base/src/theme.ts`
- Pass theme to all frontend packages

3. **Build Setup**:
- Use **Vite** for frontend package builds (fast, ESM-native, great for React)
- Configure Vite proxy to Total.js backend in development
- Vite dev server on port 5173, Total.js API on port 8000
- Production: Build React app, serve static files from Total.js or CDN

**Data Exchange Pattern**:
```
React (MUI) Frontend ←→ REST API ←→ Total.js Backend
     (Port 5173)          (HTTP)      (Port 8000)
```

**Example Vite Config for Development**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
});
```

**MUI Theme Setup**:
```typescript
// packages/shared-ui/base/src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});
```

**Component Integration Examples**:
- **Forms**: Use MUI `<TextField>`, `<Button>` components
- **Data Tables**: Use MUI `<DataGrid>` or `<Table>` with data from Total.js API
- **Dialogs**: Use MUI `<Dialog>`, `<Snackbar>` for notifications
- **Navigation**: Use MUI `<AppBar>`, `<Drawer>` for layout

**Best Practices** (from web research):
- **Separation of Concerns**: Use Total.js ONLY for backend logic; use React+MUI for ALL frontend
- **API-First**: Design RESTful APIs in Total.js that React consumes
- **No Mixing**: Don't try to use Total.js UI components with React - choose one approach
- **Component Distribution**: Bundle React/MUI as static resources
- **Development Workflow**: Run Vite dev server + Total.js backend simultaneously

**References**: 
- Total.js Components: https://www.totaljs.com/components/
- Total.js jComponent: https://github.com/totaljs/jComponent
- Material UI v5: https://mui.com/material-ui/
- Material UI examples: https://mui.com/material-ui/getting-started/example-projects/
- Vite documentation: https://vitejs.dev/

---

## 8. Authentication Architecture

### Research Findings: Passport.js + Supabase + Total.js

**Best Practices from Web Research**:

**1. Password Security**:
- Always hash passwords with bcrypt before storage
- Use salt (bcrypt.genSalt(10)) to protect against rainbow tables
- Never store plain text passwords
- Validate on login with bcrypt.compare()

**2. JWT Token Security**:
- Use strong algorithms: HS256 (symmetric) or RS256 (asymmetric)
- Include minimal data in payload (id, role, issued time)
- Set short lifespans: 15-30 minutes for access tokens
- Use longer-lived refresh tokens (7 days) stored securely
- Always use HTTPS for token transmission
- Store in HTTP-only cookies (web) to prevent XSS attacks

**3. Passport.js JWT Strategy Configuration**:
```javascript
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  const user = await User.findById(jwt_payload.id);
  if (user) return done(null, user);
  else return done(null, false);
}));
```

**4. Total.js Authorization** (from Context7):
```javascript
// controller.authorize() method for securing actions
controller.authorize(function(req, res, callback) {
  // Custom authorization logic
  // Improved version automatically assigns controller.user
  callback(null, true); // Allow access
});
```

**Integration Pattern**:
1. **Supabase Auth** for user management and Row Level Security (RLS)
2. **Passport.js with JWT strategy** for stateless authentication
3. **Total.js middleware** (`controller.authorize()`) for route protection
4. **Row Level Security (RLS)** at database layer for defense-in-depth

**Authentication Flow**:
```
User → Login Request → Total.js API
                           ↓
                    Validate Credentials
                           ↓
                    Generate JWT (15min) + Refresh Token (7d)
                           ↓
                    Return Tokens to Client
                           ↓
User → Authenticated Request (Bearer Token)
                           ↓
                    Passport.js JWT verify
                           ↓
                    Extract user context (controller.user)
                           ↓
                    Set Supabase RLS context (user_id)
                           ↓
                    Supabase query (RLS enforced at DB)
```

**Token Generation Best Practices**:
```javascript
const jwt = require('jsonwebtoken');

// Access token (short-lived)
const accessToken = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Refresh token (long-lived)
const refreshToken = jwt.sign(
  { id: user._id, type: 'refresh' },
  process.env.REFRESH_SECRET,
  { expiresIn: '7d' }
);
```

**Error Handling Best Practices**:
- Provide generic error messages to users ("Invalid credentials")
- Log detailed errors for developers with full context
- Differentiate expired vs invalid tokens in logs (not to users)
- Implement rate limiting on login attempts

**Security Checklist** (from web research):
- ✅ Hash passwords with bcrypt + salt
- ✅ Short-lived JWT tokens (15-30 min)
- ✅ Refresh token mechanism
- ✅ HTTPS everywhere
- ✅ HTTP-only cookies for web clients
- ✅ Row Level Security (RLS) at database
- ✅ Rate limiting on authentication endpoints
- ✅ Token revocation on logout
- ✅ No sensitive data in JWT payload
- ✅ Audit logging for auth events

**Implementation**:
- Middleware in `packages/shared-auth/base/src/`
- JWT tokens issued on login with 15-minute expiration
- Refresh tokens with 7-day expiration stored in HTTP-only cookies
- Supabase client initialized with user JWT for RLS enforcement
- Total.js `controller.authorize()` for protected routes

**References**: 
- Passport.js JWT guide: http://www.passportjs.org/packages/passport-jwt/
- Node.js authentication best practices: https://dev.to/sushantrahate/nodejs-authentication-best-practices-and-key-strategies-1npj
- Avoiding JWT pitfalls: https://moldstud.com/articles/p-avoiding-common-pitfalls-when-using-jwt-with-passportjs-essential-tips-for-developers
- Supabase Auth: https://supabase.com/docs/guides/auth

---

## 9. Rate Limiting Strategy

### Research Findings: Redis + Total.js

**Implementation Decision**: In-Memory First, Redis Later

**Initial Setup** (Development):
- Use Total.js built-in memory storage for rate limiting
- Implement simple sliding window counter
- Store in Total.js `CACHE()` system

**Production Setup** (Future):
- Use Redis for distributed rate limiting
- Install `ioredis` package
- Configure Total.js to use Redis as cache backend
- Rate limits: Read 100/min, Write 60/min per user

**Rationale**:
- In-memory rate limiting sufficient for initial development
- Redis adds deployment complexity not needed for MVP
- Constitution Principle XII allows graceful degradation

---

## 10. Logging & Observability

### Research Findings: Structured Logging with Total.js

**Total.js Logging**:
- Total.js has built-in logging: `LOGGER()`, `F.error()`, `F.log()`
- Supports structured logging with JSON format
- Can write to files or stdout

**Implementation Strategy**:
1. Configure Total.js logger to output JSON format
2. Add custom middleware to log all HTTP requests
3. Include required fields: timestamp, level, service, userId, path, method, statusCode, duration
4. Use Winston or Pino for additional log processing if needed

**Metrics Endpoint**:
- Create `/metrics` endpoint in backend packages
- Use Total.js built-in stats: `F.stats`
- Expose metrics in Prometheus format (plain text)
- Include: http_requests_total, http_request_duration_seconds, database_query_duration

**Reference**: Total.js logging: https://docs.totaljs.com/total5/408180/

---

## 11. Environment Configuration

### Research Findings: Total.js Config System

**Total.js Configuration**:
- Total.js v5 uses `config` or `config-{env}` files
- Supports environment-specific configuration
- Can read from environment variables automatically

**Our Approach**:
- Use `.env` file for sensitive credentials (via `dotenv` package)
- Use Total.js config files for application settings
- `.env.example` template in repository
- `.env` in `.gitignore`

**Required Variables**:
```
NODE_ENV=development
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d
```

---

## Summary of Technology Decisions

| Component | Technology Choice | Rationale |
|-----------|------------------|-----------|
| **Database ORM** | Total.js DBMS + Custom Repository Pattern | Native Total.js integration, QueryBuilder API, flexibility |
| **Build Tool** | PNPM Workspaces + Total.js Native | Simple, sufficient for initial phase, monorepo support |
| **Testing Framework** | Vitest + MSW/Supertest | Modern, fast, excellent TypeScript support, monorepo-friendly |
| **Frontend Build** | Vite | Fast, ESM-native, great DX, React support |
| **Rate Limiting** | Total.js Cache (Memory) → Redis (Future) | Simple start, scalable path |
| **Logging** | Total.js Logger (JSON format) | Built-in, structured logging support |
| **Auth** | Passport.js + JWT + Supabase Auth + RLS | Standard pattern, secure, Supabase integration |
| **TypeScript** | Standard tsc compilation (not Total.js native) | Realistic approach given Total.js is JS-first |
| **Frontend UI** | React + Material UI v5 (separate from Total.js) | Modern, component-rich, separate from backend |

---

## Key Insights from Web Research

### Critical Findings:

1. **Total.js is NOT TypeScript-First**:
   - Framework is written in JavaScript, optimized for JS development
   - NO built-in TypeScript support, decorators, or type definitions
   - TypeScript CAN be used but requires manual type definitions
   - Must compile TS → JS before running Total.js

2. **Total.js UI vs Material UI**:
   - Total.js has its own 300+ component library (jComponent)
   - Material UI is React-based, completely separate ecosystem
   - Decision: Use React+MUI for frontend, Total.js only for backend API
   - No mixing - these are different paradigms

3. **Monorepo Best Practices**:
   - Use PNPM for package management (speed, disk efficiency)
   - Use TypeScript project references for inter-package types
   - Use `vite-tsconfig-paths` for path alias resolution
   - Vitest multi-project config for monorepo testing

4. **Testing Strategy**:
   - Vitest is the modern choice (fast, ESM-native, TypeScript-friendly)
   - MSW for API mocking in tests
   - Supertest for HTTP integration tests
   - AAA pattern (Arrange, Act, Assert) for clarity
   - 70% unit coverage, 60% integration coverage targets

5. **Authentication Security**:
   - Always hash passwords with bcrypt + salt
   - Short-lived JWT (15-30 min) + long-lived refresh tokens (7 days)
   - HTTP-only cookies for web clients (prevent XSS)
   - Row Level Security (RLS) at database for defense-in-depth
   - Rate limiting on auth endpoints
   - HTTPS everywhere

6. **Total.js DBMS QueryBuilder**:
   - Built-in fluent API for database queries
   - Support for PostgreSQL (Supabase), MongoDB, MySQL
   - ILIKE for case-insensitive search
   - Promise-based API
   - Can wrap in Repository pattern for abstraction

### Architecture Implications:

**Frontend-Backend Separation**:
```
┌─────────────────────────────────┐
│  React + Material UI Frontend   │  (Port 5173)
│  (Vite dev server)              │
└────────────┬────────────────────┘
             │ HTTP/REST API
             ↓
┌─────────────────────────────────┐
│  Total.js Backend API           │  (Port 8000)
│  (NEWACTION, ROUTE, DBMS)       │
└────────────┬────────────────────┘
             │ SQL
             ↓
┌─────────────────────────────────┐
│  Supabase PostgreSQL            │
│  (RLS enabled)                  │
└─────────────────────────────────┘
```

**TypeScript Compilation Flow**:
```
Source (.ts) → tsc → JavaScript (.js) → Total.js Runtime
   ↓
Custom Types (@types/totaljs)
```

**Testing Architecture**:
```
Unit Tests (Vitest)
   ↓
Integration Tests (Vitest + MSW/Supertest)
   ↓
E2E Tests (Playwright)
```

---

## Next Steps (Phase 1)

With all technical decisions resolved and validated through web research and Context7:

1. ✅ **research.md** - Complete with web research findings
2. 📝 **data-model.md** - Define entity structures for setup phase
3. 📝 **contracts/** - API contract definitions
4. 📝 **quickstart.md** - Developer onboarding guide with updated patterns
5. 📝 **Update agent context** - Run `update-agent-context.sh copilot`
6. 📝 **Re-evaluate Constitution Check** - Verify alignment with updated decisions

---

## References & Sources

### Official Documentation:
- Total.js v5: https://docs.totaljs.com/total5/
- Total.js Framework 5: https://github.com/totaljs/framework5
- Total.js Components: https://www.totaljs.com/components/
- Material UI v5: https://mui.com/
- Vitest: https://vitest.dev/
- Supabase: https://supabase.com/docs

### Best Practices Guides:
- TypeScript Monorepo Guide: https://maxrohde.com/2021/11/20/the-ultimate-guide-to-typescript-monorepos/
- JavaScript Testing Best Practices: https://github.com/goldbergyoni/javascript-testing-best-practices
- Node.js Authentication Best Practices: https://dev.to/sushantrahate/nodejs-authentication-best-practices-and-key-strategies-1npj
- Monorepo Tools: https://monorepo.tools/
- TypeScript TSConfig: https://www.totaltypescript.com/tsconfig-cheat-sheet

### Research Date:
- Initial research: 2025-11-17
- Web research update: 2025-11-17
- Context7 integration: 2025-11-17

---

**Status**: ✅ Research Complete - All NEEDS CLARIFICATION items resolved with web research validation and Context7 documentation
