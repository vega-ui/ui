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

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger>Advanced filters</CollapsibleTrigger>
  <CollapsibleContent>
    Status, environment, and owner filters appear here.
  </CollapsibleContent>
</Collapsible>
```

## Invalid Composition Patterns

### Content outside `Collapsible`

This breaks the shared ID, hidden state, and transition lifecycle.

### Trigger semantics replaced by a non-interactive child

If `asChild` is used, the child still needs to behave like a real trigger.

### Several related sections implemented as unrelated collapsibles

If the sections should coordinate, use `Accordion` instead of separate `Collapsible` roots.
