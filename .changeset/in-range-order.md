---
"@vega-ui/utils": patch
---

`inRange` accepts a range in either order: `inRange(7, [10, 5])` is `true`. Before, the bounds were only checked as `[min, max]`, so a descending range never matched.
