# TextArea API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `placeholder` | `string` | `—` | No | Placeholder text shown when the textarea is empty. |
| `value` | `string \\| number` | `—` | No | current value of the textarea. |
| `size` | `TextAreaSize` | `'md'` | No | Visual size of the textarea. |
| `error` | `boolean` | `—` | No | Displays the textarea in an error state. |
| `fullWidth` | `boolean` | `—` | No | Makes the textarea expand to fill the full width of its container. |
| `ref` | `Ref<HTMLTextAreaElement>` | `—` | No | Ref forwarded to the native `<textarea>` element. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- None. `TextArea` is a single exported control.

## Types

- `TextAreaProps`
- `TextAreaSize`

## State Model

- Controlled and uncontrolled behavior follow native `<textarea>` rules.
- Error state is visual and does not replace validation semantics.
