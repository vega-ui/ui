---
'@vega-ui/react': patch
'@vega-ui/widgets': patch
---

**Closing `Popover` in Chrome.** The content stays mounted from the moment the popover opens until its closing animation ends. Before, it unmounted for a frame between the hide and the browser's `toggle` event and then came back for the fade, so a popover closed by picking a date, Escape or a click outside seemed to hide twice. This affected every field with a calendar popover.
