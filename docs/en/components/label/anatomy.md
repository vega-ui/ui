# Label Anatomy

## Overview

`Label` is a single-part primitive. It renders a semantic `<label>` and borrows typography behavior from `Text`.

## Required Parts

### `Label`

Required. It is both the semantic root and the visible label surface.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Label`
2. label content

## Valid Composition Patterns

<!-- example: label/field-label.tsx -->
```tsx
import { Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldLabel() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Company name</Label>
      <TextField>
        <TextFieldInput id={id} name='company' autoComplete='organization' />
      </TextField>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Placeholder used instead of a label

This removes a stable visible label.

### Multiple unrelated controls wrapped by one label

Click behavior and semantics become unclear.
