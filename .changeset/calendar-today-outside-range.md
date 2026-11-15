---
'@vega-ui/react': patch
---

`Calendar` marks the real today with `aria-current="date"` when today is before `min` or after `max`. Before, it marked the `min` or `max` day instead, so screen readers announced the wrong day as today.
