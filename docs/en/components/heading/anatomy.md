# Heading Anatomy

## Overview

`Heading` is a single-part primitive. The root owns semantic heading level, visual size, and weight.

## Required Parts

### `Heading`

Required. Renders the heading element and applies VegaUI heading typography.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Heading`
2. heading content

## Valid Composition Patterns

The heading carries an `id`, and the `section` it titles references it with `aria-labelledby`, so the region gets the same name as the visible title.

<!-- example: heading/valid-composition-patterns.tsx -->
```tsx
import { Heading, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <section aria-labelledby='billing-contacts-title' style={{ display: 'grid', gap: 'var(--spacing-2)', width: '100%' }}>
      <Heading as='h3' size={5} id='billing-contacts-title'>Billing contacts</Heading>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Invoices are sent to finance@acme.io and the workspace owner.</Text>
    </section>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Heading level chosen only for visual size

This breaks document structure.

### Body text styled to mimic section structure

This hides navigational semantics from assistive technology.
