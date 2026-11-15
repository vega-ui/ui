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

## Types

- `TimeFieldProps`
- `TimeFieldInputProps`

## State Model

- The root takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), like a native `<input type="time">`; `TimeFieldInput` shows it in the format and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''`. A form reset restores `defaultValue` unless the field is controlled.
- A separator typed or pasted after a one-digit segment completes it with a leading zero, as in a native time input: `9:30` becomes `09:30`.
- The browser does not count a text written by the field as an edit of the user, so the field reports the edit itself: when the user leaves `TimeFieldInput` after changing its text, the input fires a native `change` event and gets `data-user-edited`. A value set through `value` does not mark the field, and a form reset removes the attribute.
- A complete time outside `min` or `max` stays as typed and makes the input invalid, like a native `<input type="time">`. When `min` or `max` change, the text and the value stay as they are and only the validity changes, without `input` or `onChangeValue`.
