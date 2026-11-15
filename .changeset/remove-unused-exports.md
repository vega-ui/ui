---
"@vega-ui/hooks": major
"@vega-ui/utils": major
---

Remove exports the components no longer use:

- **Breaking:** `@vega-ui/hooks` no longer exports `useControlledState`, `useLatest`, `useRefMap`, `useMap`, `useBiMap`, `useResizeObserver` and `useMutationObserver`; use a `Map`, a `ResizeObserver` or a `MutationObserver` of your own
- **Breaking:** `@vega-ui/utils` no longer exports `inRange`, `safeSetPointerCapture` and `BiMap`
