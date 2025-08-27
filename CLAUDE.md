# Superenum Project Guide

## Overview

TypeScript/JavaScript enum utility library that adds validation, iteration, and localization features to enums. Works with standard TS/JS enums and provides type-safe operations.

## Key Commands

```bash
npm run build       # Lint, typecheck, and build
npm run fix         # ESLint auto-fix
npm run check       # Typecheck, and lint
npm run test        # Run Vitest tests (single run)
npm run test-watch  # Run Vitest in watch mode
npm run docs        # Generate TypeDoc documentation
npm run clean       # Clean build artifacts
```

## Project Structure

- `src/superenum.ts` - Main library implementation
- `test/*.test.ts` - Test files for different build targets
- `dist/` - Build output (ESM, CJS, browser)
- `tsup.config.ts` - Build configuration

## Testing Approach

Uses Vitest framework. Multiple test files verify different build outputs:

- `superenum.src.test.ts` - Source code tests
- `superenum.esm-dist.test.ts` - ESM build tests
- `superenum.commonjs-dist.test.ts` - CJS build tests
- `superenum.browser-dist.test.ts` - Browser build tests

## Build System

- Uses tsup for bundling
- Outputs ESM, CommonJS, and browser builds
- TypeScript for type definitions
- Supports Node 16+

## Code Standards

- ESLint with Prettier integration
- TypeScript strict mode
- No dependencies (devDependencies only)
- BSD-2-Clause license

## Important Notes

- Always run `npm run lint` and `npm run typecheck` before committing
- Library has zero runtime dependencies
- Maintains compatibility with Node, Deno, Bun, and browsers
