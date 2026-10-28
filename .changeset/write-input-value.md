---
"@vega-ui/utils": major
"@vega-ui/react": patch
---

- **Breaking:** `setValue` and `dispatchEvents` are replaced by `writeInputValue(input, value)` from `@vega-ui/utils`: it sets the value through the native setter, so React sees the change, and dispatches bubbling `input` and `change` events
- the context of `NumberField` is named `NumberFieldContext` in errors instead of `PhoneFieldContext`
