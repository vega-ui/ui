# Slider API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `V` | `—` | No | Controlled value: a number for one thumb, or an array with one entry per `SliderThumb` by its `index`. |
| `defaultValue` | `V` | `—` | No | Initial value for uncontrolled usage: a number for one thumb, or an array with one entry per `SliderThumb` by its `index`. |
| `onChangeValue` | `(value: NoInfer<V>) => void` | `—` | No | Called when a thumb changes, with a number or an array, in the shape of `value` or `defaultValue`. |
| `min` | `number` | `0` | No | minimum allowed value. |
| `max` | `number` | `100` | No | maximum allowed value. |
| `step` | `number \\| 'any'` | `1` | No | granularity of the values, a number or `'any'`. |
| `minStepsBetweenThumbs` | `number` | `0` | No | minimum distance between neighbouring thumbs, in steps. |
| `orientation` | `SliderOrientation` | `'horizontal'` | No | `'horizontal'` (default) or `'vertical'`, which grows from the bottom. |
| `size` | `SliderSize` | `'md'` | No | Visual size of the slider. |
| `variant` | `SliderVariant` | `'primary'` | No | Visual styling variant. |
| `disabled` | `boolean` | `—` | No | Disables all thumbs. |
| `name` | `string` | `—` | No | Form field name of the thumbs, unless a thumb sets its own. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the root element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SliderTrack`: the rail, a `div`.
- `SliderRange`: the filled part of the rail, a `div` inside `SliderTrack`.
- `SliderThumb`: one handle, a `div` with `display: contents` that groups its input and indicator.
  - `index`: its entry of the root `value`, `0` by default
  - sets the position variables; CSS variables in its `style` reach both parts
- `SliderThumbInput`: the native `<input type="range">` inside `SliderThumb`. All its props (`name`, `disabled`, `list`, `aria-*`, `onChange`, `ref`…) go to the input; `min`, `max`, `step` and `value` come from the root.
- `SliderThumbIndicator`: the visual handle inside `SliderThumb`, a `div` with any content. It is `aria-hidden` and lets the pointer through to the input.

## Hooks

Advanced hooks for custom parts inside `Slider`. Use them only when the exported parts are not enough.

### `useSliderContext`

Root state, available anywhere inside `Slider`:

| Field | Type | Notes |
| --- | --- | --- |
| `min` | `number` | Root `min`. |
| `max` | `number` | Root `max`. |
| `step` | `number \| 'any'` | Root `step`. |
| `gap` | `number` | Minimum distance between neighbouring thumbs: `minStepsBetweenThumbs * step`, `0` with `step='any'`. |
| `orientation` | `SliderOrientation` | Root `orientation`. |
| `disabled` | `boolean \| undefined` | Root `disabled`. |
| `name` | `string \| undefined` | Root `name`. |
| `values` | `number[]` | Current values of all thumbs by `index`, snapped to the step grid and sorted, an array even for one thumb. |
| `changeThumb(index, value)` | `(index: number, value: number) => void` | Sets the value of the thumb at `index`, kept between its neighbours; reports through `onChangeValue`. |

### `useSliderThumbContext`

The surrounding `SliderThumb`:

| Field | Type | Notes |
| --- | --- | --- |
| `index` | `number` | `index` of the thumb. |
| `low` | `number` | Lowest value the thumb may take: the previous thumb plus `gap`, or `min`. |
| `high` | `number` | Highest value the thumb may take: the next thumb minus `gap`, or `max`. |

A value bubble that also works without `value` on the root:

```tsx
const ThumbValue = () => {
  const { values } = useSliderContext();
  const { index } = useSliderThumbContext();

  return <>{values[index]}</>;
};

<SliderThumb index={0}>
  <SliderThumbInput aria-label='Minimum price' />
  <SliderThumbIndicator>
    <ThumbValue />
  </SliderThumbIndicator>
</SliderThumb>
```

## Types

- `SliderProps`
- `SliderTrackProps`
- `SliderRangeProps`
- `SliderThumbProps`
- `SliderThumbInputProps`
- `SliderThumbIndicatorProps`
- `SliderSize`
- `SliderVariant`
- `SliderOrientation`

## State Model

`Slider` owns the values of its thumbs. The shape follows `value` or `defaultValue`: a number for one thumb, an array with one entry per `SliderThumb` by its `index` for several. `onChangeValue` receives the same shape.

- Uncontrolled: `defaultValue` sets the start; a reset of the form of the thumbs restores it, including a form linked with the `form` attribute. Without `value` and `defaultValue` the slider has one thumb in the middle of the range and reports numbers, like `<input type="range">`.
- Controlled: `value` with `onChangeValue`. A change the parent does not apply is rolled back, like a controlled input.
- Each thumb is a controlled native input: pointer, keyboard, focus, forms and assistive technologies come from the browser, and `onChange` on a thumb fires for every change.
- Values off the step grid or outside `min`/`max` are snapped like `<input type="range">` does, without calling `onChangeValue`.
- The shape is fixed by the first value: switching between a number and an array on the fly is not supported.

```tsx
const [volume, setVolume] = useState(40);

<Slider value={volume} onChangeValue={setVolume}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb>
    <SliderThumbInput aria-label='Volume' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

```tsx
const [price, setPrice] = useState([20, 80]);

<Slider value={price} onChangeValue={setPrice} minStepsBetweenThumbs={5}>
  <SliderTrack>
    <SliderRange />
  </SliderTrack>
  <SliderThumb index={0}>
    <SliderThumbInput aria-label='From' />
    <SliderThumbIndicator />
  </SliderThumb>
  <SliderThumb index={1}>
    <SliderThumbInput aria-label='To' />
    <SliderThumbIndicator />
  </SliderThumb>
</Slider>
```

## Thumb Constraints

- Each thumb input gets its own native `min` and `max`: the neighbours' values, `minStepsBetweenThumbs * step` away, or the root `min` and `max` at the ends. The browser keeps the thumb between them for dragging and keys, and `aria-valuemin`/`aria-valuemax` announce the real limits.
- With `step='any'` there is no step to count, so `minStepsBetweenThumbs` has no effect and thumbs may meet; use a small numeric step such as `0.01` to keep a gap.
- Values given out of order are sorted and kept `minStepsBetweenThumbs` steps apart, without calling `onChangeValue`, so the thumbs, the inputs and the submitted values agree.

## Behavior

- Like `<input type="range">`, steps count from `min` and the value stays within `min` and the last step that fits in `max`.
- The inputs of neighbouring thumbs are cut at the midpoint between their values, so a click on the track moves the nearest thumb natively. Stacked thumbs are split at their centre: the left half moves the lower one, the right half the upper one.
- A disabled thumb keeps its half of the track: a click there does nothing.
- On touch screens a horizontal slider leaves gestures to the browser like `<input type="range">`; a vertical one sets `touch-action: pan-x pinch-zoom`, so a vertical swipe moves the thumb instead of scrolling the page.
- A `<datalist>` connected through `list` snaps the pointer natively; its tick marks are not visible, draw your own.
