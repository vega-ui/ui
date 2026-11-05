# TextArea Styling

## Overview

`TextArea` is a single surface driven by shared field tokens and size-specific padding and min-height values.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--textarea-height` | root | min-height baseline |
| `--textarea-br-ratio` | root | border-radius ratio |
| `--fills-tertiary` | root | default surface |
| `--fills-tertiary-hover` | root | hover surface |
| `--color-primary-500` | root | focus outline |
| `--color-error` | root | error outline |

## Part-Level Variables

### Root

The root sets size-specific padding, type scale, min height, and state colors.

## State And Variant Interaction

- `data-size` maps to spacing and typography
- `data-full-width='true'` sets `width: 100%`
- `data-error='true'` switches the outline to error color
- disabled state changes both foreground and surface tokens

## Examples

### Sizes

Each `size` sets padding, type scale and the minimum height; `rows` can still make the field taller. `fullWidth` stretches it to the container.

<!-- example: text-area/textarea-sizes.tsx -->
```tsx
import { TextArea } from '@vega-ui/react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function TextareaSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {SIZES.map((size) => (
        <TextArea
          key={size}
          size={size}
          rows={2}
          fullWidth
          aria-label={`Comment, size ${size}`}
          placeholder={`Leave a comment (${size})`}
        />
      ))}
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- making placeholder and entered text visually indistinguishable
- overriding disabled styling so the field still looks editable
