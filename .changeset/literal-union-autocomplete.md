---
"@vega-ui/react": patch
---

Size, variant and appearance types (`ButtonSize`, `TextFieldSize`, `BadgeVariant`, `HeadingSize` and the rest) suggest their known values in the editor again. They were unions with `string` or `number`, which TypeScript collapses into a plain `string` or `number`; they now end with `(string & {})` or `(number & {})`, so any other value is still accepted.
