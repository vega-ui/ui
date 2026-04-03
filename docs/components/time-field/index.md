# TimeField

## Doc Profile

`advanced interactive`

## Summary

`TimeField` is a [compound component](../../glossary.md#compound-component) for masked time entry. It builds on `TextField` and adds format, min/max, and step constraints for time strings when the product value is time-only.

## Imports

```tsx
import {
  TimeField,
  TimeFieldInput,
  type TimeFieldInputProps,
  type TimeFieldProps,
} from '@vega-ui/react';
```

## Exported Types

- `TimeFieldProps`
- `TimeFieldInputProps`

## Minimal Composition

```tsx
<TimeField>
  <TimeFieldInput placeholder='HH:MM' />
</TimeField>
```

## Required Parts

- `TimeField`: root time constraints and format provider
- `TimeFieldInput`: masked text input

## Optional Parts

- no extra public parts beyond the input

## Composition Order

1. `TimeField`
2. `TimeFieldInput`

## Variants

- Format: `HH:MM` or `HH:MM:SS`
- Bounds: optional `min` and `max`
- State: controlled or uncontrolled text value, disabled through input props

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

- Format, `min`, and `max` must agree with each other.
- Partial typed values should not be treated as complete times too early.
- Users need clear 24-hour format expectations in product copy.
- If the feature really stores a timestamp, `DateTimeField` is usually the clearer abstraction than splitting date and time policy ad hoc.

## Common Mistakes

- Assuming locale formatting instead of documenting the expected mask.
- Passing format-specific bounds that do not match the chosen format.
- Treating incomplete masked text as valid submission data.
