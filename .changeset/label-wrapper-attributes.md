---
"@vega-ui/react": patch
---

`Checkbox`, `Switch` and `SegmentedControlItem` props extend `LabelHTMLAttributes<HTMLLabelElement>`, so label attributes such as `htmlFor` and `form` are typed.
