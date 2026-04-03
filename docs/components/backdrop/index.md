# Backdrop

## Doc Profile

`primitive`

## Summary

`Backdrop` is the low-level overlay surface rendered behind modal or floating content. It composes `FloatingOverlay` and can manage scroll lock, visibility, and optional blur.

## Imports

```tsx
import { Backdrop, type BackdropProps } from '@vega-ui/react';
```

## Exported Types

- `BackdropProps`

## Basic Usage

```tsx
<Backdrop visible onClick={onDismiss} />
```

## Variants

- Visibility: hidden or `visible`
- Effect: blurred or non-blurred
- Behavior: `lockScroll` enabled or disabled

## Related Docs

- [Anatomy](./anatomy.md)
- [Examples](./examples.md)
- [API](./api.md)
- [Styling](./styling.md)
- [Accessibility](./accessibility.md)
- [Comparison](./comparison.md)
- [Patterns](./patterns.md)
- [Troubleshooting](./troubleshooting.md)

## Edge Cases

- `Backdrop` is presentation plus overlay mechanics, not a complete modal system.
- Scroll locking should be tested in real mobile and nested-overlay flows.
- Visibility and foreground-layer z-index must stay coordinated.

## Common Mistakes

- Assuming `Backdrop` alone creates accessible modal behavior.
- Forgetting to coordinate it with focus management.
- Using it without a clear foreground overlay contract.
