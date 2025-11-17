# Quickstart Guide

**Feature**: 001-setup-universo-platformo-totaljs  
**Phase**: Phase 1 - Design  
**Date**: 2025-11-17  
**Audience**: Developers joining the Universo Platformo Total project

---

## Overview

This guide will help you set up your development environment and start working on Universo Platformo Total. By the end of this guide, you'll have the project running locally and be ready to contribute.

**Estimated Time**: 20-30 minutes

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
  ```bash
  node --version  # Should be v18.0.0 or higher
  ```

- **PNPM** >= 8.0.0 ([Installation Guide](https://pnpm.io/installation))
  ```bash
  npm install -g pnpm
  pnpm --version  # Should be 8.0.0 or higher
  ```

- **Git** (for cloning the repository)
  ```bash
  git --version
  ```

### Required Accounts

- **GitHub Account** - For repository access
- **Supabase Account** - For database access ([Sign up](https://supabase.com/))
  - You'll need to create a project and obtain credentials

### System Requirements

- **RAM**: Minimum 8GB (16GB recommended)
- **CPU**: Minimum 4 cores
- **Disk Space**: Minimum 10GB free space
- **Operating System**: macOS, Linux, or Windows with WSL2

---

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/teknokomo/universo-platformo-total.git

# Navigate to the project directory
cd universo-platformo-total

# Checkout the main branch (or your feature branch)
git checkout main
```

---

## Step 2: Install Dependencies

```bash
# Install all dependencies using PNPM
pnpm install
```

This will:
- Install root dependencies
- Install dependencies for all packages in the monorepo
- Set up package links between workspace packages
- Take approximately 2-5 minutes depending on your internet connection

**Expected Output**: You should see PNPM downloading packages and setting up workspaces.

---

## Step 3: Configure Environment Variables

### Create Environment File

```bash
# Copy the example environment file
cp .env.example .env
```

### Edit Environment File

Open `.env` in your text editor and fill in the required values:

```bash
# .env

# Environment
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Configuration
JWT_SECRET=your-very-secure-random-secret-key
JWT_EXPIRATION=1h
REFRESH_TOKEN_EXPIRATION=7d

# Server Configuration
PORT=8000
HOST=localhost

# Redis Configuration (Optional - for future rate limiting)
# REDIS_URL=redis://localhost:6379
```

### Obtain Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project or select existing project
3. Go to **Settings** > **API**
4. Copy the following:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (Keep this secret!)

### Generate JWT Secret

```bash
# Generate a random JWT secret (macOS/Linux)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use this command
openssl rand -hex 64
```

Copy the output to `JWT_SECRET` in your `.env` file.

---

## Step 4: Set Up Database Schema

### Create Database Tables

```bash
# Run database migrations
pnpm run migrate:up
```

This will create the initial database schema including:
- `application_settings` table
- `package_registry` table
- `migration_history` table
- RLS policies
- Indexes and triggers

**Expected Output**: You should see migration execution logs confirming successful table creation.

### Verify Database Setup

```bash
# Run database health check
pnpm run db:check
```

**Expected Output**: `✓ Database connection: OK`

---

## Step 5: Build All Packages

```bash
# Build all packages in the monorepo
pnpm run build:all
```

This will:
- Compile TypeScript to JavaScript for all packages
- Take approximately 1-2 minutes
- Create `dist/` directories in each package

**Expected Output**: Successful build messages for each package.

---

## Step 6: Run Development Server

```bash
# Start the development server
pnpm run dev
```

This will:
- Start the Total.js backend server on port 8000
- Enable hot reload for TypeScript changes
- Start watching for file changes

**Expected Output**:
```
[Total.js] Server is running on http://localhost:8000
[Total.js] Development mode enabled
[Total.js] Watching for changes...
```

### Test the Server

Open your browser or use curl:

```bash
# Test health endpoint
curl http://localhost:8000/api/v1/health

# Expected response:
# {"status":"healthy","timestamp":"2025-11-17T06:00:00Z","uptime":10}
```

---

## Step 7: Run Tests

```bash
# Run all tests
pnpm run test:all

# Or run tests for a specific package
pnpm --filter shared-common test
```

**Expected Output**: All tests should pass.

---

## Project Structure Overview

```
universo-platformo-total/
├── packages/               # All feature packages
│   ├── shared-common/      # Shared utilities
│   ├── shared-auth/        # Authentication
│   ├── shared-database/    # Database layer
│   └── shared-ui/          # UI components and theme
├── specs/                  # Feature specifications
├── .github/                # GitHub workflows and instructions
├── pnpm-workspace.yaml     # PNPM workspace configuration
├── package.json            # Root package.json
└── tsconfig.json           # TypeScript configuration
```

---

## Common Commands

### Development

```bash
# Start development server
pnpm run dev

# Build all packages
pnpm run build:all

# Clean all build artifacts
pnpm run clean

# Lint all code
pnpm run lint:all

# Format all code
pnpm run format:all
```

### Testing

```bash
# Run all tests
pnpm run test:all

# Run tests with coverage
pnpm run test:coverage

# Run tests in watch mode
pnpm run test:watch
```

### Database

```bash
# Run migrations up
pnpm run migrate:up

# Run migrations down (rollback)
pnpm run migrate:down

# Check database connection
pnpm run db:check

# Seed database (future)
pnpm run db:seed
```

### Package Management

```bash
# Add dependency to specific package
pnpm --filter shared-common add lodash

# Add dev dependency to specific package
pnpm --filter shared-common add -D @types/lodash

# Update all dependencies
pnpm update -r
```

---

## Next Steps

### 1. Read Documentation

- [Constitution](./.specify/memory/constitution.md) - Project principles and standards
- [Contributing Guidelines](./.github/instructions/) - How to contribute
- [README](./README.md) - Project overview

### 2. Explore the Codebase

Start with these packages:
- `packages/shared-common/` - Utility functions and types
- `packages/shared-auth/` - Authentication implementation
- `packages/shared-database/` - Database access patterns

### 3. Create Your First Feature Branch

```bash
# Create feature branch following naming convention
git checkout -b 002-your-feature-name

# Make your changes
# ...

# Commit and push
git add .
git commit -m "Your commit message"
git push origin 002-your-feature-name
```

### 4. Create Issue and Pull Request

Follow the guidelines:
- [GitHub Issues Guidelines](./.github/instructions/github-issues.md)
- [GitHub PR Guidelines](./.github/instructions/github-pr.md)

---

## Troubleshooting

### Issue: PNPM not found

**Solution**:
```bash
npm install -g pnpm
```

### Issue: Node version too old

**Solution**: Update Node.js to version 18 or higher
- Using nvm: `nvm install 18 && nvm use 18`
- Or download from [nodejs.org](https://nodejs.org/)

### Issue: Database connection failed

**Solution**:
1. Check that Supabase credentials in `.env` are correct
2. Verify your Supabase project is active
3. Check internet connectivity
4. Verify `SUPABASE_URL` has correct format: `https://xxx.supabase.co`

### Issue: Port 8000 already in use

**Solution**:
```bash
# Change PORT in .env file
PORT=8001

# Or kill process using port 8000
# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Issue: TypeScript compilation errors

**Solution**:
```bash
# Clean build artifacts
pnpm run clean

# Rebuild everything
pnpm run build:all
```

### Issue: Permission denied on scripts

**Solution**:
```bash
# Make scripts executable (macOS/Linux)
chmod +x .specify/scripts/bash/*.sh
```

---

## Getting Help

- **Documentation**: Check the `docs/` directory (future) and README files
- **Issues**: Search existing issues on GitHub
- **Discussions**: Join GitHub Discussions for questions
- **Constitution**: Review `.specify/memory/constitution.md` for project principles

---

## Bilingual Documentation

This project maintains documentation in both English and Russian:
- English: `README.md`
- Russian: `README-RU.md`

Always create English documentation first, then translate to Russian maintaining identical structure.

---

**Status**: ✅ Quickstart Guide Complete

**Last Updated**: 2025-11-17
