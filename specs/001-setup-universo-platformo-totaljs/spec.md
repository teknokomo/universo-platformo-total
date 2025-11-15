# Feature Specification: Initialize Universo Platformo Total.js Project

**Feature Branch**: `001-setup-universo-platformo-totaljs`  
**Created**: 2025-11-15  
**Status**: Draft  
**Input**: User description: "Initialize and set up Universo Platformo Total.js - a full-stack platform implementation using Total.js Framework (v5) with TypeScript, following the conceptual structure of Universo Platformo React but adapted for the Total.js technology stack."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Repository Foundation Setup (Priority: P1)

As a developer starting work on the Universo Platformo Total.js project, I need a properly initialized monorepo with PNPM workspace configuration, basic project structure, and essential documentation so that I can begin implementing features on a solid foundation.

**Why this priority**: This is the foundation upon which all other work depends. Without proper repository setup, no development can proceed. It establishes the project structure, tooling, and conventions that will guide all future development.

**Independent Test**: Can be fully tested by cloning the repository, running `pnpm install`, and verifying that the monorepo structure is correctly set up with working package management, and that all README files (English and Russian) are present and accurate.

**Acceptance Scenarios**:

1. **Given** an empty repository, **When** a developer clones it and runs `pnpm install`, **Then** all dependencies install successfully and the workspace configuration is properly recognized
2. **Given** the initialized repository, **When** a developer views the root README files (README.md and README.ru.md), **Then** they find comprehensive documentation in both English and Russian with identical structure and content
3. **Given** the monorepo structure, **When** a developer navigates to the packages directory, **Then** they find it properly structured with placeholder packages following the naming convention (e.g., `*-frt` for frontend, `*-srv` for backend)
4. **Given** the project configuration, **When** a developer runs linting or formatting commands, **Then** the tools execute successfully across all packages in the workspace

---

### User Story 2 - GitHub Repository Management (Priority: P2)

As a project maintainer, I need a well-organized GitHub repository with appropriate labels for issues and pull requests, and clear guidelines for contributions so that the team can efficiently manage and track work.

**Why this priority**: Good repository organization is essential for team collaboration and project management. It comes after basic setup but before feature implementation, as it establishes the workflow and conventions the team will follow.

**Independent Test**: Can be fully tested by viewing the GitHub repository's issues section and verifying that all required labels are present with correct descriptions, and that instruction files (.github/instructions/*) are accessible and provide clear guidance.

**Acceptance Scenarios**:

1. **Given** the GitHub repository, **When** a maintainer views the labels list, **Then** they see all standard labels defined according to the github-labels.md guidelines
2. **Given** a new contributor, **When** they read the .github/instructions files, **Then** they understand how to create issues following github-issues.md standards
3. **Given** a developer creating a pull request, **When** they follow the github-pr.md guidelines, **Then** their PR has all required information and follows the established format

---

### User Story 3 - TypeScript and Total.js Configuration (Priority: P3)

As a developer, I need properly configured TypeScript settings and Total.js framework setup so that I can write type-safe code using Total.js v5 best practices.

**Why this priority**: While essential for development, this can be configured after the basic repository structure is in place. It's needed before actual feature implementation begins.

**Independent Test**: Can be fully tested by creating a sample TypeScript file in one of the packages, running the TypeScript compiler, and verifying that it compiles successfully with proper type checking and follows Total.js v5 conventions.

**Acceptance Scenarios**:

1. **Given** a properly configured TypeScript project, **When** a developer writes TypeScript code with type errors, **Then** the compiler catches and reports these errors appropriately
2. **Given** the Total.js framework setup, **When** a developer creates a basic Total.js application structure, **Then** it follows Total.js v5 best practices and conventions
3. **Given** the monorepo packages, **When** a developer imports types from one package into another, **Then** TypeScript correctly resolves and validates the types across packages

---

### User Story 4 - Database Integration Foundation (Priority: P4)

As a developer, I need basic Supabase integration setup with authentication configuration so that future features can leverage database and auth capabilities.

**Why this priority**: Database integration is needed for feature implementation but can be configured after the core project structure is established. It's set up with abstraction to allow for future DBMS expansion.

**Independent Test**: Can be fully tested by configuring Supabase credentials, running a connection test, and verifying that the authentication setup (Passport.js with Supabase connector) can successfully initialize.

**Acceptance Scenarios**:

1. **Given** Supabase credentials, **When** the application initializes, **Then** it successfully connects to the Supabase instance
2. **Given** the authentication configuration, **When** Passport.js initializes with the Supabase strategy, **Then** the authentication middleware is properly configured
3. **Given** the database abstraction layer, **When** reviewing the code structure, **Then** it's clear how to add support for additional database systems in the future

---

### User Story 5 - UI Framework Integration (Priority: P5)

As a frontend developer, I need Material-UI (MUI) integrated into the frontend packages so that I can build consistent, professional user interfaces following the established design system.

**Why this priority**: UI framework integration is necessary for building features but comes after core infrastructure is in place. It can be tested independently by creating sample components.

**Independent Test**: Can be fully tested by creating a sample frontend component using MUI components, running the development server, and verifying that MUI styles and theming work correctly.

**Acceptance Scenarios**:

1. **Given** a frontend package with MUI installed, **When** a developer imports and uses MUI components, **Then** they render correctly with proper styling
2. **Given** the MUI theme configuration, **When** the application loads, **Then** the theme is consistently applied across all MUI components
3. **Given** a frontend component, **When** it uses MUI's responsive design features, **Then** the component adapts correctly to different screen sizes

---

### Edge Cases

- What happens when a developer tries to install dependencies without PNPM installed? (Error message should guide them to install PNPM)
- How does the system handle when Supabase credentials are missing or invalid? (Clear error messages with guidance on where to configure credentials)
- What happens when trying to add a new package that doesn't follow the naming convention? (Linting or validation should warn about convention violations)
- How does the build process handle TypeScript compilation errors across multiple packages? (Build should fail fast with clear indication of which package has errors)
- What happens when documentation files (English vs Russian) get out of sync? (Should have a validation check that can detect content mismatches)

## Requirements *(mandatory)*

### Functional Requirements

**Repository Structure & Package Management**

- **FR-001**: Project MUST be configured as a monorepo using PNPM workspace functionality
- **FR-002**: All packages MUST reside in a `packages/` directory at the repository root
- **FR-003**: Packages requiring both frontend and backend MUST be split into separate packages (e.g., `packages/clusters-frt` and `packages/clusters-srv`)
- **FR-004**: Each package MUST contain a `base/` directory at its root to support future multiple implementations
- **FR-005**: Root directory MUST contain `package.json` with workspace configuration for PNPM
- **FR-006**: Project MUST use PNPM as the package manager (not npm or yarn)

**Documentation Requirements**

- **FR-007**: All README files MUST be created in both English (README.md) and Russian (README.ru.md) versions
- **FR-008**: Russian documentation MUST be an exact copy of English content in terms of structure and line count, translated to Russian
- **FR-009**: Root README files MUST describe the project purpose, relationship to Universo Platformo React, and basic setup instructions
- **FR-010**: Each package MUST have its own README.md and README.ru.md explaining the package's purpose and usage

**Technology Stack**

- **FR-011**: Project MUST use Total.js Framework version 5 as the full-stack platform
- **FR-012**: All code MUST be written in TypeScript (not JavaScript)
- **FR-013**: Frontend packages MUST use Material-UI (MUI) as the UI component library
- **FR-014**: Backend authentication MUST use Passport.js with appropriate strategy connectors
- **FR-015**: Project MUST support Supabase as the primary database system

**Database & Authentication**

- **FR-016**: Database integration MUST be designed with abstraction to allow future support for multiple DBMS beyond Supabase
- **FR-017**: Authentication system MUST integrate Passport.js with Supabase connector
- **FR-018**: Database configuration MUST be externalized (not hardcoded) to support different environments

**GitHub Repository Management**

- **FR-019**: Repository MUST define issue labels according to `.github/instructions/github-labels.md` guidelines
- **FR-020**: Repository MUST provide contributor guidelines in `.github/instructions/` directory including github-issues.md, github-pr.md, and i18n-docs.md
- **FR-021**: Issues and pull requests MUST follow the conventions defined in the instruction files

**Build & Development Configuration**

- **FR-022**: Project MUST have TypeScript configuration (tsconfig.json) following Total.js v5 best practices
- **FR-023**: Project MUST include code formatting and linting tools configured for TypeScript
- **FR-024**: Each package MUST have its own build configuration appropriate to its type (frontend/backend)
- **FR-025**: Monorepo MUST support building all packages or individual packages

**Project Organization Standards**

- **FR-026**: Project MUST NOT include a `docs/` directory (documentation will be in a separate repository)
- **FR-027**: Project MUST NOT pre-create AI agent configuration files (user will create these as needed)
- **FR-028**: Package naming MUST follow the convention: `[feature-name]-frt` for frontend and `[feature-name]-srv` for backend
- **FR-029**: Project structure MUST be inspired by Universo Platformo React but adapted to Total.js best practices, not directly copying any problematic patterns

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

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Developer can clone the repository, run package installation, and have all dependencies installed successfully in under 5 minutes
- **SC-002**: All README files exist in both English and Russian with 100% content parity (same number of sections, same structure)
- **SC-003**: Code compilation succeeds across all packages with zero errors when running the build command
- **SC-004**: Project structure inspection reveals proper separation of frontend and backend packages with each containing a base/ directory
- **SC-005**: 100% of required GitHub issue labels are created and match the descriptions in .github/instructions/github-labels.md
- **SC-006**: New developer can read the root README and understand the project purpose, its relationship to Universo Platformo React, and how to get started within 10 minutes
- **SC-007**: Database connection test succeeds when valid credentials are provided
- **SC-008**: Sample UI component can be created and rendered without styling or import errors
- **SC-009**: Workspace build commands execute correctly across all packages (both recursive and individual package builds)
- **SC-010**: Code formatting and linting tools run successfully across the entire codebase with consistent results

## Assumptions

This specification is based on the following assumptions:

1. **Development Environment**: Developers have Node.js (version compatible with Total.js v5) and can install PNPM
2. **Supabase Access**: The project will have access to a Supabase instance (project URL and API keys will be provided separately)
3. **Total.js Version**: Total.js Platform version 5 is stable and its TypeScript support is production-ready
4. **Existing Reference**: Universo Platformo React repository (https://github.com/teknokomo/universo-platformo-react) is accessible for reference of conceptual structure
5. **Package Scope**: Initial setup will create placeholder packages for demonstration; actual feature packages will be added in subsequent work
6. **Authentication Strategy**: Passport.js has a working Supabase strategy connector available (or we'll create one if needed)
7. **MUI Compatibility**: Material-UI (MUI) works well with Total.js frontend structure
8. **Language Support**: All documentation will be in English and Russian only (no other languages at this time)
9. **GitHub Permissions**: The team has appropriate permissions to create labels and configure the GitHub repository
10. **Future Extensibility**: While focusing on Supabase initially, the architecture should not prevent future DBMS additions

## Dependencies

- **External Dependencies**:
  - Universo Platformo React repository (for conceptual reference): https://github.com/teknokomo/universo-platformo-react
  - Total.js Framework v5 documentation and best practices
  - PNPM package manager installation
  - Supabase instance availability
  - GitHub repository access and permissions

- **Documentation Dependencies**:
  - `.github/instructions/github-labels.md` - for label definitions
  - `.github/instructions/github-issues.md` - for issue creation guidelines  
  - `.github/instructions/github-pr.md` - for pull request guidelines
  - `.github/instructions/i18n-docs.md` - for bilingual documentation standards

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
