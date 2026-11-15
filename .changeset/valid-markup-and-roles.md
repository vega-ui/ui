---
'@vega-ui/react': major
---

BREAKING: components render valid HTML and keep their roles.

- **`PageControl` root.** The root is a `<div role="tablist">` instead of a `<ul>`, whose children could only be `<li>`. Its `ref` and attributes are typed for `HTMLDivElement`. Put the items straight inside it, without `<li>`.
- **Current `PageControlItem`.** `current` no longer disables the item, so the current page stays focusable and keyboard users can reach it. Pass `disabled` yourself to disable it.
- **Active `PageControlProgress`.** The active item stays a `tab` with `aria-selected="true"` instead of becoming a `meter`, so the tablist keeps its selected tab. It no longer sets `aria-valuemax` or `aria-valuenow`, and the fill is visual only. `current` now marks the item like on `PageControlItem`.
- **`CheckboxCardControl`.** It renders a `<span>` instead of a second `<label>` inside the card's label. Its `ref` and attributes are typed for `HTMLSpanElement`. `Checkbox` takes `asChild` to render through its child for the same case.
- **`Badge`, `Avatar`, `AvatarStackItem` and `VisuallyHidden`.** They render a `<span>` instead of a `<div>`, so they are valid inside `<p>`, `<label>` and `<button>`. Their `ref` and attributes are typed for `HTMLSpanElement`. `<VisuallyHidden asChild><span>` is no longer needed for that.
- **`AlertContent`.** It renders its children in a `<div>` instead of a `<p>`, so it can hold paragraphs and lists. Wrap plain text in your own `<p>` where you need a paragraph.
- **`Text` whitespace.** `Text` no longer sets `white-space: pre-line` and collapses whitespace like a native `<span>`, so hard-wrapped copy reads as one paragraph. Set `whiteSpace: 'pre-line'` where the newlines matter, such as an address.
- **`Card` alignment.** The children of `Card` stretch to its width, as in any column flexbox, instead of shrinking to their content. Set `alignSelf: 'flex-start'` on a child, such as a button, that should keep its own width.
