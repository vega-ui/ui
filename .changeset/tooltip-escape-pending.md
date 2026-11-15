---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**Escape before a `Tooltip` opens.** Escape pressed on a hovered trigger while the tooltip waited for `delayOpen` did nothing, and the tooltip opened anyway. It now cancels the pending open and still leaves the key to the browser.
