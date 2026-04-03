# TextField Anatomy

## Overview

`TextField` is a [compound component](../../glossary.md#compound-component) with a small composition contract. The wrapper coordinates sizing and visual state, and `TextFieldInput` provides the real form control.

## Required Parts

### `TextField`

Required. Owns shared size, error state, and the visual container.

### `TextFieldInput`

Required. Renders the native `<input>` and receives actual input props.

## Optional Parts

### Prefix Or Suffix Children

Optional. Buttons, icons, counters, or status text can be placed before or after the input.

## Composition Order

1. `TextField`
2. optional prefix child
3. `TextFieldInput`
4. optional suffix child

## Valid Composition Patterns

```tsx
<TextField>
  <TextFieldInput type='search' placeholder='Search invoices' />
  <Button size='md'>Search</Button>
</TextField>
```

## Invalid Composition Patterns

### Wrapper without `TextFieldInput`

The component renders, but there is no actual form control.

### Input props passed to the wrapper

This breaks form behavior because the wrapper is only a `<div>`.

### Too many competing controls around the input

The field becomes visually dense and hard to use.
