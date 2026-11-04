
# @vasugrover/hono-openapi

> [!WARNING]
> **This repository is now archived and read-only.** It is no longer actively maintained — no further commits, issues, or pull requests will be accepted. The code remains available for reference.

Utilities, helpers, and schemas for building OpenAPI-compliant REST APIs with the Hono framework and Zod validation. This package standardizes API documentation, validation, and error handling for backend services, enabling consistent, type-safe, and well-documented APIs.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Exports](#exports)
- [Usage Examples](#usage-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Versioning](#versioning)
- [License](#license)

---

## Features

- **Default validation error hook** for Zod, returning consistent error responses (HTTP 422)
- **Helpers** for OpenAPI response content, union types, required JSON, and `oneOf` schema generation
- **Reusable Zod schemas** for path/query parameters and common API patterns
- **TypeScript-first**: All exports are fully typed
- **Designed for Bun**: All commands and scripts use Bun

---

## Installation

```bash
bun add @vasugrover/hono-openapi
```

---

## Quick Start

### Registering the Default Validation Error Hook

```typescript
import { defaultHook } from "@vasugrover/hono-openapi";

app.openapi(route, handler, {
  hooks: {
    onValidate: [defaultHook],
  },
});
```

### Using Helpers for OpenAPI Responses

```typescript
import { helpers } from "@vasugrover/hono-openapi";

// Standard JSON response
helpers.jsonContent(UserSchema, "User details");

// Union type response
helpers.jsonContentOneOf([UserSchema, AdminSchema], "Account details");

// Required JSON request body
helpers.jsonContentRequired(UserSchema, "User creation payload");

// OpenAPI oneOf generator
helpers.oneOf([UserSchema, AdminSchema]);
```

### Using Common Schemas

```typescript
import { schemas } from "@vasugrover/hono-openapi";

// Path parameter schemas
schemas.IdParamsSchema;         // { id: z.coerce.number() }
schemas.IdUUIDParamsSchema;     // { id: z.string().uuid() }
schemas.SlugParamsSchema;       // { slug: z.string() }

// Pagination query schema
schemas.paginationQuerySchema;  // { limit: 1-1000 (default 100), offset: >=0 (default 0) }

// Error and message schemas
schemas.createErrorSchema(UserSchema);
schemas.createMessageObjectSchema("User created successfully");
```

---

## Exports

### defaultHook

- Handles Zod validation errors for Hono routes
- Returns:

  ```json
  {
    "success": false,
    "error": {
      "name": "ZodError",
      "issues": [ { "code": "invalid_type", "path": ["field"], "message": "..." } ]
    }
  }
  ```

### helpers

- `jsonContent(schema, description)` – OpenAPI JSON response helper
- `jsonContentOneOf([schemas], description)` – OpenAPI union response helper
- `jsonContentRequired(schema, description)` – Required JSON request body helper
- `oneOf([schemas])` – OpenAPI `oneOf` generator from Zod schemas

### schemas

- `IdParamsSchema` – Numeric ID path param
- `IdUUIDParamsSchema` – UUID path param
- `SlugParamsSchema` – Slug path param
- `paginationQuerySchema` – Pagination query
- `createErrorSchema(schema)` – Error response schema for a given Zod schema
- `createMessageObjectSchema(message)` – Success message response schema

---

## Usage Examples

### Example: User GET Endpoint

```typescript
import { helpers, schemas, defaultHook } from "@vasugrover/hono-openapi";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

app.openapi(
  {
    method: "get",
    path: "/users/:id",
    request: {
      params: schemas.IdParamsSchema,
    },
    responses: {
      200: helpers.jsonContent(UserSchema, "User details"),
      422: helpers.jsonContent(schemas.createErrorSchema(UserSchema), "Validation error"),
    },
  },
  async (c) => {
    // ...handler logic...
  },
  { hooks: { onValidate: [defaultHook] } }
);
```

### Example: Pagination

```typescript
import { schemas } from "@vasugrover/hono-openapi";

app.openapi(
  {
    method: "get",
    path: "/users",
    request: {
      query: schemas.paginationQuerySchema,
    },
    // ...
  },
  handler
);
```

---

## Best Practices

- Use only generic, reusable schemas (avoid business logic)
- Always provide OpenAPI metadata (`description`, `example`)
- Follow naming conventions: PascalCase + `Schema` for schemas, camelCase for helpers
- Document new schemas/helpers in README and CHANGELOG
- Test with real API payloads and edge cases
- Do not duplicate features from `@hono/zod-openapi`

---

## Troubleshooting

- **Schema not validating?**
  - Check for `.coerce` usage and correct parameter location
- **OpenAPI spec not generating?**
  - Ensure `.openapi()` is called and schema is registered
- **Type errors?**
  - Check TypeScript types and package exports
- **defaultHook not catching errors?**
  - Ensure it is registered as `onValidate` in route hooks

---

## Versioning

- **Major**: Breaking changes to error structure, function signatures, or exports
- **Minor**: New schemas/helpers, optional parameters, non-breaking error fields
- **Patch**: Bug fixes, documentation, type improvements, internal refactors

---

## Contributing

Contributions are welcome. Please review the [contribution guidelines](CONTRIBUTING.md) before submitting changes. Ensure that:

1. All changes are backward compatible
2. TypeScript types are updated as needed
3. Documentation is kept current
4. All checks pass using Bun (`bun run typecheck`, `bun run lint`, `bun run build`)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Repository

- GitHub: [https://github.com/itsvasugrover/hono-openapi](https://github.com/itsvasugrover/hono-openapi)
- Issues: [https://github.com/itsvasugrover/hono-openapi/issues](https://github.com/itsvasugrover/hono-openapi/issues)

## Support

For questions or support, please open an issue on the GitHub repository.

---

**Status**: ⚠️ No longer maintained — this repository has been archived and is read-only. The npm package `@vasugrover/hono-openapi` is deprecated.
