# SnapScroller Comparison

## Quick Decision Rule

Use `SnapScroller` when pages already have stable indexes and only direct snap-based paging is needed. Use `IndexedSnapScroller` when the scroller should manage a sliding logical index window.

## `SnapScroller` vs `IndexedSnapScroller`

- Use `SnapScroller` for direct keyed pages that already exist.
- Use `IndexedSnapScroller` for index-windowed infinite-like paging.

## `SnapScroller` vs `PageControl`

- Use `SnapScroller` for the actual paged surface.
- Use `PageControl` as a compact indicator or controller for a short sequence.

## Choose This Component When

- pages have stable indexes
- snap callbacks and imperative prev/next are enough

## Do Not Choose This Component When

- the page list should expand or shift virtually
- a simple indicator is enough without a snapped surface
