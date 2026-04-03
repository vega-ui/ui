# HelperText Anatomy

## Overview

`HelperText` is a single-part primitive. It renders a styled paragraph through the shared `Text` contract.

## Required Parts

### `HelperText`

Required. Owns helper-copy sizing and muted or error color.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `HelperText`
2. short supporting copy

## Valid Composition Patterns

```tsx
<div style={{ display: 'grid', gap: 4 }}>
  <Label htmlFor='email'>Email</Label>
  <TextField id='email'>
    <TextFieldInput />
  </TextField>
  <HelperText>We only use this for account-related updates.</HelperText>
</div>
```

## Invalid Composition Patterns

### Helper text used as the primary label

This weakens visible labeling and semantics.

### Helper text used for full policy copy

The component is too lightweight for long-form explanatory content.
