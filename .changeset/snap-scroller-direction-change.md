---
'@vega-ui/react': patch
---

`SnapScroller`, `IndexedSnapScroller` and the scrollers of `Calendar`, `DayPicker` and `YearPicker` keep paging when the text direction changes while they are shown, for example when the page switches to Arabic or Hebrew. Before, `next()`, `prev()` and the step buttons did nothing until the scroller was resized.
