---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

**A prevented pointer move.** `event.preventDefault()` in an `onPointerMove` handler did not stop the drag of a `Sheet`, `Drawer`, `Slider` or a `Grid` selection for that move, unlike the other events, where the user's handler runs first and a prevented event skips the widget. A prevented move is now left out of the drag; the release still ends it. A wheel stays out of reach: React attaches `onWheel` as a passive listener, so a widget cannot see its `preventDefault()`.
