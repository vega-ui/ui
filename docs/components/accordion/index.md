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

```tsx
<Accordion>
  <AccordionItem value='account'>
    <AccordionHeader>
      <AccordionTrigger>
        Account settings
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Profile, password, and session settings.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Required Parts

- `Accordion`: root state and size owner
- `AccordionItem`: one expandable section with its own value
- `AccordionHeader`: semantic header wrapper for the trigger
- `AccordionTrigger`: clickable and keyboard-accessible toggle
- `AccordionContent`: expandable content region

## Optional Parts

- `AccordionIcon`: visual affordance that reflects open state

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
- Default icon versus custom icon composition

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
