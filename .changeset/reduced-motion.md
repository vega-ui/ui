---
'@vega-ui/react': patch
---

Respect `prefers-reduced-motion` in SnapScroller, Calendar, SegmentedControl, PageControl and Collapsible: scrolling jumps, sliding and resizing are instant, and PageControlProgress fades in over its duration, so `animationend` still fires.
