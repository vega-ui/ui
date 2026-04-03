# Tooltip

## Doc Profile

`advanced interactive`

## Summary

`Tooltip` is a [compound component](../../glossary.md#compound-component) for lightweight floating descriptions attached to a trigger. It should only carry supplemental, non-essential information.

## Imports

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
  type TooltipProps,
} from '@vega-ui/react';
```

## Exported Types

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`
- `TooltipArrowProps`

## Minimal Composition

```tsx
<Tooltip>
  <TooltipTrigger asChild><Button>Info</Button></TooltipTrigger>
  <TooltipContent>
    Workspace members only see projects assigned to their team.
    <TooltipArrow />
  </TooltipContent>
</Tooltip>
```

## Required Parts

- `Tooltip`: root state and context provider
- `TooltipTrigger`: trigger surface
- `TooltipContent`: visible tooltip content

## Optional Parts

- `TooltipArrow`: visual arrow for the floating content

## Composition Order

1. `Tooltip`
2. `TooltipTrigger`
3. `TooltipContent`
4. `TooltipArrow`

## Variants

- Simple label tooltip versus richer descriptive tooltip
- [Controlled](../../glossary.md#controlled) open state when consumer logic needs it

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

- Tooltips should not contain critical actions or required instructions.
- Touch and keyboard users need equivalent access to the same information.
- Trigger content should remain understandable even without the tooltip.

## Common Mistakes

- Hiding mandatory instructions in a tooltip.
- Using tooltip content as the only accessible name of a control.
- Putting interactive flows into tooltip content.
