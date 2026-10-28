# NumberField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `number` | `—` | No | Controlled value. |
| `defaultValue` | `number` | `NaN` | No | Initial value for uncontrolled usage. |
| `onChangeValue` | `(value: number) => void` | `—` | No | Called with the number when it changes, `NaN` when the field is emptied. |
| `step` | `number` | `1` | No | Amount to increment or decrement the value by when using arrow keys or spinner controls. |
| `min` | `number` | `Number.MIN_SAFE_INTEGER` | No | Minimum allowed value for the input. |
| `max` | `number` | `Number.MAX_SAFE_INTEGER` | No | Maximum allowed value for the input. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the element. |
| `precision` | `number` | `0` | No | Number of decimal places to round the input value to. |
| `changeOnWheel` | `boolean` | `true` | No | Enables changing the value with the mouse wheel when focused. |
| `allowEmpty` | `boolean` | `true` | No | Allows the field to be empty (null/undefined) instead of defaulting to 0. |
| `maximumFractionDigits` | `number` | `2` | No | Maximum number of digits allowed after the decimal point. |
| `disabled` | `boolean` | `—` | No | Disables the entire NumberField. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `NumberFieldInput`: numeric input bound to context.
- `NumberFieldIncrementButton`: increment control.
- `NumberFieldDecrementButton`: decrement control.

## Types

- `NumberFieldProps`
- `NumberFieldInputProps`
- `NumberFieldIncrementProps`
- `NumberFieldDecrementProps`
- `NumberFieldSize`

## State Model

- The root tracks whether the current value is at min or max.
- Arrow keys and optional wheel events step the value through root logic. Like `<input type="number">`, the wheel steps only the focused field; without focus it scrolls the page.
- A step keeps the decimals of the value and of `step` (`0.7` + `0.1` gives `0.8`).
- A root `onKeyDown` runs after the built-in arrow handling and does not replace it.
- The root takes `value`, `defaultValue` and `onChangeValue` as a number, `NaN` for an empty field; `NumberFieldInput` shows the formatted text and still fires its own `onChange` and `onInput`. A form reset restores `defaultValue` unless the field is controlled.
