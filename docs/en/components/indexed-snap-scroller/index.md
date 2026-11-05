# IndexedSnapScroller

## Doc Profile

`advanced interactive`

## Summary

`IndexedSnapScroller` is a [compound component](../../glossary.md#compound-component) built on `SnapScroller` for virtualized, index-windowed paging. It maintains a sliding logical index sequence and can shift the window as the user reaches scroll boundaries.

## Imports

```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  type IndexedSnapScrollerApiRef,
  type IndexedSnapScrollerContentProps,
  type IndexedSnapScrollerProps,
} from '@vega-ui/react';
```

## Exported Types

- `IndexedSnapScrollerProps`
- `IndexedSnapScrollerContentProps`
- `IndexedSnapScrollerApiRef`

## Minimal Composition

<!-- example: indexed-snap-scroller/minimal-composition.tsx -->
```tsx
import {
  IndexedSnapScroller,
  IndexedSnapScrollerContent,
  useIndexedSnapScrollerContext,
} from '@vega-ui/react';

const today = new Date();
const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

function MonthPage() {
  const { index } = useIndexedSnapScrollerContext();
  const month = new Date(today.getFullYear(), today.getMonth() + index, 1);

  return (
    <IndexedSnapScrollerContent
      style={{
        width: '100%',
        padding: 'var(--spacing-10)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-4)',
        background: 'var(--fills-secondary)',
      }}
    >
      {monthFormat.format(month)}
    </IndexedSnapScrollerContent>
  );
}

export default function MinimalComposition() {
  return (
    <IndexedSnapScroller
      defaultIndex={0}
      tabIndex={0}
      aria-label='Months'
      style={{ width: '100%', gap: 'var(--spacing-6)' }}
    >
      <MonthPage />
    </IndexedSnapScroller>
  );
}
```
<!-- /example -->

## Required Parts

- `IndexedSnapScroller`: root indexed paging system
- `IndexedSnapScrollerContent`: page content bound to the current virtual index

## Optional Parts

- `apiRef` for imperative index-window control

## Composition Order

1. `IndexedSnapScroller`
2. one `IndexedSnapScrollerContent` child template

## Variants

- Controlled logical `index`
- Uncontrolled windowed paging with `defaultIndex`
- Adjustable `size`, `shift`, `start`, and `startDir`

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

- Controlled `index` and virtual window resets should stay synchronized.
- `preserveScroll` changes how index-window shifts feel.
- The children are re-rendered for each virtual index, so keyed state inside the page content must be intentional.

## Common Mistakes

- Assuming child order stays static even though the virtual window shifts.
- Forgetting that one content template is rendered multiple times with different context indexes.
- Mixing external controlled index logic with ad hoc internal offset assumptions.
