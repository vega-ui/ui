# NumberField Anatomy

## Overview

`NumberField` extends the `TextField` model with numeric masking, bounds, step behavior, and optional stepper buttons.

## Required Parts

### `NumberField`

Required. Owns numeric constraints, derived boundary state, and stepping behavior.

### `NumberFieldInput`

Required. Renders the actual input and syncs with numeric context.

## Optional Parts

### `NumberFieldIncrementButton`

Optional. Steps the value up.

### `NumberFieldDecrementButton`

Optional. Steps the value down.

## Composition Order

1. `NumberField`
2. optional decrement button
3. `NumberFieldInput`
4. optional increment button

## Valid Composition Patterns

```tsx
<NumberField min={0} max={10}>
  <NumberFieldDecrementButton />
  <NumberFieldInput defaultValue={0} />
  <NumberFieldIncrementButton />
</NumberField>
```

## Invalid Composition Patterns

### Buttons without the input

The stepper controls exist, but there is no editable numeric value.

### External numeric logic fighting the internal bounds model

Conflicting clamping or parsing rules create surprising values.

### Free-form text assumptions

The control is numeric-first and should not be treated as a generic text field.
