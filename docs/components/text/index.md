# Text

## Doc Profile

`primitive`

## Summary

`Text` is the base body-typography primitive. It controls size and weight while allowing semantic composition through `asChild`.

## Imports

```tsx
import { Text, type TextProps, type TextSize } from '@vega-ui/react';
```

## Exported Types

- `TextProps`
- `TextSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11`

## Basic Usage

```tsx
<Text size={3}>Body copy</Text>
```

## Variants

- Size: `1` through `11`
- Weight: `400`, `500`, `600`, `700`, `900`
- Composition: default element or `asChild`

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

- `asChild` changes the rendered element but keeps the text styling contract.
- `white-space: pre-line` preserves newline breaks from content strings.
- Very large text sizes should still be checked against layout and line length.

## Common Mistakes

- Using `Text` where document headings should be semantic `Heading`.
- Overriding weight and size ad hoc instead of using the design scale.
- Forgetting that multiline content will preserve line breaks.
