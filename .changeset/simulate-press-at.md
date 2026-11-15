---
'@vega-ui/core': patch
---

`pressAt` from `@vega-ui/core/test` no longer throws for a widget that listens to `pointer.press` but not to `pointer.down`. It sends `pointer.down` only when the widget listens to it, like the DOM adapter.
