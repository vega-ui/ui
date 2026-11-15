---
"@vega-ui/react": patch
---

`IndexedSnapScroller` reaches the page of several quick `prev()` or `next()` calls that step past its window; it used to stay on the page it started from once the new pages rendered.
