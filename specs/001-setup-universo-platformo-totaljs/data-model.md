# Data Model

**Feature**: 001-setup-universo-platformo-totaljs  
**Phase**: Phase 1 - Design  
**Date**: 2025-11-17  
**Purpose**: Define data entities and relationships for the initial project setup phase

---

## Overview

This document defines the data model for the **initial setup phase** of Universo Platformo Total. Since this is a foundational setup feature, the focus is on configuration and metadata entities rather than business domain entities.

Future features (Clusters, Metaverses, Uniks, etc.) will define their own data models in their respective specifications.

---

## Entity Hierarchy

```
System Configuration (No User Context)
├── Application Settings
├── Package Registry
└── Migration History

Future Entity Hierarchy (Reference - Not Implemented in This Phase):
User (Supabase Auth)
├── Unik (Workspace)
│   ├── Space
│   │   └── Canvas
│   │       └── Version
│   ├── Tools
│   ├── Credentials
│   └── Variables
├── Metaverse
│   └── Section
│       └── Entity
└── Cluster
    └── Domain
        └── Resource
```

---

## Entities for Setup Phase

### 1. Application Settings Entity

**Purpose**: Store system-wide configuration settings that can be modified at runtime

**Fields**:
- `id` (UUID, Primary Key) - Unique identifier
- `key` (String, Unique, Required) - Setting key (e.g., 'app.name', 'rate_limit.read')
- `value` (JSON, Required) - Setting value (flexible type via JSON)
- `type` (Enum, Required) - Value type: 'string', 'number', 'boolean', 'json'
- `description` (String, Optional) - Human-readable description
- `category` (String, Optional) - Setting category for grouping
- `is_public` (Boolean, Default: false) - Whether exposed to frontend
- `is_encrypted` (Boolean, Default: false) - Whether value is encrypted
- `created_at` (Timestamp, Default: now()) - Creation timestamp
- `updated_at` (Timestamp, Default: now()) - Last update timestamp

**Relationships**: None (standalone)

**Validation Rules**:
- `key` must be unique
- `key` must match pattern: `^[a-z0-9_.]+$` (lowercase, numbers, dots, underscores)
- `value` must be valid JSON
- `type` must be one of: 'string', 'number', 'boolean', 'json'

**State Transitions**: None (CRUD only)

**Indexes**:
- Primary: `id`
- Unique: `key`
- Index: `category`

**Example**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "key": "rate_limit.read",
  "value": 100,
  "type": "number",
  "description": "Read requests per minute per user",
  "category": "rate_limiting",
  "is_public": false,
  "is_encrypted": false,
  "created_at": "2025-11-17T06:00:00Z",
  "updated_at": "2025-11-17T06:00:00Z"
}
```

---

### 2. Package Registry Entity

**Purpose**: Track installed packages in the monorepo for version management and dependency resolution

**Fields**:
- `id` (UUID, Primary Key) - Unique identifier
- `name` (String, Unique, Required) - Package name (e.g., 'shared-common')
- `version` (String, Required) - Semantic version (e.g., '1.0.0')
- `type` (Enum, Required) - Package type: 'shared', 'frontend', 'backend'
- `path` (String, Required) - Relative path from repo root (e.g., 'packages/shared-common')
- `description` (String, Optional) - Package description
- `dependencies` (JSON Array, Default: []) - List of dependent package names
- `is_active` (Boolean, Default: true) - Whether package is active
- `metadata` (JSON, Default: {}) - Additional metadata
- `created_at` (Timestamp, Default: now()) - Creation timestamp
- `updated_at` (Timestamp, Default: now()) - Last update timestamp

**Relationships**: 
- Self-referential: `dependencies` references other packages by name

**Validation Rules**:
- `name` must be unique
- `name` must match pattern: `^[a-z0-9-]+$` (lowercase, numbers, hyphens)
- `version` must follow semantic versioning: `^\\d+\\.\\d+\\.\\d+(-[a-z0-9.]+)?$`
- `type` must be one of: 'shared', 'frontend', 'backend'
- `path` must start with 'packages/'
- `dependencies` must be array of strings

**State Transitions**: None (CRUD only)

**Indexes**:
- Primary: `id`
- Unique: `name`
- Index: `type`
- Index: `is_active`

**Example**:
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "shared-common",
  "version": "1.0.0",
  "type": "shared",
  "path": "packages/shared-common",
  "description": "Shared utilities and common code",
  "dependencies": [],
  "is_active": true,
  "metadata": {
    "author": "Universo Team",
    "license": "MIT"
  },
  "created_at": "2025-11-17T06:00:00Z",
  "updated_at": "2025-11-17T06:00:00Z"
}
```

---

### 3. Migration History Entity

**Purpose**: Track database migration executions for schema version management

**Fields**:
- `id` (UUID, Primary Key) - Unique identifier
- `name` (String, Unique, Required) - Migration file name (e.g., '001_create_settings_table')
- `package` (String, Required) - Source package (e.g., 'shared-database')
- `executed_at` (Timestamp, Default: now()) - Execution timestamp
- `execution_time_ms` (Integer, Required) - Execution duration in milliseconds
- `success` (Boolean, Required) - Whether migration succeeded
- `error_message` (Text, Optional) - Error message if failed
- `checksum` (String, Required) - Migration file checksum for integrity
- `batch` (Integer, Required) - Migration batch number for rollback grouping

**Relationships**: None (standalone)

**Validation Rules**:
- `name` must be unique
- `name` must match pattern: `^[0-9]{3}_[a-z0-9_]+$` (e.g., '001_create_tables')
- `package` must exist in Package Registry
- `execution_time_ms` must be >= 0
- `checksum` must be SHA-256 hash (64 hex chars)
- `batch` must be > 0

**State Transitions**: Immutable (insert-only, no updates)

**Indexes**:
- Primary: `id`
- Unique: `name`
- Index: `package`
- Index: `executed_at DESC`
- Index: `batch DESC`

**Example**:
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440002",
  "name": "001_create_settings_table",
  "package": "shared-database",
  "executed_at": "2025-11-17T06:00:00Z",
  "execution_time_ms": 245,
  "success": true,
  "error_message": null,
  "checksum": "a3c4f56b8e9d0f1234567890abcdef1234567890abcdef1234567890abcdef12",
  "batch": 1
}
```

---

## Database Schema (Supabase PostgreSQL)

### SQL Table Definitions

```sql
-- Application Settings Table
CREATE TABLE application_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) UNIQUE NOT NULL CHECK (key ~ '^[a-z0-9_.]+$'),
    value JSONB NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    category VARCHAR(100),
    is_public BOOLEAN DEFAULT false,
    is_encrypted BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_settings_category ON application_settings(category);

-- Package Registry Table
CREATE TABLE package_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL CHECK (name ~ '^[a-z0-9-]+$'),
    version VARCHAR(50) NOT NULL CHECK (version ~ '^\d+\.\d+\.\d+(-[a-z0-9.]+)?$'),
    type VARCHAR(50) NOT NULL CHECK (type IN ('shared', 'frontend', 'backend')),
    path VARCHAR(500) NOT NULL CHECK (path LIKE 'packages/%'),
    description TEXT,
    dependencies JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_package_type ON package_registry(type);
CREATE INDEX idx_package_active ON package_registry(is_active);

-- Migration History Table
CREATE TABLE migration_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL CHECK (name ~ '^[0-9]{3}_[a-z0-9_]+$'),
    package VARCHAR(255) NOT NULL,
    executed_at TIMESTAMPTZ DEFAULT now(),
    execution_time_ms INTEGER NOT NULL CHECK (execution_time_ms >= 0),
    success BOOLEAN NOT NULL,
    error_message TEXT,
    checksum VARCHAR(64) NOT NULL CHECK (length(checksum) = 64),
    batch INTEGER NOT NULL CHECK (batch > 0)
);

CREATE INDEX idx_migration_package ON migration_history(package);
CREATE INDEX idx_migration_executed ON migration_history(executed_at DESC);
CREATE INDEX idx_migration_batch ON migration_history(batch DESC);

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply Trigger to Application Settings
CREATE TRIGGER update_application_settings_updated_at
    BEFORE UPDATE ON application_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply Trigger to Package Registry
CREATE TRIGGER update_package_registry_updated_at
    BEFORE UPDATE ON package_registry
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## Row Level Security (RLS) Policies

Since this is the setup phase with system-level entities, RLS policies are simplified:

```sql
-- Enable RLS on all tables
ALTER TABLE application_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE migration_history ENABLE ROW LEVEL SECURITY;

-- Application Settings RLS
-- Public settings can be read by authenticated users
CREATE POLICY "application_settings_read_public"
    ON application_settings FOR SELECT
    TO authenticated
    USING (is_public = true);

-- Only service role can modify settings
CREATE POLICY "application_settings_modify_service"
    ON application_settings FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Package Registry RLS
-- Authenticated users can read active packages
CREATE POLICY "package_registry_read_active"
    ON package_registry FOR SELECT
    TO authenticated
    USING (is_active = true);

-- Only service role can modify packages
CREATE POLICY "package_registry_modify_service"
    ON package_registry FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Migration History RLS
-- Authenticated users can read migration history
CREATE POLICY "migration_history_read_all"
    ON migration_history FOR SELECT
    TO authenticated
    USING (true);

-- Only service role can insert migrations
CREATE POLICY "migration_history_insert_service"
    ON migration_history FOR INSERT
    TO service_role
    WITH CHECK (true);
```

---

## Data Access Patterns

### Repository Interfaces

```typescript
// shared-database/base/src/repositories/ISettingsRepository.ts
export interface ISettingsRepository {
  findByKey(key: string): Promise<ApplicationSetting | null>;
  findByCategory(category: string): Promise<ApplicationSetting[]>;
  findPublicSettings(): Promise<ApplicationSetting[]>;
  create(setting: CreateSettingDto): Promise<ApplicationSetting>;
  update(id: string, setting: UpdateSettingDto): Promise<ApplicationSetting>;
  delete(id: string): Promise<boolean>;
}

// shared-database/base/src/repositories/IPackageRepository.ts
export interface IPackageRepository {
  findByName(name: string): Promise<Package | null>;
  findByType(type: PackageType): Promise<Package[]>;
  findActive(): Promise<Package[]>;
  create(pkg: CreatePackageDto): Promise<Package>;
  update(id: string, pkg: UpdatePackageDto): Promise<Package>;
  deactivate(id: string): Promise<boolean>;
}

// shared-database/base/src/repositories/IMigrationRepository.ts
export interface IMigrationRepository {
  findByName(name: string): Promise<Migration | null>;
  findByPackage(packageName: string): Promise<Migration[]>;
  findByBatch(batch: number): Promise<Migration[]>;
  getLastBatch(): Promise<number>;
  create(migration: CreateMigrationDto): Promise<Migration>;
  // Note: No update or delete - migrations are immutable
}
```

---

## Future Entity Relationships (Reference)

The following entities will be implemented in future features:

### User-Related Entities (via Supabase Auth)
- **User**: Managed by Supabase Auth (not in our schema)
- User profile extensions will be added in future features

### Workspace Entities (Future: Uniks Feature)
- **Unik**: Top-level workspace container
- **Space**: Logical grouping within Unik
- **Canvas**: Individual workflow/scene
- **Version**: Canvas version snapshots
- **Tools**: Shared tools within Unik
- **Credentials**: Shared credentials within Unik
- **Variables**: Shared variables within Unik

### Infrastructure Entities (Future: Clusters Feature)
- **Cluster**: Infrastructure cluster
- **Domain**: Domain grouping within cluster
- **Resource**: Individual infrastructure resource

### Metaverse Entities (Future: Metaverses Feature)
- **Metaverse**: Thematic collection
- **Section**: Organizational unit
- **Entity**: Interactive element

---

## Notes

1. **Supabase Auth Integration**: User authentication is handled by Supabase Auth. User IDs from Supabase will be used as foreign keys in future user-related entities.

2. **Future RLS Patterns**: User-owned entities in future features will use RLS policies like:
   ```sql
   CREATE POLICY "entity_owner_all"
       ON entity_table FOR ALL
       TO authenticated
       USING (auth.uid() = owner_id)
       WITH CHECK (auth.uid() = owner_id);
   ```

3. **Migration Strategy**: Each package will maintain its own migrations in `src/database/migrations/` directory. The `shared-database` package will aggregate and execute migrations in dependency order.

4. **No User Context**: The setup phase entities (Settings, Packages, Migrations) are system-level and don't have user context. User-related entities come in feature implementations.

---

**Status**: ✅ Data Model Complete for Setup Phase
