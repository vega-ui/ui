# TextField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `size` | `TextFieldSize` | `'md'` | No | Visual size of the text field. |
| `error` | `boolean` | `—` | No | Shows the input in an error state. |
| `ref` | `Ref<HTMLDivElement>` | `—` | No | Ref forwarded to wrapper element |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `TextFieldInput`: native `<input>` element used inside the wrapper.

## Types

- `TextFieldProps`
- `TextFieldInputProps`
- `TextFieldSize`

## State Model

- `TextField` exposes size and error state through context.
- Real input state is managed on `TextFieldInput`.
- Controlled and uncontrolled behavior follow native input rules on the child input.
