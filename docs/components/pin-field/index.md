# PinField

## Doc Profile

`advanced interactive`

## Summary

`PinField` is a [compound component](../../glossary.md#compound-component) for fixed-length codes such as OTPs and PINs. A hidden input stores the real value while visible slots render each character position, making segmented code entry the primary interaction model rather than a styling effect.

## Imports

```tsx
import {
  PinField,
  PinFieldHiddenInput,
  PinFieldSeparator,
  PinFieldSlot,
  type PinFieldHiddenInputProps,
  type PinFieldProps,
  type PinFieldSeparatorProps,
  type PinFieldSize,
  type PinFieldSlotProps,
} from '@vega-ui/react';
```

## Exported Types

- `PinFieldProps`
- `PinFieldHiddenInputProps`
- `PinFieldSlotProps`
- `PinFieldSeparatorProps`
- `PinFieldSize`

## Minimal Composition

```tsx
<PinField maxLength={4}>
  <PinFieldHiddenInput />
  <PinFieldSlot index={0} />
  <PinFieldSlot index={1} />
  <PinFieldSlot index={2} />
  <PinFieldSlot index={3} />
</PinField>
```

## Required Parts

- `PinField`: root state container
- `PinFieldHiddenInput`: single hidden backing input
- `PinFieldSlot`: visible per-character slot

## Optional Parts

- `PinFieldSeparator`: visual grouping separator between slots

## Composition Order

1. `PinField`
2. `PinFieldHiddenInput`
3. one or more `PinFieldSlot`
4. optional `PinFieldSeparator`

## Variants

- Size: `sm`, `md`, `lg`
- Input model: numeric, alphabetic, or alphanumeric mask
- Layout: continuous slots or grouped slots with separators

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

- Paste behavior and caret synchronization are core to usability.
- Slot order must stay aligned with `maxLength`.
- The hidden input is what participates in native form behavior and focus handling.
- The backend code policy, allowed characters, and client-side mask should stay aligned instead of being inferred independently.

## Common Mistakes

- Forgetting `PinFieldHiddenInput`.
- Rendering fewer or more slots than the intended code length supports.
- Using a mask that does not match the backend code format.
