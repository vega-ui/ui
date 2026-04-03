# NumberField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
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
- Arrow keys and optional wheel events step the value through root logic.
- Input value remains native string input until parsed or clamped by the numeric helpers.
