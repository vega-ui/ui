---
"@vega-ui/icons": patch
"@vega-ui/utils": patch
---

Sync rollup externals with real dependencies

`vite.config.ts` of icons and utils listed externals manually, including `@vega-ui/helpers` — a package that doesn't exist in the monorepo — plus entries these packages never import (`@floating-ui/react`, `react-remove-scroll`, `@vega-ui/hooks`). Hand-written lists drift from real dependencies; a stray module matching a dead entry would silently produce a broken bundle.

- **icons**: externals are now derived from `Object.keys(packageJson.dependencies)` + `Object.keys(packageJson.peerDependencies)` (same pattern as `@vega-ui/react` and `@vega-ui/hooks`), so the "don't bundle this" contract always matches the declared dependencies.
- **utils**: the package has no runtime dependencies at all (React appears only in type imports), so the list is trimmed to the explicit `['react', 'react-dom', 'react/jsx-runtime']` safety net.
- `resolveJsonModule: true` added to `tsconfig.node.json` of ui/hooks/icons (their vite configs import `package.json`); the empty `tsconfig.node.json` of utils filled in to match the other packages.
