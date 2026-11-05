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

`PageControl` renders a `tablist` and every item a `tab`, but neither has a visible label: pass `aria-label` to the root and to each item. Use `defaultActive` for an uncontrolled control, or `active` with `onChangeActive` when the slides live in parent state.

<!-- example: page-control/minimal-composition.tsx -->
```tsx
import { PageControl, PageControlItem } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PageControl defaultActive={0} aria-label='Slides'>
      <PageControlItem index={0} aria-label='Slide 1 of 3' />
      <PageControlItem index={1} aria-label='Slide 2 of 3' />
      <PageControlItem index={2} aria-label='Slide 3 of 3' />
    </PageControl>
  );
}
```
<!-- /example -->

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
