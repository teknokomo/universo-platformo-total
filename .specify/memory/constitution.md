<!--
SYNC IMPACT REPORT - Constitution Update
Version Change: 0.0.0 → 1.0.0 (Initial Constitution)
Principles Added:
  1. Monorepo Package Architecture
  2. Technology Stack Standardization
  3. Bilingual Documentation (NON-NEGOTIABLE)
  4. Database Flexibility with Supabase First
  5. Component-Based Frontend with Material UI
  6. Test-Driven Development
  7. Issue & PR Management Standards
Sections Added:
  - Core Principles (7 principles defined)
  - Technical Standards (Technology stack, project structure)
  - Development Workflow (Issue management, PR process, documentation workflow)
  - Governance (Amendment process, compliance requirements)
Templates Status:
  ✅ plan-template.md - Reviewed, compatible with constitution
  ✅ spec-template.md - Reviewed, compatible with constitution
  ✅ tasks-template.md - Reviewed, compatible with constitution
Follow-up TODOs:
  - None (all placeholders filled with concrete values)
-->

# Universo Platformo Total Constitution

## Core Principles

### I. Monorepo Package Architecture

All functionality MUST be organized in a monorepo structure managed by PNPM. Packages are located in `packages/` directory. When functionality requires both frontend and backend components, they MUST be separated into distinct packages with suffixes `-frt` (frontend) and `-srv` (server). Each package MUST contain a root `base/` directory to support future alternative implementations.

**Rationale**: This structure enables clear separation of concerns, independent versioning of frontend and backend components, and allows multiple technology stack implementations while maintaining a unified codebase organization.

### II. Technology Stack Standardization

The project MUST use Total.js Platform v5 as the fullstack framework with TypeScript for type safety. Frontend components MUST use Material UI (MUI) library. All code MUST follow Total.js best practices and patterns, avoiding legacy patterns or poor implementations from reference projects.

**Rationale**: Standardizing on Total.js Platform v5 with TypeScript ensures type safety, modern fullstack development patterns, and leverages the framework's built-in capabilities. Total.js best practices must be followed to maintain code quality and avoid technical debt.

### III. Bilingual Documentation (NON-NEGOTIABLE)

ALL documentation files MUST be created in both English and Russian. English is the primary standard and MUST be created first. Russian translations MUST be exact copies with identical structure, content, and line count. README files follow the pattern `README.md` (English) and `README-RU.md` (Russian).

**Rationale**: The project serves both international and Russian-speaking audiences. Complete bilingual documentation ensures accessibility and maintains consistency across both language versions. The NON-NEGOTIABLE status reflects the project's core commitment to serving both communities equally.

### IV. Database Flexibility with Supabase First

The project currently uses Supabase as the primary database. While focusing on Supabase implementation, database access patterns MUST be designed to support future integration with other DBMS. Authentication MUST use Passport.js with Supabase connector.

**Rationale**: Starting with Supabase provides a proven solution while architecting for future flexibility. This prevents vendor lock-in and allows the platform to scale across different deployment scenarios. Passport.js provides a standardized authentication layer that can adapt to multiple backends.

### V. Component-Based Frontend with Material UI

Frontend interfaces MUST be built using component-based architecture with Material UI (MUI) components. Components MUST be reusable across different features that share similar entity structures (e.g., Clusters/Domains/Resources pattern reused for Metaverses/Sections/Entities).

**Rationale**: Component reusability reduces development time and ensures consistent user experience. Many features in Universo Platformo share similar three-tier entity relationships, making component templates highly valuable. MUI provides a comprehensive, accessible component library that accelerates development.

### VI. Test-Driven Development

Features MUST include appropriate testing. Integration tests are REQUIRED for new functionality, contract changes, and inter-package communication. Tests MUST be written before implementation when specified in feature requirements. Test coverage MUST validate both success and error scenarios.

**Rationale**: Testing ensures reliability and prevents regressions as the platform evolves. Integration tests are particularly critical in a package-based architecture where components must interact correctly. TDD when specified ensures requirements are properly validated.

### VII. Issue & PR Management Standards

ALL Issues and Pull Requests MUST follow standardized formats defined in `.github/instructions/`. Issues MUST be created before implementing features. PRs MUST reference closing issues with `Fixes #123` format. Both Issues and PRs MUST include English text with complete Russian translation in `<details><summary>In Russian</summary>` spoilers.

**Rationale**: Standardized Issue and PR management creates clear audit trails, enables project tracking, and ensures all stakeholders can understand changes regardless of language preference. Linking PRs to Issues maintains traceability from requirement to implementation.

## Technical Standards

### Technology Stack Requirements

**MUST USE**:
- Total.js Platform v5 (fullstack framework)
- TypeScript (primary language)
- PNPM (package management)
- Material UI / MUI (frontend components)
- Supabase (primary database)
- Passport.js with Supabase connector (authentication)

**MUST NOT**:
- Copy legacy code patterns from incomplete reference implementations
- Create separate `docs/` directory (documentation will move to separate repository)
- Create AI agent configuration files without explicit user request

### Project Structure Standards

```
packages/
├── {feature}-frt/         # Frontend package
│   └── base/              # Base implementation
└── {feature}-srv/         # Backend package
    └── base/              # Base implementation
```

Each package MUST be independently maintainable and potentially extractable to separate repositories in the future.

## Development Workflow

### Issue Management Process

1. Check repository labels using GitHub API before creating Issues
2. Create Issue following `.github/instructions/github-issues.md` format
3. Apply appropriate labels per `.github/instructions/github-labels.md`
4. Include complete bilingual content (English + Russian spoiler)
5. Write Issue in future tense describing work to be completed

### Pull Request Process

1. Create PR linked to Issue using `Fixes #123` format
2. Follow PR format defined in `.github/instructions/github-pr.md`
3. Include PR title format: `GH{issue_number} {descriptive_title}`
4. Document all changes including "Additional Work" section
5. Include complete bilingual content (English + Russian spoiler)
6. Apply appropriate type and area labels

### Documentation Workflow

1. Create English documentation first (`README.md`)
2. Ensure English version is complete and reviewed
3. Create Russian version (`README-RU.md`) as exact structural copy
4. Verify both versions have identical structure and line count
5. Follow guidelines in `.github/instructions/i18n-docs.md`

### Implementation Workflow

1. Analyze reference repository (universo-platformo-react) for conceptual patterns
2. Create specifications following `.specify/templates/spec-template.md`
3. Implement using Total.js best practices (NOT copying React implementation details)
4. Start with base functionality, then build feature modules
5. Reuse component patterns across similar entity structures
6. Monitor reference repository for new features to implement

## Governance

### Authority

This Constitution supersedes all other development practices and documentation. When conflicts arise between this Constitution and other guidance, the Constitution prevails.

### Amendment Process

Constitution amendments require:
1. Proposed changes documented with rationale
2. Impact analysis on existing code and templates
3. Version bump following semantic versioning:
   - **MAJOR**: Backward incompatible principle removals or redefinitions
   - **MINOR**: New principles, sections, or material expansions
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements
4. Sync Impact Report documenting all affected templates and documents
5. Updates to dependent templates and documentation

### Compliance Requirements

All Pull Requests MUST verify compliance with Constitution principles. Deviations from principles MUST be explicitly justified in PR description with explanation of why the principle cannot be followed and what alternative approach was taken.

### Complexity Justification

Any architectural complexity MUST be justified against Constitution principles. Simpler alternatives MUST be documented and explained why they were rejected. The burden of proof is on complexity—simplicity is the default.

### Continuous Improvement

The development team MUST monitor the universo-platformo-react reference repository and implement new features as they appear, adapted to Total.js technology stack while maintaining Constitution compliance.

**Version**: 1.0.0 | **Ratified**: 2025-11-15 | **Last Amended**: 2025-11-15
