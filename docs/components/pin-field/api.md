# PinField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `—` | No | Disables the input field, making it non-interactive. |
| `placeholder` | `string` | `—` | No | Placeholder character shown when the field is empty. |
| `size` | `PinFieldSize` | `'md'` | No | Visual size of the pin input. |
| `error` | `boolean` | `—` | No | Shows the field in an error state. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to the native `<input>` element. |
| `mask` | `Array<RegExp \\| string> \\| RegExp` | `—` | No | input mask that restricts characters for each digit. |
| `maxLength` | `number` | `4` | Yes | Max pin value |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PinFieldHiddenInput`: backing input for actual value and focus handling.
- `PinFieldSlot`: visible slot for one index.
- `PinFieldSeparator`: visual divider between groups.

## Types

- `PinFieldProps`
- `PinFieldHiddenInputProps`
- `PinFieldSlotProps`
- `PinFieldSeparatorProps`
- `PinFieldSize`

## State Model

- The root tracks `value`, active slot index, and selection-all state.
- `PinFieldHiddenInput` is the real editable control.
- Slots derive content, active state, placeholder state, and disabled/error styling from context.
