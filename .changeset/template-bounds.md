---
"@vega-ui/utils": major
---

- **Breaking:** `normalizeTemplateDate` and `normalizeTemplateTime` no longer clamp a complete value to `min` and `max`: the `min` and `max` options and the `NormalizeTemplateTimeOptions` type are removed, and `normalizeTemplateTime` takes only the text and the template. A value outside the bounds is invalid, not corrected, like in a native date or time input
