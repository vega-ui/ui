# Button Styling

## Overview

`Button` styling is split between `ButtonBase` for semantic variant and appearance behavior, and the local `Button` size layer for spacing, height, and width.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--button-height` | `Button` | Control height. |
| `--button-br-ratio` | `Button` | Border-radius ratio. |
| `--button-color` | `ButtonBase` | Current text color. |
| `--button-background-color` | `ButtonBase` | Current background color. |
| `--button-border-color` | `ButtonBase` | Current border color. |

## Part-Level Variables

- `Button`: local size, padding, and `fullWidth` behavior.
- `ButtonBase`: shared variant, appearance, disabled, hover, active, and focus styling.

## State And Variant Interaction

- `size` changes height, padding, and font size.
- `variant` and `appearance` are mostly handled by `ButtonBase`.
- Disabled state is handled at the button-base layer across all appearances.

## Examples

Override the public variables inline or in your own class. Colors need the `-hover` and `-active` variables too, otherwise hover and press fall back to the variant colors.

<!-- example: button/css-variable-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Button } from '@vega-ui/react';

const pill = {
  '--button-br-ratio': 0.5,
} as CSSProperties;

const compact = {
  '--button-height': '32px',
} as CSSProperties;

const success = {
  '--button-background-color': 'var(--color-green-accent-800)',
  '--button-background-color-hover': 'var(--color-green-accent-900)',
  '--button-background-color-active': 'var(--color-green-accent-1000)',
} as CSSProperties;

export default function CssVariableOverrides() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button' style={pill}>Follow</Button>
      <Button type='button' variant='secondary' appearance='ghost' style={compact}>Filter</Button>
      <Button type='button' style={success}>Approve</Button>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- Do not remove focus visibility without a replacement.
- Do not invent custom appearance strings without matching CSS support.
- Do not treat semantic navigation and button styling as the same concern.
