# HelperText Styling

## Overview

`HelperText` uses the shared text system with a small local color contract.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--label-tertiary` | root default | neutral helper-copy color |
| `--color-error` | root error state | validation/adverse tone |

## Part-Level Variables

### Root

The root sets `display: inline-block` and changes color based on `data-error`.

## State And Variant Interaction

- default state uses `--label-tertiary`
- `error` uses `--color-error`
- font size still comes from the `Text` size mapping chosen by the helper-text size mapper

## Examples

### Sizes and error tone

`size` maps to the text scale (`sm`, `md`, `lg`); `error` switches the color from `--label-tertiary` to `--color-error` at any size.

<!-- example: helper-text/helper-text-sizes.tsx -->
```tsx
import { HelperText } from '@vega-ui/react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function HelperTextSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          <HelperText size={size}>Hint, {size}: shown to all members of the workspace.</HelperText>
          <HelperText size={size} error>Error, {size}: this name is already in use.</HelperText>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- making helper and primary label colors indistinguishable
- using error red for neutral guidance by default
