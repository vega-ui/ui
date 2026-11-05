# Collapsible Anatomy

## Overview

`Collapsible` owns one expandable region and coordinates its trigger, content visibility, and hidden-state lifecycle. It is a [compound component](../../glossary.md#compound-component) because the trigger and content depend on one shared root context.

## Required Parts

### `Collapsible`

Required. Owns open state, hidden-state lifecycle, and content ID coordination.

### `CollapsibleTrigger`

Required. Toggles the region and carries `aria-expanded` plus `aria-controls`.

### `CollapsibleContent`

Required. Renders the expandable region and manages the height-based visibility transition.

## Optional Parts

`Collapsible` does not expose extra public child parts beyond the trigger and content pair.

## Composition Order

1. `Collapsible`
2. `CollapsibleTrigger`
3. `CollapsibleContent`

## Valid Composition Patterns

<!-- example: collapsible/price-breakdown.tsx -->
```tsx
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function PriceBreakdown() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Price breakdown</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            {lines.map((line) => (
              <div key={line.label} style={{ display: 'contents' }}>
                <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
                <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Invalid Composition Patterns

### Content outside `Collapsible`

This breaks the shared ID, hidden state, and transition lifecycle.

### Trigger semantics replaced by a non-interactive child

If `asChild` is used, the child still needs to behave like a real trigger.

### Several related sections implemented as unrelated collapsibles

If the sections should coordinate, use `Accordion` instead of separate `Collapsible` roots.
