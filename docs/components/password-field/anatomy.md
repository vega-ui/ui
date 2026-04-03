# PasswordField Anatomy

## Overview

`PasswordField` extends the `TextField` composition contract with one extra state model: whether the password is currently shown or hidden.

## Required Parts

### `PasswordField`

Required. Owns visibility state and provides context to the child parts.

### `PasswordFieldInput`

Required. Switches between `type='password'` and `type='text'` based on context.

### `PasswordFieldToggleIconButton`

Required in normal composition. Triggers visibility changes.

## Optional Parts

### `PasswordFieldShownIcon`

Optional icon for the shown state.

### `PasswordFieldHiddenIcon`

Optional icon for the hidden state.

## Composition Order

1. `PasswordField`
2. `PasswordFieldInput`
3. `PasswordFieldToggleIconButton`
4. `PasswordFieldShownIcon`
5. `PasswordFieldHiddenIcon`

## Valid Composition Patterns

```tsx
<PasswordField>
  <PasswordFieldInput autoComplete='new-password' />
  <PasswordFieldToggleIconButton aria-label='Toggle password visibility'>
    <PasswordFieldShownIcon />
    <PasswordFieldHiddenIcon />
  </PasswordFieldToggleIconButton>
</PasswordField>
```

## Invalid Composition Patterns

### Toggle without the input

The control renders a button, but there is no actual password field.

### Custom button without preserving the toggle contract

The root state exists, but the user loses the standard shown/hidden affordance.

### Hidden or shown icons rendered outside the toggle

The icons should stay part of the one clickable control.
