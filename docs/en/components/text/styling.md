# Text Styling

## Overview

`Text` is the core body typography layer. It is driven by shared theme tokens and one internal custom property for text color.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--t-color` | root | local text-color override |
| `--default-font-family` | root | body font family |
| `--text-color` | root fallback | default readable text color |
| `--text-font-size-1` ... `--text-font-size-11` | size scale | body size mapping |
| `--line-height-1` ... `--line-height-11` | size scale | body line-height mapping |

## Part-Level Variables

### Root

The root consumes:

- `--t-color`, falling back to `--text-color`
- `--default-font-family`
- size-specific font-size and line-height tokens

## State And Variant Interaction

- weight is controlled through `data-font-weight`
- size is controlled through `data-size`
- `Text` does not define dedicated error or disabled variants; those are usually expressed through color overrides

## Examples

### Local color override

`--t-color` is a custom property, so it inherits: set on a wrapper, it recolors every `Text` inside, and a single `Text` can override it again. A plain `color` on the wrapper would not reach them, because each `Text` sets its own color.

<!-- example: text/local-color-override.tsx -->
```tsx
import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LocalColorOverride() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Text size={3}>Starter plan, billed monthly</Text>
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', '--t-color': 'var(--label-secondary)' } as CSSProperties}>
        <Text size={2}>Renews on April 1</Text>
        <Text size={2}>Visa ending in 4242</Text>
        <Text size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
          Card expires this month
        </Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

### Size scale

A lead paragraph, body copy and fine print use steps of the `size` scale instead of arbitrary font sizes, so line heights stay consistent.

<!-- example: text/larger-body-copy.tsx -->
```tsx
import { Text } from '@vega-ui/react';
import type { CSSProperties } from 'react';

export default function LargerBodyCopy() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: '60ch' }}>
      <Text asChild size={5}>
        <p>Ship design changes to every product from one set of tokens.</p>
      </Text>
      <Text asChild size={3}>
        <p>Update a color or radius once and every app that uses the theme picks it up on the next build.</p>
      </Text>
      <Text asChild size={1} style={{ '--t-color': 'var(--label-tertiary)', marginBlockStart: 'var(--spacing-2)' } as CSSProperties}>
        <p>Prices exclude VAT. Annual plans are billed upfront.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- bypassing the shared text scale with arbitrary hard-coded font sizes
- making primary body copy use placeholder-like colors by default
