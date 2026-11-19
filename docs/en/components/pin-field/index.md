# PinField

## Doc Profile

`advanced interactive`

## Summary

`PinField` is a [compound component](../../glossary.md#compound-component) for fixed-length codes such as OTPs and PINs. A visually hidden input stores the real value while visible slots render each character position, making segmented code entry the primary interaction model rather than a styling effect.

## Imports

```tsx
import {
  PinField,
  PinFieldInput,
  PinFieldSeparator,
  PinFieldSlot,
  type PinFieldInputProps,
  type PinFieldProps,
  type PinFieldSeparatorProps,
  type PinFieldSize,
  type PinFieldSlotProps,
} from '@vega-ui/react';
```

## Exported Types

- `PinFieldProps`
- `PinFieldInputProps`
- `PinFieldSlotProps`
- `PinFieldSeparatorProps`
- `PinFieldSize`

## Minimal Composition

<!-- example: pin-field/minimal-composition.tsx -->
```tsx
import { PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PinField maxLength={4}>
      <PinFieldInput aria-label='Card PIN' autoComplete='off' />
      <PinFieldSlot index={0} />
      <PinFieldSlot index={1} />
      <PinFieldSlot index={2} />
      <PinFieldSlot index={3} />
    </PinField>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyPinField` passes its props to `PinField`, its `id`, `name` and `autoComplete` to the input for a `Label`, the form and autofill, and renders one slot for each character of `maxLength`. See [Component recipes](../../recipes.md).

<!-- example: pin-field/recipe.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot, type PinFieldProps } from '@vega-ui/react';
import { useId } from 'react';

interface MyPinFieldProps extends PinFieldProps {
  name?: string
  autoComplete?: string
}

export function MyPinField({ id, name, autoComplete, maxLength = 4, ...props }: MyPinFieldProps) {
  const slots = Array.from({ length: maxLength }, (_, index) => index);

  return (
    <PinField maxLength={maxLength} {...props}>
      <PinFieldInput id={id} name={name} autoComplete={autoComplete} />
      {slots.map((index) => <PinFieldSlot key={index} index={index} />)}
    </PinField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from the text message</Label>
      <MyPinField id={id} name='code' autoComplete='one-time-code' maxLength={6} />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `PinField`: root state container
- `PinFieldInput`: single hidden backing input
- `PinFieldSlot`: visible per-character slot

## Optional Parts

- `PinFieldSeparator`: visual grouping separator between slots

## Composition Order

1. `PinField`
2. `PinFieldInput`
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
- `PinFieldInput` is what participates in native form behavior and focus handling.
- The backend code policy, allowed characters, and client-side mask should stay aligned instead of being inferred independently.

## Common Mistakes

- Forgetting `PinFieldInput`.
- Rendering fewer or more slots than the intended code length supports.
- Using a mask that does not match the backend code format.
