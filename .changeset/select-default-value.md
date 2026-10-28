---
"@vega-ui/react": patch
---

`Select` without `defaultValue` starts with no selection instead of `''`, so an option with `value=''` is no longer selected by default and a numeric `Select` no longer holds a string. `defaultValue=''` still shows the placeholder.
