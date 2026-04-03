# Accordion Anatomy

## Overview

`Accordion` owns the shared open-state model for a group of expandable items. It is a [compound component](../../glossary.md#compound-component) because the root, item, trigger, and content parts coordinate as one interaction system.

## Required Parts

### `Accordion`

Required. Owns size, opened values, and the single-open or multiple-open behavior.

### `AccordionItem`

Required. Declares one section and its stable `value`.

### `AccordionHeader`

Required in normal composition. Wraps the trigger semantically and keeps heading structure explicit.

### `AccordionTrigger`

Required. Toggles the item and carries the main interaction surface.

### `AccordionContent`

Required. Renders the expandable content for the item.

## Optional Parts

### `AccordionIcon`

Optional visual affordance for open and closed state. It should remain part of the trigger, not become a separate click target.

## Composition Order

1. `Accordion`
2. `AccordionItem`
3. `AccordionHeader`
4. `AccordionTrigger`
5. `AccordionIcon`
6. `AccordionContent`

## Valid Composition Patterns

```tsx
<Accordion multiple defaultOpened={['shipping']}>
  <AccordionItem value='shipping'>
    <AccordionHeader>
      <AccordionTrigger>
        Shipping
        <AccordionIcon />
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>Delivery takes 2-5 business days.</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Invalid Composition Patterns

### `AccordionContent` outside `AccordionItem`

This breaks the item-level open-state contract.

### Icon used as the only clickable affordance

The trigger should remain the full interaction surface, not just the decoration.

### Several independent items when one grouped state model is intended

If the sections are supposed to coordinate, use one `Accordion` root instead of unrelated collapsibles.
