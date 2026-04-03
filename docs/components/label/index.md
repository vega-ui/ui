# Label

## Doc Profile

`primitive`

## Summary

`Label` is the semantic label primitive for form fields. It reuses the `Text` typography contract while rendering a native `<label>` element, so naming a control stays separate from generic text styling.

## Imports

```tsx
import { Label, type LabelProps } from '@vega-ui/react';
```

## Exported Types

- `LabelProps`

## Basic Usage

```tsx
<Label htmlFor='email'>Email</Label>
```

## Variants

- Size: follows the label size contract from `LabelProps`
- Composition: native label element with VegaUI text styling
- Integration: direct `htmlFor` usage or wrapping a control

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Wrapping a control and using `htmlFor` at the same time is usually unnecessary.
- `Label` inherits the `Text` typographic model, so visual changes can affect field-label consistency.
- Interactive content inside a label can create ambiguous click behavior.
- `Label` should name one control or one wrapped input concept; group labeling belongs to `FieldsetLegend`.

## Common Mistakes

- Using placeholder text as the only visible label.
- Using `Label` for static section headings instead of form controls.
- Putting multiple unrelated controls inside one label wrapper.
