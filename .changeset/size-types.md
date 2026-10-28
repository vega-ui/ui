---
"@vega-ui/react": patch
---

Size types match the styles:

- `OptionSize` includes `xs` and `xl`, which `Option` already styles and `Select` passes down
- `PageControlSize`, `TextSize` and `CalendarBaseVariant` suggest their values and accept a custom one, like the other components
- the glossary documents the size scales: named sizes for controls and containers, numeric font steps for `Heading`, `Text` and `Spinner`
