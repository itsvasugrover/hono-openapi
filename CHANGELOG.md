# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-07

### Added

- Default validation error hook (`defaultHook`) for consistent error handling
- JSON content helpers:
  - `jsonContent` - Simple JSON response helper
  - `jsonContentOneOf` - Union type response helper
  - `jsonContentRequired` - Required request body helper
  - `oneOf` - OpenAPI oneOf schema generator
- Parameter schemas:
  - `IdParamsSchema` - Numeric ID path parameter
  - `IdUUIDParamsSchema` - UUID path parameter
  - `SlugParamsSchema` - Slug path parameter
- Query schemas:
  - `paginationQuerySchema` - Standard limit/offset pagination
- Response schemas:
  - `createErrorSchema` - Validation error response generator
  - `createMessageObjectSchema` - Success message response
- Comprehensive README with usage examples
- agents.md maintenance guide for LLM-assisted development
- package.json with proper metadata and exports
- CHANGELOG.md for version tracking

### Dependencies

- `@hono/zod-openapi`: ^1.2.0
- `@asteasolutions/zod-to-openapi`: ^8.4.0
- `zod`: ^4.3.6
- `@vasugrover/http-status`: ^1.0.0
