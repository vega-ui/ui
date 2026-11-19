# Accordion

## Doc Profile

`advanced interactive`

## Summary

`Accordion` is a [compound component](../../glossary.md#compound-component) for grouped expandable sections that share one root state model and item-level parts for headers, triggers, icons, and content.

## Imports

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  type AccordionProps,
  type AccordionItemProps,
} from '@vega-ui/react';
```

## Exported Types

- `AccordionProps`
- `AccordionItemProps`
- `AccordionHeaderProps`
- `AccordionTriggerProps`
- `AccordionContentProps`
- `AccordionIconProps`

## Minimal Composition

<!-- example: accordion/minimal-composition.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionItem value='account'>
        <AccordionHeader>
          <AccordionTrigger>
            Account settings
            <AccordionIcon><ChevronDownIcon /></AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Profile, password, and session settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```
<!-- /example -->

## Your Own Component

The minimal composition above shows the parts in place. In an app, compose them once in a file of your own, with your icon set, and import that component everywhere. `MyAccordionItem` passes its props to `AccordionItem`, renders `summary` in the trigger with the chevron, and its children in the content. See [Component recipes](../../recipes.md).

<!-- example: accordion/recipe.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  type AccordionItemProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

interface MyAccordionItemProps extends AccordionItemProps {
  summary: ReactNode
}

export function MyAccordionItem({ summary, children, ...props }: MyAccordionItemProps) {
  return (
    <AccordionItem {...props}>
      <AccordionHeader>
        <AccordionTrigger>
          {summary}
          <AccordionIcon><ChevronDownIcon /></AccordionIcon>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export default function Recipe() {
  return (
    <Accordion defaultOpened={['shipping']} style={{ width: '100%' }}>
      <MyAccordionItem value='shipping' summary='Shipping'>Orders ship in 2–5 business days.</MyAccordionItem>
      <MyAccordionItem value='returns' summary='Returns'>Return any item within 30 days of delivery.</MyAccordionItem>
    </Accordion>
  );
}
```
<!-- /example -->

## Required Parts

- `Accordion`: root state and size owner
- `AccordionItem`: one expandable section with its own value
- `AccordionHeader`: semantic header wrapper for the trigger
- `AccordionTrigger`: clickable and keyboard-accessible toggle
- `AccordionContent`: expandable content region

## Optional Parts

- `AccordionIcon`: the indicator of the open state, with the icon you pass as children

## Composition Order

1. `Accordion`
2. `AccordionItem`
3. `AccordionHeader`
4. `AccordionTrigger`
5. `AccordionIcon`
6. `AccordionContent`

## Variants

- Single-open versus multiple-open groups through `multiple`
- Uncontrolled versus [controlled](../../glossary.md#controlled) opened state
- Size variants through `size`
- With or without `AccordionIcon`, holding an icon from any set

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

- `multiple={false}` means one newly opened item replaces the currently open item.
- Rich trigger content should still preserve a full-width clickable trigger surface.
- Custom wrappers around triggers or content should preserve the root composition contract.

## Common Mistakes

- Rendering `AccordionContent` outside `AccordionItem`.
- Making only the icon clickable instead of the full trigger.
- Treating `Accordion` like several unrelated `Collapsible` instances when one shared state model is intended.
