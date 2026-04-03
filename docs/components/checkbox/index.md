# Checkbox

## Doc Profile

`advanced interactive`

## Summary

`Checkbox` is a [compound component](../../glossary.md#compound-component) for independent selectable options, with optional native form participation, indicator rendering, and indeterminate state support. It is the selection-family primitive for independent or combinable choices rather than immediate setting toggles.

## Imports

```tsx
import {
  Checkbox,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxVariant,
} from '@vega-ui/react';
```

## Exported Types

- `CheckboxProps`
- `CheckboxHiddenInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxSize`
- `CheckboxVariant`

## Minimal Composition

```tsx
<Checkbox>
  <CheckboxHiddenInput />
  <CheckboxIndicator>
    <CheckboxCheckedIcon />
    <CheckboxIndeterminateIcon />
  </CheckboxIndicator>
  Accept terms
</Checkbox>
```

## Required Parts

- `Checkbox`: root state and label surface
- `CheckboxIndicator`: visible checkbox surface

## Optional Parts

- `CheckboxHiddenInput`: native form participation
- `CheckboxCheckedIcon`: checked-state icon
- `CheckboxIndeterminateIcon`: indeterminate-state icon

## Composition Order

1. `Checkbox`
2. `CheckboxHiddenInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. label text

## Variants

- Sizes: `sm`, `md`, `lg`
- Variants: `primary`, `secondary`
- States: unchecked, checked, indeterminate, disabled

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Use hidden input participation for native forms.
- Indeterminate usually represents partial selection rather than a third final value.
- Keep indicator and text inside one unified clickable row.
- If the control represents one immediate system setting, `Switch` is usually clearer than a checkbox row.

## Common Mistakes

- Forgetting the hidden input in real forms.
- Treating indeterminate as a final persisted state by default.
- Using checkbox UI for mutually exclusive options.
