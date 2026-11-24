# WheelPicker API

## Root Props

<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `rows` | `number` | `5` | No | How many rows of each column are visible: the selected one in the middle and the same number above and below it. Use an odd number. |
| `size` | `WheelPickerSize` | `the size of the field around it, otherwise 'md'` | No | Height of the rows and size of the text, on the scale of the other fields. Inside the popover of a field, such as a TimeField or a DateTimeField, it follows the size of the field. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the root element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

### `WheelPickerColumn`

<!-- AUTO-GENERATED:PART_API:WheelPickerColumn:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `Value \| null` | — | No | The value of the selected option, for a controlled column. |
| `defaultValue` | `Value \| null` | — | No | The value of the option selected at first, for an uncontrolled column. Without it the column starts at its first enabled option. |
| `onChangeValue` | `(value: NoInfer<Value>) => void` | — | No | Called with the value of the option the column stops at after a scroll, and at once after a key. |
| `loop` | `boolean` | `false` | No | If true, the column goes on past its last option to the first one and back, like a dial. |
| `disabled` | `boolean` | `false` | No | If true, the column does not turn and leaves the Tab order. |
| `readOnly` | `boolean` | `false` | No | If true, the column stays focusable but does not turn. |
| `autoFocus` | `boolean` | — | No | If true, the column takes the focus once it mounts, like a native control with `autofocus`, for example as the first column in a popover. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the spinbutton element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:WheelPickerColumn:end -->

### `WheelPickerOption`

<!-- AUTO-GENERATED:PART_API:WheelPickerOption:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `Value` | — | Yes | The value of this option, passed to `onChangeValue` of its column once it is selected. |
| `disabled` | `boolean` | `false` | No | If true, the column skips this option and moves off it when a scroll stops on it. |
| `label` | `string` | — | No | Plain text of this option, used for typeahead and as `aria-valuetext` of the column instead of the text of its content. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the row element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:WheelPickerOption:end -->

### `WheelPickerFace`

<!-- AUTO-GENERATED:PART_API:WheelPickerFace:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref forwarded to the face element. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:WheelPickerFace:end -->

## Types

- `WheelPickerProps`
- `WheelPickerColumnProps<Value>`, where `Value` is `string | number`, inferred from `value` or `defaultValue`
- `WheelPickerOptionProps<Value>`
- `WheelPickerFaceProps`
- `WheelPickerSize`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | (string & {})`

## State Model

- Each column owns its value; `WheelPicker` holds none.
- Uncontrolled: `defaultValue` selects an option on mount, and the column keeps what the user turns it to.
- Controlled: `value` selects the option, and `onChangeValue` reports the option the user turned to. The column turns to every new `value` the parent sets.
- Without a value the column starts at its first enabled option.
- A scroll reports once it stops; ArrowUp, ArrowDown, PageUp, PageDown, Home, End and typeahead report at once and turn the wheel after.
- `aria-valuenow` is the position of the selected option, from `aria-valuemin` 0 to `aria-valuemax`, the count of options less one; `aria-valuetext` is its text.

## Integration Notes

- A column renders no form input: mirror its value into `<input type="hidden">` when a form submits it.
- A column reads its options from its direct children when it renders, so the options can change with the state, like the days of a month.
- Inside a popover or a dialog, the columns measure themselves when they become visible.
- `@vega-ui/widgets/wheel-picker` exports `wheelPickerWidget`, the framework-free behavior of a column.
