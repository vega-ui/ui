---
"@vega-ui/utils": minor
---

New `subscribeFormReset(element, onReset)`: calls `onReset` when a form that owns `element` or a control inside it is reset. Forms linked by the `form` attribute count, the owner is checked at reset time, and a canceled reset is skipped.
