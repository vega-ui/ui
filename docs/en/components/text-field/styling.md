# TextField Styling

## Overview

`TextField` styling is split between the wrapper and the input. The root controls container height and surface state, while `TextFieldInput` controls padding, typography, and placeholder styling.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--input-height` | wrapper and children | shared field height |
| `--input-br-ratio` | wrapper | border-radius ratio |
| `--fills-tertiary` | wrapper | default field surface |
| `--fills-tertiary-hover` | wrapper | hover surface |
| `--color-primary-500` | wrapper | focus outline |
| `--color-error` | wrapper | error outline |
| `--disable-background-color` | wrapper | disabled surface |

## Part-Level Variables

### Root

The wrapper defines `--input-height` by size and applies surface, focus, error, and disabled states.

### Input

`TextFieldInput` inherits the wrapper radius and uses text tokens for padding, font size, text color, and placeholder color.

## State And Variant Interaction

- size sets `--input-height` and input typography
- wrapper hover is driven by `:has(input:hover)`
- focus is driven by `:has(input:focus-visible)`
- disabled state is driven by `:has(input:disabled)`

## Examples

### Field sizes

Each `size` sets `--input-height` and the input typography. Match the size of an adjacent `Button` so the row lines up.

<!-- example: text-field/field-sizes.tsx -->
```tsx
import { Button, TextField, TextFieldInput } from '@vega-ui/react';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <TextField size={size} style={{ flex: 1 }}>
            <TextFieldInput aria-label={`Coupon code, size ${size}`} placeholder={`Coupon code (${size})`} />
          </TextField>
          <Button size={size} variant='secondary' appearance='ghost'>Apply</Button>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- breaking the wrapper/input height relationship
- overriding disabled colors so disabled fields remain visually interactive
- adding prefix or suffix elements without checking focus and spacing
