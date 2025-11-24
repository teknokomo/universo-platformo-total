# Spec Kit Documentation Structure

This directory contains all project documentation following the Spec Kit methodology.

## Directory Structure

```
.specify/
├── memory/              # Project-wide documentation and principles
│   └── constitution.md  # Core project principles and standards
├── scripts/             # Automation scripts for spec-driven workflow
│   └── bash/            # Bash scripts
│       ├── check-prerequisites.sh    # Validate feature prerequisites
│       ├── common.sh                 # Shared functions
│       ├── create-new-feature.sh     # Create new feature structure
│       ├── setup-plan.sh             # Initialize implementation plan
│       └── update-agent-context.sh   # Update agent context files
├── specs/               # Feature specifications
│   └── NNN-feature-name/            # Individual feature directories
│       ├── spec.md                   # Feature specification
│       ├── tasks.md                  # Task breakdown
│       ├── plan.md                   # Implementation plan
│       ├── data-model.md             # (Optional) Data model
│       ├── research.md               # (Optional) Research notes
│       ├── quickstart.md             # (Optional) Quick start guide
│       ├── checklists/               # (Optional) Checklists
│       └── contracts/                # (Optional) API contracts
└── templates/           # Document templates
    ├── spec-template.md
    ├── tasks-template.md
    ├── plan-template.md
    ├── checklist-template.md
    └── agent-file-template.md
```

## Usage

### Creating a New Feature

Use the create-new-feature script to initialize a new feature:

```bash
./.specify/scripts/bash/create-new-feature.sh "Feature description" --short-name "feature-name"
```

### Checking Prerequisites

Before working on a feature, verify prerequisites:

```bash
./.specify/scripts/bash/check-prerequisites.sh --json
```

### Working with Spec Kit Agents

The following agents are available via GitHub Copilot:

- `/speckit.specify` - Create new feature specification
- `/speckit.clarify` - Clarify ambiguities in specification
- `/speckit.plan` - Generate implementation plan
- `/speckit.tasks` - Break down into actionable tasks
- `/speckit.implement` - Implement features
- `/speckit.analyze` - Analyze consistency
- `/speckit.taskstoissues` - Convert tasks to GitHub issues

## File Naming Standards

All feature specifications follow standard naming:

- **spec.md** - Feature specification
- **tasks.md** - Task breakdown
- **plan.md** - Implementation plan
- **data-model.md** - Data model (optional)
- **research.md** - Research notes (optional)
- **quickstart.md** - Quick start guide (optional)

## Constitution

The project constitution (`memory/constitution.md`) defines the core principles and standards that all features must follow. It is the authoritative source for project governance and cannot be overridden by individual feature specifications.

## Templates

Templates in the `templates/` directory provide standardized structures for all documentation. Use these templates when creating new documentation manually or let the Spec Kit agents use them automatically.

## Migration Notes

**2024-11-24**: All documentation has been consolidated from the previous `specs/` directory to `.specify/specs/` to align with Spec Kit methodology. The scripts and agent configurations have been updated to reference the new paths.
