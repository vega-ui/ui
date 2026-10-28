# PinField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `value` | `string` | `—` | No | Controlled code. |
| `defaultValue` | `string` | `''` | No | Initial code for uncontrolled usage. |
| `onChangeValue` | `(value: string) => void` | `—` | No | Called with the code when it changes. |
| `disabled` | `boolean` | `—` | No | Disables the input field, making it non-interactive. |
| `placeholder` | `string` | `—` | No | Placeholder character shown when the field is empty. |
| `size` | `PinFieldSize` | `'md'` | No | Visual size of the pin input. |
| `error` | `boolean` | `—` | No | Shows the field in an error state. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref to the root element. |
| `mask` | `Array<RegExp \\| string> \\| RegExp` | `—` | No | Characters the field accepts: a RegExp for the whole value, or an array with a RegExp or a fixed character per position. |
| `maxLength` | `number` | `4` | No | Number of characters in the code. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PinFieldInput`: backing input for actual value and focus handling.
- `PinFieldSlot`: visible slot for one index.
- `PinFieldSeparator`: visual divider between groups.

## Types

- `PinFieldProps`
- `PinFieldInputProps`
- `PinFieldSlotProps`
- `PinFieldSeparatorProps`
- `PinFieldSize`

## State Model

- The root tracks `value`, active slot index, and selection-all state.
- `PinFieldInput` is the real editable control.
- Slots derive content, active state, placeholder state, and disabled/error styling from context.
- The root takes `value`, `defaultValue` and `onChangeValue`; `PinFieldInput` reads the value from the root and still fires its own `onChange` and `onInput`. A form reset restores `defaultValue` unless the field is controlled.
- `disabled` and `maxLength` are set only on `PinField`, so the input and the slots always agree.
- The root `placeholder` is also the placeholder of the input.
