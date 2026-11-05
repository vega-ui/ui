# ButtonBase Styling

## Overview

`ButtonBase` owns the shared action styling contract used by higher-level button components. It exposes public-looking `--button-*` variables internally and maps `variant` plus `appearance` to theme tokens and state colors.

## Public CSS Variables

| Variable | Purpose |
| --- | --- |
| `--button-color` | default text/icon color |
| `--button-color-hover` | hover text/icon color |
| `--button-color-active` | active text/icon color |
| `--button-background-color` | default surface color |
| `--button-background-color-hover` | hover surface color |
| `--button-background-color-active` | active surface color |
| `--button-border-color` | default border color |
| `--button-border-color-hover` | hover border color |
| `--button-border-color-active` | active border color |
| `--button-chroma-ratio` | Chroma added to the accent color in tinted backgrounds. |

## Part-Level Variables

### Root

The root `.buttonBase` element owns all button color, border, and focus behavior.

### Slotted Child

When `asChild` is used, the slotted element receives the same classes and data attributes. It does not create a second styling layer.

## State And Variant Interaction

- `data-variant='primary' | 'secondary'` switches the color family.
- `data-appearance='fill' | 'outline' | 'ghost' | 'transparent'` switches the structural treatment.
- Disabled styles map to `--disable-*` theme tokens.
- Focus uses `--focus-color`.

## Examples

### Override radius in a local wrapper

`ButtonBase` has no size of its own, so padding and radius come from you. Border and text colors are overridden through the `--button-*` variables, including their hover and active pairs.

<!-- example: button-base/override-radius-in-a-local-wrapper.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { ButtonBase } from '@vega-ui/react';

const pill: CSSProperties = {
  padding: 'var(--spacing-3) var(--spacing-10)',
  borderRadius: 999,
  fontSize: 'var(--font-size-2)',
};

const brand = {
  ...pill,
  '--button-border-color': 'var(--color-amethyst-accent-500)',
  '--button-border-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-border-color-active': 'var(--color-amethyst-accent-700)',
  '--button-color': 'var(--color-amethyst-accent-500)',
  '--button-color-hover': 'var(--color-amethyst-accent-600)',
  '--button-color-active': 'var(--color-amethyst-accent-700)',
} as CSSProperties;

export default function OverrideRadiusInALocalWrapper() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
      <ButtonBase type='button' appearance='ghost' style={pill}>
        Invite teammates
      </ButtonBase>
      <ButtonBase type='button' appearance='outline' style={brand}>
        Join beta
      </ButtonBase>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- inventing unsupported variant names without matching CSS
- treating `asChild` as a styling escape hatch
- replacing semantic theme tokens with raw hardcoded colors inside reusable component styles
