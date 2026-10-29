---
"@vega-ui/utils": major
"@vega-ui/react": patch
---

- **Breaking:** `setValue` and `dispatchEvents` are replaced by `writeInputValue(input, value)` from `@vega-ui/utils`: it sets the value through the native setter, so React sees the change, and dispatches bubbling `input` and `change` events
- the context of `NumberField` is named `NumberFieldContext` in errors instead of `PhoneFieldContext`
- `getPending()` and `getCommitted()` of the `SnapScroller` api ref and `index` of the `IndexedSnapScroller` api ref are typed `number | null`: they are `null` until the scroller has measured its items
