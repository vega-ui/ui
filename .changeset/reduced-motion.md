---
'@vega-ui/react': patch
'@vega-ui/hooks': major
---

Respect `prefers-reduced-motion` in SnapScroller, Calendar, SegmentedControl, PageControl and Collapsible: scrolling jumps, sliding and resizing are instant, and PageControlProgress fades in over its duration, so `animationend` still fires.

`useScrollSnap` no longer forces smooth scrolling: `scrollToElement` and `scrollToElementByKey` default to `behavior: 'auto'`, like native `scrollTo`, so the CSS `scroll-behavior` of the scroller decides. To keep smooth scrolling, set `scroll-behavior: smooth` on the scroller or pass `'smooth'`.
