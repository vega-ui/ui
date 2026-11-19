# NumberField

## Doc Profile

`advanced interactive`

## Summary

`NumberField` is a [compound component](../../glossary.md#compound-component) for numeric entry with optional stepper buttons, bounds, masking, and wheel or keyboard stepping. It is for exact numeric values, not just any text that happens to contain digits.

## Imports

```tsx
import {
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  type NumberFieldDecrementProps,
  type NumberFieldIncrementProps,
  type NumberFieldInputProps,
  type NumberFieldProps,
  type NumberFieldSize,
} from '@vega-ui/react';
```

## Exported Types

- `NumberFieldProps`
- `NumberFieldInputProps`
- `NumberFieldIncrementProps`
- `NumberFieldDecrementProps`
- `NumberFieldSize`

## Minimal Composition

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton square aria-label='Remove a seat'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton square aria-label='Add a seat'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyNumberField` passes its props to `NumberField`, its `id` and `name` to the input, and names the steppers with `decrementLabel` and `incrementLabel`. See [Component recipes](../../recipes.md).

<!-- example: number-field/recipe.tsx -->
```tsx
import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  type NumberFieldProps,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyNumberFieldProps extends NumberFieldProps {
  name?: string
  decrementLabel: string
  incrementLabel: string
}

export function MyNumberField({ id, name, decrementLabel, incrementLabel, ...props }: MyNumberFieldProps) {
  return (
    <NumberField {...props}>
      <NumberFieldDecrementButton square aria-label={decrementLabel}><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
      <NumberFieldInput id={id} name={name} />
      <NumberFieldIncrementButton square aria-label={incrementLabel}><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
    </NumberField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <MyNumberField id={id} name='seats' min={1} max={50} defaultValue={5} decrementLabel='Remove a seat' incrementLabel='Add a seat' />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `NumberField`: root state container
- `NumberFieldInput`: numeric text input

## Optional Parts

- `NumberFieldIncrementButton`: step up control
- `NumberFieldDecrementButton`: step down control

## Composition Order

1. `NumberField`
2. `NumberFieldDecrementButton`
3. `NumberFieldInput`
4. `NumberFieldIncrementButton`

## Variants

- Size: `sm`, `md`, `lg`
- Value model: controlled or uncontrolled
- Interaction: typed entry, step buttons, arrow keys, optional mouse wheel

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

- Typed values can be temporarily empty or incomplete during editing.
- Step buttons, typed input, and bounds logic should stay in sync.
- Wheel-based changes can be surprising in dense forms if enabled without care.
- The same numeric policy should drive typing, stepping, clamping, and validation instead of letting each path behave differently.

## Common Mistakes

- Treating every intermediate typed value as a valid final number.
- Forgetting bounds handling when step buttons are present.
- Using it where a free-form text field would be clearer.
