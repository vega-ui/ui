# RangeSlider API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `[number, number]` | `—` | No | Controlled value for the slider, as a tuple [min, max]. |
| `defaultValue` | `[number, number]` | `—` | No | Uncontrolled initial value for the slider. |
| `max` | `number` | `100` | No | Maximum allowed value. |
| `min` | `number` | `0` | No | Minimum allowed value. |
| `step` | `RangeSliderStep` | `1` | No | Step between values. |
| `orientation` | `RangeSliderOrientation` | `'horizontal'` | No | Layout direction: horizontal (default) or vertical. |
| `className` | `string` | `—` | No | Custom class name for the root element. |
| `size` | `RangeSliderSize` | `—` | No | Size of the slider visuals (thumb, track, etc). |
| `minRange` | `number` | `0` | No | Minimum distance allowed between thumbs. |
| `preventSkip` | `boolean` | `true` | No | Prevents the thumbs from skipping over each other in a single gesture. |
| `onChangeValue` | `(value: [number, number]) => void` | `—` | No | Called when either thumb value changes. |
| `disabled` | `boolean` | `—` | No | the entire slider is disabled. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `RangeSliderProgress`: selected interval fill.
- `RangeSliderThumb`: one thumb per bound.
- `RangeSliderHiddenInput`: optional hidden input for each thumb.

## Types

- `RangeSliderProps`
- `RangeSliderThumbProps`
- `RangeSliderRangeProps`
- `RangeSliderHiddenInputProps`

## State Model

- The root supports controlled and uncontrolled tuple state.
- `minRange` and `preventSkip` influence how close thumbs may come and whether one gesture may pass the other.
- Each thumb exposes a narrower min/max contract through thumb context.
