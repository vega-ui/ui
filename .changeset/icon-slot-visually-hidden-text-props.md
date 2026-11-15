---
"@vega-ui/react": patch
---

- `Icon` sizes the SVG by `width` and `height`. Before, they were dropped and only turned off the size token
- `Slot` with a text or a list of children throws its own ``[Slot] `asChild` must be a valid React-element.`` instead of the React `Children.only` error
- `VisuallyHidden` accepts every `<div>` attribute in its types, such as `id` and `aria-live`
- `Text` with `fontWeight={600}` renders semi-bold. Before, the value was allowed by the types but had no style
