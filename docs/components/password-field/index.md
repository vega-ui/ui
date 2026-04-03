# PasswordField

## Doc Profile

`advanced interactive`

## Summary

`PasswordField` is a [compound component](../../glossary.md#compound-component) built on `TextField`. It adds password visibility state, a toggle button, and icon parts while keeping the actual input native. It is the secret-entry layer when masked review is part of the field contract.

## Imports

```tsx
import {
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleIconButton,
  type PasswordFieldHiddenIconProps,
  type PasswordFieldInputProps,
  type PasswordFieldProps,
  type PasswordFieldShownIconProps,
  type PasswordFieldToggleIconButtonProps,
} from '@vega-ui/react';
```

## Exported Types

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleIconButtonProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## Minimal Composition

```tsx
<PasswordField>
  <PasswordFieldInput placeholder='Password' autoComplete='current-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Required Parts

- `PasswordField`: root state container
- `PasswordFieldInput`: native password input
- `PasswordFieldToggleIconButton`: visibility toggle

## Optional Parts

- `PasswordFieldShownIcon`: shown-state icon
- `PasswordFieldHiddenIcon`: hidden-state icon

## Composition Order

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggleIconButton`
4. shown/hidden icon parts

## Variants

- Size: inherited from `TextField`
- State: hidden or shown password, disabled, error through root field props
- Composition: default icons or custom icon content

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- Visibility toggling should preserve focus on the input.
- Password managers and autofill behavior should be tested in real browsers.
- Showing the password helps review input, but it is not a security control by itself.
- Validation policy, strength hints, and reveal behavior should stay clearly separated in the product model.

## Common Mistakes

- Rendering the toggle without an accessible label.
- Assuming password strength hints are the same as actual validation policy.
- Replacing the compound parts with custom wrappers before the basic composition works.
