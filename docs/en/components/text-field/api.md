# TextField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextFieldSize` | `'md'` | No | Visual size of the text field. Affects padding, font size, and overall height. 'sm': Compact input; 'md': Default; 'lg': Spacious layout |
| `error` | `boolean` | — | No | Shows the input in an error state. |
| `ref` | `Ref<HTMLDivElement>` | — | No | Ref forwarded to wrapper element Useful for programmatic control, focus, or integration. |

Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TextFieldInput`: native `<input>` element used inside the wrapper.

### `TextFieldInput`

<!-- AUTO-GENERATED:PART_API:TextFieldInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ref` | `Ref<HTMLInputElement>` | — | No | Ref forwarded to the underlying native `<input>` element. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:TextFieldInput:end -->

## Types

- `TextFieldProps`
- `TextFieldInputProps`
- `TextFieldSize`

## State Model

- `TextField` exposes size and error state through context.
- Real input state is managed on `TextFieldInput`.
- Controlled and uncontrolled behavior follow native input rules on the child input.
