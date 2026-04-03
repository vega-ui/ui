# SnapScroller Anatomy

## Overview

`SnapScroller` is a snap-aware scroll container that registers child items by index and uses the scroll-snap hook to derive pending and committed snap positions.

## Required Parts

### `SnapScroller`

Required. Owns the scroll container, snap detection, imperative API, and item registry.

### `SnapScrollerContent`

Required in normal composition. Represents one snap-aligned item and registers its index with the root.

## Optional Parts

### `apiRef`

Optional imperative surface for `prev()`, `next()`, keyed scrolling, and measuring.

## Composition Order

1. `SnapScroller`
2. repeated `SnapScrollerContent index={...}`

## Valid Composition Patterns

```tsx
<SnapScroller style={{ width: 400, gap: 12 }}>
  <SnapScrollerContent index={0}>0</SnapScrollerContent>
  <SnapScrollerContent index={1}>1</SnapScrollerContent>
  <SnapScrollerContent index={2}>2</SnapScrollerContent>
</SnapScroller>
```

## Invalid Composition Patterns

### Content without stable indexes

The snap system cannot derive consistent keys.

### Child order changing while external code still assumes old indexes

Imperative navigation and highlighted state drift apart.

### Treating `SnapScrollerContent` as arbitrary non-page layout

The component is page-oriented, not a generic overflow row.
