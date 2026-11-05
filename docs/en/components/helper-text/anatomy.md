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

<!-- example: helper-text/field-hint.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldHint() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Recovery email</Label>
      <TextField>
        <TextFieldInput id={id} type='email' autoComplete='email' aria-describedby={hintId} />
      </TextField>
      <HelperText id={hintId}>Used only if you lose access to your main inbox.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Helper text used as the primary label

This weakens visible labeling and semantics.

### Helper text used for full policy copy

The component is too lightweight for long-form explanatory content.
