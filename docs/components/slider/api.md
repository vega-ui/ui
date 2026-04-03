# Slider API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `number` | `—` | No | Controlled value of the slider. |
| `defaultValue` | `number` | `—` | No | Initial value of the slider for uncontrolled usage. |
| `onChangeValue` | `(value: number) => void` | `—` | No | Callback fired when the slider value changes. |
| `max` | `number` | `100` | No | maximum allowed value for the slider. |
| `min` | `number` | `0` | No | minimum allowed value for the slider. |
| `step` | `number \\| 'any'` | `1` | No | granularity with which the value can be incremented or decremented. |
| `orientation` | `'vertical' \\| 'horizontal'` | `'horizontal'` | No | Orientation of the slider. |
| `size` | `SliderSize` | `'md'` | No | Visual size of the slider. |
| `disabled` | `boolean` | `—` | No | the slider is disabled and non-interactive. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `SliderProgress`: filled track.
- `SliderThumb`: interactive handle.
- `SliderHiddenInput`: native range input for form participation.

## Types

- `SliderProps`
- `SliderThumbProps`
- `SliderProgressProps`
- `SliderHiddenInputProps`
- `SliderSize`

## State Model

- The root supports controlled and uncontrolled value models.
- Pointer and keyboard input both update the same root value.
- When `step='any'`, pointer movement is not snapped.
