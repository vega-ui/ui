---
'@vega-ui/core': patch
'@vega-ui/react': patch
---

An error thrown in an `onChangeX` callback no longer leaves the component out of sync. The error goes to the `onError` of the widget, never to the console, and the component still updates, calls the other change callbacks and finishes handling the event. Before, it kept the new value without rendering it, skipped the remaining callbacks, and did not focus, scroll or prevent the browser default.
