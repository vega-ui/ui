# TextArea

## Doc Profile

`form-control`

## Summary

`TextArea` is the multiline text input for longer free-form content. It combines native textarea semantics with size, full-width, and error styling when the product value is intentionally multiline.

## Imports

```tsx
import { TextArea, type TextAreaProps, type TextAreaSize } from '@vega-ui/react';
```

## Exported Types

- `TextAreaProps`
- `TextAreaSize = 'sm' | 'md' | 'lg' | string`

## Basic Usage

```tsx
<TextArea placeholder='Describe the issue you ran into' />
```

## Variants

- Size: `sm`, `md`, `lg`
- State: default, `error`, disabled
- Layout: regular width or `fullWidth`
- Value model: controlled or uncontrolled

## Related Docs

- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Long content and resize behavior should be tested in constrained layouts.
- `fullWidth` changes width, not height strategy.
- `TextArea` is better for multiline content than forcing multi-line behavior into `TextField`.
- Validation, helper text, and layout should account for long content, not just the first visible lines.

## Common Mistakes

- Using `TextArea` for short single-line values.
- Forgetting helper text or labels around long-form input.
- Treating `error` as a replacement for real validation messaging.
