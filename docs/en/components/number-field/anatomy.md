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

Optional. Steps the value up. It renders a `Button` with no content of its own: pass an icon as children with `square` and an `aria-label` or `aria-labelledby`, a text like "Add", or your own button with `asChild`.

### `NumberFieldDecrementButton`

Optional. Steps the value down. It renders a `Button` with no content of its own: pass an icon as children with `square` and an `aria-label` or `aria-labelledby`, a text like "Remove", or your own button with `asChild`.

## Composition Order

1. `NumberField`
2. optional decrement button
3. `NumberFieldInput`
4. optional increment button

## Valid Composition Patterns

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton square aria-label='Remove a seat'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton square aria-label='Add a seat'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Buttons without the input

The stepper controls exist, but there is no editable numeric value.

### External numeric logic fighting the internal bounds model

Conflicting clamping or parsing rules create surprising values.

### Free-form text assumptions

The control is numeric-first and should not be treated as a generic text field.
