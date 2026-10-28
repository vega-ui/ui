---
"@vega-ui/react": patch
---

`SnapScroller` creates its `apiRef` once instead of on every render, so a callback `apiRef` is no longer detached and attached again on each render.
