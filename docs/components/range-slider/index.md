# RangeSlider

## Doc Profile

`advanced interactive`

## Summary

`RangeSlider` is a [compound component](../../glossary.md#compound-component) for selecting a bounded min/max interval with two thumbs, a shared progress fill, and optional hidden inputs for form participation.

## Imports

```tsx
import {
  RangeSlider,
  RangeSliderHiddenInput,
  RangeSliderProgress,
  RangeSliderThumb,
  type RangeSliderHiddenInputProps,
  type RangeSliderProps,
  type RangeSliderRangeProps,
  type RangeSliderThumbProps,
} from '@vega-ui/react';
```

## Exported Types

- `RangeSliderProps`
- `RangeSliderThumbProps`
- `RangeSliderRangeProps`
- `RangeSliderHiddenInputProps`

## Minimal Composition

```tsx
<RangeSlider>
  <RangeSliderProgress />
  <RangeSliderThumb index={0}>
    <RangeSliderHiddenInput name='min' />
  </RangeSliderThumb>
  <RangeSliderThumb index={1}>
    <RangeSliderHiddenInput name='max' />
  </RangeSliderThumb>
</RangeSlider>
```

## Required Parts

- `RangeSlider`: root range state
- `RangeSliderProgress`: selected interval fill
- `RangeSliderThumb`: one thumb for each bound

## Optional Parts

- `RangeSliderHiddenInput`: one hidden input per thumb for native forms

## Composition Order

1. `RangeSlider`
2. `RangeSliderProgress`
3. `RangeSliderThumb index={0}`
4. `RangeSliderHiddenInput`
5. `RangeSliderThumb index={1}`
6. `RangeSliderHiddenInput`

## Variants

- Orientation: `horizontal` or `vertical`
- Value model: controlled or uncontrolled tuple
- Step: numeric or `'any'`
- Constraint behavior: `minRange`, `preventSkip`

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

- Thumb crossing and minimum-gap behavior need deliberate product decisions.
- Users often need visible labels for both ends of the range.
- Two hidden inputs are needed if both bounds must submit natively.

## Common Mistakes

- Treating the range like one scalar value.
- Forgetting one of the two thumbs or hidden inputs.
- Using it when exact typed min/max entry is more important than direct manipulation.
