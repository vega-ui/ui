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

```tsx
<IndexedSnapScroller>
  <IndexedSnapScrollerContent />
</IndexedSnapScroller>
```

## Invalid Composition Patterns

### Treating the content child as one fixed page

The child is really a template reused for multiple logical indexes.

### External index logic that ignores virtual window resets

The controlled index and visible window drift apart.

### Relying on stable physical DOM order for logical page identity

Window shifts can invalidate that assumption.
