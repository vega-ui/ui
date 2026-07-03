---
"@vega-ui/react-context": patch
"@vega-ui/hooks": patch
"@vega-ui/utils": patch
---

Fix broken `main` field in hooks, utils and react-context

In `@vega-ui/hooks`, `@vega-ui/utils` and `@vega-ui/react-context` the `main` field pointed to `./dist/index.ts` — a file that doesn't exist in `dist/` (the build only outputs `.js` and `.d.ts`). Modern bundlers masked the problem by resolving through the `exports` map, but environments that rely on `main` (Node without conditional exports support, Jest with legacy resolution, ts-node, CDNs like esm.sh) got `MODULE_NOT_FOUND` or tried to parse TypeScript as JS.

Changes:

- `main` now points to `./dist/index.js`
- added `module: "./dist/index.js"` (consistent with `@vega-ui/react`)
- added the missing top-level `types: "./dist/index.d.ts"` to utils and react-context so resolvers that don't support `exports` can find the type declarations
