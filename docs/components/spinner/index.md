# Spinner

## Doc Profile

`primitive`

## Summary

`Spinner` is the loading indicator for pending states and asynchronous actions. It is sized numerically and exposes primary or secondary color variants when the UI only needs compact indeterminate activity feedback.

## Imports

```tsx
import {
  Spinner,
  type SpinnerProps,
  type SpinnerSize,
  type SpinnerVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SpinnerProps`
- `SpinnerSize`
- `SpinnerVariant`

## Basic Usage

```tsx
<Spinner size={3} />
```

## Variants

- Size: `1` through `11`
- Variant: `primary` or `secondary`
- Placement: inline, inside controls, or centered in surfaces

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

- A spinner without context can be ambiguous.
- Oversized spinners inside compact controls hurt balance.
- Loading indicators should preserve layout stability where possible.
- If exact completion is known, a `Progress` bar usually communicates state better than a spinner.

## Common Mistakes

- Showing an isolated spinner without surrounding meaning.
- Replacing too much content with a spinner when a skeleton or retained layout would be clearer.
- Using the same size for button loading and page loading.
