# Popover

## Doc Profile

`advanced interactive`

## Summary

`Popover` is a [compound component](../../glossary.md#compound-component) for non-modal floating content anchored to a trigger, with optional backdrop support when outside-click separation should be stronger. It sits between tooltip-level hinting and full modal overlays.

## Imports

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBackdrop,
  type PopoverProps,
} from '@vega-ui/react';
```

## Exported Types

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`
- `PopoverBackdropProps`

## Minimal Composition

```tsx
<Popover>
  <PopoverTrigger asChild><Button>Account actions</Button></PopoverTrigger>
  <PopoverContent>
    <Text size={2}>Manage profile, billing, and access.</Text>
  </PopoverContent>
</Popover>
```

## Required Parts

- `Popover`: root state and context provider
- `PopoverTrigger`: trigger surface
- `PopoverContent`: floating content

## Optional Parts

- `PopoverBackdrop`: optional backdrop when outside click separation should be stronger

## Composition Order

1. `Popover`
2. `PopoverTrigger`
3. `PopoverBackdrop`
4. `PopoverContent`

## Variants

- Trigger-driven or [controlled](../../glossary.md#controlled) open state
- Lightweight informational popover versus richer custom content
- Optional backdrop when outside-click separation should be stronger

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

- Use `Dialog` instead when interaction should be modal.
- Floating content must be tested inside scroll containers and overlays.
- Trigger content should clearly indicate whether the popover is open.
- If the content starts accumulating form sections, confirmations, or large action groups, the correct abstraction is usually no longer a popover.

## Common Mistakes

- Putting critical task flow inside a popover.
- Forgetting to test placement inside clipped or scrolling containers.
- Letting popover content grow into a mini-dialog with too much text or too many actions.
