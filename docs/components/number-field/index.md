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

```tsx
<NumberField>
  <NumberFieldDecrementButton />
  <NumberFieldInput placeholder='0' />
  <NumberFieldIncrementButton />
</NumberField>
```

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
