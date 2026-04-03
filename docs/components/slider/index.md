# Slider

## Doc Profile

`advanced interactive`

## Summary

`Slider` is a [compound component](../../glossary.md#compound-component) for selecting one numeric value from a bounded range. It composes a base track, a progress fill, a thumb, and an optional hidden input for native form participation.

## Imports

```tsx
import {
  Slider,
  SliderHiddenInput,
  SliderProgress,
  SliderThumb,
  type SliderHiddenInputProps,
  type SliderProgressProps,
  type SliderProps,
  type SliderSize,
  type SliderThumbProps,
} from '@vega-ui/react';
```

## Exported Types

- `SliderProps`
- `SliderThumbProps`
- `SliderProgressProps`
- `SliderHiddenInputProps`
- `SliderSize`

## Minimal Composition

```tsx
<Slider>
  <SliderProgress />
  <SliderThumb>
    <SliderHiddenInput name='volume' />
  </SliderThumb>
</Slider>
```

## Required Parts

- `Slider`: root state and track container
- `SliderProgress`: filled track from min to current value
- `SliderThumb`: interactive handle

## Optional Parts

- `SliderHiddenInput`: native range input for form participation and extra browser semantics

## Composition Order

1. `Slider`
2. `SliderProgress`
3. `SliderThumb`
4. `SliderHiddenInput`

## Variants

- Size: `sm`, `md`, `lg`
- Orientation: `horizontal` or `vertical`
- Value model: controlled or uncontrolled
- Step: numeric step or `'any'`

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

- Exact values are harder to target with a slider than with typed input.
- Vertical sliders need an explicit height.
- `SliderHiddenInput` is recommended when the value should submit with native forms.

## Common Mistakes

- Using a slider where exact numeric entry is the primary need.
- Forgetting visible value feedback for precision-sensitive flows.
- Omitting `SliderHiddenInput` when the value must participate in native form submission.
