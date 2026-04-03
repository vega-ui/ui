# TimeField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `format` | `'HH:MM' \\| 'HH:MM:SS'` | `'HH:MM'` | No | Time format used for input masking and parsing. |
| `min` | ``${string}:${string}` \\| `${string}:${string}:${string}`` | `—` | No | Minimum allowed time. |
| `max` | ``${string}:${string}` \\| `${string}:${string}:${string}`` | `—` | No | Maximum allowed time. |
| `step` | `number` | `1` | No | Step increment for adjusting time values in the input. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TimeFieldInput`: masked input bound to the root time context.

## Types

- `TimeFieldProps`
- `TimeFieldInputProps`

## State Model

- The root does not manage value text itself.
- `TimeFieldInput` derives masking behavior from root context.
- Controlled and uncontrolled value flow stays on the child input.
