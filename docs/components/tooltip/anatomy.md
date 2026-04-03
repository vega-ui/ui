# Tooltip Anatomy

## Overview

`Tooltip` owns delayed open behavior and floating-layer coordination for a short, non-essential description. It is intentionally narrow: trigger plus descriptive content, with an optional arrow for visual anchoring.

## Required Parts

### `Tooltip`

Required. Owns open timing and trigger-to-content coordination.

### `TooltipTrigger`

Required. Defines the hover or focus target.

### `TooltipContent`

Required. Renders the visible descriptive content.

## Optional Parts

### `TooltipArrow`

Optional visual arrow when the floating content should point back to the trigger more clearly.

## Composition Order

1. `Tooltip`
2. `TooltipTrigger`
3. `TooltipContent`
4. `TooltipArrow`

## Valid Composition Patterns

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <IconButton aria-label='Access info'>
      <Icon><InfoIcon /></Icon>
    </IconButton>
  </TooltipTrigger>
  <TooltipContent>
    Admins can manage billing and workspace settings.
    <TooltipArrow />
  </TooltipContent>
</Tooltip>
```

## Invalid Composition Patterns

### Interactive controls inside `TooltipContent`

Tooltip content should remain descriptive, not become a mini-popover.

### Tooltip as the only label for a control

The trigger still needs its own accessible meaning without the tooltip.

### Required instructions hidden only in the tooltip

If the content is essential for completing the task, use inline help or another overlay pattern instead.
