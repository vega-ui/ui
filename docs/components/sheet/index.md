# Sheet

## Doc Profile

`advanced interactive`

## Summary

`Sheet` is a [compound component](../../glossary.md#compound-component) for panel-style overlays, usually bottom-mounted or mobile-first, with trigger, [portal](../../glossary.md#portal), backdrop, content, handle, and layout parts. It is the touch- and panel-oriented overlay in the family, especially when snap points or bottom-entry behavior matter.

## Imports

```tsx
import {
  Sheet,
  SheetTrigger,
  SheetPortal,
  SheetBackdrop,
  SheetContent,
  SheetHandle,
  SheetHeader,
  SheetMain,
  type SheetProps,
} from '@vega-ui/react';
```

## Exported Types

- `SheetProps`
- `SheetTriggerProps`
- `SheetPortalProps`
- `SheetHandleProps`
- `SheetContentProps`
- `SheetHeaderProps`
- `SheetMainProps`
- `SheetBackdropProps`

## Minimal Composition

```tsx
<Sheet>
  <SheetTrigger asChild>
    <Button>Open checkout sheet</Button>
  </SheetTrigger>
  <SheetPortal>
    <SheetBackdrop>
      <SheetContent>
        <SheetHandle />
        <SheetHeader>
          <Text size={4} fontWeight={500}>Order summary</Text>
        </SheetHeader>
        <SheetMain>
          <Text size={2}>Review subscription seats, taxes, and payment method.</Text>
        </SheetMain>
      </SheetContent>
    </SheetBackdrop>
  </SheetPortal>
</Sheet>
```

## Required Parts

- `Sheet`: root state and context provider
- `SheetTrigger`: open action surface
- `SheetContent`: sheet surface container

## Optional Parts

- `SheetPortal`: overlay [portal](../../glossary.md#portal)
- `SheetBackdrop`: backdrop layer
- `SheetHandle`: drag or gesture affordance
- `SheetHeader`: top section layout wrapper
- `SheetMain`: main body content wrapper

## Composition Order

1. `Sheet`
2. `SheetTrigger`
3. `SheetPortal`
4. `SheetBackdrop`
5. `SheetContent`
6. `SheetHandle`
7. `SheetHeader`
8. `SheetMain`

## Variants

- Bottom-sheet layouts versus general panel layouts
- Trigger-driven versus [controlled](../../glossary.md#controlled) open state
- Snap-point based sheets versus fully open sheets
- Closable versus non-closable sheets
- Mobile-first presentation versus broader cross-device panel usage

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

- Validate gesture affordances on touch devices.
- Snap points should be tested against real content height.
- Nested overlays need focus restoration and stacking checks.
- Non-closable sheets need especially clear exit paths.

## Common Mistakes

- Treating a sheet like a desktop modal dialog.
- Using snap points without checking content usability at each stop.
- Forgetting to test gesture, focus, and dismissal together.
