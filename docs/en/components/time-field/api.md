# TimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Controlled time as a `HH:mm` string (`HH:mm:ss` when the format has seconds), `''` while the field has no complete value. |
| `defaultValue` | `string` | `''` | No | Initial time for uncontrolled usage, like `value`. Defaults to `''`, an empty field. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the time when it changes, `''` when the text is emptied or incomplete. |
| `format` | `'HH:mm' \| 'HH:mm:ss'` | `'HH:mm'` | No | Time format used for input masking and parsing, in the notation of Unicode date patterns like `DateTimeField.timeFormat`. Examples: "HH:mm" — hours and minutes. "HH:mm:ss" — hours, minutes, and seconds. |
| `min` | `string` | — | No | Earliest allowed time as a `HH:mm` or `HH:mm:ss` string. Like a native `<input type="time">`, an earlier time makes the input invalid. |
| `max` | `string` | — | No | Latest allowed time as a `HH:mm` or `HH:mm:ss` string. Like a native `<input type="time">`, a later time makes the input invalid. |
| `step` | `number` | `1` | No | Step of ArrowUp / ArrowDown on the minutes or seconds under the caret, wrapping around the segment's range. Like a native `<input type="time">` with `step`, the hours always move by one. A step past `min` or `max` stops at the bound. `0` turns arrow stepping off. Defaults to `1`. |
| `disabled` | `boolean` | — | No | Disables the field like a native `disabled` input: the input, the trigger and the wheels are disabled, and the time is not submitted. |
| `readOnly` | `boolean` | — | No | Makes the field read-only like a native `readonly` input: the input is `readonly`, the wheels still open to show the time, and turning them does not change it. The time is still submitted. |
| `size` | `TextFieldSize` | — | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TimeFieldInput`: masked input bound to the root time context.

### `TimeFieldInput`

<!-- AUTO-GENERATED:PART_API:TimeFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:TimeFieldInput:end -->

### `TimeFieldTrigger`

<!-- AUTO-GENERATED:PART_API:TimeFieldTrigger:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `asChild` | `boolean` | — | No | When true, renders the button as a child component using `Slot` (e.g., from Radix UI). Enables polymorphic rendering — useful for making the button act as a link or custom tag. |
| `size` | `ButtonSize` | — | No | Defines the size of the button. Affects padding, font size, and overall dimensions. |
| `variant` | `ButtonBaseVariant` | — | No | Defines the visual style of the button, affecting color schemes and emphasis. |
| `appearance` | `ButtonBaseAppearance` | — | No | Adjusts the button's structural appearance (background, border, etc.). |
| `disabled` | `boolean` | — | No | Disables the button when true. Prevents user interaction and applies a visually disabled state. Not applied with `asChild`: the child element owns its disabled state, for example, `aria-disabled` or a link without `href`. |
| `className` | `string` | — | No | Optional custom CSS class for the button element. Useful for design system overrides or scoped styles. |
| `children` | `ReactNode` | — | No | Content of the button — text, icon, or any React node. |
| `ref` | `Ref<HTMLButtonElement>` | — | No | Ref forwarded to the native `<button>` element. Allows direct DOM access for focus management or measuring. |
| `square` | `false` | — | No | Makes the button a square as wide as it is high, for a single icon. Name it with `aria-label` or `aria-labelledby`. |

Also accepts all `<button>` attributes.
<!-- AUTO-GENERATED:PART_API:TimeFieldTrigger:end -->

### `TimeFieldColumn`

<!-- AUTO-GENERATED:PART_API:TimeFieldColumn:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `unit` | `TimeFieldUnit` | — | Yes | Part of the time the column turns: the hours 00 to 23, or the minutes or the seconds by `step`. The seconds go with `format="HH:mm:ss"`. |
| `children` | `ReactNode` | — | Yes | Template of an option, rendered once for every option of the column. Read the option with `useTimeFieldOptionContext()`; usually `<TimeFieldOption><WheelPickerFace /></TimeFieldOption>`. |
| `loop` | `boolean` | `true` | No | If true, the column goes on past its last option to the first one and back, like a dial. |
| `autoFocus` | `boolean` | — | No | If true, the column takes the focus once it mounts, like a native control with `autofocus`, for example as the first column in a popover. |
| `disabled` | `boolean` | `false` | No | If true, the column does not turn and leaves the Tab order. |
| `readOnly` | `boolean` | `false` | No | If true, the column stays focusable but does not turn. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the spinbutton element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TimeFieldColumn:end -->

### `TimeFieldOption`

<!-- AUTO-GENERATED:PART_API:TimeFieldOption:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to the row element. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:TimeFieldOption:end -->

## Types

- `TimeFieldProps`
- `TimeFieldInputProps`

## State Model

- The root takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), like a native `<input type="time">`; `TimeFieldInput` shows it in the format and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''`. A form reset restores `defaultValue` unless the field is controlled.
- A separator typed or pasted after a one-digit segment completes it with a leading zero, as in a native time input: `9:30` becomes `09:30`.
- The browser does not count a text written by the field as an edit of the user, so the field reports the edit itself: when the user leaves `TimeFieldInput` after changing its text, the input fires a native `change` event and gets `data-user-edited`. A value set through `value` does not mark the field, and a form reset removes the attribute.
- A complete time outside `min` or `max` stays as typed and makes the input invalid, like a native `<input type="time">`. When `min` or `max` change, the text and the value stay as they are and only the validity changes, without `input` or `onChangeValue`.
