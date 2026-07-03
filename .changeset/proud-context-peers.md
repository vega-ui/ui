---
"@vega-ui/react-context": patch
---

Declare `react` as a peer dependency

`@vega-ui/react-context` uses React but did not declare it as a dependency of any kind — only `devDependencies`. A consumer installing just `@vega-ui/react-context` got no hint about the required React version, and with Yarn PnP / strict resolution React could not be resolved at all.

Added `"peerDependencies": { "react": "^19.0.0" }` (only `react` — the package does not use `react-dom`).
