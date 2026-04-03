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

```tsx
<Collapsible>
  <CollapsibleTrigger>Advanced billing options</CollapsibleTrigger>
  <CollapsibleContent>
    VAT settings, invoice recipients, and legal entity data.
  </CollapsibleContent>
</Collapsible>
```

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
