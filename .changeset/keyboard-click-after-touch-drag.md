---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

**Keyboard click after a touch drag.** After a touch drag of a `Sheet` or `Drawer` that the browser ended without a click, the next click inside it was swallowed even when it came from the keyboard or a screen reader, so Enter on the close button did nothing once. The adapter now swallows only a click made by the pointer.
