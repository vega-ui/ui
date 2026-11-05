# PinField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `value` | `string` | — | No | Controlled code. |
| `defaultValue` | `string` | `''` | No | Initial code for uncontrolled usage. Defaults to `''`. |
| `onChangeValue` | `(value: string) => void` | — | No | Called with the code when it changes. |
| `disabled` | `boolean` | — | No | Disables the input field, making it non-interactive. Also applies a visual disabled style. |
| `placeholder` | `string` | — | No | Placeholder character shown when the field is empty. |
| `size` | `PinFieldSize` | `'md'` | No | Visual size of the pin input. Affects dimensions and font size. |
| `error` | `boolean` | — | No | Shows the field in an error state. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref to the root element. |
| `mask` | `Array<RegExp \| string> \| RegExp` | — | No | Characters the field accepts: a RegExp for the whole value, or an array with a RegExp or a fixed character per position. Defaults to digits. |
| `maxLength` | `number` | `4` | No | Number of characters in the code. Defaults to `4`. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PinFieldInput`: backing input for actual value and focus handling.
- `PinFieldSlot`: visible slot for one index.
- `PinFieldSeparator`: visual divider between groups.

### `PinFieldSlot`

<!-- AUTO-GENERATED:PART_API:PinFieldSlot:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `index` | `number` | — | Yes | The zero-based index of the slot within the PinField sequence. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PinFieldSlot:end -->

### `PinFieldSeparator`

<!-- AUTO-GENERATED:PART_API:PinFieldSeparator:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `PinFieldSize` | — | No | Controls the visual size of the separator. Aligns with the size of the surrounding `PinField` elements. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:PinFieldSeparator:end -->

### `PinFieldInput`

<!-- AUTO-GENERATED:PART_API:PinFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref). |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:PinFieldInput:end -->

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
