# PasswordField API

## Root Props


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Notes |
| --- | --- | --- | --- | --- |
| `disabled` | `boolean` | `—` | No | Disables the password field. |
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

- The root owns `shown` state internally.
- `PasswordFieldInput` switches its `type` based on context.
- The toggle button updates root state and then returns focus to the input.
