# Feature Specification: Initialize Universo Platformo Total.js Project

**Feature Branch**: `001-setup-universo-platformo-totaljs`  
**Created**: 2025-11-15  
**Status**: Draft  
**Input**: User description: "Initialize and set up Universo Platformo Total.js - a full-stack platform implementation using Total.js Framework (v5) with TypeScript, following the conceptual structure of Universo Platformo React but adapted for the Total.js technology stack."

## User Scenarios & Testing *(mandatory)*

**Note on Dependencies**: User stories are ordered by priority (P1 through P5). Lower priority stories depend on higher priority ones: P2 depends on P1 being complete, P3 depends on P1-P2, and so on. This dependency structure reflects the implementation order required to build the project foundation.

### User Story 1 - Repository Foundation Setup (Priority: P1)

As a developer starting work on the Universo Platformo Total.js project, I need a properly initialized monorepo with PNPM workspace configuration, basic project structure, and essential documentation so that I can begin implementing features on a solid foundation.

**Why this priority**: This is the foundation upon which all other work depends. Without proper repository setup, no development can proceed. It establishes the project structure, tooling, and conventions that will guide all future development.

**Dependencies**: None (this is the first step)

**Independent Test**: Can be fully tested by cloning the repository, running `pnpm install`, and verifying that the monorepo structure is correctly set up with working package management, and that all README files (English and Russian) are present and accurate.

**Acceptance Scenarios**:

1. **Given** an empty repository, **When** a developer clones it and runs `pnpm install`, **Then** all dependencies install successfully and the workspace configuration is properly recognized
   - **Alternate Flow**: If PNPM is not installed, error message guides developer to https://pnpm.io/installation
   
2. **Given** the initialized repository, **When** a developer views the root README files (README.md and README-RU.md), **Then** they find comprehensive documentation in both English and Russian with identical structure and content
   - **Alternate Flow**: If files are out of sync, validation process detects and reports structural differences
   
3. **Given** the monorepo structure, **When** a developer navigates to the packages directory, **Then** they find it properly structured with placeholder packages following the naming convention (e.g., `*-frt` for frontend, `*-srv` for backend)
   
4. **Given** the project configuration, **When** a developer runs linting or formatting commands, **Then** the tools execute successfully across all packages in the workspace
   - **Alternate Flow**: If linting errors exist, they are clearly reported with file path and line number

---

### User Story 2 - GitHub Repository Management (Priority: P2)

As a project maintainer, I need a well-organized GitHub repository with appropriate labels for issues and pull requests, and clear guidelines for contributions so that the team can efficiently manage and track work.

**Dependencies**: Requires P1 (Repository Foundation) to be complete

**Why this priority**: Good repository organization is essential for team collaboration and project management. It comes after basic setup but before feature implementation, as it establishes the workflow and conventions the team will follow.

**Independent Test**: Can be fully tested by viewing the GitHub repository's issues section and verifying that all required labels are present with correct descriptions, and that instruction files (.github/instructions/*) are accessible and provide clear guidance.

**Acceptance Scenarios**:

1. **Given** the GitHub repository, **When** a maintainer views the labels list, **Then** they see all standard labels defined according to the github-labels.md guidelines
2. **Given** a new contributor, **When** they read the .github/instructions files, **Then** they understand how to create issues following github-issues.md standards
3. **Given** a developer creating a pull request, **When** they follow the github-pr.md guidelines, **Then** their PR has all required information and follows the established format

---

### User Story 3 - TypeScript and Total.js Configuration (Priority: P3)

As a developer, I need properly configured TypeScript settings and Total.js framework setup so that I can write type-safe code using Total.js v5 best practices.

**Dependencies**: Requires P1 (Repository Foundation) and P2 (GitHub Management) to be complete

**Why this priority**: While essential for development, this can be configured after the basic repository structure is in place. It's needed before actual feature implementation begins.

**Independent Test**: Can be fully tested by creating a sample TypeScript file in one of the packages, running the TypeScript compiler, and verifying that it compiles successfully with proper type checking and follows Total.js v5 conventions.

**Acceptance Scenarios**:

1. **Given** a properly configured TypeScript project, **When** a developer writes TypeScript code with type errors, **Then** the compiler catches and reports these errors appropriately with file path and line number
   - **Alternate Flow**: If TypeScript version is incompatible, error message indicates required version
   
2. **Given** the Total.js framework setup, **When** a developer creates a basic Total.js application structure, **Then** it follows Total.js v5 best practices from official documentation
   - **Alternate Flow**: If Total.js is not properly installed, error message provides installation guidance
   
3. **Given** the monorepo packages, **When** a developer imports types from one package into another using path aliases, **Then** TypeScript correctly resolves and validates the types across packages
   - **Alternate Flow**: If circular dependencies exist, build fails with clear error message indicating the dependency cycle

---

### User Story 4 - Database Integration Foundation (Priority: P4)

As a developer, I need basic Supabase integration setup with authentication configuration so that future features can leverage database and auth capabilities.

**Dependencies**: Requires P1-P3 to be complete (especially P3 for TypeScript configuration)

**Why this priority**: Database integration is needed for feature implementation but can be configured after the core project structure is established. It's set up with abstraction to allow for future DBMS expansion.

**Independent Test**: Can be fully tested by configuring Supabase credentials in .env file, running a connection test, and verifying that the authentication setup (Passport.js with Supabase connector) can successfully initialize.

**Acceptance Scenarios**:

1. **Given** Supabase credentials in .env, **When** the application initializes, **Then** it successfully connects to the Supabase instance and logs connection success
   - **Alternate Flow**: If .env is missing, application fails with clear message to copy .env.example to .env
   - **Alternate Flow**: If credentials are invalid, error message indicates which variable is incorrect and how to obtain valid credentials
   
2. **Given** the authentication configuration, **When** Passport.js initializes with the Supabase strategy, **Then** the authentication middleware is properly configured and JWT validation works
   - **Alternate Flow**: If JWT_SECRET is missing, application fails with clear error message
   
3. **Given** the database abstraction layer, **When** reviewing the code structure, **Then** interfaces clearly define CRUD operations and adapter implementation pattern is documented

---

### User Story 5 - UI Framework Integration (Priority: P5)

As a frontend developer, I need Material-UI (MUI) integrated into the frontend packages so that I can build consistent, professional user interfaces following the established design system.

**Dependencies**: Requires P1-P3 to be complete (TypeScript and build configuration needed for MUI)

**Why this priority**: UI framework integration is necessary for building features but comes after core infrastructure is in place. It can be tested independently by creating sample components.

**Independent Test**: Can be fully tested by creating a sample frontend component using MUI components, running the development server, and verifying that MUI styles and theming work correctly.

**Acceptance Scenarios**:

1. **Given** a frontend package with MUI installed, **When** a developer imports and uses MUI components, **Then** they render correctly with proper styling and no console errors
   - **Alternate Flow**: If MUI is not properly installed, import errors clearly indicate missing package
   
2. **Given** the MUI theme configuration, **When** the application loads, **Then** the theme is consistently applied across all MUI components following the custom theme settings
   - **Alternate Flow**: If theme configuration is missing, MUI uses default theme but logs warning about missing customization
   
3. **Given** a frontend component, **When** it uses MUI's responsive design features, **Then** the component adapts correctly to different screen sizes (mobile, tablet, desktop)

---

### Edge Cases

- What happens when a developer tries to install dependencies without PNPM installed? (Error message should guide them to install PNPM with installation URL)
- How does the system handle when Supabase credentials are missing or invalid? (Clear error messages with guidance on where to configure credentials, which environment variables are required)
- What happens when trying to add a new package that doesn't follow the naming convention? (Linting or validation should warn about convention violations, documentation should explain the naming standard)
- How does the build process handle TypeScript compilation errors across multiple packages? (Build should fail fast with clear indication of which package has errors, including file path and line number)
- What happens when documentation files (English vs Russian) get out of sync? (Manual validation process should detect mismatches in structure, number of sections, or line count)
- How does the system handle circular dependencies between packages in the monorepo? (PNPM workspace should detect and report circular dependency errors, build process should fail with clear error message)
- What happens when two packages depend on conflicting versions of the same dependency? (PNPM catalog enforces consistent versions; conflicts should be resolved by updating catalog or justifying override in package README)
- How does the application behave when Node.js version is incompatible with Total.js v5? (Should check Node.js version on startup and display error with required version)
- What happens when .env file is missing on first startup? (Application should fail gracefully with message to copy .env.example to .env and configure values)
- How does authentication handle expired JWT tokens? (Should return 401 status with clear error message, frontend should redirect to login or refresh token)
- What happens when rate limit is exceeded for a user? (API returns 429 Too Many Requests with Retry-After header indicating seconds until limit resets)
- How does the system handle database connection failures during operation? (Should implement retry logic with exponential backoff up to 3 attempts, then return 503 Service Unavailable with clear error message)
- What happens when RLS policies deny access to a resource? (Database query returns empty result or access denied error; API returns 403 Forbidden with message "Access denied to resource")
- How does pagination handle invalid offset values (negative or beyond total count)? (Returns empty array with proper pagination headers showing no results; does not error)
- What happens when API receives malformed JSON in request body? (Returns 400 Bad Request with validation error details mapping field names to specific error messages)
- How does the system behave when Redis (rate limiter) is unavailable? (Should degrade gracefully: log warning, skip rate limiting temporarily, continue serving requests)

## Requirements *(mandatory)*

### Critical Architectural Requirements

**MODULAR ARCHITECTURE (NON-NEGOTIABLE)**:

- **FR-000**: ALL functionality MUST be implemented in modular packages within the `packages/` directory. Implementation of features outside of `packages/` is ABSOLUTELY PROHIBITED, with ONLY the following exceptions:
  - Root package.json, pnpm-workspace.yaml, tsconfig.json (workspace configuration)
  - .eslintrc, .prettierrc, .gitignore (tooling configuration)
  - README.md, README-RU.md (repository documentation)
  - .github/ directory (GitHub configuration)
  - .specify/ directory (specification workflow)
  - specs/ directory (feature specifications)
  - .vscode/ directory (editor configuration)

- **FR-000a**: This modular architecture is MANDATORY because packages are designed to be gradually extracted into separate repositories as the project evolves. Non-modular implementation prevents this planned evolution and creates unacceptable technical debt.

- **FR-000b**: All code reviews MUST verify that no feature code exists outside of `packages/` directory. Pull requests that violate this requirement MUST be rejected.

- **FR-000c**: This project follows the modular package architecture of Universo Platformo React (https://github.com/teknokomo/universo-platformo-react), which serves as the conceptual reference for package organization and structure.

### Functional Requirements

**Repository Structure & Package Management**

- **FR-001**: Project MUST be configured as a monorepo using PNPM workspace functionality with a `pnpm-workspace.yaml` file defining package locations
- **FR-001a**: The `pnpm-workspace.yaml` MUST specify `packages/*` pattern and configure shared dependency hoisting strategy
- **FR-002**: All packages MUST reside in a `packages/` directory at the repository root. **CRITICAL**: ALL feature functionality MUST be implemented within packages - no business logic, UI components, API routes, or feature code may exist at the repository root or in any directory outside of `packages/`
- **FR-003**: Packages requiring both frontend and backend MUST be split into separate packages following naming convention: `[feature]-frt` (frontend) and `[feature]-srv` (backend). Examples: `clusters-frt`/`clusters-srv`, `metaverses-frt`/`metaverses-srv`
- **FR-003a**: The separation into frontend and backend packages enables independent deployment, scaling, and versioning of each layer
- **FR-004**: Each package MUST contain a `base/` directory at its root containing the primary implementation. This structure supports future alternative technology stack implementations in sibling directories (e.g., `base/` for Total.js, future `react/` for React version)
- **FR-005**: Root directory MUST contain `package.json` with workspace configuration for PNPM, including private:true flag and scripts for workspace-wide operations
- **FR-005a**: Root `package.json` MUST define workspace-level scripts for common operations: `build:all`, `test:all`, `lint:all`, `format:all`
- **FR-006**: Project MUST use PNPM as the package manager (not npm or yarn)
- **FR-006a**: Package inter-dependencies within the monorepo MUST use workspace protocol (`workspace:*`) to reference sibling packages
- **FR-006a1**: Each package MUST be designed as a self-contained, independently maintainable module that can be extracted to a separate repository in the future. This is a CORE design principle, not an optional feature. Package extraction will occur as the project matures.
- **FR-006a2**: Package READMEs MUST document the extraction strategy including: package purpose, external dependencies, inter-package dependencies, and migration path to standalone repository
- **FR-006b**: Packages without frontend/backend split (shared utilities, common types) MAY use single package naming without suffix (e.g., `shared-common`, `shared-types`)
- **FR-006c**: Project MUST use PNPM catalog feature in `pnpm-workspace.yaml` to define centralized versions for all shared dependencies across packages. This ensures version consistency and simplifies dependency management across the monorepo
- **FR-006d**: Package-specific dependency versions MAY override catalog versions only with explicit justification documented in package README

**Documentation Requirements**

- **FR-007**: All README files MUST be created in both English (README.md) and Russian (README-RU.md) versions
- **FR-008**: Russian documentation MUST be an exact copy of English content in terms of structure and line count, translated to Russian. Structural parity means: same number of headings, same list structure, same code block placement
- **FR-008a**: Documentation workflow MUST follow this sequence: (1) Create English version, (2) Review and approve English version, (3) Create Russian translation, (4) Verify structural parity between versions
- **FR-008b**: A manual validation process MUST be established to verify EN/RU parity by comparing: number of headings, number of list items, number of code blocks, and overall line count (±5 lines tolerance for translation differences)
- **FR-009**: Root README files MUST include these sections: Project Overview, Relationship to Universo Platformo React, Technology Stack, Prerequisites, Installation Instructions, Project Structure, Getting Started, Contributing Guidelines, and License
- **FR-010**: Each package MUST have its own README.md and README-RU.md with these sections: Package Purpose, Features, Installation, Usage Examples, API Reference (if applicable), Configuration, and Contributing
- **FR-010a**: Code MUST include TypeScript JSDoc comments for all exported functions, classes, and interfaces. Comments MUST be in English only

**Technology Stack**

- **FR-011**: Project MUST use Total.js Framework version 5 (minimum v5.0.0) as the full-stack platform
- **FR-011a**: Project MUST specify Node.js version requirement of >=18.0.0 for compatibility with Total.js v5 and modern TypeScript features
- **FR-011b**: Total.js integration with TypeScript MUST follow the official Total.js TypeScript guide at https://docs.totaljs.com/total5/40840001/ (or latest documentation)
- **FR-012**: All code MUST be written in TypeScript (minimum v5.0.0, recommended ^5.3.0)
- **FR-013**: Frontend packages MUST use Material-UI (MUI) version ^5.14.0 or later from @mui/material package
- **FR-013a**: MUI theme configuration MUST be created using createTheme() with custom color palette, typography, and component style overrides following Material Design principles
- **FR-013b**: A shared theme configuration package SHOULD be created for consistent theming across frontend packages
- **FR-014**: Backend authentication MUST use Passport.js (^0.7.0 or later) with JWT strategy for stateless authentication
- **FR-014a**: Passport.js MUST be configured with Supabase integration using @supabase/supabase-js client for user verification
- **FR-014b**: Authentication flow MUST support: user registration, login, logout, token refresh, and session validation
- **FR-015**: Project MUST support Supabase as the primary database system using @supabase/supabase-js client (^2.38.0 or later)

**Database & Authentication**

- **FR-016**: Database integration MUST be designed with abstraction layer (Repository or Adapter pattern) to allow future support for multiple DBMS beyond Supabase
- **FR-016a**: Database abstraction layer MUST define interfaces for CRUD operations that can be implemented by different database adapters (Supabase, PostgreSQL, MongoDB, etc.)
- **FR-016b**: Adding support for a new DBMS MUST only require: (1) Creating new adapter class implementing database interfaces, (2) Registering adapter in dependency injection container, (3) Updating configuration
- **FR-016c**: If using an ORM (TypeORM or equivalent), all database access MUST go through repository pattern. Raw SQL queries are prohibited unless justified for performance with documented rationale
- **FR-016d**: Database entities MUST be registered in a central registry file that exports all entity classes for ORM initialization. Each package containing entities MUST export its entities array
- **FR-016e**: Database migrations MUST be organized per-package in `src/database/migrations/` directory and exported as arrays. A central migration registry MUST combine all package migrations for execution
- **FR-017**: Authentication system MUST integrate Passport.js with Supabase connector using @supabase/supabase-js for user authentication and verification
- **FR-017a**: Authentication configuration MUST include: JWT secret key, token expiration time, refresh token rotation strategy, and Supabase project URL and anon key
- **FR-017b**: Authentication MUST implement Row Level Security (RLS) pattern where database policies enforce access control, not application code. Middleware MUST set RLS context (user ID) for each authenticated request
- **FR-017c**: Authentication middleware chain MUST follow this order: (1) JWT token verification, (2) RLS context initialization, (3) Rate limiting check, (4) Route handler execution
- **FR-017d**: Authorization MUST support role-based access control with at least these roles: Owner (full CRUD), Admin (CRUD on sub-resources), Editor (create/update), Viewer (read-only)
- **FR-018**: Database configuration MUST be externalized using environment variables with .env file support (using dotenv package or Total.js config system)
- **FR-018a**: Required environment variables MUST include: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (for admin operations), JWT_SECRET, JWT_EXPIRATION
- **FR-018b**: Environment variable naming MUST follow convention: UPPERCASE_WITH_UNDERSCORES for all configuration values
- **FR-018c**: A .env.example file MUST be provided with all required variables (with placeholder values) and MUST be committed to repository
- **FR-018d**: Actual .env file MUST be added to .gitignore to prevent credential commits
- **FR-018e**: Database connection errors MUST provide clear error messages indicating: which environment variable is missing or invalid, how to configure it, and where to find configuration documentation
- **FR-018f**: Database connection error handling MUST implement: initial connection retry logic (3 attempts with exponential backoff), graceful degradation with clear error messages, and connection pool health monitoring

**GitHub Repository Management**

- **FR-019**: Repository MUST define issue labels according to `.github/instructions/github-labels.md` guidelines
- **FR-020**: Repository MUST provide contributor guidelines in `.github/instructions/` directory including github-issues.md, github-pr.md, and i18n-docs.md
- **FR-021**: Issues and pull requests MUST follow the conventions defined in the instruction files

**Build & Development Configuration**

- **FR-022**: Project MUST have TypeScript configuration (tsconfig.json) following Total.js v5 best practices with these compiler options: target: ES2022, module: ESNext, moduleResolution: bundler, strict: true, esModuleInterop: true, skipLibCheck: true, forceConsistentCasingInFileNames: true
- **FR-022a**: TypeScript configuration MUST include path aliases for monorepo packages using paths mapping: "@packages/*": ["./packages/*/base/src"] for convenient cross-package imports
- **FR-022b**: Each package MUST have its own tsconfig.json extending from root tsconfig.json with package-specific include/exclude patterns and outDir configuration
- **FR-022c**: TypeScript compilation MUST output to package-specific dist/ directories which MUST be added to .gitignore
- **FR-023**: Project MUST include ESLint (^8.0.0) configured for TypeScript using @typescript-eslint/parser and @typescript-eslint/eslint-plugin
- **FR-023a**: Project MUST include Prettier (^3.0.0) for code formatting with configuration file (.prettierrc) defining: printWidth: 100, semi: true, singleQuote: true, trailingComma: 'es5', tabWidth: 2
- **FR-023b**: ESLint and Prettier configurations MUST be shared across all packages through root configuration files
- **FR-023c**: Pre-commit hooks SHOULD be configured using husky and lint-staged to automatically run linting and formatting on staged files
- **FR-024**: Each package MUST have its own build configuration in package.json with "build" script that compiles TypeScript to JavaScript
- **FR-024a**: Frontend packages MUST include development server configuration (using Total.js or Vite) with hot module replacement (HMR) support
- **FR-024b**: Backend packages MUST include development server startup script with auto-restart on file changes (using Total.js watch mode or nodemon)
- **FR-025**: Monorepo MUST support building all packages with root-level script `pnpm build:all` that executes builds in correct dependency order
- **FR-025a**: Individual packages MUST be buildable using `pnpm --filter [package-name] build` command
- **FR-025b**: Build process MUST fail fast with clear indication of which package has errors including file path and error message
- **FR-025c**: A root-level `clean` script MUST be provided to remove all dist/ and build/ directories from all packages
- **FR-025d**: Development workflow MUST support watch mode where TypeScript compilation runs automatically on file changes
- **FR-025e**: Project SHOULD use Turbo (or equivalent build orchestration tool compatible with Total.js) for intelligent caching and parallel builds across packages. Build tool MUST respect package dependencies and build in correct order

**API Design Patterns**

- **FR-033**: All REST API list endpoints MUST implement pagination with standard query parameters: `limit` (1-1000, default: 100), `offset` (min: 0, default: 0), `sortBy` (default: 'updated'), `sortOrder` ('asc' | 'desc', default: 'desc')
- **FR-033a**: Paginated responses MUST include these headers: `X-Pagination-Limit`, `X-Pagination-Offset`, `X-Total-Count`, `X-Pagination-Has-More` (boolean indicating if more records exist)
- **FR-034**: All API endpoints MUST return errors in standardized schema with these fields: `error` (error type), `message` (user-facing description), `statusCode` (HTTP status), `timestamp` (ISO 8601), `path` (request path), `details` (optional validation details object)
- **FR-034a**: Validation errors (400) MUST include a `details` object mapping field names to error messages for client-side form handling
- **FR-035**: API resource hierarchies MUST be reflected in URL structure following RESTful nesting: `/unik/:unikId/spaces/:spaceId/canvases/:canvasId`. Nested resources imply ownership and access scoping
- **FR-035a**: Public access endpoints (if any) MUST use separate route prefix like `/public/` to clearly distinguish from authenticated endpoints

**Rate Limiting & Performance**

- **FR-036**: All authenticated API endpoints MUST implement rate limiting to prevent abuse. Rate limits MUST differentiate between read operations (more permissive) and write operations (more restrictive)
- **FR-036a**: Rate limiting SHOULD use Redis-based distributed limiter for multi-instance deployments. Configuration: Read endpoints 100 requests/minute, Write endpoints 60 requests/minute per user
- **FR-036b**: Rate limit responses MUST include headers: `X-RateLimit-Limit` (total allowed), `X-RateLimit-Remaining` (requests left), `X-RateLimit-Reset` (Unix timestamp when limit resets)
- **FR-036c**: When rate limit is exceeded, endpoint MUST return 429 Too Many Requests with `Retry-After` header indicating seconds until limit reset

**Project Organization Standards**

- **FR-026**: Project MUST NOT include a `docs/` directory (documentation will be in a separate repository in the future)
- **FR-027**: Project MUST NOT pre-create AI agent configuration files (user will create these as needed)
- **FR-028**: Package naming MUST follow the convention: `[feature-name]-frt` for frontend and `[feature-name]-srv` for backend. This convention MUST be used consistently throughout all documentation and code
- **FR-028a**: **MODULAR ARCHITECTURE ENFORCEMENT**: All feature implementations MUST be located in `packages/` directory. Code reviews MUST reject PRs that place feature code outside of packages. Linting rules SHOULD be configured to detect and warn about violations of package structure.
- **FR-028b**: Each package MUST include a README documenting: (1) Package purpose and scope, (2) Dependencies on other packages, (3) Strategy for future extraction to separate repository, (4) Current status and maturity level
- **FR-029**: Project structure MUST be inspired by Universo Platformo React conceptual patterns (monorepo, package structure, entity relationships) but implemented using Total.js v5 best practices according to official documentation at https://docs.totaljs.com/
- **FR-029a**: Specific patterns to AVOID from reference implementation: legacy Flowise code patterns, incomplete refactoring artifacts, undocumented workarounds, and any code marked with "TODO: refactor" comments
- **FR-029b**: A monitoring process SHOULD be established to track new features added to universo-platformo-react repository and create issues for implementing equivalent features in this project using Total.js stack
- **FR-029c**: **REFERENCE PROJECT STUDY**: Before implementing any feature, developers MUST study the equivalent implementation in universo-platformo-react (https://github.com/teknokomo/universo-platformo-react) to understand: (1) Package structure and separation, (2) Entity relationships and hierarchies, (3) Shared component patterns, (4) Inter-package communication contracts

**Security Requirements**

- **FR-030**: All sensitive credentials (API keys, database passwords, JWT secrets) MUST be stored in environment variables and NEVER committed to the repository
- **FR-030a**: The .gitignore file MUST include patterns for: .env, .env.local, .env.*.local, *.key, *.pem, and any credential files
- **FR-030b**: JWT tokens MUST have expiration time (recommended: 1 hour for access tokens, 7 days for refresh tokens) and MUST be validated on every protected endpoint
- **FR-030c**: Passwords MUST be hashed using bcrypt (or Supabase built-in hashing) before storage, never stored in plain text
- **FR-030d**: All API endpoints that access user data MUST implement authentication and authorization checks
- **FR-030e**: The application MUST validate and sanitize all user inputs to prevent injection attacks (SQL injection, XSS, command injection)

**Testing Strategy**

- **FR-037**: Project MUST define testing layers with minimum coverage targets: Unit tests (70% code coverage), Integration tests (60% of API endpoints), E2E tests (critical user paths only)
- **FR-037a**: Unit tests MUST be written using a testing framework compatible with Total.js (e.g., Jest, Vitest). Each package MUST have its own test suite runnable independently
- **FR-037b**: Integration tests MUST validate: database operations with test database, API endpoint responses with mocked authentication, inter-package communication contracts
- **FR-037c**: Test databases MUST use isolated instances (Docker containers or in-memory databases) to prevent pollution of development data
- **FR-037d**: All tests MUST be runnable via `pnpm test:all` (runs all packages) and `pnpm --filter [package-name] test` (runs single package)
- **FR-037e**: CI/CD pipeline MUST enforce test passage before merge. Failing tests MUST block PR merging

**Observability & Monitoring**

- **FR-038**: All backend services MUST emit structured JSON logs for centralized aggregation with these fields: timestamp (ISO 8601), level (info/warn/error), service (service name), userId (if authenticated), path (request path), method (HTTP method), statusCode, duration (ms), message
- **FR-038a**: Application MUST expose metrics endpoint (e.g., `/metrics`) with at least these metrics: `http_requests_total` (counter), `http_request_duration_seconds` (histogram), `database_query_duration_seconds` (histogram), `rate_limit_hits_total` (counter)
- **FR-038b**: All async operations (database queries, external API calls) SHOULD support distributed tracing using OpenTelemetry or compatible instrumentation
- **FR-038c**: Error logging MUST capture: stack trace, request context (headers, body), user ID, timestamp, and correlation ID for tracing related logs
- **FR-038d**: Performance-critical operations (API responses, database queries) MUST be instrumented with timing measurements logged at INFO level

**Development Environment Requirements**

- **FR-031**: Development environment MUST support minimum system requirements: 8GB RAM, 4 CPU cores, 10GB free disk space
- **FR-031a**: PNPM installation in under 5 minutes MUST be achievable on a standard development machine with adequate internet connection
- **FR-031b**: Development environment setup documentation MUST include: Node.js installation guide, PNPM installation steps, Supabase account setup, and environment variable configuration

**Performance Requirements**

- **FR-032**: TypeScript compilation for all packages SHOULD complete in under 2 minutes on a standard development machine
- **FR-032a**: Development server hot reload SHOULD reflect changes in under 3 seconds after file save
- **FR-032b**: Initial project setup (clone + pnpm install) SHOULD complete in under 5 minutes as specified in SC-001

### Key Entities

**Monorepo Structure**
- Represents the overall repository organization with PNPM workspaces
- Contains packages directory, root configuration files, and documentation
- Manages dependencies and scripts across all packages

**Package**
- Represents an independent module of functionality (frontend or backend)
- Contains its own package.json, source code in base/ directory, and package-specific documentation
- Can depend on other packages within the monorepo

**Workspace Configuration**
- Defines how PNPM manages multiple packages within the monorepo
- Specifies package locations and shared dependencies
- Enables cross-package development and building

**Data Model Hierarchy** (for future feature implementation)

The following entity hierarchy will be implemented in future features but is documented here for architectural planning:

```
User (Supabase Auth)
  │
  ├── Unik (Workspace) - Top-level container for user's work
  │     │
  │     ├── Space - Logical grouping of related canvases
  │     │     ├── Canvas - Individual workflow, scene, or experience
  │     │     │     └── Version - Versioned snapshots of canvas state
  │     │     └── ...
  │     │
  │     ├── Tools (shared across workspace)
  │     ├── Credentials (shared authentication)
  │     └── Variables (shared configuration)
  │
  └── Metaverse - Thematic collection of spaces
        ├── Section - Organizational unit within metaverse
        │     └── Entity - Individual interactive element
        └── ...

Cluster (for infrastructure management)
  ├── Domain - Grouping of related resources
  │     └── Resource - Individual infrastructure component
  └── ...
```

**Hierarchy Design Principles**:
1. **Workspace Isolation**: Top-level containers (Unik, Cluster) are isolated per user unless explicitly shared
2. **Resource Sharing**: Tools, credentials, and variables are shared across all spaces within a workspace
3. **Version Control**: Primary content entities (Canvas) MUST support versioning with rollback capability
4. **Public Access**: Individual resources MAY be made public via separate API endpoints without authentication
5. **Role-Based Access**: Each hierarchy level enforces role-based permissions (Owner > Admin > Editor > Viewer)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer can clone the repository, run `pnpm install`, and have all dependencies installed successfully in under 5 minutes on a machine with adequate internet connection
- **SC-002**: All README files exist in both English (README.md) and Russian (README-RU.md) with 100% structural parity: same number of headings, same number of list items, same number of code blocks, and line count within ±5 lines
- **SC-003**: Code compilation using `pnpm build:all` succeeds across all packages with zero TypeScript errors and exits with status code 0
- **SC-004**: Project structure inspection reveals proper separation of frontend (-frt suffix) and backend (-srv suffix) packages with each containing a base/ directory at package root
- **SC-004a**: **MODULAR ARCHITECTURE VERIFICATION**: Automated verification confirms that 100% of feature code resides within `packages/` directory, with NO business logic, UI components, or API routes at repository root (excluding explicitly allowed config/docs files)
- **SC-004b**: Each package README includes extraction strategy documentation with all required sections: purpose, dependencies, extraction path, status
- **SC-005**: 100% of required GitHub issue labels from `.github/instructions/github-labels.md` are created in the repository with matching names, colors, and descriptions
- **SC-006**: New developer can read the root README sections (Overview, Prerequisites, Installation, Getting Started) and successfully complete initial setup without external help in under 30 minutes
- **SC-007**: Database connection test succeeds when valid Supabase credentials are provided in .env file, returning success status without errors or warnings
- **SC-008**: Sample MUI component can be created in a frontend package and rendered without import errors, missing style warnings, or theme configuration errors
- **SC-009**: Workspace build commands execute successfully: `pnpm build:all` builds all packages, `pnpm --filter [package-name] build` builds individual package
- **SC-010**: Code quality tools run successfully: ESLint produces zero errors on all code, Prettier check passes on all files, TypeScript compiler produces zero errors
- **SC-011**: All required environment variables are documented in .env.example with descriptive comments, and actual .env file is properly ignored by git
- **SC-012**: TypeScript compilation completes for all packages in under 2 minutes on a standard development machine (8GB RAM, 4 core CPU)
- **SC-013**: Development server starts successfully for both frontend and backend packages with no fatal errors, and responds to health check within 10 seconds
- **SC-014**: PNPM catalog is defined in `pnpm-workspace.yaml` with centralized versions for all major shared dependencies (TypeScript, MUI, testing frameworks, etc.)
- **SC-015**: Database entity registration system is functional: entities can be added to packages and properly exported to central registry for ORM initialization
- **SC-016**: Authentication middleware chain executes in correct order: JWT verification → RLS context → rate limiting → route handler, verifiable through middleware logging
- **SC-017**: API error responses follow standardized schema with all required fields (error, message, statusCode, timestamp, path), validated by sample endpoint tests
- **SC-018**: Rate limiting is operational: exceeding configured limits returns 429 status with proper rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- **SC-019**: Structured JSON logging is active: all HTTP requests produce log entries with required fields (timestamp, level, service, userId, path, method, statusCode, duration)
- **SC-020**: Test suite runs successfully: `pnpm test:all` executes all package tests and reports overall pass/fail status with coverage metrics if configured

## Assumptions

This specification is based on the following assumptions:

1. **Development Environment**: Developers have Node.js >=18.0.0 installed and can install PNPM globally (minimum PNPM v8.0.0)
2. **Supabase Access**: The project will have access to a Supabase instance (project URL and API keys will be provided separately via environment variables)
3. **Total.js Version**: Total.js Platform version 5 (minimum v5.0.0) is stable and its TypeScript support is production-ready for use in this project. Reference: https://docs.totaljs.com/
4. **Existing Reference**: Universo Platformo React repository (https://github.com/teknokomo/universo-platformo-react) is accessible for reference of conceptual structure and will remain available throughout development
5. **Package Scope**: Initial setup will create minimal starter packages demonstrating structure; actual feature packages (Clusters, Metaverses, etc.) will be added in subsequent feature implementations
6. **Authentication Strategy**: Passport.js with JWT strategy will be integrated with Supabase Auth API using @supabase/supabase-js client library for user authentication. Row Level Security (RLS) will be enforced at database level
7. **MUI Compatibility**: Material-UI (MUI) v5.x is compatible with Total.js frontend architecture and can be integrated without major architectural changes
8. **Language Support**: All documentation will be in English and Russian only (no other languages at this time). UI text localization is out of scope for initial setup
9. **GitHub Permissions**: The team has appropriate permissions to create labels, configure repository settings, and manage issues/PRs in the GitHub repository
10. **Future Extensibility**: While focusing on Supabase initially, the architecture will use abstraction layers (Repository/Adapter patterns) that do not prevent future DBMS additions
11. **Development Machine**: Standard development environment has minimum 8GB RAM, 4 CPU cores, 10GB free disk space, and adequate internet connection for package downloads
12. **TypeScript Experience**: Development team has working knowledge of TypeScript and modern JavaScript (ES2022+) features
13. **ORM Choice**: Project will use an ORM (TypeORM or Total.js equivalent) for database access. Choice will be documented with rationale for Total.js compatibility
14. **Redis Availability**: Redis instance is available for distributed rate limiting in production. Development environment may use in-memory fallback
15. **Testing Framework**: Testing framework will be compatible with Total.js and TypeScript (Jest, Vitest, or Total.js native testing tools)
16. **Build Orchestration**: Turbo or equivalent tool compatible with Total.js will be used for monorepo build management. If Total.js has native tooling, that may be preferred
17. **API Design**: REST API will follow standard HTTP conventions. WebSocket/real-time features are future considerations using Total.js native capabilities
18. **Observability Stack**: Structured logging will use standard JSON format compatible with common log aggregators (ELK, Grafana Loki). Metrics endpoint will follow Prometheus format if possible

## Dependencies

- **External Dependencies**:
  - Universo Platformo React repository (for conceptual reference): https://github.com/teknokomo/universo-platformo-react
  - Total.js Framework v5 documentation: https://docs.totaljs.com/
  - TypeScript documentation: https://www.typescriptlang.org/docs/
  - Material-UI (MUI) documentation: https://mui.com/
  - Supabase documentation: https://supabase.com/docs
  - PNPM package manager: https://pnpm.io/
  - Node.js >=18.0.0
  - Supabase instance availability
  - GitHub repository access and permissions

- **Documentation Dependencies**:
  - `.github/instructions/github-labels.md` - for label definitions and application rules
  - `.github/instructions/github-issues.md` - for issue creation guidelines and templates
  - `.github/instructions/github-pr.md` - for pull request guidelines and required format
  - `.github/instructions/i18n-docs.md` - for bilingual documentation standards and workflow

- **Technical Documentation References**:
  - Total.js v5 TypeScript guide: https://docs.totaljs.com/total5/40840001/
  - Total.js v5 best practices: https://docs.totaljs.com/ (main documentation)
  - PNPM workspace documentation: https://pnpm.io/workspaces
  - TypeScript tsconfig reference: https://www.typescriptlang.org/tsconfig

## Out of Scope

The following items are explicitly **not** included in this specification:

1. **Feature Implementation**: No actual feature functionality (like Clusters, Domains, Resources) - only project setup
2. **Documentation Site**: No separate documentation repository or site - that will be created later
3. **AI Agent Files**: No `.github/agents/` or similar AI configuration - users will create as needed
4. **Migration Scripts**: No data migration from Universo Platformo React - this is a fresh start
5. **Deployment Configuration**: No production deployment setup (Docker, CI/CD, hosting) - development setup only
6. **Complete Feature Set**: No implementation of Metaverses, Spaces, Canvases, or other domain features
7. **Legacy Code Cleanup**: No responsibility for fixing issues in the Universo Platformo React codebase
8. **Multi-DBMS Support**: No actual implementation of multiple database systems - only architectural preparation
9. **Authentication UI**: No login/register pages - only backend authentication infrastructure
10. **Performance Optimization**: No performance tuning or optimization - only basic functional setup
