# SliderBase API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `number` | `—` | No | current numeric value of the slider thumb. |
| `max` | `number` | `100` | No | maximum value of the slider range. |
| `min` | `number` | `0` | No | minimum value of the slider range. |
| `step` | `number \\| 'any'` | `—` | No | step interval between allowed values. |
| `className` | `string` | `—` | No | class name for applying custom styles to the root slider container. |
| `size` | `SliderBaseSize` | `'md'` | No | Visual size of the slider. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | React ref to access the root slider DOM node. |
| `variant` | `SliderBaseVariant` | `'primary'` | No | Visual styling variant. |
| `disabled` | `boolean` | `false` | No | the slider is disabled and non-interactive. |
| `orientation` | `SliderBaseOrientation` | `'horizontal'` | No | Direction in which the slider operates. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `SliderBaseProgress`

Visual fill for the selected part of the track.

- can inherit `value`, `min`, and `max` from root CSS variables in simple one-thumb shells
- pass `from` and `to` explicitly for range-like fills
- set `orientation='vertical'` when the root is vertical

## `SliderBaseThumb`

Handle positioned on the current value.

- can inherit `value`, `min`, and `max` from the root for simple one-thumb shells
- set `orientation='vertical'` when the root is vertical
- usually wraps `SliderBaseHiddenInput` when form participation is needed

## `SliderBaseHiddenInput`

Hidden native input for forms.

- useful when a higher-level slider wrapper still wants native submission

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `SliderBaseProps` | root prop type | Low-level slider shell props. |
| `SliderBaseThumbProps` | thumb props | Aligned with root value and orientation. |
| `SliderBaseProgressProps` | progress props | Aligned with root value and orientation. |
| `SliderBaseHiddenInputProps` | hidden input props | Native form integration. |
| `SliderBaseSize` | `'sm' \| 'md' \| 'lg' \| string` | Visual size token. |
| `SliderBaseVariant` | `'primary' \| 'secondary' \| string` | Visual color family. |
| `SliderBaseOrientation` | `'horizontal' \| 'vertical'` | Layout direction. |

## State Model

- `SliderBase` itself is visual and structural.
- The root exports `--slider-base-value`, `--slider-base-min`, and `--slider-base-max` CSS variables for child parts.
- Pointer and keyboard value management belong to higher-level slider compositions.

## Integration Notes

- Let the root own `value`, `min`, and `max` unless child parts need a different range or fill segment.
- Keep `orientation` aligned across root and parts whenever the layout is vertical.
- Prefer `Slider` or `RangeSlider` unless the product actually needs a custom slider composition.
- Use `SliderBaseHiddenInput` when the slider value should join native form submission.
