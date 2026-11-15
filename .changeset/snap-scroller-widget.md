---
"@vega-ui/react": major
---

`SnapScroller` and `IndexedSnapScroller` run on one `@vega-ui/core` widget:

- The page offsets are measured when the pages or the size of the scroller change, and the snapped page is read from them on every scroll, without a measure per frame.
- An item whose `index` changes is reported under its new index. Before, the scroller could keep the old index of the element and skip the callbacks.
- `useSnapScrollerContext()` returns the widget `handle` instead of `itemRef` and `removeItemRef`.
- `IndexedSnapScroller` keeps its window of pages, the controlled `index`, the scroll position across a re-centered window and the pending scroll of `next()`, `prev()` and `setIndexTo()` in the widget instead of component effects.
- `IndexedSnapScroller` keeps reporting a swipe after `setIndexTo()` is called with the page already shown. Before, the scroller waited for a scroll that never came and skipped `onScrollSnapChanging` until a wheel or a press.
- `DayPicker` and `YearPicker` keep the first focused month and year, which the pages of their scrollers count from, in the widget instead of component state; `useDayPickerContext()` gives it as `anchor`, like `useYearPickerContext()`.
