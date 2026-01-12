# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with PostCSS
- **Backend**: Convex (backend-as-a-service) - see guidelines below
- **Build optimization**: React Compiler enabled

## Architecture

- Uses Next.js App Router with file-based routing in `src/app/`
- Path alias configured: `@/*` maps to `./src/*`
- Convex backend functions go in `convex/` directory (when initialized)

## Convex Guidelines

When working with Convex:

### Function Syntax
Always use the new function syntax with argument and return validators:
```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";

export const f = query({
  args: { name: v.string() },
  returns: v.string(),
  handler: async (ctx, args) => {
    return "Hello " + args.name;
  },
});
```

### Key Rules
- Use `query`, `mutation`, `action` for public functions; `internalQuery`, `internalMutation`, `internalAction` for private functions
- Always include `args` and `returns` validators (use `v.null()` for void returns)
- Use `v.int64()` instead of deprecated `v.bigint()`
- Do NOT use `filter` in queries - define indexes and use `withIndex` instead
- Actions cannot access `ctx.db` - use `ctx.runQuery`/`ctx.runMutation` to interact with database
- Add `"use node";` at top of files using Node.js modules in actions

### Schema
Define schema in `convex/schema.ts`. Include all index fields in index names (e.g., `by_field1_and_field2`).

### Function References
- Public functions: `api.path.to.file.functionName`
- Internal functions: `internal.path.to.file.functionName`

### HTTP Endpoints
Define in `convex/http.ts` using `httpRouter` and `httpAction`.

### File Storage
Use `ctx.storage.getUrl()` for signed URLs. Query `_storage` system table for metadata (not deprecated `ctx.storage.getMetadata`).
