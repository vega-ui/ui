# TimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `string` | `—` | No | Controlled time as a `HH:mm` string (`HH:mm:ss` when the format has seconds), `''` while the field has no complete value. |
| `defaultValue` | `string` | `''` | No | Initial time for uncontrolled usage, like `value`. |
| `onChangeValue` | `(value: string) => void` | `—` | No | Called with the time when it changes, `''` when the text is emptied or incomplete. |
| `format` | `'HH:mm' \\| 'HH:mm:ss'` | `'HH:mm'` | No | Time format used for input masking and parsing, in the notation of Unicode date patterns like `DateTimeField.timeFormat`. |
| `min` | `string` | `—` | No | Earliest allowed time as a `HH:mm` or `HH:mm:ss` string. |
| `max` | `string` | `—` | No | Latest allowed time as a `HH:mm` or `HH:mm:ss` string. |
| `step` | `number` | `1` | No | Step of ArrowUp / ArrowDown on the minutes or seconds under the caret, wrapping around the segment's range. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TimeFieldInput`: masked input bound to the root time context.

## Types

- `TimeFieldProps`
- `TimeFieldInputProps`

## State Model

- The root takes `value`, `defaultValue` and `onChangeValue` as a `HH:mm` time (`HH:mm:ss` when the format has seconds), like a native `<input type="time">`; `TimeFieldInput` shows it in the format and still fires its own `onChange` and `onInput`. While the text is empty or incomplete the value is `''`. A form reset restores `defaultValue` unless the field is controlled.
- A complete time outside `min` or `max` is replaced by the nearest bound. When `min` or `max` change, typed text is clamped again like typing does, firing `input`.
