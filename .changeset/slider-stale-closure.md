---
"@vega-ui/react": patch
---

Fix stale closure in Slider's `changeValue`

`changeValue` was wrapped in `useCallback` with empty deps, freezing `value` and `disabled` at their first-render values. Consequences: the slider could never return to its initial value (keyboard stepping got stuck one step away from it, clicking the initial track position was ignored); the same-value dedup guard compared against the initial value instead of the current one, so `onChangeValue` fired repeatedly with identical values during drags; toggling `disabled` after mount had no effect on interactions (an initially enabled slider stayed interactive when disabled, an initially disabled one stayed dead when enabled).

The memoization served no purpose — `changeValue` is only used by handlers that are recreated on every render — so it is now a plain function reading fresh props. Covered with regression tests for all three symptoms.
