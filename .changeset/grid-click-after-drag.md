---
'@vega-ui/core': patch
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**`Grid` click after a drag.** A drag selection that ended outside the grid left it waiting for the click that ends a drag, so the next click on a cell without a press, like one from a screen reader, did not select it. The grid now swallows only the click in the same task as the release, through a zero timer `DRAGGED` of the `selection` fragment.
