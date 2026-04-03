# PageControl Anatomy

## Overview

`PageControl` coordinates a short sequence of tab-like indicators. The root owns active index and pointer/keyboard interaction, while child items reflect the current state.

## Required Parts

### `PageControl`

Required. Owns active index and interaction logic.

### `PageControlItem`

Required for normal dot-style indicators.

## Optional Parts

### `PageControlProgress`

Optional progress-style item with animated fill and duration.

## Composition Order

1. `PageControl`
2. repeated `PageControlItem` or `PageControlProgress`

## Valid Composition Patterns

```tsx
<PageControl active={1}>
  <PageControlItem index={0} />
  <PageControlItem index={1} />
  <PageControlItem index={2} />
</PageControl>
```

## Invalid Composition Patterns

### Items with duplicated indexes

Active state and roving focus become ambiguous.

### Progress items without matching step-advance logic

The animation implies timed advancement that the parent flow may not actually perform.

### Very long sequences

The component loses clarity when used like full pagination.
