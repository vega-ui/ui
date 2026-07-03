---
"@vega-ui/hooks": patch
"@vega-ui/icons": patch
"@vega-ui/react": patch
---

Remove React from `dependencies`, keep it only in `peerDependencies`

`react` (and `react-dom` in `@vega-ui/react`) were declared in both `dependencies` and `peerDependencies`. With strict resolution (Yarn PnP, pnpm with `shamefully-hoist=false`, strict npm) consumers ended up with two copies of React — `Invalid hook call`, contexts not matching, rendering breaking with no clear error.

Changes:

- removed `react`/`react-dom` from `dependencies` in `@vega-ui/react`, `@vega-ui/hooks` and `@vega-ui/icons`; they stay in `peerDependencies` and were added to `devDependencies` for local development
- `vite.config.ts` of `@vega-ui/react` and `@vega-ui/hooks` derived rollup `external` from `Object.keys(dependencies)` only, so React would have been bundled into `dist` after this change — externals now include `peerDependencies` as well