# Radio Anatomy

## Overview

`Radio` is a single native input rather than a multi-part compound component. The real composition contract lives in how multiple radios are grouped through shared `name` and visible labels.

## Required Parts

### `Radio`

Required. Renders the native `input[type='radio']` and owns checked, disabled, size, and variant behavior.

## Optional Parts

`Radio` does not expose additional public child parts.

## Composition Order

1. visible label wrapper
2. `Radio`
3. label text

## Valid Composition Patterns

```tsx
<label style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Radio name='theme' value='dark' />
  Dark theme
</label>
```

## Invalid Composition Patterns

### Radios without a shared `name`

This breaks mutually exclusive group behavior.

### Radio used as a standalone boolean toggle

If the choice is independent rather than exclusive, use `Checkbox` or `Switch`.

### Label text detached from the control

This makes the radio harder to understand and harder to click.
