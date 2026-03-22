# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Start all dev servers via Turbo
pnpm storybook        # Run Storybook on port 6006

# Building
pnpm build            # Build all packages via Turbo

# Testing
pnpm test             # Run all tests (vitest + Playwright, headless)

# Linting
pnpm lint             # ESLint with cache

# Publishing
pnpm ci:version       # Bump versions via Changesets
pnpm ci:publish       # Publish to npm
```

To run tests for a single package, `cd` into the package directory and run `npx vitest run --browser`.

## Architecture

This is a **pnpm + Turbo monorepo** publishing a React UI component library (`@vega-ui/react`).

### Packages (`packages/`)

| Package | Name | Role |
|---------|------|------|
| `ui` | `@vega-ui/react` | Main component library (~60 components), the published artifact |
| `tokens` | `@vega-ui/tokens-core` | Design tokens as CSS custom properties (colors, spacing, typography, shadows, radii, animations) |
| `theme` | `@vega-ui/theme-core` | Light/dark theme CSS files that consume tokens |
| `icons` | `@vega-ui/icons` | Icon components wrapping `lucide-react` |
| `hooks` | `@vega-ui/hooks` | Shared React hooks (useMap, useSelection, useResize, useScrollSnap, etc.) |
| `utils` | `@vega-ui/utils` | Pure utility functions (capitalize, clamp, csx, date, intl, mergeProps) |
| `react-context` | `@vega-ui/react-context` | React Context helpers for state management |

Dependency flow: `ui` → `hooks`, `icons`, `react-context`, `utils` → `tokens` ← `theme`

### Build

Each package builds with **Vite in library mode** (ES modules only), outputting `dist/index.js` + `dist/index.d.ts`. TypeScript definitions are generated via `vite-plugin-dts`. The main `@vega-ui/react` package also outputs `dist/index.css` and supports per-component imports (`@vega-ui/react/Button`).

### Testing

Tests use **Vitest with `@vitest/browser`** running real Playwright browsers (Chromium, Firefox, WebKit, headless). Each package has a `vitest.config.ts` extending `vitest.shared.ts` at the root. Browser tests run sequentially (`maxWorkers: 1`).

### Design Tokens

Tokens live in `packages/tokens/src/` as CSS custom properties. Colors use `oklch`/`color-mix()` color space (not hex). The theme package (`packages/theme/`) provides light/dark mode by reassigning token values.

### Storybook

Stories live in `stories/` (root) and `packages/**/*.stories.tsx`. Storybook uses the `@storybook/react-vite` framework with theme switching (light/dark) via `@storybook/addon-themes`.

### Versioning

Releases are managed with **Changesets**. Add a changeset with `npx changeset`, then CI handles `changeset version` and `changeset publish`.