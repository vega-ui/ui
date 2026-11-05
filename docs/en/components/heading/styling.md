# Heading Styling

## Overview

`Heading` is driven by theme typography tokens and a size-specific heading line-height scale.

## Public CSS Variables

| Variable | Used By | Purpose |
| --- | --- | --- |
| `--heading-font-family` | root | heading font family |
| `--heading-font-weight` | root | default heading weight |
| `--text-color` | root | default heading color |
| `--text-font-size-1` ... `--text-font-size-11` | size scale | visual size mapping |
| `--heading-line-height-1` ... `--heading-line-height-11` | size scale | heading line-height mapping |

## Part-Level Variables

### Root

The root consumes:

- `--heading-font-family`
- `--heading-font-weight`
- `--text-color`
- size-specific font-size and heading line-height tokens

## State And Variant Interaction

- `data-size` changes the visual scale
- `data-font-weight` overrides the default heading weight
- semantic level is controlled by `as`, not by CSS

## Examples

### Font weight

`fontWeight` overrides the theme default `--heading-font-weight` for one heading while the size and line height stay on the scale.

<!-- example: heading/emphasized-section-title.tsx -->
```tsx
import { Heading } from '@vega-ui/react';

export default function EmphasizedSectionTitle() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <Heading as='h3' size={6} fontWeight={400}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={500}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={700}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={900}>Access control</Heading>
    </div>
  );
}
```
<!-- /example -->

## Do Not Override

- using arbitrary font sizes outside the heading scale
- relying on color alone to communicate heading hierarchy
