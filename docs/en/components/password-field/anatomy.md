# PasswordField Anatomy

## Overview

`PasswordField` extends the `TextField` composition contract with one extra state model: whether the password is currently shown or hidden.

## Required Parts

### `PasswordField`

Required. Owns visibility state and provides context to the child parts.

### `PasswordFieldInput`

Required. Switches between `type='password'` and `type='text'` based on context.

### `PasswordFieldToggle`

Required in normal composition. Triggers visibility changes. It renders a `Button` with no content of its own: put `PasswordFieldShownIcon` and `PasswordFieldHiddenIcon` with your icons inside with `square` and an `aria-label` or `aria-labelledby`, a text like "Show", or your own button with `asChild`.

## Optional Parts

### `PasswordFieldShownIcon`

Shows its children while the password is hidden, as the icon of the action that shows it. It draws no icon of its own: pass one from any icon set, such as an eye.

### `PasswordFieldHiddenIcon`

Shows its children while the password is shown, as the icon of the action that hides it. It draws no icon of its own: pass one from any icon set, such as a crossed out eye.

## Composition Order

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggle`
4. `PasswordFieldShownIcon`
5. `PasswordFieldHiddenIcon`

## Valid Composition Patterns

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

## Invalid Composition Patterns

### Toggle without the input

The control renders a button, but there is no actual password field.

### Custom button without preserving the toggle contract

The root state exists, but the user loses the standard shown/hidden affordance.

### Hidden or shown icons rendered outside the toggle

The icons should stay part of the one clickable control.
