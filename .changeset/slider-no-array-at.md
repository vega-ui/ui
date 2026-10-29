---
"@vega-ui/react": patch
---

`Slider` no longer calls `Array.prototype.at`, so it works in browsers without it (Safari before 15.4)
