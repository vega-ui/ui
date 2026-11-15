---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**`SnapScroller` step toward a page it cannot reach.** When `next()` or `prev()` asked for a page the browser cannot scroll to, like one of the last pages of a scroller wider than them, the scroller kept that page as its goal: the next step counted from it and `onSnapChanging` stayed silent for the pages the user scrolled to. A goal past the end of the scroll is now dropped once the scroll ends.
