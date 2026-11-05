# SnapScroller

## Doc Profile

`advanced interactive`

## Summary

`SnapScroller` is a [compound component](../../glossary.md#compound-component) for CSS scroll-snap-based horizontal paging. It exposes direct scroller items, snapping callbacks, and an imperative API for previous/next navigation and keyed scrolling.

## Imports

```tsx
import {
  SnapScroller,
  SnapScrollerContent,
  type SnapScrollerApiRef,
  type SnapScrollerContentProps,
  type SnapScrollerProps,
} from '@vega-ui/react';
```

## Exported Types

- `SnapScrollerProps`
- `SnapScrollerContentProps`
- `SnapScrollerApiRef`

## Minimal Composition

<!-- example: snap-scroller/minimal-composition.tsx -->
```tsx
import { SnapScroller, SnapScrollerContent } from '@vega-ui/react';
import type { CSSProperties } from 'react';

const pageStyle: CSSProperties = {
  width: '100%',
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function MinimalComposition() {
  return (
    <SnapScroller tabIndex={0} aria-label='Dashboard sections' style={{ width: '100%', gap: 'var(--spacing-6)' }}>
      <SnapScrollerContent index={0} style={pageStyle}>Overview</SnapScrollerContent>
      <SnapScrollerContent index={1} style={pageStyle}>Metrics</SnapScrollerContent>
      <SnapScrollerContent index={2} style={pageStyle}>Billing</SnapScrollerContent>
    </SnapScroller>
  );
}
```
<!-- /example -->

## Required Parts

- `SnapScroller`: root scroll container and snap coordinator
- `SnapScrollerContent`: one snap-aligned item with a stable `index`

## Optional Parts

- imperative `apiRef` for previous/next and keyed scrolling

## Composition Order

1. `SnapScroller`
2. repeated `SnapScrollerContent index={...}`

## Variants

- Passive snapping with callbacks
- Imperative control through `apiRef`
- Fixed-size or mixed-width content, though mixed width needs more testing

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

- Snap behavior depends heavily on stable item sizing and order.
- `defaultIndex` is only meaningful if the matching keyed item exists.
- Imperative control should be coordinated with the same source of truth as highlighted state.

## Common Mistakes

- Driving `apiRef` from stale indexes.
- Reordering content without reconsidering snap keys.
- Assuming mixed-width items will snap as predictably as uniform pages.
