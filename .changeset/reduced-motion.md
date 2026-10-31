---
'@vega-ui/react': patch
'@vega-ui/hooks': patch
---

Respect `prefers-reduced-motion` in SnapScroller, Calendar, SegmentedControl, PageControl and Collapsible: scrolling jumps, sliding and resizing are instant, and PageControlProgress fades in over its duration, so `animationend` still fires. `useScrollSnap` scrolls instantly when the user prefers reduced motion.
