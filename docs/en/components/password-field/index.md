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
  PasswordFieldToggle,
  type PasswordFieldHiddenIconProps,
  type PasswordFieldInputProps,
  type PasswordFieldProps,
  type PasswordFieldShownIconProps,
  type PasswordFieldToggleProps,
} from '@vega-ui/react';
```

## Exported Types

- `PasswordFieldProps`
- `PasswordFieldInputProps`
- `PasswordFieldToggleProps`
- `PasswordFieldShownIconProps`
- `PasswordFieldHiddenIconProps`

## Minimal Composition

<!-- example: password-field/sign-in-password.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SignInPassword() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Password</Label>
      <PasswordField>
        <PasswordFieldInput id={id} name='password' autoComplete='current-password' />
        <PasswordFieldToggle square aria-label='Show password'>
          <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
        </PasswordFieldToggle>
      </PasswordField>
    </div>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyPasswordField` passes its props to the native `PasswordFieldInput`, and the toggle takes its name from `toggleLabel`. See [Component recipes](../../recipes.md).

<!-- example: password-field/recipe.tsx -->
```tsx
import {
  Label,
  PasswordField,
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggle,
  type PasswordFieldInputProps,
} from '@vega-ui/react';
import { EyeIcon, EyeOffIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MyPasswordFieldProps extends PasswordFieldInputProps {
  toggleLabel: string
}

export function MyPasswordField({ toggleLabel, ...props }: MyPasswordFieldProps) {
  return (
    <PasswordField>
      <PasswordFieldInput {...props} />
      <PasswordFieldToggle square aria-label={toggleLabel}>
        <PasswordFieldShownIcon><EyeIcon /></PasswordFieldShownIcon>
        <PasswordFieldHiddenIcon><EyeOffIcon /></PasswordFieldHiddenIcon>
      </PasswordFieldToggle>
    </PasswordField>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Password</Label>
      <MyPasswordField id={id} name='password' autoComplete='current-password' toggleLabel='Show password' />
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `PasswordField`: root state container
- `PasswordFieldInput`: native password input
- `PasswordFieldToggle`: visibility toggle

## Optional Parts

- `PasswordFieldShownIcon`: shows the icon you pass, such as an eye, while the password is hidden
- `PasswordFieldHiddenIcon`: shows the icon you pass, such as a crossed out eye, while the password is shown

## Composition Order

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggle`
4. shown/hidden icon parts

## Variants

- Size: inherited from `TextField`
- State: hidden or shown password, disabled through root field props, invalid through `aria-invalid` or `:user-invalid` on `PasswordFieldInput`
- Composition: icons from any set inside the shown and hidden icon parts, or a text toggle

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
