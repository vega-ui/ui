---
"@vega-ui/utils": minor
"@vega-ui/hooks": patch
"@vega-ui/react": patch
---

`useSelection`: optional `compare` no longer crashes; new `compare` util

`compare?` was declared optional but invoked unconditionally in `edges`, `isSelected` and `isDisabled` — range selection or `min`/`max` clamping without a user-provided comparator threw `compare is not a function` (while `expand` had a guard, confirming the option was meant to be optional).

- `@vega-ui/utils` now exports `compare` — a three-way comparator constrained to the new `Comparable` type (`number | string | bigint | Date`), so types with no universal ordering (objects, symbols) are rejected at compile time; covered with unit tests
- `useSelection` falls back to it when no `compare` is passed, mirroring the existing `equals ?? Object.is` pattern; pass an explicit `compare` for non-primitive key types
- `expand` no longer silently no-ops without a user comparator
- empty or `undefined` `selected` no longer produces `undefined` range edges: `edges()` returns `[]`, `isSelected` returns `false` instead of comparing `undefined`
- `DataGridSelectable` reuses the shared `compare` instead of its own inline duplicate of the same fallback (no behavior change)
