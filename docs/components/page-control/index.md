# PageControl

## Doc Profile

`advanced interactive`

## Summary

`PageControl` is a [compound component](../../glossary.md#compound-component) for short page or step indicators, usually in carousels and onboarding flows. It supports discrete items and animated progress items.

## Imports

```tsx
import {
  PageControl,
  PageControlItem,
  PageControlProgress,
  type PageControlItemProps,
  type PageControlProgressProps,
  type PageControlProps,
} from '@vega-ui/react';
```

## Exported Types

- `PageControlProps`
- `PageControlItemProps`
- `PageControlProgressProps`

## Minimal Composition

```tsx
<PageControl>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Required Parts

- `PageControl`: root active-state coordinator
- `PageControlItem`: discrete dot item

## Optional Parts

- `PageControlProgress`: animated progress-style item

## Composition Order

1. `PageControl`
2. repeated `PageControlItem` or `PageControlProgress`

## Variants

- Size: `sm`, `md`, `lg`
- State model: controlled or uncontrolled `active`
- Item style: static dot or progress indicator

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

- This pattern works best for short sequences.
- Progress items introduce timing semantics that should match real autoplay or step-advance behavior.
- Active state should not rely on color alone.

## Common Mistakes

- Using `PageControl` for long result navigation.
- Forgetting to keep active state in sync with the actual carousel or onboarding step.
- Rendering too many items for the available space.
