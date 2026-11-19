# Collapsible

## Doc Profile

`advanced interactive`

## Summary

`Collapsible` is a [compound component](../../glossary.md#compound-component) for one expandable region with a trigger and content surface. It is the primitive disclosure pattern when grouped accordion behavior is not needed.

## Imports

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
} from '@vega-ui/react';
```

## Exported Types

- `CollapsibleProps`
- `CollapsibleTriggerProps`
- `CollapsibleContentProps`

## Minimal Composition

<!-- example: collapsible/minimal-composition.tsx -->
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ width: '100%' }}>
      <Collapsible>
        <CollapsibleTrigger>Advanced billing options</CollapsibleTrigger>
        <CollapsibleContent>
          VAT settings, invoice recipients, and legal entity data.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own and import that component everywhere. `MyCollapsible` passes its props to `Collapsible`, renders `summary` in a ghost button trigger, and its children in the content. See [Component recipes](../../recipes.md).

<!-- example: collapsible/recipe.tsx -->
```tsx
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
  type CollapsibleProps,
} from '@vega-ui/react';
import type { ReactNode } from 'react';

interface MyCollapsibleProps extends CollapsibleProps {
  summary: ReactNode
}

export function MyCollapsible({ summary, children, ...props }: MyCollapsibleProps) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>{summary}</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <MyCollapsible summary='Price breakdown'>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
          {lines.map((line) => (
            <div key={line.label} style={{ display: 'contents' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
              <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
            </div>
          ))}
        </dl>
      </MyCollapsible>
    </div>
  );
}
```
<!-- /example -->

## Required Parts

- `Collapsible`: root state owner
- `CollapsibleTrigger`: expandable trigger surface
- `CollapsibleContent`: expandable content region

## Optional Parts

- No extra public parts beyond the root trigger and content model

## Composition Order

1. `Collapsible`
2. `CollapsibleTrigger`
3. `CollapsibleContent`

## Variants

- Uncontrolled versus [controlled](../../glossary.md#controlled) open state
- Default button trigger versus `asChild` trigger composition
- Inline help, filters, and secondary details as product-level variants

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [Patterns](./patterns.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `CollapsibleTrigger` can render through `asChild`, but custom semantics should still preserve a real trigger contract.
- `onChangeHidden` reflects visibility lifecycle, which can differ from the open state during height transitions.
- Dynamic content height should be tested with real content, not just short placeholders.

## Common Mistakes

- Using `Collapsible` where grouped `Accordion` behavior is actually needed.
- Hiding essential information behind vague trigger labels.
- Treating `open` and `hidden` as the same lifecycle signal.
