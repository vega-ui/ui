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

```tsx
<>
  <Label htmlFor='email'>Email</Label>
  <TextField id='email'>
    <TextFieldInput />
  </TextField>
</>
```

## Invalid Composition Patterns

### Placeholder used instead of a label

This removes a stable visible label.

### Multiple unrelated controls wrapped by one label

Click behavior and semantics become unclear.
