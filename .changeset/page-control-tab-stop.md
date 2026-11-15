---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**`PageControl` tab stop.** A page control without an active page, with an active page outside its items, or with a disabled active page had no page in the Tab order, so the keyboard could not reach it. The first enabled page now takes the tab stop in those cases; the active page still keeps it otherwise.
