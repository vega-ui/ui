# HelperText

## Doc Profile

`primitive`

## Summary

`HelperText` renders supporting field copy such as hints, usage guidance, and validation-adjacent messages. It reuses the `Text` typography layer and adds semantic helper or error coloring for field-level support content.

## Imports

```tsx
import { HelperText, type HelperTextProps } from '@vega-ui/react';
```

## Exported Types

- `HelperTextProps`

## Basic Usage

```tsx
<HelperText>Use at least 8 characters.</HelperText>
```

## Variants

- Size: `sm`, `md`, `lg`
- State: default helper copy or `error`
- Placement: below fields, selectors, or grouped controls

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

- `error` changes tone, but the field itself still needs its own invalid state.
- Helper copy should stay short enough to scan with the associated control.
- Long explanatory text usually belongs in body copy, not helper text.
- The component supports one control or one grouped field concept; it should not become a dumping ground for unrelated form instructions.

## Common Mistakes

- Repeating the same content already present in the label.
- Using helper text as the only error indicator.
- Writing policy or legal paragraphs in helper text style.
