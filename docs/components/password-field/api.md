# PasswordField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `—` | No | Disables the password field. |
| `shown` | `boolean` | `—` | No | Controls whether the password is shown as plain text. |
| `defaultShown` | `boolean` | `false` | No | Initial visibility for uncontrolled usage. |
| `onChangeShown` | `(shown: boolean) => void` | `—` | No | Called when the visibility is toggled. |
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts

- `PasswordFieldInput`: context-aware password/text input.
- `PasswordFieldToggleIconButton`: button that toggles shown state.
- `PasswordFieldShownIcon`: icon for shown state.
- `PasswordFieldHiddenIcon`: icon for hidden state.

## Types

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleIconButtonProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## State Model

- Visibility can be controlled with `shown` and `onChangeShown`, or uncontrolled with `defaultShown`.
- `PasswordFieldInput` switches its `type` based on context.
- The toggle button flips the visibility and keeps the focus where the browser put it, like a native button; it exposes the visibility with `aria-pressed`.
- A custom `onClick` on the toggle runs after the toggle, it does not replace it.
