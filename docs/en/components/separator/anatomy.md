# Separator Anatomy

## Overview

`Separator` is a single-part primitive that renders a thin dividing line with `role='separator'`.

## Required Parts

### `Separator`

Required. Owns both the semantic divider role and the visual line.

## Optional Parts

There are no exported child parts.

## Composition Order

1. `Separator`

## Valid Composition Patterns

A horizontal separator between the content and the footer, and a vertical one between the footer actions. The footer row has an explicit height because a vertical separator takes `height: 100%` of its parent.

<!-- example: separator/valid-composition-patterns.tsx -->
```tsx
import { Button, Card, Heading, Separator, Text } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <Card style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading as='h3' size={4}>Quarterly report</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Revenue grew 12% compared to the previous quarter.</Text>
      </div>
      <Separator />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', height: 'var(--spacing-16)' }}>
        <Button size='sm' variant='secondary' appearance='ghost'>Download PDF</Button>
        <Separator orientation='vertical' />
        <Button size='sm' variant='secondary' appearance='ghost'>Share</Button>
      </div>
    </Card>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Vertical separator without parent height

The divider collapses because it has no height context.

### Separator used as the only section structure

This creates visual division without semantic labeling.
