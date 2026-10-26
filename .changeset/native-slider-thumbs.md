---
"@vega-ui/react": major
---

`Slider` is rebuilt on native `<input type="range">` and takes one or several thumbs:

```tsx
<Slider value={price} onChangeValue={setPrice} name='price'>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb index={0}>
    <SliderThumbInput aria-label='Minimum price' />
    <SliderThumbIndicator />
  </SliderThumb>
  <SliderThumb index={1}>
    <SliderThumbInput aria-label='Maximum price' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

Breaking:
- `RangeSlider` and `SliderBase` with all their parts are removed; a `Slider` with two `SliderThumb`s replaces `RangeSlider`
- `value`, `defaultValue` and `onChangeValue` take a number for one thumb or an array with one entry per thumb by its `index`; `onChangeValue` gets the same shape
- `SliderProgress` and `SliderHiddenInput` are removed; use `SliderTrack` with `SliderRange` inside, and `name` on `Slider` or `SliderThumbInput`
- `useSliderContext` gives `values`, an array for every thumb, instead of `value`, and adds `gap`, `name` and `changeThumb(index, value)`; `useRangeSliderContext` and `useRangeSliderThumbContext` are removed, use `useSliderContext` and the new `useSliderThumbContext` with `index`, `low` and `high`
- `SliderThumb` holds two parts: `SliderThumbInput`, the native range input that takes the input props and `ref`, and `SliderThumbIndicator`, the visual handle with any content

New:
- pointer, keyboard, focus and form submission come from the native input; `PageUp`/`PageDown` move by a tenth of the whole range, and `ArrowRight`/`ArrowLeft` increase and decrease a vertical slider in every browser
- a form reset restores `defaultValue`, unless the reset is canceled
- values off the step grid or outside `min`/`max` are snapped like the native input does, and values out of order are sorted, so the thumbs, the native inputs and the submitted values always agree
- several thumbs on one track: each input gets its neighbours as native `min`/`max`, so thumbs cannot pass each other and `aria-valuemin`/`aria-valuemax` show the real limits; `minStepsBetweenThumbs` keeps a gap
- the inputs of neighbouring thumbs are cut with `clip-path` at the midpoint between their values, so a click on the track moves the nearest thumb and stacked thumbs split at their centre; the slider looks disabled when none of its thumbs is enabled
- a vertical slider sets `touch-action: pan-x pinch-zoom`, so a vertical swipe on it moves the thumb instead of scrolling the page
- `variant`, `name` and `minStepsBetweenThumbs` on `Slider`; `index` on `SliderThumb`; `SliderThumbInput` and `SliderThumbIndicator`
- the thumb position takes `min` into account (before it was `value / max`)
- `SliderVariant` and `SliderOrientation` types
