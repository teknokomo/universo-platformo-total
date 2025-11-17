# API Contracts Overview

**Feature**: 001-setup-universo-platformo-totaljs  
**Phase**: Phase 1 - Design  
**Date**: 2025-11-17  

---

## Purpose

This directory contains API contract definitions for the initial setup phase. Since this is a foundational setup feature focused on project initialization, the API contracts are minimal and primarily for system configuration.

Future features will add comprehensive API contracts for business domain operations (Clusters, Metaverses, Uniks, etc.).

---

## Contract Files

- `settings-api.yaml` - Application Settings API (OpenAPI 3.0)
- `packages-api.yaml` - Package Registry API (OpenAPI 3.0)
- `health-api.yaml` - Health Check and Status API (OpenAPI 3.0)

---

## API Standards

All APIs follow these standards per Constitution Principle XI:

### Pagination
- **Query Parameters**: `limit` (1-1000, default: 100), `offset` (min: 0, default: 0), `sortBy` (default: 'updated'), `sortOrder` ('asc' | 'desc', default: 'desc')
- **Response Headers**: `X-Pagination-Limit`, `X-Pagination-Offset`, `X-Total-Count`, `X-Pagination-Has-More`

### Error Schema
```json
{
  "error": "error_type",
  "message": "Human-readable description",
  "statusCode": 400,
  "timestamp": "2025-11-17T06:00:00Z",
  "path": "/api/v1/resource",
  "details": {
    "field_name": "error message"
  }
}
```

### Rate Limiting
- **Read endpoints**: 100 requests/minute per user
- **Write endpoints**: 60 requests/minute per user
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Exceeded**: 429 status with `Retry-After` header

### Authentication
- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Responses**: 401 Unauthorized (invalid/expired token), 403 Forbidden (insufficient permissions)

---

## Base URL

Development: `http://localhost:8000/api/v1`  
Production: `https://api.universo.pro/v1` (future)

---

## Version Strategy

APIs are versioned via URL path: `/api/v1/`, `/api/v2/`, etc.
Breaking changes require new version. Non-breaking changes can be added to existing version.

---

## Future APIs

The following APIs will be added in future features:
- **Clusters API** - Infrastructure cluster management
- **Metaverses API** - Metaverse and section management  
- **Uniks API** - Workspace and space management
- **Spaces API** - Canvas and workflow management
- **Tools API** - Tool management
- **Credentials API** - Credential management
- **Auth API** - User authentication and authorization

---

**Status**: ✅ Contract definitions ready for implementation
