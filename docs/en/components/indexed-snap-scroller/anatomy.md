# IndexedSnapScroller Anatomy

## Overview

`IndexedSnapScroller` wraps `SnapScroller` and generates a moving window of logical indexes. Each rendered child is wrapped in context that exposes its current virtual index.

## Required Parts

### `IndexedSnapScroller`

Required. Owns index-window generation, shift logic, controlled-index synchronization, and boundary offsets.

### `IndexedSnapScrollerContent`

Required in normal composition. Binds one snapped page to the current virtual index from context.

## Optional Parts

### `apiRef`

Optional. Exposes the imperative indexed scroller API.

## Composition Order

1. `IndexedSnapScroller`
2. one content template via `IndexedSnapScrollerContent`

## Valid Composition Patterns

The child is a component, not markup: it calls `useIndexedSnapScrollerContext` and wraps its output in `IndexedSnapScrollerContent`. The scroller renders this one template once per index in the window.

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

## Invalid Composition Patterns

### Treating the content child as one fixed page

The child is really a template reused for multiple logical indexes.

### External index logic that ignores virtual window resets

The controlled index and visible window drift apart.

### Relying on stable physical DOM order for logical page identity

Window shifts can invalidate that assumption.
