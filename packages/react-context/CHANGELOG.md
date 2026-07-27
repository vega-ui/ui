# @vega-ui/react-context

## 2.6.0

## 2.5.0

### Patch Changes

- 1007aae: Fix broken `main` field in hooks, utils and react-context

  In `@vega-ui/hooks`, `@vega-ui/utils` and `@vega-ui/react-context` the `main` field pointed to `./dist/index.ts` — a file that doesn't exist in `dist/` (the build only outputs `.js` and `.d.ts`). Modern bundlers masked the problem by resolving through the `exports` map, but environments that rely on `main` (Node without conditional exports support, Jest with legacy resolution, ts-node, CDNs like esm.sh) got `MODULE_NOT_FOUND` or tried to parse TypeScript as JS.

  Changes:

  - `main` now points to `./dist/index.js`
  - added `module: "./dist/index.js"` (consistent with `@vega-ui/react`)
  - added the missing top-level `types: "./dist/index.d.ts"` to utils and react-context so resolvers that don't support `exports` can find the type declarations

- 77c7685: Declare `react` as a peer dependency

  `@vega-ui/react-context` uses React but did not declare it as a dependency of any kind — only `devDependencies`. A consumer installing just `@vega-ui/react-context` got no hint about the required React version, and with Yarn PnP / strict resolution React could not be resolved at all.

  Added `"peerDependencies": { "react": "^19.0.0" }` (only `react` — the package does not use `react-dom`).

## 2.4.0

## 2.3.1

## 2.3.0

## 2.2.1

## 2.2.0

## 2.1.1

## 2.1.0

## 2.0.1

## 2.0.0

### Minor Changes

- eab55a8: The responsive-ui package is no longer supported due to inconsistencies in the overall component design approach

  The components that the responsive ui package contained are easily implemented using the composition of existing ones and do not require the support and development of a separate package

### Patch Changes

- 9fcad60: Fixed ts problems

## 1.14.3

## 1.14.2

### Patch Changes

- 55809c0: Changed deps
