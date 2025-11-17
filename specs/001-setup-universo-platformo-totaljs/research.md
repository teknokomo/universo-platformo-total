# Research & Technology Decisions

**Feature**: 001-setup-universo-platformo-totaljs  
**Phase**: Phase 0 - Research  
**Date**: 2025-11-17  
**Purpose**: Resolve all "NEEDS CLARIFICATION" items from Technical Context and establish concrete technology choices for Total.js Platform v5 implementation

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

### Decision: Use Total.js Flow with Custom Repository Pattern

**Rationale**:
- Total.js Platform v5 provides native database abstraction through Total.js Flow
- Total.js Flow supports multiple databases (PostgreSQL, MongoDB, MySQL) natively
- Using Total.js native tools ensures better integration with the framework
- TypeORM is not officially recommended for Total.js v5 according to documentation

**Implementation Approach**:
- Use Total.js `DBMS()` API for database operations
- Implement Repository pattern manually on top of Total.js DBMS
- Create adapter interfaces for future DBMS switching
- Use Total.js schema definitions for data validation

**Alternatives Considered**:
- **TypeORM**: Popular but adds unnecessary complexity; not aligned with Total.js patterns
- **Prisma**: Modern ORM but introduces different mental model from Total.js
- **Raw SQL**: Too low-level; violates Constitution Principle X

**Reference**: Total.js v5 documentation on databases: https://docs.totaljs.com/total5/40814001/

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

**Rationale**:
- Vitest is fast, modern, and has excellent TypeScript support
- Native ESM support aligns with Total.js v5 module system
- Compatible with Total.js project structure
- Unified testing framework for unit, integration, and E2E tests
- Built-in coverage reporting
- Compatible with existing ecosystem (similar API to Jest)

**Implementation Approach**:
- Install Vitest in each package (`pnpm add -D vitest`)
- Configure vitest.config.ts in each package and root
- Use Vitest for unit tests (70% coverage target)
- Use Vitest with Supertest for integration tests (60% API endpoint coverage)
- Use Playwright + Vitest for E2E tests (critical paths only)

**Alternatives Considered**:
- **Jest**: Mature but slower; ESM support still evolving
- **Total.js Testing**: Native but less documentation and tooling
- **Mocha + Chai**: Older stack; more configuration needed

**Reference**: Vitest documentation: https://vitest.dev/

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

### Research Findings: Total.js + Monorepo Patterns

**Total.js Project Structure**:
Total.js v5 follows a modular structure that can be adapted to monorepo:

```
/packages/[package-name]/base/
├── index.js                # Entry point (will be compiled from TypeScript)
├── definitions/            # Global definitions and settings
├── controllers/            # API endpoints
├── models/                 # Data schemas
├── public/                 # Static files (for frontend packages)
└── views/                  # Views (for server-rendered pages if needed)
```

**Adaptation for Our Monorepo**:
1. Each package follows Total.js structure inside `base/src/`
2. Frontend packages use React/Material UI instead of Total.js views
3. Backend packages use Total.js controllers for API endpoints
4. Shared packages provide utilities for both frontend and backend

**Key Practices**:
- Use Total.js `ROUTE()` for defining API endpoints
- Use Total.js schemas for data validation
- Use Total.js workers for heavy operations
- Use Total.js flow for business logic composition

**Reference**: Total.js v5 documentation: https://docs.totaljs.com/total5/

---

## 6. Total.js + TypeScript Integration

### Research Findings: TypeScript with Total.js v5

**Official Approach**:
- Total.js v5 supports TypeScript natively
- Use `tsc` for compilation or Total.js can handle `.ts` files directly
- Configure tsconfig.json with `"module": "ESNext"` and `"target": "ES2022"`
- Use ES modules (`import`/`export`) not CommonJS

**Implementation Strategy**:
1. Root `tsconfig.json` with shared compiler options
2. Each package extends root config with package-specific settings
3. Path aliases for cross-package imports: `@packages/*`
4. Compile TypeScript in each package to `dist/` directory
5. Use `.js` in Total.js entry points that import from `dist/`

**Type Definitions**:
- Install `@types/node` for Node.js types
- Install `@types/passport` and `@types/passport-jwt` for auth
- Create custom type definitions for Total.js APIs in `shared-common/base/src/types/`

**Reference**: Total.js TypeScript guide: https://docs.totaljs.com/total5/40840001/

---

## 7. Total.js + Material UI Integration

### Research Findings: Frontend Strategy

**Approach**: Hybrid Architecture
- **Backend packages**: Pure Total.js for API endpoints
- **Frontend packages**: React + Material UI for UI components
- **Communication**: REST API between frontend and backend

**Frontend Package Structure**:
```
packages/[feature]-frt/base/
├── src/
│   ├── components/         # React + MUI components
│   ├── pages/              # Page components
│   ├── services/           # API client services
│   ├── hooks/              # Custom React hooks
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── index.html              # Entry HTML
```

**Build Setup**:
- Use Vite for frontend package builds (fast, ESM-native)
- Configure Vite to work with Total.js backend
- Serve frontend from Total.js static file serving in development
- Separate deployment of frontend build in production

**MUI Theme**:
- Create `shared-ui` package with MUI theme configuration
- Use `createTheme()` for consistent styling
- Export theme for use in all frontend packages

**Reference**: 
- Material UI documentation: https://mui.com/
- Vite documentation: https://vitejs.dev/

---

## 8. Authentication Architecture

### Research Findings: Passport.js + Supabase + Total.js

**Integration Pattern**:
1. **Supabase Auth** for user management and authentication
2. **Passport.js with JWT strategy** for stateless authentication
3. **Total.js middleware** for route protection
4. **Row Level Security (RLS)** at database layer

**Flow**:
```
User → Frontend → API (Total.js)
                   ↓
            Passport.js JWT verify
                   ↓
            Extract user context
                   ↓
            Set RLS context (user_id)
                   ↓
            Supabase query (RLS enforced)
```

**Implementation**:
- Middleware in `shared-auth` package
- JWT tokens issued on login with 1-hour expiration
- Refresh tokens with 7-day expiration
- Supabase client initialized with user JWT for RLS

**Reference**: 
- Passport.js documentation: http://www.passportjs.org/
- Supabase Auth documentation: https://supabase.com/docs/guides/auth

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
| **Database ORM** | Total.js DBMS + Custom Repository Pattern | Native Total.js integration, flexibility |
| **Build Tool** | PNPM Workspaces + Total.js Native | Simple, sufficient for initial phase |
| **Testing Framework** | Vitest | Modern, fast, excellent TypeScript support |
| **Frontend Build** | Vite | Fast, ESM-native, great DX |
| **Rate Limiting** | Total.js Cache (Memory) → Redis (Future) | Simple start, scalable path |
| **Logging** | Total.js Logger (JSON format) | Built-in, structured logging support |
| **Auth** | Passport.js + JWT + Supabase Auth | Standard pattern, Supabase integration |

---

## Next Steps (Phase 1)

With all technical decisions resolved, proceed to Phase 1:
1. Create `data-model.md` - Define entity structures for setup phase
2. Create `contracts/` - API contract definitions (if applicable)
3. Create `quickstart.md` - Developer onboarding guide
4. Update agent context via `update-agent-context.sh copilot`
5. Re-evaluate Constitution Check with concrete decisions

---

**Status**: ✅ Research Complete - All NEEDS CLARIFICATION items resolved
