# SliderBase

## Doc Profile

`advanced interactive`

## Summary

`SliderBase` is the low-level slider foundation used by `Slider` and `RangeSlider`. It owns the track styling contract and composes thumb, progress, and hidden-input parts without implementing a complete product-facing interaction model on its own.

## Imports

```tsx
import {
  SliderBase,
  SliderBaseHiddenInput,
  SliderBaseProgress,
  SliderBaseThumb,
  type SliderBaseHiddenInputProps,
  type SliderBaseOrientation,
  type SliderBaseProgressProps,
  type SliderBaseProps,
  type SliderBaseSize,
  type SliderBaseThumbProps,
  type SliderBaseVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SliderBaseProps`
- `SliderBaseThumbProps`
- `SliderBaseProgressProps`
- `SliderBaseHiddenInputProps`
- `SliderBaseSize = 'sm' | 'md' | 'lg' | string`
- `SliderBaseVariant = 'primary' | 'secondary' | string`
- `SliderBaseOrientation = 'horizontal' | 'vertical'`

## Minimal Composition

```tsx
<SliderBase value={20}>
  <SliderBaseProgress />
  <SliderBaseThumb>
    <SliderBaseHiddenInput name='volume' value={20} />
  </SliderBaseThumb>
</SliderBase>
```

## Required Parts

- `SliderBase`: root track surface and shared slider variables
- `SliderBaseProgress`: selected-range fill
- `SliderBaseThumb`: positioned handle

## Optional Parts

- `SliderBaseHiddenInput`: native form participation for the current value

## Composition Order

1. `SliderBase`
2. `SliderBaseProgress`
3. `SliderBaseThumb`
4. optional `SliderBaseHiddenInput` inside the thumb

## Variants

- Size: `sm`, `md`, `lg`
- Variant: `primary`, `secondary`
- Orientation: `horizontal`, `vertical`

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

- Orientation changes both geometry and hit-area expectations.
- Hidden inputs are useful when the value should participate in native forms.
- `value`, `min`, and `max` can flow from the root through inherited CSS variables for simple one-thumb shells.
- `SliderBase` is a foundation primitive; product code should usually prefer `Slider` or `RangeSlider`.

## Common Mistakes

- Repeating root props on every child even when the root already provides the needed CSS variables.
- Omitting form participation where native submission is expected.
- Treating the base primitive as if it already included full pointer and keyboard value logic.
