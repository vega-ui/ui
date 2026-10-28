---
"@vega-ui/react": minor
---

Every control and container takes the full `xs`–`xl` size scale:

- `Accordion`, `Card`, `Checkbox`, `CheckboxCard`, `HelperText`, `Label`, `Meter`, `MeterStack`, `PageControl`, `Progress`, `Radio`, `Slider`, `Switch` and `TextArea` add the `xs` and `xl` sizes
- `OptionSize` includes `xs` and `xl`, which `Option` already styles and `Select` passes down
- `PageControlSize`, `TextSize` and `CalendarBaseVariant` suggest their values and accept a custom one, like the other components
- the glossary documents the two scales: named sizes for controls and containers, numeric font steps for `Heading`, `Text` and `Spinner`
