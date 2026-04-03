# TimeField Anatomy

## Overview

`TimeField` is a small compound wrapper around `TextField`. The root provides format and bound context, and `TimeFieldInput` applies the masking behavior.

## Required Parts

### `TimeField`

Required. Owns `format`, `min`, `max`, and `step` context.

### `TimeFieldInput`

Required. Renders the actual masked input.

## Optional Parts

There are no extra public parts beyond the input.

## Composition Order

1. `TimeField`
2. `TimeFieldInput`

## Valid Composition Patterns

```tsx
<TimeField format='HH:MM:SS' min='08:00:00' max='18:00:00'>
  <TimeFieldInput placeholder='HH:MM:SS' />
</TimeField>
```

## Invalid Composition Patterns

### Bounds that do not match the format

Example: `format='HH:MM'` with a seconds-based `max`.

### Wrapper without `TimeFieldInput`

The root renders, but there is no masked control.
