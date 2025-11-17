# Implementation Plan: Initialize Universo Platformo Total.js Project

**Branch**: `001-setup-universo-platformo-totaljs` | **Date**: 2025-11-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-setup-universo-platformo-totaljs/spec.md`

**Note**: This document follows the planning workflow from agent instructions.

## Summary

Initialize and set up Universo Platformo Total.js as a monorepo project using PNPM workspace management. The project will use Total.js Platform v5 with TypeScript as the full-stack framework, Material UI for frontend components, and Supabase for database with Passport.js authentication. The implementation will follow the conceptual structure of Universo Platformo React (monorepo, package separation, entity hierarchies) while implementing Total.js v5 best practices and avoiding legacy patterns from the reference implementation.

## Technical Context

**Language/Version**: TypeScript v5.3.0+ with Total.js Platform v5 (minimum v5.0.0)  
**Primary Dependencies**: 
- Total.js Platform v5 (fullstack framework)
- TypeScript v5.3.0+
- Material UI (MUI) v5.14.0+
- Passport.js v0.7.0+ with JWT strategy
- Supabase client v2.38.0+ (@supabase/supabase-js)
- PNPM v8.0.0+ (package manager)
- NEEDS CLARIFICATION: ORM choice (TypeORM vs Total.js native database tools)
- NEEDS CLARIFICATION: Build orchestration tool (Turbo vs Total.js native tools)
- NEEDS CLARIFICATION: Testing framework (Jest/Vitest vs Total.js native testing)

**Storage**: Supabase (PostgreSQL-based) as primary database with abstraction layer (Repository/Adapter pattern) for future DBMS flexibility

**Testing**: 
- Unit tests: 70% coverage target
- Integration tests: 60% of API endpoints
- E2E tests: critical user paths only
- NEEDS CLARIFICATION: Testing framework compatible with Total.js and TypeScript

**Target Platform**: Full-stack web application using Total.js v5 (Node.js >=18.0.0)

**Project Type**: Monorepo with PNPM workspaces, packages organized with -frt (frontend) and -srv (backend) separation, each containing base/ directory

**Performance Goals**: 
- TypeScript compilation for all packages in <2 minutes
- Development server hot reload in <3 seconds
- Initial project setup (clone + pnpm install) in <5 minutes
- API response times: <200ms p95 for standard queries
- NEEDS CLARIFICATION: Target concurrent users and throughput (req/s)

**Constraints**: 
- Must follow Total.js v5 best practices (official documentation)
- Material UI component library for all frontend components
- Supabase integration with Row Level Security (RLS) at database layer
- Bilingual documentation (English + Russian) - NON-NEGOTIABLE
- No separate docs/ directory (will be external)
- No pre-created AI agent files (user creates as needed)
- Minimum 8GB RAM, 4 CPU cores for development environment

**Scale/Scope**: 
- Initial setup phase: repository structure, basic packages, configuration
- Foundation for future features: Clusters, Metaverses, Uniks with hierarchical entities
- Designed for multi-package monorepo with potential future extraction to separate repos
- NEEDS CLARIFICATION: Initial target user scale and data volume for performance testing

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Principle I - Monorepo Package Architecture**:
- [x] Packages properly organized in `packages/` directory (will be created)
- [x] Frontend/backend separation follows `-frt`/`-srv` naming convention (planned)
- [x] Each package contains root `base/` directory (planned structure)

**Principle II - Technology Stack Standardization**:
- [x] Total.js Platform v5 used for fullstack development (specified)
- [x] TypeScript used for type safety (specified v5.3.0+)
- [x] Material UI (MUI) used for frontend components (specified v5.14.0+)
- [x] Total.js best practices followed (research phase will clarify specific patterns)

**Principle III - Bilingual Documentation (NON-NEGOTIABLE)**:
- [x] English documentation created first (planned workflow)
- [x] Russian translation planned as exact structural copy (defined in spec FR-008)
- [x] README.md and README-RU.md pattern followed (per FR-007)

**Principle IV - Database Flexibility**:
- [x] Supabase implementation planned (primary database FR-015)
- [x] Database access patterns allow future DBMS integration (abstraction layer FR-016)
- [x] Passport.js with Supabase connector for authentication (FR-014, FR-017)

**Principle V - Component-Based Frontend**:
- [x] Component reusability considered for similar entity structures (hierarchy design in spec)
- [x] Material UI components utilized (FR-013)

**Principle VI - Test-Driven Development**:
- [x] Integration tests planned for new functionality (FR-037: 60% endpoint coverage)
- [x] Contract tests planned for inter-package communication (FR-037b)
- [x] Test strategy defined in specification (FR-037: 70% unit, 60% integration, E2E for critical paths)

**Principle VII - Issue & PR Management**:
- [x] Issue created following `.github/instructions/github-issues.md` (to be created during implementation)
- [x] Labels applied per `.github/instructions/github-labels.md` (FR-019, FR-020)
- [x] Bilingual format prepared for Issue and PR (per instruction files)

**Principle IX - Dependency Management & Consistency**:
- [x] PNPM catalog planned in pnpm-workspace.yaml (FR-006c)
- [x] Build orchestration tool planned (FR-025e - need to research Total.js compatibility)

**Principle X - Data Access Patterns**:
- [x] ORM repository pattern planned (FR-016c - need to research Total.js ORM options)
- [x] Central entity registry planned (FR-016d)
- [x] Per-package migrations with central registry (FR-016e)

**Principle XI - API Consistency & Standards**:
- [x] Pagination standards defined (FR-033: limit, offset, sortBy, sortOrder)
- [x] Error schema standardized (FR-034: error, message, statusCode, timestamp, path, details)
- [x] Rate limiting planned (FR-036: Redis-based, differentiated read/write)
- [x] RESTful URL hierarchy defined (FR-035)

**Principle XII - Observability & Operational Excellence**:
- [x] Structured JSON logging planned (FR-038: timestamp, level, service, userId, path, method, statusCode, duration)
- [x] Metrics endpoint planned (FR-038a)
- [x] Timing instrumentation planned (FR-038d)

**GATE STATUS**: ✅ PASS - All principles addressed in specification. Research phase needed to resolve Total.js-specific implementation details (ORM choice, build tools, testing framework).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Repository Root Structure
/
├── packages/                     # All feature packages (per Constitution Principle I)
│   ├── shared-common/            # Shared utilities and common code
│   │   └── base/
│   │       ├── src/
│   │       │   ├── types/        # TypeScript shared types
│   │       │   ├── utils/        # Utility functions
│   │       │   └── constants/    # Shared constants
│   │       └── tests/
│   │
│   ├── shared-auth/              # Shared authentication package
│   │   └── base/
│   │       ├── src/
│   │       │   ├── passport/     # Passport.js configuration
│   │       │   ├── strategies/   # Auth strategies (JWT, Supabase)
│   │       │   └── middleware/   # Auth middleware
│   │       └── tests/
│   │
│   ├── shared-database/          # Database abstraction layer
│   │   └── base/
│   │       ├── src/
│   │       │   ├── repositories/ # Repository pattern base classes
│   │       │   ├── adapters/     # Database adapters (Supabase, etc.)
│   │       │   └── migrations/   # Migration registry
│   │       └── tests/
│   │
│   └── shared-ui/                # Shared MUI theme and components
│       └── base/
│           ├── src/
│           │   ├── theme/        # MUI theme configuration
│           │   ├── components/   # Reusable MUI components
│           │   └── layouts/      # Layout components
│           └── tests/
│
├── .github/                      # GitHub configuration
│   ├── instructions/             # Contribution guidelines
│   └── workflows/                # CI/CD workflows (future)
│
├── .specify/                     # Specify workflow files
│   ├── memory/
│   ├── scripts/
│   └── templates/
│
├── specs/                        # Feature specifications
│   └── 001-setup-universo-platformo-totaljs/
│
├── pnpm-workspace.yaml          # PNPM workspace configuration
├── package.json                 # Root package.json with workspace scripts
├── tsconfig.json                # Root TypeScript configuration
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .env.example                 # Environment variable template
├── .gitignore                   # Git ignore patterns
├── README.md                    # English documentation
└── README-RU.md                 # Russian documentation
```

**Structure Decision**: 

For the initial setup phase, we create **shared utility packages** rather than feature packages since this is the foundation setup. The structure follows these principles:

1. **Shared packages** (`shared-*`) contain reusable functionality across all future feature packages
2. **No -frt/-srv suffix** for shared packages as they don't represent feature frontend/backend split (per FR-006b)
3. **base/ directory** in each package for future alternative implementations
4. **Testing infrastructure** in each package (unit, integration, contract tests)

Future feature packages (e.g., `clusters-frt`, `clusters-srv`, `metaverses-frt`, `metaverses-srv`) will follow the -frt/-srv naming convention and be added in subsequent feature implementations.

## Complexity Tracking

**No violations** - All Constitution principles are followed in the specification. The project structure aligns with Constitution requirements and no complexity justifications are needed.
