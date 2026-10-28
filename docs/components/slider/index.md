# Slider

## Doc Profile

`advanced interactive`

## Summary

`Slider` is a [compound component](../../glossary.md#compound-component) for selecting one or several numbers from a bounded range. Every `SliderThumbInput` is a native `<input type="range">` laid over one `SliderTrack`, so keyboard, focus, form submission and reset, and assistive technologies behave like the native element. Two thumbs make a range slider.

## Imports

```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbInput,
  SliderThumbIndicator,
  SliderTrack,
  useSliderContext,
  useSliderThumbContext,
  type SliderOrientation,
  type SliderProps,
  type SliderRangeProps,
  type SliderSize,
  type SliderThumbProps,
  type SliderThumbInputProps,
  type SliderThumbIndicatorProps,
  type SliderTrackProps,
  type SliderVariant,
} from '@vega-ui/react';
```

## Exported Types

- `SliderProps`
- `SliderTrackProps`
- `SliderRangeProps`
- `SliderThumbProps`
- `SliderThumbInputProps`
- `SliderThumbIndicatorProps`
- `SliderSize`
- `SliderVariant`
- `SliderOrientation`

## Minimal Composition

```tsx
<Slider defaultValue={30} name='volume'>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Volume' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Required Parts

- `Slider`: root, values of all thumbs and shared range settings
- `SliderThumb`: one handle per value
- `SliderThumbInput`: the native range input of a handle

## Optional Parts

- `SliderTrack`: the visible rail
- `SliderRange`: the filled part of the rail, inside `SliderTrack`
- `SliderThumbIndicator`: the visual handle; without it the thumb is invisible

## Composition Order

1. `Slider`
2. `SliderTrack` > `SliderRange`
3. `SliderThumb`, one per value, `index` in order from `min` to `max`, with `SliderThumbInput` and `SliderThumbIndicator` inside

## Variants

- Size: `sm`, `md`, `lg`
- Variant: `primary`, `secondary`
- Orientation: `horizontal` or `vertical`
- Thumbs: one value or a range of several
- Value model: controlled or uncontrolled on the root, a number for one thumb or an array for several
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
- Thumbs cannot pass each other; `minStepsBetweenThumbs` keeps a gap between them.
- Without `value` or `defaultValue` the slider has one thumb in the middle, like `<input type="range">`.

## Common Mistakes

- Using a slider where exact numeric entry is the primary need.
- Forgetting visible value feedback for precision-sensitive flows.
- Leaving thumbs without `aria-label` or `aria-labelledby`.
- Rendering a different number of `SliderThumb`s than values, or giving two thumbs the same `index`.
