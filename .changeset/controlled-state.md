---
"@vega-ui/react": minor
---

Controlled state for `Tooltip` and `PasswordField`:

- `Tooltip` takes `open`, `defaultOpen` and `onChangeOpen`, like `Popover`
- `PasswordField` takes `shown`, `defaultShown` and `onChangeShown` for the password visibility
- `PasswordFieldToggleIconButton` exposes the visibility with `aria-pressed` and keeps the focus like a native button instead of moving it to the input, so mobile keyboards do not open on every toggle; give it a fixed label such as "Show password"
- a custom `onClick` on `PasswordFieldToggleIconButton` no longer replaces the toggle
- the `PasswordField` context is named `PasswordFieldContext` in errors, not `PhoneFieldContext`
