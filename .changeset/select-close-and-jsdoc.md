---
'@vega-ui/react': patch
---

**Closing `Select` list in Firefox and Safari.** The list hides at once when it closes in a browser without the CSS `overlay` property. Before, it stayed on screen for the fade after it left the top layer, positioned against another ancestor, so it jumped and seemed to open again.

**JSDoc.** `PageControlProgress` no longer promises a completion callback: the native `onAnimationEnd` fires once the fill completes. `Calendar` and the date field calendars state the defaults of `selection` and `defaultView` with `@default`, `Icon` no longer calls `children` required, and `Accordion.defaultOpened` has its code span closed.
